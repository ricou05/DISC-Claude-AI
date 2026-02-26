import { QUESTIONS, SCORING } from "../data/questions";
import { PROFILES } from "../data/profiles";

export function calculateScores(answers) {
  const s = { D: 0, I: 0, S: 0, C: 0 };
  QUESTIONS.forEach((q, i) => {
    const c = answers[q.id];
    if (!c) return;
    Object.entries(SCORING[i]).forEach(([col, l]) => {
      if (l === c) s[col]++;
    });
  });
  return s;
}

export function getDominant(scores) {
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

export function fullName(p) {
  return [p.name, p.lastname].filter(Boolean).join(" ");
}

export function exportCSV(participants, teams) {
  const headers = [
    "Prénom",
    "Groupe",
    "Profil dominant",
    "Score D",
    "Score I",
    "Score S",
    "Score C",
    "Date",
  ];
  const rows = participants.map((p) => {
    const team = teams.find((t) => t.id === p.team_id);
    return [
      fullName(p),
      team?.name || "—",
      PROFILES[p.dominant]?.label || p.dominant,
      p.scores?.D || 0,
      p.scores?.I || 0,
      p.scores?.S || 0,
      p.scores?.C || 0,
      new Date(p.created_at).toLocaleDateString("fr-FR"),
    ];
  });
  const csv = [headers, ...rows].map((r) => r.join(";")).join("\n");
  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "disc_groupes.csv";
  a.click();
}
