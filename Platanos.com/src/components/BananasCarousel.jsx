import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const bananaSlides = [
    {
        id: 1,
        title: 'Platanos',
        subtitle: 'Cavendish / Tabasco',
        description: 'El estándar comercial de pulpa cremosa y dulce. Ideal para consumo fresco diario.',
        bgColor: '#E3F237',
        textColor: '#111111',
        subColor: '#222222',
        accentColor: '#000000',
        image: '/img/tabasco.png',
        imgPosition: 'right',
        imgRotation: 0,
    },
    {
        id: 2,
        title: 'Platanos',
        subtitle: 'Plátano Morado',
        description: 'Piel rojiza y pulpa dulce con notas distintivas a frambuesa.',
        bgColor: '#D282C4',
        textColor: '#ffffff',
        subColor: 'rgba(255,255,255,0.9)',
        accentColor: '#ffffff',
        image: '/img/morado.png',
        imgPosition: 'right',
        imgRotation: 0,
    },
    {
        id: 3,
        title: 'Plantain',
        subtitle: 'Plátano Macho',
        description: 'Grande y neutro. Alto en almidón, perfecto para freír u hornear.',
        bgColor: '#9ACD32',
        textColor: '#ffffff',
        subColor: 'rgba(255,255,255,0.9)',
        accentColor: '#ffffff',
        image: '/img/macho.png',
        imgPosition: 'left',
        imgRotation: 180,
    },
    {
        id: 4,
        title: 'Plantain',
        subtitle: 'Blue Java',
        description: 'Cáscara verdiazulada. Textura ultra cremosa con sabor a vainilla.',
        bgColor: '#C2E4F8',
        textColor: '#5C6E7B',
        subColor: '#7C8E9B',
        accentColor: '#5C6E7B',
        image: '/img/azul.png',
        imgPosition: 'right',
        imgRotation: 0,
    },
    {
        id: 5,
        title: 'Dominico',
        subtitle: 'Baby Banana',
        description: 'Variedad miniatura extremadamente dulce y de piel delgada.',
        bgColor: '#F9D74C',
        textColor: '#111111',
        subColor: '#333333',
        accentColor: '#000000',
        image: '/img/dominico.png',
        imgPosition: 'right',
        imgRotation: 0,
    }
];

// ============================================
// VARIANTES DE ANIMACIÓN
// ============================================

const bgCurtainVariants = {
    enter: (direction) => ({
        clipPath: direction > 0
            ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
            : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    }),
    center: {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        transition: {
            clipPath: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
        }
    },
    exit: (direction) => ({
        clipPath: direction > 0
            ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
            : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        transition: {
            clipPath: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
        }
    })
};

// Imagen: entra desde un lado y sale por el contrario
const imageVariants = {
    enter: (slide) => ({
        y: 200,
        x: slide.imgPosition === 'right' ? 400 : -400,
        scale: 0.3,
        rotate: slide.imgPosition === 'right' ? -45 : 45,
        opacity: 0,
        filter: 'blur(20px)',
    }),
    center: {
        y: 0,
        x: 0,
        scale: 1,
        rotate: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            damping: 25,
            stiffness: 100,
            mass: 1.2,
            delay: 0.3,
        }
    },
    exit: (slide) => ({
        y: -200,
        x: slide.imgPosition === 'right' ? -400 : 400,
        scale: 0.3,
        rotate: slide.imgPosition === 'right' ? 45 : -45,
        opacity: 0,
        filter: 'blur(20px)',
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1]
        }
    })
};

// Letras del título: entrada/salida según posición del plátano
const letterVariants = {
    enter: (imgPos) => ({
        y: 150,
        x: imgPos === 'right' ? -100 : 100, // Texto entra desde el lado opuesto al plátano
        rotateX: -90,
        opacity: 0,
        scale: 0.5,
        filter: 'blur(10px)',
    }),
    center: {
        y: 0,
        x: 0,
        rotateX: 0,
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
    },
    exit: (imgPos) => ({
        y: -150,
        x: imgPos === 'right' ? 100 : -100,
        rotateX: 90,
        opacity: 0,
        scale: 0.5,
        filter: 'blur(10px)',
    })
};

