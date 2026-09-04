export const wrapIndex = (index, count) => ((index % count) + count) % count;

export function getCardOffset(index, active, count) {
  const offset = wrapIndex(index - active, count);
  return offset > Math.floor(count / 2) ? offset - count : offset;
}
