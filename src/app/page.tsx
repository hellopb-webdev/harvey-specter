import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FEATURED_PORTFOLIO_QUERY } from "@/sanity/lib/queries";
import { About } from "./_components/about";
import { Bio } from "./_components/bio";
import { Footer } from "./_components/footer";
import { Nav } from "./_components/nav";
import { News } from "./_components/news";
import { PhotoBreak } from "./_components/photo-break";
import { Services } from "./_components/services";
import { Testimonials } from "./_components/testimonials";
import type { SanityImageSource } from "@sanity/image-url";
import { Work, type WorkProject } from "./_components/work";

type PortfolioDoc = {
  _id: string;
  title: string | null;
  slug: string | null;
  coverImage: SanityImageSource | null;
  coverImagePath: string | null;
  tags: string[] | null;
  displaySize: "tall" | "short" | null;
  summary: string | null;
  client: string | null;
  year: number | null;
  externalUrl: string | null;
};

export default async function Home() {
  const portfolio = await client.fetch<PortfolioDoc[]>(
    FEATURED_PORTFOLIO_QUERY,
    {},
    { next: { revalidate: 60, tags: ["portfolio"] } },
  );

  const projects: WorkProject[] = portfolio
    .map((p): WorkProject | null => {
      const image = p.coverImage
        ? urlFor(p.coverImage).width(1352).height(1488).fit("crop").url()
        : p.coverImagePath ?? null;
      if (!image) return null;
      return {
        _id: p._id,
        title: p.title ?? "",
        image,
        tags: p.tags ?? [],
        size: p.displaySize ?? "tall",
        href: p.externalUrl ?? (p.slug ? `/work/${p.slug}` : undefined),
      };
    })
    .filter((p): p is WorkProject => p !== null);

  return (
    <>
    <section className="relative isolate w-full overflow-hidden h-[100svh] md:h-[847px]">
      <Image
        src="/images/hero.png"
        alt=""
        fill
        preload
        sizes="100vw"
        className="object-cover object-center"
      />

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
            <p className="px-[18px] font-mono text-sm uppercase leading-[1.1] text-white mix-blend-overlay">
              [ Hello i&rsquo;m ]
            </p>
            <h1 className="-mt-[15px] w-full text-center font-medium uppercase leading-[0.84] tracking-[-0.07em] text-white mix-blend-overlay text-[clamp(60px,21vw,86px)] md:text-[clamp(72px,10.5vw,180px)] md:leading-[1.1] whitespace-pre-wrap md:whitespace-pre">
              {`Harvey   Specter`}
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
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-3xl bg-black px-4 py-3 text-sm font-medium tracking-[-0.04em] text-white"
            >
              Let&rsquo;s talk
            </a>
          </div>
        </div>
      </div>
    </section>

    <About />
    <Bio />
    <PhotoBreak />
    <Services />
    <Work projects={projects} />
    <Testimonials />
    <News />
    <Footer />
    </>
  );
}