const subtitleVariants = {
    enter: (imgPos) => ({
        x: imgPos === 'right' ? -100 : 100,
        opacity: 0,
        filter: 'blur(10px)',
    }),
    center: {
        x: 0,
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            type: 'spring',
            damping: 20,
            stiffness: 120,
            delay: 0.6,
        }
    },
    exit: (imgPos) => ({
        x: imgPos === 'right' ? 100 : -100,
        opacity: 0,
        filter: 'blur(10px)',
        transition: { duration: 0.4 }
    })
};

const descVariants = {
    enter: (imgPos) => ({
        y: 30,
        x: imgPos === 'right' ? -50 : 50,
        opacity: 0,
        filter: 'blur(5px)',
    }),
    center: {
        y: 0,
        x: 0,
        opacity: 0.85,
        filter: 'blur(0px)',
        transition: {
            delay: 0.8,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    },
    exit: (imgPos) => ({
        y: -20,
        x: imgPos === 'right' ? 50 : -50,
        opacity: 0,
        transition: { duration: 0.3 }
    })
};

const barVariants = {
    enter: { width: 0, opacity: 0 },
    center: {
        width: '4rem',
        opacity: 1,
        transition: {
            width: { duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] },
            opacity: { duration: 0.3, delay: 0.2 }
        }
    },
    exit: {
        width: 0,
        opacity: 0,
        transition: { duration: 0.4 }
    }
};

