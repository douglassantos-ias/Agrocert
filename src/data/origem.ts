import type { SeloId } from "./selos";

export interface Avaliacao {
  nome: string;
  cidade: string;
  nota: number; // 1..5
  comentario: string;
  data: string;
}

export interface LoteOrigem {
  lote: string;
  produto: string;
  variedade: string;
  unidade: string;
  precoSugerido: string;

  produtor: {
    nome: string;
    fazenda: string;
    municipio: string;
    estado: string;
    fotoUrl: string;
    fundadaEm: string;
    membrosFamilia: number;
  };

  fazenda: {
    fotoAereaUrl: string;
    areaHa: number;
    altitudeM: number;
    bioma: string;
    coordenadas: { lat: number; lng: number };
  };

  historia: string;
  comoProduzimos: string[];

  video: {
    titulo: string;
    duracao: string;
    thumbnailUrl: string;
  };

  selos: SeloId[];

  blockchain: {
    hash: string;
    rede: string;
    bloco: number;
    confirmacoes: number;
    emitidoEm: string;
    auditor: string;
  };

  colheita: {
    data: string;
    metodo: string;
    embalagemEm: string;
    transporte: string;
  };

  metricas: {
    escaneamentos: number;
    visualizacoes: number;
    recompras: number;
    avaliacaoMedia: number;
    totalAvaliacoes: number;
  };

  avaliacoes: Avaliacao[];
}

export const LOTES: Record<string, LoteOrigem> = {
  "BAN-2026-0418-A": {
    lote: "BAN-2026-0418-A",
    produto: "Banana Prata Orgânica",
    variedade: "Prata Anã",
    unidade: "Penca · 1,2 kg",
    precoSugerido: "R$ 14,90",

    produtor: {
      nome: "Maria do Carmo Almeida",
      fazenda: "Sítio Boa Esperança",
      municipio: "Palmas",
      estado: "TO",
      fotoUrl: "/src/assets/produtora-dona-maria.jpg",
      fundadaEm: "1998",
      membrosFamilia: 6,
    },

    fazenda: {
      fotoAereaUrl: "/src/assets/fazenda-aerea.jpg",
      areaHa: 12.4,
      altitudeM: 280,
      bioma: "Cerrado",
      coordenadas: { lat: -10.184, lng: -48.333 },
    },

    historia:
      "Dona Maria começou a cultivar bananas no Sítio Boa Esperança em 1998, ao lado do esposo Seu Antônio. Hoje, três gerações da família vivem da terra: filhos, noras, genros e os primeiros netos já aprendem a reconhecer o ponto certo da colheita. Cada penca leva o cuidado de quem entende a banana como herança — não como mercadoria.",

    comoProduzimos: [
      "Manejo 100% orgânico, sem agrotóxicos sintéticos há mais de 12 anos.",
      "Adubação com compostagem da própria propriedade e biofertilizantes naturais.",
      "Cobertura permanente do solo com palha de bananeira para reter umidade do Cerrado.",
      "Colheita manual no ponto exato, embalagem no mesmo dia em galpão climatizado.",
      "Logística refrigerada até 24h após a colheita.",
    ],

    video: {
      titulo: "Um dia no Sítio Boa Esperança com Dona Maria",
      duracao: "1:48",
      thumbnailUrl: "/src/assets/produtora-dona-maria.jpg",
    },

    selos: ["organico", "origem-tocantins", "agricultura-familiar", "lideranca-feminina", "cerrado-sustentavel"],

    blockchain: {
      hash: "0x9f3a8c41e7d2b5f06a44e2bc917f0c41ed8a7b29",
      rede: "AGROCERT Chain (mock)",
      bloco: 1_284_736,
      confirmacoes: 4,
      emitidoEm: "18/04/2026 · 06:42",
      auditor: "Eng. Agr. Camila Rocha · CREA-TO 28491",
    },

    colheita: {
      data: "18/04/2026",
      metodo: "Manual, no ponto fisiológico ideal",
      embalagemEm: "18/04/2026 · 11:20",
      transporte: "Caminhão refrigerado · 8°C",
    },

    metricas: {
      escaneamentos: 2847,
      visualizacoes: 4128,
      recompras: 612,
      avaliacaoMedia: 4.9,
      totalAvaliacoes: 187,
    },

    avaliacoes: [
      {
        nome: "Juliana M.",
        cidade: "Palmas, TO",
        nota: 5,
        comentario:
          "Saber quem plantou muda tudo. A banana é incrível e me senti parte de uma história. Já comprei de novo duas vezes.",
        data: "12/04/2026",
      },
      {
        nome: "Rafael P.",
        cidade: "Brasília, DF",
        nota: 5,
        comentario:
          "Doce na medida certa, casca limpinha, e o vídeo da Dona Maria emocionou minha família inteira. Recomendo demais.",
        data: "08/04/2026",
      },
      {
        nome: "Patrícia L.",
        cidade: "Goiânia, GO",
        nota: 4,
        comentario:
          "Qualidade impecável. Adoraria ver mais produtos do Sítio Boa Esperança no marketplace.",
        data: "01/04/2026",
      },
    ],
  },
};

export const getLote = (lote: string): LoteOrigem | undefined => LOTES[lote];

export const LOTE_DESTAQUE = "BAN-2026-0418-A";
