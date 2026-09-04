import { useEffect, useRef, useState } from "react";
import { getBackgroundBehindElement, getContrastingTextColor } from "../utils/headerContrast";
import { getActiveSection } from "../utils/navigation";

const navigationItems = [
    { label: "Inicio", href: "#inicio", available: true },
    { label: "Beneficios", href: "#beneficios", available: true },
    { label: "Tipos y origen", href: "#tipos", available: true },
    { label: "Arte y curiosidades", href: "#arte", available: true },
    { label: "Interactivo", href: "#interactivo", available: true },
    { label: "Contacto", href: "#contacto", available: true },
];

function Header() {
    const headerRef = useRef(null);
    const menuButtonRef = useRef(null);
    const [textColors, setTextColors] = useState({});
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches);
    const [activeSection, setActiveSection] = useState("inicio");

    useEffect(() => {
        const mobile = window.matchMedia("(max-width: 1023px)");
        const onChange = (event) => {
            setIsMobile(event.matches);
            if (!event.matches) setIsMenuOpen(false);
        };
        mobile.addEventListener("change", onChange);
        return () => mobile.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        if (!isMenuOpen) return undefined;

        const closeOutside = (event) => {
            if (!headerRef.current.contains(event.target)) setIsMenuOpen(false);
        };
        const closeWithEscape = (event) => {
            if (event.key !== "Escape") return;
            setIsMenuOpen(false);
            menuButtonRef.current?.focus();
        };

        document.addEventListener("pointerdown", closeOutside);
        document.addEventListener("keydown", closeWithEscape);
        return () => {
            document.removeEventListener("pointerdown", closeOutside);
            document.removeEventListener("keydown", closeWithEscape);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        const header = headerRef.current;
        const transitions = new Set();
        let frame = 0;

        const updateContrast = () => {
            frame = 0;
            const nextColors = {};
            const sections = navigationItems.flatMap((item) => {
                const section = document.getElementById(item.href.slice(1));
                return section ? [{ id: section.id, top: section.getBoundingClientRect().top }] : [];
            });
            setActiveSection(getActiveSection(
                sections,
                header.getBoundingClientRect().bottom + 16,
                window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
            ));

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
            <a
                href="#inicio"
                data-header-contrast="logo"
                style={{ color: textColors.logo ?? "#1a1a1a" }}
                aria-label="Plátanos, volver al inicio"
                className="site-header__adaptive no-underline"
                onClick={() => setIsMenuOpen(false)}
            >
                <span className="site-wordmark">Plátanos<span>.</span></span>
            </a>

            <button
                ref={menuButtonRef}
                type="button"
                className="site-header__adaptive site-header__menu-toggle"
                data-header-contrast="menu"
                style={{ color: textColors.menu ?? "#1a1a1a" }}
                aria-expanded={isMenuOpen}
                aria-controls="primary-navigation"
                aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            >
                {isMenuOpen ? "Cerrar" : "Menú"}
                <span aria-hidden="true">+</span>
            </button>

            <nav
                id="primary-navigation"
                aria-label="Navegación principal"
                inert={isMobile && !isMenuOpen ? true : undefined}
                aria-hidden={isMobile && !isMenuOpen ? true : undefined}
                className={`site-header__navigation${isMenuOpen ? " is-open" : ""}`}
            >
                {navigationItems.map((item, index) => (
                    <a
                        key={item.href}
                        href={item.available ? item.href : undefined}
                        role={item.available ? undefined : "link"}
                        aria-disabled={item.available ? undefined : true}
                        aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
                        aria-label={item.available ? undefined : `${item.label}, próximamente`}
                        title={item.available ? undefined : "Próximamente"}
                        data-header-contrast={item.href}
                        style={{ "--nav-index": index, color: isMobile ? "#1a1a1a" : textColors[item.href] ?? "#1a1a1a" }}
                        className="site-header__adaptive site-header__link"
                        onClick={() => {
                            if (item.available) setIsMenuOpen(false);
                        }}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </header>
    );
}

export default Header;
