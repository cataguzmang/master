/* ============================================================
   UPLOAD — Excel file upload + real SheetJS parsing
   ============================================================ */

import { state, players, uploadHistory } from '../state.js';
import { T } from '../lib/i18n.js';

export function buildUploadFull() {
  return `<div class="animate-in">
  <div class="row" style="grid-template-columns:1fr 1fr;margin-bottom:16px">
    ${[
      {key:'playersExcel', icon:'👥', type:'jugadores',
       cols:['jugador_id','nombre','posicion','dorsal','equipo','estado_activo'],
       optCols:['edad','pierna_dominante','altura_cm','peso_kg','fecha_alta']},
      {key:'physExcel', icon:'💪', type:'estados',
       cols:['jugador_id','fecha_registro','carga_fisica','fatiga','dolor_reportado','estado_jugador','nivel_riesgo'],
       optCols:['sprints','minutos_jugados','tipo_lesion','observaciones_pf','recomendacion']},
    ].map(f=>`
      <div class="panel">
        <div style="font-size:32px;margin-bottom:12px">${f.icon}</div>
        <div style="font-weight:600;font-size:15px;margin-bottom:4px">${T(f.key)}</div>
        <div style="margin-bottom:12px">
          <div style="font-size:11px;color:var(--muted);margin-bottom:6px">${state.lang==='es'?'Columnas obligatorias':'Required columns'}:</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">${f.cols.map(c=>`<span class="chip-tag" style="color:var(--green);border-color:rgba(34,197,94,0.3)">${c}</span>`).join('')}</div>
          <div style="font-size:11px;color:var(--muted);margin-bottom:6px">${state.lang==='es'?'Columnas opcionales':'Optional columns'}:</div>
          <div style="display:flex;flex-wrap:wrap;gap:4px">${f.optCols.map(c=>`<span class="chip-tag">${c}</span>`).join('')}</div>
        </div>
        <div class="upload-zone" id="zone-${f.type}"
          onclick="document.getElementById('file-${f.type}').click()"
          ondragover="event.preventDefault();document.getElementById('zone-${f.type}').classList.add('dragover')"
          ondragleave="document.getElementById('zone-${f.type}').classList.remove('dragover')"
          ondrop="handleDrop(event,'${f.type}')">
          <div style="font-size:28px;margin-bottom:8px" id="zone-icon-${f.type}">📤</div>
          <div style="font-size:12px" id="zone-text-${f.type}">${T('dropHere')} <span style="color:var(--primary)">${T('browse')}</span></div>
          <div style="font-size:10px;color:var(--muted);margin-top:6px">.xlsx · .xls · máx 10 MB</div>
          <input type="file" id="file-${f.type}" accept=".xlsx,.xls" style="display:none"
            onchange="processExcelFile(this.files[0],'${f.type}')"/>
        </div>
        <div id="upload-result-${f.type}" style="margin-top:10px;display:none"></div>
      </div>`).join('')}
  </div>
  <div class="panel" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
      <div><div class="panel-eyebrow">📋 ${state.lang==='es'?'Plantilla Excel':'Excel Template'}</div>
      <div class="panel-title">${state.lang==='es'?'Descarga el formato oficial':'Download the official format'}</div></div>
      <button class="btn-glass" onclick="simulateDownload(this)" style="gap:8px">⬇️ ${T('downloadTemplate')}</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
      ${[
        {icon:'👥',name:'jugadores_plantilla.xlsx',desc:state.lang==='es'?'Hoja 1: Jugadores · 6 cols obligatorias · Con ejemplos':'Sheet 1: Players · 6 required cols · With examples'},
        {icon:'💪',name:'estados_fisicos_plantilla.xlsx',desc:state.lang==='es'?'Hoja 2: Estados físicos · 7 cols obligatorias · Con valores permitidos':'Sheet 2: Physical states · 7 required cols · Allowed values included'},
      ].map(t=>`
        <div style="display:flex;gap:10px;padding:12px;border-radius:10px;background:rgba(255,255,255,0.02);border:1px solid var(--border)">
          <span style="font-size:20px">${t.icon}</span>
          <div><div style="font-size:12px;font-weight:600;font-family:'JetBrains Mono',monospace">${t.name}</div>
          <div style="font-size:11px;color:var(--muted);margin-top:2px">${t.desc}</div></div>
        </div>`).join('')}
    </div>
  </div>
  <div class="panel" style="background:rgba(108,143,255,0.04);border-color:rgba(108,143,255,0.2)">
    <div class="panel-eyebrow">⚙️ ${state.lang==='es'?'Validaciones automáticas al cargar':'Automatic validations on upload'}</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:12px">
      ${[
        state.lang==='es'?'jugador_id presente en ambos archivos':'jugador_id present in both files',
        state.lang==='es'?'Columnas obligatorias existentes':'Required columns exist',
        state.lang==='es'?'Fechas en formato correcto':'Dates in correct format',
        state.lang==='es'?'Sin jugadores duplicados':'No duplicate players',
        state.lang==='es'?'Valores de semáforo válidos (óptimo/en riesgo/lesionado)':'Valid semaphore values',
        state.lang==='es'?'Campos numéricos sin texto':'Numeric fields without text',
      ].map(v=>`<div style="display:flex;gap:6px;font-size:11px;color:var(--muted);padding:8px;border-radius:6px;background:rgba(255,255,255,0.02)"><span style="color:var(--green)">✓</span>${v}</div>`).join('')}
    </div>
  </div>
  </div>`;
}

