const BANANA_IMAGE = "/img/banana-hero.png";

function Hero() {
    return (
        <section id="inicio" className="banana-hero" aria-labelledby="hero-title">
            <div className="banana-hero__stage">
                <h1 id="hero-title" className="banana-hero__title">
                    <span data-reveal="line" data-reveal-delay="60">Puro arte.</span>
                    <span className="banana-hero__gradient" data-reveal="line" data-reveal-delay="220">Con cáscara.</span>
                </h1>

                <div className="banana-hero__fruit">
                    <img
                        data-reveal="fruit"
                        data-reveal-delay="360"
                        src={BANANA_IMAGE}
                        alt="Plátano amarillo con cáscara"
                        draggable="false"
                        fetchPriority="high"
                        decoding="async"
                        width="1536"
                        height="1024"
                    />
                </div>
            </div>

            <div className="banana-hero__footer">
                <a className="banana-hero__scroll" href="#tipos" data-reveal="rise" data-reveal-delay="560">
                    <span className="banana-hero__scroll-icon" aria-hidden="true">↓</span>
                    Ver más
                </a>

                <p className="banana-hero__signature" data-reveal="rise" data-reveal-delay="650">Plátanos<span>.</span></p>

                <aside className="hero-art-card" aria-labelledby="hero-art-title" data-reveal="rise" data-reveal-delay="740">
                    <a
                        className="hero-art-card__link"
                        href="https://press.warhol.org/press/the-velvet-underground-nico-scepter-studio-sessions-public-programs/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="La portada de Andy Warhol: leer la historia en The Andy Warhol Museum (se abre en otra pestaña)"
                    >
                        <img
                            className="hero-art-card__image"
                            src="/img/Warhol.jpg"
                            alt="El plátano amarillo y negro de la portada diseñada por Andy Warhol"
                            width="1536"
                            height="1522"
                            loading="lazy"
                            decoding="async"
                        />
                        <div className="hero-art-card__copy">
                            <div className="hero-art-card__meta">
                                <span className="hero-art-card__category">Arte · 1967</span>
                            </div>
                            <h2 id="hero-art-title">Antes de ser snack, <span>fue portada.</span></h2>
                            <p>Andy Warhol diseñó la portada de <cite>The Velvet Underground &amp; Nico</cite>.</p>
                        </div>
                    </a>
                </aside>
            </div>
        </section>
    );
}

export default Hero;
