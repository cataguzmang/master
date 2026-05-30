// @ts-nocheck — legacy file, will be refactored in Fase 2
import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, Activity, ShieldCheck, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/armor/AppShell";
import { RiskBadge } from "@/components/armor/RiskBadge";
import { KpiCard } from "@/components/armor/KpiCard";
import { BarChart } from "@/components/armor/BarChart";

export const Route = createFileRoute("/team")({ component: TeamPage });

const squad = [
  { n: 1,  name: "A. Pérez",     pos: "GK", risk: "low",  ready: 94 },
  { n: 2,  name: "S. Kovač",     pos: "RB", risk: "low",  ready: 90 },
  { n: 3,  name: "T. Moretti",   pos: "LB", risk: "mid",  ready: 74 },
  { n: 4,  name: "R. Okafor",    pos: "CB", risk: "low",  ready: 91 },
  { n: 5,  name: "D. Lindqvist", pos: "CB", risk: "low",  ready: 88 },
  { n: 6,  name: "F. Bauer",     pos: "DM", risk: "low",  ready: 85 },
  { n: 7,  name: "M. Tavares",   pos: "RW", risk: "mid",  ready: 78 },
  { n: 8,  name: "J. Bellini",   pos: "CM", risk: "low",  ready: 88 },
  { n: 9,  name: "K. Adeyemi",   pos: "ST", risk: "high", ready: 58 },
  { n: 10, name: "L. Hernández", pos: "ST", risk: "high", ready: 62 },
  { n: 11, name: "C. Nakamura",  pos: "LW", risk: "low",  ready: 89 },
  { n: 14, name: "P. Hassan",    pos: "CM", risk: "mid",  ready: 76 },
] as const;

// Pitch positions (in %): x left-right, y top-bottom
const formation = [
  { id: 1,  x: 50, y: 90, n: 1,  risk: "low" },
  { id: 2,  x: 80, y: 72, n: 2,  risk: "low" },
  { id: 3,  x: 60, y: 72, n: 4,  risk: "low" },
  { id: 4,  x: 40, y: 72, n: 5,  risk: "low" },
  { id: 5,  x: 20, y: 72, n: 3,  risk: "mid" },
  { id: 6,  x: 50, y: 52, n: 6,  risk: "low" },
  { id: 7,  x: 30, y: 42, n: 8,  risk: "low" },
  { id: 8,  x: 70, y: 42, n: 14, risk: "mid" },
  { id: 9,  x: 80, y: 24, n: 7,  risk: "mid" },
  { id: 10, x: 20, y: 24, n: 11, risk: "low" },
  { id: 11, x: 50, y: 16, n: 10, risk: "high" },
] as const;

