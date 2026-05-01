import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ALL_PORTFOLIO_QUERY } from "@/sanity/lib/queries";
import { Footer } from "../_components/footer";
import { PhotoBreak } from "../_components/photo-break";
import { StickyFooterReveal } from "../_components/sticky-footer-reveal";
import {
  ProjectsIndex,
  type ProjectIndexItem,
} from "./_components/projects-index";
import { ProjectsHero } from "./_components/projects-hero";

export const metadata: Metadata = {
  title: "Projects — H.Studio",
  description:
    "Selected work from H.Studio — branding, web, and photography projects.",
};

type PortfolioDoc = {
  _id: string;
  title: string | null;
  slug: string | null;
  coverImage: SanityImageSource | null;
  coverImagePath: string | null;
  tags: string[] | null;
  summary: string | null;
  client: string | null;
  year: number | null;
  externalUrl: string | null;
};

export default async function ProjectsPage() {
  const docs = await client.fetch<PortfolioDoc[]>(
    ALL_PORTFOLIO_QUERY,
    {},
    { next: { revalidate: 60, tags: ["portfolio"] } },
  );

  const projects: ProjectIndexItem[] = docs
    .map((p): ProjectIndexItem | null => {
      const image = p.coverImage
        ? urlFor(p.coverImage).width(1280).height(960).fit("crop").url()
        : p.coverImagePath ?? null;
      if (!image) return null;
      const internalHref = p.slug ? `/work/${p.slug}` : null;
      const href = p.externalUrl ?? internalHref;
      return {
        _id: p._id,
        title: p.title ?? "",
        image,
        tags: p.tags ?? [],
        client: p.client ?? null,
        year: p.year ?? null,
        summary: p.summary ?? null,
        href,
        external: Boolean(p.externalUrl),
      };
    })
    .filter((p): p is ProjectIndexItem => p !== null);

  return (
    <StickyFooterReveal footer={<Footer />}>
      <ProjectsHero count={projects.length} />
      <ProjectsIndex projects={projects} />
      <PhotoBreak />
    </StickyFooterReveal>
  );
}
