import { createFileRoute } from "@tanstack/react-router";
import { SoonPage } from "./dashboard.qrcode";

export const Route = createFileRoute("/dashboard/analytics")({
  component: () => <SoonPage title="Analytics" desc="Métricas avançadas de vendas, conversão e crescimento." />,
});
