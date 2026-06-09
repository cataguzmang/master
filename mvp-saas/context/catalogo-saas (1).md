# Catálogo de Herramientas SaaS para "Stack Strategist"
## Base de conocimiento para recomendación de stacks tecnológicos en proyectos de estudiantes (IA / Automatización)

**Nota metodológica:** Catálogo descriptivo y neutral, diseñado para cargarse como base de conocimiento de un agente de IA. **No incluye precios ni planes** por diseño. Se centra en qué es cada herramienta, sus casos de uso principales y sus capacidades de integración (API, webhooks y conexión con plataformas de automatización como Make, n8n y Zapier). Información verificada en 2025–2026; el panorama SaaS cambia rápido, conviene confirmar detalles puntuales antes de decisiones críticas. Cobertura: 90+ herramientas en 15 categorías.

---

## 1. Automatización / No-code & Low-code

**Make (antes Integromat)**
Plataforma visual de automatización en la nube basada en "escenarios" que conectan módulos mediante interfaz drag-and-drop. Casos de uso: sincronización de datos, generación de leads, onboarding, reporting, orquestación de procesos. Según la web oficial de Make, ofrece más de 3.000 apps integradas y más de 30.000 acciones disponibles ("Explore over 3,000 apps"), y es usada por 250.000 organizaciones; soporta peticiones HTTP/GraphQL y webhooks. En abril de 2025 introdujo "AI Agents". Ideal para usuarios no técnicos por su feedback visual inmediato.

**n8n**
Plataforma de automatización open-source, autoalojable, basada en nodos, orientada a perfiles técnicos. Casos de uso: workflows complejos con lógica condicional, agentes de IA, pipelines RAG, integraciones por API. Soporta JavaScript, nodos comunitarios y cualquier API vía nodo HTTP Request. Más de 400 integraciones oficiales. Destaca por su nodo "AI Agent", integración con LangChain y soporte de bases vectoriales para RAG. Cobra por ejecución de workflow completo (no por paso).

**Zapier**
Plataforma de automatización no-code pionera, con el mayor catálogo de integraciones del mercado. Casos de uso: automatizaciones tipo "si pasa X, haz Y", conexión rápida entre SaaS populares. Incluye "AI by Zapier" y pasos de código. Webhooks y API. Recomendado para principiantes y automatizaciones lineales de volumen bajo-medio.

**Pipedream**
Plataforma de automatización orientada a desarrolladores que combina builder visual con código (Node.js, Python, Go, Bash) en modelo serverless. Casos de uso: workflows intensivos en API, procesamiento de webhooks, prototipado, tareas programadas. Más de 3.000 apps y servidor MCP para agentes de IA. API REST para crear workflows programáticamente. El 19 de noviembre de 2025 Workday anunció el acuerdo definitivo para adquirir Pipedream ("a leading integration platform for AI agents with more than 3,000 pre-built connectors"), con cierre previsto para Q4 del año fiscal 2026 (31 de enero de 2026).

**Activepieces**
Plataforma de automatización open-source (licencia MIT) y AI-first, autoalojable, alternativa a Zapier/Make/Workato. Casos de uso: automatización de marketing y ventas, notificaciones, agentes de IA. Sus "pieces" en TypeScript son extensibles; más de 280 piezas, muchas disponibles como servidores MCP para LLMs (Claude Desktop, Cursor, Windsurf). Soporta webhooks, HTTP, código y función "human-in-the-loop" (Todos) para pasos de aprobación manual.

**Workato**
Plataforma iPaaS de nivel empresarial, orientada a equipos de TI con necesidades de gobernanza. Casos de uso: integración de sistemas empresariales (ERP, CRM, RRHH), automatización a escala con compliance. "Recetas" reutilizables, conectores empresariales y capacidades de IA. API y webhooks.

**Tray.io**
Plataforma iPaaS low-code orientada a empresa. Casos de uso: orquestación de datos entre sistemas, automatización de RevOps, integraciones complejas. Builder visual, conectores empresariales, API y webhooks.

**IFTTT (If This Then That)**
Plataforma de automatización sencilla orientada al consumidor y al IoT. Casos de uso: automatizaciones de un solo paso entre servicios de consumo, integración con dispositivos conectados (hogar inteligente). API (Webhooks service) para casos básicos. Menos potente que Make o n8n para lógica empresarial.

**Microsoft Power Automate**
Plataforma de automatización de Microsoft integrada en Microsoft 365 / Azure. Casos de uso: flujos en entornos corporativos Microsoft, RPA de escritorio, aprobaciones, integración con Teams, SharePoint, Outlook, Dataverse. Conectores nativos al stack Microsoft y a SaaS de terceros. API y webhooks.

**Latenode**
Plataforma de automatización que combina builder visual con código JavaScript y un copiloto de IA que genera código dentro de los workflows. Casos de uso: automatizaciones que equilibran simplicidad visual y personalización avanzada con infraestructura gestionada. Integraciones por API.

**Gumloop**
Plataforma de automatización AI-first orientada a workflows con IA y agentes. Casos de uso: automatizaciones con razonamiento de LLMs, procesamiento de documentos y datos no estructurados. Builder visual.

---

## 2. IA / LLMs y plataformas de IA

**OpenAI**
Proveedor de los modelos GPT (y modelos open-weight gpt-oss), DALL·E (imagen) y Whisper (voz). Casos de uso: chatbots, generación y análisis de texto, asistentes, visión, transcripción, function calling y salidas estructuradas. API REST ampliamente soportada; estándar de facto compatible con otras plataformas. Integraciones nativas en Make, n8n, Zapier, Pipedream, Activepieces.

**Anthropic (Claude)**
Proveedor de los modelos Claude, orientados a seguridad y asistencia, con ventanas de contexto amplias (familia 200K tokens). Casos de uso: razonamiento, análisis de documentos largos, generación y revisión de código, agentes. API disponible; conectores nativos en las principales plataformas. Ofrece Claude Code y servidores MCP.

**Google Gemini**
Familia de modelos multimodales de Google (Gemini Pro / Flash), con ventanas de contexto muy amplias. Casos de uso: tareas multimodales (texto, imagen, audio, vídeo), razonamiento sobre documentos extensos, integración con Google Cloud / Vertex AI. API vía Google AI Studio y Vertex AI. Créditos diarios gratuitos en AI Studio facilitan el uso educativo.

