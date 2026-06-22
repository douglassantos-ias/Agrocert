import { ReactNode } from "react";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { CTAFinalGlobal } from "./CTAFinalGlobal";

interface ComingSoonProps {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}

export function ComingSoon({ eyebrow, title, description, children }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-32 pb-20 bg-gradient-hero relative">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="relative container mx-auto px-4 max-w-3xl text-center py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-4">
            {eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight">
            {title}
          </h1>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
          {children && <div className="mt-10">{children}</div>}

          <div className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            Módulo em desenvolvimento — disponível na próxima entrega
          </div>
        </div>
      </main>
      <CTAFinalGlobal />
      <SiteFooter />
    </div>
  );
}
