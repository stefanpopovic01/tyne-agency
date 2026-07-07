import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Contact.css";

export default function Contact() {
  const [form, setForm] = useState({
    ime: "", email: "", telefon: "", kompanija: "", poruka: "",
  });
  const [sent, setSent] = useState(false);

  const handle = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const navigate = useNavigate();

  return (
    <div className="kontakt-page">
      <div className="kontakt-inner">

        {/* ── LEFT — info ── */}
        <div className="k-left">
          <span className="k-eyebrow">Kontakt</span>
          <h1 className="k-title">
            Razgovarajmo o<br />
            <span className="k-title-em">vašem rastu.</span>
          </h1>
          <p className="k-desc">
            Popunite formu ili nas kontaktirajte direktno.
            Odgovaramo u roku od 24h.
          </p>

          {/* Info cards */}
          <div className="k-cards">
            {/* <a href="mailto:hello@tyneagency.com" className="k-card">
              <div className="k-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <div className="k-card-label">Email</div>
                <div className="k-card-value">hello@tyne.rs</div>
              </div>
            </a> */}

            <a href="tel:+381600000000" className="k-card">
              <div className="k-card-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.63 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <div className="k-card-label">Telefon</div>
                <div className="k-card-value">+381 69 1258 825</div>
              </div>
            </a>
          </div>

          {/* Dark CTA block */}
          <div className="k-dark-block">
            <div className="k-dark-block-text">
              <span className="k-dark-block-title">Preferirate poziv?</span>
              <span className="k-dark-block-sub">Zakažite besplatan 30-minutni razgovor.</span>
            </div>
            {/* <a href="https://calendly.com" target="_blank" rel="noopener noreferrer" className="k-dark-block-btn">
              Zakaži call
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a> */}
            <Link to='/zakazi-call' className="k-dark-block-btn">
              Zakaži call
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* ── RIGHT — form ── */}
        <div className="k-right">
          {!sent ? (
            <>
              <div className="k-form-header">
                <h2 className="k-form-title">Pošaljite poruku</h2>
                <p className="k-form-sub">Sva polja označena sa * su obavezna.</p>
              </div>

                <form
                  className="k-form"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    
                    const data = new FormData(e.target);
                    
                    await fetch("https://formspree.io/f/mzdqdpjr", {
                      method: "POST",
                      body: data,
                      headers: { Accept: "application/json" },
                    });

                    setSent(true);
                    navigate("/kontakt/uspesno");
                  }}
                >
                  <div className="k-row">
                  <div className="k-field">
                    <label className="k-label" htmlFor="ime">Ime i prezime *</label>
                    <input id="ime" name="ime" type="text" required placeholder="Marko Marković" className="k-input" value={form.ime} onChange={handle}/>
                  </div>
                  <div className="k-field">
                    <label className="k-label" htmlFor="email">Email adresa *</label>
                    <input id="email" name="email" type="email" required placeholder="marko@firma.com" className="k-input" value={form.email} onChange={handle}/>
                  </div>
                </div>

                <div className="k-row">
                  <div className="k-field">
                    <label className="k-label" htmlFor="telefon">Broj telefona</label>
                    <input id="telefon" name="telefon" type="tel" placeholder="+381 60 000 0000" className="k-input" value={form.telefon} onChange={handle}/>
                  </div>
                  <div className="k-field">
                    <label className="k-label" htmlFor="kompanija" >Sajt kompanije *</label>
                    <input id="kompanija" name="kompanija" type="text" required placeholder="www.sajt.com" className="k-input" value={form.kompanija} onChange={handle}/>
                  </div>
                </div>

                <div className="k-field">
                  <label className="k-label" htmlFor="poruka">Poruka *</label>
                  <textarea id="poruka" name="poruka" required rows={5} placeholder="Opišite vaš biznis i šta želite da postignete..." className="k-input k-textarea" value={form.poruka} onChange={handle}/>
                </div>

                <button type="submit" className="k-submit">
                  Pošaljite poruku
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                  </svg>
                </button>
              </form>
            </>
          ) : (
            <div className="k-success">
              <div className="k-success-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0b5bf2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 className="k-success-title">Poruka poslata!</h2>
              <p className="k-success-text">Hvala vam. Javićemo se u roku od 24h.</p>
              <button className="k-submit" style={{maxWidth: "260px"}} onClick={() => setSent(false)}>
                Pošaljite još jednu poruku
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}