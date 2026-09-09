import { useState, useEffect, useRef } from "react";

const MilkIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M8 2h8l-1 9H9L8 2z" />
    <path d="M7 11h10v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9z" />
  </svg>
);

const BananaIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M4 13c0-5 4-9 9-9 3 0 5 2 5 5 0 4-3 8-7 10-3 1-5 1-7-1z" />
    <path d="M4 13c1 2 3 3 5 3" />
  </svg>
);

const StrawberryIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M12 22c-4 0-7-4-7-10 0-4 3-8 7-8s7 4 7 8c0 6-3 10-7 10z" />
    <path d="M9 4c1-2 3-2 3-2s2 0 3 2" />
    <circle cx="10" cy="12" r="0.5" fill="#1f2937" />
    <circle cx="14" cy="14" r="0.5" fill="#1f2937" />
    <circle cx="12" cy="16" r="0.5" fill="#1f2937" />
  </svg>
);

const FlourIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M6 20h12" />
    <path d="M7 20v-6l5-4 5 4v6" />
    <path d="M5 14h14" />
    <path d="M9 10c0-3 1.5-5 3-5s3 2 3 5" />
  </svg>
);

const EggIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M12 22c4 0 7-4 7-10 0-6-3-10-7-10S5 6 5 12c0 6 3 10 7 10z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" style={{ stroke: "white", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const FireIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M12 2c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10z" />
  </svg>
);

const recipes = [
  {
    id: 1,
    title: "Pan de Plátano Esponjoso",
    subtitle: "Nuestro Pan de Plátano Premium",
    description: "Hecho con plátanos maduros para un sabor increíble. Esponjoso y húmedo.",
    time: "60 min",
    difficulty: "Fácil",
    ingredients: [
      { name: "Plátanos", icon: "banana" },
      { name: "Harina", icon: "flour" },
      { name: "Huevos", icon: "egg" },
      { name: "Azúcar", icon: "milk" },
    ],
    steps: [
      "Precalienta el horno a 175°C.",
      "Machaca los plátanos maduros en un bowl.",
      "Mezcla con harina, huevos y azúcar.",
      "Hornea por 50-60 minutos hasta que esté dorado.",
    ],
    image: "https://image.qwenlm.ai/public_source/012e7bc3-28e0-4770-9a09-c63abdf22382/1361a87a5-8edc-471c-acdf-65996ea58988.png",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 2,
    title: "Licuado de Plátano y Fresa",
    subtitle: "Refrescante y Nutritivo",
    description: "Una combinación perfecta de plátano y fresa para empezar el día.",
    time: "5 min",
    difficulty: "Muy Fácil",
    ingredients: [
      { name: "Leche", icon: "milk" },
      { name: "Plátano", icon: "banana" },
      { name: "Fresas", icon: "strawberry" },
      { name: "Miel", icon: "flour" },
    ],
    steps: [
      "Congela plátanos y fresas para un sabor más intenso.",
      "Licúa plátanos, fresas y leche hasta obtener una mezcla suave.",
      "Sirve y disfruta con sabor intenso.",
    ],
    image: "https://image.qwenlm.ai/public_source/012e7bc3-28e0-4770-9a09-c63abdf22382/135e84d06-188c-495b-bcf5-508567e63d79.png",
    gridClass: "col-span-2 row-span-1",
  },
  {
    id: 3,
    title: "Hot Cakes de Plátano Sin Gluten",
    subtitle: "Súper fáciles y rápidos de preparar",
    description: "Deliciosos hot cakes sin gluten, perfectos para el desayuno.",
    time: "20 min",
    difficulty: "Fácil",
    ingredients: [
      { name: "Harina", icon: "flour" },
      { name: "Huevo", icon: "egg" },
      { name: "Plátano", icon: "banana" },
      { name: "Leche", icon: "milk" },
    ],
    steps: [
      "Mezcla harina sin gluten, huevo y plátano machacado.",
      "Agrega leche hasta obtener la consistencia deseada.",
      "Cocina en sartén a fuego medio hasta dorar.",
    ],
    image: "https://image.qwenlm.ai/public_source/012e7bc3-28e0-4770-9a09-c63abdf22382/1deaeda1d-95fa-45c2-92a4-d2cd4739db6c.png",
    gridClass: "col-span-2 row-span-1",
  },
  {
    id: 4,
    title: "Helado de Plátano con Un Solo Ingrediente",
    subtitle: "Natural y Cremoso",
    description: "Sin azúcar añadida. Solo necesitas plátanos congelados.",
    time: "10 min",
    difficulty: "Muy Fácil",
    ingredients: [{ name: "Plátano", icon: "banana" }],
    steps: [
      "Congela plátanos maduros por al menos 4 horas.",
      "Procesa los plátanos congelados hasta obtener textura cremosa.",
      "Sirve inmediatamente o congela para después.",
    ],
    image: "https://image.qwenlm.ai/public_source/012e7bc3-28e0-4770-9a09-c63abdf22382/1d7c065c1-d5ae-414b-8dae-298f6ddb6862.png",
    gridClass: "col-span-1 row-span-1",
  },
  {
    id: 5,
    title: "Tostadas con Plátano y Mantequilla de Maní",
    subtitle: "El Desayuno Perfecto",
    description: "Energía y sabor para empezar el día.",
    time: "5 min",
    difficulty: "Muy Fácil",
    ingredients: [
      { name: "Pan", icon: "flour" },
      { name: "Plátano", icon: "banana" },
      { name: "Mantequilla de Maní", icon: "milk" },
    ],
    steps: [
      "Tuesta el pan hasta que esté dorado.",
      "Unta mantequilla de maní generosamente.",
      "Coloca rodajas de plátano encima y disfruta.",
    ],
    image: "https://image.qwenlm.ai/public_source/012e7bc3-28e0-4770-9a09-c63abdf22382/108bfb3ce-a276-4169-9b7d-2c67e245c8a6.png",
    gridClass: "col-span-1 row-span-2 md:col-start-4 md:row-start-1",
  },
];

