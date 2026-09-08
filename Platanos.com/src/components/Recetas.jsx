import { useState } from "react";

const MilkIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M8 2h8l-1 9H9L8 2z" />
    <path d="M7 11h10v9a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-9z" />
  </svg>
);

const BananaIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M4 13c0-5 4-9 9-9 3 0 5 2 5 5 0 4-3 8-7 10-3 1-5 1-7-1z" />
    <path d="M4 13c1 2 3 3 5 3" />
  </svg>
);

const StrawberryIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M12 22c-4 0-7-4-7-10 0-4 3-8 7-8s7 4 7 8c0 6-3 10-7 10z" />
    <path d="M9 4c1-2 3-2 3-2s2 0 3 2" />
    <circle cx="10" cy="12" r="0.5" fill="#1f2937" />
    <circle cx="14" cy="14" r="0.5" fill="#1f2937" />
    <circle cx="12" cy="16" r="0.5" fill="#1f2937" />
  </svg>
);

const FlourIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M6 20h12" />
    <path d="M7 20v-6l5-4 5 4v6" />
    <path d="M5 14h14" />
    <path d="M9 10c0-3 1.5-5 3-5s3 2 3 5" />
  </svg>
);

const EggIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M12 22c4 0 7-4 7-10 0-6-3-10-7-10S5 6 5 12c0 6 3 10 7 10z" />
  </svg>
);

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ stroke: "white", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" style={{ stroke: "#1f2937", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" }}>
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
    gridClass: "md:col-span-1 md:row-span-2",
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
    gridClass: "md:col-span-1 md:row-span-1",
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
    gridClass: "md:col-span-1 md:row-span-1",
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
    gridClass: "md:col-span-1 md:row-span-2",
  },
  {
    id: 5,
    title: "Tostadas con Plátano y Mantequilla de Maní",
    subtitle: "El Desayuno Perfecto",
    description: "Energía y sabor para empezar el día.",
    time: "10 min",
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
    gridClass: "md:col-span-1 md:row-span-2",
  },
];

const IconMap = {
  milk: MilkIcon,
  banana: BananaIcon,
  strawberry: StrawberryIcon,
  flour: FlourIcon,
  egg: EggIcon,
};

function RecipeCard({ recipe, isFlipped, onToggleFlip }) {
  return (
    <div className={`transition-all duration-500 hover:scale-[1.02] ${recipe.gridClass}`}>
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
        className="h-full min-h-[320px] w-full cursor-pointer"
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            position: "relative",
            width: "100%",
            height: "100%",
            minHeight: "320px",
          }}
        >
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
                background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.15) 70%, transparent 100%)",
              }}
            />

            <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
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
                <h3 className="mb-4 text-xl font-bold leading-tight md:text-2xl">{recipe.title}</h3>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/90">Ver receta</span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onToggleFlip();
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg transition-transform hover:scale-110"
                    aria-label={`Abrir receta ${recipe.title}`}
                  >
                    <PlusIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              inset: 0,
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderRadius: "1.5rem",
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(229, 231, 235, 0.8)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3 className="mb-1 text-xl font-bold leading-tight text-gray-900 md:text-2xl">{recipe.title}</h3>
              <p className="mb-4 text-sm text-gray-600">{recipe.description}</p>

              <div className="mb-4 flex flex-wrap gap-3">
                {recipe.ingredients.map((ingredient, index) => {
                  const IngredientIcon = IconMap[ingredient.icon] || BananaIcon;
                  return (
                    <div key={`${ingredient.name}-${index}`} className="flex flex-col items-center gap-1">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-gray-50">
                        <IngredientIcon />
                      </div>
                      <span className="text-center text-[10px] font-medium leading-tight text-gray-600">{ingredient.name}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-2">
                {recipe.steps.map((step, index) => (
                  <div key={`${recipe.id}-step-${index}`} className="flex gap-2 text-sm">
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="leading-snug text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-3">
              <span className="text-sm font-medium text-gray-700">Ingredientes y pasos</span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  onToggleFlip();
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-900 transition-colors hover:bg-gray-200"
                aria-label="Cerrar receta"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Recetas() {
  const [flippedCards, setFlippedCards] = useState(new Set());

  const handleToggleFlip = (id) => {
    setFlippedCards((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
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

        <div className="grid auto-rows-[minmax(320px,auto)] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFlipped={flippedCards.has(recipe.id)}
              onToggleFlip={() => handleToggleFlip(recipe.id)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="inline-flex items-center gap-2 text-sm text-gray-500">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
            Haz click en cualquier tarjeta para ver los ingredientes y pasos
          </p>
        </div>
      </div>
    </section>
  );
}
