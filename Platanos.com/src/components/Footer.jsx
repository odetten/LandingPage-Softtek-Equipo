import { motion, useReducedMotion } from 'framer-motion';
import BananaRunner from './BananaRunner';

const footerLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Beneficios', href: '#beneficios' },
    { label: 'Tipos', href: '#tipos' },
    { label: 'Arte', href: '#arte' },
    { label: 'Interactivo', href: '#interactivo' },
    { label: 'Contacto', href: '#contacto' },
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
        <footer id="footer" className="site-footer text-white" aria-label="Pie de página">
            <div className="site-footer__game mx-auto max-w-7xl border-b border-white/10 py-14 md:py-16">
                <motion.div {...reveal} className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
                    <h2 className="site-footer__title">
                        Una última<br /><span>partida.</span>
                    </h2>
                    <BananaRunner />
                </motion.div>
            </div>

            <motion.div {...reveal} className="site-footer__navigation mx-auto flex max-w-7xl flex-col gap-7 py-9 lg:flex-row lg:items-center lg:justify-between">
                <a href="#inicio" className="inline-block text-2xl font-black tracking-tight" aria-label="Plátanos, volver al inicio">
                    PLÁTANOS<span className="text-[var(--banana-yellow)]">.COM</span>
                </a>
                <nav aria-label="Navegación del pie de página">
                    <ul className="flex flex-wrap gap-x-7 gap-y-2">
                        {footerLinks.map((link) => (
                            <li key={link.label}>
                                <a href={link.href} className="inline-flex min-h-11 items-center text-sm text-white/70 transition-colors hover:text-[var(--banana-yellow)]">
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </motion.div>

            <div className="site-footer__legal border-t border-white/10 py-5 text-center text-xs text-white/50">
                © {new Date().getFullYear()} Plátanos.com
            </div>
        </footer>
    );
}