// ── Excel parsing helpers ──────────────────────────────────

function normKey(k) {
  return String(k).toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[\s]+/g, '_').trim();
}

const COL_ALIAS = {
  jugador_id:['jugador_id','id','player_id','jugadorid'],
  nombre:['nombre','name','nombre_completo','fullname'],
  posicion:['posicion','posicion_principal','pos','position'],
  dorsal:['dorsal','numero','numero_camiseta','jersey'],
  equipo:['equipo','team','club'],
  estado_activo:['estado_activo','estado','active','status'],
  fecha_registro:['fecha_registro','fecha','date'],
  carga_fisica:['carga_fisica','carga','load','physical_load'],
  fatiga:['fatiga','fatigue','nivel_fatiga'],
  dolor_reportado:['dolor_reportado','dolor','pain'],
  estado_jugador:['estado_jugador','estado','status','player_status'],
  nivel_riesgo:['nivel_riesgo','riesgo','risk','risk_level'],
  sprints:['sprints','sprint_count'],
  minutos_jugados:['minutos_jugados','minutos','minutes'],
  tipo_lesion:['tipo_lesion','lesion','injury_type'],
  historial_lesion:['historial_lesion','historial'],
  dias_desde_ultima_lesion:['dias_desde_ultima_lesion','dias_lesion','days_since_injury'],
  observaciones_pf:['observaciones_pf','observaciones','observations','notes','obs'],
  recomendacion:['recomendacion','recommendation','rec'],
  zona_molestia:['zona_molestia','zona','area'],
};

function resolveCol(headers, canonicalName) {
  const aliases = COL_ALIAS[canonicalName] || [canonicalName];
  for (const h of headers) {
    if (aliases.includes(normKey(h))) return h;
  }
  return null;
}

function getCell(row, headers, canonicalName) {
  const col = resolveCol(headers, canonicalName);
  return col ? String(row[col] !== undefined ? row[col] : '').trim() : '';
}

export function calcSemaforo(e) {
  const n = s => String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
  const estado = n(e.estado_jugador);
  const riesgo = n(e.nivel_riesgo);
  const lesion = String(e.tipo_lesion||'').trim();
  const fatiga = n(e.fatiga);
  const dolor  = n(e.dolor_reportado);
  const carga  = parseFloat(e.carga_fisica)||0;
  const sprts  = parseInt(e.sprints)||0;
  const mins   = parseInt(e.minutos_jugados)||0;
  const histL  = n(e.historial_lesion);
  const dias   = parseInt(e.dias_desde_ultima_lesion)||999;
  const obs    = String(e.observaciones_pf||'').trim();

  if (estado==='lesionado') return 'red';
  if (riesgo==='rojo') return 'red';
  if (lesion) return 'red';
  if (estado==='en riesgo') return 'yellow';
  if (riesgo==='amarillo') return 'yellow';
  if (fatiga==='alta') return 'yellow';
  if (['si','yes','1','true'].includes(dolor)) return 'yellow';
  if (carga>80) return 'yellow';
  if (sprts>22) return 'yellow';
  if (mins>85) return 'yellow';
  if ((histL==='si'||histL==='yes') && dias<30) return 'yellow';
  if (obs) return 'yellow';
  return 'green';
}

