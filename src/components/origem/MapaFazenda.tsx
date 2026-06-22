import { MapPin } from "lucide-react";

interface MapaFazendaProps {
  lat: number;
  lng: number;
  municipio: string;
  estado: string;
}

/**
 * Visual mock de mapa — estilo "satélite Cerrado" estilizado.
 * Sem dependências externas; representa a localização da propriedade.
 */
export function MapaFazenda({ lat, lng, municipio, estado }: MapaFazendaProps) {
  return (
    <div className="relative h-64 md:h-80 rounded-3xl overflow-hidden border shadow-elegant">
      {/* Camada base: terra do Cerrado */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 30% 40%, oklch(0.62 0.13 60) 0%, oklch(0.42 0.10 55) 40%, oklch(0.32 0.08 150) 100%)",
        }}
      />
      {/* Manchas de vegetação */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, oklch(0.55 0.14 145) 0%, transparent 18%)," +
            "radial-gradient(circle at 70% 25%, oklch(0.5 0.13 145) 0%, transparent 14%)," +
            "radial-gradient(circle at 80% 65%, oklch(0.58 0.15 140) 0%, transparent 22%)," +
            "radial-gradient(circle at 35% 75%, oklch(0.52 0.13 150) 0%, transparent 18%)," +
            "radial-gradient(circle at 55% 50%, oklch(0.6 0.16 140) 0%, transparent 12%)",
        }}
      />
      {/* Estradas */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path
          d="M -10,180 Q 200,140 350,200 T 700,180"
          stroke="oklch(0.7 0.12 60)"
          strokeWidth="6"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M 250,-10 Q 280,150 320,260 T 380,500"
          stroke="oklch(0.7 0.12 60)"
          strokeWidth="4"
          fill="none"
          opacity="0.45"
        />
      </svg>
      {/* Grid sutil */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Pin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/40" />
          <div className="relative h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center ring-4 ring-white/80 shadow-glow">
            <MapPin className="h-6 w-6 text-primary-foreground" strokeWidth={2.5} />
          </div>
        </div>
        <div className="mt-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur text-xs font-semibold text-foreground shadow-elegant whitespace-nowrap">
          {municipio} · {estado}
        </div>
      </div>

      {/* Coordenadas */}
      <div className="absolute bottom-3 left-3 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur text-[10px] font-mono text-white">
        {lat.toFixed(3)}°S · {Math.abs(lng).toFixed(3)}°W
      </div>
      <div className="absolute bottom-3 right-3 px-2.5 py-1.5 rounded-lg bg-black/40 backdrop-blur text-[10px] font-medium text-white">
        Bioma Cerrado · TO
      </div>
    </div>
  );
}
