import { useReducer, useEffect } from "react";
import { supabase } from "./utils/supabase";
import { QUESTIONS } from "./data/questions";
import { calculateScores, getDominant, fullName } from "./utils/helpers";
import Header from "./components/Header";
import WelcomeScreen from "./components/WelcomeScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";
import AdminLogin from "./components/AdminLogin";
import AdminPanel from "./components/AdminPanel";
import ConfirmDialog from "./components/ConfirmDialog";
import "./styles/app.css";

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || "admin";
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || "";

const initialState = {
  view: "welcome",
  name: "",
  lastname: "",
  selectedGroupId: null,
  currentQ: 0,
  answers: {},
  scores: null,
  saving: false,
  toast: null,
  sharedResult: null,
  participants: [],
  groups: [],
  loadingP: false,
  adminLogged: false,
  loginUser: "",
  loginPass: "",
  loginError: "",
  adminTab: "overview",
  deleteTarget: null,
  error: null,
  viewingResult: null,
  selectedGroup: null,
  editingName: false,
  editingNameVal: "",
  newGroupName: "",
  showNewGroup: false,
  deleteGroupTarget: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET":
      return { ...state, ...action.payload };
    case "RESET_QUIZ":
      return {
        ...state,
        currentQ: 0,
        answers: {},
        scores: null,
        view: "quiz",
      };
    default:
      return state;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const set = (payload) => dispatch({ type: "SET", payload });

  const {
    view,
    name,
    lastname,
    selectedGroupId,
    currentQ,
    answers,
    scores,
    saving,
    toast,
    sharedResult,
    participants,
    groups,
    loadingP,
    adminLogged,
    loginUser,
    loginPass,
    loginError,
    adminTab,
    deleteTarget,
    error,
    viewingResult,
    selectedGroup,
    editingName,
    editingNameVal,
    newGroupName,
    showNewGroup,
    deleteGroupTarget,
  } = state;

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith("#result/")) {
      loadSharedResult(hash.slice(8));
    }
    loadGroups();
  }, []);

  useEffect(() => {
    if (view === "admin") {
      loadParticipants();
      loadGroups();
    }
  }, [view]);

  // ── Data loaders ──

  async function loadGroups() {
    try {
      const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("name", { ascending: true });
      if (error) throw error;
      set({ groups: data || [] });
    } catch (e) {
      console.error(e);
    }
  }

  async function loadParticipants() {
    set({ loadingP: true });
    try {
      const { data, error } = await supabase
        .from("results")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      set({ participants: data || [], loadingP: false });
    } catch (e) {
      set({ error: "Erreur : " + e.message, loadingP: false });
    }
  }

  async function loadSharedResult(id) {
    try {
      const { data, error } = await supabase
        .from("results")
        .select("*")
        .eq("id", id)
        .single();
      if (error || !data) return;
      set({ sharedResult: data, view: "shared" });
    } catch (e) {
      console.error(e);
    }
  }

  // ── Actions ──

  async function saveResult(n, ln, s, groupId) {
    set({ saving: true });
    try {
      const payload = {
        name: n,
        lastname: ln || "",
        scores: s,
        dominant: getDominant(s),
      };
      if (groupId) payload.team_id = groupId;
      const { data, error } = await supabase
        .from("results")
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      set({ saving: false });
      return data?.id;
    } catch (e) {
      console.error(e);
      set({ saving: false });
    }
  }

  async function deleteOne(id) {
    try {
      const { error } = await supabase.from("results").delete().eq("id", id);
      if (error) throw error;
      set({ participants: participants.filter((p) => p.id !== id) });
    } catch (e) {
      set({ error: "Suppression impossible : " + e.message });
    }
    set({ deleteTarget: null });
  }

  async function assignGroup(participantId, groupId) {
    try {
      const { error } = await supabase
        .from("results")
        .update({ team_id: groupId || null })
        .eq("id", participantId);
      if (error) throw error;
      set({
        participants: participants.map((p) =>
          p.id === participantId ? { ...p, team_id: groupId || null } : p,
        ),
      });
    } catch (e) {
      set({ error: "Erreur : " + e.message });
    }
  }

  async function createGroup() {
    if (!newGroupName.trim()) return;
    try {
      const { data, error } = await supabase
        .from("teams")
        .insert({ name: newGroupName.trim() })
        .select()
        .single();
      if (error) throw error;
      set({
        groups: [...groups, data].sort((a, b) =>
          a.name.localeCompare(b.name),
        ),
        newGroupName: "",
        showNewGroup: false,
        selectedGroup: data,
      });
    } catch (e) {
      set({ error: "Erreur : " + e.message });
    }
  }

  async function renameGroup(id, newName) {
    if (!newName.trim()) return;
    try {
      const { error } = await supabase
        .from("teams")
        .update({ name: newName.trim() })
        .eq("id", id);
      if (error) throw error;
      const updated = groups
        .map((g) => (g.id === id ? { ...g, name: newName.trim() } : g))
        .sort((a, b) => a.name.localeCompare(b.name));
      set({
        groups: updated,
        selectedGroup:
          selectedGroup?.id === id
            ? { ...selectedGroup, name: newName.trim() }
            : selectedGroup,
        editingName: false,
      });
    } catch (e) {
      set({ error: "Erreur : " + e.message });
    }
  }

  async function deleteGroup(id) {
    try {
      await supabase
        .from("results")
        .update({ team_id: null })
        .eq("team_id", id);
      const { error } = await supabase.from("teams").delete().eq("id", id);
      if (error) throw error;
      set({
        groups: groups.filter((g) => g.id !== id),
        participants: participants.map((p) =>
          p.team_id === id ? { ...p, team_id: null } : p,
        ),
        selectedGroup: selectedGroup?.id === id ? null : selectedGroup,
        deleteGroupTarget: null,
      });
    } catch (e) {
      set({ error: "Erreur : " + e.message });
    }
  }

  function shareParticipant(p) {
    const url = `${window.location.origin}${window.location.pathname}#result/${p.id}`;
    navigator.clipboard
      .writeText(url)
      .then(() => showToast(`🔗 Lien de ${fullName(p)} copié !`))
      .catch(() => {});
  }

  function showToast(msg) {
    set({ toast: msg });
    setTimeout(() => set({ toast: null }), 3000);
  }

  function handleLogin(e) {
    e.preventDefault();
    if (loginUser === ADMIN_USER && loginPass === ADMIN_PASS) {
      set({ adminLogged: true, loginError: "", view: "admin" });
    } else {
      set({ loginError: "Identifiants incorrects." });
    }
  }

  function startQuiz(e) {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch({ type: "RESET_QUIZ" });
  }

  async function submitQuiz() {
    const s = calculateScores(answers);
    set({ scores: s });
    const id = await saveResult(name, lastname, s, selectedGroupId);
    if (id) window.history.replaceState(null, "", `#result/${id}`);
    set({ view: "results" });
  }

  function navigate(target) {
    set({ view: target });
    if (target === "welcome") {
      window.history.replaceState(null, "", "#");
    }
  }

  // ── Derived state ──

  const answeredCount = Object.keys(answers).length;
  const dominant = scores ? getDominant(scores) : null;
  const showResults =
    (view === "results" && scores && dominant) ||
    (view === "shared" && sharedResult);

  return (
    <div className="app">
      <Header view={view} adminLogged={adminLogged} onNavigate={navigate} />

      {view === "welcome" && (
        <WelcomeScreen
          name={name}
          setName={(v) => set({ name: v })}
          lastname={lastname}
          setLastname={(v) => set({ lastname: v })}
          groups={groups}
          selectedGroupId={selectedGroupId}
          setSelectedGroupId={(v) => set({ selectedGroupId: v })}
          onStart={startQuiz}
        />
      )}

      {view === "quiz" && (
        <QuizScreen
          currentQ={currentQ}
          setCurrentQ={(v) =>
            set({ currentQ: typeof v === "function" ? v(currentQ) : v })
          }
          answers={answers}
          setAnswers={(v) => set({ answers: v })}
          answeredCount={answeredCount}
          saving={saving}
          onSubmit={submitQuiz}
        />
      )}

      {showResults && (
        <ResultsScreen
          view={view}
          name={name}
          lastname={lastname}
          scores={scores}
          dominant={dominant}
          saving={saving}
          selectedGroupId={selectedGroupId}
          sharedResult={sharedResult}
          onShare={() => {
            navigator.clipboard
              .writeText(window.location.href)
              .then(() => showToast("🔗 Lien copié !"));
          }}
          onRestart={() => navigate("welcome")}
        />
      )}

      {view === "adminlogin" && (
        <AdminLogin
          loginUser={loginUser}
          setLoginUser={(v) => set({ loginUser: v })}
          loginPass={loginPass}
          setLoginPass={(v) => set({ loginPass: v })}
          loginError={loginError}
          onLogin={handleLogin}
        />
      )}

      {view === "admin" && adminLogged && (
        <AdminPanel
          participants={participants}
          groups={groups}
          loadingP={loadingP}
          error={error}
          adminTab={adminTab}
          setAdminTab={(v) => set({ adminTab: v })}
          selectedGroup={selectedGroup}
          setSelectedGroup={(v) => set({ selectedGroup: v })}
          editingName={editingName}
          setEditingName={(v) => set({ editingName: v })}
          editingNameVal={editingNameVal}
          setEditingNameVal={(v) => set({ editingNameVal: v })}
          showNewGroup={showNewGroup}
          setShowNewGroup={(v) => set({ showNewGroup: v })}
          newGroupName={newGroupName}
          setNewGroupName={(v) => set({ newGroupName: v })}
          viewingResult={viewingResult}
          setViewingResult={(v) => set({ viewingResult: v })}
          onLogout={() => {
            set({
              adminLogged: false,
              loginUser: "",
              loginPass: "",
              view: "welcome",
            });
          }}
          onRefresh={loadParticipants}
          onDeleteTarget={(v) => set({ deleteTarget: v })}
          onDeleteGroupTarget={(v) => set({ deleteGroupTarget: v })}
          onAssignGroup={assignGroup}
          onCreateGroup={createGroup}
          onRenameGroup={renameGroup}
          onShareParticipant={shareParticipant}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Confirmer la suppression"
          message={
            deleteTarget === "all"
              ? `Supprimer les ${participants.length} résultats ? Action irréversible.`
              : "Supprimer ce résultat ? Action irréversible."
          }
          onCancel={() => set({ deleteTarget: null })}
          onConfirm={() => {
            if (deleteTarget === "all") {
              supabase
                .from("results")
                .delete()
                .neq("id", "00000000-0000-0000-0000-000000000000")
                .then(() => {
                  set({ participants: [], deleteTarget: null });
                });
            } else {
              deleteOne(deleteTarget);
            }
          }}
        />
      )}

      {deleteGroupTarget && (
        <ConfirmDialog
          title="Supprimer le groupe ?"
          message="Les membres seront désassignés mais leurs résultats conservés."
          onCancel={() => set({ deleteGroupTarget: null })}
          onConfirm={() => deleteGroup(deleteGroupTarget)}
        />
      )}

      {toast && <div className="copy-toast">{toast}</div>}
    </div>
  );
}
