export default function Header({ view, adminLogged, onNavigate }) {
  return (
    <header className="header">
      <div className="logo-mark">D</div>
      <div className="logo-text">
        DISC <span>Discovery</span>
      </div>
      <nav className="header-nav">
        <button
          className={`nav-btn ${view !== "admin" && view !== "adminlogin" ? "active" : ""}`}
          onClick={() => onNavigate("welcome")}
        >
          Passer le test
        </button>
        <button
          className={`nav-btn admin-btn ${view === "admin" || view === "adminlogin" ? "active" : ""}`}
          onClick={() => onNavigate(adminLogged ? "admin" : "adminlogin")}
        >
          🔒 Admin
        </button>
      </nav>
    </header>
  );
}
