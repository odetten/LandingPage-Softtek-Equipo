import React, { useState, useRef, useEffect } from 'react';

// Importaciones de las portadas de los álbumes
import Nirvanana from '../assets/Nirvanana.jpg';
import TheBeatles from '../assets/Thebeatles.jpg';
import Lana from '../assets/Lana.png';
import Daft from '../assets/Daft.png';
import KendrickLamar from '../assets/KendrickLamar.jpg';
import BananaPF from '../assets/BananaPF.png';
import Bad from '../assets/Bad.jpg';

const albums = [
  {
    id: 1,
    title: 'The Dark Side of the Banana',
    description:
      'Un viaje psicodélico a través de la luz, el prisma y el sonido esencial del plátano.',
    image: BananaPF,
  },
  {
    id: 2,
    title: 'Nirvanana',
    description:
      'Una reinterpretación tropical de uno de los álbumes más icónicos de los noventa.',
    image: Nirvanana,
  },
  {
    id: 3,
    title: 'The Banatles',
    description:
      'Cuatro plátanos caminando juntos hacia una nueva era de la música.',
    image: TheBeatles,
  },
  {
    id: 4,
    title: 'Born to Peel',
    description:
      'Una banana con actitud, elegancia y un lado completamente inesperado.',
    image: Lana,
  },
  {
    id: 5,
    title: 'Random Access Memories',
    description:
      'Memorias electrónicas reconstruidas en forma de plátano.',
    image: Daft,
  },
  {
    id: 6,
    title: 'Banana Classics',
    description:
      'Una colección de sonidos, sabores y recuerdos convertidos en una experiencia.',
    image: KendrickLamar,
  },
  {
    id: 7,
    title: 'Bad Banana',
    description:
      'Una banana mala con chamarra de cuero, lista para causar estragos.',
    image: Bad
  }
];

/**
 * Hook: detecta cuándo un elemento entra al viewport.
 * Una vez que entra, deja de observar (no vuelve a animarse si el usuario
 * scrollea hacia arriba y abajo otra vez).
 */
function useInView(options) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(node);
        }
      },
      options ?? { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return [ref, isInView];
}

/**
 * Tarjeta de álbum extraída como componente propio.
 * Necesita ser su propio componente porque cada tarjeta requiere
 * su propio ref + su propio estado "isInView" del hook.
 */
function AlbumCard({ item, index, isBeingClicked, onClick }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      onClick={() => onClick(item.id)}
      style={{ transitionDelay: isInView ? `${index * 80}ms` : '0ms' }}
      className={`
        group
        cursor-pointer
        flex
        flex-col
        items-center
        transition-all
        duration-700
        [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
        ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
        hover:-translate-y-4
        ${isBeingClicked ? 'scale-115 z-30 rotate-2 brightness-110' : ''}
      `}
    >
      <div className={`
        w-full 
        aspect-square 
        bg-white 
        p-3 
        shadow-[0_15px_30px_rgba(0,0,0,0.15)] 
        border-[12px] 
        border-neutral-900 
        transition-all 
        duration-300 
        group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] 
        group-hover:border-black 
        group-hover:scale-105
        relative 
        overflow-hidden
        ${isBeingClicked ? 'ring-8 ring-yellow-400 scale-110 shadow-2xl' : ''}
      `}>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      <div className="mt-4 text-center transition-transform duration-300 group-hover:translate-y-1">
        <span className="text-xs tracking-[0.2em] font-bold uppercase text-neutral-800 group-hover:text-black transition-colors block">
          {item.title}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-yellow-600 mt-1 block opacity-0 group-hover:opacity-100 transition-all duration-300 font-mono transform translate-y-1 group-hover:translate-y-0">
          ✨ Abrir Álbum en Grande
        </span>
      </div>
    </div>
  );
}

