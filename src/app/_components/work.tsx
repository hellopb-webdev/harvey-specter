import Image from "next/image";

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-[#1f1f1f] whitespace-nowrap";

export type WorkProject = {
  _id: string;
  title: string;
  image: string;
  tags: string[];
  size: "tall" | "short";
  href?: string;
};

function ArrowIcon({ className }: { className?: string }) {
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
      className={className}
    >
      <path d="M10 22 L22 10" />
      <path d="M11 10 L22 10 L22 21" />
    </svg>
  );
}

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
      className={`pointer-events-none absolute size-4 border-[#1f1f1f] ${map[position]}`}
    />
  );
}

function ProjectCard({ project }: { project: WorkProject }) {
  const aspectClass =
    project.size === "tall"
      ? "aspect-[343/390] lg:aspect-[676/744]"
      : "aspect-[343/390] lg:aspect-[676/699]";

  return (
    <article className="flex w-full flex-col gap-[10px]">
      <div
        className={`relative isolate w-full overflow-hidden flex flex-col items-start justify-end pb-4 pl-4 ${aspectClass}`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="relative flex items-center gap-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-3xl bg-white/30 px-2 py-1 text-sm font-medium tracking-[-0.04em] text-[#111] backdrop-blur-[10px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex w-full items-center justify-between">
        <h3 className="text-[24px] lg:text-[36px] font-black uppercase tracking-[-0.04em] leading-[1.1] text-black whitespace-nowrap">
          {project.title}
        </h3>
        <ArrowIcon className="text-black" />
      </div>
    </article>
  );
}

function BracketedCTA() {
  return (
    <div className="relative flex flex-col items-start gap-3 px-6 py-4 lg:w-[465px]">
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />
      <p className="font-normal italic leading-[1.3] tracking-[-0.04em] text-[14px] text-[#1f1f1f]">
        Discover how my creativity transforms ideas into impactful digital
        experiences — schedule a call with me to get started.
      </p>
      <a
        href="#contact"
        className="inline-flex items-center justify-center rounded-3xl bg-black px-4 py-3 text-sm font-medium tracking-[-0.04em] text-white"
      >
        Let&rsquo;s talk
      </a>
    </div>
  );
}

export function Work({ projects }: { projects: WorkProject[] }) {
  if (!projects.length) return null;

  const count = String(projects.length).padStart(3, "0");
  const leftColumn = projects.filter((_, i) => i % 2 === 0);
  const rightColumn = projects.filter((_, i) => i % 2 === 1);

  return (
    <section
      id="projects"
      className="w-full bg-[#fafafa] px-4 py-12 md:px-8 md:py-20"
    >
      <div className="flex flex-col gap-8 md:gap-[61px]">
        {/* Header */}
        <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          <p className={`${MONO_LABEL} lg:hidden`}>[ portfolio ]</p>

          <div className="flex w-full items-start justify-between lg:w-auto lg:gap-[10px]">
            <h2 className="font-light uppercase tracking-[-0.08em] leading-[0.86] text-black text-[32px] lg:text-[clamp(48px,7vw,96px)]">
              Selected
              <br />
              Work
            </h2>
            <p className={MONO_LABEL}>{count}</p>
          </div>

          {/* Vertical [ portfolio ] label, desktop only */}
          <div className="hidden lg:flex lg:h-[110px] lg:w-[15px] lg:items-center lg:justify-center">
            <p className={`${MONO_LABEL} -rotate-90`}>[ portfolio ]</p>
          </div>
        </div>

        {/* Projects: single column on mobile, 2-column staggered on desktop */}
        <div className="flex flex-col gap-6 lg:hidden">
          {projects.map((p) => (
            <ProjectCard key={p._id} project={p} />
          ))}
          <BracketedCTA />
        </div>

        <div className="hidden lg:flex lg:items-end lg:gap-6">
          <div className="flex flex-1 flex-col gap-[80px]">
            {leftColumn.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
            <BracketedCTA />
          </div>
          <div className="flex flex-1 flex-col gap-[117px] pt-[240px]">
            {rightColumn.map((p) => (
              <ProjectCard key={p._id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
