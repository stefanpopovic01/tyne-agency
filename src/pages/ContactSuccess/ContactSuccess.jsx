import { Link } from "react-router-dom";
import "./ContactSuccess.css";

export default function ContactSuccess() {
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

        <h1 className="success-title">Poruka poslata!</h1>

        <p className="success-desc">
          Hvala vam. Javićemo se u roku od 24h.
        </p>

        <div className="success-actions">
          <Link to="/" className="success-btn success-btn--primary">
            Idi na početnu
          </Link>
          <Link to="/kontakt" className="success-btn success-btn--outline">
            Nova poruka
          </Link>
        </div>

      </div>
    </div>
  );
}