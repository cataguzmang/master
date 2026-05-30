// ─── ArmorPlay AI · Dashboard del Director ───────────────────────────
import { createFileRoute, Link } from '@tanstack/react-router';
import {
  Users, ShieldAlert, Flame, CheckCircle2, ChevronRight, AlertTriangle, TrendingUp, Calendar,
} from 'lucide-react';
import { AppShell } from '@/components/armor/AppShell';
import { KpiCard } from '@/components/armor/KpiCard';
import { RiskBadge } from '@/components/armor/RiskBadge';
import { BarChart } from '@/components/armor/BarChart';
import { useAuth } from '@/contexts/AuthContext';
import { usePlayers } from '@/contexts/PlayersContext';
import { t } from '@/lib/i18n';
import { eficienciaAlineacion } from '@/lib/semaforo';

export const Route = createFileRoute('/dashboard')({ component: DashboardPage });

function DashboardPage() {
  const { language } = useAuth();
  const { playersWithState, stats, lineup, getPlayerWithState, uploadHistory } = usePlayers();

  // Jugadores con alerta (amarillo o rojo)
  const alerts = playersWithState.filter(
    p => (p.semaforo === 'yellow' || p.semaforo === 'red') && p.estado_activo !== 'baja'
  );

  // Eficiencia del once titular
  const titulares = lineup.filter(s => s.tipo === 'titular');
  const titularColors = titulares
    .map(s => getPlayerWithState(s.jugador_id)?.semaforo ?? 'green');
  const efficiency = eficienciaAlineacion(titularColors);

  // Última carga
  const lastUpload = uploadHistory[0] ?? null;

  // Distribución de carga por posición (para el gráfico de barras)
  const posGroups: Record<string, number[]> = { GK: [], DEF: [], DM: [], CM: [], WG: [], ST: [] };
  for (const p of playersWithState) {
    const ls = p.latestState;
    if (!ls) continue;
    const load = ls.carga_fisica ?? 0;
    if (p.posicion === 'GK') posGroups.GK.push(load);
    else if (['CB', 'RB', 'LB'].includes(p.posicion)) posGroups.DEF.push(load);
    else if (p.posicion === 'DM') posGroups.DM.push(load);
    else if (p.posicion === 'CM') posGroups.CM.push(load);
    else if (['RW', 'LW'].includes(p.posicion)) posGroups.WG.push(load);
    else if (p.posicion === 'ST') posGroups.ST.push(load);
  }
  const avg = (arr: number[]) => arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;
  const posData = [avg(posGroups.GK), avg(posGroups.DEF), avg(posGroups.DM), avg(posGroups.CM), avg(posGroups.WG), avg(posGroups.ST)];

  const effColor = efficiency >= 80 ? 'text-risk-low' : efficiency >= 55 ? 'text-risk-mid' : 'text-risk-high';

  return (
    <AppShell
      title={t(language, 'dashboard.title')}
      subtitle={`Armor FC · ${t(language, 'dashboard.lastUpdate')}: ${stats.lastUpdate ?? '—'}`}
    >
      {/* ── KPIs principales ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-3">
        <KpiCard
          label={t(language, 'dashboard.totalPlayers')}
          value={String(stats.total)}
          sub={`${stats.total} ${t(language, 'common.players')}`}
          accent="primary"
          icon={<Users className="h-4 w-4" />}
        />
        <KpiCard
          label={t(language, 'dashboard.optimal')}
          value={String(stats.optimal)}
          sub={`${Math.round((stats.optimal / stats.total) * 100)}% del plantel`}
          accent="low"
          delta={`+${stats.optimal}`}
          trend="up"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <KpiCard
          label={t(language, 'dashboard.atRisk')}
          value={String(stats.atRisk)}
          sub={t(language, 'dashboard.playersAtRisk')}
          accent="mid"
          icon={<ShieldAlert className="h-4 w-4" />}
        />
        <KpiCard
          label={t(language, 'dashboard.injured')}
          value={String(stats.injured)}
          sub={t(language, 'dashboard.injuredPlayers')}
          accent="high"
          icon={<Flame className="h-4 w-4" />}
        />
        <KpiCard
          label={t(language, 'lineups.efficiencyScore')}
          value={`${efficiency}%`}
          sub={t(language, 'dashboard.teamEfficiency')}
          accent="accent"
          icon={<TrendingUp className="h-4 w-4" />}
        />
      </div>

      {/* ── Fila principal ── */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Alertas activas */}
        <div className="xl:col-span-2 rounded-2xl glass p-5 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {t(language, 'dashboard.alerts')}
                </div>
                <div className="font-display text-lg mt-0.5">{t(language, 'dashboard.watchlist')}</div>
              </div>
              <Link to="/team" className="text-xs text-primary inline-flex items-center gap-1">
                {t(language, 'dashboard.viewAll')} <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            {alerts.length === 0 ? (
              <div className="text-sm text-muted-foreground py-8 text-center">
                ✅ {t(language, 'dashboard.noAlerts')}
              </div>
            ) : (
              <div className="space-y-2.5">
                {alerts.slice(0, 6).map((p) => (
                  <div
                    key={p.jugador_id}
                    className="rounded-xl p-3 bg-white/[0.03] border border-hairline hover:bg-white/[0.05] transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-surface-3 to-surface flex items-center justify-center text-xs font-mono ring-1 ring-hairline">
                          #{p.dorsal}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{p.nombre}</div>
                          <div className="text-[11px] text-muted-foreground">{p.posicion} · Armor FC</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <RiskBadge risk={p.semaforo} lang={language} />
                        <Link to="/team" className="text-[11px] text-muted-foreground hover:text-primary">
                          <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                    {p.latestState?.recomendacion && (
                      <div className="mt-2 flex items-start gap-2 text-xs text-muted-foreground pl-12">
                        <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0 text-risk-mid" />
                        {p.latestState.recomendacion}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Resumen del equipo */}
        <div className="rounded-2xl glass p-5">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {t(language, 'dashboard.squadStatus')}
          </div>
          <div className="font-display text-lg mt-0.5 mb-4">{t(language, 'dashboard.available')}</div>

          {/* Semáforo visual */}
          <div className="space-y-3">
            {[
              { color: 'green' as const, label: t(language, 'status.optimal'), count: stats.optimal,  bar: 'bg-risk-low'  },
              { color: 'yellow' as const, label: t(language, 'status.atRisk'),  count: stats.atRisk,   bar: 'bg-risk-mid'  },
              { color: 'red' as const,   label: t(language, 'status.injured'), count: stats.injured,  bar: 'bg-risk-high' },
            ].map(({ color, label, count, bar }) => (
              <div key={color}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <RiskBadge risk={color} lang={language} />
                  </div>
                  <span className="font-mono text-sm">{count} <span className="text-muted-foreground text-xs">{t(language, 'common.of')} {stats.total}</span></span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full ${bar} transition-all duration-500`}
                    style={{ width: `${stats.total > 0 ? (count / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Eficiencia */}
          <div className="mt-5 pt-4 border-t border-hairline">
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-2">
              {t(language, 'dashboard.teamEfficiency')}
            </div>
            <div className={`font-display text-4xl ${effColor}`}>{efficiency}%</div>
            <div className="text-[11px] text-muted-foreground mt-1">
              {t(language, 'lineups.starters')} · 11 {t(language, 'common.players')}
            </div>
          </div>

          {/* Última carga */}
          {lastUpload && (
            <div className="mt-4 pt-4 border-t border-hairline">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                <span className="truncate">
                  {t(language, 'dashboard.lastUpdate')}: {lastUpload.fecha_carga.split('T')[0]}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Tabla de jugadores + gráfico ── */}
      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Tabla completa */}
        <div className="xl:col-span-2 rounded-2xl glass overflow-hidden">
          <div className="p-5 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                {t(language, 'players.title')}
              </div>
              <div className="font-display text-lg mt-0.5">{t(language, 'dashboard.watchlist')}</div>
            </div>
            <Link to="/team" className="text-xs text-primary inline-flex items-center gap-1">
              {t(language, 'dashboard.viewAll')} <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground border-y border-hairline bg-white/[0.02]">
                  <th className="text-left font-medium px-5 py-2">{t(language, 'players.name')}</th>
                  <th className="text-left font-medium px-2 hidden md:table-cell">{t(language, 'players.position')}</th>
                  <th className="text-left font-medium px-2">{t(language, 'players.risk')}</th>
                  <th className="text-left font-medium px-2 hidden md:table-cell">{t(language, 'player.fatigue')}</th>
                  <th className="px-5" />
                </tr>
              </thead>
              <tbody>
                {playersWithState
                  .filter(p => p.estado_activo !== 'baja' && p.estado_activo !== 'transferido')
                  .slice(0, 8)
                  .map((p) => (
                    <tr key={p.jugador_id} className="border-b border-hairline last:border-0 hover:bg-white/[0.03] transition">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-surface-3 to-surface flex items-center justify-center text-xs font-mono ring-1 ring-hairline">
                            #{p.dorsal}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{p.nombre}</div>
                            <div className="text-[11px] text-muted-foreground">Armor FC</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-2 text-muted-foreground text-sm hidden md:table-cell">{p.posicion}</td>
                      <td className="px-2">
                        <RiskBadge risk={p.semaforo} lang={language} />
                      </td>
                      <td className="px-2 text-sm hidden md:table-cell">
                        {p.latestState?.fatiga ? (
                          <span className={
                            p.latestState.fatiga === 'alta' ? 'text-risk-high' :
                            p.latestState.fatiga === 'media' ? 'text-risk-mid' : 'text-risk-low'
                          }>
                            {p.latestState.fatiga.charAt(0).toUpperCase() + p.latestState.fatiga.slice(1)}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </td>
                      <td className="px-5 text-right">
                        <Link to="/team" className="text-xs text-primary hover:text-accent inline-flex items-center gap-1">
                          {t(language, 'common.view')} <ChevronRight className="h-3 w-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Carga por posición */}
        <div className="rounded-2xl glass p-5">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {language === 'es' ? 'Carga física por posición' : 'Physical load by position'}
          </div>
          <div className="font-display text-lg mt-0.5">
            {language === 'es' ? 'Esta semana' : 'This week'}
          </div>
          <div className="h-52 mt-3">
            <BarChart
              data={posData}
              labels={['GK', 'DEF', 'DM', 'CM', 'WG', 'ST']}
              color="oklch(0.72 0.18 250)"
            />
          </div>
          <div className="mt-2 pt-3 border-t border-hairline text-xs text-muted-foreground">
            {language === 'es' ? 'Valores de carga promedio por línea' : 'Average load values by line'}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
