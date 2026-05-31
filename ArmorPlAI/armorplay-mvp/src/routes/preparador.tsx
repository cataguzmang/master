// ─── ArmorPlay AI · Panel Físico del Preparador ──────────────────────
import { createFileRoute, Link } from '@tanstack/react-router';
import { Flame, AlertTriangle, CheckCircle2, Upload, ChevronRight } from 'lucide-react';
import { AppShell } from '@/components/armor/AppShell';
import { KpiCard } from '@/components/armor/KpiCard';
import { RiskBadge } from '@/components/armor/RiskBadge';
import { useAuth } from '@/contexts/AuthContext';
import { usePlayers } from '@/contexts/PlayersContext';
import { t } from '@/lib/i18n';

export const Route = createFileRoute('/preparador')({ component: PreparadorPage });

function PreparadorPage() {
  const { language } = useAuth();
  const { playersWithState, uploadHistory } = usePlayers();
  const lang = language;

  const activePlayers = playersWithState.filter(
    p => p.estado_activo !== 'baja' && p.estado_activo !== 'transferido'
  );
  const highFatigue = activePlayers.filter(p => p.latestState?.fatiga === 'alta');
  const withPain    = activePlayers.filter(p => p.latestState?.dolor_reportado === 'sí');
  const injured     = activePlayers.filter(p => p.semaforo === 'red');
  const atRisk      = activePlayers.filter(p => p.semaforo === 'yellow');
  const optimal     = activePlayers.filter(p => p.semaforo === 'green');
  const lastUpload  = uploadHistory[0] ?? null;

  // Carga promedio por línea
  const posGroups: Record<string, number[]> = { GK: [], DEF: [], DM: [], CM: [], WG: [], ST: [] };
  for (const p of activePlayers) {
    const load = p.latestState?.carga_fisica ?? 0;
    if      (p.posicion === 'GK')                       posGroups.GK.push(load);
    else if (['CB', 'RB', 'LB'].includes(p.posicion))   posGroups.DEF.push(load);
    else if (p.posicion === 'DM')                        posGroups.DM.push(load);
    else if (p.posicion === 'CM')                        posGroups.CM.push(load);
    else if (['RW', 'LW'].includes(p.posicion))          posGroups.WG.push(load);
    else if (p.posicion === 'ST')                        posGroups.ST.push(load);
  }
  const avg = (arr: number[]) =>
    arr.length ? Math.round(arr.reduce((a, b) => a + b, 0) / arr.length) : 0;

  const loadColor = (v: number) =>
    v > 80 ? 'text-risk-high' : v > 60 ? 'text-risk-mid' : 'text-risk-low';
  const loadBar = (v: number) =>
    v > 80 ? 'bg-risk-high' : v > 60 ? 'bg-risk-mid' : 'bg-risk-low';

  const posLoadData = [
    { lbl: 'GK',  val: avg(posGroups.GK)  },
    { lbl: 'DEF', val: avg(posGroups.DEF) },
    { lbl: 'DM',  val: avg(posGroups.DM)  },
    { lbl: 'CM',  val: avg(posGroups.CM)  },
    { lbl: 'WG',  val: avg(posGroups.WG)  },
    { lbl: 'ST',  val: avg(posGroups.ST)  },
  ];

  const teamAvgLoad = activePlayers.length > 0
    ? Math.round(
        activePlayers.reduce((sum, p) => sum + (p.latestState?.carga_fisica ?? 0), 0)
        / activePlayers.length * 10
      ) / 10
    : 0;

  const attentionList = [...injured, ...atRisk];

  return (
    <AppShell
      title={t(lang, 'physical.title')}
      subtitle={`Armor FC · ${t(lang, 'physical.subtitle')}`}
    >
      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard
          label={t(lang, 'physical.highFatigue')}
          value={String(highFatigue.length)}
          sub={lang === 'es' ? 'jugadores' : 'players'}
          accent="mid"
          icon={<Flame className="h-4 w-4" />}
        />
        <KpiCard
          label={t(lang, 'physical.painReported')}
          value={String(withPain.length)}
          sub={lang === 'es' ? 'con dolor' : 'with pain'}
          accent="mid"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <KpiCard
          label={t(lang, 'status.injured')}
          value={String(injured.length)}
          sub={lang === 'es' ? 'baja médica' : 'medical leave'}
          accent="high"
          icon={<Flame className="h-4 w-4" />}
        />
        <KpiCard
          label={t(lang, 'status.atRisk')}
          value={String(atRisk.length)}
          sub={lang === 'es' ? 'en riesgo' : 'at risk'}
          accent="mid"
        />
        <KpiCard
          label={t(lang, 'status.optimal')}
          value={String(optimal.length)}
          sub={lang === 'es' ? 'óptimos' : 'optimal'}
          accent="low"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <KpiCard
          label={lang === 'es' ? 'Última carga' : 'Last upload'}
          value={lastUpload ? lastUpload.fecha_carga.split('T')[0] : '—'}
          sub={lastUpload ? lastUpload.nombre_archivo.substring(0, 20) + '…' : '—'}
          accent="accent"
          icon={<Upload className="h-4 w-4" />}
        />
      </div>

      {/* ── Atención + Carga por posición ── */}
      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Lista de atención */}
        <div className="xl:col-span-2 rounded-2xl glass p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                ⚠️ {t(lang, 'physical.observations')}
              </div>
              <div className="font-display text-lg mt-0.5">
                {lang === 'es' ? 'Requieren atención' : 'Require attention'}
              </div>
            </div>
            <Link to="/team" className="text-xs text-primary inline-flex items-center gap-1">
              {t(lang, 'dashboard.viewAll')} <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {attentionList.length === 0 ? (
            <div className="text-sm text-muted-foreground py-8 text-center">
              ✅ {lang === 'es' ? 'Sin alertas físicas activas' : 'No active physical alerts'}
            </div>
          ) : (
            <div className="space-y-2.5">
              {attentionList.map(p => {
                const ls = p.latestState;
                const ringCls = p.semaforo === 'red'
                  ? 'ring-risk-high/40 bg-risk-high/10'
                  : 'ring-risk-mid/40 bg-risk-mid/10';
                const obsColor = p.semaforo === 'red' ? 'text-risk-high' : 'text-risk-mid';
                const fatigueCls = ls?.fatiga === 'alta'
                  ? 'text-risk-high' : ls?.fatiga === 'media'
                  ? 'text-risk-mid' : 'text-risk-low';
                return (
                  <div
                    key={p.jugador_id}
                    className="rounded-xl p-3 bg-white/[0.03] border border-hairline hover:bg-white/[0.05] transition"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-9 w-9 rounded-lg flex items-center justify-center text-xs font-mono ring-1 ${ringCls}`}>
                          #{p.dorsal}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{p.nombre}</div>
                          <div className="text-[11px] text-muted-foreground">
                            {p.posicion} · {lang === 'es' ? 'Fatiga:' : 'Fatigue:'}{' '}
                            <span className={fatigueCls}>{ls?.fatiga ?? '—'}</span>
                            {ls && ` · Load: ${ls.carga_fisica}`}
                          </div>
                        </div>
                      </div>
                      <RiskBadge risk={p.semaforo} lang={lang} />
                    </div>
                    {ls?.observaciones_pf && (
                      <div className="mt-2 flex items-start gap-2 text-xs text-muted-foreground pl-12">
                        <span className={`flex-shrink-0 ${obsColor}`}>💬</span>
                        <span>{ls.observaciones_pf}</span>
                      </div>
                    )}
                    {ls?.tipo_lesion && (
                      <div className="mt-1.5 pl-12">
                        <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md bg-white/[0.05] border border-hairline text-muted-foreground">
                          🦴 {ls.tipo_lesion}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Carga por posición */}
        <div className="rounded-2xl glass p-5">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {lang === 'es' ? 'Carga física por posición' : 'Physical load by position'}
          </div>
          <div className="font-display text-lg mt-0.5 mb-4">
            {lang === 'es' ? 'Promedio de carga' : 'Average load'}
          </div>
          <div className="space-y-3">
            {posLoadData.map(row => (
              <div key={row.lbl}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{row.lbl}</span>
                  <span className={`font-mono ${loadColor(row.val)}`}>{row.val}</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full ${loadBar(row.val)} transition-all duration-500`}
                    style={{ width: `${row.val}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-hairline flex justify-between text-xs text-muted-foreground">
            <span>{lang === 'es' ? 'Carga promedio equipo' : 'Team avg load'}</span>
            <span className="text-risk-mid font-semibold">{teamAvgLoad}</span>
          </div>
        </div>
      </div>

      {/* ── Tabla completa de jugadores ── */}
      <div className="mt-4 rounded-2xl glass overflow-hidden">
        <div className="p-5 pb-3">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            📊 {lang === 'es' ? 'Estado físico completo' : 'Full physical status'}
          </div>
          <div className="font-display text-lg mt-0.5">
            {lang === 'es' ? 'Todos los jugadores' : 'All players'}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground border-y border-hairline bg-white/[0.02]">
                <th className="text-left font-medium px-4 py-2">#</th>
                <th className="text-left font-medium px-4 py-2">{t(lang, 'players.name')}</th>
                <th className="text-left font-medium px-2 py-2 hidden md:table-cell">{t(lang, 'players.position')}</th>
                <th className="text-left font-medium px-2 py-2">{t(lang, 'players.risk')}</th>
                <th className="text-left font-medium px-2 py-2">{t(lang, 'player.fatigue')}</th>
                <th className="text-left font-medium px-2 py-2">Load</th>
                <th className="text-left font-medium px-2 py-2 hidden lg:table-cell">{t(lang, 'player.sprints')}</th>
                <th className="text-left font-medium px-2 py-2 hidden lg:table-cell">{t(lang, 'player.minutesPlayed')}</th>
                <th className="text-center font-medium px-2 py-2">{t(lang, 'player.pain')}</th>
                <th className="text-left font-medium px-2 py-2 hidden xl:table-cell">{t(lang, 'player.observations')}</th>
              </tr>
            </thead>
            <tbody>
              {activePlayers.map(p => {
                const ls = p.latestState;
                const sprintsVal = ls?.sprints ?? 0;
                const sprintCls  = sprintsVal > 22 ? 'text-risk-high' : sprintsVal > 16 ? 'text-risk-mid' : 'text-muted-foreground';
                const fatigueCls = ls?.fatiga === 'alta' ? 'text-risk-high' : ls?.fatiga === 'media' ? 'text-risk-mid' : 'text-risk-low';
                const loadPct    = ls?.carga_fisica ?? 0;
                return (
                  <tr key={p.jugador_id} className="border-b border-hairline last:border-0 hover:bg-white/[0.03] transition">
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{p.dorsal}</td>
                    <td className="px-4 py-3 font-medium text-sm">{p.nombre}</td>
                    <td className="px-2 py-3 text-muted-foreground text-sm hidden md:table-cell">{p.posicion}</td>
                    <td className="px-2 py-3">
                      <RiskBadge risk={p.semaforo} lang={lang} />
                    </td>
                    <td className={`px-2 py-3 text-sm ${fatigueCls}`}>
                      {ls?.fatiga ?? '—'}
                    </td>
                    <td className="px-2 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className={`h-full ${loadBar(loadPct)}`} style={{ width: `${loadPct}%` }} />
                        </div>
                        <span className="font-mono text-[11px] text-muted-foreground">{loadPct || '—'}</span>
                      </div>
                    </td>
                    <td className={`px-2 py-3 font-mono text-[11px] ${sprintCls} hidden lg:table-cell`}>
                      {ls?.sprints ?? '—'}
                    </td>
                    <td className="px-2 py-3 font-mono text-[11px] text-muted-foreground hidden lg:table-cell">
                      {ls?.minutos_jugados ?? '—'}
                    </td>
                    <td className="px-2 py-3 text-center text-base">
                      {ls?.dolor_reportado === 'sí'
                        ? <span className="text-risk-high">●</span>
                        : <span className="text-risk-low">○</span>
                      }
                    </td>
                    <td className="px-2 py-3 text-[11px] text-muted-foreground max-w-[180px] truncate hidden xl:table-cell">
                      {ls?.observaciones_pf ?? '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Historial de cargas + Recomendaciones ── */}
      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* Últimas cargas */}
        <div className="xl:col-span-2 rounded-2xl glass p-5">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            📤 {lang === 'es' ? 'Últimas cargas Excel' : 'Recent Excel uploads'}
          </div>
          <div className="font-display text-lg mt-0.5 mb-4">
            {lang === 'es' ? 'Actividad reciente' : 'Recent activity'}
          </div>
          <div className="divide-y divide-hairline">
            {uploadHistory.slice(0, 3).map(h => (
              <div key={h.carga_id} className="flex items-center gap-3 py-2.5">
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0 ${h.tipo_excel === 'jugadores' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                  {h.tipo_excel === 'jugadores' ? '👥' : '💪'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{h.nombre_archivo}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {h.usuario} · {h.fecha_carga.split('T')[0]}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${h.estado_carga === 'exitosa' ? 'bg-risk-low/10 text-risk-low' : 'bg-risk-mid/10 text-risk-mid'}`}>
                    {h.estado_carga === 'exitosa'
                      ? (lang === 'es' ? '✓ Exitosa' : '✓ Success')
                      : (lang === 'es' ? '⚠ Errores' : '⚠ Errors')}
                  </span>
                  <div className="text-[10px] text-muted-foreground mt-1">{h.registros_procesados} reg.</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-hairline">
            <Link to="/historial-cargas" className="text-xs text-primary inline-flex items-center gap-1">
              {lang === 'es' ? 'Ver historial completo' : 'View full history'} <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

        {/* Recomendaciones físicas */}
        <div className="rounded-2xl glass p-5">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {t(lang, 'physical.physicalRecs')}
          </div>
          <div className="font-display text-lg mt-0.5 mb-4">
            {lang === 'es' ? 'Acciones sugeridas' : 'Suggested actions'}
          </div>
          <div className="space-y-2">
            {[
              {
                icon: '🔴',
                text: lang === 'es'
                  ? `${injured.length} jugadores requieren descanso médico completo.`
                  : `${injured.length} players require full medical rest.`,
              },
              {
                icon: '⚠️',
                text: lang === 'es'
                  ? `${highFatigue.length} jugadores con fatiga alta: reducir carga en próxima sesión.`
                  : `${highFatigue.length} players with high fatigue: reduce load next session.`,
              },
              {
                icon: '🤕',
                text: lang === 'es'
                  ? `${withPain.length} jugadores reportan dolor: priorizar evaluación física.`
                  : `${withPain.length} players report pain: prioritize physical evaluation.`,
              },
              {
                icon: '✅',
                text: lang === 'es'
                  ? `${optimal.length} jugadores en estado óptimo. Carga normal.`
                  : `${optimal.length} players in optimal state. Normal load.`,
              },
            ].map((rec, i) => (
              <div key={i} className="flex gap-2.5 p-2.5 rounded-lg bg-white/[0.02]">
                <span className="flex-shrink-0">{rec.icon}</span>
                <span className="text-xs text-muted-foreground leading-relaxed">{rec.text}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-hairline">
            <Link to="/carga-excel" className="text-xs text-primary inline-flex items-center gap-1">
              📤 {lang === 'es' ? 'Cargar datos' : 'Upload data'} <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
