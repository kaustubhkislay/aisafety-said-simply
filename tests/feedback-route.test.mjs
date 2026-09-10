import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../app/api/feedback/route.ts', import.meta.url), 'utf8');
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
const request = (data, origin = 'http://localhost:3000') => new Request('http://localhost:3000/api/feedback', {
  method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: JSON.stringify(data),
});

test('rejects empty feedback and invalid email without contacting Google', async (t) => {
  const upstream = t.mock.method(globalThis, 'fetch', () => { throw new Error('Unexpected request'); });
  assert.equal((await POST(request({ message: '   ' }))).status, 400);
  assert.equal((await POST(request({ message: 'Hello', email: 'invalid' }))).status, 400);
  assert.equal((await POST(request({ message: 'Hello' }, 'https://other.example'))).status, 403);
  assert.equal(upstream.mock.callCount(), 0);
});

test('maps fields to Google and confirms only visible receipt text', async (t) => {
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.ok(url.endsWith('/formResponse'));
    assert.equal(options.body.get('entry.87804800'), 'Test name');
    assert.equal(options.body.get('entry.2147357251'), 'test@example.com');
    assert.equal(options.body.get('entry.1253491831'), 'Test feedback');
    return new Response('<div>Thank you. Your feedback has been received.</div>');
  });
  assert.deepEqual(await (await POST(request({ name: 'Test name', email: 'test@example.com', message: 'Test feedback' }))).json(), { ok: true });
});

test('does not claim success from a 200 error page or script configuration', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('<script>"Thank you. Your feedback has been received."</script><div>Please complete the form.</div>'));
  assert.equal((await POST(request({ message: 'Hello' }))).status, 502);
});

test('returns a recoverable error when Google is unavailable', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => { throw new Error('Network unavailable'); });
  assert.equal((await POST(request({ message: 'Hello' }))).status, 502);
});


test('accepts the public host when Next uses an internal request hostname', async (t) => {
  t.mock.method(globalThis, 'fetch', async () => new Response('<div>Thank you. Your feedback has been received.</div>'));
  const req = new Request('http://localhost:3000/api/feedback', {
    method: 'POST', headers: { origin: 'http://127.0.0.1:3000', host: '127.0.0.1:3000' },
    body: JSON.stringify({ message: 'Test' }),
  });
  assert.equal((await POST(req)).status, 200);
});
