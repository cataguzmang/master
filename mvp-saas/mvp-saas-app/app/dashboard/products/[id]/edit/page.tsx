import { notFound, redirect } from "next/navigation";
import { getMyBusiness, getCategories, getProduct } from "@/lib/queries";
import { updateProduct } from "../../../actions";
import { ProductForm } from "@/components/product-form";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await getMyBusiness();
  if (!business) redirect("/dashboard");

  const [product, categories] = await Promise.all([
    getProduct(id),
    getCategories(business.id),
  ]);
  if (!product || product.business_id !== business.id) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Editar producto</h1>
      <ProductForm
        action={updateProduct}
        businessId={business.id}
        categories={categories}
        product={product}
      />
    </div>
  );
}
