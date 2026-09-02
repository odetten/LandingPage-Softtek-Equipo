function Header() {
    return (
        <header className="fixed top-4 left-0 z-50 w-full px-[6%]">

            <div
                className="
                    flex
                    h-[56px]
                    items-center
                    justify-between

                    rounded-[22px]
                    border
                    border-gray-200/60

                    bg-white/70
                    dark:bg-[#1a1a1a]/70

                    backdrop-blur-md
                    shadow-sm

                    px-5
                "
            >

                <h2 className="text-xl font-bold text-[#222] dark:text-white">
                    Hola
                </h2>

                <nav className="flex items-center gap-3">

                    <a
                        href="#inicio"
                        className="
                            rounded-full
                            px-4
                            py-2

                            text-sm
                            font-medium
                            text-[#222]
                            dark:text-white

                            hover:bg-black/5
                            dark:hover:bg-white/10


                            no-underline
                        "
                    >
                        Inicio
                    </a>

                    <a
                        href="#seccion2"
                        className="
                            rounded-full
                            px-4
                            py-2

                            text-sm
                            font-medium
                            text-[#222]
                            dark:text-white

                            hover:bg-black/5
                            dark:hover:bg-white/10


                            no-underline
                        "
                    >
                        A
                    </a>

                    <a
                        href="#seccion3"
                        className="
                            rounded-full
                            px-4
                            py-2

                            text-sm
                            font-medium
                            text-[#222]
                            dark:text-white

                            hover:bg-black/5
                            dark:hover:bg-white/10


                            no-underline
                        "
                    >
                        AA
                    </a>

                    <a
                        href="#tarjetas"
                        className="
                            rounded-full
                            px-4
                            py-2

                            text-sm
                            font-medium
                            text-[#222]
                            dark:text-white

                            hover:bg-black/5
                            dark:hover:bg-white/10

                            no-underline
                        "
                    >
                        AAA
                    </a>

                </nav>

            </div>

        </header>
    );
}

export default Header;