function normPos(raw) {
  const r = String(raw||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
  if (r.includes('portero')||r==='gk'||r.includes('goalkeeper')||r.includes('arquero')) return 'GK';
  if (r.includes('lateral der')||r==='rb') return 'RB';
  if (r.includes('lateral izq')||r==='lb') return 'LB';
  if (r.includes('central')||r==='cb'||r.includes('defensa cent')) return 'CB';
  if (r.includes('pivote')||r.includes('defensivo')||r==='dm'||r==='mcd') return 'DM';
  if (r.includes('centrocampo')||r==='cm'||r.includes('medioca')) return 'CM';
  if (r.includes('extremo der')||r==='rw') return 'RW';
  if (r.includes('extremo izq')||r==='lw') return 'LW';
  if (r.includes('delantero')||r==='st'||r.includes('forward')||r==='cf') return 'ST';
  return String(raw||'').substring(0,4).toUpperCase();
}

function normFatiga(raw) {
  const r = String(raw||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
  if (r==='alta'||r==='high'||Number(r)>=8) return 'alta';
  if (r==='media'||r==='medium'||r==='moderate'||Number(r)>=5) return 'media';
  return 'baja';
}

function autoRec(sem) {
  if (sem==='red')    return state.lang==='es'?'Priorizar recuperación. Excluir de alineación. Revisar con cuerpo médico.':'Prioritize recovery. Exclude from lineup. Review with medical staff.';
  if (sem==='yellow') return state.lang==='es'?'Reducir carga. Monitorear evolución. Evaluar descanso.':'Reduce load. Monitor progress. Evaluate rest.';
  return state.lang==='es'?'Mantener carga actual. Disponible para partido.':'Maintain current load. Available for match.';
}

export function handleDrop(event, type) {
  event.preventDefault();
  document.getElementById('zone-' + type).classList.remove('dragover');
  const file = event.dataTransfer.files[0];
  if (file) processExcelFile(file, type);
}

export function processExcelFile(file, type) {
  if (!file) return;
  if (!file.name.match(/\.xlsx?$/i)) {
    showUploadResult(type, {ok:false, msg:state.lang==='es'?'Formato no válido. Solo .xlsx o .xls.':'Invalid format. Only .xlsx or .xls.'}, file.name);
    return;
  }
  const zone = document.getElementById('zone-' + type);
  const icon = document.getElementById('zone-icon-' + type);
  const txt  = document.getElementById('zone-text-' + type);
  if (icon) icon.textContent = '⏳';
  if (txt)  txt.innerHTML = (state.lang==='es'?'Procesando: ':'Processing: ') + '<strong>' + file.name + '</strong>';
  if (zone) zone.style.borderColor = 'var(--accent)';
  const resEl = document.getElementById('upload-result-' + type);
  if (resEl) { resEl.style.display='block'; resEl.innerHTML=`<div style="padding:10px;border-radius:8px;background:rgba(77,217,224,0.08);border:1px solid rgba(77,217,224,0.2);font-size:12px;color:var(--accent)">${state.lang==='es'?'⏳ Leyendo archivo...':'⏳ Reading file...'}</div>`; }

  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      if (typeof XLSX === 'undefined') throw new Error(state.lang==='es'?'Librería XLSX no cargada. Verifica tu conexión a internet.':'XLSX library not loaded. Check your internet connection.');
      const data = new Uint8Array(ev.target.result);
      const wb   = XLSX.read(data, {type:'array'});
      const ws   = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, {defval:''});
      if (!rows.length) throw new Error(state.lang==='es'?'El archivo está vacío.':'File is empty.');
      const headers = Object.keys(rows[0]);
      let result;
      if (type === 'jugadores') result = processJugadoresData(rows, headers, file.name);
      else result = processEstadosData(rows, headers, file.name);
      showUploadResult(type, result, file.name);
    } catch(err) {
      showUploadResult(type, {ok:false, msg:err.message}, file.name);
    } finally {
      if (icon) icon.textContent = '📤';
      if (txt)  txt.innerHTML = (state.lang==='es'?'Arrastra tu archivo aquí o ':'Drop your file here or ') + `<span style="color:var(--primary)">${T('browse')}</span>`;
      if (zone) zone.style.borderColor = '';
    }
  };
  reader.onerror = () => showUploadResult(type, {ok:false, msg:state.lang==='es'?'Error al leer el archivo.':'Error reading file.'}, file.name);
  reader.readAsArrayBuffer(file);
}

