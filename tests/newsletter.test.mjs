import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';
const compile = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, {compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText).toString('base64')}`;
const library = compile(readFileSync(new URL('../lib/newsletter.ts',import.meta.url),'utf8'));
const {makeToken,readToken} = await import(library);
const {POST} = await import(compile(readFileSync(new URL('../app/api/subscribe/route.ts',import.meta.url),'utf8').replace('@/lib/newsletter',library)));
Object.assign(process.env,{RESEND_API_KEY:'test-key',RESEND_FROM:'Test <test@example.com>',RESEND_SEGMENT_ID:'test-segment',NEWSLETTER_SITE_URL:'https://example.com',NEWSLETTER_SIGNING_SECRET:'x'.repeat(64)});
const secret = process.env.NEWSLETTER_SIGNING_SECRET;
const request = (data,origin='https://example.com') => new Request('https://example.com/api/subscribe',{method:'POST',headers:{origin},body:JSON.stringify(data)});
test('tokens reject tampering, expiry and another signing key',()=>{
 const token=makeToken('test@example.com',secret,1000);
 assert.equal(readToken(token,secret,2000),'test@example.com');
 assert.equal(readToken(token,secret,172800000),null);
 assert.equal(readToken(token,'other',2000),null);
 assert.equal(readToken(token+'tamper',secret,2000),null);
});
test('invalid origin, email, token and honeypot cause no upstream calls',async t=>{
 const upstream=t.mock.method(globalThis,'fetch',()=>{throw Error('Unexpected');});
 assert.equal((await POST(request({action:'subscribe',email:'test@example.com'},'https://other.com'))).status,403);
 assert.equal((await POST(request({action:'subscribe',email:'invalid'}))).status,400);
 assert.equal((await POST(request({action:'confirm',token:'bad'}))).status,400);
 assert.equal((await POST(request({action:'subscribe',website:'bot'}))).status,200);
 assert.equal(upstream.mock.callCount(),0);
});
test('signup sends confirmation and does not create a contact',async t=>{
 t.mock.method(globalThis,'fetch',async(url,options)=>{
  assert.equal(url,'https://api.resend.com/emails');
  const body=JSON.parse(options.body);
  assert.deepEqual(body.to,['test@example.com']);
  assert.ok(body.text.includes('https://example.com/subscribe/confirm#'));
  assert.ok(options.headers['Idempotency-Key']);
  return Response.json({id:'email-id'});
 });
 assert.equal((await POST(request({action:'subscribe',email:' Test@Example.com '}))).status,200);
});
test('confirmation creates a contact in the selected segment',async t=>{
 let calls=0;
 t.mock.method(globalThis,'fetch',async(url,options)=>{
  calls++;
  if(calls===1) return new Response('',{status:404});
  assert.equal(url,'https://api.resend.com/contacts');
  assert.deepEqual(JSON.parse(options.body),{email:'test@example.com',unsubscribed:false,segments:[{id:'test-segment'}]});
  return Response.json({id:'contact-id'});
 });
 assert.equal((await POST(request({action:'confirm',token:makeToken('test@example.com',secret)}))).status,200);
 assert.equal(calls,2);
});
test('confirmation cannot resubscribe someone who unsubscribed',async t=>{
 const upstream=t.mock.method(globalThis,'fetch',async()=>Response.json({unsubscribed:true}));
 assert.equal((await POST(request({action:'confirm',token:makeToken('test@example.com',secret)}))).status,409);
 assert.equal(upstream.mock.callCount(),1);
});
test('existing contacts join the segment without changing global preferences',async t=>{
 let calls=0;
 t.mock.method(globalThis,'fetch',async(url,options)=>{
  if(++calls===1) return Response.json({unsubscribed:false});
  assert.equal(url,'https://api.resend.com/contacts/test%40example.com/segments/test-segment');
  assert.equal(options.method,'POST');
  assert.equal(options.body,undefined);
  return Response.json({id:'test-segment'});
 });
 assert.equal((await POST(request({action:'confirm',token:makeToken('test@example.com',secret)}))).status,200);
});
test('upstream errors never claim success',async t=>{
 t.mock.method(globalThis,'fetch',async()=>new Response('',{status:429}));
 assert.equal((await POST(request({action:'subscribe',email:'test@example.com'}))).status,502);
});
