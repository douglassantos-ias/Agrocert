import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { MapPin, Sparkles, Trophy, Users, ArrowRight, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CTAFinalGlobal } from "@/components/CTAFinalGlobal";
import { SELOS, type SeloId } from "@/data/selos";
import type { FazendaPonto } from "@/components/mapa/MapaTocantins";
import produtoraDonaMaria from "@/assets/produtora-dona-maria.jpg";
import produtorPadrao from "@/assets/produtor.jpg";
import familiaTresGeracoes from "@/assets/familia-tres-geracoes.jpg";

// Leaflet usa `window` — carregamos só no cliente
const MapaTocantins = lazy(() =>
  import("@/components/mapa/MapaTocantins").then((m) => ({ default: m.MapaTocantins })),
);

export const Route = createFileRoute("/mapa")({
  head: () => ({
    meta: [
      { title: "Mapa de Produtores AGROCERT — Tocantins" },
      {
        name: "description",
        content:
          "Mapa interativo dos produtores certificados AGROCERT no Tocantins. Filtre por selo, produto e município.",
      },
      { property: "og:title", content: "Mapa de Produtores AGROCERT — Tocantins" },
      {
        property: "og:description",
        content:
          "139 municípios. Produtores reais, selos verificados e rastreabilidade blockchain em um mapa interativo.",
      },
    ],
  }),
  component: MapaPage,
});

interface FazendaCompleta extends FazendaPonto {
  selosIds: SeloId[];
  produtos: string[];
}

/**
 * Fazendas mockadas — coordenadas aproximadas das sedes municipais
 * dos produtores citados em /certificacao (Ranking) e /origem.
 */
const FAZENDAS: FazendaCompleta[] = [
  {
    nome: "Sítio Boa Esperança",
    produtor: "Dona Maria & Família",
    fotoUrl: produtoraDonaMaria,
    historiaSlug: "sitio-boa-esperanca",
    municipio: "Palmas, TO",
    lat: -10.184,
    lng: -48.333,
    selos: 7,
    reputacao: 4.98,
    destaque: true,
    selosIds: [
      "organico",
      "origem-tocantins",
      "cerrado-sustentavel",
      "agricultura-familiar",
      "qualidade-verificada",
      "lideranca-feminina",
      "carbono-consciente",
    ],
    produtos: ["Banana", "Hortaliças", "Mandioca"],
  },
  {
    nome: "Cooperativa Mãos do Cerrado",
    produtor: "Coop. Mãos do Cerrado",
    fotoUrl: familiaTresGeracoes,
    municipio: "Porto Nacional, TO",
    lat: -10.706,
    lng: -48.417,
    selos: 6,
    reputacao: 4.94,
    selosIds: [
      "organico",
      "origem-tocantins",
      "cerrado-sustentavel",
      "agricultura-familiar",
      "qualidade-verificada",
      "producao-sustentavel",
    ],
    produtos: ["Hortaliças", "Frutas", "Polpa"],
  },
  {
    nome: "Fazenda Vereda Dourada",
    produtor: "Seu Joaquim",
    fotoUrl: produtorPadrao,
    municipio: "Gurupi, TO",
    lat: -11.729,
    lng: -49.069,
    selos: 5,
    reputacao: 4.91,
    selosIds: [
      "origem-tocantins",
      "cerrado-sustentavel",
      "agricultura-familiar",
      "qualidade-verificada",
      "carbono-consciente",
    ],
    produtos: ["Mel", "Frutas"],
  },
  {
    nome: "Mel da Serra",
    produtor: "Família Bezerra",
    fotoUrl: produtorPadrao,
    municipio: "Natividade, TO",
    lat: -11.704,
    lng: -47.725,
    selos: 4,
    reputacao: 4.87,
    selosIds: [
      "origem-tocantins",
      "cerrado-sustentavel",
      "agricultura-familiar",
      "qualidade-verificada",
    ],
    produtos: ["Mel", "Própolis"],
  },
  {
    nome: "Roça das Mulheres",
    produtor: "Coletivo Roça das Mulheres",
    fotoUrl: produtoraDonaMaria,
    municipio: "Araguaína, TO",
    lat: -7.191,
    lng: -48.207,
    selos: 3,
    reputacao: 4.85,
    selosIds: ["origem-tocantins", "agricultura-familiar", "lideranca-feminina"],
    produtos: ["Hortaliças", "Mandioca"],
  },
];

const TODOS = "__todos__";

