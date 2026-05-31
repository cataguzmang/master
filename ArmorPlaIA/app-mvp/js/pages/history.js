/* ============================================================
   HISTORY — Upload history with filters
   ============================================================ */

import { state, uploadHistory } from '../state.js';
import { T } from '../lib/i18n.js';

export function buildHistoryFull() {
  const filtered = state.historyFilter === 'all'
    ? uploadHistory
    : uploadHistory.filter(h => h.type === state.historyFilter);

  const hfClass = f => state.historyFilter === f ? 'filter-tab active-f' : 'filter-tab';

  return `<div class="animate-in">
  <div style="display:flex;gap:8px;margin-bottom:16px">
    <button class="${hfClass('all')}" onclick="historyFilterChange('all')">${T('historyAll')} (${uploadHistory.length})</button>
    <button class="${hfClass('jugadores')}" onclick="historyFilterChange('jugadores')">👥 ${T('historyPlayers')} (${uploadHistory.filter(h=>h.type==='jugadores').length})</button>
    <button class="${hfClass('estados')}" onclick="historyFilterChange('estados')">💪 ${T('historyStates')} (${uploadHistory.filter(h=>h.type==='estados').length})</button>
  </div>
  <div class="panel" style="padding:0;overflow:hidden">
    <div style="padding:16px 20px;border-bottom:1px solid var(--border)">
      <div class="panel-eyebrow">📋 ${T('historyTitle')}</div>
      <div class="panel-title">${filtered.length} ${state.lang==='es'?'registros encontrados':'records found'}</div>
    </div>
    <div class="table-wrap"><table>
      <thead><tr>
        <th>${T('colDate')}</th><th>${T('colUser')}</th><th>${T('colType')}</th>
        <th>${T('colFile')}</th><th>${T('colStatus')}</th><th style="text-align:right">${T('colRecords')}</th>
      </tr></thead>
      <tbody>${filtered.map(h=>`
        <tr>
          <td style="color:var(--muted);white-space:nowrap">${h.date}</td>
          <td><div style="font-weight:500">${h.user}</div></td>
          <td><span class="chip-tag">${h.type==='jugadores'?'👥':'💪'} ${h.typeLabel||(h.type==='jugadores'?T('historyPlayers'):T('historyStates'))}</span></td>
          <td style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--muted)">${h.file}</td>
          <td><span class="badge ${h.status==='exitosa'?'green':'yellow'}">${h.status==='exitosa'?T('statusOk'):T('statusErr')}</span></td>
          <td style="text-align:right">
            <span style="font-family:'JetBrains Mono',monospace">${h.records}</span>
            ${h.errors>0?`<span style="color:var(--red);font-size:10px;margin-left:4px">(${h.errors} err)</span>`:''}
          </td>
        </tr>`).join('')}</tbody>
    </table></div>
  </div>
  </div>`;
}

export function historyFilterChange(f) {
  state.historyFilter = f;
  if (typeof window.renderMainContent === 'function') window.renderMainContent();
}
