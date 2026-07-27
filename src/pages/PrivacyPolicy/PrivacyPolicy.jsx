import "./PrivacyPolicy.css";
import { useLanguage } from "../../i18n/LanguageContext";
import { useConsent } from "../../consent/ConsentContext";

export default function PrivacyPolicy() {
  const { t } = useLanguage();
  const { openSettings } = useConsent();
  const p = t.privacyPolicy;

  return (
    <div className="pp-page">
      <div className="pp-inner">
        <span className="pp-eyebrow">{p.eyebrow}</span>
        <h1 className="pp-title">{p.title}</h1>
        <p className="pp-updated">{p.lastUpdated}: 2026-07-27</p>
        <p className="pp-intro">{p.intro}</p>

        {p.sections.map((s, i) => (
          <section className="pp-section" key={i}>
            <h2 className="pp-section-title">{s.heading}</h2>
            <p className="pp-section-body">{s.body}</p>
          </section>
        ))}

        <button type="button" className="pp-settings-btn" onClick={openSettings}>
          {t.cookieConsent.footerLink}
        </button>
      </div>
    </div>
  );
}
