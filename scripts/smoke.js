const { createServer } = require('node:http');
const assert = require('node:assert/strict');
const app = require('../src/app');

async function main() {
  const server = createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;

  try {
    const health = await fetch(`${base}/health`);
    assert.equal(health.status, 200, '/health deve responder 200');
    const healthBody = await health.json();
    assert.equal(healthBody.status, 'ok', '/health deve retornar status ok');

    const list = await fetch(`${base}/api/features`);
    assert.equal(list.status, 200, '/api/features deve responder 200');
    const listBody = await list.json();
    assert.equal(listBody.total, 40, 'devem existir 40 funcionalidades');
    assert.ok(Array.isArray(listBody.items), 'items deve ser um array');

    const ok = await fetch(`${base}/api/features/8`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero: 5 })
    });
    assert.equal(ok.status, 200, 'feature 08 deve responder 200 para numero=5');
    const okBody = await ok.json();
    assert.equal(okBody.result.resultado, 120, '5! deve ser 120');

    const bad = await fetch(`${base}/api/features/8`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ numero: 171 })
    });
    assert.equal(bad.status, 400, 'feature 08 deve responder 400 para numero=171');

    console.log('Smoke test OK: /health, /api/features e feature 08 verificados.');
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error('Smoke test FALHOU:', error.message);
  process.exit(1);
});