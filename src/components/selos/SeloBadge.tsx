import { type Selo } from "@/data/selos";
import { cn } from "@/lib/utils";

interface SeloBadgeProps {
  selo: Selo;
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
  className?: string;
}

const sizeMap = {
  sm: { box: "h-9 w-9", icon: "h-4 w-4", label: "text-[10px]" },
  md: { box: "h-14 w-14", icon: "h-6 w-6", label: "text-xs" },
  lg: { box: "h-20 w-20", icon: "h-9 w-9", label: "text-sm" },
  xl: { box: "h-28 w-28", icon: "h-12 w-12", label: "text-base" },
};

export function SeloBadge({ selo, size = "md", showLabel = false, className }: SeloBadgeProps) {
  const Icon = selo.icon;
  const s = sizeMap[size];

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div
        className={cn(
          "relative rounded-full flex items-center justify-center ring-4 ring-offset-2 ring-offset-background shadow-lg transition-transform hover:scale-105",
          selo.bg,
          selo.ring,
          s.box,
        )}
        title={selo.nome}
      >
        <Icon className={cn(s.icon, selo.iconColor)} strokeWidth={2.25} />
        <span
          className="absolute inset-0 rounded-full opacity-0 hover:opacity-30 bg-white transition-opacity pointer-events-none"
          aria-hidden
        />
      </div>
      {showLabel && (
        <span className={cn("font-medium text-center max-w-[6rem] leading-tight", s.label)}>
          {selo.curto}
        </span>
      )}
    </div>
  );
}
