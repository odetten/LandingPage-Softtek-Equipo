import { lazy, Suspense } from "react";
import BananaCursor from "./components/BananaCursor";
import BananaTypes from "./components/BananaTypes";
import BananasCarousel from "./components/BananasCarousel";
import Beneficios from "./components/Beneficios";
import ComedianSection from "./components/ComedianSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Recetas from "./components/Recetas";
import useScrollReveal from "./hooks/useScrollReveal";

const BananaComparisons = lazy(() => import("./components/BananaComparisons"));

function App() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      <BananaCursor />
      <Header />
      <main>
        <Hero />
        <Beneficios />
        <BananasCarousel />
        <BananaTypes />
        <Recetas />
        <ComedianSection />
        <section id="interactivo" aria-label="Comparador de alturas en plátanos">
          <Suspense fallback={<p className="p-8 text-center" role="status">Cargando comparador…</p>}>
            <BananaComparisons />
          </Suspense>
        </section>
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
