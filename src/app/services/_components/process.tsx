"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-white whitespace-nowrap";

type Step = {
  number: string;
  title: string;
  duration: string;
  body: string;
};

const STEPS: Step[] = [
  {
    number: "01",
    title: "Discover",
    duration: "Week 1",
    body: "Workshop, audit, references, and a candid read of the audience. We end the week with a one-pager you can argue with.",
  },
  {
    number: "02",
    title: "Design",
    duration: "Weeks 2 — 4",
    body: "Direction sprints, then a tightening loop. You see the work early, often, and in the form it'll actually ship in.",
  },
  {
    number: "03",
    title: "Build",
    duration: "Weeks 4 — 7",
    body: "Engineering and production happen alongside design — not after it. Staging is real on day one, and feedback compounds.",
  },
  {
    number: "04",
    title: "Ship",
    duration: "Week 8 — onwards",
    body: "Launch, measure, iterate. We stay attached for a quiet 30 days to fix what only shows up under real traffic.",
  },
];

function StepRow({ step, index, total }: { step: Step; index: number; total: number }) {
  const rowRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(rowRef.current, {
        y: 28,
        duration: 0.7,
        delay: index * 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          delay: index * 0.08 + 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
            once: true,
          },
        },
      );
    },
    { scope: rowRef },
  );

  return (
    <article
      ref={rowRef}
      className="flex flex-col gap-4 will-change-transform"
    >
      <div
        ref={lineRef}
        className="h-px w-full origin-left bg-white/40"
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-[80px_1fr_120px_minmax(0,360px)] md:gap-8 md:items-start">
        <p className="font-mono text-[18px] leading-none text-white">
          {step.number}
        </p>
        <h3 className="font-bold italic uppercase tracking-[-0.04em] leading-[1.05] text-white text-[36px] md:text-[clamp(40px,5vw,72px)]">
          {step.title}
        </h3>
        <p className={MONO_LABEL}>[ {step.duration} ]</p>
        <p className="font-normal leading-[1.4] tracking-[-0.04em] text-[14px] text-white/80">
          {step.body}
        </p>
      </div>
      {index === total - 1 && (
        <div aria-hidden className="h-px w-full bg-white/40" />
      )}
    </article>
  );
}

export function Process() {
  return (
    <section className="w-full bg-black px-4 py-12 md:px-8 md:py-20">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-3">
          <p className={MONO_LABEL}>[ 004 — process ]</p>
          <div className="flex w-full items-end justify-between gap-4 font-light uppercase tracking-[-0.08em] leading-none text-white whitespace-nowrap text-[32px] md:text-[clamp(48px,7vw,96px)]">
            <p>How it ships</p>
            <p>[{STEPS.length}]</p>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:gap-10">
          {STEPS.map((s, i) => (
            <StepRow key={s.number} step={s} index={i} total={STEPS.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
