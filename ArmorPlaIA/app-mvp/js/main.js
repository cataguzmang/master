/* ============================================================
   MAIN — Entry point: orchestrates all modules, exposes globals
   ============================================================ */

import { state, titulares0 } from './state.js';
import { T } from './lib/i18n.js';
import { renderSidebar, renderTopbar, navTo } from './shell/shell.js';
import { selectRole, updateLoginBtn, handleLogin, goToLogin } from './pages/login.js';
import { buildDashboard } from './pages/dashboard.js';
import { buildPreparadorFull } from './pages/preparador.js';
import { buildPlayersTable, filterChange, searchChange, toggleExpand } from './pages/players.js';
import { buildLineupsModule, clickSlot, confirmSwap, showGKError, cancelSwap } from './pages/lineups.js';
import { buildUploadFull, processExcelFile, handleDrop, showUploadResult, simulateDownload } from './pages/upload.js';
import { buildHistoryFull, historyFilterChange } from './pages/history.js';
import { buildReportsFull } from './pages/reports.js';
import { renderPlayerView } from './pages/player-view.js';

// ── Screen router ──────────────────────────────────────────

export function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── Content router ─────────────────────────────────────────

export function renderMainContent() {
  const el = document.getElementById('main-content');
  if (!el) return;
  if (state.activeNav === 'dashboard')    el.innerHTML = buildDashboard();
  else if (state.activeNav === 'preparador') el.innerHTML = buildPreparadorFull();
  else if (state.activeNav === 'players')    el.innerHTML = buildPlayersTable();
  else if (state.activeNav === 'lineups')    el.innerHTML = buildLineupsModule();
  else if (state.activeNav === 'upload')     el.innerHTML = buildUploadFull();
  else if (state.activeNav === 'history')    el.innerHTML = buildHistoryFull();
  else if (state.activeNav === 'reports')    el.innerHTML = buildReportsFull();
  else el.innerHTML = buildGenericStub(state.activeNav);

  requestAnimationFrame(() => {
    el.classList.remove('animate-in');
    void el.offsetWidth;
    el.classList.add('animate-in');
  });
}

function buildGenericStub(screen) {
  return `<div class="animate-in"><div class="panel" style="text-align:center;padding:64px 32px;background:rgba(108,143,255,0.04);border-color:rgba(108,143,255,0.2)">
    <div style="font-size:48px;margin-bottom:16px">🏗️</div>
    <div class="panel-title" style="margin-bottom:8px">${screen}</div>
    <div style="color:var(--muted);font-size:13px">${state.lang==='es'?'Módulo en desarrollo.':'Module in development.'}</div>
  </div></div>`;
}

// ── Language toggle ─────────────────────────────────────────

export function toggleLang() {
  state.lang = state.lang === 'es' ? 'en' : 'es';
  refreshAllText();
}

export function refreshAllText() {
  ['lang-btn','topbar-lang-btn'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = state.lang === 'es' ? 'EN' : 'ES';
  });
  const playerLangBtn = document.getElementById('player-lang-btn');
  if (playerLangBtn) playerLangBtn.textContent = state.lang === 'es' ? 'EN' : 'ES';

  const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  setTxt('login-title', T('loginTitle'));
  setTxt('login-sub', T('loginSub'));
  setTxt('hero-secure-text', T('heroSecure'));
  setTxt('stat-precision', T('statPrecision'));
  setTxt('stat-clubs', T('statClubs'));
  setTxt('stat-avoided', T('statAvoided'));
  setTxt('role-director-name', T('directorName'));
  setTxt('role-director-desc', T('directorDesc'));
  setTxt('role-preparador-name', T('preparadorName'));
  setTxt('role-preparador-desc', T('preparadorDesc'));
  setTxt('role-jugador-name', T('jugadorName'));
  setTxt('role-jugador-desc', T('jugadorDesc'));
  setTxt('player-select-label', T('playerLabel'));
  setTxt('login-note', T('loginNote'));

  const ht = document.getElementById('hero-title');
  if (ht) {
    const lines = state.lang === 'es'
      ? ['Prevén lesiones', 'antes de que ocurran.']
      : ['Predict injuries', 'before they happen.'];
    ht.innerHTML = lines[0] + '<br/><span style="background:linear-gradient(90deg,var(--primary),var(--accent));-webkit-background-clip:text;-webkit-text-fill-color:transparent">' + lines[1] + '</span>';
  }

  updateLoginBtn();

  if (state.currentRole && state.currentRole !== 'jugador') {
    renderSidebar();
    renderTopbar();
    renderMainContent();
  }
  if (state.currentRole === 'jugador') renderPlayerView();

  const lb = document.getElementById('logout-btn');
  if (lb) lb.textContent = T('logout');
}

// ── Expose globals (called from inline HTML event handlers) ──

window._titulares0 = titulares0;

window.showScreen        = showScreen;
window.renderMainContent = renderMainContent;
window.renderSidebar     = renderSidebar;
window.renderTopbar      = renderTopbar;
window.renderPlayerView  = renderPlayerView;
window.toggleLang        = toggleLang;
window.refreshAllText    = refreshAllText;

// login
window.selectRole    = selectRole;
window.handleLogin   = handleLogin;
window.goToLogin     = goToLogin;

// navigation
window.navTo         = navTo;

// players
window.filterChange  = filterChange;
window.searchChange  = searchChange;
window.toggleExpand  = toggleExpand;

// lineups
window.clickSlot     = clickSlot;
window.confirmSwap   = confirmSwap;
window.showGKError   = showGKError;
window.cancelSwap    = cancelSwap;

// upload
window.processExcelFile  = processExcelFile;
window.handleDrop        = handleDrop;
window.showUploadResult  = showUploadResult;
window.simulateDownload  = simulateDownload;

// history
window.historyFilterChange = historyFilterChange;

// ── Init ────────────────────────────────────────────────────

refreshAllText();
