import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ScheduleCall.css";
import { useLanguage } from "../../i18n/LanguageContext";

// Generate next 14 available days (skip Sundays & Saturday)
function getAvailableDays(dayNames, monthNames) {
  const days = [];
  const today = new Date();
  let d = new Date(today);
  d.setDate(d.getDate() + 1);
  while (days.length < 15) {
    const day = d.getDay();
    if (day !== 0 && day !== 6) { // skip Sunday (0) i Saturday (6)
      days.push({
        date: new Date(d),
        day: dayNames[day],
        num: d.getDate(),
        month: monthNames[d.getMonth()],
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return days;
}

const timeSlots = ["09:00","10:00","11:00","12:00","13:00", "14:00","15:00","16:00"];

export default function ScheduleCall() {
  const { t } = useLanguage();
  const steps = t.scheduleCall.steps;
  const days = getAvailableDays(t.scheduleCall.dayNames, t.scheduleCall.monthNames);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ ime: "", email: "", telefon: "", kompanija: "", napomena: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const canSubmit = selectedDay !== null && selectedTime !== null && form.ime && form.email && form.telefon;
  const navigate = useNavigate();

  return (
    <div className="zc-page">
      <div className="zc-inner">

        <div className="zc-right">
          {!sent ? (
            <>
              <div className="zc-form-header">
                <span className="zc-eyebrow">{t.scheduleCall.eyebrow}</span>
                <h2 className="zc-form-title">{t.scheduleCall.formTitle}</h2>
                <p className="zc-form-sub">{t.scheduleCall.formSub}</p>
              </div>

              <form
                className="zc-form"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!canSubmit) return;

                  const data = new FormData(e.target);

                  if (selectedDay !== null && selectedTime !== null) {
                    data.append("datum", `${days[selectedDay].day}, ${days[selectedDay].num}. ${days[selectedDay].month}`);
                    data.append("vreme", timeSlots[selectedTime]);
                  }

                  await fetch("https://formspree.io/f/xojzjayl", {
                    method: "POST",
                    body: data,
                    headers: { Accept: "application/json" },
                  });

                  setSent(true);
                  navigate("/zakazi-call/uspesno");
                }}
              >
                {/* Date picker */}
                <div className="zc-section-label">{t.scheduleCall.chooseDateLabel}</div>
                <div className="zc-days">
                  {days.map((d, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`zc-day${selectedDay === i ? " zc-day--on" : ""}`}
                      onClick={() => { setSelectedDay(i); setSelectedTime(null); }}
                    >
                      <span className="zc-day-name">{d.day}</span>
                      <span className="zc-day-num">{d.num}</span>
                      <span className="zc-day-month">{d.month}</span>
                    </button>
                  ))}
                </div>

                {/* Time slots */}
                <div className="zc-section-label">
                  {t.scheduleCall.chooseTimeLabel}
                  {selectedDay === null && <span className="zc-hint"> {t.scheduleCall.chooseTimeHint}</span>}
                </div>
                <div className="zc-times">
                  {timeSlots.map((t, i) => (
                    <button
                      key={i}
                      type="button"
                      disabled={selectedDay === null}
                      className={`zc-time${selectedTime === i ? " zc-time--on" : ""}`}
                      onClick={() => setSelectedTime(i)}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                {/* Selected summary */}
                {selectedDay !== null && selectedTime !== null && (
                  <div className="zc-selected-summary">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {days[selectedDay].day}, {days[selectedDay].num}. {days[selectedDay].month} {t.scheduleCall.atWord} {timeSlots[selectedTime]}
                  </div>
                )}

                <div className="zc-divider" />

                {/* Personal info */}
                <div className="zc-row">
                  <div className="zc-field">
                    <label className="zc-label" htmlFor="zc-ime">{t.scheduleCall.nameLabel}</label>
                    <input id="zc-ime" name="ime" type="text" required placeholder={t.scheduleCall.namePlaceholder} className="zc-input" value={form.ime} onChange={handle}/>
                  </div>
                  <div className="zc-field">
                    <label className="zc-label" htmlFor="zc-email">{t.scheduleCall.emailLabel}</label>
                    <input id="zc-email" name="email" type="email" required placeholder={t.scheduleCall.emailPlaceholder} className="zc-input" value={form.email} onChange={handle}/>
                  </div>
                </div>

                <div className="zc-field">
                  <label className="zc-label" htmlFor="zc-telefon">{t.scheduleCall.phoneLabel}</label>
                  <input id="zc-telefon" name="telefon" type="tel" required placeholder={t.scheduleCall.phonePlaceholder} className="zc-input" value={form.telefon} onChange={handle}/>
                </div>

                <div className="zc-field">
                  <label className="zc-label" htmlFor="zc-kompanija">{t.scheduleCall.companyLabel}</label>
                  <input id="zc-kompanija" name="kompanija" type="text" placeholder={t.scheduleCall.companyPlaceholder} className="zc-input" value={form.kompanija} onChange={handle} required/>
                </div>

                <div className="zc-field">
                  <label className="zc-label" htmlFor="zc-napomena">{t.scheduleCall.noteLabel}</label>
                <textarea
                  id="zc-napomena"
                  name="napomena"
                  required
                  rows={3}
                  maxLength={500}
                  placeholder={t.scheduleCall.notePlaceholder}
                  className="zc-input zc-textarea"
                  value={form.napomena}
                  onChange={handle}
                />                </div>

                <button type="submit" className={`zc-submit${!canSubmit ? " zc-submit--disabled" : ""}`} disabled={!canSubmit}>
                  {t.scheduleCall.submit}
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </button>
              </form>
            </>
          ) : (
            <div className="zc-success">
              <div className="zc-success-icon">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0b5bf2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="zc-success-title">{t.scheduleCall.successTitle}</h2>
              <p className="zc-success-text">
                {t.scheduleCall.successTextPre}<strong>{days[selectedDay]?.day}, {days[selectedDay]?.num}. {days[selectedDay]?.month}</strong>{t.scheduleCall.successTextAt}<strong>{timeSlots[selectedTime]}</strong>.
                <br />{t.scheduleCall.successContactPre}{form.email}{t.scheduleCall.successContactPost}
              </p>
              <button className="zc-submit" style={{ maxWidth: "240px" }} onClick={() => { setSent(false); setSelectedDay(null); setSelectedTime(null); }}>
                {t.scheduleCall.successBtn}
              </button>
            </div>
          )}
        </div>

        {/* ══ LEFT — INFO ══ */}
        <div className="zc-left">
          <div className="zc-left-inner">

            <span className="zc-left-eyebrow">{t.scheduleCall.leftEyebrow}</span>
            <h1 className="zc-left-title">
              {t.scheduleCall.leftTitleLine1}<br />
              <span className="zc-left-em">{t.scheduleCall.leftTitleEm}</span>
            </h1>
            <p className="zc-left-desc">
              {t.scheduleCall.leftDesc}
            </p>

            {/* Steps */}
            <div className="zc-steps">
              {steps.map((s, i) => (
                <div className="zc-step" key={i}>
                  <div className="zc-step-num">{s.num}</div>
                  <div className="zc-step-text">{s.text}</div>
                </div>
              ))}
            </div>

            {/* What to expect */}
            <div className="zc-expect">
              <div className="zc-expect-title">{t.scheduleCall.expectTitle}</div>
              {t.scheduleCall.expectItems.map((item, i) => (
                <div className="zc-expect-item" key={i}>
                  <span className="zc-expect-check">
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>

            {/* Badges */}
            <div className="zc-badges">
              {t.scheduleCall.badges.map((b) => (
                <span className="zc-badge" key={b}>✓ {b}</span>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}