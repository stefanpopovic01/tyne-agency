import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logoFull from "../../assets/logo-full-black.png";
import { useLanguage } from "../../i18n/LanguageContext";
import { localize, stripLangPrefix } from "../../i18n/langPath";

function LangSwitch({ lang, pathname, label, className }) {
  const srPath = stripLangPrefix(pathname);
  const enPath = localize("en", srPath);
  return (
    <span className={`header__lang${className ? ` ${className}` : ""}`} aria-label={label}>
      <Link
        to={srPath}
        className={`header__lang-option${lang === "sr" ? " header__lang-option--on" : ""}`}
      >
        SR
      </Link>
      <Link
        to={enPath}
        className={`header__lang-option${lang === "en" ? " header__lang-option--on" : ""}`}
      >
        EN
      </Link>
      <span className={`header__lang-thumb${lang === "en" ? " header__lang-thumb--right" : ""}`} aria-hidden="true" />
    </span>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, lp, t } = useLanguage();

  const navLinks = [
    { label: t.header.navHome, type: "home" },
    { label: t.header.navServices, type: "section", sectionId: "usluge" },
    { label: t.header.navPackages, type: "section", sectionId: "paketi" },
    { label: t.header.navPortfolio, type: "route", to: lp("/portfolio") },
    { label: t.header.navAbout, type: "section", sectionId: "o-nama" },
    { label: t.header.navContact, type: "route", to: lp("/kontakt") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const scrollWhenReady = (id, attempts = 0) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    } else if (attempts < 20) {
      setTimeout(() => scrollWhenReady(id, attempts + 1), 80);
    }
  };

  const homePath = lp("/");

  const handleNavClick = (link) => {
    setMenuOpen(false);

    if (link.type === "home") {
      if (location.pathname === homePath) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate(homePath);
      }
      return;
    }

    if (link.type === "section") {
      if (location.pathname === homePath) {
        scrollToSection(link.sectionId);
      } else {
        navigate(homePath);
        setTimeout(() => scrollWhenReady(link.sectionId), 80);
      }
      return;
    }
  };

  return (
    <>
    <header className={`header${scrolled ? " header--scrolled" : ""}${menuOpen ? " header--menu-open" : ""}`}>
      <div className="header__inner">

        <Link to={homePath} className="header__logo" onClick={() => setMenuOpen(false)}>
          <img src={logoFull} alt="Tyne Agency" />
        </Link>

        <nav className="header__nav">
          {navLinks.map((link) =>
            link.type === "route" ? (
              <Link
                key={link.label}
                to={link.to}
                className="header__nav-link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                className="header__nav-link header__nav-btn"
                onClick={() => handleNavClick(link)}
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        <LangSwitch lang={lang} pathname={location.pathname} label={t.header.langSwitchLabel} />

        <Link to={lp("/zakazi-call")} className="header__cta" onClick={() => setMenuOpen(false)}>
          {t.header.ctaBook}
        </Link>

        <button
          className={`header__burger${menuOpen ? " header__burger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={t.header.openMenu}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`header__mobile${menuOpen ? " header__mobile--open" : ""}`}>
        {navLinks.map((link) =>
          link.type === "route" ? (
            <Link
              key={link.label}
              to={link.to}
              className="header__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ) : (
            <button
              key={link.label}
              className="header__mobile-link header__nav-btn"
              onClick={() => handleNavClick(link)}
            >
              {link.label}
            </button>
          )
        )}
        <Link
          to={lp("/zakazi-call")}
          className="header__cta header__cta--mobile"
          onClick={() => setMenuOpen(false)}
        >
          {t.header.ctaBook}
        </Link>
      </div>
    </header>

    <div
      className={`header__scrim${menuOpen ? " header__scrim--open" : ""}`}
      onClick={() => setMenuOpen(false)}
      aria-hidden="true"
    />
    </>
  );
}
