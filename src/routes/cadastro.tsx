import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tractor, ShoppingBasket, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Cadastre-se — AGROCERT-CERRADO" },
      { name: "description", content: "Crie sua conta como produtor ou comprador na plataforma AGROCERT-CERRADO." },
    ],
  }),
  component: CadastroPage,
});

function CadastroPage() {
  const navigate = useNavigate();
  const [tipo, setTipo] = useState<"produtor" | "comprador">("produtor");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          nome_produtor: nome,
          municipio: municipio || "Palmas",
          tipo,
        },
      },
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else {
      toast.success("Conta criada! Entrando…");
      navigate({ to: "/dashboard" });
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SiteHeader />
      <main className="flex-1 pt-32 pb-20 bg-gradient-hero relative">
        <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
        <div className="relative container mx-auto px-4 max-w-lg py-10">
          <div className="rounded-3xl bg-card border border-border shadow-elegant p-8 md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Junte-se à rede
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Crie sua conta</h1>
            <p className="text-muted-foreground text-sm mb-7">
              Selecione seu perfil e comece em poucos minutos.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                { id: "produtor" as const, icon: Tractor, label: "Sou produtor", desc: "Quero vender" },
                { id: "comprador" as const, icon: ShoppingBasket, label: "Sou comprador", desc: "Quero comprar" },
              ].map((opt) => {
                const Icon = opt.icon;
                const active = tipo === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setTipo(opt.id)}
                    className={`p-4 rounded-2xl border-2 text-left transition-all ${
                      active ? "border-primary bg-primary/5 shadow-elegant" : "border-border hover:border-primary/40"
                    }`}
                  >
                    <Icon className={`h-5 w-5 mb-2 ${active ? "text-primary" : "text-muted-foreground"}`} />
                    <p className="font-semibold text-sm">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.desc}</p>
                  </button>
                );
              })}
            </div>

            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input id="name" required value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Como podemos te chamar?" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="municipio">Município</Label>
                <Input id="municipio" value={municipio} onChange={(e) => setMunicipio(e.target.value)} placeholder="Ex.: Palmas" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-primary-foreground h-11 rounded-xl">
                {loading ? "Criando…" : <>Criar conta <ArrowRight className="ml-2 h-4 w-4" /></>}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border text-center text-sm">
              Já tem conta?{" "}
              <Link to="/login" className="text-primary font-semibold hover:text-primary-glow">Entrar</Link>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