**Mistral AI**
Proveedor europeo (París) de modelos abiertos y optimizados (Mistral, Mixtral, Codestral, Mistral Large/Small). Casos de uso: inferencia rápida, secuencias largas, generación de código, residencia de datos en la UE. Modelos open-source (Apache 2.0) y API comercial ("La Plataforme"); disponibles también vía Together, Replicate, Perplexity.

**Cohere**
Proveedor de LLMs orientado a empresa (modelos Command R+ / Command A). Casos de uso: RAG, clasificación, summarización y embeddings sobre datos privados corporativos. API por tokens; fuerte enfoque en calidad de recuperación y embeddings (benchmark MTEB).

**Hugging Face**
Plataforma open-source para construir, entrenar y desplegar modelos de ML, "el GitHub de la IA". Casos de uso: acceso a modelos (Llama, Mistral, etc.), datasets, demos, inferencia y fine-tuning. Según el blog de estadísticas de modelos de Hugging Face (octubre 2025), el Hub aloja más de 2,2 millones de modelos con más de 2.200 millones de descargas (superó los 2 millones de modelos en 2025, solo 335 días tras alcanzar el primer millón). API de inferencia, librerías (Transformers) y endpoints desplegables. Nodo nativo en n8n.

**Perplexity**
Motor de respuestas conversacional con acceso web en tiempo real y citas de fuentes; arquitectura multi-modelo. Casos de uso: investigación, fact-checking, búsqueda con fuentes verificables, sistemas RAG con datos actuales. API de desarrollador (modelos Sonar) y pplx-api compatible con el formato de OpenAI.

**ElevenLabs**
Plataforma líder de síntesis y clonación de voz por IA, con voces ultra-realistas y multilingües. Casos de uso: locuciones, audiolibros, doblaje, voces para agentes y vídeos. API disponible; usado por terceros (p. ej. HeyGen integra ElevenLabs para voz).

**Replicate**
Plataforma para ejecutar y desplegar modelos open-source (Llama, modelos de imagen/vídeo) vía API unificada sin gestionar infraestructura. Casos de uso: integrar modelos multimodales, prototipado, fine-tuning. Formato de API propio (no compatible OpenAI); pago por tiempo de cómputo. Soporta multimodal y streaming.

**Together AI**
Plataforma de inferencia con baja latencia (sub-100ms) y fine-tuning en la misma plataforma. Según la web oficial de Together AI, ofrece más de 200 modelos open-source ("Browse 200+ models for text, image, video, code, and audio — available via a unified API with serverless pay-per-token pricing"). Casos de uso: despliegue de modelos abiertos a escala, switching de modelos, entrenamiento personalizado. Endpoint compatible con OpenAI.

**Groq**
Plataforma de inferencia de altísima velocidad basada en hardware propio LPU (Language Processing Unit), optimizada para latencia mínima. Casos de uso: agentes en tiempo real, copilotos, chatbots donde la velocidad es crítica. Catálogo más reducido (Llama, gpt-oss, Qwen, Kimi K2, Whisper), sin fine-tuning. API compatible con OpenAI.

**OpenRouter**
Pasarela unificada (gateway) que da acceso a cientos de modelos comerciales y open-source mediante una sola API, enrutando a proveedores subyacentes. Casos de uso: evitar lock-in, comparar/cambiar modelos sin reescribir código, optimizar coste/rendimiento. Endpoint compatible con OpenAI; añade un pequeño margen sobre el coste del modelo.

**Fireworks AI**
Plataforma de inferencia generativa orientada a velocidad y producción, con motor propio FireAttention para texto, imagen y audio. Casos de uso: despliegue de modelos open-source con baja latencia, fine-tuning, aplicaciones multimodales con cumplimiento HIPAA/SOC2. Endpoint compatible con OpenAI.

**Cerebras**
Plataforma de inferencia basada en hardware propio Wafer-Scale Engine, optimizada para throughput muy alto en modelos open-source. Casos de uso: cargas masivas de summarización, ETL y analítica que requieren máxima velocidad de tokens. Catálogo acotado.

---

## 3. Bases de datos y backend

**Supabase**
Backend open-source sobre PostgreSQL, alternativa a Firebase. Ofrece base de datos, autenticación (con Row Level Security), almacenamiento, funciones edge, APIs autogeneradas y tiempo real. Casos de uso: backend completo para apps web/móviles, MVPs, SaaS. Incluye pgvector para búsqueda vectorial/RAG. API REST y en tiempo real; integraciones con plataformas de automatización.

**Firebase**
Backend-as-a-Service de Google con base NoSQL (Firestore / Realtime Database), autenticación, hosting, cloud functions y push. Casos de uso: apps móviles (especialmente FlutterFlow), sincronización en tiempo real, capacidades offline, MVPs. SDKs nativos y fuerte integración con Google. Menos adecuado para joins complejos o modelos relacionales clásicos.

**Airtable**
Híbrido de hoja de cálculo y base de datos con interfaz visual, usado como backend ligero. Casos de uso: gestión de datos por usuarios no técnicos, MVPs, herramientas internas. API REST instantánea por base; integraciones nativas en Make, n8n, Zapier. Tiene límites de rate.

**PostgreSQL / Neon**
PostgreSQL es la base relacional open-source de referencia. **Neon** es un PostgreSQL serverless gestionado, con autoescalado, escala a cero (pausa el cómputo tras ~5 min de inactividad), restauración point-in-time y "branching" estilo Git (popular para dev/test y bases efímeras de agentes de IA). Casos de uso: backend relacional escalable, entornos de desarrollo, apps serverless/edge. Protocolo Postgres estándar más driver serverless (HTTP/WebSocket); API de gestión y una Data API HTTP en beta. Automatización vía conector PostgreSQL de Zapier y nodo Postgres de n8n.

**PlanetScale**
Base de datos serverless compatible con MySQL, sobre Vitess (tecnología de escalado de YouTube). Flujo estilo Git: branching, deploy requests y cambios de esquema no bloqueantes; también ofrece PlanetScale Postgres. Casos de uso: bases escalables para producción, cambios de esquema seguros. API REST de gestión, CLI (pscale) y driver HTTP serverless compatible con Fetch para runtimes edge (Cloudflare Workers, Vercel Edge). Sin app nativa destacada en Zapier/Make; automatización vía su API.

