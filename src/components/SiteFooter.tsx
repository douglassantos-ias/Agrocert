import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Instagram, Facebook, Linkedin, Mail, MapPin } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 bg-sidebar text-sidebar-foreground overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-[0.07]" />
      <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 text-sm text-sidebar-foreground/75 leading-relaxed max-w-xs italic font-display">
              Da terra ao mercado com confiança.
            </p>
            <p className="mt-3 text-xs text-sidebar-foreground/55 max-w-xs leading-relaxed">
              Tecnologia, certificação e rastreabilidade para a agricultura familiar do Cerrado.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="h-9 w-9 rounded-xl bg-sidebar-accent/40 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all hover:-translate-y-0.5"
                  aria-label="Social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gold mb-4">
              Plataforma
            </h4>
            <ul className="space-y-2.5 text-sm text-sidebar-foreground/75">
              <li><Link to="/marketplace" className="hover:text-primary transition-colors">Marketplace</Link></li>
              <li><Link to="/certificacao" className="hover:text-primary transition-colors">Certificação</Link></li>
              <li><Link to="/mapa" className="hover:text-primary transition-colors">Mapa de Produtores</Link></li>
              <li><Link to="/origem" className="hover:text-primary transition-colors">Origem</Link></li>
              <li><Link to="/oportunidades" className="hover:text-primary transition-colors">Oportunidades</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gold mb-4">
              Para você
            </h4>
            <ul className="space-y-2.5 text-sm text-sidebar-foreground/75">
              <li><Link to="/cadastro" className="hover:text-primary transition-colors">Sou produtor</Link></li>
              <li><Link to="/cadastro" className="hover:text-primary transition-colors">Sou comprador</Link></li>
              <li><Link to="/sobre" className="hover:text-primary transition-colors">Parceiros</Link></li>
              <li><Link to="/sobre" className="hover:text-primary transition-colors">Sobre o projeto</Link></li>
              <li><Link to="/login" className="hover:text-primary transition-colors">Entrar</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-gold mb-4">
              Contato
            </h4>
            <ul className="space-y-2.5 text-sm text-sidebar-foreground/75">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-gold/80 mt-0.5 shrink-0" />
                Palmas — Tocantins — Brasil
              </li>
              <li>
                <a href="mailto:contato@agrocert-cerrado.br" className="hover:text-primary transition-colors">
                  contato@agrocert-cerrado.br
                </a>
              </li>
              <li>+55 (63) 0000-0000</li>
            </ul>

            <div className="mt-6 rounded-xl border border-sidebar-border/60 bg-sidebar-accent/30 p-3">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold font-bold mb-1">
                Microcopy
              </p>
              <p className="text-xs text-sidebar-foreground/80 italic leading-relaxed">
                "Dados reais. Oportunidades reais."
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-sidebar-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sidebar-foreground/60">
          <p>© 2026 AGROCERT-CERRADO. Todos os direitos reservados.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Plataforma com selo de origem verificada
          </p>
        </div>
      </div>
    </footer>
  );
}
