import Link from "next/link";
import {
  getMyBusiness,
  getProducts,
  getAnalyticsSummary,
} from "@/lib/queries";
import { createBusiness } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, MousePointerClick, Package, Plus } from "lucide-react";

export default async function DashboardPage() {
  const business = await getMyBusiness();

  if (!business) {
    return (
      <div className="max-w-lg mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Crea tu catálogo</CardTitle>
            <CardDescription>
              Configura tu negocio para empezar. Podrás cambiar todo después.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={createBusiness} className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre del negocio</Label>
                <Input id="name" name="name" required placeholder="Mi Tienda" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">URL del catálogo</Label>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>/</span>
                  <Input
                    id="slug"
                    name="slug"
                    placeholder="mi-tienda"
                    pattern="[a-zA-Z0-9\-]+"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Si lo dejas vacío, se genera desde el nombre.
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="whatsapp">WhatsApp (con código de país)</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  placeholder="+52 1 55 1234 5678"
                />
              </div>
              <Button type="submit" className="w-full">
                Crear catálogo
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  const [products, stats] = await Promise.all([
    getProducts(business.id),
    getAnalyticsSummary(business.id),
  ]);
  const available = products.filter((p) => p.is_available).length;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{business.name}</h1>
          <p className="text-sm text-muted-foreground">
            Tu catálogo está en{" "}
            <Link
              href={`/${business.slug}`}
              className="underline"
              target="_blank"
            >
              /{business.slug}
            </Link>
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus size={16} className="mr-1" /> Nuevo producto
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Productos" value={products.length} icon={<Package size={18} />} />
        <Stat label="Disponibles" value={available} icon={<Package size={18} />} />
        <Stat label="Vistas catálogo" value={stats.catalogViews} icon={<Eye size={18} />} />
        <Stat
          label="Clics WhatsApp"
          value={stats.whatsappClicks}
          icon={<MousePointerClick size={18} />}
        />
      </div>

      {products.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Todavía no tienes productos.{" "}
            <Link href="/dashboard/products/new" className="underline">
              Agrega el primero
            </Link>
            .
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between text-muted-foreground">
          <span className="text-sm">{label}</span>
          {icon}
        </div>
        <div className="text-3xl font-bold mt-2">{value}</div>
      </CardContent>
    </Card>
  );
}
