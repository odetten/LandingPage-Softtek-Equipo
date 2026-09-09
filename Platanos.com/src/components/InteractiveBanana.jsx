import React, { useState, useEffect, useRef } from "react";

export default function YellowBananaTracker() {
  const leftEyeRef = useRef(null);
  const rightEyeRef = useRef(null);

  const [leftPupil, setLeftPupil] = useState({ x: 0, y: 0 });
  const [rightPupil, setRightPupil] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const getPupilOffset = (eyeRef) => {
        if (!eyeRef.current) return { x: 0, y: 0 };

        const rect = eyeRef.current.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;

        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.hypot(deltaX, deltaY);

        // Límite de desplazamiento de la pupila
        const maxRadius = 7;
        const pupilDistance = Math.min(distance, maxRadius);

        return {
          x: Math.cos(angle) * pupilDistance,
          y: Math.sin(angle) * pupilDistance,
        };
      };

      setLeftPupil(getPupilOffset(leftEyeRef));
      setRightPupil(getPupilOffset(rightEyeRef));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full h-[550px] bg-[#F7F7F2] flex flex-col items-center justify-center relative overflow-hidden select-none">
      {/* Ilustración SVG Adaptada a la Paleta */}
      <svg
        viewBox="0 0 350 350"
        className="w-80 h-80 drop-shadow-[0_12px_20px_rgba(0,0,0,0.08)] z-10"
      >
        {/* Tallo Superior */}
        <path
          d="M 210 65 L 216 42 C 218 36 208 32 204 38 L 200 62 Z"
          fill="#412E08"
          stroke="#000"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Cuerpo del Plátano (Amarillo Lima / Verde Lima de tu web) */}
        <path
          d="M 210 65 C 180 100 100 170 120 250 C 160 255 240 210 220 68 Z"
          fill="#D9F923"
        />
        <path
          d="M 210 65 C 190 90 125 155 120 250 C 70 190 150 90 210 65 Z"
          fill="#E2F952"
        />

        {/* Trazo Exterior Negro Estilo Web */}
        <path
          d="M 210 65 C 180 100 100 170 120 250 C 160 255 240 210 220 68 Z"
          fill="none"
          stroke="#000"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Punta Inferior */}
        <path
          d="M 112 242 C 110 254 118 260 125 252 Z"
          fill="#412E08"
          stroke="#000"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Cejas */}
        <path
          d="M 165 115 Q 178 108 188 116"
          fill="none"
          stroke="#000"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M 195 125 Q 208 118 218 127"
          fill="none"
          stroke="#000"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Ojo Izquierdo (Cuenca) */}
        <g transform="translate(178, 142)">
          <ellipse
            ref={leftEyeRef}
            cx="0"
            cy="0"
            rx="16"
            ry="20"
            fill="#FFF"
            stroke="#000"
            strokeWidth="4.5"
          />
          <circle
            cx={leftPupil.x}
            cy={leftPupil.y}
            r="7.5"
            fill="#000"
          />
          <circle
            cx={leftPupil.x - 2.5}
            cy={leftPupil.y - 2.5}
            r="2.5"
            fill="#FFF"
          />
        </g>

        {/* Ojo Derecho (Cuenca) */}
        <g transform="translate(208, 155)">
          <ellipse
            ref={rightEyeRef}
            cx="0"
            cy="0"
            rx="16"
            ry="20"
            fill="#FFF"
            stroke="#000"
            strokeWidth="4.5"
          />
          <circle
            cx={rightPupil.x}
            cy={rightPupil.y}
            r="7.5"
            fill="#000"
          />
          <circle
            cx={rightPupil.x - 2.5}
            cy={rightPupil.y - 2.5}
            r="2.5"
            fill="#FFF"
          />
        </g>

        {/* Boca */}
        <path
          d="M 180 180 Q 192 195 204 182"
          fill="#000"
          stroke="#000"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 186 186 Q 192 192 198 187"
          fill="#FF5555"
        />
      </svg>

      <p className="mt-6 font-mono text-xs text-black/60 tracking-widest uppercase z-10 font-bold">
        Mueve el cursor para interactuar
      </p>
    </div>
  );
}