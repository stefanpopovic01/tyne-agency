import "./Hero.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero-section">

      <div className="hero-bg" aria-hidden="true">
        {/* Morphing blobs */}
        <div className="blob blob--a" />
        <div className="blob blob--b" />
        <div className="blob blob--c" />

        {/* Animated SVG rings */}
        <svg className="rings" viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg">
          <circle className="ring ring--1" cx="700" cy="200" r="180" />
          <circle className="ring ring--2" cx="700" cy="200" r="280" />
          <circle className="ring ring--3" cx="700" cy="200" r="380" />
          <circle className="ring ring--4" cx="700" cy="200" r="480" />
        </svg>

        {/* Diagonal accent lines */}
        <svg className="lines" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <line className="dline dline--1" x1="0" y1="600" x2="600" y2="0" />
          <line className="dline dline--2" x1="-60" y1="600" x2="540" y2="0" />
          <line className="dline dline--3" x1="-120" y1="600" x2="480" y2="0" />
        </svg>

        {/* Floating dots */}
        <div className="dot dot--1" />
        <div className="dot dot--2" />
        <div className="dot dot--3" />
        <div className="dot dot--4" />
        <div className="dot dot--5" />
      </div>

      {/* Floating badges */}
      <div className="hero-badge hero-badge--tl" aria-hidden="true">
        <span className="badge-dot" />+240% ROAS
      </div>
      <div className="hero-badge hero-badge--br" aria-hidden="true">
        <span className="badge-dot" />−38% CPA
      </div>

      {/* Inner centered content */}
      <div className="hero-inner">

        {/* Left: text */}
        <div className="hero-content">
          <div className="hero-tag">
            <span className="tag-pulse" />
            {t.hero.tag}
          </div>

          <h1 className="hero-title">
            {t.hero.titleLine1}
            <br />
            <span className="hero-title-accent">{t.hero.titleAccent}</span>
          </h1>

          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>

          <div className="hero-actions">
            <button
              className="hbtn hbtn--outline"
              onClick={() => {
                const el = document.getElementById("usluge");
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
            >
              {t.hero.ctaLearnMore}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <Link to="/zakazi-call" className="hbtn hbtn--primary">{t.hero.ctaBook}</Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span className="stat-num">250+</span>
              <span className="stat-label">{t.hero.statCampaigns}</span>
            </div>
            <div className="stat-divider" />
            <div className="hero-stat">
              <span className="stat-num">€1M+</span>
              <span className="stat-label">{t.hero.statAdspend}</span>
            </div>
            <div className="stat-divider" />
            <div className="hero-stat">
              <span className="stat-num">4.8×</span>
              <span className="stat-label">{t.hero.statRoas}</span>
            </div>
          </div>
        </div>

        {/* Right: dashboard card */}
        <div className="hero-visual">
          <div className="dash-card">
            <div className="dash-card-header">
              <span className="mac-dot mac-dot--r" />
              <span className="mac-dot mac-dot--y" />
              <span className="mac-dot mac-dot--g" />
              <span className="dash-card-label">{t.hero.dashLabel}</span>
              <span className="dash-live">● LIVE</span>
            </div>
            <div className="dash-chart" id="bars-root">
              {[38, 55, 42, 72, 58, 84, 68, 95, 78, 90, 82, 100].map((h, i) => (
                <div
                  key={i}
                  className="bar"
                  style={{ "--bh": `${h}%`, "--bd": `${i * 0.065}s` }}
                />
              ))}
            </div>
            <div className="dash-stats">
              <div className="dash-stat">
                <span className="ds-label">{t.hero.dashLeads}</span>
                <span className="ds-val">1,284</span>
              </div>
              <div className="dash-stat">
                <span className="ds-label">{t.hero.dashRoas}</span>
                <span className="ds-val ds-val--up">4.8×</span>
              </div>
              <div className="dash-stat">
                <span className="ds-label">{t.hero.dashCpa}</span>
                <span className="ds-val ds-val--dn">-38%</span>
              </div>
            </div>
          </div>

          <div className="mini-card">
            <div className="mini-icon">📈</div>
            <div>
              <div className="mini-label">{t.hero.miniLabel}</div>
              <div className="mini-val">+38%</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}