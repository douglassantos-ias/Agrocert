import { createFileRoute, Link } from "@tanstack/react-router";
import {
  QrCode,
  ScanLine,
  ShieldCheck,
  Heart,
  Video,
  BarChart3,
  CheckCircle2,
  Sparkles,
  Eye,
  Repeat2,
  Star,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTAFinalGlobal } from "@/components/CTAFinalGlobal";
import { QrCodeMock } from "@/components/origem/QrCodeMock";
import { LOTE_DESTAQUE, getLote } from "@/data/origem";

export const Route = createFileRoute("/origem")({
  head: () => ({
    meta: [
      { title: "Conheça a Origem do Seu Produto — AGROCERT-CERRADO" },
      {
        name: "description",
        content:
          "Escaneie o QR Code do seu produto e descubra o rosto, a história e a fazenda de quem produziu. Do campo ao consumidor com rosto, história e confiança.",
      },
      { property: "og:title", content: "Conheça a Origem do Seu Produto — AGROCERT" },
      {
        property: "og:description",
        content:
          "Rastreabilidade emocional e blockchain: cada alimento conta a história de uma família.",
      },
    ],
  }),
  component: OrigemIndexPage,
});

function OrigemIndexPage() {
  const destaque = getLote(LOTE_DESTAQUE)!;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="pt-32 pb-16 md:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold-foreground border border-gold/30 text-xs font-semibold mb-6">
                <Sparkles className="h-3.5 w-3.5" />
                MÓDULO PREMIUM
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-display leading-[1.05] tracking-tight">
                Conheça a <span className="text-gradient">origem</span> do seu produto.
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
                Aponte a câmera do celular para o QR Code da embalagem e mergulhe na história
                completa de quem plantou. Rosto, fazenda, vídeo, selos e blockchain — tudo em um
                só lugar.
              </p>
              <p className="mt-4 text-sm font-display font-semibold text-primary italic">
                "Do campo ao consumidor com rosto, história e confiança."
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow"
              >
                <Link to="/historias/sitio-boa-esperanca">
                  <Heart className="h-4 w-4" />
                  Ver história em destaque
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/origem/$lote" params={{ lote: LOTE_DESTAQUE }}>
                  <ScanLine className="h-4 w-4" />
                  Página do lote
                </Link>
              </Button>
              </div>

              <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                <Stat valor="2.847" label="escaneamentos" />
                <Stat valor="4.9★" label="média de avaliação" />
                <Stat valor="22%" label="taxa de recompra" />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
              <div className="relative glass rounded-3xl p-6 md:p-8 shadow-elegant">
                <div className="flex flex-col items-center text-center">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                    Lote em destaque
                  </p>
                  <p className="font-display font-bold text-lg">{destaque.produto}</p>
                  <p className="text-xs text-muted-foreground mb-5">
                    Lote {destaque.lote} · {destaque.produtor.fazenda}
                  </p>

                  <QrCodeMock value={destaque.lote} size={208} />

                  <p className="mt-5 text-xs text-muted-foreground max-w-xs">
                    Aponte a câmera ou clique no botão abaixo para abrir a página pública de origem.
                  </p>
                  <Button asChild className="mt-4" variant="secondary" size="sm">
                    <Link to="/origem/$lote" params={{ lote: LOTE_DESTAQUE }}>
                      Abrir página de origem
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
              Três passos. <span className="text-gradient">Uma história inteira.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Da etiqueta na embalagem ao rosto do produtor — em menos de 4 segundos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Passo
              numero="01"
              icon={QrCode}
              titulo="QR Code único por lote"
              texto="Cada caixa, penca ou frasco recebe um código exclusivo, vinculado a um registro imutável em blockchain."
            />
            <Passo
              numero="02"
              icon={ScanLine}
              titulo="Escaneie com o celular"
              texto="O consumidor aponta a câmera e abre uma página pública premium — sem instalar nada, sem cadastro."
            />
            <Passo
              numero="03"
              icon={Heart}
              titulo="Conexão emocional"
              texto="Vê o rosto, a fazenda, o vídeo, os selos e a história. Sente confiança. Compra de novo."
            />
          </div>
        </div>
      </section>

      {/* O QUE O CONSUMIDOR VÊ */}
      <section className="py-20 md:py-28 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                Página pública premium
              </p>
              <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
                Tudo que torna um alimento <span className="text-gradient">inesquecível</span>.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                A página de origem reúne, em um único lugar elegante e mobile-first, todos os
                elementos que transformam um produto agrícola em uma marca com alma.
              </p>

              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  "Foto e nome do produtor",
                  "Mapa da fazenda no Cerrado",
                  "História da família",
                  "Vídeo do produtor",
                  "Selos AGROCERT conquistados",
                  "Hash blockchain verificável",
                  "Data de colheita e lote",
                  "Avaliações reais de consumidores",
                  "Botão comprar novamente",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="mt-8 bg-gradient-primary text-primary-foreground shadow-elegant"
              >
                <Link to="/origem/$lote" params={{ lote: LOTE_DESTAQUE }}>
                  Ver exemplo real
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-gold opacity-15 blur-3xl rounded-full" />
              <div className="relative rounded-3xl border bg-card overflow-hidden shadow-elegant">
                <div className="aspect-[4/5] bg-gradient-to-br from-primary/30 via-primary-glow/20 to-gold/20 flex items-center justify-center">
                  <div className="text-center px-6">
                    <Heart className="h-12 w-12 mx-auto text-primary mb-4" />
                    <p className="font-display text-2xl font-bold">
                      "Saber quem plantou muda tudo."
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      — Juliana M., Palmas/TO · cliente recorrente
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARDS */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-14">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              Painéis dedicados
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
              Para o produtor. <span className="text-gradient">Para o admin.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <DashboardCard
              titulo="Dashboard do produtor"
              subtitulo="Conta sua história. Mede o impacto."
              icon={Video}
              cor="bg-gradient-primary"
              recursos={[
                "Subir vídeo do dia a dia (até 60s)",
                "Editar história e fotos da família",
                "Cadastrar fotos da fazenda e do produto",
                "Acompanhar escaneamentos por lote",
                "Métricas de visualização e tempo de leitura",
                "Taxa de recompra por consumidor",
              ]}
              metricas={[
                { icon: Eye, label: "Visualizações", valor: "4.128" },
                { icon: ScanLine, label: "Escaneamentos", valor: "2.847" },
                { icon: Repeat2, label: "Recompra", valor: "22%" },
              ]}
            />
            <DashboardCard
              titulo="Painel administrativo"
              subtitulo="Aprova. Audita. Monitora."
              icon={ShieldCheck}
              cor="bg-gradient-to-br from-slate-700 to-slate-900"
              recursos={[
                "Aprovar conteúdos enviados por produtores",
                "Validar autenticidade documental",
                "Gestão centralizada de QR Codes",
                "Analytics geral por município e categoria",
                "Auditoria blockchain de cada emissão",
                "Suspender ou renovar registros",
              ]}
              metricas={[
                { icon: BarChart3, label: "QR Codes ativos", valor: "1.284" },
                { icon: ShieldCheck, label: "Aprovados", valor: "98,2%" },
                { icon: Star, label: "NPS consumidor", valor: "82" },
              ]}
            />
          </div>
        </div>
      </section>

      <CTAFinalGlobal
        eyebrow="Origem gera valor"
        title="Cada alimento merece um rosto."
        subtitle="Ative o módulo Origem e transforme cada embalagem em uma ponte emocional com o consumidor."
      />

      <SiteFooter />
    </div>
  );
}

