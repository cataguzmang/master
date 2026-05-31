/* ============================================================
   LOGIN — Role selection, login flow, logout
   ============================================================ */

import { state } from '../state.js';
import { T } from '../lib/i18n.js';

export function selectRole(role) {
  state.currentRole = role;
  ['director','preparador','jugador'].forEach(r => {
    const c = document.getElementById('card-' + r);
    c.classList.remove('selected');
    const ex = c.querySelector('.role-check');
    if (ex) ex.remove();
  });
  const card = document.getElementById('card-' + role);
  card.classList.add('selected');
  card.insertAdjacentHTML('beforeend', '<div class="role-check">✓</div>');
  document.getElementById('player-select-wrap').style.display = role === 'jugador' ? 'block' : 'none';
  if (role !== 'jugador') state.selectedPlayerId = null;
  updateLoginBtn();
}

export function updateLoginBtn() {
  const btn = document.getElementById('login-btn');
  const txt = document.getElementById('login-btn-text');
  if (!state.currentRole) { btn.disabled = true; txt.textContent = T('continueBtn'); return; }
  if (state.currentRole === 'jugador') {
    const sel = document.getElementById('player-select').value;
    btn.disabled = !sel;
    state.selectedPlayerId = sel || null;
    txt.textContent = sel ? T('enterAs') + ' ' + T('jugadorName') : T('continueBtn');
    document.getElementById('player-select').onchange = function() {
      state.selectedPlayerId = this.value;
      updateLoginBtn();
    };
  } else {
    btn.disabled = false;
    const names = {director: T('directorName'), preparador: T('preparadorName')};
    txt.textContent = T('enterAs') + ' ' + names[state.currentRole];
  }
}

export function handleLogin() {
  const btn = document.getElementById('login-btn');
  if (btn.disabled) return;
  document.getElementById('login-btn-text').textContent = state.lang === 'es' ? 'Entrando...' : 'Loading...';
  document.getElementById('login-arrow').textContent = '';
  btn.disabled = true;
  setTimeout(() => {
    if (state.currentRole === 'jugador') {
      window.showScreen('screen-player');
      window.renderPlayerView();
    } else {
      state.activeNav = state.currentRole === 'preparador' ? 'preparador' : 'dashboard';
      window.showScreen('screen-dashboard');
      window.renderSidebar();
      window.renderTopbar();
      window.renderMainContent();
    }
  }, 500);
}

export function goToLogin() {
  state.currentRole = null;
  state.selectedPlayerId = null;
  state.swapMode = false;
  state.swapFromId = null;
  state.activeLineup = [...window._titulares0];

  window.showScreen('screen-login');
  const btn = document.getElementById('login-btn');
  btn.disabled = true;
  document.getElementById('login-btn-text').textContent = T('continueBtn');
  document.getElementById('login-arrow').textContent = '→';
  ['director','preparador','jugador'].forEach(r => {
    const c = document.getElementById('card-' + r);
    c.classList.remove('selected');
    const ex = c.querySelector('.role-check');
    if (ex) ex.remove();
  });
  document.getElementById('player-select-wrap').style.display = 'none';
}
