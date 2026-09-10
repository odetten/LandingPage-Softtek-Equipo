import { Component, lazy, Suspense, useRef } from "react";
import useFadeOnScroll from "../hooks/useFadeOnScroll";
import artwork from "../assets/ArteBanana.jpg";

const BananaScene = lazy(() => import("./BananaScene"));

function ArtworkPreview() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white">
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
      <section id="arte" className="flex min-h-screen items-center justify-center bg-white px-[8%] text-center">
        <div ref={fadeRef1}>
          <h2 className="text-6xl font-black text-[#fbd43e] md:text-8xl lg:text-[100px]">
            No es solo una <span className="block text-[#222]">fruta</span>
          </h2>
        </div>
      </section>

      <section className="flex min-h-screen items-center justify-center bg-white px-[8%] text-center">
        <div ref={fadeRef2}>
          <h2 className="text-6xl font-black text-[#222] md:text-8xl lg:text-[100px]">
            También es <span className="block text-[#fbd43e]">una obra de arte</span>
          </h2>
        </div>
      </section>

      <section ref={sceneSectionRef} id="modelo-3d" className="relative h-[200vh] bg-white" aria-label="Comedian, de Maurizio Cattelan">
        <div className="sticky top-0 h-screen w-full">
          <ArtworkPreview />
          <SceneBoundary>
            <Suspense fallback={null}>
              <BananaScene sectionRef={sceneSectionRef} />
            </Suspense>
          </SceneBoundary>
        </div>
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
          <div className="flex flex-wrap justify-center text-center">
            <h2 className="rounded-l-[25px] bg-black px-4 py-2 text-4xl font-black text-[#fbd43e] md:text-6xl">[Comedian]</h2>
            <p className="rounded-r-[25px] bg-[#fbd43e] px-4 py-2 text-4xl font-black text-black md:text-6xl">por Maurizio Cattelan · 2019</p>
          </div>
        </div>
        <div className="absolute bottom-10 left-0 z-10 w-full px-6 text-center">
          <p className="text-sm font-bold tracking-wide text-black md:text-4xl">Vendido por 6,24 millones de dólares en 2024.</p>
        </div>
      </section>
    </>
  );
}
