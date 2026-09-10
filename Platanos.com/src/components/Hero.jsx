const BANANA_IMAGE = "/img/banana-hero.png";

function Hero() {
    return (
        <section id="inicio" className="banana-hero" aria-labelledby="hero-title">
            <div className="banana-hero__stage">
                <h1 id="hero-title" className="banana-hero__title">
                    <span className="banana-hero__line banana-hero__line--first">Puro arte.</span>
                    <span className="banana-hero__line banana-hero__line--gradient">
                        <span>Con cáscara.</span>
                        <span className="banana-hero__gradient-fill" aria-hidden="true">Con cáscara.</span>
                    </span>
                </h1>

                <div className="banana-hero__fruit">
                    <div className="banana-hero__traveler">
                        <img
                            src={BANANA_IMAGE}
                            alt="Plátano con cáscara"
                            draggable="false"
                            fetchPriority="high"
                            decoding="async"
                            width="1536"
                            height="1024"
                        />
                    </div>
                </div>
            </div>

            <div className="banana-hero__footer">
                <a className="banana-hero__scroll" href="#beneficios" aria-label="Ir a beneficios" data-reveal="rise" data-reveal-delay="560">
                    <span className="banana-hero__scroll-icon" aria-hidden="true">
                        {/* Font Awesome Free v7.3.1 by @fontawesome - https://fontawesome.com
                            License: https://fontawesome.com/license/free - Copyright 2026 Fonticons, Inc. */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" focusable="false">
                            <path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z" />
                        </svg>
                    </span>
                </a>

                <p className="banana-hero__signature" data-reveal="rise" data-reveal-delay="650">Plátanos<span>.</span></p>

            </div>
        </section>
    );
}

export default Hero;
