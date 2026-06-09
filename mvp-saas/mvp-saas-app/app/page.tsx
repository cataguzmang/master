import Link from "next/link";
import { Suspense } from "react";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Check, Package, Share2, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <nav className="w-full flex justify-center border-b h-16">
        <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
          <Link href="/" className="font-bold text-base">
            Catálogo<span className="text-primary">SaaS</span>
          </Link>
          <Suspense>
            <AuthButton />
          </Suspense>
        </div>
      </nav>

      <section className="flex-1 w-full max-w-5xl px-5 flex flex-col items-center text-center gap-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold max-w-3xl leading-tight">
          Tu catálogo siempre actualizado y profesional, en minutos
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Crea tu catálogo de productos online, compártelo con una URL propia y
          recibe pedidos por WhatsApp. Sin diseñador ni programador.
        </p>
        <div className="flex gap-3">
          <Button asChild size="lg">
            <Link href="/auth/sign-up">Crear mi catálogo gratis</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/auth/login">Iniciar sesión</Link>
          </Button>
        </div>
      </section>

      <section className="w-full max-w-5xl px-5 grid md:grid-cols-3 gap-6 pb-24">
        <Feature
          icon={<Package />}
          title="Gestión simple"
          desc="Agrega productos con foto, precio y categoría desde tu móvil."
        />
        <Feature
          icon={<Share2 />}
          title="Catálogo compartible"
          desc="Una URL propia que puedes enviar por WhatsApp o redes."
        />
        <Feature
          icon={<BarChart3 />}
          title="Pedidos y métricas"
          desc="Recibe pedidos por WhatsApp y mira qué productos interesan más."
        />
      </section>

      <footer className="w-full flex items-center justify-center border-t text-center text-xs gap-8 py-10">
        <p className="flex items-center gap-1 text-muted-foreground">
          <Check size={14} /> Hecho con Next.js + Supabase
        </p>
        <ThemeSwitcher />
      </footer>
    </main>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col gap-2 p-6 rounded-lg border">
      <div className="text-primary">{icon}</div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
