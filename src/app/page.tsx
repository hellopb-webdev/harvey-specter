import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { FEATURED_PORTFOLIO_QUERY, SERVICES_QUERY } from "@/sanity/lib/queries";
import { About } from "./_components/about";
import { Bio } from "./_components/bio";
import { Footer } from "./_components/footer";
import { Hero } from "./_components/hero";
import { News } from "./_components/news";
import { PhotoBreak } from "./_components/photo-break";
import { Services, type ServiceTeaser } from "./_components/services";
import { StickyFooterReveal } from "./_components/sticky-footer-reveal";
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

type ServiceDoc = {
  _id: string;
  title: string | null;
  image: SanityImageSource | null;
  imagePath: string | null;
  objectPosition: string | null;
};

export default async function Home() {
  const [portfolio, serviceDocs] = await Promise.all([
    client.fetch<PortfolioDoc[]>(
      FEATURED_PORTFOLIO_QUERY,
      {},
      { next: { revalidate: 60, tags: ["portfolio"] } },
    ),
    client.fetch<ServiceDoc[]>(
      SERVICES_QUERY,
      {},
      { next: { revalidate: 60, tags: ["services"] } },
    ),
  ]);

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

  const services: ServiceTeaser[] = serviceDocs
    .map((s): ServiceTeaser | null => {
      const image = s.image
        ? urlFor(s.image).width(640).height(640).fit("crop").url()
        : s.imagePath ?? null;
      if (!image) return null;
      return {
        _id: s._id,
        title: s.title ?? "",
        image,
        objectPosition: s.objectPosition ?? undefined,
      };
    })
    .filter((s): s is ServiceTeaser => s !== null);

  return (
    <StickyFooterReveal footer={<Footer />}>
      <Hero />
      <About />
      <Bio />
      <PhotoBreak />
      <Services services={services} />
      <Work projects={projects} />
      <Testimonials />
      <News />
    </StickyFooterReveal>
  );
}
