import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Clock, X } from 'lucide-react';
import { recipes } from '../data/recipes';
import '../styles/recipes.css';

function RecipeModal({ recipe, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    const opener = document.activeElement;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (opener?.isConnected) opener.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="recipes-dialog"
      aria-labelledby="recipe-dialog-title"
      onCancel={onClose}
      onClose={onClose}
      onKeyDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="recipes-dialog__content">
        <button type="button" className="recipes-dialog__close" aria-label="Cerrar receta" onClick={onClose} autoFocus>
          <X aria-hidden="true" size={22} />
        </button>
        <img className="recipes-dialog__image" src={recipe.image} alt={recipe.title} decoding="async" />
        <div className="recipes-dialog__body">
          <div className="recipes-meta"><span><Clock aria-hidden="true" size={18} />{recipe.time}</span><span>{recipe.difficulty}</span></div>
          <h2 id="recipe-dialog-title">{recipe.title}</h2>
          <p>{recipe.description}</p>
          <h3>Ingredientes</h3>
          <ul className="recipes-ingredients">
            {recipe.ingredients.map((ingredient) => <li key={ingredient.name}>{ingredient.name}</li>)}
          </ul>
          <h3>Preparación</h3>
          <ol className="recipes-steps">
            {recipe.steps.map((step) => <li key={step}>{step}</li>)}
          </ol>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}

function RecipeCard({ recipe, isFlipped, onToggle, onOpen }) {
  const frontRef = useRef(null);
  const backRef = useRef(null);

  const flip = (nextFlipped) => {
    onToggle();
    // Move focus to the visible face after React updates its inert state.
    requestAnimationFrame(() => {
      (nextFlipped ? backRef : frontRef).current?.focus({ preventScroll: true });
    });
  };

  return (
    <article className="recipes-card" data-recipe={recipe.id} aria-label={recipe.title}>
      <div className={`recipes-card__turn${isFlipped ? ' is-flipped' : ''}`}>
        <div className="recipes-card__face recipes-card__front" inert={isFlipped} aria-hidden={isFlipped}>
          <img src={recipe.image} alt="" loading="lazy" decoding="async" />
          <button ref={frontRef} type="button" onClick={() => flip(true)} aria-label={`Ver ingredientes de ${recipe.title}`}>
            <span className="recipes-card__title">{recipe.title}</span>
            <span className="recipes-card__hint">Ver ingredientes</span>
          </button>
        </div>
        <div className="recipes-card__face recipes-card__back" inert={!isFlipped} aria-hidden={!isFlipped}>
          <button ref={backRef} type="button" className="recipes-card__return" onClick={() => flip(false)} aria-label={`Volver a la imagen de ${recipe.title}`}>Volver</button>
          <h3>{recipe.title}</h3>
          <ul className="recipes-ingredients">
            {recipe.ingredients.map((ingredient) => <li key={ingredient.name}>{ingredient.name}</li>)}
          </ul>
          <button type="button" className="recipes-card__open" onClick={() => onOpen(recipe)}>Ver receta</button>
        </div>
      </div>
    </article>
  );
}

export default function Recetas() {
  const [flippedId, setFlippedId] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  return (
    <section id="recetas" className="recipes-section" aria-labelledby="recipes-title">
      <div className="recipes-section__inner">
        <header className="recipes-section__heading" data-reveal="rise">
          <h2 id="recipes-title">Recetas<span> con plátano.</span></h2>
        </header>
        <div className="recipes-grid" data-reveal="rise" data-reveal-delay="120">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFlipped={flippedId === recipe.id}
              onToggle={() => setFlippedId((current) => current === recipe.id ? null : recipe.id)}
              onOpen={setSelectedRecipe}
            />
          ))}
        </div>
      </div>
      {selectedRecipe && <RecipeModal recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
    </section>
  );
}
