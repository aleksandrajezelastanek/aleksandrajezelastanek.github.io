import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";

/**
 * Fonts are downloaded at build time and served from the site itself —
 * no request reaches Google from visitors' browsers. `latin-ext` covers
 * Polish diacritics (ą, ć, ę, ł, ń, ó, ś, ź, ż).
 */
export const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const sans = Source_Sans_3({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-source-sans",
});

export const fontVariables = `${serif.variable} ${sans.variable}`;
