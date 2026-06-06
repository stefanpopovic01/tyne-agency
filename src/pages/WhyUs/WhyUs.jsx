import "./WhyUs.css";
import { Link } from "react-router-dom";

const razlozi = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="M7 16l4-5 4 3 4-6"/>
      </svg>
    ),
    title: "Fokus na rezultate",
    text: "Svaka odluka je usmerena ka profitabilnom rastu — merljivo, transparentno.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
      </svg>
    ),
    title: "Podaci, ne pretpostavke",
    text: "Zasnivamo strategije na realnim podacima i kontinuiranoj optimizaciji.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    title: "Partner, ne izvođač",
    text: "Radimo kao deo vašeg tima, ulažemo u vaš uspeh jednako kao vi.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    title: "Bez praznih obećanja",
    text: "Jednostavnost i efikasnost — bez komplikacija, samo ono što radi.",
  },
];

const koraci = [
  {
    num: "01",
    title: "Analiza & strategija",
    text: "Razumemo vaš biznis, tržište i ciljeve pre nego što se napravi i jedan oglas.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Setup kampanja",
    text: "Postavljamo strukturu koja je odmah spremna za skaliranje i rast.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Optimizacija & skaliranje",
    text: "Kontinuirano unapređujemo performanse i povećavamo rezultate.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="zastomi" id="zasto-mi">

      {/* ── BG ── */}
      <div className="zastomi__bg" aria-hidden="true">
        <div className="zm__glow zm__glow--a" />
        <div className="zm__glow zm__glow--b" />
        {/* Subtle arc lines */}
        <svg className="zm__arcs" viewBox="0 0 1200 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 500 Q 600 100 1300 500" fill="none" stroke="rgba(11,91,242,0.06)" strokeWidth="1.5"/>
          <path d="M-100 560 Q 600 160 1300 560" fill="none" stroke="rgba(11,91,242,0.04)" strokeWidth="1"/>
        </svg>
      </div>

      <div className="zastomi__inner">

        {/* ══ TOP: ZAŠTO MI ══ */}
        <div className="zastomi__top">

          <div className="zastomi__left">
            <span className="zm__eyebrow">Zašto mi?</span>
            <h2 className="zm__title">
              Rezultati koji se<br />
              <span className="zm__title-em">vide na računu.</span>
            </h2>
            <p className="zm__body">
              Fokusirani smo na rezultate i profitabilan rast, uz jasan uvid u
              sve što radimo. Verujemo u jednostavnost i efikasnost —
              bez nepotrebnih komplikacija i praznih obećanja.
            </p>
            <Link to='/zakazi-call' className="zm__cta">
              Zakaži besplatnu konsultaciju
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          <div className="zastomi__right">
            {razlozi.map((r, i) => (
              <div className="zm__card" key={i} style={{ "--i": i }}>
                <span className="zm__card-icon">{r.icon}</span>
                <div>
                  <div className="zm__card-title">{r.title}</div>
                  <div className="zm__card-text">{r.text}</div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* ══ DIVIDER ══ */}
        <div className="zastomi__sep" aria-hidden="true">
          <span className="zastomi__sep-line" />
          <span className="zastomi__sep-label">Kako radimo?</span>
          <span className="zastomi__sep-line" />
        </div>

        <div className="zastomi__steps">
          {koraci.map((k, i) => (
            <div className="zm__step" key={i} style={{ "--i": i }}>
              {/* Connector line (not after last) */}
              {i < koraci.length - 1 && (
                <div className="zm__step-line" aria-hidden="true" />
              )}

              <div className="zm__step-head">
                <div className="zm__step-num">{k.num}</div>
                <div className="zm__step-icon">{k.icon}</div>
              </div>

              <div className="zm__step-body">
                <div className="zm__step-title">{k.title}</div>
                <div className="zm__step-text">{k.text}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}