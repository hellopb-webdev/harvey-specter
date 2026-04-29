import Image from "next/image";

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-[#1f1f1f] whitespace-nowrap";

const PARAGRAPH = `Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.`;

function Corner({
  position,
}: {
  position: "tl" | "tr" | "bl" | "br";
}) {
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

function BracketedParagraph() {
  return (
    <div className="relative flex-1 px-6 py-3">
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />
      <p className="font-normal leading-[1.3] tracking-[-0.04em] text-[14px] text-[#1f1f1f]">
        {PARAGRAPH}
      </p>
    </div>
  );
}

export function Bio() {
  return (
    <section className="w-full bg-[#fafafa] px-4 py-12 md:px-8 md:py-20">
      {/* Mobile layout */}
      <div className="flex flex-col gap-5 md:hidden">
        <p className={MONO_LABEL}>002</p>
        <p className={MONO_LABEL}>[ About ]</p>
        <BracketedParagraph />
        <div className="relative w-full aspect-[422/594]">
          <Image
            src="/images/bio.png"
            alt="Portrait"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex md:items-start md:justify-between md:gap-8">
        <p className={MONO_LABEL}>[ About ]</p>

        <div className="flex w-full max-w-[983px] items-end gap-8">
          <BracketedParagraph />

          <div className="flex shrink-0 items-start gap-6">
            <p className={MONO_LABEL}>002</p>
            <div className="relative aspect-[436/614] w-[clamp(280px,30vw,436px)]">
              <Image
                src="/images/bio.png"
                alt="Portrait"
                fill
                sizes="(max-width: 1440px) 30vw, 436px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
