import type { Metadata } from "next";
import { Bio } from "../_components/bio";
import { Footer } from "../_components/footer";
import { PhotoBreak } from "../_components/photo-break";
import { StickyFooterReveal } from "../_components/sticky-footer-reveal";
import { AboutHero } from "./_components/about-hero";
import { Approach } from "./_components/approach";
import { Timeline } from "./_components/timeline";

export const metadata: Metadata = {
  title: "About — H.Studio",
  description:
    "Harvey Specter is a Chicago-based creative director, photographer, and full-service studio of one.",
};

export default function AboutPage() {
  return (
    <StickyFooterReveal footer={<Footer />}>
      <AboutHero />
      <Bio />
      <Timeline />
      <PhotoBreak />
      <Approach />
    </StickyFooterReveal>
  );
}