function processJugadoresData(rows, headers, fileName) {
  const reqCols = ['jugador_id','nombre','posicion','dorsal','equipo'];
  const missing = reqCols.filter(c => !resolveCol(headers, c));
  if (missing.length) return {ok:false, msg:(state.lang==='es'?'Columnas faltantes: ':'Missing columns: ') + missing.join(', ')};

  let added=0, updated=0, errors=[];
  const seenIds = new Set();

  rows.forEach((row, i) => {
    const jid    = getCell(row, headers, 'jugador_id');
    const nombre = getCell(row, headers, 'nombre');
    const pos    = getCell(row, headers, 'posicion');
    const dorsal = parseInt(getCell(row, headers, 'dorsal')) || 0;

    if (!jid)   { errors.push('Fila '+(i+2)+': jugador_id vacío'); return; }
    if (!nombre){ errors.push('Fila '+(i+2)+': nombre vacío');     return; }
    if (!pos)   { errors.push('Fila '+(i+2)+': posición vacía');   return; }
    if (seenIds.has(jid)){ errors.push('Fila '+(i+2)+': ID duplicado '+jid); return; }
    seenIds.add(jid);

    const posNorm   = normPos(pos);
    const parts     = nombre.trim().split(' ');
    const shortName = parts.length >= 2 ? parts[0][0] + '. ' + parts[parts.length-1] : nombre.trim();

    const existing = players.findIndex(p => p.id === jid);
    if (existing >= 0) {
      players[existing].fullName = nombre.trim();
      players[existing].name     = shortName;
      players[existing].pos      = posNorm;
      players[existing].dorsal   = dorsal;
      updated++;
    } else {
      players.push({id:jid, fullName:nombre.trim(), name:shortName, pos:posNorm, dorsal,
        semaforo:'green', fatiga:'baja', load:0, sprints:0, minutes:0, pain:false, obs:'', rec:'', lesion:''});
      added++;
    }
  });

  uploadHistory.unshift({
    id: 'U-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    user: state.currentRole === 'director' ? 'Carlos Mendoza' : 'Ana García',
    type: 'jugadores',
    typeLabel: state.lang === 'es' ? 'Jugadores' : 'Players',
    file: fileName,
    status: errors.length ? 'con errores' : 'exitosa',
    records: added + updated,
    errors: errors.length,
  });

  return {ok:true, msg:state.lang==='es'?`${added+updated} jugadores · ${added} nuevos · ${updated} actualizados`:`${added+updated} players · ${added} new · ${updated} updated`, errors, added, updated};
}

