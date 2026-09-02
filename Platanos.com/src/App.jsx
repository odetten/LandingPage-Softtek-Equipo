import BananaScene from "./BananaScene";
import useFadeOnScroll from "./useFadeOnScroll";

function App() {
  // Fade rápido: con solo 200px de scroll ya desapareció por completo
const fadeRef1 = useFadeOnScroll({ fadeDistance: 200 });

// Fade lento: necesitas scrollear 1.5 pantallas completas para que desaparezca
const fadeRef2 = useFadeOnScroll({ fadeDistance: window.innerHeight * 0.5 });

  return (
    <main className="min-h-screen bg-[#fffff] text-[#222]">

      <section
        id="inicio"
        className="flex min-h-screen items-center justify-center px-[8%] text-center"
      >
        <div ref={fadeRef1}>
          <h1 className="text-6xl font-black text-[#ecec00] md:text-8xl lg:text-[100px]">
            No es solo una
          </h1>
          <h1 className="text-6xl font-black text-[#00000] md:text-8xl lg:text-[100px]">
            fruta
          </h1>
        </div>
      </section>

      <section
        id="arte"
        className="flex min-h-250 items-center justify-center px-[8%] text-center"
      >
        <div ref={fadeRef2}>
          <h1 className="text-6xl font-black text-[#00000] md:text-8xl lg:text-[100px]">
            También es
          </h1>
          <h1 className="text-6xl font-black text-[#ecec00] md:text-8xl lg:text-[100px]">
            una obra de arte
          </h1>
        </div>
      </section>

      <section id="modelo-3d" className="relative">
        <div className="pointer-events-none absolute top-16 left-1/2 z-10 w-full -translate-x-1/2 px-[8%] text-center">
          <h2 className="text-4xl font-black text-[#00000] md:text-6xl">
            'Comedian' by Maurizio Cattelan 2019
          </h2>
        </div>

        <BananaScene />
      </section>

    </main>
  );
}

export default App;