const steps = [
  { n: "01", title: "Cadastro do produtor", desc: "Cadastro simplificado da propriedade, produtos e fotos. Em minutos seu perfil está no ar." },
  { n: "02", title: "Solicite a certificação", desc: "Análise documental, vistoria técnica e emissão do selo digital com QR Code único." },
  { n: "03", title: "Venda no marketplace", desc: "Seus produtos chegam a milhares de compradores, com IA sugerindo o preço ideal." },
  { n: "04", title: "Rastreabilidade total", desc: "Cada lote registrado em blockchain. O consumidor escaneia e vê toda a jornada." },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28 bg-secondary/40 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Como funciona
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight">
            Quatro passos. <span className="text-gradient">Zero atravessadores.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <div className="rounded-3xl p-7 bg-card border border-border h-full hover:shadow-elegant transition-shadow">
                <div className="font-display text-5xl font-bold text-gradient mb-4">{s.n}</div>
                <h3 className="font-display text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 h-px w-6 bg-gradient-to-r from-primary/40 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