**MongoDB Atlas**
Base documental (NoSQL) gestionada y multi-cloud (AWS/Azure/GCP). Incluye Atlas Vector Search (ANN con HNSW), full-text e híbrida, como base operacional + vectorial unificada para RAG/GenAI. Casos de uso: apps con datos flexibles/documentales, GenAI, búsqueda semántica. Drivers MongoDB, API de administración y Automated Embedding (Voyage AI). Integra con LangChain, LlamaIndex, Amazon Bedrock.

**Xano**
Plataforma de backend no-code completa (no solo base de datos), sobre PostgreSQL con autenticación, almacenamiento, APIs en tiempo real y editor visual de lógica. Casos de uso: backends personalizados para Bubble, Adalo, WeWeb o FlutterFlow; MVPs con lógica compleja sin SQL. Cada endpoint puede contener secuencias de pasos (condicionales, loops, llamadas a API, operaciones de IA) en un runtime unificado. Infraestructura sobre Google Cloud con Docker/Kubernetes.

**Baserow**
Alternativa open-source y autoalojable a Airtable, interfaz tipo hoja de cálculo no-code. Casos de uso: bases colaborativas con propiedad total de los datos. Genera automáticamente APIs REST y GraphQL; plugins y vistas.

**NocoDB**
Herramienta open-source que convierte cualquier base SQL existente (MySQL, PostgreSQL, etc.) en una interfaz tipo hoja de cálculo no-code, alternativa a Airtable. Casos de uso: dar interfaz visual a bases existentes, herramientas internas. API REST y webhooks; autoalojable.

**PocketBase**
Backend open-source en Go empaquetado como un único ejecutable ligero. Combina base de datos (SQLite), autenticación, almacenamiento y suscripciones en tiempo real. Casos de uso: prototipos, side projects y MVPs que necesitan desplegarse rápido sin infraestructura pesada; entornos edge. API REST, schema builder, validación y SDKs cliente. No soporta cloud functions, pero permite lógica como framework Go. Autoalojable.

**Turso (libSQL/SQLite)**
Plataforma de base de datos distribuida/edge sobre libSQL (fork open-source de SQLite), para baja latencia global. Soporta réplicas embebidas (lecturas locales con sync remoto), branching y búsqueda vectorial nativa para IA/RAG. Casos de uso: base de datos por usuario/agente, multi-tenant, apps offline-first. SDKs cliente (Rust, JS/TS, Python, Go), acceso remoto vía HTTP/WebSocket, CLI y Platform API; incluye servidor MCP. Orientado a desarrolladores/API; sin conector nativo destacado de Zapier/Make.

**Appwrite**
BaaS open-source con base documental, autenticación, almacenamiento y cloud functions. Casos de uso: backend tipo Firebase con opción de autoalojar (Docker, Kubernetes) o cloud gestionada, control de compliance. APIs modulares; múltiples lenguajes.

---

## 4. Frontend / Hosting / Deploy

**Vercel**
Plataforma de despliegue optimizada para frameworks frontend, creadora de Next.js. Casos de uso: hosting de apps Next.js/React, sitios estáticos y Jamstack, funciones serverless/edge, previews por commit. Detección automática de framework, CDN global, despliegues Git-based. Creadora de v0 y del AI SDK. Funciones serverless ejecutadas como AWS Lambda.

**Netlify**
Plataforma de despliegue para sitios estáticos, Jamstack y SSR (Next.js, Astro). Casos de uso: hosting de frontend, formularios, funciones serverless y edge, deploy previews con colaboración. Detección de framework, redirects, plugins de build, split testing A/B. Acceso a agentes de IA (Claude Code, Codex, Gemini) desde el dashboard.

**Cloudflare Pages**
Plataforma de hosting full-stack sobre la red global de Cloudflare. Casos de uso: sitios estáticos/Jamstack y apps full-stack con Workers (código serverless en el edge), combinable con D1 (SQL), R2 (object storage) y KV. Ancho de banda sin límite, cold starts mínimos, distribución global por defecto. El runtime Workers difiere de Node.js, algunas APIs requieren adaptación.

**Render**
Plataforma PaaS moderna para apps full-stack. Casos de uso: despliegue de backends, web services, bases de datos gestionadas (PostgreSQL), sitios estáticos, soporte multi-región. Precios predecibles, contenedores nativos (cualquier lenguaje vía Docker). Buen ajuste para startups que buscan previsibilidad.

**Railway**
Plataforma PaaS orientada a velocidad de desarrollo y precios por uso. Casos de uso: apps full-stack, backends de bots (conexiones persistentes y workers en background), bases de datos gestionadas (PostgreSQL, MySQL, MongoDB, Redis), monorepos multi-servicio. Detección automática de proyecto, despliegues instantáneos desde GitHub, soporte Docker. Excelente para indie hackers y prototipos.

**Replit**
Entorno de desarrollo en el navegador que combina editor, hosting, base de datos y agente de IA. Casos de uso: aprender a programar, prototipado full-stack, construcción de apps asistida por IA con visibilidad del código. Su agente (Agent 3, septiembre de 2025) ofrece generación autónoma de apps, testing en navegador real y automatización en 50+ lenguajes.

**Bolt.new**
Entorno de desarrollo AI-first de StackBlitz que genera apps full-stack en el navegador usando WebContainers (entorno Node.js completo en el navegador). Casos de uso: prototipos rápidos, demos, hackathons, desarrollo sin setup local. Soporta React, Next.js, Svelte, Vue. Bolt V2 / Bolt Cloud (2025) añadió bases de datos, autenticación, almacenamiento, edge functions, analítica y hosting nativos. Open-source en GitHub.

**v0 (de Vercel)**
Generador de UI por IA que produce componentes React/Next.js a partir de prompts o imágenes (Figma-to-code). Casos de uso: generación de componentes UI de calidad de producción, design-to-code en el ecosistema Vercel. Solo frontend: no genera backend, base de datos ni autenticación. Cumplimiento SOC 2 Type II.

**Lovable**
Constructor de apps por IA AI-first para MVPs full-stack mediante conversación en lenguaje natural. Casos de uso: prototipos full-stack rápidos para fundadores no técnicos, apps con UI cuidada. Integración nativa profunda con Supabase (crea tablas, políticas RLS, flujos de auth); Lovable Cloud provisiona un backend Supabase automáticamente. Export a GitHub, escaneo de seguridad pre-publicación, Visual Edits. Genera código React/TypeScript/Tailwind.

