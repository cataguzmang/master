import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser, getMyBusiness } from "@/lib/queries";
import { LogoutButton } from "@/components/logout-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, Settings, ExternalLink } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/auth/login");
  const business = await getMyBusiness();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-between gap-4 p-3 px-5">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="font-bold">
              Catálogo<span className="text-primary">SaaS</span>
            </Link>
            {business && (
              <nav className="hidden sm:flex items-center gap-1 text-sm">
                <NavLink href="/dashboard" icon={<LayoutDashboard size={16} />}>
                  Resumen
                </NavLink>
                <NavLink href="/dashboard/products" icon={<Package size={16} />}>
                  Productos
                </NavLink>
                <NavLink href="/dashboard/settings" icon={<Settings size={16} />}>
                  Ajustes
                </NavLink>
              </nav>
            )}
          </div>
          <div className="flex items-center gap-3">
            {business && (
              <Button asChild size="sm" variant="outline">
                <a href={`/${business.slug}`} target="_blank" rel="noreferrer">
                  Ver catálogo <ExternalLink size={14} className="ml-1" />
                </a>
              </Button>
            )}
            <ThemeSwitcher />
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-6xl mx-auto w-full p-5">{children}</main>
    </div>
  );
}

function NavLink({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-accent transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}
