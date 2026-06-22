import { createFileRoute } from "@tanstack/react-router";
import { SoonPage } from "./dashboard.qrcode";

export const Route = createFileRoute("/dashboard/oportunidades")({
  component: () => <SoonPage title="Oportunidades Financeiras" desc="Editais, crédito e incentivos integrados ao seu Score." />,
});
