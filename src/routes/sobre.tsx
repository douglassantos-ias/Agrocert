import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Leaf,
  Link2,
  ShoppingBasket,
  QrCode,
  Brain,
  Target,
  Eye,
  Heart,
  TrendingDown,
  EyeOff,
  Award,
  Wifi,
  Smartphone,
  Coins,
  Tractor,
  Users,
  Store,
  UtensilsCrossed,
  Landmark,
  Handshake,
  MapPin,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTAFinalGlobal } from "@/components/CTAFinalGlobal";
import { Button } from "@/components/ui/button";
import { SeloBadge } from "@/components/selos/SeloBadge";
import { SELOS } from "@/data/selos";
import heroSobre from "@/assets/sobre-hero.jpg";
import familia from "@/assets/familia-tres-geracoes.jpg";
import fazenda from "@/assets/fazenda-aerea.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — AGROCERT-CERRADO | Tecnologia a serviço de quem produz" },
      {
        name: "description",
        content:
          "A AGROCERT-CERRADO fortalece a agricultura familiar do Tocantins com certificação digital, rastreabilidade blockchain e marketplace direto. Conheça nosso propósito, impacto e ecossistema.",
      },
      { property: "og:title", content: "AGROCERT-CERRADO — Tecnologia a serviço de quem produz" },
      {
        property: "og:description",
        content:
          "Plataforma nacional de certificação inteligente, rastreabilidade blockchain e valorização da agricultura familiar.",
      },
      { property: "og:image", content: heroSobre },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroSobre },
    ],
  }),
  component: SobrePage,
});

/* ------------------------------ helpers ----------------------------------- */

