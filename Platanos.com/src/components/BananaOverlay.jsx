import { useState } from "react";
import BananaModel from "./BananaModel";

function BananaOverlay() {
    const [prefersReducedMotion] = useState(() =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    return (
        <section
            aria-label="Visor del modelo 3D del plátano"
            className="pointer-events-none fixed inset-0 z-40 overflow-hidden"
        >
            <div
                className="
                    banana-model-overlay
                    pointer-events-auto
                    absolute
                    left-1/2
                    top-1/2
                    h-[72vh]
                    min-h-[380px]
                    w-[92vw]
                    max-w-[920px]
                    sm:h-[78vh]
                    sm:w-[78vw]
                "
            >
                <BananaModel autoRotate={!prefersReducedMotion} />
            </div>

            <p
                className="
                    pointer-events-none
                    absolute
                    bottom-5
                    left-1/2
                    -translate-x-1/2
                    whitespace-nowrap
                    text-xs
                    font-medium
                    text-[#1a1a1a]/60
                "
            >
                Arrastra para girar · rueda para acercar
            </p>
        </section>
    );
}

export default BananaOverlay;
