import { createFileRoute } from "@tanstack/react-router";
import { ComingSoon } from "@/components/ComingSoon";

export const Route = createFileRoute("/rastreabilidade")({
  head: () => ({
    meta: [
      { title: "Rastreabilidade Blockchain — AGROCERT-CERRADO" },
      { name: "description", content: "Histórico imutável de cada lote: produtor, colheita, transporte e venda." },
    ],
  }),
  component: () => (
    <ComingSoon
      eyebrow="Rastreabilidade Blockchain"
      title="Da semente à sua mesa, sem zonas cinzentas."
      description="Cada produto certificado gera um registro imutável em blockchain. Escaneie o QR Code e veja toda a jornada — produtor, lote, data de colheita, certificação, transporte e venda."
    />
  ),
});
