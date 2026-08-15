import { APP_VERSION, VERSION_HISTORY } from "../version";

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
      <span className="welcome-badge">Questionnaire de découverte · 25 questions</span>
      <h1 className="welcome-title">
        Explorez votre manière
        <br />
        <em>d’agir et d’interagir</em>
      </h1>
      <p className="welcome-sub">
        Ce questionnaire vous invite à observer vos préférences dans des
        situations du quotidien. Il ne mesure ni votre valeur ni vos
        compétences : il propose un éclairage pour mieux vous comprendre et
        faciliter les échanges avec les autres.
      </p>
      <figure className="disc-illustration">
        <img
          src="/disc-wheel-v1.png"
          alt="Cercle composé de quatre parts équilibrées rouge, jaune, verte et bleue"
          width="320"
          height="320"
        />
        <figcaption>
          Une lecture en quatre dimensions, dont la combinaison se révèle à la
          fin du questionnaire.
        </figcaption>
      </figure>
      <div className="test-guide" aria-label="Déroulement du questionnaire">
        <div className="guide-item">
          <strong>25 situations</strong>
          <span>Choisissez ce qui vous ressemble le plus spontanément.</span>
        </div>
        <div className="guide-item">
          <strong>Sans bonne réponse</strong>
          <span>Chaque manière de réagir possède son utilité selon le contexte.</span>
        </div>
        <div className="guide-item">
          <strong>Une synthèse à la fin</strong>
          <span>Votre résultat vous donnera des pistes de réflexion concrètes.</span>
        </div>
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

      <details className="version-notes">
        <summary>Version {APP_VERSION} · Pourquoi cette évolution ?</summary>
        <div className="version-list">
          {VERSION_HISTORY.map((release) => (
            <article className="version-entry" key={release.version}>
              <span>v{release.version}</span>
              <div>
                <strong>{release.title}</strong>
                <p>{release.rationale}</p>
              </div>
            </article>
          ))}
        </div>
      </details>
    </div>
  );
}
