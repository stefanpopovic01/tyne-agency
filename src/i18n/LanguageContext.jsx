import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "tyne-lang";

function getCookie(name) {
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=(sr|en)`));
  return match ? match[1] : null;
}

function getInitialLang() {
  if (typeof window === "undefined") return "sr";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "sr") return stored;
  // Falls back to the geolocation-based default set by middleware.js, if present
  return getCookie(STORAGE_KEY) ?? "sr";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.cookie = `${STORAGE_KEY}=${lang}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = lang;
  }, [lang]);

  const toggleLanguage = () => setLang((l) => (l === "sr" ? "en" : "sr"));

  const value = {
    lang,
    setLang,
    toggleLanguage,
    t: translations[lang],
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