**GitHub Pages**
Servicio de hosting estático gratuito integrado en GitHub. Casos de uso: sitios estáticos, portfolios, documentación, landing pages sencillas servidas desde un repositorio. Sin previews ni funciones serverless; opción básica frente a Vercel/Netlify.

**Fly.io**
Plataforma para desplegar contenedores (apps Docker) cerca de los usuarios en múltiples regiones. Casos de uso: apps full-stack con baja latencia global, runtimes personalizados, procesos persistentes. Orientada a desarrolladores cómodos con infraestructura (CLI-heavy).

**DigitalOcean App Platform**
Plataforma PaaS híbrida con capacidades serverless y de contenedores. Casos de uso: despliegue de apps web full-stack, backends y APIs, con balance entre simplicidad y control de infraestructura.

---

## 5. Comunicación y canales

**Telegram (Bot API)**
Aplicación de mensajería con una API de bots potente y gratuita. Casos de uso: bots conversacionales, alertas y notificaciones, agentes de IA accesibles por chat, automatización de pedidos y formularios. La Bot API permite enviar mensajes, documentos, fotos y gestionar chats. Integraciones nativas en Make, n8n y Zapier; canal muy popular para conectar agentes de IA.

**Slack**
Plataforma de mensajería y colaboración para equipos. Casos de uso: notificaciones internas, alertas de sistemas/CRM, bots de equipo, aprobaciones, integración de workflows. API completa (Web API, Events API), webhooks entrantes y app marketplace amplio. Conectores nativos en Make, n8n, Zapier, Pipedream.

**Discord**
Plataforma de comunicación por voz, vídeo y texto, popular en comunidades. Casos de uso: bots de comunidad, notificaciones, agentes de IA conversacionales, automatización de moderación. API y webhooks; integraciones nativas en las principales plataformas.

**WhatsApp Business Platform / API**
API de mensajería de WhatsApp para empresas medianas y grandes (acceso programático, no la app). Casos de uso: notificaciones transaccionales, atención al cliente, recordatorios, chatbots, mensajería bidireccional. Requiere opt-in explícito del usuario y cumplimiento de políticas de mensajería; suele consumirse vía proveedores como Twilio (que gestionan hosting y alta del número). Integrable con CRMs y plataformas de automatización (n8n, Make, Zapier).

**Twilio**
Plataforma de comunicaciones en la nube (CPaaS) con APIs para SMS, voz, WhatsApp, email y verificación. Casos de uso: envío/recepción de SMS y llamadas programáticas, WhatsApp Business API, OTP/2FA, notificaciones, IVR. APIs (Programmable Messaging, Conversations, Studio, Flex), webhooks y sandbox de WhatsApp para pruebas. Integraciones nativas en Make, n8n, Zapier.

**Gmail / Google Workspace**
Suite de productividad y correo de Google (Gmail, Calendar, Drive, Docs, Sheets). Casos de uso: automatización de correo, lectura/envío de emails en workflows, gestión de calendario y archivos, disparadores y acciones. APIs disponibles (Gmail API, Calendar API); conectores nativos en Make, n8n, Zapier, Pipedream.

**Microsoft Teams**
Plataforma de colaboración y mensajería de Microsoft 365. Casos de uso: notificaciones de equipo, integración de workflows en entornos corporativos Microsoft, alertas, bots. Conectores nativos y webhooks; fuerte integración con Power Automate.

**Intercom**
Plataforma de atención al cliente y mensajería con clientes, con fuerte componente de IA. Casos de uso: chat en vivo en web/app, soporte, onboarding, bots de IA, gestión de tickets. API y webhooks; integraciones con CRMs y plataformas de automatización.

**Crisp**
Plataforma de mensajería y atención al cliente multicanal (chat, email, redes). Casos de uso: chat en vivo, helpdesk, chatbots, buzón compartido para equipos pequeños/medianos. API y webhooks.

---

## 6. CRM y ventas

**HubSpot**
Plataforma todo-en-uno de CRM, marketing, ventas y servicio. Casos de uso: gestión de contactos y pipelines, automatización de marketing, email, lead scoring, reporting, para startups y empresas en crecimiento. Capa gratuita generosa, miles de integraciones. API y webhooks robustos; conectores nativos en plataformas de automatización.

**Salesforce**
CRM empresarial de referencia, altamente configurable y extensible. Casos de uso: gestión de relaciones a escala empresarial, automatización de ventas y servicio, ecosistema de apps (AppExchange). API completa, webhooks (Platform Events), amplias capacidades de integración. Adecuado para organizaciones grandes con necesidades complejas.

**Pipedrive**
CRM de ventas con pipeline visual estilo kanban, orientado a equipos comerciales. Casos de uso: gestión de deals y seguimiento de pipeline, automatización de ventas, secuencias de email. Interfaz limpia y adopción rápida. Conecta vía API o Zapier; soporta enriquecimiento de datos.

**Attio**
CRM moderno, flexible y API-first, sobre un modelo de base de datos relacional. Casos de uso: equipos data-driven y startups que necesitan modelos de datos personalizados (objetos y relaciones a medida), workflows GTM escalables. Enriquecimiento automático de contactos, atributos de IA nativos, API abierta y webhooks. Requiere más configuración técnica que CRMs plug-and-play.

**Notion CRM**
Uso de Notion como CRM ligero mediante bases de datos personalizadas. Casos de uso: gestión de contactos y pipelines sencillos integrada en el workspace de Notion, equipos pequeños que ya usan Notion. Flexible pero sin automatización de ventas dedicada. API de Notion e integraciones vía Make/Zapier.

**Folk**
CRM ligero y moderno orientado a relaciones, pensado para adopción rápida. Casos de uso: gestión de contactos (clientes, candidatos, inversores, prensa) con pipelines personalizados, equipos pequeños/medianos. Destaca por su integración nativa con WhatsApp y extensión de Chrome para captura desde LinkedIn; incluye secuencias de email y enriquecimiento. API en fase temprana.

---

## 7. Pagos y facturación

