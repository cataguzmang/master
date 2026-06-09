import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { getMyBusiness, getProducts, getCategories } from "@/lib/queries";
import { deleteProduct } from "../actions";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Pencil, Plus, Trash2, ImageIcon } from "lucide-react";

export default async function ProductsPage() {
  const business = await getMyBusiness();
  if (!business) redirect("/dashboard");

  const [products, categories] = await Promise.all([
    getProducts(business.id),
    getCategories(business.id),
  ]);
  const catName = (id: string | null) =>
    categories.find((c) => c.id === id)?.name;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Productos</h1>
        <Button asChild>
          <Link href="/dashboard/products/new">
            <Plus size={16} className="mr-1" /> Nuevo producto
          </Link>
        </Button>
      </div>

      {products.length === 0 ? (
        <Card className="py-12 text-center text-muted-foreground">
          No hay productos todavía.
        </Card>
      ) : (
        <div className="grid gap-3">
          {products.map((p) => (
            <Card
              key={p.id}
              className="flex items-center gap-4 p-3"
            >
              <div className="h-16 w-16 shrink-0 rounded-md bg-muted overflow-hidden flex items-center justify-center">
                {p.image_url ? (
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    width={64}
                    height={64}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon className="text-muted-foreground" size={20} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium truncate">{p.name}</span>
                  {!p.is_available && <Badge variant="secondary">Agotado</Badge>}
                  {p.is_featured && <Badge>Destacado</Badge>}
                  {catName(p.category_id) && (
                    <Badge variant="outline">{catName(p.category_id)}</Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {formatPrice(p.price, p.currency)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/dashboard/products/${p.id}/edit`}>
                    <Pencil size={14} />
                  </Link>
                </Button>
                <form action={deleteProduct}>
                  <input type="hidden" name="id" value={p.id} />
                  <Button size="sm" variant="outline" type="submit">
                    <Trash2 size={14} className="text-red-500" />
                  </Button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
