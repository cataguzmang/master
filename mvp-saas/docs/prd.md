# PRD — Catálogo SaaS

**Documento:** Product Requirements Document
**Versión:** 1.0
**Fecha:** 2026-06-09
**Estado:** Borrador
**Stack:** Next.js (App Router) + Supabase (PostgreSQL, Auth, Storage, RLS) + Vercel + Tailwind CSS

---

## 1. Contexto y objetivo

Webapp multi-tenant donde cada negocio gestiona un catálogo de productos/servicios y lo publica en una URL pública compartible. Este PRD detalla los requisitos funcionales y técnicos del **MVP**.

**Objetivo del MVP:** que un dueño de negocio pueda registrarse, cargar al menos 10 productos y publicar un catálogo funcional en menos de 15 minutos.

## 2. Problema

Los pequeños y medianos negocios necesitan mostrar su oferta de forma profesional y siempre actualizada, pero hoy:

- Usan catálogos en **PDF/imagen que quedan obsoletos** y deben rehacerse con cada cambio.
- Las **redes sociales no organizan** la información ni permiten buscar/filtrar.
- Un **e-commerce completo es caro y excesivo** para quien solo quiere exhibir y recibir pedidos por WhatsApp.
- **No tienen datos** sobre qué productos generan más interés.

**Impacto:** pérdida de ventas, imagen poco profesional y tiempo desperdiciado manteniendo material desactualizado.

## 3. Usuario (personas)

| Persona | Rol | Necesidad principal |
|---------|-----|---------------------|
| **Admin (dueño)** | Gestiona el catálogo | Cargar y actualizar productos rápido desde el móvil |
| **Visitante** | Cliente final | Navegar, buscar y contactar al negocio |

## 4. Historias de usuario

### Autenticación y cuenta
- **US-01:** Como admin quiero registrarme con email/contraseña (o Google) para crear mi cuenta.
- **US-02:** Como admin quiero iniciar y cerrar sesión de forma segura.
- **US-03:** Como admin quiero recuperar mi contraseña por email.

### Configuración del negocio (tenant)
- **US-04:** Como admin quiero definir el nombre, slug (URL), logo y datos de contacto de mi negocio.
- **US-05:** Como admin quiero personalizar color principal y descripción del catálogo.

### Gestión de productos
- **US-06:** Como admin quiero crear un producto con nombre, descripción, precio, imagen, categoría y disponibilidad.
- **US-07:** Como admin quiero editar y eliminar productos.
- **US-08:** Como admin quiero marcar productos como "agotado" o "destacado".
- **US-09:** Como admin quiero organizar productos por categorías.
- **US-10:** Como admin quiero subir imágenes de producto (Supabase Storage).

### Catálogo público
- **US-11:** Como visitante quiero ver el catálogo en `/{slug}` de forma responsive.
- **US-12:** Como visitante quiero buscar y filtrar por categoría.
- **US-13:** Como visitante quiero ver el detalle de un producto.
- **US-14:** Como visitante quiero contactar/pedir por WhatsApp con el producto precargado en el mensaje.

### Analíticas
- **US-15:** Como admin quiero ver vistas del catálogo y productos más vistos.

## 5. Features (requisitos funcionales)

### 4.1 Autenticación
- Supabase Auth con email/contraseña y OAuth Google.
- Sesión persistente vía cookies (SSR con `@supabase/ssr`).
- Rutas del panel protegidas por middleware.

### 4.2 Multi-tenancy
- Cada usuario pertenece a un `business` (tenant). MVP: un negocio por usuario.
- Aislamiento de datos garantizado por **Row Level Security (RLS)** en Supabase.
- El catálogo público se resuelve por `slug` único.

### 4.3 Gestión de productos
- CRUD completo de productos y categorías.
- Imágenes en Supabase Storage con URL pública optimizada vía `next/image`.
- Validación de formularios (campos requeridos, precio numérico, tamaño/formato de imagen).

### 4.4 Catálogo público
- Renderizado del lado del servidor (RSC) para SEO y velocidad.
- Búsqueda y filtro por categoría del lado del cliente.
- Botón "Pedir por WhatsApp" con enlace `https://wa.me/<tel>?text=...`.

### 4.5 Analíticas
- Registro de vistas de catálogo y de producto (tabla `analytics_events`).
- Dashboard simple con totales y top productos.

