import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BananaTypes from "./components/BananaTypes";
import ComedianSection from "./components/ComedianSection";
import useScrollReveal from "./hooks/useScrollReveal";

const BananaComparisons = lazy(() => import("./components/BananaComparisons"));

function App() {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef}>
      <Header />
      <main>
        <Hero />
        <BananaTypes />
        <ComedianSection />
        <section id="interactivo" aria-label="Comparador de alturas en plátanos">
          <Suspense fallback={<p className="p-8 text-center" role="status">Cargando comparador…</p>}>
            <BananaComparisons />
          </Suspense>
        </section>
      </main>
    </div>
  );
}

export default App;
