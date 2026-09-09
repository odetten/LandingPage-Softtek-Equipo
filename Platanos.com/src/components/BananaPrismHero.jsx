import React, { useEffect, useRef, useState } from 'react';
import BananaPF from '../assets/BananaPF.png';

export default function BananaPrismHero() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // 0 cuando la sección entra en pantalla, 1 cuando ya se salió por arriba
      const progress = Math.min(
        Math.max(-rect.top / (window.innerHeight * 1.2), 0),
        1
      );
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Zoom + desplazamiento lento de la imagen conforme se hace scroll (parallax)
  const bgScale = 1 + scrollProgress * 0.18;
  const bgTranslateY = scrollProgress * 40; // px

  // El brillo extra sobre el arcoíris crece con el scroll
  const glowOpacity = 0.25 + scrollProgress * 0.5;
  const glowScale = 1 + scrollProgress * 0.6;

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Imagen completa como fondo, con zoom/parallax ligado al scroll */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `scale(${bgScale}) translateY(${bgTranslateY}px)`,
          transition: 'transform 80ms linear'
        }}
      >
        {/* Esta capa flota sola (arriba-abajo), por eso la imagen va escalada un poco
            de más (scale-110): así el vaivén no descubre bordes negros */}
        <div className="w-full h-full animate-float">
          <img
            src={BananaPF}
            alt="Plátano de cristal con haz de luz arcoíris"
            className="w-full h-full object-cover scale-110"
          />

          {/* Brillo pulsante sobre el punto donde sale el arcoíris — va DENTRO de la
              capa que flota, para que se mueva pegado a la banana, no por su cuenta */}
          <div
            className="absolute rounded-full pointer-events-none animate-pulse-slow"
            style={{
              left: '57%',
              top: '52%',
              width: '260px',
              height: '260px',
              transform: `translate(-50%, -50%) scale(${glowScale})`,
              background:
                'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,220,120,0.4) 35%, transparent 70%)',
              opacity: glowOpacity,
              filter: 'blur(6px)',
              transition: 'transform 80ms linear, opacity 80ms linear'
            }}
          />
        </div>
      </div>

      {/* Overlay oscuro abajo para que el texto/formulario tengan contraste */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 pointer-events-none" />

      {/* Texto del hero: en el hueco negro arriba-izquierda, por encima del haz de luz */}
      <div className="absolute left-[5%] top-[16%] z-10 max-w-sm text-left text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight">
          The Dark Side Of The Banana
        </h1>
        <p className="mt-4 text-sm sm:text-base text-white/70 max-w-xs">
          Dicen que Pink Floyd descubrió el espectro visible, pero en realidad solo estaban observando la vida útil de una fruta. Al pasar por el cuerpo del plátano, la luz no miente: verde acidez, amarillo perfección, y el lado oscuro que nadie quiere ver cuando se queda olvidado al fondo del frutero
        </p>
      </div>

      {/* Contenido inferior (formulario, CTA, etc.) va aquí encima, ustedes lo construyen */}
      <div className="relative z-10 h-full flex flex-col items-center justify-end pb-16 px-6 text-center text-white">
        {/* Ej: <FormularioCorreo /> */}
      </div>

      {/* Animaciones continuas, independientes del scroll */}
      <style>{`
        @keyframes pulseSlow {
          0%, 100% { filter: blur(6px) brightness(1); }
          50% { filter: blur(9px) brightness(1.25); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3.5s ease-in-out infinite;
        }

        @keyframes floatBob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        .animate-float {
          animation: floatBob 4.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}