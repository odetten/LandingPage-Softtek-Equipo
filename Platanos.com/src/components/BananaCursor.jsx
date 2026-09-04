import { useEffect, useRef } from "react";
import bananaImg from "../assets/platano.png";

export default function BananaCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    let point = null;
    let frame = 0;
    let currentFilter = "";
    const hide = () => {
      point = null;
      cursor.style.opacity = "0";
    };
    const paint = () => {
      frame = 0;
      if (!point) return;
      cursor.style.transform = `translate3d(${point.x}px, ${point.y}px, 0)`;
      const surface = document.elementFromPoint(point.x, point.y)?.closest("[data-banana-cursor-filter]");
      const filter = surface?.dataset.bananaCursorFilter ?? "hue-rotate(0deg) saturate(1)";
      if (filter !== currentFilter) {
        cursor.style.filter = filter;
        currentFilter = filter;
      }
      cursor.style.opacity = "1";
    };
    const schedule = () => {
      if (point && !frame) frame = window.requestAnimationFrame(paint);
    };
    const move = (event) => {
      if (event.pointerType !== "mouse") return hide();
      point = { x: event.clientX, y: event.clientY };
      schedule();
    };
    const leave = (event) => { if (!event.relatedTarget) hide(); };
    const visibility = () => { if (document.hidden) hide(); };
    const types = document.getElementById("tipos");
    const selection = new MutationObserver(schedule);
    if (types) selection.observe(types, { attributes: true, attributeFilter: ["data-banana-cursor-filter"] });

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("scroll", schedule, { passive: true, capture: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("blur", hide);
    document.addEventListener("pointerout", leave);
    document.addEventListener("visibilitychange", visibility);
    return () => {
      window.cancelAnimationFrame(frame);
      selection.disconnect();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", schedule, true);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("blur", hide);
      document.removeEventListener("pointerout", leave);
      document.removeEventListener("visibilitychange", visibility);
    };
  }, []);

  return <img ref={cursorRef} className="banana-cursor" src={bananaImg} alt="" aria-hidden="true" draggable="false" />;
}