**Stripe**
Plataforma de pagos para desarrolladores, estándar del sector. Casos de uso: cobros con tarjeta, suscripciones (Stripe Billing), marketplaces (Stripe Connect), facturación, emisión de tarjetas. Actúa como procesador de pagos (el negocio es el merchant of record, responsable de impuestos), aunque ofrece Stripe Tax y, desde 2025, Stripe Managed Payments (modelo merchant of record a nivel de transacción). API muy completa y documentada, webhooks, amplísimo ecosistema de integraciones.

**PayPal**
Plataforma de pagos online reconocida por consumidores y comercios. Casos de uso: cobros online, checkout, pagos entre particulares y empresas, suscripciones. API y webhooks; integraciones nativas en plataformas de automatización y e-commerce.

**Paddle**
Plataforma de pagos que actúa como merchant of record (MoR), gestionando impuestos (IVA/GST) y compliance globalmente. Casos de uso: SaaS y productos digitales que venden internacionalmente sin gestionar impuestos por jurisdicción, facturación B2B con soporte de contratos. Comisión que incluye el cumplimiento fiscal. API y webhooks; checkout integrable.

**Lemon Squeezy**
Plataforma merchant of record orientada a creadores y SaaS para vender productos digitales, gestionando impuestos globales, fraude y chargebacks. Casos de uso: venta de software, cursos, ebooks, licencias y descargas digitales con tienda alojada, sistema de afiliados y captura de leads. Adquirida por Stripe el 26 de julio de 2024 (el CEO Patrick Collison lo anunció en X: "Welcome @lmsqueezy! We're going to scale merchant of record selling in a big way"). API y webhooks.

**GoCardless**
Plataforma especializada en pagos por domiciliación bancaria (direct debit) y pagos recurrentes. Casos de uso: cobro de suscripciones y facturas recurrentes vía débito bancario, reduciendo fallos de pago. API y webhooks; integraciones con plataformas de facturación y automatización.

**Polar**
Plataforma merchant of record orientada a productos para desarrolladores. Casos de uso: monetización de productos digitales y SaaS dirigidos a desarrolladores. Menos profundidad en suscripciones y contratos B2B complejos que Paddle. API disponible.

---

## 8. Productividad y gestión de proyectos

**Notion**
Workspace todo-en-uno que combina notas, documentos, wikis, bases de datos y gestión de tareas. Casos de uso: gestión del conocimiento, documentación, bases de datos personalizadas, CRM ligero, gestión de proyectos flexible. Incluye Notion AI (agentes y asistencia de escritura) y formularios con lógica condicional. API disponible; integraciones vía Make, Zapier y conectores nativos. Muy flexible pero con automatización nativa limitada.

**Trello**
Herramienta de gestión de tareas con tableros kanban, sencilla y visual. Casos de uso: gestión de tareas y proyectos sencillos, tableros de equipo con curva mínima. API y "Power-Ups"; integraciones nativas en plataformas de automatización.

**Asana**
Plataforma de gestión de proyectos y tareas para equipos. Casos de uso: seguimiento de proyectos, asignación de tareas, timelines, workflows de equipo. API y webhooks; conectores nativos en Make, n8n, Zapier.

**ClickUp**
Plataforma de gestión de proyectos todo-en-uno con tareas, docs, objetivos, dashboards y automatizaciones nativas. Casos de uso: gestión integral para equipos medianos/grandes (Gantt, sprints, time tracking, workload). Incluye ClickUp Brain (IA) y agentes. API robusta, webhooks y automatizaciones "when/then"; integra con Make y Zapier.

**Linear**
Herramienta de gestión de proyectos e issues orientada a equipos de producto y desarrollo de software. Casos de uso: seguimiento de issues, planificación de sprints/ciclos, roadmaps, con foco en velocidad y experiencia de desarrollador. API GraphQL y webhooks; integraciones nativas con GitHub, Slack y plataformas de automatización.

**Monday.com**
"Work OS" visual y centrado en proyectos con capacidades de CRM. Casos de uso: gestión de proyectos y operaciones, workflows visuales personalizables, colaboración. API y webhooks; automatizaciones nativas e integraciones.

**Coda**
Plataforma que combina documentos, bases de datos, fórmulas y automatizaciones en un solo lienzo. Casos de uso: crear herramientas internas a medida (CRMs, trackers, portales) sin código, dashboards de OKR, roadmaps. Tablas interactivas, botones, fórmulas y "Packs" de integración; Coda AI con campos de IA en tablas. API disponible; integra con Make y Zapier.

---

## 9. Almacenamiento y documentos

**Google Drive**
Servicio de almacenamiento y sincronización de archivos de Google. Casos de uso: almacenamiento en la nube, sincronización entre dispositivos, compartición de archivos, gestión documental en workflows. API REST (Drive API, requiere OAuth); conectores nativos en n8n (búsqueda de archivos/carpetas, triggers/acciones), Make y Zapier.

**Dropbox**
Servicio de almacenamiento y sincronización de archivos en la nube. Casos de uso: almacenamiento, sincronización multi-dispositivo, compartición y colaboración. API REST (OAuth2) con soporte de webhooks; nodos/apps nativos en n8n, Zapier y Make.

**Box**
Plataforma de almacenamiento y colaboración de contenido orientada a empresa, centrada en seguridad y compliance. Casos de uso: almacenamiento seguro y compartición de documentos en sectores regulados, colaboración empresarial. API REST y webhooks; conectores nativos en n8n, Zapier y Make.

**AWS S3**
Servicio de almacenamiento de objetos de Amazon. Casos de uso: almacenar y recuperar cualquier volumen de datos (archivos, backups, assets estáticos, data lakes), con control de seguridad a nivel de bucket/cuenta (S3 Block Public Access). API REST completa + SDKs de AWS; notificaciones de eventos (S3 Event Notifications a SNS/SQS/Lambda, similares a webhooks). Conectores nativos en Zapier, Make y n8n (nodo dedicado de AWS S3).

**Cloudinary**
Plataforma de gestión de medios (CDN de imágenes y vídeo) para subir, almacenar, gestionar, transformar/optimizar y entregar imágenes y vídeos vía CDN global. Casos de uso: entrega de imágenes responsive, transformaciones on-the-fly, gestión de activos digitales (DAM). API REST y SDKs; soporta webhooks/notificaciones en eventos (p. ej. nuevas subidas). Integración nativa con Zapier; conecta con Dropbox, Box y Google Drive.

