import "./AboutUs.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

export default function AboutUs() {
  const { t, lp } = useLanguage();
  const pillars = t.aboutUs.pillars;
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

          <Link to={lp("/kontakt")} className="onama__cta">
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
              <span className="onama__card-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
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