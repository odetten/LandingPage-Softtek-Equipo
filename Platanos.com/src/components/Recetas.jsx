import { useEffect, useRef, useState } from "react";

const MilkIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M8 2h8l-1 9H9L8 2z" />
    <path d="M7 11h10v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9z" />
  </svg>
);

const BananaIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M4 13c0-5 4-9 9-9 3 0 5 2 5 5 0 4-3 8-7 10-3 1-5 1-7-1z" />
    <path d="M4 13c1 2 3 3 5 3" />
  </svg>
);

const StrawberryIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M12 22c-4 0-7-4-7-10 0-4 3-8 7-8s7 4 7 8c0 6-3 10-7 10z" />
    <path d="M9 4c1-2 3-2 3-2s2 0 3 2" />
    <circle cx="10" cy="12" r="0.5" fill="currentColor" />
    <circle cx="14" cy="14" r="0.5" fill="currentColor" />
    <circle cx="12" cy="16" r="0.5" fill="currentColor" />
  </svg>
);

const FlourIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M6 20h12" />
    <path d="M7 20v-6l5-4 5 4v6" />
    <path d="M5 14h14" />
    <path d="M9 10c0-3 1.5-5 3-5s3 2 3 5" />
  </svg>
);

const EggIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M12 22c4 0 7-4 7-10 0-6-3-10-7-10S5 6 5 12c0 6 3 10 7 10z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" style={{ stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

const recipes = [
  {
    id: 1,
    title: "Pan de Plátano",
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
    title: "Hot Cakes Sin Gluten",
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
    title: "Helado de Plátano",
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
    title: "Tostadas con Plátano",
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

// Modal Component - Estilo brutalista/minimalista
function RecipeModal({ recipe, onClose }) {
  const [translateY, setTranslateY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const contentRef = useRef(null);

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
      className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4"
      onClick={onClose}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        style={{ animation: "fadeIn 0.3s ease" }}
      />

      <div
        ref={contentRef}
        className="relative w-full max-w-3xl bg-white h-full md:h-auto md:max-h-[90vh] md:rounded-3xl overflow-hidden"
        style={{
          animation: "slideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: `translateY(${translateY}px)`,
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 md:hidden">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-colors"
          aria-label="Cerrar"
        >
          <CloseIcon />
        </button>

        <div className="h-full overflow-y-auto">
          <div className="relative h-64 md:h-96">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-2">{recipe.title}</h2>
            </div>
          </div>

          <div className="p-6 md:p-10 space-y-8">
            <div className="flex items-center gap-4 text-sm font-medium">
              <span className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full">
                <ClockIcon /> {recipe.time}
              </span>
              <span className="text-gray-500">{recipe.difficulty}</span>
            </div>

            <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
              {recipe.description}
            </p>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Ingredientes</h3>
              <div className="flex flex-wrap gap-3">
                {recipe.ingredients.map((ingredient, index) => {
                  const IngredientIcon = IconMap[ingredient.icon] || BananaIcon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                    >
                      <div className="text-gray-900">
                        <IngredientIcon size={20} />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{ingredient.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Preparación</h3>
              <div className="space-y-4">
                {recipe.steps.map((step, index) => (
                  <div key={index} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-black text-white flex items-center justify-center text-xs font-bold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-gray-700 leading-relaxed pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            transform: translateY(100px) scale(0.95);
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
        className="h-full min-h-[280px] w-full cursor-pointer group"
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isFlipped ? "rotateY(180deg) scale(1.03)" : "rotateY(0deg) scale(1)",
            position: "relative",
            width: "100%",
            height: "100%",
            minHeight: "280px",
            zIndex: isFlipped ? 50 : 1,
          }}
        >
          {/* FRONT: Solo imagen en gris + título minimalista */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              borderRadius: "1.5rem",
              overflow: "hidden",
              boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all duration-700" />

            <div className="absolute inset-0 flex items-center justify-center p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center leading-tight tracking-tight drop-shadow-lg">
                {recipe.title}
              </h3>
            </div>
          </div>

          {/* BACK: Ingredientes minimalistas y compactos */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "1.5rem",
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: "1.5rem",
            }}
          >
            <div className="text-center w-full">
              <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight">{recipe.title}</h3>

              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {recipe.ingredients.map((ingredient, index) => {
                  const IngredientIcon = IconMap[ingredient.icon] || BananaIcon;
                  return (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-1 p-2 border border-gray-100 rounded-xl bg-gray-50 min-w-[64px] hover:border-gray-300 transition-colors"
                    >
                      <div className="text-gray-800">
                        <IngredientIcon size={18} />
                      </div>
                      <span className="text-[10px] font-medium text-gray-600 leading-tight">{ingredient.name}</span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenModal(recipe);
                }}
                className="w-full py-2.5 bg-black text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-gray-800 transition-colors active:scale-95 transform duration-150"
              >
                Ver Receta
              </button>
            </div>
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
    <section className="min-h-screen bg-white px-4 py-16 md:px-8 md:py-24 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:mb-24">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-gray-900 mb-4">
            PLÁTANOS
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 font-light max-w-xl">
            Recetas minimalistas.<br />Sabor máximo.
          </p>
        </div>

        {/* Bento Grid con la distribución anterior */}
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
      </div>
    </section>
  );
}