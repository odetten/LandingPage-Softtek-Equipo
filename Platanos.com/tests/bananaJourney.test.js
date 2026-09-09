import test from "node:test";
import assert from "node:assert/strict";
import { getBananaPose } from "../src/utils/bananaJourney.js";

const journey = {
  source: { x: 720, y: 480, width: 620 },
  destination: { x: 350, y: 1360, width: 400 },
  start: 0,
  end: 830,
  scrollY: 0,
  scrollLeft: 0,
  introWidth: 390,
  reducedMotion: false,
};

test("the same banana starts in the hero and lands exactly on the benefits anchor", () => {
  const first = getBananaPose(journey);
  assert.equal(Math.abs(first.x), 0);
  assert.equal(first.y, 0);
  assert.equal(first.scale, 1);
  assert.equal(first.grayscale, 0);
  const last = getBananaPose({ ...journey, scrollY: journey.end });
  assert.equal(journey.source.x + last.x, journey.destination.x);
  assert.equal(journey.source.y + last.y, journey.destination.y);
  assert.equal(journey.source.width * last.scale, journey.destination.width);
  assert.equal(last.grayscale, 1);
  assert.equal(last.opacity, 1);
});

test("vertical travel remains visible, continuous and reversible at every sampled frame", () => {
  let previous = getBananaPose(journey);
  for (let scrollY = 1; scrollY <= journey.end; scrollY += 1) {
    const pose = getBananaPose({ ...journey, scrollY });
    assert.equal(pose.opacity, 1);
    assert.ok(pose.grayscale >= previous.grayscale);
    assert.ok(Math.abs(pose.x - previous.x) < 1);
    assert.ok(Math.abs(pose.y - previous.y) < 2);
    // Reversing the scroll returns precisely to the same coordinate, without state.
    assert.deepEqual(getBananaPose({ ...journey, scrollY: scrollY - 1 }), previous);
    previous = pose;
  }
});

test("horizontal scrolling moves the fruit with the strip and fades the whole introduction", () => {
  const landed = getBananaPose({ ...journey, scrollY: 900 });
  const halfway = getBananaPose({ ...journey, scrollY: 900, scrollLeft: 195 });
  assert.equal(halfway.x, landed.x - 195);
  assert.equal(halfway.opacity, halfway.introOpacity);
  assert.ok(halfway.opacity > 0 && halfway.opacity < 1);
  const gone = getBananaPose({ ...journey, scrollY: 900, scrollLeft: 390 });
  assert.equal(gone.opacity, 0);
  assert.equal(gone.introOpacity, 0);
  const back = getBananaPose({ ...journey, scrollY: 0, scrollLeft: 390 });
  assert.equal(back.opacity, 1);
  assert.equal(back.grayscale, 0);
  assert.equal(Math.abs(back.x), 0);
});

test("scroll overshoot is clamped and reduced motion uses the two settled poses", () => {
  assert.deepEqual(getBananaPose({ ...journey, scrollY: -100 }), getBananaPose(journey));
  assert.deepEqual(getBananaPose({ ...journey, scrollY: 4000 }), getBananaPose({ ...journey, scrollY: 830 }));
  const reduced = getBananaPose({ ...journey, scrollY: 600, reducedMotion: true });
  assert.equal(reduced.grayscale, 1);
  assert.equal(reduced.y, journey.destination.y - journey.source.y);
});