## 6. Requisitos no funcionales

| Categoría | Requisito |
|-----------|-----------|
| Rendimiento | Catálogo público LCP < 2.5s; uso de RSC + caché + imágenes optimizadas |
| Seguridad | RLS en todas las tablas; validación servidor; sin claves expuestas en cliente |
| Disponibilidad | 99.5% (Vercel + Supabase gestionados) |
| Responsive | Mobile-first, soporte desde 320px |
| Accesibilidad | Contraste AA, navegación por teclado, etiquetas alt |
| SEO | Metadatos dinámicos por catálogo, sitemap, Open Graph |
| Escalabilidad | Paginación de productos; índices en `business_id` y `slug` |

## 7. Datos (modelo de datos — Supabase / PostgreSQL)

```sql
-- Negocios (tenants)
create table businesses (
  id            uuid primary key default gen_random_uuid(),
  owner_id      uuid not null references auth.users(id) on delete cascade,
  name          text not null,
  slug          text not null unique,
  logo_url      text,
  description   text,
  brand_color   text default '#2563eb',
  whatsapp      text,
  created_at    timestamptz default now()
);

-- Categorías
create table categories (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references businesses(id) on delete cascade,
  name          text not null,
  position      int default 0
);

-- Productos
create table products (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references businesses(id) on delete cascade,
  category_id   uuid references categories(id) on delete set null,
  name          text not null,
  description   text,
  price         numeric(12,2),
  currency      text default 'USD',
  image_url     text,
  is_available  boolean default true,
  is_featured   boolean default false,
  created_at    timestamptz default now()
);

-- Eventos de analítica
create table analytics_events (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references businesses(id) on delete cascade,
  product_id    uuid references products(id) on delete cascade,
  event_type    text not null,  -- 'catalog_view' | 'product_view' | 'whatsapp_click'
  created_at    timestamptz default now()
);

-- Índices
create index idx_products_business on products(business_id);
create index idx_categories_business on categories(business_id);
create index idx_analytics_business on analytics_events(business_id);
```

### 7.1 Row Level Security (ejemplo)

```sql
alter table businesses enable row level security;
alter table products enable row level security;

-- El dueño gestiona su negocio
create policy "owner manages business"
  on businesses for all
  using (auth.uid() = owner_id);

-- El dueño gestiona sus productos
create policy "owner manages products"
  on products for all
  using (exists (
    select 1 from businesses b
    where b.id = products.business_id and b.owner_id = auth.uid()
  ));

-- Lectura pública de productos disponibles (catálogo)
create policy "public reads products"
  on products for select
  using (true);
```

> Nota: para el catálogo público se recomienda exponer la lectura mediante un endpoint/RSC que use la `anon key` con políticas de solo lectura, o una vista filtrada.

## 8. Arquitectura

```
[ Navegador ]
     │
     ▼
[ Next.js en Vercel ]
   ├── App Router (RSC + Server Actions)
   ├── Middleware (auth + tenant)
   ├── /(public)/[slug]        → catálogo público (SSR)
   ├── /(dashboard)/...        → panel admin (protegido)
   └── @supabase/ssr (cookies)
     │
     ▼
[ Supabase ]
   ├── PostgreSQL + RLS
   ├── Auth (email + Google)
   └── Storage (imágenes)
```

### Estructura de rutas
```
app/
  (public)/
    [slug]/page.tsx           # catálogo público
    [slug]/p/[productId]/page.tsx
  (dashboard)/
    dashboard/page.tsx        # resumen + analíticas
    products/page.tsx         # listado/CRUD
    settings/page.tsx         # marca y datos
  (auth)/
    login/page.tsx
    register/page.tsx
  layout.tsx
lib/
  supabase/{client,server}.ts
middleware.ts
```

## 9. Flujos clave

**Onboarding:** Registro → crear negocio (nombre + slug) → cargar primer producto → publicar → compartir URL.

**Pedido del visitante:** Catálogo → producto → "Pedir por WhatsApp" → mensaje precargado → evento `whatsapp_click`.

## 10. Criterios de aceptación del MVP

- [ ] Un usuario nuevo puede registrarse y crear su negocio.
- [ ] El admin puede crear, editar y eliminar productos con imagen.
- [ ] El catálogo público es accesible en `/{slug}` y es responsive.
- [ ] El visitante puede filtrar por categoría y buscar.
- [ ] El botón de WhatsApp abre el chat con mensaje precargado.
- [ ] RLS impide que un usuario vea/edite datos de otro negocio.
- [ ] El dashboard muestra vistas totales y productos más vistos.

