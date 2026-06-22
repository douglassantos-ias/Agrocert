import { CheckCircle2, Hash, Calendar, MapPin, FileCheck2, User } from "lucide-react";
import { SELOS } from "@/data/selos";
import { SeloBadge } from "./SeloBadge";

export function BlockchainRecord() {
  const selo = SELOS[0]; // Orgânico — exemplo

  const linhas = [
    { icon: Hash, label: "ID do Produtor", value: "PROD-TO-2847" },
    { icon: FileCheck2, label: "Produto / Lote", value: "Banana Prata Orgânica · Lote 2026-0418-A" },
    { icon: CheckCircle2, label: "Tipo de Selo", value: selo.nome },
    { icon: User, label: "Auditor Responsável", value: "Eng. Agr. Camila Rocha (CREA-TO 28491)" },
    { icon: Calendar, label: "Emissão / Validade", value: "18/04/2026 → 18/04/2027" },
    { icon: MapPin, label: "Município", value: "Palmas, Tocantins" },
  ];

  return (
    <div className="rounded-3xl border bg-card overflow-hidden shadow-elegant">
      <div className="bg-gradient-primary p-6 text-primary-foreground flex items-center gap-4">
        <SeloBadge selo={selo} size="lg" />
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest opacity-80">Registro Blockchain</p>
          <h3 className="text-xl font-bold font-display">Certificado autêntico</h3>
          <p className="text-xs opacity-90 mt-1 font-mono break-all">
            0x9f3a…c41e · verificado em 4 nós
          </p>
        </div>
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 text-xs font-medium">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Ativo
        </div>
      </div>

      <div className="p-6 space-y-3">
        {linhas.map((l) => {
          const Icon = l.icon;
          return (
            <div key={l.label} className="flex items-start gap-3 text-sm">
              <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">{l.label}</p>
                <p className="font-medium truncate">{l.value}</p>
              </div>
            </div>
          );
        })}

        <div className="pt-3 mt-3 border-t border-border/60">
          <p className="text-xs text-muted-foreground mb-2">Critérios atendidos</p>
          <div className="flex flex-wrap gap-1.5">
            {selo.criterios.map((c) => (
              <span
                key={c}
                className="text-xs px-2.5 py-1 rounded-full bg-success/10 text-success border border-success/20"
              >
                ✓ {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