function Stat({ valor, label }: { valor: string; label: string }) {
  return (
    <div>
      <p className="text-2xl md:text-3xl font-bold font-display text-gradient">{valor}</p>
      <p className="text-xs text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

function Passo({
  numero,
  icon: Icon,
  titulo,
  texto,
}: {
  numero: string;
  icon: typeof QrCode;
  titulo: string;
  texto: string;
}) {
  return (
    <div className="group relative rounded-3xl border bg-card p-7 hover:shadow-elegant transition-shadow">
      <div className="flex items-start justify-between mb-5">
        <div className="h-12 w-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-elegant">
          <Icon className="h-6 w-6 text-primary-foreground" />
        </div>
        <span className="font-display text-3xl font-bold text-muted-foreground/30">{numero}</span>
      </div>
      <h3 className="text-xl font-bold font-display mb-2">{titulo}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{texto}</p>
    </div>
  );
}

function DashboardCard({
  titulo,
  subtitulo,
  icon: Icon,
  cor,
  recursos,
  metricas,
}: {
  titulo: string;
  subtitulo: string;
  icon: typeof Video;
  cor: string;
  recursos: string[];
  metricas: { icon: typeof Eye; label: string; valor: string }[];
}) {
  return (
    <div className="rounded-3xl border bg-card overflow-hidden shadow-elegant">
      <div className={`${cor} p-6 text-white flex items-center gap-4`}>
        <div className="h-12 w-12 rounded-2xl bg-white/15 flex items-center justify-center">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-xl font-bold font-display">{titulo}</h3>
          <p className="text-sm opacity-90">{subtitulo}</p>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-3 mb-6">
          {metricas.map((m) => {
            const I = m.icon;
            return (
              <div key={m.label} className="rounded-xl bg-secondary p-3 text-center">
                <I className="h-4 w-4 mx-auto text-primary mb-1.5" />
                <p className="font-bold font-display text-sm">{m.valor}</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">{m.label}</p>
              </div>
            );
          })}
        </div>
        <ul className="space-y-2.5">
          {recursos.map((r) => (
            <li key={r} className="flex items-start gap-2.5 text-sm">
              <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
