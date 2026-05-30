/* ============================================================
   PREPARADOR — Physical coach full dashboard
   ============================================================ */

import { state, players, uploadHistory } from '../state.js';
import { T } from '../lib/i18n.js';
import { badge, loadBarHtml } from '../lib/helpers.js';

export function buildPreparadorFull() {
  const highF    = players.filter(p => p.fatiga === 'alta');
  const withP    = players.filter(p => p.pain);
  const injured  = players.filter(p => p.semaforo === 'red');
  const atRisk   = players.filter(p => p.semaforo === 'yellow');
  const optimal  = players.filter(p => p.semaforo === 'green');
  const lastUp   = uploadHistory[0];

  return `<div class="animate-in">
  <div class="kpi-grid-6">
    <div class="kpi-card yellow-c"><div class="kpi-label">😤 ${T('highFatigue')}</div><div class="kpi-value yellow sm">${highF.length}</div><div class="kpi-sub">${state.lang==='es'?'jugadores':'players'}</div></div>
    <div class="kpi-card yellow-c"><div class="kpi-label">🤕 ${T('withPain')}</div><div class="kpi-value yellow sm">${withP.length}</div><div class="kpi-sub">${state.lang==='es'?'con dolor':'with pain'}</div></div>
    <div class="kpi-card red-c"><div class="kpi-label">🔴 ${T('kpiInjured')}</div><div class="kpi-value red sm">${injured.length}</div><div class="kpi-sub">${state.lang==='es'?'baja médica':'medical leave'}</div></div>
    <div class="kpi-card yellow-c"><div class="kpi-label">⚠️ ${T('kpiRisk')}</div><div class="kpi-value yellow sm">${atRisk.length}</div><div class="kpi-sub">${state.lang==='es'?'en riesgo':'at risk'}</div></div>
    <div class="kpi-card green-c"><div class="kpi-label">✅ ${T('kpiOptimal')}</div><div class="kpi-value green sm">${optimal.length}</div><div class="kpi-sub">${state.lang==='es'?'óptimos':'optimal'}</div></div>
    <div class="kpi-card cyan"><div class="kpi-label">📤 ${T('lastUpload')}</div><div class="kpi-value cyan" style="font-size:13px;margin-top:4px">May 21</div><div class="kpi-sub">${lastUp.file.substring(0,18)}…</div></div>
  </div>
  <div class="row row-2-1">
    <div class="panel">
      <div class="panel-title-row">
        <div><div class="panel-eyebrow">⚠️ ${T('physMonitor')}</div><div class="panel-title">${state.lang==='es'?'Requieren atención':'Require attention'}</div></div>
        <button class="link-sm" onclick="navTo('players')">${T('viewAll')} →</button>
      </div>
      ${[...injured,...atRisk].map(p=>`
        <div class="alert-card">
          <div class="alert-header">
            <div class="alert-player">
              <div class="dorsal" style="border-color:${p.semaforo==='red'?'var(--red-ring)':'var(--yellow-ring)'}">#${p.dorsal}</div>
              <div>
                <div class="player-name">${p.name}</div>
                <div class="player-team">${p.pos} · ${state.lang==='es'?`Fatiga: <span class="fatigue-${p.fatiga}">${p.fatiga}</span>`:`Fatigue: <span class="fatigue-${p.fatiga}">${p.fatiga}</span>`} · Load: ${p.load}</div>
              </div>
            </div>${badge(p.semaforo)}
          </div>
          ${p.obs?`<div class="alert-rec"><span style="color:${p.semaforo==='red'?'var(--red)':'var(--yellow)'};flex-shrink:0">💬</span><span>${p.obs}</span></div>`:''}
          ${p.lesion?`<div style="margin-top:6px;padding-left:48px"><span class="chip-tag">🦴 ${p.lesion}</span></div>`:''}
        </div>`).join('')}
    </div>
    <div class="panel">
      <div class="panel-eyebrow">${state.lang==='es'?'Carga física por posición':'Physical load by position'}</div>
      <div class="panel-title" style="margin-bottom:16px">${state.lang==='es'?'Promedio de carga':'Average load'}</div>
      ${[
        {lbl:'GK', avg:45,  color:'var(--green)'},
        {lbl:'DEF',avg:60,  color:'var(--yellow)'},
        {lbl:'DM', avg:62,  color:'var(--yellow)'},
        {lbl:'CM', avg:74,  color:'var(--yellow)'},
        {lbl:'WG', avg:79,  color:'var(--red)'},
        {lbl:'ST', avg:53,  color:'var(--yellow)'},
      ].map(r=>`
        <div style="margin-bottom:12px">
          <div style="display:flex;justify-content:space-between;margin-bottom:4px">
            <span style="font-size:11px;font-weight:500">${r.lbl}</span>
            <span style="font-size:11px;color:${r.color};font-family:'JetBrains Mono',monospace">${r.avg}</span>
          </div>
          <div class="progress-bar thin"><div class="progress-fill" style="width:${r.avg}%;background:${r.color}"></div></div>
        </div>`).join('')}
      <div style="padding-top:12px;border-top:1px solid var(--border);font-size:11px;color:var(--muted)">
        <div style="display:flex;justify-content:space-between">
          <span>${state.lang==='es'?'Carga promedio equipo':'Team avg load'}</span>
          <span style="color:var(--yellow);font-weight:600">65.5</span>
        </div>
      </div>
    </div>
  </div>
  <div class="panel" style="margin-bottom:16px;padding:0;overflow:hidden">
    <div style="padding:20px 20px 12px">
      <div class="panel-eyebrow">📊 ${T('physAllPlayers')}</div>
      <div class="panel-title">${state.lang==='es'?'Estado físico completo':'Full physical status'}</div>
    </div>
    <div class="table-wrap"><table>
      <thead><tr>
        <th>#</th><th>${T('colName')}</th><th>${T('colPos')}</th>
        <th>${T('colRisk')}</th><th>${T('colFatigue')}</th>
        <th>${T('colLoad')}</th><th>${T('colSprints')}</th>
        <th>${T('colMin')}</th><th>${T('colPain')}</th>
        <th>${T('colObs')}</th>
      </tr></thead>
      <tbody>${players.map(p=>`<tr>
        <td class="mono" style="color:var(--muted)">${p.dorsal}</td>
        <td><div style="font-weight:600;min-width:90px">${p.name}</div></td>
        <td style="color:var(--muted)">${p.pos}</td>
        <td>${badge(p.semaforo)}</td>
        <td class="fatigue-${p.fatiga}">${p.fatiga}</td>
        <td>${loadBarHtml(p.load)}</td>
        <td><span style="font-family:'JetBrains Mono',monospace;color:${p.sprints>22?'var(--red)':p.sprints>16?'var(--yellow)':'var(--muted)'}">${p.sprints}</span></td>
        <td><span style="font-family:'JetBrains Mono',monospace;color:var(--muted)">${p.minutes}</span></td>
        <td style="text-align:center">${p.pain?'<span style="color:var(--red)">●</span>':'<span style="color:var(--green)">○</span>'}</td>
        <td style="max-width:180px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--muted);font-size:11px">${p.obs||'—'}</td>
      </tr>`).join('')}</tbody>
    </table></div>
  </div>
  <div class="row row-2-1">
    <div class="panel">
      <div class="panel-eyebrow">📤 ${state.lang==='es'?'Últimas cargas Excel':'Recent Excel uploads'}</div>
      <div class="panel-title" style="margin-bottom:16px">${state.lang==='es'?'Actividad reciente':'Recent activity'}</div>
      ${uploadHistory.slice(0,3).map(h=>`
        <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
          <div style="width:36px;height:36px;border-radius:8px;background:${h.type==='jugadores'?'rgba(108,143,255,0.15)':'rgba(77,217,224,0.15)'};display:flex;align-items:center;justify-content:center;flex-shrink:0">${h.type==='jugadores'?'👥':'💪'}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:600">${h.file}</div>
            <div style="font-size:11px;color:var(--muted)">${h.user} · ${h.date}</div>
          </div>
          <div>
            <span class="badge ${h.status==='exitosa'?'green':'yellow'}">${h.status==='exitosa'?T('statusOk'):T('statusErr')}</span>
            <div style="font-size:10px;color:var(--muted);text-align:right;margin-top:4px">${h.records} reg.</div>
          </div>
        </div>`).join('')}
      <div style="margin-top:12px"><button class="link-sm" onclick="navTo('history')">${state.lang==='es'?'Ver historial completo':'View full history'} →</button></div>
    </div>
    <div class="panel">
      <div class="panel-eyebrow">${state.lang==='es'?'Recomendaciones físicas':'Physical recommendations'}</div>
      <div class="panel-title" style="margin-bottom:16px">${state.lang==='es'?'Acciones sugeridas':'Suggested actions'}</div>
      ${[
        {icon:'🔴',color:'var(--red)',   text:state.lang==='es'?`${injured.length} jugadores requieren descanso médico completo.`:`${injured.length} players require full medical rest.`},
        {icon:'⚠️',color:'var(--yellow)',text:state.lang==='es'?`${highF.length} jugadores con fatiga alta: reducir carga en próxima sesión.`:`${highF.length} players with high fatigue: reduce load next session.`},
        {icon:'🤕',color:'var(--yellow)',text:state.lang==='es'?`${withP.length} jugadores reportan dolor: priorizar evaluación física.`:`${withP.length} players report pain: prioritize physical evaluation.`},
        {icon:'✅',color:'var(--green)', text:state.lang==='es'?`${optimal.length} jugadores en estado óptimo. Carga normal.`:`${optimal.length} players in optimal state. Normal load.`},
      ].map(r=>`
        <div style="display:flex;gap:10px;margin-bottom:12px;padding:10px;border-radius:8px;background:rgba(255,255,255,0.02)">
          <span style="flex-shrink:0">${r.icon}</span>
          <span style="font-size:12px;color:var(--muted);line-height:1.5">${r.text}</span>
        </div>`).join('')}
      <div style="margin-top:8px;padding-top:12px;border-top:1px solid var(--border)"><button class="link-sm" onclick="navTo('upload')">📤 ${T('navUpload')} →</button></div>
    </div>
  </div>
  </div>`;
}
