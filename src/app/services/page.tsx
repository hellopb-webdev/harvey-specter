import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { Footer } from "../_components/footer";
import { PhotoBreak } from "../_components/photo-break";
import { StickyFooterReveal } from "../_components/sticky-footer-reveal";
import { Process } from "./_components/process";
import {
  ServiceDetail,
  type ServiceDetailItem,
} from "./_components/service-detail";
import { ServicesHero } from "./_components/services-hero";

export const metadata: Metadata = {
  title: "Services — H.Studio",
  description:
    "Brand discovery, web design and engineering, marketing, and photography from a small Chicago studio.",
};

type ServiceDoc = {
  _id: string;
  title: string | null;
  tagline: string | null;
  body: string | null;
  deliverables: string[] | null;
  image: SanityImageSource | null;
  imagePath: string | null;
  objectPosition: string | null;
};

export default async function ServicesPage() {
  const docs = await client.fetch<ServiceDoc[]>(
    SERVICES_QUERY,
    {},
    { next: { revalidate: 60, tags: ["services"] } },
  );

  const services: ServiceDetailItem[] = docs
    .map((d): ServiceDetailItem | null => {
      const image = d.image
        ? urlFor(d.image).width(1280).height(960).fit("crop").url()
        : d.imagePath ?? null;
      if (!image) return null;
      return {
        _id: d._id,
        title: d.title ?? "",
        tagline: d.tagline ?? "",
        body: d.body ?? "",
        deliverables: d.deliverables ?? [],
        image,
        objectPosition: d.objectPosition ?? undefined,
      };
    })
    .filter((s): s is ServiceDetailItem => s !== null);

  return (
    <StickyFooterReveal footer={<Footer />}>
      <ServicesHero />
      <ServiceDetail services={services} />
      <PhotoBreak />
      <Process />
    </StickyFooterReveal>
  );
}
