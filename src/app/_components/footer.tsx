import { LetsTalkButton } from "./lets-talk-button";

function CtaBlock() {
  return (
    <div className="flex w-full flex-col items-start gap-3 md:w-[298px]">
      <p className="text-[24px] uppercase leading-[1.1] tracking-[-0.04em] text-white">
        <span className="font-light italic">Have a </span>
        <span className="font-black not-italic">project</span>
        <span className="font-light italic"> in mind?</span>
      </p>
      <LetsTalkButton variant="outline" />
    </div>
  );
}

const SOCIAL_LINK_CLASS =
  "text-[18px] uppercase leading-[1.1] tracking-[-0.04em] text-white";

export function Footer() {
  return (
    <footer className="w-full bg-black px-4 pt-12 md:px-8 md:pt-12">
      {/* Top section: CTA + social columns + divider */}
      <div className="flex flex-col gap-6 md:gap-12">
        {/* Mobile layout: CTA stacked with 4 social links */}
        <div className="flex flex-col gap-4 md:hidden">
          <CtaBlock />
          <a href="#" className={SOCIAL_LINK_CLASS}>Facebook</a>
          <a href="#" className={SOCIAL_LINK_CLASS}>Instagram</a>
          <a href="#" className={SOCIAL_LINK_CLASS}>x.com</a>
          <a href="#" className={SOCIAL_LINK_CLASS}>Linkedin</a>
        </div>

        {/* Desktop layout: 3 columns */}
        <div className="hidden md:flex md:items-start md:justify-between md:gap-8">
          <CtaBlock />
          <div className={`${SOCIAL_LINK_CLASS} flex w-[298px] flex-col gap-1 text-center`}>
            <a href="#">Facebook</a>
            <a href="#">Instagram</a>
          </div>
          <div className={`${SOCIAL_LINK_CLASS} flex w-[298px] flex-col gap-1 text-right`}>
            <a href="#">x.com</a>
            <a href="#">Linkedin</a>
          </div>
        </div>

        <div aria-hidden className="h-px w-full bg-white/30" />
      </div>

      {/* Bottom section */}
      {/* Mobile */}
      <div className="flex flex-col items-center gap-4 pt-12 md:hidden">
        <div className="flex gap-8 pb-8 text-[12px] uppercase tracking-[-0.04em] text-white">
          <a href="#" className="underline">Licences</a>
          <a href="#" className="underline">Privacy policy</a>
        </div>
        <div className="flex w-full flex-col items-start gap-3 overflow-hidden">
          <p className="font-mono text-[10px] uppercase leading-[1.1] text-white">
            [ Coded By Claude ]
          </p>
          <p className="text-[91px] font-semibold capitalize tracking-[-0.06em] leading-[0.8] text-white">
            H.Studio
          </p>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex md:items-end md:justify-between md:gap-8 md:pt-[120px]">
        <div className="relative flex h-[219px] min-w-0 flex-1 items-end">
          <p
            aria-hidden
            className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-sm uppercase leading-none text-white"
            style={{
              writingMode: "vertical-rl",
              transform: "translateY(-50%) rotate(180deg)",
            }}
          >
            [ Coded By Claude ]
          </p>
          <p className="ml-6 capitalize font-semibold leading-[0.8] tracking-[-0.06em] whitespace-nowrap text-white text-[clamp(160px,21vw,290px)] overflow-hidden">
            H.Studio
          </p>
        </div>

        <div className="flex shrink-0 gap-[34px] pb-8 text-[12px] uppercase tracking-[-0.04em] text-white">
          <a href="#" className="underline">Licences</a>
          <a href="#" className="underline">Privacy policy</a>
        </div>
      </div>
    </footer>
  );
}