**UploadThing**
Solución open-source y type-safe de subida de archivos para apps full-stack TypeScript (especialmente Next.js), presentada como un "mejor S3" con adaptadores de framework; sirve archivos vía su propio CDN. Casos de uso: gestión de subidas de archivos en apps web modernas. SDK de servidor (UTApi), SDK cliente con File Routes, URLs prefirmadas, subidas reanudables y callback tipo webhook al completar la subida (firma HMAC). Orientado a código; sin conectores nativos de Zapier/Make/n8n (se integra vía API/webhooks).

---

## 10. Analítica y datos

**Google Analytics 4 (GA4)**
Plataforma de analítica web y de apps de Google, basada en eventos (sucesora de Universal Analytics). Casos de uso: análisis de comportamiento y engagement, conversiones, reporting cross-plataforma (web y móvil), ROI de campañas. Measurement Protocol (eventos server-to-server, actualmente en modo mantenimiento; Google orienta hacia la Data Manager API), Data API para reporting y export a BigQuery. App nativa en Zapier; integrable con Make/n8n vía Measurement Protocol/HTTP.

**Mixpanel**
Plataforma de product analytics basada en eventos, fácil de adoptar. Casos de uso: análisis de comportamiento de producto (embudos, retención, cohortes), segmentación, métricas de activación y conversión. Desde 2024-2025 añadió session replay (web y móvil), heatmaps, experimentos y feature flags. Integra con CDPs (Segment) y data warehouses (Snowflake, BigQuery); API disponible. SOC 2 / GDPR.

**PostHog**
Plataforma open-source todo-en-uno para equipos técnicos. Casos de uso: product analytics, session replay, feature flags, A/B testing, error tracking, encuestas y observabilidad de LLMs en una sola herramienta. Autoalojable (MIT) o cloud; acceso SQL y data warehouse integrado (importa datos de Stripe, HubSpot, Zendesk). API y autocapture de eventos. Puede reemplazar Google Analytics, Hotjar, LaunchDarkly y Sentry combinados.

**Amplitude**
Plataforma de product analytics orientada a empresa con foco en analítica de comportamiento, retención y crecimiento. Casos de uso: análisis profundo, gobernanza de datos, atribución multi-touch, experimentación a escala. Incluye CDP y producto de experimentación; consultas warehouse-native. Integra con Segment, Snowflake, BigQuery. SOC 2 / GDPR.

**Metabase**
Herramienta de business intelligence open-source con query builder no-code (más editor SQL) para dashboards y analítica self-service. Casos de uso: dashboards, visualizaciones, analítica embebida; conecta a 20+ fuentes de datos y consulta la base directamente (no ingiere datos). Incluye "Metabot" (consultas en lenguaje natural). API REST, opciones de embedding (iframe, SDK React, JWT/SAML) y alertas/suscripciones a email, Slack o webhooks.

**Plausible Analytics**
Herramienta de analítica web open-source, ligera (script <1KB) y privacy-first: sin cookies, sin almacenar datos personales/IP, compatible con GDPR/CCPA/PECR (sin banner de consentimiento). Casos de uso: analítica web sencilla y respetuosa con la privacidad, alternativa a Google Analytics. Cloud (alojada en la UE) o autoalojable. Stats API y Events API, export CSV, Sites API; integración con Google Search Console y conector de Looker Studio. Atribución last-touch; sin integraciones nativas de CRM/ads (export vía API/CSV).

**Umami**
Plataforma de analítica web open-source (MIT) y privacy-focused: sin cookies, sin datos personales, GDPR/CCPA. Casos de uso: analítica web sencilla con embudos, cohortes, retención y journeys; alternativa a Google Analytics/Mixpanel/Amplitude. Script <2KB; autoalojable (Docker) o Umami Cloud. API REST completa (API-first); tracking de eventos vía atributos HTML o `umami.track()`. Sin conector nativo destacado de Zapier/Make (integración vía API).

---

## 11. Formularios y encuestas

**Typeform**
Constructor de formularios y encuestas conocido por su interfaz conversacional (una pregunta a la vez), enfocado en engagement y diseño. Casos de uso: encuestas, quizzes, generación de leads, feedback de clientes. Más de 300 integraciones nativas (HubSpot, Salesforce, Mailchimp, Slack), webhooks robustos y API completa; soporta hidden fields para tracking UTM. Suele lograr altas tasas de conversión.

**Google Forms**
Constructor de formularios gratuito integrado en Google Workspace. Casos de uso: encuestas básicas, quizzes, recogida de datos sencilla. Envíos ilimitados; integración fluida con Google Sheets. Carece de webhooks nativos (requiere Zapier/Apps Script para conexiones externas).

**Tally**
Constructor de formularios con interfaz tipo bloques estilo Notion, con enfoque "free-first". Casos de uso: formularios con lógica condicional, firmas, protección por contraseña, pagos; startups y freelancers. Webhooks nativos (JSON vía POST con firma SHA256), integración con Slack, Coda, Google Analytics, Meta Pixel; conecta con Zapier, Make, Pipedream e Integrately. Ofrece servidor MCP para agentes de IA.

**Jotform**
Constructor de formularios maduro con la biblioteca de plantillas más amplia (10.000+). Según Jotform, supera los 35 millones de usuarios en 2025 ("having over 35 million users"), tras superar los 25 millones en 2024 (creció 10 millones en un solo año). Casos de uso: formularios con lógica condicional, recogida de pagos, firmas electrónicas, generación de PDF, workflows de aprobación, casos HIPAA. API de formularios y webhooks para integraciones personalizadas; integra con CRMs, hojas y herramientas de facturación.

**Fillout**
Constructor de formularios moderno con fuertes integraciones nativas con Airtable y Notion, orientado a automatización. Casos de uso: formularios multi-página con branching condicional, campos de cálculo, pre-relleno por URL, scheduling. Integra con 30+ herramientas mediante conectores nativos y webhooks Zapier/Make. Lee y escribe en bases de Airtable.

**Formstack**
Constructor de formularios orientado a empresa con automatización de workflows y funciones de compliance. Casos de uso: recogida de datos, aprobaciones, documentos y firmas para sectores regulados. API y webhooks; integraciones empresariales.

---

