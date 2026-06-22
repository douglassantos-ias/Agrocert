import { createFileRoute } from "@tanstack/react-router";
import { SoonPage } from "./dashboard.qrcode";

export const Route = createFileRoute("/dashboard/perfil")({
  component: () => <SoonPage title="Perfil da Propriedade" desc="História, fotos e dados que conectam você ao consumidor." />,
});
