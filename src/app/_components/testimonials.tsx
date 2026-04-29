import Image from "next/image";

type Testimonial = {
  author: string;
  quote: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  /** Desktop: % from left of section, % from top, rotation in degrees, behind=render before title */
  desktop: { left: string; top: string; rotate: string; behind?: boolean };
  /** Mobile: rotation in degrees */
  mobileRotate: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    author: "Marko Stojković",
    quote:
      "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.",
    logo: "/images/logo-2.svg",
    logoWidth: 143,
    logoHeight: 19,
    desktop: { left: "7%", top: "16%", rotate: "-6.85deg" },
    mobileRotate: "-3.5deg",
  },
  {
    author: "Lukas Weber",
    quote:
      "Professional, precise, and incredibly fast at handling complex product visualizations and templates.",
    logo: "/images/logo-1.svg",
    logoWidth: 138,
    logoHeight: 19,
    desktop: { left: "47%", top: "18%", rotate: "2.9deg", behind: true },
    mobileRotate: "1.5deg",
  },
  {
    author: "Sarah Jenkins",
    quote:
      "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don’t just make things look good; they solve business problems through visual clarity.",
    logo: "/images/logo-3.svg",
    logoWidth: 109,
    logoHeight: 31,
    desktop: { left: "21%", top: "61%", rotate: "2.23deg" },
    mobileRotate: "-2deg",
  },
  {
    author: "Sofia Martínez",
    quote:
      "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.",
    logo: "/images/logo-4.svg",
    logoWidth: 81,
    logoHeight: 36,
    desktop: { left: "68%", top: "60%", rotate: "-4.15deg" },
    mobileRotate: "2deg",
  },
];

function Card({
  testimonial,
  className,
  style,
  width = "w-[var(--card-w)]",
}: {
  testimonial: Testimonial;
  className?: string;
  style?: React.CSSProperties;
  width?: string;
}) {
  return (
    <div className={className} style={style}>
      <div
        className={`flex ${width} flex-col items-start gap-4 rounded-[4px] border border-[#ddd] bg-[#f1f1f1] p-6`}
      >
        <Image
          src={testimonial.logo}
          alt=""
          width={testimonial.logoWidth}
          height={testimonial.logoHeight}
          className="h-auto w-auto max-h-[36px]"
        />
        <p className="font-normal leading-[1.3] tracking-[-0.04em] text-[18px] text-[#1f1f1f]">
          {testimonial.quote}
        </p>
        <p className="font-black uppercase tracking-[-0.04em] leading-[1.1] text-[16px] text-black whitespace-nowrap">
          {testimonial.author}
        </p>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative w-full overflow-hidden bg-[#fafafa] px-4 py-16 md:px-8 lg:py-[120px]"
      style={{ ["--card-w" as string]: "260px" }}
    >
      {/* Mobile: title + horizontal-scroll cards */}
      <div className="flex flex-col gap-8 lg:hidden">
        <h2 className="text-[clamp(48px,17vw,64px)] font-medium capitalize tracking-[-0.07em] leading-[0.8] text-black">
          Testimonials
        </h2>
        <div className="-mx-4 flex gap-3 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.author}
              testimonial={t}
              className="shrink-0 py-4"
              style={{ transform: `rotate(${t.mobileRotate})` }}
            />
          ))}
        </div>
      </div>

      {/* Desktop: scattered tilted cards behind a giant title */}
      <div
        className="relative hidden lg:block lg:min-h-[860px]"
        style={{ ["--card-w" as string]: "353px" }}
      >
        {TESTIMONIALS.filter((t) => t.desktop.behind).map((t) => (
          <Card
            key={t.author}
            testimonial={t}
            className="absolute"
            style={{
              left: t.desktop.left,
              top: t.desktop.top,
              transform: `rotate(${t.desktop.rotate})`,
            }}
          />
        ))}

        <h2 className="absolute inset-0 flex items-center justify-center font-medium capitalize text-center tracking-[-0.07em] leading-[1.1] text-black text-[clamp(120px,14vw,198px)] pointer-events-none select-none">
          Testimonials
        </h2>

        {TESTIMONIALS.filter((t) => !t.desktop.behind).map((t) => (
          <Card
            key={t.author}
            testimonial={t}
            className="absolute"
            style={{
              left: t.desktop.left,
              top: t.desktop.top,
              transform: `rotate(${t.desktop.rotate})`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
