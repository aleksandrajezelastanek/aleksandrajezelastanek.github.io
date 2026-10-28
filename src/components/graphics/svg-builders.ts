/**
 * Decorative scientific graphics as standalone SVG documents.
 *
 * They are generated at build time into /graphics/<name>-<tone>.svg (see
 * src/app/graphics/[file]/route.ts) and referenced with <img alt="">, so the
 * markup is downloaded once and cached instead of being repeated inline in
 * every page and its React payload.
 *
 * The compositions are inspired by scientific forms — bronchial branching,
 * molecular lattices, pedigrees, cell packing, sequencing reads — but are
 * deliberately abstract and do not depict data or results.
 */
import { proximityEdges, r1, scatter, seeded, type Point } from "./geometry";

export type GraphicTone = "navy" | "ivory" | "gold";

const TONES: Record<GraphicTone, { line: string; accent: string }> = {
  navy: { line: "#142638", accent: "#b69b6a" },
  ivory: { line: "#f7f5f0", accent: "#d6c49f" },
  gold: { line: "#d6c49f", accent: "#b69b6a" },
};

interface Built {
  width: number;
  height: number;
  body: string;
}

const line = (x1: number, y1: number, x2: number, y2: number, attrs = "") =>
  `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}"${attrs}/>`;
const circle = (cx: number, cy: number, r: number, attrs = "") => `<circle cx="${r1(cx)}" cy="${r1(cy)}" r="${r1(r)}"${attrs}/>`;

/* ── Pulmogenetics: a bronchial tree (trachea at top) with terminal acini ── */
function branching(): Built {
  const rand = seeded(11);
  const segments: string[] = [];
  const terminals: Point[] = [];
  const maxDepth = 7;

  function grow(x: number, y: number, angle: number, length: number, depth: number) {
    const x2 = x + Math.cos(angle) * length;
    const y2 = y + Math.sin(angle) * length;
    segments.push(
      line(x, y, x2, y2, ` stroke-width="${r1(Math.max(0.6, 3.2 - depth * 0.42))}" stroke-opacity="${r1(0.85 - depth * 0.07)}"`),
    );
    if (depth === maxDepth) {
      terminals.push({ x: x2, y: y2 });
      return;
    }
    // The first split (main bronchi) opens wider, like the carina.
    const spread = depth === 0 ? 0.7 : 0.32 + rand() * 0.22;
    const ratio = 0.72 + rand() * 0.06;
    grow(x2, y2, angle - spread, length * ratio, depth + 1);
    grow(x2, y2, angle + spread * (0.85 + rand() * 0.3), length * (ratio - 0.04), depth + 1);
  }
  grow(240, 6, Math.PI / 2, 96, 0);

  const acini = terminals
    .map((p, i) => {
      const ring = circle(p.x, p.y, 4.2, ` stroke-opacity=".45" stroke-width=".7"`);
      const dot = i % 9 === 4 ? circle(p.x, p.y, 2, ` class="a pulse" style="animation-delay:${-(i % 5) * 1.3}s"`) : "";
      return ring + dot;
    })
    .join("");

  return {
    width: 480,
    height: 420,
    body: `<g stroke="currentColor" stroke-linecap="round">${segments.join("")}</g><g class="drift" stroke="currentColor">${acini}</g>`,
  };
}

/* ── Pharmacogenetics: hexagonal molecular lattice fading outward ── */
function lattice(): Built {
  const rand = seeded(23);
  const size = 22;
  const cx = 200;
  const cy = 160;
  const radius = 150;
  const bonds: string[] = [];
  const nodes = new Map<string, Point>();
  const fade = (p: Point) => r1(Math.max(0.08, 1 - Math.hypot(p.x - cx, p.y - cy) / radius));

  for (let row = -8; row <= 8; row++) {
    for (let col = -8; col <= 8; col++) {
      const hx = cx + col * size * Math.sqrt(3) + (row % 2 ? (size * Math.sqrt(3)) / 2 : 0);
      const hy = cy + row * size * 1.5;
      const corners: Point[] = Array.from({ length: 6 }, (_, k) => {
        const a = (Math.PI / 3) * k - Math.PI / 6;
        return { x: hx + size * Math.cos(a), y: hy + size * Math.sin(a) };
      });
      corners.forEach((a, k) => {
        const b = corners[(k + 1) % 6];
        const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        if (Math.hypot(mid.x - cx, mid.y - cy) > radius || rand() < 0.22) return;
        const o = fade(mid);
        if (rand() < 0.1) {
          // Double bond, drawn in the accent colour.
          const len = Math.hypot(b.y - a.y, a.x - b.x) || 1;
          const ox = ((b.y - a.y) / len) * 2.4;
          const oy = ((a.x - b.x) / len) * 2.4;
          const attrs = ` class="as" stroke-width=".9" stroke-opacity="${Math.min(1, o + 0.2)}"`;
          bonds.push(line(a.x + ox, a.y + oy, b.x + ox, b.y + oy, attrs), line(a.x - ox, a.y - oy, b.x - ox, b.y - oy, attrs));
        } else {
          bonds.push(line(a.x, a.y, b.x, b.y, ` stroke="currentColor" stroke-width=".8" stroke-opacity="${o}"`));
        }
        for (const p of [a, b]) nodes.set(`${Math.round(p.x)}:${Math.round(p.y)}`, p);
      });
    }
  }
  const dots = [...nodes.values()].map((p) => circle(p.x, p.y, 1.5, ` fill-opacity="${fade(p)}"`)).join("");
  return {
    width: 400,
    height: 320,
    body: `<g stroke-linecap="round">${bonds.join("")}</g><g class="drift-slow" fill="currentColor">${dots}</g>`,
  };
}

