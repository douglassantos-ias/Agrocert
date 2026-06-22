import { Link } from "@tanstack/react-router";

interface LogoProps {
  variant?: "default" | "light";
  className?: string;
}

export function Logo({ variant = "default", className = "" }: LogoProps) {
  const text = variant === "light" ? "text-white" : "text-foreground";
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative h-10 w-10 rounded-xl bg-gradient-primary shadow-elegant flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground relative z-10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2 L12 22" />
          <path d="M12 8 C 8 8, 6 6, 6 3 C 9 3, 12 5, 12 8 Z" fill="currentColor" />
          <path d="M12 12 C 16 12, 18 10, 18 7 C 15 7, 12 9, 12 12 Z" fill="currentColor" />
          <path d="M12 16 C 8 16, 6 14, 6 11 C 9 11, 12 13, 12 16 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`font-display font-bold text-base tracking-tight ${text}`}>
          AGROCERT
        </span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-gold font-semibold">
          Cerrado
        </span>
      </div>
    </Link>
  );
}
