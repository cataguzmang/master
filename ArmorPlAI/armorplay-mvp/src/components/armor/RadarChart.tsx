export function RadarChart({
  axes, values, color = "var(--primary)", size = 240,
}: { axes: string[]; values: number[]; color?: string; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 28;
  const n = axes.length;
  const angle = (i: number) => (-Math.PI / 2) + (i * 2 * Math.PI) / n;

  const point = (i: number, v: number) => {
    const a = angle(i);
    return [cx + Math.cos(a) * r * v, cy + Math.sin(a) * r * v] as const;
  };

  const grid = [0.25, 0.5, 0.75, 1].map((g) => {
    const pts = axes.map((_, i) => {
      const p = point(i, g);
      return `${p[0]},${p[1]}`;
    }).join(" ");
    return <polygon key={g} points={pts} fill="none" stroke="oklch(1 0 0 / 0.08)" />;
  });

  const polyPts = values.map((v, i) => {
    const p = point(i, v);
    return `${p[0]},${p[1]}`;
  }).join(" ");

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
      {grid}
      {axes.map((_, i) => {
        const p = point(i, 1);
        return <line key={i} x1={cx} y1={cy} x2={p[0]} y2={p[1]} stroke="oklch(1 0 0 / 0.06)" />;
      })}
      <polygon points={polyPts} fill={color} fillOpacity="0.18" stroke={color} strokeWidth="1.8" />
      {values.map((v, i) => {
        const p = point(i, v);
        return <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={color} />;
      })}
      {axes.map((label, i) => {
        const p = point(i, 1.18);
        return (
          <text key={label} x={p[0]} y={p[1]} textAnchor="middle" dominantBaseline="middle"
            className="fill-muted-foreground" fontSize="10">{label}</text>
        );
      })}
    </svg>
  );
}
