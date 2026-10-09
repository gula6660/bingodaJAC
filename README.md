# Bingo da JAC

Aplicativo React para conduzir um bingo de 90 perguntas e respostas. O operador clica uma vez no número sorteado para mostrar a pergunta; depois clica novamente no mesmo número para revelar a resposta. O histórico permite rever chamadas.

## Iniciar o projeto

Instale Node.js 20.19+ ou 22.12+, abra esta pasta no Visual Studio Code e execute no terminal:

```bash
npm install
npm run dev
```

Abra o endereço local mostrado no terminal. Para encerrar, pressione `Ctrl+C` no terminal. `npm install` é necessário na primeira vez em cada computador.

## Como jogar pelo painel

1. A pessoa responsável confere o número sorteado e clica nele no painel.
2. A pergunta aparece no telão com uma faixa de cor que indica a dificuldade.
3. Depois que as pessoas procurarem a resposta nas cartelas, o operador clica novamente no mesmo número.
4. A resposta aparece em destaque e o histórico registra se ela já foi revelada.

O painel apresenta as 90 bolinhas. As perguntas dos números 38, 39, 41–45 e 81–90 foram acrescentadas nesta atualização; inclua essas respostas nas cartelas.

## Onde editar

- `src/perguntas.js`: pergunta, resposta e dificuldade de cada número.
- `src/BingoApp.jsx`: cliques, revelação de resposta, histórico e controles.
- `src/styles.css`: modo claro, cores e adaptação para celular ou telão.
- `src/main.jsx`: inicia o React e importa o estilo.

Cada entrada de `perguntas.js` tem esta forma:

```js
1: {
  question: 'Que arte permite que atores contem uma história ao vivo?',
  answer: 'Teatro',
  difficulty: 'facil',
}
```

Use `facil`, `medio` ou `dificil`. Os níveis aparecem em amarelo, azul e vermelho, respectivamente. A lista organizada com as 90 definições está em `lista-perguntas.md`.

## Conferir e preparar a versão de produção

```bash
npm run build
npm run preview
```

O primeiro comando verifica e compila o site para a pasta `dist`; o segundo abre uma prévia local dessa versão. Para abrir o site em outro computador, publique `dist` em uma hospedagem estática ou execute-o em um servidor local. O código do bingo não depende de conexão externa durante o jogo.

## Cartelas

As respostas precisam coincidir com as palavras impressas nas cartelas. Confira especialmente estas cinco mudanças: **18 Mecânica Industrial**, **24 Orientador Artístico-Pedagógico**, **26 JAC**, **34 Produção** e **64 Prêmio**. Acrescente também as novas respostas dos números 38, 39, 41–45 e 81–90 antes de jogar ou imprimir cartelas.
