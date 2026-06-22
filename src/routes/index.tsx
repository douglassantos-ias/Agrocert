import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Hero } from "@/components/landing/Hero";
import { Benefits } from "@/components/landing/Benefits";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FeaturedProducts } from "@/components/landing/FeaturedProducts";
import { Testimonials } from "@/components/landing/Testimonials";
import { CTAFinalGlobal } from "@/components/CTAFinalGlobal";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main>
        <Hero />
        <Benefits />
        <HowItWorks />
        <FeaturedProducts />
        <Testimonials />
        <CTAFinalGlobal />
      </main>
      <SiteFooter />
    </div>
  );
}
