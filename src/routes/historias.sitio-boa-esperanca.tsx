import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Heart,
  MapPin,
  Play,
  Quote,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Star,
  Sunrise,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SeloBadge } from "@/components/selos/SeloBadge";
import { QrCodeMock } from "@/components/origem/QrCodeMock";
import { getLote, LOTE_DESTAQUE } from "@/data/origem";
import { getSelo } from "@/data/selos";
import familiaImg from "@/assets/familia-tres-geracoes.jpg";
import maosImg from "@/assets/maos-banana.jpg";
import amanhecerImg from "@/assets/amanhecer-cerrado.jpg";
import produtoraImg from "@/assets/produtora-dona-maria.jpg";
import fazendaImg from "@/assets/fazenda-aerea.jpg";

export const Route = createFileRoute("/historias/sitio-boa-esperanca")({
  head: () => ({
    meta: [
      {
        title:
          "A história de Dona Maria — Sítio Boa Esperança · AGROCERT-CERRADO",
      },
      {
        name: "description",
        content:
          "Três gerações, uma terra, uma penca. Conheça a família por trás da Banana Prata Orgânica do Sítio Boa Esperança em Palmas/TO. Do campo à sua mesa, com rosto, história e confiança.",
      },
      {
        property: "og:title",
        content: "A história de Dona Maria — Sítio Boa Esperança",
      },
      {
        property: "og:description",
        content:
          "Três gerações, uma terra, uma penca. A família por trás de cada banana orgânica certificada AGROCERT.",
      },
    ],
  }),
  component: HistoriaPage,
});

