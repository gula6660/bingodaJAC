
# Bingo da JAC — guia passo a passo

Aplicativo React para projetar as chamadas de um bingo. O operador seleciona o número que saiu; o telão mostra o número e sua palavra, destaca o botão e registra a chamada no histórico.

## Associação usada

O programa segue a lista numerada fornecida. Isso resolve uma divergência do exemplo: na lista, **15 = Personagem** e **29 = Iluminação**. Portanto, a tela mostrará **15 — PERSONAGEM**. Os números 38, 39 e 41 a 45 continuam no painel, embora estejam sem bolinha física.

## Etapa 1 — preparar o computador

Instale Node.js (versão LTS) e um editor como Visual Studio Code. Depois, abra a pasta `bingo-jac` no VS Code e abra um terminal integrado.

Confira a instalação:

```bash
node --version
npm --version
```

## Etapa 2 — instalar e iniciar o projeto

No terminal, dentro da pasta `bingo-jac`, execute:

```bash
npm install
npm run dev
```

Abra no navegador o endereço local mostrado pelo Vite. Para encerrar o servidor, volte ao terminal e pressione `Ctrl+C`.

## Etapa 3 — entender os arquivos

- `index.html`: página que recebe o aplicativo.
- `src/main.jsx`: ponto de entrada; cria o React e carrega o CSS.
- `src/BingoApp.jsx`: associação número-palavra, estado do sorteio e componentes da tela.
- `src/styles.css`: cores, tamanhos, organização e adaptação para telas menores.
- `package.json`: dependências e comandos do projeto.

## Etapa 4 — entender a associação

Em `BingoApp.jsx`, `palavrasPorNumero` associa cada número à palavra. Exemplo:

```js
15: 'Personagem',
29: 'Iluminação',
```

O valor `null` identifica as bolinhas ausentes. Não apague esses números: eles ainda precisam aparecer no painel para que a associação continue cobrindo de 1 a 80.

## Etapa 5 — entender o clique e o histórico

`useState([])` guarda os números já chamados. Quando alguém clica, `selecionarNumero` acrescenta o número à lista. Se ele já tiver sido chamado, a função ignora o clique repetido. A interface usa essa mesma lista para destacar os botões e mostrar as chamadas anteriores.

Os controles “Desfazer última chamada” e “Reiniciar bingo” corrigem um clique acidental ou iniciam uma nova partida.

## Etapa 6 — usar no evento

Conecte o computador ao telão, abra o endereço local no navegador e clique em “Tela cheia”. Uma pessoa confere a bolinha e clica no mesmo número do painel. A chamada grande mostra número e palavra juntos; o histórico fica ao lado ou abaixo, conforme o tamanho da tela.

## Etapa 7 — preparar para outro computador

No computador que tem internet, dentro da pasta do projeto, execute:

```bash
npm run build
```

O resultado será criado em `dist/`. Para testar essa versão no próprio computador:

```bash
npm run preview
```

Para usar em outro computador **sem instalar Node.js**, copie a pasta `dist` para um servidor estático local ou hospede-a em um serviço de páginas estáticas. Para abrir sem internet e sem servidor, a próxima etapa do projeto pode empacotar o app como programa instalável (por exemplo, com Electron ou Tauri). O modo atual já funciona em navegadores modernos; a fonte alternativa garante legibilidade se a fonte online não carregar.

## Observação sobre funcionamento offline

As funções do bingo não precisam de internet depois que o app está servido localmente. O CSS tenta carregar fontes do Google Fonts; se a rede estiver indisponível, usa fontes instaladas no sistema. Se a exigência for abrir o app completamente offline com um clique, sem servidor, será necessário fazer a etapa de empacotamento para desktop.

