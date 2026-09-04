import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, MotionConfig, useMotionValue, useReducedMotion, animate } from "framer-motion";
import { comparisons } from "../data/comparacionbananas.js";

// ---------- Título curveado ----------
function CurvedTitle({ text }) {
  return (
    <svg
      viewBox="0 0 800 100"
      className="mx-auto mb-6 h-auto w-full max-w-3xl overflow-visible"
    >
      <path id="curve" d="M 30 80 Q 400 10 770 80" fill="none" />
      <text
        className="fill-[#fafafa] text-3xl font-black md:text-5xl"
        textAnchor="middle"
      >
        <textPath href="#curve" startOffset="50%">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

// ---------- Número animado ----------
function AnimatedNumber({ value }) {
  const reducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (reducedMotion) return undefined;
    const unsubscribe = count.on("change", (v) =>
      setDisplay(Math.round(v).toLocaleString())
    );
    const controls = animate(count, value, { duration: 0.8, ease: "easeOut" });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [value, count, reducedMotion]);

  return <p className="text-4xl font-black leading-none text-black">{reducedMotion ? value.toLocaleString() : display}</p>;
}

// ---------- Sección principal ----------
function BananaComparisons() {
  const [selected, setSelected] = useState(comparisons[0]);
  const [filterCategory, setFilterCategory] = useState("todos");

  const filtered = useMemo(() => {
    if (filterCategory === "todos") return comparisons;
    return comparisons.filter((i) => i.category === filterCategory);
  }, [filterCategory]);

  const changeCategory = (category) => {
    setFilterCategory(category);
    setSelected((current) => {
      if (category === "todos" || current?.category === category) return current;
      return comparisons.find((item) => item.category === category) ?? null;
    });
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <MotionConfig reducedMotion="user">
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#1f1e20] px-[8%] py-24"
    >
      <CurvedTitle text="¿Qué tan grande es un plátano?" />

      <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-2">
        {/* Columna izquierda: filtro + lista */}
        <div>
          <div className="mb-4 flex gap-1 text-xs font-semibold uppercase tracking-wide text-white/50">
            {["todos", "mundo", "mexico"].map((cat) => (
              <button
                key={cat}
                onClick={() => changeCategory(cat)}
                aria-pressed={filterCategory === cat}
                className={`rounded-[25px] px-3 py-1 transition-colors ${
                  filterCategory === cat
                    ? "bg-[#fbd43e] text-black"
                    : "hover:text-white"
                }`}
              >
                {cat === "todos" ? "Todos" : cat === "mundo" ? "Mundo" : "México"}
              </button>
            ))}
          </div>

          <div className="relative">
  <motion.div
    key={filterCategory}
    variants={listVariants}
    initial="hidden"
    animate="visible"
    className="max-h-[368px] space-y-3 overflow-y-auto p-1 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
  >
    {filtered.map((item) => {
      const isSelected = selected?.name === item.name;
      return (
        <motion.button
          key={item.name}
          variants={itemVariants}
          onClick={() => setSelected(item)}
          aria-pressed={isSelected}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="relative block w-full overflow-hidden rounded-[25px] px-5 py-4 text-left text-sm font-semibold shadow-sm"
        >
          {isSelected && (
            <motion.div
              layoutId="selected-pill"
              className="absolute inset-0 bg-[#fbd43e]"
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
            />
          )}
          <span className={`relative z-10 ${isSelected ? "text-black" : "text-white/80"}`}>
            {item.name}
          </span>
        </motion.button>
      );
    })}
  </motion.div>

  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-b from-[#1f1e20]/0 to-[#1f1e20]" />
</div>
        </div>

        {/* Columna derecha: imagen + resultado */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.name}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              <BananaResult item={selected} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
    </MotionConfig>
  );
}

// ---------- Card de resultado ----------
function BananaResult({ item }) {
  const bananas = Math.round((item.heightM * 100) / 18);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-6 flex aspect-square w-full max-w-[280px] items-center justify-center rounded-[25px] bg-white/10 shadow-md">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full rounded-2xl object-cover"
          />
        ) : (
          <span className="px-6 text-xs font-semibold text-white/40">
            Imagen próximamente
          </span>
        )}
      </div>

      <h3 className="mb-4 text-lg font-black text-white">{item.name}</h3>

      <div className="flex w-full max-w-[320px] items-stretch rounded-[25px] bg-[#fbd43e]">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-5">
          <AnimatedNumber value={bananas} />
          <p className="mt-2 text-xs font-medium text-black/70">
            plátanos de altura
          </p>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center px-4 py-5">
          <p className="text-4xl font-black leading-none text-black">
            {item.heightM}
          </p>
          <p className="mt-2 text-xs font-medium text-black/70">
            metros de altura
          </p>
        </div>
      </div>
    </div>
  );
}

export default BananaComparisons;
