function Hero() {
    return (
        <section
            id="inicio"
            className="
                relative
                flex
                min-h-screen
                items-center
                overflow-hidden
                justify-between
                text-center

                bg-[#f4ff95]
            "
        >
            <div className="relative z-10">
                <h1
                    className="
                        text-[60px]
                        font-black
                        leading-none

                        text-[rgb(236,236,0)]

                        sm:text-[80px]
                        md:text-[110px]
                        lg:text-[150px]
                    "
                >
                    aaaAAaAAaa
                </h1>
            </div>

            <div
                className="
                    absolute
                    left-1/2
                    top-1/2
                    z-20

                    -translate-x-1/2
                    -translate-y-1/2
                "
            >
                <img 
                    src="/img/A.png"
                    alt="Imagen Principal"
                    className="
                        h-auto
                        w-[80vw]
                        max-w-[650px]

                        md:w-[55vm]
                        lg:w-[45vw]
                    "
                />

            </div>

        </section>
    );
}

export default Hero;