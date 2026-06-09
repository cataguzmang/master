# Product Brief — Catálogo SaaS

**Documento:** Product Brief
**Versión:** 1.0
**Fecha:** 2026-06-09
**Autor:** Equipo de Producto
**Estado:** Borrador para revisión

---

## 1. Resumen ejecutivo

**Catálogo SaaS** es una webapp multi-tenant que permite a pequeños y medianos negocios crear, gestionar y compartir catálogos de productos o servicios en línea, sin necesidad de conocimientos técnicos. Cada negocio obtiene un catálogo público con URL propia (`catalogo.app/mi-tienda`) que puede actualizar en tiempo real desde un panel de administración.

El producto resuelve la fricción de mantener un catálogo actualizado: hoy los negocios usan PDFs estáticos, hojas de cálculo o publicaciones de redes sociales que quedan obsoletas y no permiten capturar pedidos ni medir interés.

---

## 2. Problema

Los pequeños negocios (tiendas, distribuidores, restaurantes, prestadores de servicios) necesitan mostrar su oferta de forma profesional y actualizada, pero:

- **Los catálogos en PDF/imagen quedan desactualizados** y requieren rehacer el diseño con cada cambio de precio o stock.
- **Las redes sociales no organizan la información** ni permiten que el cliente filtre, busque o consulte fácilmente.
- **Crear un e-commerce completo es caro y excesivo** para quien solo necesita exhibir y recibir consultas/pedidos por WhatsApp.
- **No hay datos** sobre qué productos generan más interés.

## 3. Solución propuesta

Una plataforma SaaS donde el dueño del negocio:

1. Se registra y configura su catálogo (logo, colores, datos de contacto).
2. Carga productos con foto, descripción, precio, categoría y disponibilidad.
3. Publica un catálogo responsive con URL única y compartible.
4. Recibe consultas/pedidos directamente (WhatsApp, formulario) y consulta analíticas básicas.

## 4. Objetivos y métricas de éxito

| Objetivo | Métrica (KPI) | Meta a 6 meses |
|----------|---------------|----------------|
| Adopción | Negocios registrados | 500 |
| Activación | % que publica catálogo con ≥10 productos | 60% |
| Retención | Retención mensual de cuentas activas | ≥70% |
| Monetización | Conversión free → pago | ≥8% |
| Valor entregado | Catálogos visitados / mes | 50.000 vistas |

## 5. Usuario

- **Usuario primario (admin):** dueño o encargado de PyME, 25–55 años, poca experiencia técnica, gestiona desde el móvil.
- **Usuario secundario (visitante):** cliente final que navega el catálogo público y contacta al negocio.

**Segmentos iniciales:** comercios minoristas, distribuidores mayoristas, gastronomía, servicios profesionales.

## 6. Propuesta de valor

> "Tu catálogo siempre actualizado y profesional en minutos, sin diseñador ni programador."

- Publicación en minutos.
- Actualización en tiempo real.
- Sin costos de desarrollo.
- Pedidos directos a WhatsApp.

## 7. Features (alcance del MVP)

- **Autenticación y cuenta:** registro/login con email o Google, recuperación de contraseña.
- **Configuración del negocio:** nombre, slug (URL), logo, datos de contacto y color de marca.
- **Gestión de productos:** crear/editar/eliminar con foto, precio, categoría, disponibilidad y destacados.
- **Categorías:** organización de productos por categoría.
- **Catálogo público:** página responsive en `/{slug}` con búsqueda y filtro por categoría.
- **Pedido por WhatsApp:** botón con mensaje precargado del producto.
- **Analíticas básicas:** vistas de catálogo y productos más vistos.

## 8. Datos (alto nivel)

Datos gestionados por la plataforma (modelo detallado en el PRD):

- **Negocio (tenant):** nombre, slug, logo, descripción, color de marca, WhatsApp, dueño.
- **Categorías:** nombre y orden, asociadas a un negocio.
- **Productos:** nombre, descripción, precio, moneda, imagen, disponibilidad, destacado, categoría.
- **Eventos de analítica:** tipo de evento (vista de catálogo, vista de producto, clic de WhatsApp), fecha.

Almacenados en **Supabase (PostgreSQL)** con **Row Level Security** para aislar los datos de cada negocio; las imágenes en **Supabase Storage**.

## 9. Fuera de alcance (post-MVP)

Pasarela de pago integrada (Stripe), inventario/stock avanzado, multi-idioma, dominio personalizado, multi-catálogo por cuenta, roles/equipos y apps nativas.

## 10. Stack técnico

- **Frontend/Backend:** Next.js (App Router, React Server Components).
- **Base de datos y Auth:** Supabase (PostgreSQL + Auth + Storage + RLS).
- **Hosting:** Vercel.
- **Estilos:** Tailwind CSS.
- **Pagos (fase 2):** Stripe.

## 11. Modelo de negocio

| Plan | Precio | Límites |
|------|--------|---------|
| Free | $0 | 1 catálogo, hasta 25 productos, marca "Powered by" |
| Pro | $9/mes | Productos ilimitados, sin marca, analíticas |
| Business | $29/mes | Multi-catálogo, dominio propio, soporte prioritario |

## 12. Riesgos y supuestos

- **Riesgo:** baja diferenciación frente a soluciones tipo Linktree/e-commerce → mitigar con foco en simplicidad y pedidos por WhatsApp.
- **Supuesto:** los negocios prefieren consultas por WhatsApp antes que pago online en el mercado inicial.
- **Riesgo técnico:** carga de imágenes y rendimiento del catálogo público → usar Supabase Storage + optimización de imágenes de Next.js.

## 13. Roadmap de alto nivel

1. **Mes 1–2:** MVP (gestión + catálogo público).
2. **Mes 3:** Analíticas y personalización de marca.
3. **Mes 4–5:** Pagos con Stripe, dominio personalizado.
4. **Mes 6:** Multi-catálogo, integraciones (Instagram, exportación).
