import { Component, lazy, Suspense, useRef } from "react";
import useFadeOnScroll from "../hooks/useFadeOnScroll";
import artwork from "../assets/ArteBanana.jpg";

const BananaScene = lazy(() => import("./BananaScene"));

function ArtworkPreview() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[var(--color-surface)]">
      <img src={artwork} alt="Comedian, de Maurizio Cattelan" width="1200" height="630" className="max-h-[75vh] w-[80%] object-contain" />
    </div>
  );
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function ComedianSection() {
  const sceneSectionRef = useRef(null);
  const fadeRef1 = useFadeOnScroll({ fadeDistance: 400 });
  const fadeRef2 = useFadeOnScroll({ fadeDistance: 200 });

  return (
    <>
      <section id="arte" className="art-statement flex min-h-screen items-center justify-center text-center">
        <div ref={fadeRef1}>
          <h2 className="art-statement__title art-statement__title--accent">
            No es solo una <span className="block">fruta</span>
          </h2>
        </div>
      </section>

      <section className="art-statement flex min-h-screen items-center justify-center text-center">
        <div ref={fadeRef2}>
          <h2 className="art-statement__title">
            También es <span className="block text-[var(--banana-yellow)]">una obra de arte</span>
          </h2>
        </div>
      </section>

      <section ref={sceneSectionRef} id="modelo-3d" className="relative h-[200vh] bg-[var(--color-surface)]" aria-label="Comedian, de Maurizio Cattelan">
        <div className="sticky top-0 h-screen w-full">
          <ArtworkPreview />
          <SceneBoundary>
            <Suspense fallback={null}>
              <BananaScene sectionRef={sceneSectionRef} />
            </Suspense>
          </SceneBoundary>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="artwork-label flex justify-center text-center">
            <h2>[Comedian]</h2>
            <p>por Maurizio Cattelan · 2019</p>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 z-10 w-full px-6 text-center">
          <p className="artwork-sale">Vendido por 6,24 millones de dólares en 2024.</p>
        </div>
      </section>
    </>
  );
}
