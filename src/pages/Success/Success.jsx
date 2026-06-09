import { Link } from "react-router-dom";
import "./Success.css";

export default function Success() {
  return (
    <div className="success-page">

      <div className="success-bg" aria-hidden="true">
        <div className="success-glow success-glow--a" />
        <div className="success-glow success-glow--b" />
      </div>

      <div className="success-inner">

        <div className="success-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0b5bf2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h1 className="success-title">Primili smo vaš zahtev!</h1>

        <p className="success-desc">
          Kontaktiraćemo vas na vašu email adresu i potvrditi termin.
          <br />
          Odgovaramo u roku od 24h.
        </p>

        <div className="success-actions">
          <Link to="/" className="success-btn success-btn--primary">
            Idi na početnu
          </Link>
          <Link to="/kontakt" className="success-btn success-btn--outline">
            Kontaktiraj nas
          </Link>
        </div>

      </div>
    </div>
  );
}