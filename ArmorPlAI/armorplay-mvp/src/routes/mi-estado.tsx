// ─── ArmorPlay AI · Mi Estado (Vista del Jugador) ─────────────────────
import { createFileRoute } from '@tanstack/react-router';
import { AlertTriangle, Zap, Timer, Activity } from 'lucide-react';
import { AppShell } from '@/components/armor/AppShell';
import { RiskBadge } from '@/components/armor/RiskBadge';
import { useAuth } from '@/contexts/AuthContext';
import { usePlayers } from '@/contexts/PlayersContext';
import { t } from '@/lib/i18n';
import { labelColor } from '@/lib/semaforo';

export const Route = createFileRoute('/mi-estado')({ component: MiEstadoPage });

function MiEstadoPage() {
  const { language, user } = useAuth();
  const { getPlayerWithState } = usePlayers();
  const lang = language;

  const jugadorId = user?.jugador_id;
  const player = jugadorId ? getPlayerWithState(jugadorId) : undefined;

  if (!player) {
    return (
      <AppShell title={t(lang, 'myStatus.title')} subtitle={t(lang, 'myStatus.subtitle')}>
        <div className="rounded-2xl glass p-12 text-center">
          <div className="text-5xl mb-4">⚡</div>
          <div className="text-muted-foreground text-sm">{t(lang, 'player.noData')}</div>
        </div>
      </AppShell>
    );
  }

  const ls = player.latestState;
  const sem = player.semaforo;

  const semBorderBg = {
    green:  'border-risk-low/25 bg-risk-low/[0.04]',
    yellow: 'border-risk-mid/25 bg-risk-mid/[0.04]',
    red:    'border-risk-high/25 bg-risk-high/[0.04]',
  }[sem];

  const semTextCls = {
    green:  'text-risk-low',
    yellow: 'text-risk-mid',
    red:    'text-risk-high',
  }[sem];

  const ringCls = {
    green:  'ring-risk-low/40',
    yellow: 'ring-risk-mid/40',
    red:    'ring-risk-high/40',
  }[sem];

  const loadColorCls = (v: number) =>
    v > 80 ? 'text-risk-high' : v > 60 ? 'text-risk-mid' : 'text-risk-low';

  const sprintColorCls = (v: number) =>
    v > 22 ? 'text-risk-high' : v > 16 ? 'text-risk-mid' : 'text-muted-foreground';

  return (
    <AppShell title={t(lang, 'myStatus.title')} subtitle={t(lang, 'myStatus.subtitle')}>

      {/* ── Status card ── */}
      <div className={`rounded-2xl border p-6 ${semBorderBg}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className={`h-14 w-14 rounded-xl bg-white/[0.06] flex items-center justify-center font-mono text-xl font-bold ring-2 ${ringCls}`}>
            #{player.dorsal}
          </div>
          <div>
            <div className="font-display text-xl font-bold">{player.nombre}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{player.posicion} · Armor FC</div>
          </div>
        </div>

        <div className="text-center py-5">
          <div className="flex justify-center mb-3">
            <RiskBadge risk={sem} lang={lang} className="text-sm px-4 py-1.5" />
          </div>
          <div className={`font-display text-3xl font-bold mb-1 ${semTextCls}`}>
            {labelColor(sem, lang)}
          </div>
          {ls?.fecha_registro && (
            <div className="text-[11px] text-muted-foreground">
              {lang === 'es' ? 'Última actualización:' : 'Last update:'} {ls.fecha_registro}
            </div>
          )}
        </div>

        {ls?.recomendacion && (
          <div className="p-4 rounded-xl bg-black/20 mt-2">
            <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-2">
              {t(lang, 'myStatus.yourRecommendation')}
            </div>
            <div className="text-sm leading-relaxed">{ls.recomendacion}</div>
          </div>
        )}
      </div>

      {/* ── Metrics ── */}
      <div className="mt-4 rounded-2xl glass p-5">
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-4">
          {lang === 'es' ? 'Mis métricas' : 'My metrics'}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            {
              label: t(lang, 'player.physicalLoad'),
              value: ls?.carga_fisica ?? '—',
              cls:   ls ? loadColorCls(ls.carga_fisica) : 'text-muted-foreground',
              icon:  <Activity className="h-4 w-4" />,
            },
            {
              label: t(lang, 'player.fatigue'),
              value: ls?.fatiga
                ? ls.fatiga.charAt(0).toUpperCase() + ls.fatiga.slice(1)
                : '—',
              cls: ls?.fatiga === 'alta'
                ? 'text-risk-high'
                : ls?.fatiga === 'media'
                ? 'text-risk-mid'
                : 'text-risk-low',
              icon: <Zap className="h-4 w-4" />,
            },
            {
              label: t(lang, 'player.sprints'),
              value: ls?.sprints ?? '—',
              cls:   ls ? sprintColorCls(ls.sprints ?? 0) : 'text-muted-foreground',
              icon:  <Activity className="h-4 w-4" />,
            },
            {
              label: t(lang, 'player.minutesPlayed'),
              value: ls?.minutos_jugados ?? '—',
              cls:   'text-muted-foreground',
              icon:  <Timer className="h-4 w-4" />,
            },
          ].map((m, i) => (
            <div key={i} className="rounded-xl bg-white/[0.03] border border-hairline p-4 text-center">
              <div className={`font-display text-2xl font-bold mb-1 ${m.cls}`}>{m.value}</div>
              <div className="text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Risk reasons (only when at risk or injured) ── */}
      {player.semaforoReasons.length > 0 && sem !== 'green' && (
        <div className={`mt-4 rounded-2xl border p-5 ${sem === 'red' ? 'bg-risk-high/[0.04] border-risk-high/25' : 'bg-risk-mid/[0.04] border-risk-mid/25'}`}>
          <div className={`text-[10px] uppercase tracking-[0.14em] mb-3 ${sem === 'red' ? 'text-risk-high' : 'text-risk-mid'}`}>
            ⚠ {lang === 'es' ? 'Razones de alerta' : 'Alert reasons'}
          </div>
          <div className="space-y-2">
            {player.semaforoReasons.map((r, i) => (
              <div key={i} className="flex gap-2 text-xs text-muted-foreground">
                <AlertTriangle className={`h-3 w-3 mt-0.5 flex-shrink-0 ${sem === 'red' ? 'text-risk-high' : 'text-risk-mid'}`} />
                {r}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Coach note ── */}
      {ls?.observaciones_pf && (
        <div className="mt-4 rounded-2xl glass border border-primary/20 p-5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-primary mb-2">
            💬 {t(lang, 'player.observations')}
          </div>
          <div className="text-sm text-muted-foreground leading-relaxed">{ls.observaciones_pf}</div>
        </div>
      )}

      {/* ── Pain zone / injury type ── */}
      {(ls?.zona_molestia || ls?.tipo_lesion) && (
        <div className="mt-4 rounded-2xl glass p-5">
          <div className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground mb-3">
            🦴 {lang === 'es' ? 'Zona e historial' : 'Zone & history'}
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {ls?.zona_molestia && (
              <div>
                <div className="text-[10px] text-muted-foreground mb-1">{t(lang, 'player.painZone')}</div>
                <div className="font-medium capitalize">{ls.zona_molestia}</div>
              </div>
            )}
            {ls?.tipo_lesion && (
              <div>
                <div className="text-[10px] text-muted-foreground mb-1">{t(lang, 'player.injuryType')}</div>
                <div className="font-medium text-risk-high">{ls.tipo_lesion}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
