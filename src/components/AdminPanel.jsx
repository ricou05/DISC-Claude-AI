import { PROFILES } from "../data/profiles";
import { fullName, exportCSV } from "../utils/helpers";
import DonutChart from "./DonutChart";
import FullResult from "./FullResult";

export default function AdminPanel({
  participants,
  groups,
  loadingP,
  error,
  adminTab,
  setAdminTab,
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
  viewingResult,
  setViewingResult,
  onLogout,
  onRefresh,
  onDeleteTarget,
  onDeleteGroupTarget,
  onAssignGroup,
  onCreateGroup,
  onRenameGroup,
  onShareParticipant,
}) {
  const groupMembers = (gId) => participants.filter((p) => p.team_id === gId);
  const unassigned = participants.filter((p) => !p.team_id);

  return (
    <div className="admin-screen">
      {/* Top bar */}
      <div className="admin-top">
        <div>
          <h2>🔒 Portail Admin</h2>
          <p>
            {participants.length} participant
            {participants.length > 1 ? "s" : ""} · {groups.length} groupe
            {groups.length > 1 ? "s" : ""}
          </p>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            className="btn-sm green"
            onClick={() => exportCSV(participants, groups)}
          >
            ⬇ Export CSV
          </button>
          <button className="btn-sm purple" onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        {[
          { id: "overview", label: "📊 Vue d'ensemble" },
          { id: "groups", label: "👥 Groupes" },
          { id: "results", label: "📋 Tous les résultats" },
        ].map((t) => (
          <button
            key={t.id}
            className={`admin-tab ${adminTab === t.id ? "active" : ""}`}
            onClick={() => setAdminTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <div className="error-msg">⚠️ {error}</div>}

      {/* Overview tab */}
      {adminTab === "overview" && (
        <>
          <div className="kpi-row">
            <DonutChart
              data={participants.reduce(
                (acc, p) => {
                  acc[p.dominant] = (acc[p.dominant] || 0) + 1;
                  return acc;
                },
                { D: 0, I: 0, S: 0, C: 0 },
              )}
            />
            <div className="kpi-stats">
              {Object.entries(PROFILES).map(([key, p]) => {
                const count = participants.filter(
                  (pt) => pt.dominant === key,
                ).length;
                return (
                  <div
                    key={key}
                    className="stat-card"
                    style={{
                      background: p.bg,
                      border: `1px solid ${p.color}30`,
                      padding: "14px",
                    }}
                  >
                    <div
                      className="stat-num"
                      style={{ color: p.color, fontSize: 28 }}
                    >
                      {count}
                    </div>
                    <div className="stat-label" style={{ color: p.color }}>
                      {p.disc} · {p.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))",
              gap: 12,
              marginTop: 8,
            }}
          >
            {groups.map((g) => {
              const members = groupMembers(g.id);
              const tally = members.reduce(
                (acc, p) => {
                  acc[p.dominant] = (acc[p.dominant] || 0) + 1;
                  return acc;
                },
                { D: 0, I: 0, S: 0, C: 0 },
              );
              return (
                <div
                  key={g.id}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 14,
                    padding: 18,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setAdminTab("groups");
                    setSelectedGroup(g);
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      color: "#fff",
                      marginBottom: 2,
                    }}
                  >
                    {g.name}
                  </div>
                  <div
                    style={{ fontSize: 12, color: "#555", marginBottom: 14 }}
                  >
                    {members.length} membre{members.length > 1 ? "s" : ""}
                  </div>
                  {members.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <DonutChart data={tally} />
                      <div style={{ flex: 1 }}>
                        {Object.entries(PROFILES).map(([k, p]) => {
                          const c = tally[k] || 0;
                          const pct = Math.round(
                            (c / members.length) * 100,
                          );
                          return (
                            c > 0 && (
                              <div
                                key={k}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 6,
                                  marginBottom: 5,
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: 11,
                                    fontWeight: 700,
                                    color: p.color,
                                    width: 20,
                                  }}
                                >
                                  {p.disc}
                                </span>
                                <div
                                  style={{
                                    flex: 1,
                                    height: 5,
                                    background: "rgba(255,255,255,0.05)",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                  }}
                                >
                                  <div
                                    style={{
                                      height: "100%",
                                      borderRadius: 3,
                                      background: p.color,
                                      width: `${pct}%`,
                                    }}
                                  />
                                </div>
                                <span
                                  style={{
                                    fontSize: 10,
                                    color: "#555",
                                    width: 28,
                                    textAlign: "right",
                                  }}
                                >
                                  {c} ({pct}%)
                                </span>
                              </div>
                            )
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <span style={{ fontSize: 12, color: "#333" }}>Vide</span>
                  )}
                </div>
              );
            })}
            {unassigned.length > 0 && (
              <div
                style={{
                  background: "rgba(255,255,255,0.015)",
                  border: "1px dashed rgba(255,255,255,0.08)",
                  borderRadius: 14,
                  padding: 18,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 15,
                    color: "#555",
                    marginBottom: 4,
                  }}
                >
                  Sans groupe
                </div>
                <div style={{ fontSize: 12, color: "#444" }}>
                  {unassigned.length} participant
                  {unassigned.length > 1 ? "s" : ""}
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Groups tab */}
      {adminTab === "groups" && (
        <div className="groups-layout">
          <div className="groups-sidebar">
            {groups.map((g) => (
              <div
                key={g.id}
                className={`group-sidebar-item ${selectedGroup?.id === g.id ? "active" : ""}`}
                onClick={() => {
                  setSelectedGroup(g);
                  setEditingName(false);
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
              <div
                style={{
                  padding: "10px 12px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(245,216,0,0.3)",
                  borderRadius: 12,
                }}
              >
                <input
                  autoFocus
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#fff",
                    fontSize: 14,
                    fontFamily: "inherit",
                    marginBottom: 8,
                  }}
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
                />
                <div style={{ display: "flex", gap: 6 }}>
                  <button
                    className="btn-sm yellow"
                    onClick={onCreateGroup}
                    style={{ flex: 1 }}
                  >
                    Créer
                  </button>
                  <button
                    className="btn-sm ghost"
                    onClick={() => {
                      setShowNewGroup(false);
                      setNewGroupName("");
                    }}
                  >
                    ✕
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
          </div>

          <div className="group-detail">
            {!selectedGroup ? (
              <div className="empty">
                <span style={{ fontSize: 40 }}>👥</span>
                <p>
                  Sélectionnez un groupe
                  <br />
                  ou créez-en un nouveau.
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
                      />
                      <button
                        className="btn-sm yellow"
                        onClick={() =>
                          onRenameGroup(selectedGroup.id, editingNameVal)
                        }
                      >
                        ✓
                      </button>
                      <button
                        className="btn-sm ghost"
                        onClick={() => setEditingName(false)}
                      >
                        ✕
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="group-detail-name">
                        {selectedGroup.name}
                      </div>
                      <button
                        className="btn-sm ghost"
                        onClick={() => {
                          setEditingName(true);
                          setEditingNameVal(selectedGroup.name);
                        }}
                      >
                        ✏️ Renommer
                      </button>
                      <button
                        className="btn-sm danger"
                        onClick={() => onDeleteGroupTarget(selectedGroup.id)}
                      >
                        🗑 Supprimer
                      </button>
                    </>
                  )}
                </div>
                {groupMembers(selectedGroup.id).length > 0 && (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: 16,
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.07)",
                      borderRadius: 14,
                      padding: 16,
                      marginBottom: 18,
                      alignItems: "center",
                    }}
                  >
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
                      <div
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: 2,
                          textTransform: "uppercase",
                          color: "#333",
                          marginBottom: 10,
                        }}
                      >
                        Répartition DISC
                      </div>
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
                              <div
                                key={k}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  marginBottom: 6,
                                }}
                              >
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
                                <div
                                  style={{
                                    flex: 1,
                                    height: 6,
                                    background: "rgba(255,255,255,0.05)",
                                    borderRadius: 3,
                                    overflow: "hidden",
                                  }}
                                >
                                  <div
                                    style={{
                                      height: "100%",
                                      borderRadius: 3,
                                      background: p.color,
                                      width: `${pct}%`,
                                      transition: "width .8s ease",
                                    }}
                                  />
                                </div>
                                <span
                                  style={{
                                    fontSize: 11,
                                    color: "#555",
                                    width: 32,
                                    textAlign: "right",
                                  }}
                                >
                                  {pct}%
                                </span>
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
                      Aucun membre dans ce groupe pour l'instant.
                    </p>
                  </div>
                ) : (
                  <table className="members-table">
                    <thead>
                      <tr>
                        <th>Participant</th>
                        <th>Profil</th>
                        <th>Scores</th>
                        <th>Actions</th>
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
                                  title="Voir résultat"
                                >
                                  👁
                                </button>
                                <button
                                  className="btn-icon share"
                                  onClick={() => onShareParticipant(p)}
                                  title="Partager"
                                >
                                  🔗
                                </button>
                                <button
                                  className="btn-icon del"
                                  onClick={() => onAssignGroup(p.id, null)}
                                  title="Retirer du groupe"
                                >
                                  ✕
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
      )}

      {/* All results tab */}
      {adminTab === "results" && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            <div style={{ fontSize: 13, color: "#555" }}>
              Assignez un groupe via le menu · 👁 voir · 🔗 partager
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-sm ghost" onClick={onRefresh}>
                ↻ Actualiser
              </button>
              {participants.length > 0 && (
                <button
                  className="btn-sm danger"
                  onClick={() => onDeleteTarget("all")}
                >
                  🗑 Tout supprimer
                </button>
              )}
            </div>
          </div>
          {loadingP ? (
            <div className="empty">
              <p>Chargement...</p>
            </div>
          ) : participants.length === 0 ? (
            <div className="empty">
              <span style={{ fontSize: 40 }}>📭</span>
              <p>Aucun résultat.</p>
            </div>
          ) : (
            <div className="rt-wrap">
              <div className="rt-head">
                <span>Participant</span>
                <span className="col-grp">Groupe</span>
                <span className="col-sc">Scores</span>
                <span>Profil</span>
                <span>Actions</span>
              </div>
              {participants.map((p) => {
                const prof = PROFILES[p.dominant];
                return (
                  <div key={p.id} className="rt-row">
                    <div>
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
                    <div className="rt-grp">
                      <select
                        className="assign-select"
                        value={p.team_id || ""}
                        onChange={(e) =>
                          onAssignGroup(p.id, e.target.value || null)
                        }
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
                    <div>
                      <span
                        className="pill"
                        style={{ background: prof.color, color: "#fff" }}
                      >
                        {prof.disc} — {prof.label}
                      </span>
                    </div>
                    <div className="row-actions">
                      <button
                        className="btn-icon view"
                        onClick={() => setViewingResult(p)}
                      >
                        👁
                      </button>
                      <button
                        className="btn-icon share"
                        onClick={() => onShareParticipant(p)}
                      >
                        🔗
                      </button>
                      <button
                        className="btn-icon del"
                        onClick={() => onDeleteTarget(p.id)}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}

      {/* Result modal */}
      {viewingResult && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay"))
              setViewingResult(null);
          }}
        >
          <div className="modal-box">
            <div className="modal-header">
              <div>
                <h3>Résultat — {fullName(viewingResult)}</h3>
                <p>
                  {new Date(viewingResult.created_at).toLocaleDateString(
                    "fr-FR",
                    { day: "2-digit", month: "long", year: "numeric" },
                  )}{" "}
                  ·{" "}
                  {groups.find((g) => g.id === viewingResult.team_id)?.name ||
                    "Sans groupe"}
                </p>
              </div>
              <div
                style={{ display: "flex", gap: 8, alignItems: "center" }}
              >
                <button
                  className="btn-sm green"
                  onClick={() => onShareParticipant(viewingResult)}
                >
                  🔗 Partager
                </button>
                <button
                  className="modal-close"
                  onClick={() => setViewingResult(null)}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="modal-body">
              <FullResult participant={viewingResult} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
