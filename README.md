# LAB40 - Feature 08: Calculadora de fatorial

Aluno: Vinicius Ledro | Módulo: 08

## Instalação e execução

    npm install
    npm start

A aplicação abre em http://localhost:3000. O endpoint /health indica que o servidor está ativo.

## Testes automatizados

    npm test
    npm run test:spec   (relatório detalhado)

Cobrem: caso típico (5 → 120), fronteiras (0, 1 e 170) e entradas inválidas (-1, 2.2, 171 e string).

## Lint

    npm run lint

Configurado com ESLint (eslint.config.js). Resultado: sem erros nem avisos.

## Auditoria de dependências

    npm audit --audit-level=high

Resultado observado: `found 0 vulnerabilities`. Nenhuma ação foi necessária.

## Roteiro de testes manuais

1. Executar `npm start` e abrir http://localhost:3000.
2. Abrir http://localhost:3000/health e confirmar o JSON com status ok.
3. Na interface, selecionar o cartão 08, usar `{ "numero": 5 }` e confirmar `resultado: 120`.
4. Pela API, enviar POST em /api/features/8 com `{ "numero": 0 }` e confirmar `resultado: 1`.
5. Pela API, enviar `{ "numero": 171 }` e confirmar erro 400 com a mensagem "Informe inteiro entre 0 e 170."
6. Confirmar que o servidor continua respondendo em /health após o erro.

## Decisões técnicas

- Entrada validada com Number.isInteger e limite de 0 a 170.
- O limite 170 existe porque 171! excede o máximo do tipo Number e viraria Infinity.
- Laço iterativo em vez de recursão, como orienta o enunciado.
- Erros lançados com `throw new Error(...)` e mensagem clara.