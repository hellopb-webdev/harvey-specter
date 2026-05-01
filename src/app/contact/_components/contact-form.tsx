"use client";

import { useRef, useState, type FormEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CONTACT_EMAIL } from "./contact-details";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-white whitespace-nowrap";

const PROJECT_TYPES = [
  "Brand discovery",
  "Web design & dev",
  "Marketing",
  "Photography",
  "Something else",
];

const BUDGETS = [
  "Under $10k",
  "$10k — $25k",
  "$25k — $50k",
  "$50k+",
  "Not sure yet",
];

const FIELD_BASE =
  "w-full bg-transparent border-b border-white/40 py-3 text-[16px] tracking-[-0.04em] text-white " +
  "placeholder:text-white/40 focus:border-white focus:outline-none transition-colors duration-200";

export function ContactFormBody({
  onSubmitted,
  compact = false,
}: {
  onSubmitted?: () => void;
  compact?: boolean;
}) {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const projectType = String(data.get("projectType") ?? "");
    const budget = String(data.get("budget") ?? "");
    const message = String(data.get("message") ?? "").trim();

    const subject = `New project inquiry — ${projectType || "general"}`;
    const body = [
      `From: ${name} <${email}>`,
      projectType ? `Project type: ${projectType}` : null,
      budget ? `Budget: ${budget}` : null,
      "",
      message,
    ]
      .filter((l) => l !== null)
      .join("\n");

    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setSubmitted(true);
    onSubmitted?.();
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <div
        className={`grid grid-cols-1 gap-6 md:grid-cols-2 ${
          compact ? "md:gap-6" : "md:gap-8"
        }`}
      >
        <Field label="Your name" name="name" required>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className={FIELD_BASE}
          />
        </Field>

        <Field label="Email" name="email" required>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="jane@studio.com"
            className={FIELD_BASE}
          />
        </Field>

        <Field label="Project type" name="projectType">
          <select
            name="projectType"
            defaultValue=""
            className={`${FIELD_BASE} appearance-none cursor-pointer`}
          >
            <option value="" disabled className="bg-black text-white">
              Pick one
            </option>
            {PROJECT_TYPES.map((p) => (
              <option key={p} value={p} className="bg-black text-white">
                {p}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Budget range" name="budget">
          <select
            name="budget"
            defaultValue=""
            className={`${FIELD_BASE} appearance-none cursor-pointer`}
          >
            <option value="" disabled className="bg-black text-white">
              Pick one
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-black text-white">
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Message" name="message" required>
        <textarea
          name="message"
          required
          rows={compact ? 4 : 5}
          placeholder="A few sentences about what you're working on, your timeline, and anything I should see first."
          className={`${FIELD_BASE} resize-none`}
        />
      </Field>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-[12px] uppercase leading-[1.3] text-white/50">
          {submitted
            ? "[ Email client opened — finish sending from there ]"
            : "[ Submitting opens your email app with the message pre-filled ]"}
        </p>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-3xl border border-white bg-white px-5 py-3 text-sm font-medium tracking-[-0.04em] text-black transition-[transform,box-shadow,background-color] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(255,255,255,0.45)] focus-visible:-translate-y-0.5 focus-visible:shadow-[0_12px_28px_-10px_rgba(255,255,255,0.45)] focus-visible:outline-none"
        >
          Send message
          <svg
            width="18"
            height="18"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M10 22 L22 10" />
            <path d="M11 10 L22 10 L22 21" />
          </svg>
        </button>
      </div>
    </form>
  );
}

export function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        y: 32,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
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
      className="w-full bg-black px-4 py-12 md:px-8 md:py-20"
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-3">
          <p className={MONO_LABEL}>[ 007 — inquiry ]</p>
          <div className="flex w-full items-end justify-between gap-4 font-light uppercase tracking-[-0.08em] leading-none text-white whitespace-nowrap text-[32px] md:text-[clamp(48px,7vw,96px)]">
            <p>Tell me about it</p>
            <p>[?]</p>
          </div>
        </div>

        <div
          ref={cardRef}
          className="relative px-6 py-8 md:px-12 md:py-12 will-change-transform"
        >
          <Corner position="tl" />
          <Corner position="tr" />
          <Corner position="bl" />
          <Corner position="br" />

          <ContactFormBody />
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  required,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="flex flex-col gap-2">
      <span className={MONO_LABEL}>
        [ {label}
        {required ? " *" : ""} ]
      </span>
      {children}
    </label>
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
      className={`pointer-events-none absolute size-4 border-white/60 ${map[position]}`}
    />
  );
}
