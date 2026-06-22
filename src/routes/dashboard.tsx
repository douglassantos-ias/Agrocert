import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AGROCERT-CERRADO" },
      { name: "description", content: "Painel do produtor: vendas, produtos, certificações e oportunidades." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DashboardLayout,
});

