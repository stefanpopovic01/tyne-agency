import "./AboutUs.css";
import { Link } from "react-router-dom";

const pillars = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"/><path d="M7 16l4-6 4 4 4-7"/>
      </svg>
    ),
    label: "Podaci prvo",
    desc: "Svaka odluka potkrepljena je brojevima, ne pretpostavkama.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.3-6.7-2.1 2.1M8.4 15.6l-2.1 2.1m0-11.4 2.1 2.1m5.1 5.1 2.1 2.1"/>
      </svg>
    ),
    label: "Kontinuirana optimizacija",
    desc: "Kampanje se ne puštaju i zaboravljaju — pratimo, testiramo i unapređujemo.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 12l2.5 2.5L16 9"/>
      </svg>
    ),
    label: "Prilagođen pristup",
    desc: "Nema generičkih rešenja — strategija se gradi oko vašeg biznisa.",
  },
];

export default function AboutUs() {
  return (
    <section className="onama" id="o-nama">

      {/* Subtle background accent */}
      <div className="onama__bg" aria-hidden="true">
        <div className="onama__accent" />
      </div>

      <div className="onama__inner">

        {/* Left col — text */}
        <div className="onama__left">
          <span className="onama__eyebrow">O nama</span>

          <h2 className="onama__title">
            Rast koji se<br />
            <span className="onama__title-em">meri, ne pretpostavlja.</span>
          </h2>

          <div className="onama__body">
            <p>
              Specijalizovani smo za performance marketing i radimo sa firmama
              koje žele <strong>stabilan i merljiv rast</strong>.
            </p>
            <p>
              Naš pristup je jednostavan: fokus na podatke, kontinuirana
              optimizacija i strategije koje <strong>donose rezultate</strong>.
            </p>
            <p>
              Ne verujemo u "jedno rešenje za sve" — svaki biznis zahteva
              drugačiji pristup i prilagođene kampanje.
            </p>
          </div>

          <Link to="/kontakt" className="onama__cta">
            Upoznajte nas
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
            <span className="onama__stat-txt">zadovoljnih klijenata</span>
          </div>
        </div>

      </div>
    </section>
  );
}