"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useClipboardSupport } from "@/lib/use-client";

/**
 * Copies the address to the clipboard. Rendered only after hydration (and
 * only where the Clipboard API exists), so it never appears as a dead button.
 */
export function CopyEmailButton({ email, label, copiedLabel }: { email: string; label: string; copiedLabel: string }) {
  const supported = useClipboardSupport();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!supported) return null;

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
          } catch {
            setCopied(false);
          }
        }}
        className="inline-flex min-h-12 items-center justify-center gap-2.5 border border-line-inverse px-6 text-[0.9375rem] font-semibold text-ivory transition-colors hover:border-ivory"
      >
        {copied ? (
          <Check aria-hidden className="size-4 text-gold-light" strokeWidth={1.8} />
        ) : (
          <Copy aria-hidden className="size-4" strokeWidth={1.6} />
        )}
        <span>{copied ? copiedLabel : label}</span>
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? copiedLabel : ""}
      </span>
    </>
  );
}