function useCountUp(target: number, duration = 1800, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const v = useCountUp(to, 1800, inView);
  return (
    <span ref={ref}>
      {prefix}
      {v.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

/* --------------------------------- page ----------------------------------- */

function SobrePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Proposito />
        <Problema />
        <ComoFunciona />
        <RecursoQR />
        <Impacto />
        <ParaQuem />
        <Parceiros />
        <Manifesto />
        <CTAFinal />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ------------------------------- 1. Hero ---------------------------------- */

function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-primary opacity-20 blur-3xl" />
      <div className="absolute -bottom-40 -left-32 h-[450px] w-[450px] rounded-full bg-gold opacity-15 blur-3xl" />

      <div className="relative container mx-auto px-4">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span>Sobre o projeto AGROCERT-CERRADO</span>
            </div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Tecnologia a serviço <br />
              <span className="text-gradient">de quem produz.</span>
            </h1>

            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              A AGROCERT-CERRADO fortalece a agricultura familiar conectando produtores ao
              mercado com{" "}
              <span className="font-semibold text-foreground">certificação digital</span>,{" "}
              <span className="font-semibold text-foreground">rastreabilidade blockchain</span>{" "}
              e <span className="font-semibold text-foreground">valorização regional</span>.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-all h-12 px-7 text-base"
              >
                <Link to="/cadastro">
                  Sou produtor
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 px-7 text-base border-2 hover:bg-accent"
              >
                <Link to="/marketplace">Quero comprar</Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-12 px-7 text-base">
                <a href="#parceiros">
                  Ser parceiro
                  <Handshake className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-success" />
                <span>Certificação oficial</span>
              </div>
              <div className="flex items-center gap-2">
                <Link2 className="h-4 w-4 text-success" />
                <span>Blockchain auditável</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-success" />
                <span>139 municípios do TO</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5] bg-muted">
              <img
                src={heroSobre}
                alt="Produtor rural utilizando smartphone na lavoura ao pôr do sol"
                className="absolute inset-0 h-full w-full object-cover"
                width={1080}
                height={1600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sidebar/85 via-sidebar/10 to-transparent" />

              <div className="absolute top-4 left-4 glass rounded-2xl p-3 shadow-elegant flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="text-[10px] uppercase tracking-wider font-bold">
                  Plataforma ativa
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 shadow-elegant">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
                    <Award className="h-5 w-5 text-gold-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                      Selo AGROCERT
                    </p>
                    <p className="text-sm font-semibold truncate">
                      Origem verificada · Tocantins
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 2. Propósito --------------------------------- */

const propositos = [
  {
    icon: Target,
    titulo: "Missão",
    texto:
      "Fortalecer pequenos produtores por meio da tecnologia, ampliando renda, visibilidade e acesso ao mercado.",
    accent: "primary" as const,
  },
  {
    icon: Eye,
    titulo: "Visão",
    texto:
      "Ser a principal plataforma brasileira de certificação e comercialização da agricultura familiar.",
    accent: "gold" as const,
  },
  {
    icon: Heart,
    titulo: "Valores",
    texto: "Transparência · Sustentabilidade · Inclusão · Inovação · Valorização regional.",
    accent: "primary" as const,
  },
];

function Proposito() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Nosso propósito
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Construído para <span className="text-gradient">durar gerações</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {propositos.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.titulo}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group relative rounded-3xl p-8 bg-card border border-border hover:border-primary/40 hover:shadow-elegant transition-all"
              >
                <div
                  className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                    p.accent === "gold"
                      ? "bg-gradient-gold text-gold-foreground shadow-gold"
                      : "bg-gradient-primary text-primary-foreground shadow-elegant"
                  }`}
                >
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3">{p.titulo}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.texto}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- 3. Problema --------------------------------- */

const dores = [
  { icon: Users, title: "Dependência de atravessadores", desc: "Margens reduzidas e preço imposto." },
  { icon: EyeOff, title: "Baixa visibilidade", desc: "Produção excelente, mercado invisível." },
  { icon: Award, title: "Certificação pouco valorizada", desc: "Selos sem reconhecimento real." },
  { icon: ShoppingBasket, title: "Dificuldade de vender online", desc: "Sem canal direto e estruturado." },
  { icon: Wifi, title: "Pouca tecnologia no campo", desc: "Distância digital entre produtor e consumidor." },
  { icon: TrendingDown, title: "Margem de lucro reduzida", desc: "Trabalho intenso, retorno injusto." },
];

const solucoes = [
  "Marketplace direto produtor → consumidor",
  "Selos AGROCERT com QR Code reconhecido",
  "Rastreabilidade blockchain auditável",
  "IA para precificação justa e demanda",
  "Página pública com a história do produto",
  "Acesso a editais, governo e grandes redes",
];

function Problema() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            O problema que resolvemos
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            O pequeno produtor produz muito valor.{" "}
            <span className="text-gradient">O mercado nem sempre reconhece.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {dores.map((d, i) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.title}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-2xl p-5 bg-card border border-border hover:border-destructive/40 transition-colors"
                >
                  <div className="h-10 w-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center mb-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold mb-1">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl p-8 md:p-10 bg-gradient-primary text-primary-foreground shadow-elegant overflow-hidden"
          >
            <div className="absolute inset-0 grid-pattern opacity-15" />
            <div className="absolute -top-16 -right-16 h-60 w-60 rounded-full bg-gold/30 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/15 text-xs font-semibold mb-4">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                A solução AGROCERT
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-6 leading-tight">
                Uma plataforma. Toda a cadeia valorizada.
              </h3>
              <ul className="space-y-3">
                {solucoes.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                    <span className="text-primary-foreground/95">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 4. Como funciona ----------------------------- */

const recursos = [
  {
    icon: Award,
    emoji: "🌱",
    title: "Certificação Inteligente",
    desc: "Selos digitais que valorizam produtos com critérios técnicos auditáveis.",
  },
  {
    icon: Link2,
    emoji: "⛓",
    title: "Blockchain",
    desc: "Rastreabilidade confiável: cada lote registrado com hash imutável.",
  },
  {
    icon: ShoppingBasket,
    emoji: "🛒",
    title: "Marketplace",
    desc: "Venda direta ao consumidor, supermercados e redes institucionais.",
  },
  {
    icon: QrCode,
    emoji: "📲",
    title: "QR Code de Origem",
    desc: "O consumidor escaneia e conhece o rosto, o lugar e a história.",
  },
  {
    icon: Brain,
    emoji: "🤖",
    title: "IA Integrada",
    desc: "Previsão de demanda, sugestão de preço e inteligência comercial.",
  },
];

function ComoFunciona() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Como funciona
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Cinco tecnologias. <span className="text-gradient">Um único ecossistema.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {recursos.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-3xl p-7 bg-card border border-border hover:border-primary/40 hover:shadow-elegant transition-all"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-primary text-primary-foreground shadow-elegant flex items-center justify-center transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl" aria-hidden>
                    {r.emoji}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{r.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 5. Recurso QR -------------------------------- */

function RecursoQR() {
  const selosPreview = SELOS.slice(0, 4);
  return (
    <section className="py-20 md:py-28 bg-secondary/40 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            transition={{ duration: 0.7 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Recurso premium
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight leading-tight">
              Conheça a <span className="text-gradient">origem do seu produto</span>.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Escaneie o QR Code e descubra quem produziu, onde foi cultivado, como foi
              produzido e quais selos de qualidade conquistou. Do campo ao consumidor com
              rosto, história e confiança.
            </p>

            <div className="mt-7 grid grid-cols-2 gap-3">
              {[
                { icon: Smartphone, label: "Foto do produtor" },
                { icon: MapPin, label: "Mapa da fazenda" },
                { icon: PlayCircle, label: "Vídeo da família" },
                { icon: ShieldCheck, label: "Selos validados" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-xl bg-card border border-border px-4 py-3">
                  <Icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow">
                <Link to="/origem">Ver demonstração</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2">
                <Link to="/historias/sitio-boa-esperanca">Ler uma história</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto"
          >
            {/* Phone mockup */}
            <div className="relative mx-auto w-[280px] sm:w-[320px] aspect-[9/19] rounded-[3rem] bg-sidebar p-3 shadow-elegant ring-1 ring-border">
              <div className="absolute top-3 left-1/2 -translate-x-1/2 h-6 w-32 bg-sidebar rounded-b-2xl z-20" />
              <div className="relative h-full w-full rounded-[2.4rem] overflow-hidden bg-background">
                <div className="relative h-1/2 w-full">
                  <img
                    src={familia}
                    alt="Família produtora rural"
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <div className="glass rounded-full px-2.5 py-1 flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Verificado</span>
                    </div>
                    <div className="glass rounded-full p-1.5">
                      <QrCode className="h-3 w-3" />
                    </div>
                  </div>
                </div>
                <div className="p-4 -mt-10 relative">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gold">
                    Sítio Boa Esperança
                  </p>
                  <h4 className="font-display text-base font-bold leading-tight mt-1">
                    Banana Orgânica · Lote #BNA-0421
                  </h4>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Porto Nacional · TO</span>
                  </div>

                  <div className="mt-3 flex justify-between">
                    {selosPreview.map((s) => (
                      <SeloBadge key={s.id} selo={s} size="sm" />
                    ))}
                  </div>

                  <div className="mt-3 rounded-xl bg-secondary/60 p-2.5 border border-border">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-success">
                      <Link2 className="h-2.5 w-2.5" />
                      Blockchain confirmado
                    </div>
                    <p className="mt-1 text-[9px] font-mono text-muted-foreground truncate">
                      0x8a4f…c21e9b
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* floating chips */}
            <div className="hidden md:block absolute -left-6 top-12 glass rounded-2xl p-3 shadow-elegant">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-gold" />
                <span className="text-xs font-semibold">4 selos ativos</span>
              </div>
            </div>
            <div className="hidden md:block absolute -right-6 bottom-16 glass rounded-2xl p-3 shadow-elegant">
              <div className="flex items-center gap-2">
                <Heart className="h-4 w-4 text-destructive" />
                <span className="text-xs font-semibold">+2.847 escaneamentos</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- 6. Impacto --------------------------------- */

const impactos = [
  { value: 38, suffix: "%", label: "+ renda média ao produtor" },
  { value: 100, suffix: "%", label: "transparência rastreável" },
  { value: 139, suffix: "", label: "municípios alcançados" },
  { value: 2847, suffix: "", label: "produtores cadastrados" },
  { value: 18, suffix: "k", label: "consumidores conectados" },
  { value: 92, suffix: "%", label: "satisfação verificada" },
];

function Impacto() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-60" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="relative container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Impacto gerado
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Resultados que <span className="text-gradient">transformam o agro regional</span>.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {impactos.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="rounded-3xl p-6 md:p-8 bg-card border border-border hover:shadow-elegant transition-shadow text-center"
            >
              <p className="font-display text-4xl md:text-5xl font-bold text-gradient leading-none">
                <Counter to={m.value} suffix={m.suffix} prefix="+" />
              </p>
              <p className="mt-3 text-sm md:text-base text-muted-foreground leading-snug">
                {m.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- 7. Para quem -------------------------------- */

const publicos = [
  { icon: Tractor, emoji: "👨‍🌾", title: "Produtores Rurais", desc: "Venda direta, renda justa e visibilidade nacional." },
  { icon: ShoppingBasket, emoji: "🛒", title: "Consumidores", desc: "Alimentos com origem, qualidade e história." },
  { icon: Store, emoji: "🏬", title: "Supermercados", desc: "Sortimento certificado e regional confiável." },
  { icon: UtensilsCrossed, emoji: "🍽", title: "Restaurantes", desc: "Ingredientes premium com selo de origem." },
  { icon: Landmark, emoji: "🏛", title: "Governo", desc: "Política pública mensurável com dados reais." },
  { icon: Handshake, emoji: "🤝", title: "Parceiros", desc: "Cooperativas, ONGs, universidades e investidores." },
];

function ParaQuem() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Para quem é
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Uma plataforma. <span className="text-gradient">Seis públicos beneficiados.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {publicos.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group rounded-3xl p-7 bg-card border border-border hover:border-primary/40 hover:shadow-elegant transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-primary text-primary-foreground flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl" aria-hidden>
                    {p.emoji}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 8. Parceiros --------------------------------- */

const parceiros = [
  { sigla: "IFTO", nome: "Instituto Federal do Tocantins" },
  { sigla: "UFT", nome: "Universidade Federal do Tocantins" },
  { sigla: "SEBRAE", nome: "Serviço Brasileiro de Apoio" },
  { sigla: "GOV·TO", nome: "Governo do Tocantins" },
  { sigla: "COOP", nome: "Cooperativas regionais" },
  { sigla: "EMBRAPA", nome: "Pesquisa Agropecuária" },
];

function Parceiros() {
  return (
    <section id="parceiros" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Parceiros e ecossistema
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Construído em <span className="text-gradient">parceria institucional</span>.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprometidos com inovação, ciência e desenvolvimento regional do Cerrado.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {parceiros.map((p, i) => (
            <motion.div
              key={p.sigla}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group aspect-[4/3] rounded-2xl bg-card border border-border flex flex-col items-center justify-center p-4 hover:border-primary/40 hover:shadow-elegant transition-all"
            >
              <div className="font-display text-xl md:text-2xl font-bold text-gradient">
                {p.sigla}
              </div>
              <p className="mt-1 text-[10px] md:text-xs text-muted-foreground text-center leading-tight">
                {p.nome}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- 9. Manifesto --------------------------------- */

function Manifesto() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-sidebar text-sidebar-foreground p-10 md:p-20 shadow-elegant"
        >
          <img
            src={fazenda}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-sidebar via-sidebar/90 to-sidebar/70" />
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />

          <div className="relative max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold mb-6">
              Manifesto AGROCERT
            </p>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-bold leading-[1.15] tracking-tight">
              Acreditamos que quem{" "}
              <span className="text-gold">produz alimento</span> merece reconhecimento,
              renda justa e <span className="text-gold">acesso ao futuro</span>.
            </p>
            <div className="mt-10 flex items-center gap-3">
              <div className="h-px flex-1 max-w-[60px] bg-gold/60" />
              <span className="text-xs uppercase tracking-[0.25em] text-sidebar-foreground/70">
                Do campo ao consumidor com rosto, história e confiança
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- 10. CTA Final -------------------------------- */

function CTAFinal() {
  return (
    <CTAFinalGlobal
      eyebrow="Junte-se à transformação"
      title="O futuro do agro familiar já começou."
      subtitle="Produtores, consumidores e parceiros constroem juntos o futuro da agricultura familiar brasileira. Seu lugar nessa rede começa agora."
    />
  );
}
