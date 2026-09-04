import React, { useState, useRef, useEffect } from 'react';

const cards = [
  {
    id: 1,
    badge: 'Plátano Cavendish',
    titulo: 'Energía Sostenida',
    desc: 'Carbohidratos naturales de absorción progresiva que evitan picos de fatiga durante tu día a día.',
    fact: 'Es la variedad más consumida en el mundo; su cáscara cambia de verde a amarillo brillante al madurar.',
    footer: 'Rendimiento diario',
    bg: 'bg-[#1B2E21]',
    accent: '#FFE135',
  },
  {
    id: 2,
    badge: 'Plátano Macho',
    titulo: 'Potasio Concentrado',
    desc: 'Al ser más denso y consumirse cocido u horneado, ofrece una dosis de potasio y almidones complejos única.',
    fact: 'No se suele comer crudo; su alto contenido de almidón requiere cocción para liberar todo su sabor dulzón.',
    footer: 'Salud Muscular',
    bg: 'bg-[#2A1E17]',
    accent: '#F5A623',
  },
  {
    id: 3,
    badge: 'Plátano Rojo',
    titulo: 'Antioxidantes Extra',
    desc: 'Su característico tono carmesí se debe a los betacarotenos y antocianinas que protegen tus células.',
    fact: 'Tiene un ligero aroma y sabor a frambuesa. Es más dulce y cremoso que el plátano amarillo común.',
    footer: 'Protección Inmune',
    bg: 'bg-[#2E1820]',
    accent: '#E86A78',
  },
  {
    id: 4,
    badge: 'Plátano Verde / Dominico',
    titulo: 'Digestión y Microbiota',
    desc: 'Rico en almidón resistente que funciona como prebiótico natural para alimentar tu flora intestinal.',
    fact: 'Al tener un índice glucémico muy bajo, ayuda a mantener estables los niveles de glucosa en sangre.',
    footer: 'Salud Digestiva',
    bg: 'bg-[#243328]',
    accent: '#DCE775',
  },
  {
    id: 5,
    badge: 'Plátano Tabasco',
    titulo: 'Bienestar Mental',
    desc: 'Rico en vitamina B6 y triptófano, esenciales para ayudar al cerebro a sintetizar la serotonina.',
    fact: 'Un solo plátano promedio cubre alrededor del 20% de tus necesidades diarias de vitamina B6.',
    footer: 'Ánimo y Enfoque',
    bg: 'bg-[#1F2E2B]',
    accent: '#81C784',
  },
  {
    id: 6,
    badge: 'Plátano Enano / Bizcocho',
    titulo: 'Salud Cardiovascular',
    desc: 'Su balance de potasio y bajo contenido de sodio contribuyen a regular la presión arterial de forma natural.',
    fact: 'El consumo regular de alimentos ricos en potasio ayuda a reducir la tensión en las paredes vasculares.',
    footer: 'Cuidado Cardiaco',
    bg: 'bg-[#332A1B]',
    accent: '#FFD54F',
  },
  {
    id: 7,
    badge: 'Plátano Azul / Blue Java',
    titulo: 'Recuperación Electrolítica',
    desc: 'Aporta magnesio y potasio de fácil asimilación ideales para acelerar la recuperación tras el ejercicio.',
    fact: 'Conocido como el "plátano helado" por su textura cremosa y sabor natural muy similar a la vainilla.',
    footer: 'Nutrición Deportiva',
    bg: 'bg-[#182A38]',
    accent: '#4FC3F7',
  },
  {
    id: 8,
    badge: 'Plátano Manzano',
    titulo: 'Refuerzo Inmunológico',
    desc: 'Su alto perfil de vitamina C y antioxidantes fenólicos protegen la estructura celular frente al estrés oxidativo.',
    fact: 'Llama la atención por su pequeño tamaño y un ligero retrogusto ácido similar a la manzana fresca.',
    footer: 'Defensas Naturales',
    bg: 'bg-[#2E2818]',
    accent: '#FFB74D',
  },
];