/* ── Rare diseases: an abstract multi-generation pedigree ── */
function pedigree(): Built {
  const s = 15;
  type Sym = [x: number, y: number, shape: "sq" | "ci", mark?: "affected" | "carrier"];
  const symbols: Sym[] = [
    [150, 50, "sq"],
    [250, 50, "ci", "carrier"],
    [20, 140, "sq"],
    [80, 140, "ci"],
    [170, 140, "sq", "carrier"],
    [240, 140, "ci"],
    [320, 140, "sq"],
    [380, 140, "ci"],
    [50, 230, "ci"],
    [125, 230, "sq"],
    [175, 230, "ci", "affected"],
    [225, 230, "sq"],
    [330, 230, "ci"],
    [380, 230, "sq", "carrier"],
  ];
  const h = s / 2;
  const lines: [number, number, number, number][] = [
    [150 + h, 50, 250 - h, 50],
    [200, 50, 200, 95],
    [80, 95, 320, 95],
    [80, 95, 80, 140 - h],
    [170, 95, 170, 140 - h],
    [320, 95, 320, 140 - h],
    [20 + h, 140, 80 - h, 140],
    [170 + h, 140, 240 - h, 140],
    [320 + h, 140, 380 - h, 140],
    [50, 140, 50, 230 - h],
    [205, 140, 205, 185],
    [125, 185, 225, 185],
    [125, 185, 125, 230 - h],
    [175, 185, 175, 230 - h],
    [225, 185, 225, 230 - h],
    [350, 140, 350, 185],
    [330, 185, 380, 185],
    [330, 185, 330, 230 - h],
    [380, 185, 380, 230 - h],
  ];
  const syms = symbols
    .map(([x, y, shape, mark]) => {
      const cls = mark === "affected" ? ` class="as af"` : mark ? ` class="as"` : ` stroke="currentColor"`;
      const shapeEl = shape === "sq" ? `<rect x="${x - h}" y="${y - h}" width="${s}" height="${s}"${cls}/>` : circle(x, y, h, cls);
      return shapeEl + (mark === "carrier" ? circle(x, y, 2.2, ` class="a"`) : "");
    })
    .join("");
  return {
    width: 400,
    height: 270,
    body: `<g stroke="currentColor" stroke-width=".9" stroke-opacity=".55">${lines.map((l) => line(...l)).join("")}</g><g stroke-width="1.1">${syms}</g>`,
  };
}

/* ── Oncogenetics: packed cells with a highlighted clonal region ── */
function cells(): Built {
  const rand = seeded(41);
  const W = 400;
  const H = 300;
  const list: { x: number; y: number; r: number }[] = [];
  for (let i = 0; i < 2600 && list.length < 120; i++) {
    const r = 7 + rand() * 24;
    const x = r + rand() * (W - r * 2);
    const y = r + rand() * (H - r * 2);
    if (list.every((c) => Math.hypot(c.x - x, c.y - y) > c.r + r + 3)) list.push({ x, y, r });
  }
  const body = list
    .map((c) => {
      const cluster = Math.hypot(c.x - 270, c.y - 120) < 78;
      const nucleus = { x: c.x + c.r * 0.18, y: c.y - c.r * 0.12, r: Math.max(1.4, c.r * 0.22) };
      return cluster
        ? circle(c.x, c.y, c.r, ` class="as" stroke-width="1.1"`) + circle(nucleus.x, nucleus.y, nucleus.r, ` class="a" fill-opacity=".85"`)
        : circle(c.x, c.y, c.r, ` stroke="currentColor" stroke-opacity=".4" stroke-width=".8"`) +
            circle(nucleus.x, nucleus.y, nucleus.r, ` fill="currentColor" fill-opacity=".28"`);
    })
    .join("");
  return { width: W, height: H, body };
}

