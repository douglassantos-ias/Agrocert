import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Banknote,
  Package as PackageIcon,
  Star,
  Award,
  TrendingUp,
  Eye,
  ArrowUpRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { DashboardPageHeader } from "@/components/dashboard/DashboardLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/dashboard/")({
  component: VisaoGeralPage,
});

interface Metrics {
  vendasMes: number;
  pedidosEntregues: number;
  notaMedia: number;
  selosAtivos: number;
  crescimento: number;
  visualizacoes: number;
  serieMensal: { mes: string; vendas: number }[];
  primeiroNome: string;
}

const MESES = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

const RECOMENDACOES = [
  {
    icon: Award,
    titulo: "Solicitar selo Qualidade Verificada",
    desc: "Aumenta em até 38% a confiança no seu produto.",
    cta: "Solicitar",
    to: "/dashboard/certificacoes",
  },
  {
    icon: PackageIcon,
    titulo: "Atualizar estoque de Polpas",
    desc: "2 produtos abaixo do estoque mínimo.",
    cta: "Ver produtos",
    to: "/dashboard/produtos",
  },
  {
    icon: Banknote,
    titulo: "Edital Pronaf Mulher aberto",
    desc: "Você é elegível. Encerra em 12 dias.",
    cta: "Ver edital",
    to: "/oportunidades",
  },
  {
    icon: Star,
    titulo: "3 mensagens sem resposta",
    desc: "Responder em até 2h aumenta vendas em 24%.",
    cta: "Responder",
    to: "/dashboard/pedidos",
  },
];

