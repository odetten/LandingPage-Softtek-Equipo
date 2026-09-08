// useFadeOnScroll.js
import { useEffect, useRef } from "react";

export default function useFadeOnScroll({ holdOffset = 0, fadeDistance } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;
      if (preference.matches) {
        el.style.opacity = 1;
        el.style.transform = "none";
        return;
      }

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const distance = fadeDistance ?? vh;

      const progress = Math.min(
  Math.max((vh * 0.35 + holdOffset - rect.top) / Math.max(1, distance), 0),
  1
);

      el.style.opacity = 1 - progress;
      el.style.transform = `translateY(${progress * -40}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    preference.addEventListener("change", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      preference.removeEventListener("change", handleScroll);
    };
  }, [holdOffset, fadeDistance]);

  return ref;
}
