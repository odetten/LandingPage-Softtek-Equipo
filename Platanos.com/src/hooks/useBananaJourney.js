import { useLayoutEffect, useRef } from "react";
import { getBananaPose } from "../utils/bananaJourney";

export default function useBananaJourney() {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const source = root.querySelector(".banana-hero__fruit");
    const traveler = root.querySelector(".banana-hero__traveler");
    const section = root.querySelector(".benefits-section");
    const stage = root.querySelector(".benefits-stage");
    const intro = root.querySelector(".benefits-intro");
    const destination = root.querySelector(".benefits-intro__fruit");
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let geometry;
    let frame = 0;
    let disposed = false;

    const render = () => {
      frame = 0;
      if (!geometry || disposed) return;
      const pose = getBananaPose({
        ...geometry,
        scrollY: window.scrollY,
        scrollLeft: stage.scrollLeft,
        reducedMotion: preference.matches,
      });
      traveler.style.transform = `translate3d(${pose.x}px, ${pose.y}px, 0) scale(${pose.scale}) rotate(${pose.rotation}deg)`;
      traveler.style.filter = `grayscale(${pose.grayscale})`;
      traveler.style.opacity = pose.opacity;
      intro.style.setProperty("--intro-opacity", pose.introOpacity);
    };

    const schedule = () => {
      if (!frame && !disposed) frame = window.requestAnimationFrame(render);
    };

    const measure = () => {
      if (disposed) return;
      const from = source.getBoundingClientRect();
      const to = destination.getBoundingClientRect();
      geometry = {
        source: { x: from.left + from.width / 2, y: from.top + window.scrollY + from.height / 2, width: from.width },
        destination: { x: to.left + stage.scrollLeft + to.width / 2, y: to.top + window.scrollY + to.height / 2, width: to.width },
        start: root.getBoundingClientRect().top + window.scrollY,
        end: section.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.08,
        introWidth: intro.offsetWidth,
      };
    };

    const remeasure = () => { measure(); schedule(); };
    // Reset outside the viewport, including horizontal exits, so each visit replays.
    const entranceObserver = new IntersectionObserver(([entry]) => {
      section.classList.toggle("is-arrived", entry.isIntersecting && entry.intersectionRatio >= 0.2);
    }, { threshold: 0.2, rootMargin: "-80px 0px -8% 0px" });
    entranceObserver.observe(root.querySelector(".benefits-title"));
    const observer = new ResizeObserver(remeasure);
    [root, source, destination, stage].forEach((element) => observer.observe(element));
    window.addEventListener("scroll", schedule, { passive: true });
    stage.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", remeasure, { passive: true });
    preference.addEventListener("change", schedule);
    document.fonts.ready.then(remeasure);
    measure();
    render();

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      entranceObserver.disconnect();
      section.classList.remove("is-arrived");
      window.removeEventListener("scroll", schedule);
      stage.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", remeasure);
      preference.removeEventListener("change", schedule);
      traveler.removeAttribute("style");
      intro.style.removeProperty("--intro-opacity");
    };
  }, []);

  return rootRef;
}
