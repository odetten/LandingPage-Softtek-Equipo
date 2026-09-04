import { useEffect, useState } from "react";
import bananaImg from "../assets/platano.png"; 

function BananaCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const moverMouse = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener("mousemove", moverMouse);

    return () => {
      window.removeEventListener("mousemove", moverMouse);
    };
  }, []);

  return (
    <img
      src={bananaImg}
      alt="banana cursor"
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '36px',
        height: '36px',
        pointerEvents: 'none', // Permite interactuar con los botones que estén debajo
        zIndex: 9999
      }}
    />
  );
}

export default BananaCursor;