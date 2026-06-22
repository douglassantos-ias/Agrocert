import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ShieldCheck,
  MapPin,
  Calendar,
  Truck,
  Package,
  Play,
  Heart,
  ShoppingCart,
  Share2,
  Star,
  Hash,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Users,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { QrCodeMock } from "@/components/origem/QrCodeMock";
import { MapaFazenda } from "@/components/origem/MapaFazenda";
import { SeloBadge } from "@/components/selos/SeloBadge";
import { getLote, type LoteOrigem } from "@/data/origem";
import { getSelo } from "@/data/selos";
import produtoraImg from "@/assets/produtora-dona-maria.jpg";
import fazendaImg from "@/assets/fazenda-aerea.jpg";

export const Route = createFileRoute("/origem/$lote")({
  loader: ({ params }) => {
    const lote = getLote(params.lote);
    if (!lote) throw notFound();
    return { lote };
  },
  head: ({ loaderData }) => {
    const l = loaderData?.lote;
    if (!l) return { meta: [{ title: "Origem — AGROCERT" }] };
    return {
      meta: [
        { title: `${l.produto} — Origem ${l.produtor.fazenda} · AGROCERT` },
        {
          name: "description",
          content: `Conheça ${l.produtor.nome}, produtora de ${l.produto} em ${l.produtor.municipio}/${l.produtor.estado}. Lote ${l.lote} certificado e rastreável em blockchain.`,
        },
        { property: "og:title", content: `${l.produto} — ${l.produtor.fazenda}` },
        { property: "og:description", content: `Da terra de ${l.produtor.nome} para a sua mesa.` },
      ],
    };
  },
  component: OrigemDetalhePage,
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold font-display mb-3">Lote não encontrado</h1>
        <p className="text-muted-foreground mb-6">
          O QR Code escaneado não corresponde a nenhum lote certificado.
        </p>
        <Button asChild>
          <Link to="/origem">Voltar</Link>
        </Button>
      </div>
    </div>
  ),
});

