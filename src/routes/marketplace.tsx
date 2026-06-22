import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  ShieldCheck,
  Star,
  MapPin,
  ArrowRight,
  Sparkles,
  ShoppingBasket,
  Truck,
  Leaf,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
import produtosImg from "@/assets/produtos-destaque.jpg";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Marketplace AGROCERT — Produtos certificados do Cerrado" },
      {
        name: "description",
        content:
          "Compre direto de produtores certificados do Cerrado tocantinense. Frutas, queijos, mel, doces e hortaliças com selo digital, QR Code de origem e rastreabilidade blockchain.",
      },
      { property: "og:title", content: "Marketplace AGROCERT — Produtos certificados do Cerrado" },
      {
        property: "og:description",
        content: "Sabores do Cerrado, direto do produtor. Origem verificada, preço justo, entrega rápida.",
      },
    ],
  }),
  component: MarketplacePage,
});

type Categoria = "Frutas" | "Hortaliças" | "Queijos" | "Mel" | "Doces" | "Grãos";

interface Produto {
  id: string;
  nome: string;
  produtor: string;
  municipio: string;
  preco: number;
  unidade: string;
  categoria: Categoria;
  selo: string;
  rating: number;
  destaque?: boolean;
  ecologico?: boolean;
}

const PRODUTOS: Produto[] = [
  { id: "1", nome: "Pequi do Cerrado", produtor: "Sítio Aurora", municipio: "Natividade, TO", preco: 18.9, unidade: "kg", categoria: "Frutas", selo: "Cerrado Sustentável", rating: 4.9, destaque: true, ecologico: true },
  { id: "2", nome: "Queijo Artesanal", produtor: "Fazenda São João", municipio: "Dianópolis, TO", preco: 42.0, unidade: "un", categoria: "Queijos", selo: "Origem Tocantins", rating: 5.0, destaque: true },
  { id: "3", nome: "Mel Silvestre", produtor: "Apiário Boa Vista", municipio: "Palmas, TO", preco: 35.0, unidade: "500g", categoria: "Mel", selo: "Qualidade Verificada", rating: 4.8 },
  { id: "4", nome: "Farinha de Babaçu", produtor: "Coop. Quebradeiras", municipio: "Tocantinópolis, TO", preco: 24.5, unidade: "kg", categoria: "Grãos", selo: "Agricultura Familiar", rating: 4.9, ecologico: true },
  { id: "5", nome: "Banana Prata Orgânica", produtor: "Sítio Boa Esperança", municipio: "Palmas, TO", preco: 9.9, unidade: "kg", categoria: "Frutas", selo: "Orgânico", rating: 4.95, destaque: true, ecologico: true },
  { id: "6", nome: "Polpa de Cupuaçu", produtor: "Coop. Mãos do Cerrado", municipio: "Porto Nacional, TO", preco: 22.0, unidade: "1kg", categoria: "Frutas", selo: "Origem Tocantins", rating: 4.85 },
  { id: "7", nome: "Doce de Buriti", produtor: "Roça das Mulheres", municipio: "Araguaína, TO", preco: 28.0, unidade: "300g", categoria: "Doces", selo: "Liderança Feminina", rating: 4.9 },
  { id: "8", nome: "Hortaliças mistas (cesta)", produtor: "Sítio Boa Esperança", municipio: "Palmas, TO", preco: 49.0, unidade: "cesta", categoria: "Hortaliças", selo: "Orgânico", rating: 4.93, ecologico: true },
  { id: "9", nome: "Própolis Verde", produtor: "Mel da Serra", municipio: "Natividade, TO", preco: 58.0, unidade: "100ml", categoria: "Mel", selo: "Qualidade Verificada", rating: 4.92 },
];

const TODOS = "__todos__";
const CATS: Categoria[] = ["Frutas", "Hortaliças", "Queijos", "Mel", "Doces", "Grãos"];

