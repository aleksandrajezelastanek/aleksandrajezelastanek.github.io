import type { ReactNode } from "react";
import "@/styles/globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { rootMetadata, rootViewport } from "@/lib/layout-metadata";

export const metadata = rootMetadata("pl");
export const viewport = rootViewport;

export default function PolishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="pl">{children}</RootDocument>;
}
