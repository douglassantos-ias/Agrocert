import { Trophy } from "lucide-react";
import { calcularNivel, proximoNivel } from "@/data/selos";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface NivelGamificadoProps {
  totalSelos: number;
  nomeProdutor?: string;
  className?: string;
}

export function NivelGamificado({ totalSelos, nomeProdutor, className }: NivelGamificadoProps) {
  const atual = calcularNivel(totalSelos);
  const proximo = proximoNivel(totalSelos);
  const faltam = proximo ? Math.max(proximo.min - totalSelos, 0) : 0;
  const progresso = proximo
    ? Math.min(((totalSelos - (atual.min - 1)) / (proximo.min - (atual.min - 1))) * 100, 100)
    : 100;

  return (
    <div
      className={cn(
        "rounded-2xl border bg-card p-6 shadow-elegant relative overflow-hidden",
        className,
      )}
    >
      <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gradient-primary opacity-10 blur-2xl" />
      <div className="flex items-start justify-between gap-4 relative">
        <div>
          {nomeProdutor && (
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              {nomeProdutor}
            </p>
          )}
          <div className="flex items-center gap-3">
            <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", atual.bg)}>
              <Trophy className="h-6 w-6 text-white" strokeWidth={2.25} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Nível atual</p>
              <h3 className={cn("text-2xl font-bold font-display", atual.cor)}>{atual.nivel}</h3>
            </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold font-display text-gradient">{totalSelos}</p>
          <p className="text-xs text-muted-foreground">selos conquistados</p>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mt-4 relative">{atual.descricao}</p>

      {proximo && (
        <div className="mt-6 relative">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-muted-foreground">
              Progresso até <span className={cn("font-semibold", proximo.cor)}>{proximo.nivel}</span>
            </span>
            <span className="font-medium">
              {faltam === 0 ? "Pronto!" : `Faltam ${faltam} selo${faltam > 1 ? "s" : ""}`}
            </span>
          </div>
          <Progress value={progresso} className="h-2" />
        </div>
      )}
    </div>
  );
}
