// Funcionalidade 08: Calculadora de fatorial.
// Objetivo: Calcula o fatorial de um inteiro não negativo.
// Exemplo de entrada: { numero: 5 }
// Regras: numero deve ser inteiro entre 0 e 170 (0! = 1).
// Acima de 170 o resultado excede o limite do tipo Number (vira Infinity).

const implemented = true;

function execute(input) {
  const { numero } = input || {};

  if (!Number.isInteger(numero) || numero < 0 || numero > 170) {
    throw new Error("Informe inteiro entre 0 e 170.");
  }

  let resultado = 1;
  for (let i = 2; i <= numero; i++) {
    resultado *= i;
  }

  return { resultado };
}

// Mantém o contrato de integração utilizado pela API central.
module.exports = {
  id: 8,
  name: "Calculadora de fatorial",
  description: "Calcula o fatorial de um inteiro não negativo.",
  implemented,
  execute
};