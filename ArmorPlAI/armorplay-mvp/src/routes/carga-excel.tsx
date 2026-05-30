// ─── ArmorPlay AI · Carga de Excel ─────────────────────────────────────
// Parseo real con SheetJS (xlsx). Requiere: npm install xlsx
import { useState, useRef, useCallback } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { CheckCircle2, AlertTriangle, X, Upload } from 'lucide-react';
import { AppShell } from '@/components/armor/AppShell';
import { useAuth } from '@/contexts/AuthContext';
import { usePlayers } from '@/contexts/PlayersContext';
import { t } from '@/lib/i18n';
import type { Player, PhysicalState, FatigaLevel, PlayerState, RiskLevel } from '@/lib/mockData';

export const Route = createFileRoute('/carga-excel')({ component: CargaExcelPage });

// ── Column alias resolution ─────────────────────────────────────────────

const COL_ALIAS: Record<string, string[]> = {
  jugador_id:                ['jugador_id', 'id', 'player_id', 'jugadorid'],
  nombre:                    ['nombre', 'name', 'nombre_completo', 'fullname'],
  posicion:                  ['posicion', 'pos', 'position', 'posicion_principal'],
  dorsal:                    ['dorsal', 'numero', 'jersey', 'numero_camiseta'],
  equipo:                    ['equipo', 'team', 'club'],
  estado_activo:             ['estado_activo', 'estado', 'active', 'status'],
  fecha_registro:            ['fecha_registro', 'fecha', 'date'],
  carga_fisica:              ['carga_fisica', 'carga', 'load', 'physical_load'],
  fatiga:                    ['fatiga', 'fatigue', 'nivel_fatiga'],
  dolor_reportado:           ['dolor_reportado', 'dolor', 'pain'],
  estado_jugador:            ['estado_jugador', 'estado', 'player_status'],
  nivel_riesgo:              ['nivel_riesgo', 'riesgo', 'risk', 'risk_level'],
  sprints:                   ['sprints', 'sprint_count'],
  minutos_jugados:           ['minutos_jugados', 'minutos', 'minutes'],
  tipo_lesion:               ['tipo_lesion', 'lesion', 'injury_type'],
  historial_lesion:          ['historial_lesion', 'historial'],
  dias_desde_ultima_lesion:  ['dias_desde_ultima_lesion', 'dias_lesion', 'days_since_injury'],
  observaciones_pf:          ['observaciones_pf', 'observaciones', 'obs', 'notes'],
  recomendacion:             ['recomendacion', 'recommendation', 'rec'],
  zona_molestia:             ['zona_molestia', 'zona', 'area'],
};

function normKey(k: string): string {
  return k
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '_')
    .trim();
}

function resolveCol(headers: string[], canonical: string): string | null {
  const aliases = COL_ALIAS[canonical] ?? [canonical];
  for (const h of headers) {
    if (aliases.includes(normKey(h))) return h;
  }
  return null;
}

function getCell(row: Record<string, unknown>, headers: string[], canonical: string): string {
  const col = resolveCol(headers, canonical);
  return col && row[col] !== undefined ? String(row[col]).trim() : '';
}

// ── Normalisation helpers ───────────────────────────────────────────────

function normPos(raw: string): string {
  const r = raw.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  if (r.includes('portero') || r === 'gk' || r.includes('goalkeeper') || r.includes('arquero')) return 'GK';
  if (r.includes('lateral der') || r === 'rb') return 'RB';
  if (r.includes('lateral izq') || r === 'lb') return 'LB';
  if (r.includes('central') || r === 'cb' || r.includes('defensa cent')) return 'CB';
  if (r.includes('pivote') || r.includes('defensivo') || r === 'dm' || r === 'mcd') return 'DM';
  if (r.includes('centrocampo') || r === 'cm' || r.includes('medioca')) return 'CM';
  if (r.includes('extremo der') || r === 'rw') return 'RW';
  if (r.includes('extremo izq') || r === 'lw') return 'LW';
  if (r.includes('delantero') || r === 'st' || r.includes('forward') || r === 'cf') return 'ST';
  return raw.substring(0, 4).toUpperCase();
}

function normFatiga(raw: string): FatigaLevel {
  const r = raw.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  if (r === 'alta' || r === 'high' || Number(r) >= 8) return 'alta';
  if (r === 'media' || r === 'medium' || Number(r) >= 5) return 'media';
  return 'baja';
}