function MapaPage() {
  const [mounted, setMounted] = useState(false);
  const [seloFiltro, setSeloFiltro] = useState<string>(TODOS);
  const [produtoFiltro, setProdutoFiltro] = useState<string>(TODOS);
  const [municipioFiltro, setMunicipioFiltro] = useState<string>(TODOS);

  useEffect(() => setMounted(true), []);

  const produtosUnicos = useMemo(
    () => Array.from(new Set(FAZENDAS.flatMap((f) => f.produtos))).sort(),
    [],
  );
  const municipiosUnicos = useMemo(
    () => Array.from(new Set(FAZENDAS.map((f) => f.municipio))).sort(),
    [],
  );

  const fazendasFiltradas = useMemo(() => {
    return FAZENDAS.filter((f) => {
      if (seloFiltro !== TODOS && !f.selosIds.includes(seloFiltro as SeloId)) return false;
      if (produtoFiltro !== TODOS && !f.produtos.includes(produtoFiltro)) return false;
      if (municipioFiltro !== TODOS && f.municipio !== municipioFiltro) return false;
      return true;
    });
  }, [seloFiltro, produtoFiltro, municipioFiltro]);

  const filtrosAtivos =
    (seloFiltro !== TODOS ? 1 : 0) +
    (produtoFiltro !== TODOS ? 1 : 0) +
    (municipioFiltro !== TODOS ? 1 : 0);

  const limparFiltros = () => {
    setSeloFiltro(TODOS);
    setProdutoFiltro(TODOS);
    setMunicipioFiltro(TODOS);
  };

  const totalSelos = fazendasFiltradas.reduce((acc, f) => acc + f.selos, 0);
  const reputacaoMedia =
    fazendasFiltradas.length > 0
      ? fazendasFiltradas.reduce((acc, f) => acc + f.reputacao, 0) / fazendasFiltradas.length
      : 0;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-28 md:pt-32 pb-24">
        {/* HERO */}
        <section className="container mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15">
              <MapPin className="h-3 w-3 mr-1" />
              Mapa interativo
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight">
              Onde está o seu <span className="text-gradient">alimento de origem</span>.
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              Cada ponto é uma família real, um selo verificado e um registro em blockchain.
              Explore os produtores certificados AGROCERT pelo Tocantins.
            </p>
          </div>

          {/* MÉTRICAS */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            <MetricCard
              icon={<Users className="h-5 w-5" />}
              valor={fazendasFiltradas.length.toString()}
              label="Fazendas no mapa"
            />
            <MetricCard
              icon={<Sparkles className="h-5 w-5" />}
              valor={totalSelos.toString()}
              label="Selos ativos"
            />
            <MetricCard
              icon={<Trophy className="h-5 w-5" />}
              valor={reputacaoMedia > 0 ? `★ ${reputacaoMedia.toFixed(2)}` : "—"}
              label="Reputação média"
            />
            <MetricCard
              icon={<MapPin className="h-5 w-5" />}
              valor="139"
              label="Municípios elegíveis"
            />
          </div>
        </section>

        {/* FILTROS */}
        <section className="container mx-auto px-4 mt-10">
          <div className="rounded-3xl border bg-card/60 backdrop-blur-sm p-5 md:p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="h-9 w-9 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center">
                  <Filter className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-semibold font-display">Filtrar produtores</h2>
                  <p className="text-xs text-muted-foreground">
                    Combine selo, produto e município para refinar o mapa.
                  </p>
                </div>
              </div>
              {filtrosAtivos > 0 && (
                <Button variant="ghost" size="sm" onClick={limparFiltros} className="text-xs">
                  <X className="h-3.5 w-3.5" />
                  Limpar ({filtrosAtivos})
                </Button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              {/* SELO */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 block">
                  Selo AGROCERT
                </label>
                <Select value={seloFiltro} onValueChange={setSeloFiltro}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Todos os selos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Todos os selos</SelectItem>
                    {SELOS.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* PRODUTO */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 block">
                  Produto
                </label>
                <Select value={produtoFiltro} onValueChange={setProdutoFiltro}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Todos os produtos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Todos os produtos</SelectItem>
                    {produtosUnicos.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* MUNICÍPIO */}
              <div>
                <label className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1.5 block">
                  Município
                </label>
                <Select value={municipioFiltro} onValueChange={setMunicipioFiltro}>
                  <SelectTrigger className="h-11 rounded-xl">
                    <SelectValue placeholder="Todos os municípios" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TODOS}>Todos os municípios</SelectItem>
                    {municipiosUnicos.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Chips de filtros ativos */}
            {filtrosAtivos > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {seloFiltro !== TODOS && (
                  <FiltroChip
                    label={SELOS.find((s) => s.id === seloFiltro)?.nome ?? ""}
                    onRemove={() => setSeloFiltro(TODOS)}
                  />
                )}
                {produtoFiltro !== TODOS && (
                  <FiltroChip label={produtoFiltro} onRemove={() => setProdutoFiltro(TODOS)} />
                )}
                {municipioFiltro !== TODOS && (
                  <FiltroChip label={municipioFiltro} onRemove={() => setMunicipioFiltro(TODOS)} />
                )}
              </div>
            )}
          </div>
        </section>

        {/* MAPA */}
        <section className="container mx-auto px-4 mt-8">
          {mounted ? (
            <Suspense fallback={<MapaSkeleton />}>
              <MapaTocantins
                key={`${seloFiltro}-${produtoFiltro}-${municipioFiltro}`}
                fazendas={fazendasFiltradas}
              />
            </Suspense>
          ) : (
            <MapaSkeleton />
          )}

          <p className="mt-3 text-xs text-muted-foreground text-center">
            {fazendasFiltradas.length === 0
              ? "Nenhuma fazenda encontrada com os filtros atuais. Tente limpar os filtros."
              : "Clique em um marcador para ver detalhes da fazenda · Mapa © OpenStreetMap"}
          </p>
        </section>

        {/* LISTA */}
        <section className="container mx-auto px-4 mt-16">
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-primary font-semibold mb-2">
                {fazendasFiltradas.length === FAZENDAS.length
                  ? "Produtores em destaque"
                  : `${fazendasFiltradas.length} resultado${fazendasFiltradas.length === 1 ? "" : "s"}`}
              </p>
              <h2 className="text-2xl md:text-3xl font-bold font-display">
                Fazendas certificadas neste mapa
              </h2>
            </div>
            <Button variant="outline" asChild className="hidden md:inline-flex">
              <Link to="/marketplace">
                Ver no marketplace
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {fazendasFiltradas.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center">
              <Filter className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
              <p className="font-semibold mb-1">Nenhuma fazenda encontrada</p>
              <p className="text-sm text-muted-foreground mb-4">
                Ajuste os filtros para ver mais produtores.
              </p>
              <Button variant="outline" size="sm" onClick={limparFiltros}>
                Limpar filtros
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {fazendasFiltradas.map((f) => (
                <article
                  key={f.nome}
                  className="rounded-2xl border bg-card p-5 hover:shadow-elegant transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`h-11 w-11 rounded-xl flex items-center justify-center text-white font-bold font-display ${
                        f.destaque
                          ? "bg-gradient-to-br from-gold to-amber-500"
                          : "bg-gradient-primary"
                      }`}
                    >
                      {f.selos}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">{f.nome}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {f.municipio}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1">
                    {f.produtos.map((p) => (
                      <span
                        key={p}
                        className="text-[10px] uppercase tracking-wider bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full font-medium"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Reputação</span>
                    <span className="font-semibold text-gold">★ {f.reputacao.toFixed(2)}</span>
                  </div>
                  {f.destaque && (
                    <Button
                      size="sm"
                      variant="ghost"
                      asChild
                      className="mt-3 w-full justify-between"
                    >
                      <Link to="/historias/sitio-boa-esperanca">
                        Ver história em destaque
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        <CTAFinalGlobal
          eyebrow="Tecnologia para quem produz"
          title="O futuro do agro familiar já começou."
          subtitle="Cada ponto deste mapa é uma família real. Faça parte da rede AGROCERT-CERRADO."
        />
      </main>
      <SiteFooter />
    </div>
  );
}

function MetricCard({
  icon,
  valor,
  label,
}: {
  icon: React.ReactNode;
  valor: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 flex items-center gap-3">
      <div className="h-10 w-10 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xl font-bold font-display leading-tight">{valor}</p>
        <p className="text-[11px] uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

function FiltroChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button
      onClick={onRemove}
      className="group inline-flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15 px-3 py-1 rounded-full text-xs font-medium transition-colors"
    >
      {label}
      <X className="h-3 w-3 opacity-60 group-hover:opacity-100" />
    </button>
  );
}

function MapaSkeleton() {
  return (
    <div className="h-[520px] md:h-[640px] w-full rounded-3xl border bg-secondary/40 flex items-center justify-center">
      <div className="text-center">
        <div className="h-10 w-10 mx-auto rounded-full border-2 border-primary border-t-transparent animate-spin" />
        <p className="mt-3 text-sm text-muted-foreground">Carregando mapa do Tocantins…</p>
      </div>
    </div>
  );
}
