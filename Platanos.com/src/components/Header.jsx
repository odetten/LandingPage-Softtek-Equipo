import { useEffect, useRef, useState } from "react";
import { getBackgroundBehindElement, getContrastingTextColor } from "../utils/headerContrast";

const navigationItems = [
    { label: "Inicio", href: "#inicio" },
    { label: "Datos", href: "#datos" },
    { label: "Tipos", href: "#tipos" },
    { label: "Contacto", href: "#contacto" },
];

function Header({ isModelOpen, onToggleModel }) {
    const headerRef = useRef(null);
    const [textColors, setTextColors] = useState({});

    useEffect(() => {
        const header = headerRef.current;
        const transitions = new Set();
        let frame = 0;

        const updateContrast = () => {
            frame = 0;
            const nextColors = {};

            header.querySelectorAll("[data-header-contrast]").forEach((element) => {
                nextColors[element.dataset.headerContrast] = getContrastingTextColor(
                    getBackgroundBehindElement(element, header)
                );
            });

            setTextColors((current) =>
                Object.keys(nextColors).every((key) => current[key] === nextColors[key])
                    ? current
                    : nextColors
            );

            transitions.forEach((element) => {
                if (!element.isConnected) transitions.delete(element);
            });
            if (transitions.size) scheduleUpdate();
        };

        const scheduleUpdate = () => {
            if (!frame) frame = window.requestAnimationFrame(updateContrast);
        };

        const trackTransition = (event) => {
            if (event.propertyName !== "background-color" || header.contains(event.target)) return;

            if (event.type === "transitionrun") transitions.add(event.target);
            else transitions.delete(event.target);
            scheduleUpdate();
        };

        const mutations = new MutationObserver((records) => {
            if (records.some((record) => !header.contains(record.target))) scheduleUpdate();
        });
        mutations.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ["style", "class"],
        });

        const sizes = new ResizeObserver(scheduleUpdate);
        sizes.observe(document.body);
        sizes.observe(header);
        header.querySelectorAll("[data-header-contrast]").forEach((element) => sizes.observe(element));
        window.addEventListener("scroll", scheduleUpdate, { passive: true, capture: true });
        window.addEventListener("resize", scheduleUpdate);
        document.addEventListener("transitionrun", trackTransition);
        document.addEventListener("transitionend", trackTransition);
        document.addEventListener("transitioncancel", trackTransition);
        scheduleUpdate();

        return () => {
            window.cancelAnimationFrame(frame);
            mutations.disconnect();
            sizes.disconnect();
            window.removeEventListener("scroll", scheduleUpdate, true);
            window.removeEventListener("resize", scheduleUpdate);
            document.removeEventListener("transitionrun", trackTransition);
            document.removeEventListener("transitionend", trackTransition);
            document.removeEventListener("transitioncancel", trackTransition);
        };
    }, []);

    return (
        <header ref={headerRef} className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between px-[8%]">
            <button
                type="button"
                data-header-contrast="logo"
                style={{ color: textColors.logo ?? "#1a1a1a" }}
                aria-label={isModelOpen ? "Ocultar modelo 3D" : "Mostrar modelo 3D"}
                aria-pressed={isModelOpen}
                onClick={onToggleModel}
                className="site-header__adaptive cursor-pointer border-0 bg-transparent p-0"
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
                        data-header-contrast={item.href}
                        style={{ color: textColors[item.href] ?? "#1a1a1a" }}
                        className="
                            site-header__adaptive
                            text-xs
                            font-medium
                            no-underline
                            hover:opacity-80
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
