import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Award,
  QrCode,
  Banknote,
  BarChart3,
  Star,
  User as UserIcon,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
  soon?: boolean;
};

const NAV: NavItem[] = [
  { to: "/dashboard", label: "Visão Geral", icon: LayoutDashboard, exact: true },
  { to: "/dashboard/produtos", label: "Meus Produtos", icon: Package },
  { to: "/dashboard/pedidos", label: "Pedidos", icon: ShoppingCart },
  { to: "/dashboard/certificacoes", label: "Certificações", icon: Award },
  { to: "/dashboard/qrcode", label: "Origem QR", icon: QrCode, soon: true },
  { to: "/dashboard/oportunidades", label: "Oportunidades", icon: Banknote, soon: true },
  { to: "/dashboard/analytics", label: "Analytics", icon: BarChart3, soon: true },
  { to: "/dashboard/reputacao", label: "Reputação", icon: Star, soon: true },
  { to: "/dashboard/perfil", label: "Perfil", icon: UserIcon, soon: true },
  { to: "/dashboard/configuracoes", label: "Configurações", icon: Settings, soon: true },
];

interface ProfileLite {
  nome_produtor: string | null;
  nome_propriedade: string | null;
  municipio: string | null;
  foto_url: string | null;
  nivel: string | null;
}

const NIVEL_COLOR: Record<string, string> = {
  Bronze: "from-amber-700 to-amber-900",
  Prata: "from-slate-300 to-slate-500",
  Ouro: "from-yellow-400 to-amber-600",
  Diamante: "from-cyan-300 via-sky-400 to-indigo-500",
};

export function DashboardLayout() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileLite | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/login", search: { redirect: location.pathname } as never });
    }
  }, [user, loading, navigate, location.pathname]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("nome_produtor,nome_propriedade,municipio,foto_url,nivel")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data as ProfileLite | null));
  }, [user]);

  // Close mobile drawer on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sessão encerrada");
    navigate({ to: "/login" });
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen grid place-items-center bg-background">
        <div className="animate-pulse text-sm text-muted-foreground">Carregando…</div>
      </div>
    );
  }

  const nivel = profile?.nivel ?? "Bronze";
  const nivelClass = NIVEL_COLOR[nivel] ?? NIVEL_COLOR.Bronze;
  const initials = (profile?.nome_produtor ?? user.email ?? "PR")
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* SIDEBAR DESKTOP */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border z-30">
        <div className="px-6 py-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center font-bold text-primary-foreground">
              A
            </div>
            <span className="font-display font-bold text-lg">AGROCERT</span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {NAV.map((item) => {
            const active = item.exact
              ? location.pathname === item.to
              : location.pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative group",
                  active
                    ? "bg-sidebar-accent text-sidebar-primary shadow-inner"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {item.soon && (
                  <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-sidebar-foreground/10">
                    em breve
                  </span>
                )}
                {active && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-y-1 left-0 w-1 rounded-r-full bg-sidebar-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors"
          >
            <LogOut className="h-4 w-4" /> Sair
          </button>
        </div>
      </aside>

      {/* SIDEBAR MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/40 z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "tween" }}
              className="lg:hidden fixed inset-y-0 left-0 w-64 bg-sidebar text-sidebar-foreground z-50 flex flex-col"
            >
              <div className="px-6 py-5 border-b border-sidebar-border flex items-center justify-between">
                <span className="font-display font-bold">AGROCERT</span>
                <button onClick={() => setMobileOpen(false)} className="p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
                {NAV.map((item) => {
                  const Icon = item.icon;
                  const active = item.exact
                    ? location.pathname === item.to
                    : location.pathname.startsWith(item.to);
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium",
                        active
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground/75",
                      )}
                    >
                      <Icon className="h-4 w-4" /> {item.label}
                    </Link>
                  );
                })}
              </nav>
              <button
                onClick={handleLogout}
                className="m-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-sidebar-foreground/80"
              >
                <LogOut className="h-4 w-4" /> Sair
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MAIN */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* HEADER */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center gap-3 px-4 lg:px-8 h-16">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-accent"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos, pedidos, clientes…"
                  className="pl-9 h-9 bg-muted/50 border-transparent focus-visible:bg-card"
                />
              </div>
            </div>

            <div className="flex-1 md:hidden" />

            <button className="relative p-2 rounded-lg hover:bg-accent">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive" />
            </button>

            <div className="hidden sm:flex items-center gap-2.5 pl-2 border-l border-border">
              <div className="text-right leading-tight">
                <div className="text-sm font-semibold truncate max-w-[140px]">
                  {profile?.nome_produtor ?? user.email}
                </div>
                <div className="text-[11px] text-muted-foreground">
                  {profile?.municipio ?? "—"} · TO
                </div>
              </div>
              <div className="relative">
                <div
                  className={cn(
                    "h-9 w-9 rounded-full bg-gradient-to-br grid place-items-center text-white font-bold text-xs shadow-elegant",
                    nivelClass,
                  )}
                >
                  {initials}
                </div>
                <div
                  className={cn(
                    "absolute -bottom-1 -right-1 px-1.5 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider bg-gradient-to-br text-white shadow",
                    nivelClass,
                  )}
                >
                  <Trophy className="h-2.5 w-2.5 inline -mt-0.5" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 lg:px-8 py-6 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
      <div>
        {eyebrow && (
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-1.5">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground mt-1.5 max-w-2xl">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
