import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";
import logoFull from "../../assets/logo-full-white.png";

const nav = [
  { label: "Početna", type: "home" },
  { label: "Usluge",  type: "section", sectionId: "usluge" },
  { label: "Paketi",  type: "section", sectionId: "paketi" },
  { label: "Portfolio", type: "route",   to: "/portfolio" },
  { label: "O nama",  type: "section", sectionId: "o-nama" },
  { label: "FAQ",     type: "section", sectionId: "faq" },
  { label: "Kontakt", type: "route",   to: "/kontakt" },
];

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/tyne.agency",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  // {
  //   label: "LinkedIn",
  //   href: "https://linkedin.com",
  //   icon: (
  //     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
  //       <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
  //       <rect x="2" y="9" width="4" height="12"/>
  //       <circle cx="4" cy="4" r="2"/>
  //     </svg>
  //   ),
  // },
  // {
  //   label: "Facebook",
  //   href: "https://facebook.com",
  //   icon: (
  //     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
  //       <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  //     </svg>
  //   ),
  // },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

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
    }
  };

  return (
    <footer className="footer">

      <div className="footer__topline" aria-hidden="true" />

      <div className="footer__inner">

        <div className="footer__brand">
          <Link to="/" className="footer__logo-wrap">
            <img src={logoFull} alt="Tyne Agency" className="footer__logo" />
          </Link>
          <p className="footer__tagline">
            Performance marketing partner za biznise koji žele merljiv i stabilan rast.
          </p>
          <div className="footer__socials">
            {socials.map((s) => (
              <a key={s.label} href={s.href} className="footer__social"
                aria-label={s.label} target="_blank" rel="noopener noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <span className="footer__col-title">Navigacija</span>
          <ul className="footer__links">
            {nav.map((n) => (
              <li key={n.label}>
                {n.type === "route" ? (
                  <Link to={n.to} className="footer__link">{n.label}</Link>
                ) : (
                  <button className="footer__link footer__link-btn" onClick={() => handleNavClick(n)}>
                    {n.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <span className="footer__col-title">Kontakt</span>
          <ul className="footer__links">
            <li>
              <a href="mailto:hello@tyneagency.com" className="footer__link footer__link--icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                hello@tyne.rs
              </a>
            </li>
            <li>
              <a href="tel:+381691258825" className="footer__link footer__link--icon">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.46-1.15a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92z" />
                </svg>
                +381 69 1258 825
              </a>
            </li>
            <li>
              <Link to="/zakazi-call" className="footer__link footer__link--icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Beograd, Srbija
              </Link>
            </li>
          </ul>

          <Link to="/zakazi-call" className="footer__cta">
            Zakaži besplatan call
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span className="footer__copy">© {year} Tyne Agency. Sva prava zadržana.</span>
        </div>
      </div>

    </footer>
  );
}