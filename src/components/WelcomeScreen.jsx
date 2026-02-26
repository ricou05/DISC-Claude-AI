import { PROFILES } from "../data/profiles";

export default function WelcomeScreen({
  name,
  setName,
  lastname,
  setLastname,
  groups,
  selectedGroupId,
  setSelectedGroupId,
  onStart,
}) {
  return (
    <div className="welcome-screen">
      <span className="welcome-badge">Modèle DISC · 25 questions</span>
      <h1 className="welcome-title">
        Quel est votre
        <br />
        <em>profil DISC ?</em>
      </h1>
      <p className="welcome-sub">
        Identifiez votre style comportemental dominant et apprenez à mieux
        communiquer avec votre entourage.
      </p>
      <div className="disc-badges">
        {Object.values(PROFILES).map((p) => (
          <div
            key={p.disc}
            className="disc-badge"
            style={{
              background: p.bg,
              color: p.color,
              border: `1.5px solid ${p.color}40`,
            }}
          >
            {p.disc} — {p.label}
          </div>
        ))}
      </div>

      <form className="start-form" onSubmit={onStart}>
        <label className="form-label">Prénom</label>
        <input
          className="name-input"
          type="text"
          placeholder="Votre prénom..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
        />
        <label className="form-label">Nom</label>
        <input
          className="name-input"
          type="text"
          placeholder="Votre nom..."
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          maxLength={60}
        />

        {groups.length > 0 && (
          <>
            <div className="group-label">
              Votre groupe
              <span>Optionnel</span>
            </div>
            <div className="group-grid">
              {groups.map((g) => (
                <div
                  key={g.id}
                  className={`group-card ${selectedGroupId === g.id ? "selected" : ""}`}
                  onClick={() =>
                    setSelectedGroupId(
                      selectedGroupId === g.id ? null : g.id,
                    )
                  }
                >
                  {g.name}
                </div>
              ))}
              <div
                className={`group-card group-card-none ${selectedGroupId === null ? "selected" : ""}`}
                onClick={() => setSelectedGroupId(null)}
              >
                Aucun groupe
              </div>
            </div>
          </>
        )}

        <button className="btn-start" type="submit" disabled={!name.trim()}>
          Commencer le test →
        </button>
      </form>
    </div>
  );
}
