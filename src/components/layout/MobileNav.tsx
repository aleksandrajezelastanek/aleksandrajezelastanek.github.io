"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Locale } from "@/data/types";
import { activeRouteKey, navigation, route } from "@/lib/routes";
import { cx } from "@/components/ui/primitives";
import type { NavLabels } from "./NavLinks";

interface Props {
  locale: Locale;
  labels: NavLabels & { home: string; openMenu: string; closeMenu: string; menu: string; close: string };
  email: string;
}

/**
 * Accessible disclosure menu for small screens:
 *  - button exposes aria-expanded / aria-controls
 *  - Escape closes and returns focus to the button
 *  - focus stays inside the open panel (Tab wraps)
 *  - closes on navigation; page behind does not scroll
 * Without JavaScript the footer navigation remains available.
 */
export function MobileNav({ locale, labels, email }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const active = activeRouteKey(pathname, locale);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) buttonRef.current?.focus();
  }, []);

  // Close when the route changes (link inside the panel was followed).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current || !buttonRef.current) return;
      const focusable = [buttonRef.current, ...panelRef.current.querySelectorAll<HTMLElement>("a")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      root.style.overflow = previous;
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? labels.closeMenu : labels.openMenu}
        onClick={() => (open ? close(false) : setOpen(true))}
        className="relative z-[60] -mr-2 inline-flex min-h-11 min-w-11 items-center justify-center gap-3 px-2 text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-navy"
      >
        <span aria-hidden>{open ? labels.close : labels.menu}</span>
        <span aria-hidden className="relative block h-3 w-6">
          <span
            className={cx("absolute left-0 h-px w-6 bg-navy transition-transform duration-300", open ? "top-1.5 rotate-45" : "top-0")}
          />
          <span className={cx("absolute left-0 h-px bg-navy transition-all duration-300", open ? "top-1.5 w-6 -rotate-45" : "top-3 w-4")} />
        </span>
      </button>

      <div
        ref={panelRef}
        id={panelId}
        hidden={!open}
        className="fixed inset-0 z-50 overflow-y-auto bg-ivory pt-[calc(var(--header-h)+1.5rem)] pb-10"
      >
        <nav aria-label={labels.menu} className="px-[var(--gutter)]">
          <ul className="border-t border-line">
            {(["home", ...navigation] as const).map((key, i) => (
              <li key={key} className="border-b border-line">
                <Link
                  href={route(locale, key)}
                  aria-current={active === key ? "page" : undefined}
                  className="flex items-baseline gap-5 py-5 font-serif text-[1.85rem] leading-tight text-navy"
                >
                  <span aria-hidden className="w-6 font-sans text-xs font-semibold tracking-[0.14em] text-gold-ink">
                    {String(i).padStart(2, "0")}
                  </span>
                  <span className={cx(active === key && "underline decoration-gold decoration-1 underline-offset-8")}>{labels[key]}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-slate-ink">
            <a className="link-quiet text-navy" href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </nav>
      </div>
    </div>
  );
}