## 12. Email marketing y comunicación masiva

**Mailchimp**
Plataforma de email marketing y automatización de marketing, una de las más conocidas. Casos de uso: newsletters, campañas de email, automatizaciones de marketing, segmentación de audiencias, para pymes y creadores. API y webhooks; amplias integraciones nativas.

**Brevo (antes Sendinblue)**
Plataforma todo-en-uno europea (empresa francesa, datos procesados en la UE) que combina email transaccional, marketing, SMS, WhatsApp y CRM. Casos de uso: email marketing y transaccional desde una sola herramienta, automatizaciones, cumplimiento GDPR. API REST y SMTP, webhooks (eventos: enviado, entregado, abierto, click, bounce); facturación por volumen de envío con contactos ilimitados.

**SendGrid (Twilio)**
Plataforma de email API de referencia para envío a gran volumen. Casos de uso: email transaccional (confirmaciones, resets de contraseña, notificaciones), infraestructura de envío a escala con IP warming e IPs dedicadas. API estable, SMTP relay, webhooks (Event Webhook, parsing inbound), plantillas dinámicas. Parte del ecosistema Twilio.

**Resend**
Plataforma de email API developer-first creada por ex-ingenieros de Vercel. Casos de uso: email transaccional con experiencia de desarrollador limpia, plantillas como componentes React (React Email), para indie hackers y startups. API moderna, SDK TypeScript, webhooks (email.bounced, email.complained), dominios personalizados. Infraestructura en EE. UU.

**Loops**
Plataforma de email construida específicamente para empresas SaaS, con email transaccional y de marketing unificados. Casos de uso: emails de ciclo de vida basados en eventos de producto, broadcasts, segmentación para SaaS en fase temprana. API basada en eventos, editor visual de workflows; envío transaccional ilimitado en planes de pago. UI moderna.

**ConvertKit (Kit)**
Plataforma de email marketing orientada a creadores (newsletters, blogs). Casos de uso: crecimiento de audiencias, secuencias de email, automatizaciones y landing pages para creadores de contenido. API y webhooks; integraciones nativas.

**Customer.io**
Plataforma de mensajería de ciclo de vida basada en eventos, multicanal. Casos de uso: automatización de mensajería compleja con branching, email + SMS + push + in-app, para equipos con necesidades avanzadas. API y webhooks; integraciones amplias.

---

## 13. Web scraping y extracción de datos

**Apify**
Plataforma full-stack de web scraping y automatización con un marketplace de miles de scrapers ("Actors") prediseñados. Casos de uso: scraping a escala, extracción de datos de plataformas específicas (Instagram, TikTok, Google Maps), automatización de navegador, alimentación de pipelines RAG/IA. API y webhooks; loaders para LangChain y LlamaIndex, integraciones con HuggingFace, Pinecone, Qdrant y conectores a S3/GCS/Azure. Permite escribir Actors personalizados en JavaScript.

**Browse AI**
Herramienta no-code de web scraping y monitorización de cambios en webs. Casos de uso: extraer datos de cualquier web sin código mediante "robots" entrenados por demostración, monitorizar cambios y programar extracciones. API y webhooks; integraciones con plataformas de automatización (incluyendo Make y Zapier).

**Firecrawl**
API de contexto web para agentes de IA: busca, scrapea, parsea e interactúa con la web devolviendo Markdown/JSON listo para LLMs. Casos de uso: agentes de investigación profunda, pipelines RAG, enriquecimiento de leads, inteligencia competitiva, monitorización de cambios. Endpoints unificados (/scrape, /search, /crawl, /map, /extract, /agent), API HTTP y SDKs, servidor MCP oficial. Maneja JavaScript, anti-bot y PDFs. Integraciones no-code nativas con Lovable, n8n, Zapier y Make; versión open-source autoalojable.

**ScraperAPI**
API de scraping que gestiona proxies, rendering de JavaScript y anti-bot. Casos de uso: scraping a escala delegando la gestión de proxies y CAPTCHAs, extracción de datos para análisis. API HTTP; integrable en workflows de datos.

**Crawlee**
Librería open-source de web crawling de Apify (basada en Puppeteer/Playwright) para construir y alojar scrapers propios. Casos de uso: desarrolladores que quieren construir y mantener su propia infraestructura de scraping. Requiere código; no es un servicio gestionado.

---

## 14. Bases de datos vectoriales y RAG

**Pinecone**
Base de datos vectorial totalmente gestionada y serverless, pionera del espacio. Casos de uso: búsqueda semántica, RAG, similarity matching, para equipos que priorizan simplicidad operativa y cero gestión de infraestructura. Indexado HNSW, latencias sub-100ms, escalado automático. API REST, namespaces, RBAC; certificaciones SOC 2 Type II, ISO 27001, GDPR y atestación HIPAA. Integra con LangChain y frameworks de IA. Modo BYOC (cluster en la cuenta cloud del cliente).

**Weaviate**
Base de datos vectorial open-source con esquemas ricos e interfaz GraphQL. Casos de uso: búsqueda semántica y contextual, gestión del conocimiento, búsqueda híbrida (vectorial + keyword BM25). Soporta entradas multimodales (texto, imagen, vídeo) y módulos de embeddings integrados (OpenAI, Cohere). APIs REST y GraphQL, gRPC; autoalojable o Weaviate Cloud. Escalado horizontal con sharding y replicación; multitenancy. SOC 2 Type II y HIPAA en cloud.

**Qdrant**
Base de datos vectorial open-source de alto rendimiento escrita en Rust. Casos de uso: aplicaciones en tiempo real, búsqueda con filtros sobre metadatos de alta cardinalidad, recomendaciones, detección de fraude. APIs REST y gRPC, payload filters, multitenancy flexible con sharding. Autoalojable (Docker/Kubernetes) o Qdrant Cloud (SOC 2 Type II). Buena relación precio-rendimiento.

**Chroma**
Base de datos vectorial open-source developer-first, muy sencilla de usar. Casos de uso: prototipado y desarrollo local, proyectos a pequeña escala, experimentación académica. Funciona en local, en memoria o como contenedor Docker. APIs y SDKs amigables; integra con LangChain y HuggingFace. Menos madura para escala extrema de producción.

