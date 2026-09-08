import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { bananaThemes } from '../data/bananaThemes';
import '../styles/banana-carousel.css';
import { wrapIndex } from '../utils/carousel';

const bananaSlides = [
    {
        id: 'amarillo',
        title: 'Plátanos',
        subtitle: 'Cavendish / Tabasco',
        description: 'El estándar comercial de pulpa cremosa y dulce. Ideal para consumo fresco diario.',
        image: '/img/tabasco.png',
        imgPosition: 'right',
        imgRotation: 0,
    },
    {
        id: 'morado-rojo',
        title: 'Plátanos',
        subtitle: 'Plátano Morado',
        description: 'Piel rojiza y pulpa dulce con notas distintivas a frambuesa.',
        image: '/img/morado.png',
        imgPosition: 'right',
        imgRotation: 0,
    },
    {
        id: 'plantain',
        title: 'Plantain',
        subtitle: 'Plátano Macho',
        description: 'Grande y neutro. Alto en almidón, perfecto para freír u hornear.',
        image: '/img/macho.png',
        imgPosition: 'left',
        imgRotation: 180,
    },
    {
        id: 'azul',
        title: 'Plátanos',
        subtitle: 'Blue Java',
        description: 'Cáscara verdiazulada. Textura ultra cremosa con sabor a vainilla.',
        image: '/img/azul.png',
        imgPosition: 'right',
        imgRotation: 0,
    },
    {
        id: 'dominicano',
        title: 'Dominico',
        subtitle: 'Baby Banana',
        description: 'Variedad miniatura extremadamente dulce y de piel delgada.',
        image: '/img/dominico.png',
        imgPosition: 'right',
        imgRotation: 0,
    },
];

