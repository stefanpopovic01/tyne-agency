import { useState } from "react";
import "./Services.css";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

import meta from "../../assets/meta.png";
import google from "../../assets/google.png";
import web from '../../assets/web-logo.png';

const serviceMeta = [
{
    id: "google",
    tag: "Google Ads",
    color: "#0b5bf2",
    gradient: "linear-gradient(135deg, #fbbc04 0%, #fdd663 100%)",
    lightBg: "rgba(11,91,242,0.06)",
    metricValue: "+480%",
    icon: google
  },
  {
    id: "meta",
    tag: "Meta Ads",
    color: "#0b5bf2",
    gradient: "linear-gradient(135deg, #0b5bf2 0%, #3b82f6 100%)",
    lightBg: "rgba(11,91,242,0.06)",
    metricValue: "3.2×",
    icon: meta
  },
  {
    id: "web-development",
    tag: "Web Development",
    color: "#0891b2",
    gradient: "linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)",
    lightBg: "rgba(8,145,178,0.06)",
    metricValue: "+180%",
    icon: web
  },
  // {
  //   id: "tiktok",
  //   tag: "TikTok Ads",
  //   tagline: "Attention + kreativa = rezultati",
  //   desc: "Kreiramo oglase koji privlače pažnju i pretvaraju je u rezultate kroz kreativan i brz content. Na TikTok-u pobedi kreativa — mi to znamo da iskoristimo.",
  //   color: "#e11d48",
  //   gradient: "linear-gradient(135deg, #e11d48 0%, #fb7185 100%)",
  //   lightBg: "rgba(225,29,72,0.06)",
  //   metrics: ["-42%", "CPM"],
  //   icon: (
  //     <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M28 8v22a6 6 0 1 1-6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  //       <path d="M28 8c2 4 5 6 9 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  //     </svg>
  //   ),
  // },
  // {
  //   id: "ostali",
  //   tag: "Ostali kanali",
  //   tagline: "LinkedIn · Microsoft Ads · i više",
  //   desc: "Koristimo dodatne kanale za proširenje reach-a i pronalazak novih prilika za rast. Pravi kanal, pravo vreme, prava publika.",
  //   color: "#0891b2",
  //   gradient: "linear-gradient(135deg, #0891b2 0%, #22d3ee 100%)",
  //   lightBg: "rgba(8,145,178,0.06)",
  //   metrics: ["+2.1×", "Reach"],
  //   icon: (
  //     <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.2"/>
  //       <ellipse cx="24" cy="24" rx="7" ry="16" stroke="currentColor" strokeWidth="2.2"/>
  //       <line x1="8" y1="24" x2="40" y2="24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  //       <line x1="10" y1="16" x2="38" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  //       <line x1="10" y1="32" x2="38" y2="32" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
  //     </svg>
  //   ),
  // },
];

export default function Services() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const services = serviceMeta.map((m, i) => ({
    ...m,
    ...t.services.items[i],
    metrics: [m.metricValue, t.services.items[i].metricLabel],
  }));
  const s = services[active];

  return (
    <section className="usluge" id="usluge">

      {/* Dark gradient top band */}
      <div className="usluge__band" aria-hidden="true">
        <div className="usluge__band-glow" style={{ background: s.gradient }} />
      </div>

      <div className="usluge__inner">

        {/* Header */}
        <div className="usluge__header">
          <span className="usluge__eyebrow">{t.services.eyebrow}</span>
          <h2 className="usluge__title">
            {t.services.titleLine1}<br />
            <span className="usluge__title-em">{t.services.titleEm}</span>
          </h2>
          <p className="usluge__lead">
            {t.services.lead}
          </p>
        </div>

        {/* Tab nav */}
        <div className="usluge__tabs" role="tablist">
          {services.map((sv, i) => (
            <button
              key={sv.id}
              role="tab"
              aria-selected={active === i}
              className={`usluge__tab${active === i ? " usluge__tab--on" : ""}`}
              style={{ "--tc": sv.color }}
              onClick={() => setActive(i)}
            >
              <span className="usluge__tab-icon" style={{ color: sv.color }}>
                <img src={sv.icon} alt="logo"/>
              </span>
              {sv.tag}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div
          className="usluge__panel"
          key={active}
          role="tabpanel"
        >
          {/* Left: icon + text */}
          <div className="usluge__panel-left">
            <div
              className="usluge__big-icon"
              style={{ background: s.lightBg, color: s.color }}
            >
              <img src={s.icon} alt="logo"/>
            </div>

            <div
              className="usluge__tag-pill"
              style={{ background: s.lightBg, color: s.color }}
            >
              {s.tag}
            </div>

            <h3 className="usluge__panel-title">{s.tagline}</h3>
            <p className="usluge__panel-desc">{s.desc}</p>

            <Link to='/zakazi-call' className="usluge__panel-cta" style={{ "--pc": s.color }}>
              {t.services.ctaCampaign}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            <Link to='/portfolio' className="usluge__panel-cta portf" style={{ "--pc": s.color }}>
              {t.services.ctaPortfolio}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

          </div>

          <div className="usluge__panel-right">

            {/* Animated metric card */}
            <div className="usluge__metric-wrap">
              <div className="usluge__metric-card" style={{ "--gc": s.gradient }}>
                <div className="usluge__metric-ring" />
                <div className="usluge__metric-ring usluge__metric-ring--2" />
                <div className="usluge__metric-num">{s.metrics[0]}</div>
                <div className="usluge__metric-label">{s.metrics[1]}</div>
              </div>

              {/* Mini feature list */}
            <div className="usluge__features">
                {s.features.map((f, i) => (
                  <div key={i} className="usluge__feature" style={{ "--fi": i, "--fc": s.color }}>
                    <span className="usluge__feature-check">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {f}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}