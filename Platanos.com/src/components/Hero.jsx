import { useEffect, useState } from "react";

const HERO_TITLE = "Platanos";

function Hero() {
    const [prefersReducedMotion] = useState(() =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
    const [visibleCharacters, setVisibleCharacters] = useState(() =>
        prefersReducedMotion ? HERO_TITLE.length : 0
    );
    const [isTypingComplete, setIsTypingComplete] = useState(prefersReducedMotion);

    useEffect(() => {
        if (prefersReducedMotion) return undefined;

        let currentCharacter = 0;
        let bananaDropTimeout;

        const typingInterval = window.setInterval(() => {
            currentCharacter += 1;
            setVisibleCharacters(currentCharacter);

            if (currentCharacter === HERO_TITLE.length) {
                window.clearInterval(typingInterval);
                bananaDropTimeout = window.setTimeout(() => {
                    setIsTypingComplete(true);
                }, 180);
            }
        }, 120);

        return () => {
            window.clearInterval(typingInterval);
            window.clearTimeout(bananaDropTimeout);
        };
    }, [prefersReducedMotion]);

    return (
        <section
            id="inicio"
            className="
                relative
                flex
                min-h-screen
                items-center
                overflow-hidden
                justify-center
                text-center

                bg-[#f4ff95]
            "
        >
            <div className="relative z-10">
                <h1
                    aria-label={HERO_TITLE}
                    className="
                        grid
                        text-[60px]
                        font-black
                        leading-none

                        text-[#1a1a1a]

                        sm:text-[80px]
                        md:text-[110px]
                        lg:text-[150px]
                    "
                >
                    <span
                        aria-hidden="true"
                        className="invisible col-start-1 row-start-1"
                    >
                        {HERO_TITLE}
                    </span>
                    <span
                        aria-hidden="true"
                        className="col-start-1 row-start-1 text-left"
                    >
                        {HERO_TITLE.slice(0, visibleCharacters)}
                        <span
                            className={`hero-typewriter-caret ${
                                isTypingComplete ? "hero-typewriter-caret--hidden" : ""
                            }`}
                        />
                    </span>
                </h1>
            </div>

            <div
                className={`
                    hero-banana
                    absolute
                    left-1/2
                    top-1/2
                    z-20
                    ${isTypingComplete ? "hero-banana--landed" : ""}
                `}
            >
                <img
                    src="/img/A.png"
                    alt="Plátano amarillo"
                    draggable="false"
                    className="
                        h-auto
                        w-[80vw]
                        max-w-[650px]

                        md:w-[55vw]
                        lg:w-[45vw]
                    "
                />

            </div>

        </section>
    );
}

export default Hero;
