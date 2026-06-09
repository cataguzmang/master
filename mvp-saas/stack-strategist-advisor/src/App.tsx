import React, { useState, useMemo, useEffect } from "react";
import { 
  Sparkles, 
  Shield, 
  Coins, 
  Activity, 
  Layers, 
  Search, 
  Filter, 
  Check, 
  AlertTriangle, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  Database, 
  Zap, 
  CreditCard, 
  HelpCircle, 
  Send, 
  RefreshCw, 
  AlertOctagon, 
  Info, 
  Lock, 
  Scale,
  ListFilter,
  CheckCircle,
  FileText
} from "lucide-react";
import { saasCatalog, SaaSItem } from "./data/catalog";

// Type definitions for recommendations returned by the backend
interface Recommendation {
  diagnosis: string;
  architecture: Array<{
    toolId: string;
    role: string;
    rationale: string;
  }>;
  compliance: string;
  warnings: string;
}

export default function App() {
  // State for interactive inputs
  const [projectType, setProjectType] = useState<"startup" | "indie" | "student">("startup");
  const [coreCapabilities, setCoreCapabilities] = useState<string[]>(["AI / LLM Integration", "Secure Backend"]);
  const [priorities, setPriorities] = useState<string[]>(["Strict GDPR / Data Residency", "Minimum Costs / Free-tier heavy"]);
  
  // State for active visual sandbox tools selected per layer
  const [activeStack, setActiveStack] = useState<{
    AI: string | null;
    Database: string | null;
    Automation: string | null;
    Payments: string | null;
    Analytics: string | null;
    MediaEmail: string | null;
  }>({
    AI: "groq",
    Database: "supabase",
    Automation: "n8n",
    Payments: "lemonsqueezy",
    Analytics: "umami",
    MediaEmail: "brevo",
  });

  // Search & filter state for the general SaaS catalog
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [catalogFilters, setCatalogFilters] = useState<{
    gdprOnly: boolean;
    morOnly: boolean;
    selfHostableOnly: boolean;
    openAiCompatibleOnly: boolean;
  }>({
    gdprOnly: false,
    morOnly: false,
    selfHostableOnly: false,
    openAiCompatibleOnly: false,
  });

  // State for AI consultation process
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [recommendationReport, setRecommendationReport] = useState<Recommendation | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Active Tab: Auditor vs. Sandbox Canvas vs. Catalog
  const [activeViewTab, setActiveViewTab] = useState<"advisor" | "canvas" | "catalog">("advisor");

  // Selected tool from catalog for modal/side drawer detail
  const [selectedCatalogTool, setSelectedCatalogTool] = useState<SaaSItem | null>(saasCatalog[0]);

  // Loading steps simulation simulation
  const loadingSteps = [
    "Analizando los requerimientos y el presupuesto del proyecto...",
    "Validando normativas de privacidad (GDPR) de datos y proxies...",
    "Examinando compliance fiscal (Stripe vs Merchant of Record)...",
    "Evaluando compatibilidad de conectores y webhooks n8n/Make...",
    "Orquestando propuesta final con el motor de IA de Stack Strategist..."
  ];

  useEffect(() => {
    let interval: any;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev < loadingSteps.length - 1 ? prev + 1 : prev));
      }, 1500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Handle chips selection
  const toggleCapability = (capName: string) => {
    if (coreCapabilities.includes(capName)) {
      setCoreCapabilities(coreCapabilities.filter(c => c !== capName));
    } else {
      setCoreCapabilities([...coreCapabilities, capName]);
    }
  };

  const togglePriority = (priorityName: string) => {
    if (priorities.includes(priorityName)) {
      setPriorities(priorities.filter(p => p !== priorityName));
    } else {
      setPriorities([...priorities, priorityName]);
    }
  };

  // Preset quick-set scenarios
  const applyPreset = (presetType: "gdpr-saas" | "indie-bootstrap" | "student-ai") => {
    if (presetType === "gdpr-saas") {
      setProjectType("startup");
      setCoreCapabilities(["AI / LLM Integration", "Secure Backend", "Global Payment Flow", "Privacy-first web analytics"]);
      setPriorities(["Strict GDPR / Data Residency", "Global Sales Tax Handling (MoR)", "Ready for Scale"]);
      setActiveStack({
        AI: "mistral",
        Database: "supabase",
        Automation: "n8n",
        Payments: "paddle",
        Analytics: "plausible",
        MediaEmail: "brevo",
      });
      setActiveViewTab("advisor");
    } else if (presetType === "indie-bootstrap") {
      setProjectType("indie");
      setCoreCapabilities(["AI / LLM Integration", "Global Payment Flow", "Dynamic forms with webhooks", "Privacy-first web analytics"]);
      setPriorities(["Minimum Costs / Free-tier heavy", "Rapid Time-to-Market", "Global Sales Tax Handling (MoR)"]);
      setActiveStack({
        AI: "openrouter",
        Database: "pocketbase",
        Automation: "make",
        Payments: "lemonsqueezy",
        Analytics: "umami",
        MediaEmail: "brevo",
      });
      setActiveViewTab("advisor");
    } else if (presetType === "student-ai") {
      setProjectType("student");
      setCoreCapabilities(["AI / LLM Integration", "Scrapers & Web crawling"]);
      setPriorities(["Minimum Costs / Free-tier heavy", "Rapid Time-to-Market", "Self-hostable"]);
      setActiveStack({
        AI: "groq",
        Database: "supabase",
        Automation: "n8n",
        Payments: null,
        Analytics: "umami",
        MediaEmail: null,
      });
      setActiveViewTab("advisor");
    }
  };

  // Select tool in a specific visual sandbox layer
  const selectSandboxTool = (layer: keyof typeof activeStack, toolId: string | null) => {
    setActiveStack(prev => ({
      ...prev,
      [layer]: toolId
    }));
  };

  // Sync sandbox active stack to priorities when they match
  useEffect(() => {
    // If strict GDPR is locked, set stack standard defaults that support GDPR
    if (priorities.includes("Strict GDPR / Data Residency")) {
      // Prompt user to consider switching but don't hard overwrite unless they have US tool
    }
  }, [priorities]);

  // Compute live local diagnostics based on business logic rules
  const localDiagnostics = useMemo(() => {
    const alerts: Array<{
      type: "success" | "warning" | "danger" | "info";
      title: string;
      message: string;
    }> = [];

    // Resolve chosen tools objects
    const resolvedTools = Object.entries(activeStack)
      .map(([layer, id]) => {
        const item = saasCatalog.find(t => t.id === id);
        return { layer, item };
      })
      .filter(x => x.item !== undefined) as Array<{ layer: string; item: SaaSItem }>;

    // 1. PRIVACY RULE (GDPR)
    const isGdprRequested = priorities.includes("Strict GDPR / Data Residency");
    const nonGdprToolsSelected = resolvedTools.filter(t => !t.item.gdpr);

    if (isGdprRequested) {
      if (nonGdprToolsSelected.length > 0) {
        alerts.push({
          type: "danger",
          title: "🔴 Alerta de Privacidad (Exigencia GDPR)",
          message: `Has exigido cumplimiento estricto GDPR pero tienes seleccionados componentes cuyos servidores principales residen en EE.UU. o procesan sin buffers de soberanía nativos: ${nonGdprToolsSelected.map(t => t.item.name).join(", ")}. Considera migrar a Mistral AI, Supabase, n8n o Brevo.`
        });
      } else {
        alerts.push({
          type: "success",
          title: "🟢 Cumplimiento de Privacidad Óptimo",
          message: "Todos los componentes de tu arquitectura de almacenamiento, inferencia y analítica tienen bandera GDPR activa. ¡Perfecto para lanzar en la Unión Europea sin proxies complejos!"
        });
      }
    } else {
      if (nonGdprToolsSelected.length > 0) {
        alerts.push({
          type: "info",
          title: "ℹ️ Nota de Privacidad",
          message: `Estás utilizando herramientas que procesan datos en servidores estadounidenses: ${nonGdprToolsSelected.map(t => t.item.name).join(", ")}. Si planeas expandirte a Europa o registrar usuarios en la UE, requerirás añadir proxies o forzar un banner continuo de consentimiento.`
        });
      }
    }

    // 2. TAX RULE (Merchant of Record - MoR vs Stripe)
    const requiresPayments = coreCapabilities.includes("Global Payment Flow");
    const stripeSelected = activeStack.Payments === "stripe";
    const morSelected = ["lemonsqueezy", "paddle", "polar"].includes(activeStack.Payments || "");

    if (requiresPayments) {
      if (stripeSelected) {
        alerts.push({
          type: "warning",
          title: "📦 Desafío Fiscal: Stripe NO es un Merchant of Record (MoR)",
          message: "Stripe es el rey absoluto de los pagos, pero es un procesador estándar. Stripe Tax calcula el impuesto, pero tú eres el responsable legal de declarar, recaudar y liquidar de forma periódica el IVA/Sales Tax en cada país del comprador. Con Lemon Squeezy o Paddle, ellos asumen esa carga legal."
        });
      } else if (morSelected) {
        const selectedMoRName = saasCatalog.find(t => t.id === activeStack.Payments)?.name || "MoR";
        alerts.push({
          type: "success",
          title: `🛡️ Blindaje Fiscal Activado con ${selectedMoRName}`,
          message: "Excelente elección para un producto global ágil o un solo desarrollador. El Merchant of Record actúa como el vendedor legal de cara al fisco, asumiendo la liquidación de impuestos automáticamente."
        });
      } else if (!activeStack.Payments) {
        alerts.push({
          type: "info",
          title: "💰 Capa de Monetización Pendiente",
          message: "Has indicado que requieres pasarela global pero aún no has colocado ninguna herramienta en tu lienzo de pagos de la sección Sandbox."
        });
      }
    }

    // 3. AI FLEXIBILITY RULE (Abstracción de IA)
    const selectAiTool = saasCatalog.find(t => t.id === activeStack.AI);
    if (selectAiTool?.openAiCompatible) {
      alerts.push({
        type: "success",
        title: "🔌 Abstracción de IA con Endpoint Compatible",
        message: `Has seleccionado ${selectAiTool.name}. Su interfaz es 100% compatible con la API de OpenAI. Esto te permite migrar los modelos en producción cambiando únicamente el endpoint base y la API Key en tu .env.example, sin tener que reescribir código.`
      });
    }

    // 4. AUTOMATION COMPATIBILITY RULE
    const hasN8n = activeStack.Automation === "n8n";
    const hasMake = activeStack.Automation === "make";
    const hasSupabase = activeStack.Database === "supabase";
    const hasTurso = activeStack.Database === "turso";

    if (hasN8n && hasSupabase) {
      alerts.push({
        type: "success",
        title: "🧩 Sincronización Maravillosa (n8n + Supabase)",
        message: "n8n integra nodos nativos refinados para leer/escribir registros en Supabase al instante, aprovechando eventos en tiempo real sin codificación manual compleja."
      });
    }

    if (hasMake && hasTurso) {
      alerts.push({
        type: "warning",
        title: "🔌 Integración de Red (Turso + Make)",
        message: "No hay conector directo predefinido para Turso dentro de la biblioteca clásica de Make. Necesitarás realizar llamadas REST manuales de HTTP o webhooks JSON para conectar la lógica."
      });
    }

    // 5. MATURITY WARNINGS
    resolvedTools.forEach(tool => {
      if (tool.item.maturityWarning) {
        alerts.push({
          type: "warning",
          title: `⚠️ Aviso de Madurez de Componente (${tool.item.name})`,
          message: tool.item.maturityWarning
        });
      }
    });

    return alerts;
  }, [activeStack, priorities, coreCapabilities]);

  // Request comprehensive consultation from Gemini server route
  const getAiConsulting = async () => {
    setLoading(true);
    setErrorMsg(null);
    setRecommendationReport(null);

    // Collect list of selected tools from stack
    const selectedToolsList = Object.entries(activeStack)
      .map(([layer, val]) => {
        const match = saasCatalog.find(t => t.id === val);
        return match ? match.name : null;
      })
      .filter(Boolean) as string[];

    try {
      const response = await fetch("/api/strategy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectType,
          coreCapabilities,
          priorities,
          selectedTools: selectedToolsList
        })
      });

      if (!response.ok) {
        throw new Error("No se pudo conectar con el motor de IA o falló la respuesta del servidor.");
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setRecommendationReport(data);
      setActiveViewTab("advisor");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Ocurrió un error inesperado al procesar tu solicitud.");
    } finally {
      setLoading(false);
    }
  };

  // Filtered general catalog SaaS items
  const filteredCatalog = useMemo(() => {
    return saasCatalog.filter(item => {
      // Seaarch terms matching
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.cases.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Category selection matching
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;

      // Badges filter checklist matching
      const matchesGdpr = !catalogFilters.gdprOnly || item.gdpr;
      const matchesMoR = !catalogFilters.morOnly || item.moR === true;
      const matchesSelfHost = !catalogFilters.selfHostableOnly || item.selfHostable === true;
      const matchesOpenAi = !catalogFilters.openAiCompatibleOnly || item.openAiCompatible === true;

      return matchesSearch && matchesCategory && matchesGdpr && matchesMoR && matchesSelfHost && matchesOpenAi;
    });
  }, [searchQuery, selectedCategory, catalogFilters]);

  return (
    <div className="min-h-screen bg-[#050608] text-slate-200 font-sans flex flex-col selection:bg-blue-500/30 selection:text-blue-400 relative overflow-x-hidden">
      {/* Immersive UI Radial Background Spot */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(circle_at_50%_-20%,#1e293b_0%,transparent_60%)] opacity-50 pointer-events-none z-0"></div>
      
      {/* --- HEADER --- */}
      <header className="border-b border-white/10 bg-[#050608]/85 backdrop-blur-xl sticky top-0 z-50 px-6 py-5 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.5)] text-white">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-display tracking-tight text-white flex items-center gap-2">
                Stack Strategist Advisor
              </h1>
              <p className="text-xs text-blue-400 font-mono tracking-widest uppercase">
                Elite Software Architect & Consultant
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] text-slate-500 uppercase">Knowledge Base</p>
              <p className="text-sm font-semibold text-white">V2025.Q4-ACTIVE</p>
            </div>
            <div className="h-10 w-[1px] bg-white/10 hidden sm:block"></div>
            
            <div className="flex items-center gap-2 bg-slate-900/40 border border-white/10 px-4 py-2.5 rounded-xl text-slate-300">
              <Lock className="w-3.5 h-3.5 text-blue-450" />
              <span>caguzmang13@gmail.com</span>
            </div>
            
            <button 
              onClick={() => setRecommendationReport(null)}
              className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-blue-500 hover:text-white transition-colors cursor-pointer text-xs"
            >
              Nuevo Blueprint
            </button>
          </div>
        </div>
      </header>

      {/* --- QUICK ACCESS PRESET HERO --- */}
      <section className="bg-gradient-to-b from-slate-900/10 to-transparent border-b border-white/10 py-6 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              🏁 Escenarios de Arranque Rápido
            </span>
            <h2 className="text-lg text-white font-medium mt-1 font-display">
              Selecciona una estrategia base para configurar tu Auditor instantáneamente:
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button 
              id="preset-gdpr"
              onClick={() => applyPreset("gdpr-saas")}
              className="px-4 py-2.5 rounded-xl text-sm bg-slate-900/40 border border-white/10 hover:border-blue-400 hover:bg-slate-800 text-slate-200 hover:text-white transition flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>SaaS Europeo (100% GDPR)</span>
            </button>
            <button 
              id="preset-indie"
              onClick={() => applyPreset("indie-bootstrap")}
              className="px-4 py-2.5 rounded-xl text-sm bg-slate-900/40 border border-white/10 hover:border-blue-400 hover:bg-slate-800 text-slate-200 hover:text-white transition flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Coins className="w-4 h-4 text-yellow-400" />
              <span>Indie Hacker (Cero Fricción)</span>
            </button>
            <button 
              id="preset-student"
              onClick={() => applyPreset("student-ai")}
              className="px-4 py-2.5 rounded-xl text-sm bg-slate-900/40 border border-white/10 hover:border-blue-400 hover:bg-slate-800 text-slate-200 hover:text-white transition flex items-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>Estudiante de Automatización & IA</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- VIEW TABS --- */}
      <section className="bg-[#050608]/90 border-b border-white/10 sticky top-[93px] z-40 backdrop-blur-xl relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex gap-1 py-3 overflow-x-auto">
            <button 
              onClick={() => setActiveViewTab("advisor")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 shrink-0 ${
                activeViewTab === "advisor" 
                ? "bg-blue-500/10 border border-blue-500/25 text-blue-400" 
                : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Consejero de Estrategia AI</span>
            </button>
            <button 
              onClick={() => setActiveViewTab("canvas")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 shrink-0 ${
                activeViewTab === "canvas" 
                ? "bg-blue-500/10 border border-blue-500/25 text-blue-400" 
                : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Lienzo Sandbox (Arquitectura)</span>
            </button>
            <button 
              onClick={() => setActiveViewTab("catalog")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 shrink-0 ${
                activeViewTab === "catalog" 
                ? "bg-blue-500/10 border border-blue-500/25 text-blue-400" 
                : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Directorio SaaS Verificado</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-lg border border-white/10">
            <Activity className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>Auditoría de Cumplimiento en Tiempo Real Activa</span>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* ===================== LEFT COLUMN: CONFIGURATOR ===================== */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col shadow-xl">
            <h3 className="text-sm font-bold font-display text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
              <Cpu className="w-5 h-5 text-blue-400" />
              <span className="uppercase tracking-widest text-xs">1. Perfil del Proyecto</span>
            </h3>

            {/* Project Type */}
            <div className="mb-6">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-2 font-bold">
                Tipo de Creador & Propósito:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setProjectType("startup")}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-center border transition cursor-pointer ${
                    projectType === "startup"
                    ? "bg-blue-500/10 border-blue-500/40 text-blue-400 ring-1 ring-blue-500/20"
                    : "bg-slate-950/40 border-white/5 text-slate-400 hover:bg-slate-800/45"
                  }`}
                >
                  🚀 Startup MVP
                </button>
                <button 
                  onClick={() => setProjectType("indie")}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-center border transition cursor-pointer ${
                    projectType === "indie"
                    ? "bg-blue-500/10 border-blue-500/40 text-blue-400 ring-1 ring-blue-500/20"
                    : "bg-slate-950/40 border-white/5 text-slate-400 hover:bg-slate-850/45"
                  }`}
                >
                  🛠️ Indie Hacker
                </button>
                <button 
                  onClick={() => setProjectType("student")}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-center border transition cursor-pointer ${
                    projectType === "student"
                    ? "bg-blue-500/10 border-blue-500/40 text-blue-400 ring-1 ring-blue-500/20"
                    : "bg-slate-950/40 border-white/5 text-slate-400 hover:bg-slate-850/45"
                  }`}
                >
                  🎓 Estudiante / AI
                </button>
              </div>
            </div>

            {/* Core Capabilities Checklist */}
            <div className="mb-6">
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-2 font-bold">
                Funcionalidades Clave Requeridas:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "AI / LLM Integration",
                  "Secure Backend",
                  "Global Payment Flow",
                  "Automation / Node workflows",
                  "Scrapers & Web crawling",
                  "Privacy-first web analytics",
                  "Dynamic forms with webhooks",
                ].map((cap) => {
                  const selected = coreCapabilities.includes(cap);
                  return (
                    <button
                      key={cap}
                      onClick={() => toggleCapability(cap)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border cursor-pointer ${
                        selected
                          ? "bg-blue-500/15 border-blue-500/30 text-blue-300 font-semibold"
                          : "bg-slate-950/40 border-white/5 text-slate-400 hover:bg-white/5"
                      }`}
                    >
                      {selected ? <Check className="w-3.5 h-3.5 text-blue-450" /> : null}
                      <span>{cap}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Design Priorities and Constraints */}
            <div>
              <label className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-2 font-bold">
                Prioridades de Arquitectura & Restricciones:
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Strict GDPR / Data Residency",
                  "Global Sales Tax Handling (MoR)",
                  "Minimum Costs / Free-tier heavy",
                  "Ultra-low Latency",
                  "Ready for Scale",
                  "Self-hostable",
                  "Rapid Time-to-Market",
                ].map((prior) => {
                  const selected = priorities.includes(prior);
                  return (
                    <button
                      key={prior}
                      onClick={() => togglePriority(prior)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border cursor-pointer ${
                        selected
                          ? "bg-amber-500/15 border-amber-500/25 text-amber-300"
                          : "bg-slate-950/40 border-white/5 text-slate-400 hover:bg-white/5"
                      }`}
                    >
                      {selected ? <Check className="w-3.5 h-3.5 text-amber-500" /> : null}
                      <span>{prior}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Active Stack Summary (Live connected sandbox viewer) */}
          <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl flex flex-col shadow-xl">
            <div className="flex items-center justify-between mb-3 border-b border-white/5 pb-3">
              <h3 className="text-sm font-bold font-display text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span className="uppercase tracking-widest text-xs">2. Configuración en Lienzo</span>
              </h3>
              <button 
                onClick={() => setActiveViewTab("canvas")} 
                className="text-xs text-blue-400 hover:underline flex items-center gap-1 cursor-pointer font-semibold animate-pulse"
              >
                <span>Editar en Lienzo</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Cerebro Inferencia", key: "AI", icon: Cpu, color: "text-purple-400" },
                { label: "Datos & Persistencia", key: "Database", icon: Database, color: "text-blue-400" },
                { label: "Automatizacion", key: "Automation", icon: Zap, color: "text-yellow-400" },
                { label: "Pasarela Monetaria", key: "Payments", icon: CreditCard, color: "text-emerald-400" },
                { label: "Métricas Privacidad", key: "Analytics", icon: Activity, color: "text-pink-400" },
                { label: "Correos & Archivos", key: "MediaEmail", icon: FileText, color: "text-orange-400" },
              ].map((layer) => {
                const currentId = activeStack[layer.key as keyof typeof activeStack];
                const tool = saasCatalog.find(t => t.id === currentId);
                return (
                  <div key={layer.key} className="bg-slate-950/40 p-2.5 rounded-xl border border-white/5 flex items-center gap-2.5 hover:border-white/10 transition-colors">
                    <layer.icon className={`w-4 h-4 shrink-0 style-icon ${layer.color}`} />
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold">{layer.label}</p>
                      <p className="text-xs text-slate-200 truncate font-semibold">
                        {tool ? tool.name : <span className="text-slate-600 italic font-normal">No seleccionado</span>}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button 
              onClick={getAiConsulting}
              disabled={loading}
              className="w-full bg-white hover:bg-blue-500 text-[#050608] hover:text-white py-3.5 px-4 rounded-full font-bold text-sm transition-all duration-350 shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-current" />
                  <span>Procesando Diagnóstico...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-current fill-current" />
                  <span className="font-bold">Consultar Asesoría de Élite AI</span>
                </>
              )}
            </button>
          </div>
        </section>


        {/* ===================== RIGHT COLUMN: DISPLAY TABS ===================== */}
        <section className="lg:col-span-7 flex flex-col gap-6">

          {/* Error Message Box */}
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-sm text-red-400 flex items-start gap-2">
              <AlertOctagon className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-200">Error en Consulta Serverless</h4>
                <p className="mt-1">{errorMsg}</p>
              </div>
            </div>
          )}

          {/* Loading Animation Placeholder */}
          {loading && (
            <div className="bg-[#050608]/40 border border-white/10 rounded-3xl p-10 backdrop-blur-xl shadow-2xl flex flex-col items-center justify-center text-center gap-6 min-h-[400px]">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-2 border-blue-500/20 border-t-blue-450 animate-spin"></div>
                <Sparkles className="w-6 h-6 text-blue-400 absolute inset-0 m-auto animate-pulse" />
              </div>
              <div className="max-w-md">
                <h3 className="text-sm font-semibold tracking-widest text-white uppercase mb-2">Estrechando Parámetros de Diseño</h3>
                <p className="text-xs text-slate-400 font-mono min-h-[40px] px-4 py-2 bg-slate-950/60 rounded-xl border border-white/5">
                  {loadingSteps[loadingStep]}
                </p>
                <p className="text-[10px] text-slate-500 mt-4 italic font-mono uppercase tracking-wider">Gemini 3.5 es un modelo analizando presupuestos de latencia y regulaciones fiscales mundiales en tiempo real.</p>
              </div>
            </div>
          )}

          {/* ===================== TAB 1: ADVISOR ===================== */}
          {!loading && activeViewTab === "advisor" && (
            <div className="flex flex-col gap-6">
              
              {/* If we have custom Gemini AI report, render it beautifully */}
              {recommendationReport ? (
                <div className="flex flex-col gap-6 animate-fade-in text-left">
                  
                  {/* Diagnosis Card */}
                  <div className="bg-[#050608]/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 bg-blue-500/10 border-b border-l border-white/10 rounded-bl-xl">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-[10px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
                      🎯 DIAGNÓSTICO DEL CONSULTOR DE ÉLITE
                    </span>
                    <h3 className="text-xl font-bold font-display text-white mt-4 mb-3 uppercase tracking-wider">
                      Análisis de Arquitectura & Estrategia
                    </h3>
                    <div className="text-sm text-slate-300 leading-relaxed font-sans whitespace-pre-line prose prose-slate">
                      {recommendationReport.diagnosis}
                    </div>
                  </div>

                  {/* Architecture Grid matched back to saasCatalog database for high-fidelty visual badges */}
                  <div className="bg-[#050608]/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl">
                    <h3 className="text-sm font-bold font-display text-white mb-4 flex items-center gap-2 border-b border-white/5 pb-3">
                      <Layers className="w-5 h-5 text-blue-400" />
                      <span className="uppercase tracking-widest text-xs">🏗️ Propuesta de Capa a Capa</span>
                    </h3>
                    
                    <div className="flex flex-col gap-4">
                      {recommendationReport.architecture.map((item, index) => {
                        const matchedTool = saasCatalog.find(t => t.id === item.toolId);
                        return (
                          <div key={index} className="bg-slate-950/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 hover:-translate-y-0.5 transition-all duration-200 flex flex-col md:flex-row gap-4 justify-between items-start">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2.5">
                                <span className="text-[9px] font-mono bg-blue-500/10 text-blue-300 border border-blue-500/15 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                                  {item.role}
                                </span>
                                {matchedTool && (
                                  <span className="text-xs font-semibold text-white tracking-wide">
                                    {matchedTool.name}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-400 mt-2 italic font-sans leading-relaxed">
                                "{item.rationale}"
                              </p>
                            </div>
                            
                            {/* Matching specific capabilities to exact indicators */}
                            {matchedTool && (
                              <div className="flex flex-wrap gap-1 md:self-center">
                                {matchedTool.gdpr && (
                                  <span className="text-[9px] font-mono bg-blue-500/5 text-blue-400 border border-blue-500/10 px-2 py-0.5 rounded-md font-semibold">
                                    GDPR
                                  </span>
                                )}
                                {matchedTool.moR && (
                                  <span className="text-[9px] font-mono bg-amber-500/5 text-amber-450 border border-amber-500/10 px-2 py-0.5 rounded-md font-semibold">
                                    MoR
                                  </span>
                                )}
                                {matchedTool.selfHostable && (
                                  <span className="text-[9px] font-mono bg-[#050608]/40 text-blue-300 border border-white/5 px-2 py-0.5 rounded-md" title="Self-hostable">
                                    Local
                                  </span>
                                )}
                                {matchedTool.openAiCompatible && (
                                  <span className="text-[9px] font-mono bg-purple-500/5 text-purple-300 border border-purple-500/10 px-2 py-0.5 rounded-md">
                                    OpenAI-API
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Privacy & Tax Compliance deep section */}
                  <div className="bg-[#050608]/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl relative overflow-hidden">
                    <span className="text-[10px] font-mono bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                      🛡️ PRIVACIDAD, CUMPLIMIENTO & AUDITORÍA TRIBUTARIA
                    </span>
                    <h3 className="text-sm font-bold font-display text-white mt-4 mb-3 uppercase tracking-wider">
                      Estudio De Viabilidad Normativa
                    </h3>
                    <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line font-sans prose prose-indigo">
                      {recommendationReport.compliance}
                    </div>
                  </div>

                  {/* Technical Warnings, Betas and complexities */}
                  <div className="bg-amber-500/5 border border-amber-500/20 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-3 bg-amber-500/5 text-amber-400">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono uppercase text-amber-400 tracking-wider font-bold block mb-1">
                      ⚠️ ADVERTENCIAS DE INTEGRACIÓN & MADUREZ
                    </span>
                    <h3 className="text-sm font-bold font-display text-slate-100 mb-3 uppercase tracking-wide">
                      Riesgos de Infraestructura & Dependencias a Seguir:
                    </h3>
                    <div className="text-sm text-slate-350 leading-relaxed whitespace-pre-line font-medium">
                      {recommendationReport.warnings}
                    </div>
                  </div>

                  {/* Reset analysis button */}
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => setRecommendationReport(null)}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold bg-slate-900 border border-white/10 hover:bg-white hover:text-black transition-all cursor-pointer"
                    >
                      Restablecer & Formular Otra Propuesta
                    </button>
                  </div>

                </div>
              ) : (
                // Local Interactive Live Auditor (Instant reaction)
                <div className="flex flex-col gap-6 text-left">

                  {/* Interactive Status Indicator Panel (Hero widget explaining rule outputs) */}
                  <div className="bg-[#050608]/40 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-xl relative overflow-hidden">
                    <div className="lg:flex lg:items-center lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-pulse"></div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold">
                            Auditor Clínico Instantáneo 225
                          </span>
                        </div>
                        <h3 className="text-xl font-bold font-display text-white mt-1.5 mb-2 uppercase tracking-wide text-xs md:text-sm">
                          Evolución en Directo de Arquitectura
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans mt-2">
                          Este panel compila el cumplimiento de tu prototipo de forma reactiva mientras configuras tus prioridades de diseño. ¡Presiona el botón de consulta de la izquierda para generar el estudio en texto completo con la IA de Google Gemini 3.5!
                        </p>
                      </div>
                      
                      {/* KPI highlights */}
                      <div className="mt-4 lg:mt-0 flex gap-3">
                        <div className="bg-slate-950/40 border border-white/5 p-3 rounded-2xl min-w-[110px] text-center">
                          <p className="text-[10px] font-mono text-slate-500 uppercase font-bold">Residencia Datos</p>
                          <p className="text-sm font-semibold text-blue-400 mt-1">
                            {priorities.includes("Strict GDPR / Data Residency") ? "ESTRICTA UE" : "GLOBAL"}
                          </p>
                        </div>
                        <div className="bg-slate-950/40 border border-white/5 p-3 rounded-2xl min-w-[110px] text-center">
                          <p className="text-[10px] font-mono text-slate-500 uppercase font-bold">Facturación</p>
                          <p className="text-sm font-semibold text-amber-400 mt-1">
                            {coreCapabilities.includes("Global Payment Flow") ? "ACTIVO" : "OMITIDO"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* List of active local compliance warnings resulting from saas data checklist */}
                  <div className="flex flex-col gap-3">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1 flex items-center gap-1 font-bold">
                      <ListFilter className="w-3.5 h-3.5 text-blue-400" />
                      <span>Resultados de Diagnóstico Automatizado ({localDiagnostics.length}):</span>
                    </h4>

                    {localDiagnostics.length === 0 ? (
                      <div className="bg-[#050608]/40 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl">
                        <HelpCircle className="w-10 h-10 text-slate-700 mx-auto mb-3" />
                        <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                          Sin alertas locales. Modifica tus herramientas en la pestaña de Sandbox u ajusta tus prioridades para que el motor clínico analice incompatibilidades.
                        </p>
                      </div>
                    ) : (
                      localDiagnostics.map((diag, idx) => (
                        <div 
                          key={idx}
                          className={`p-4 rounded-2xl border flex gap-3 transition-colors ${
                            diag.type === "danger" ? "bg-red-500/10 border-red-500/25 text-red-100" :
                            diag.type === "warning" ? "bg-amber-500/5 border-amber-500/20 text-slate-200" :
                            diag.type === "success" ? "bg-blue-500/5 border-blue-500/20 text-slate-200" :
                            "bg-[#050608]/40 border-white/10 text-slate-300"
                          }`}
                        >
                          <div className="mt-0.5 shrink-0">
                            {diag.type === "danger" && <AlertOctagon className="w-5 h-5 text-red-400 animate-bounce" />}
                            {diag.type === "warning" && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                            {diag.type === "success" && <CheckCircle className="w-5 h-5 text-blue-450" />}
                            {diag.type === "info" && <Info className="w-5 h-5 text-sky-450" />}
                          </div>
                          <div>
                            <h5 className="text-xs font-bold font-mono tracking-widest uppercase">
                              {diag.title}
                            </h5>
                            <p className="text-xs text-slate-400 mt-1 leading-relaxed font-sans">
                              {diag.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Empty advisory call to action */}
                  <div className="bg-gradient-to-r from-blue-500/5 via-slate-900/40 to-indigo-500/5 border border-white/10 rounded-3xl p-6 text-center shadow-xl backdrop-blur-md">
                    <Sparkles className="w-8 h-8 text-blue-400 mx-auto mb-3 animate-pulse" />
                    <h3 className="text-base font-bold text-white mb-2 font-display uppercase tracking-wider text-sm">
                      ¿Quieres un Informe de Viabilidad Escrito en Detalle?
                    </h3>
                    <p className="text-xs text-slate-400 max-w-lg mx-auto mb-4 leading-relaxed font-sans">
                      La consultoría formal redactará de forma estructurada los planes de migración de APIs, la justificación reglamentaria y cómo encajar el middleware de cobro del Saas, todo en segundos.
                    </p>
                    <button 
                      onClick={getAiConsulting} 
                      className="px-6 py-3 rounded-full text-[#050608] font-bold text-xs bg-white hover:bg-blue-500 hover:text-white transition shadow-[0_0_20px_rgba(255,255,255,0.15)] inline-flex items-center gap-2 cursor-pointer duration-200"
                    >
                      <span className="font-bold">Generar Informe de Viabilidad Completo (Gemini)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              )}

            </div>
          )}


          {/* ===================== TAB 2: SANDBOX CANVAS ===================== */}
          {!loading && activeViewTab === "canvas" && (
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 shadow-xl animate-fade-in">
              <div className="border-b border-slate-850 pb-3 mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold font-display text-white">
                    Lienzo Interactivo de Arquitectura (Sandbox)
                  </h3>
                  <h3 className="text-sm font-bold font-display text-white uppercase tracking-widest">
                    Lienzo Interactivo de Arquitectura (Sandbox)
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 font-sans">
                    Modifica dinámicamente tu stack de software haciendo click para intercambiar capas al instante.
                  </p>
                </div>
                <div className="text-[10px] font-mono uppercase bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 font-bold animate-pulse">
                  ESTADO EN VIVO
                </div>
              </div>

              {/* Layer Columns Sandbox Stack Builder */}
              <div className="flex flex-col gap-5">
                {[
                  {
                    title: "🤖 Inferencia de Modelos & LLM",
                    layerKey: "AI" as const,
                    options: saasCatalog.filter(t => t.category === "AI" || t.category === "VectorDB").slice(0, 5),
                    color: "border-purple-500/20 hover:border-purple-400/40"
                  },
                  {
                    title: "🗄️ Base de Datos & Persistencia",
                    layerKey: "Database" as const,
                    options: saasCatalog.filter(t => t.category === "Database").slice(0, 5),
                    color: "border-blue-500/20 hover:border-blue-400/40"
                  },
                  {
                    title: "⚡ Conectores de Automatización & Low-Code",
                    layerKey: "Automation" as const,
                    options: saasCatalog.filter(t => t.category === "Automation").slice(0, 4),
                    color: "border-yellow-500/20 hover:border-yellow-400/40"
                  },
                  {
                    title: "💳 Liquidación y Pasarelas de Cobros (MoR vs Procesador)",
                    layerKey: "Payments" as const,
                    options: saasCatalog.filter(t => t.category === "Payments").slice(0, 4),
                    color: "border-emerald-500/20 hover:border-emerald-400/40"
                  },
                  {
                    title: "📈 Analítica Web & Forms CRM",
                    layerKey: "Analytics" as const,
                    options: saasCatalog.filter(t => t.category === "Analytics" || t.category === "FormCRM").slice(0, 4),
                    color: "border-pink-500/20 hover:border-pink-400/40"
                  }
                ].map((layerDef) => {
                  const activeId = activeStack[layerDef.layerKey];
                  return (
                    <div key={layerDef.layerKey} className={`bg-slate-950/40 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-200`}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-slate-350 uppercase tracking-wider">
                          {layerDef.title}
                        </span>
                        <span className="text-[9px] font-mono uppercase bg-slate-900 px-2 py-0.5 rounded-md text-slate-500 font-bold">
                          {activeId ? "Elegido" : "Vulnerable"}
                        </span>
                      </div>
                      
                      {/* Grid chips selection */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {layerDef.options.map((opt) => {
                          const isSelected = activeId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              onClick={() => selectSandboxTool(layerDef.layerKey, opt.id)}
                              className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-center transition cursor-pointer flex flex-col items-center justify-center gap-1 ${
                                isSelected
                                  ? "bg-blue-500/15 border-blue-500/40 text-blue-300 ring-1 ring-blue-500/25 shadow-md"
                                  : "bg-slate-950/60 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/5 hover:border-white/10"
                              }`}
                            >
                              <span className="truncate w-full text-center">{opt.name}</span>
                              <div className="flex gap-1">
                                {opt.gdpr && (
                                  <span className="text-[7px] font-mono text-blue-400 bg-blue-500/10 px-1 rounded">EU</span>
                                )}
                                {opt.moR && (
                                  <span className="text-[7px] font-mono text-amber-500 bg-amber-500/10 px-1 rounded">MoR</span>
                                )}
                              </div>
                            </button>
                          );
                        })}
                        <button
                          onClick={() => selectSandboxTool(layerDef.layerKey, null)}
                          className={`px-3 py-2.5 rounded-xl text-xs font-semibold border text-center transition cursor-pointer ${
                            activeId === null
                              ? "bg-red-500/10 border-red-500/30 text-red-400"
                              : "bg-slate-950/60 border-white/5 text-slate-500 hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/10"
                          }`}
                        >
                          ✕ Omitir Capa
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* View warning logs action bridge */}
              <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 backdrop-blur-xl">
                <div>
                  <h4 className="text-xs font-bold text-slate-350 uppercase">¿Revisaste los resultados de cumplimiento?</h4>
                  <p className="text-[11px] text-slate-500 mt-1 font-sans">Tus cambios se auditan de forma inmediata por el motor de reglas en la pestaña de Consejería.</p>
                </div>
                <button 
                  onClick={() => {
                    setActiveViewTab("advisor");
                  }}
                  className="px-5 py-2 font-bold text-xs rounded-full bg-white text-[#050608] hover:bg-blue-500 hover:text-white transition duration-200 cursor-pointer shrink-0"
                >
                  Ver Alertas Directas ({localDiagnostics.length})
                </button>
              </div>
            </div>
          )}


          {/* ===================== TAB 3: CATALOG EXPLORER ===================== */}
          {!loading && activeViewTab === "catalog" && (
            <div className="flex flex-col gap-6 animate-fade-in">

              {/* Search, Filter Bar */}
              <div className="bg-[#050608]/40 border border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  {/* Search box */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                    <input 
                      type="text"
                      placeholder="Buscar servicios (ej. stripe, supabase, n8n, etc)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-950/60 border border-white/5 rounded-2xl py-2.5 px-10 text-xs font-mono text-slate-200 placeholder-slate-550 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
                    />
                  </div>
                  
                  {/* Category switcher */}
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-slate-950/60 border border-white/5 rounded-2xl py-2.5 px-4 text-xs font-mono text-slate-300 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="All">Categorías (Todas)</option>
                    <option value="Automation">Low-Code / Automatización</option>
                    <option value="Database">Bases de datos & Backend</option>
                    <option value="AI">Inteligencia Artificial (LLM)</option>
                    <option value="VectorDB">Base vectorial & RAG</option>
                    <option value="Payments">Pagos & Facturación</option>
                    <option value="FormCRM">Formularios & CRM</option>
                    <option value="Analytics">Analítica</option>
                    <option value="MediaEmail">Procesamiento & Correos</option>
                  </select>
                </div>

                {/* Checklist filtering badges */}
                <div className="flex gap-4 flex-wrap border-t border-white/5 pt-3 text-xs font-mono">
                  <span className="text-slate-500 uppercase self-center text-[10px] font-bold">Especiales:</span>
                  <label className="flex items-center gap-2 text-slate-355 cursor-pointer hover:text-white transition">
                    <input 
                      type="checkbox"
                      checked={catalogFilters.gdprOnly}
                      onChange={(e) => setCatalogFilters(prev => ({ ...prev, gdprOnly: e.target.checked }))}
                      className="rounded border-white/10 text-blue-500 focus:ring-slate-900 bg-slate-950/80 accent-blue-500 w-3.5 h-3.5"
                    />
                    <span>🇪🇺 Solo GDPR-Compliant</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-355 cursor-pointer hover:text-white transition">
                    <input 
                      type="checkbox"
                      checked={catalogFilters.morOnly}
                      onChange={(e) => setCatalogFilters(prev => ({ ...prev, morOnly: e.target.checked }))}
                      className="rounded border-white/10 text-blue-500 focus:ring-slate-900 bg-slate-950/80 accent-blue-500 w-3.5 h-3.5"
                    />
                    <span>📦 Solo Merchant of Record (MoR)</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-355 cursor-pointer hover:text-white transition">
                    <input 
                      type="checkbox"
                      checked={catalogFilters.selfHostableOnly}
                      onChange={(e) => setCatalogFilters(prev => ({ ...prev, selfHostableOnly: e.target.checked }))}
                      className="rounded border-white/10 text-blue-500 focus:ring-slate-900 bg-slate-950/80 accent-blue-500 w-3.5 h-3.5"
                    />
                    <span>🏠 Autoalojable (Self-Hostable)</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-355 cursor-pointer hover:text-white transition">
                    <input 
                      type="checkbox"
                      checked={catalogFilters.openAiCompatibleOnly}
                      onChange={(e) => setCatalogFilters(prev => ({ ...prev, openAiCompatibleOnly: e.target.checked }))}
                      className="rounded border-white/10 text-blue-500 focus:ring-slate-900 bg-slate-950/80 accent-blue-500 w-3.5 h-3.5"
                    />
                    <span>🔌 OpenAI-API Compatible</span>
                  </label>
                </div>
              </div>

              {/* Grid of tools matched */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Details side cards or click to show modal panels */}
                {filteredCatalog.length === 0 ? (
                  <div className="col-span-full bg-[#050608]/40 border border-white/10 p-12 text-center rounded-3xl backdrop-blur-xl">
                    <AlertTriangle className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                    <h3 className="text-sm font-semibold text-white mb-2 uppercase tracking-widest">Ningún componente coincide</h3>
                    <p className="text-xs text-slate-500 font-mono">Intenta rebajar las restricciones o flexibilizar los términos de búsqueda.</p>
                  </div>
                ) : (
                  filteredCatalog.map((item) => {
                    const isSelected = selectedCatalogTool?.id === item.id;
                    return (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedCatalogTool(item)}
                        className={`p-5 rounded-3xl border transition-all cursor-pointer text-left flex flex-col justify-between hover:-translate-y-0.5 duration-200 ${
                          isSelected 
                            ? "bg-blue-500/10 border-blue-500/40 ring-1 ring-blue-500/20 shadow-lg" 
                            : "bg-[#050608]/40 border-white/5 hover:border-white/10 hover:bg-slate-900/40"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-sm font-semibold text-white tracking-wide">
                              {item.name}
                            </h4>
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 border border-white/5 text-slate-400 uppercase tracking-widest">
                              {item.category}
                            </span>
                          </div>
                          
                          <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 font-sans">
                            {item.description}
                          </p>
                        </div>

                        {/* Special quick status badges at footer */}
                        <div className="pt-3 border-t border-white/5 mt-4 flex flex-wrap gap-1">
                          {item.gdpr && (
                            <span className="text-[8px] font-mono uppercase bg-blue-500/10 text-blue-300 border border-blue-500/15 px-2 py-0.5 rounded font-semibold">
                              GDPR
                            </span>
                          )}
                          {item.moR !== undefined && (
                            <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded font-semibold border ${
                              item.moR 
                                ? "bg-amber-500/10 text-amber-305 border-amber-500/15" 
                                : "bg-white/5 text-slate-450 border-white/5"
                            }`}>
                              {item.moR ? "MoR" : "Procesador Estándar"}
                            </span>
                          )}
                          {item.selfHostable && (
                            <span className="text-[8px] font-mono uppercase bg-[#050608]/40 text-blue-300 border border-white/5 px-2 py-0.5 rounded font-semibold">
                              Autoalojable
                            </span>
                          )}
                          {item.openAiCompatible && (
                            <span className="text-[8px] font-mono uppercase bg-purple-500/5 text-purple-300 border border-purple-500/10 px-2 py-0.5 rounded font-semibold">
                              OpenAI API
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Advanced detailed side drawer/modal for clicked tool */}
              {selectedCatalogTool && (
                <div className="bg-[#050608]/50 border border-white/10 rounded-3xl p-6 shadow-2xl animate-fade-in backdrop-blur-2xl text-left">
                  <div className="flex gap-4 items-start justify-between border-b border-white/5 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full tracking-widest font-bold">
                        Componente Seleccionado
                      </span>
                      <h3 className="text-xl font-bold font-display text-white mt-4 uppercase tracking-wider">
                        {selectedCatalogTool.name}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono px-3 py-1.5 bg-slate-950 border border-white/5 rounded-full text-blue-300 uppercase tracking-widest font-bold leading-none">
                      {selectedCatalogTool.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-5 font-sans">
                    {selectedCatalogTool.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* User Cases */}
                    <div>
                      <h4 className="text-[10px] font-mono uppercase text-slate-500 block mb-3 font-bold tracking-widest">
                        📍 Casos de Uso del Catálogo:
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {selectedCatalogTool.cases.map((c, i) => (
                          <li key={i} className="text-xs text-slate-400 flex items-start gap-2 leading-relaxed">
                            <span className="text-blue-400 font-semibold">•</span>
                            <span className="font-sans">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Features checklist */}
                    <div>
                      <h4 className="text-[10px] font-mono uppercase text-slate-500 block mb-3 font-bold tracking-widest">
                        🛠️ Capacidades Destacables:
                      </h4>
                      <ul className="flex flex-col gap-2">
                        {selectedCatalogTool.features.map((f, i) => (
                          <li key={i} className="text-xs text-slate-400 flex items-start gap-2 leading-relaxed">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                            <span className="font-sans">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Maturity Warning / special notes if any */}
                  {(selectedCatalogTool.maturityWarning || selectedCatalogTool.notes) && (
                    <div className="bg-slate-950/40 border border-white/5 p-4 rounded-2xl mt-6">
                      {selectedCatalogTool.maturityWarning && (
                        <p className="text-xs text-amber-400 font-semibold flex items-center gap-2 mb-1.5 font-mono uppercase tracking-wide">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          <span>Maturity Check: {selectedCatalogTool.maturityWarning}</span>
                        </p>
                      )}
                      {selectedCatalogTool.notes && (
                        <p className="text-xs text-slate-400 mt-1 font-sans leading-relaxed">
                          <strong className="text-blue-300 font-bold font-mono text-[10px] uppercase tracking-wider block mb-1">Consejo del Arquitecto:</strong> {selectedCatalogTool.notes}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

        </section>

      </main>

      {/* --- FLOATING STATUS BAR --- */}
      <footer className="border-t border-white/5 bg-[#050608]/80 py-6 px-6 text-center text-xs text-slate-500 font-mono mt-auto relative z-10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p>© 2026 Stack Strategist Advisor. Todos los derechos reservados.</p>
          <p className="text-[11px] text-slate-600">
            * Conforme a catálogo verificado 2025-2026. Lógica tributaria mundial actualizada con la adquisición Lemon Squeezy-Stripe.
          </p>
        </div>
      </footer>

    </div>
  );
}
