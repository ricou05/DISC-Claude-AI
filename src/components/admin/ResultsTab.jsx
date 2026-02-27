import { PROFILES } from "../../data/profiles";
import { fullName } from "../../utils/helpers";

export default function ResultsTab({
  participants,
  groups,
  loadingP,
  onRefresh,
  onDeleteTarget,
  onAssignGroup,
  onShareParticipant,
  setViewingResult,
}) {
  return (
    <>
      <div className="results-toolbar">
        <div style={{ fontSize: 13, color: "#555" }}>
          Assignez un groupe via le menu · &#x1F441; voir · &#x1F517; partager
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-sm ghost" onClick={onRefresh}>
            &#x21BB; Actualiser
          </button>
          {participants.length > 0 && (
            <button
              className="btn-sm danger"
              onClick={() => onDeleteTarget("all")}
            >
              &#x1F5D1; Tout supprimer
            </button>
          )}
        </div>
      </div>
      {loadingP ? (
        <div className="empty" role="status">
          <p>Chargement...</p>
        </div>
      ) : participants.length === 0 ? (
        <div className="empty">
          <span style={{ fontSize: 40 }}>&#x1F4ED;</span>
          <p>Aucun r&eacute;sultat.</p>
        </div>
      ) : (
        <div className="rt-wrap" role="table" aria-label="Liste des participants">
          <div className="rt-head" role="row">
            <span role="columnheader">Participant</span>
            <span className="col-grp" role="columnheader">Groupe</span>
            <span className="col-sc" role="columnheader">Scores</span>
            <span role="columnheader">Profil</span>
            <span role="columnheader">Actions</span>
          </div>
          {participants.map((p) => {
            const prof = PROFILES[p.dominant];
            return (
              <div key={p.id} className="rt-row" role="row">
                <div role="cell">
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#fff",
                      fontSize: 14,
                    }}
                  >
                    {fullName(p)}
                  </div>
                  <div style={{ fontSize: 11, color: "#444" }}>
                    {new Date(p.created_at).toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
                <div className="rt-grp" role="cell">
                  <select
                    className="assign-select"
                    value={p.team_id || ""}
                    onChange={(e) =>
                      onAssignGroup(p.id, e.target.value || null)
                    }
                    aria-label={`Groupe de ${fullName(p)}`}
                  >
                    <option value="">— Sans groupe —</option>
                    {groups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="rt-sc"
                  role="cell"
                  style={{
                    display: "flex",
                    gap: 4,
                    flexWrap: "wrap",
                  }}
                >
                  {p.scores &&
                    Object.entries(PROFILES).map(([k, pr]) => (
                      <span
                        key={k}
                        className="mini-chip"
                        style={{
                          background: pr.color + "18",
                          color: pr.color,
                        }}
                      >
                        {k}
                        {p.scores[k]}
                      </span>
                    ))}
                </div>
                <div role="cell">
                  <span
                    className="pill"
                    style={{ background: prof.color, color: "#fff" }}
                  >
                    {prof.disc} — {prof.label}
                  </span>
                </div>
                <div className="row-actions" role="cell">
                  <button
                    className="btn-icon view"
                    onClick={() => setViewingResult(p)}
                    aria-label={`Voir le r\u00e9sultat de ${fullName(p)}`}
                  >
                    &#x1F441;
                  </button>
                  <button
                    className="btn-icon share"
                    onClick={() => onShareParticipant(p)}
                    aria-label={`Partager le r\u00e9sultat de ${fullName(p)}`}
                  >
                    &#x1F517;
                  </button>
                  <button
                    className="btn-icon del"
                    onClick={() => onDeleteTarget(p.id)}
                    aria-label={`Supprimer ${fullName(p)}`}
                  >
                    &#x2715;
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
