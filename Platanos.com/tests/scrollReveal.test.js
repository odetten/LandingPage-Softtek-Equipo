import test from "node:test";
import assert from "node:assert/strict";
import { startScrollReveals } from "../src/utils/scrollReveal.js";

class ElementStub extends EventTarget {
    constructor(reveal, children = []) {
        super();
        this.nodeType = 1;
        this.tagName = "DIV";
        this.dataset = reveal ? { reveal } : {};
        this.children = children;
        this.animations = [];
    }
    matches() { return Boolean(this.dataset.reveal); }
    querySelectorAll() {
        return this.children.flatMap((child) => [
            ...(child.matches() ? [child] : []), ...child.querySelectorAll(),
        ]);
    }
    contains(element) {
        return this === element || this.children.some((child) => child.contains(element));
    }
    animate(frames, options) {
        const animation = { frames, options, cancelled: false, cancel() { this.cancelled = true; } };
        this.animations.push(animation);
        return animation;
    }
}

function environment(children, reduced = false) {
    const root = new ElementStub(undefined, children);
    const preference = new EventTarget();
    preference.matches = reduced;
    const observers = [];
    const mutations = [];
    const view = {
        Element: ElementStub,
        matchMedia: () => preference,
        IntersectionObserver: class {
            constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
            observe(element) { this.targets.add(element); }
            unobserve(element) { this.targets.delete(element); }
            disconnect() { this.targets.clear(); }
            intersect(target, visible) { this.callback([{ target, isIntersecting: visible }]); }
        },
        MutationObserver: class {
            constructor(callback) { this.callback = callback; mutations.push(this); }
            observe() {}
            disconnect() {}
        },
    };
    root.ownerDocument = { defaultView: view };
    return { root, preference, observers, mutations };
}

test("only visible cards enter, keep their stagger, and never replay on selection", () => {
    const first = new ElementStub("card");
    const offscreen = new ElementStub("card");
    first.dataset.revealDelay = "120";
    const env = environment([first, offscreen]);
    const stop = startScrollReveals(env.root);
    env.observers[0].intersect(first, true);
    assert.equal(first.animations.length, 1);
    assert.equal(first.animations[0].options.delay, 120);
    assert.equal(offscreen.animations.length, 0);
    first.animations[0].onfinish();
    env.observers[0].intersect(first, true);
    assert.equal(first.animations.length, 1);
    assert.equal(first.dataset.revealState, "visible");
    stop();
});

test("late images wait for decoding and a visible viewport before entering", async () => {
    const image = new ElementStub("fruit");
    image.tagName = "IMG";
    image.complete = false;
    let decoded;
    image.decode = () => new Promise((resolve) => { decoded = resolve; });
    const env = environment([image]);
    const stop = startScrollReveals(env.root);
    env.observers[0].intersect(image, true);
    assert.equal(image.animations.length, 0);
    image.dispatchEvent(new Event("load"));
    env.observers[0].intersect(image, false);
    decoded();
    await Promise.resolve();
    assert.equal(image.animations.length, 0);
    env.observers[0].intersect(image, true);
    assert.equal(image.animations.length, 1);
    stop();
});

test("a failed image still reveals its fallback instead of staying invisible", async () => {
    const image = new ElementStub("fruit");
    image.tagName = "IMG";
    image.complete = true;
    image.decode = () => Promise.reject(new Error("Invalid image"));
    const env = environment([image]);
    const stop = startScrollReveals(env.root);
    env.observers[0].intersect(image, true);
    await Promise.resolve();
    assert.equal(image.animations.length, 1);
    stop();
});

test("keyboard focus makes an unrevealed parent visible immediately", () => {
    const button = new ElementStub();
    const map = new ElementStub("map", [button]);
    const env = environment([map]);
    const stop = startScrollReveals(env.root);
    const focus = new Event("focusin");
    Object.defineProperty(focus, "target", { value: button });
    env.root.dispatchEvent(focus);
    assert.equal(map.dataset.revealState, "visible");
    assert.equal(map.animations.length, 0);
    stop();
});

test("enabling reduced motion cancels active effects and reveals pending content", () => {
    const active = new ElementStub("rise");
    const waiting = new ElementStub("card");
    const env = environment([active, waiting]);
    const stop = startScrollReveals(env.root);
    env.observers[0].intersect(active, true);
    env.preference.matches = true;
    env.preference.dispatchEvent(new Event("change"));
    assert.ok(active.animations[0].cancelled);
    assert.equal(active.dataset.revealState, "visible");
    assert.equal(waiting.dataset.revealState, "visible");
    assert.equal(env.observers[0].targets.size, 0);
    stop();
});

test("initial reduced motion leaves all content visible without observers", () => {
    const element = new ElementStub("card");
    const env = environment([element], true);
    startScrollReveals(env.root)();
    assert.equal(element.dataset.revealState, undefined);
    assert.equal(env.observers.length, 0);
});

test("StrictMode cleanup/setup does not consume entrances before the first frame", () => {
    const element = new ElementStub("card");
    const env = environment([element]);
    startScrollReveals(env.root)();
    assert.equal(element.dataset.revealState, undefined);
    const stop = startScrollReveals(env.root);
    env.observers[1].intersect(element, true);
    assert.equal(element.animations.length, 1);
    stop();
});

test("newly mounted content waits for visibility and detached nodes are cleaned up", () => {
    const env = environment([]);
    const stop = startScrollReveals(env.root);
    const title = new ElementStub("rise");
    env.root.children.push(title);
    env.mutations[0].callback([{ addedNodes: [title] }]);
    assert.equal(title.dataset.revealState, "pending");
    assert.equal(title.animations.length, 0);
    env.observers[0].intersect(title, true);
    env.root.children = [];
    env.mutations[0].callback([{ addedNodes: [] }]);
    assert.ok(title.animations[0].cancelled);
    assert.equal(env.observers[0].targets.size, 0);
    stop();
});
