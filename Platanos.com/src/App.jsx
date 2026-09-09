import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import BananaTypes from "./components/BananaTypes";
import BananasCarousel from "./components/BananasCarousel";
import Footer from "./components/Footer";
import ComedianSection from "./components/ComedianSection";
import useScrollReveal from "./hooks/useScrollReveal";
import Beneficios from './components/Beneficios';
import ContactSection from './components/ContactSection';
import BananaCursor from './components/BananaCursor';
const BananaComparisons = lazy(() => import("./components/BananaComparisons"));
import BananaPrismHero from "./components/BananaPrismHero";
import BananaNinja from "./components/BananaNinja";
import InteractiveBanana from "./components/InteractiveBanana";

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
        <BananaPrismHero/>
        <BananaTypes />
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
