# CatálogoSaaS

Webapp multi-tenant para crear y publicar catálogos de productos online, con pedidos por WhatsApp. Construida con **Next.js 16 (App Router)** + **Supabase** (PostgreSQL, Auth, Storage, RLS).

## Stack

- **Next.js 16** (App Router, Server Actions, Turbopack)
- **Supabase**: base de datos PostgreSQL, autenticación, Storage e imágenes, Row Level Security
- **Tailwind CSS** + componentes shadcn/ui
- **TypeScript**

## Estructura

```
app/
  page.tsx                      # Landing pública
  layout.tsx                    # Layout raíz + metadata
  auth/                         # Login, registro, recuperación de contraseña
  dashboard/                    # Panel del dueño (protegido)
    page.tsx                    # Onboarding (si no hay negocio) / resumen + métricas
    actions.ts                  # Server actions: negocio, productos, categorías, uploads
    products/                   # Lista, alta y edición de productos
    settings/                   # Datos del negocio + categorías
  [slug]/page.tsx               # Catálogo público por slug
components/
  catalog/catalog-view.tsx      # Vista pública (búsqueda, filtro, WhatsApp, tracking)
  product-form.tsx              # Formulario reutilizable de producto
  auth-*, ui/                   # Auth y componentes base
lib/
  supabase/{client,server,proxy}.ts  # Clientes Supabase tipados
  database.types.ts             # Tipos generados desde el esquema
  queries.ts                    # Helpers de lectura (server)
  format.ts                     # Precio, slug, link de WhatsApp
```

## Base de datos

Tablas: `businesses`, `categories`, `products`, `analytics_events` — todas con RLS.
- El dueño (`auth.uid() = owner_id`) gestiona su negocio y sus productos.
- Lectura pública de negocios/categorías/productos (catálogo).
- Cualquiera puede registrar eventos de analítica; solo el dueño los lee.
- Bucket público de Storage `product-images` para imágenes y logos.

## Variables de entorno

Crea `.env.local` (ver `.env.example`):

```
NEXT_PUBLIC_SUPABASE_URL=https://<tu-proyecto>.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx
```

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de producción
npm run lint
```

## Flujo

1. El usuario se registra → crea su negocio (nombre + slug + WhatsApp).
2. Carga productos con foto, precio, categoría y disponibilidad.
3. El catálogo queda público en `/{slug}`.
4. Los visitantes filtran/buscan y piden por WhatsApp; se registran métricas.

## Pendiente (post-MVP)

Pagos (Stripe), dominio propio, multi-catálogo, inventario avanzado, multi-idioma.