const IconMap = {
  milk: MilkIcon,
  banana: BananaIcon,
  strawberry: StrawberryIcon,
  flour: FlourIcon,
  egg: EggIcon,
};

// Modal Component
function RecipeModal({ recipe, onClose }) {
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  // Bloquear scroll del body cuando el modal está abierto
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalPosition = document.body.style.position;
    const originalWidth = document.body.style.width;

    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.width = "100%";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.position = originalPosition;
      document.body.style.width = originalWidth;
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleTouchStart = (e) => {
    const content = contentRef.current;
    // Solo iniciar drag si el scroll está en la parte superior
    if (content && content.scrollTop <= 5) {
      dragStartY.current = e.touches[0].clientY;
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const touchY = e.touches[0].clientY;
    const diff = touchY - dragStartY.current;
    if (diff > 0) {
      setTranslateY(diff);
    }
  };

  const handleTouchEnd = () => {
    if (translateY > 120) {
      onClose();
    } else {
      setTranslateY(0);
    }
    setIsDragging(false);
  };

  if (!recipe) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        style={{ animation: "fadeIn 0.3s ease" }}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl"
        style={{
          animation: "slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: `translateY(${translateY}px)`,
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Drag handle indicator */}
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Header Image */}
        <div className="relative h-40 md:h-56 flex-shrink-0">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-t-3xl"
          />
          <div
            className="absolute inset-0 rounded-t-3xl"
            style={{
              background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-gray-900 hover:bg-white transition-colors shadow-lg z-10"
            aria-label="Cerrar modal"
          >
            <CloseIcon />
          </button>
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <p className="text-xs font-medium opacity-90 mb-0.5">{recipe.subtitle}</p>
            <h2 className="text-xl md:text-2xl font-bold leading-tight">{recipe.title}</h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div
          ref={contentRef}
          className="flex-1 overflow-y-auto p-5 md:p-7"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {/* Badges */}
          <div className="flex items-center gap-2.5 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
              <ClockIcon /> {recipe.time}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800">
              <FireIcon /> {recipe.difficulty}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-5 leading-relaxed text-sm">{recipe.description}</p>

          {/* Ingredients */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-gray-900 mb-2.5">Ingredientes</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.ingredients.map((ingredient, index) => {
                const IngredientIcon = IconMap[ingredient.icon] || BananaIcon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="text-gray-700">
                      <IngredientIcon size={18} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{ingredient.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Steps */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2.5">Preparación</h3>
            <div className="space-y-2.5">
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed text-sm">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Close hint */}
        <div className="flex-shrink-0 px-5 pb-3 text-center">
          <p className="text-[10px] text-gray-400">Desliza hacia abajo o haz click fuera para cerrar</p>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}

function RecipeCard({ recipe, isFlipped, onToggleFlip, onOpenModal }) {
  return (
    <div className={`relative transition-all duration-500 ${recipe.gridClass}`}>
      <div
        role="button"
        tabIndex={0}
        onClick={onToggleFlip}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggleFlip();
          }
        }}
        style={{ perspective: "1000px" }}
        className="h-full min-h-[280px] w-full cursor-pointer"
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s ease",
            transform: isFlipped ? "rotateY(180deg) scale(1.03)" : "rotateY(0deg) scale(1)",
            position: "relative",
            width: "100%",
            height: "100%",
            minHeight: "280px",
            zIndex: isFlipped ? 50 : 1,
          }}
        >
          {/* FRONT: imagen + nombre */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <img src={recipe.image} alt={recipe.title} className="absolute inset-0 h-full w-full object-cover" />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 70%, transparent 100%)",
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-between p-5 text-white md:p-6">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                  <ClockIcon /> {recipe.time}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                  <FireIcon /> {recipe.difficulty}
                </span>
              </div>

              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wider text-white/70">
                  {recipe.subtitle}
                </p>
                <h3 className="mb-4 text-lg font-bold leading-tight md:text-xl lg:text-2xl">
                  {recipe.title}
                </h3>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/90">Ver receta</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleFlip();
                    }}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-transform hover:scale-110"
                    aria-label={`Abrir receta ${recipe.title}`}
                  >
                    <PlusIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BACK: solo iconos de ingredientes + botón */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "1.5rem",
              background: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(229, 231, 235, 0.8)",
              boxShadow: isFlipped ? "0 50px 100px -20px rgba(0, 0, 0, 0.25)" : "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              padding: "1.25rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <div className="text-center">
              <h3 className="text-base font-bold text-gray-900 mb-1 leading-tight">{recipe.title}</h3>
              <p className="text-[10px] text-gray-500 mb-3">Ingredientes</p>

              <div className="flex flex-wrap justify-center gap-2">
                {recipe.ingredients.map((ingredient, index) => {
                  const IngredientIcon = IconMap[ingredient.icon] || BananaIcon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1 p-2 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-100 shadow-sm min-w-[60px]"
                    >
                      <div className="text-gray-700">
                        <IngredientIcon size={20} />
                      </div>
                      <span className="text-[9px] font-medium text-gray-600 text-center leading-tight">{ingredient.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenModal(recipe);
              }}
              className="w-full py-2 bg-gray-900 text-white rounded-lg font-medium text-xs hover:bg-gray-800 transition-colors shadow-md active:scale-95 transform duration-150"
            >
              Ver receta completa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Recetas() {
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [modalRecipe, setModalRecipe] = useState(null);

  const handleToggleFlip = (id) => {
    setFlippedCardId((prevId) => (prevId === id ? null : id));
  };

  const handleOpenModal = (recipe) => {
    setModalRecipe(recipe);
    setFlippedCardId(null);
  };

  const handleCloseModal = () => {
    setModalRecipe(null);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-12 md:px-8 md:py-20 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
            Plátanos y Más Recetas
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Descubre deliciosas formas de disfrutar los plátanos con nuestras recetas fáciles y saludables.
          </p>
        </div>

        {/* Grid */}
        <div className="grid auto-rows-[minmax(280px,auto)] grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFlipped={flippedCardId === recipe.id}
              onToggleFlip={() => handleToggleFlip(recipe.id)}
              onOpenModal={handleOpenModal}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 text-sm text-gray-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Haz click en cualquier tarjeta para ver los ingredientes
          </p>
        </div>
      </div>

      {/* Modal */}
      {modalRecipe && (
        <RecipeModal recipe={modalRecipe} onClose={handleCloseModal} />
      )}
    </section>
  );
}