import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import videoFondoBanana from "../assets/kling_video platano.mp4";

export default function BananaVideoTitle() {
  const containerRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maskOpacity = useTransform(scrollYProgress, [0, 0.12, 0.34], [0, 0, 1]);
  const textScale = useTransform(scrollYProgress, [0.12, 0.82], [0.68, 1]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section
      ref={containerRef}
      className={`banana-video-reveal relative isolate bg-[var(--color-dark)] ${reducedMotion ? "h-svh" : "h-[240svh]"}`}
      aria-labelledby="banana-video-title"
    >
      <h2 id="banana-video-title" className="sr-only">Banana en movimiento</h2>
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[var(--color-dark)]">
        <motion.video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoFondoBanana}
          style={{ scale: reducedMotion ? 1 : videoScale }}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />

        <motion.svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ opacity: reducedMotion ? 1 : maskOpacity }}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <mask id="banana-video-mask" x="0" y="0" width="100%" height="100%">
              <rect width="100%" height="100%" fill="white" />
              <motion.text
                x="50%"
                y="50%"
                dy="0.08em"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                className="text-[clamp(6.5rem,22vw,22rem)] font-black tracking-[-0.075em]"
                style={{ scale: reducedMotion ? 1 : textScale, transformBox: "fill-box", transformOrigin: "center" }}
              >
                banana
              </motion.text>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="var(--color-dark)" mask="url(#banana-video-mask)" />
        </motion.svg>
      </div>
    </section>
  );
}
