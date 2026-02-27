export default function Header({ view, adminLogged, onNavigate }) {
  return (
    <header className="header" role="banner">
      <div className="logo-mark" aria-hidden="true">D</div>
      <div className="logo-text">
        DISC <span>Discovery</span>
      </div>
      <nav className="header-nav" aria-label="Navigation principale">
        <button
          className={`nav-btn ${view !== "admin" && view !== "adminlogin" ? "active" : ""}`}
          onClick={() => onNavigate("welcome")}
          aria-current={view !== "admin" && view !== "adminlogin" ? "page" : undefined}
        >
          Passer le test
        </button>
        <button
          className={`nav-btn admin-btn ${view === "admin" || view === "adminlogin" ? "active" : ""}`}
          onClick={() => onNavigate(adminLogged ? "admin" : "adminlogin")}
          aria-current={view === "admin" || view === "adminlogin" ? "page" : undefined}
        >
          Admin
        </button>
      </nav>
    </header>
  );
}
