"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-[#1f1f1f] whitespace-nowrap";

export type ProjectIndexItem = {
  _id: string;
  title: string;
  image: string;
  tags: string[];
  client: string | null;
  year: number | null;
  summary: string | null;
  href: string | null;
  external: boolean;
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

function ProjectRow({
  project,
  index,
}: {
  project: ProjectIndexItem;
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

  const meta = [project.client, project.year ? String(project.year) : null]
    .filter(Boolean)
    .join(" — ");

  const TitleTag = project.href ? "a" : "h2";
  const titleProps = project.href
    ? {
        href: project.href,
        target: project.external ? "_blank" : undefined,
        rel: project.external ? "noopener noreferrer" : undefined,
        className:
          "group inline-flex items-center gap-3 font-bold italic uppercase tracking-[-0.04em] leading-[0.95] text-black text-[40px] md:text-[clamp(48px,5.5vw,80px)] transition-transform duration-300 ease-out hover:translate-x-1 focus-visible:translate-x-1 focus-visible:outline-none",
      }
    : {
        className:
          "font-bold italic uppercase tracking-[-0.04em] leading-[0.95] text-black text-[40px] md:text-[clamp(48px,5.5vw,80px)]",
      };

  return (
    <article
      ref={rowRef}
      className="flex flex-col gap-6 border-t border-[#1f1f1f] pt-8 md:gap-12 md:pt-12"
    >
      <div className="flex items-end justify-between gap-4">
        <p className={MONO_LABEL}>
          [ {String(index + 1).padStart(3, "0")} ]
        </p>
        <p className={`${MONO_LABEL} text-right`}>
          [ {project.year ?? "—"} ]
        </p>
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
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div
          ref={copyRef}
          className="flex flex-col gap-6 md:flex-1 md:justify-between md:py-2 will-change-transform"
        >
          <div className="flex flex-col gap-5">
            <TitleTag {...titleProps}>
              {project.title}
              {project.href && (
                <span aria-hidden className="inline-flex shrink-0 transition-transform duration-300 ease-out group-hover:rotate-12 group-focus-visible:rotate-12">
                  <ArrowIcon />
                </span>
              )}
            </TitleTag>

            {meta && (
              <p className="font-light italic uppercase leading-[1.2] tracking-[-0.04em] text-[#1f1f1f] text-[18px] md:text-[22px]">
                {meta}
              </p>
            )}

            {project.summary && (
              <p className="font-normal leading-[1.45] tracking-[-0.04em] text-[14px] text-[#1f1f1f] md:text-[15px] md:max-w-[540px]">
                {project.summary}
              </p>
            )}
          </div>

          {project.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-3xl border border-[#1f1f1f]/30 px-3 py-1 text-[13px] font-medium tracking-[-0.04em] text-[#1f1f1f]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
}

export function ProjectsIndex({ projects }: { projects: ProjectIndexItem[] }) {
  if (!projects.length) return null;

  return (
    <section
      id="projects"
      className="w-full bg-[#fafafa] px-4 py-12 md:px-8 md:py-[120px]"
    >
      <div className="flex flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-3">
          <p className={MONO_LABEL}>[ 004 — index ]</p>
          <div className="flex w-full items-end justify-between gap-4 font-light uppercase tracking-[-0.08em] leading-none text-black text-[32px] md:text-[clamp(48px,7vw,96px)]">
            <p>Selected work</p>
            <p className={`${MONO_LABEL} self-end pb-2`}>
              {String(projects.length).padStart(3, "0")}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12 md:gap-20">
          {projects.map((p, i) => (
            <ProjectRow key={p._id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
