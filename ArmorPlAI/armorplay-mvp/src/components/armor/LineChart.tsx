type Series = { label: string; color: string; data: number[] };

export function LineChart({
  series, height = 240, labels,
}: { series: Series[]; height?: number; labels?: string[] }) {
  const w = 800;
  const h = height;
  const padX = 36, padY = 20;
  const all = series.flatMap((s) => s.data);
  const max = Math.max(...all);
  const min = Math.min(...all);
  const range = Math.max(1, max - min);
  const n = series[0].data.length;
  const stepX = (w - padX * 2) / (n - 1);

  const yTicks = 4;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => min + (range * i) / yTicks);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      {ticks.map((t, i) => {
        const y = h - padY - ((t - min) / range) * (h - padY * 2);
        return (
          <g key={i}>
            <line x1={padX} x2={w - padX / 2} y1={y} y2={y} stroke="oklch(1 0 0 / 0.06)" strokeDasharray="2 4" />
            <text x={4} y={y + 3} className="fill-muted-foreground" fontSize="9">{Math.round(t)}</text>
          </g>
        );
      })}
      {labels?.map((l, i) => (
        <text key={l} x={padX + i * stepX} y={h - 4} textAnchor="middle" className="fill-muted-foreground" fontSize="9">{l}</text>
      ))}
      {series.map((s, si) => {
        const pts = s.data.map((v, i) => [padX + i * stepX, h - padY - ((v - min) / range) * (h - padY * 2)] as const);
        const d = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
        const area = `${d} L${pts[pts.length - 1][0]},${h - padY} L${pts[0][0]},${h - padY} Z`;
        const id = `lg-${si}-${Math.random().toString(36).slice(2, 7)}`;
        return (
          <g key={s.label}>
            <defs>
              <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.3" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill={`url(#${id})`} />
            <path d={d} fill="none" stroke={s.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {pts.map((p, i) => (
              <circle key={i} cx={p[0]} cy={p[1]} r="2" fill={s.color} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}
