import assert from "node:assert/strict";
import test from "node:test";
import { getBackgroundBehindElement, getContrastingTextColor } from "../src/utils/headerContrast.js";

test("uses white on dark backgrounds and dark text on all light banana colors", () => {
    for (const color of [[0, 0, 0], [169, 79, 99]]) {
        assert.equal(getContrastingTextColor(color), "#ffffff");
    }
    for (const color of [[244, 255, 149], [241, 231, 44], [168, 201, 111], [240, 174, 84], [127, 168, 208], [255, 255, 255]]) {
        assert.equal(getContrastingTextColor(color), "#1a1a1a");
    }
});

function sample(layers, point = [120, 40]) {
    const header = { contains: (layer) => layer.inHeader };
    const element = {
        getBoundingClientRect: () => ({ left: point[0] - 20, top: point[1] - 10, width: 40, height: 20 }),
        ownerDocument: {
            elementsFromPoint: (x, y) => {
                assert.deepEqual([x, y], point);
                return layers;
            },
            defaultView: { getComputedStyle: (layer) => ({ backgroundColor: layer.color }) },
        },
    };
    return getBackgroundBehindElement(element, header);
}

test("ignores the header and transparent content when sampling the surface", () => {
    const background = sample([
        { inHeader: true, color: "rgb(255, 255, 255)" },
        { color: "rgba(0, 0, 0, 0)" },
        { color: "rgb(169, 79, 99)" },
        { color: "rgb(255, 255, 255)" },
    ]);
    assert.deepEqual(background, [169, 79, 99]);
    assert.equal(getContrastingTextColor(background), "#ffffff");
});

test("a light map card overrides its dark surrounding panel", () => {
    const background = sample([
        { color: "rgba(248, 247, 239, 0.96)" },
        { color: "rgb(169, 79, 99)" },
    ]);
    assert.equal(getContrastingTextColor(background), "#1a1a1a");
});

test("independent link positions can select different colors in a split layout", () => {
    assert.equal(getContrastingTextColor(sample([{ color: "rgb(247, 247, 242)" }], [80, 40])), "#1a1a1a");
    assert.equal(getContrastingTextColor(sample([{ color: "rgb(169, 79, 99)" }], [900, 40])), "#ffffff");
});

test("falls back to a white page behind transparent backgrounds", () => {
    assert.deepEqual(sample([{ color: "rgba(0, 0, 0, 0)" }]), [255, 255, 255]);
});