## 11. Métricas de producto

- Tiempo hasta primer catálogo publicado (meta < 15 min).
- % de cuentas con ≥10 productos.
- Vistas de catálogo y clics de WhatsApp por negocio.
- Retención mensual de cuentas activas.

## 12. Fuera de alcance (post-MVP)

Pagos online (Stripe), inventario/stock avanzado, multi-idioma, dominio personalizado, multi-catálogo por cuenta, apps nativas, roles/equipos.

## 13. Plan de entrega

| Fase | Entregable | Duración estimada |
|------|------------|-------------------|
| 0 | Setup (Next.js, Supabase, schema, RLS, auth) | 1 semana |
| 1 | CRUD de productos y categorías + Storage | 1.5 semanas |
| 2 | Catálogo público + WhatsApp + búsqueda | 1.5 semanas |
| 3 | Personalización de marca + analíticas | 1 semana |
| 4 | QA, accesibilidad, SEO y lanzamiento | 1 semana |

---

# Extensión v1.1 — Chatbot con agente, "Mi stack" y asistencia IA

**Versión:** 1.1 · **Fecha:** 2026-06-10 · **Estado:** Borrador

Estado según auditoría del repo (`mvp-saas-app`) y de la base de datos viva (Supabase, proyecto `odzdeurkhjxowubkhuzh`) realizada el 2026-06-10. La tabla de items del catálogo es **`products`** (no existe tabla `tools`); todo contrato y esquema usa sus columnas reales: `id`, `business_id`, `category_id`, `name`, `description`, `price`, `currency`, `image_url`, `is_available`, `is_featured`, `created_at`.

## 14. Estado actual (auditoría)

| Punto | Estado |
|---|---|
| Auth completa (login, sign-up, recovery, confirm) | **[HECHO]** |
| Catálogo público `/{slug}` con buscador y filtro por categoría | **[HECHO]** |
| CRUD de productos y categorías (`/dashboard/products`, Server Actions) | **[HECHO]** |
| Tablas `businesses`, `categories`, `products`, `analytics_events` con RLS | **[HECHO]** |
| Tabla cruzada usuario ↔ producto ("Mi stack") | **[PENDIENTE]** |
| Rutas `/api/*` (no existe ninguna; solo `app/auth/confirm/route.ts`) | **[PENDIENTE]** |
| UI de chat | **[PENDIENTE]** |
| Microservicio / agente n8n para el chat | **[PENDIENTE]** |
| Persistencia de conversaciones (`conversations`, `messages`) | **[PENDIENTE]** |
| Asesor por formulario (opcional) | **[PENDIENTE]** |
| Varita IA de autorrelleno de producto (opcional) | **[PENDIENTE]** |

## 15. Feature A — Chatbot con agente externo (n8n) **[PENDIENTE]**

Widget de chat en el catálogo público `/{slug}`. El frontend NUNCA habla directo con n8n: llama a `POST /api/chat` (Next.js route handler), que valida, persiste el mensaje y reenvía al webhook del agente n8n. El agente razona sobre el catálogo del negocio y devuelve una respuesta con productos recomendados.

```
[ Widget chat en /{slug} ]
        │ POST /api/chat
        ▼
[ Next.js API route ]  ── valida sesión/rate-limit, guarda en `messages`
        │ POST (server-to-server, header X-API-KEY)
        ▼
[ n8n Cloud — Agente ]  ── LLM + tool "buscar en products" (Supabase)
        │ respuesta JSON
        ▼
[ API route ] ── guarda respuesta, la devuelve al widget
```

### 15.1 Contrato del microservicio (endpoint de chat)

**Endpoint interno:** `POST /api/chat` (mismo contrato que el webhook n8n; la route actúa de proxy).
**Webhook n8n:** `POST {N8N_CHAT_WEBHOOK_URL}` con header `X-API-KEY: {CHAT_AGENT_SECRET}`.

**Input (Next.js → n8n) — JSON exacto:**

