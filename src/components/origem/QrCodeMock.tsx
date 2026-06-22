import { cn } from "@/lib/utils";

interface QrCodeMockProps {
  value: string;
  size?: number;
  className?: string;
}

/**
 * QR Code visual fake (determinístico) — apenas representação visual.
 * Gera uma matriz pseudo-aleatória estável a partir do valor.
 */
export function QrCodeMock({ value, size = 192, className }: QrCodeMockProps) {
  const grid = 25;
  const cell = size / grid;

  // hash simples
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }

  const cells: boolean[] = [];
  let s = h >>> 0;
  for (let i = 0; i < grid * grid; i++) {
    s = (s * 1664525 + 1013904223) >>> 0;
    cells.push((s & 0xff) > 128);
  }

  // marcadores nos cantos (3 finder patterns)
  const isFinder = (r: number, c: number) => {
    const inBox = (r0: number, c0: number) =>
      r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7;
    const onBorder = (r0: number, c0: number) =>
      r === r0 || r === r0 + 6 || c === c0 || c === c0 + 6;
    const onCenter = (r0: number, c0: number) =>
      r >= r0 + 2 && r <= r0 + 4 && c >= c0 + 2 && c <= c0 + 4;
    const corners: Array<[number, number]> = [
      [0, 0],
      [0, grid - 7],
      [grid - 7, 0],
    ];
    for (const [r0, c0] of corners) {
      if (inBox(r0, c0)) {
        if (onBorder(r0, c0) || onCenter(r0, c0)) return "on";
        return "off";
      }
    }
    return null;
  };

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-2xl bg-white p-3 shadow-elegant",
        className,
      )}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        role="img"
        aria-label={`QR Code para ${value}`}
      >
        <rect width={size} height={size} fill="white" />
        {Array.from({ length: grid }).map((_, r) =>
          Array.from({ length: grid }).map((_, c) => {
            const finder = isFinder(r, c);
            const filled = finder === "on" || (finder === null && cells[r * grid + c]);
            if (!filled) return null;
            return (
              <rect
                key={`${r}-${c}`}
                x={c * cell}
                y={r * cell}
                width={cell}
                height={cell}
                fill="#1a3a23"
              />
            );
          }),
        )}
      </svg>
    </div>
  );
}
