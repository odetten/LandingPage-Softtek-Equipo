import { motion } from 'framer-motion';
import { useState } from 'react';

const footerLinks = {
    variedades: [
        { label: 'Cavendish / Tabasco', href: '#' },
        { label: 'Plátano Morado', href: '#' },
        { label: 'Plátano Macho', href: '#' },
        { label: 'Blue Java', href: '#' },
        { label: 'Dominico', href: '#' },
    ],
    empresa: [
        { label: 'Sobre Nosotros', href: '#' },
        { label: 'Nuestras Fincas', href: '#' },
        { label: 'Sostenibilidad', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Contacto', href: '#' },
    ],
    legal: [
        { label: 'Términos y Condiciones', href: '#' },
        { label: 'Política de Privacidad', href: '#' },
        { label: 'Envíos y Devoluciones', href: '#' },
        { label: 'Preguntas Frecuentes', href: '#' },
    ],
};

const socialLinks = [
    {
        name: 'Instagram',
        href: '#',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        )
    },
    {
        name: 'Twitter / X',
        href: '#',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        )
    },
    {
        name: 'TikTok',
        href: '#',
        icon: (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93v6.16c0 2.52-1.12 4.84-2.97 6.36-1.48 1.25-3.42 2.01-5.36 2.01-4.49 0-8.14-3.65-8.14-8.14 0-3.84 2.67-7.12 6.33-7.93v4.09c-1.38.42-2.41 1.71-2.41 3.21 0 1.87 1.52 3.39 3.39 3.39 1.87 0 3.39-1.52 3.39-3.39V.02h1.69z" />
            </svg>
        )
    },
];

// Variantes de animación escalonada para las columnas
const columnVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
        },
    }),
};

const linkHoverVariants = {
    rest: { x: 0, color: 'rgba(255,255,255,0.6)' },
    hover: { x: 8, color: '#E3F237' },
};

export default function Footer() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setEmail('');
            }, 3000);
        }
    };

    return (
        <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">

            {/* Línea decorativa superior tipo Binkmade */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Newsletter Section - Estilo editorial grande */}
            <div className="max-w-7xl mx-auto px-8 md:px-16 pt-20 pb-16 border-b border-white/10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10"
                >
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-4">
                            Únete al<br />
                            <span className="text-[#E3F237]">Club del Plátano</span>
                        </h2>
                        <p className="text-white/50 text-lg leading-relaxed max-w-md">
                            Recibe recetas exclusivas, novedades de temporada y acceso anticipado a nuevas variedades.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                        <div className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                                disabled={submitted}
                                className="w-full sm:w-80 bg-white/5 border border-white/10 rounded-none px-6 py-4 text-white placeholder-white/30 focus:outline-none focus:border-[#E3F237] focus:bg-white/10 transition-all duration-300 disabled:opacity-50"
                            />
                            {submitted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="absolute inset-0 flex items-center justify-center bg-[#E3F237] text-black font-bold text-sm"
                                >
                                    ✓ ¡Bienvenido!
                                </motion.div>
                            )}
                        </div>
                        <motion.button
                            type="submit"
                            disabled={submitted}
                            whileHover={{ scale: submitted ? 1 : 1.02, backgroundColor: '#d4e32e' }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-[#E3F237] text-black px-8 py-4 font-bold text-sm tracking-widest uppercase hover:bg-[#d4e32e] transition-colors disabled:opacity-50 whitespace-nowrap"
                        >
                            {submitted ? '¡Suscrito!' : 'Suscribirse'}
                        </motion.button>
                    </form>
                </motion.div>
            </div>

            {/* Links Grid - Estilo columnas limpias tipo Binkmade */}
            <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16">

                    {/* Columna Marca */}
                    <motion.div
                        custom={0}
                        variants={columnVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                        className="col-span-2 md:col-span-4 lg:col-span-2"
                    >
                        <h3 className="text-2xl font-black tracking-tight mb-6">
                            PLATANOS<span className="text-[#E3F237]">.COM</span>
                        </h3>
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-8">
                            Desde las mejores fincas de México hasta tu mesa.
                            Cinco variedades únicas seleccionadas por su sabor,
                            textura y calidad excepcional.
                        </p>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.name}
                                    href={social.href}
                                    aria-label={social.name}
                                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-[#E3F237] hover:border-[#E3F237] transition-all duration-300"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {social.icon}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Columna Variedades */}
                    <motion.div
                        custom={1}
                        variants={columnVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-6">
                            Variedades
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.variedades.map((link) => (
                                <li key={link.label}>
                                    <motion.a
                                        href={link.href}
                                        variants={linkHoverVariants}
                                        initial="rest"
                                        whileHover="hover"
                                        className="inline-block text-sm text-white/60 hover:text-[#E3F237] transition-colors duration-300"
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Columna Empresa */}
                    <motion.div
                        custom={2}
                        variants={columnVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-6">
                            Empresa
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.empresa.map((link) => (
                                <li key={link.label}>
                                    <motion.a
                                        href={link.href}
                                        variants={linkHoverVariants}
                                        initial="rest"
                                        whileHover="hover"
                                        className="inline-block text-sm text-white/60 hover:text-[#E3F237] transition-colors duration-300"
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Columna Legal */}
                    <motion.div
                        custom={3}
                        variants={columnVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-50px' }}
                    >
                        <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/30 mb-6">
                            Legal
                        </h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.label}>
                                    <motion.a
                                        href={link.href}
                                        variants={linkHoverVariants}
                                        initial="rest"
                                        whileHover="hover"
                                        className="inline-block text-sm text-white/60 hover:text-[#E3F237] transition-colors duration-300"
                                    >
                                        {link.label}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar - Minimalista */}
            <div className="border-t border-white/10">
                <div className="max-w-7xl mx-auto px-8 md:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="text-xs text-white/30"
                    >
                        © {new Date().getFullYear()} Platanos.com — Todos los derechos reservados.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="flex items-center gap-6"
                    >
                        <span className="text-xs text-white/20">Hecho con 🍌 en México</span>
                    </motion.div>
                </div>
            </div>

            {/* Elemento decorativo sutil de fondo */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#E3F237]/5 rounded-full blur-[120px] pointer-events-none" />
        </footer>
    );
}