import { useCallback, useEffect, useRef, useState } from "react";

export default function useMapMotion(initialPosition) {
    const [position, setPosition] = useState(initialPosition);
    const current = useRef(initialPosition);
    const destination = useRef(null);
    const frame = useRef(0);

    const cancel = useCallback(() => {
        window.cancelAnimationFrame(frame.current);
        frame.current = 0;
        destination.current = null;
    }, []);

    const settle = useCallback((next) => {
        cancel();
        current.current = next;
        setPosition(next);
    }, [cancel]);

    const moveTo = useCallback((next) => {
        cancel();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            settle(next);
            return;
        }

        const from = current.current;
        const started = performance.now();
        destination.current = next;
        const step = (now) => {
            const progress = Math.min(1, (now - started) / 680);
            const eased = 1 - (1 - progress) ** 3;
            const value = progress === 1 ? next : {
                coordinates: from.coordinates.map((coordinate, index) =>
                    coordinate + (next.coordinates[index] - coordinate) * eased
                ),
                zoom: from.zoom + (next.zoom - from.zoom) * eased,
            };
            current.current = value;
            setPosition(value);
            if (progress < 1) frame.current = window.requestAnimationFrame(step);
            else {
                frame.current = 0;
                destination.current = null;
            }
        };
        frame.current = window.requestAnimationFrame(step);
    }, [cancel, settle]);

    useEffect(() => {
        const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
        const finishMotion = () => {
            if (preference.matches && destination.current) settle(destination.current);
        };
        preference.addEventListener("change", finishMotion);
        return () => {
            cancel();
            preference.removeEventListener("change", finishMotion);
        };
    }, [cancel, settle]);

    return { position, moveTo, settle, cancel };
}
