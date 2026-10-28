import { describe, expect, it } from "vitest";
import { activeRouteKey, researchAreaPath, route, translatePath } from "@/lib/routes";

describe("routes", () => {
  it("use trailing slashes for static hosting", () => {
    expect(route("pl", "about")).toBe("/o-mnie/");
    expect(researchAreaPath("pl", "pulmogenetyka")).toBe("/nauka-i-projekty/pulmogenetyka/");
  });

  it("translate between locales", () => {
    expect(translatePath("/o-mnie/", "en")).toBe("/en/about/");
    expect(translatePath("/en/about", "pl")).toBe("/o-mnie/");
    expect(translatePath("/nauka-i-projekty/pulmogenetyka/", "en")).toBe("/en/research/pulmogenetyka/");
    expect(translatePath("/", "en")).toBe("/en/");
    expect(translatePath("/unknown/", "en")).toBe("/en/");
  });

  it("detect the active navigation item", () => {
    expect(activeRouteKey("/publikacje/", "pl")).toBe("publications");
    expect(activeRouteKey("/nauka-i-projekty/onkogenetyka/", "pl")).toBe("research");
    expect(activeRouteKey("/", "pl")).toBe("home");
  });
});
