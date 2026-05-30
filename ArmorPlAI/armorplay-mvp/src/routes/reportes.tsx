// ─── ArmorPlay AI · Reportes ───────────────────────────────────────────
import { createFileRoute, Link } from '@tanstack/react-router';
import { TrendingUp, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/armor/AppShell';
import { KpiCard } from '@/components/armor/KpiCard';
import { RiskBadge } from '@/components/armor/RiskBadge';
import { useAuth } from '@/contexts/AuthContext';
import { usePlayers } from '@/contexts/PlayersContext';
import { t } from '@/lib/i18n';
import { eficienciaAlineacion } from '@/lib/semaforo';

export const Route = createFileRoute('/reportes')({ component: ReportesPage });

function ReportesPage() {
  const { language } = useAuth();
  const { playersWithState, stats, lineup, getPlayerWithState } = usePlayers();
  const lang = language;

  const activePlayers = playersWithState.filter(
    p => p.estado_activo !== 'baja' && p.estado_activo !== 'transferido',
  );

  const avgLoad =
    activePlayers.length > 0
      ? Math.round(
          activePlayers.reduce((s, p) => s + (p.latestState?.carga_fisica ?? 0), 0) /
            activePlayers.length,
        )
      : 0;

  const highRiskCount = activePlayers.filter(
    p => p.semaforo === 'yellow' || p.semaforo === 'red',
  ).length;

  const withInjury = activePlayers.filter(p => p.latestState?.tipo_lesion);

  // Lineup efficiency
  const titulares = lineup.filter(s => s.tipo === 'titular');
  const titularColors = titulares.map(
    s => getPlayerWithState(s.jugador_id)?.semaforo ?? 'green',
  );
  const efficiency = eficienciaAlineacion(titularColors);
  const effColorCls =
    efficiency >= 80 ? 'text-risk-low' : efficiency >= 55 ? 'text-risk-mid' : 'text-risk-high';

  // Load by position
  const posGroups: Record<string, number[]> = {
    GK: [], DEF: [], DM: [], CM: [], WG: [], ST: [],
  };
  for (const p of activePlayers) {
    const load = p.latestState?.carga_fisica ?? 0;
    if (p.posicion === 'GK') posGroups.GK.push(load);
    else if (['CB', 'RB', 'LB'].includes(p.posicion)) posGroups.DEF.push(load);
    else if (p.posicion === 'DM') posGroups.DM.push(load);
    else if (p.posicion === 'CM') posGroups.CM.push(load);
    else if (['RW', 'LW'].includes(p.posicion)) posGroups.WG.push(load);
    else if (p.posicion === 'ST') posGroups.ST.push(load);
  }
  const avg = (arr: number[]) =>
    arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

  const posData = [
    { lbl: 'GK',  val: avg(posGroups.GK)  },
    { lbl: 'DEF', val: avg(posGroups.DEF) },
    { lbl: 'DM',  val: avg(posGroups.DM)  },
    { lbl: 'CM',  val: avg(posGroups.CM)  },
    { lbl: 'WG',  val: avg(posGroups.WG)  },
    { lbl: 'ST',  val: avg(posGroups.ST)  },
  ];

  const barCls = (v: number) =>
    v > 75 ? 'bg-risk-high' : v > 60 ? 'bg-risk-mid' : 'bg-primary';
  const valCls = (v: number) =>
    v > 75 ? 'text-risk-high' : v > 60 ? 'text-risk-mid' : 'text-primary';

  const pct = (n: number, total: number) =>
    total > 0 ? Math.round((n / total) * 100) : 0;

  const onAlert = activePlayers
    .filter(p => p.semaforo === 'yellow' || p.semaforo === 'red')
    .slice(0, 5);

  return (
    <AppShell
      title={t(lang, 'nav.reports')}
      subtitle={`Armor FC · ${lang === 'es' ? 'Semana del 19-25 mayo 2026' : 'Week of May 19–25, 2026'}`}
    >
      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          label={lang === 'es' ? 'Estado del equipo' : 'Team status'}
          value={`${pct(stats.optimal, stats.total)}%`}
          sub={lang === 'es' ? 'en estado óptimo' : 'in optimal state'}
          accent="low"
        />
        <KpiCard
          label={lang === 'es' ? 'Lesiones activas' : 'Active injuries'}
          value={String(stats.injured)}
          sub={lang === 'es' ? 'baja médica' : 'medical leave'}
          accent="high"
        />
        <KpiCard
          label={lang === 'es' ? 'Carga promedio' : 'Average load'}
          value={String(avgLoad)}
          sub={lang === 'es' ? 'carga del equipo' : 'team load'}
          accent="mid"
        />
        <KpiCard
          label={t(lang, 'lineups.efficiencyScore')}
          value={`${efficiency}%`}
          sub={lang === 'es' ? 'once titular' : 'starting eleven'}
          accent="accent"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* ── Squad status + injuries ── */}
        <div className="xl:col-span-2 rounded-2xl glass overflow-hidden">
          <div className="p-5 border-b border-hairline">
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {lang === 'es' ? 'Resumen de estado del plantel' : 'Squad status summary'}
            </div>
            <div className="font-display text-lg mt-0.5">
              {lang === 'es' ? 'Distribución actual' : 'Current distribution'}
            </div>
          </div>

          <div className="p-5">
            {/* Status bars */}
            {[
              { color: 'green'  as const, label: t(lang, 'status.optimal'), count: stats.optimal, bar: 'bg-risk-low'  },
              { color: 'yellow' as const, label: t(lang, 'status.atRisk'),  count: stats.atRisk,  bar: 'bg-risk-mid'  },
              { color: 'red'    as const, label: t(lang, 'status.injured'), count: stats.injured, bar: 'bg-risk-high' },
            ].map(x => (
              <div key={x.color} className="mb-5 last:mb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-3">
                    <RiskBadge risk={x.color} lang={lang} />
                    <span className="text-xs text-muted-foreground">{pct(x.count, stats.total)}%</span>
                  </div>
                  <span className="font-mono text-sm font-semibold">
                    {x.count}
                    <span className="text-muted-foreground text-xs ml-1">/ {stats.total}</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full ${x.bar} transition-all duration-700`}
                    style={{ width: `${pct(x.count, stats.total)}%` }}
                  />
                </div>
              </div>
            ))}

            {/* Efficiency */}
            <div className="mt-6 pt-5 border-t border-hairline flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-1">
                  {t(lang, 'dashboard.teamEfficiency')}
                </div>
                <div className={`font-display text-4xl font-bold ${effColorCls}`}>{efficiency}%</div>
              </div>
              <Link
                to="/alineaciones"
                className="inline-flex items-center gap-1 text-xs text-primary hover:text-accent transition"
              >
                {lang === 'es' ? 'Ver alineación' : 'View lineup'} <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {/* Active injuries */}
            {withInjury.length > 0 && (
              <div className="mt-5 pt-5 border-t border-hairline">
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">
                  🦴 {lang === 'es' ? 'Lesiones activas' : 'Active injuries'}
                </div>
                <div className="space-y-2">
                  {withInjury.map(p => (
                    <div key={p.jugador_id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RiskBadge risk={p.semaforo} lang={lang} />
                        <span className="text-sm font-medium">{p.nombre} #{p.dorsal}</span>
                      </div>
                      <span className="text-xs text-risk-high">{p.latestState?.tipo_lesion}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Side panels ── */}
        <div className="flex flex-col gap-4">

          {/* Load by position */}
          <div className="rounded-2xl glass p-5">
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {lang === 'es' ? 'Carga semanal por posición' : 'Weekly load by position'}
            </div>
            <div className="font-display text-base mt-0.5 mb-4">
              {lang === 'es' ? 'Promedio' : 'Average'}
            </div>
            <div className="space-y-3">
              {posData.map(({ lbl, val }) => (
                <div key={lbl}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{lbl}</span>
                    <span className={`font-mono ${valCls(val)}`}>{val}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full ${barCls(val)} transition-all duration-700`}
                      style={{ width: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-hairline flex justify-between text-xs text-muted-foreground">
              <span>{lang === 'es' ? 'Promedio general' : 'Overall average'}</span>
              <span className="font-mono text-risk-mid font-semibold">{avgLoad}</span>
            </div>
          </div>

          {/* Risk trend */}
          <div className="rounded-2xl glass p-5">
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {lang === 'es' ? 'Tendencia de riesgo' : 'Risk trend'}
            </div>
            <div className="font-display text-base mt-0.5 mb-4">
              {highRiskCount} {lang === 'es' ? 'jugadores en alerta' : 'players on alert'}
            </div>

            {onAlert.length === 0 ? (
              <div className="text-xs text-muted-foreground py-2">
                ✅ {lang === 'es' ? 'Sin jugadores en alerta' : 'No players on alert'}
              </div>
            ) : (
              <div className="divide-y divide-hairline">
                {onAlert.map(p => (
                  <div key={p.jugador_id} className="flex justify-between items-center py-2.5">
                    <span className="text-sm font-medium">{p.nombre}</span>
                    <RiskBadge risk={p.semaforo} lang={lang} />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-3 pt-3 border-t border-hairline">
              <Link
                to="/team"
                className="text-xs text-primary inline-flex items-center gap-1 hover:text-accent transition"
              >
                {lang === 'es' ? 'Ver todos los jugadores' : 'View all players'}{' '}
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
