import { createContext, useContext } from "react";
import { translations } from "./translations";
import { localize } from "./langPath";

const LanguageContext = createContext(null);

// Language is derived entirely from the URL (see App.jsx's two route trees), not from
// client storage — deterministic on both the SSG build and the client, so there's no
// hydration mismatch to reconcile.
export function LanguageProvider({ lang, children }) {
  const value = {
    lang,
    t: translations[lang],
    lp: (path) => localize(lang, path),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