// ============================================
// COMPONENTE
// ============================================
export default function BananasCarousel() {
    const [[current, direction], setCurrent] = useState([0, 0]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const containerRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
    const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });
    const imgParallaxX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
    const imgParallaxY = useTransform(springY, [-0.5, 0.5], [-20, 20]);

    const slide = bananaSlides[current];

    useEffect(() => {
        if (!isAutoPlaying) return;
        const interval = setInterval(() => paginate(1), 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, current]);

    const paginate = (newDirection) => {
        setCurrent(([curr]) => {
            const next = curr + newDirection;
            return [
                next < 0 ? bananaSlides.length - 1 : next >= bananaSlides.length ? 0 : next,
                newDirection
            ];
        });
    };

    const goToSlide = (idx) => {
        setCurrent(([curr]) => [idx, idx > curr ? 1 : -1]);
    };

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            // ✅ ALTURA PANTALLA COMPLETA
            className="relative w-full h-screen overflow-hidden select-none font-sans"
        >
            {/* Fondo con cortina */}
            <AnimatePresence custom={direction} mode="sync">
                <motion.div
                    key={slide.id + '-bg'}
                    custom={direction}
                    variants={bgCurtainVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute inset-0"
                    style={{ backgroundColor: slide.bgColor }}
                />
            </AnimatePresence>

            {/* Textura sutil */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                }}
            />

            {/* CONTENIDO: ahora con layout responsive que se adapta a la posición de la imagen */}
            <div
                className="relative w-full h-full max-w-7xl mx-auto px-8 md:px-16 py-10 flex flex-col justify-between z-20"
            >

                {/* Header */}
                <div className="flex justify-between items-start z-30">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={slide.id + '-header'}
                            className={`flex flex-col gap-3 ${slide.imgPosition === 'left' ? 'items-end' : 'items-start'
                                }`}
                            initial={{ opacity: 0, x: slide.imgPosition === 'left' ? 30 : -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: slide.imgPosition === 'left' ? -30 : 30 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <span
                                className="text-xs font-bold tracking-[0.3em] uppercase"
                                style={{ color: slide.textColor }}
                            >
                                Variedad {String(current + 1).padStart(2, '0')}
                            </span>

                            <motion.div
                                variants={barVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="h-[3px] rounded-full"
                                style={{ backgroundColor: slide.textColor }}
                            />
                        </motion.div>
                    </AnimatePresence>

                    {/* Contador grande */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={slide.id + '-counter'}
                            initial={{ opacity: 0, y: -30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 30 }}
                            transition={{ duration: 0.6 }}
                            className="text-right"
                        >
                            <motion.div
                                key={current + '-num'}
                                initial={{ rotateX: -90, opacity: 0, y: 20 }}
                                animate={{ rotateX: 0, opacity: 1, y: 0 }}
                                exit={{ rotateX: 90, opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                                className="text-5xl md:text-7xl font-black tabular-nums leading-none"
                                style={{ color: slide.textColor, perspective: '500px' }}
                            >
                                {String(current + 1).padStart(2, '0')}
                            </motion.div>
                            <div
                                className="text-xs font-medium opacity-50 mt-1"
                                style={{ color: slide.textColor }}
                            >
                                / {String(bananaSlides.length).padStart(2, '0')}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ZONA DE TEXTOS: se mueve de lado según la posición de la imagen */}
                <div className="z-30 my-auto relative">
                    <AnimatePresence custom={direction} mode="wait">
                        <motion.div
                            key={slide.id + '-content'}
                            custom={direction}
                            // ✅ TEXTO SE ALINEA AL LADO OPUESTO DEL PLÁTANO
                            className={`space-y-4 max-w-2xl ${slide.imgPosition === 'left'
                                ? 'ml-auto text-right'
                                : 'mr-auto text-left'
                                }`}
                            initial={{
                                x: slide.imgPosition === 'left' ? 200 : -200,
                                opacity: 0
                            }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{
                                x: slide.imgPosition === 'left' ? -200 : 200,
                                opacity: 0
                            }}
                            transition={{
                                x: { type: 'spring', damping: 25, stiffness: 100, delay: 0.2 },
                                opacity: { duration: 0.4, delay: 0.2 }
                            }}
                        >
                            {/* Título con letras animadas */}
                            <h1
                                className="text-7xl md:text-[9rem] font-black tracking-tighter leading-none"
                                style={{
                                    color: slide.textColor,
                                    perspective: '1000px'
                                }}
                            >
                                <AnimatePresence mode="popLayout">
                                    {slide.title.split('').map((char, i) => (
                                        <motion.span
                                            key={slide.id + '-' + i}
                                            custom={slide.imgPosition}
                                            variants={letterVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{
                                                type: 'spring',
                                                damping: 20,
                                                stiffness: 150,
                                                delay: i * 0.05 + 0.3,
                                            }}
                                            className="inline-block origin-bottom"
                                            style={{ perspective: '500px' }}
                                        >
                                            {char === ' ' ? '\u00A0' : char}
                                        </motion.span>
                                    ))}
                                </AnimatePresence>
                            </h1>

                            {/* Subtítulo */}
                            <motion.p
                                custom={slide.imgPosition}
                                variants={subtitleVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className={`text-2xl md:text-4xl font-bold ${slide.imgPosition === 'left' ? 'text-right' : 'text-left'
                                    }`}
                                style={{ color: slide.subColor }}
                            >
                                {slide.subtitle}
                            </motion.p>

                            {/* Descripción */}
                            <motion.p
                                custom={slide.imgPosition}
                                variants={descVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className={`text-base md:text-lg leading-relaxed max-w-lg ${slide.imgPosition === 'left' ? 'ml-auto text-right' : 'text-left'
                                    }`}
                                style={{ color: slide.subColor }}
                            >
                                {slide.description}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* IMAGEN: cambia de lado según imgPosition */}
                <AnimatePresence custom={direction} mode="popLayout">
                    <motion.div
                        key={slide.id + '-img'}
                        custom={slide}
                        variants={imageVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className={`absolute z-20 pointer-events-none ${slide.imgPosition === 'right'
                            ? 'right-4 md:right-12 bottom-16 md:bottom-24'
                            : 'left-4 md:left-12 bottom-16 md:bottom-24'
                            }`}
                        style={{ perspective: '1200px' }}
                    >
                        <motion.div
                            style={{ x: imgParallaxX, y: imgParallaxY }}
                            animate={{ y: [0, -15, 0] }}
                            transition={{
                                y: {
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.subtitle}
                                className="w-auto h-72 md:h-[500px] lg:h-[600px] object-contain"
                                style={{
                                    rotate: slide.imgRotation,
                                    filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.25))',
                                }}
                            />

                            <motion.div
                                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-2/3 h-6 rounded-full blur-2xl"
                                style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
                                animate={{
                                    scaleX: [1, 0.85, 1],
                                    opacity: [0.3, 0.2, 0.3]
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </motion.div>
                    </motion.div>
                </AnimatePresence>

                {/* Controles inferiores */}
                <div className="flex justify-between items-end z-30 mt-8">
                    {/* Indicadores */}
                    <div className="flex gap-2">
                        {bananaSlides.map((s, idx) => (
                            <motion.button
                                key={s.id}
                                onClick={() => goToSlide(idx)}
                                className="relative h-2 overflow-hidden rounded-full"
                                style={{ width: current === idx ? '3rem' : '1rem' }}
                                animate={{ width: current === idx ? '3rem' : '1rem' }}
                                transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                aria-label={`Ir al plátano ${idx + 1}`}
                            >
                                <div
                                    className="absolute inset-0 rounded-full"
                                    style={{ backgroundColor: slide.accentColor, opacity: 0.2 }}
                                />
                                {current === idx && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full origin-left"
                                        style={{ backgroundColor: slide.accentColor }}
                                        initial={{ scaleX: 0 }}
                                        animate={isAutoPlaying ? { scaleX: [0, 1] } : { scaleX: 1 }}
                                        transition={{
                                            duration: isAutoPlaying ? 5 : 0.5,
                                            ease: isAutoPlaying ? 'linear' : [0.76, 0, 0.24, 1]
                                        }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    {/* Botones */}
                    <div className="flex gap-3">
                        <motion.button
                            onClick={() => paginate(-1)}
                            className="w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center"
                            style={{
                                borderColor: slide.textColor + '40',
                                backgroundColor: slide.textColor + '10',
                                color: slide.textColor
                            }}
                            whileHover={{ scale: 1.1, rotate: -90 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Anterior"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        <motion.button
                            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                            className="w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center"
                            style={{
                                borderColor: slide.textColor + '40',
                                backgroundColor: isAutoPlaying ? slide.textColor : 'transparent',
                                color: isAutoPlaying ? slide.bgColor : slide.textColor
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={isAutoPlaying ? 'Pausar' : 'Reproducir'}
                        >
                            <motion.div
                                animate={{ rotate: isAutoPlaying ? 360 : 0 }}
                                transition={{
                                    duration: isAutoPlaying ? 3 : 0,
                                    repeat: isAutoPlaying ? Infinity : 0,
                                    ease: "linear"
                                }}
                            >
                                {isAutoPlaying ? (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <rect x="6" y="5" width="4" height="14" />
                                        <rect x="14" y="5" width="4" height="14" />
                                    </svg>
                                ) : (
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                )}
                            </motion.div>
                        </motion.button>

                        <motion.button
                            onClick={() => paginate(1)}
                            className="w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center"
                            style={{
                                borderColor: slide.textColor + '40',
                                backgroundColor: slide.textColor + '10',
                                color: slide.textColor
                            }}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Siguiente"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Línea de progreso */}
            <motion.div
                className="absolute top-0 left-0 w-full h-1 z-40 origin-left"
                style={{ backgroundColor: slide.accentColor }}
                animate={{ scaleX: isAutoPlaying ? [0, 1] : 0 }}
                transition={{
                    duration: 5,
                    ease: 'linear',
                    repeat: isAutoPlaying ? Infinity : 0,
                }}
            />
        </section>
    );
}
