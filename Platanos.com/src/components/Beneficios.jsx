import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { benefits } from "../data/benefits";
import CarouselChevron from "./CarouselChevron";
import "../styles/benefits.css";

export default function Beneficios() {
  const stageRef = useRef(null);
  const dragRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const [edges, setEdges] = useState({ start: true, end: false });

  const updateEdges = () => {
    const stage = stageRef.current;
    const start = stage.scrollLeft <= 2;
    const end = stage.scrollLeft >= stage.scrollWidth - stage.clientWidth - 2;
    setEdges((current) => current.start === start && current.end === end ? current : { start, end });
  };

  useEffect(() => {
    const observer = new ResizeObserver(updateEdges);
    observer.observe(stageRef.current);
    return () => observer.disconnect();
  }, []);

  const move = (direction) => {
    const stage = stageRef.current;
    const card = stage.querySelector(".benefit-card");
    const gap = Number.parseFloat(window.getComputedStyle(stage).columnGap) || 0;
    stage.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: reducedMotion ? "instant" : "smooth" });
  };

  const handleKeyDown = (event) => {
    if (event.target !== stageRef.current) return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      move(event.key === "ArrowLeft" ? -1 : 1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      stageRef.current.scrollTo({
        left: event.key === "Home" ? 0 : stageRef.current.scrollWidth,
        behavior: reducedMotion ? "instant" : "smooth",
      });
    }
  };

  const stopDrag = (event) => {
    dragRef.current = null;
    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  return (
    <section id="beneficios" className="benefits-section" aria-labelledby="benefits-title">
      <div
        ref={stageRef}
        className="benefits-stage"
        role="region"
        tabIndex={0}
        aria-label="Nutrientes del plátano. Desliza o usa las flechas para recorrer las tarjetas."
        aria-keyshortcuts="ArrowLeft ArrowRight Home End"
        onKeyDown={handleKeyDown}
        onScroll={updateEdges}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          dragRef.current = { x: event.clientX, scroll: event.currentTarget.scrollLeft };
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.classList.add("is-dragging");
        }}
        onPointerMove={(event) => {
          if (!dragRef.current) return;
          event.currentTarget.scrollLeft = dragRef.current.scroll - (event.clientX - dragRef.current.x);
        }}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onLostPointerCapture={stopDrag}
      >
        <div className="benefits-intro">
          <h2 id="benefits-title" className="benefits-title">
            <span className="benefits-title__line"><span data-reveal="line">Lo bueno</span></span>
            <span className="benefits-title__line"><span data-reveal="line" data-reveal-delay="100">viene por</span></span>
            <span className="benefits-title__line"><span data-reveal="line" data-reveal-delay="200"><span className="benefits-title__yellow">dentro.</span></span></span>
          </h2>
          <div className="benefits-intro__fruit" aria-hidden="true" />
        </div>

        {benefits.map((item, index) => (
          <article
            key={item.id}
            className={`benefit-card benefit-card--${item.tone}${item.letter.length > 1 ? " benefit-card--wide-letter" : ""}`}
            aria-label={item.accessibleLabel || item.label}
            data-reveal="rise"
            data-reveal-delay={120 + index * 65}
          >
            <h3 className="benefit-card__label">{item.label}</h3>
            <span className="benefit-card__letter" aria-hidden="true">{item.letter}</span>
          </article>
        ))}
      </div>

      <div className="benefits-controls" aria-label="Recorrer nutrientes">
        <button type="button" aria-label="Nutriente anterior" disabled={edges.start} onClick={() => move(-1)}>
          <CarouselChevron direction="left" />
        </button>
        <button type="button" aria-label="Ver más nutrientes" disabled={edges.end} onClick={() => move(1)}>
          <CarouselChevron direction="right" />
        </button>
      </div>
    </section>
  );
}
