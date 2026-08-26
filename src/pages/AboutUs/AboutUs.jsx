import "./AboutUs.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

const pillarIcons = [
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18"/><path d="M7 16l4-6 4 4 4-7"/>
  </svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.3-6.7-2.1 2.1M8.4 15.6l-2.1 2.1m0-11.4 2.1 2.1m5.1 5.1 2.1 2.1"/>
  </svg>,
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12l2.5 2.5L16 9"/>
  </svg>,
];

export default function AboutUs() {
  const { t } = useLanguage();
  const pillars = t.aboutUs.pillars.map((p, i) => ({ ...p, icon: pillarIcons[i] }));
  return (
    <section className="onama" id="o-nama">

      {/* Subtle background accent */}
      <div className="onama__bg" aria-hidden="true">
        <div className="onama__accent" />
      </div>

      <div className="onama__inner">

        {/* Left col — text */}
        <div className="onama__left">
          <span className="onama__eyebrow">{t.aboutUs.eyebrow}</span>

          <h2 className="onama__title">
            {t.aboutUs.titleLine1}<br />
            <span className="onama__title-em">{t.aboutUs.titleEm}</span>
          </h2>

          <div className="onama__body">
            <p>
              {t.aboutUs.body1Pre}<strong>{t.aboutUs.body1Strong}</strong>{t.aboutUs.body1Post}
            </p>
            <p>
              {t.aboutUs.body2Pre}<strong>{t.aboutUs.body2Strong}</strong>{t.aboutUs.body2Post}
            </p>
            <p>
              {t.aboutUs.body3}
            </p>
          </div>

          <Link to="/kontakt" className="onama__cta">
            {t.aboutUs.cta}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Right col — pillar cards */}
        <div className="onama__right">
          {pillars.map((p, i) => (
            <div className="onama__card" key={i} style={{ "--i": i }}>
              <div className="onama__card-icon">{p.icon}</div>
              <div>
                <div className="onama__card-label">{p.label}</div>
                <div className="onama__card-desc">{p.desc}</div>
              </div>
            </div>
          ))}

          {/* Floating stat */}
          <div className="onama__stat-bubble">
            <span className="onama__stat-num">98%</span>
            <span className="onama__stat-txt">{t.aboutUs.statTxt}</span>
          </div>
        </div>

      </div>
    </section>
  );
}