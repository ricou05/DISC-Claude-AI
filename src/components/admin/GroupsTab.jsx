import { PROFILES } from "../../data/profiles";
import { fullName } from "../../utils/helpers";
import DonutChart from "../DonutChart";

export default function GroupsTab({
  groups,
  participants,
  groupMembers,
  selectedGroup,
  setSelectedGroup,
  editingName,
  setEditingName,
  editingNameVal,
  setEditingNameVal,
  showNewGroup,
  setShowNewGroup,
  newGroupName,
  setNewGroupName,
  onCreateGroup,
  onRenameGroup,
  onDeleteGroupTarget,
  onAssignGroup,
  onShareParticipant,
  setViewingResult,
}) {
  return (
    <div className="groups-layout">
      <nav className="groups-sidebar" aria-label="Liste des groupes">
        {groups.map((g) => (
          <div
            key={g.id}
            className={`group-sidebar-item ${selectedGroup?.id === g.id ? "active" : ""}`}
            role="button"
            tabIndex={0}
            aria-selected={selectedGroup?.id === g.id}
            onClick={() => {
              setSelectedGroup(g);
              setEditingName(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setSelectedGroup(g);
                setEditingName(false);
              }
            }}
          >
            <div>
              <div className="group-sidebar-name">{g.name}</div>
              <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>
                {groupMembers(g.id).length} membre
                {groupMembers(g.id).length > 1 ? "s" : ""}
              </div>
            </div>
            <span className="group-sidebar-count">
              {groupMembers(g.id).length}
            </span>
          </div>
        ))}
        {showNewGroup ? (
          <div className="new-group-form">
            <input
              autoFocus
              className="new-group-input"
              placeholder="Nom du groupe..."
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onCreateGroup();
                if (e.key === "Escape") {
                  setShowNewGroup(false);
                  setNewGroupName("");
                }
              }}
              aria-label="Nom du nouveau groupe"
            />
            <div style={{ display: "flex", gap: 6 }}>
              <button
                className="btn-sm yellow"
                onClick={onCreateGroup}
                style={{ flex: 1 }}
              >
                Cr&eacute;er
              </button>
              <button
                className="btn-sm ghost"
                onClick={() => {
                  setShowNewGroup(false);
                  setNewGroupName("");
                }}
                aria-label="Annuler la cr\u00e9ation"
              >
                &#x2715;
              </button>
            </div>
          </div>
        ) : (
          <button
            className="group-add-btn"
            onClick={() => setShowNewGroup(true)}
          >
            + Nouveau groupe
          </button>
        )}
      </nav>

      <div className="group-detail" role="region" aria-label="D\u00e9tail du groupe">
        {!selectedGroup ? (
          <div className="empty">
            <span style={{ fontSize: 40 }}>&#x1F465;</span>
            <p>
              S&eacute;lectionnez un groupe
              <br />
              ou cr&eacute;ez-en un nouveau.
            </p>
          </div>
        ) : (
          <>
            <div className="group-detail-header">
              {editingName ? (
                <>
                  <input
                    className="group-name-edit"
                    autoFocus
                    value={editingNameVal}
                    onChange={(e) => setEditingNameVal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter")
                        onRenameGroup(selectedGroup.id, editingNameVal);
                      if (e.key === "Escape") setEditingName(false);
                    }}
                    aria-label="Nouveau nom du groupe"
                  />
                  <button
                    className="btn-sm yellow"
                    onClick={() =>
                      onRenameGroup(selectedGroup.id, editingNameVal)
                    }
                    aria-label="Valider le renommage"
                  >
                    &#x2713;
                  </button>
                  <button
                    className="btn-sm ghost"
                    onClick={() => setEditingName(false)}
                    aria-label="Annuler le renommage"
                  >
                    &#x2715;
                  </button>
                </>
              ) : (
                <>
                  <div className="group-detail-name">{selectedGroup.name}</div>
                  <button
                    className="btn-sm ghost"
                    onClick={() => {
                      setEditingName(true);
                      setEditingNameVal(selectedGroup.name);
                    }}
                  >
                    &#x270F;&#xFE0F; Renommer
                  </button>
                  <button
                    className="btn-sm danger"
                    onClick={() => onDeleteGroupTarget(selectedGroup.id)}
                  >
                    &#x1F5D1; Supprimer
                  </button>
                </>
              )}
            </div>
            {groupMembers(selectedGroup.id).length > 0 && (
              <div className="group-disc-summary">
                <DonutChart
                  data={groupMembers(selectedGroup.id).reduce(
                    (acc, p) => {
                      acc[p.dominant] = (acc[p.dominant] || 0) + 1;
                      return acc;
                    },
                    { D: 0, I: 0, S: 0, C: 0 },
                  )}
                />
                <div>
                  <div className="group-disc-title">R&eacute;partition DISC</div>
                  <div
                    className="mini-stats-row"
                    style={{ marginBottom: 0 }}
                  >
                    {Object.entries(PROFILES).map(([k, p]) => {
                      const c = groupMembers(selectedGroup.id).filter(
                        (m) => m.dominant === k,
                      ).length;
                      const pct = Math.round(
                        (c / groupMembers(selectedGroup.id).length) * 100,
                      );
                      return (
                        c > 0 && (
                          <div key={k} className="group-disc-bar-row">
                            <span
                              className="mini-chip-stat"
                              style={{
                                background: p.bg,
                                color: p.color,
                                border: `1px solid ${p.color}30`,
                                minWidth: 36,
                                textAlign: "center",
                              }}
                            >
                              {p.disc} {c}
                            </span>
                            <div className="group-disc-bar-track">
                              <div
                                className="group-disc-bar-fill"
                                style={{
                                  background: p.color,
                                  width: `${pct}%`,
                                }}
                              />
                            </div>
                            <span className="group-disc-bar-pct">{pct}%</span>
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            {groupMembers(selectedGroup.id).length === 0 ? (
              <div className="empty" style={{ padding: "30px 0" }}>
                <p style={{ color: "#555" }}>
                  Aucun membre dans ce groupe pour l&apos;instant.
                </p>
              </div>
            ) : (
              <table className="members-table">
                <thead>
                  <tr>
                    <th scope="col">Participant</th>
                    <th scope="col">Profil</th>
                    <th scope="col">Scores</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {groupMembers(selectedGroup.id).map((p) => {
                    const prof = PROFILES[p.dominant];
                    return (
                      <tr key={p.id}>
                        <td>
                          <div style={{ fontWeight: 600, color: "#fff" }}>
                            {fullName(p)}
                          </div>
                          <div style={{ fontSize: 11, color: "#444" }}>
                            {new Date(p.created_at).toLocaleDateString(
                              "fr-FR",
                            )}
                          </div>
                        </td>
                        <td>
                          <span
                            className="pill"
                            style={{
                              background: prof.color,
                              color: "#fff",
                            }}
                          >
                            {prof.disc} — {prof.label}
                          </span>
                        </td>
                        <td>
                          <div
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
                        </td>
                        <td>
                          <div className="row-actions">
                            <button
                              className="btn-icon view"
                              onClick={() => setViewingResult(p)}
                              title="Voir r&eacute;sultat"
                              aria-label={`Voir le r\u00e9sultat de ${fullName(p)}`}
                            >
                              &#x1F441;
                            </button>
                            <button
                              className="btn-icon share"
                              onClick={() => onShareParticipant(p)}
                              title="Partager"
                              aria-label={`Partager le r\u00e9sultat de ${fullName(p)}`}
                            >
                              &#x1F517;
                            </button>
                            <button
                              className="btn-icon del"
                              onClick={() => onAssignGroup(p.id, null)}
                              title="Retirer du groupe"
                              aria-label={`Retirer ${fullName(p)} du groupe`}
                            >
                              &#x2715;
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
}
