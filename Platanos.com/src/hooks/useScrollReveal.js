import { useLayoutEffect, useRef } from "react";
import { startScrollReveals } from "../utils/scrollReveal";

export default function useScrollReveal() {
    const rootRef = useRef(null);

    useLayoutEffect(() => startScrollReveals(rootRef.current), []);

    return rootRef;
}
