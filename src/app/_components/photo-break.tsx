"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function PhotoBreak() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        imageRef.current,
        { filter: "blur(16px)" },
        {
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "center center",
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
      className="relative w-full overflow-hidden aspect-[375/565] md:aspect-[1440/900]"
    >
      <div
        ref={imageRef}
        className="absolute inset-0 will-change-[filter]"
      >
        <Image
          src="/images/photo-break.png"
          alt="Harvey shooting with a Nikon DSLR"
          fill
          sizes="100vw"
          className="object-cover object-[68%_center] md:object-center"
        />
      </div>
    </section>
  );
}
