// BananaScene.jsx
import { Suspense, useRef, useEffect, useLayoutEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { applyProps, Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import * as THREE from "three";

// Los dos extremos del recorrido de cámara
const TOP_DOWN = new THREE.Vector3(0, 10, 1.5);
// This asset lies in the XZ plane, so the close-up must keep looking from above.
const CLOSE_UP = new THREE.Vector3(0, 5, 0.8);

function CameraRig({ progressRef, reducedMotion }) {
  const tempTarget = useRef(new THREE.Vector3());
  const initialized = useRef(false);

  useFrame(({ camera, size }) => {
    const portraitScale = Math.max(1, size.height / size.width);
    if (reducedMotion) {
      camera.position.copy(CLOSE_UP).multiplyScalar(portraitScale);
      camera.lookAt(0, 0, 0);
      return;
    }
    const t = progressRef.current;
    tempTarget.current.lerpVectors(TOP_DOWN, CLOSE_UP, t).multiplyScalar(portraitScale);
    if (!initialized.current) {
      camera.position.copy(tempTarget.current);
      initialized.current = true;
    } else {
      camera.position.lerp(tempTarget.current, 0.06); // suaviza el movimiento
    }
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function BananaModel() {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}models/banana.glb`, false, false);
  return (
    <Center>
      <primitive object={scene} scale={2.2} />
    </Center>
  );
}

// Generate the lighting locally; a remote HDR failure must not block the model.
function StudioLighting() {
  const { gl, scene } = useThree();
  useLayoutEffect(() => {
    const room = new RoomEnvironment();
    const generator = new THREE.PMREMGenerator(gl);
    const environment = generator.fromScene(room, 0.04);
    const previous = scene.environment;
    applyProps(scene, { environment: environment.texture });
    room.dispose();
    generator.dispose();
    return () => {
      applyProps(scene, { environment: previous });
      environment.dispose();
    };
  }, [gl, scene]);
  return null;
}

function SceneStatus({ onReady }) {
  const { gl, invalidate } = useThree();
  const ready = useRef(false);
  useFrame(() => {
    if (!ready.current && !gl.getContext().isContextLost()) {
      ready.current = true;
      onReady(true);
    }
  });
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = () => {
      ready.current = false;
      onReady(false);
    };
    const restored = () => invalidate();
    canvas.addEventListener("webglcontextlost", lost);
    canvas.addEventListener("webglcontextrestored", restored);
    return () => {
      canvas.removeEventListener("webglcontextlost", lost);
      canvas.removeEventListener("webglcontextrestored", restored);
    };
  }, [gl, invalidate, onReady]);
  return null;
}

export default function BananaScene({ sectionRef }) {
  const progressRef = useRef(0);
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting));
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [sectionRef]);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Complete the camera movement while the scene is pinned in the viewport.
      const raw = -rect.top / Math.max(1, rect.height - vh);
      progressRef.current = Math.max(0, Math.min(1, raw));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionRef]);

  return (
    <div className="absolute inset-0" style={{ opacity: isReady ? 1 : 0 }} aria-hidden="true">
      <Canvas
        frameloop={isVisible && !reducedMotion ? "always" : "demand"}
        dpr={[1, 1.5]}
        camera={{ position: [0, 10, 1.5], fov: 35 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#ffffff"]} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 3, 5]} intensity={1.2} />
          <StudioLighting />
          <BananaModel />
          <CameraRig progressRef={progressRef} reducedMotion={reducedMotion} />
          <SceneStatus onReady={setIsReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
