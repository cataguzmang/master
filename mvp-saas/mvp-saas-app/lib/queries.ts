import { createClient } from "@/lib/supabase/server";
import type { Business, Category, Product } from "@/lib/database.types";

/** Returns the authenticated user's claims or null. */
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  return data?.claims ?? null;
}

/** Returns the business owned by the current user, or null if none yet. */
export async function getMyBusiness(): Promise<Business | null> {
  const supabase = await createClient();
  const { data: claims } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (!userId) return null;

  const { data } = await supabase
    .from("businesses")
    .select("*")
    .eq("owner_id", userId)
    .maybeSingle();

  return data;
}

/** Public: resolve a business by its slug. */
export async function getBusinessBySlug(
  slug: string,
): Promise<Business | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("businesses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export async function getCategories(businessId: string): Promise<Category[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("categories")
    .select("*")
    .eq("business_id", businessId)
    .order("position", { ascending: true });
  return data ?? [];
}

export async function getProducts(businessId: string): Promise<Product[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getProduct(id: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return data;
}

/** Basic analytics counters for a business. */
export async function getAnalyticsSummary(businessId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("analytics_events")
    .select("event_type")
    .eq("business_id", businessId);

  const events = data ?? [];
  return {
    catalogViews: events.filter((e) => e.event_type === "catalog_view").length,
    productViews: events.filter((e) => e.event_type === "product_view").length,
    whatsappClicks: events.filter((e) => e.event_type === "whatsapp_click")
      .length,
  };
}
