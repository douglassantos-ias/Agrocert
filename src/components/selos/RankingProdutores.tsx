import { Crown, MapPin } from "lucide-react";
import { SELOS, calcularNivel, type SeloId } from "@/data/selos";
import { SeloBadge } from "./SeloBadge";
import { cn } from "@/lib/utils";

interface ProdutorRanking {
  posicao: number;
  nome: string;
  municipio: string;
  selos: SeloId[];
  reputacao: number;
}

const PRODUTORES: ProdutorRanking[] = [
  {
    posicao: 1,
    nome: "Sítio Boa Esperança",
    municipio: "Palmas, TO",
    selos: [
      "organico",
      "origem-tocantins",
      "cerrado-sustentavel",
      "agricultura-familiar",
      "qualidade-verificada",
      "producao-sustentavel",
      "carbono-consciente",
    ],
    reputacao: 4.98,
  },
  {
    posicao: 2,
    nome: "Cooperativa Mãos do Cerrado",
    municipio: "Porto Nacional, TO",
    selos: [
      "origem-tocantins",
      "cerrado-sustentavel",
      "agricultura-familiar",
      "qualidade-verificada",
      "lideranca-feminina",
      "producao-sustentavel",
    ],
    reputacao: 4.94,
  },
  {
    posicao: 3,
    nome: "Fazenda Vereda Dourada",
    municipio: "Gurupi, TO",
    selos: [
      "organico",
      "origem-tocantins",
      "qualidade-verificada",
      "producao-sustentavel",
      "carbono-consciente",
    ],
    reputacao: 4.91,
  },
  {
    posicao: 4,
    nome: "Mel da Serra",
    municipio: "Natividade, TO",
    selos: ["origem-tocantins", "cerrado-sustentavel", "agricultura-familiar", "qualidade-verificada"],
    reputacao: 4.87,
  },
  {
    posicao: 5,
    nome: "Roça das Mulheres",
    municipio: "Araguaína, TO",
    selos: ["origem-tocantins", "agricultura-familiar", "lideranca-feminina"],
    reputacao: 4.85,
  },
];

export function RankingProdutores() {
  return (
    <div className="space-y-3">
      {PRODUTORES.map((p) => {
        const nivel = calcularNivel(p.selos.length);
        return (
          <div
            key={p.posicao}
            className={cn(
              "rounded-2xl border bg-card p-4 md:p-5 hover:shadow-elegant transition-shadow flex items-center gap-4",
              p.posicao === 1 && "border-gold/40 bg-gradient-to-r from-gold/5 to-transparent",
            )}
          >
            <div
              className={cn(
                "h-12 w-12 shrink-0 rounded-xl flex items-center justify-center font-display font-bold",
                p.posicao === 1
                  ? "bg-gradient-gold text-gold-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
            >
              {p.posicao === 1 ? <Crown className="h-6 w-6" /> : `#${p.posicao}`}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-semibold truncate">{p.nome}</h4>
                <span className={cn("text-xs font-bold", nivel.cor)}>{nivel.nivel}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                <MapPin className="h-3 w-3" />
                {p.municipio}
                <span className="mx-1">•</span>
                <span>★ {p.reputacao.toFixed(2)}</span>
              </div>
            </div>

            <div className="hidden sm:flex -space-x-2">
              {p.selos.slice(0, 5).map((id) => {
                const selo = SELOS.find((s) => s.id === id)!;
                return <SeloBadge key={id} selo={selo} size="sm" />;
              })}
              {p.selos.length > 5 && (
                <div className="h-9 w-9 rounded-full bg-secondary border-4 border-background flex items-center justify-center text-[10px] font-bold">
                  +{p.selos.length - 5}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
