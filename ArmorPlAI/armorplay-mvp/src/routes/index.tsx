// ─── ArmorPlay AI · Login ─────────────────────────────────────────────
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { Shield, Sparkles, ArrowRight, Users, Activity, UserRound, ChevronDown } from 'lucide-react';
import heroImg from '@/assets/login-hero.jpg';
import { Logo } from '@/components/armor/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { t } from '@/lib/i18n';
import { mockUsers } from '@/lib/mockData';
import type { Role } from '@/contexts/AuthContext';

export const Route = createFileRoute('/')({ component: LoginPage });

const roleConfig: Record<Role, { icon: React.ElementType; color: string; glow: string; border: string }> = {
  director:   { icon: Users,      color: 'from-primary/20 to-accent/5',   glow: 'shadow-[0_0_20px_oklch(0.72_0.18_250/0.3)]',  border: 'border-primary/40'  },
  preparador: { icon: Activity,   color: 'from-accent/20 to-violet/5',    glow: 'shadow-[0_0_20px_oklch(0.78_0.16_210/0.3)]',  border: 'border-accent/40'   },
  jugador:    { icon: UserRound,  color: 'from-violet/20 to-primary/5',   glow: 'shadow-[0_0_20px_oklch(0.7_0.18_295/0.3)]',   border: 'border-violet/40'   },
};

function LoginPage() {
  const navigate = useNavigate();
  const { login, language, setLanguage } = useAuth();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const roles: Role[] = ['director', 'preparador', 'jugador'];

  // Users for the selected role
  const roleUsers = mockUsers.filter(u => u.rol === selectedRole);

  const handleContinue = async () => {
    if (!selectedRole) return;

    let userToLogin = mockUsers.find(u => u.id === selectedUserId);

    // If no specific user selected, pick the first of that role
    if (!userToLogin) {
      userToLogin = mockUsers.find(u => u.rol === selectedRole);
    }
    if (!userToLogin) return;

    setIsLoading(true);
    // Simulate brief loading
    await new Promise(r => setTimeout(r, 600));
    login(userToLogin);

    if (selectedRole === 'director') navigate({ to: '/dashboard' });
    else if (selectedRole === 'preparador') navigate({ to: '/preparador' });
    else navigate({ to: '/mi-estado' });
  };

  const stats = [
    { k: t(language, 'login.stats.precision'), v: '88.4%' },
    { k: t(language, 'login.stats.clubs'),     v: '32'    },
    { k: t(language, 'login.stats.avoided'),   v: '1,240+' },
  ];

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* ── Left hero ── */}
      <div className="relative hidden lg:block overflow-hidden">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          width={1080}
          height={1920}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="relative h-full flex flex-col p-10">
          <Logo />

          <div className="mt-auto max-w-lg">
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-muted-foreground mb-5">
              <Sparkles className="h-3 w-3 text-accent" />
              ArmorPlay AI · MVP v1.0
            </div>
            <h2 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight">
              {t(language, 'login.heroTitle').split('\n')[0]} <br />
              <span className="gradient-text">{t(language, 'login.heroTitle').split('\n')[1]}</span>
            </h2>
            <p className="mt-5 text-muted-foreground text-[15px] leading-relaxed">
              {t(language, 'login.heroSub')}
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {stats.map((s) => (
                <div key={s.k} className="rounded-xl glass p-3">
                  <div className="font-display text-lg">{s.v}</div>
                  <div className="text-[11px] text-muted-foreground">{s.k}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-[11px] text-muted-foreground flex items-center gap-2">
            <Shield className="h-3 w-3" /> ArmorPlay AI · {language === 'es' ? 'Datos seguros y privados' : 'Secure and private data'}
          </div>
        </div>
      </div>

      {/* ── Right — role selector ── */}
      <div className="relative flex items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Logo />
        </div>

        {/* Language toggle */}
        <button
          onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
          className="absolute top-6 right-6 h-8 px-3 rounded-lg glass text-xs font-semibold text-muted-foreground hover:text-foreground transition"
        >
          {language === 'es' ? 'EN' : 'ES'}
        </button>

        <div className="w-full max-w-sm mt-8 lg:mt-0">
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {t(language, 'login.welcome')}
          </h1>
          <p className="text-sm text-muted-foreground mt-1.5">
            {t(language, 'login.subtitle')}
          </p>

          {/* Role cards */}
          <div className="mt-8 flex flex-col gap-3">
            {roles.map((role) => {
              const cfg = roleConfig[role];
              const Icon = cfg.icon;
              const isSelected = selectedRole === role;

              return (
                <button
                  key={role}
                  onClick={() => { setSelectedRole(role); setSelectedUserId(''); }}
                  className={`relative w-full rounded-xl border p-4 text-left transition-all duration-200 overflow-hidden
                    ${isSelected
                      ? `bg-gradient-to-r ${cfg.color} ${cfg.border} ${cfg.glow} border`
                      : 'bg-white/[0.02] border-hairline hover:bg-white/[0.05] hover:border-white/[0.15]'
                    }`}
                >
                  {isSelected && (
                    <div className="absolute inset-0 shimmer opacity-20" />
                  )}
                  <div className="relative flex items-center gap-4">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-white/10' : 'bg-white/[0.04]'
                    }`}>
                      <Icon className={`h-5 w-5 ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="flex-1">
                      <div className={`text-sm font-semibold ${isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {t(language, `roles.${role}`)}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {t(language, `roles.${role}_desc`)}
                      </div>
                    </div>
                    {isSelected && (
                      <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px] text-primary-foreground font-bold">✓</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Player selector (only for jugador role) */}
          {selectedRole === 'jugador' && (
            <div className="mt-4 relative">
              <label className="text-xs text-muted-foreground">{t(language, 'login.choosePlayer')}</label>
              <div className="mt-1.5 flex items-center gap-2 rounded-lg glass px-3 h-11 focus-within:ring-1 focus-within:ring-primary/50 transition">
                <UserRound className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm text-foreground appearance-none cursor-pointer"
                >
                  <option value="" className="bg-card">{t(language, 'login.selectRole')}</option>
                  {roleUsers.map(u => (
                    <option key={u.id} value={u.id} className="bg-card">
                      {u.nombre} · {mockUsers.find(mu => mu.id === u.id) && u.jugador_id ? `#${u.jugador_id}` : ''}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            </div>
          )}

          {/* Continue button */}
          <button
            onClick={handleContinue}
            disabled={!selectedRole || isLoading || (selectedRole === 'jugador' && !selectedUserId)}
            className="group relative mt-6 w-full flex items-center justify-center gap-2 h-11 rounded-lg bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium text-sm overflow-hidden glow-primary hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:brightness-100"
          >
            {!isLoading && <span className="absolute inset-0 shimmer opacity-50" />}
            <span className="relative">
              {isLoading
                ? (language === 'es' ? 'Entrando...' : 'Loading...')
                : selectedRole
                  ? `${t(language, 'login.enterAs')} ${t(language, `roles.${selectedRole}`)}`
                  : t(language, 'login.continueBtn')
              }
            </span>
            {!isLoading && (
              <ArrowRight className="relative h-4 w-4 group-hover:translate-x-0.5 transition" />
            )}
          </button>

          <p className="mt-6 text-xs text-muted-foreground text-center">
            ArmorPlay AI · MVP v1.0 · {language === 'es' ? 'Solo para demostración' : 'Demo only'}
          </p>
        </div>
      </div>
    </div>
  );
}
