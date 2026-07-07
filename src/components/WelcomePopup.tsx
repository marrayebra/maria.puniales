"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "maria-puniales-welcome-seen";

export function WelcomePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "1") {
      return;
    }

    setOpen(true);
  }, []);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "1");
    setOpen(false);
  }

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
    >
      <div className="w-full max-w-md border border-border bg-black px-8 py-10 text-center">
        <p
          id="welcome-title"
          className="font-display text-lg leading-8 tracking-[0.08em] text-white sm:text-xl"
        >
          {`¿A quien le ganaron los straight edge?`}
        </p>
        <p className="font-display mt-6 text-base tracking-[0.1em] text-white/80 sm:text-lg">
          Bienvenido a la web de los puñales, capricho.
          Vamo el manya!!!
        </p>

        <button
          type="button"
          onClick={dismiss}
          className="mt-10 border border-white/30 px-8 py-3 text-xs font-medium uppercase tracking-[0.35em] text-white transition-colors hover:border-white hover:bg-white hover:text-black"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
