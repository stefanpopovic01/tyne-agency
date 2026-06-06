import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Header.css";
import logoFull from "../../assets/logo-full-black.png";

const navLinks = [
  { label: "Početna",  type: "home" },
  { label: "Usluge",   type: "section", sectionId: "usluge" },
  { label: "Paketi",   type: "section", sectionId: "paketi" },
  { label: "Portfolio",  type: "route",   to: "/portfolio" },
  { label: "O nama",   type: "section", sectionId: "o-nama" },
  { label: "Kontakt",  type: "route",   to: "/kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleNavClick = (link) => {
    setMenuOpen(false);

    if (link.type === "home") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
      return;
    }

    if (link.type === "section") {
      if (location.pathname === "/") {
        scrollToSection(link.sectionId);
      } else {
        navigate("/");
        setTimeout(() => scrollWhenReady(link.sectionId), 80);
      }
      return;
    }
  };

  return (
    <header className={`header${scrolled ? " header--scrolled" : ""}`}>
      <div className="header__inner">

        <Link to="/" className="header__logo" onClick={() => setMenuOpen(false)}>
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

        <Link to="/zakazi-call" className="header__cta" onClick={() => setMenuOpen(false)}>
          Zakaži Call
        </Link>

        <button
          className={`header__burger${menuOpen ? " header__burger--open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Otvori meni"
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
          to="/zakazi-call"
          className="header__cta header__cta--mobile"
          onClick={() => setMenuOpen(false)}
        >
          Zakaži Call
        </Link>
      </div>
    </header>
  );
}