function HistoriaPage() {
  const lote = getLote(LOTE_DESTAQUE)!;
  const selos = lote.selos.map(getSelo);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* HERO CINEMATOGRÁFICO */}
      <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
        <img
          src={familiaImg}
          alt="Três gerações da família de Dona Maria no Sítio Boa Esperança"
          width={1920}
          height={1280}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />

        <div className="relative h-full container mx-auto px-4 flex flex-col justify-end pb-16 md:pb-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/20 backdrop-blur text-gold-foreground border border-gold/40 text-xs font-semibold mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              HISTÓRIA EM DESTAQUE · ABRIL 2026
            </div>
            <h1 className="text-4xl md:text-7xl font-bold font-display leading-[1.02] tracking-tight text-foreground">
              Três gerações.<br />
              Uma terra.<br />
              <span className="text-gradient">Uma penca.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-foreground/85 max-w-xl leading-relaxed">
              No coração do Cerrado tocantinense, Dona Maria do Carmo Almeida
              cuida de bananeiras como quem cuida de família. Esta é a história
              de quem está por trás de cada penca que chega à sua mesa.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow"
              >
                <Link to="/origem/$lote" params={{ lote: LOTE_DESTAQUE }}>
                  <ScanLine className="h-4 w-4" />
                  Ver origem completa do lote
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="backdrop-blur bg-background/40">
                <a href="#video">
                  <Play className="h-4 w-4" />
                  Assistir vídeo da família
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO EMOCIONAL */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-10 w-10 text-primary/40 mx-auto mb-6" />
            <p className="font-display text-2xl md:text-4xl leading-tight font-medium text-foreground italic">
              "A bananeira é igual filho. Você planta uma vez, mas cuida pra
              vida toda. E quando ela dá fruto, é porque você deu carinho — não
              veneno."
            </p>
            <p className="mt-6 text-sm uppercase tracking-widest text-primary font-semibold">
              Dona Maria do Carmo · 67 anos · Palmas/TO
            </p>
          </div>
        </div>
      </section>

      {/* CAPÍTULO 1 — O COMEÇO */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="absolute -inset-6 bg-gradient-primary opacity-15 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden border-4 border-card shadow-elegant">
                <img
                  src={amanhecerImg}
                  alt="Amanhecer no Cerrado tocantinense"
                  width={1920}
                  height={1080}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                Capítulo 1 · 1998
              </p>
              <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
                Começou com{" "}
                <span className="text-gradient">12 mudas e uma promessa.</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Maria e Seu Antônio chegaram ao Sítio Boa Esperança com pouco
                mais que vontade. A terra, dura do Cerrado, parecia desconfiar
                deles. Plantaram as primeiras 12 mudas de bananeira em uma
                manhã de chuva, prometendo um ao outro: aqui não entra veneno.
                Veintisete anos depois, a promessa virou patrimônio da família.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-md">
                <Pill icon={Sunrise} valor="1998" label="fundada" />
                <Pill icon={Users} valor="6" label="da família" />
                <Pill icon={MapPin} valor="12,4 ha" label="cultivados" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPÍTULO 2 — AS MÃOS */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                Capítulo 2 · O cuidado
              </p>
              <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
                Cada banana passa por{" "}
                <span className="text-gradient">seis pares de mãos.</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                Aqui não tem máquina apressada. Tem Dona Maria reconhecendo o
                ponto de colheita só de bater os dedos na casca. Tem Seu
                Antônio cortando o cacho no horário certo do amanhecer. Tem o
                filho Pedro carregando até o galpão em pano limpo. Tem a nora
                Cláudia escolhendo penca por penca. Tem o genro João pesando.
                Tem a netinha Lara colando o adesivo do AGROCERT — orgulhosa
                como quem assina o próprio nome.
              </p>
              <div className="mt-8 rounded-2xl border bg-card p-5 flex items-start gap-4 shadow-sm">
                <Heart className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <p className="text-sm leading-relaxed">
                  <strong>22% dos consumidores compram de novo.</strong>{" "}
                  Quando você sabe quem plantou, a relação com o alimento
                  muda. Para sempre.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-gold opacity-15 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden border-4 border-card shadow-elegant">
                <img
                  src={maosImg}
                  alt="Mãos da família segurando bananas com a terra ainda na casca"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="w-full aspect-square object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VÍDEO */}
      <section id="video" className="py-16 md:py-24 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              Capítulo 3 · No olho dela
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
              Um dia no <span className="text-gradient">Sítio Boa Esperança.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              1 minuto e 48 segundos com Dona Maria, da colheita ao café da
              tarde com a família.
            </p>
          </div>

          <div className="relative rounded-3xl overflow-hidden border shadow-elegant max-w-5xl mx-auto group cursor-pointer">
            <img
              src={produtoraImg}
              alt={lote.video.titulo}
              width={1920}
              height={1080}
              loading="lazy"
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 flex items-center justify-center">
              <div className="h-20 w-20 md:h-28 md:w-28 rounded-full bg-white/95 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                <Play className="h-9 w-9 md:h-12 md:w-12 text-primary fill-primary ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-6 text-white flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest opacity-80">
                  Vídeo da produtora
                </p>
                <p className="font-display font-bold text-xl md:text-2xl mt-1">
                  {lote.video.titulo}
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-white/15 backdrop-blur text-xs font-mono">
                {lote.video.duracao}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SELOS DA FAMÍLIA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              Capítulo 4 · O que o trabalho conquistou
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
              5 selos AGROCERT.{" "}
              <span className="text-gradient">Nível Ouro.</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Cada selo é uma auditoria, uma escolha consciente, um pacto com
              a terra. Dona Maria os carrega como medalhas — porque são.
            </p>
          </div>

          <div className="rounded-3xl border bg-gradient-to-br from-secondary/60 to-card p-8 md:p-10 shadow-elegant">
            <div className="flex flex-wrap gap-8 justify-center">
              {selos.map((s) => (
                <SeloBadge key={s.id} selo={s} size="xl" showLabel />
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild variant="outline">
                <Link to="/certificacao">Entender cada selo</Link>
              </Button>
              <Button
                asChild
                className="bg-gradient-primary text-primary-foreground shadow-elegant"
              >
                <Link to="/origem/$lote" params={{ lote: LOTE_DESTAQUE }}>
                  Ver registro blockchain do lote
                  <ShieldCheck className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* A FAZENDA */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden border-4 border-card shadow-elegant">
                <img
                  src={fazendaImg}
                  alt="Vista aérea do Sítio Boa Esperança"
                  width={1600}
                  height={900}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden md:block">
                <div className="rounded-2xl bg-card border shadow-elegant p-4 max-w-xs">
                  <p className="font-display text-2xl font-bold text-gradient">
                    +30%
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                    da propriedade preserva Cerrado nativo e nascentes
                    protegidas por mata ciliar.
                  </p>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
                Capítulo 5 · A casa
              </p>
              <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
                12,4 hectares.{" "}
                <span className="text-gradient">280 metros de altitude.</span>
              </h2>
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                O Sítio Boa Esperança fica a 18 km do centro de Palmas, em uma
                meseta cercada de buritis. O solo arenoso do Cerrado, que
                muitos consideram pobre, virou aliado: drena bem, reduz
                fungos, e exige técnicas de cobertura permanente que a família
                aperfeiçoou ao longo de duas décadas.
              </p>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="mt-6"
              >
                <Link to="/origem/$lote" params={{ lote: LOTE_DESTAQUE }}>
                  Ver mapa interativo da fazenda
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* QR CODE / AUTENTICIDADE */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-gradient-primary text-primary-foreground p-8 md:p-12 shadow-elegant overflow-hidden relative">
            <div className="absolute inset-0 grid-pattern opacity-15" />
            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 text-xs font-semibold mb-5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  AUTENTICIDADE BLOCKCHAIN
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
                  Esta história tem hash.
                </h2>
                <p className="mt-5 text-primary-foreground/90 leading-relaxed text-lg">
                  Cada lote do Sítio Boa Esperança recebe um QR Code único
                  vinculado a um registro imutável em blockchain. Aponte a
                  câmera do celular na embalagem e veja, em tempo real, quem
                  plantou, quando colheu e quais selos aquele lote carrega.
                </p>
                <p className="mt-4 font-mono text-xs md:text-sm break-all opacity-90">
                  {lote.blockchain.hash}
                </p>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="mt-8"
                >
                  <Link to="/origem/$lote" params={{ lote: LOTE_DESTAQUE }}>
                    Ver página pública do lote {lote.lote}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex justify-center">
                <div className="bg-white rounded-3xl p-6 shadow-elegant">
                  <QrCodeMock value={lote.lote} size={224} />
                  <p className="mt-3 text-center text-xs font-mono text-foreground">
                    Lote {lote.lote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section className="py-16 md:py-24 bg-secondary/40">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <p className="text-xs uppercase tracking-widest text-primary font-semibold mb-3">
              Capítulo 6 · Quem provou
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-display leading-tight">
              4,9 ★ de{" "}
              <span className="text-gradient">187 famílias.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {lote.avaliacoes.map((a) => (
              <div
                key={a.nome}
                className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-elegant transition-shadow"
              >
                <div className="flex gap-0.5 text-gold mb-3">
                  {Array.from({ length: a.nota }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed mb-5">"{a.comentario}"</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">
                    {a.nome}
                  </span>
                  <span>
                    {a.cidade} · {a.data}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-10 w-10 text-primary mx-auto mb-6" />
            <h2 className="text-4xl md:text-6xl font-bold font-display leading-tight">
              Cada banana tem rosto.{" "}
              <span className="text-gradient">A próxima pode estar com você.</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Compre direto da família de Dona Maria e ajude a manter três
              gerações vivendo da terra que escolheram cuidar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow"
              >
                <Link to="/marketplace">
                  Comprar do Sítio Boa Esperança — {lote.precoSugerido}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/origem">Conhecer outras famílias</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Pill({
  icon: Icon,
  valor,
  label,
}: {
  icon: typeof Sunrise;
  valor: string;
  label: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-4 text-center shadow-sm">
      <Icon className="h-4 w-4 mx-auto text-primary mb-1.5" />
      <p className="font-display font-bold">{valor}</p>
      <p className="text-[11px] text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}