function MarketplacePage() {
  const [busca, setBusca] = useState("");
  const [cat, setCat] = useState<string>(TODOS);
  const [ordenar, setOrdenar] = useState<string>("destaque");

  const filtrados = useMemo(() => {
    let lista = PRODUTOS.filter((p) => {
      if (cat !== TODOS && p.categoria !== cat) return false;
      if (busca) {
        const q = busca.toLowerCase();
        return (
          p.nome.toLowerCase().includes(q) ||
          p.produtor.toLowerCase().includes(q) ||
          p.municipio.toLowerCase().includes(q)
        );
      }
      return true;
    });
    if (ordenar === "preco-asc") lista = [...lista].sort((a, b) => a.preco - b.preco);
    if (ordenar === "preco-desc") lista = [...lista].sort((a, b) => b.preco - a.preco);
    if (ordenar === "rating") lista = [...lista].sort((a, b) => b.rating - a.rating);
    if (ordenar === "destaque") lista = [...lista].sort((a, b) => Number(!!b.destaque) - Number(!!a.destaque));
    return lista;
  }, [busca, cat, ordenar]);

  const filtrosAtivos = (busca ? 1 : 0) + (cat !== TODOS ? 1 : 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="pt-24">
        {/* HERO */}
        <section className="relative overflow-hidden bg-gradient-hero">
          <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
          <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-gradient-primary opacity-15 blur-3xl" />
          <div className="container mx-auto px-4 py-16 md:py-24 relative">
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-7"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium mb-6">
                  <Sparkles className="h-3.5 w-3.5 text-gold" />
                  <span>Marketplace certificado · Origem verificada</span>
                </div>
                <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  Sabores do Cerrado,<br />
                  <span className="text-gradient">direto do produtor.</span>
                </h1>
                <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  Cada produto carrega um QR Code que conta sua história — do plantio à sua mesa.
                  Preço justo, origem rastreada, sem atravessador.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow rounded-xl h-12 px-7 transition-all hover:-translate-y-0.5">
                    <a href="#vitrine">
                      <ShoppingBasket className="h-4 w-4" />
                      Explorar produtos
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-xl h-12 px-7 border-2">
                    <Link to="/mapa">
                      <MapPin className="h-4 w-4" />
                      Ver no mapa
                    </Link>
                  </Button>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-4 max-w-md">
                  <Stat valor="2.847" label="produtores ativos" />
                  <Stat valor="139" label="municípios" />
                  <Stat valor="4.9★" label="avaliação média" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="lg:col-span-5 relative"
              >
                <div className="absolute -inset-6 bg-gradient-primary opacity-20 blur-3xl rounded-full" />
                <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5] bg-muted">
                  <img
                    src={produtosImg}
                    alt="Cesta de produtos certificados do Cerrado"
                    className="absolute inset-0 h-full w-full object-cover"
                    width={1280}
                    height={1600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-sidebar/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 glass rounded-2xl px-3 py-2 flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider font-bold">
                      Frescos hoje
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 glass rounded-2xl p-4 shadow-elegant">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-gradient-gold flex items-center justify-center shrink-0">
                        <ShieldCheck className="h-5 w-5 text-gold-foreground" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                          Origem verificada
                        </p>
                        <p className="text-sm font-semibold truncate">
                          Blockchain · QR Code por lote
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* DIFERENCIAIS */}
        <section className="py-16 md:py-20 border-y border-border bg-secondary/30">
          <div className="container mx-auto px-4 grid sm:grid-cols-3 gap-6">
            {[
              { icon: ShieldCheck, t: "100% Certificado", d: "Selo digital AGROCERT auditável." },
              { icon: Truck, t: "Direto do produtor", d: "Sem intermediários, preço justo." },
              { icon: Leaf, t: "Origem rastreada", d: "QR Code com história e blockchain." },
            ].map((f) => {
              const Ic = f.icon;
              return (
                <div
                  key={f.t}
                  className="rounded-2xl border bg-card p-6 flex items-start gap-4 hover:shadow-elegant transition-all hover:-translate-y-0.5"
                >
                  <div className="h-12 w-12 rounded-xl bg-gradient-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <Ic className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold">{f.t}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{f.d}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* FILTROS + VITRINE */}
        <section id="vitrine" className="py-20 md:py-28">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-3">
                Vitrine certificada
              </p>
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
                Compre com <span className="text-gradient">origem.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                Filtre por categoria, busque por produtor ou município. Cada item tem rastro real.
              </p>
            </div>

            {/* Filtros */}
            <div className="rounded-3xl border bg-card/60 backdrop-blur-sm p-5 md:p-6 shadow-sm mb-10">
              <div className="grid md:grid-cols-12 gap-3">
                <div className="md:col-span-6 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    placeholder="Buscar produto, produtor ou município…"
                    className="pl-10 h-11 rounded-xl"
                  />
                </div>
                <div className="md:col-span-3">
                  <Select value={cat} onValueChange={setCat}>
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={TODOS}>Todas as categorias</SelectItem>
                      {CATS.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-3">
                  <Select value={ordenar} onValueChange={setOrdenar}>
                    <SelectTrigger className="h-11 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="destaque">Destaques primeiro</SelectItem>
                      <SelectItem value="rating">Mais bem avaliados</SelectItem>
                      <SelectItem value="preco-asc">Menor preço</SelectItem>
                      <SelectItem value="preco-desc">Maior preço</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {filtrosAtivos > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Filter className="h-3 w-3" />
                    {filtrados.length} resultado{filtrados.length === 1 ? "" : "s"}
                  </span>
                  {busca && (
                    <button
                      onClick={() => setBusca("")}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                    >
                      "{busca}" <X className="h-3 w-3" />
                    </button>
                  )}
                  {cat !== TODOS && (
                    <button
                      onClick={() => setCat(TODOS)}
                      className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/15 transition-colors"
                    >
                      {cat} <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Grade de produtos */}
            {filtrados.length === 0 ? (
              <div className="rounded-3xl border-2 border-dashed border-border p-12 text-center">
                <Filter className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
                <p className="font-semibold mb-1">Nenhum produto encontrado</p>
                <p className="text-sm text-muted-foreground mb-4">Ajuste a busca ou os filtros.</p>
                <Button variant="outline" size="sm" onClick={() => { setBusca(""); setCat(TODOS); }}>
                  Limpar filtros
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtrados.map((p, i) => (
                  <motion.article
                    key={p.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: (i % 4) * 0.05 }}
                    className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/40 hover:shadow-elegant hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      <img
                        src={produtosImg}
                        alt={p.nome}
                        loading="lazy"
                        width={1280}
                        height={1280}
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-gold text-gold-foreground text-[10px] font-bold uppercase tracking-wider shadow-gold">
                        <ShieldCheck className="h-3 w-3" />
                        {p.selo}
                      </div>
                      {p.ecologico && (
                        <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-success/90 text-success-foreground text-[10px] font-bold">
                          <Leaf className="h-3 w-3" />
                        </div>
                      )}
                      {p.destaque && (
                        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider">
                          Destaque
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-xs mb-2">
                        <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                        <span className="font-semibold">{p.rating.toFixed(1)}</span>
                        <span className="text-muted-foreground truncate">· {p.produtor}</span>
                      </div>
                      <h3 className="font-display font-semibold text-base leading-tight mb-1">
                        {p.nome}
                      </h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                        <MapPin className="h-3 w-3" />
                        {p.municipio}
                      </p>
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="font-display text-xl font-bold text-primary">
                            R$ {p.preco.toFixed(2).replace(".", ",")}
                          </span>
                          <span className="text-xs text-muted-foreground">/{p.unidade}</span>
                        </div>
                        <Button size="sm" variant="ghost" className="text-primary hover:text-primary hover:bg-primary/10">
                          Ver
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA INTERMEDIÁRIO */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="rounded-3xl border bg-gradient-to-br from-secondary via-card to-secondary/40 p-8 md:p-12 text-center">
              <Badge className="bg-gold/15 text-gold-foreground border border-gold/30 mb-4">
                Confiança também vende
              </Badge>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
                Quer vender no marketplace?
              </h3>
              <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
                Cadastre sua produção, conquiste seus selos e ganhe visibilidade nacional.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Button asChild size="lg" className="bg-gradient-primary text-primary-foreground rounded-xl">
                  <Link to="/cadastro">
                    Quero participar
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl border-2">
                  <Link to="/certificacao">Descobrir benefícios</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <CTAFinalGlobal />
      </main>
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
