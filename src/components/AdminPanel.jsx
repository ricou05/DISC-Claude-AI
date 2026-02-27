import { exportCSV } from "../utils/helpers";
import OverviewTab from "./admin/OverviewTab";
import GroupsTab from "./admin/GroupsTab";
import ResultsTab from "./admin/ResultsTab";
import ResultModal from "./admin/ResultModal";

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
    <section className="admin-screen" aria-label="Portail d'administration">
      {/* Top bar */}
      <div className="admin-top">
        <div>
          <h2>Portail Admin</h2>
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
            Export CSV
          </button>
          <button className="btn-sm purple" onClick={onLogout}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* Tabs */}
      <nav className="admin-tabs" aria-label="Onglets administration">
        {[
          { id: "overview", label: "Vue d'ensemble" },
          { id: "groups", label: "Groupes" },
          { id: "results", label: "Tous les résultats" },
        ].map((t) => (
          <button
            key={t.id}
            className={`admin-tab ${adminTab === t.id ? "active" : ""}`}
            onClick={() => setAdminTab(t.id)}
            role="tab"
            aria-selected={adminTab === t.id}
            aria-controls={`panel-${t.id}`}
          >
            {t.label}
          </button>
        ))}
      </nav>

      {error && (
        <div className="error-msg" role="alert">
          {error}
        </div>
      )}

      <div role="tabpanel" id={`panel-${adminTab}`}>
        {adminTab === "overview" && (
          <OverviewTab
            participants={participants}
            groups={groups}
            groupMembers={groupMembers}
            unassigned={unassigned}
            onSelectGroup={(g) => {
              setAdminTab("groups");
              setSelectedGroup(g);
            }}
          />
        )}

        {adminTab === "groups" && (
          <GroupsTab
            groups={groups}
            participants={participants}
            groupMembers={groupMembers}
            selectedGroup={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            editingName={editingName}
            setEditingName={setEditingName}
            editingNameVal={editingNameVal}
            setEditingNameVal={setEditingNameVal}
            showNewGroup={showNewGroup}
            setShowNewGroup={setShowNewGroup}
            newGroupName={newGroupName}
            setNewGroupName={setNewGroupName}
            onCreateGroup={onCreateGroup}
            onRenameGroup={onRenameGroup}
            onDeleteGroupTarget={onDeleteGroupTarget}
            onAssignGroup={onAssignGroup}
            onShareParticipant={onShareParticipant}
            setViewingResult={setViewingResult}
          />
        )}

        {adminTab === "results" && (
          <ResultsTab
            participants={participants}
            groups={groups}
            loadingP={loadingP}
            onRefresh={onRefresh}
            onDeleteTarget={onDeleteTarget}
            onAssignGroup={onAssignGroup}
            onShareParticipant={onShareParticipant}
            setViewingResult={setViewingResult}
          />
        )}
      </div>

      <ResultModal
        viewingResult={viewingResult}
        groups={groups}
        onShareParticipant={onShareParticipant}
        onClose={() => setViewingResult(null)}
      />
    </section>
  );
}
