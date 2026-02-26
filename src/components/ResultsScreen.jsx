import FullResult from "./FullResult";

export default function ResultsScreen({
  view,
  name,
  lastname,
  scores,
  dominant,
  saving,
  selectedGroupId,
  sharedResult,
  onShare,
  onRestart,
}) {
  const participant =
    view === "results" ? { name, lastname, scores, dominant } : sharedResult;

  return (
    <div className="results-screen">
      {view === "results" && saving && (
        <div className="saving-msg">
          ✓ Résultat enregistré{selectedGroupId ? " dans votre groupe" : ""}
        </div>
      )}
      {view === "shared" && (
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <span
            style={{
              fontSize: 11,
              color: "#555",
              letterSpacing: 2,
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Profil partagé
          </span>
        </div>
      )}
      <FullResult participant={participant} />
      <div className="share-bar">
        {view === "results" && (
          <button className="btn-share" onClick={onShare}>
            🔗 Partager mon profil
          </button>
        )}
        {view === "shared" && (
          <button
            className="btn-start"
            style={{ padding: "12px 24px" }}
            onClick={onRestart}
          >
            Passer le test à mon tour →
          </button>
        )}
        <button className="btn-outline" onClick={onRestart}>
          Recommencer
        </button>
      </div>
    </div>
  );
}
