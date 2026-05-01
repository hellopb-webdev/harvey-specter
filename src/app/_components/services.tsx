"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-white whitespace-nowrap";

const PARAGRAPH =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

export type ServiceTeaser = {
  _id: string;
  title: string;
  image: string;
  objectPosition?: string;
};

function ArrowIcon() {
  return (
    <svg
      width="32"
      height="32"
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
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: ServiceTeaser;
  index: number;
}) {
  const rowRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      gsap.set(arrowRef.current, { x: -16, opacity: 0 });

      tlRef.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .to(imageRef.current, { scale: 1.1, duration: 0.7 }, 0)
        .to(titleRef.current, { x: 12, skewX: -3, duration: 0.5 }, 0)
        .to(arrowRef.current, { x: 0, opacity: 1, duration: 0.5 }, 0)
        .to(lineRef.current, { scaleX: 1, duration: 0.6 }, 0);
    },
    { scope: rowRef },
  );

  return (
    <article
      ref={rowRef}
      onMouseEnter={() => tlRef.current?.play()}
      onMouseLeave={() => tlRef.current?.reverse()}
      onFocus={() => tlRef.current?.play()}
      onBlur={() => tlRef.current?.reverse()}
      tabIndex={0}
      className="flex flex-col gap-4 outline-none md:gap-[9px]"
    >
      <div className="flex flex-col gap-[9px]">
        <p className={MONO_LABEL}>[ {index + 1} ]</p>
        <div className="relative h-px w-full overflow-hidden bg-white/40">
          <div
            ref={lineRef}
            className="absolute inset-0 origin-left scale-x-0 bg-white"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between lg:gap-6">
        <h3
          ref={titleRef}
          className="flex items-center gap-3 font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-white text-[36px] whitespace-nowrap will-change-transform"
        >
          {service.title}
          <span
            ref={arrowRef}
            aria-hidden
            className="inline-flex shrink-0 will-change-transform"
          >
            <ArrowIcon />
          </span>
        </h3>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
          <p className="font-normal leading-[1.3] tracking-[-0.04em] text-[14px] text-white lg:w-[393px]">
            {PARAGRAPH}
          </p>
          <div className="relative size-[151px] shrink-0 overflow-hidden">
            <div
              ref={imageRef}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={service.image}
                alt=""
                fill
                sizes="151px"
                className="object-cover"
                style={
                  service.objectPosition
                    ? { objectPosition: service.objectPosition }
                    : undefined
                }
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Services({ services }: { services: ServiceTeaser[] }) {
  if (!services.length) return null;

  return (
    <section
      id="services"
      className="w-full bg-black px-4 py-12 md:px-8 md:py-20"
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <p className={MONO_LABEL}>[ services ]</p>

        <div className="flex w-full items-center justify-between font-light uppercase tracking-[-0.08em] leading-none text-white whitespace-nowrap text-[32px] md:text-[clamp(48px,7vw,96px)]">
          <p>[{services.length}]</p>
          <p>Deliverables</p>
        </div>

        <div className="flex flex-col gap-12">
          {services.map((service, idx) => (
            <ServiceRow key={service._id} service={service} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