function OrigemDetalhePage() {
  const { lote: l } = Route.useLoaderData() as { lote: LoteOrigem };
  const selos = l.selos.map(getSelo);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Faixa de autenticidade */}
      <div className="pt-24 pb-3 bg-gradient-to-b from-primary/8 to-transparent">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/origem"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Origem AGROCERT
            </Link>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success border border-success/30 text-xs font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" />
              Autenticidade validada · Blockchain confirmado
            </div>
          </div>
        </div>
      </div>

      {/* HERO PRODUTOR */}
      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/15 text-gold-foreground border border-gold/30 text-xs font-semibold mb-5">
                <Sparkles className="h-3.5 w-3.5" />
                CONHEÇA A ORIGEM
              </div>
              <h1 className="text-4xl md:text-6xl font-bold font-display leading-[1.05] tracking-tight">
                Esta {l.produto.split(" ")[0].toLowerCase()} foi plantada por{" "}
                <span className="text-gradient">{l.produtor.nome.split(" ")[0]}.</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-xl">
                {l.produtor.nome} cuida do <strong>{l.produtor.fazenda}</strong> em{" "}
                {l.produtor.municipio}/{l.produtor.estado} desde {l.produtor.fundadaEm}, ao lado de{" "}
                {l.produtor.membrosFamilia} pessoas da família.
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3 max-w-md">
                <MiniStat icon={MapPin} valor={l.produtor.municipio} label={l.produtor.estado} />
                <MiniStat
                  icon={Users}
                  valor={String(l.produtor.membrosFamilia)}
                  label="da família"
                />
                <MiniStat icon={Leaf} valor={`${l.fazenda.areaHa} ha`} label={l.fazenda.bioma} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow"
                >
                  <Link to="/marketplace">
                    <ShoppingCart className="h-4 w-4" />
                    Comprar novamente — {l.precoSugerido}
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-4 w-4" />
                  Favoritar
                </Button>
                <Button size="lg" variant="ghost">
                  <Share2 className="h-4 w-4" />
                  Compartilhar
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-primary opacity-25 blur-3xl rounded-full" />
                <div className="relative rounded-3xl overflow-hidden border-4 border-card shadow-elegant aspect-[4/5]">
                  <img
                    src={produtoraImg}
                    alt={`${l.produtor.nome} no ${l.produtor.fazenda}`}
                    width={1024}
                    height={1280}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white">
                    <p className="text-xs uppercase tracking-widest opacity-80">Produtora</p>
                    <p className="font-display font-bold text-2xl leading-tight">
                      {l.produtor.nome}
                    </p>
                    <p className="text-sm opacity-90">{l.produtor.fazenda}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTO + LOTE */}
      <section className="pb-12">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border bg-card p-6 md:p-8 grid md:grid-cols-4 gap-6 shadow-elegant">
            <Info icon={Package} label="Produto" valor={l.produto} sub={l.variedade} />
            <Info icon={Hash} label="Lote" valor={l.lote} sub={l.unidade} />
            <Info icon={Calendar} label="Colheita" valor={l.colheita.data} sub={l.colheita.metodo} />
            <Info icon={Truck} label="Transporte" valor="Refrigerado" sub={l.colheita.transporte} />
          </div>
        </div>
      </section>

      {/* SELOS */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border bg-gradient-to-br from-secondary/60 to-card p-8">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                  Selos AGROCERT conquistados
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-display mt-1">
                  {selos.length} certificações ativas
                </h2>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/certificacao">Entender os selos</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 justify-center md:justify-start">
              {selos.map((s) => (
                <SeloBadge key={s.id} selo={s} size="lg" showLabel />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAPA + FAZENDA */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                Onde foi cultivada
              </p>
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-5">
                {l.produtor.fazenda} · {l.produtor.municipio}/{l.produtor.estado}
              </h2>
              <MapaFazenda
                lat={l.fazenda.coordenadas.lat}
                lng={l.fazenda.coordenadas.lng}
                municipio={l.produtor.municipio}
                estado={l.produtor.estado}
              />
              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-secondary p-3">
                  <p className="font-bold font-display">{l.fazenda.areaHa} ha</p>
                  <p className="text-xs text-muted-foreground">área cultivada</p>
                </div>
                <div className="rounded-xl bg-secondary p-3">
                  <p className="font-bold font-display">{l.fazenda.altitudeM} m</p>
                  <p className="text-xs text-muted-foreground">altitude</p>
                </div>
                <div className="rounded-xl bg-secondary p-3">
                  <p className="font-bold font-display">{l.fazenda.bioma}</p>
                  <p className="text-xs text-muted-foreground">bioma</p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                Vista aérea
              </p>
              <h2 className="text-2xl md:text-3xl font-bold font-display mb-5">
                Bananal e nascentes preservadas
              </h2>
              <div className="rounded-3xl overflow-hidden border shadow-elegant">
                <img
                  src={fazendaImg}
                  alt={`Vista aérea do ${l.produtor.fazenda}`}
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                A propriedade preserva mais de 30% de área de Cerrado nativo, com nascentes
                protegidas por mata ciliar. O cultivo segue manejo orgânico certificado e
                rotação com cobertura vegetal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HISTÓRIA */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border bg-card p-8 md:p-10 shadow-elegant max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
              A história da família
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-5">
              Três gerações sob o mesmo telhado de barro.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">{l.historia}</p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link to="/historias/sitio-boa-esperanca">
                  Ler a história completa da família
                  <Heart className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* COMO É PRODUZIDO */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-2">
              Como produzimos
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-display leading-tight mb-8">
              Nada de pressa. Tudo com método.
            </h2>
            <div className="space-y-3">
              {l.comoProduzimos.map((etapa, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl border bg-card p-5 hover:shadow-elegant transition-shadow"
                >
                  <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold font-display shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-sm md:text-base leading-relaxed pt-1.5">{etapa}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VÍDEO */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden border shadow-elegant max-w-5xl mx-auto group cursor-pointer">
            <img
              src={produtoraImg}
              alt={l.video.titulo}
              width={1024}
              height={576}
              loading="lazy"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 flex items-center justify-center">
              <div className="h-20 w-20 md:h-24 md:w-24 rounded-full bg-white/95 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                <Play className="h-9 w-9 md:h-10 md:w-10 text-primary fill-primary ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-widest opacity-80">
                    Vídeo do produtor
                  </p>
                  <p className="font-display font-bold text-xl md:text-2xl mt-1">
                    {l.video.titulo}
                  </p>
                </div>
                <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-mono">
                  {l.video.duracao}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCKCHAIN */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl border bg-card overflow-hidden shadow-elegant max-w-5xl mx-auto">
            <div className="bg-gradient-primary p-6 md:p-8 text-primary-foreground">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-white/15 flex items-center justify-center">
                    <ShieldCheck className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest opacity-80">
                      Rastreabilidade Blockchain
                    </p>
                    <h2 className="text-2xl font-bold font-display">Registro imutável</h2>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-xs font-medium">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {l.blockchain.confirmacoes} confirmações
                </div>
              </div>
              <p className="mt-4 font-mono text-xs md:text-sm break-all opacity-95">
                {l.blockchain.hash}
              </p>
            </div>
            <div className="p-6 md:p-8 grid md:grid-cols-2 gap-x-8 gap-y-4">
              <BcLine label="Rede" valor={l.blockchain.rede} />
              <BcLine label="Bloco" valor={`#${l.blockchain.bloco.toLocaleString("pt-BR")}`} />
              <BcLine label="Emitido em" valor={l.blockchain.emitidoEm} />
              <BcLine label="Auditor responsável" valor={l.blockchain.auditor} />
              <BcLine label="Embalagem" valor={l.colheita.embalagemEm} />
              <BcLine label="Status" valor="Ativo · sem suspensões" status />
            </div>
          </div>
        </div>
      </section>

      {/* AVALIAÇÕES */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-primary font-semibold">
                  Avaliações reais
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-display mt-1">
                  {l.metricas.avaliacaoMedia} ★ · {l.metricas.totalAvaliacoes} avaliações
                </h2>
              </div>
              <div className="text-sm text-muted-foreground">
                {l.metricas.recompras} consumidores compraram novamente
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {l.avaliacoes.map((a) => (
                <div key={a.nome} className="rounded-2xl border bg-card p-5 shadow-sm">
                  <div className="flex gap-0.5 text-gold mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < a.nota ? "fill-gold text-gold" : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm leading-relaxed mb-4">"{a.comentario}"</p>
                  <div className="text-xs">
                    <p className="font-semibold">{a.nome}</p>
                    <p className="text-muted-foreground">
                      {a.cidade} · {a.data}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* QR + COMPRAR FINAL */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-primary p-8 md:p-12 text-primary-foreground shadow-elegant max-w-5xl mx-auto">
            <div className="grid md:grid-cols-[auto_1fr] gap-8 items-center">
              <QrCodeMock value={l.lote} size={176} />
              <div>
                <p className="text-xs uppercase tracking-widest opacity-80">
                  Quer levar de novo para casa?
                </p>
                <h3 className="text-3xl md:text-4xl font-bold font-display mt-2 leading-tight">
                  Apoie o {l.produtor.fazenda}.
                </h3>
                <p className="mt-3 opacity-90 max-w-xl">
                  Cada compra fortalece a agricultura familiar do Cerrado e mantém viva a história
                  que você acabou de conhecer.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild size="lg" variant="secondary">
                    <Link to="/marketplace">
                      <ShoppingCart className="h-4 w-4" />
                      Comprar novamente — {l.precoSugerido}
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/30 text-primary-foreground hover:bg-white/20"
                  >
                    <Heart className="h-4 w-4" />
                    Seguir produtora
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function MiniStat({
  icon: Icon,
  valor,
  label,
}: {
  icon: typeof MapPin;
  valor: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-3">
      <Icon className="h-4 w-4 text-primary mb-1.5" />
      <p className="font-bold font-display text-sm leading-tight truncate">{valor}</p>
      <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  valor,
  sub,
}: {
  icon: typeof Package;
  label: string;
  valor: string;
  sub?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-semibold truncate">{valor}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5 truncate">{sub}</p>}
      </div>
    </div>
  );
}

function BcLine({
  label,
  valor,
  status,
}: {
  label: string;
  valor: string;
  status?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border/40 pb-3 last:border-0 last:pb-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`text-sm font-medium text-right ${
          status ? "inline-flex items-center gap-1.5 text-success" : ""
        }`}
      >
        {status && <CheckCircle2 className="h-4 w-4" />}
        {valor}
      </span>
    </div>
  );
}
