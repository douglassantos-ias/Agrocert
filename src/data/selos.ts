import {
  Leaf,
  MapPin,
  Trees,
  Home,
  ShieldCheck,
  Recycle,
  Flower2,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export type SeloId =
  | "organico"
  | "origem-tocantins"
  | "cerrado-sustentavel"
  | "agricultura-familiar"
  | "qualidade-verificada"
  | "producao-sustentavel"
  | "lideranca-feminina"
  | "carbono-consciente";

export interface Selo {
  id: SeloId;
  nome: string;
  curto: string;
  icon: LucideIcon;
  /** Tailwind classes para ring/borda do badge */
  ring: string;
  /** Background gradiente do ícone do badge */
  bg: string;
  /** Cor do ícone */
  iconColor: string;
  /** Texto contextual para o chip */
  chip: string;
  funcao: string;
  justificativa: string;
  criterios: string[];
}

export const SELOS: Selo[] = [
  {
    id: "organico",
    nome: "AGROCERT Orgânico",
    curto: "Orgânico",
    icon: Leaf,
    ring: "ring-emerald-500/30",
    bg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
    iconColor: "text-white",
    chip: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
    funcao:
      "Identifica produtores com práticas orgânicas certificadas ou validadas conforme critérios da plataforma.",
    justificativa:
      "Valoriza produção sem agrotóxicos, atende demanda crescente por alimentos saudáveis e agrega maior valor comercial.",
    criterios: [
      "Sem uso de agrotóxicos sintéticos",
      "Manejo orgânico do solo comprovado",
      "Sementes não-OGM",
      "Auditoria técnica anual",
    ],
  },
  {
    id: "origem-tocantins",
    nome: "Origem Tocantins",
    curto: "Origem TO",
    icon: MapPin,
    ring: "ring-amber-500/30",
    bg: "bg-gradient-to-br from-amber-400 to-orange-500",
    iconColor: "text-white",
    chip: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20",
    funcao: "Garante que o produto foi produzido no estado do Tocantins.",
    justificativa:
      "Fortalece identidade territorial, estimula consumo regional e promove economia local.",
    criterios: [
      "Propriedade registrada em município do Tocantins",
      "CAR e georreferenciamento validados",
      "Cadeia produtiva 100% no estado",
    ],
  },
  {
    id: "cerrado-sustentavel",
    nome: "Cerrado Sustentável",
    curto: "Cerrado",
    icon: Trees,
    ring: "ring-lime-600/30",
    bg: "bg-gradient-to-br from-lime-500 to-green-700",
    iconColor: "text-white",
    chip: "bg-lime-600/10 text-lime-800 dark:text-lime-300 border-lime-600/20",
    funcao:
      "Reconhece produção com responsabilidade ambiental e respeito ao território do Cerrado.",
    justificativa:
      "Valoriza o bioma Cerrado e práticas compatíveis com a preservação ambiental.",
    criterios: [
      "Reserva legal preservada",
      "Sem desmatamento nos últimos 5 anos",
      "Uso responsável de recursos hídricos",
      "Plano de manejo aprovado",
    ],
  },
  {
    id: "agricultura-familiar",
    nome: "Agricultura Familiar",
    curto: "Familiar",
    icon: Home,
    ring: "ring-orange-500/30",
    bg: "bg-gradient-to-br from-orange-400 to-rose-500",
    iconColor: "text-white",
    chip: "bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20",
    funcao: "Identifica produtores enquadrados como agricultura familiar.",
    justificativa:
      "Dá visibilidade ao pequeno produtor e fortalece políticas públicas de inclusão rural.",
    criterios: [
      "DAP/CAF ativo",
      "Mão de obra majoritariamente familiar",
      "Área dentro dos limites legais (até 4 módulos fiscais)",
    ],
  },
  {
    id: "qualidade-verificada",
    nome: "Qualidade Verificada",
    curto: "Qualidade",
    icon: ShieldCheck,
    ring: "ring-sky-500/30",
    bg: "bg-gradient-to-br from-sky-400 to-blue-600",
    iconColor: "text-white",
    chip: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
    funcao:
      "Atesta critérios mínimos de qualidade, higiene, padronização e apresentação dos produtos.",
    justificativa: "Gera confiança imediata ao consumidor no momento da compra.",
    criterios: [
      "Boas práticas de manipulação",
      "Padronização de embalagem e rotulagem",
      "Auditoria de higiene aprovada",
      "Rastreabilidade por lote",
    ],
  },
  {
    id: "producao-sustentavel",
    nome: "Produção Sustentável",
    curto: "Sustentável",
    icon: Recycle,
    ring: "ring-teal-500/30",
    bg: "bg-gradient-to-br from-teal-400 to-emerald-700",
    iconColor: "text-white",
    chip: "bg-teal-500/10 text-teal-700 dark:text-teal-300 border-teal-500/20",
    funcao:
      "Reconhece boas práticas de manejo de solo, água, resíduos e insumos na propriedade.",
    justificativa:
      "O mercado valoriza ESG e produção responsável — conecta o produtor a compradores institucionais.",
    criterios: [
      "Gestão de resíduos sólidos",
      "Conservação de nascentes e APP",
      "Rotação de culturas / cobertura do solo",
      "Eficiência hídrica documentada",
    ],
  },
  {
    id: "lideranca-feminina",
    nome: "Liderança Feminina Rural",
    curto: "Liderança",
    icon: Flower2,
    ring: "ring-fuchsia-500/30",
    bg: "bg-gradient-to-br from-fuchsia-400 to-pink-600",
    iconColor: "text-white",
    chip: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-300 border-fuchsia-500/20",
    funcao:
      "Identifica negócios liderados ou majoritariamente geridos por mulheres rurais.",
    justificativa:
      "Estimula protagonismo feminino no campo, inclusão econômica e acesso a crédito qualificado.",
    criterios: [
      "Gestão por mulher comprovada",
      "Mais de 50% da equipe feminina ou propriedade em nome feminino",
      "Adesão à rede de mentoria AGROCERT",
    ],
  },
  {
    id: "carbono-consciente",
    nome: "Carbono Consciente",
    curto: "Carbono",
    icon: Cloud,
    ring: "ring-cyan-500/30",
    bg: "bg-gradient-to-br from-cyan-400 to-indigo-600",
    iconColor: "text-white",
    chip: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20",
    funcao:
      "Reconhece produtores com práticas de redução de emissões, agrofloresta, recuperação e manejo eficiente.",
    justificativa:
      "Antecipa tendências globais de baixo carbono e abre acesso a mercados premium e créditos verdes.",
    criterios: [
      "Inventário básico de emissões",
      "Áreas em recuperação ou agrofloresta",
      "Plano de redução de emissões assinado",
      "Monitoramento anual de carbono",
    ],
  },
];

export const getSelo = (id: SeloId) => SELOS.find((s) => s.id === id)!;

// ===== Gamificação =====
export type Nivel = "Bronze" | "Prata" | "Ouro" | "Diamante";

export interface NivelInfo {
  nivel: Nivel;
  min: number;
  max: number;
  cor: string;
  bg: string;
  descricao: string;
}

export const NIVEIS: NivelInfo[] = [
  {
    nivel: "Bronze",
    min: 1,
    max: 2,
    cor: "text-amber-700 dark:text-amber-400",
    bg: "bg-gradient-to-br from-amber-700 to-amber-900",
    descricao: "Produtor iniciante na jornada de certificação.",
  },
  {
    nivel: "Prata",
    min: 3,
    max: 4,
    cor: "text-slate-500 dark:text-slate-300",
    bg: "bg-gradient-to-br from-slate-300 to-slate-500",
    descricao: "Produtor consolidado com práticas reconhecidas.",
  },
  {
    nivel: "Ouro",
    min: 5,
    max: 6,
    cor: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-gradient-to-br from-yellow-400 to-amber-600",
    descricao: "Referência regional em qualidade e sustentabilidade.",
  },
  {
    nivel: "Diamante",
    min: 7,
    max: 99,
    cor: "text-cyan-600 dark:text-cyan-300",
    bg: "bg-gradient-to-br from-cyan-300 via-sky-400 to-indigo-500",
    descricao: "Elite AGROCERT — alta reputação e entregas impecáveis.",
  },
];

export function calcularNivel(quantidadeSelos: number): NivelInfo {
  if (quantidadeSelos >= 7) return NIVEIS[3];
  if (quantidadeSelos >= 5) return NIVEIS[2];
  if (quantidadeSelos >= 3) return NIVEIS[1];
  return NIVEIS[0];
}

export function proximoNivel(quantidadeSelos: number): NivelInfo | null {
  const atual = calcularNivel(quantidadeSelos);
  const idx = NIVEIS.findIndex((n) => n.nivel === atual.nivel);
  return idx < NIVEIS.length - 1 ? NIVEIS[idx + 1] : null;
}
