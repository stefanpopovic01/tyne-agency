import { Link } from "react-router-dom";
import "./Notfound.css";
import { useLanguage } from "../../i18n/LanguageContext";

export default function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="nf-page">

      <div className="nf-bg" aria-hidden="true">
        <div className="nf-glow nf-glow--a" />
        <div className="nf-glow nf-glow--b" />
      </div>

      <div className="nf-inner">
        <div className="nf-code">404</div>
        <h1 className="nf-title">{t.notFound.title}</h1>
        <p className="nf-desc">
          {t.notFound.desc}
        </p>
        <div className="nf-actions">
          <Link to="/" className="nf-btn nf-btn--primary">
            {t.notFound.btnHome}
          </Link>
          <Link to="/kontakt" className="nf-btn nf-btn--outline">
            {t.notFound.btnContact}
          </Link>
        </div>
      </div>

    </div>
  );
}