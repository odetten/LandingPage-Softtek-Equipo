import test from "node:test";
import assert from "node:assert/strict";
import { getCardOffset, wrapIndex } from "../src/utils/carousel.js";

test("navigation wraps at both ends and after multiple laps", () => {
  assert.equal(wrapIndex(-1, 5), 4);
  assert.equal(wrapIndex(5, 5), 0);
  assert.equal(wrapIndex(-11, 5), 4);
  assert.equal(wrapIndex(12, 5), 2);
});

test("every selection has one center and two neighbors on either side", () => {
  for (let active = 0; active < 5; active++) {
    const offsets = Array.from({ length: 5 }, (_, index) => getCardOffset(index, active, 5));
    assert.deepEqual(offsets.toSorted((a, b) => a - b), [-2, -1, 0, 1, 2]);
    assert.equal(offsets[active], 0);
    assert.equal(offsets[wrapIndex(active + 1, 5)], 1);
    assert.equal(offsets[wrapIndex(active - 1, 5)], -1);
  }
});
