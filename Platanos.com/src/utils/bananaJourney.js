export const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
export const smoothstep = (value) => {
  const progress = clamp(value);
  return progress * progress * (3 - 2 * progress);
};

// Interpolate document-space centers so scrolling never requires swapping images.
export function getBananaPose({ source, destination, start, end, scrollY, scrollLeft, introWidth, reducedMotion }) {
  const progress = smoothstep((scrollY - start) / Math.max(1, end - start));
  const travel = reducedMotion ? Number(progress >= 0.5) : progress;
  const exit = smoothstep((scrollLeft / Math.max(1, introWidth) - 0.15) / 0.85);

  return {
    x: (destination.x - source.x - scrollLeft) * travel,
    y: (destination.y - source.y) * travel,
    scale: 1 + (destination.width / Math.max(1, source.width) - 1) * travel,
    rotation: -8 - 10 * travel,
    grayscale: travel,
    opacity: 1 - exit * travel,
    introOpacity: 1 - exit,
    progress,
  };
}
