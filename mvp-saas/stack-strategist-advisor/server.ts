import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { saasCatalog } from "./src/data/catalog.js"; // Standard ESM/CJS import

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client safely
// Set the User-Agent header to 'aistudio-build' in httpOptions for telemetry
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API endpoint for generating recommendations
app.post("/api/strategy", async (req, res) => {
  try {
    const { 
      projectType, 
      coreCapabilities, 
      priorities, 
      selectedTools = [] 
    } = req.body;

    if (!projectType) {
      return res.status(400).json({ error: "El tipo de proyecto es requerido." });
    }

    // Build context about the verified catalog
    const catalogContext = saasCatalog.map(item => {
      let notes = `ID: ${item.id} | Nombre: ${item.name} | Categoría: ${item.category} | GDPR: ${item.gdpr ? 'Sí' : 'No'}`;
      if (item.moR !== undefined) notes += ` | MoR: ${item.moR ? 'Sí' : 'No'}`;
      if (item.openAiCompatible) notes += ` | OpenAI-Compatible`;
      if (item.selfHostable) notes += ` | Autoalojable`;
      if (item.maturityWarning) notes += ` | Advertencia: ${item.maturityWarning}`;
      if (item.notes) notes += ` | Notas: ${item.notes}`;
      return `${notes}\nDescripción: ${item.description}\nCasos: ${item.cases.join(", ")}`;
    }).join("\n---\n");

    const systemInstruction = `Eres "Stack Strategist Advisor", un arquitecto de software de élite y consultor especializado en stacks tecnológicos para startups, desarrolladores independientes (indie hackers) y proyectos estudiantiles de IA y automatización.
Tu objetivo es diseñar infraestructuras eficientes, seguras, viables y con visión de futuro utilizando únicamente herramientas de la base de conocimiento verificada a continuación.

BASE DE CONOCIMIENTO VERIFICADA (SAAS CATALOG 2025-2026):
${catalogContext}

REGLAS CRÍTICAS DE DIAGNÓSTICO (LÓGICA DE NEGOCIO):
1. REGLA DE PRIVACIDAD (GDPR): Si el usuario marca prioridad de cumplimiento en la Unión Europea (UE) o GDPR, debes priorizar herramientas con bandera GDPR activa (ej. Supabase, Mistral AI, Brevo, Plausible, Umami, n8n) y advertir seriamente si eligen herramientas que procesan datos en EE.UU. sin proxies (ej. Resend, Firebase, OpenAI sin proxies).
2. REGLA DE IMPUESTOS (Merchant of Record - MoR): Cuando el usuario hable de monetizar globalmente un SaaS de forma rápida o requiera cobrar suscripciones sin lidiar con impuestos complejos, debes explicarle con suma claridad la diferencia entre Stripe (un procesador de pagos tradicional que requiere que el desarrollador declare impuestos en cada país) y Lemon Squeezy, Paddle o Polar (que actúan como Merchants of Record y asumen la responsabilidad legal de los impuestos sobre las ventas).
3. REGLA DE FLEXIBILIDAD (Abstracción de IA): Valora positivamente el uso de endpoints "compatibles con OpenAI" (Groq, OpenRouter, Mistral, Perplexity). Explica que esto le permite al usuario cambiar de proveedor de IA en producción modificando únicamente la variable de entorno de base URL y API Key, sin reescribir código.
4. REGLA DE COMPATIBILIDAD DE AUTOMATIZACIÓN: Si eligen bases de datos modernas (ej. Supabase) y automatizadores (ej. n8n), resalta la tremenda compatibilidad nativa. Si combinan herramientas sin soporte directo (ej. Turso Database en Make), recuérdales que necesitarán utilizar bloques HTTP de API genéricos o Webhooks manuales.
5. ADVERTENCIAS DE MADUREZ: Mantente al tanto de los avisos de madurez del catálogo y menciónalos explícitamente:
   - Neon HTTP Data API está actualmente en fase beta.
   - Su reescritura de Turso Database en Rust está en beta; se recomienda usar libSQL en producción.
   - Pipedream está en proceso de adquisición por Workday (cierre previsto en Q4 del año fiscal 2026). Planificar a largo plazo con precaución.

Debes responder estrictamente en formato JSON utilizando el esquema que se define. Escribe las respuestas en español con un tono consultivo, extremadamente profesional, claro, analítico y motivacional. Usa un estilo de redacción markdown limpio en los campos de texto, con viñetas emoji y subtítulos estructurados.`;

    const prompt = `Analiza la siguiente solicitud de arquitectura técnica:
- Tipo de proyecto: ${projectType}
- Capacidades requeridas: ${coreCapabilities.join(", ")}
- Prioridades indicadas: ${priorities.join(", ")}
- Herramientas consideradas preliminarmente: ${selectedTools.join(", ")}

Genera una recomendación de arquitectura formal en 4 secciones concretas estructurando la respuesta en el formato JSON solicitado. Asegúrate de justificar por qué estas herramientas de nuestro catálogo son las perfectas y de verificar todas las reglas de negocio (GDPR, MoR, compatibilidad, madurez).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["diagnosis", "architecture", "compliance", "warnings"],
          properties: {
            diagnosis: {
              type: Type.STRING,
              description: "🎯 Diagnóstico del Problema: Análisis de lo que realmente requiere el usuario en base a sus desafíos y prioridades."
            },
            architecture: {
              type: Type.ARRAY,
              description: "🏗️ Propuesta de Arquitectura: Un listado de sugerencias de herramientas del catálogo recomendadas para cada capa.",
              items: {
                type: Type.OBJECT,
                required: ["toolId", "role", "rationale"],
                properties: {
                  toolId: {
                    type: Type.STRING,
                    description: "El ID exacto de la herramienta recomendado de saasCatalog (ej: 'supabase', 'n8n', 'groq', 'lemonsqueezy', 'tally')."
                  },
                  role: {
                    type: Type.STRING,
                    description: "El papel que juega (ej. 'IA / Copiloto de Inferencia', 'Base de datos & Backend', 'Automatización', 'Monetización')"
                  },
                  rationale: {
                    type: Type.STRING,
                    description: "Explicación de por qué esta es la elección perfecta bajo sus condiciones."
                  }
                }
              }
            },
            compliance: {
              type: Type.STRING,
              description: "🛡️ Viabilidad Técnica y Cumplimiento: Auditoría profunda detallada en español sobre GDPR, resguardo de datos, y diferencia sobre impuestos (Stripe vs Lemon Squeezy/Paddle/Polar)."
            },
            warnings: {
              type: Type.STRING,
              description: "⚠️ Advertencias de Implementación: Riesgos específicos, fases beta, compatibilidad de bloques (ej. Turso en Make) y avisos de madurez."
            }
          }
        }
      }
    });

    const recommendation = JSON.parse(response.text || "{}");
    res.json(recommendation);

  } catch (error: any) {
    console.error("Error generating strategy:", error);
    res.status(500).json({ 
      error: "Error interno al procesar la recomendación con el motor de IA.",
      details: error.message 
    });
  }
});

// Serve frontend assets
const startServer = async () => {
  if (process.env.NODE_ENV !== "production") {
    // Dynamically import Vite to use its dev server middleware
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
