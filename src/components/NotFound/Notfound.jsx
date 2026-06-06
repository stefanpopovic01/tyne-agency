import { Link } from "react-router-dom";
import "./Notfound.css";

export default function NotFound() {
  return (
    <div className="nf-page">

      <div className="nf-bg" aria-hidden="true">
        <div className="nf-glow nf-glow--a" />
        <div className="nf-glow nf-glow--b" />
      </div>

      <div className="nf-inner">
        <div className="nf-code">404</div>
        <h1 className="nf-title">Stranica nije pronađena.</h1>
        <p className="nf-desc">
          Stranica koju tražite ne postoji ili je premeštena.
        </p>
        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-btn--primary">
            Idi na početnu
          </Link>
          <Link to="/kontakt" className="nf-btn nf-btn--outline">
            Kontaktiraj nas
          </Link>
        </div>
      </div>

    </div>
  );
}