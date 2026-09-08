import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useReducedMotion } from "framer-motion";
import { benefits } from "../data/benefits";
import { wrapIndex } from "../utils/carousel";
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

function BenefitModal({ benefit, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const appRoot = document.getElementById("root");
    const previousInert = appRoot?.inert ?? false;
    const previousAriaHidden = appRoot?.getAttribute("aria-hidden") ?? null;
    document.body.style.overflow = "hidden";
    if (appRoot) {
      appRoot.inert = true;
      appRoot.setAttribute("aria-hidden", "true");
    }
    closeRef.current?.focus();

    const closeWithEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", closeWithEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (appRoot) {
        appRoot.inert = previousInert;
        if (previousAriaHidden === null) appRoot.removeAttribute("aria-hidden");
        else appRoot.setAttribute("aria-hidden", previousAriaHidden);
      }
      document.removeEventListener("keydown", closeWithEscape);
    };
  }, [onClose]);

  return createPortal(
    <div className="benefit-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <div
        id={`benefit-dialog-${benefit.id}`}
        className="benefit-modal__dialog"
        style={{ "--card-accent": benefit.color }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="benefit-modal-title"
        aria-describedby="benefit-modal-description"
        onKeyDown={(event) => {
          if (event.key === "Tab") {
            event.preventDefault();
            closeRef.current?.focus();
          }
        }}
      >
        <div className="benefit-modal__top">
          <span>{benefit.label}</span>
          <button ref={closeRef} type="button" aria-label="Cerrar detalle" onClick={onClose}>×</button>
        </div>
        <div className="benefit-modal__symbol" aria-hidden="true"><BenefitSymbol type={benefit.id} /></div>
        <h3 id="benefit-modal-title">{benefit.title}</h3>
        <p id="benefit-modal-description">{benefit.description}</p>
      </div>
    </div>,
    document.body,
  );
}

export default function Beneficios() {
  const [active, setActive] = useState(0);
  const [modalBenefit, setModalBenefit] = useState(null);
  const reducedMotion = useReducedMotion();
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const modalTriggerRef = useRef(null);
  const scrollTimer = useRef(null);
  const scrollUnlockTimer = useRef(null);
  const programmaticScroll = useRef(false);
  const count = benefits.length;
  const move = (step) => setActive((index) => wrapIndex(index + step, count));

  const closeModal = () => {
    setModalBenefit(null);
    window.requestAnimationFrame(() => modalTriggerRef.current?.focus());
  };

  useEffect(() => {
    const stage = stageRef.current;
    const card = cardRefs.current[active];
    if (!stage || !card) return;
    const inset = Number.parseFloat(window.getComputedStyle(stage).paddingLeft) || 0;
    window.clearTimeout(scrollUnlockTimer.current);
    programmaticScroll.current = true;
    stage.scrollTo({ left: Math.max(0, card.offsetLeft - inset), behavior: reducedMotion ? "auto" : "smooth" });
    scrollUnlockTimer.current = window.setTimeout(() => {
      programmaticScroll.current = false;
    }, reducedMotion ? 0 : 650);
  }, [active, reducedMotion]);

  useEffect(() => () => {
    window.clearTimeout(scrollTimer.current);
    window.clearTimeout(scrollUnlockTimer.current);
  }, []);

  const handleKeyDown = (event) => {
    const actions = { ArrowLeft: () => move(-1), ArrowRight: () => move(1), Home: () => setActive(0), End: () => setActive(count - 1) };
    if (!actions[event.key]) return;
    event.preventDefault();
    actions[event.key]();
  };

  const handleScroll = () => {
    const stage = stageRef.current;
    if (!stage || programmaticScroll.current) return;
    window.clearTimeout(scrollTimer.current);
    scrollTimer.current = window.setTimeout(() => {
      const inset = Number.parseFloat(window.getComputedStyle(stage).paddingLeft) || 0;
      const alignedEdge = stage.scrollLeft + inset;
      const nearest = cardRefs.current.reduce((result, card, index) => {
        if (!card) return result;
        const distance = Math.abs(card.offsetLeft - alignedEdge);
        return distance < result.distance ? { index, distance } : result;
      }, { index: 0, distance: Number.POSITIVE_INFINITY });
      setActive(nearest.index);
    }, 140);
  };

  return (
    <section id="beneficios" className="benefits-section" aria-labelledby="benefits-title">
      <div className="benefits-heading" data-reveal="rise">
        <h2 id="benefits-title">Lo bueno viene por dentro.</h2>
      </div>

      <div className="benefits-carousel" role="region" aria-roledescription="carrusel" aria-label="Beneficios del plátano" onKeyDown={handleKeyDown}>
        <div
          ref={stageRef}
          className="benefits-stage"
          tabIndex={0}
          aria-label="Tarjetas de beneficios. Usa las flechas izquierda y derecha para cambiar."
          aria-keyshortcuts="ArrowLeft ArrowRight Home End"
          onScroll={handleScroll}
          onPointerDown={() => {
            window.clearTimeout(scrollUnlockTimer.current);
            programmaticScroll.current = false;
          }}
          data-reveal="rise"
          data-reveal-delay="100"
        >
          {benefits.map((item, index) => (
            <article
              ref={(node) => { cardRefs.current[index] = node; }}
              key={item.id}
              className={`benefit-card${active === index ? " is-active" : ""}`}
              style={{ "--card-accent": item.color }}
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${count}: ${item.label}`}
              onClick={() => setActive(index)}
            >
              <div className="benefit-card__top">
                <span>{item.label}</span>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.note}</p>
              <div className="benefit-card__media" aria-hidden="true">
                {item.image
                  ? <img src={item.image} alt="" />
                  : <div className="benefit-symbol"><BenefitSymbol type={item.id} /></div>}
              </div>
              <button
                className="benefit-card__detail"
                type="button"
                aria-label={`Ver detalle de ${item.label}`}
                aria-haspopup="dialog"
                aria-controls={`benefit-dialog-${item.id}`}
                onClick={(event) => {
                  modalTriggerRef.current = event.currentTarget;
                  setActive(index);
                  setModalBenefit(item);
                }}
              >
                <span aria-hidden="true">+</span>
              </button>
            </article>
          ))}
        </div>

        <div className="benefits-toolbar" data-reveal="rise" data-reveal-delay="180">
          <span className="benefits-progress" aria-hidden="true">{String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
          <div className="benefits-controls" aria-label="Controles del carrusel">
            <button type="button" aria-label="Beneficio anterior" onClick={() => move(-1)}><span aria-hidden="true">←</span></button>
            <button type="button" aria-label="Siguiente beneficio" onClick={() => move(1)}><span aria-hidden="true">→</span></button>
          </div>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">{active + 1} de {count} · {benefits[active].title}</p>
      </div>

      {modalBenefit && <BenefitModal benefit={modalBenefit} onClose={closeModal} />}
    </section>
  );
}
