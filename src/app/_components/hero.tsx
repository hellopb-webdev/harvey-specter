"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Nav } from "./nav";
import { useContactModal } from "./contact-modal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const { openModal } = useContactModal();
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLParagraphElement>(null);
  const harveyRef = useRef<HTMLSpanElement>(null);
  const specterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
        defaults: { ease: "none" },
      });

      tl.to(harveyRef.current, { xPercent: -120 }, 0)
        .to(helloRef.current, { xPercent: -120 }, 0)
        .to(specterRef.current, { xPercent: 120 }, 0)
        .to(imageWrapperRef.current, { scale: 1.4 }, 0);
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate w-full overflow-hidden h-[100svh] md:h-[847px]"
    >
      <div
        ref={imageWrapperRef}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-[349px] backdrop-blur-[10px]"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 45%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 45%)",
        }}
      />

      <div className="relative flex h-full flex-col px-4 md:px-8">
        <Nav />

        <div aria-hidden className="flex-1 md:flex-none md:h-[240px]" />

        <div className="flex h-[341px] w-full flex-col items-center justify-between pb-6 md:h-auto md:items-end md:justify-start md:pb-0">
          <div className="flex w-full flex-col items-start">
            <p
              ref={helloRef}
              className="px-[18px] font-mono text-sm uppercase leading-[1.1] text-white mix-blend-overlay will-change-transform"
            >
              [ Hello i&rsquo;m ]
            </p>
            <h1 className="-mt-[15px] w-full text-center font-medium uppercase leading-[0.84] tracking-[-0.07em] text-white mix-blend-overlay text-[clamp(60px,21vw,86px)] md:text-[clamp(72px,10.5vw,180px)] md:leading-[1.1] whitespace-pre-wrap md:whitespace-pre">
              <span
                ref={harveyRef}
                className="inline-block will-change-transform"
              >
                Harvey
              </span>
              {"   "}
              <span
                ref={specterRef}
                className="inline-block will-change-transform"
              >
                Specter
              </span>
            </h1>
          </div>

          <div className="flex w-[min(294px,100%)] flex-col items-start gap-[17px] md:w-[294px]">
            <p className="text-[14px] font-bold italic uppercase leading-[1.1] tracking-[-0.04em] text-[#1f1f1f]">
              H.Studio is a{" "}
              <span className="font-normal italic">full-service</span> creative
              studio creating beautiful digital experiences and products. We
              are an <span className="font-normal italic">award winning</span>{" "}
              design and art group specializing in branding, web design and
              engineering.
            </p>
            <button
              type="button"
              onClick={openModal}
              className="inline-flex items-center justify-center rounded-3xl bg-black px-4 py-3 text-sm font-medium tracking-[-0.04em] text-white transition-[transform,box-shadow,background-color] duration-300 ease-out hover:bg-[#1f1f1f] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] focus-visible:bg-[#1f1f1f] focus-visible:-translate-y-0.5 focus-visible:shadow-[0_12px_28px_-10px_rgba(0,0,0,0.45)] focus-visible:outline-none"
            >
              Let&rsquo;s talk
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
