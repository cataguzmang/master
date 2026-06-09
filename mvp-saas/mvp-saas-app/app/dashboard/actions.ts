"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify } from "@/lib/format";

const BUCKET = "product-images";

async function requireUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub as string | undefined;
  if (!userId) redirect("/auth/login");
  return { supabase, userId: userId! };
}

async function uploadImage(file: File, businessId: string): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const { supabase } = await requireUser();
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${businessId}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });
  if (error) throw new Error(`Error al subir imagen: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

// ---------- Business ----------

export async function createBusiness(formData: FormData) {
  const { supabase, userId } = await requireUser();
  const name = String(formData.get("name") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();

  if (!name) throw new Error("El nombre es obligatorio");
  const slug = slugify(slugInput || name);
  if (!slug) throw new Error("El slug no es válido");

  const { error } = await supabase.from("businesses").insert({
    owner_id: userId,
    name,
    slug,
    whatsapp: whatsapp || null,
  });
  if (error) {
    if (error.code === "23505") throw new Error("Ese slug ya está en uso");
    throw new Error(error.message);
  }
  revalidatePath("/dashboard");
  redirect("/dashboard");
}

export async function updateBusiness(formData: FormData) {
  const { supabase } = await requireUser();
  const id = String(formData.get("id"));
  const name = String(formData.get("name") || "").trim();
  const whatsapp = String(formData.get("whatsapp") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const brand_color = String(formData.get("brand_color") || "#2563eb");

  const logoFile = formData.get("logo") as File | null;
  let logo_url: string | undefined;
  if (logoFile && logoFile.size > 0) {
    logo_url = (await uploadImage(logoFile, id)) ?? undefined;
  }

  const { error } = await supabase
    .from("businesses")
    .update({
      name,
      whatsapp: whatsapp || null,
      description: description || null,
      brand_color,
      ...(logo_url ? { logo_url } : {}),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/settings");
  revalidatePath("/dashboard");
}

// ---------- Categories ----------

export async function createCategory(formData: FormData) {
  const { supabase } = await requireUser();
  const business_id = String(formData.get("business_id"));
  const name = String(formData.get("name") || "").trim();
  if (!name) return;
  await supabase.from("categories").insert({ business_id, name });
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/categories");
}

export async function deleteCategory(formData: FormData) {
  const { supabase } = await requireUser();
  const id = String(formData.get("id"));
  await supabase.from("categories").delete().eq("id", id);
  revalidatePath("/dashboard/categories");
  revalidatePath("/dashboard/products");
}

// ---------- Products ----------

export async function createProduct(formData: FormData) {
  const { supabase } = await requireUser();
  const business_id = String(formData.get("business_id"));
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("El nombre es obligatorio");

  const priceRaw = String(formData.get("price") || "").trim();
  const price = priceRaw ? Number(priceRaw) : null;
  const category_id = String(formData.get("category_id") || "") || null;
  const description = String(formData.get("description") || "").trim();
  const currency = String(formData.get("currency") || "USD");
  const is_available = formData.get("is_available") === "on";
  const is_featured = formData.get("is_featured") === "on";

  const imageFile = formData.get("image") as File | null;
  const image_url = imageFile ? await uploadImage(imageFile, business_id) : null;

  const { error } = await supabase.from("products").insert({
    business_id,
    name,
    price,
    currency,
    category_id,
    description: description || null,
    image_url,
    is_available,
    is_featured,
  });
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function updateProduct(formData: FormData) {
  const { supabase } = await requireUser();
  const id = String(formData.get("id"));
  const business_id = String(formData.get("business_id"));
  const name = String(formData.get("name") || "").trim();
  const priceRaw = String(formData.get("price") || "").trim();
  const price = priceRaw ? Number(priceRaw) : null;
  const category_id = String(formData.get("category_id") || "") || null;
  const description = String(formData.get("description") || "").trim();
  const currency = String(formData.get("currency") || "USD");
  const is_available = formData.get("is_available") === "on";
  const is_featured = formData.get("is_featured") === "on";

  const imageFile = formData.get("image") as File | null;
  let image_url: string | undefined;
  if (imageFile && imageFile.size > 0) {
    image_url = (await uploadImage(imageFile, business_id)) ?? undefined;
  }

  const { error } = await supabase
    .from("products")
    .update({
      name,
      price,
      currency,
      category_id,
      description: description || null,
      is_available,
      is_featured,
      ...(image_url ? { image_url } : {}),
    })
    .eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function deleteProduct(formData: FormData) {
  const { supabase } = await requireUser();
  const id = String(formData.get("id"));
  await supabase.from("products").delete().eq("id", id);
  revalidatePath("/dashboard/products");
}
