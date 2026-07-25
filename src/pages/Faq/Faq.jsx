import { useState } from "react";
import { Link } from "react-router-dom";

import "./Faq.css";
import { useLanguage } from "../../i18n/LanguageContext";

export default function FAQ() {
  const { t } = useLanguage();
  const faqs = t.faq.items;
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
          <span className="faq__eyebrow">{t.faq.eyebrow}</span>
          <h2 className="faq__title">
            {t.faq.titleLine1}<br />
            <span className="faq__title-em">{t.faq.titleEm}</span>
          </h2>
          <p className="faq__lead">
            {t.faq.lead}
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
          <p>{t.faq.bottomText}</p>
          <Link to='/kontakt' className="faq__cta">
            {t.faq.bottomCta}
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