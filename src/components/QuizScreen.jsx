import { QUESTIONS, SCORING } from "../data/questions";
import { PROFILES } from "../data/profiles";

export default function QuizScreen({
  currentQ,
  setCurrentQ,
  answers,
  setAnswers,
  answeredCount,
  saving,
  onSubmit,
}) {
  const liveTally = Object.entries(answers).reduce(
    (acc, [qId, letter]) => {
      const idx = QUESTIONS.findIndex((q) => q.id === parseInt(qId));
      if (idx < 0) return acc;
      Object.entries(SCORING[idx]).forEach(([col, l]) => {
        if (l === letter) acc[col] = (acc[col] || 0) + 1;
      });
      return acc;
    },
    { D: 0, I: 0, S: 0, C: 0 },
  );

  return (
    <div className="quiz-screen">
      <div className="progress-info">
        <span>
          Question {currentQ + 1} / {QUESTIONS.length}
        </span>
        <span style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {Object.entries(liveTally).map(
            ([k, v]) =>
              v > 0 && (
                <span
                  key={k}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: PROFILES[k].color,
                  }}
                >
                  {k}:{v}
                </span>
              ),
          )}
        </span>
      </div>

      <div className="progress-track">
        {QUESTIONS.map((q, i) => {
          const ans = answers[q.id];
          let col = "rgba(255,255,255,0.07)";
          if (ans) {
            const disc = Object.entries(SCORING[i]).find(
              ([, l]) => l === ans,
            )?.[0];
            if (disc) col = PROFILES[disc].color;
          }
          return (
            <div key={i} className="progress-seg" style={{ background: col }} />
          );
        })}
      </div>

      <div className="question-card" key={currentQ}>
        <div className="question-number">Question {currentQ + 1}</div>
        <div className="question-text">
          Choisissez la paire d'adjectifs qui vous correspond le mieux :
        </div>
        <div className="options-grid">
          {Object.entries(QUESTIONS[currentQ].options).map(([letter, text]) => (
            <button
              key={letter}
              className={`option-btn ${answers[QUESTIONS[currentQ].id] === letter ? "selected" : ""}`}
              onClick={() => {
                const newA = { ...answers, [QUESTIONS[currentQ].id]: letter };
                setAnswers(newA);
                if (currentQ < QUESTIONS.length - 1)
                  setTimeout(() => setCurrentQ((c) => c + 1), 260);
              }}
            >
              <span className="option-letter">{letter}</span>
              <span>{text}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="quiz-nav">
        <button
          className="btn-ghost"
          onClick={() => setCurrentQ((c) => c - 1)}
          disabled={currentQ === 0}
        >
          ← Précédent
        </button>
        <div className="q-dots">
          {QUESTIONS.map((q, i) => (
            <div
              key={i}
              className={`q-dot ${answers[q.id] ? "answered" : ""} ${i === currentQ ? "current" : ""}`}
              onClick={() => setCurrentQ(i)}
            />
          ))}
        </div>
        {currentQ < QUESTIONS.length - 1 ? (
          <button
            className="btn-ghost"
            onClick={() => setCurrentQ((c) => c + 1)}
            disabled={!answers[QUESTIONS[currentQ].id]}
          >
            Suivant →
          </button>
        ) : (
          <button
            className="btn-start"
            style={{ padding: "11px 22px", width: "auto" }}
            onClick={onSubmit}
            disabled={answeredCount < QUESTIONS.length}
          >
            {saving ? "Enregistrement..." : "Voir mes résultats ✨"}
          </button>
        )}
      </div>
    </div>
  );
}
