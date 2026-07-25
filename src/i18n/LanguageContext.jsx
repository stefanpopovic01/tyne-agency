import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "./translations";

const LanguageContext = createContext(null);

const STORAGE_KEY = "tyne-lang";

function getInitialLang() {
  if (typeof window === "undefined") return "sr";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored === "en" || stored === "sr" ? stored : "sr";
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
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
