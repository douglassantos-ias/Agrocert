import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { SELOS, type SeloId } from "@/data/selos";

export interface FazendaPonto {
  nome: string;
  municipio: string;
  lat: number;
  lng: number;
  selos: number;
  reputacao: number;
  destaque?: boolean;
  /** Nome do produtor / família responsável */
  produtor?: string;
  /** URL da foto do produtor (import .jpg ou path público) */
  fotoUrl?: string;
  /** IDs dos selos para renderização visual */
  selosIds?: SeloId[];
  /** Slug da história editorial (rota /historias/$slug) */
  historiaSlug?: string;
}

interface MapaTocantinsProps {
  fazendas: FazendaPonto[];
}

/**
 * Mapa Leaflet do Tocantins com marcadores customizados e popups premium
 * (foto do produtor, selos, CTAs Comprar / Conhecer origem).
 */
export function MapaTocantins({ fazendas }: MapaTocantinsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [-10.25, -48.3],
      zoom: 6,
      scrollWheelZoom: false,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap · AGROCERT-CERRADO",
      maxZoom: 18,
    }).addTo(map);

    fazendas.forEach((f) => {
      const isDestaque = f.destaque;
      const size = isDestaque ? 44 : 36;
      const html = `
        <div style="
          position: relative;
          width: ${size}px;
          height: ${size}px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          ${
            isDestaque
              ? `<div style="
                  position: absolute;
                  inset: 0;
                  border-radius: 9999px;
                  background: oklch(0.78 0.16 85 / 0.35);
                  animation: agropulse 1.8s ease-out infinite;
                "></div>`
              : ""
          }
          <div style="
            position: relative;
            width: ${size}px;
            height: ${size}px;
            border-radius: 9999px;
            background: ${
              isDestaque
                ? "linear-gradient(135deg, oklch(0.82 0.17 85), oklch(0.7 0.18 60))"
                : "linear-gradient(135deg, oklch(0.55 0.16 145), oklch(0.42 0.13 150))"
            };
            border: 3px solid white;
            box-shadow: 0 6px 16px rgba(0,0,0,.25);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 800;
            font-family: ui-sans-serif, system-ui;
            font-size: ${isDestaque ? 14 : 12}px;
          ">${f.selos}</div>
        </div>
      `;

      const icon = L.divIcon({
        html,
        className: "agro-marker",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2],
      });

      const marker = L.marker([f.lat, f.lng], { icon }).addTo(map);

      // ===== POPUP PREMIUM =====
      const initials = (f.produtor ?? f.nome)
        .split(" ")
        .slice(0, 2)
        .map((p) => p[0])
        .join("")
        .toUpperCase();

      const fotoBlock = f.fotoUrl
        ? `<img src="${f.fotoUrl}" alt="${f.produtor ?? f.nome}"
              style="width:56px;height:56px;border-radius:9999px;object-fit:cover;
                     border:2px solid white;box-shadow:0 4px 10px rgba(0,0,0,.18);" />`
        : `<div style="width:56px;height:56px;border-radius:9999px;
                       background:linear-gradient(135deg,oklch(0.55 0.16 145),oklch(0.42 0.13 150));
                       color:white;font-weight:800;font-family:ui-sans-serif,system-ui;
                       font-size:18px;display:flex;align-items:center;justify-content:center;
                       border:2px solid white;box-shadow:0 4px 10px rgba(0,0,0,.18);">
              ${initials}
           </div>`;

      const selosBlock = (f.selosIds ?? [])
        .slice(0, 6)
        .map((id) => {
          const s = SELOS.find((x) => x.id === id);
          if (!s) return "";
          // Extrai a primeira cor "from-XXX" como fallback aproximado via gradiente CSS
          const grad = s.bg.includes("emerald")
            ? "linear-gradient(135deg,#34d399,#059669)"
            : s.bg.includes("amber")
              ? "linear-gradient(135deg,#fbbf24,#f97316)"
              : s.bg.includes("lime")
                ? "linear-gradient(135deg,#84cc16,#15803d)"
                : s.bg.includes("orange")
                  ? "linear-gradient(135deg,#fb923c,#f43f5e)"
                  : s.bg.includes("sky")
                    ? "linear-gradient(135deg,#38bdf8,#2563eb)"
                    : s.bg.includes("teal")
                      ? "linear-gradient(135deg,#2dd4bf,#047857)"
                      : s.bg.includes("fuchsia")
                        ? "linear-gradient(135deg,#e879f9,#db2777)"
                        : s.bg.includes("cyan")
                          ? "linear-gradient(135deg,#22d3ee,#4f46e5)"
                          : "linear-gradient(135deg,#64748b,#334155)";
          return `<span title="${s.nome}"
                    style="display:inline-flex;align-items:center;justify-content:center;
                           width:22px;height:22px;border-radius:9999px;
                           background:${grad};color:white;font-size:10px;font-weight:700;
                           border:1.5px solid white;box-shadow:0 2px 4px rgba(0,0,0,.15);">
                    ${s.curto.charAt(0)}
                  </span>`;
        })
        .join("");

      const seloCount = f.selosIds?.length ?? 0;
      const seloMore =
        seloCount > 6
          ? `<span style="font-size:10px;color:#64748b;font-weight:600;margin-left:4px;">
               +${seloCount - 6}
             </span>`
          : "";

      const historiaHref = f.historiaSlug ? `/historias/${f.historiaSlug}` : null;
      const marketplaceHref = `/marketplace?fazenda=${encodeURIComponent(f.nome)}`;

      const popupHtml = `
        <div style="font-family:ui-sans-serif,system-ui;width:260px;">
          <!-- Header: foto + nome -->
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
            ${fotoBlock}
            <div style="flex:1;min-width:0;">
              <div style="font-weight:700;font-size:14px;color:#0f172a;line-height:1.2;">
                ${f.produtor ?? f.nome}
              </div>
              <div style="font-size:11px;color:#64748b;margin-top:2px;">
                ${f.nome}
              </div>
              <div style="font-size:11px;color:#64748b;display:flex;align-items:center;gap:3px;margin-top:1px;">
                📍 ${f.municipio}
              </div>
            </div>
          </div>

          ${
            f.destaque
              ? `<div style="margin-bottom:10px;padding:4px 8px;
                            background:linear-gradient(90deg,oklch(0.95 0.05 85),oklch(0.97 0.03 85));
                            color:oklch(0.45 0.15 60);border-radius:6px;
                            font-size:10px;font-weight:700;text-transform:uppercase;
                            letter-spacing:.04em;text-align:center;">
                  ⭐ Destaque AGROCERT
                </div>`
              : ""
          }

          <!-- Selos -->
          ${
            seloCount > 0
              ? `<div style="margin-bottom:10px;">
                  <div style="font-size:10px;color:#64748b;text-transform:uppercase;
                              letter-spacing:.06em;font-weight:600;margin-bottom:5px;">
                    ${seloCount} selo${seloCount === 1 ? "" : "s"} ativo${seloCount === 1 ? "" : "s"}
                  </div>
                  <div style="display:flex;align-items:center;gap:3px;flex-wrap:wrap;">
                    ${selosBlock}${seloMore}
                  </div>
                </div>`
              : ""
          }

          <!-- Reputação -->
          <div style="display:flex;justify-content:space-between;align-items:center;
                      padding:8px 10px;background:#f8fafc;border-radius:8px;margin-bottom:10px;">
            <span style="font-size:11px;color:#64748b;">Reputação</span>
            <span style="font-size:13px;color:#ca8a04;font-weight:700;">
              ★ ${f.reputacao.toFixed(2)}
            </span>
          </div>

          <!-- CTAs -->
          <div style="display:flex;gap:6px;">
            <a href="${marketplaceHref}"
               style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:4px;
                      padding:8px 10px;border-radius:8px;
                      background:linear-gradient(135deg,oklch(0.55 0.16 145),oklch(0.42 0.13 150));
                      color:white;font-size:12px;font-weight:600;text-decoration:none;
                      box-shadow:0 2px 6px rgba(0,0,0,.12);transition:transform .15s;">
              🛒 Comprar
            </a>
            ${
              historiaHref
                ? `<a href="${historiaHref}"
                     style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:4px;
                            padding:8px 10px;border-radius:8px;
                            background:white;border:1.5px solid #e2e8f0;
                            color:#0f172a;font-size:12px;font-weight:600;text-decoration:none;
                            transition:border-color .15s;">
                    📖 Conhecer origem
                  </a>`
                : `<a href="/origem"
                     style="flex:1;display:inline-flex;align-items:center;justify-content:center;gap:4px;
                            padding:8px 10px;border-radius:8px;
                            background:white;border:1.5px solid #e2e8f0;
                            color:#0f172a;font-size:12px;font-weight:600;text-decoration:none;">
                    📖 Conhecer origem
                  </a>`
            }
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml, {
        maxWidth: 280,
        className: "agro-popup",
      });
    });

    map.setMaxBounds([
      [-13.6, -50.8],
      [-5.0, -45.7],
    ]);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [fazendas]);

  return (
    <>
      <style>{`
        @keyframes agropulse {
          0% { transform: scale(1); opacity: .9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .leaflet-container {
          font-family: inherit;
          background: oklch(0.96 0.02 145);
        }
        .leaflet-popup-content-wrapper {
          border-radius: 16px;
          box-shadow: 0 12px 36px rgba(0,0,0,.22);
          padding: 4px;
        }
        .leaflet-popup-content { margin: 14px 16px; }
        .leaflet-popup-tip { box-shadow: 0 4px 12px rgba(0,0,0,.1); }
        .agro-popup a:hover { filter: brightness(1.05); }
      `}</style>
      <div
        ref={containerRef}
        className="h-[520px] md:h-[640px] w-full rounded-3xl overflow-hidden border shadow-elegant z-0"
      />
    </>
  );
}
