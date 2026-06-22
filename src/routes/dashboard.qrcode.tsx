import { createFileRoute } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardLayout";

export const Route = createFileRoute("/dashboard/qrcode")({
  component: () => <SoonPage title="Origem QR Code" desc="Gere etiquetas QR e conte a história de cada lote." />,
});

export function SoonPage({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="space-y-6">
      <DashboardPageHeader eyebrow="Em breve" title={title} description={desc} />
      <div className="rounded-3xl border-2 border-dashed border-border bg-card p-16 text-center">
        <div className="mx-auto h-16 w-16 rounded-2xl bg-gradient-primary/10 grid place-items-center text-primary">
          <Construction className="h-8 w-8" />
        </div>
        <h3 className="font-display text-xl font-bold mt-5">Estamos construindo este módulo</h3>
        <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
          Esta área entra na próxima leva do dashboard. Por enquanto, foque em produtos, pedidos e certificações.
        </p>
      </div>
    </div>
  );
}
