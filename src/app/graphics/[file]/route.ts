import { graphicNames, graphicTones, renderGraphic, type GraphicName, type GraphicTone } from "@/components/graphics/svg-builders";

export const dynamic = "force-static";
export const dynamicParams = false;

/** Emits /graphics/<name>-<tone>.svg for every graphic and colour variant. */
export function generateStaticParams() {
  return graphicNames.flatMap((name) => graphicTones.map((tone) => ({ file: `${name}-${tone}.svg` })));
}

export async function GET(_request: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const match = /^(.+)-(navy|ivory|gold)\.svg$/.exec(file);
  if (!match || !graphicNames.includes(match[1] as GraphicName)) return new Response("Not found", { status: 404 });
  return new Response(renderGraphic(match[1] as GraphicName, match[2] as GraphicTone), {
    headers: { "Content-Type": "image/svg+xml; charset=utf-8" },
  });
}