**Supabase pgvector**
La extensión pgvector de PostgreSQL integrada en Supabase, que añade búsqueda vectorial nativa dentro de Postgres. Casos de uso: almacenar embeddings junto a datos relacionales, búsqueda híbrida (filtro SQL + vectorial), RAG sin base vectorial separada. Soporta distancias coseno, L2 e inner-product, índices HNSW e IVFFlat. Se usa vía SQL estándar; compatible con cualquier cliente/ORM de Postgres y frameworks de IA.

**Milvus**
Base de datos vectorial open-source cloud-native (microservicios, almacenamiento/cómputo separados) para búsqueda ANN escalable sobre miles de millones de vectores. Casos de uso: RAG, búsqueda semántica, recomendaciones, memoria de agentes de IA a gran escala. Múltiples tipos de índice (HNSW, IVF), SDKs (PyMilvus) y API REST; usa etcd + almacenamiento de objetos S3-compatible. Integra con LangChain, LlamaIndex, OpenAI, HuggingFace. Versión cloud gestionada: Zilliz Cloud.

**pgvector**
Extensión open-source de PostgreSQL (nombre `vector`) que añade almacenamiento y búsqueda vectorial dentro de Postgres. Casos de uso: RAG, recomendaciones y búsqueda semántica reutilizando la base Postgres existente, búsqueda híbrida SQL + vectorial. Distancias coseno/L2/inner-product, índices HNSW e IVFFlat. Disponible en proveedores Postgres gestionados (Supabase, Neon, Azure) y compatible con cualquier cliente/ORM y frameworks de IA.

---

## 15. Voz, audio y vídeo / IA generativa multimedia

**ElevenLabs**
Plataforma líder de síntesis y clonación de voz por IA con voces ultra-realistas y multilingües. Casos de uso: locuciones, audiolibros, doblaje, voces para agentes y vídeos. API disponible; integrada por terceros (p. ej. HeyGen usa ElevenLabs para la voz).

**HeyGen**
Plataforma de generación de vídeo con avatares de IA. Casos de uso: vídeos de formación, ventas, marketing y onboarding con avatares realistas que hablan a partir de un guion; traducción/doblaje de vídeo a 175+ idiomas con lip-sync; talking photo (animar fotos). Integra modelos de terceros (Sora, Veo, Kling para B-roll; Flux para imagen; ElevenLabs para voz). API y batch processing; SOC 2 en planes enterprise.

**Synthesia**
Plataforma de generación de vídeo con avatares de IA orientada a empresa, especialmente formación corporativa y e-learning. Casos de uso: vídeos de training, onboarding, explicativos y localización a escala (140+ idiomas con lip-sync), con biblioteca amplia de avatares y plantillas brand-safe. Sistema basado en créditos; acceso API en planes corporativos. Estricta verificación de consentimiento para clonación (empresa europea).

**Descript**
Editor de audio y vídeo basado en transcripción (editar el vídeo editando el texto). Casos de uso: contenido con diálogo (podcasts, entrevistas, tutoriales, formación), eliminación de muletillas, generación de clips para redes, clonación de voz (Overdub). Orientado a creadores, podcasters y educadores.

**Runway**
Suite creativa de IA generativa de vídeo (modelos Gen-4/Gen-4.5, Aleph). Casos de uso: generación y edición de vídeo desde texto/imagen, transformación vídeo-a-vídeo (reemplazo de objetos, transferencia de estilo, cambios de entorno), control de cámara y gestos. Orientado a profesionales del vídeo y agencias que quieren control creativo. Renderizado cinematográfico de alta calidad.

**Suno**
Plataforma de generación de música por IA. Casos de uso: crear pistas musicales completas (con voz e instrumentos) a partir de prompts, música de fondo para vídeos y contenidos. Orientado a creadores.

**Sora (OpenAI)**
Modelo de generación de vídeo de OpenAI con foco en fidelidad física y coherencia de escenas largas. Casos de uso: vídeo narrativo, escenas cinematográficas con simulación realista de movimiento y físicas. Integrado en herramientas de terceros (p. ej. HeyGen para B-roll).

---

## Notas transversales para el agente (criterios de recomendación)

- **Plataformas de automatización como "pegamento" del stack:** Make y n8n son el núcleo recomendable para conectar el resto de herramientas. n8n es preferible para proyectos técnicos, con agentes de IA, RAG y autoalojado; Make para usuarios menos técnicos y adopción rápida. Activepieces y Pipedream son alternativas open-source / orientadas a desarrollador con soporte MCP.
- **Compatibilidad fuerte con automatización (conectores nativos en Make/n8n/Zapier):** Airtable, Google Drive/Dropbox/Box, AWS S3, Slack, Telegram, Discord, Twilio, Gmail, GA4, Notion, HubSpot, Pipedrive, Tally, Typeform, Brevo, Cloudinary, Firecrawl. Son **code/API-first** (sin app nativa destacada; se integran vía API/webhooks): UploadThing, Turso, PlanetScale, Milvus, pgvector y Umami.
- **Endpoints compatibles con OpenAI** (facilitan cambiar de proveedor cambiando solo base URL y API key): Groq, Together AI, Fireworks, OpenRouter, Perplexity (pplx-api). Replicate usa formato propio.
- **RAG / IA:** para prototipos y educación son accesibles Chroma, pgvector/Supabase y Qdrant autoalojado; Pinecone aporta simplicidad gestionada; Milvus/Weaviate escalan a producción grande.
- **Privacidad / GDPR:** para analítica respetuosa con la privacidad y sin cookies, Plausible y Umami. Para residencia de datos en la UE, Brevo (email) y Mistral (LLM) son especialmente relevantes en un contexto europeo/Madrid.
- **Merchant of record (impuestos gestionados automáticamente):** Paddle, Lemon Squeezy y Polar trasladan la responsabilidad fiscal; Stripe y PayPal son procesadores (el negocio gestiona impuestos, aunque Stripe ofrece Tax y Managed Payments).
- **Avisos de madurez (confirmar antes de uso crítico):** la Data API HTTP de Neon está en beta; el Measurement Protocol de GA4 está en modo mantenimiento (Google orienta a la Data Manager API); "Turso Database" (reescritura en Rust) está en beta, siendo libSQL la vía de producción. Make migró su facturación de "operations" a "credits" a finales de 2025; Pipedream está en proceso de adquisición por Workday (cierre previsto Q4 FY2026).