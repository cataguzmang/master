export function formatPrice(
  price: number | null,
  currency: string | null = "USD",
): string {
  if (price == null) return "";
  try {
    return new Intl.NumberFormat("es", {
      style: "currency",
      currency: currency || "USD",
    }).format(price);
  } catch {
    return `${currency || ""} ${price.toFixed(2)}`.trim();
  }
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50);
}

/** Builds a wa.me link with a prefilled message. */
export function whatsappLink(phone: string, message: string): string {
  const clean = phone.replace(/[^0-9]/g, "");
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}
