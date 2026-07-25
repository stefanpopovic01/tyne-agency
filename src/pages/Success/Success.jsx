import { Link } from "react-router-dom";
import "./Success.css";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Success() {
  const { t } = useLanguage();
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

        <h1 className="success-title">{t.success.title}</h1>

        <p className="success-desc">
          {t.success.desc}
          <br />
          {t.success.descLine2}
        </p>

        <div className="success-actions">
          <Link to="/" className="success-btn success-btn--primary">
            {t.success.btnHome}
          </Link>
          <Link to="/kontakt" className="success-btn success-btn--outline">
            {t.success.btnContact}
          </Link>
        </div>

      </div>
    </div>
  );
}