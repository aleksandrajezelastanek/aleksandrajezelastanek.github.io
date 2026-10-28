import { defineConfig } from "vitest/config";

/** Checks against the static export in ./out — run after `npm run build`. */
export default defineConfig({
  test: {
    include: ["tests/build/**/*.test.ts"],
    environment: "node",
  },
});
