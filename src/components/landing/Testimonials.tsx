import { Quote } from "lucide-react";
import produtorImg from "@/assets/produtor.jpg";

const testimonials = [
  {
    quote: "Antes eu vendia minha produção pela metade do preço. Hoje, com o selo Origem Tocantins, vendo direto para restaurantes em Palmas e ainda recebo a tempo.",
    name: "Seu Manoel",
    role: "Produtor de pequi · Natividade-TO",
    img: produtorImg,
  },
  {
    quote: "A rastreabilidade muda o jogo. Meus clientes escaneiam o QR Code e veem que o queijo é mesmo da nossa fazenda. Confiança vira venda.",
    name: "Dona Marta",
    role: "Produtora de queijos · Dianópolis-TO",
    img: produtorImg,
  },
  {
    quote: "Como restaurante, garantia de origem é tudo. AGROCERT nos deu acesso a 40 fornecedores certificados em menos de um mês.",
    name: "Chef Rafael Lima",
    role: "Restaurante Cerrado Vivo · Palmas-TO",
    img: produtorImg,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-14">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Histórias reais
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Quem está <span className="text-gradient">colhendo resultados</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-3xl p-7 bg-card border border-border hover:shadow-elegant transition-shadow flex flex-col"
            >
              <Quote className="h-8 w-8 text-gold mb-4" />
              <blockquote className="text-foreground/90 leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 pt-6 border-t border-border">
                <img
                  src={t.img}
                  alt={t.name}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-gold/30"
                />
                <div>
                  <p className="font-display font-semibold text-sm">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
