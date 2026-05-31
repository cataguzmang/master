// ─── ArmorPlay AI · Alineaciones (4·3·3) ─────────────────────────────
import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowLeftRight, CheckCircle2, X, TrendingUp } from 'lucide-react';
import { AppShell } from '@/components/armor/AppShell';
import { KpiCard } from '@/components/armor/KpiCard';
import { RiskBadge, SemaforoDot } from '@/components/armor/RiskBadge';
import { useAuth } from '@/contexts/AuthContext';
import { usePlayers } from '@/contexts/PlayersContext';
import { t } from '@/lib/i18n';
import { eficienciaAlineacion } from '@/lib/semaforo';
import type { SemaforoColor } from '@/lib/semaforo';

export const Route = createFileRoute('/alineaciones')({ component: AlineacionesPage });

// Formation rows ordered top (attack) → bottom (GK)
const FORMATION_ROWS: { label: { es: string; en: string }; pos: string[] }[] = [
  { label: { es: '⬆ Ataque',    en: '⬆ Attack'   }, pos: ['RW', 'ST', 'LW'] },
  { label: { es: 'Mediocampo',  en: 'Midfield'   }, pos: ['DM', 'CM', 'AM'] },
  { label: { es: 'Defensa',     en: 'Defence'    }, pos: ['LB', 'CB', 'RB'] },
  { label: { es: 'GK',          en: 'GK'         }, pos: ['GK']              },
];

