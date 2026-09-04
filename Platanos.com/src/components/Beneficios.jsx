import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { benefits } from "../data/benefits";
import { getCardOffset, wrapIndex } from "../utils/carousel";
import "../styles/benefits.css";

function BenefitSymbol({ type }) {
  if (type === "potassium" || type === "vitamin") {
    return <span className="benefit-symbol__letter">{type === "potassium" ? <>K<sup>+</sup></> : <>B<sub>6</sub></>}</span>;
  }
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {type === "energy" && <path d="M66 12 28 68h30l-5 40 39-61H62l4-35Z" />}
      {type === "fiber" && <>
        <path d="M60 106V20M60 52C38 52 26 41 26 25c21 0 34 9 34 27ZM60 76C38 76 26 65 26 49c21 0 34 9 34 27ZM60 40c22 0 34-11 34-27-21 0-34 9-34 27ZM60 65c22 0 34-11 34-27-21 0-34 9-34 27ZM60 90c22 0 34-11 34-27-21 0-34 9-34 27Z" />
      </>}
      {type === "snack" && <>
        <path d="M31 49c9 29 29 39 51 22 8-6 14-16 16-29 3 24-8 46-25 53-25 11-47-8-50-37l8-9ZM31 49l-4-12-8 3 4 18M94 43l5-12 7 4-8 7" />
        <path d="m64 20 2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Z" />
      </>}
    </svg>
  );
}

export default function Beneficios() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => typeof document === "undefined" || !document.hidden);
  const reducedMotion = useReducedMotion();
  const stageRef = useRef(null);
  const gesture = useRef(null);
  const swiped = useRef(false);
  const count = benefits.length;
  const move = (step) => setActive((index) => wrapIndex(index + step, count));
  const autoAdvancing = playing && visible && pageVisible && !hovered && !focused && !dragging && !reducedMotion;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.25), { threshold: 0.25 });
    observer.observe(stageRef.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!autoAdvancing) return;
    const timer = window.setTimeout(() => setActive((index) => wrapIndex(index + 1, count)), 5000);
    return () => window.clearTimeout(timer);
  }, [active, autoAdvancing, count]);

  const handleKeyDown = (event) => {
    if (event.key === " " && event.target === stageRef.current) {
      event.preventDefault();
      setPlaying((value) => !value);
      return;
    }
    const actions = { ArrowLeft: () => move(-1), ArrowRight: () => move(1), Home: () => setActive(0), End: () => setActive(count - 1) };
    if (!actions[event.key]) return;
    event.preventDefault();
    actions[event.key]();
  };

  const finishGesture = (event) => {
    setDragging(false);
    const start = gesture.current;
    gesture.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      swiped.current = true;
      move(dx < 0 ? 1 : -1);
    }
  };

  return (
    <section id="beneficios" className="benefits-section" aria-labelledby="benefits-title">
      <div className="benefits-heading" data-reveal="rise">
        <h2 id="benefits-title">Lo bueno viene<br /><span>por dentro.</span></h2>
        <p>Mucho más que una cara bonita con cáscara.</p>
      </div>

      <div className="benefits-carousel" role="region" aria-roledescription="carrusel" aria-label="Beneficios del plátano" onKeyDown={handleKeyDown}
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
      >
        <div
          ref={stageRef}
          className="benefits-stage"
          tabIndex={0}
          aria-label="Tarjetas de beneficios. Usa las flechas izquierda y derecha para cambiar; espacio para pausar o reanudar el avance automático."
          aria-keyshortcuts="ArrowLeft ArrowRight Home End Space"
          onPointerDown={(event) => {
            if (!event.isPrimary || event.button !== 0) return;
            setDragging(true);
            swiped.current = false;
            gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerUp={finishGesture}
          onPointerCancel={() => { gesture.current = null; setDragging(false); }}
          onLostPointerCapture={() => { gesture.current = null; setDragging(false); }}
          onClick={(event) => {
            if (swiped.current) return;
            // Hit testing also works after pointer capture retargets a click to the stage.
            const card = document.elementFromPoint(event.clientX, event.clientY)?.closest("[data-card-index]");
            if (card && event.currentTarget.contains(card)) setActive(Number(card.dataset.cardIndex));
          }}
          data-reveal="rise"
          data-reveal-delay="120"
        >
          {benefits.map((item, index) => {
            const offset = getCardOffset(index, active, count);
            const depth = Math.abs(offset);
            return (
              <article
                key={item.id}
                className={`benefit-card${offset === 0 ? " is-active" : ""}`}
                data-card-index={index}
                data-depth={depth}
                style={{ "--offset": offset, "--card-scale": 1 - depth * 0.13, "--card-color": item.color, "--card-ink": item.ink, zIndex: count - depth }}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${index + 1} de ${count}`}
                aria-hidden={offset !== 0}
              >
                <div className="benefit-card__top"><span>{item.label}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div className="benefit-symbol" aria-hidden="true"><BenefitSymbol type={item.id} /></div>
                <div className="benefit-card__copy"><h3>{item.title}</h3><p>{item.description}</p></div>
                <span className="benefit-card__footer">{item.note}</span>
              </article>
            );
          })}
        </div>
        <div className="benefits-dots" role="group" aria-label="Elegir beneficio" data-reveal="rise" data-reveal-delay="240">
          {benefits.map((item, index) => <button key={item.id} type="button" aria-label={`Ver ${item.label}`} aria-current={active === index ? "true" : undefined} onClick={() => setActive(index)}><span /></button>)}
        </div>
        <p className="sr-only" aria-live={autoAdvancing ? "off" : "polite"} aria-atomic="true">{active + 1} de {count} · {benefits[active].title}</p>
      </div>
    </section>
  );
}
