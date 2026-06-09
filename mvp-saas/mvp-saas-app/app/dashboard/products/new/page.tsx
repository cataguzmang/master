import { redirect } from "next/navigation";
import { getMyBusiness, getCategories } from "@/lib/queries";
import { createProduct } from "../../actions";
import { ProductForm } from "@/components/product-form";

export default async function NewProductPage() {
  const business = await getMyBusiness();
  if (!business) redirect("/dashboard");
  const categories = await getCategories(business.id);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Nuevo producto</h1>
      <ProductForm
        action={createProduct}
        businessId={business.id}
        categories={categories}
      />
    </div>
  );
}
