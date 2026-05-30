// ─── ArmorPlay AI · Historial de Cargas ───────────────────────────────
import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Upload, CheckCircle2, AlertTriangle } from 'lucide-react';
import { AppShell } from '@/components/armor/AppShell';
import { useAuth } from '@/contexts/AuthContext';
import { usePlayers } from '@/contexts/PlayersContext';
import { t } from '@/lib/i18n';
import type { ExcelType } from '@/lib/mockData';

export const Route = createFileRoute('/historial-cargas')({ component: HistorialCargasPage });

type FilterTab = 'all' | ExcelType;

function HistorialCargasPage() {
  const { language } = useAuth();
  const { uploadHistory } = usePlayers();
  const lang = language;
  const [filter, setFilter] = useState<FilterTab>('all');

  const filtered =
    filter === 'all'
      ? uploadHistory
      : uploadHistory.filter(h => h.tipo_excel === filter);

  const countFor = (f: FilterTab) =>
    f === 'all'
      ? uploadHistory.length
      : uploadHistory.filter(h => h.tipo_excel === f).length;

  const tabs: { key: FilterTab; label: string; icon: string }[] = [
    { key: 'all',             label: lang === 'es' ? 'Todos' : 'All',                        icon: '📋' },
    { key: 'jugadores',       label: lang === 'es' ? 'Jugadores' : 'Players',                icon: '👥' },
    { key: 'estados físicos', label: lang === 'es' ? 'Estados físicos' : 'Physical states',  icon: '💪' },
  ];

  const successCount = uploadHistory.filter(h => h.estado_carga === 'exitosa').length;
  const errorCount   = uploadHistory.filter(h => h.estado_carga === 'con errores').length;

  return (
    <AppShell title={t(lang, 'history.title')} subtitle={t(lang, 'history.subtitle')}>

      {/* ── Summary KPIs ── */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: lang === 'es' ? 'Total cargas' : 'Total uploads',  value: uploadHistory.length, cls: 'text-primary'   },
          { label: lang === 'es' ? 'Exitosas' : 'Successful',         value: successCount,          cls: 'text-risk-low'  },
          { label: lang === 'es' ? 'Con errores' : 'With errors',     value: errorCount,            cls: 'text-risk-mid'  },
        ].map((k, i) => (
          <div key={i} className="rounded-2xl glass p-4 text-center">
            <div className={`font-display text-3xl font-bold ${k.cls}`}>{k.value}</div>
            <div className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground mt-1">{k.label}</div>
          </div>
        ))}
      </div>

      {/* ── Filter tabs ── */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              filter === tab.key
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white/[0.04] text-muted-foreground border border-hairline hover:bg-white/[0.07]'
            }`}
          >
            {tab.icon} {tab.label} ({countFor(tab.key)})
          </button>
        ))}
      </div>

      {/* ── Table ── */}
      <div className="rounded-2xl glass overflow-hidden">
        <div className="p-5 pb-3 border-b border-hairline">
          <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
            📋 {lang === 'es' ? 'Registros encontrados' : 'Records found'}
          </div>
          <div className="font-display text-lg mt-0.5">
            {filtered.length} {lang === 'es' ? 'cargas' : 'uploads'}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground text-sm">
            {t(lang, 'history.noHistory')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground border-b border-hairline bg-white/[0.02]">
                  <th className="text-left font-medium px-5 py-2.5">{t(lang, 'history.date')}</th>
                  <th className="text-left font-medium px-3 py-2.5">{t(lang, 'history.user')}</th>
                  <th className="text-left font-medium px-3 py-2.5">{t(lang, 'history.fileType')}</th>
                  <th className="text-left font-medium px-3 py-2.5 hidden md:table-cell">{t(lang, 'history.fileName')}</th>
                  <th className="text-left font-medium px-3 py-2.5">{t(lang, 'history.statusLabel')}</th>
                  <th className="text-right font-medium px-5 py-2.5">{t(lang, 'history.records')}</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(h => (
                  <tr
                    key={h.carga_id}
                    className="border-b border-hairline last:border-0 hover:bg-white/[0.03] transition"
                  >
                    <td className="px-5 py-3 text-muted-foreground text-[11px] font-mono whitespace-nowrap">
                      {h.fecha_carga.split('T')[0]}
                    </td>
                    <td className="px-3 py-3 font-medium">{h.usuario}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/[0.05] border border-hairline text-[11px] text-muted-foreground">
                        {h.tipo_excel === 'jugadores' ? '👥' : '💪'}
                        {h.tipo_excel === 'jugadores'
                          ? (lang === 'es' ? 'Jugadores' : 'Players')
                          : (lang === 'es' ? 'Estados físicos' : 'Physical states')}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-[11px] text-muted-foreground hidden md:table-cell max-w-[200px] truncate">
                      {h.nombre_archivo}
                    </td>
                    <td className="px-3 py-3">
                      {h.estado_carga === 'exitosa' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-risk-low">
                          <CheckCircle2 className="h-3 w-3" />
                          {t(lang, 'history.successful')}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-medium text-risk-mid">
                          <AlertTriangle className="h-3 w-3" />
                          {t(lang, 'history.withErrors')}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <span className="font-mono text-[11px]">{h.registros_procesados}</span>
                      {h.errores_detectados > 0 && (
                        <span className="text-risk-high text-[10px] ml-1.5">
                          ({h.errores_detectados} err)
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <Link
          to="/carga-excel"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-accent transition"
        >
          <Upload className="h-3.5 w-3.5" />
          {lang === 'es' ? 'Subir nuevo archivo Excel' : 'Upload new Excel file'}
        </Link>
      </div>
    </AppShell>
  );
}
