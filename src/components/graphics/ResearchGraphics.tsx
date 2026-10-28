import type { ResearchGraphic } from "@/data/types";
import { assetPath } from "@/lib/site";
import { graphicSize, type GraphicName, type GraphicTone } from "./svg-builders";

/**
 * Decorative graphic as a cached static image. `alt=""` + aria-hidden: it
 * carries no information. Below-the-fold graphics load lazily.
 */
export function Graphic({
  name,
  tone,
  className,
  eager = false,
}: {
  name: GraphicName;
  tone: GraphicTone;
  className?: string;
  eager?: boolean;
}) {
  const { width, height } = graphicSize(name);
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static SVG; next/image adds nothing here
    <img
      src={assetPath(`/graphics/${name}-${tone}.svg`)}
      alt=""
      aria-hidden
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
    />
  );
}

const forArea: Record<ResearchGraphic, GraphicName> = {
  branching: "branching",
  lattice: "lattice",
  pedigree: "pedigree",
  cells: "cells",
  tracks: "tracks",
  network: "network-panel",
};

export function ResearchGraphicFor({ graphic, tone, className }: { graphic: ResearchGraphic; tone: GraphicTone; className?: string }) {
  return <Graphic name={forArea[graphic]} tone={tone} className={className} />;
}
