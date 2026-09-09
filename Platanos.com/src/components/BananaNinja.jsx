import React, { useState, useRef, useEffect } from "react";
import bananaImg from "../assets/platano.png";

const FADE_MS = 350;          
const MIN_SWIPE_DISTANCE = 45; 
const PARTICLE_LIFETIME_MS = 650;

export default function BananaNinjaPro() {
  const [isSliced, setIsSliced] = useState(false);
  const [sliceCount, setSliceCount] = useState(0);
  const [screenShake, setScreenShake] = useState(false);
  const [particles, setParticles] = useState([]);
  const [particlesExploded, setParticlesExploded] = useState(false);
  const [sliceAngle, setSliceAngle] = useState(-15);

  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const bananaRef = useRef(null);
  const trailRef = useRef([]);
  const trailLoopStartRef = useRef(() => {});
  const isDraggingRef = useRef(false);
  const swipeDistanceRef = useRef(0);
  const particleTimeoutRef = useRef(null);

  // --- Dibujo de la estela: cada punto se apaga solo según su edad ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let rafId = null;
    let running = false;

    const draw = () => {
      const now = performance.now();
      trailRef.current = trailRef.current.filter((p) => now - p.t < FADE_MS);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const pts = trailRef.current;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const alpha = Math.max(0, 1 - (now - b.t) / FADE_MS);
        if (alpha <= 0) continue;

        const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        gradient.addColorStop(0, "#ff0055");
        gradient.addColorStop(0.5, "#ffcc00");
        gradient.addColorStop(1, "#00ffcc");

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 6;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.shadowColor = "#ffffff";
        ctx.shadowBlur = 14 * alpha;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // El loop se apaga solo cuando ya no hay nada que animar
      if (isDraggingRef.current || pts.length > 0) {
        rafId = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    trailLoopStartRef.current = () => {
      if (!running) {
        running = true;
        rafId = requestAnimationFrame(draw);
      }
    };

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Ajustar tamaño del canvas al contenedor
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    return () => clearTimeout(particleTimeoutRef.current);
  }, []);

  const getPointFromEvent = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const touch = e.touches && e.touches[0];
    const clientX = touch ? touch.clientX : e.clientX;
    const clientY = touch ? touch.clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const isPointOverBanana = (x, y) => {
    if (!bananaRef.current || !containerRef.current) return false;
    const containerRect = containerRef.current.getBoundingClientRect();
    const bananaRect = bananaRef.current.getBoundingClientRect();
    const relLeft = bananaRect.left - containerRect.left;
    const relTop = bananaRect.top - containerRect.top;
    return (
      x >= relLeft &&
      x <= relLeft + bananaRect.width &&
      y >= relTop &&
      y <= relTop + bananaRect.height
    );
  };

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    trailRef.current = [];
    swipeDistanceRef.current = 0;
    trailLoopStartRef.current();
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;

    const { x, y } = getPointFromEvent(e);
    const last = trailRef.current[trailRef.current.length - 1];
    if (last) {
      swipeDistanceRef.current += Math.hypot(x - last.x, y - last.y);
    }
    trailRef.current.push({ x, y, t: performance.now() });

    // El corte solo cuenta si ya hubo un arrastre real (no un roce quieto)
    // y el punto actual cae sobre la banana.
    if (
      !isSliced &&
      swipeDistanceRef.current > MIN_SWIPE_DISTANCE &&
      isPointOverBanana(x, y)
    ) {
      triggerSliceEffect(x, y);
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const triggerSliceEffect = (localX, localY) => {
    setIsSliced(true);
    setSliceCount((prev) => prev + 1);
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 300);

    const randomAngle = Math.floor(Math.random() * 40) - 20;
    setSliceAngle(randomAngle);

    const newParticles = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      x: localX,
      y: localY,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      color: ["#ff0055", "#ffcc00", "#00ffcc", "#ffffff", "#aa00ff"][i % 5],
      size: Math.random() * 8 + 4,
    }));

    setParticlesExploded(false);
    setParticles(newParticles);

    // Doble rAF: deja pintar el estado inicial (posición 0) antes de animar al destino
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setParticlesExploded(true));
    });

    clearTimeout(particleTimeoutRef.current);
    particleTimeoutRef.current = setTimeout(() => {
      setParticles([]);
    }, PARTICLE_LIFETIME_MS);
  };

  return (
    <section
      ref={containerRef}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      style={{ touchAction: "none" }}
      className={`relative w-full h-[650px] bg-[#05050a] text-white flex flex-col items-center justify-between py-10 overflow-hidden select-none cursor-crosshair border-y border-white/10 ${
        screenShake ? "animate-screen-shake" : ""
      }`}
    >
      {/* Fondo con resplandor radial dinámico */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,204,0,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,204,0.05)_0%,transparent_50%)] pointer-events-none" />

      {/* Canvas para la estela */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30" />

      {/* Partículas de impacto: transicionan una vez a su destino y se limpian solas */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none z-30"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 12px ${p.color}`,
            transform: particlesExploded
              ? `translate(${p.vx * 14}px, ${p.vy * 14}px) scale(0.3)`
              : "translate(0px, 0px) scale(1)",
            opacity: particlesExploded ? 0 : 1,
            transition: `transform ${PARTICLE_LIFETIME_MS}ms cubic-bezier(0.16, 1, 0.3, 1), opacity ${PARTICLE_LIFETIME_MS}ms ease-out`,
          }}
        />
      ))}

      {/* Encabezado y Métricas */}
      <div className="relative z-20 text-center flex flex-col items-center">
        <span className="px-3 py-1 text-xs font-mono tracking-widest text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-full mb-3 uppercase">
          Efecto de Refracción Potásica
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-cyan-400 drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]">
          LABORATORIO DE CORTE
        </h2>
        <p className="text-gray-400 text-sm mt-2 max-w-md">
          Mantén presionado y desliza con fuerza sobre el plátano de cristal para separar su luz.
        </p>

        <div className="mt-4 flex items-center gap-6 bg-white/5 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/10 shadow-2xl">
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Potasio Liberado</p>
            <p className="text-2xl font-mono font-bold text-yellow-400">{sliceCount * 420} mg</p>
          </div>
          <div className="w-[1px] h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Cortes Exitosos</p>
            <p className="text-2xl font-mono font-bold text-cyan-400">{sliceCount}</p>
          </div>
        </div>
      </div>

      {/* Área del Plátano Interactivo */}
      <div ref={bananaRef} className="relative w-96 h-96 flex items-center justify-center z-10">
        {!isSliced ? (
          <div className="w-full h-full flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite] transition-transform duration-300 hover:scale-110">
            <img
              src={bananaImg}
              alt="Plátano de cristal"
              className="w-full h-full object-contain mix-blend-screen drop-shadow-[0_0_35px_rgba(255,215,0,0.4)]"
            />
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <div
              className="absolute w-full h-full transition-all duration-700 ease-out opacity-90"
              style={{ transform: `translate(-90px, -70px) rotate(${sliceAngle - 25}deg)` }}
            >
              <img
                src={bananaImg}
                alt="Mitad izquierda"
                className="w-full h-full object-contain mix-blend-screen [clip-path:polygon(0_0,_50%_0,_50%_100%,_0_100%)] drop-shadow-[0_0_20px_rgba(255,0,100,0.6)]"
              />
            </div>
            <div
              className="absolute w-full h-full transition-all duration-700 ease-out opacity-90"
              style={{ transform: `translate(90px, 80px) rotate(${sliceAngle + 25}deg)` }}
            >
              <img
                src={bananaImg}
                alt="Mitad derecha"
                className="w-full h-full object-contain mix-blend-screen [clip-path:polygon(50%_0,_100%_0,_100%_100%,_50%_100%)] drop-shadow-[0_0_20px_rgba(0,255,200,0.6)]"
              />
            </div>
          </div>
        )}
      </div>

      <div className="relative z-20 h-12">
        {isSliced && (
          <button
            onClick={() => setIsSliced(false)}
            className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-300 text-black font-extrabold rounded-full shadow-[0_0_25px_rgba(255,200,0,0.5)] hover:shadow-[0_0_35px_rgba(255,200,0,0.8)] hover:scale-105 active:scale-95 transition-all duration-200 tracking-wider uppercase"
          >
            Sintetizar Nuevo Plátano
          </button>
        )}
      </div>

      <style>{`
        @keyframes screenShake {
          0%   { transform: translate(0, 0) rotate(0deg); }
          20%  { transform: translate(-6px, 3px) rotate(-0.6deg); }
          40%  { transform: translate(5px, -4px) rotate(0.6deg); }
          60%  { transform: translate(-4px, 4px) rotate(-0.4deg); }
          80%  { transform: translate(3px, -3px) rotate(0.4deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .animate-screen-shake {
          animation: screenShake 300ms ease-in-out;
        }
      `}</style>
    </section>
  );
}