import { useEffect, useRef, useState } from "react";

const MilkIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
        <path d="M8 2h8l-1 9H9L8 2z" /><path d="M7 11h10v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9z" />
    </svg>
);
const BananaIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
        <path d="M4 13c0-5 4-9 9-9 3 0 5 2 5 5 0 4-3 8-7 10-3 1-5 1-7-1z" /><path d="M4 13c1 2 3 3 5 3" />
    </svg>
);
const StrawberryIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
        <path d="M12 22c-4 0-7-4-7-10 0-4 3-8 7-8s7 4 7 8c0 6-3 10-7 10z" /><path d="M9 4c1-2 3-2 3-2s2 0 3 2" />
        <circle cx="10" cy="12" r="0.5" fill="currentColor" /><circle cx="14" cy="14" r="0.5" fill="currentColor" /><circle cx="12" cy="16" r="0.5" fill="currentColor" />
    </svg>
);
const FlourIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
        <path d="M6 20h12" /><path d="M7 20v-6l5-4 5 4v6" /><path d="M5 14h14" /><path d="M9 10c0-3 1.5-5 3-5s3 2 3 5" />
    </svg>
);
const EggIcon = ({ size = 20 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
        <path d="M12 22c4 0 7-4 7-10 0-6-3-10-7-10S5 6 5 12c0 6 3 10 7 10z" />
    </svg>
);
const CloseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
        <path d="M18 6L6 18M6 6l12 12" />
    </svg>
);
const ClockIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
);

const recipes = [
    { id: 1, title: "Pan de Plátano", description: "Hecho con plátanos maduros para un sabor increíble. Esponjoso y húmedo.", time: "60 min", servings: "8 rebanadas", difficulty: "Fácil", ingredients: [{ name: "Plátanos maduros", quantity: "3 unidades", icon: "banana" }, { name: "Harina de trigo", quantity: "1 ½ tazas", icon: "flour" }, { name: "Huevos", quantity: "2 grandes", icon: "egg" }, { name: "Azúcar", quantity: "½ taza", icon: "milk" }], steps: ["Precalienta el horno a 175°C y engrasa un molde.", "Machaca los plátanos maduros hasta hacer puré.", "Agrega mantequilla derretida, huevos y azúcar. Mezcla bien.", "Incorpora la harina suavemente sin batir de más.", "Hornea por 50-60 minutos hasta que esté dorado."], image: "https://image.qwenlm.ai/public_source/012e7bc3-28e0-4770-9a09-c63abdf22382/1361a87a5-8edc-471c-acdf-65996ea58988.png", gridClass: "col-span-1 row-span-1", row: "top" },
    { id: 2, title: "Licuado de Plátano y Fresa", description: "Una combinación perfecta, cremosa y refrescante para empezar el día.", time: "5 min", servings: "2 vasos", difficulty: "Muy Fácil", ingredients: [{ name: "Leche", quantity: "1 taza", icon: "milk" }, { name: "Plátano", quantity: "1 grande", icon: "banana" }, { name: "Fresas", quantity: "½ taza", icon: "strawberry" }, { name: "Miel", quantity: "1 cda", icon: "flour" }], steps: ["Congela el plátano y las fresas por 2 horas.", "Coloca todos los ingredientes en la licuadora.", "Licúa a velocidad alta hasta obtener mezcla suave.", "Sirve inmediatamente y decora con fresa."], image: "https://image.qwenlm.ai/public_source/012e7bc3-28e0-4770-9a09-c63abdf22382/135e84d06-188c-495b-bcf5-508567e63d79.png", gridClass: "col-span-2 row-span-1", row: "top" },
    { id: 3, title: "Hot Cakes Sin Gluten", description: "Deliciosos, dorados y perfectos para un desayuno ligero.", time: "20 min", servings: "4 hot cakes", difficulty: "Fácil", ingredients: [{ name: "Harina sin gluten", quantity: "1 taza", icon: "flour" }, { name: "Huevo", quantity: "1 grande", icon: "egg" }, { name: "Plátano", quantity: "1 maduro", icon: "banana" }, { name: "Leche", quantity: "¼ taza", icon: "milk" }], steps: ["Machaca el plátano hasta obtener consistencia suave.", "Agrega el huevo y la leche, batiendo hasta integrar.", "Incorpora la harina sin gluten y mezcla sin grumos.", "Cocina en sartén a fuego medio hasta dorar por ambos lados."], image: "https://image.qwenlm.ai/public_source/012e7bc3-28e0-4770-9a09-c63abdf22382/1deaeda1d-95fa-45c2-92a4-d2cd4739db6c.png", gridClass: "col-span-2 row-span-1", row: "bottom" },
    { id: 4, title: "Helado de Plátano", description: "La magia de un solo ingrediente. Cremoso y natural.", time: "10 min", servings: "2 porciones", difficulty: "Muy Fácil", ingredients: [{ name: "Plátanos congelados", quantity: "3 unidades", icon: "banana" }], steps: ["Corta los plátanos en rodajas y congélalos 4 horas.", "Procesa en licuadora de alta potencia hasta textura cremosa.", "Sirve inmediatamente o congela 30 min más."], image: "https://image.qwenlm.ai/public_source/012e7bc3-28e0-4770-9a09-c63abdf22382/1d7c065c1-d5ae-414b-8dae-298f6ddb6862.png", gridClass: "col-span-1 row-span-1", row: "bottom" },
    { id: 5, title: "Tostadas con Plátano", description: "Energía limpia y sabor. El desayuno perfecto en 5 minutos.", time: "5 min", servings: "1 porción", difficulty: "Muy Fácil", ingredients: [{ name: "Pan integral", quantity: "2 rebanadas", icon: "flour" }, { name: "Plátano", quantity: "1 unidad", icon: "banana" }, { name: "Mantequilla de maní", quantity: "2 cdas", icon: "milk" }], steps: ["Tuesta el pan hasta que esté dorado y crujiente.", "Unta mantequilla de maní generosamente.", "Coloca rodajas de plátano encima.", "Opcional: espolvorea canela o semillas de chía."], image: "https://image.qwenlm.ai/public_source/012e7bc3-28e0-4770-9a09-c63abdf22382/108bfb3ce-a276-4169-9b7d-2c67e245c8a6.png", gridClass: "col-span-1 row-span-2 md:col-start-4 md:row-start-1", row: "tall" }
];

