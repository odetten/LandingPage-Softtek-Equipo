import { lazy, Suspense } from "react";
import Header from "./components/Header";
import HeroBenefits from "./components/HeroBenefits";
import BananaTypes from "./components/BananaTypes";
import BananasCarousel from "./components/BananasCarousel";
import Footer from "./components/Footer";
import ComedianSection from "./components/ComedianSection";
import useScrollReveal from "./hooks/useScrollReveal";
import ContactSection from './components/ContactSection';
import BananaCursor from './components/BananaCursor';

const BananaComparisons = lazy(() => import("./components/BananaComparisons"));

function App() {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef}>
      <BananaCursor />
      <Header />
      <main>
        <HeroBenefits />
        <BananasCarousel />
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
