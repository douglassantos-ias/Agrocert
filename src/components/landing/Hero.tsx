import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, ShieldCheck, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-cerrado.jpg";

export function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-primary opacity-20 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-gold opacity-15 blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6 animate-in fade-in slide-in-from-bottom-2">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span>Tecnologia + Agricultura Familiar do Tocantins</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Da terra ao mercado <br />
              <span className="text-gradient">com confiança.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              O AGROCERT-CERRADO conecta pequenos produtores rurais a consumidores, empresas e
              mercados institucionais com{" "}
              <span className="font-semibold text-foreground">certificação digital</span>,{" "}
              <span className="font-semibold text-foreground">rastreabilidade blockchain</span> e{" "}
              <span className="font-semibold text-foreground">inteligência artificial</span>.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-all h-12 px-7 text-base">
                <Link to="/cadastro">
                  Sou produtor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-7 text-base border-2 hover:bg-accent">
                <Link to="/marketplace">Explorar marketplace</Link>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" />
                <span>4 selos de qualidade</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-success" />
                <span>139 municípios atendidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-gold" />
                <span>IA para preço justo</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5] bg-muted">
              <img
                src={heroImg}
                alt="Vista aérea do Cerrado tocantinense ao pôr do sol"
                className="absolute inset-0 h-full w-full object-cover"
                width={1920}
                height={1280}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sidebar/80 via-sidebar/10 to-transparent" />

              <div className="absolute top-4 right-4 glass rounded-2xl p-4 shadow-elegant max-w-[180px]">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Ao vivo</span>
                </div>
                <p className="text-2xl font-display font-bold">+2.847</p>
                <p className="text-xs text-muted-foreground">produtores cadastrados</p>
              </div>

              <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 shadow-elegant">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-5 w-5 text-gold-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">Selo Origem TO</p>
                    <p className="text-sm font-semibold truncate">Sítio Boa Vista — Porto Nacional</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
