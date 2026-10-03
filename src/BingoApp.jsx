import { useMemo, useState } from 'react';

// A lista numerada é a fonte oficial da associação número-palavra.
// Os números sem bolinha física continuam aqui e podem ser selecionados.
const palavrasPorNumero = {
  1: 'Teatro',
  2: 'Sociologia',
  3: 'Arte',
  4: 'Literatura',
  5: 'Ciência',
  6: 'Língua portuguesa',
  7: 'Interdisciplinaridade',
  8: 'Inglês',
  9: 'Palco',
  10: 'Educação física',
  11: 'Cena',
  12: 'Informática',
  13: 'Roteiro',
  14: 'Edificações',
  15: 'Personagem',
  16: 'Eletrotécnica',
  17: 'Elenco',
  18: 'Mecânica',
  19: 'Diretor',
  20: 'Química',
  21: 'Ensaio',
  22: 'Telecomunicações',
  23: 'Figurino',
  24: 'Orientador',
  25: 'Cenário',
  26: 'Tablado',
  27: 'Maquiagem',
  28: 'Cochia',
  29: 'Iluminação',
  30: 'Meio ambiente',
  31: 'Sonoplastia',
  32: 'Sustentabilidade',
  33: 'Bastidores',
  34: 'Sociedade',
  35: 'Plateia',
  36: 'Memória',
  37: 'Espetáculo',
  38: null,
  39: null,
  40: 'Cultura',
  41: null,
  42: null,
  43: null,
  44: null,
  45: null,
  46: 'Dança',
  47: 'Dramaturgia',
  48: 'Libras',
  49: 'Atuação',
  50: 'Criatividade',
  51: 'Improvisação',
  52: 'Imaginação',
  53: 'Expressão corporal',
  54: 'Pesquisa',
  55: 'Voz',
  56: 'IFCE',
  57: 'Gesto',
  58: 'Experimento',
  59: 'Movimento',
  60: 'Conhecimento',
  61: 'Monólogo',
  62: 'Aprendizagem',
  63: 'Diálogo',
  64: 'JAC',
  65: 'Comédia',
  66: 'Planejamento',
  67: 'Tragédia',
  68: 'Organização',
  69: 'Narrativa',
  70: 'Comunicação',
  71: 'Matemática',
  72: 'Autonomia',
  73: 'Física',
  74: 'Protagonismo',
  75: 'Pensamento crítico',
  76: 'Biologia',
  77: 'Emoção',
  78: 'História',
  79: 'Transformação',
  80: 'Geografia',
};

const numeros = Array.from({ length: 80 }, (_, indice) => indice + 1);
const numerosSemBolinha = new Set([38, 39, 41, 42, 43, 44, 45]);

export default function BingoApp() {
  const [sorteados, setSorteados] = useState([]);
  const ultimoNumero = sorteados.at(-1) ?? null;

  const historicoRecente = useMemo(() => [...sorteados].reverse(), [sorteados]);

  function selecionarNumero(numero) {
    if (sorteados.includes(numero)) return;
    setSorteados((anteriores) => [...anteriores, numero]);
  }

  function desfazerUltimo() {
    setSorteados((anteriores) => anteriores.slice(0, -1));
  }

  function limparSorteio() {
    setSorteados([]);
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
            <p className="eyebrow">Jornada de Arte e Cultura</p>
            <h1>Bingo da JAC</h1>
          </div>
        </div>
        <div className="topbar-actions">
          <span className="counter"><strong>{sorteados.length}</strong> de 80 chamadas</span>
          <button className="button button-quiet" onClick={alternarTelaCheia}>
            Tela cheia
          </button>
        </div>
      </header>

      <section className="stage" aria-live="polite" aria-atomic="true">
        <div className="stage-label">Número chamado</div>
        {ultimoNumero === null ? (
          <>
            <div className="draw-word draw-placeholder">Pronto para começar?</div>
            <p className="draw-hint">Clique no número que saiu no bingo.</p>
          </>
        ) : (
          <>
            <div className="draw-number">{String(ultimoNumero).padStart(2, '0')}</div>
            <div className="draw-word">{palavrasPorNumero[ultimoNumero]?.toLocaleUpperCase('pt-BR')}</div>
            <p className="draw-hint">Número {ultimoNumero} • palavra da cartela</p>
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
            <div className="legend"><span className="legend-dot" /> já chamado</div>
          </div>

          <div className="number-grid">
            {numeros.map((numero) => {
              const foiSorteado = sorteados.includes(numero);
              const semBolinha = numerosSemBolinha.has(numero);
              return (
                <button
                  key={numero}
                  className={`number-button${foiSorteado ? ' is-drawn' : ''}${semBolinha ? ' has-no-ball' : ''}`}
                  onClick={() => selecionarNumero(numero)}
                  aria-pressed={foiSorteado}
                  aria-label={`${numero}: ${palavrasPorNumero[numero] ?? 'sem bolinha física'}${foiSorteado ? ', já chamado' : ''}`}
                  title={semBolinha ? `${numero} — sem bolinha física` : `${numero} — ${palavrasPorNumero[numero]}`}
                >
                  {numero}
                </button>
              );
            })}
          </div>
          <p className="note">Os números 38, 39 e 41 a 45 estão sem bolinha física, mas continuam disponíveis no painel.</p>

          <div className="operator-actions">
            <button className="button button-quiet" onClick={desfazerUltimo} disabled={sorteados.length === 0}>
              Desfazer última chamada
            </button>
            <button className="button button-danger" onClick={limparSorteio} disabled={sorteados.length === 0}>
              Reiniciar bingo
            </button>
          </div>
        </section>

        <aside className="history-panel" aria-labelledby="history-heading">
          <div className="section-heading history-heading">
            <div>
              <p className="eyebrow">Para conferir</p>
              <h2 id="history-heading">Chamadas anteriores</h2>
            </div>
            <span className="history-count">{sorteados.length}</span>
          </div>
          {historicoRecente.length === 0 ? (
            <div className="empty-history">As palavras chamadas aparecerão aqui.</div>
          ) : (
            <ol className="history-list">
              {historicoRecente.map((numero) => (
                <li key={numero} className={numero === ultimoNumero ? 'history-item latest' : 'history-item'}>
                  <span className="history-number">{String(numero).padStart(2, '0')}</span>
                  <span className="history-word">{palavrasPorNumero[numero]?.toLocaleUpperCase('pt-BR')}</span>
                </li>
              ))}
            </ol>
          )}
        </aside>
      </div>
      <footer>Uma chamada de cada vez. Divirtam-se! <span aria-hidden="true">✦</span></footer>
    </main>
  );
}
