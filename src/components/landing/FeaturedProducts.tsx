import { ShieldCheck, Star } from "lucide-react";
import produtosImg from "@/assets/produtos-destaque.jpg";

const products = [
  { name: "Pequi do Cerrado", farm: "Sítio Aurora — Natividade", price: "R$ 18,90", unit: "kg", seal: "Cerrado Sustentável", rating: 4.9 },
  { name: "Queijo Artesanal", farm: "Fazenda São João — Dianópolis", price: "R$ 42,00", unit: "un", seal: "Origem Tocantins", rating: 5.0 },
  { name: "Mel Silvestre", farm: "Apiário Boa Vista — Palmas", price: "R$ 35,00", unit: "500g", seal: "Qualidade Verificada", rating: 4.8 },
  { name: "Farinha de Babaçu", farm: "Coop. Quebradeiras — Tocantinópolis", price: "R$ 24,50", unit: "kg", seal: "Agricultura Familiar", rating: 4.9 },
];

export function FeaturedProducts() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Produtos certificados
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
              Sabores do <span className="text-gradient">Cerrado</span>, com origem verificada
            </h2>
          </div>
          <p className="text-muted-foreground md:max-w-sm">
            Cada produto carrega um QR Code que conta sua história — do plantio à sua mesa.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <article
              key={p.name}
              className="group rounded-3xl bg-card border border-border overflow-hidden hover:border-primary/40 hover:shadow-elegant transition-all duration-300"
            >
              <div className="relative aspect-square overflow-hidden bg-muted">
                <img
                  src={produtosImg}
                  alt={p.name}
                  loading="lazy"
                  width={1280}
                  height={1280}
                  className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-gold text-gold-foreground text-[10px] font-bold uppercase tracking-wider shadow-gold">
                  <ShieldCheck className="h-3 w-3" />
                  {p.seal}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-xs mb-2">
                  <Star className="h-3.5 w-3.5 fill-gold text-gold" />
                  <span className="font-semibold">{p.rating}</span>
                  <span className="text-muted-foreground">· {p.farm}</span>
                </div>
                <h3 className="font-display font-semibold text-base mb-3 leading-tight">{p.name}</h3>
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-display text-xl font-bold text-primary">{p.price}</span>
                    <span className="text-xs text-muted-foreground">/{p.unit}</span>
                  </div>
                  <button className="text-xs font-semibold text-primary hover:text-primary-glow transition-colors">
                    Ver →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