const IconMap = { milk: MilkIcon, banana: BananaIcon, strawberry: StrawberryIcon, flour: FlourIcon, egg: EggIcon };

function RecipeCard({ recipe, isFlipped, onToggleFlip, onExpand }) {
    const transformOrigin = recipe.row === "bottom" ? "bottom center" : "top center";
    return (
        <div className={`relative transition-all duration-500 ${recipe.gridClass}`}>
            <div style={{ perspective: "1000px" }} className="h-full min-h-[280px] w-full">
                <div style={{ transformStyle: "preserve-3d", transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)", transform: isFlipped ? "rotateY(180deg) scale(1.03)" : "rotateY(0deg) scale(1)", position: "relative", width: "100%", height: "100%", minHeight: "280px", zIndex: isFlipped ? 50 : 1 }}>
                    <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", borderRadius: "1.5rem", overflow: "hidden", boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)" }} onClick={() => onToggleFlip(recipe.id)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); onToggleFlip(recipe.id); } }} role="button" tabIndex={0} aria-label={`Abrir receta ${recipe.title}`} className="cursor-pointer group">
                        <img src={recipe.image} alt={recipe.title} className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out" />
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700" />
                        <div className="absolute inset-0 flex items-center justify-center p-6"><h3 className="text-2xl md:text-3xl font-bold text-white text-center leading-tight tracking-tight drop-shadow-lg">{recipe.title}</h3></div>
                    </div>
                    <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", borderRadius: "1.5rem", background: "#ffffff", border: "1px solid #e5e7eb", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "1.5rem", transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)", transformOrigin }}>
                        <div className="w-full text-center">
                            <h3 className="mb-4 text-lg font-bold tracking-tight text-gray-900">{recipe.title}</h3>
                            <div className="mb-6 flex flex-wrap justify-center gap-2">
                                {recipe.ingredients.map((ingredient) => { const IngredientIcon = IconMap[ingredient.icon] || BananaIcon; return <div key={ingredient.name} className="flex min-w-[64px] flex-col items-center gap-1 rounded-xl border border-gray-100 bg-gray-50 p-2"><div className="text-gray-800"><IngredientIcon size={18} /></div><span className="text-[10px] font-medium leading-tight text-gray-600">{ingredient.name}</span></div>; })}
                            </div>
                            <button type="button" onClick={(event) => { event.stopPropagation(); onExpand(recipe.id); }} className="w-full rounded-lg bg-black py-2.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-gray-800">Ver Receta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RecipeModal({ recipe, onClose }) {
    const [translateY, setTranslateY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartY = useRef(0);
    const contentRef = useRef(null);
    useEffect(() => {
        const scrollY = window.scrollY;
        const original = { overflow: document.body.style.overflow, position: document.body.style.position, top: document.body.style.top, width: document.body.style.width };
        Object.assign(document.body.style, { overflow: "hidden", position: "fixed", top: `-${scrollY}px`, width: "100%" });
        return () => { Object.assign(document.body.style, original); window.scrollTo(0, scrollY); };
    }, []);
    useEffect(() => { const handleEscape = (event) => { if (event.key === "Escape") onClose(); }; window.addEventListener("keydown", handleEscape); return () => window.removeEventListener("keydown", handleEscape); }, [onClose]);
    const handleTouchStart = (event) => { if (contentRef.current?.scrollTop <= 5) { dragStartY.current = event.touches[0].clientY; setIsDragging(true); } };
    const handleTouchMove = (event) => { if (isDragging) { const difference = event.touches[0].clientY - dragStartY.current; if (difference > 0) setTranslateY(difference); } };
    const handleTouchEnd = () => { if (translateY > 120) onClose(); else setTranslateY(0); setIsDragging(false); };
    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="recipe-modal-title">
            <button type="button" aria-label="Cerrar receta" className="absolute inset-0 cursor-default bg-black/80 backdrop-blur-md" onClick={onClose} />
            <div className="relative flex h-full w-full flex-col overflow-hidden bg-white p-6 shadow-2xl transition-transform duration-300 md:m-8 md:h-auto md:max-h-[90vh] md:max-w-3xl md:rounded-3xl md:p-8" style={{ transform: `translateY(${translateY}px)`, transitionDuration: isDragging ? "0ms" : "300ms" }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <div className="mx-auto mb-4 h-1 w-12 flex-shrink-0 rounded-full bg-gray-300 md:hidden" aria-hidden="true" />
                <div className="mb-5 flex flex-shrink-0 items-start justify-between gap-4"><div className="flex items-center gap-3"><img src={recipe.image} alt="" className="h-16 w-16 rounded-xl object-cover" /><div><h2 id="recipe-modal-title" className="text-2xl font-bold tracking-tight text-gray-900">{recipe.title}</h2><div className="mt-1 flex flex-wrap items-center gap-2"><span className="inline-flex items-center gap-1 rounded-full bg-black px-2 py-0.5 text-[10px] font-medium text-white"><ClockIcon /> {recipe.time}</span><span className="text-[10px] text-gray-500">{recipe.servings}</span><span className="text-[10px] text-gray-500">{recipe.difficulty}</span></div></div></div><button type="button" onClick={onClose} aria-label="Cerrar receta" className="flex-shrink-0 rounded-lg p-2 text-gray-700 hover:bg-gray-100"><CloseIcon /></button></div>
                <div ref={contentRef} className="min-h-0 flex-1 overflow-y-auto pr-1"><p className="mb-6 text-lg font-light leading-relaxed text-gray-600">{recipe.description}</p><div className="mb-6"><h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Ingredientes</h3><div className="grid grid-cols-2 gap-2">{recipe.ingredients.map((ingredient) => { const IngredientIcon = IconMap[ingredient.icon] || BananaIcon; return <div key={ingredient.name} className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2"><div className="flex-shrink-0 text-gray-900"><IngredientIcon size={16} /></div><div className="flex min-w-0 flex-col"><span className="text-xs font-bold leading-tight text-gray-900">{ingredient.quantity}</span><span className="truncate text-[10px] leading-tight text-gray-500">{ingredient.name}</span></div></div>; })}</div></div><div><h3 className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">Preparación</h3><div className="space-y-3">{recipe.steps.map((step, index) => <div key={step} className="flex gap-3"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-black text-[9px] font-bold text-white">{String(index + 1).padStart(2, "0")}</span><p className="pt-0.5 text-sm leading-snug text-gray-700">{step}</p></div>)}</div></div></div>
            </div>
        </div>
    );
}

export default function Recetas() {
    const [flippedCardId, setFlippedCardId] = useState(null);
    const [expandedCardId, setExpandedCardId] = useState(null);
    const handleToggleFlip = (id) => { if (expandedCardId) return; setFlippedCardId((previousId) => previousId === id ? null : id); };
    const handleExpand = (id) => { setFlippedCardId(id); setExpandedCardId(id); };
    const handleCloseExpand = () => setExpandedCardId(null);
    const expandedRecipe = recipes.find((recipe) => recipe.id === expandedCardId);
    return (
        <section className="min-h-screen bg-white px-4 py-16 md:px-8 md:py-24 lg:px-16">
            <div className="mx-auto max-w-7xl"><div className="mb-16 md:mb-24"><h1 className="mb-4 text-5xl font-bold tracking-tighter text-gray-900 md:text-8xl">PLÁTANOS</h1><p className="max-w-xl text-lg font-light text-gray-400 md:text-2xl">Recetas minimalistas.<br />Sabor máximo.</p></div><div className="grid auto-rows-[minmax(280px,auto)] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">{recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} isFlipped={flippedCardId === recipe.id} onToggleFlip={handleToggleFlip} onExpand={handleExpand} />)}</div></div>
            {expandedRecipe && <RecipeModal recipe={expandedRecipe} onClose={handleCloseExpand} />}
        </section>
    );
}
