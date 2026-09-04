import Header from "./components/Header";
import Hero from "./components/Hero";
import BananaTypes from "./components/BananaTypes";
import useScrollReveal from "./hooks/useScrollReveal";

function App() {
  const revealRef = useScrollReveal();
  return (
    <div ref={revealRef}>
      <Header />
      <Hero />
      <BananaTypes />
    </div>
  );
}

export default App;
