import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import videoFondoBanana from "../assets/kling_video platano.mp4";

export default function BananaVideoTitle() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const scaleValueRef = useRef(0.6);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fase 1 (0% → 30% del scroll): el video se ve solo, sin overlay
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  // Fase 2 (30% → 100%): una vez cubierto, las letras crecen a su tamaño final
  const scaleMV = useTransform(scrollYProgress, [0.3, 1], [0.6, 1.3]);

  useEffect(() => {
    const unsub = scaleMV.on("change", (v) => {
      scaleValueRef.current = v;
    });
    return unsub;
  }, [scaleMV]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // 1. Capa negra sólida
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "#1f1e20";
      ctx.fillRect(0, 0, w, h);

      // 2. "Recorta" el texto de esa capa negra -> queda transparente ahí
      ctx.globalCompositeOperation = "destination-out";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const fontSize = h * 0.22 * scaleValueRef.current;
      ctx.font = `900 ${fontSize}px Urbanist, sans-serif`;
      ctx.fillText("banana", w / 2, h / 2);

      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-[#1f1e20]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video real y visible desde el inicio */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={videoFondoBanana}
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Overlay negro con el hueco de "banana" — invisible al llegar, se revela con scroll */}
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ opacity: overlayOpacity }}
        />
      </div>
    </section>
  );
}