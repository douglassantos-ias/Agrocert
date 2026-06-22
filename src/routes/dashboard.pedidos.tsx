import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Truck,
  PackageCheck,
  Clock,
  ShoppingCart,
  ArrowRight,
  Plus,
  MapPin,
  X,
} from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/pedidos")({
  component: PedidosPage,
});

interface Pedido {
  id: string;
  cliente_nome: string;
  cliente_municipio: string | null;
  itens: { nome: string; qtd: number }[] | null;
  valor_total: number;
  status: "novo" | "separando" | "transporte" | "entregue" | "cancelado";
  observacoes: string | null;
  created_at: string;
}

const STATUS_FLOW: { id: Pedido["status"]; label: string; icon: typeof Clock; color: string }[] = [
  { id: "novo", label: "Novo", icon: Clock, color: "from-sky-400 to-blue-600" },
  { id: "separando", label: "Separando", icon: Package, color: "from-amber-400 to-orange-500" },
  { id: "transporte", label: "Em transporte", icon: Truck, color: "from-violet-400 to-fuchsia-600" },
  { id: "entregue", label: "Entregue", icon: PackageCheck, color: "from-emerald-400 to-emerald-700" },
];

function PedidosPage() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtro, setFiltro] = useState<string>("todos");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  async function load() {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("pedidos")
      .select("*")
      .eq("produtor_id", user.id)
      .order("created_at", { ascending: false });
    setPedidos((data ?? []) as Pedido[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user]);

  const visiveis = pedidos.filter((p) => filtro === "todos" || p.status === filtro);

  async function avancar(p: Pedido) {
    const idx = STATUS_FLOW.findIndex((s) => s.id === p.status);
    const proximo = STATUS_FLOW[idx + 1];
    if (!proximo) return;
    const { error } = await supabase
      .from("pedidos")
      .update({ status: proximo.id })
      .eq("id", p.id);
    if (error) toast.error("Erro ao atualizar");
    else {
      toast.success(`Pedido movido para ${proximo.label}`);
      load();
    }
  }

  async function cancelar(p: Pedido) {
    if (!confirm("Cancelar este pedido?")) return;
    await supabase.from("pedidos").update({ status: "cancelado" }).eq("id", p.id);
    toast.success("Pedido cancelado");
    load();
  }

  // contagem por status
  const contagem = STATUS_FLOW.map((s) => ({
    ...s,
    total: pedidos.filter((p) => p.status === s.id).length,
  }));

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Operação"
        title="Pedidos"
        description="Acompanhe cada venda do recebimento à entrega. Cliente atualizado, vendas no fluxo."
        actions={
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-primary-foreground rounded-xl h-10 shadow-elegant">
                <Plus className="h-4 w-4" /> Registrar pedido
              </Button>
            </DialogTrigger>
            <PedidoForm onSaved={() => { setOpen(false); load(); }} />
          </Dialog>
        }
      />

      {/* Resumo do funil */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {contagem.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.button
              key={s.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              onClick={() => setFiltro(s.id)}
              className={cn(
                "rounded-2xl border bg-card p-4 text-left transition-all hover:shadow-elegant",
                filtro === s.id ? "border-primary ring-2 ring-primary/20" : "border-border",
              )}
            >
              <div className="flex items-center justify-between">
                <div
                  className={cn(
                    "h-9 w-9 rounded-lg bg-gradient-to-br grid place-items-center text-white",
                    s.color,
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
                <span className="font-display text-2xl font-bold">{s.total}</span>
              </div>
              <p className="mt-3 text-sm font-semibold">{s.label}</p>
            </motion.button>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <Select value={filtro} onValueChange={setFiltro}>
          <SelectTrigger className="w-48 h-10 bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            {STATUS_FLOW.map((s) => (
              <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
            ))}
            <SelectItem value="cancelado">Cancelados</SelectItem>
          </SelectContent>
        </Select>
        {filtro !== "todos" && (
          <button
            onClick={() => setFiltro("todos")}
            className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <X className="h-3 w-3" /> Limpar filtro
          </button>
        )}
      </div>

      {/* Lista */}
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-muted/60 animate-pulse" />
          ))}
        </div>
      ) : visiveis.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary/10 grid place-items-center text-primary">
            <ShoppingCart className="h-7 w-7" />
          </div>
          <h3 className="font-display font-bold text-lg mt-4">Nenhum pedido aqui</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
            Quando seus produtos começarem a vender, os pedidos aparecerão neste painel.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {visiveis.map((p, i) => {
            const statusInfo = STATUS_FLOW.find((s) => s.id === p.status);
            const proxIdx = STATUS_FLOW.findIndex((s) => s.id === p.status) + 1;
            const proximo = STATUS_FLOW[proxIdx];
            const itens = Array.isArray(p.itens) ? p.itens : [];
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-border bg-card p-4 md:p-5 hover:shadow-elegant transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-bold">{p.cliente_nome}</h3>
                      {statusInfo && (
                        <span
                          className={cn(
                            "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md text-white bg-gradient-to-r",
                            statusInfo.color,
                          )}
                        >
                          {statusInfo.label}
                        </span>
                      )}
                      {p.status === "cancelado" && (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-destructive/10 text-destructive border border-destructive/30">
                          Cancelado
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-3 flex-wrap">
                      {p.cliente_municipio && (
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {p.cliente_municipio}
                        </span>
                      )}
                      <span>{new Date(p.created_at).toLocaleDateString("pt-BR")}</span>
                      <span>
                        {itens.length} {itens.length === 1 ? "item" : "itens"}
                      </span>
                    </p>
                    {itens.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1 truncate">
                        {itens.map((it) => `${it.qtd}× ${it.nome}`).join(" · ")}
                      </p>
                    )}
                  </div>

                  <div className="text-right md:min-w-[110px]">
                    <p className="font-display text-xl font-bold text-gradient">
                      {Number(p.valor_total).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>

                  {p.status !== "entregue" && p.status !== "cancelado" && (
                    <div className="flex flex-col sm:flex-row gap-2">
                      {proximo && (
                        <Button
                          onClick={() => avancar(p)}
                          className="bg-gradient-primary text-primary-foreground rounded-xl h-9"
                          size="sm"
                        >
                          {proximo.label} <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        onClick={() => cancelar(p)}
                        variant="outline"
                        size="sm"
                        className="rounded-xl h-9"
                      >
                        Cancelar
                      </Button>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function PedidoForm({ onSaved }: { onSaved: () => void }) {
  const { user } = useAuth();
  const [cliente, setCliente] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [item, setItem] = useState("");
  const [qtd, setQtd] = useState("1");
  const [valor, setValor] = useState("");
  const [saving, setSaving] = useState(false);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !cliente.trim()) return;
    setSaving(true);
    const { error } = await supabase.from("pedidos").insert({
      produtor_id: user.id,
      cliente_nome: cliente.trim(),
      cliente_municipio: municipio.trim() || null,
      itens: item.trim() ? [{ nome: item.trim(), qtd: Number(qtd) || 1 }] : [],
      valor_total: Number(valor) || 0,
      status: "novo",
    });
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Pedido registrado");
      onSaved();
    }
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="font-display">Registrar pedido</DialogTitle>
      </DialogHeader>
      <form onSubmit={salvar} className="space-y-4">
        <div className="space-y-1.5">
          <Label>Cliente</Label>
          <Input value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Nome do cliente" />
        </div>
        <div className="space-y-1.5">
          <Label>Município</Label>
          <Input value={municipio} onChange={(e) => setMunicipio(e.target.value)} placeholder="Ex.: Palmas" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div className="col-span-2 space-y-1.5">
            <Label>Item</Label>
            <Input value={item} onChange={(e) => setItem(e.target.value)} placeholder="Ex.: Banana orgânica" />
          </div>
          <div className="space-y-1.5">
            <Label>Qtd</Label>
            <Input type="number" value={qtd} onChange={(e) => setQtd(e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label>Valor total (R$)</Label>
          <Input type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={saving} className="bg-gradient-primary text-primary-foreground rounded-xl">
            {saving ? "Salvando…" : "Registrar"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
