import "./Hero.css";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

import heroMp4 from "../../assets/hero/hero.mp4";
import heroWebm from "../../assets/hero/hero.webm";
import heroPoster from "../../assets/hero/hero-poster.webp";

export default function Hero() {
  const { t, lp } = useLanguage();
  const videoRef = useRef(null);

  // React doesn't reliably render the `muted` attribute, and browsers only
  // autoplay muted video — so set it imperatively. Respect reduced motion.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      if (reduce.matches) v.pause();
      else v.play().catch(() => {});
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  const scrollToServices = () => {
    const el = document.getElementById("usluge");
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="hero">
      <div className="hero__frame">
        <video
          ref={videoRef}
          className="hero__video"
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={heroWebm} type="video/webm" />
          <source src={heroMp4} type="video/mp4" />
        </video>
        <div className="hero__shade" aria-hidden="true" />

        <div className="hero__content">
          <div className="hero__tag">
            <span className="hero__pulse" />
            {t.hero.tag}
          </div>

          <h1 className="hero__title">
            {t.hero.titleLine1}
            <br />
            <span className="hero__accent">{t.hero.titleAccent}</span>
          </h1>

          <p className="hero__subtitle">{t.hero.subtitle}</p>

          <div className="hero__actions">
            <Link to={lp("/zakazi-call")} className="hero__btn hero__btn--primary">
              {t.hero.ctaBook}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <button type="button" className="hero__btn hero__btn--ghost" onClick={scrollToServices}>
              {t.hero.ctaLearnMore}
            </button>
          </div>
        </div>

        <div className="hero__stats">
          <div className="hero__stat">
            <span className="hero__stat-num">1000+</span>
            <span className="hero__stat-label">{t.hero.statCampaigns}</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">€1M+</span>
            <span className="hero__stat-label">{t.hero.statAdspend}</span>
          </div>
          <div className="hero__stat">
            <span className="hero__stat-num">4.6×</span>
            <span className="hero__stat-label">{t.hero.statRoas}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
