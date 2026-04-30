"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

const LINK_HOVER =
  "relative inline-block " +
  "after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full " +
  "after:origin-left after:scale-x-0 after:bg-current " +
  "after:transition-transform after:duration-300 after:ease-out " +
  "hover:after:scale-x-100 focus-visible:after:scale-x-100 " +
  "focus-visible:outline-none";

const CTA_BUTTON =
  "inline-flex items-center justify-center rounded-3xl bg-black px-4 py-3 " +
  "text-sm font-medium tracking-[-0.04em] text-white " +
  "transition-[transform,box-shadow,background-color] duration-300 ease-out " +
  "hover:bg-[#1f1f1f] hover:-translate-y-0.5 " +
  "hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] " +
  "focus-visible:bg-[#1f1f1f] focus-visible:-translate-y-0.5 " +
  "focus-visible:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] " +
  "focus-visible:outline-none";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="flex w-full items-center justify-between py-6">
        <a
          href="#"
          className={`text-base font-semibold capitalize tracking-[-0.04em] text-black ${LINK_HOVER}`}
        >
          H.Studio
        </a>

        <ul className="hidden items-center gap-14 text-base font-semibold capitalize tracking-[-0.04em] text-black md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={LINK_HOVER}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href="#contact" className={`hidden md:inline-flex ${CTA_BUTTON}`}>
          Let&rsquo;s talk
        </a>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="transition-transform duration-200 ease-out hover:scale-110 active:scale-95 md:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            aria-hidden
          >
            <path d="M3 8h18M3 16h18" />
          </svg>
        </button>
      </nav>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        className={`fixed inset-0 z-50 flex flex-col bg-[#fafafa] px-4 pb-6 transition-[opacity,transform] duration-300 ease-out md:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between py-6">
          <span className="text-base font-semibold capitalize tracking-[-0.04em] text-black">
            H.Studio
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="transition-transform duration-300 ease-out hover:rotate-90 active:scale-95"
          >
            <svg
              width="24"
              height="24"
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

        <ul className="mt-12 flex flex-col gap-8 text-4xl font-semibold capitalize tracking-[-0.04em] text-black">
          {LINKS.map((l, i) => (
            <li
              key={l.href}
              className={`transition-[opacity,transform] duration-300 ease-out ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{
                transitionDelay: open ? `${80 + i * 50}ms` : "0ms",
              }}
            >
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className={LINK_HOVER}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          className={`mt-auto transition-[opacity,transform] duration-300 ease-out ${
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
          style={{
            transitionDelay: open ? `${80 + LINKS.length * 50}ms` : "0ms",
          }}
        >
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className={`w-fit ${CTA_BUTTON}`}
          >
            Let&rsquo;s talk
          </a>
        </div>
      </div>
    </>
  );
}
