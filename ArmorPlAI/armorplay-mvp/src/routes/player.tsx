// @ts-nocheck — legacy file, will be refactored in Fase 2
import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Activity, Brain, Heart, Sparkles, AlertTriangle, ChevronRight } from "lucide-react";
import portrait from "@/assets/player-portrait.jpg";
import { AppShell } from "@/components/armor/AppShell";
import { RiskBadge } from "@/components/armor/RiskBadge";
import { RadarChart } from "@/components/armor/RadarChart";
import { LineChart } from "@/components/armor/LineChart";
import { Sparkline } from "@/components/armor/Sparkline";

export const Route = createFileRoute("/player")({ component: PlayerPage });

const timeline = [
  { date: "Oct 2024", label: "Hamstring strain (Grade 1)", days: 14, type: "muscle" },
  { date: "Feb 2025", label: "Ankle sprain (lateral)", days: 9, type: "joint" },
  { date: "Aug 2025", label: "Quad fatigue · precaution", days: 4, type: "load" },
  { date: "Mar 2026", label: "Knee contusion", days: 6, type: "impact" },
];

function PlayerPage() {
  return (
    <AppShell title="Player intelligence" subtitle="L. Hernández · #10 · Striker">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Identity card */}
        <div className="rounded-2xl glass overflow-hidden relative">
          <div className="relative h-56">
            <img src={portrait} alt="" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1024} height={1024} />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
            <div className="absolute top-3 left-3"><RiskBadge risk="high" /></div>
            <div className="absolute top-3 right-3 text-[10px] font-mono text-muted-foreground glass rounded-md px-2 py-1">ID · PLR-00210</div>
          </div>
          <div className="px-5 -mt-12 relative">
            <div className="flex items-end justify-between">
              <div>
                <div className="text-xs text-muted-foreground">#10 · Striker</div>
                <div className="font-display text-2xl font-semibold mt-0.5">L. Hernández</div>
                <div className="text-xs text-muted-foreground">28 yrs · 1.84m · 79kg · Right foot</div>
              </div>
              <div className="text-right">
                <div className="font-display text-3xl gradient-text">62</div>
                <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Readiness</div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
              {[
                { k: "Risk", v: "78", tone: "text-risk-high" },
                { k: "Fatigue", v: "71", tone: "text-risk-mid" },
                { k: "Load 7d", v: "92%", tone: "text-foreground" },
              ].map((s) => (
                <div key={s.k} className="rounded-xl bg-white/[0.03] border border-hairline py-2.5">
                  <div className={`font-display text-xl ${s.tone}`}>{s.v}</div>
                  <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{s.k}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 pb-5 flex gap-2">
              <button className="flex-1 h-10 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-medium glow-primary">Apply AI plan</button>
              <button className="h-10 px-3 rounded-lg glass text-sm">Bench</button>
            </div>
          </div>
        </div>

        {/* Performance radar */}
        <div className="rounded-2xl glass p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Performance profile</div>
              <div className="font-display text-lg mt-0.5">vs Position average</div>
            </div>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="h-64 mt-2">
            <RadarChart
              axes={["Speed","Endurance","Power","Agility","Recovery","Decision"]}
              values={[0.88, 0.62, 0.92, 0.75, 0.48, 0.81]}
              color="oklch(0.72 0.18 250)"
            />
          </div>
          <div className="text-[11px] text-muted-foreground border-t border-hairline pt-3">Recovery & endurance below threshold — flagged for load reduction.</div>
        </div>

        {/* AI explanation */}
        <div className="rounded-2xl glass p-5 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> AI explanation
            </div>
            <div className="mt-3 font-display text-lg leading-snug">
              <span className="text-risk-high">78% probability</span> of soft-tissue injury within the next 72 hours.
            </div>

            <div className="mt-4 space-y-2.5">
              {[
                { i: AlertTriangle, t: "Sprint load 22% above 4-week mean", c: "text-risk-high" },
                { i: Heart, t: "HRV recovery 18% below baseline", c: "text-risk-mid" },
                { i: Activity, t: "Asymmetry index 0.14 (left-right hamstring)", c: "text-risk-mid" },
                { i: Brain, t: "Sleep score 64 — 3 consecutive nights", c: "text-muted-foreground" },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-sm">
                  <f.i className={`h-4 w-4 mt-0.5 ${f.c}`} />
                  <span className="text-foreground/90">{f.t}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-hairline">
              <div className="text-xs text-muted-foreground mb-2">Recommended actions</div>
              <ul className="space-y-1.5 text-sm">
                <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" /> Reduce sprint volume −35% for 2 sessions</li>
                <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" /> Eccentric hamstring block (Nordics)</li>
                <li className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" /> Sleep hygiene protocol + cryo session</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Load chart + history */}
      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 rounded-2xl glass p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Load · Fatigue · Risk</div>
              <div className="font-display text-lg mt-0.5">Last 14 days</div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary"/>Risk</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent"/>Load</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-violet"/>Fatigue</span>
            </div>
          </div>
          <div className="h-72 mt-2">
            <LineChart
              labels={["1","2","3","4","5","6","7","8","9","10","11","12","13","14"]}
              series={[
                { label: "Risk", color: "oklch(0.72 0.18 250)",   data: [30,34,38,42,48,52,58,62,68,70,74,76,78,78] },
                { label: "Load", color: "oklch(0.78 0.16 210)",  data: [55,62,68,72,80,82,86,88,90,92,94,92,95,96] },
                { label: "Fatigue", color: "oklch(0.7 0.18 295)",data: [40,46,52,58,60,62,64,66,68,70,72,70,72,71] },
              ]}
            />
          </div>
        </div>

        <div className="rounded-2xl glass p-5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Injury history</div>
              <div className="font-display text-lg mt-0.5">24-month timeline</div>
            </div>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </div>

          <ol className="mt-4 relative border-l border-hairline ml-2 space-y-4">
            {timeline.map((t) => (
              <li key={t.date} className="pl-4 relative">
                <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.date}</div>
                <div className="text-sm font-medium mt-0.5">{t.label}</div>
                <div className="text-xs text-muted-foreground">{t.days} days · {t.type}</div>
                <div className="mt-1 h-6"><Sparkline data={[2,4,5,8,6,4,2,1]} stroke="var(--muted-foreground)" /></div>
              </li>
            ))}
          </ol>

          <button className="mt-4 w-full text-xs text-primary hover:text-accent inline-flex items-center justify-center gap-1">
            Full medical record <ChevronRight className="h-3 w-3"/>
          </button>
        </div>
      </div>
    </AppShell>
  );
}
