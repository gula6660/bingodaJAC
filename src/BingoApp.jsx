import { useState } from 'react';
import { numeros, numerosSemBolinha, perguntas } from './perguntas.js';

const dificuldadeLabel = {
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil',
};

export default function BingoApp() {
  const [chamadas, setChamadas] = useState([]);
  const [numeroAtual, setNumeroAtual] = useState(null);
  const chamadaAtual = chamadas.find((chamada) => chamada.numero === numeroAtual);
  const perguntaAtual = numeroAtual === null ? null : perguntas[numeroAtual];

  function clicarNumero(numero) {
    const chamadaExistente = chamadas.find((chamada) => chamada.numero === numero);

    if (chamadaExistente) {
      // Se a pergunta atual for clicada outra vez, revela a resposta.
      if (numeroAtual === numero && !chamadaExistente.respostaVisivel) {
        setChamadas((anteriores) => anteriores.map((chamada) => (
          chamada.numero === numero ? { ...chamada, respostaVisivel: true } : chamada
        )));
      } else if (numeroAtual !== numero) {
        // Permite voltar a uma chamada anterior pelo histórico do painel.
        setNumeroAtual(numero);
      }
      return;
    }

    setChamadas((anteriores) => [...anteriores, { numero, respostaVisivel: false }]);
    setNumeroAtual(numero);
  }

  function desfazerUltimaChamada() {
    const anteriores = chamadas.slice(0, -1);
    setChamadas(anteriores);
    setNumeroAtual(anteriores.at(-1)?.numero ?? null);
  }

  function reiniciarBingo() {
    setChamadas([]);
    setNumeroAtual(null);
  }

  async function alternarTelaCheia() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">J</span>
          <div>
            <p className="eyebrow">Mostra Interdisciplinar Juventude, Arte e Ciência</p>
            <h1>Bingo da JAC</h1>
          </div>
        </div>
        <div className="topbar-actions">
          <span className="counter"><strong>{chamadas.length}</strong> de {numeros.length} perguntas</span>
          <button className="button button-secondary" onClick={alternarTelaCheia}>Tela cheia</button>
        </div>
      </header>

      <section className={`stage${perguntaAtual ? ` level-border-${perguntaAtual.difficulty}` : ''}`} aria-live="polite" aria-atomic="true">
        {!perguntaAtual ? (
          <div className="stage-empty">
            <span className="stage-icon" aria-hidden="true">?</span>
            <p className="stage-label">Pronto para começar?</p>
            <h2>Selecione o número que saiu</h2>
            <p className="draw-hint">A pergunta aparecerá aqui. Clique novamente no mesmo número para revelar a resposta.</p>
          </div>
        ) : (
          <>
            <div className="stage-meta">
              <span className="stage-label">Pergunta {String(numeroAtual).padStart(2, '0')}</span>
              <span className={`difficulty-pill level-${perguntaAtual.difficulty}`}>
                {dificuldadeLabel[perguntaAtual.difficulty]}
              </span>
            </div>
            {chamadaAtual?.respostaVisivel ? (
              <div className="answer-view">
                <p className="answer-kicker">Resposta</p>
                <h2 className="answer-word">{perguntaAtual.answer}</h2>
                <p className="draw-hint">Procurem esta palavra na cartela.</p>
              </div>
            ) : (
              <div className="question-view">
                <p className="question-kicker">Leiam a definição</p>
                <h2 className="question-text">{perguntaAtual.question}</h2>
                <p className="draw-hint">Quando todos tiverem conferido a cartela, clique novamente no botão {numeroAtual}.</p>
              </div>
            )}
          </>
        )}
      </section>

      <div className="content-grid">
        <section className="number-panel" aria-labelledby="numbers-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Painel do operador</p>
              <h2 id="numbers-heading">Clique no número sorteado</h2>
            </div>
            <div className="legend" aria-label="Cores das dificuldades">
              <span><i className="legend-dot level-facil" />Fácil</span>
              <span><i className="legend-dot level-medio" />Médio</span>
              <span><i className="legend-dot level-dificil" />Difícil</span>
            </div>
          </div>

          <div className="number-grid">
            {Array.from({ length: 80 }, (_, index) => index + 1).map((numero) => {
              const pergunta = perguntas[numero];
              const semBolinha = numerosSemBolinha.includes(numero);
              const foiSorteado = chamadas.some((chamada) => chamada.numero === numero);
              const estaAtual = numeroAtual === numero;
              return (
                <button
                  key={numero}
                  className={`number-button${pergunta ? ` level-${pergunta.difficulty}` : ''}${foiSorteado ? ' is-drawn' : ''}${estaAtual ? ' is-current' : ''}${semBolinha ? ' is-missing' : ''}`}
                  onClick={() => clicarNumero(numero)}
                  disabled={semBolinha}
                  aria-pressed={estaAtual}
                  aria-label={semBolinha ? `${numero}, bolinha ausente` : `${numero}, pergunta ${dificuldadeLabel[pergunta.difficulty]}${foiSorteado ? ', já sorteado' : ''}`}
                  title={semBolinha ? `${numero} — bolinha ausente` : `${numero} — ${dificuldadeLabel[pergunta.difficulty]}${estaAtual && !chamadaAtual?.respostaVisivel ? ' — clique novamente para revelar a resposta' : ''}`}
                >
                  {numero}
                </button>
              );
            })}
          </div>
          <p className="note">As bolinhas 38, 39 e 41 a 45 estão ausentes e aparecem desativadas. O jogo tem {numeros.length} perguntas para as bolinhas disponíveis.</p>

          <div className="operator-actions">
            <button className="button button-secondary" onClick={desfazerUltimaChamada} disabled={chamadas.length === 0}>Desfazer última chamada</button>
            <button className="button button-danger" onClick={reiniciarBingo} disabled={chamadas.length === 0}>Reiniciar bingo</button>
          </div>
        </section>

        <aside className="history-panel" aria-labelledby="history-heading">
          <div className="section-heading history-heading">
            <div>
              <p className="eyebrow">Para conferir</p>
              <h2 id="history-heading">Histórico</h2>
            </div>
            <span className="history-count">{chamadas.length}</span>
          </div>
          {chamadas.length === 0 ? (
            <div className="empty-history">As perguntas chamadas aparecerão aqui.</div>
          ) : (
            <ol className="history-list">
              {[...chamadas].reverse().map(({ numero, respostaVisivel }) => (
                <li key={numero}>
                  <button className={`history-item${numero === numeroAtual ? ' latest' : ''}`} onClick={() => setNumeroAtual(numero)}>
                    <span className="history-number">{String(numero).padStart(2, '0')}</span>
                    <span className="history-copy">
                      <span className="history-word">{respostaVisivel ? perguntas[numero].answer : perguntas[numero].question}</span>
                      <span className="history-status">{respostaVisivel ? 'Resposta revelada' : 'Pergunta • resposta pendente'}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </div>
      <footer><span className="footer-mark">JAC</span> Pergunta, procure a palavra e divirta-se!</footer>
    </main>
  );
}
