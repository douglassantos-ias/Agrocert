import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary p-10 md:p-16 shadow-elegant">
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl" />

          <div className="relative max-w-2xl text-primary-foreground">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold mb-4">
              Comece hoje
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Sua produção merece chegar<br />ao mercado certo.
            </h2>
            <p className="mt-5 text-lg text-primary-foreground/85 leading-relaxed">
              Cadastre-se gratuitamente. Em poucos minutos sua propriedade estará visível
              para milhares de compradores em todo o Brasil.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold h-12 px-7 text-base font-semibold">
                <Link to="/cadastro">
                  Cadastrar minha produção
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-7 text-base border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/marketplace">Quero comprar</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