function AlineacionesPage() {
  const { language, role } = useAuth();
  const { playersWithState, lineup, updateLineup, getPlayerWithState } = usePlayers();
  const lang = language;

  const [swapFrom, setSwapFrom]   = useState<string | null>(null);
  const [swapIsGK, setSwapIsGK]   = useState(false);
  const [toastMsg, setToastMsg]   = useState<string | null>(null);

  const titulares   = lineup.filter(s => s.tipo === 'titular');
  const titularIds  = new Set(titulares.map(s => s.jugador_id));

  const benchPlayers = playersWithState.filter(
    p => !titularIds.has(p.jugador_id) &&
         p.estado_activo !== 'baja' &&
         p.estado_activo !== 'transferido',
  );

  const titularColors: SemaforoColor[] = titulares.map(
    s => getPlayerWithState(s.jugador_id)?.semaforo ?? 'green',
  );
  const efficiency = eficienciaAlineacion(titularColors);
  const effColorCls =
    efficiency >= 80 ? 'text-risk-low' : efficiency >= 55 ? 'text-risk-mid' : 'text-risk-high';

  const lineupStats = {
    green:  titulares.filter(s => getPlayerWithState(s.jugador_id)?.semaforo === 'green').length,
    yellow: titulares.filter(s => getPlayerWithState(s.jugador_id)?.semaforo === 'yellow').length,
    red:    titulares.filter(s => getPlayerWithState(s.jugador_id)?.semaforo === 'red').length,
  };

  const hasGK = titulares.some(s => s.posicion_en_cancha === 'GK');

  // ── Swap logic ──────────────────────────────────────────────────────
  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const clickSlot = (jugador_id: string, posicion: string | undefined) => {
    if (role !== 'director') return;
    if (swapFrom === jugador_id) {
      setSwapFrom(null);
      setSwapIsGK(false);
      return;
    }
    setSwapFrom(jugador_id);
    setSwapIsGK(posicion === 'GK');
  };

  const confirmSwap = (bancaId: string) => {
    if (!swapFrom) return;
    const bancaPlayer = playersWithState.find(p => p.jugador_id === bancaId);
    if (swapIsGK && (!bancaPlayer || bancaPlayer.posicion !== 'GK')) {
      showToast(
        lang === 'es'
          ? '⛔ Solo un portero puede reemplazar a otro portero'
          : '⛔ Only a goalkeeper can replace another goalkeeper',
      );
      return;
    }
    const newLineup = lineup.map(slot =>
      slot.jugador_id === swapFrom && slot.tipo === 'titular'
        ? { ...slot, jugador_id: bancaId }
        : slot,
    );
    updateLineup(newLineup);
    setSwapFrom(null);
    setSwapIsGK(false);
    showToast(lang === 'es' ? '✅ Sustitución realizada' : '✅ Substitution made');
  };

  const cancelSwap = () => {
    setSwapFrom(null);
    setSwapIsGK(false);
  };

  return (
    <AppShell title={t(lang, 'lineups.title')} subtitle={t(lang, 'lineups.subtitle')}>

      {/* ── Toast ── */}
      {toastMsg && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl bg-surface border border-hairline shadow-xl text-sm font-medium animate-in fade-in slide-in-from-top-2">
          {toastMsg}
        </div>
      )}

      {/* ── KPIs ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          label={t(lang, 'lineups.efficiencyScore')}
          value={`${efficiency}%`}
          sub={lang === 'es' ? '11 titulares' : '11 starters'}
          accent="accent"
          icon={<TrendingUp className="h-4 w-4" />}
        />
        <KpiCard
          label={t(lang, 'status.optimal')}
          value={String(lineupStats.green)}
          sub={lang === 'es' ? 'en el once' : 'in lineup'}
          accent="low"
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <KpiCard
          label={t(lang, 'status.atRisk')}
          value={String(lineupStats.yellow)}
          sub={lang === 'es' ? 'en el once' : 'in lineup'}
          accent="mid"
        />
        <KpiCard
          label={t(lang, 'status.injured')}
          value={String(lineupStats.red)}
          sub={lang === 'es' ? 'en el once' : 'in lineup'}
          accent="high"
        />
      </div>

      {/* ── Swap mode banner ── */}
      {swapFrom && (
        <div
          className={`mt-4 flex items-center justify-between px-4 py-3 rounded-xl border ${
            swapIsGK
              ? 'bg-risk-high/[0.05] border-risk-high/30'
              : 'bg-accent/[0.05] border-accent/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <ArrowLeftRight className={`h-4 w-4 ${swapIsGK ? 'text-risk-high' : 'text-accent'}`} />
            <div>
              <div className={`text-sm font-semibold ${swapIsGK ? 'text-risk-high' : 'text-accent'}`}>
                {lang === 'es' ? 'Modo sustitución activo' : 'Substitution mode active'}
              </div>
              <div className="text-[11px] text-muted-foreground">
                {swapIsGK
                  ? (lang === 'es'
                    ? 'Solo puede entrar otro portero (GK)'
                    : 'Only another goalkeeper (GK) can enter')
                  : (lang === 'es'
                    ? 'Selecciona un jugador de la banca para sustituir'
                    : 'Select a bench player to substitute')}
              </div>
            </div>
          </div>
          <button
            onClick={cancelSwap}
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground border border-hairline px-2.5 py-1.5 rounded-lg transition"
          >
            <X className="h-3.5 w-3.5" /> {t(lang, 'common.cancel')}
          </button>
        </div>
      )}

      <div className="mt-4 grid grid-cols-1 xl:grid-cols-3 gap-4">

        {/* ── Formation pitch ── */}
        <div className="xl:col-span-2 rounded-2xl glass p-5">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            ⚽ {t(lang, 'lineups.formation')}
          </div>
          <div className="font-display text-lg mt-0.5 mb-4">4 · 3 · 3 — Armor FC</div>

          <div className="relative rounded-xl bg-gradient-to-b from-emerald-900/20 to-emerald-950/25 border border-emerald-500/10 p-5 overflow-hidden">
            {/* Field decoration */}
            <div className="pointer-events-none absolute inset-x-8 top-0 bottom-0 border-x border-emerald-500/10" />
            <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-emerald-500/10" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-emerald-500/10" />

            <div className="text-center text-[10px] uppercase tracking-[0.14em] text-emerald-500/50 mb-4">
              ⬆ {lang === 'es' ? 'Ataque' : 'Attack'}
            </div>

            <div className="space-y-5 relative">
              {FORMATION_ROWS.map(row => {
                const slots = titulares.filter(s =>
                  row.pos.includes(s.posicion_en_cancha ?? ''),
                );
                if (slots.length === 0) return null;
                return (
                  <div key={row.label.es} className="flex justify-center gap-4 flex-wrap">
                    {slots.map(slot => {
                      const p = playersWithState.find(x => x.jugador_id === slot.jugador_id);
                      if (!p) return null;
                      const isSwapping   = swapFrom === slot.jugador_id;
                      const isDisabled   = !!swapFrom && !isSwapping;
                      const sem          = p.semaforo;
                      const ringBaseCls  =
                        sem === 'red'    ? 'ring-risk-high/40' :
                        sem === 'yellow' ? 'ring-risk-mid/40'  : 'ring-risk-low/20';
                      return (
                        <button
                          key={slot.jugador_id}
                          onClick={() => clickSlot(slot.jugador_id, slot.posicion_en_cancha)}
                          disabled={isDisabled}
                          className={[
                            'flex flex-col items-center gap-1 p-2 rounded-xl transition-all',
                            role === 'director' ? 'cursor-pointer' : 'cursor-default',
                            isSwapping  ? 'bg-accent/10 scale-105' : 'hover:bg-white/[0.05]',
                            isDisabled  ? 'opacity-35 pointer-events-none' : '',
                          ].join(' ')}
                        >
                          <div
                            className={`relative h-11 w-11 rounded-full bg-white/[0.07] flex items-center justify-center font-mono text-sm font-bold ring-2 transition-all ${
                              isSwapping ? 'ring-accent ring-2' : ringBaseCls
                            }`}
                          >
                            {p.dorsal}
                            <span className="absolute -bottom-0.5 -right-0.5">
                              <SemaforoDot color={sem} size="sm" />
                            </span>
                          </div>
                          <div className="text-[10px] text-muted-foreground truncate max-w-[60px] text-center leading-tight">
                            {p.nombre}
                          </div>
                          <div className="text-[9px] text-muted-foreground/60">{slot.posicion_en_cancha}</div>
                          {isSwapping && (
                            <div className="text-[9px] text-accent font-semibold">
                              {lang === 'es' ? 'saliendo' : 'going out'}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>

            <div className="text-center text-[10px] uppercase tracking-[0.14em] text-emerald-500/50 mt-4">
              ⬇ {lang === 'es' ? 'Defensa' : 'Defence'}
            </div>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-5 mt-3">
            {[
              { color: 'green'  as const, label: t(lang, 'status.optimal') },
              { color: 'yellow' as const, label: t(lang, 'status.atRisk')  },
              { color: 'red'    as const, label: t(lang, 'status.injured') },
            ].map(({ color, label }) => (
              <div key={color} className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                <SemaforoDot color={color} size="sm" /> {label}
              </div>
            ))}
          </div>

          {/* GK validation */}
          <div
            className={`mt-3 px-3 py-2.5 rounded-lg text-xs font-medium flex items-center gap-2 border ${
              hasGK
                ? 'bg-risk-low/[0.06] text-risk-low border-risk-low/20'
                : 'bg-risk-high/[0.06] text-risk-high border-risk-high/20'
            }`}
          >
            {hasGK
              ? `✅ ${lang === 'es' ? 'Portero en el once titular' : 'Goalkeeper in starting lineup'}`
              : `⛔ ${lang === 'es' ? 'Sin portero — formación incompleta' : 'No goalkeeper — incomplete formation'}`}
          </div>

          {role === 'director' && !swapFrom && (
            <div className="mt-2 text-[11px] text-muted-foreground text-center">
              {lang === 'es'
                ? 'Clic en cualquier jugador para iniciar una sustitución'
                : 'Click any player to start a substitution'}
            </div>
          )}
        </div>

        {/* ── Bench + Efficiency ── */}
        <div className="flex flex-col gap-4">

          {/* Bench */}
          <div className="rounded-2xl glass overflow-hidden flex-1">
            <div className="p-4 border-b border-hairline">
              <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                🪑 {t(lang, 'lineups.bench')}
              </div>
              <div className="text-sm font-medium mt-0.5">
                {lang === 'es' ? 'Disponibles para sustituir' : 'Available to substitute'} · {benchPlayers.length}
              </div>
            </div>

            <div className="p-3">
              <div className="space-y-1.5">
                {benchPlayers.map(p => {
                  const blockedByGK = !!swapFrom && swapIsGK && p.posicion !== 'GK';
                  const isTarget    = !!swapFrom && !blockedByGK;
                  return (
                    <div
                      key={p.jugador_id}
                      onClick={() => isTarget ? confirmSwap(p.jugador_id) : undefined}
                      className={[
                        'flex items-center justify-between px-2.5 py-2 rounded-lg transition-all',
                        isTarget    ? 'cursor-pointer hover:bg-accent/10 border border-accent/25'    : '',
                        blockedByGK ? 'opacity-30 cursor-not-allowed'                                : '',
                        !swapFrom   ? 'border border-transparent hover:bg-white/[0.03]'              : '',
                      ].join(' ')}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`h-8 w-8 rounded-lg bg-white/[0.07] flex items-center justify-center text-xs font-mono ring-1 flex-shrink-0 ${
                            p.semaforo === 'red'    ? 'ring-risk-high/40' :
                            p.semaforo === 'yellow' ? 'ring-risk-mid/40'  : 'ring-risk-low/20'
                          }`}
                        >
                          #{p.dorsal}
                        </div>
                        <div>
                          <div className="text-sm font-medium leading-tight">{p.nombre}</div>
                          <div className="text-[10px] text-muted-foreground">
                            {p.posicion}
                            {blockedByGK && (
                              <span className="text-risk-high ml-1">· No GK</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <RiskBadge risk={p.semaforo} lang={lang} />
                        {isTarget && (
                          <ArrowLeftRight className="h-3.5 w-3.5 text-accent" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Starters compact list */}
              <div className="mt-3 pt-3 border-t border-hairline">
                <div className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground mb-2">
                  ⚽ {lang === 'es' ? 'En el once titular' : 'In starting lineup'}
                </div>
                <div className="space-y-1">
                  {titulares.map(slot => {
                    const p = playersWithState.find(x => x.jugador_id === slot.jugador_id);
                    if (!p) return null;
                    return (
                      <div
                        key={slot.jugador_id}
                        className="flex items-center justify-between text-[11px] text-muted-foreground px-1"
                      >
                        <span>#{p.dorsal} {p.nombre} · {slot.posicion_en_cancha}</span>
                        <SemaforoDot color={p.semaforo} size="sm" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Efficiency breakdown */}
          <div className="rounded-2xl glass p-4">
            <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-1">
              📊 {lang === 'es' ? 'Desglose de eficiencia' : 'Efficiency breakdown'}
            </div>
            <div className={`font-display text-3xl font-bold mb-4 ${effColorCls}`}>{efficiency}%</div>
            {[
              { label: t(lang, 'status.optimal'), count: lineupStats.green,  pts: 100, bar: 'bg-risk-low'  },
              { label: t(lang, 'status.atRisk'),  count: lineupStats.yellow, pts: 60,  bar: 'bg-risk-mid'  },
              { label: t(lang, 'status.injured'), count: lineupStats.red,    pts: 0,   bar: 'bg-risk-high' },
            ].map(r => (
              <div key={r.label} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span>{r.label} × {r.count}</span>
                  <span className="font-mono text-muted-foreground">{r.pts} pts</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                  <div
                    className={`h-full ${r.bar}`}
                    style={{ width: `${r.count === 0 ? 0 : Math.round((r.count / 11) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="text-[10px] text-muted-foreground mt-2 pt-2 border-t border-hairline">
              {lang === 'es'
                ? 'Verde=100pts · Amarillo=60pts · Rojo=0pts'
                : 'Green=100pts · Yellow=60pts · Red=0pts'}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
