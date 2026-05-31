/* ============================================================
   HELPERS — Pure utility functions (badge, load bar, eff, etc.)
   ============================================================ */

import { state, players } from '../state.js';
import { T } from './i18n.js';

const semLabelEs = {green:'Óptimo',yellow:'En riesgo',red:'Lesionado'};
const semLabelEn = {green:'Optimal',yellow:'At Risk',red:'Injured'};
export const semLabel = s => state.lang === 'es' ? semLabelEs[s] : semLabelEn[s];

export function badge(color, text) {
  const lbl = text || semLabel(color);
  return `<span class="badge ${color}"><span class="badge-dot dot-${color}"></span>${lbl}</span>`;
}

export function loadColor(v) {
  return v > 80 ? 'var(--red)' : v > 60 ? 'var(--yellow)' : 'var(--green)';
}

export function loadBarHtml(v) {
  return `<div class="load-bar-wrap"><div class="load-bar"><div class="load-fill" style="width:${v}%;background:${loadColor(v)}"></div></div><span style="font-size:11px;color:var(--muted);font-family:'JetBrains Mono',monospace">${v}</span></div>`;
}

export function eff(ids) {
  const scores = {green:100, yellow:60, red:0};
  const vals = ids.map(id => {
    const p = players.find(pl => pl.id === id);
    return p ? scores[p.semaforo] : 100;
  });
  return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
}

export function effColor(v) {
  return v >= 80 ? 'var(--green)' : v >= 55 ? 'var(--yellow)' : 'var(--red)';
}

export function getStats() {
  return {
    total:   players.length,
    optimal: players.filter(p => p.semaforo === 'green').length,
    atRisk:  players.filter(p => p.semaforo === 'yellow').length,
    injured: players.filter(p => p.semaforo === 'red').length,
  };
}

export function pct(n, t) {
  return Math.round(n / t * 100);
}

export function organiseFormation(ids) {
  const byPos = pos => ids.filter(id => {
    const p = players.find(x => x.id === id);
    return p && pos.includes(p.pos);
  });
  return {
    gk:  byPos(['GK']),
    def: byPos(['CB', 'RB', 'LB']),
    mid: byPos(['DM', 'CM']),
    att: byPos(['ST', 'RW', 'LW']),
  };
}
