import { Link } from "react-router-dom";
import "./ContactSuccess.css";
import { useLanguage } from "../../i18n/LanguageContext";
import { SEO } from "../../components/SEO/SEO";

export default function ContactSuccess() {
  const { t, lp } = useLanguage();
  return (
    <div className="success-page">
      <SEO {...t.seo.contactSuccess} />

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

        <h1 className="success-title">{t.contactSuccess.title}</h1>

        <p className="success-desc">
          {t.contactSuccess.desc}
        </p>

        <div className="success-actions">
          <Link to={lp("/")} className="success-btn success-btn--primary">
            {t.contactSuccess.btnHome}
          </Link>
          <Link to={lp("/kontakt")} className="success-btn success-btn--outline">
            {t.contactSuccess.btnNew}
          </Link>
        </div>

      </div>
    </div>
  );
}