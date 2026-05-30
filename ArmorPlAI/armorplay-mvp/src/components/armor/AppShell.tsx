// ─── ArmorPlay AI · AppShell ─────────────────────────────────────────
import { ReactNode } from 'react';
import { ArmorSidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { MobileNav } from './MobileNav';

export function AppShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex w-full">
      <ArmorSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={title} subtitle={subtitle} />
        <main className="flex-1 px-4 md:px-8 py-6 pb-24 lg:pb-10 animate-float-in">
          {children}
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
