import { useState } from "react";
import "./Portfolio.css";
import googleCase from "../../assets/p-google1.webp";
import metaCase from "../../assets/p-meta1.webp";
import metaLogo from "../../assets/meta.png";
import googleLogo from "../../assets/google.png";

const channels = [
  {
    id: "google",
    label: "Google Ads",
    color: "#0b5bf2",
    gradient: "linear-gradient(135deg, #0b5bf2 0%, #3b82f6 100%)",
    lightBg: "rgba(11,91,242,0.07)",
    icon: googleLogo,
    cases: [
      {
        // title: "Google Ads — Search kampanja",
        industry: "E-commerce",
        image: googleCase,
        metrics: [
          { label: "Impresije", value: "42.167" },
          { label: "Klikovi", value: "8.527" },
          { label: "CTR", value: "20,22%" },
          { label: "Konverzije", value: "89" },
          { label: "Conv. vrednost", value: "1,73M RSD" },
          { label: "ROAS", value: "15.14×" },
        ],
        text: `Pre pokretanja kampanja izvršen je kompletan tehnički setup merenja i atribucije kako bi svi podaci bili precizno prikupljeni i pravilno povezani. To je uključivalo implementaciju i konfiguraciju Google Tag Manager-a (GTM), Google Analytics 4 (GA4), podešavanje konverzija u Google Ads-u, povezivanje Google Ads i GA4 naloga, kao i testiranje i validaciju svih događaja i konverzija radi pouzdanog praćenja rezultata i optimizacije kampanja.

Kroz detaljnu optimizaciju ključnih reči, oglasa i strategije, kampanja je ostvarila preko 42.000 prikaza, 8.500 klikova i 89 konverzija, uz CTR od 20,22%.

Kampanja je generisala više od 1,73 miliona RSD vrednosti konverzija, što predstavlja ROAS od 15,14x — svaki uloženi dinar doneo je preko 15 dinara vrednosti. Rezultati su ostvareni kroz kontinuirano praćenje performansi, testiranje oglasa i optimizaciju kampanja sa fokusom na profitabilan rast.`,
      },

    ],
  },
  {
    id: "meta",
    label: "Meta Ads",
    color: "#0b5bf2",
    gradient: "linear-gradient(135deg, #0b5bf2 0%, #3b82f6 100%)",
    lightBg: "rgba(124,58,237,0.07)",
    icon: metaLogo,
    cases: [
      {
        // title: "Meta Ads — Lead Generation",
        industry: "Lead Generation",
        image: metaCase, 
        metrics: [
          { label: "Registracije", value: "2.358" },
          { label: "CPA", value: "$2.26" },
          { label: "Ukupna potrošnja", value: "$5.326" },
          { label: "Impresije", value: "2,86M+" },
          { label: "Doseg", value: "766K+" },
        ],
        text: `Pre pokretanja kampanja izvršen je kompletan tehnički setup i povezivanje svih relevantnih platformi za precizno praćenje performansi. To je uključivalo implementaciju Meta Pixel-a, Conversions API (CAPI), Google Tag Manager-a (GTM) i Google Analytics 4 (GA4), kao i verifikaciju događaja i testiranje ispravnosti prenosa podataka kako bi optimizacija kampanja bila zasnovana na pouzdanim i tačnim podacima.

Kroz kontinuirano testiranje kreativa, optimizaciju publika i budžeta, kampanje su ostvarile ukupno 2.358 registracija po prosečnoj ceni od $2.26 po registraciji.

Ukupno je potrošeno $5.326,74, uz ostvarenih preko 2,86 miliona impresija i 766.000+ dosegnutih korisnika. Fokus kampanja bio je na skaliranju profitabilnih ad setova, poboljšanju performansi i održavanju stabilnog troška akvizicije tokom celog perioda.`,
      },
    ],
  },
];

export default function Portfolio() {
  const [activeChannel, setActiveChannel] = useState(0);
  const [activeCase, setActiveCase] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const channel = channels[activeChannel];
  const currentCase = channel.cases[activeCase];
  const hasMultiple = channel.cases.length > 1;

  const handleChannelSwitch = (i) => {
    setActiveChannel(i);
    setActiveCase(0);
  };

  return (
    <div className="portfolio-page">
      <div className="pf-inner">

        {/* Header */}
        <div className="pf-header">
          <span className="pf-eyebrow">Portfolio</span>
          <h1 className="pf-title">
            Rezultati koji<br />
            <span className="pf-title-em">govore sami za sebe.</span>
          </h1>
          <p className="pf-lead">
            Konkretni primeri kampanja, brojevi i strategije na koje smo ponosni.
          </p>
        </div>

        {/* Channel tabs */}
        <div className="pf-tabs">
          {channels.map((ch, i) => (
            <button
              key={ch.id}
              className={`pf-tab${activeChannel === i ? " pf-tab--on" : ""}`}
              style={{ "--tc": ch.color }}
              onClick={() => handleChannelSwitch(i)}
            >
              <span className="pf-tab-icon" style={{ color: ch.color }}><img src={ch.icon} alt="logo"/></span>
              {ch.label}
            </button>
          ))}
        </div>

        {/* Case study */}
        <div className="pf-case" key={`${activeChannel}-${activeCase}`}>

          {/* Left — image */}
          <div className="pf-case-left">
            <div className="pf-img-wrap" onClick={() => currentCase.image && setLightboxOpen(true)}>
              {currentCase.image ? (
                <>
                  <img src={currentCase.image} alt={currentCase.title} className="pf-img" />
                  <div className="pf-img-overlay">
                    <span className="pf-img-zoom">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                      </svg>
                      Uvećaj
                    </span>
                  </div>
                </>
              ) : (
                <div className="pf-img-placeholder" style={{ background: channel.lightBg }}>
                  <span style={{ color: channel.color, opacity: 0.4 }}>Slika uskoro</span>
                </div>
              )}
            </div>

            {/* Case navigation */}
            {hasMultiple && (
              <div className="pf-nav">
                <button
                  className="pf-nav-btn"
                  disabled={activeCase === 0}
                  onClick={() => setActiveCase((v) => v - 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className="pf-nav-count">{activeCase + 1} / {channel.cases.length}</span>
                <button
                  className="pf-nav-btn"
                  disabled={activeCase === channel.cases.length - 1}
                  onClick={() => setActiveCase((v) => v + 1)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Right — text */}
          <div className="pf-case-right">
            <div className="pf-case-meta">
              <span className="pf-case-tag" style={{ background: channel.lightBg, color: channel.color }}>
                {channel.label}
              </span>
              <span className="pf-case-industry">{currentCase.industry}</span>
            </div>

            <h2 className="pf-case-title">{currentCase.title}</h2>

            {/* Metrics grid */}
            <div className="pf-metrics">
              {currentCase.metrics.map((m, i) => (
                <div className="pf-metric" key={i}>
                  <span className="pf-metric-val" style={{ color: channel.color }}>{m.value}</span>
                  <span className="pf-metric-label">{m.label}</span>
                </div>
              ))}
            </div>

            {/* Text */}
            <div className="pf-case-text">
              {currentCase.text.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <a href="/zakazi-call" className="pf-cta">
              Zakaži besplatan call
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentCase.image && (
        <div className="pf-lightbox" onClick={() => setLightboxOpen(false)}>
          <button className="pf-lightbox-close" onClick={() => setLightboxOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <img
            src={currentCase.image}
            alt={currentCase.title}
            className="pf-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}