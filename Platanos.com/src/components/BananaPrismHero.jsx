import React, { useEffect, useRef, useState } from 'react';

// Importaciones de las portadas de los álbumes
import Nirvanana from '../assets/Nirvanana.jpg';
import TheBeatles from '../assets/Thebeatles.jpg';
import Lana from '../assets/Lana.png';
import Daft from '../assets/Daft.png';
import KendrickLamar from '../assets/KendrickLamar.jpg';
import BananaPF from '../assets/BananaPF.png';
import Bad from '../assets/Bad.jpg';
// ========================================
// ÁLBUMES
// ========================================

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
      'Una banana mala',
    image: Bad
  }
];

export default function BananaPrismHero() {
  const containerRef = useRef(null);

  const [current, setCurrent] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const album = albums[current];

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const progress = Math.min(
        Math.max(
          -rect.top / (window.innerHeight * 1.2),
          0
        ),
        1
      );
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const bgScale = 1 + scrollProgress * 0.1;
  const bgTranslateY = scrollProgress * 20;

  const nextAlbum = () => {
    setCurrent((prev) => (prev + 1) % albums.length);
  };

  const previousAlbum = () => {
    setCurrent((prev) => (prev - 1 + albums.length) % albums.length);
  };

  const selectAlbum = (index) => {
    setCurrent(index);
  };

  return (
    <section
      ref={containerRef}
      className="
        relative
        w-full
        min-h-screen
        overflow-hidden
        bg-neutral-950
        text-white
      "
    >
      {/* Fondo difuminado ambiental basado en la portada actual */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={album.image}
          alt=""
          className="w-full h-full object-cover filter blur-3xl opacity-20 scale-125"
        />
      </div>

      <div className="absolute inset-0 bg-black/50 pointer-events-none" />

      {/* Contenedor central de la portada del álbum en formato completo y proporcionado */}
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          justify-center
          will-change-transform
          px-6
          py-20
          md:py-16
        "
        style={{
          transform: `scale(${bgScale}) translateY(${bgTranslateY}px)`,
          transition: 'transform 80ms linear',
        }}
      >
        <div className="w-full h-full max-w-3xl max-h-[60vh] md:max-h-[70vh] flex items-center justify-center animate-float">
          <img
            src={album.image}
            alt={album.title}
            className="
              max-w-full
              max-h-full
              w-auto
              h-auto
              object-contain
              shadow-[0_30px_60px_rgba(0,0,0,0.8)]
              border
              border-white/10
            "
          />
        </div>
      </div>

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black
          via-transparent
          to-black/60
          pointer-events-none
        "
      />

      {/* Capa de información de texto y carrusel */}
      <div
        className="
          relative
          z-10
          min-h-screen
          flex
          flex-col
          justify-between
          px-6
          md:px-12
          lg:px-20
          py-16
        "
      >
        <div
          key={album.id}
          className="
            max-w-xl
            mt-10
            animate-slide-in
          "
        >
          <p className="
            uppercase
            tracking-[0.3em]
            text-xs
            md:text-sm
            text-white/60
          ">
            Banana Records
          </p>

          <h1 className="
            mt-3
            text-4xl
            sm:text-5xl
            md:text-6xl
            font-black
            leading-none
            drop-shadow-lg
          ">
            {album.title}
          </h1>

          <p className="
            mt-6
            max-w-md
            text-sm
            md:text-base
            text-white/80
            leading-relaxed
            drop-shadow
          ">
            {album.description}
          </p>
        </div>

        <div className="w-full">
          <div className="
            flex
            items-end
            justify-between
            mb-6
          ">
            <div>
              <span className="
                text-xs
                tracking-[0.2em]
                text-white/50
              ">
                ÁLBUM
              </span>

              <p className="
                mt-1
                text-xl
                md:text-2xl
                font-bold
              ">
                {String(current + 1).padStart(2, '0')}
                <span className="
                  text-white/30
                ">
                  {' '}
                  / {String(albums.length).padStart(2, '0')}
                </span>
              </p>
            </div>

            <div className="
              flex
              gap-3
            ">
              <button
                type="button"
                onClick={previousAlbum}
                aria-label="Álbum anterior"
                className="
                  w-11
                  h-11
                  md:w-12
                  md:h-12
                  border
                  border-white/30
                  bg-black/40
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  text-xl
                  hover:bg-white
                  hover:text-black
                  hover:border-white
                  transition-all
                  duration-300
                "
              >
                ←
              </button>

              <button
                type="button"
                onClick={nextAlbum}
                aria-label="Siguiente álbum"
                className="
                  w-11
                  h-11
                  md:w-12
                  md:h-12
                  border
                  border-white/30
                  bg-black/40
                  backdrop-blur-sm
                  flex
                  items-center
                  justify-center
                  text-xl
                  hover:bg-white
                  hover:text-black
                  hover:border-white
                  transition-all
                  duration-300
                "
              >
                →
              </button>
            </div>
          </div>

          {/* Miniaturas de los álbumes */}
          <div className="
            flex
            gap-3
            md:gap-4
            overflow-x-auto
            pb-4
            scrollbar-none
          ">
            {albums.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectAlbum(index)}
                aria-label={`Ver ${item.title}`}
                aria-pressed={current === index}
                className={`
                  relative
                  flex-shrink-0
                  overflow-hidden
                  border-2
                  transition-all
                  duration-300
                  w-20
                  h-20
                  md:w-24
                  md:h-24
                  bg-neutral-900
                  ${
                    current === index
                      ? `
                        border-white
                        scale-110
                        opacity-100
                        shadow-xl
                      `
                      : `
                        border-white/20
                        opacity-50
                        hover:opacity-100
                      `
                  }
                `}
              >
                <img
                  src={item.image}
                  alt=""
                  draggable="false"
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

                {current !== index && (
                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/40
                    "
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatBob {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: floatBob 4.5s ease-in-out infinite;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </section>
  );
}