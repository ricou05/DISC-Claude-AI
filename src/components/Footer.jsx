import { version } from "../../package.json";

export default function Footer() {
  return (
    <footer className="app-footer">
      <span>DISC Discovery</span>
      <span className="footer-dot">·</span>
      <span>v{version}</span>
    </footer>
  );
}
