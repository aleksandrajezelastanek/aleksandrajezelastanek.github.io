"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * `false` during static rendering and hydration, `true` afterwards — without
 * a setState-in-effect round trip. Used to show JS-only controls only when
 * JavaScript is actually running.
 */
export function useIsClient(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/** Whether the asynchronous Clipboard API is available. */
export function useClipboardSupport(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => typeof navigator !== "undefined" && Boolean(navigator.clipboard?.writeText),
    () => false,
  );
}
