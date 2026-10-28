import type { ReactNode } from "react";
import "@/styles/globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { rootMetadata, rootViewport } from "@/lib/layout-metadata";

// English root layout. Files named *.en.tsx are routes only when
// NEXT_PUBLIC_ENABLE_EN=1 (see next.config.ts → pageExtensions).
export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
