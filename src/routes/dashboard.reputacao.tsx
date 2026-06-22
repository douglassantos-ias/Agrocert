import { createFileRoute } from "@tanstack/react-router";
import { SoonPage } from "./dashboard.qrcode";

export const Route = createFileRoute("/dashboard/reputacao")({
  component: () => <SoonPage title="Reputação" desc="Avaliações, indicadores e sugestões de IA para crescer." />,
});
