import Hero from "./Hero";
import Beneficios from "./Beneficios";
import useBananaJourney from "../hooks/useBananaJourney";

export default function HeroBenefits() {
  const journeyRef = useBananaJourney();

  return (
    <div className="banana-journey" ref={journeyRef}>
      <Hero />
      <Beneficios />
    </div>
  );
}
