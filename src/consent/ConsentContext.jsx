import { createContext, useContext, useEffect, useState } from "react";

const ConsentContext = createContext(null);

const STORAGE_KEY = "tyne-cookie-consent";

function readStoredConsent() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed.analytics === "boolean" && typeof parsed.marketing === "boolean") {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function applyConsentToGtag(consent) {
  if (typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: consent.analytics ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    ad_user_data: consent.marketing ? "granted" : "denied",
    ad_personalization: consent.marketing ? "granted" : "denied",
  });
}

export function ConsentProvider({ children }) {
  const [consent, setConsent] = useState(readStoredConsent);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const persist = (next) => {
    const withMeta = { ...next, necessary: true, decidedAt: new Date().toISOString() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(withMeta));
    applyConsentToGtag(withMeta);
    setConsent(withMeta);
  };

  const acceptAll = () => persist({ analytics: true, marketing: true });
  const rejectAll = () => persist({ analytics: false, marketing: false });
  const savePreferences = (prefs) => persist({ analytics: !!prefs.analytics, marketing: !!prefs.marketing });

  const openSettings = () => setSettingsOpen(true);
  const closeSettings = () => setSettingsOpen(false);

  // Mount-only: re-apply any previously stored decision in case index.html's inline
  // consent-update ran before this provider (or the state) was ready.
  useEffect(() => {
    if (consent) applyConsentToGtag(consent);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    consent,
    hasDecided: consent !== null,
    settingsOpen,
    acceptAll,
    rejectAll,
    savePreferences,
    openSettings,
    closeSettings,
  };

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used within a ConsentProvider");
  return ctx;
}
