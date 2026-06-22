import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface KpiCardProps {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  format?: "number" | "currency" | "decimal";
  delta?: number;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "primary" | "gold" | "success" | "blue" | "violet" | "orange";
  index?: number;
}

const ACCENT: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  primary: "from-emerald-400 to-emerald-700",
  gold: "from-amber-400 to-amber-600",
  success: "from-green-400 to-green-700",
  blue: "from-sky-400 to-blue-600",
  violet: "from-fuchsia-400 to-violet-600",
  orange: "from-orange-400 to-rose-500",
};

function useCount(target: number, duration = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return v;
}

export function KpiCard({
  label,
  value,
  prefix,
  suffix,
  format = "number",
  delta,
  icon: Icon,
  accent = "primary",
  index = 0,
}: KpiCardProps) {
  const v = useCount(value);
  const display =
    format === "currency"
      ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })
      : format === "decimal"
        ? v.toFixed(1)
        : Math.round(v).toLocaleString("pt-BR");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="relative rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-elegant transition-shadow overflow-hidden group"
    >
      <div
        className={cn(
          "absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br opacity-10 blur-2xl group-hover:opacity-20 transition-opacity",
          ACCENT[accent],
        )}
      />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
            {label}
          </p>
          <p className="mt-2 font-display text-2xl font-bold tracking-tight">
            {prefix}
            {display}
            {suffix}
          </p>
          {typeof delta === "number" && (
            <p
              className={cn(
                "mt-1 text-xs font-medium",
                delta >= 0 ? "text-success" : "text-destructive",
              )}
            >
              {delta >= 0 ? "▲" : "▼"} {Math.abs(delta).toFixed(1)}% vs mês passado
            </p>
          )}
        </div>
        <div
          className={cn(
            "h-10 w-10 rounded-xl bg-gradient-to-br grid place-items-center text-white shadow-md",
            ACCENT[accent],
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </motion.div>
  );
}