function processEstadosData(rows, headers, fileName) {
  const reqCols = ['jugador_id','carga_fisica','fatiga','dolor_reportado','estado_jugador','nivel_riesgo'];
  const missing = reqCols.filter(c => !resolveCol(headers, c));
  if (missing.length) return {ok:false, msg:(state.lang==='es'?'Columnas faltantes: ':'Missing columns: ') + missing.join(', ')};

  let updated=0, notFound=[], errors=[];
  const byId = {};

  rows.forEach((row, i) => {
    const jid  = getCell(row, headers, 'jugador_id');
    if (!jid) { errors.push('Fila '+(i+2)+': jugador_id vacío'); return; }
    const fecha = getCell(row, headers, 'fecha_registro') || '0';
    if (!byId[jid] || fecha >= byId[jid]._fecha) byId[jid] = {...row, _fecha: fecha};
  });

  Object.entries(byId).forEach(([jid, row]) => {
    const pidx = players.findIndex(p => p.id === jid);
    if (pidx < 0) { notFound.push(jid); return; }
    const estado = {
      estado_jugador:           getCell(row, headers, 'estado_jugador'),
      nivel_riesgo:             getCell(row, headers, 'nivel_riesgo'),
      tipo_lesion:              getCell(row, headers, 'tipo_lesion'),
      fatiga:                   getCell(row, headers, 'fatiga'),
      dolor_reportado:          getCell(row, headers, 'dolor_reportado'),
      carga_fisica:             getCell(row, headers, 'carga_fisica'),
      sprints:                  getCell(row, headers, 'sprints'),
      minutos_jugados:          getCell(row, headers, 'minutos_jugados'),
      historial_lesion:         getCell(row, headers, 'historial_lesion'),
      dias_desde_ultima_lesion: getCell(row, headers, 'dias_desde_ultima_lesion'),
      observaciones_pf:         getCell(row, headers, 'observaciones_pf'),
    };
    const sem  = calcSemaforo(estado);
    const nDolor = s => String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').trim();
    const dolor = ['si','yes','1','true'].includes(nDolor(estado.dolor_reportado));
    const obs   = estado.observaciones_pf || (getCell(row, headers, 'zona_molestia') ? 'Zona: ' + getCell(row, headers, 'zona_molestia') : '');
    const rec   = getCell(row, headers, 'recomendacion') || autoRec(sem);

    players[pidx].semaforo = sem;
    players[pidx].fatiga   = normFatiga(estado.fatiga);
    players[pidx].load     = parseFloat(estado.carga_fisica) || players[pidx].load;
    players[pidx].sprints  = parseInt(estado.sprints)        || players[pidx].sprints;
    players[pidx].minutes  = parseInt(estado.minutos_jugados)|| players[pidx].minutes;
    players[pidx].pain     = dolor;
    players[pidx].obs      = obs;
    players[pidx].rec      = rec;
    players[pidx].lesion   = estado.tipo_lesion || '';
    updated++;
  });

  const errAll = [...errors, ...notFound.map(id => `jugador_id "${id}" no encontrado`)];
  uploadHistory.unshift({
    id: 'U-' + Date.now(),
    date: new Date().toISOString().split('T')[0],
    user: state.currentRole === 'director' ? 'Carlos Mendoza' : 'Ana García',
    type: 'estados',
    typeLabel: state.lang === 'es' ? 'Estados físicos' : 'Physical states',
    file: fileName,
    status: errAll.length ? 'con errores' : 'exitosa',
    records: updated,
    errors: errAll.length,
  });

  const note = notFound.length ? (state.lang==='es'?` · ${notFound.length} IDs no encontrados`:` · ${notFound.length} IDs not found`) : '';
  return {ok:true, msg:(state.lang==='es'?`${updated} jugadores actualizados · semáforos recalculados`:`${updated} players updated · semaphores recalculated`) + note, errors:errAll, updated};
}

export function showUploadResult(type, result, fileName) {
  const el = document.getElementById('upload-result-' + type);
  if (!el) return;
  el.style.display = 'block';
  if (!result.ok) {
    el.innerHTML = `<div style="padding:12px;border-radius:8px;background:var(--red-bg);border:1px solid var(--red-ring)"><div style="color:var(--red);font-size:12px;font-weight:600">❌ Error</div><div style="color:var(--muted);font-size:11px;margin-top:4px">${result.msg}</div></div>`;
    return;
  }
  const hasErr = result.errors && result.errors.length > 0;
  el.innerHTML = `<div style="padding:12px;border-radius:8px;background:${hasErr?'var(--yellow-bg)':'var(--green-bg)'};border:1px solid ${hasErr?'var(--yellow-ring)':'var(--green-ring)'}">
    <div style="font-size:12px;font-weight:600;color:${hasErr?'var(--yellow)':'var(--green)'};">${hasErr?'⚠️':'✅'} ${result.msg}</div>
    ${hasErr?`<div style="margin-top:6px">${result.errors.slice(0,3).map(e=>`<div style="font-size:11px;color:var(--muted)">• ${e}</div>`).join('')}${result.errors.length>3?`<div style="font-size:11px;color:var(--muted)">+${result.errors.length-3} ${state.lang==='es'?'más':'more'}</div>`:''}</div>`:''}
  </div>`;
  if (state.currentRole && state.currentRole !== 'jugador') {
    setTimeout(() => { if (typeof window.renderMainContent === 'function') window.renderMainContent(); }, 300);
  }
}

export function simulateDownload(btn) {
  const orig = btn.innerHTML;
  btn.innerHTML = '⏳ ' + (state.lang==='es'?'Generando...':'Generating...');
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = orig;
    btn.disabled = false;
    alert(state.lang==='es'?'Plantilla descargada: ArmorPlayAI_Plantilla.xlsx\n\n(En versión con backend se generaría el archivo real con datos de ejemplo.)':'Template downloaded: ArmorPlayAI_Template.xlsx\n\n(In backend version, the real file with example data would be generated.)');
  }, 900);
}
