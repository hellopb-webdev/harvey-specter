"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Nav } from "../../_components/nav";

gsap.registerPlugin(useGSAP);

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-[#1f1f1f] whitespace-nowrap";

export function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(titleRef.current, {
        yPercent: 12,
        duration: 1.1,
        ease: "power3.out",
      });
      gsap.from(introRef.current, {
        y: 24,
        duration: 0.9,
        delay: 0.25,
        ease: "power3.out",
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-x-clip bg-[#fafafa] px-4 md:px-8"
    >
      <div className="relative flex flex-col">
        <Nav />

        <div className="flex flex-col gap-8 pt-12 pb-12 md:gap-12 md:pt-[120px] md:pb-[80px]">
          <div className="flex items-end justify-between gap-4">
            <p className={MONO_LABEL}>[ 001 — about ]</p>
            <p className={`${MONO_LABEL} text-right`}>
              [ creative freelancer ]
            </p>
          </div>

          <h1
            ref={titleRef}
            className="font-medium uppercase leading-[0.84] tracking-[-0.07em] text-black text-[clamp(96px,28vw,180px)] md:text-[clamp(180px,22vw,360px)] will-change-transform"
          >
            About
          </h1>

          <div
            ref={introRef}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-12"
          >
            <p className="max-w-[640px] text-[18px] font-light italic uppercase leading-[1.2] tracking-[-0.04em] text-[#1f1f1f] md:text-[24px]">
              Harvey Specter is a{" "}
              <span className="font-serif font-normal not-italic">
                Chicago-based
              </span>{" "}
              creative director, photographer, and full-service{" "}
              <span className="font-serif font-normal not-italic">studio</span>{" "}
              of one — building brands, products, and pictures with intent.
            </p>
            <p className={`${MONO_LABEL} md:text-right`}>
              [ Est. 2017 — 8+ years ]
            </p>
          </div>
        </div>

        <div aria-hidden className="h-px w-full bg-[#1f1f1f]" />
      </div>
    </section>
  );
}
