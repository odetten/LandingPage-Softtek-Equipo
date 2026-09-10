import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import luisImg from "../assets/Luis.png";
import yahirImg from "../assets/Yahir.png";
import ernestoImg from "../assets/Ernesto.png";
import brandonImg from "../assets/Brandon.png";
import "../styles/contact.css";

const team = [
  { name: "Luis", image: luisImg },
  { name: "Yahir", image: yahirImg },
  { name: "Ernesto", image: ernestoImg },
  { name: "Brandon", image: brandonImg },
];

export default function ContactSection() {
  const [recipient, setRecipient] = useState("");
  const [celebration, setCelebration] = useState(null);

  useEffect(() => {
    if (!celebration) return;
    const timeout = window.setTimeout(() => setCelebration(null), 2700);
    return () => window.clearTimeout(timeout);
  }, [celebration]);

  const submitMessage = (event) => {
    event.preventDefault();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles = Array.from({ length: reduced ? 6 : 30 }, (_, index) => ({
      "--left": `${(index + Math.random()) / (reduced ? 6 : 30) * 100}%`,
      "--size": `${22 + Math.random() * 16}px`,
      "--drift": `${Math.random() * 100 - 50}px`,
      "--spin": `${Math.random() * 540 - 270}deg`,
      "--duration": `${1.65 + Math.random() * 0.6}s`,
      "--delay": `${Math.random() * 0.25}s`,
      "--rest-top": `${30 + Math.random() * 35}vh`,
    }));
    setCelebration((current) => ({ id: (current?.id ?? 0) + 1, particles }));
  };

  return (
    <section id="contacto" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-layout">
        <div className="contact-intro">
          <div data-reveal="rise">
            <h2 id="contact-title">¿Maduramos<br /><span>una idea?</span></h2>
          </div>
          <div className="contact-team" data-reveal="rise" data-reveal-delay="120">
            <div className="contact-team__heading"><h3>¿Para quién?</h3></div>
            <div className="contact-team__members" role="group" aria-label="Elegir a quién dirigir el mensaje">
              {team.map((member) => (
                <button key={member.name} type="button" className="contact-member" aria-pressed={recipient === member.name} aria-label={`Dirigir el mensaje a ${member.name}`} onClick={() => setRecipient((current) => current === member.name ? "" : member.name)}>
                  <span className="contact-member__portrait"><img src={member.image} alt="" loading="lazy" decoding="async" draggable="false" /></span>
                  <span className="contact-member__name">{member.name}<span className="contact-member__selection" aria-hidden="true">{recipient === member.name ? "✓" : "+"}</span></span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="contact-form-panel" data-reveal="rise" data-reveal-delay="180">
          <form onSubmit={submitMessage} noValidate>
            <div className="contact-form__row">
              <div className="contact-field"><label htmlFor="contact-name">Tu nombre</label><input id="contact-name" name="name" autoComplete="name" placeholder="¿Cómo te llamas?" maxLength={80} /></div>
              <div className="contact-field"><label htmlFor="contact-email">Tu correo</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="tu@correo.com" maxLength={254} /></div>
            </div>
            <div className="contact-field"><label htmlFor="contact-message">Tu mensaje</label><textarea id="contact-message" name="message" rows={4} placeholder="Tengo una idea que está en su punto…" maxLength={2000} /></div>
            <div className="contact-recipient" aria-live="polite"><span>Para: <strong>{recipient || "todo el equipo"}</strong></span>{recipient && <button type="button" onClick={() => setRecipient("")}>Cambiar a todo el equipo</button>}</div>
            <button className="contact-submit" type="submit" aria-describedby="contact-demo-note">Enviar mensaje</button>
            <p id="contact-demo-note" className="contact-form__note">Demo: el mensaje no se enviará.</p>
            <span className="sr-only" role="status">{celebration ? "¡Lluvia de plátanos! Esto es una demostración; no se envió ningún mensaje." : ""}</span>
          </form>
        </div>
      </div>
      {celebration && createPortal(
        <div key={celebration.id} className="banana-confetti" aria-hidden="true">
          {celebration.particles.map((style, index) => <span key={index} className="banana-confetti__piece" style={style}>🍌</span>)}
        </div>, document.body
      )}
    </section>
  );
}
