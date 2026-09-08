const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const ENTRANCES = {
    rise: { translate: "0 28px", scale: "1", rotate: "0deg" },
    line: { translate: "0 42px", scale: "1", rotate: "1deg" },
    card: { translate: "-28px 8px", scale: "0.97", rotate: "0deg" },
    map: { translate: "0 34px", scale: "0.96", rotate: "0deg" },
    fruit: { translate: "0 48px", scale: "0.93", rotate: "7deg" },
};

// Visible by default; only supported browsers opt elements into a reveal.
export function startScrollReveals(root) {
    const view = root.ownerDocument.defaultView;
    const preference = view.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !view.IntersectionObserver || !view.Element.prototype.animate) {
        return () => {};
    }

    const pending = new Map();
    const seen = new WeakSet();
    let stopped = false;

    const finish = (element) => {
        const state = pending.get(element);
        if (!state) return;
        state.animation?.cancel();
        state.removeImageListeners?.();
        element.dataset.revealState = "visible";
        observer.unobserve(element);
        pending.delete(element);
    };

    const reveal = (element) => {
        const state = pending.get(element);
        if (stopped || !state?.intersecting || !state.ready || state.animation) return;
        if (!root.contains(element)) return finish(element);

        const entrance = ENTRANCES[element.dataset.reveal] ?? ENTRANCES.rise;
        const duration = element.dataset.reveal === "fruit" ? 950 : 720;
        try {
            state.animation = element.animate([
                { opacity: 0, ...entrance },
                { opacity: 1, translate: "0 0", scale: "1", rotate: "0deg" },
            ], {
                duration,
                delay: Math.min(800, Math.max(0, Number(element.dataset.revealDelay) || 0)),
                easing: EASING,
                fill: "both",
            });
            element.dataset.revealState = "revealing";
            observer.unobserve(element);
            state.animation.onfinish = () => finish(element);
        } catch {
            finish(element);
        }
    };

    const observer = new view.IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
            const state = pending.get(target);
            if (!state) return;
            state.intersecting = isIntersecting;
            if (isIntersecting) reveal(target);
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -24px 0px" });

    const register = (element) => {
        if (seen.has(element) || element.dataset.revealState === "visible") return;
        seen.add(element);
        const isImage = element.tagName === "IMG";
        const state = { ready: !isImage, intersecting: false, animation: null };
        pending.set(element, state);
        element.dataset.revealState = "pending";

        if (isImage) {
            const ready = async () => {
                state.removeImageListeners?.();
                try { await element.decode?.(); } catch { /* Failed images still reveal their alt text. */ }
                if (stopped || !pending.has(element)) return;
                state.ready = true;
                reveal(element);
            };
            state.removeImageListeners = () => {
                element.removeEventListener("load", ready);
                element.removeEventListener("error", ready);
            };
            if (element.complete) ready();
            else {
                element.addEventListener("load", ready, { once: true });
                element.addEventListener("error", ready, { once: true });
            }
        }

        observer.observe(element);
    };

    const scan = (node) => {
        if (node.nodeType !== 1) return;
        if (node.matches("[data-reveal]")) register(node);
        node.querySelectorAll("[data-reveal]").forEach(register);
    };

    // Newly selected map titles and future async sections use the same entrance.
    const mutations = new view.MutationObserver((records) => {
        records.forEach((record) => record.addedNodes.forEach(scan));
        pending.forEach((_, element) => {
            if (!root.contains(element)) finish(element);
        });
    });

    const revealFocused = (event) => {
        pending.forEach((_, element) => {
            if (element === event.target || element.contains(event.target)) finish(element);
        });
    };

    const stop = (keepVisible = false) => {
        stopped = true;
        pending.forEach((_, element) => {
            finish(element);
            // A React StrictMode setup/cleanup must not consume unseen entrances.
            if (!keepVisible) delete element.dataset.revealState;
        });
        observer.disconnect();
        mutations.disconnect();
        root.removeEventListener("focusin", revealFocused);
        preference.removeEventListener("change", onPreferenceChange);
    };
    const onPreferenceChange = () => {
        if (preference.matches) stop(true);
    };

    scan(root);
    mutations.observe(root, { childList: true, subtree: true });
    root.addEventListener("focusin", revealFocused);
    preference.addEventListener("change", onPreferenceChange);
    return () => stop();
}
