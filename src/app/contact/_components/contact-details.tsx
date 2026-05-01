"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-[#1f1f1f] whitespace-nowrap";

export const CONTACT_EMAIL = "hello@h.studio";

const SOCIALS: { label: string; href: string }[] = [
  { label: "Instagram", href: "https://instagram.com/" },
  { label: "X.com", href: "https://x.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Facebook", href: "https://facebook.com/" },
];

const META: { label: string; value: string }[] = [
  { label: "Studio hours", value: "Mon — Fri · 9 — 6 CST" },
  { label: "Reply window", value: "Within 48 hours" },
  { label: "Currently", value: "Booking projects from June 2026" },
];

export function ContactDetails() {
  const sectionRef = useRef<HTMLElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(emailRef.current, {
        y: 32,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      gsap.from(metaRef.current, {
        y: 24,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#fafafa] px-4 py-12 md:px-8 md:py-[120px]"
    >
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-3">
          <p className={MONO_LABEL}>[ 006 — direct ]</p>
          <p className="font-light uppercase tracking-[-0.08em] leading-none text-black text-[32px] md:text-[clamp(48px,7vw,96px)]">
            Say hi
          </p>
        </div>

        <a
          ref={emailRef}
          href={`mailto:${CONTACT_EMAIL}`}
          className="group inline-flex w-fit max-w-full items-center gap-3 font-bold italic uppercase tracking-[-0.04em] leading-[0.95] text-black text-[28px] sm:text-[40px] md:text-[clamp(56px,8vw,120px)] transition-transform duration-300 ease-out hover:translate-x-1 focus-visible:translate-x-1 focus-visible:outline-none will-change-transform"
        >
          <span>{CONTACT_EMAIL}</span>
          <span
            aria-hidden
            className="inline-flex shrink-0 transition-transform duration-300 ease-out group-hover:rotate-12 group-focus-visible:rotate-12"
          >
            <svg
              width="40"
              height="40"
              viewBox="0 0 32 32"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 22 L22 10" />
              <path d="M11 10 L22 10 L22 21" />
            </svg>
          </span>
        </a>

        <div
          ref={metaRef}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 will-change-transform"
        >
          <ul className="flex flex-col">
            {META.map((m) => (
              <li
                key={m.label}
                className="flex items-baseline justify-between gap-4 border-t border-[#1f1f1f]/30 py-4 last:border-b"
              >
                <span className={MONO_LABEL}>[ {m.label} ]</span>
                <span className="text-right text-[15px] font-medium tracking-[-0.04em] text-black md:text-[16px]">
                  {m.value}
                </span>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col">
            {SOCIALS.map((s) => (
              <li
                key={s.label}
                className="border-t border-[#1f1f1f]/30 last:border-b"
              >
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-4 transition-colors duration-200 hover:text-[#1f1f1f]"
                >
                  <span className="text-[20px] font-medium uppercase tracking-[-0.04em] text-black md:text-[24px]">
                    {s.label}
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:rotate-12"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 22 L22 10" />
                      <path d="M11 10 L22 10 L22 21" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
