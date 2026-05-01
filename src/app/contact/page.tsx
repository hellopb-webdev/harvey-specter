import type { Metadata } from "next";
import { Footer } from "../_components/footer";
import { StickyFooterReveal } from "../_components/sticky-footer-reveal";
import { ContactDetails } from "./_components/contact-details";
import { ContactForm } from "./_components/contact-form";
import { ContactHero } from "./_components/contact-hero";

export const metadata: Metadata = {
  title: "Contact — H.Studio",
  description:
    "Start a project with H.Studio — drop a note and I'll write back the same week.",
};

export default function ContactPage() {
  return (
    <StickyFooterReveal footer={<Footer />}>
      <ContactHero />
      <ContactDetails />
      <ContactForm />
    </StickyFooterReveal>
  );
}
