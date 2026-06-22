import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Database,
  Brain,
  Handshake,
  TrendingUp,
  Tractor,
  Sprout,
  Sun,
  Truck,
  Leaf,
  ShieldCheck,
  Lock,
  FileCheck2,
  KeyRound,
  Gauge,
  CheckCircle2,
  Star,
  Users,
  Wallet,
  Calculator,
  ArrowUpRight,
  Zap,
  Landmark,
  Award,
  Megaphone,
  Building2,
  Lightbulb,
  GraduationCap,
  PlayCircle,
  BookOpen,
  ListChecks,
  CalendarClock,
  Filter as FilterIcon,
  PiggyBank,
  Banknote,
  Globe2,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTAFinalGlobal } from "@/components/CTAFinalGlobal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroImg from "@/assets/oportunidades-hero.jpg";

export const Route = createFileRoute("/oportunidades")({
  head: () => ({
    meta: [
      { title: "Oportunidades Financeiras — AGROCERT-CERRADO" },
      {
        name: "description",
        content:
          "Conectamos pequenos produtores rurais a oportunidades financeiras adequadas ao seu perfil produtivo. Mais que crédito — oportunidades para crescer.",
      },
      { property: "og:title", content: "Oportunidades Financeiras — AGROCERT-CERRADO" },
      {
        property: "og:description",
        content:
          "Use seus dados reais de produção, vendas e reputação para acessar bancos, cooperativas e fintechs rurais parceiras.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: OportunidadesPage,
});

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                   */
/* -------------------------------------------------------------------------- */

function useCountUp(target: number, duration = 1600, start = false) {
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

/* -------------------------------------------------------------------------- */
/*                                  Page                                      */
/* -------------------------------------------------------------------------- */

function OportunidadesPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-24">
        <Hero />
        <ComoFunciona />
        <Oportunidades />
        <ScoreSection />
        <RadarEditais />
        <Simulador />
        <Parceiros />
        <Beneficios />
        <EducacaoFinanceira />
        <Seguranca />
        <Microcopy />
        <CTAFinal />
      </main>
      <SiteFooter />
    </div>
  );
}

/* -------------------------------- HERO ----------------------------------- */

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 grid-pattern opacity-[0.35] pointer-events-none" />
      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-primary mb-6">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              Crédito, editais, incentivos e inteligência para crescer.
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              Seu trabalho pode abrir{" "}
              <span className="text-gradient">novas oportunidades financeiras.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Crédito, editais, incentivos e dados inteligentes para ajudar produtores rurais
              a crescer com mais segurança.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-shadow"
                asChild
              >
                <a href="#oportunidades">
                  Ver oportunidades
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#simulador">
                  <Calculator className="h-4 w-4" />
                  Simular perfil
                </a>
              </Button>
            </div>

            {/* Trust badges */}
            <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <li className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Dados protegidos
              </li>
              <li className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Sem custo inicial
              </li>
              <li className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Oportunidades públicas e privadas
              </li>
            </ul>

            <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
              <MiniStat label="Score médio" value="74/100" />
              <MiniStat label="Parceiros" value="12+" />
              <MiniStat label="Editais ativos" value="9" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
            <div className="relative rounded-3xl overflow-hidden shadow-elegant ring-1 ring-border">
              <img
                src={heroImg}
                alt="Produtor rural usando smartphone com dashboard financeiro AGROCERT"
                width={1536}
                height={1024}
                className="w-full h-auto"
              />
            </div>
            {/* Floating glass card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute -bottom-6 -left-4 md:-left-10 glass rounded-2xl p-4 shadow-elegant w-64"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground">
                  <Gauge className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Score AGROCERT</p>
                  <p className="font-display font-bold text-lg leading-tight">78 / 100</p>
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "78%" }}
                  transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-gold"
                />
              </div>
              <p className="mt-2 text-[11px] text-success font-medium">
                ✓ Alta elegibilidade
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl glass p-3">
      <p className="font-display font-bold text-lg text-primary">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}

/* ----------------------------- COMO FUNCIONA ----------------------------- */

const STEPS = [
  {
    icon: Database,
    title: "Dados Reais",
    desc: "Seu histórico produtivo gera credibilidade.",
  },
  {
    icon: Brain,
    title: "Perfil Inteligente",
    desc: "IA identifica oportunidades aderentes ao seu momento.",
  },
  {
    icon: Handshake,
    title: "Conexão com Parceiros",
    desc: "Bancos, cooperativas e programas públicos.",
  },
  {
    icon: TrendingUp,
    title: "Crescimento Sustentável",
    desc: "Linhas e incentivos para evoluir com segurança.",
  },
];

function ComoFunciona() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Como funciona"
          title="Inteligência aplicada ao agro familiar"
          subtitle="Quatro etapas que transformam seu histórico em oportunidades reais."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.08 }}
              className="group relative rounded-2xl border bg-card p-6 hover:shadow-elegant transition-all hover:-translate-y-1"
            >
              <div className="absolute top-4 right-5 font-display text-5xl font-bold text-primary/5 group-hover:text-primary/10 transition-colors">
                0{i + 1}
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-primary text-primary-foreground grid place-items-center shadow-elegant">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- OPORTUNIDADES ------------------------------- */

const OPORTS = [
  {
    icon: Tractor,
    title: "Crédito para Equipamentos",
    desc: "Tratores, irrigação, máquinas leves.",
    tag: "Investimento",
    perfil: "Produtor com fluxo recorrente",
    prazo: "Até 8 anos",
    gradient: "from-emerald-600/90 to-emerald-700",
  },
  {
    icon: Sprout,
    title: "Capital de Giro Rural",
    desc: "Compra de insumos, safra e operação.",
    tag: "Operação",
    perfil: "Pequenos e médios produtores",
    prazo: "Até 24 meses",
    gradient: "from-green-600/90 to-green-700",
  },
  {
    icon: Sun,
    title: "Energia Solar Rural",
    desc: "Financiamento sustentável e eficiente.",
    tag: "Sustentável",
    perfil: "Propriedades com alto consumo",
    prazo: "Até 10 anos",
    gradient: "from-amber-500/90 to-amber-600",
  },
  {
    icon: Truck,
    title: "Logística e Transporte",
    desc: "Veículos utilitários e refrigeração.",
    tag: "Escoamento",
    perfil: "Produtores com escoamento direto",
    prazo: "Até 6 anos",
    gradient: "from-stone-600/90 to-stone-700",
  },
  {
    icon: Users,
    title: "Mulheres no Campo",
    desc: "Linhas especiais para liderança feminina rural.",
    tag: "Inclusão",
    perfil: "Mulheres titulares ou gestoras",
    prazo: "Variável por programa",
    gradient: "from-rose-500/90 to-rose-600",
  },
  {
    icon: Leaf,
    title: "Crédito Verde",
    desc: "Produção sustentável e carbono consciente.",
    tag: "ESG",
    perfil: "Produtores com práticas sustentáveis",
    prazo: "Até 12 anos",
    gradient: "from-teal-600/90 to-teal-700",
  },
  {
    icon: Landmark,
    title: "Incentivos Públicos",
    desc: "Programas estaduais, federais e municipais.",
    tag: "Público",
    perfil: "Agricultura familiar e cooperativas",
    prazo: "Conforme edital vigente",
    gradient: "from-blue-700/90 to-indigo-800",
  },
  {
    icon: Award,
    title: "Recursos Não Reembolsáveis",
    desc: "Editais, subvenções, apoio técnico e inovação.",
    tag: "Subvenção",
    perfil: "Projetos de inovação e impacto",
    prazo: "Janelas anuais e contínuas",
    gradient: "from-violet-600/90 to-fuchsia-700",
  },
];

function Oportunidades() {
  return (
    <section id="oportunidades" className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Oportunidades disponíveis"
          title="Linhas adequadas ao seu momento"
          subtitle="Crédito, incentivos públicos e recursos não reembolsáveis conectados pela plataforma — cada um adaptado ao perfil do produtor."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {OPORTS.map((o, i) => (
            <motion.div
              key={o.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.06 }}
              className="group relative rounded-2xl overflow-hidden border bg-card hover:shadow-elegant transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className={`relative h-32 bg-gradient-to-br ${o.gradient} overflow-hidden`}>
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <span className="absolute top-4 left-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur ring-1 ring-white/20">
                  <o.icon className="h-6 w-6 text-white" strokeWidth={1.75} />
                </span>
                <span className="absolute top-4 right-5 text-[10px] font-semibold uppercase tracking-wider text-white/90 bg-white/15 backdrop-blur px-2 py-1 rounded-full">
                  {o.tag}
                </span>
                <o.icon className="absolute -bottom-4 -right-4 h-24 w-24 text-white/10" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-lg">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.desc}</p>

                <dl className="mt-4 space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <dt className="text-muted-foreground/80 min-w-16">Perfil:</dt>
                    <dd className="font-medium text-foreground/90">{o.perfil}</dd>
                  </div>
                  <div className="flex items-start gap-2">
                    <dt className="text-muted-foreground/80 min-w-16">Prazo:</dt>
                    <dd className="font-medium text-foreground/90">{o.prazo}</dd>
                  </div>
                </dl>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all self-start"
                >
                  Saber mais
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ SCORE ------------------------------------ */

function ScoreSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const score = useCountUp(78, 1600, inView);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const factors = [
    { label: "Vendas realizadas", value: 92 },
    { label: "Reputação dos clientes", value: 88 },
    { label: "Tempo ativo", value: 70 },
    { label: "Selos conquistados", value: 75 },
    { label: "Regularidade produtiva", value: 82 },
    { label: "Recompra de clientes", value: 65 },
  ];

  return (
    <section className="py-24 md:py-32" ref={ref}>
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Seu Perfil AGROCERT"
          title="Quanto melhor seu desempenho, maiores as oportunidades"
          subtitle="Quanto melhor seu desempenho na plataforma, maiores podem ser suas oportunidades. Vendas consistentes, boa reputação, selos ativos, tempo de atividade e recompra fortalecem seu perfil."
        />

        <div className="mt-14 grid lg:grid-cols-2 gap-10 items-center">
          {/* Gauge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative rounded-3xl glass p-10 shadow-elegant"
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <svg width="220" height="220" className="-rotate-90">
                  <circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="14"
                    className="text-muted"
                  />
                  <motion.circle
                    cx="110"
                    cy="110"
                    r={radius}
                    fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={inView ? { strokeDashoffset: offset } : {}}
                    transition={{ duration: 1.6, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="oklch(0.42 0.11 150)" />
                      <stop offset="60%" stopColor="oklch(0.62 0.18 145)" />
                      <stop offset="100%" stopColor="oklch(0.78 0.13 85)" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 grid place-items-center text-center">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Score atual
                    </p>
                    <p className="font-display font-bold text-5xl text-gradient leading-none mt-1">
                      {score}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">de 100</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-success/10 text-success px-4 py-2 text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" />
                Alta elegibilidade para oportunidades parceiras
              </div>

              <Button
                size="lg"
                className="mt-6 bg-gradient-primary text-primary-foreground shadow-elegant"
              >
                <Zap className="h-4 w-4" />
                Como melhorar meu perfil
              </Button>
            </div>
          </motion.div>

          {/* Factors */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              O score AGROCERT considera múltiplos fatores comportamentais e produtivos:
            </p>
            {factors.map((f, i) => (
              <ScoreFactor key={f.label} label={f.label} value={f.value} delay={i * 0.08} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ScoreFactor({
  label,
  value,
  delay,
  inView,
}: {
  label: string;
  value: number;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="rounded-xl border bg-card p-4"
    >
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium">{label}</span>
        <span className="font-display font-bold text-primary">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-primary-glow"
        />
      </div>
    </motion.div>
  );
}

/* ---------------------------- SIMULADOR ---------------------------------- */

function Simulador() {
  const [form, setForm] = useState({
    municipio: "",
    atividade: "",
    faturamento: "",
    tempo: "",
    selo: "",
    vendas: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const eligible = useMemo(() => {
    const list: string[] = [];
    const fat = parseFloat(form.faturamento || "0");
    if (fat > 0) list.push("Capital de giro rural");
    if (form.selo === "sim") list.push("Crédito sustentável");
    if (form.vendas === "sim") list.push("Equipamentos leves");
    if (form.atividade === "energia") list.push("Energia solar rural");
    if (form.atividade === "feminino") list.push("Mulheres no campo");
    if (parseInt(form.tempo || "0") >= 3) list.push("Crédito verde");
    return list.length ? list : ["Capital de giro rural", "Crédito sustentável"];
  }, [form]);

  return (
    <section id="simulador" className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Simulador"
          title="Descubra seu enquadramento em segundos"
          subtitle="Responda algumas perguntas e veja em quais linhas seu perfil pode se enquadrar."
        />

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          {/* Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-span-3 rounded-2xl border bg-card p-6 md:p-8 shadow-elegant"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Município">
                <Input
                  placeholder="Ex.: Palmas"
                  value={form.municipio}
                  onChange={(e) => setForm({ ...form, municipio: e.target.value })}
                />
              </Field>

              <Field label="Atividade principal">
                <Select
                  value={form.atividade}
                  onValueChange={(v) => setForm({ ...form, atividade: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="frutas">Frutas e hortaliças</SelectItem>
                    <SelectItem value="grãos">Grãos</SelectItem>
                    <SelectItem value="apicultura">Apicultura</SelectItem>
                    <SelectItem value="pecuaria">Pecuária familiar</SelectItem>
                    <SelectItem value="energia">Energia solar / agro</SelectItem>
                    <SelectItem value="feminino">Liderança feminina rural</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Faturamento mensal estimado (R$)">
                <Input
                  type="number"
                  placeholder="Ex.: 8000"
                  value={form.faturamento}
                  onChange={(e) => setForm({ ...form, faturamento: e.target.value })}
                />
              </Field>

              <Field label="Tempo de produção (anos)">
                <Input
                  type="number"
                  placeholder="Ex.: 5"
                  value={form.tempo}
                  onChange={(e) => setForm({ ...form, tempo: e.target.value })}
                />
              </Field>

              <Field label="Possui selo AGROCERT?">
                <Select value={form.selo} onValueChange={(v) => setForm({ ...form, selo: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Ainda não</SelectItem>
                  </SelectContent>
                </Select>
              </Field>

              <Field label="Vendas na plataforma?">
                <Select value={form.vendas} onValueChange={(v) => setForm({ ...form, vendas: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim, regularmente</SelectItem>
                    <SelectItem value="ocasional">Ocasionalmente</SelectItem>
                    <SelectItem value="nao">Ainda não</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Button
              size="lg"
              onClick={() => setSubmitted(true)}
              className="mt-7 w-full bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-shadow"
            >
              <Calculator className="h-4 w-4" />
              Calcular elegibilidade
            </Button>
          </motion.div>

          {/* Result */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 rounded-2xl bg-gradient-to-br from-primary to-primary-glow text-primary-foreground p-6 md:p-8 shadow-elegant relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-medium">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                Resultado da simulação
              </div>
              <h3 className="mt-4 font-display text-2xl font-bold">
                Você pode se enquadrar em:
              </h3>
              <ul className="mt-6 space-y-3">
                {eligible.map((item, i) => (
                  <motion.li
                    key={item + i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="flex items-center gap-3 rounded-xl bg-white/10 backdrop-blur p-3"
                  >
                    <div className="h-8 w-8 rounded-lg bg-gold text-gold-foreground grid place-items-center shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <span className="font-medium text-sm">{item}</span>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 text-xs text-primary-foreground/75">
                * Simulação informativa. A análise final é realizada pelas instituições parceiras.
              </p>
              {submitted && (
                <Button size="lg" className="mt-6 w-full bg-gold text-gold-foreground hover:bg-gold/90">
                  Falar com um consultor
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

/* ----------------------------- PARCEIROS --------------------------------- */

const PARCEIRO_CATEGORIAS = [
  {
    icon: Landmark,
    titulo: "Bancos Públicos",
    desc: "Banco do Brasil, Caixa, Banco da Amazônia.",
  },
  {
    icon: Handshake,
    titulo: "Cooperativas",
    desc: "Sicredi, Sicoob e cooperativas regionais.",
  },
  {
    icon: Banknote,
    titulo: "Fintechs",
    desc: "Plataformas digitais de crédito e investimento rural.",
  },
  {
    icon: Building2,
    titulo: "Instituições de Fomento",
    desc: "BNDES, agências estaduais e fundos de desenvolvimento.",
  },
  {
    icon: Globe2,
    titulo: "Programas Governamentais",
    desc: "Pronaf, programas estaduais e municipais.",
  },
  {
    icon: PiggyBank,
    titulo: "Iniciativas Privadas",
    desc: "Investidores de impacto e parceiros corporativos.",
  },
];

function Parceiros() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Parceiros"
          title="Um ecossistema completo de oportunidades"
          subtitle="Bancos públicos, cooperativas, fintechs, instituições de fomento e programas governamentais conectados pelo AGROCERT."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PARCEIRO_CATEGORIAS.map((c, i) => (
            <motion.div
              key={c.titulo}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="group rounded-2xl border bg-card p-6 hover:shadow-elegant transition-all hover:-translate-y-1"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-gold/10 grid place-items-center text-primary group-hover:from-primary group-hover:to-primary-glow group-hover:text-primary-foreground transition-all">
                <c.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg">{c.titulo}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground max-w-2xl mx-auto">
          A AGROCERT conecta produtores a oportunidades. A contratação ocorre diretamente com cada parceiro.
        </p>
      </div>
    </section>
  );
}

/* ----------------------------- BENEFÍCIOS -------------------------------- */

const BENEFITS = [
  { icon: TrendingUp, title: "Mais visibilidade financeira", desc: "Seu desempenho passa a ser visto por instituições parceiras." },
  { icon: Database, title: "Dados reais fortalecem análise", desc: "Histórico vivo, atualizado e auditável." },
  { icon: Zap, title: "Menos burocracia", desc: "Documentação digital e processos simplificados." },
  { icon: Star, title: "Oportunidades adequadas ao perfil", desc: "Linhas conectadas ao seu momento produtivo." },
  { icon: Award, title: "Acesso a editais", desc: "Radar de incentivos públicos e não reembolsáveis." },
  { icon: TrendingUp, title: "Evolução contínua", desc: "Plano de crescimento com indicadores claros." },
];

function Beneficios() {
  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Benefícios"
          title="Por que usar a AGROCERT para crescer?"
          subtitle="Cada interação na plataforma fortalece sua presença diante de bancos, cooperativas, fintechs e programas públicos."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-2xl bg-card border p-6 hover:shadow-elegant transition-shadow"
            >
              <div className="h-11 w-11 rounded-xl bg-success/10 text-success grid place-items-center">
                <b.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display font-semibold text-lg">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- SEGURANÇA --------------------------------- */

const SECURITY_ICONS = [
  { icon: ShieldCheck, label: "LGPD" },
  { icon: Lock, label: "Criptografia" },
  { icon: FileCheck2, label: "Consentimento" },
  { icon: KeyRound, label: "Segurança digital" },
];

function Seguranca() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-sidebar to-sidebar/95 text-sidebar-foreground p-10 md:p-16 shadow-elegant relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-[0.06]" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/5 backdrop-blur px-3 py-1 text-xs font-medium text-gold">
                <ShieldCheck className="h-3.5 w-3.5" />
                Segurança e privacidade
              </div>
              <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold leading-tight">
                Você no controle dos seus dados.
              </h2>
              <p className="mt-4 text-sidebar-foreground/75 leading-relaxed max-w-lg">
                Nenhum dado é compartilhado sem autorização expressa do produtor. Toda a
                comunicação com instituições parceiras passa por consentimento explícito,
                criptografia ponta-a-ponta e auditoria contínua.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold/20 to-gold/10 ring-1 ring-gold/30 px-4 py-2 text-xs font-semibold text-gold">
                <ShieldCheck className="h-4 w-4" />
                LGPD · Consentimento · Criptografia
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {SECURITY_ICONS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 p-6 text-center"
                >
                  <div className="h-12 w-12 mx-auto rounded-xl bg-gradient-to-br from-gold to-gold/70 text-gold-foreground grid place-items-center">
                    <s.icon className="h-6 w-6" />
                  </div>
                  <p className="mt-3 font-medium text-sm">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ MICROCOPY -------------------------------- */

const PHRASES = [
  "Você planta valor. Nós ajudamos a revelar.",
  "Produzir bem também gera oportunidades.",
  "Informação certa no momento certo.",
  "Crescer começa com visibilidade.",
];

function Microcopy() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PHRASES.map((p, i) => (
            <motion.blockquote
              key={p}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl glass p-6"
            >
              <Sparkles className="h-4 w-4 text-gold" />
              <p className="mt-3 font-display text-base font-medium leading-snug text-foreground/85">
                "{p}"
              </p>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ CTA FINAL -------------------------------- */

function CTAFinal() {
  return (
    <CTAFinalGlobal
      eyebrow="Produzir bem merece crescer"
      title="O futuro do agro familiar já começou."
      subtitle="Conecte produção, confiança e crescimento em uma única plataforma. Seu histórico pode abrir portas."
    />
  );
}

/* ---------------------------- Section header ----------------------------- */

function SectionHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-4 text-muted-foreground leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

/* --------------------------- RADAR DE EDITAIS ---------------------------- */

type EditalStatus = "Aberto" | "Em breve" | "Encerrando";
type EditalFiltro = "Tocantins" | "Nacional" | "Mulher Rural" | "Sustentável" | "Não Reembolsável";

interface Edital {
  icon: typeof Megaphone;
  titulo: string;
  status: EditalStatus;
  valor: string;
  elegibilidade: string;
  prazo: string;
  filtros: EditalFiltro[];
  gradient: string;
}

const EDITAIS: Edital[] = [
  {
    icon: Megaphone,
    titulo: "Pronaf Especial",
    status: "Aberto",
    valor: "Até R$ 250 mil",
    elegibilidade: "Agricultura familiar com DAP/CAF ativo",
    prazo: "Contínuo",
    filtros: ["Nacional"],
    gradient: "from-emerald-600 to-emerald-800",
  },
  {
    icon: Landmark,
    titulo: "Governo do Tocantins",
    status: "Aberto",
    valor: "Até R$ 80 mil",
    elegibilidade: "Produtores rurais residentes no TO",
    prazo: "30/06/2026",
    filtros: ["Tocantins"],
    gradient: "from-blue-700 to-indigo-800",
  },
  {
    icon: Handshake,
    titulo: "Sebrae Rural",
    status: "Aberto",
    valor: "Apoio técnico + R$ 25 mil",
    elegibilidade: "MEI rural e pequenos produtores",
    prazo: "Janelas trimestrais",
    filtros: ["Nacional", "Não Reembolsável"],
    gradient: "from-sky-600 to-blue-700",
  },
  {
    icon: Users,
    titulo: "Mulheres no Campo",
    status: "Em breve",
    valor: "Até R$ 60 mil",
    elegibilidade: "Mulheres rurais com produção ativa",
    prazo: "Lançamento Q2/2026",
    filtros: ["Nacional", "Mulher Rural"],
    gradient: "from-rose-500 to-pink-700",
  },
  {
    icon: Leaf,
    titulo: "Sustentabilidade Rural",
    status: "Encerrando",
    valor: "Até R$ 150 mil",
    elegibilidade: "Práticas regenerativas comprovadas",
    prazo: "15/05/2026",
    filtros: ["Nacional", "Sustentável", "Não Reembolsável"],
    gradient: "from-teal-600 to-emerald-800",
  },
  {
    icon: Lightbulb,
    titulo: "Inovação no Agro",
    status: "Aberto",
    valor: "Até R$ 500 mil",
    elegibilidade: "Projetos com tecnologia ou impacto",
    prazo: "31/07/2026",
    filtros: ["Nacional", "Não Reembolsável"],
    gradient: "from-violet-600 to-fuchsia-700",
  },
];

const FILTROS_EDITAIS: EditalFiltro[] = [
  "Tocantins",
  "Nacional",
  "Mulher Rural",
  "Sustentável",
  "Não Reembolsável",
];

const STATUS_STYLES: Record<EditalStatus, string> = {
  Aberto: "bg-success/15 text-success ring-1 ring-success/30",
  "Em breve": "bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/30",
  Encerrando: "bg-rose-500/15 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/30",
};

function RadarEditais() {
  const [ativo, setAtivo] = useState<EditalFiltro | "Todos">("Todos");

  const lista = useMemo(() => {
    if (ativo === "Todos") return EDITAIS;
    return EDITAIS.filter((e) => e.filtros.includes(ativo));
  }, [ativo]);

  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Radar de Editais e Incentivos"
          title="Oportunidades abertas para pequenos produtores"
          subtitle="Editais, programas e incentivos públicos e privados monitorados continuamente para a agricultura familiar."
        />

        {/* Filtros */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
            <FilterIcon className="h-3.5 w-3.5" />
            Filtrar:
          </span>
          {(["Todos", ...FILTROS_EDITAIS] as const).map((f) => {
            const isActive = ativo === f;
            return (
              <button
                key={f}
                onClick={() => setAtivo(f)}
                type="button"
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-elegant"
                    : "bg-card border text-muted-foreground hover:text-foreground hover:border-primary/40"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lista.map((e, i) => (
            <motion.div
              key={e.titulo}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border bg-card overflow-hidden hover:shadow-elegant transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className={`relative h-24 bg-gradient-to-br ${e.gradient}`}>
                <div className="absolute inset-0 grid-pattern opacity-20" />
                <span className="absolute top-4 left-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur ring-1 ring-white/20">
                  <e.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                </span>
                <span
                  className={`absolute top-4 right-5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full ${STATUS_STYLES[e.status]}`}
                >
                  {e.status}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-semibold text-lg">{e.titulo}</h3>

                <dl className="mt-4 space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Wallet className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-muted-foreground/80">Valor estimado</dt>
                      <dd className="font-medium text-foreground/90">{e.valor}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-muted-foreground/80">Elegibilidade</dt>
                      <dd className="font-medium text-foreground/90">{e.elegibilidade}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CalendarClock className="h-3.5 w-3.5 text-muted-foreground mt-0.5 shrink-0" />
                    <div>
                      <dt className="text-muted-foreground/80">Prazo final</dt>
                      <dd className="font-medium text-foreground/90">{e.prazo}</dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.filtros.map((f) => (
                    <span
                      key={f}
                      className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-muted-foreground"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all self-start"
                >
                  Ver detalhes
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {lista.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            Nenhum edital encontrado para este filtro.
          </p>
        )}
      </div>
    </section>
  );
}

/* ------------------------- EDUCAÇÃO FINANCEIRA --------------------------- */

const AULAS = [
  {
    icon: Wallet,
    titulo: "Como usar crédito com inteligência",
    formato: "Vídeo 4 min · Leitura 3 min · Checklist",
  },
  {
    icon: TrendingUp,
    titulo: "Precificar melhor sua produção",
    formato: "Vídeo 5 min · Leitura 3 min · Checklist",
  },
  {
    icon: BookOpen,
    titulo: "Controle simples de caixa",
    formato: "Vídeo 3 min · Leitura 3 min · Checklist",
  },
  {
    icon: Sprout,
    titulo: "Planejar a próxima safra",
    formato: "Vídeo 6 min · Leitura 4 min · Checklist",
  },
  {
    icon: Sun,
    titulo: "Energia solar vale a pena?",
    formato: "Vídeo 5 min · Leitura 3 min · Checklist",
  },
  {
    icon: Banknote,
    titulo: "Como aumentar suas chances",
    formato: "Vídeo 4 min · Leitura 3 min · Checklist",
  },
];

function EducacaoFinanceira() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Educação Financeira"
          title="Aprenda enquanto cresce"
          subtitle="Conteúdos rápidos para usar melhor seu crédito, planejar sua produção e fortalecer seu perfil financeiro."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {AULAS.map((a, i) => (
            <motion.div
              key={a.titulo}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: i * 0.05 }}
              className="group rounded-2xl border bg-card p-6 hover:shadow-elegant transition-all hover:-translate-y-1 flex flex-col"
            >
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/10 to-gold/10 grid place-items-center text-primary shrink-0">
                  <a.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-base leading-snug">{a.titulo}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{a.formato}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <PlayCircle className="h-3.5 w-3.5 text-primary" /> Vídeo
                </span>
                <span className="inline-flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5 text-primary" /> Leitura
                </span>
                <span className="inline-flex items-center gap-1">
                  <ListChecks className="h-3.5 w-3.5 text-primary" /> Checklist
                </span>
              </div>

              <button
                type="button"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all self-start"
              >
                <GraduationCap className="h-4 w-4" />
                Começar
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
