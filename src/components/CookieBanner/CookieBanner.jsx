import { useState } from "react";
import { Link } from "react-router-dom";
import "./CookieBanner.css";
import { useConsent } from "../../consent/ConsentContext";
import { useLanguage } from "../../i18n/LanguageContext";

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`cookie-toggle${checked ? " cookie-toggle--on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="cookie-toggle__thumb" />
    </button>
  );
}

function CookieSettingsPanel({ consent, onCancel, onSave, t }) {
  const [localPrefs, setLocalPrefs] = useState(() => ({
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
  }));

  return (
    <div className="cookie-banner__panel">
      <h3 className="cookie-banner__settings-title">{t.cookieConsent.settingsTitle}</h3>
      <p className="cookie-banner__settings-intro">{t.cookieConsent.settingsIntro}</p>

      <div className="cookie-banner__row">
        <div className="cookie-banner__row-text">
          <div className="cookie-banner__row-title">{t.cookieConsent.necessaryTitle}</div>
          <div className="cookie-banner__row-desc">{t.cookieConsent.necessaryDesc}</div>
        </div>
        <span className="cookie-banner__always-on">{t.cookieConsent.alwaysOn}</span>
      </div>

      <div className="cookie-banner__row">
        <div className="cookie-banner__row-text">
          <div className="cookie-banner__row-title">{t.cookieConsent.analyticsTitle}</div>
          <div className="cookie-banner__row-desc">{t.cookieConsent.analyticsDesc}</div>
        </div>
        <ToggleSwitch
          checked={localPrefs.analytics}
          onChange={(v) => setLocalPrefs((p) => ({ ...p, analytics: v }))}
          label={t.cookieConsent.analyticsTitle}
        />
      </div>

      <div className="cookie-banner__row">
        <div className="cookie-banner__row-text">
          <div className="cookie-banner__row-title">{t.cookieConsent.marketingTitle}</div>
          <div className="cookie-banner__row-desc">{t.cookieConsent.marketingDesc}</div>
        </div>
        <ToggleSwitch
          checked={localPrefs.marketing}
          onChange={(v) => setLocalPrefs((p) => ({ ...p, marketing: v }))}
          label={t.cookieConsent.marketingTitle}
        />
      </div>

      <div className="cookie-banner__actions">
        <button className="cookie-btn cookie-btn--outline" onClick={onCancel}>
          {t.cookieConsent.cancel}
        </button>
        <button className="cookie-btn cookie-btn--primary" onClick={() => onSave(localPrefs)}>
          {t.cookieConsent.savePreferences}
        </button>
      </div>
    </div>
  );
}

export default function CookieBanner() {
  const { hasDecided, settingsOpen, consent, acceptAll, rejectAll, savePreferences, openSettings, closeSettings } = useConsent();
  const { t } = useLanguage();

  const visible = !hasDecided || settingsOpen;
  if (!visible) return null;

  return (
    <div className="cookie-banner">
      {settingsOpen ? (
        <CookieSettingsPanel
          consent={consent}
          t={t}
          onCancel={closeSettings}
          onSave={(prefs) => {
            savePreferences(prefs);
            closeSettings();
          }}
        />
      ) : (
        <div className="cookie-banner__main">
          <div className="cookie-banner__text">
            <strong className="cookie-banner__title">{t.cookieConsent.title}</strong>
            <p className="cookie-banner__message">
              {t.cookieConsent.message}{" "}
              <Link to="/politika-privatnosti" className="cookie-banner__link">
                {t.cookieConsent.policyLinkText}
              </Link>
            </p>
          </div>
          <div className="cookie-banner__actions">
            <button className="cookie-btn cookie-btn--outline" onClick={rejectAll}>
              {t.cookieConsent.rejectAll}
            </button>
            <button className="cookie-btn cookie-btn--outline" onClick={openSettings}>
              {t.cookieConsent.customize}
            </button>
            <button className="cookie-btn cookie-btn--primary" onClick={acceptAll}>
              {t.cookieConsent.acceptAll}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
