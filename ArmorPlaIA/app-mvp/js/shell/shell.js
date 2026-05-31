/* ============================================================
   SHELL — Sidebar, topbar, navigation
   ============================================================ */

import { state } from '../state.js';
import { T } from '../lib/i18n.js';

const navByRole = {
  director:[
    {icon:'📊', key:'navDashboard', screen:'dashboard'},
    {icon:'💪', key:'navPhysical',  screen:'preparador'},
    {icon:'👥', key:'navPlayers',   screen:'players'},
    {icon:'🛡️', key:'navLineups',   screen:'lineups'},
    {icon:'📤', key:'navUpload',    screen:'upload'},
    {icon:'📋', key:'navHistory',   screen:'history'},
    {icon:'📈', key:'navReports',   screen:'reports'},
  ],
  preparador:[
    {icon:'💪', key:'navPhysical',  screen:'preparador'},
    {icon:'👥', key:'navPlayers',   screen:'players'},
    {icon:'📤', key:'navUpload',    screen:'upload'},
    {icon:'📋', key:'navHistory',   screen:'history'},
    {icon:'📈', key:'navReports',   screen:'reports'},
  ],
};

export function renderSidebar() {
  const nav = navByRole[state.currentRole] || [];
  const userNames    = {director:'Carlos Mendoza', preparador:'Ana García'};
  const userRoles    = {director:T('directorBadge'), preparador:T('preparadorBadge')};
  const userInitials = {director:'CM', preparador:'AG'};

  const sbWorkspace = document.getElementById('sb-workspace');
  if (sbWorkspace) sbWorkspace.textContent = T('workspace');

  const sidebarNav = document.getElementById('sidebar-nav');
  if (sidebarNav) {
    sidebarNav.innerHTML = nav.map(item => `
      <div class="nav-item ${state.activeNav === item.screen ? 'active' : ''}" onclick="navTo('${item.screen}')">
        <span style="font-size:14px">${item.icon}</span><span>${T(item.key)}</span>
      </div>`).join('');
  }

  const sidebarUser = document.getElementById('sidebar-user');
  if (sidebarUser) {
    sidebarUser.innerHTML = `
      <div class="avatar">${userInitials[state.currentRole] || '??'}</div>
      <div>
        <div class="user-name">${userNames[state.currentRole] || ''}</div>
        <div class="user-role">${userRoles[state.currentRole] || ''}</div>
      </div>`;
  }
}

export function renderTopbar() {
  const userNames    = {director:'Carlos Mendoza', preparador:'Ana García'};
  const userRoles    = {director:T('directorBadge'), preparador:T('preparadorBadge')};
  const userInitials = {director:'CM', preparador:'AG'};
  const titles = {
    dashboard:  T('navDashboard'),
    preparador: T('navPhysical'),
    players:    T('navPlayers'),
    lineups:    T('navLineups'),
    upload:     T('navUpload'),
    history:    T('navHistory'),
    reports:    T('navReports'),
  };

  const topbarTitle = document.getElementById('topbar-title');
  if (topbarTitle) topbarTitle.textContent = titles[state.activeNav] || state.activeNav;

  const topbarSub = document.getElementById('topbar-sub');
  if (topbarSub) topbarSub.textContent = 'Armor FC · 2026-05-21';

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) logoutBtn.textContent = T('logout');

  const chip = document.getElementById('topbar-user-chip');
  if (chip) {
    chip.innerHTML = `
      <div class="chip-avatar">${userInitials[state.currentRole] || '??'}</div>
      <div>
        <div class="chip-name">${userNames[state.currentRole] || ''}</div>
        <div class="chip-role">${userRoles[state.currentRole] || ''}</div>
      </div>`;
  }
}

export function navTo(screen) {
  state.activeNav = screen;
  state.swapMode = false;
  state.swapFromId = null;
  renderSidebar();

  const titles = {
    dashboard:  T('navDashboard'),
    preparador: T('navPhysical'),
    players:    T('navPlayers'),
    lineups:    T('navLineups'),
    upload:     T('navUpload'),
    history:    T('navHistory'),
    reports:    T('navReports'),
  };
  const topbarTitle = document.getElementById('topbar-title');
  if (topbarTitle) topbarTitle.textContent = titles[screen] || screen;

  // Delegate to main renderer (set on window by main.js)
  if (typeof window.renderMainContent === 'function') window.renderMainContent();
}
