import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import type { Category, Product } from "@/lib/database.types";

export function ProductForm({
  action,
  businessId,
  categories,
  product,
}: {
  action: (formData: FormData) => void | Promise<void>;
  businessId: string;
  categories: Category[];
  product?: Product;
}) {
  return (
    <form action={action} className="flex flex-col gap-5 max-w-xl">
      <input type="hidden" name="business_id" value={businessId} />
      {product && <input type="hidden" name="id" value={product.id} />}

      <div className="grid gap-2">
        <Label htmlFor="name">Nombre *</Label>
        <Input id="name" name="name" required defaultValue={product?.name} />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Descripción</Label>
        <textarea
          id="description"
          name="description"
          rows={3}
          defaultValue={product?.description ?? ""}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="price">Precio</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price ?? ""}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="currency">Moneda</Label>
          <Input
            id="currency"
            name="currency"
            defaultValue={product?.currency ?? "USD"}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category_id">Categoría</Label>
        <select
          id="category_id"
          name="category_id"
          defaultValue={product?.category_id ?? ""}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        >
          <option value="">Sin categoría</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        {categories.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Crea categorías en{" "}
            <Link href="/dashboard/settings" className="underline">
              Ajustes
            </Link>
            .
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Imagen</Label>
        <Input id="image" name="image" type="file" accept="image/*" />
        {product?.image_url && (
          <p className="text-xs text-muted-foreground">
            Ya hay una imagen. Sube otra para reemplazarla.
          </p>
        )}
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            name="is_available"
            defaultChecked={product ? !!product.is_available : true}
          />
          Disponible
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            name="is_featured"
            defaultChecked={!!product?.is_featured}
          />
          Destacado
        </label>
      </div>

      <div className="flex gap-3">
        <Button type="submit">
          {product ? "Guardar cambios" : "Crear producto"}
        </Button>
        <Button asChild variant="outline" type="button">
          <Link href="/dashboard/products">Cancelar</Link>
        </Button>
      </div>
    </form>
  );
}
