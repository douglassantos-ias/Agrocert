import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ShieldCheck,
  QrCode,
  Trophy,
  Sparkles,
  FileText,
  Camera,
  ClipboardCheck,
  Award,
  Link2,
  Search,
  Eye,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SELOS, NIVEIS, calcularNivel } from "@/data/selos";
import { SeloBadge } from "@/components/selos/SeloBadge";
import { NivelGamificado } from "@/components/selos/NivelGamificado";
import { RankingProdutores } from "@/components/selos/RankingProdutores";
import { BlockchainRecord } from "@/components/selos/BlockchainRecord";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTAFinalGlobal } from "@/components/CTAFinalGlobal";

export const Route = createFileRoute("/certificacao")({
  head: () => ({
    meta: [
      { title: "Sistema de Selos AGROCERT — Certificação Digital com Blockchain" },
      {
        name: "description",
        content:
          "8 selos digitais gamificados, ranking de produtores e rastreabilidade blockchain. Confiança real do campo à mesa.",
      },
      { property: "og:title", content: "Sistema de Selos AGROCERT — Certificação Digital com Blockchain" },
      {
        property: "og:description",
        content:
          "Selos premium com QR Code, ranking Bronze→Diamante e registro imutável em blockchain.",
      },
    ],
  }),
  component: CertificacaoPage,
});

function CertificacaoPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-28 md:pt-32 pb-24">
        <HeroSelos />
        <ColecaoSelos />
        <Gamificacao />
        <FluxoCertificacao />
        <DashboardsPreview />
        <ValidacaoQRCode />
        <Ranking />
        <CTAFinalGlobal
          eyebrow="Sua reputação · Seu mercado"
          title="O futuro do agro familiar já começou."
          subtitle="Conecte produção, confiança e crescimento em uma única plataforma certificada."
        />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ============== HERO ============== */
