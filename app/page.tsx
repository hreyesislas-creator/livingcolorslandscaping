import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { StatsBand } from "@/components/stats-band";
import { Services } from "@/components/services";
import { BeforeAfter } from "@/components/before-after";
import { QuoteSection } from "@/components/quote-section";
import { Process } from "@/components/process";
import { Areas } from "@/components/areas";
import { Testimonials } from "@/components/testimonials";
import { Faq } from "@/components/faq";
import { FinalCta } from "@/components/final-cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StatsBand />
      <Services />
      <BeforeAfter />
      <QuoteSection />
      <Process />
      <Areas />
      <Testimonials />
      <Faq />
      <FinalCta />
    </>
  );
}
