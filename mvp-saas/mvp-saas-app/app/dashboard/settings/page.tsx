import { redirect } from "next/navigation";
import { getMyBusiness, getCategories } from "@/lib/queries";
import {
  updateBusiness,
  createCategory,
  deleteCategory,
} from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";

export default async function SettingsPage() {
  const business = await getMyBusiness();
  if (!business) redirect("/dashboard");
  const categories = await getCategories(business.id);

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Ajustes</h1>

      <Card>
        <CardHeader>
          <CardTitle>Datos del negocio</CardTitle>
          <CardDescription>
            URL pública: <code>/{business.slug}</code> (no editable por ahora)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateBusiness} className="flex flex-col gap-4">
            <input type="hidden" name="id" value={business.id} />
            <div className="grid gap-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" defaultValue={business.name} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <textarea
                id="description"
                name="description"
                rows={2}
                defaultValue={business.description ?? ""}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  name="whatsapp"
                  defaultValue={business.whatsapp ?? ""}
                  placeholder="+52 1 55 1234 5678"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="brand_color">Color de marca</Label>
                <Input
                  id="brand_color"
                  name="brand_color"
                  type="color"
                  defaultValue={business.brand_color ?? "#2563eb"}
                  className="h-10 p-1"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="logo">Logo</Label>
              <Input id="logo" name="logo" type="file" accept="image/*" />
            </div>
            <Button type="submit" className="w-fit">
              Guardar cambios
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categorías</CardTitle>
          <CardDescription>
            Agrupa tus productos para que sea más fácil navegarlos.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Aún no hay categorías.
              </p>
            )}
            {categories.map((c) => (
              <Badge key={c.id} variant="secondary" className="gap-1 pr-1">
                {c.name}
                <form action={deleteCategory} className="inline">
                  <input type="hidden" name="id" value={c.id} />
                  <button
                    type="submit"
                    className="ml-1 hover:text-red-500"
                    aria-label={`Eliminar ${c.name}`}
                  >
                    <X size={12} />
                  </button>
                </form>
              </Badge>
            ))}
          </div>
          <form action={createCategory} className="flex gap-2">
            <input type="hidden" name="business_id" value={business.id} />
            <Input name="name" placeholder="Nueva categoría" required />
            <Button type="submit" variant="outline">
              Agregar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
