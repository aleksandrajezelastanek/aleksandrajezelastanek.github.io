"""
Generate public/og.png (1200 × 630) — the social sharing image.

Uses the fonts that `next build` already downloaded into .next/static/media,
so run it after a build:   npm run build && python3 scripts/generate-og.py
Requires Pillow (pip install pillow). Re-run when the name or title changes.
"""

import glob
import math
import random
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
W, H = 1200, 630
NAVY = (20, 38, 56)
IVORY = (247, 245, 240)
GOLD = (182, 155, 106)
GOLD_LIGHT = (214, 196, 159)


class SubsetFont:
    """
    next/font splits each family into unicode-range subsets (latin,
    latin-ext…). This draws text character by character, using whichever
    subset file actually contains the glyph.
    """

    def __init__(self, family: str, style: str, size: int, weight: int):
        self.fonts = []
        for path in sorted(glob.glob(str(ROOT / ".next/static/media/*.woff2"))):
            try:
                f = ImageFont.truetype(path, size)
            except OSError:
                continue
            name, sub = f.getname()
            if family in name and style in sub:
                try:
                    f.set_variation_by_axes([weight])
                except OSError:
                    pass
                notdef = bytes(f.getmask("\uffff"))
                self.fonts.append((f, notdef))
        if not self.fonts:
            sys.exit(f"Font {family} {style} not found — run `npm run build` first.")

    def _font_for(self, ch: str) -> ImageFont.FreeTypeFont:
        if ch.isspace():
            return self.fonts[0][0]
        for f, notdef in self.fonts:
            if bytes(f.getmask(ch)) != notdef:
                return f
        return self.fonts[0][0]

    def draw(self, d: ImageDraw.ImageDraw, xy, text: str, fill, tracking: float = 0) -> None:
        x, y = xy
        for ch in text:
            f = self._font_for(ch)
            d.text((x, y), ch, font=f, fill=fill)
            x += f.getlength(ch) + tracking


def bronchial_tree(draw: ImageDraw.ImageDraw, x: float, y: float) -> None:
    rand = random.Random(11)
    terminals = []

    def grow(x1, y1, angle, length, depth):
        x2 = x1 + math.cos(angle) * length
        y2 = y1 + math.sin(angle) * length
        alpha = max(60, 230 - depth * 22)
        draw.line([(x1, y1), (x2, y2)], fill=GOLD_LIGHT + (alpha,), width=max(1, round(4 - depth * 0.5)))
        if depth == 7:
            terminals.append((x2, y2))
            return
        spread = 0.7 if depth == 0 else 0.32 + rand.random() * 0.22
        ratio = 0.72 + rand.random() * 0.06
        grow(x2, y2, angle - spread, length * ratio, depth + 1)
        grow(x2, y2, angle + spread * (0.85 + rand.random() * 0.3), length * (ratio - 0.04), depth + 1)

    grow(x, y, math.pi / 2, 120, 0)
    for i, (tx, ty) in enumerate(terminals):
        r = 5
        draw.ellipse([tx - r, ty - r, tx + r, ty + r], outline=GOLD_LIGHT + (110,), width=1)
        if i % 9 == 4:
            draw.ellipse([tx - 2.5, ty - 2.5, tx + 2.5, ty + 2.5], fill=GOLD + (255,))


def main() -> None:
    img = Image.new("RGB", (W, H), NAVY)
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    bronchial_tree(draw, 930, 60)
    img.paste(layer, (0, 0), layer)

    d = ImageDraw.Draw(img)
    sans = SubsetFont("Source Sans 3", "", 22, 600)
    serif = SubsetFont("Cormorant Garamond", "Regular", 92, 500)
    italic = SubsetFont("Cormorant Garamond", "Italic", 42, 500)
    small = SubsetFont("Source Sans 3", "", 21, 500)

    x = 80
    sans.draw(d, (x, 120), "PROF. DR HAB. N. MED.", GOLD_LIGHT, tracking=3)
    serif.draw(d, (x, 160), "Aleksandra", IVORY)
    serif.draw(d, (x, 252), "Jezela-Stanek", IVORY)
    d.line([(x, 382), (x + 64, 382)], fill=GOLD, width=2)
    italic.draw(d, (x, 404), "Genetyka w diagnostyce,", GOLD_LIGHT)
    italic.draw(d, (x, 452), "profilaktyce i leczeniu", GOLD_LIGHT)
    small.draw(d, (x, 548), "Genetyka kliniczna  ·  Pulmogenetyka  ·  Choroby rzadkie", (200, 205, 210))

    out = ROOT / "public/og.png"
    img.save(out, optimize=True)
    print(f"Wrote {out.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
