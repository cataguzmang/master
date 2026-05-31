/* ============================================================
   DASHBOARD — Director main view
   ============================================================ */

import { state, players } from '../state.js';
import { T } from '../lib/i18n.js';
import { badge, loadBarHtml, eff, effColor, getStats, pct } from '../lib/helpers.js';

export function buildDashboard() {
  const s = getStats();
  const efficiency = eff(state.activeLineup);
  const ec = effColor(efficiency);
  const alerts = players.filter(p => p.semaforo === 'yellow' || p.semaforo === 'red');
  const posLoad = {GK:[45], DEF:[58,50,82,55], DM:[62], CM:[68,79], WG:[88,70], ST:[85,20]};
  const posAvg = Object.values(posLoad).map(a => Math.round(a.reduce((x, y) => x + y, 0) / a.length));
  const maxL = Math.max(...posAvg);

  return `<div class="animate-in">
  <div class="kpi-grid">
    <div class="kpi-card blue"><div class="kpi-label">👥 ${T('kpiTotal')}</div><div class="kpi-value blue">${s.total}</div><div class="kpi-sub">${s.total} ${T('playersLbl')}</div></div>
    <div class="kpi-card green-c"><div class="kpi-label">✅ ${T('kpiOptimal')}</div><div class="kpi-value green">${s.optimal}</div><div class="kpi-sub">${pct(s.optimal,s.total)}% del plantel</div></div>
    <div class="kpi-card yellow-c"><div class="kpi-label">⚠️ ${T('kpiRisk')}</div><div class="kpi-value yellow">${s.atRisk}</div><div class="kpi-sub">${state.lang==='es'?'Requieren atención':'Requires attention'}</div></div>
    <div class="kpi-card red-c"><div class="kpi-label">🔴 ${T('kpiInjured')}</div><div class="kpi-value red">${s.injured}</div><div class="kpi-sub">${state.lang==='es'?'Baja médica':'Medical leave'}</div></div>
    <div class="kpi-card cyan"><div class="kpi-label">📈 ${T('kpiEff')}</div><div class="kpi-value cyan">${efficiency}%</div><div class="kpi-sub">${state.lang==='es'?'11 titulares':'11 starters'}</div></div>
  </div>
  <div class="row row-2-1">
    <div class="panel">
      <div style="position:absolute;top:-60px;right:-60px;width:160px;height:160px;border-radius:50%;background:rgba(108,143,255,0.1);filter:blur(50px)"></div>
      <div style="position:relative">
        <div class="panel-title-row">
          <div><div class="panel-eyebrow">${T('alertsTitle')}</div><div class="panel-title">${T('alertsSub')}</div></div>
          <button class="link-sm" onclick="navTo('players')">${T('viewAll')} →</button>
        </div>
        ${alerts.slice(0,5).map(p=>`
          <div class="alert-card">
            <div class="alert-header">
              <div class="alert-player">
                <div class="dorsal">#${p.dorsal}</div>
                <div><div class="player-name">${p.name}</div><div class="player-team">${p.pos} · Armor FC</div></div>
              </div>${badge(p.semaforo)}
            </div>
            ${p.rec?`<div class="alert-rec"><span style="color:var(--yellow);flex-shrink:0">⚠</span><span>${p.rec}</span></div>`:''}
          </div>`).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="panel-eyebrow">${T('statusTitle')}</div>
      <div class="panel-title" style="margin-bottom:20px">${T('availTitle')}</div>
      ${[
        {c:'green',  label:T('optimal'), count:s.optimal, fill:'fill-green'},
        {c:'yellow', label:T('atRisk'),  count:s.atRisk,  fill:'fill-yellow'},
        {c:'red',    label:T('injured'), count:s.injured, fill:'fill-red'},
      ].map(x=>`
        <div class="status-row">
          <div class="status-row-header">${badge(x.c,x.label)}<span style="font-size:12px;font-family:'JetBrains Mono',monospace">${x.count}<span style="color:var(--muted);font-size:10px"> ${T('of')} ${s.total}</span></span></div>
          <div class="progress-bar"><div class="progress-fill ${x.fill}" style="width:${pct(x.count,s.total)}%"></div></div>
        </div>`).join('')}
      <div class="eff-section">
        <div class="eff-label">${T('effLabel')}</div>
        <div class="eff-value" style="color:${ec}">${efficiency}%</div>
        <div style="font-size:11px;color:var(--muted);margin-top:4px">${state.lang==='es'?'11 titulares':'11 starters'}</div>
      </div>
      <div style="padding-top:16px;border-top:1px solid var(--border);margin-top:16px">
        <div style="display:flex;align-items:center;gap:8px;font-size:11px;color:var(--muted)">📅 <span>${T('lastLoad')}: 2026-05-21</span></div>
      </div>
    </div>
  </div>
  <div class="row row-2-1">
    <div class="panel" style="padding:0;overflow:hidden">
      <div style="padding:20px;display:flex;align-items:flex-start;justify-content:space-between">
        <div><div class="panel-eyebrow">${T('playersTitle')}</div><div class="panel-title">${T('alertsSub')}</div></div>
        <button class="link-sm" onclick="navTo('players')">${T('viewAll')} →</button>
      </div>
      <div class="table-wrap"><table>
        <thead><tr><th>${T('colName')}</th><th>${T('colPos')}</th><th>${T('colRisk')}</th><th>${T('colFatigue')}</th><th>${T('colLoad')}</th></tr></thead>
        <tbody>${players.slice(0,8).map(p=>`<tr>
          <td><div style="display:flex;align-items:center;gap:10px"><div class="dorsal">#${p.dorsal}</div><div><div style="font-weight:600">${p.name}</div><div style="font-size:11px;color:var(--muted)">Armor FC</div></div></div></td>
          <td style="color:var(--muted)">${p.pos}</td>
          <td>${badge(p.semaforo)}</td>
          <td class="fatigue-${p.fatiga}">${p.fatiga.charAt(0).toUpperCase()+p.fatiga.slice(1)}</td>
          <td>${loadBarHtml(p.load)}</td>
        </tr>`).join('')}</tbody>
      </table></div>
    </div>
    <div class="panel">
      <div class="panel-eyebrow">${T('loadTitle')}</div>
      <div class="panel-title">${T('loadSub')}</div>
      <div class="bar-chart" style="margin-top:16px">
        ${posAvg.map((v,i)=>`<div class="bar-col"><div class="bar" style="height:${Math.round(v/maxL*110)+8}px;background:${v>80?'var(--red)':v>60?'var(--yellow)':'var(--primary)'}"></div><div class="bar-label">${['GK','DEF','DM','CM','WG','ST'][i]}</div></div>`).join('')}
      </div>
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);font-size:11px;color:var(--muted)">${T('loadNote')}</div>
      <div style="margin-top:16px"><button class="link-sm" onclick="navTo('lineups')">⚽ ${T('navLineups')} →</button></div>
    </div>
  </div>
  </div>`;
}