```json
{
  "conversation_id": "9f1b2c3d-0000-0000-0000-000000000000",
  "business_id": "1a2b3c4d-0000-0000-0000-000000000000",
  "user_id": null,
  "message": "Busco algo sin gluten por menos de 10 euros",
  "context": {
    "slug": "panaderia-luna",
    "stack_product_ids": [],
    "history": [
      { "role": "user", "content": "Hola" },
      { "role": "assistant", "content": "¡Hola! ¿Qué buscas hoy?" }
    ]
  }
}
```

- `user_id`: uuid de `auth.users` si el visitante tiene sesión; `null` si es anónimo.
- `history`: últimos 10 turnos como máximo; la memoria larga vive en n8n (keyed por `conversation_id`).
- `stack_product_ids`: array de `products.id` del stack del usuario (vacío si anónimo).

**Output (n8n → Next.js) — JSON exacto:**

```json
{
  "conversation_id": "9f1b2c3d-0000-0000-0000-000000000000",
  "reply": "Tenemos dos opciones sin gluten por debajo de ese precio:",
  "products": [
    {
      "id": "5e6f7a8b-0000-0000-0000-000000000000",
      "business_id": "1a2b3c4d-0000-0000-0000-000000000000",
      "category_id": "7c8d9e0f-0000-0000-0000-000000000000",
      "name": "Pan de trigo sarraceno",
      "description": "Hogaza sin gluten de 500 g",
      "price": 6.50,
      "currency": "EUR",
      "image_url": "https://odzdeurkhjxowubkhuzh.supabase.co/storage/v1/object/public/products/pan.jpg",
      "is_available": true,
      "is_featured": false,
      "created_at": "2026-05-01T10:00:00Z"
    }
  ],
  "actions": [
    { "type": "suggest_add_to_stack", "product_id": "5e6f7a8b-0000-0000-0000-000000000000" }
  ],
  "error": null
}
```

- `products[]`: filas literales de la tabla `products` (mismos nombres y tipos de columna; sin campos inventados). Puede ser `[]`.
- `actions[]`: acciones sugeridas que el widget renderiza como botones. Tipos del MVP: `suggest_add_to_stack` y `open_whatsapp`.
- `error`: `null` en éxito; en fallo, `{ "code": "AGENT_TIMEOUT" | "AGENT_ERROR", "message": "texto" }` y `reply` con un mensaje de cortesía.
- Timeout del proxy: 30 s. Si n8n no responde, la route devuelve `error.code = "AGENT_TIMEOUT"`.

### 15.2 Persistencia (nuevas tablas)

```sql
create table conversations (
  id            uuid primary key default gen_random_uuid(),
  business_id   uuid not null references businesses(id) on delete cascade,
  user_id       uuid references auth.users(id) on delete set null,  -- null = anónimo
  created_at    timestamptz default now()
);

create table messages (
  id               uuid primary key default gen_random_uuid(),
  conversation_id  uuid not null references conversations(id) on delete cascade,
  role             text not null check (role in ('user','assistant')),
  content          text not null,
  product_ids      uuid[] default '{}',   -- products.id citados en la respuesta
  created_at       timestamptz default now()
);
```

## 16. Feature B — "Mi stack" (usuario ↔ products) **[PENDIENTE]**

El visitante autenticado guarda productos en su colección personal. Requiere que los visitantes puedan registrarse (la auth ya existe **[HECHO]**; hoy solo la usan los dueños).

```sql
create table user_stack (
  user_id     uuid not null references auth.users(id) on delete cascade,
  product_id  uuid not null references products(id) on delete cascade,
  note        text,
  created_at  timestamptz default now(),
  primary key (user_id, product_id)
);

alter table user_stack enable row level security;
create policy "user manages own stack" on user_stack
  for all using (auth.uid() = user_id);
```

- UI: botón "＋ Guardar" en cada tarjeta del catálogo y página `/stack` con la colección del usuario.
- El chatbot recibe `stack_product_ids` en el `context` para personalizar recomendaciones (§15.1).

## 17. Features opcionales (post-v1.1)

- **Asesor por formulario [PENDIENTE]:** formulario de 3–4 preguntas (necesidad, presupuesto = filtro sobre `price`, categoría) que se envía al mismo webhook n8n con `message` sintetizado a partir de las respuestas; reutiliza el contrato de §15.1 sin cambios.
- **Varita IA [PENDIENTE]:** en `/dashboard/products/new`, botón "✨ Autorrellenar" que, a partir de `name` (y opcionalmente una URL), llama a un segundo webhook n8n que devuelve `{ "description": text, "price": numeric|null, "currency": text, "category_id": uuid|null }` para prerrellenar el formulario. Solo propone: el admin siempre confirma antes de guardar.

