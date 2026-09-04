import React, { useState } from 'react';
import luisImg from '../assets/Luis.png';
import yahirImg from '../assets/Yahir.png';
import ernestoImg from '../assets/Ernesto.png';
import brandonImg from '../assets/Brandon.png';

const contactOptions = [
  {
    id: 'luis',
    label: 'Luis',
    nombre: 'Luis',
    rol: 'Desarrollador / Frontend',
    carrera: 'Ing. en Tecnología de Software',
    universidad: 'FIME - UANL',
    matricula: '1234567',
    color: '#FFE135',
    bgGlow: 'rgba(255, 225, 53, 0.25)',
    imagenUrl: luisImg,
    info: {
      titulo: 'Rol o Título en el Proyecto',
      descripcion: 'Breve descripción del trabajo que realizó Luis en la página web.',
      correo: 'luis@ejemplo.com',
      github: 'github.com/usuario',
      linkedin: 'linkedin.com/in/usuario',
      instagram: '@usuario',
    }
  },
  {
    id: 'yahir',
    label: 'Yahir',
    nombre: 'Yahir',
    rol: 'Diseñador UI/UX & Backend',
    carrera: 'Ing. en Tecnología de Software',
    universidad: 'FIME - UANL',
    matricula: '1234567',
    color: '#FB923C',
    bgGlow: 'rgba(251, 146, 60, 0.25)',
    imagenUrl: yahirImg,
    info: {
      titulo: 'Rol o Título en el Proyecto',
      descripcion: 'Breve descripción del trabajo realizado por Yahir.',
      correo: 'yahir@ejemplo.com',
      github: 'github.com/usuario',
      linkedin: 'linkedin.com/in/usuario',
      instagram: '@usuario',
    }
  },
  {
    id: 'ernesto',
    label: 'Ernesto',
    nombre: 'Ernesto',
    rol: 'Desarrollador Full Stack',
    carrera: 'Ing. en Tecnología de Software',
    universidad: 'FIME - UANL',
    matricula: '1234567',
    color: '#38BDF8',
    bgGlow: 'rgba(56, 189, 248, 0.25)',
    imagenUrl: ernestoImg,
    info: {
      titulo: 'Rol o Título en el Proyecto',
      descripcion: 'Breve descripción del trabajo realizado por Ernesto.',
      correo: 'ernesto@ejemplo.com',
      github: 'github.com/usuario',
      linkedin: 'linkedin.com/in/usuario',
      instagram: '@usuario',
    }
  },
  {
    id: 'brandon',
    label: 'Brandon',
    nombre: 'Brandon',
    rol: 'Investigación & Documentación',
    carrera: 'Ing. en Tecnología de Software',
    universidad: 'FIME - UANL',
    matricula: '1234567',
    color: '#4ADE80',
    bgGlow: 'rgba(74, 222, 128, 0.25)',
    imagenUrl: brandonImg,
    info: {
      titulo: 'Rol o Título en el Proyecto',
      descripcion: 'Breve descripción del trabajo realizado por Brandon.',
      correo: 'brandon@ejemplo.com',
      github: 'github.com/usuario',
      linkedin: 'linkedin.com/in/usuario',
      instagram: '@usuario',
    }
  },
];

export default function ContactSection() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section 
      id="contacto" 
      className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-between py-12 px-4 relative overflow-hidden"
    >
      {/* Encabezado */}
      <div className="text-center z-10 mb-4">
        <span className="text-xs font-mono tracking-[0.3em] text-white/40 uppercase block mb-2">
          
        </span>
        <h2 className="text-4xl sm:text-6xl font-black tracking-tight">
          Contactanos
        </h2>
      </div>

      {/* Contenedor en fila para los 4 integrantes */}
      <div className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 items-end justify-items-center z-10 my-auto">
        {contactOptions.map((item) => {
          const isHovered = hoveredId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedCard(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative group p-2 rounded-3xl flex flex-col items-center justify-center transition-all duration-300 transform hover:-translate-y-3 active:scale-95 cursor-pointer outline-none w-full"
            >
              {/* Resplandor de fondo */}
              <div
                className="absolute inset-0 rounded-full blur-3xl transition-opacity duration-300 -z-10"
                style={{
                  backgroundColor: item.color,
                  opacity: isHovered ? 0.35 : 0,
                }}
              />

              {/* Imagen del avatar */}
              <div 
                className="transition-all duration-300 flex items-center justify-center"
                style={{
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  filter: isHovered ? `drop-shadow(0 15px 25px ${item.color}80)` : 'none'
                }}
              >
                <img 
                  src={item.imagenUrl} 
                  alt={item.nombre} 
                  className="h-48 sm:h-64 md:h-80 w-auto object-contain select-none"
                />
              </div>

              {/* Nombre debajo de la imagen */}
              <span 
                className="mt-2 text-lg sm:text-xl font-bold tracking-wide transition-colors duration-200"
                style={{ color: isHovered ? item.color : '#FFFFFF' }}
              >
                {item.nombre}
              </span>
            </button>
          );
        })}
      </div>

      {/* Nombres del equipo en la parte inferior */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-sm font-mono text-white/60 z-10 mt-6">
        {contactOptions.map((item, index) => (
          <React.Fragment key={item.id}>
            <button
              type="button"
              onClick={() => setSelectedCard(item)}
              className="hover:text-white transition-colors duration-200 cursor-pointer font-medium"
            >
              {item.nombre}
            </button>
            {index < contactOptions.length - 1 && (
              <span className="text-white/20">•</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Modal con los detalles al hacer clic */}
      {selectedCard && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setSelectedCard(null)}
        >
          <div 
            className="relative bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full flex flex-col items-center text-center shadow-2xl transition-transform duration-300 scale-100 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedCard(null)}
              className="absolute top-4 right-4 text-white/50 hover:text-white text-xl font-bold p-2"
            >
              ✕
            </button>

            <div className="mb-2">
              <img 
                src={selectedCard.imagenUrl} 
                alt={selectedCard.nombre} 
                className="h-44 w-auto object-contain drop-shadow-2xl select-none"
              />
            </div>

            <span 
              className="text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2"
              style={{
                color: selectedCard.color,
                backgroundColor: `${selectedCard.color}20`,
                borderColor: `${selectedCard.color}40`,
              }}
            >
              {selectedCard.rol}
            </span>

            <h3 className="text-2xl sm:text-3xl font-black mb-1">
              {selectedCard.nombre}
            </h3>

            <p className="text-xs font-semibold text-white/60 mb-2">
              {selectedCard.carrera} • {selectedCard.universidad}
            </p>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
              {selectedCard.info.descripcion}
            </p>

            <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col gap-2 text-xs font-mono">
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-white/40">Matrícula:</span>
                <span className="text-white">{selectedCard.matricula}</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-white/40">Correo:</span>
                <a href={`mailto:${selectedCard.info.correo}`} className="text-white hover:underline">
                  {selectedCard.info.correo}
                </a>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-white/40">GitHub:</span>
                <a href={`https://${selectedCard.info.github}`} target="_blank" rel="noreferrer" className="text-white hover:underline">
                  {selectedCard.info.github}
                </a>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-1">
                <span className="text-white/40">LinkedIn:</span>
                <a href={`https://${selectedCard.info.linkedin}`} target="_blank" rel="noreferrer" className="text-white hover:underline">
                  {selectedCard.info.linkedin}
                </a>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/40">Instagram:</span>
                <span style={{ color: selectedCard.color }}>
                  {selectedCard.info.instagram}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}