function HeroSelos() {
  return (
    <section className="relative bg-gradient-hero">
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="bg-gold/15 text-gold-foreground border border-gold/30 hover:bg-gold/20 mb-6">
            <Sparkles className="h-3 w-3 mr-1" />
            Sistema de Selos AGROCERT
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight">
            Selos digitais que <span className="text-gradient">valem mercado</span>.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            8 certificações gamificadas, registro imutável em blockchain e ranking público de
            reputação. Cada selo é um ativo econômico real para o produtor rural.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow">
              <Link to="/cadastro">
                Solicitar meu primeiro selo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#validar">
                <QrCode className="h-4 w-4" />
                Validar um selo
              </a>
            </Button>
          </div>

          {/* selos flutuantes */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {SELOS.map((s, i) => (
              <div
                key={s.id}
                className="animate-in fade-in slide-in-from-bottom-3"
                style={{ animationDelay: `${i * 60}ms`, animationDuration: "600ms" }}
              >
                <SeloBadge selo={s} size="md" showLabel />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== COLEÇÃO ============== */
function ColecaoSelos() {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            Os 8 selos
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Cada selo conta uma história
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Identidade visual premium, critérios técnicos auditáveis e blockchain por trás de cada emissão.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SELOS.map((s) => (
            <article
              key={s.id}
              className="group rounded-3xl border bg-card p-6 hover:shadow-elegant transition-all hover:-translate-y-1"
            >
              <SeloBadge selo={s} size="lg" />
              <h3 className="mt-5 text-lg font-bold font-display">{s.nome}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{s.funcao}</p>
              <div className="mt-4 pt-4 border-t border-border/60">
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2 font-semibold">
                  Critérios principais
                </p>
                <ul className="space-y-1.5">
                  {s.criterios.slice(0, 3).map((c) => (
                    <li key={c} className="text-xs flex items-start gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============== GAMIFICAÇÃO ============== */
function Gamificacao() {
  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15">
              <Trophy className="h-3 w-3 mr-1" />
              Modelo gamificado
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-display">
              De Bronze a <span className="text-gradient">Diamante</span>.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Cada selo conquistado eleva o produtor no ranking público AGROCERT. Mais selos =
              mais visibilidade, mais confiança e melhores preços de venda.
            </p>

            <div className="mt-8 space-y-3">
              {NIVEIS.map((n) => (
                <div
                  key={n.nivel}
                  className="flex items-center gap-4 rounded-2xl border bg-card p-4 hover:shadow-elegant transition-shadow"
                >
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${n.bg}`}>
                    <Trophy className="h-6 w-6 text-white" strokeWidth={2.25} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-bold font-display ${n.cor}`}>{n.nivel}</h4>
                      <span className="text-xs text-muted-foreground">
                        {n.max < 99 ? `${n.min}–${n.max} selos` : `${n.min}+ selos`}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.descricao}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <NivelGamificado
              totalSelos={5}
              nomeProdutor="Sítio Boa Esperança · Palmas, TO"
            />
            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-4 w-4 text-gold" />
                <p className="font-semibold text-sm">Recomendado para o próximo nível</p>
              </div>
              <div className="space-y-3">
                {SELOS.slice(5, 8).map((s) => (
                  <div key={s.id} className="flex items-center gap-3 group">
                    <SeloBadge selo={s} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{s.nome}</p>
                      <p className="text-xs text-muted-foreground">{s.curto}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="opacity-60 group-hover:opacity-100">
                      Solicitar
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== FLUXO ============== */
function FluxoCertificacao() {
  const passos = [
    { icon: FileText, titulo: "Solicitação", desc: "Produtor escolhe o selo e abre pedido pela plataforma." },
    { icon: Camera, titulo: "Evidências", desc: "Upload de documentos, fotos da propriedade e do processo." },
    { icon: ClipboardCheck, titulo: "Análise técnica", desc: "Auditor avalia checklist técnico e agenda vistoria." },
    { icon: Award, titulo: "Emissão", desc: "Selo digital é assinado com QR Code único por lote." },
    { icon: Link2, titulo: "Blockchain", desc: "Registro imutável é gerado e replicado nos nós da rede." },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            Como funciona
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            5 passos da solicitação ao blockchain
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-6 relative">
          {passos.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.titulo} className="relative">
                <div className="rounded-2xl border bg-card p-6 h-full hover:shadow-elegant transition-shadow">
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 shadow-elegant">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground font-mono mb-1">0{i + 1}</p>
                  <h4 className="font-bold font-display mb-1">{p.titulo}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============== DASHBOARDS PREVIEW ============== */
function DashboardsPreview() {
  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            Para cada perfil
          </p>
          <h2 className="text-3xl md:text-5xl font-bold font-display">
            Três experiências, uma plataforma
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Produtor */}
          <div className="rounded-3xl border bg-card p-6 shadow-elegant">
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20">
              Produtor
            </Badge>
            <h3 className="text-xl font-bold font-display mb-1">Vitrine de selos</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Acompanhe pedidos, conquiste novos selos e suba de nível.
            </p>

            <div className="grid grid-cols-4 gap-3 mb-5">
              {SELOS.slice(0, 4).map((s) => (
                <SeloBadge key={s.id} selo={s} size="sm" />
              ))}
            </div>

            <div className="space-y-2">
              {[
                { sel: SELOS[5], status: "Em análise", icon: Clock, color: "text-amber-600" },
                { sel: SELOS[6], status: "Aprovado", icon: CheckCircle2, color: "text-success" },
                { sel: SELOS[7], status: "Pendente vistoria", icon: Clock, color: "text-amber-600" },
              ].map(({ sel, status, icon: Ic, color }) => (
                <div key={sel.id} className="flex items-center gap-3 text-sm">
                  <SeloBadge selo={sel} size="sm" />
                  <span className="flex-1 truncate">{sel.nome}</span>
                  <span className={`flex items-center gap-1 text-xs ${color}`}>
                    <Ic className="h-3 w-3" />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Auditor */}
          <div className="rounded-3xl border bg-card p-6 shadow-elegant">
            <Badge className="mb-4 bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20">
              Auditor / Admin
            </Badge>
            <h3 className="text-xl font-bold font-display mb-1">Mesa de auditoria</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Aprove, reprove, renove e assine emissões digitalmente.
            </p>

            <div className="space-y-3">
              {[
                { nome: "Sítio Boa Esperança", selo: SELOS[0], acao: "aprovar" },
                { nome: "Mel da Serra", selo: SELOS[2], acao: "vistoria" },
                { nome: "Roça das Mulheres", selo: SELOS[6], acao: "aprovar" },
              ].map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 rounded-xl border border-border/60 p-3 hover:bg-secondary/50 transition-colors"
                >
                  <SeloBadge selo={p.selo} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{p.nome}</p>
                    <p className="text-xs text-muted-foreground">{p.selo.curto}</p>
                  </div>
                  <div className="flex gap-1">
                    <button className="h-7 w-7 rounded-md bg-success/15 text-success hover:bg-success/25 flex items-center justify-center">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    </button>
                    <button className="h-7 w-7 rounded-md bg-destructive/15 text-destructive hover:bg-destructive/25 flex items-center justify-center">
                      <XCircle className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-secondary p-3">
                <p className="text-2xl font-bold font-display text-primary">42</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Pendentes</p>
              </div>
              <div className="rounded-xl bg-secondary p-3">
                <p className="text-2xl font-bold font-display text-success">198</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Ativos</p>
              </div>
              <div className="rounded-xl bg-secondary p-3">
                <p className="text-2xl font-bold font-display text-gold">7</p>
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Suspensos</p>
              </div>
            </div>
          </div>

          {/* Consumidor */}
          <div className="rounded-3xl border bg-card p-6 shadow-elegant">
            <Badge className="mb-4 bg-gold/15 text-gold-foreground border border-gold/30">
              Consumidor
            </Badge>
            <h3 className="text-xl font-bold font-display mb-1">Confiança visível</h3>
            <p className="text-sm text-muted-foreground mb-5">
              Filtre o marketplace por selo e escaneie QR Code para ver tudo.
            </p>

            <div className="rounded-2xl border bg-secondary/40 p-4 mb-4">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <Filter className="h-3.5 w-3.5" />
                Filtrar produtos por selo
              </div>
              <div className="flex flex-wrap gap-1.5">
                {SELOS.map((s) => (
                  <span
                    key={s.id}
                    className={`text-[11px] px-2 py-1 rounded-full border ${s.chip}`}
                  >
                    {s.curto}
                  </span>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full" asChild>
              <Link to="/marketplace">
                <Eye className="h-4 w-4" />
                Ver marketplace certificado
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============== VALIDAÇÃO QR ============== */
function ValidacaoQRCode() {
  return (
    <section id="validar" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15">
              <ShieldCheck className="h-3 w-3 mr-1" />
              Rastreabilidade pública
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-display">
              Escaneie. Confirme. <span className="text-gradient">Confie.</span>
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Cada produto certificado carrega um QR Code único por lote. O consumidor consulta a
              autenticidade em segundos e visualiza todo o histórico imutável da blockchain.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex gap-2 max-w-md"
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Cole o código ou hash do produto"
                  className="w-full h-11 pl-10 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue="0x9f3a-c41e"
                />
              </div>
              <Button type="submit" className="bg-gradient-primary text-primary-foreground">
                Validar
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Hash imutável
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Auditor identificado
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                Validade aberta
              </span>
            </div>
          </div>

          <BlockchainRecord />
        </div>
      </div>
    </section>
  );
}

/* ============== RANKING ============== */
function Ranking() {
  return (
    <section className="py-24 md:py-32 bg-secondary/40">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <Badge className="mb-4 bg-gold/15 text-gold-foreground border border-gold/30">
              <Trophy className="h-3 w-3 mr-1" />
              Ranking público
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold font-display">
              Produtores mais reconhecidos
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl">
              Ranking atualizado semanalmente com base em selos ativos, reputação e entregas verificadas.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/marketplace">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <RankingProdutores />
      </div>
    </section>
  );
}

/* CTA Final agora vem de @/components/CTAFinalGlobal */

// silence unused import lint when calcularNivel is not directly used
void calcularNivel;
