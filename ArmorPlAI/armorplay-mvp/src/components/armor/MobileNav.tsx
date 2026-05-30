// ─── ArmorPlay AI · MobileNav (role-aware) ───────────────────────────
import { Link, useRouterState } from '@tanstack/react-router';
import { LayoutDashboard, Users, Upload, UserRound, Shield, Activity } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/i18n';

export function MobileNav() {
  const path = useRouterState({ select: (r) => r.location.pathname });
  const { role, language } = useAuth();

  const itemsByRole = {
    director: [
      { to: '/dashboard',    icon: LayoutDashboard, labelKey: 'nav.dashboard'   },
      { to: '/team',         icon: Users,           labelKey: 'nav.players'     },
      { to: '/alineaciones', icon: Shield,          labelKey: 'nav.lineups'     },
      { to: '/carga-excel',  icon: Upload,          labelKey: 'nav.uploadExcel' },
    ],
    preparador: [
      { to: '/preparador',   icon: Activity,        labelKey: 'nav.physicalDashboard' },
      { to: '/team',         icon: Users,           labelKey: 'nav.players'           },
      { to: '/carga-excel',  icon: Upload,          labelKey: 'nav.uploadExcel'       },
    ],
    jugador: [
      { to: '/mi-estado',    icon: UserRound,       labelKey: 'nav.myStatus' },
    ],
  };

  const items = role ? (itemsByRole[role] ?? []) : [];

  if (items.length === 0) return null;

  return (
    <nav className="lg:hidden fixed bottom-3 left-3 right-3 z-40 glass-strong rounded-2xl p-1.5 flex items-center justify-around shadow-[0_20px_60px_-20px_rgba(0,0,0,0.6)]">
      {items.map(({ to, icon: Icon, labelKey }) => {
        const active = path === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex-1 flex flex-col items-center gap-0.5 py-2 rounded-xl text-[10px] transition ${
              active
                ? 'bg-gradient-to-br from-primary/30 to-accent/10 text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            <Icon className="h-4 w-4" />
            {t(language, labelKey)}
          </Link>
        );
      })}
    </nav>
  );
}
