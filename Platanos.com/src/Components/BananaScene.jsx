// BananaScene.jsx
import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

// Los dos extremos del recorrido de cámara
const TOP_DOWN = new THREE.Vector3(0, 10, 1.5); // arriba, ligeramente inclinada
const FRONTAL = new THREE.Vector3(0, 0, 2);    // vista normal, de frente

function CameraRig({ progressRef }) {
  const tempTarget = useRef(new THREE.Vector3());

  useFrame(({ camera }) => {
    const t = progressRef.current; // 0 = top-down, 1 = frontal
    tempTarget.current.lerpVectors(TOP_DOWN, FRONTAL, t);
    camera.position.lerp(tempTarget.current, 0.06); // suaviza el movimiento
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function BananaModel() {
  const { scene } = useGLTF("/models/banana.glb");
  return (
    <Center>
      <primitive object={scene} scale={2.2} />
    </Center>
  );
}

useGLTF.preload("/models/banana.glb");

export default function BananaScene() {
  const sectionRef = useRef(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 = la sección apenas entra por abajo del viewport
      // 1 = ya scrolleaste toda la sección (salió por arriba)
      const raw = (vh - rect.top) / (rect.height + vh);
      progressRef.current = Math.max(0, Math.min(1, raw));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[200vh] bg-white"
    >
      <div className="sticky top-0 h-screen w-full">
        <Canvas
          camera={{ position: [0, 6, 1.5], fov: 35 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 3, 5]} intensity={1.2} />
          <Environment preset="apartment" />
          <BananaModel />
          <CameraRig progressRef={progressRef} />
        </Canvas>
      </div>
    </section>
  );
}