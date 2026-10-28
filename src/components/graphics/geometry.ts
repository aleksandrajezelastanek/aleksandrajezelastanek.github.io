/**
 * Small deterministic helpers for the decorative SVG graphics. A seeded PRNG
 * keeps every build byte-identical (no hydration differences, stable caching).
 */

export function seeded(seed: number) {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Round to one decimal to keep inline SVG small. */
export const r1 = (n: number) => Math.round(n * 10) / 10;

export interface Point {
  x: number;
  y: number;
}

export function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

/**
 * A sparse proximity graph: each point links to its `k` nearest neighbours
 * within `maxDist`. Returns unique undirected edges.
 */
export function proximityEdges(points: Point[], k: number, maxDist: number): [number, number][] {
  const seen = new Set<string>();
  const edges: [number, number][] = [];
  points.forEach((p, i) => {
    points
      .map((q, j) => ({ j, d: distance(p, q) }))
      .filter(({ j, d }) => j !== i && d < maxDist)
      .sort((a, b) => a.d - b.d)
      .slice(0, k)
      .forEach(({ j }) => {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          edges.push(i < j ? [i, j] : [j, i]);
        }
      });
  });
  return edges;
}

/** Poisson-ish scatter: rejects points closer than `minDist`. */
export function scatter(rand: () => number, count: number, w: number, h: number, minDist: number, pad = 0): Point[] {
  const pts: Point[] = [];
  let attempts = 0;
  while (pts.length < count && attempts < count * 60) {
    attempts++;
    const p = { x: pad + rand() * (w - pad * 2), y: pad + rand() * (h - pad * 2) };
    if (pts.every((q) => distance(p, q) >= minDist)) pts.push(p);
  }
  return pts;
}
