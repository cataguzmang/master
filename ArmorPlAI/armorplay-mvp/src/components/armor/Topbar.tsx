// ─── ArmorPlay AI · Topbar ───────────────────────────────────────────
import { Bell, Search } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Logo } from './Logo';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/i18n';

export function Topbar({ title, subtitle }: { title: string; subtitle?: string }) {
  const { user, language, setLanguage, logout } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-hairline bg-background/70 backdrop-blur-xl">
      <div className="flex items-center gap-4 px-4 md:px-8 h-16">
        <div className="lg:hidden">
          <Logo />
        </div>
        <div className="hidden lg:flex flex-col">
          <h1 className="text-sm font-semibold tracking-tight">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <div className="hidden md:flex items-center gap-2 rounded-lg glass px-3 py-1.5 w-60 text-sm text-muted-foreground">
            <Search className="h-4 w-4" />
            <span className="flex-1 text-xs">{t(language, 'players.search')}</span>
          </div>

          {/* Language toggle */}
          <button
            onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
            className="h-9 px-2.5 rounded-lg glass text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition"
            title={t(language, 'common.language')}
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>

          {/* Notifications */}
          <button className="relative h-9 w-9 rounded-lg glass flex items-center justify-center hover:bg-white/[0.06] transition">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-risk-high animate-pulse" />
          </button>

          {/* User chip */}
          <div className="h-9 px-2 pr-3 rounded-lg glass flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-accent to-primary text-[10px] flex items-center justify-center font-semibold text-primary-foreground">
              {user?.iniciales ?? '??'}
            </div>
            <div className="hidden md:flex flex-col leading-tight">
              <span className="text-xs font-medium">{user?.nombre ?? 'Usuario'}</span>
              <span className="text-[10px] text-muted-foreground">
                {user?.rol === 'director'
                  ? t(language, 'roles.director')
                  : user?.rol === 'preparador'
                    ? t(language, 'roles.preparador')
                    : t(language, 'roles.jugador')}
              </span>
            </div>
          </div>

          {/* Logout */}
          <Link
            to="/"
            onClick={logout}
            className="hidden md:inline text-[11px] text-muted-foreground hover:text-foreground transition"
          >
            {t(language, 'nav.logout')}
          </Link>
        </div>
      </div>

      {/* Mobile title */}
      <div className="lg:hidden px-4 pb-3">
        <h1 className="text-base font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </header>
  );
}