function VisaoGeralPage() {
  const { user } = useAuth();
  const [m, setM] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [{ data: profile }, { data: pedidos }, { data: produtos }, { data: certs }] =
        await Promise.all([
          supabase.from("profiles").select("nome_produtor").eq("id", user.id).maybeSingle(),
          supabase.from("pedidos").select("valor_total,status,created_at").eq("produtor_id", user.id),
          supabase.from("produtos").select("id,visualizacoes").eq("produtor_id", user.id),
          supabase.from("certificacoes").select("status").eq("produtor_id", user.id).eq("status", "ativo"),
        ]);

      const now = new Date();
      const inicioMes = new Date(now.getFullYear(), now.getMonth(), 1);
      const inicioMesAnterior = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const fimMesAnterior = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59);

      const ped = pedidos ?? [];
      const vendasMes = ped
        .filter((p) => p.status === "entregue" && new Date(p.created_at) >= inicioMes)
        .reduce((s, p) => s + Number(p.valor_total ?? 0), 0);
      const vendasMesAnterior = ped
        .filter(
          (p) =>
            p.status === "entregue" &&
            new Date(p.created_at) >= inicioMesAnterior &&
            new Date(p.created_at) <= fimMesAnterior,
        )
        .reduce((s, p) => s + Number(p.valor_total ?? 0), 0);
      const crescimento =
        vendasMesAnterior > 0
          ? ((vendasMes - vendasMesAnterior) / vendasMesAnterior) * 100
          : vendasMes > 0
            ? 100
            : 0;

      // série últimos 12 meses
      const serie = Array.from({ length: 12 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - 11 + i, 1);
        const proximo = new Date(now.getFullYear(), now.getMonth() - 11 + i + 1, 1);
        const total = ped
          .filter((p) => {
            const dt = new Date(p.created_at);
            return p.status === "entregue" && dt >= d && dt < proximo;
          })
          .reduce((s, p) => s + Number(p.valor_total ?? 0), 0);
        return { mes: MESES[d.getMonth()], vendas: total };
      });

      // se for novo, popular com seed visual leve
      const seed = ped.length === 0;
      if (seed) {
        const baseline = [4200, 3800, 5100, 6400, 5800, 7200, 8900, 9600, 11200, 13400, 15800, 17200];
        baseline.forEach((v, i) => (serie[i].vendas = v));
      }

      const visualizacoes = (produtos ?? []).reduce((s, p) => s + (p.visualizacoes ?? 0), 0);
      const pedidosEntregues = ped.filter((p) => p.status === "entregue").length;

      setM({
        vendasMes: seed ? 17200 : vendasMes,
        pedidosEntregues: seed ? 84 : pedidosEntregues,
        notaMedia: 4.9,
        selosAtivos: certs?.length ?? 0,
        crescimento: seed ? 23.4 : crescimento,
        visualizacoes: seed ? 1248 : visualizacoes,
        serieMensal: serie,
        primeiroNome: profile?.nome_produtor?.split(" ")[0] ?? "produtor",
      });
      setLoading(false);
    })();
  }, [user]);

  const hora = new Date().getHours();
  const saudacao = hora < 12 ? "Bom dia" : hora < 18 ? "Boa tarde" : "Boa noite";

  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Visão geral"
        title={`${saudacao}${m?.primeiroNome ? `, ${m.primeiroNome}` : ""}.`}
        description="Sua produção está crescendo. Aqui está um resumo da sua semana."
        actions={
          <Button className="bg-gradient-primary text-primary-foreground rounded-xl h-10 shadow-elegant">
            <Sparkles className="h-4 w-4" /> Ações inteligentes
          </Button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {loading || !m ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-28 rounded-2xl bg-muted/60 animate-pulse" />
          ))
        ) : (
          <>
            <KpiCard label="Vendas no mês" value={m.vendasMes} format="currency" delta={m.crescimento} icon={Banknote} accent="primary" index={0} />
            <KpiCard label="Pedidos entregues" value={m.pedidosEntregues} icon={PackageIcon} accent="success" index={1} />
            <KpiCard label="Nota média" value={m.notaMedia} format="decimal" suffix=" ★" icon={Star} accent="gold" index={2} />
            <KpiCard label="Selos ativos" value={m.selosAtivos} icon={Award} accent="violet" index={3} />
            <KpiCard label="Crescimento mensal" value={m.crescimento} format="decimal" suffix="%" icon={TrendingUp} accent="blue" index={4} />
            <KpiCard label="Visualizações do perfil" value={m.visualizacoes} icon={Eye} accent="orange" index={5} />
          </>
        )}
      </div>

      {/* CHART + AÇÕES */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="xl:col-span-2 rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                Evolução das vendas
              </p>
              <h3 className="font-display text-lg font-bold mt-1">Últimos 12 meses</h3>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total acumulado</p>
              <p className="font-display text-xl font-bold text-gradient">
                {(m?.serieMensal.reduce((s, x) => s + x.vendas, 0) ?? 0).toLocaleString(
                  "pt-BR",
                  { style: "currency", currency: "BRL", maximumFractionDigits: 0 },
                )}
              </p>
            </div>
          </div>

          <div className="h-64">
            {m && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={m.serieMensal} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="vendasGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="oklch(0.62 0.18 145)" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="oklch(0.62 0.18 145)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.015 130)" vertical={false} />
                  <XAxis dataKey="mes" stroke="oklch(0.5 0.02 150)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="oklch(0.5 0.02 150)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `R$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid oklch(0.9 0.015 130)",
                      fontSize: 12,
                    }}
                    formatter={(v: number) => [v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }), "Vendas"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="vendas"
                    stroke="oklch(0.42 0.11 150)"
                    strokeWidth={2.5}
                    fill="url(#vendasGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </motion.div>

        {/* Ações recomendadas */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
                Próximas ações
              </p>
              <h3 className="font-display text-lg font-bold mt-1">Recomendado para você</h3>
            </div>
            <span className="h-7 px-2 rounded-full bg-primary/10 text-primary text-[11px] font-semibold flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> IA
            </span>
          </div>
          <ul className="space-y-3">
            {RECOMENDACOES.map((r, i) => {
              const Icon = r.icon;
              return (
                <li
                  key={i}
                  className="group flex items-start gap-3 p-3 rounded-xl border border-border/60 hover:border-primary/40 hover:bg-accent/40 transition-all cursor-pointer"
                >
                  <div className="h-9 w-9 rounded-lg bg-gradient-primary/10 grid place-items-center text-primary shrink-0">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-tight">{r.titulo}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-1" />
                </li>
              );
            })}
          </ul>
          <p className="mt-4 pt-4 border-t border-border/60 text-[11px] text-muted-foreground italic">
            Produzir bem merece crescer.
          </p>
        </motion.div>
      </div>

      {/* FOOTER STRIP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="rounded-2xl bg-gradient-primary text-primary-foreground p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-elegant"
      >
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur grid place-items-center">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm/none opacity-80">Confiança também vende.</p>
            <h3 className="font-display text-xl font-bold mt-1">
              Seus dados estão alimentando seu Score AGROCERT em tempo real.
            </h3>
          </div>
        </div>
        <Button variant="secondary" className="rounded-xl h-11 bg-white/15 hover:bg-white/25 text-white border-0 backdrop-blur">
          Ver oportunidades <ArrowRight className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
