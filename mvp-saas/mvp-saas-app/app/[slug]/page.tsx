import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { getBusinessBySlug, getCategories, getProducts } from "@/lib/queries";
import { CatalogView } from "@/components/catalog/catalog-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) return { title: "Catálogo no encontrado" };
  return {
    title: business.name,
    description: business.description ?? `Catálogo de ${business.name}`,
    openGraph: {
      title: business.name,
      description: business.description ?? `Catálogo de ${business.name}`,
      images: business.logo_url ? [business.logo_url] : undefined,
    },
  };
}

export default async function CatalogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = await getBusinessBySlug(slug);
  if (!business) notFound();

  const [products, categories] = await Promise.all([
    getProducts(business.id),
    getCategories(business.id),
  ]);

  return (
    <div className="min-h-screen">
      <header
        className="w-full py-10 px-5 text-center"
        style={{ backgroundColor: business.brand_color || "#2563eb" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-3 text-white">
          {business.logo_url && (
            <Image
              src={business.logo_url}
              alt={business.name}
              width={80}
              height={80}
              className="rounded-full bg-white object-cover h-20 w-20"
            />
          )}
          <h1 className="text-3xl font-bold">{business.name}</h1>
          {business.description && (
            <p className="opacity-90 max-w-xl">{business.description}</p>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto w-full p-5 py-8">
        <CatalogView
          business={business}
          categories={categories}
          products={products}
        />
      </div>

      <footer className="text-center text-xs text-muted-foreground py-8">
        Hecho con CatálogoSaaS
      </footer>
    </div>
  );
}