/* ── Molecular diagnostics: aligned reads and a marked position ── */
function tracks(): Built {
  const rand = seeded(7);
  const W = 400;
  const marker = 252;
  const reads: string[] = [];
  const hits: string[] = [];
  for (let row = 0; row < 15; row++) {
    let x = -rand() * 60;
    const y = 86 + row * 13;
    while (x < W) {
      const w = 46 + rand() * 110;
      const x0 = Math.max(0, x);
      const x1 = Math.min(W, x + w);
      if (x1 - x0 > 4) reads.push(`<rect x="${r1(x0)}" y="${y}" width="${r1(x1 - x0)}" height="4" rx="2"/>`);
      if (x < marker && x + w > marker && rand() < 0.62) hits.push(`<rect x="${marker - 1.5}" y="${y - 1}" width="3" height="6"/>`);
      x += w + 8 + rand() * 26;
    }
  }
  const contour = Array.from({ length: 41 }, (_, i) => {
    const x = (W / 40) * i;
    const y = 58 - 18 * Math.exp(-((x - marker) ** 2) / 5200) - 7 * Math.sin(i * 0.7) * rand();
    return `${r1(x)},${r1(y)}`;
  }).join(" ");
  return {
    width: W,
    height: 300,
    body:
      `<polyline points="${contour}" stroke="currentColor" stroke-opacity=".55"/>` +
      line(0, 66, W, 66, ` stroke="currentColor" stroke-opacity=".25" stroke-width=".6"`) +
      `<g fill="currentColor" fill-opacity=".3">${reads.join("")}</g><g class="a">${hits.join("")}</g>` +
      line(marker, 30, marker, 290, ` class="as" stroke-width=".8" stroke-dasharray="2 4"`),
  };
}

/* ── Sparse scientific network (backgrounds) ── */
function network(seed: number, count: number, width: number, height: number, accents: number): Built {
  const rand = seeded(seed);
  const points = scatter(rand, count, width, height, Math.min(width, height) / 9, 10);
  const edges = proximityEdges(points, 3, Math.min(width, height) / 3.2);
  const accentIdx = new Set(Array.from({ length: accents }, (_, i) => Math.floor((i + 0.5) * (points.length / accents))));
  const edgeEls = edges.map(([a, b]) => line(points[a].x, points[a].y, points[b].x, points[b].y)).join("");
  const nodeEls = points
    .map((p, i) =>
      accentIdx.has(i)
        ? circle(p.x, p.y, 7, ` class="as" stroke-opacity=".5" stroke-width=".6"`) +
          circle(p.x, p.y, 2.6, ` class="a pulse" style="animation-delay:${-(i % 4) * 1.3}s"`)
        : circle(p.x, p.y, 1.6, ` fill="currentColor" fill-opacity=".6"`),
    )
    .join("");
  return {
    width,
    height,
    body: `<g class="drift-slow"><g stroke="currentColor" stroke-width=".6" stroke-opacity=".35">${edgeEls}</g>${nodeEls}</g>`,
  };
}

/* ── Genome ruler: evenly spaced ticks with one marked position ── */
function ruler(): Built {
  const ticks = Array.from({ length: 121 }, (_, i) =>
    i === 76
      ? line(i * 5, 0, i * 5, 24, ` class="as" stroke-width="1.4"`)
      : line(i * 5, i % 20 === 0 ? 0 : i % 5 === 0 ? 8 : 14, i * 5, 24, ` stroke="currentColor" stroke-width=".6"`),
  ).join("");
  return { width: 600, height: 24, body: ticks };
}

export const graphics = {
  branching,
  lattice,
  pedigree,
  cells,
  tracks,
  ruler,
  "network-hero": () => network(5, 60, 900, 620, 3),
  "network-portrait": () => network(17, 22, 300, 200, 2),
  "network-panel": () => network(33, 34, 700, 500, 3),
  "network-header": () => network(13, 34, 640, 360, 2),
  "network-footer": () => network(91, 30, 600, 300, 2),
} satisfies Record<string, () => Built>;

export type GraphicName = keyof typeof graphics;

/** Intrinsic size of each graphic (for width/height attributes → no CLS). */
export function graphicSize(name: GraphicName): { width: number; height: number } {
  const { width, height } = graphics[name]();
  return { width, height };
}

/**
 * A complete SVG document. Motion is CSS inside the file and is switched off
 * under prefers-reduced-motion (honoured in SVG images by modern browsers).
 */
export function renderGraphic(name: GraphicName, tone: GraphicTone): string {
  const { width, height, body } = graphics[name]();
  const { line: color, accent } = TONES[tone];
  const style =
    `.a{fill:${accent}}.as{stroke:${accent};fill:none}.as.af{fill:${accent}}` +
    `@media (prefers-reduced-motion:no-preference){` +
    `.drift{animation:d 26s ease-in-out infinite}.drift-slow{animation:d 38s ease-in-out infinite reverse}` +
    `.pulse{animation:p 6s ease-in-out infinite}` +
    `@keyframes d{50%{transform:translate(5px,-6px)}}@keyframes p{50%{opacity:.35}}}`;
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" fill="none" color="${color}">` +
    `<style>${style}</style>${body}</svg>`
  );
}

export const graphicNames = Object.keys(graphics) as GraphicName[];
export const graphicTones: GraphicTone[] = ["navy", "ivory", "gold"];
