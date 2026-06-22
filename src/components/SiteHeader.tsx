import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

const navItems = [
  { to: "/marketplace", label: "Marketplace" },
  { to: "/certificacao", label: "Certificação" },
  { to: "/origem", label: "Origem" },
  { to: "/mapa", label: "Mapa" },
  { to: "/oportunidades", label: "Oportunidades" },
  { to: "/sobre", label: "Sobre" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 md:px-6 py-3 transition-all duration-300 ${
            scrolled ? "glass shadow-elegant" : "bg-transparent"
          }`}
        >
          <Logo />

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-sm font-medium text-foreground/75 hover:text-foreground transition-colors"
                activeProps={{ className: "text-primary font-semibold" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button asChild size="sm" className="bg-gradient-primary text-primary-foreground shadow-elegant hover:shadow-glow transition-shadow">
              <Link to="/login">Entrar</Link>
            </Button>
          </div>

          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden mt-2 glass rounded-2xl p-4 shadow-elegant animate-in fade-in slide-in-from-top-2">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition-colors"
                  activeProps={{ className: "text-primary bg-accent" }}
                >
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-border/50 mt-2 pt-3 flex flex-col gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/login" onClick={() => setOpen(false)}>Entrar</Link>
                </Button>
                <Button asChild size="sm" className="bg-gradient-primary">
                  <Link to="/cadastro" onClick={() => setOpen(false)}>Cadastre-se</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
