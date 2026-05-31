/* ============================================================
   PLAYER VIEW — Mi Estado (single player view)
   ============================================================ */

import { state, players } from '../state.js';
import { T } from '../lib/i18n.js';
import { loadColor } from '../lib/helpers.js';

export function renderPlayerView() {
  const p = players.find(x => x.id === state.selectedPlayerId) || players[9];
  const sColor   = {green:'var(--green)', yellow:'var(--yellow)', red:'var(--red)'};
  const bgMap    = {green:'rgba(34,197,94,0.07)', yellow:'rgba(245,158,11,0.07)', red:'rgba(239,68,68,0.07)'};
  const borderMap = {green:'rgba(34,197,94,0.25)', yellow:'rgba(245,158,11,0.25)', red:'rgba(239,68,68,0.25)'};
  const semIcon  = {green:'✅', yellow:'⚠️', red:'🔴'};
  const semTextLarge = {
    green:  state.lang==='es'?'Estado Óptimo':'Optimal State',
    yellow: state.lang==='es'?'En Riesgo':'At Risk',
    red:    state.lang==='es'?'Lesionado':'Injured',
  };

  const riskReasonsList = [];
  if (p.fatiga === 'alta') riskReasonsList.push(state.lang==='es'?'Fatiga alta detectada':'High fatigue detected');
  if (p.pain)              riskReasonsList.push(state.lang==='es'?'Dolor o molestia reportada':'Pain or discomfort reported');
  if (p.load > 80)         riskReasonsList.push(state.lang==='es'?`Carga física elevada (${p.load})`:`High physical load (${p.load})`);
  if (p.sprints > 22)      riskReasonsList.push(state.lang==='es'?`Sprints excesivos (${p.sprints})`:`Excessive sprints (${p.sprints})`);
  if (p.lesion)            riskReasonsList.push(p.lesion);

  document.getElementById('player-content').innerHTML = `
    <div class="animate-in">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:36px;height:36px;border-radius:10px;background:linear-gradient(135deg,var(--primary),var(--accent));display:flex;align-items:center;justify-content:center;font-size:18px">⚡</div>
          <span style="font-family:'Space Grotesk',sans-serif;font-weight:700">ArmorPlay AI</span>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button class="btn-glass" onclick="toggleLang()"><span id="player-lang-btn">${state.lang==='es'?'EN':'ES'}</span></button>
          <button class="logout-btn" onclick="goToLogin()">${T('logout')}</button>
        </div>
      </div>

      <div style="border-radius:16px;background:${bgMap[p.semaforo]};border:1.5px solid ${borderMap[p.semaforo]};padding:24px;margin-bottom:16px">
        <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px">
          <div style="width:60px;height:60px;border-radius:14px;background:var(--surface3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:20px;font-weight:700;border:2.5px solid ${sColor[p.semaforo]};box-shadow:0 0 20px ${sColor[p.semaforo]}40;flex-shrink:0">#${p.dorsal}</div>
          <div>
            <div style="font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700">${p.fullName}</div>
            <div style="font-size:13px;color:var(--muted);margin-top:2px">${p.pos} · Armor FC</div>
          </div>
        </div>

        <div style="text-align:center;padding:20px 0">
          <div class="sem-circle ${p.semaforo}" style="margin-bottom:12px">
            <div style="font-size:28px">${semIcon[p.semaforo]}</div>
          </div>
          <div style="font-family:'Space Grotesk',sans-serif;font-size:22px;font-weight:700;color:${sColor[p.semaforo]};margin-bottom:4px">${semTextLarge[p.semaforo]}</div>
          <div style="font-size:11px;color:var(--muted)">${state.lang==='es'?'Última actualización: 2026-05-21':'Last update: 2026-05-21'}</div>
        </div>

        <div style="padding:14px;border-radius:10px;background:rgba(0,0,0,0.25);margin-top:4px">
          <div style="font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:var(--muted);margin-bottom:6px">${T('yourRec')}</div>
          <div style="font-size:13px;line-height:1.6">${p.rec}</div>
        </div>
      </div>

      <div style="border-radius:14px;background:var(--surface);border:1px solid var(--border);padding:18px;margin-bottom:12px">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:.12em;color:var(--muted);margin-bottom:14px">${T('myMetrics')}</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
          <div class="metric-box">
            <div class="metric-val" style="color:${loadColor(p.load)}">${p.load}</div>
            <div class="metric-lbl">${T('load')}</div>
          </div>
          <div class="metric-box">
            <div class="metric-val fatigue-${p.fatiga}" style="font-size:15px;padding-top:4px">${p.fatiga.charAt(0).toUpperCase()+p.fatiga.slice(1)}</div>
            <div class="metric-lbl">${T('fatigue')}</div>
          </div>
          <div class="metric-box">
            <div class="metric-val" style="color:${p.sprints>22?'var(--red)':p.sprints>16?'var(--yellow)':'var(--muted)'}">${p.sprints}</div>
            <div class="metric-lbl">Sprints</div>
          </div>
          <div class="metric-box">
            <div class="metric-val" style="color:var(--muted);font-size:14px">${p.minutes}</div>
            <div class="metric-lbl">${T('minutes')}</div>
          </div>
        </div>
      </div>

      ${riskReasonsList.length > 0 ? `
      <div style="border-radius:14px;background:rgba(245,158,11,0.06);border:1px solid rgba(245,158,11,0.2);padding:16px;margin-bottom:12px">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:var(--yellow);margin-bottom:10px">⚠ ${T('riskReasons')}</div>
        ${riskReasonsList.map(r=>`<div style="display:flex;gap:8px;margin-bottom:6px;font-size:12px;color:var(--muted)"><span style="color:var(--yellow);flex-shrink:0">•</span>${r}</div>`).join('')}
      </div>` : ''}

      ${p.obs ? `
      <div style="border-radius:14px;background:rgba(108,143,255,0.06);border:1px solid rgba(108,143,255,0.2);padding:16px">
        <div style="font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:var(--primary);margin-bottom:8px">💬 ${T('coachNote')}</div>
        <div style="font-size:13px;color:var(--muted);line-height:1.6">${p.obs}</div>
      </div>` : ''}
    </div>
  `;
}
