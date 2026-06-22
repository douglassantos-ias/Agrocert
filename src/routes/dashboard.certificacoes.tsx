import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Sparkles, Plus, ShieldCheck, Clock } from "lucide-react";
import { DashboardPageHeader } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SELOS, calcularNivel, proximoNivel } from "@/data/selos";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard/certificacoes")({
  component: CertificacoesPage,
});

interface CertRow {
  selo_id: string;
  status: "ativo" | "em_analise" | "pendente" | "expirado";
  progresso: number | null;
  valido_ate: string | null;
}

const STATUS_LABEL: Record<CertRow["status"], { label: string; cls: string; icon: typeof ShieldCheck }> = {
  ativo: { label: "Ativo", cls: "bg-success/15 text-success border-success/30", icon: ShieldCheck },
  em_analise: { label: "Em análise", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30", icon: Clock },
  pendente: { label: "Disponível", cls: "bg-muted text-muted-foreground border-border", icon: Sparkles },
  expirado: { label: "Expirado", cls: "bg-destructive/10 text-destructive border-destructive/30", icon: Clock },
};

const NIVEL_GRAD: Record<string, string> = {
  Bronze: "from-amber-700 to-amber-900",
  Prata: "from-slate-300 to-slate-500",
  Ouro: "from-yellow-400 to-amber-600",
  Diamante: "from-cyan-300 via-sky-400 to-indigo-500",
};

function CertificacoesPage() {
  const { user } = useAuth();
  const [certs, setCerts] = useState<CertRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from("certificacoes")
      .select("selo_id,status,progresso,valido_ate")
      .eq("produtor_id", user.id);
    setCerts((data ?? []) as CertRow[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [user]);

  const ativos = certs.filter((c) => c.status === "ativo").length;
  const nivel = calcularNivel(ativos);
  const prox = proximoNivel(ativos);
  const faltam = prox ? Math.max(prox.min - ativos, 0) : 0;
  const progressoNivel = prox
    ? Math.min(((ativos - (nivel.min - 1)) / (prox.min - (nivel.min - 1))) * 100, 100)
    : 100;

  const certsMap = useMemo(() => {
    const m = new Map<string, CertRow>();
    certs.forEach((c) => m.set(c.selo_id, c));
    return m;
  }, [certs]);

  // Sincronizar nível na profile
  useEffect(() => {
    if (!user || loading) return;
    supabase.from("profiles").update({ nivel: nivel.nivel }).eq("id", user.id);
  }, [user, nivel.nivel, loading]);

  async function solicitar(seloId: string) {
    if (!user) return;
    const existing = certsMap.get(seloId);
    if (existing) {
      toast.info(`Já está com status: ${STATUS_LABEL[existing.status].label}`);
      return;
    }
    const { error } = await supabase.from("certificacoes").insert({
      produtor_id: user.id,
      selo_id: seloId,
      status: "em_analise",
      progresso: 35,
    });
    if (error) toast.error(error.message);
    else {
      toast.success("Solicitação enviada — análise em até 7 dias");
      load();
    }
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Reputação"
        title="Certificações & selos"
        description="Cada selo conquistado expande seu acesso a mercados, crédito e oportunidades públicas."
      />

      {/* Card de gamificação */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-card border border-border p-6 md:p-8 shadow-elegant"
      >
        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-primary opacity-10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-gradient-gold opacity-10 blur-3xl" />
        <div className="relative grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-2">
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
              Seu nível AGROCERT
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div
                className={cn(
                  "h-16 w-16 rounded-2xl bg-gradient-to-br grid place-items-center text-white shadow-lg",
                  NIVEL_GRAD[nivel.nivel],
                )}
              >
                <Trophy className="h-8 w-8" />
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold">{nivel.nivel}</h2>
                <p className="text-sm text-muted-foreground">{nivel.descricao}</p>
              </div>
            </div>

            {prox && (
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-muted-foreground">
                    Progresso até <span className="font-bold text-foreground">{prox.nivel}</span>
                  </span>
                  <span className="font-medium">
                    {faltam === 0 ? "Pronto!" : `Faltam ${faltam} ${faltam === 1 ? "selo" : "selos"}`}
                  </span>
                </div>
                <Progress value={progressoNivel} className="h-2.5" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 text-center">
            <Stat n={ativos} label="Ativos" />
            <Stat n={certs.filter((c) => c.status === "em_analise").length} label="Em análise" />
            <Stat n={SELOS.length - certs.length} label="Disponíveis" />
          </div>
        </div>
      </motion.div>

      {/* Vitrine de selos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-64 rounded-2xl bg-muted/60 animate-pulse" />
            ))
          : SELOS.map((s, i) => {
              const cert = certsMap.get(s.id);
              const status = cert?.status ?? "pendente";
              const info = STATUS_LABEL[status];
              const Icon = s.icon;
              const progresso = cert?.progresso ?? 0;
              return (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="rounded-2xl border border-border bg-card p-5 flex flex-col hover:shadow-elegant transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div
                      className={cn(
                        "h-14 w-14 rounded-2xl ring-4 ring-offset-2 ring-offset-card grid place-items-center shadow-md",
                        s.bg,
                        s.ring,
                      )}
                    >
                      <Icon className={cn("h-7 w-7", s.iconColor)} />
                    </div>
                    <span
                      className={cn(
                        "text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md border flex items-center gap-1",
                        info.cls,
                      )}
                    >
                      <info.icon className="h-3 w-3" /> {info.label}
                    </span>
                  </div>
                  <h3 className="font-display font-bold mt-4 leading-tight">{s.nome}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-3 flex-1">
                    {s.funcao}
                  </p>

                  {status === "ativo" && cert?.valido_ate && (
                    <p className="text-[11px] text-muted-foreground mt-3">
                      Válido até {new Date(cert.valido_ate).toLocaleDateString("pt-BR")}
                    </p>
                  )}

                  {status === "em_analise" && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                        <span>Progresso da análise</span>
                        <span className="font-semibold">{progresso}%</span>
                      </div>
                      <Progress value={progresso} className="h-1.5" />
                    </div>
                  )}

                  {status === "pendente" && (
                    <Button
                      size="sm"
                      onClick={() => solicitar(s.id)}
                      className="mt-4 w-full rounded-xl bg-gradient-primary text-primary-foreground"
                    >
                      <Plus className="h-4 w-4" /> Solicitar selo
                    </Button>
                  )}
                </motion.div>
              );
            })}
      </div>

      <p className="text-center text-xs text-muted-foreground italic">
        Confiança também vende. Cada selo abre uma porta nova.
      </p>
    </div>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="rounded-xl bg-muted/40 py-3">
      <p className="font-display text-2xl font-bold">{n}</p>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mt-0.5">{label}</p>
    </div>
  );
}
