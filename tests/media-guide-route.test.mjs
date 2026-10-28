import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const compile = (source) => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
}).outputText).toString('base64')}`;
const newsletter = compile(readFileSync(new URL('../lib/newsletter.ts', import.meta.url), 'utf8'));
const content = compile(readFileSync(new URL('../content.ts', import.meta.url), 'utf8'));
const { POST } = await import(compile(readFileSync(new URL('../app/api/media-guide/route.ts', import.meta.url), 'utf8')
  .replace('@/lib/newsletter', newsletter).replace('@/content', content)));

process.env.RESEND_API_KEY = 'test-key';
process.env.RESEND_FROM = 'AISSS <test@example.com>';

const fields = { name: 'Test Reader', email: 'reader@example.com', affiliation: 'University AI safety group', reason: 'We want to prepare for our first media request.' };
const request = (data = fields, origin = 'https://example.com') => new Request('https://example.com/api/media-guide', {
  method: 'POST', headers: { ...(origin === null ? {} : { origin }), 'Content-Type': 'application/json' }, body: JSON.stringify(data),
});

test('rejects missing, invalid, oversized, and whitespace-only fields before sending email', async (t) => {
  const upstream = t.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected request'); });
  for (const field of Object.keys(fields)) {
    assert.equal((await POST(request({ ...fields, [field]: ' ' }))).status, 400);
    assert.equal((await POST(request({ ...fields, [field]: 42 }))).status, 400);
    assert.equal((await POST(request({ ...fields, [field]: undefined }))).status, 400);
  }
  assert.equal((await POST(request({ ...fields, email: 'invalid' }))).status, 400);
  assert.equal((await POST(request({ ...fields, email: 'reader@example.com\r\nBcc: other@example.com' }))).status, 400);
  assert.equal((await POST(request({ ...fields, reason: 'a'.repeat(4001) }))).status, 400);
  assert.equal((await POST(request({ ...fields, affiliation: 'a'.repeat(201) }))).status, 400);
  assert.equal((await POST(request({ ...fields, reason: 'a'.repeat(20001) }))).status, 413);
  assert.equal(upstream.mock.callCount(), 0);
});

test('rejects missing, cross-site, and malformed origins without sending email', async (t) => {
  const upstream = t.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected request'); });
  for (const origin of [null, 'https://other.example', 'null', 'not a URL']) {
    assert.equal((await POST(request(fields, origin))).status, 403);
  }
  assert.equal(upstream.mock.callCount(), 0);
});

test('sends the four fields only to the team and uses the requester as reply-to', async (t) => {
  const keys = [];
  const upstream = t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url, 'https://api.resend.com/emails');
    const body = JSON.parse(options.body);
    assert.deepEqual(body.to, ['contact@aisafetysaidsimply.com']);
    assert.equal(body.reply_to, fields.email);
    assert.equal(body.subject, 'Media guide request — AISSS');
    for (const value of Object.values(fields)) assert.ok(body.text.includes(value));
    assert.equal(body.html, undefined);
    assert.equal(body.attachments, undefined);
    assert.ok(!body.text.includes('docs.google.com'));
    keys.push(options.headers['Idempotency-Key']);
    return Response.json({ id: 'email-id' });
  });
  assert.deepEqual(await (await POST(request({ ...fields, name: ` ${fields.name} ` }))).json(), { ok: true });
  assert.equal((await POST(request(fields))).status, 200);
  assert.equal(upstream.mock.callCount(), 2);
  assert.ok(keys[0]);
  assert.equal(keys[0], keys[1]);
});

test('accepts a public host behind the Next.js proxy', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => Response.json({ id: 'email-id' }));
  const req = new Request('http://localhost:3000/api/media-guide', {
    method: 'POST', headers: { origin: 'https://example.com', host: 'example.com' }, body: JSON.stringify(fields),
  });
  assert.equal((await POST(req)).status, 200);
});

test('does not send email for the hidden bot field or missing server configuration', async (t) => {
  const upstream = t.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected request'); });
  assert.equal((await POST(request({ ...fields, website: 'bot' }))).status, 200);
  const key = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try { assert.equal((await POST(request())).status, 503); }
  finally { process.env.RESEND_API_KEY = key; }
  assert.equal(upstream.mock.callCount(), 0);
});

test('preserves a retry path when the email service rejects or fails the request', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('', { status: 429 }));
  assert.equal((await POST(request())).status, 502);
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('Network unavailable'); });
  assert.equal((await POST(request())).status, 502);
  t.mock.method(globalThis, 'fetch', async () => Response.json({}));
  assert.equal((await POST(request())).status, 502);
});
