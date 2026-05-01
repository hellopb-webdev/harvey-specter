"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-[#1f1f1f] whitespace-nowrap";

export type ServiceDetailItem = {
  _id: string;
  title: string;
  tagline: string;
  body: string;
  deliverables: string[];
  image: string;
  objectPosition?: string;
};

function ServiceRow({
  service,
  index,
}: {
  service: ServiceDetailItem;
  index: number;
}) {
  const rowRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const reverse = index % 2 === 1;

  useGSAP(
    () => {
      gsap.from(imageRef.current, {
        y: 48,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
          once: true,
        },
      });
      gsap.from(copyRef.current, {
        y: 32,
        duration: 0.9,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 80%",
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
      className="flex flex-col gap-6 border-t border-[#1f1f1f] pt-8 md:gap-12 md:pt-12"
    >
      <div className="flex items-end justify-between gap-4">
        <p className={MONO_LABEL}>
          [ {String(index + 1).padStart(3, "0")} ]
        </p>
        <p className={`${MONO_LABEL} text-right`}>[ deliverable ]</p>
      </div>

      <div
        className={`flex flex-col gap-8 md:gap-12 ${
          reverse ? "md:flex-row-reverse" : "md:flex-row"
        } md:items-stretch`}
      >
        <div
          ref={imageRef}
          className="relative aspect-[4/3] w-full overflow-hidden md:flex-1 md:aspect-auto md:min-h-[480px] will-change-transform"
        >
          <Image
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            style={
              service.objectPosition
                ? { objectPosition: service.objectPosition }
                : undefined
            }
          />
        </div>

        <div
          ref={copyRef}
          className="flex flex-col gap-6 md:flex-1 md:justify-between md:py-2 will-change-transform"
        >
          <div className="flex flex-col gap-5">
            <h2 className="font-bold italic uppercase tracking-[-0.04em] leading-[0.95] text-black text-[40px] md:text-[clamp(48px,5.5vw,80px)]">
              {service.title}
            </h2>
            <p className="font-light italic uppercase leading-[1.2] tracking-[-0.04em] text-[#1f1f1f] text-[18px] md:text-[22px]">
              {service.tagline}
            </p>
            <p className="font-normal leading-[1.45] tracking-[-0.04em] text-[14px] text-[#1f1f1f] md:text-[15px] md:max-w-[540px]">
              {service.body}
            </p>
          </div>

          <ul className="flex flex-col">
            {service.deliverables.map((d, i) => (
              <li
                key={d}
                className="flex items-center gap-4 border-t border-[#1f1f1f]/30 py-3 last:border-b"
              >
                <span className="font-mono text-[12px] uppercase tracking-[-0.02em] text-[#1f1f1f]/60 w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] font-medium tracking-[-0.04em] text-black md:text-[16px]">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export function ServiceDetail({ services }: { services: ServiceDetailItem[] }) {
  if (!services.length) return null;

  return (
    <section className="w-full bg-[#fafafa] px-4 py-12 md:px-8 md:py-[120px]">
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-3">
          <p className={MONO_LABEL}>[ 003 — capabilities ]</p>
          <div className="flex w-full items-end justify-between gap-4 font-light uppercase tracking-[-0.08em] leading-none text-black text-[32px] md:text-[clamp(48px,7vw,96px)]">
            <p>What I do</p>
            <p className={`${MONO_LABEL} self-end pb-2`}>
              {String(services.length).padStart(3, "0")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12 md:gap-20">
          {services.map((s, i) => (
            <ServiceRow key={s._id} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
