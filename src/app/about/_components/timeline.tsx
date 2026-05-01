"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-[#1f1f1f] whitespace-nowrap";

type Milestone = {
  year: string;
  title: string;
  body: string;
  tag: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "2017",
    tag: "[ first chapter ]",
    title: "Started shooting weddings on the south side.",
    body: "Picked up a Nikon, taught myself colour, and built a portfolio one weekend at a time. The work was small but the obsession was real.",
  },
  {
    year: "2019",
    tag: "[ studio mk i ]",
    title: "Quit the day job. Opened H.Studio in a one-room walk-up.",
    body: "Brand work for local restaurants and indie labels. Learned that good design is mostly listening — twice — before opening Figma.",
  },
  {
    year: "2022",
    tag: "[ award season ]",
    title: "Two D&AD pencils, a Webby, and a sleepless year.",
    body: "Took on bigger clients, hired contract help, and shipped the first projects I'd put in front of strangers without flinching.",
  },
  {
    year: "2024",
    tag: "[ now ]",
    title: "Full-service: brand, web, and the camera I started with.",
    body: "Working with founders and creative teams who care about the details. Still answering my own emails. Still shooting on weekends.",
  },
];

function Row({ item, index }: { item: Milestone; index: number }) {
  const rowRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      gsap.from([titleRef.current, bodyRef.current], {
        y: 28,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
          once: true,
        },
      });
    },
    { scope: rowRef },
  );

  return (
    <article
      ref={rowRef}
      className="grid grid-cols-1 gap-4 border-t border-[#1f1f1f] pt-6 md:grid-cols-[120px_1fr_minmax(0,420px)] md:gap-12 md:pt-8"
    >
      <div className="flex items-baseline justify-between gap-2 md:flex-col md:items-start md:gap-2">
        <p className="font-mono text-[18px] leading-none text-[#1f1f1f]">
          {item.year}
        </p>
        <p className={MONO_LABEL}>
          {String(index + 1).padStart(3, "0")}
        </p>
      </div>

      <p
        ref={titleRef}
        className="font-light uppercase tracking-[-0.06em] leading-[0.92] text-black text-[28px] md:text-[clamp(36px,4.5vw,64px)] will-change-transform"
      >
        {item.title}
      </p>

      <div className="flex flex-col gap-3">
        <p className={MONO_LABEL}>{item.tag}</p>
        <p
          ref={bodyRef}
          className="font-normal leading-[1.4] tracking-[-0.04em] text-[14px] text-[#1f1f1f] md:text-[15px] will-change-transform"
        >
          {item.body}
        </p>
      </div>
    </article>
  );
}

export function Timeline() {
  return (
    <section className="w-full bg-[#fafafa] px-4 py-12 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col gap-3">
          <p className={MONO_LABEL}>[ 002 — story ]</p>
          <div className="flex w-full items-end justify-between gap-4 font-light uppercase tracking-[-0.08em] leading-none text-black text-[32px] md:text-[clamp(48px,7vw,96px)]">
            <p>The long way</p>
            <p className={`${MONO_LABEL} self-end pb-2`}>
              {String(MILESTONES.length).padStart(3, "0")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8 md:gap-12">
          {MILESTONES.map((m, i) => (
            <Row key={m.year} item={m} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
