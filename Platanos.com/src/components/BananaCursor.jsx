import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import bananaImg from "../assets/platano.png";

export default function BananaCursor() {
  const cursorRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);
  const visible = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    let currentFilter = "";

    const loop = () => {
      current.current.x += (target.current.x - current.current.x) * 0.18;
      current.current.y += (target.current.y - current.current.y) * 0.18;

      cursor.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0) translate(-50%, -50%)`;

      if (visible.current) {
        const surface = document
          .elementFromPoint(target.current.x, target.current.y)
          ?.closest("[data-banana-cursor-filter]");
        const filter = surface?.dataset.bananaCursorFilter ?? "hue-rotate(0deg) saturate(1)";
        if (filter !== currentFilter) {
          cursor.style.filter = filter;
          currentFilter = filter;
        }
      }

      rafId.current = requestAnimationFrame(loop);
    };

    const show = () => {
      visible.current = true;
      cursor.style.opacity = "1";
    };
    const hide = () => {
      visible.current = false;
      cursor.style.opacity = "0";
    };

    const move = (event) => {
      if (event.pointerType !== "mouse") return hide();
      target.current = { x: event.clientX, y: event.clientY };
      if (!visible.current) {
        current.current = { ...target.current }; // evita que "vuele" desde (0,0)
        show();
      }
    };

    const leave = (event) => {
      if (!event.relatedTarget) hide();
    };
    const visibility = () => {
      if (document.hidden) hide();
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", hide);
    document.addEventListener("pointerout", leave);
    document.addEventListener("visibilitychange", visibility);

    rafId.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return createPortal(
    <>
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
      <img
        ref={cursorRef}
        className="fixed left-0 top-0 z-[9999] w-24 opacity-0 pointer-events-none transition-opacity duration-150 ease-in-out will-change-transform"
        src={bananaImg}
        alt=""
        aria-hidden="true"
        draggable="false"
      />
    </>,
    document.body
  );
}