function TeamPage() {
  return (
    <AppShell title="Team overview" subtitle="FC Aurora · Senior squad · 26 players">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Available" value="22/26" sub="Match-fit squad" accent="low" icon={<ShieldCheck className="h-4 w-4"/>} delta="+2" trend="up" />
        <KpiCard label="In recovery" value="3" sub="Return in 4–9 days" accent="mid" icon={<Activity className="h-4 w-4"/>} />
        <KpiCard label="High risk" value="4" sub="Active monitoring" accent="high" delta="+1" trend="down" />
        <KpiCard label="Squad readiness" value="84%" sub="Pre-match index" accent="primary" icon={<Users className="h-4 w-4"/>} delta="+3.4%" trend="up" />
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Pitch */}
        <div className="xl:col-span-2 rounded-2xl glass p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Injury risk map</div>
              <div className="font-display text-lg mt-0.5">4-3-3 · Saturday lineup forecast</div>
            </div>
            <div className="flex items-center gap-3 text-[11px]">
              <RiskBadge risk="low" label="Low" /><RiskBadge risk="mid" label="Moderate" /><RiskBadge risk="high" label="High" />
            </div>
          </div>

          <div className="relative mt-4 aspect-[4/5] md:aspect-[16/10] rounded-xl overflow-hidden border border-hairline"
               style={{ background: "linear-gradient(180deg, oklch(0.22 0.04 160 / 0.55), oklch(0.18 0.03 160 / 0.6))" }}>
            {/* pitch markings */}
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full opacity-40">
              <rect x="2" y="2" width="96" height="96" fill="none" stroke="oklch(1 0 0 / 0.4)" strokeWidth="0.3" />
              <line x1="2" y1="50" x2="98" y2="50" stroke="oklch(1 0 0 / 0.3)" strokeWidth="0.2" />
              <circle cx="50" cy="50" r="9" fill="none" stroke="oklch(1 0 0 / 0.3)" strokeWidth="0.2" />
              <rect x="28" y="2" width="44" height="14" fill="none" stroke="oklch(1 0 0 / 0.3)" strokeWidth="0.2" />
              <rect x="28" y="84" width="44" height="14" fill="none" stroke="oklch(1 0 0 / 0.3)" strokeWidth="0.2" />
            </svg>

            {formation.map((p) => {
              const player = squad.find((s) => s.n === p.n)!;
              const color = p.risk === "high" ? "var(--risk-high)" : p.risk === "mid" ? "var(--risk-mid)" : "var(--risk-low)";
              return (
                <div key={p.id} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full blur-md opacity-70" style={{ background: color }} />
                    <div className="relative h-10 w-10 rounded-full flex items-center justify-center text-xs font-mono font-semibold ring-2"
                         style={{ background: "oklch(0.16 0.025 260)", color: "white", boxShadow: `0 0 0 1px ${color}, 0 0 16px ${color}` }}>
                      {p.n}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-1.5 whitespace-nowrap rounded-md glass-strong px-2 py-1 text-[10px]">
                      {player.name} · {player.ready}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Position distribution */}
        <div className="rounded-2xl glass p-5">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Risk by position</div>
          <div className="font-display text-lg mt-0.5">Squad distribution</div>
          <div className="h-52 mt-3">
            <BarChart data={[12, 28, 22, 35, 48, 62]} labels={["GK","DEF","DM","CM","WG","ST"]} color="oklch(0.7 0.18 295)" />
          </div>

          <div className="mt-3 pt-3 border-t border-hairline space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Highest exposure</span><span className="font-medium">Strikers · 62</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Lowest exposure</span><span className="font-medium">Goalkeepers · 12</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Trend</span><span className="text-risk-low">−4.1% vs last week</span></div>
          </div>
        </div>
      </div>

      {/* Squad cards */}
      <div className="mt-4 rounded-2xl glass overflow-hidden">
        <div className="p-5 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Squad</div>
            <div className="font-display text-lg mt-0.5">All players</div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button className="glass px-2.5 py-1 rounded-md">All</button>
            <button className="px-2.5 py-1 rounded-md text-muted-foreground">Available</button>
            <button className="px-2.5 py-1 rounded-md text-muted-foreground">Recovery</button>
          </div>
        </div>

        <div className="p-5 pt-0 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {squad.map((p) => (
            <Link to="/player" key={p.n}
              className="group rounded-xl bg-white/[0.02] border border-hairline p-4 hover:bg-white/[0.05] hover:border-primary/30 transition">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-surface-3 to-surface flex items-center justify-center text-sm font-mono">#{p.n}</div>
                <RiskBadge risk={p.risk as "low" | "mid" | "high"} />
              </div>
              <div className="mt-3 text-sm font-medium">{p.name}</div>
              <div className="text-xs text-muted-foreground">{p.pos} · FC Aurora</div>
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  <span>Readiness</span><span>{p.ready}%</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div className={`h-full ${p.ready > 80 ? "bg-risk-low" : p.ready > 70 ? "bg-risk-mid" : "bg-risk-high"}`} style={{ width: `${p.ready}%` }} />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end text-[11px] text-muted-foreground group-hover:text-primary">
                Open <ChevronRight className="h-3 w-3"/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