## 18. Wireframes

### 18.1 Catálogo público con chat y stack (`/{slug}`)

```
┌──────────────────────────────────────────────────────┐
│  ☰  Panadería Luna                    [Entrar] [☆ Mi stack] │
├──────────────────────────────────────────────────────┤
│  🔍 Buscar productos...        [Todas ▾ categorías]  │
├──────────────┬──────────────┬────────────────────────┤
│ ┌──────────┐ │ ┌──────────┐ │      ┌───────────────┐ │
│ │ imagen   │ │ │ imagen   │ │      │ 💬 Asistente  │ │
│ │ Pan s/g  │ │ │ Croissant│ │      ├───────────────┤ │
│ │ 6,50 EUR │ │ │ 2,10 EUR │ │      │ Hola, ¿qué    │ │
│ │[＋Guardar]│ │ │[＋Guardar]│ │      │ buscas hoy?   │ │
│ │[WhatsApp]│ │ │[WhatsApp]│ │      │ ┌───────────┐ │ │
│ └──────────┘ │ └──────────┘ │      │ │Sin gluten…│ │ │
│              │              │      │ └───────────┘ │ │
│              │              │      │ [tarjeta prod]│ │
│              │              │      │ [＋ al stack] │ │
│              │              │      ├───────────────┤ │
│              │              │      │ Escribe… [➤]  │ │
└──────────────┴──────────────┴──────┴───────────────┴─┘
   (móvil: el chat es un botón flotante 💬 que abre overlay)
```

### 18.2 Mi stack (`/stack`)

```
┌──────────────────────────────────────────────┐
│  ☆ Mi stack (3)                              │
├──────────────────────────────────────────────┤
│ ▸ Pan de trigo sarraceno   6,50 EUR  [🗑] [WhatsApp] │
│   nota: "para el pedido del viernes"         │
│ ▸ Croissant integral       2,10 EUR  [🗑] [WhatsApp] │
│ ▸ Galletas de avena        4,00 EUR  [🗑] [WhatsApp] │
└──────────────────────────────────────────────┘
```

### 18.3 Varita IA en el formulario de producto (`/dashboard/products/new`)

```
┌──────────────────────────────────────────────┐
│  Nuevo producto                              │
├──────────────────────────────────────────────┤
│ Nombre      [ Pan de espelta        ] [✨ IA] │
│ Descripción [ (autorrellenada, editable)   ] │
│ Precio      [ 5.90 ]   Moneda [EUR ▾]        │
│ Categoría   [ Panes ▾ ]                      │
│ Imagen      [ Subir… ]                       │
│ ☑ Disponible   ☐ Destacado                   │
│                       [Cancelar] [Guardar]   │
└──────────────────────────────────────────────┘
```

## 19. Criterios de aceptación v1.1

- [ ] `POST /api/chat` responde cumpliendo el contrato de §15.1 (validado con un mock de n8n).
- [ ] El widget de chat funciona en `/{slug}` para visitantes anónimos y autenticados.
- [ ] Las tarjetas de producto del chat muestran solo columnas reales de `products`.
- [ ] Un usuario autenticado puede añadir/quitar productos de `user_stack` y verlos en `/stack`.
- [ ] RLS: nadie puede leer/escribir el stack de otro usuario.
- [ ] Caída de n8n → el chat muestra mensaje de error amable (`AGENT_TIMEOUT`), nunca un 500 crudo.
- [ ] El secreto del webhook (`CHAT_AGENT_SECRET`, `N8N_CHAT_WEBHOOK_URL`) vive solo en variables de entorno del servidor (no `NEXT_PUBLIC_*`).

## 20. Plan de entrega v1.1

| Fase | Entregable | Estado |
|------|------------|--------|
| 5 | Tablas `user_stack`, `conversations`, `messages` + RLS | [PENDIENTE] |
| 6 | `POST /api/chat` + workflow agente en n8n | [PENDIENTE] |
| 7 | Widget de chat + tarjetas de producto + acciones | [PENDIENTE] |
| 8 | "Mi stack": botón guardar + página `/stack` | [PENDIENTE] |
| 9 | (Opcional) Asesor por formulario + varita IA | [PENDIENTE] |
