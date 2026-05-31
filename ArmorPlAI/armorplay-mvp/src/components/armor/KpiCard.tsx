import { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export function KpiCard({
  label, value, sub, delta, trend, accent, icon,
}: {
  label: string; value: string; sub?: string; delta?: string;
  trend?: "up" | "down"; accent?: "primary" | "accent" | "low" | "mid" | "high";
  icon?: ReactNode;
}) {
  const accents: Record<string, string> = {
    primary: "from-primary/30",
    accent: "from-accent/30",
    low: "from-risk-low/30",
    mid: "from-risk-mid/30",
    high: "from-risk-high/30",
  };
  const glow = accents[accent ?? "primary"];
  return (
    <div className="relative overflow-hidden rounded-2xl glass p-5 gradient-border">
      <div className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${glow} to-transparent blur-2xl`} />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="uppercase tracking-[0.14em]">{label}</span>
        {icon && <span className="text-foreground/60">{icon}</span>}
      </div>
      <div className="mt-3 flex items-end gap-2">
        <div className="font-display text-3xl font-semibold tracking-tight">{value}</div>
        {delta && (
          <div className={`inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-md ${trend === "down" ? "text-risk-high bg-risk-high/10" : "text-risk-low bg-risk-low/10"}`}>
            {trend === "down" ? <ArrowDownRight className="h-3 w-3" /> : <ArrowUpRight className="h-3 w-3" />}
            {delta}
          </div>
        )}
      </div>
      {sub && <div className="mt-1 text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}
