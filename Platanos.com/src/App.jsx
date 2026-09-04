import { lazy, Suspense, useEffect, useState } from "react";
import BananasCarousel from "./components/BananasCarousel";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";

const BananaOverlay = lazy(() => import("./components/BananaOverlay"));

function App() {
  const [isBananaModelOpen, setIsBananaModelOpen] = useState(false);

  useEffect(() => {
    if (!isBananaModelOpen) return undefined;

    const closeWithEscape = (event) => {
      if (event.key === "Escape") setIsBananaModelOpen(false);
    };

    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [isBananaModelOpen]);

  return (
    <div>
      <Header
        isModelOpen={isBananaModelOpen}
        onToggleModel={() => setIsBananaModelOpen((isOpen) => !isOpen)}
      />

      <Hero />
      <BananasCarousel />
      <Footer />

      {isBananaModelOpen && (
        <Suspense fallback={null}>
          <BananaOverlay />
        </Suspense>
      )}

    </div>
  )
}

export default App
