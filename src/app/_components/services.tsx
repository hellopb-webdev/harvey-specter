import Image from "next/image";

const MONO_LABEL =
  "font-mono text-sm uppercase leading-[1.1] text-white whitespace-nowrap";

const PARAGRAPH =
  "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.";

const SERVICES = [
  { title: "Brand Discovery", image: "/images/service-1.png" },
  { title: "Web design & Dev", image: "/images/service-2.png" },
  { title: "Marketing", image: "/images/service-3.png" },
  {
    title: "Photography",
    image: "/images/service-4.png",
    objectPosition: "center 80%",
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="w-full bg-black px-4 py-12 md:px-8 md:py-20"
    >
      <div className="flex flex-col gap-8 md:gap-12">
        <p className={MONO_LABEL}>[ services ]</p>

        <div className="flex w-full items-center justify-between font-light uppercase tracking-[-0.08em] leading-none text-white whitespace-nowrap text-[32px] md:text-[clamp(48px,7vw,96px)]">
          <p>[4]</p>
          <p>Deliverables</p>
        </div>

        <div className="flex flex-col gap-12">
          {SERVICES.map((service, idx) => (
            <article key={service.title} className="flex flex-col gap-4 md:gap-[9px]">
              <div className="flex flex-col gap-[9px]">
                <p className={MONO_LABEL}>[ {idx + 1} ]</p>
                <div className="h-px w-full bg-white" />
              </div>

              <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-start lg:justify-between lg:gap-6">
                <h3 className="font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-white text-[36px] whitespace-nowrap">
                  {service.title}
                </h3>

                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
                  <p className="font-normal leading-[1.3] tracking-[-0.04em] text-[14px] text-white lg:w-[393px]">
                    {PARAGRAPH}
                  </p>
                  <div className="relative size-[151px] shrink-0 overflow-hidden">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
