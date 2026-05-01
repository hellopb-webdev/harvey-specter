"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const HEADING =
  "font-light tracking-[-0.08em] text-black leading-[0.84] whitespace-nowrap text-[32px] md:text-[clamp(48px,7vw,96px)]";

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-[#1f1f1f] whitespace-nowrap";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLParagraphElement[]>([]);
  const setLineRef =
    (i: number) =>
    (el: HTMLParagraphElement | null) => {
      if (el) linesRef.current[i] = el;
    };

  useGSAP(
    () => {
      gsap.fromTo(
        linesRef.current,
        { color: "#000000" },
        {
          color: "#cccccc",
          ease: "none",
          duration: 1,
          stagger: { each: 0.6 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 40%",
            scrub: 0.8,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full overflow-x-clip bg-[#fafafa] px-4 py-12 md:px-8 md:py-[120px]"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className={`${MONO_LABEL} text-right`}>
            [ 8+ years in industry ]
          </p>
          <div className="h-px w-full bg-[#1f1f1f]" />
        </div>

        <div className="flex flex-col items-center gap-2 uppercase md:items-stretch">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-start">
            <p className={`${MONO_LABEL} order-1 md:order-2`}>001</p>
            <p
              ref={setLineRef(0)}
              className={`${HEADING} order-2 md:order-1`}
            >
              {`A creative director   /`}
            </p>
          </div>

          <p ref={setLineRef(1)} className={`${HEADING} md:pl-[15.6%]`}>
            Photographer
          </p>

          <p ref={setLineRef(2)} className={`${HEADING} md:pl-[44.3%]`}>
            Born{" "}
            <span className="font-serif font-normal italic">&</span> raised
          </p>

          <p ref={setLineRef(3)} className={HEADING}>
            On the south side
          </p>

          <div className="flex flex-col items-center gap-3 md:items-start md:gap-2 md:pl-[44%] xl:flex-row xl:items-baseline xl:gap-6">
            <p ref={setLineRef(4)} className={HEADING}>
              Of Chicago.
            </p>
            <p className={MONO_LABEL}>[ creative freelancer ]</p>
          </div>
        </div>
      </div>
    </section>
  );
}
