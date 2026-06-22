import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — AGROCERT-CERRADO" },
      { name: "description", content: "Acesse sua conta de produtor ou comprador." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Bem-vindo de volta!");
      navigate({ to: "/dashboard" });
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-32 pb-20 bg-gradient-hero relative">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="relative container mx-auto px-4 max-w-md py-10">
          <div className="rounded-3xl bg-card border border-border shadow-elegant p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Bem-vindo de volta
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Entrar</h1>
            <p className="text-muted-foreground text-sm mb-7">
              Acesse seu dashboard de produtor.
            </p>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-primary-foreground h-11 rounded-xl">
                {loading ? "Entrando…" : <>Entrar <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Não tem conta?{" "}
              <Link to="/cadastro" className="text-primary font-semibold hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
