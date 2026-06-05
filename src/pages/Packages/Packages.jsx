import "./Packages.css";
import { Link } from "react-router-dom";

const paketi = [
  {
    id: "single",
    badge: null,
    name: "Single Platform",
    sub: "Jedna platforma",
    price: "300€",
    priceNote: "+ 10% ad budžeta / mesečno",
    desc: "Idealno za firme koje žele stabilan početak i prve rezultate.",
    features: [
      "Google ili Meta Ads",
      "Setup i vođenje kampanja",
      "Kontinuirana optimizacija",
      "Mesečni izveštaj",
    ],
    cta: "Zakaži Call",
    featured: false,
  },
  {
    id: "fullfunnel",
    badge: "Najpopularnije",
    name: "Full Funnel",
    sub: "Dve platforme",
    price: "500€",
    priceNote: "+ 10% ad budžeta / mesečno",
    desc: "Idealno za firme koje žele ozbiljan i kontinuiran rast.",
    features: [
      "Google + Meta Ads",
      "Kompletan marketing funnel",
      "Akvizicija + retargeting",
      "Napredna optimizacija i testiranje",
      "Strategija skaliranja",
    ],
    cta: "Zakaži Call",
    featured: true,
  },
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M2.5 7l3 3 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Packages() {
  return (
    <section className="paketi" id="paketi">

      {/* bg texture */}
      <div className="paketi__bg" aria-hidden="true">
        <div className="paketi__blob paketi__blob--a" />
        <div className="paketi__blob paketi__blob--b" />
      </div>

      <div className="paketi__inner">

        {/* Header */}
        <div className="paketi__header">
          <span className="paketi__eyebrow">Paketi</span>
          <h2 className="paketi__title">
            Transparentne cene.<br />
            <span className="paketi__title-em">Merljivi rezultati.</span>
          </h2>
          <p className="paketi__lead">
            Bez skrivenih troškova. Plaćate samo ono što vidite — i vidite tačno šta dobijate.
          </p>
        </div>

        {/* Cards */}
        <div className="paketi__grid">
          {paketi.map((p, i) => (
            <div
              key={p.id}
              className={`paket${p.featured ? " paket--featured" : ""}`}
              style={{ "--i": i }}
            >
              {/* Badge */}
              {p.badge && (
                <div className="paket__badge">{p.badge}</div>
              )}

              {/* Top */}
              <div className="paket__top">
                <div className="paket__names">
                  <span className="paket__name">{p.name}</span>
                  <span className="paket__sub">{p.sub}</span>
                </div>
                <div className="paket__price-wrap">
                  <span className="paket__from">od</span>
                  <span className="paket__price">{p.price}</span>
                </div>
                <span className="paket__price-note">{p.priceNote}</span>
              </div>

              {/* Divider */}
              <div className="paket__divider" />

              {/* Features */}
              <ul className="paket__features">
                {p.features.map((f, fi) => (
                  <li key={fi} className="paket__feature" style={{ "--fi": fi }}>
                    <span className="paket__check">
                      <CheckIcon />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Desc */}
              <p className="paket__desc">{p.desc}</p>

              {/* CTA */}
              <Link
                to="/zakazi-call"
                className={`paket__cta${p.featured ? " paket__cta--featured" : ""}`}
              >
                {p.cta}
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="paketi__note">
          Niste sigurni koji paket odgovara vašem biznisu?
          <Link to='/zakazi-call' className="paketi__note-link">Razgovarajmo — besplatno.</Link>
        </p>

      </div>
    </section>
  );
}