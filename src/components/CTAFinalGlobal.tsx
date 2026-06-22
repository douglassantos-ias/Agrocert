import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBasket, Handshake, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTAFinalGlobalProps {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

/**
 * CTA Final padrão do ecossistema AGROCERT-CERRADO.
 * Use no final de TODAS as páginas para manter consistência premium.
 */
export function CTAFinalGlobal({
  eyebrow = "Faça parte do ecossistema",
  title = "O futuro do agro familiar já começou.",
  subtitle = "Conecte produção, confiança e crescimento em uma única plataforma.",
}: CTAFinalGlobalProps) {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-primary p-10 md:p-16 shadow-elegant"
        >
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-primary-glow/40 blur-3xl" />

          <div className="relative max-w-3xl text-primary-foreground">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-gold mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              {eyebrow}
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              {title}
            </h2>
            <p className="mt-5 text-lg text-primary-foreground/90 leading-relaxed max-w-2xl">
              {subtitle}
            </p>

            <div className="mt-9 flex flex-col sm:flex-row flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-gold h-12 px-7 text-base font-semibold rounded-xl transition-all hover:-translate-y-0.5"
              >
                <Link to="/cadastro">
                  Sou produtor
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base rounded-xl border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all hover:-translate-y-0.5"
              >
                <Link to="/marketplace">
                  Quero comprar
                  <ShoppingBasket className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base rounded-xl border-2 border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground transition-all hover:-translate-y-0.5"
              >
                <Link to="/sobre">
                  Ser parceiro
                  <Handshake className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="mt-8 text-xs uppercase tracking-[0.3em] text-primary-foreground/60">
              Confiança também vende · Origem gera valor · Tecnologia para quem produz
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
