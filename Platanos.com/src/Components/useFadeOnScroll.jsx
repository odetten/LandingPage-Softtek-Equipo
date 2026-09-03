// useFadeOnScroll.js
import { useEffect, useRef } from "react";

export default function useFadeOnScroll({ holdOffset = 0, fadeDistance } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      const distance = fadeDistance ?? vh;

      const progress = Math.min(
  Math.max((vh * 0.35 - rect.top) / distance, 0),
  1
);

el.style.opacity = 1 - progress;
el.style.transform = `translateY(${progress * -40}px)`;


      el.style.opacity = 1 - progress;
      el.style.transform = `translateY(${progress * -40}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [holdOffset, fadeDistance]);

  return ref;
}