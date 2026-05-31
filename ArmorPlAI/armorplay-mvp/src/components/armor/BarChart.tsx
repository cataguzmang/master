export function BarChart({ data, labels, color = "var(--primary)", height = 200 }: { data: number[]; labels: string[]; color?: string; height?: number }) {
  const w = 600, h = height;
  const padX = 28, padY = 18;
  const max = Math.max(...data);
  const barW = (w - padX * 2) / data.length - 6;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      {[0.25, 0.5, 0.75, 1].map((g) => {
        const y = h - padY - g * (h - padY * 2);
        return <line key={g} x1={padX} x2={w - padX / 2} y1={y} y2={y} stroke="oklch(1 0 0 / 0.06)" strokeDasharray="2 4" />;
      })}
      {data.map((v, i) => {
        const x = padX + i * ((w - padX * 2) / data.length) + 3;
        const bh = (v / max) * (h - padY * 2);
        const y = h - padY - bh;
        const id = `bg-${i}`;
        return (
          <g key={i}>
            <defs>
              <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="1" />
                <stop offset="100%" stopColor={color} stopOpacity="0.3" />
              </linearGradient>
            </defs>
            <rect x={x} y={y} width={barW} height={bh} rx="3" fill={`url(#${id})`} />
            <text x={x + barW / 2} y={h - 4} textAnchor="middle" className="fill-muted-foreground" fontSize="9">{labels[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}
