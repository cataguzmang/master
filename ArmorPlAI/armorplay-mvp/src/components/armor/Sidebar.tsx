// ─── ArmorPlay AI · Sidebar (role-aware) ─────────────────────────────
import { Link, useRouterState } from '@tanstack/react-router';
import {
  LayoutDashboard, Users, UserRound, LineChart, Bell, Settings, LifeBuoy,
  Upload, History, Dumbbell, Shield, Activity,
} from 'lucide-react';
import { Logo } from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/i18n';
import type { Role } from '@/contexts/AuthContext';

interface NavItem {
  to: string;
  labelKey: string;
  icon: React.ElementType;
  roles: Role[];
}

const navItems: NavItem[] = [
  { to: '/dashboard',         labelKey: 'nav.dashboard',         icon: LayoutDashboard, roles: ['director', 'preparador'] },
  { to: '/preparador',        labelKey: 'nav.physicalDashboard',  icon: Activity,        roles: ['preparador', 'director']  },
  { to: '/team',              labelKey: 'nav.players',            icon: Users,           roles: ['director', 'preparador']  },
  { to: '/alineaciones',      labelKey: 'nav.lineups',            icon: Shield,          roles: ['director', 'preparador']  },
  { to: '/carga-excel',       labelKey: 'nav.uploadExcel',        icon: Upload,          roles: ['director', 'preparador']  },
  { to: '/historial-cargas',  labelKey: 'nav.uploadHistory',      icon: History,         roles: ['director', 'preparador']  },
  { to: '/reportes',          labelKey: 'nav.reports',            icon: LineChart,       roles: ['director', 'preparador']  },
  { to: '/mi-estado',         labelKey: 'nav.myStatus',           icon: UserRound,       roles: ['jugador']                 },
];

const roleLabelMap: Record<Role, string> = {
  director:   'Director de Equipo',
  preparador: 'Preparador Físico',
  jugador:    'Jugador',
};

export function ArmorSidebar() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const { role, user, language } = useAuth();

  const visibleItems = navItems.filter(item => role && item.roles.includes(role));

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-hairline bg-sidebar/60 backdrop-blur-xl">
      {/* Logo */}
      <div className="px-5 h-16 flex items-center border-b border-hairline">
        <Logo />
      </div>

      {/* Navigation */}
      <div className="px-3 py-4 flex-1 overflow-y-auto scrollbar-thin">
        <div className="px-2 pb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {t(language, 'nav.workspace')}
        </div>
        <nav className="flex flex-col gap-0.5">
          {visibleItems.map(({ to, labelKey, icon: Icon }) => {
            const active = path === to || (to !== '/dashboard' && to !== '/mi-estado' && path.startsWith(to));
            return (
              <Link
                key={to}
                to={to}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  active
                    ? 'bg-gradient-to-r from-primary/20 to-accent/5 text-foreground ring-1 ring-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/[0.03]'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />
                )}
                <Icon className="h-4 w-4" />
                <span>{t(language, labelKey)}</span>
              </Link>
            );
          })}
        </nav>

        {/* Account section */}
        <div className="px-2 pt-6 pb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {t(language, 'nav.account')}
        </div>
        <nav className="flex flex-col gap-0.5">
          {[
            { label: t(language, 'nav.alerts'),   icon: Bell     },
            { label: t(language, 'nav.settings'), icon: Settings },
            { label: t(language, 'nav.support'),  icon: LifeBuoy },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-white/[0.03] transition-colors text-left"
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      {/* User card */}
      <div className="m-3 rounded-xl p-3 glass relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/30 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-xs font-semibold text-primary-foreground flex-shrink-0">
            {user?.iniciales ?? '??'}
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-medium truncate">{user?.nombre ?? 'Usuario'}</div>
            <div className="text-[10px] text-muted-foreground truncate">
              {role ? roleLabelMap[role] : ''}
            </div>
          </div>
          <Dumbbell className="h-3.5 w-3.5 text-muted-foreground ml-auto flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