function normEstado(raw: string): PlayerState {
  const r = raw.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  if (r === 'lesionado' || r === 'injured') return 'lesionado';
  if (r.includes('riesgo') || r === 'at risk') return 'en riesgo';
  return 'óptimo';
}

function normRiesgo(raw: string): RiskLevel {
  const r = raw.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  if (r === 'rojo' || r === 'red') return 'rojo';
  if (r === 'amarillo' || r === 'yellow') return 'amarillo';
  return 'verde';
}

function normDolor(raw: string): 'sí' | 'no' {
  const r = raw.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
  return ['si', 'yes', '1', 'true'].includes(r) ? 'sí' : 'no';
}

// ── Upload result type ──────────────────────────────────────────────────

interface UploadResult {
  ok: boolean;
  msg: string;
  errors: string[];
  processed: number;
  errorsCount: number;
}

type UploadType = 'jugadores' | 'estados';

interface ZoneState {
  dragging: boolean;
  loading: boolean;
  result: UploadResult | null;
}

// ── Component ───────────────────────────────────────────────────────────

function CargaExcelPage() {
  const { language, user } = useAuth();
  const { players, setPlayers, addPhysicalStates, addUploadRecord } = usePlayers();
  const lang = language;

  const [zones, setZones] = useState<Record<UploadType, ZoneState>>({
    jugadores: { dragging: false, loading: false, result: null },
    estados:   { dragging: false, loading: false, result: null },
  });

  const fileJugadoresRef = useRef<HTMLInputElement>(null);
  const fileEstadosRef   = useRef<HTMLInputElement>(null);

  const patchZone = (type: UploadType, patch: Partial<ZoneState>) =>
    setZones(prev => ({ ...prev, [type]: { ...prev[type], ...patch } }));

  // ── Excel processing ────────────────────────────────────────────────

  const processJugadoresRows = useCallback(
    (rows: Record<string, unknown>[], headers: string[], fileName: string): UploadResult => {
      const reqCols = ['jugador_id', 'nombre', 'posicion', 'dorsal', 'equipo'];
      const missing = reqCols.filter(c => !resolveCol(headers, c));
      if (missing.length) {
        return {
          ok: false,
          msg: (lang === 'es' ? 'Columnas faltantes: ' : 'Missing columns: ') + missing.join(', '),
          errors: [],
          processed: 0,
          errorsCount: 1,
        };
      }

      let added = 0, updated = 0;
      const errors: string[] = [];
      const seenIds = new Set<string>();
      const mergedPlayers: Player[] = [...players];

      rows.forEach((row, i) => {
        const jid    = getCell(row, headers, 'jugador_id');
        const nombre = getCell(row, headers, 'nombre');
        const pos    = getCell(row, headers, 'posicion');
        const dorsal = parseInt(getCell(row, headers, 'dorsal')) || 0;
        const equipo = getCell(row, headers, 'equipo') || 'Armor FC';

        if (!jid)   { errors.push(`Fila ${i + 2}: jugador_id vacío`); return; }
        if (!nombre) { errors.push(`Fila ${i + 2}: nombre vacío`); return; }
        if (!pos)    { errors.push(`Fila ${i + 2}: posición vacía`); return; }
        if (seenIds.has(jid)) { errors.push(`Fila ${i + 2}: ID duplicado ${jid}`); return; }
        seenIds.add(jid);

        const idx = mergedPlayers.findIndex(p => p.jugador_id === jid);
        if (idx >= 0) {
          mergedPlayers[idx] = {
            ...mergedPlayers[idx],
            nombre,
            posicion: normPos(pos),
            dorsal,
            equipo,
          };
          updated++;
        } else {
          mergedPlayers.push({
            jugador_id:        jid,
            nombre,
            posicion:          normPos(pos),
            dorsal,
            equipo,
            edad:              parseInt(getCell(row, headers, 'edad')) || 0,
            pierna_dominante:  'Derecha',
            altura_cm:         parseInt(getCell(row, headers, 'altura_cm')) || 0,
            peso_kg:           parseInt(getCell(row, headers, 'peso_kg')) || 0,
            estado_activo:     (getCell(row, headers, 'estado_activo') || 'activo') as Player['estado_activo'],
            fecha_alta:        new Date().toISOString().split('T')[0],
          });
          added++;
        }
      });

      setPlayers(mergedPlayers);
      addUploadRecord({
        carga_id:             `C-${Date.now()}`,
        fecha_carga:          new Date().toISOString(),
        usuario:              user?.nombre ?? 'Sistema',
        tipo_excel:           'jugadores',
        nombre_archivo:       fileName,
        estado_carga:         errors.length ? 'con errores' : 'exitosa',
        registros_procesados: added + updated,
        errores_detectados:   errors.length,
      });

      const msg = lang === 'es'
        ? `${added + updated} jugadores · ${added} nuevos · ${updated} actualizados`
        : `${added + updated} players · ${added} new · ${updated} updated`;

      return { ok: true, msg, errors, processed: added + updated, errorsCount: errors.length };
    },
    [lang, players, user, setPlayers, addUploadRecord],
  );

  const processEstadosRows = useCallback(
    (rows: Record<string, unknown>[], headers: string[], fileName: string): UploadResult => {
      const reqCols = ['jugador_id', 'carga_fisica', 'fatiga', 'dolor_reportado', 'estado_jugador', 'nivel_riesgo'];
      const missing = reqCols.filter(c => !resolveCol(headers, c));
      if (missing.length) {
        return {
          ok: false,
          msg: (lang === 'es' ? 'Columnas faltantes: ' : 'Missing columns: ') + missing.join(', '),
          errors: [],
          processed: 0,
          errorsCount: 1,
        };
      }

      const errors: string[] = [];
      const byId: Record<string, Record<string, unknown>> = {};

      rows.forEach((row, i) => {
        const jid = getCell(row, headers, 'jugador_id');
        if (!jid) { errors.push(`Fila ${i + 2}: jugador_id vacío`); return; }
        const fecha = getCell(row, headers, 'fecha_registro') || '0';
        const prev = byId[jid];
        if (!prev || fecha >= String(prev._fecha)) byId[jid] = { ...row, _fecha: fecha };
      });

      const newStates: PhysicalState[] = [];
      const notFound: string[] = [];

      Object.entries(byId).forEach(([jid, row]) => {
        const playerExists = players.some(p => p.jugador_id === jid);
        if (!playerExists) { notFound.push(jid); return; }

        const estado  = normEstado(getCell(row, headers, 'estado_jugador'));
        const riesgo  = normRiesgo(getCell(row, headers, 'nivel_riesgo'));
        const fatiga  = normFatiga(getCell(row, headers, 'fatiga'));
        const dolor   = normDolor(getCell(row, headers, 'dolor_reportado'));
        const carga   = parseFloat(getCell(row, headers, 'carga_fisica')) || 0;
        const sprints = parseInt(getCell(row, headers, 'sprints')) || undefined;
        const minutos = parseInt(getCell(row, headers, 'minutos_jugados')) || undefined;
        const lesion  = getCell(row, headers, 'tipo_lesion') || undefined;
        const histl   = getCell(row, headers, 'historial_lesion');
        const dias    = parseInt(getCell(row, headers, 'dias_desde_ultima_lesion')) || undefined;
        const obs     = getCell(row, headers, 'observaciones_pf') || undefined;
        const zona    = getCell(row, headers, 'zona_molestia') || undefined;
        const rec     = getCell(row, headers, 'recomendacion') || undefined;
        const fecha   = getCell(row, headers, 'fecha_registro') || new Date().toISOString().split('T')[0];

        newStates.push({
          registro_id:              `R-${Date.now()}-${jid}`,
          jugador_id:               jid,
          fecha_registro:           fecha,
          tipo_sesion:              'entrenamiento',
          carga_fisica:             carga,
          fatiga,
          dolor_reportado:          dolor,
          estado_jugador:           estado,
          nivel_riesgo:             riesgo,
          sprints,
          minutos_jugados:          minutos,
          tipo_lesion:              lesion,
          historial_lesion:         (histl === 'sí' || histl === 'si' || histl === 'yes') ? 'sí' : 'no' as 'sí' | 'no',
          dias_desde_ultima_lesion: dias,
          zona_molestia:            zona,
          observaciones_pf:         obs,
          recomendacion:            rec,
        });
      });

      addPhysicalStates(newStates);
      const allErrors = [...errors, ...notFound.map(id => `jugador_id "${id}" no encontrado en el catálogo`)];

      addUploadRecord({
        carga_id:             `C-${Date.now()}`,
        fecha_carga:          new Date().toISOString(),
        usuario:              user?.nombre ?? 'Sistema',
        tipo_excel:           'estados físicos',
        nombre_archivo:       fileName,
        estado_carga:         allErrors.length ? 'con errores' : 'exitosa',
        registros_procesados: newStates.length,
        errores_detectados:   allErrors.length,
      });

      const note = notFound.length
        ? (lang === 'es' ? ` · ${notFound.length} IDs no encontrados` : ` · ${notFound.length} IDs not found`)
        : '';
      const msg = lang === 'es'
        ? `${newStates.length} jugadores actualizados · semáforos recalculados${note}`
        : `${newStates.length} players updated · semaphores recalculated${note}`;

      return { ok: true, msg, errors: allErrors, processed: newStates.length, errorsCount: allErrors.length };
    },
    [lang, players, user, addPhysicalStates, addUploadRecord],
  );

  // ── File processing ─────────────────────────────────────────────────

  const processFile = useCallback(
    async (file: File, type: UploadType) => {
      if (!file.name.match(/\.xlsx?$/i)) {
        patchZone(type, {
          result: {
            ok: false,
            msg: lang === 'es' ? 'Formato no válido. Solo .xlsx o .xls.' : 'Invalid format. Only .xlsx or .xls.',
            errors: [],
            processed: 0,
            errorsCount: 1,
          },
        });
        return;
      }

      patchZone(type, { loading: true, result: null });

      try {
        const XLSX = await import('xlsx');
        const buffer = await file.arrayBuffer();
        const wb = XLSX.read(new Uint8Array(buffer), { type: 'array' });
        const ws = wb.Sheets[wb.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(ws, { defval: '' }) as Record<string, unknown>[];

        if (!rows.length) {
          patchZone(type, {
            loading: false,
            result: {
              ok: false,
              msg: lang === 'es' ? 'El archivo está vacío.' : 'File is empty.',
              errors: [],
              processed: 0,
              errorsCount: 1,
            },
          });
          return;
        }

        const headers = Object.keys(rows[0]);
        const result =
          type === 'jugadores'
            ? processJugadoresRows(rows, headers, file.name)
            : processEstadosRows(rows, headers, file.name);

        patchZone(type, { loading: false, result });
      } catch (err) {
        patchZone(type, {
          loading: false,
          result: {
            ok: false,
            msg: err instanceof Error ? err.message : String(err),
            errors: [],
            processed: 0,
            errorsCount: 1,
          },
        });
      }
    },
    [lang, processJugadoresRows, processEstadosRows],
  );

  const handleDrop = (e: React.DragEvent, type: UploadType) => {
    e.preventDefault();
    patchZone(type, { dragging: false });
    const file = e.dataTransfer.files[0];
    if (file) void processFile(file, type);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: UploadType) => {
    const file = e.target.files?.[0];
    if (file) void processFile(file, type);
    e.target.value = '';
  };

  // ── Zone configs ────────────────────────────────────────────────────

  const zoneConfigs = [
    {
      key:      'jugadores' as UploadType,
      icon:     '👥',
      title:    t(lang, 'upload.playersFile'),
      desc:     t(lang, 'upload.playersDesc'),
      required: ['jugador_id', 'nombre', 'posicion', 'dorsal', 'equipo'],
      optional: ['estado_activo', 'edad', 'altura_cm', 'peso_kg', 'fecha_alta'],
      ref:      fileJugadoresRef,
    },
    {
      key:      'estados' as UploadType,
      icon:     '💪',
      title:    t(lang, 'upload.physicalFile'),
      desc:     t(lang, 'upload.physicalDesc'),
      required: ['jugador_id', 'fecha_registro', 'carga_fisica', 'fatiga', 'dolor_reportado', 'estado_jugador', 'nivel_riesgo'],
      optional: ['sprints', 'minutos_jugados', 'tipo_lesion', 'historial_lesion', 'observaciones_pf', 'recomendacion'],
      ref:      fileEstadosRef,
    },
  ];

  return (
    <AppShell title={t(lang, 'upload.title')} subtitle={t(lang, 'upload.subtitle')}>

      {/* ── Upload zones ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zoneConfigs.map(cfg => {
          const zone = zones[cfg.key];
          return (
            <div key={cfg.key} className="rounded-2xl glass p-5">
              <div className="text-3xl mb-3">{cfg.icon}</div>
              <div className="font-display text-base font-semibold mb-1">{cfg.title}</div>
              <div className="text-xs text-muted-foreground mb-4">{cfg.desc}</div>

              {/* Column tags */}
              <div className="space-y-2 mb-4">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
                    {lang === 'es' ? 'Columnas obligatorias' : 'Required columns'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cfg.required.map(c => (
                      <span
                        key={c}
                        className="text-[10px] px-2 py-0.5 rounded-md border border-risk-low/30 text-risk-low bg-risk-low/[0.04] font-mono"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.12em] text-muted-foreground mb-1.5">
                    {lang === 'es' ? 'Columnas opcionales' : 'Optional columns'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cfg.optional.map(c => (
                      <span
                        key={c}
                        className="text-[10px] px-2 py-0.5 rounded-md border border-hairline text-muted-foreground font-mono"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); patchZone(cfg.key, { dragging: true }); }}
                onDragLeave={() => patchZone(cfg.key, { dragging: false })}
                onDrop={e => handleDrop(e, cfg.key)}
                onClick={() => cfg.ref.current?.click()}
                className={[
                  'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all',
                  zone.dragging
                    ? 'border-accent bg-accent/[0.05] scale-[1.01]'
                    : zone.loading
                    ? 'border-primary/40 bg-primary/[0.04]'
                    : 'border-hairline hover:border-primary/40 hover:bg-primary/[0.03]',
                ].join(' ')}
              >
                <div className="text-2xl mb-2">{zone.loading ? '⏳' : '📤'}</div>
                <div className="text-sm text-muted-foreground">
                  {zone.loading ? (
                    lang === 'es' ? 'Procesando...' : 'Processing...'
                  ) : (
                    <>
                      {lang === 'es' ? 'Arrastra tu archivo aquí o ' : 'Drop your file here or '}
                      <span className="text-primary">{t(lang, 'upload.browse')}</span>
                    </>
                  )}
                </div>
                <div className="text-[11px] text-muted-foreground/60 mt-1">.xlsx · .xls · máx 10 MB</div>
                <input
                  ref={cfg.ref}
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  onChange={e => handleFileChange(e, cfg.key)}
                />
              </div>

              {/* Result feedback */}
              {zone.result && (
                <div
                  className={`mt-3 p-3 rounded-lg border ${
                    zone.result.ok
                      ? 'bg-risk-low/[0.05] border-risk-low/25'
                      : 'bg-risk-high/[0.05] border-risk-high/25'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      {zone.result.ok ? (
                        <CheckCircle2 className="h-4 w-4 text-risk-low flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-risk-high flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <div
                          className={`text-xs font-medium ${
                            zone.result.ok ? 'text-risk-low' : 'text-risk-high'
                          }`}
                        >
                          {zone.result.msg}
                        </div>
                        {zone.result.errors.slice(0, 3).map((e, i) => (
                          <div key={i} className="text-[11px] text-muted-foreground mt-1">• {e}</div>
                        ))}
                        {zone.result.errors.length > 3 && (
                          <div className="text-[11px] text-muted-foreground">
                            +{zone.result.errors.length - 3}{' '}
                            {lang === 'es' ? 'más' : 'more'}
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => patchZone(cfg.key, { result: null })}
                      className="text-muted-foreground hover:text-foreground flex-shrink-0 transition"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Auto-validations info ── */}
      <div className="mt-4 rounded-2xl glass p-5">
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground mb-3">
          ⚙️ {lang === 'es' ? 'Validaciones automáticas al cargar' : 'Automatic validations on upload'}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            lang === 'es' ? 'jugador_id presente en el catálogo' : 'jugador_id present in catalog',
            lang === 'es' ? 'Columnas obligatorias presentes' : 'Required columns present',
            lang === 'es' ? 'Normalización de posiciones' : 'Position normalisation',
            lang === 'es' ? 'Sin jugadores duplicados' : 'No duplicate players',
            lang === 'es' ? 'Valores de semáforo válidos' : 'Valid semaphore values',
            lang === 'es' ? 'Campos numéricos parseados' : 'Numeric fields parsed',
          ].map((v, i) => (
            <div
              key={i}
              className="flex gap-2 text-xs text-muted-foreground p-2.5 rounded-lg bg-white/[0.02] border border-hairline"
            >
              <span className="text-risk-low flex-shrink-0">✓</span> {v}
            </div>
          ))}
        </div>
      </div>

      {/* ── Link to history ── */}
      <div className="mt-4 text-center">
        <Link
          to="/historial-cargas"
          className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-accent transition"
        >
          <Upload className="h-3.5 w-3.5" />
          {lang === 'es' ? 'Ver historial de cargas' : 'View upload history'}
        </Link>
      </div>
    </AppShell>
  );
}
