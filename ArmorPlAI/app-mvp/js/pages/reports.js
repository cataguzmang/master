/* ============================================================
   REPORTS — Team reports and summary
   ============================================================ */

import { state, players } from '../state.js';
import { T } from '../lib/i18n.js';
import { badge, eff, effColor, getStats, pct } from '../lib/helpers.js';

export function buildReportsFull() {
  const s = getStats();
  const efficiency = eff(state.activeLineup);
  const avgLoad = Math.round(players.reduce((a, p) => a + p.load, 0) / players.length);
  const highRiskCount = players.filter(p => p.semaforo === 'yellow' || p.semaforo === 'red').length;

  return `<div class="animate-in">
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
    <div><div class="panel-eyebrow">📈 ${T('reportsTitle')}</div><div class="panel-title">Armor FC · ${state.lang==='es'?'Semana del 19-25 mayo 2026':'Week of May 19-25, 2026'}</div></div>
    <button class="btn-glass" onclick="simulateDownload(this)" style="gap:8px">⬇️ ${T('repExport')}</button>
  </div>
  <div class="kpi-grid-4">
    <div class="kpi-card blue"><div class="kpi-label">👥 ${T('repTeamStatus')}</div><div class="kpi-value blue">${pct(s.optimal,s.total)}%</div><div class="kpi-sub">${state.lang==='es'?'en estado óptimo':'in optimal state'}</div></div>
    <div class="kpi-card red-c"><div class="kpi-label">🦴 ${T('repInjuries')}</div><div class="kpi-value red">${s.injured}</div><div class="kpi-sub">${state.lang==='es'?'lesiones activas':'active injuries'}</div></div>
    <div class="kpi-card yellow-c"><div class="kpi-label">📊 ${T('repLoad')}</div><div class="kpi-value yellow">${avgLoad}</div><div class="kpi-sub">${state.lang==='es'?'carga promedio equipo':'team average load'}</div></div>
    <div class="kpi-card cyan"><div class="kpi-label">📈 ${T('kpiEff')}</div><div class="kpi-value cyan">${efficiency}%</div><div class="kpi-sub">${state.lang==='es'?'once titular':'starting eleven'}</div></div>
  </div>
  <div class="row row-2-1">
    <div class="panel" style="padding:0;overflow:hidden">
      <div style="padding:16px 20px;border-bottom:1px solid var(--border)">
        <div class="panel-eyebrow">${state.lang==='es'?'Resumen de estado del plantel':'Squad status summary'}</div>
        <div class="panel-title">${state.lang==='es'?'Distribución actual':'Current distribution'}</div>
      </div>
      <div style="padding:20px">
        ${[
          {c:'green',  label:T('optimal'), count:s.optimal, fill:'fill-green'},
          {c:'yellow', label:T('atRisk'),  count:s.atRisk,  fill:'fill-yellow'},
          {c:'red',    label:T('injured'), count:s.injured, fill:'fill-red'},
        ].map(x=>`
          <div class="status-row">
            <div class="status-row-header">
              <div style="display:flex;align-items:center;gap:12px">${badge(x.c,x.label)}<span style="font-size:11px;color:var(--muted)">${pct(x.count,s.total)}%</span></div>
              <span style="font-size:13px;font-family:'JetBrains Mono',monospace;font-weight:600">${x.count}</span>
            </div>
            <div class="progress-bar"><div class="progress-fill ${x.fill}" style="width:${pct(x.count,s.total)}%"></div></div>
          </div>`).join('')}
        <div style="margin-top:20px;border-top:1px solid var(--border);padding-top:16px">
          <div class="panel-eyebrow" style="margin-bottom:12px">${state.lang==='es'?'Lesiones activas':'Active injuries'}</div>
          ${players.filter(p => p.lesion).map(p=>`
            <div class="report-stat">
              <div style="display:flex;gap:10px;align-items:center">${badge(p.semaforo)}<span style="font-size:12px;font-weight:600">${p.name} #${p.dorsal}</span></div>
              <span style="font-size:11px;color:var(--red)">${p.lesion}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="panel">
        <div class="panel-eyebrow">${state.lang==='es'?'Carga semanal por posición':'Weekly load by position'}</div>
        <div class="bar-chart" style="height:120px;margin-top:12px">
          ${[{l:'GK',v:45},{l:'DEF',v:60},{l:'DM',v:62},{l:'CM',v:74},{l:'WG',v:79},{l:'ST',v:53}].map(r=>`
            <div class="bar-col"><div class="bar" style="height:${Math.round(r.v/80*100)+4}px;background:${r.v>75?'var(--red)':r.v>60?'var(--yellow)':'var(--primary)'}"></div>
            <div class="bar-label">${r.l}</div></div>`).join('')}
        </div>
        <div style="font-size:11px;color:var(--muted);margin-top:8px">${state.lang==='es'?'Promedio general:':'General average:'} <span style="color:var(--yellow);font-weight:600">${avgLoad}</span></div>
      </div>
      <div class="panel">
        <div class="panel-eyebrow">${state.lang==='es'?'Tendencia de riesgo':'Risk trend'}</div>
        <div class="panel-title" style="margin-bottom:12px;font-size:15px">${highRiskCount} ${state.lang==='es'?'jugadores en alerta':'players on alert'}</div>
        ${['J003','J007','J010','J012'].map(id => {
          const p = players.find(x => x.id === id);
          return p ? `
          <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid var(--border)">
            <span style="font-size:12px">${p.name}</span>
            ${badge(p.semaforo)}
          </div>` : '';
        }).join('')}
        <div style="margin-top:12px"><button class="link-sm" onclick="navTo('players')">${T('viewAll')} →</button></div>
      </div>
    </div>
  </div>
  </div>`;
}
