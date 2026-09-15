import { Link } from "react-router-dom";
import "./Uspeh.css";
import { useLanguage } from "../../i18n/LanguageContext";
import { SEO } from "../../components/SEO/SEO";

export default function Uspeh() {
  const { t, lp } = useLanguage();
  return (
    <div className="uspeh-page">
      <SEO {...t.seo.success} />

      <div className="uspeh-bg" aria-hidden="true">
        <div className="uspeh-glow uspeh-glow--a" />
        <div className="uspeh-glow uspeh-glow--b" />
      </div>

      <div className="uspeh-inner">

        <div className="uspeh-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0b5bf2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <h1 className="uspeh-title">{t.success.title}</h1>

        <p className="uspeh-desc">
          {t.success.desc}
          <br />
          {t.success.descLine2}
        </p>

        <div className="uspeh-actions">
          <Link to={lp("/")} className="uspeh-btn uspeh-btn--primary">
            {t.success.btnHome}
          </Link>
          <Link to={lp("/kontakt")} className="uspeh-btn uspeh-btn--outline">
            {t.success.btnContact}
          </Link>
        </div>

      </div>
    </div>
  );
}
