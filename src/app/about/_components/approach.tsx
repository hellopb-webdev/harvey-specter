"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-white whitespace-nowrap";

type Principle = {
  number: string;
  title: string;
  body: string;
};

const PRINCIPLES: Principle[] = [
  {
    number: "01",
    title: "Listen first",
    body: "Every brand has a sentence buried somewhere in the founder's notes. The job is to find it before opening a single file.",
  },
  {
    number: "02",
    title: "Keep it specific",
    body: "Generic work is forgettable work. I'd rather over-index on a single weird detail than ship something polished and anonymous.",
  },
  {
    number: "03",
    title: "Ship the thing",
    body: "Taste matters, but momentum compounds. Small, frequent releases beat the perfect launch that never comes.",
  },
];

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

function Card({ item, index }: { item: Principle; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(cardRef.current, {
        y: 32,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: cardRef },
  );

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col gap-5 px-6 py-8 will-change-transform md:gap-6 md:py-10"
    >
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />

      <div className="flex items-center justify-between">
        <p className="font-mono text-[18px] leading-none text-white">
          {item.number}
        </p>
        <p className={MONO_LABEL}>[ principle ]</p>
      </div>

      <h3 className="font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-white text-[28px] md:text-[36px]">
        {item.title}
      </h3>

      <p className="font-normal leading-[1.4] tracking-[-0.04em] text-[14px] text-white/80">
        {item.body}
      </p>
    </div>
  );
}

export function Approach() {
  return (
    <section className="w-full bg-black px-4 py-12 md:px-8 md:py-20">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-3">
          <p className={MONO_LABEL}>[ 003 — approach ]</p>
          <div className="flex w-full items-end justify-between gap-4 font-light uppercase tracking-[-0.08em] leading-none text-white whitespace-nowrap text-[32px] md:text-[clamp(48px,7vw,96px)]">
            <p>How I work</p>
            <p>[{PRINCIPLES.length}]</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {PRINCIPLES.map((p, i) => (
            <Card key={p.number} item={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
