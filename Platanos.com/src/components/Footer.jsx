import { motion, useReducedMotion } from 'framer-motion';
import BananaRunner from './BananaRunner';

const footerLinks = [
    {
        title: 'Variedades',
        links: [
            { label: 'Cavendish / Tabasco', href: '#tipos' },
            { label: 'Plátano Morado', href: '#tipos' },
            { label: 'Plátano Macho', href: '#tipos' },
            { label: 'Blue Java', href: '#tipos' },
            { label: 'Dominico', href: '#tipos' },
        ],
    },
    {
        title: 'Explora',
        links: [
            { label: 'Inicio', href: '#inicio' },
            { label: 'Beneficios', href: '#beneficios' },
            { label: 'Tipos y origen', href: '#tipos' },
            { label: '¿Y dónde crecen?', href: '#donde-crecen' },
        ],
    },
    {
        title: 'Descubre más',
        links: [
            { label: 'Arte y curiosidades', href: '#arte' },
            { label: 'Interactivo', href: '#interactivo' },
            { label: 'Contacto', href: '#contacto' },
        ],
    },
];

export default function Footer() {
    const reducedMotion = useReducedMotion();
    const reveal = {
        initial: reducedMotion ? false : { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.1 },
        transition: { duration: reducedMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
    };

    return (
        <footer className="site-footer relative overflow-hidden bg-[#0a0a0a] text-white" aria-label="Pie de página">
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <div className="mx-auto max-w-7xl border-b border-white/10 px-5 pb-12 pt-16 sm:px-8 md:px-16 md:pb-16 md:pt-20">
                <motion.div {...reveal} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                    <div className="max-w-xl">
                        <h2 className="mb-4 text-4xl font-black leading-none tracking-tight md:text-6xl">
                            Bienvenido al<br /><span className="text-[#E3F237]">Banana club</span>
                        </h2>
                        <p className="max-w-md text-lg leading-relaxed text-white/70">Para quienes siempre encuentran algo más que pelar. Sabores, arte y curiosidades para seguir explorando.</p>
                    </div>
                    <BananaRunner />
                </motion.div>
            </div>
            <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 md:px-16 md:py-16">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5 lg:gap-10">
                    <motion.div {...reveal} className="col-span-2 md:col-span-3 lg:col-span-2">
                        <a href="#inicio" className="inline-block text-2xl font-black tracking-tight" aria-label="Plátanos, volver al inicio">PLÁTANOS<span className="text-[#E3F237]">.COM</span></a>
                        <p className="mt-6 max-w-xs text-base leading-relaxed text-white/70">Cinco variedades únicas. Conoce sus sabores, sus usos y los lugares donde crecen.</p>
                    </motion.div>
                    {footerLinks.map((group) => (
                        <motion.nav key={group.title} {...reveal} aria-label={group.title}>
                            <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-white/70">{group.title}</h3>
                            <ul>
                                {group.links.map((link) => (
                                    <li key={link.label}>
                                        <a href={link.href} className="inline-flex min-h-11 items-center py-2 text-sm leading-relaxed text-white/80 transition-colors hover:text-[#E3F237]">{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </motion.nav>
                    ))}
                </div>
            </div>
            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:px-8 md:flex-row md:px-16 md:text-left">
                    <p className="text-sm text-white/65">© {new Date().getFullYear()} Plátanos.com — Todos los derechos reservados.</p>
                    <span className="text-sm text-white/65">Hecho con 🍌 en México</span>
                </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[#E3F237]/5 blur-[120px]" aria-hidden="true" />
        </footer>
    );
}
