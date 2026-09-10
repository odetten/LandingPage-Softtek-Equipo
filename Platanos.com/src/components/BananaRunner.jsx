import { useEffect, useRef, useState, useCallback } from 'react';
import platanoImg from '../assets/platano.png';
import licuadoraImg from '../assets/licuadora.png';

const GAME_WIDTH = 400;
const GAME_HEIGHT = 160;
const GROUND_Y = 120;
const CHAR_SIZE = 40;
const CHAR_LEFT = 24;
const OBS_WIDTH = 30;
const OBS_HEIGHT = 40;
const GRAVITY = 0.85;
const JUMP_VELOCITY = -13.5;

// Rango aleatorio de separación entre licuadoras (en frames)
const SPAWN_MIN_FRAMES = 20;
const SPAWN_MAX_FRAMES = 130;

function getRandomSpawnFrames() {
  return Math.floor(SPAWN_MIN_FRAMES + Math.random() * (SPAWN_MAX_FRAMES - SPAWN_MIN_FRAMES));
}

export default function BananaRunner() {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'playing' | 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Render states
  const [charY, setCharY] = useState(0);
  const [obstacles, setObstacles] = useState([]);

  // Variables mutables para el bucle de 60fps sin retrasos de estado
  const charYRef = useRef(0);
  const velocityRef = useRef(0);
  const obstaclesRef = useRef([]);
  const speedRef = useRef(4.5);
  const frameRef = useRef(0);
  const nextSpawnFrameRef = useRef(getRandomSpawnFrames());
  const scoreRef = useRef(0);
  const rafRef = useRef(null);
  const isDeadRef = useRef(false);

  const stopLoop = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const startGame = useCallback(() => {
    stopLoop();
    isDeadRef.current = false;
    charYRef.current = 0;
    velocityRef.current = 0;
    obstaclesRef.current = [];
    speedRef.current = 4.5;
    frameRef.current = 0;
    scoreRef.current = 0;
    nextSpawnFrameRef.current = getRandomSpawnFrames();

    setCharY(0);
    setObstacles([]);
    setScore(0);
    setGameState('playing');
  }, []);

  const jump = useCallback(() => {
    if (charYRef.current === 0) {
      velocityRef.current = JUMP_VELOCITY;
    }
  }, []);

  // Control de teclado
  useEffect(() => {
    function onKeyDown(e) {
      if (e.code === 'ArrowUp') {
        e.preventDefault();
        if (gameState === 'idle') {
          startGame();
        } else if (gameState === 'playing') {
          jump();
        }
      } else if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'gameover') {
          startGame();
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [gameState, jump, startGame]);

  // Bucle principal (física, spawn aleatorio y colisiones en un solo paso)
  useEffect(() => {
    if (gameState !== 'playing') return;

    function loop() {
      frameRef.current += 1;

      // 1. Física del salto
      velocityRef.current += GRAVITY;
      charYRef.current += velocityRef.current;
      if (charYRef.current > 0) {
        charYRef.current = 0;
        velocityRef.current = 0;
      }
      setCharY(charYRef.current);

      // 2. Aceleración progresiva
      if (frameRef.current % 400 === 0 && speedRef.current < 9) {
        speedRef.current += 0.4;
      }

      // 3. Generación aleatoria de licuadoras
      if (frameRef.current >= nextSpawnFrameRef.current) {
        obstaclesRef.current.push({
          x: GAME_WIDTH,
          id: performance.now() + Math.random(),
        });
        nextSpawnFrameRef.current = frameRef.current + getRandomSpawnFrames();
      }

      // 4. Movimiento de obstáculos
      obstaclesRef.current = obstaclesRef.current
        .map((obs) => ({ ...obs, x: obs.x - speedRef.current }))
        .filter((obs) => obs.x > -OBS_WIDTH);

      // 5. Comprobación instantánea de colisiones
      const pLeft = CHAR_LEFT + 7;
      const pRight = CHAR_LEFT + CHAR_SIZE - 7;
      const pTop = GROUND_Y - CHAR_SIZE + charYRef.current + 5;
      const pBottom = GROUND_Y + charYRef.current;

      for (const obs of obstaclesRef.current) {
        const obsLeft = obs.x + 6;
        const obsRight = obs.x + OBS_WIDTH - 6;
        const obsTop = GROUND_Y - OBS_HEIGHT + 4;
        const obsBottom = GROUND_Y;

        const crashHorizontal = pRight > obsLeft && pLeft < obsRight;
        const crashVertical = pBottom > obsTop && pTop < obsBottom;

        if (crashHorizontal && crashVertical) {
          isDeadRef.current = true;
          setObstacles([...obstaclesRef.current]);
          setGameState('gameover');
          setHighScore((prev) => Math.max(prev, Math.floor(scoreRef.current / 5)));
          return; // Detiene el loop inmediatamente
        }
      }

      // Actualizar vista de obstáculos y score
      setObstacles([...obstaclesRef.current]);
      scoreRef.current += 1;
      if (frameRef.current % 5 === 0) {
        setScore(Math.floor(scoreRef.current / 5));
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [gameState]);

  return (
    <div className="">Antes de irte, prueba no ser licuado en nuestro minijuego.
      <h3 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl">
        Banana-runner
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">
        <span className="text-[#E3F237]">↑</span> para saltar las licuadoras ·{' '}
        <span className="text-[#E3F237]">espacio</span> para reintentar
      </p>

      <div
        className="relative mt-6 w-full max-w-md select-none overflow-hidden rounded-lg border border-white/10 bg-white/5"
        style={{ height: GAME_HEIGHT }}
        role="img"
        aria-label="Área de juego: plátano corredor"
      >
        {/* Línea del suelo */}
        <div
          className="absolute left-0 right-0 border-t border-dashed border-white/20"
          style={{ top: GROUND_Y }}
        />

        {/* Plátano */}
        <img
          src={platanoImg}
          alt="Plátano"
          className="pointer-events-none absolute"
          style={{
            left: CHAR_LEFT,
            top: GROUND_Y - CHAR_SIZE + charY,
            width: CHAR_SIZE,
            height: CHAR_SIZE,
          }}
        />

        {/* Licuadoras (obstáculos aleatorios) */}
        {obstacles.map((o) => (
          <img
            key={o.id}
            src={licuadoraImg}
            alt="Licuadora"
            className="pointer-events-none absolute"
            style={{
              left: o.x,
              top: GROUND_Y - OBS_HEIGHT,
              width: OBS_WIDTH,
              height: OBS_HEIGHT,
            }}
          />
        ))}

        {/* Marcador */}
        <div className="absolute right-3 top-3 text-xs font-bold uppercase tracking-widest text-white/70">
          {score} pts{highScore > 0 ? ` · mejor: ${highScore}` : ''}
        </div>

        {/* Pantalla inicial */}
        {gameState === 'idle' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#E3F237]">
              Presiona ↑ para empezar
            </p>
          </div>
        )}

        {/* Pantalla Game Over */}
        {gameState === 'gameover' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/75 text-center">
            <p className="text-2xl font-black uppercase tracking-wider text-red-500">
              Te licuaron
            </p>
            <p className="text-xs font-medium text-white/70">
              Puntaje obtenido: <span className="text-white font-bold">{score}</span>
            </p>
            <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#E3F237]">
              Presiona espacio para reintentar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}