const curtainVariants = {
    enter: (direction) => ({ clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)' }),
    center: { clipPath: 'inset(0 0 0 0)' },
    exit: (direction) => ({ clipPath: direction > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)' }),
};

const imageVariants = {
    enter: (side) => ({ x: side === 'right' ? 160 : -160, y: 60, scale: 0.65, rotate: side === 'right' ? -20 : 20, opacity: 0 }),
    center: { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1 },
    exit: (side) => ({ x: side === 'right' ? -100 : 100, y: -40, scale: 0.8, opacity: 0 }),
};

export default function BananasCarousel() {
    const [[current, direction], setCurrent] = useState([0, 1]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(false);
    const containerRef = useRef(null);
    const reducedMotion = useReducedMotion();
    const isInView = useInView(containerRef, { amount: 0.25 });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { damping: 30, stiffness: 100 });
    const springY = useSpring(mouseY, { damping: 30, stiffness: 100 });
    const imgParallaxX = useTransform(springX, [-0.5, 0.5], [-12, 12]);
    const imgParallaxY = useTransform(springY, [-0.5, 0.5], [-12, 12]);
    const slide = bananaSlides[current];
    const theme = bananaThemes[slide.id];
    const isPlaying = isAutoPlaying && isInView;
    const duration = reducedMotion ? 0 : 0.65;

    const paginate = useCallback((nextDirection) => {
        setCurrent(([index]) => [wrapIndex(index + nextDirection, bananaSlides.length), nextDirection]);
    }, []);

    useEffect(() => {
        if (!isPlaying) return undefined;
        const interval = window.setInterval(() => paginate(1), 5000);
        return () => window.clearInterval(interval);
    }, [isPlaying, current, paginate]);

    const selectSlide = (index) => {
        setIsAutoPlaying(false);
        setCurrent(([previous]) => [index, index > previous ? 1 : -1]);
    };

    const handleMouseMove = (event) => {
        if (reducedMotion || event.buttons || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
        mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    const handleKeyDown = (event) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        event.preventDefault();
        setIsAutoPlaying(false);
        if (event.key === 'Home') selectSlide(0);
        else if (event.key === 'End') selectSlide(bananaSlides.length - 1);
        else paginate(event.key === 'ArrowRight' ? 1 : -1);
    };

    return (
        <section
            id="tipos"
            ref={containerRef}
            className="banana-carousel"
            aria-label="Tipos de plátano"
            aria-roledescription="carrusel"
            data-banana-cursor-filter={theme.cursorFilter}
            style={{ '--variety-background': theme.background, '--variety-ink': theme.ink }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
            onFocusCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setIsAutoPlaying(false);
            }}
            onKeyDown={handleKeyDown}
        >
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={slide.id}
                    custom={direction}
                    variants={reducedMotion ? undefined : curtainVariants}
                    initial={reducedMotion ? false : 'enter'}
                    animate={reducedMotion ? undefined : 'center'}
                    exit={reducedMotion ? undefined : 'exit'}
                    transition={{ duration, ease: [0.76, 0, 0.24, 1] }}
                    className="banana-carousel__background"
                    style={{ backgroundColor: theme.background }}
                    aria-hidden="true"
                />
            </AnimatePresence>

            <div className="banana-carousel__inner">
                <div className="banana-carousel__heading" aria-hidden="true">
                    <div>
                        <span>Variedad {String(current + 1).padStart(2, '0')}</span>
                        <div className="banana-carousel__bar" />
                    </div>
                    <div className="banana-carousel__count">
                        <strong>{String(current + 1).padStart(2, '0')}</strong>
                        <span>/ {String(bananaSlides.length).padStart(2, '0')}</span>
                    </div>
                </div>

                <div className={`banana-carousel__stage${slide.imgPosition === 'left' ? ' is-reversed' : ''}`}>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={slide.id}
                            className="banana-carousel__copy"
                            initial={reducedMotion ? false : { x: slide.imgPosition === 'left' ? 50 : -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={reducedMotion ? undefined : { x: slide.imgPosition === 'left' ? -50 : 50, opacity: 0 }}
                            transition={{ duration: reducedMotion ? 0 : 0.3 }}
                        >
                            <h2 aria-label={slide.title}>
                                {slide.title.split('').map((letter, index) => (
                                    <motion.span
                                        key={`${slide.id}-${index}`}
                                        aria-hidden="true"
                                        initial={reducedMotion ? false : { y: 45, rotateX: -60, opacity: 0 }}
                                        animate={{ y: 0, rotateX: 0, opacity: 1 }}
                                        transition={{ duration: reducedMotion ? 0 : 0.45, delay: reducedMotion ? 0 : index * 0.035 }}
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </h2>
                            <h3>{slide.subtitle}</h3>
                            <p>{slide.description}</p>
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                            key={slide.id}
                            className="banana-carousel__fruit"
                            custom={slide.imgPosition}
                            variants={reducedMotion ? undefined : imageVariants}
                            initial={reducedMotion ? false : 'enter'}
                            animate={reducedMotion ? undefined : 'center'}
                            exit={reducedMotion ? undefined : 'exit'}
                            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <motion.div style={reducedMotion ? undefined : { x: imgParallaxX, y: imgParallaxY }}>
                                <motion.img
                                    src={slide.image}
                                    alt={slide.subtitle}
                                    draggable="false"
                                    decoding="async"
                                    style={{ rotate: `${slide.imgRotation}deg` }}
                                    animate={reducedMotion || !isInView ? { y: 0 } : { y: [0, -12, 0] }}
                                    transition={reducedMotion ? { duration: 0 } : { duration: 5, repeat: isInView ? Infinity : 0, ease: 'easeInOut' }}
                                />
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="banana-carousel__controls">
                    <div className="banana-carousel__indicators" role="group" aria-label="Elegir variedad">
                        {bananaSlides.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => selectSlide(index)}
                                className={`banana-carousel__indicator${current === index ? ' is-active' : ''}`}
                                aria-label={`Ver ${item.subtitle}`}
                                aria-pressed={current === index}
                            >
                                <span />
                            </button>
                        ))}
                    </div>

                    <div className="banana-carousel__buttons" role="group" aria-label="Controles del carrusel">
                        <button type="button" onClick={() => { setIsAutoPlaying(false); paginate(-1); }} aria-label="Variedad anterior">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button type="button" onClick={() => setIsAutoPlaying((playing) => !playing)} aria-label={isAutoPlaying ? 'Pausar carrusel' : 'Reproducir carrusel'} aria-pressed={isAutoPlaying}>
                            {isAutoPlaying ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5v14M15 5v14" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7Z" /></svg>}
                        </button>
                        <button type="button" onClick={() => { setIsAutoPlaying(false); paginate(1); }} aria-label="Variedad siguiente">
                            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>

                <p className="sr-only" aria-live={isPlaying ? 'off' : 'polite'} aria-atomic="true">
                    Variedad {current + 1} de {bananaSlides.length}: {slide.subtitle}. {slide.description}
                </p>
            </div>

            <motion.div className="banana-carousel__progress" aria-hidden="true" animate={{ scaleX: (current + 1) / bananaSlides.length }} transition={{ duration }} />
        </section>
    );
}
