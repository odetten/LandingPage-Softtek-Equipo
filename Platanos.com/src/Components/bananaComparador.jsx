import { useState, useMemo } from "react";
import { comparisons } from "../data/comparacionbananas.js";

function BananaComparisons() {
  const [selected, setSelected] = useState(comparisons[0]);
  const [filterCategory, setFilterCategory] = useState("todos"); // "todos" | "mundo" | "mexico"

  const filtered = useMemo(() => {
    if (filterCategory === "todos") return comparisons;
    return comparisons.filter((i) => i.category === filterCategory);
  }, [filterCategory]);

  return (
    <section className="min-h-screen bg-[#f9d5e5] px-[8%] py-24">
      <h2 className="mb-8 text-center text-4xl font-black">
        ¿Qué tan grande es un plátano?
      </h2>

      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex justify-center gap-2">
          {["todos", "mundo", "mexico"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-4 py-1 text-xs font-bold uppercase ${
                filterCategory === cat ? "bg-[#222] text-white" : "bg-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid max-h-96 grid-cols-2 gap-2 overflow-y-auto border border-black/10 p-2 md:grid-cols-3">
          {filtered.map((item) => (
            <button
              key={item.name}
              onClick={() => setSelected(item)}
              className={`px-3 py-3 text-left text-sm font-bold transition ${
                selected?.name === item.name
                  ? "bg-[#ecec00] text-black"
                  : "bg-white/60 hover:bg-white/80"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {selected && <BananaResult item={selected} />}
    </section>
  );
}

function BananaResult({ item }) {
  const bananas = Math.round((item.heightM * 100) / 18);
  return (
    <div className="mx-auto mt-10 max-w-md bg-white/60 p-8 text-center shadow-sm backdrop-blur-sm">
      <h3 className="text-xl font-bold text-[#222]">{item.name}</h3>
      <p className="mt-2 text-4xl font-black text-[#ecec00]">
        {bananas.toLocaleString()}
      </p>
      <p className="text-xs font-bold uppercase tracking-widest text-[#999]">
        plátanos
      </p>
      <p className="mt-3 text-sm text-[#555]">{item.heightM} metros de altura</p>
    </div>
  );
}

export default BananaComparisons;