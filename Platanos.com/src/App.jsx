import BananaScene from "./Components/BananaScene";
import useFadeOnScroll from "./Components/useFadeOnScroll";
import BananaComparisons from "./Components/bananaComparador";

function App() {
const fadeRef1 = useFadeOnScroll({ fadeDistance: 400 });
const fadeRef2 = useFadeOnScroll({ fadeDistance: 200 });

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
        className="flex min-h-screen items-center justify-center px-[8%] text-center"
      >
        <div ref={fadeRef2}>
          <h1 className="text-6xl font-black text-[#00000] md:text-8xl lg:text-[100px]">
            También es
          </h1>
          <h1 className="text-6xl font-black text-[#ecec00] md:text-8xl lg:text-[100px] flex">
            una obra de arte
          </h1>
        </div>
      </section>


     <section id="modelo-3d" className="relative">
  <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
    <h2 className="font-black text-[#fff438] text-2xl md:text-4xl bg-[#000000] px-4 py-2">
      [Comedian]
    </h2><h2 className="font-black text-[#00000] text-2xl md:text-4xl bg-[#fff438] px-4 py-2 ">por Maurizio Cattelan 2019</h2>
  </div>

  <div className="absolute bottom-10 left-0 z-10 w-full text-center">
    <p className="text-sm font-bold tracking-widest text-black md:text-lg">
      vendido por US$ 6,24 millones
    </p>
  </div>

  <BananaScene />
</section>

<BananaComparisons />


    </main>
  );
}

export default App;