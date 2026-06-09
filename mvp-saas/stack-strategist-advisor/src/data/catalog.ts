export interface SaaSItem {
  id: string;
  name: string;
  category: "Automation" | "Database" | "AI" | "VectorDB" | "Payments" | "FormsCRM" | "FormCRM" | "Analytics" | "MediaEmail" | "MultimediaIA";
  description: string;
  cases: string[];
  features: string[];
  gdpr: boolean;
  moR?: boolean; // Merchant of Record
  openAiCompatible?: boolean; // OpenAI API compatible
  selfHostable?: boolean;
  maturityWarning?: string;
  hasNativeAutomation?: boolean;
  notes?: string;
}

export const saasCatalog: SaaSItem[] = [
  // --- AUTOMATIZACIÓN ---
  {
    id: "make",
    name: "Make (antes Integromat)",
    category: "Automation",
    description: "Plataforma visual de automatización en la nube basada en escenarios que conectan módulos mediante interfaz drag-and-drop. Soporta 'AI Agents' desde abril de 2025. Migró a facturación por créditos a finales de 2025.",
    cases: [
      "Sincronización de datos entre SaaS populares",
      "Onboarding automático de clientes",
      "Lead scoring y reporting",
      "Orquestación de procesos estructurados visuales"
    ],
    features: [
      "Más de 3.000 integraciones certificadas",
      "Webhooks instantáneos e interfaz de depuración interactiva",
      "Soporte nativo de peticiones HTTP/GraphQL",
      "Nueva suite de AI Agents integrada"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "Facturación por créditos (no por operaciones completas). Es excelente para lógica visual no-code."
  },
  {
    id: "n8n",
    name: "n8n",
    category: "Automation",
    description: "Plataforma de automatización extensible, basada en nodos y autoalojable. Es muy popular entre desarrolladores por permitir una privacidad extrema y flujos complejos con integración de agentes de IA autónomos locales.",
    cases: [
      "Flujos de automatización que procesan datos sensibles",
      "Pipelines de RAG avanzados y agentes de IA autónomos",
      "Orquestaciones con código JavaScript/Python integrado"
    ],
    features: [
      "Nodo 'AI Agent' y herramientas integradas con LangChain",
      "Cumplimiento GDPR total al poder autoalojarse en servidores locales",
      "Más de 400 integraciones oficiales robustas",
      "Cobros transparentes por ejecución de flujo completo"
    ],
    gdpr: true,
    selfHostable: true,
    hasNativeAutomation: true,
    notes: "Altamente recomendado para conectar con bases como Supabase e IA autogestionada sin fugas de datos."
  },
  {
    id: "pipedream",
    name: "Pipedream",
    category: "Automation",
    description: "Plataforma serverless de automatización orientada a programadores que combina un constructor visual estructurado con bloques de código personalizados (NodeJS, Python, Go, Bash).",
    cases: [
      "Workflows intensivos en manipulación de datos con APIs",
      "Desarrollo de microservicios rápidos sin gestionar servidores",
      "Procesamiento avanzado de payloads y webhooks con firma criptográfica"
    ],
    features: [
      "Más de 3.000 conectores listos para usar",
      "Servidores MCP nativos para agentes autónomos",
      "Consumo de APIs granular basado en un runtime serverless rápido"
    ],
    gdpr: false,
    selfHostable: false,
    maturityWarning: "Workday anunció el acuerdo definitivo para adquirir Pipedream en noviembre de 2025, con cierre previsto para Q4 del año fiscal 2026 (31 de enero de 2026). Planifique a largo plazo con precaución.",
    hasNativeAutomation: true,
    notes: "Muy potente para ingenieros que necesitan customizar cada bloque con código puro."
  },
  {
    id: "activepieces",
    name: "Activepieces",
    category: "Automation",
    description: "Plataforma de automatización open-source (licencia MIT) y AI-first, autoalojable y diseñada como una alternativa moderna a Zapier y Make.",
    cases: [
      "Automatización de operaciones comerciales internas",
      "Creación de interfaces de aprobación manual (human-in-the-loop)",
      "Orquestación de workflows con integración de servidores MCP"
    ],
    features: [
      "Piezas codificadas en TypeScript modulares y extensibles",
      "Autoalojable localmente garantizando custodia de datos",
      "Más de 280 conectores y soporte de webhooks nativos"
    ],
    gdpr: true,
    selfHostable: true,
    hasNativeAutomation: true,
    notes: "Permite flujos colaborativos intermedios donde se requiere validación de personas."
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation",
    description: "Plataforma pionera y líder absoluta en volumen de integraciones. Especialmente adaptada para perfiles no técnicos y flujos sencillos lineales de baja escala.",
    cases: [
      "Conexión ultra rápida de apps del día a día (ej. email a Slack)",
      "Creación rápida de zaps simples de un solo paso",
      "Automatizaciones de testeo para validar ideas de negocio rápido"
    ],
    features: [
      "El catálogo de integraciones más grande de la industria",
      "Herramientas internas 'AI by Zapier' y pasos opcionales con código",
      "Formularios internos sencillos de captura"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: true
  },
  {
    id: "latenode",
    name: "Latenode",
    category: "Automation",
    description: "Plataforma de automatización híbrida que permite equilibrar la sencillez visual con código JavaScript redactado o refinado de forma asistida por un copiloto de IA integrado.",
    cases: [
      "Automatizaciones personalizadas con lógica densa de código",
      "Integraciones exprés de APIs sin conector oficial"
    ],
    features: [
      "Generador de código JS por IA dentro del lienzo",
      "Infraestructura gestionada que reduce el mantenimiento serverless"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: false
  },
  {
    id: "gumloop",
    name: "Gumloop",
    category: "Automation",
    description: "Plataforma de automatización AI-first orientada a workflows basados en el razonamiento de LLMs y el procesamiento avanzado de datos no estructurados.",
    cases: [
      "Pipelines de scraping inteligentes y extracción de información",
      "Automatizaciones de soporte guiadas por razonamiento cognitivo"
    ],
    features: [
      "Lienzo visual optimizado para encadenar llamadas a modelos",
      "Procesamiento robusto de documentos heterogéneos"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: false
  },

  // --- BASES DE DATOS & BACKEND ---
  {
    id: "supabase",
    name: "Supabase",
    category: "Database",
    description: "Alternativa open-source a Firebase basada en PostgreSQL. Proporciona una suite completa que incluye base de datos, autenticación con Row Level Security (RLS), almacenamiento de objetos, funciones edge y tiempo real nativo.",
    cases: [
      "Backend de apps SaaS e indie-hacker robustas",
      "Desarrollo ágil de MVPs con bases relacionales escalables",
      "Búsqueda semántica usando su extensión pgvector"
    ],
    features: [
      "Uso nativo de PostgreSQL con compatibilidad SQL pura",
      "Row Level Security (RLS) integrado para control seguro a nivel de registro",
      "Cumple GDPR (servidores en UE y autoalojable)",
      "Capa gratuita ideal para prototipos y estudiantes de IA"
    ],
    gdpr: true,
    selfHostable: true,
    hasNativeAutomation: true,
    notes: "Posee una compatibilidad excepcional y directa con n8n para sincronizaciones."
  },
  {
    id: "neon",
    name: "Neon PostgreSQL",
    category: "Database",
    description: "PostgreSQL Serverless moderno con almacenamiento desagregado, capaz de escalar instantáneamente y 'esparcirse' en ramas (branching) para facilitar flujos de desarrollo ágiles.",
    cases: [
      "Proyectos serverless con necesidades fluctuantes de cómputo",
      "Bases de datos efímeras para pruebas de CI/CD",
      "Proyectos que buscan pausar costos de base de datos en desuso (escala a cero)"
    ],
    features: [
      "Branching instantáneo de base de datos estilo Git",
      "Autoescalado integrado y escala a cero tras 5 minutos de inactividad",
      "Compatibilidad total con herramientas estándar de Postgres"
    ],
    gdpr: false,
    selfHostable: false,
    maturityWarning: "Su API HTTP Data API se encuentra actualmente en fase beta.",
    hasNativeAutomation: false
  },
  {
    id: "turso",
    name: "Turso Database",
    category: "Database",
    description: "Base de datos SQL distribuida de ultra-baja latencia en el edge basada en libSQL (un fork open-source compatible con SQLite).",
    cases: [
      "Bases de datos multi-tenant o de alta proximidad geográfica",
      "Proyectos que implementan una base de datos individual por usuario o agente",
      "Aplicaciones en entornos edge y Edge Workers con almacenamiento local sincronizado"
    ],
    features: [
      "Réplicas embebidas que aseguran lecturas instantáneas locales",
      "Búsqueda vectorial nativa ultra rápida para IA/RAG",
      "Autoalojable (servidor libSQL de código abierto)",
      "Incluye un servidor MCP oficial para interactuar con agentes de IA"
    ],
    gdpr: true,
    selfHostable: true,
    maturityWarning: "La reescritura de su núcleo en Rust se encuentra actualmente en fase beta; se recomienda utilizar libSQL en producción.",
    hasNativeAutomation: false,
    notes: "Dado que carece de conectores directos nativos en plataformas como Make, para integrarla requiere de bloques HTTP/Webhooks manuales."
  },
  {
    id: "firebase-db",
    name: "Firebase",
    category: "Database",
    description: "El clásico Backend-as-a-Service (BaaS) de Google con bases de datos NoSQL (Firestore y Realtime Database), autenticación integrada de fábrica, almacenamiento e infraestructura de hosting.",
    cases: [
      "Aplicaciones móviles concurrentes, en especial con FlutterFlow",
      "Sincronizaciones estrictamente en tiempo real con soporte offline nativo",
      "Prototipos rápidos que requieren escalabilidad global sin estructuración SQL inicial"
    ],
    features: [
      "Soporte offline impecable en SDKs cliente móviles y web",
      "Base documental flexible y funciones Cloud Functions integradas",
      "Autenticación robusta out-of-the-box"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "Es menos idóneo para consultas con uniones complejas u operaciones analíticas masivas relacionales."
  },
  {
    id: "airtable",
    name: "Airtable",
    category: "Database",
    description: "Híbrido de hoja de cálculo visual y base de datos relacional usada de manera no-code por millones de gestores de negocio para centralizar y coordinar operaciones ágiles.",
    cases: [
      "Bases de datos de gestión administrativa manipuladas por usuarios no técnicos",
      "CRM ligero y planificadores visuales de marketing/contenido",
      "Backends sencillos de visualización rápida para prototipos"
    ],
    features: [
      "Interfaz estéticamente impecable con vistas Kanban, Gantt y Calendario",
      "Formularios nativos con lógica condicional avanzada",
      "APIs estructuradas generadas automáticamente de forma visual"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "Tiene limitaciones de rate-limits y capacidad de registros estrictas por base."
  },
  {
    id: "pocketbase",
    name: "PocketBase",
    category: "Database",
    description: "Backend de código abierto en un único binario escrito en Go que encapsula una base de datos SQLite con tiempo real, cuentas de usuarios y gestión de archivos.",
    cases: [
      "Lanzamiento de prototipos personales o MVPs embebidos en hardware pequeño",
      "Proyectos que priorizan un autodespliegue minimalista con cero dependencias"
    ],
    features: [
      "Un solo ejecutable superligero",
      "Base SQLite reactiva en tiempo real",
      "Administrador web integrado listo para usar"
    ],
    gdpr: true,
    selfHostable: true,
    hasNativeAutomation: false
  },

  // --- INTELIGENCIA ARTIFICIAL (IA / LLMs) ---
  {
    id: "groq",
    name: "Groq Cloud",
    category: "AI",
    description: "Plataforma de inferencia de modelos de ultra-baja latencia equipada con chips LPU (Language Processing Unit) diseñados de manera personalizada.",
    cases: [
      "Agentes de IA conversacionales interactivos por voz o chat",
      "Automatizaciones y pipelines cognitivos donde el tiempo de respuesta es crítico"
    ],
    features: [
      "API 100% compatible con OpenAI (solo requiere variar la base URL y la clave API)",
      "Inferencia del catálogo de modelos como Llama y Mixtral a velocidades sin precedentes",
      "Rendimiento extremo sin necesidad de fine-tuning complejo"
    ],
    gdpr: false,
    selfHostable: false,
    openAiCompatible: true,
    hasNativeAutomation: true,
    notes: "La regla de flexibilidad de IA aplica aquí: puedes incorporarla y cambiarla de forma ágil sin reescribir."
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    category: "AI",
    description: "Pasarela unificada de APIs de IA que brinda acceso directo a cientos de modelos en la nube mediante un único endpoint estructurado compatible.",
    cases: [
      "SaaS multi-modelo que permite cambiar de proveedor sin modificar código",
      "Optimización dinámica de costes seleccionando la ruta más económica",
      "Acceso directo a modelos top (Claude, GPT-4o, Llama) bajo un único saldo unificado"
    ],
    features: [
      "API compatible al 100% con el estándar de OpenAI",
      "Añade un margen mínimo y automatiza la conmutación por error (fallback)",
      "Acceso directo a modelos en tiempo real"
    ],
    gdpr: false,
    selfHostable: false,
    openAiCompatible: true,
    hasNativeAutomation: true,
    notes: "Es la herramienta definitiva para evitar el lock-in con grandes proveedores."
  },
  {
    id: "mistral",
    name: "Mistral AI",
    category: "AI",
    description: "Compañía europea de inteligencia artificial (con sede central en París) que ofrece un catálogo de modelos optimizados rápidos, ideales para cumplir normativas estrictas.",
    cases: [
      "Proyectos corporativos o públicos con restricciones de soberanía de datos en Europa",
      "Generación de código estructurado en español/multilingüe con Codestral"
    ],
    features: [
      "Infraestructura y almacenamiento ubicados estrictamente en territorio europeo",
      "Formato de endpoint y SDKs compatibles con OpenAI",
      "Modelos open-weight de alto rendimiento listos para autoalojarse"
    ],
    gdpr: true,
    selfHostable: true,
    openAiCompatible: true,
    hasNativeAutomation: true,
    notes: "Es la elección predeterminada bajo la regla de privacidad de GDPR para modelado cognitivo."
  },
  {
    id: "perplexity",
    name: "Perplexity API",
    category: "AI",
    description: "Inferencia de modelos conversacionales enriquecidos nativamente con búsquedas activas en la web en tiempo real.",
    cases: [
      "Sistemas de fact-checking y recuperación de fuentes verificadas",
      "Generación de resúmenes informativos con citación de URL activas en directo"
    ],
    features: [
      "Endpoint de desarrollador (pplx-api) totalmente compatible con OpenAI",
      "Búsqueda activa y precisa en la web en tiempo real incorporada de serie"
    ],
    gdpr: false,
    selfHostable: false,
    openAiCompatible: true,
    hasNativeAutomation: true
  },
  {
    id: "openai",
    name: "OpenAI",
    category: "AI",
    description: "El creador del ecosistema de LLMs modernos. Inferencia de modelos GPT-4, salidas JSON estructuradas y function calling.",
    cases: [
      "Aplicaciones generales de lenguaje, traducción y análisis cognitivo",
      "Detección multimodal de imágenes"
    ],
    features: [
      "Estándar de la industria",
      "Function calling nativo y consistente",
      "Generación de imágenes con DALL-E e inferencia de voz estable"
    ],
    gdpr: false,
    selfHostable: false,
    openAiCompatible: true,
    hasNativeAutomation: true
  },
  {
    id: "anthropic",
    name: "Anthropic (Claude)",
    category: "AI",
    description: "Proveedor de los modelos Claude, reputados por su seguridad, robustez en tareas de código compleja y un gran tamaño de contexto.",
    cases: [
      "Análisis de documentación regulatoria o informes densos de 200k tokens",
      "Edición avanzada de código con Claude Code y servidores de contexto MCP"
    ],
    features: [
      "Modelos líderes en razonamiento y generación informática",
      "Soporte pulido de esquemas estructurados"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: true
  },
  {
    id: "google-gemini",
    name: "Google Gemini",
    category: "AI",
    description: "Familia de modelos multimodales nativos ultra-rápidos de Google. Es perfecta para startups por su tremenda ventana de contexto de millones de tokens y excelente capa gratis de desarrollo.",
    cases: [
      "Análisis de audios, vídeos extensos o repositorios completos de código",
      "Asistentes multimodales rápidos y económicos con Gemini Flash"
    ],
    features: [
      "Ventana de contexto líder de la industria en modelos Flash y Pro",
      "Excelente capa de prueba gratuita integrada a través de Google AI Studio",
      "Capacidades nativas de audio y mapas"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "Nuestra aplicación se comunica de forma segura en el servidor utilizando este SDK."
  },

  // --- VECTOR DATABASES & RAG ---
  {
    id: "pinecone",
    name: "Pinecone",
    category: "VectorDB",
    description: "Base de datos vectorial totalmente gestionada en la nube y optimizada para servir embeddings de forma serverless en producción masiva sin mantenimiento.",
    cases: [
      "RAG industrial de millones de documentos",
      "Detección de similitud en tiempo real a gran escala sin infraestructuras físicas locales"
    ],
    features: [
      "Indexación jerárquica HNSW ultra rápida",
      "Cumplimiento robusto con certificaciones SOC2 Type II, HIPAA y GDPR",
      "Gestión en la nube sin requerir provisionamiento de servidores locales"
    ],
    gdpr: true,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "Sencillez de producción total, ideal si no se quiere autoalojar nada."
  },
  {
    id: "chroma",
    name: "Chroma DB",
    category: "VectorDB",
    description: "Base de datos vectorial ligera y de código abierto orientada a desarrolladores. Es perfecta para almacenar embeddings en memoria local o entornos locales de desarrollo rápido.",
    cases: [
      "Desarrollo ágil de prototipos RAG en la máquina del programador",
      "Bases de datos vectoriales locales que no requieren red para pruebas académicas"
    ],
    features: [
      "Instalación inmediata en memoria local o contenedor Docker sencillo",
      "Fácil de implementar bajo la regla GDPR de privacidad extrema por ser local"
    ],
    gdpr: true,
    selfHostable: true,
    hasNativeAutomation: false
  },
  {
    id: "qdrant",
    name: "Qdrant",
    category: "VectorDB",
    description: "Base de datos vectorial open-source escrita en Rust, altamente optimizada para filtrados por metadatos de alta cardinalidad en tiempo real.",
    cases: [
      "Sistemas de recomendación rápidos de e-commerce",
      "RAGs autoalojados que requieran una extrema precisión en filtros"
    ],
    features: [
      "Escrita en Rust, óptimo rendimiento de memoria y cómputo",
      "Filtros de metadatos integrados sobre payloads estructurados",
      "Cumplimiento GDPR al ser autoalojable"
    ],
    gdpr: true,
    selfHostable: true,
    hasNativeAutomation: true
  },

  // --- MONETIZACIÓN & PAGOS (MoR vs Procesador) ---
  {
    id: "stripe",
    name: "Stripe",
    category: "Payments",
    description: "El procesador de pagos estándar preferido por ingenieros. Ofrece control milimétrico sobre el checkout, suscripciones complejos y emisión de tarjetas.",
    cases: [
      "Modelos de negocio SaaS con control absoluto de la interfaz de pago",
      "Plataformas o marketplaces complejos de cobro con Stripe Connect"
    ],
    features: [
      "API sumamente documentada y flexible",
      "Herramienta Stripe Tax para el cálculo exacto de impuestos",
      "Excelente manejo de suscripciones periódicas complejas"
    ],
    gdpr: true,
    moR: false,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "Nota Crítica (Regla MoR): Stripe NO es un Merchant of Record. Solo calcula los impuestos (en su versión Tax). El creador del SaaS tiene la obligación legal de declarar, recaudar e ingresar el IVA/Sales Tax acumulado país por país de forma manual, lo que añade una carga fiscal brutal al despegar."
  },
  {
    id: "lemonsqueezy",
    name: "Lemon Squeezy",
    category: "Payments",
    description: "Plataforma Merchant of Record (MoR) todo-en-uno, especialmente diseñada para SaaS y productos digitales que venden de manera global sin complejidades fiscales.",
    cases: [
      "SaaS de fundadores individuales que desean facturar globalmente desde el día 1",
      "Venta de software, plantillas o licencias sin gestionar declaraciones de IVA locales"
    ],
    features: [
      "Adquirida por Stripe en julio de 2024 para escalar el modelo Merchant of Record",
      "Asume la completa responsabilidad legal de recaudar y declarar impuestos de ventas a nivel mundial",
      "Administración y cobro automático de afiliados incorporado de serie"
    ],
    gdpr: true,
    moR: true,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "La regla MoR aplica directamente aquí: trasladas todo el dolor tributario internacional a su pasarela."
  },
  {
    id: "paddle",
    name: "Paddle",
    category: "Payments",
    description: "Merchant of Record de referencia a nivel empresarial para SaaS tanto B2B como B2C que requieren escalar su facturación con un completo compliance internacional.",
    cases: [
      "Monetización global de aplicaciones SaaS medianas o consolidadas",
      "SaaS B2B que combinan cobros por tarjeta tradicionales con transferencias y facturas formales"
    ],
    features: [
      "Plataforma completa de impuestos, compliance internacional y checkout unificado",
      "Gestor de suscripciones robusto y conciliación bancaria instantánea"
    ],
    gdpr: true,
    moR: true,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "Ideal para equipos consolidados que no quieren lidiar con leyes fiscales complejas."
  },
  {
    id: "polar",
    name: "Polar.sh",
    category: "Payments",
    description: "Merchant of Record (MoR) moderno, open-source y API-first enfocado en desarrolladores independientes y proyectos de software ligados a GitHub.",
    cases: [
      "SaaS técnicos y monetización de repositorios open-source",
      "Suscripciones y beneficios atados a credenciales de desarrollador en GitHub"
    ],
    features: [
      "Servicio de Merchant of Record global con API moderna y flexible",
      "Plataforma 100% de código abierto que respeta los estándares GDPR"
    ],
    gdpr: true,
    moR: true,
    selfHostable: true,
    hasNativeAutomation: false
  },

  // --- CRM & FORMULARIOS ---
  {
    id: "tally",
    name: "Tally.so",
    category: "FormCRM",
    description: "El creador de formularios online más apreciado por su interfaz minimalista estilo Notion. Más de un 99% de sus funciones avanzadas son completamente gratuitas.",
    cases: [
      "Formularios dinámicos para captar leads e inscripciones gratuitas",
      "Encuestas complejas con subida de archivos y webhooks instantáneos gratis"
    ],
    features: [
      "Interfaz idéntica a los bloques de Notion atractiva para usuarios",
      "Lógica condicional, cálculo de variables y redirecciones gratuitas",
      "Cumplimiento intachable de GDPR y cuenta con un servidor MCP para agentes"
    ],
    gdpr: true,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "Una joya absoluta para startups que desean recortar gastos de formularios complejos."
  },
  {
    id: "typeform",
    name: "Typeform",
    category: "FormCRM",
    description: "Creador de cuestionarios interactivos conversacionales premium con transiciones fluidas de alta estética visual.",
    cases: [
      "Quizzes dinámicos de marketing orientados a la máxima conversión",
      "Encuestas de marca corporativa que valoran el diseño por encima del presupuesto"
    ],
    features: [
      "Visualización impecable de 'una pregunta a la vez'",
      "Límites estrictos en su capa gratuita, lo que obliga a escalar rápido a planes costosos",
      "Integraciones con HubSpot, Salesforce e infinidad de CRMs estándar"
    ],
    gdpr: true,
    selfHostable: false,
    hasNativeAutomation: true
  },
  {
    id: "jotform",
    name: "Jotform",
    category: "FormCRM",
    description: "Plataforma de formularios robusta y madura con la mayor biblioteca de plantillas listos para usar de internet.",
    cases: [
      "Formularios que requieren integrarse con cobros por tarjeta directos",
      "Encuestas complejas que requieren flujos de aprobación firmados electrónicamente"
    ],
    features: [
      "Superó los 35 millones de usuarios globales en 2025",
      "Flujos de aprobación (Jotform Approvals) y creador de PDFs incorporados de serie",
      "Cumplimiento de estándares de salud (HIPAA) y webhooks fiables"
    ],
    gdpr: true,
    selfHostable: false,
    hasNativeAutomation: true
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "FormCRM",
    description: "La suite de CRM, marketing, ventas y soporte preferida por startups tecnológicas en crecimiento global.",
    cases: [
      "Gestión comercial y canalización de llamadas de ventas (pipeline)",
      "Automatizaciones complejas de correo electrónico (secuencias y workflows)"
    ],
    features: [
      "Capa gratis de base de contactos excepcionalmente generosa para empezar",
      "Panel de reporting unificado para marketing y ventas"
    ],
    gdpr: true,
    selfHostable: false,
    hasNativeAutomation: true
  },
  {
    id: "attio",
    name: "Attio",
    category: "FormCRM",
    description: "CRM moderno, flexible e íntegramente API-first, estructurado sobre un modelo de base de datos relacional dinámico.",
    cases: [
      "Startups con flujos comerciales atípicos que precisan relacionar objetos de forma modular",
      "Enriquecimiento automatizado con IA de leads o perfiles inversores"
    ],
    features: [
      "Atributos inteligentes por IA que clasifican emails recibidos automáticamente",
      "API sumamente flexible y webhooks orientados a desarrolladores"
    ],
    gdpr: true,
    selfHostable: false,
    hasNativeAutomation: false
  },

  // --- ANALÍTICA DE PRIVACIDAD ---
  {
    id: "plausible",
    name: "Plausible Analytics",
    category: "Analytics",
    description: "Analítica web ultra-ligera (script inferior a 1KB) y 100% de código abierto que opera sin cookies y sin recabar IPs, garantizando cumplimiento GDPR sin banners molestos.",
    cases: [
      "Análisis de tráfico de landing pages y sitios corporativos sencillos",
      "Métricas webs limpias en localizaciones con leyes de privacidad estrictas como la UE"
    ],
    features: [
      "No requiere de un cartel/banner de consentimiento de cookies por ley",
      "Completamente autoalojable en servidores europeos",
      "Integrable directamente con Google Search Console"
    ],
    gdpr: true,
    selfHostable: true,
    hasNativeAutomation: true,
    notes: "Dile adiós a los pesados banners de cookies si solo necesitas analítica simplificada de clicks."
  },
  {
    id: "umami",
    name: "Umami",
    category: "Analytics",
    description: "La alternativa de código abierto más popular a Google Analytics instalable de manera rápida a través de sistemas de contenedores Docker.",
    cases: [
      "Paneles sencillos de analítica para creadores independientes de código",
      "Monetización de tráfico web con analíticas en el servidor sin cookies"
    ],
    features: [
      "100% open-source y privacy-focused",
      "Lienzo estético limpio y script integrado de solo 2KB",
      "Event-tracking simplificado mediante atributos en HTML o llamadas JS `umami.track()`"
    ],
    gdpr: true,
    selfHostable: true,
    hasNativeAutomation: false,
    notes: "Se autoaloja de forma limpia, ideal si manejas bases SQL existentes."
  },
  {
    id: "google-analytics",
    name: "Google Analytics 4 (GA4)",
    category: "Analytics",
    description: "La herramienta de analítica por excelencia de Google, impulsada por un potente tracking de eventos y cookies de seguimiento cross-domain.",
    cases: [
      "Análisis avanzado de conversión de campañas pagadas (Google Ads)",
      "Proyectos enterprise con integración densa en BigQuery"
    ],
    features: [
      "Modelo denso centrado en eventos complejos e IA predictiva",
      "Obliga al uso estricto de consentimiento de cookies para operar en la UE"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "Measurement Protocol está actualmente en modo mantenimiento; Google orienta hacia la Data Manager API."
  },
  {
    id: "posthog",
    name: "PostHog",
    category: "Analytics",
    description: "La navaja suiza de analítica e instrumentación para programadores de producto. Consolida métricas, grabaciones de pantalla, feature flags, testeo A/B y analítica SQL en un mismo lugar.",
    cases: [
      "Validación de características en directo mediante Feature Flags complejas",
      "Análisis de experiencia de usuario viendo grabaciones de usuario (Session Replays)"
    ],
    features: [
      "Almacén SQL integrado con posibilidad de absorber datos de fuentes externas",
      "Autoalojable (licencia MIT) para retención local de datos",
      "Observabilidad de LLMs integrada de serie"
    ],
    gdpr: true,
    selfHostable: true,
    hasNativeAutomation: false
  },

  // --- EN CORREO, MEDIOS Y APIs ---
  {
    id: "firecrawl",
    name: "Firecrawl",
    category: "MediaEmail",
    description: "API de extracción que convierte cualquier sitio web completo, URL o mapa de enlaces en un chunk de Markdown o JSON estructurado libre de ruidos HTML para nutrir LLMs y pipelines RAG.",
    cases: [
      "Scraping masivo de foros o webs informativas para construir índices vectoriales",
      "Agentes autónomos de búsqueda que precisan entender el estado actual de una web"
    ],
    features: [
      "Manejo impecable del rendering de JavaScript, bloqueos anti-bot y CAPTCHAs",
      "Versión open-source totalmente autoalojable en infraestructura del desarrollador",
      "Soporta un servidor MCP oficial para dar contexto inmediato a agentes de IA"
    ],
    gdpr: true,
    selfHostable: true,
    hasNativeAutomation: true,
    notes: "Totalmente recomendada frente a scrapers rudimentarios por su limpieza de Markdown."
  },
  {
    id: "uploadthing",
    name: "UploadThing",
    category: "MediaEmail",
    description: "Librería type-safe de subida de archivos orientada a aplicaciones full-stack TypeScript (en especial React y Next.js) que automatiza y prescinde de los dolores de cabeza de gestionar buckets S3 complejos.",
    cases: [
      "Subidas de imágenes de perfil u assets multimedia por parte de clientes de un SaaS",
      "Gestión de documentos en React con seguridad cifrada granular"
    ],
    features: [
      "Integración nativa basada en componentes visuales React listos para copiar",
      "Callback robusto en el servidor que valida la culminación del archivo",
      "No tiene conector nativo in situ en Make/Zapier; funciona mediante API/Webhooks"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: false,
    notes: "Alineación limpia con arquitecturas modernas de servidor serverless."
  },
  {
    id: "brevo",
    name: "Brevo (antes Sendinblue)",
    category: "MediaEmail",
    description: "Plataforma de comunicación y marketing europea. Es reputada por la seriedad de custodiar los correos y logs estrictamente dentro de las fronteras de la UE, lo que simplifica la justificación GDPR.",
    cases: [
      "Envío masivo de newsletters y boletines de captación comercial",
      "Correos transaccionales de bienvenida o alertas de infraestructura a bajo coste"
    ],
    features: [
      "Servidores físicos ubicados estrictamente en la Unión Europea",
      "Facturación orientada estrictamente por volumen de correos sin penalizar contactos ilimitados",
      "API REST robusta y servidor SMTP convencional"
    ],
    gdpr: true,
    selfHostable: false,
    hasNativeAutomation: true,
    notes: "La herramienta óptima bajo la regla de privacidad para manejo de emails de usuarios europeos."
  },
  {
    id: "resend",
    name: "Resend",
    category: "MediaEmail",
    description: "API de correo transaccional orientada a desarrolladores que permite programar emails usando componentes interactivos de React (vía React Email).",
    cases: [
      "Automatizaciones de mailing atractivas con plantillas dinámicas de código React",
      "Notificaciones cifradas de transacciones en SaaS minimalistas"
    ],
    features: [
      "Experiencia de setup ultra refinada con dominios verificados",
      "SDK excelente en Node/TS"
    ],
    gdpr: false,
    selfHostable: false,
    hasNativeAutomation: false,
    notes: "Procesa y canaliza los correos a través de servidores ubicados en EE.UU."
  }
];
