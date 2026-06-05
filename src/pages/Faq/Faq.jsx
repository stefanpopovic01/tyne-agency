import { useState } from "react";
import { Link } from "react-router-dom";

import "./Faq.css";

const faqs = [
  {
    q: "Koliki budžet je potreban?",
    a: "Preporučeni minimum je 300–500€ mesečno po platformi kako bi kampanje imale dovoljno podataka za optimizaciju.",
  },
  {
    q: "Kada mogu da očekujem rezultate?",
    a: "Prvi rezultati dolaze relativno brzo, dok se ozbiljniji i stabilan rast postiže kroz kontinuiranu optimizaciju u narednim nedeljama.",
  },
  {
    q: "Da li radite sa svim industrijama?",
    a: "Radimo sa biznisima koji žele rast kroz online oglašavanje, uz fokus na one gde možemo doneti konkretne i merljive rezultate.",
  },
  {
    q: "Da li radite i sa malim biznisima?",
    a: "Da — radimo sa firmama svih veličina, ali je važno da postoji budžet koji omogućava testiranje i optimizaciju kampanja.",
  },
  {
    q: "Šta je uključeno u cenu?",
    a: "Cena uključuje kompletnu strategiju, setup kampanja, kontinuiranu optimizaciju i redovno izveštavanje.",
  },
  {
    q: "Da li vi pravite oglase (kreativu)?",
    a: "Da, pomažemo u kreiranju i testiranju oglasa kako bi kampanje imale što bolje performanse.",
  },
  {
    q: "Da li mogu da radim samo jednu platformu?",
    a: "Naravno — možete izabrati Google ili Meta, u zavisnosti od vaših ciljeva i biznisa.",
  },
  {
    q: "Kako izgleda saradnja?",
    a: "Nakon inicijalnog call-a definišemo strategiju, postavljamo kampanje i kontinuirano radimo na optimizaciji i rastu.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="faq" id="faq">

      <div className="faq__bg" aria-hidden="true">
        <div className="faq__blob faq__blob--a" />
        <div className="faq__blob faq__blob--b" />
      </div>

      <div className="faq__inner">

        {/* Header */}
        <div className="faq__header">
          <span className="faq__eyebrow">FAQ</span>
          <h2 className="faq__title">
            Imate pitanja?<br />
            <span className="faq__title-em">Imamo odgovore.</span>
          </h2>
          <p className="faq__lead">
            Sve što ste hteli da pitate pre nego što se odlučite.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="faq__grid">
          {/* Left col */}
          <div className="faq__col">
            {faqs.slice(0, 4).map((f, i) => (
              <FaqItem
                key={i}
                index={i}
                q={f.q}
                a={f.a}
                isOpen={open === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
          {/* Right col */}
          <div className="faq__col">
            {faqs.slice(4).map((f, i) => (
              <FaqItem
                key={i + 4}
                index={i + 4}
                q={f.q}
                a={f.a}
                isOpen={open === i + 4}
                onToggle={() => toggle(i + 4)}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="faq__bottom">
          <p>Niste pronašli odgovor koji tražite?</p>
          <Link to='/kontakt' className="faq__cta">
            Pošaljite nam pitanje
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}

function FaqItem({ index, q, a, isOpen, onToggle }) {
  return (
    <div
      className={`faq__item${isOpen ? " faq__item--open" : ""}`}
      style={{ "--i": index % 4 }}
    >
      <button
        className="faq__question"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="faq__q-text">{q}</span>
        <span className="faq__icon" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      <div className="faq__answer-wrap">
        {isOpen && (
          <p className="faq__answer">{a}</p>
        )}
      </div>
    </div>
  );
}