const TOTAL_CARDS = cards.length;
const CARD_ANGLE = 360 / TOTAL_CARDS;

export default function Carousel3D() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [radius, setRadius] = useState(720);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [dragStartTime, setDragStartTime] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState('700ms');
  const stepCountRef = useRef(0);

  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  useEffect(() => {
    const updateRadius = () => {
      setRadius(window.innerWidth < 640 ? 320 : window.innerWidth < 1280 ? 580 : 720);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, []);

  const triggerInitialSpin = () => {
    if (hasStarted) return;
    setHasStarted(true);
    setTransitionDuration('7000ms');
    const randomTurns = Math.floor(Math.random() * 4) + 5;
    const randomIndex = Math.floor(Math.random() * TOTAL_CARDS);
    setCurrentIndex(randomTurns * TOTAL_CARDS + randomIndex);

    setTimeout(() => {
      setTransitionDuration('800ms');
    }, 7000);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          triggerInitialSpin();
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDragging || !hasStarted) return;

    autoPlayRef.current = setInterval(() => {
      stepCountRef.current += 1;

      if (stepCountRef.current % 5 === 0) {
        setTransitionDuration('3000ms');
        const crazyTurns = Math.floor(Math.random() * 3) + 3;
        setCurrentIndex((prev) => prev + crazyTurns * TOTAL_CARDS + 1);

        setTimeout(() => {
          setTransitionDuration('800ms');
        }, 3000);
      } else {
        setTransitionDuration('800ms');
        setCurrentIndex((prev) => prev + 1);
      }
    }, 4000);

    return () => clearInterval(autoPlayRef.current);
  }, [isDragging, hasStarted]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    const xPos = e.clientX || e.touches?.[0]?.clientX;
    setStartX(xPos);
    setDragOffset(0);
    setDragStartTime(Date.now());
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const currentX = e.clientX || e.touches?.[0]?.clientX;
    setDragOffset(currentX - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const dragDuration = Date.now() - dragStartTime;
    const velocity = Math.abs(dragOffset) / Math.max(dragDuration, 1);

    let cardsToJump = Math.round(Math.abs(dragOffset) / 110);

    if (velocity > 0.8) {
      cardsToJump = Math.max(cardsToJump, Math.round(velocity * 2.8));
    }

    if (cardsToJump === 0 && Math.abs(dragOffset) > 25) {
      cardsToJump = 1;
    }

    const animDuration = Math.min(600 + cardsToJump * 140, 1600);
    setTransitionDuration(`${animDuration}ms`);

    if (dragOffset < 0) {
      setCurrentIndex((prev) => prev + cardsToJump);
    } else if (dragOffset > 0) {
      setCurrentIndex((prev) => prev - cardsToJump);
    }

    setDragOffset(0);
  };

  const currentRotation = -currentIndex * CARD_ANGLE + (dragOffset / 4);

  const titleScale = Math.max(0.75, 1.3 - scrollProgress * 0.6);
  const titleOpacity = Math.min(1, scrollProgress * 2);

  return (
    <section
 
      ref={containerRef}
      onMouseEnter={triggerInitialSpin}
      className="w-full min-h-screen py-16 bg-[#0F1712] relative flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Resplandor ambiental de fondo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] bg-[#DCE775]/5 rounded-full blur-[180px] pointer-events-none" />

      {/* TÍTULO DINÁMICO */}
      <div 
        className="text-center mb-10 z-10 transition-transform duration-300 ease-out"
        style={{
          transform: `scale(${titleScale})`,
          opacity: titleOpacity
        }}
      >
        <span className="text-xs font-mono font-bold tracking-[0.3em] text-[#DCE775] uppercase block mb-2">
          // Descubre Sus Propiedades
        </span>
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Beneficios de los Plátanos
        </h2>
      </div>

      {/* CARRUSEL 3D */}
      <div 
        className="relative w-[320px] sm:w-[410px] h-[540px] sm:h-[600px] cursor-grab active:cursor-grabbing touch-pan-y z-10"
        style={{ perspective: '1800px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchMove={handleMouseMove}
        onTouchEnd={handleMouseUp}
      >
        <div
          className="w-full h-full relative"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateZ(-${radius}px) rotateY(${currentRotation}deg)`,
            transition: isDragging ? 'none' : `transform ${transitionDuration} cubic-bezier(0.15, 0.85, 0.35, 1.2)`
          }}
        >
          {cards.map((item, index) => {
            const cardAngle = index * CARD_ANGLE;
            const normalizedCurrent = ((currentIndex % TOTAL_CARDS) + TOTAL_CARDS) % TOTAL_CARDS;

            let diff = Math.abs(index - normalizedCurrent);
            if (diff > TOTAL_CARDS / 2) {
              diff = TOTAL_CARDS - diff;
            }

            const isActive = diff === 0;
            const isFirstNeighbor = diff === 1;
            const isSecondNeighbor = diff === 2;

            let cardOpacity = 'opacity-0 pointer-events-none';
            let cardScale = 'scale-75';

            if (isActive) {
              cardOpacity = 'opacity-100 z-30 shadow-[0_30px_70px_rgba(0,0,0,0.8)] ring-1 ring-white/20';
              cardScale = 'scale-100';
            } else if (isFirstNeighbor) {
              cardOpacity = 'opacity-75 z-20 hover:opacity-90';
              cardScale = 'scale-90';
            } else if (isSecondNeighbor) {
              cardOpacity = 'opacity-45 z-10 hover:opacity-65';
              cardScale = 'scale-80';
            }

            return (
              <div
                key={item.id}
                className={`absolute inset-0 w-full h-full rounded-[38px] p-7 sm:p-9 flex flex-col justify-between transition-all duration-700 overflow-hidden shadow-2xl ${
                  item.bg
                } ${cardOpacity} ${cardScale}`}
                style={{
                  transform: `rotateY(${cardAngle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden'
                }}
              >
                {/* HEADER */}
                <div className="flex justify-between items-center z-10">
                  <span
                    className="text-xs font-bold tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full border transition-colors duration-500"
                    style={{
                      color: item.accent,
                      borderColor: `${item.accent}40`,
                      backgroundColor: `${item.accent}1A`
                    }}
                  >
                    {item.badge}
                  </span>
                  <span className="text-sm font-mono font-semibold tracking-widest text-white/50">
                    0{item.id} / 0{TOTAL_CARDS}
                  </span>
                </div>

                {/* CUERPO PRINCIPAL */}
                <div className="z-10 my-auto">
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-3">
                    {item.titulo}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* DATO CURIOSO */}
                <div
                  className="z-10 pl-3.5 border-l-2 my-2 transition-colors duration-500"
                  style={{ borderColor: item.accent }}
                >
                  <span
                    className="text-[11px] font-bold tracking-widest uppercase block mb-1"
                    style={{ color: item.accent }}
                  >
                    Dato Curioso
                  </span>
                  <p className="text-white/85 text-xs leading-relaxed font-light italic">
                    "{item.fact}"
                  </p>
                </div>

                {/* FOOTER */}
                <div className="z-10 border-t border-white/10 pt-3.5 flex items-center justify-between gap-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                    {item.footer}
                  </span>
                  <div className="w-20 h-[3px] bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full transition-all duration-500 rounded-full"
                      style={{
                        backgroundColor: item.accent,
                        width: `${(item.id / TOTAL_CARDS) * 100}%`
                      }}
                    />
                  </div>
                </div>

                {/* GLOW DE FONDO */}
                <div
                  className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-3xl pointer-events-none transition-all duration-500"
                  style={{ backgroundColor: `${item.accent}20` }}
                />
              </div>
            );
          })}
        </div>
      </div>


    </section>
  );
}