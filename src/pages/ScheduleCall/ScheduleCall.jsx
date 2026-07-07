import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ScheduleCall.css";

// Generate next 14 available days (skip Sundays & Saturday)
function getAvailableDays() {
  const days = [];
  const dayNames = ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub"];
  const monthNames = ["Jan","Feb","Mar","Apr","Maj","Jun","Jul","Avg","Sep","Okt","Nov","Dec"];
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

const steps = [
  { num: "01", text: "Odaberite datum i vreme" },
  { num: "02", text: "Popunite podatke" },
  { num: "03", text: "Potvrdite rezervaciju" },
];

export default function ScheduleCall() {
  const days = getAvailableDays();
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [form, setForm] = useState({ ime: "", email: "", kompanija: "", napomena: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const canSubmit = selectedDay !== null && selectedTime !== null && form.ime && form.email;
  const navigate = useNavigate();

  return (
    <div className="zc-page">
      <div className="zc-inner">

        <div className="zc-right">
          {!sent ? (
            <>
              <div className="zc-form-header">
                <span className="zc-eyebrow">Besplatna konsultacija</span>
                <h2 className="zc-form-title">Odaberi termin</h2>
                <p className="zc-form-sub">Bez obaveza · 30 minuta · Online</p>
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
                <div className="zc-section-label">Odaberite datum</div>
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
                  Odaberite vreme
                  {selectedDay === null && <span className="zc-hint"> — prvo odaberite datum</span>}
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
                    {days[selectedDay].day}, {days[selectedDay].num}. {days[selectedDay].month} u {timeSlots[selectedTime]}
                  </div>
                )}

                <div className="zc-divider" />

                {/* Personal info */}
                <div className="zc-row">
                  <div className="zc-field">
                    <label className="zc-label" htmlFor="zc-ime">Ime i prezime *</label>
                    <input id="zc-ime" name="ime" type="text" required placeholder="Marko Marković" className="zc-input" value={form.ime} onChange={handle}/>
                  </div>
                  <div className="zc-field">
                    <label className="zc-label" htmlFor="zc-email">Email adresa *</label>
                    <input id="zc-email" name="email" type="email" required placeholder="marko@firma.com" className="zc-input" value={form.email} onChange={handle}/>
                  </div>
                </div>

                <div className="zc-field">
                  <label className="zc-label" htmlFor="zc-kompanija">Sajt kompanije *</label>
                  <input id="zc-kompanija" name="kompanija" type="text" placeholder="www.sajt.com" className="zc-input" value={form.kompanija} onChange={handle} required/>
                </div>

                <div className="zc-field">
                  <label className="zc-label" htmlFor="zc-napomena">Napomena *</label>
                  <textarea id="zc-napomena" name="napomena" required rows={3} placeholder="Kratko opišite vaš biznis ili šta biste voleli da razgovaramo..." className="zc-input zc-textarea" value={form.napomena} onChange={handle}/>
                </div>

                <button type="submit" className={`zc-submit${!canSubmit ? " zc-submit--disabled" : ""}`} disabled={!canSubmit}>
                  Potvrdi rezervaciju
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
              <h2 className="zc-success-title">Primili smo vaš zahtev!</h2>
              <p className="zc-success-text">
                Vidimo se <strong>{days[selectedDay]?.day}, {days[selectedDay]?.num}. {days[selectedDay]?.month}</strong> u <strong>{timeSlots[selectedTime]}</strong>.
                <br />Kontaktiraćemo vas na {form.email} i potvrditi termin.
              </p>
              <button className="zc-submit" style={{ maxWidth: "240px" }} onClick={() => { setSent(false); setSelectedDay(null); setSelectedTime(null); }}>
                Zakaži novi termin
              </button>
            </div>
          )}
        </div>

        {/* ══ LEFT — INFO ══ */}
        <div className="zc-left">
          <div className="zc-left-inner">

            <span className="zc-left-eyebrow">Zakaži call</span>
            <h1 className="zc-left-title">
              30 minuta koje<br />
              <span className="zc-left-em">mogu da promene sve.</span>
            </h1>
            <p className="zc-left-desc">
              Tokom poziva ćemo zajedno proći kroz vaš biznis,
              definisati ciljeve i pokazati vam konkretno kako
              možemo da donesemo rezultate.
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
              <div className="zc-expect-title">Tokom poziva:</div>
              {[
                "Analiziraćemo vaš biznis i tržište",
                "Predložićemo strategiju rasta",
                "Pokazaćemo konkretne korake napred",
              ].map((item, i) => (
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
              <span className="zc-badge">✓ Bez obaveza</span>
              <span className="zc-badge">✓ 100% besplatno</span>
              <span className="zc-badge">✓ Online</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}