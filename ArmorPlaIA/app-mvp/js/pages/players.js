/* ============================================================
   PLAYERS — Full players table with search + filters
   ============================================================ */

import { state, players } from '../state.js';
import { T } from '../lib/i18n.js';
import { badge, loadBarHtml, semLabel } from '../lib/helpers.js';

export function buildPlayersTable() {
  const filtered = players.filter(p => {
    const matchFilter = state.playersFilter === 'all' || p.semaforo === state.playersFilter;
    const matchSearch = !state.playersSearch
      || p.name.toLowerCase().includes(state.playersSearch.toLowerCase())
      || p.fullName.toLowerCase().includes(state.playersSearch.toLowerCase())
      || p.pos.toLowerCase().includes(state.playersSearch.toLowerCase());
    return matchFilter && matchSearch;
  });
  const canEdit = state.currentRole === 'director';

  const filterBtnClass = f => {
    if (state.playersFilter !== f) return 'filter-tab';
    if (f === 'all')    return 'filter-tab active-f';
    if (f === 'green')  return 'filter-tab active-green';
    if (f === 'yellow') return 'filter-tab active-yellow';
    if (f === 'red')    return 'filter-tab active-red';
    return 'filter-tab active-f';
  };

  return `<div class="animate-in">
  <div class="search-row">
    <div class="search-wrap">
      <span class="search-icon">🔍</span>
      <input class="search-input" type="text" placeholder="${T('searchPlaceholder')}" value="${state.playersSearch}" oninput="searchChange(this.value)"/>
    </div>
    <div class="filter-tabs">
      <button class="${filterBtnClass('all')}" onclick="filterChange('all')"><span class="badge-dot" style="background:var(--muted)"></span>${T('filterAll')} (${players.length})</button>
      <button class="${filterBtnClass('green')}" onclick="filterChange('green')"><span class="badge-dot dot-green"></span>${T('optimal')} (${players.filter(p=>p.semaforo==='green').length})</button>
      <button class="${filterBtnClass('yellow')}" onclick="filterChange('yellow')"><span class="badge-dot dot-yellow"></span>${T('atRisk')} (${players.filter(p=>p.semaforo==='yellow').length})</button>
      <button class="${filterBtnClass('red')}" onclick="filterChange('red')"><span class="badge-dot dot-red"></span>${T('injured')} (${players.filter(p=>p.semaforo==='red').length})</button>
    </div>
  </div>
  <div class="panel" style="padding:0;overflow:hidden">
    <div style="padding:16px 20px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid var(--border)">
      <div>
        <div class="panel-eyebrow">${T('playersTitle')}</div>
        <div class="panel-title">${filtered.length} ${T('playersLbl')} ${state.playersFilter!=='all'?'· '+semLabel(state.playersFilter):''}</div>
      </div>
      ${canEdit?`<button class="btn-glass" style="gap:6px" onclick="alert('${state.lang==='es'?'Función disponible en versión con backend':'Feature available in backend version'}')">
        ➕ ${state.lang==='es'?'Agregar jugador':'Add player'}
      </button>`:''}
    </div>
    ${filtered.length===0?`<div style="padding:48px;text-align:center;color:var(--muted)">${T('noResults')}</div>`:`
    <div class="table-wrap"><table>
      <thead><tr>
        <th>#</th><th>${T('colName')}</th><th>${T('colPos')}</th>
        <th>${T('colRisk')}</th><th>${T('colFatigue')}</th>
        <th>${T('colLoad')}</th><th>${T('colSprints')}</th>
        <th>${T('colMin')}</th>
        ${state.currentRole!=='jugador'?`<th>${T('colObs')}</th><th></th>`:''}
      </tr></thead>
      <tbody>
        ${filtered.map(p=>`
          <tr style="cursor:pointer" onclick="toggleExpand('${p.id}')">
            <td class="mono" style="color:var(--muted)">${p.dorsal}</td>
            <td><div style="display:flex;align-items:center;gap:10px">
              <div class="dorsal" style="border-color:${p.semaforo==='red'?'var(--red-ring)':p.semaforo==='yellow'?'var(--yellow-ring)':'var(--green-ring)'}">#${p.dorsal}</div>
              <div><div style="font-weight:600;font-size:13px">${p.name}</div><div style="font-size:11px;color:var(--muted)">${p.fullName}</div></div>
            </div></td>
            <td style="color:var(--muted)">${p.pos}</td>
            <td>${badge(p.semaforo)}</td>
            <td class="fatigue-${p.fatiga}">${p.fatiga}</td>
            <td>${loadBarHtml(p.load)}</td>
            <td><span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:${p.sprints>22?'var(--red)':p.sprints>16?'var(--yellow)':'var(--muted)'}">${p.sprints}</span></td>
            <td><span style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--muted)">${p.minutes}</span></td>
            ${state.currentRole!=='jugador'?`
            <td style="max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;color:var(--muted)">${p.obs||'—'}</td>
            <td><button class="link-sm" onclick="event.stopPropagation();toggleExpand('${p.id}')">▾</button></td>
            `:''}
          </tr>
          <tr id="expand-${p.id}" style="display:none">
            <td colspan="${state.currentRole!=='jugador'?10:8}" style="padding:0">
              <div class="player-expand open">
                <div style="display:grid;grid-template-columns:1fr 1fr ${p.lesion?'1fr':''};gap:16px">
                  <div>
                    <div style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);margin-bottom:8px">${T('yourRec')}</div>
                    <div style="font-size:12px;line-height:1.6">${p.rec}</div>
                  </div>
                  ${p.obs?`<div>
                    <div style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);margin-bottom:8px">${T('coachNote')}</div>
                    <div style="font-size:12px;color:var(--muted);line-height:1.6">${p.obs}</div>
                  </div>`:'<div></div>'}
                  ${p.lesion?`<div>
                    <div style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--red);margin-bottom:8px">🦴 ${T('injuriesActive')}</div>
                    <div style="font-size:12px;font-weight:600;color:var(--red)">${p.lesion}</div>
                  </div>`:''}
                </div>
                ${canEdit?`<div style="display:flex;gap:8px;margin-top:12px">
                  <button class="btn-glass" style="height:32px;font-size:11px" onclick="event.stopPropagation()">✏️ ${state.lang==='es'?'Editar':'Edit'}</button>
                  <button class="btn-glass" style="height:32px;font-size:11px;color:var(--red)" onclick="event.stopPropagation()">🗑 ${state.lang==='es'?'Eliminar':'Remove'}</button>
                </div>`:''}
              </div>
            </td>
          </tr>`).join('')}
      </tbody>
    </table></div>`}
  </div>
  </div>`;
}

export function filterChange(f) {
  state.playersFilter = f;
  if (typeof window.renderMainContent === 'function') window.renderMainContent();
}

export function searchChange(v) {
  state.playersSearch = v;
  if (typeof window.renderMainContent === 'function') window.renderMainContent();
}

export function toggleExpand(id) {
  const row = document.getElementById('expand-' + id);
  if (!row) return;
  row.style.display = row.style.display === 'none' ? 'table-row' : 'none';
}
