/* ============================================================
   LINEUPS — Formation 4·3·3 with substitution logic
   ============================================================ */

import { state, players } from '../state.js';
import { T } from '../lib/i18n.js';
import { badge, eff, effColor, organiseFormation } from '../lib/helpers.js';

export function buildLineupsModule() {
  const efficiency = eff(state.activeLineup);
  const ec = effColor(efficiency);
  const form = organiseFormation(state.activeLineup);
  const lineupStats = {
    green:  state.activeLineup.filter(id=>{const p=players.find(x=>x.id===id);return p&&p.semaforo==='green';}).length,
    yellow: state.activeLineup.filter(id=>{const p=players.find(x=>x.id===id);return p&&p.semaforo==='yellow';}).length,
    red:    state.activeLineup.filter(id=>{const p=players.find(x=>x.id===id);return p&&p.semaforo==='red';}).length,
  };

  function playerSlot(id, isBenchTarget) {
    const p = players.find(x => x.id === id);
    if (!p) return '';
    const isSwapFrom = state.swapFromId === id;
    const cls = isBenchTarget ? 'pslot bench-target' : 'pslot';
    const ringCls = 'pring' + (isSwapFrom ? ' swap-from' : ' ' + p.semaforo);
    const clickFn = isBenchTarget
      ? `confirmSwap('${id}')`
      : (state.currentRole === 'director' ? `clickSlot('${id}')` : '');
    return `<div class="${cls}" onclick="${clickFn}" title="${p.fullName}">
      <div class="${ringCls}">
        <div class="pdorsal">${p.dorsal}</div>
      </div>
      <div class="pname">${p.name}</div>
      <div class="ppos">${p.pos}</div>
      ${state.currentRole==='director' && !state.swapMode ? `<button class="swap-btn-sm" onclick="event.stopPropagation();clickSlot('${id}')">↔</button>` : ''}
      ${isSwapFrom && state.swapIsGK ? `<div style="font-size:8px;color:var(--red);text-align:center">${state.lang==='es'?'GK only':'GK solo'}</div>` : ''}
      ${isSwapFrom ? `<div style="font-size:9px;color:var(--accent)">${state.lang==='es'?'saliendo':'going out'}</div>` : ''}
    </div>`;
  }

  const formationRows = [
    {label: state.lang==='es'?'Ataque':'Attack',   ids: form.att},
    {label: state.lang==='es'?'Mediocampo':'Mid',  ids: form.mid},
    {label: state.lang==='es'?'Defensa':'Defence', ids: form.def},
    {label: 'GK', ids: form.gk},
  ];

  const hasGK = state.activeLineup.some(id => {
    const p = players.find(x => x.id === id);
    return p && p.pos === 'GK';
  });

  return `<div class="animate-in">
  <div class="kpi-grid-4">
    <div class="kpi-card cyan" style="grid-column:span 1">
      <div class="kpi-label">📈 ${T('teamEff')}</div>
      <div class="kpi-value" style="color:${ec};font-size:36px">${efficiency}%</div>
      <div class="kpi-sub">${state.lang==='es'?'11 titulares':'11 starters'}</div>
    </div>
    <div class="kpi-card green-c"><div class="kpi-label">✅ ${T('optimal')}</div><div class="kpi-value green sm">${lineupStats.green}</div><div class="kpi-sub">${state.lang==='es'?'en el once':'in lineup'}</div></div>
    <div class="kpi-card yellow-c"><div class="kpi-label">⚠️ ${T('atRisk')}</div><div class="kpi-value yellow sm">${lineupStats.yellow}</div><div class="kpi-sub">${state.lang==='es'?'en el once':'in lineup'}</div></div>
    <div class="kpi-card red-c"><div class="kpi-label">🔴 ${T('injured')}</div><div class="kpi-value red sm">${lineupStats.red}</div><div class="kpi-sub">${state.lang==='es'?'en el once':'in lineup'}</div></div>
  </div>

  ${state.swapMode ? `<div style="background:${state.swapIsGK?'rgba(239,68,68,0.07)':'rgba(77,217,224,0.08)'};border:1px solid ${state.swapIsGK?'rgba(239,68,68,0.3)':'rgba(77,217,224,0.25)'};border-radius:10px;padding:12px 16px;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between">
    <div style="display:flex;align-items:center;gap:10px">
      <span style="font-size:18px">↔</span>
      <div>
        <div style="font-size:13px;font-weight:600;color:var(--accent)">${state.lang==='es'?'Modo de sustitución activo':'Substitution mode active'}</div>
        <div style="font-size:11px;color:var(--muted)">${state.swapIsGK ? T('gkOnlyHint') : T('swapHint')}</div>
      </div>
    </div>
    <button class="cancel-swap-btn" onclick="cancelSwap()">${T('cancelSwap')}</button>
  </div>` : ''}

  <div class="row row-3-2">
    <div class="panel">
      <div class="panel-title-row">
        <div><div class="panel-eyebrow">⚽ ${T('formation')}</div><div class="panel-title">4 · 3 · 3 — Armor FC</div></div>
        <div style="display:flex;align-items:center;gap:8px">
          ${state.currentRole==='director'&&!state.swapMode?`<div style="font-size:11px;color:var(--muted)">${state.lang==='es'?'Clic ↔ para cambiar':'Click ↔ to swap'}</div>`:''}
        </div>
      </div>
      <div class="pitch-container">
        <div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:rgba(34,197,94,0.15);transform:translateX(-50%)"></div>
        <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:80px;height:80px;border-radius:50%;border:1px solid rgba(34,197,94,0.15)"></div>
        <div style="position:relative">
          <div style="text-align:center;font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:rgba(34,197,94,0.5);margin-bottom:12px">${state.lang==='es'?'⬆ Ataque':'⬆ Attack'}</div>
          ${formationRows.map((row,i)=>`
            <div class="formation-row" style="position:relative">
              ${row.ids.map(id=>playerSlot(id, false)).join('')}
            </div>
            ${i<formationRows.length-1?`<div style="height:1px;background:rgba(34,197,94,0.1);margin:4px 0"></div>`:''}`).join('')}
          <div style="text-align:center;font-size:9px;text-transform:uppercase;letter-spacing:.12em;color:rgba(34,197,94,0.5);margin-top:12px">⬇ ${state.lang==='es'?'Defensa':'Defence'}</div>
        </div>
      </div>
      <div style="display:flex;justify-content:center;gap:20px;margin-top:12px">
        ${[['green',T('optimal')],['yellow',T('atRisk')],['red',T('injured')]].map(([c,l])=>`<div style="display:flex;align-items:center;gap:6px;font-size:11px;color:var(--muted)"><div style="width:10px;height:10px;border-radius:50%;background:var(--${c})"></div>${l}</div>`).join('')}
      </div>
    </div>

    <div style="display:flex;flex-direction:column;gap:16px">
      <div class="panel" style="padding:0;overflow:hidden">
        <div style="padding:14px 18px;border-bottom:1px solid var(--border)">
          <div class="panel-eyebrow">🪑 ${T('bench')}</div>
          <div class="panel-title" style="font-size:14px;margin-top:2px">${state.lang==='es'?'Plantel completo':'Full squad'} · ${players.length} ${state.lang==='es'?'jugadores':'players'}</div>
        </div>

        <!-- Available substitutes -->
        <div style="padding:10px 14px 4px">
          <div style="font-size:9px;text-transform:uppercase;letter-spacing:.14em;color:var(--accent);margin-bottom:8px">
            ⬆ ${state.lang==='es'?'Disponibles para sustituir':'Available to substitute'} (${players.filter(p=>!state.activeLineup.includes(p.id)).length})
          </div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${players.filter(p => !state.activeLineup.includes(p.id)).map(p => {
              const isBlockedByGK = state.swapMode && state.swapIsGK && p.pos !== 'GK';
              const isValidTarget = state.swapMode && !isBlockedByGK;
              return `<div class="alert-card ${isValidTarget?'pslot bench-target':''}"
                style="cursor:${isValidTarget?'pointer':state.swapMode?'not-allowed':'default'};opacity:${isBlockedByGK?0.35:1};transition:opacity 0.2s;padding:10px 12px"
                onclick="${isValidTarget?`confirmSwap('${p.id}')`:isBlockedByGK?`showGKError()`:''}" >
                <div class="alert-header">
                  <div class="alert-player">
                    <div class="dorsal" style="border-color:var(--${p.semaforo}-ring)">#${p.dorsal}</div>
                    <div>
                      <div class="player-name">${p.name}</div>
                      <div class="player-team">${p.pos}${isBlockedByGK?' · <span style="color:var(--red);font-size:10px">'+(state.lang==='es'?'No portero':'Not GK')+'</span>':''}</div>
                    </div>
                  </div>
                  ${badge(p.semaforo)}
                </div>
                ${isValidTarget?`<div style="margin-top:5px;text-align:center"><span style="font-size:11px;color:var(--accent)">↔ ${state.lang==='es'?'Tap para sustituir':'Tap to substitute'}</span></div>`:''}
                ${isBlockedByGK?`<div style="margin-top:5px;text-align:center;font-size:10px;color:var(--red)">⛔ ${state.lang==='es'?'Solo porteros':'GK only'}</div>`:''}
              </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Starters reference -->
        <div style="padding:10px 14px 14px;border-top:1px solid var(--border);margin-top:8px">
          <div style="font-size:9px;text-transform:uppercase;letter-spacing:.14em;color:var(--muted);margin-bottom:8px">
            ⚽ ${state.lang==='es'?'En el once titular':'In starting lineup'} (${state.activeLineup.length})
          </div>
          <div style="display:flex;flex-direction:column;gap:4px">
            ${state.activeLineup.map(id => {
              const p = players.find(x => x.id === id);
              if (!p) return '';
              return `<div style="display:flex;align-items:center;justify-content:space-between;padding:7px 10px;border-radius:8px;background:rgba(255,255,255,0.03);border:1px solid var(--border);opacity:0.7">
                <div style="display:flex;align-items:center;gap:8px">
                  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--muted);width:20px;text-align:center">#${p.dorsal}</div>
                  <div>
                    <div style="font-size:12px;font-weight:500">${p.name}</div>
                    <div style="font-size:10px;color:var(--muted)">${p.pos}</div>
                  </div>
                </div>
                ${badge(p.semaforo)}
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-eyebrow">📊 ${state.lang==='es'?'Desglose de eficiencia':'Efficiency breakdown'}</div>
        <div class="panel-title" style="margin-bottom:16px;font-size:15px">${efficiency}% ${T('teamEff')}</div>
        ${[
          {label:T('optimal'), count:lineupStats.green,  pts:100, color:'var(--green)',  fill:'fill-green'},
          {label:T('atRisk'),  count:lineupStats.yellow, pts:60,  color:'var(--yellow)', fill:'fill-yellow'},
          {label:T('injured'), count:lineupStats.red,    pts:0,   color:'var(--red)',    fill:'fill-red'},
        ].map(r=>`
          <div class="status-row">
            <div class="status-row-header">
              <span style="font-size:12px">${r.label} × ${r.count}</span>
              <span style="font-size:11px;color:${r.color};font-family:'JetBrains Mono',monospace">${r.pts} pts</span>
            </div>
            <div class="progress-bar thin"><div class="progress-fill ${r.fill}" style="width:${r.count===0?0:Math.round(r.count/11*100)}%"></div></div>
          </div>`).join('')}
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);font-size:11px;color:var(--muted)">
          ${state.lang==='es'?'Verde=100pts · Amarillo=60pts · Rojo=0pts':'Green=100pts · Yellow=60pts · Red=0pts'}
        </div>
        <div style="margin-top:8px;padding:8px;border-radius:8px;background:${hasGK?'rgba(34,197,94,0.08)':'rgba(239,68,68,0.1)'};border:1px solid ${hasGK?'rgba(34,197,94,0.25)':'rgba(239,68,68,0.3)'}">
          <span style="font-size:11px;font-weight:600;color:${hasGK?'var(--green)':'var(--red)'}">
            ${hasGK?'✅ '+(state.lang==='es'?'Portero en el once':'Goalkeeper in lineup'):'⛔ '+(state.lang==='es'?'Sin portero — formación incompleta':'No goalkeeper — incomplete formation')}
          </span>
        </div>
      </div>
    </div>
  </div>
  </div>`;
}

export function clickSlot(id) {
  if (state.currentRole !== 'director') return;
  if (state.swapMode && state.swapFromId === id) { cancelSwap(); return; }
  const p = players.find(x => x.id === id);
  state.swapIsGK = p && p.pos === 'GK';
  state.swapMode = true;
  state.swapFromId = id;
  if (typeof window.renderMainContent === 'function') window.renderMainContent();
}

export function confirmSwap(bancaId) {
  if (!state.swapMode) return;
  const bancaPlayer = players.find(p => p.id === bancaId);
  if (state.swapIsGK && (!bancaPlayer || bancaPlayer.pos !== 'GK')) {
    showGKError();
    return;
  }
  const idx = state.activeLineup.indexOf(state.swapFromId);
  if (idx >= 0) {
    state.activeLineup[idx] = bancaId;
  }
  state.swapMode = false;
  state.swapFromId = null;
  state.swapIsGK = false;
  if (typeof window.renderMainContent === 'function') window.renderMainContent();
}

export function showGKError() {
  document.querySelectorAll('.gk-toast').forEach(el => el.remove());
  const toast = document.createElement('div');
  toast.className = 'gk-toast';
  toast.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%) translateY(-20px);z-index:9999;background:linear-gradient(135deg,rgba(239,68,68,0.98),rgba(180,30,30,0.98));color:#fff;padding:14px 22px;border-radius:12px;font-size:13px;font-weight:600;box-shadow:0 8px 32px rgba(0,0,0,0.4);max-width:420px;text-align:center;border:1px solid rgba(255,255,255,0.15);transition:all 0.3s ease;opacity:0';
  toast.textContent = T('gkError');
  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
  document.querySelectorAll('.pring.swap-from').forEach(el => {
    el.style.animation = 'none';
    requestAnimationFrame(() => { el.style.animation = 'ring-pulse-red 0.4s ease 3'; });
  });
}

export function cancelSwap() {
  state.swapMode = false;
  state.swapFromId = null;
  state.swapIsGK = false;
  if (typeof window.renderMainContent === 'function') window.renderMainContent();
}
