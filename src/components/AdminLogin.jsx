export default function AdminLogin({
  loginUser,
  setLoginUser,
  loginPass,
  setLoginPass,
  loginError,
  onLogin,
}) {
  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-icon">🔐</div>
        <h2 className="login-title">Espace Admin</h2>
        <p className="login-sub">Accès réservé à l'administrateur</p>
        <form onSubmit={onLogin}>
          <input
            className="login-field"
            type="text"
            placeholder="Identifiant"
            value={loginUser}
            onChange={(e) => setLoginUser(e.target.value)}
            autoComplete="username"
          />
          <input
            className="login-field"
            type="password"
            placeholder="Mot de passe"
            value={loginPass}
            onChange={(e) => setLoginPass(e.target.value)}
            autoComplete="current-password"
          />
          <button className="btn-admin-login" type="submit">
            Se connecter
          </button>
          {loginError && <div className="login-error">⚠️ {loginError}</div>}
        </form>
      </div>
    </div>
  );
}
