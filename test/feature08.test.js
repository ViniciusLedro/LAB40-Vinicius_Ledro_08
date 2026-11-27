const test = require('node:test');
const assert = require('node:assert/strict');
const feature = require('../src/features/feature08');

test('calcula fatoriais de referência e fronteira', () => {
  assert.equal(feature.execute({ numero: 5 }).resultado, 120);
  assert.equal(feature.execute({ numero: 0 }).resultado, 1);
  assert.equal(feature.execute({ numero: 1 }).resultado, 1);
});

test('aceita limite superior 170', () => {
  assert.equal(
    feature.execute({ numero: 170 }).resultado,
    170 * feature.execute({ numero: 169 }).resultado
  );
});

test('rejeita negativo, decimal e acima de 170', () => {
  for (const numero of [-1, 2.2, 171, '5']) {
    assert.throws(() => feature.execute({ numero }), { name: 'Error' });
  }
});