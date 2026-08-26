import "./Cta.css";
import logoFull from "../../assets/logo-full.png";
import logo1 from '../../assets/client1.webp';
import logo2 from '../../assets/client2.webp';
import logo3 from '../../assets/client3.webp';
import logo4 from '../../assets/client4.webp';
import logo5 from '../../assets/client5.webp';
import logo6 from '../../assets/client6.webp';
import logo7 from '../../assets/client7.webp';
import logo8 from '../../assets/client8.webp';


import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

const LOGOS = [logo1, logo2, logo4, logo5, logo6, logo7]

const pointIcons = [
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 16l4-5 4 3 4-6"/></svg>,
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
];

export default function CTA() {
  const { t } = useLanguage();
  const points = t.cta.points.map((text, i) => ({ icon: pointIcons[i], text }));
  return (
    <section className="cta-section" id="kontakt">

      {/* ── TICKER ── */}
      <div className="clients">
        <div className="clients__label">{t.cta.clientsLabel}</div>
        <div className="ticker">
          <div className="ticker__track">
            {[...LOGOS, ...LOGOS].map((src, i) => (
              <div className="ticker__item" key={i}>
                <img src={src} alt="klijent" loading="lazy" className="ticker__logo" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOOK CALL ── */}
      <div className="bookcall">
        <div className="bookcall__bg" aria-hidden="true">
          <div className="bc__glow bc__glow--a" />
          <div className="bc__glow bc__glow--b" />
          <div className="bc__rings">
            <svg viewBox="0 0 700 440" xmlns="http://www.w3.org/2000/svg">
              <circle cx="350" cy="220" r="160" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
              <circle cx="350" cy="220" r="240" fill="none" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
              <circle cx="350" cy="220" r="320" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1"/>
            </svg>
          </div>
        </div>

        <div className="bookcall__inner">

          {/* Left — text */}
          <div className="bookcall__left">
            <span className="bc__eyebrow">{t.cta.eyebrow}</span>
            <h2 className="bc__title">
              {t.cta.titleLine1}<br />
              <span className="bc__title-em">{t.cta.titleEm}</span>
            </h2>
            <p className="bc__subtitle">
              {t.cta.subtitle}
            </p>
          </div>

          {/* Right — card */}
          <div className="bookcall__right">
            <ul className="bc__points">
              {points.map((p, i) => (
                <li key={i} className="bc__point" style={{ "--i": i }}>
                  <span className="bc__point-icon">{p.icon}</span>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>

            <Link to='/zakazi-call' className="bc__btn">
              <span className="bc__btn-pulse" aria-hidden="true" />
              {t.cta.btn}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </Link>

            <p className="bc__note">{t.cta.note}</p>
          </div>

        </div>
      </div>

    </section>
  );
}