export default function AlbumGallery() {
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [clickedId, setClickedId] = useState(null);

  // Guarda el timeout activo para poder cancelarlo si el usuario
  // hace otro clic antes de que termine el anterior (fix del race condition).
  const pendingTimeoutRef = useRef(null);

  useEffect(() => {
    // Limpieza al desmontar el componente.
    return () => {
      if (pendingTimeoutRef.current) {
        clearTimeout(pendingTimeoutRef.current);
      }
    };
  }, []);

  const handleAlbumClick = (id) => {
    // Si ya había un timeout corriendo de un clic anterior, se cancela.
    if (pendingTimeoutRef.current) {
      clearTimeout(pendingTimeoutRef.current);
    }

    setClickedId(id);
    pendingTimeoutRef.current = setTimeout(() => {
      shouldScrollRef.current = true;
      setSelectedAlbumId(id);
      setClickedId(null);
      pendingTimeoutRef.current = null;
    }, 400);
  };

  const [headerRef, headerInView] = useInView();
  const album = albums.find((item) => item.id === selectedAlbumId);

  // Ref sobre la sección raíz del componente (se reutiliza en ambos
  // returns de abajo). Apunta al inicio de ESTA sección, no al de
  // toda la landing page.
  const sectionRef = useRef(null);

  // Bandera que solo se activa manualmente desde los clics del usuario
  // (handleAlbumClick y el botón "Volver"). El efecto de abajo NUNCA
  // decide por sí mismo si debe scrollear con base en "es la primera
  // vez que corro" — eso se rompe con el doble-invoke de efectos que
  // hace React StrictMode en el montaje inicial (dev mode). Aquí el
  // efecto solo obedece la bandera, sin importar cuántas veces se
  // ejecute a sí mismo.
  const shouldScrollRef = useRef(false);

  useEffect(() => {
    if (shouldScrollRef.current && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    shouldScrollRef.current = false;
  }, [selectedAlbumId]);

  if (album) {
    return (
      <section ref={sectionRef} className="relative w-full min-h-screen overflow-hidden bg-neutral-950 text-white flex flex-col justify-between px-6 md:px-16 lg:px-24 py-10 animate-fade-in">
        <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center">
          <img
            src={album.image}
            alt=""
            className="w-full h-full object-cover filter blur-3xl opacity-35 scale-125 animate-pulse-slow"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/40 pointer-events-none" />

        <div className="relative z-30 animate-slide-down">
          <button
            type="button"
            onClick={() => {
              shouldScrollRef.current = true;
              setSelectedAlbumId(null);
            }}
            className="
              group
              inline-flex
              items-center
              gap-3
              px-6
              py-3
              rounded-full
              border
              border-white/30
              bg-black/60
              backdrop-blur-md
              text-xs
              uppercase
              tracking-[0.2em]
              text-white
              hover:bg-white
              hover:text-black
              hover:border-white
              hover:scale-105
              transition-all
              duration-300
              cursor-pointer
              shadow-2xl
            "
          >
            <span className="transform transition-transform duration-300 group-hover:-translate-x-1.5">←</span> 
            Volver a la Galería
          </button>
        </div>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-4 md:px-12 py-16 z-10">
          <div className="w-full h-full flex items-center justify-center animate-scale-up">
            <img
              src={album.image}
              alt={album.title}
              className="
                max-w-[95vw]
                max-h-[80vh]
                w-auto
                h-auto
                object-contain
                drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)]
                animate-float-slow
                transition-transform
                duration-700
              "
            />
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-10" />

        <div className="relative z-30 max-w-xl mt-auto pb-4 animate-slide-in-left">
          <div className="inline-block px-3 py-1 mb-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] tracking-[0.3em] uppercase text-yellow-400 font-semibold animate-pulse">
            Reproduciendo Experiencia • Banana Records
          </div>
          <h1 className="mt-2 text-4xl sm:text-5xl md:text-7xl font-black leading-none drop-shadow-2xl tracking-tight">
            {album.title}
          </h1>
          <p className="mt-4 max-w-md text-sm md:text-base text-white/80 leading-relaxed drop-shadow">
            {album.description}
          </p>
        </div>

        <style>{`
          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
            50% { transform: translateY(-15px) rotate(0.6deg) scale(1.02); }
          }
          .animate-float-slow { animation: floatSlow 6s ease-in-out infinite; }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }

          @keyframes scaleUp {
            from { opacity: 0; transform: scale(0.85) translateY(30px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
          .animate-scale-up { animation: scaleUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-40px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slide-in-left { animation: slideInLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slide-down { animation: slideDown 0.4s ease-out forwards; }

          @keyframes pulseSlow {
            0%, 100% { opacity: 0.25; transform: scale(1); }
            50% { opacity: 0.4; transform: scale(1.06); }
          }
          .animate-pulse-slow { animation: pulseSlow 7s ease-in-out infinite; }
        `}</style>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="w-full min-h-screen bg-[#f4f1ea] text-neutral-900 py-24 px-6 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div
          ref={headerRef}
          className={`
            mb-16 text-center
            transition-all duration-700
            [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
            ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <p className="uppercase tracking-[0.3em] text-xs md:text-sm text-neutral-500 mb-3 font-semibold">
            Banana Records Museum
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Galería de Portadas
          </h2>
          <div className="w-16 h-1 bg-neutral-900 mx-auto mt-4 rounded-full transition-all duration-500 hover:w-28" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 md:gap-14">
          {albums.map((item, index) => (
            <AlbumCard
              key={item.id}
              item={item}
              index={index}
              isBeingClicked={clickedId === item.id}
              onClick={handleAlbumClick}
            />
          ))}

          <ComingSoonCard index={albums.length} />
        </div>
      </div>
    </section>
  );
}

/**
 * Tarjeta "Próximamente": mismo sistema de reveal-on-scroll que AlbumCard,
 * pero sin lógica de click ni imagen real.
 */
function ComingSoonCard({ index }) {
  const [ref, isInView] = useInView();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isInView ? `${index * 80}ms` : '0ms' }}
      className={`
        flex flex-col items-center opacity-75
        transition-all duration-700
        [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]
        ${isInView ? 'opacity-75 translate-y-0' : 'opacity-0 translate-y-12'}
      `}
    >
      <div className="w-full aspect-square bg-white p-3 shadow-[0_15px_30px_rgba(0,0,0,0.08)] border-[12px] border-neutral-900 flex items-center justify-center">
        <div className="w-full h-full bg-neutral-100 border border-neutral-200 flex items-center justify-center">
          <span className="text-neutral-400 text-3xl">🍌</span>
        </div>
      </div>
      <div className="mt-4 px-4 py-1.5 border border-neutral-400 bg-neutral-200 text-[10px] tracking-widest uppercase text-neutral-700 font-mono shadow-sm">
        Próximamente...
      </div>
    </div>
  );
}