import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";

import mlazmatikDesktop from "../../assets/web/mlazmatik-desktop.webp";
import mlazmatikMobile from "../../assets/web/mlazmatik-mobile.webp";
import glowDesktop from "../../assets/web/glowatelier-desktop.webp";
import glowMobile from "../../assets/web/glowatelier-mobile.webp";
import oreskovicDesktop from "../../assets/web/oreskovic-desktop.webp";
import oreskovicMobile from "../../assets/web/oreskovic-mobile.webp";

// Order must match t.portfolio.web.projects.
// Screenshot heights are used to scale the hover-scroll duration to page length.
const projectsMeta = [
  { url: "https://www.mlazmatik.rs/", desktop: mlazmatikDesktop, mobile: mlazmatikMobile, dh: 5208, mh: 11578 },
  { url: "https://www.glowatelier.eu/", desktop: glowDesktop, mobile: glowMobile, dh: 5450, mh: 8096 },
  { url: "https://www.oreskovicclinic.com/", desktop: oreskovicDesktop, mobile: oreskovicMobile, dh: 7358, mh: 13036 },
];

const DESKTOP_W = 1200;
const MOBILE_W = 420;

const hostOf = (url) => new URL(url).host.replace(/^www\./, "");

function ArrowIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function BrowserDots() {
  return (
    <span className="pfw-dots" aria-hidden="true">
      <i /><i /><i />
    </span>
  );
}

function WebLightbox({ project, onClose }) {
  const { t } = useLanguage();
  const w = t.portfolio.web;
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const isMobile = device === "mobile";

  // Portal to <body>: the tab's entrance animation uses a transform, which
  // would otherwise turn this fixed overlay into one scoped to the tab panel.
  return createPortal(
    <div className="pfw-lb" role="dialog" aria-modal="true" aria-label={project.title} onClick={onClose}>
      <div className="pfw-lb-bar" onClick={(e) => e.stopPropagation()}>
        <div className="pfw-lb-title">
          <BrowserDots />
          <span className="pfw-lb-host">{hostOf(project.url)}</span>
        </div>
        <div className="pfw-lb-toggle" role="tablist">
          {["desktop", "mobile"].map((d) => (
            <button
              key={d}
              role="tab"
              aria-selected={device === d}
              className={`pfw-lb-toggle-btn${device === d ? " is-on" : ""}`}
              onClick={() => setDevice(d)}
            >
              {w[d]}
            </button>
          ))}
        </div>
        <div className="pfw-lb-actions">
          <a href={project.url} target="_blank" rel="noopener noreferrer" className="pfw-lb-visit">
            {w.visit} <ExternalIcon />
          </a>
          <button className="pfw-lb-close" onClick={onClose} aria-label={w.close}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div className="pfw-lb-scroll">
        <div
          className={`pfw-lb-page${isMobile ? " is-mobile" : ""}`}
          onClick={(e) => e.stopPropagation()}
          key={device}
        >
          <img
            src={isMobile ? project.mobile : project.desktop}
            width={isMobile ? MOBILE_W : DESKTOP_W}
            height={isMobile ? project.mh : project.dh}
            alt={`${project.title} — ${w[device]}`}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function WebShowcase() {
  const { t, lp } = useLanguage();
  const w = t.portfolio.web;
  const projects = projectsMeta.map((m, i) => ({ ...m, ...w.projects[i] }));
  const [open, setOpen] = useState(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <div className="pfw">
      <p className="pfw-lead">{w.lead}</p>

      <div className="pfw-list">
        {projects.map((p, i) => (
          <article className={`pfw-item${i % 2 ? " pfw-item--flip" : ""}`} key={p.url}>
            {/* Preview */}
            <div
              className="pfw-stage"
              style={{
                "--dur-d": `${(p.dh / DESKTOP_W) * 1.1}s`,
                "--dur-m": `${(p.mh / MOBILE_W) * 0.22}s`,
              }}
            >
              <button
                type="button"
                className="pfw-browser"
                onClick={() => setOpen(i)}
                aria-label={`${w.viewFull}: ${p.title}`}
              >
                <span className="pfw-browser-bar">
                  <BrowserDots />
                  <span className="pfw-url">{hostOf(p.url)}</span>
                </span>
                <span className="pfw-screen">
                  <img
                    src={p.desktop}
                    width={DESKTOP_W}
                    height={p.dh}
                    alt={`${p.title} — ${w.desktop}`}
                    loading="lazy"
                    decoding="async"
                    className="pfw-shot pfw-shot--desktop"
                  />
                  <span className="pfw-hint">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                    {w.hoverHint}
                  </span>
                </span>
              </button>

              <div className="pfw-phone" aria-hidden="true">
                <span className="pfw-phone-notch" />
                <span className="pfw-phone-screen">
                  <img
                    src={p.mobile}
                    width={MOBILE_W}
                    height={p.mh}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="pfw-shot pfw-shot--mobile"
                  />
                </span>
              </div>
            </div>

            {/* Text */}
            <div className="pfw-body">
              <div className="pf-case-meta">
                <span className="pf-case-tag pfw-tag">{w.tab}</span>
                <span className="pf-case-industry">{p.industry}</span>
              </div>
              <h2 className="pf-case-title">{p.title}</h2>
              <p className="pfw-text">{p.text}</p>
              <ul className="pfw-chips">
                {p.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
              <div className="pfw-actions">
                <button type="button" className="pf-cta pfw-cta" onClick={() => setOpen(i)}>
                  {w.viewFull} <ArrowIcon />
                </button>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="pfw-visit">
                  {w.visit} <ExternalIcon />
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="pfw-bottom-cta">
        <Link to={lp("/zakazi-call")} className="pf-cta">
          {t.portfolio.ctaCall} <ArrowIcon />
        </Link>
      </div>

      {open !== null && <WebLightbox project={projects[open]} onClose={close} />}
    </div>
  );
}
