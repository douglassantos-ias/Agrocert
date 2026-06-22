import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Pause,
  Play,
  Trash2,
  Package,
  AlertTriangle,
} from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/produtos")({
  component: ProdutosPage,
});

interface Produto {
  id: string;
  nome: string;
  categoria: string | null;
  descricao: string | null;
  preco: number;
  unidade: string | null;
  estoque: number;
  estoque_minimo: number | null;
  status: "ativo" | "pausado" | "rascunho";
  selos: string[] | null;
  visualizacoes: number | null;
  vendas_total: number | null;
  foto_url: string | null;
}

const CATEGORIAS = ["Frutas", "Hortaliças", "Grãos", "Polpas", "Mel", "Laticínios", "Outros"];

const STATUS_STYLES: Record<Produto["status"], string> = {
  ativo: "bg-success/10 text-success border-success/30",
  pausado: "bg-muted text-muted-foreground border-border",
  rascunho: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30",
};

function ProdutosPage() {
  const { user } = useAuth();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Produto | null>(null);

  async function load() {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("produtos")
      .select("*")
      .eq("produtor_id", user.id)
      .order("created_at", { ascending: false });
    if (error) toast.error("Erro ao carregar produtos");
    else setProdutos((data ?? []) as Produto[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user]);

  const filtrados = useMemo(() => {
    return produtos.filter((p) => {
      if (filtroStatus === "baixo") {
        if (Number(p.estoque) > Number(p.estoque_minimo ?? 5)) return false;
      } else if (filtroStatus !== "todos" && p.status !== filtroStatus) {
        return false;
      }
      if (busca && !p.nome.toLowerCase().includes(busca.toLowerCase())) return false;
      return true;
    });
  }, [produtos, busca, filtroStatus]);

  async function togglePause(p: Produto) {
    const novoStatus = p.status === "ativo" ? "pausado" : "ativo";
    const { error } = await supabase
      .from("produtos")
      .update({ status: novoStatus })
      .eq("id", p.id);
    if (error) toast.error("Erro ao atualizar");
    else {
      toast.success(`Produto ${novoStatus === "ativo" ? "ativado" : "pausado"}`);
      load();
    }
  }

  async function remover(p: Produto) {
    if (!confirm(`Excluir "${p.nome}"?`)) return;
    const { error } = await supabase.from("produtos").delete().eq("id", p.id);
    if (error) toast.error("Erro ao excluir");
    else {
      toast.success("Produto excluído");
      load();
    }
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Catálogo"
        title="Meus Produtos"
        description="Gerencie sua vitrine, ative QR Code e mantenha seu estoque sempre atualizado."
        actions={
          <Dialog
            open={open}
            onOpenChange={(v) => {
              setOpen(v);
              if (!v) setEditing(null);
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-primary-foreground rounded-xl h-10 shadow-elegant">
                <Plus className="h-4 w-4" /> Adicionar Produto
              </Button>
            </DialogTrigger>
            <ProdutoForm
              produto={editing}
              onSaved={() => {
                setOpen(false);
                setEditing(null);
                load();
              }}
            />
          </Dialog>
        }
      />

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar produto…"
            className="pl-9 h-10 bg-card"
          />
        </div>
        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-full sm:w-48 h-10 bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os produtos</SelectItem>
            <SelectItem value="ativo">Ativos</SelectItem>
            <SelectItem value="pausado">Pausados</SelectItem>
            <SelectItem value="rascunho">Rascunhos</SelectItem>
            <SelectItem value="baixo">Estoque baixo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista */}
      {loading ? (
        <div className="grid gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-muted/60 animate-pulse" />
          ))}
        </div>
      ) : filtrados.length === 0 ? (
        <EmptyState onCreate={() => setOpen(true)} />
      ) : (
        <div className="space-y-3">
          {filtrados.map((p, i) => {
            const baixo = Number(p.estoque) <= Number(p.estoque_minimo ?? 5);
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="rounded-2xl border border-border bg-card p-4 md:p-5 hover:shadow-elegant transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-primary/10 grid place-items-center text-primary shrink-0">
                    <Package className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display font-bold text-base truncate">{p.nome}</h3>
                      <span
                        className={cn(
                          "text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md border",
                          STATUS_STYLES[p.status],
                        )}
                      >
                        {p.status}
                      </span>
                      {baixo && (
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-destructive/10 text-destructive border border-destructive/30 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" /> baixo
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {p.categoria ?? "Sem categoria"} ·{" "}
                      <Eye className="inline h-3 w-3 -mt-0.5" />{" "}
                      {p.visualizacoes ?? 0} visualizações
                    </p>
                  </div>
                  <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:gap-6 text-sm">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Preço</p>
                      <p className="font-display font-bold">
                        {Number(p.preco).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                        <span className="text-xs text-muted-foreground font-normal">/{p.unidade}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Estoque</p>
                      <p className={cn("font-display font-bold", baixo && "text-destructive")}>
                        {p.estoque} {p.unidade}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-lg"
                      onClick={() => {
                        setEditing(p);
                        setOpen(true);
                      }}
                      aria-label="Editar"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-lg"
                      onClick={() => togglePause(p)}
                      aria-label={p.status === "ativo" ? "Pausar" : "Ativar"}
                    >
                      {p.status === "ativo" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-9 w-9 rounded-lg text-destructive hover:bg-destructive/10"
                      onClick={() => remover(p)}
                      aria-label="Excluir"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function EmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-border bg-card p-12 text-center">
      <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-primary/10 grid place-items-center text-primary">
        <Package className="h-7 w-7" />
      </div>
      <h3 className="font-display font-bold text-lg mt-4">Você ainda não cadastrou produtos</h3>
      <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">
        Comece adicionando o primeiro produto da sua propriedade. Em poucos minutos seu catálogo estará no ar.
      </p>
      <Button onClick={onCreate} className="mt-5 bg-gradient-primary text-primary-foreground rounded-xl">
        <Plus className="h-4 w-4" /> Adicionar primeiro produto
      </Button>
    </div>
  );
}

function ProdutoForm({
  produto,
  onSaved,
}: {
  produto: Produto | null;
  onSaved: () => void;
}) {
  const { user } = useAuth();
  const [nome, setNome] = useState(produto?.nome ?? "");
  const [categoria, setCategoria] = useState(produto?.categoria ?? "Frutas");
  const [preco, setPreco] = useState(String(produto?.preco ?? ""));
  const [unidade, setUnidade] = useState(produto?.unidade ?? "kg");
  const [estoque, setEstoque] = useState(String(produto?.estoque ?? ""));
  const [descricao, setDescricao] = useState(produto?.descricao ?? "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNome(produto?.nome ?? "");
    setCategoria(produto?.categoria ?? "Frutas");
    setPreco(String(produto?.preco ?? ""));
    setUnidade(produto?.unidade ?? "kg");
    setEstoque(String(produto?.estoque ?? ""));
    setDescricao(produto?.descricao ?? "");
  }, [produto]);

  async function salvar(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    if (!nome.trim()) {
      toast.error("Nome obrigatório");
      return;
    }
    setSaving(true);
    const payload = {
      produtor_id: user.id,
      nome: nome.trim(),
      categoria,
      preco: Number(preco) || 0,
      unidade,
      estoque: Number(estoque) || 0,
      descricao: descricao.trim() || null,
      status: "ativo" as const,
    };
    const { error } = produto
      ? await supabase.from("produtos").update(payload).eq("id", produto.id)
      : await supabase.from("produtos").insert(payload);
    setSaving(false);
    if (error) toast.error(error.message);
    else {
      toast.success(produto ? "Produto atualizado" : "Produto criado");
      onSaved();
    }
  }

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="font-display">
          {produto ? "Editar produto" : "Novo produto"}
        </DialogTitle>
      </DialogHeader>
      <form onSubmit={salvar} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="nome">Nome do produto</Label>
          <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Banana orgânica" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label>Categoria</Label>
            <Select value={categoria} onValueChange={setCategoria}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIAS.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Unidade</Label>
            <Select value={unidade} onValueChange={setUnidade}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="kg">kg</SelectItem>
                <SelectItem value="un">unidade</SelectItem>
                <SelectItem value="L">litro</SelectItem>
                <SelectItem value="dz">dúzia</SelectItem>
                <SelectItem value="cx">caixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="preco">Preço (R$)</Label>
            <Input id="preco" type="number" step="0.01" value={preco} onChange={(e) => setPreco(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="estoque">Estoque</Label>
            <Input id="estoque" type="number" value={estoque} onChange={(e) => setEstoque(e.target.value)} />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="desc">Descrição</Label>
          <Textarea id="desc" value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={3} placeholder="Conte ao consumidor o que torna seu produto especial." />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={saving} className="bg-gradient-primary text-primary-foreground rounded-xl">
            {saving ? "Salvando…" : produto ? "Salvar alterações" : "Cadastrar produto"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
