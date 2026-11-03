"use client";

import { Children, useId, useRef, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "@/components/ui/primitives";
import { useIsClient } from "@/lib/use-client";

export interface TabDef {
  /** Also the panel's id, so `#id` links open that tab. */
  id: string;
  label: string;
  count?: number;
}

// The selected tab lives in the URL hash, so it can be linked to and survives reloads.
const listeners = new Set<() => void>();
function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("hashchange", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("hashchange", callback);
  };
}
function selectHash(id: string) {
  history.replaceState(null, "", `#${id}`);
  listeners.forEach((l) => l());
}

/**
 * Tabs over server-rendered panels (children, one per tab). Without
 * JavaScript there is no tab list and every panel is simply shown in turn.
 */
export function PublicationTabs({ label, tabs, children }: { label: string; tabs: TabDef[]; children: ReactNode }) {
  const enhanced = useIsClient();
  const hash = useSyncExternalStore(
    subscribe,
    () => window.location.hash.slice(1),
    () => "",
  );
  const active = Math.max(
    0,
    tabs.findIndex((tab) => tab.id === hash),
  );
  const prefix = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const panels = Children.toArray(children);

  function onKeyDown(e: KeyboardEvent) {
    const last = tabs.length - 1;
    const next = { ArrowRight: active === last ? 0 : active + 1, ArrowLeft: active === 0 ? last : active - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    selectHash(tabs[next].id);
    buttons.current[next]?.focus();
  }

  return (
    <div>
      {enhanced && (
        <div role="tablist" aria-label={label} onKeyDown={onKeyDown} className="mb-12 flex gap-x-8 overflow-x-auto border-b border-line">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${prefix}-${tab.id}`}
              aria-selected={i === active}
              aria-controls={tab.id}
              tabIndex={i === active ? 0 : -1}
              onClick={() => selectHash(tab.id)}
              className={cx(
                "-mb-px min-h-12 shrink-0 border-b-2 pt-2 pb-3 text-left text-[0.98rem] font-semibold whitespace-nowrap transition-colors",
                i === active ? "border-gold text-navy" : "border-transparent text-slate-ink hover:text-navy",
              )}
            >
              {tab.label}
              {tab.count !== undefined && <span className="ml-1 font-normal text-slate-ink"> {tab.count}</span>}
            </button>
          ))}
        </div>
      )}
      {panels.map((panel, i) => (
        <div
          key={tabs[i].id}
          id={tabs[i].id}
          {...(enhanced ? { role: "tabpanel", "aria-labelledby": `${prefix}-${tabs[i].id}`, tabIndex: 0 } : {})}
          hidden={enhanced && i !== active}
          className={cx("scroll-mt-[calc(var(--header-h)+1.5rem)] outline-none", !enhanced && i > 0 && "mt-[var(--section-y)]")}
        >
          {panel}
        </div>
      ))}
    </div>
  );
}
