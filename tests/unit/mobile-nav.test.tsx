// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MobileNav } from "@/components/layout/MobileNav";

vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

const labels = {
  home: "Strona główna",
  about: "O mnie",
  expertise: "Zakres działalności",
  research: "Nauka i projekty",
  publications: "Publikacje",
  contact: "Współpraca i kontakt",
  openMenu: "Otwórz menu",
  closeMenu: "Zamknij menu",
  menu: "Menu",
  close: "Zamknij",
};

afterEach(cleanup);

describe("MobileNav", () => {
  it("is collapsed by default", () => {
    render(<MobileNav locale="pl" labels={labels} email="a@b.c" />);
    const button = screen.getByRole("button", { name: "Otwórz menu" });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(document.getElementById(button.getAttribute("aria-controls")!)!.hidden).toBe(true);
  });

  it("opens, moves focus into the panel and closes with Escape", () => {
    render(<MobileNav locale="pl" labels={labels} email="a@b.c" />);
    const button = screen.getByRole("button", { name: "Otwórz menu" });
    fireEvent.click(button);
    expect(button.getAttribute("aria-expanded")).toBe("true");
    expect(document.activeElement?.textContent).toContain("Strona główna");
    expect(document.documentElement.style.overflow).toBe("hidden");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(button.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(button);
    expect(document.documentElement.style.overflow).toBe("");
  });

  it("marks the current page", () => {
    render(<MobileNav locale="pl" labels={labels} email="a@b.c" />);
    fireEvent.click(screen.getByRole("button", { name: "Otwórz menu" }));
    expect(screen.getByRole("link", { name: /Strona główna/ }).getAttribute("aria-current")).toBe("page");
  });
});
