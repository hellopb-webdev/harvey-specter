"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { ContactFormBody } from "../contact/_components/contact-form";

type ContactModalContextValue = {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ContactModalContext = createContext<ContactModalContextValue | null>(
  null,
);

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) {
    throw new Error(
      "useContactModal must be used within a ContactModalProvider",
    );
  }
  return ctx;
}

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-white whitespace-nowrap";

export function ContactModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previousActive = useRef<HTMLElement | null>(null);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  // Body scroll lock + focus management + Esc key
  useEffect(() => {
    if (!open) return;

    previousActive.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);

    // Focus the close button on open so Esc-via-keyboard discoverability is good
    const focusTimer = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
      previousActive.current?.focus?.();
    };
  }, [open, closeModal]);

  return (
    <ContactModalContext.Provider value={{ open, openModal, closeModal }}>
      {children}

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        aria-hidden={!open}
        className={`fixed inset-0 z-[60] flex items-center justify-center px-4 py-8 transition-opacity duration-300 ease-out md:px-8 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <button
          type="button"
          aria-label="Close contact form"
          tabIndex={open ? 0 : -1}
          onClick={closeModal}
          className="absolute inset-0 cursor-default bg-black/70 backdrop-blur-sm"
        />

        <div
          className={`relative z-10 flex w-full max-w-[860px] max-h-[90vh] flex-col overflow-hidden bg-black text-white transition-[transform,opacity] duration-300 ease-out ${
            open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Corner position="tl" />
          <Corner position="tr" />
          <Corner position="bl" />
          <Corner position="br" />

          <div className="flex items-start justify-between gap-4 px-6 pt-6 md:px-10 md:pt-10">
            <div className="flex flex-col gap-2">
              <p className={MONO_LABEL}>[ 007 — inquiry ]</p>
              <p
                id="contact-modal-title"
                className="font-light uppercase tracking-[-0.08em] leading-[0.95] text-white text-[28px] md:text-[40px]"
              >
                Tell me about it
              </p>
            </div>

            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close"
              tabIndex={open ? 0 : -1}
              onClick={closeModal}
              className="inline-flex size-10 shrink-0 items-center justify-center text-white/80 transition-[transform,color] duration-300 ease-out hover:rotate-90 hover:text-white focus-visible:rotate-90 focus-visible:text-white focus-visible:outline-none"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="square"
                aria-hidden
              >
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 pb-6 pt-6 md:px-10 md:pb-10 md:pt-8">
            {/* Re-mount the form whenever the modal opens, so state resets */}
            {open && <ContactFormBody compact onSubmitted={closeModal} />}
          </div>
        </div>
      </div>
    </ContactModalContext.Provider>
  );
}

function Corner({ position }: { position: "tl" | "tr" | "bl" | "br" }) {
  const map = {
    tl: "top-0 left-0 border-t border-l",
    tr: "top-0 right-0 border-t border-r",
    bl: "bottom-0 left-0 border-b border-l",
    br: "bottom-0 right-0 border-b border-r",
  } as const;
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute size-4 border-white ${map[position]}`}
    />
  );
}
