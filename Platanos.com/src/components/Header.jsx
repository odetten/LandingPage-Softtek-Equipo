const navigationItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Datos", href: "#datos" },
    { label: "Tipos", href: "#tipos" },
    { label: "Contacto", href: "#contacto" },
];

function Header({ isModelOpen, onToggleModel }) {
    return (
        <header className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between px-[8%]">
            <button
                type="button"
                aria-label={isModelOpen ? "Ocultar modelo 3D" : "Mostrar modelo 3D"}
                aria-pressed={isModelOpen}
                onClick={onToggleModel}
                className="cursor-pointer border-0 bg-transparent p-0 text-[#1a1a1a]"
            >
                <span className="text-xl font-bold sm:text-2xl">Hola</span>
            </button>

            <nav
                aria-label="Navegación principal"
                className="flex items-center gap-4 sm:gap-[25px]"
            >
                {navigationItems.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className="
                            text-xs
                            font-medium
                            text-[#1a1a1a]
                            opacity-80
                            no-underline
                            transition-opacity
                            duration-200
                            hover:opacity-100
                            focus-visible:rounded-sm
                            focus-visible:outline-none
                            focus-visible:ring-2
                            focus-visible:ring-[#1a1a1a]
                            focus-visible:ring-offset-2
                            focus-visible:ring-offset-[#f4ff95]
                            sm:text-sm
                        "
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}

export default Header;
