import { Component, Suspense, useEffect } from "react";
import { Bounds, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const BANANA_MODEL_URL = "/models/Banana%20v2.glb";

function BananaAsset() {
    const { scene } = useGLTF(BANANA_MODEL_URL);

    useEffect(() => {
        scene.traverse((object) => {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });
    }, [scene]);

    return <primitive object={scene} />;
}

function LoadingIndicator() {
    return (
        <Html center>
            <span className="whitespace-nowrap text-xs font-semibold tracking-wide text-[#1a1a1a]/55">
                Cargando 3D…
            </span>
        </Html>
    );
}

function StaticBananaFallback() {
    return (
        <img
            src="/img/A.png"
            alt="Plátano amarillo"
            draggable="false"
            className="h-full w-full object-contain"
        />
    );
}

class ModelErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) return <StaticBananaFallback />;
        return this.props.children;
    }
}

function BananaModel({ autoRotate = true }) {
    return (
        <div className="h-full w-full cursor-grab active:cursor-grabbing">
            <ModelErrorBoundary>
                <Canvas
                    aria-label="Modelo 3D interactivo de un plátano"
                    role="img"
                    dpr={[1, 1.75]}
                    camera={{ position: [0, 0, 5], fov: 35 }}
                    gl={{ alpha: true, antialias: true }}
                >
                    <ambientLight intensity={1.8} />
                    <hemisphereLight
                        args={["#fff8d6", "#70551a", 1.25]}
                    />
                    <directionalLight
                        castShadow
                        position={[4, 6, 5]}
                        intensity={3.2}
                    />
                    <directionalLight
                        position={[-4, 1, -3]}
                        intensity={1.1}
                    />

                    <Suspense fallback={<LoadingIndicator />}>
                        <Bounds fit clip observe margin={1.15}>
                            <BananaAsset />
                        </Bounds>
                    </Suspense>

                    <OrbitControls
                        makeDefault
                        autoRotate={autoRotate}
                        autoRotateSpeed={0.7}
                        enableDamping
                        enablePan
                        enableZoom
                        minPolarAngle={Math.PI / 3}
                        maxPolarAngle={(Math.PI * 2) / 3}
                    />
                </Canvas>
            </ModelErrorBoundary>
        </div>
    );
}

export default BananaModel;
