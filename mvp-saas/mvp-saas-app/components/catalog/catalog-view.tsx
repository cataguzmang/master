"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { formatPrice, whatsappLink } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Search } from "lucide-react";
import type { Business, Category, Product } from "@/lib/database.types";

export function CatalogView({
  business,
  categories,
  products,
}: {
  business: Business;
  categories: Category[];
  products: Product[];
}) {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const brand = business.brand_color || "#2563eb";

  // Log catalog view once on mount.
  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("analytics_events")
      .insert({ business_id: business.id, event_type: "catalog_view" })
      .then(() => {});
  }, [business.id]);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = !activeCat || p.category_id === activeCat;
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        (p.description ?? "").toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [products, activeCat, query]);

  const onWhatsApp = (p: Product) => {
    if (business.whatsapp) {
      const supabase = createClient();
      supabase
        .from("analytics_events")
        .insert({
          business_id: business.id,
          product_id: p.id,
          event_type: "whatsapp_click",
        })
        .then(() => {});
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Buscar productos..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Category filter */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setActiveCat(null)}>
            <Badge variant={activeCat === null ? "default" : "outline"}>
              Todos
            </Badge>
          </button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveCat(c.id)}>
              <Badge variant={activeCat === c.id ? "default" : "outline"}>
                {c.name}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-12">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="rounded-lg border overflow-hidden flex flex-col"
            >
              <div className="aspect-square bg-muted relative flex items-center justify-center">
                {p.image_url ? (
                  <Image
                    src={p.image_url}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : (
                  <ImageIcon className="text-muted-foreground" size={28} />
                )}
                {!p.is_available && (
                  <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                    Agotado
                  </span>
                )}
                {p.is_featured && (
                  <span
                    className="absolute top-2 right-2 text-white text-xs px-2 py-0.5 rounded"
                    style={{ backgroundColor: brand }}
                  >
                    Destacado
                  </span>
                )}
              </div>
              <div className="p-3 flex flex-col gap-1 flex-1">
                <h3 className="font-medium leading-tight">{p.name}</h3>
                {p.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {p.description}
                  </p>
                )}
                <div className="mt-auto pt-2 flex items-center justify-between gap-2">
                  <span className="font-semibold">
                    {formatPrice(p.price, p.currency)}
                  </span>
                  {business.whatsapp && p.is_available && (
                    <a
                      href={whatsappLink(
                        business.whatsapp,
                        `Hola, me interesa "${p.name}"`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => onWhatsApp(p)}
                      className="text-xs font-medium text-white px-2.5 py-1.5 rounded-md"
                      style={{ backgroundColor: brand }}
                    >
                      Pedir
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
