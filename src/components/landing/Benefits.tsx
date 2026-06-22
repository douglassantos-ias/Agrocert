import { Tractor, ShoppingBasket, ShieldCheck, Brain, MapPin, Link2 } from "lucide-react";

const benefits = [
  {
    icon: Tractor,
    title: "Para produtores",
    desc: "Venda direto, sem atravessadores. Receba pelo valor justo do seu trabalho.",
    accent: "primary" as const,
  },
  {
    icon: ShoppingBasket,
    title: "Para compradores",
    desc: "Alimentos frescos, certificados e com origem verificada do Cerrado.",
    accent: "gold" as const,
  },
  {
    icon: ShieldCheck,
    title: "Certificação digital",
    desc: "4 selos oficiais com vistoria técnica e QR Code em cada produto.",
    accent: "primary" as const,
  },
  {
    icon: Link2,
    title: "Rastreabilidade blockchain",
    desc: "Histórico imutável: produtor, lote, colheita, transporte e venda.",
    accent: "gold" as const,
  },
  {
    icon: Brain,
    title: "Inteligência artificial",
    desc: "Sugestão de preço, previsão de demanda e recomendações personalizadas.",
    accent: "primary" as const,
  },
  {
    icon: MapPin,
    title: "Origem Tocantins",
    desc: "Mapa interativo com produtores em todos os 139 municípios do estado.",
    accent: "gold" as const,
  },
];

export function Benefits() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Solução completa
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Tecnologia que <span className="text-gradient">valoriza o campo</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Uma plataforma que une marketplace, certificação, rastreabilidade e IA
            para fortalecer a agricultura familiar.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="group relative rounded-3xl p-7 bg-card border border-border hover:border-primary/40 hover:shadow-elegant transition-all duration-300"
              >
                <div
                  className={`h-12 w-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${
                    b.accent === "gold"
                      ? "bg-gradient-gold text-gold-foreground shadow-gold"
                      : "bg-gradient-primary text-primary-foreground shadow-elegant"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{b.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
