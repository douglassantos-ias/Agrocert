import { createFileRoute } from "@tanstack/react-router";
import { SoonPage } from "./dashboard.qrcode";

export const Route = createFileRoute("/dashboard/configuracoes")({
  component: () => <SoonPage title="Configurações" desc="Conta, notificações, privacidade LGPD e integrações." />,
});
