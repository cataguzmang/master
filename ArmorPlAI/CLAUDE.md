# ArmorPlay AI — Contexto del Proyecto para Claude Code

## ¿Qué es ArmorPlay AI?

Aplicación MVP de prevención de lesiones para equipos de fútbol. Permite al cuerpo técnico cargar datos físicos desde Excel y visualizar en tiempo real qué jugadores están en estado óptimo, en riesgo o lesionados, gestionar alineaciones y monitorear la carga física del plantel.

---

## Estructura del repositorio

```
ArmorPlAI/
├── armorplay-mvp/          ← Proyecto React (AQUÍ SE TRABAJA)
│   ├── src/
│   │   ├── routes/         ← Rutas TanStack Router (páginas)
│   │   ├── lib/            ← Utilidades: i18n, mockData, semaforo
│   │   ├── contexts/       ← AuthContext, PlayersContext
│   │   └── components/     ← UI components (armor/, ui/)
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
│
├── ArmorPlay_MVP_v2.html   ← ⭐ DEMO COMPLETO standalone (referencia visual y funcional)
└── CLAUDE.md               ← este archivo
```

> **Referencia principal**: `ArmorPlay_MVP_v2.html` es un archivo HTML autónomo (~120KB) que implementa TODO el MVP funcionando al 100% en vanilla JS. Úsalo como referencia de comportamiento, lógica de negocio y diseño visual al trabajar en el proyecto React.

---

## Stack tecnológico (proyecto React)

- **React 19** + TypeScript strict
- **TanStack Router v1** — SPA mode (file-based routing, NO SSR)
- **Tailwind CSS v4** + `@tailwindcss/vite`
- **Radix UI / shadcn/ui** — componentes de UI
- **Recharts** — gráficas
- **Lucide React** — iconos
- **Vite 7** como bundler
- **SheetJS (xlsx)** — para parsear archivos Excel reales

### Cómo correr el proyecto
```bash
cd armorplay-mvp
npm install
npm run dev
```

---

## Roles del sistema

| Rol | Acceso | Usuario demo |
|-----|--------|--------------|
| `director` | Dashboard equipo, alineaciones, jugadores, carga Excel, historial, reportes | Carlos Mendoza |
| `preparador` | Panel físico, jugadores, carga Excel, historial, reportes | Ana García |
| `jugador` | Solo "Mi Estado" — su propio estado físico | Cualquier jugador del plantel |

**La autenticación es visual (sin backend)**: se elige el rol en el login y se persiste en `localStorage`.

---

## Modelos de datos

### Player
```typescript
interface Player {
  id: string;            // e.g. "J001"
  fullName: string;      // "Luis Hernández"
  name: string;          // "L. Hernández" (abreviado)
  pos: string;           // "GK" | "CB" | "RB" | "LB" | "DM" | "CM" | "RW" | "LW" | "ST"
  dorsal: number;
  semaforo: 'green' | 'yellow' | 'red';
  fatiga: 'baja' | 'media' | 'alta';
  load: number;          // 0-100
  sprints: number;
  minutes: number;
  pain: boolean;         // dolor reportado
  obs: string;           // observaciones del preparador
  rec: string;           // recomendación
  lesion: string;        // tipo de lesión activa (vacío si ninguna)
}
```

### PhysicalState (del Excel de estados físicos)
```typescript
interface PhysicalState {
  jugador_id: string;
  fecha_registro: string;
  tipo_sesion: string;
  minutos_jugados: number;
  sprints: number;
  carga_fisica: number;
  fatiga: 'baja' | 'media' | 'alta';
  dolor_reportado: 'sí' | 'no';
  zona_molestia: string;
  tipo_lesion: string;
  historial_lesion: 'sí' | 'no';
  dias_desde_ultima_lesion: number;
  estado_jugador: 'óptimo' | 'en riesgo' | 'lesionado';
  nivel_riesgo: 'verde' | 'amarillo' | 'rojo';
  recomendacion: string;
  observaciones_pf: string;
}
```

### UploadRecord
```typescript
interface UploadRecord {
  id: string;
  date: string;
  user: string;
  type: 'jugadores' | 'estados';
  file: string;
  status: 'exitosa' | 'con errores';
  records: number;
  errors: number;
}
```

---

## Lógica del semáforo (reglas de negocio)

Implementada en `src/lib/semaforo.ts`:

### 🔴 ROJO — Lesionado
- `estado_jugador === 'lesionado'`
- `nivel_riesgo === 'rojo'`
- `tipo_lesion` no está vacío

### 🟡 AMARILLO — En riesgo
- `estado_jugador === 'en riesgo'`
- `nivel_riesgo === 'amarillo'`
- `fatiga === 'alta'`
- `dolor_reportado === 'sí'`
- `carga_fisica > 80`
- `sprints > 22`
- `minutos_jugados > 85`
- `historial_lesion === 'sí'` Y `dias_desde_ultima_lesion < 30`
- `observaciones_pf` no vacío

### 🟢 VERDE — Óptimo
- Todo lo demás (ninguna regla anterior aplica)

### Eficiencia de alineación
```
Verde = 100 puntos
Amarillo = 60 puntos
Rojo = 0 puntos
Eficiencia = promedio de los 11 titulares
```

---

## Dos archivos Excel que se cargan

### Excel 1: Catálogo de Jugadores
Columnas obligatorias: `jugador_id`, `nombre`, `posicion`, `dorsal`, `equipo`, `estado_activo`
Columnas opcionales: `edad`, `pierna_dominante`, `altura_cm`, `peso_kg`, `fecha_alta`

### Excel 2: Estado Físico, Lesiones y Riesgo
Columnas obligatorias: `jugador_id`, `fecha_registro`, `carga_fisica`, `fatiga`, `dolor_reportado`, `estado_jugador`, `nivel_riesgo`
Columnas opcionales: `sprints`, `minutos_jugados`, `tipo_lesion`, `historial_lesion`, `dias_desde_ultima_lesion`, `observaciones_pf`, `recomendacion`, `zona_molestia`

**Conexión**: ambos Excels se unen por `jugador_id`. Se usa el registro más reciente por `fecha_registro`.

---

## Estado actual del proyecto React

### ✅ IMPLEMENTADO (Fase 1)

| Archivo | Estado |
|---------|--------|
| `src/lib/i18n.ts` | ✅ Completo — sistema ES/EN con función `t(lang, key)` |
| `src/lib/semaforo.ts` | ✅ Completo — `calcularSemaforo()`, `puntuacionEficiencia()`, `eficienciaAlineacion()` |
| `src/lib/mockData.ts` | ✅ Completo — 14 jugadores, 14 estados físicos, 5 cargas, 11 usuarios |
| `src/contexts/AuthContext.tsx` | ✅ Completo — roles, idioma, persistencia localStorage |
| `src/contexts/PlayersContext.tsx` | ✅ Completo — players con semáforo calculado, stats |
| `src/components/armor/RiskBadge.tsx` | ✅ Adaptado — usa `SemaforoColor` ('green'|'yellow'|'red') |
| `src/components/armor/Sidebar.tsx` | ✅ Adaptado — nav filtrada por rol |
| `src/components/armor/Topbar.tsx` | ✅ Adaptado — toggle de idioma, user chip |
| `src/components/armor/MobileNav.tsx` | ✅ Adaptado — nav por rol |
| `src/routes/index.tsx` | ✅ Login con selector de 3 roles + dropdown de jugador |
| `src/routes/dashboard.tsx` | ✅ Dashboard del Director con datos reales de PlayersContext |
| `src/routes/__root.tsx` | ✅ SPA mode (sin SSR) — proveedores AuthContext + PlayersContext |
| `src/router.tsx` | ✅ SPA mode |
| `src/main.tsx` | ✅ Entry point SPA |
| `index.html` | ✅ SPA entry |
| `vite.config.ts` | ✅ SPA mode (sin @tanstack/react-start) |

### 🔨 PENDIENTE (Fases 2 y 3 en React)

Estos archivos existen como **stubs vacíos** — tienen `// @ts-nocheck` y muestran "próximamente":

| Archivo | Qué debe hacer | Referencia en el demo |
|---------|---------------|-----------------------|
| `src/routes/preparador.tsx` | Dashboard físico del preparador | función `buildPreparadorFull()` en el HTML demo |
| `src/routes/mi-estado.tsx` | Vista del jugador (solo su estado) | función `renderPlayerView()` en el HTML demo |
| `src/routes/team.tsx` | Lista de jugadores con filtros y búsqueda | función `buildPlayersTable()` en el HTML demo |
| `src/routes/alineaciones.tsx` | Módulo de alineaciones 4-3-3 + sustituciones + eficiencia | función `buildLineupsModule()` en el HTML demo |
| `src/routes/carga-excel.tsx` | Carga real de Excel con SheetJS | función `buildUploadFull()` + `processExcelFile()` en el HTML demo |
| `src/routes/historial-cargas.tsx` | Historial de cargas con filtros | función `buildHistoryFull()` en el HTML demo |
| `src/routes/reportes.tsx` | Reportes y resumen de estado | función `buildReportsFull()` en el HTML demo |

Los archivos `executive.tsx` y `player.tsx` son **legacy** del código base original — ignorarlos por ahora.

---

## Reglas importantes de implementación

### Validación de portero en alineaciones
- La alineación **siempre debe tener un portero (GK)**
- Si se intenta sustituir el portero, **solo se puede reemplazar por otro jugador con pos='GK'**
- Si se intenta poner un no-portero en el slot de GK, mostrar error y rechazar el cambio

### Navegación por rol
```
director  → /dashboard, /preparador, /team, /alineaciones, /carga-excel, /historial-cargas, /reportes
preparador → /preparador, /team, /carga-excel, /historial-cargas, /reportes
jugador   → /mi-estado (solo)
```

### Idioma
- Español por defecto
- Toggle ES/EN persistido en `AuthContext`
- Usar siempre `t(lang, 'key')` de `src/lib/i18n.ts` para todos los textos

### Parseo de Excel
La lógica de parseo real ya está prototipada en el HTML demo. Usa **SheetJS** (`xlsx`).
Instalar: `npm install xlsx`
Las funciones clave del demo a portar:
- `processExcelFile(file, type)` — lee el archivo con FileReader + XLSX.read
- `processJugadoresData(rows, headers, fileName)` — procesa catálogo de jugadores
- `processEstadosData(rows, headers, fileName)` — procesa estados físicos y recalcula semáforos
- `calcSemaforo(estado)` — ya está en `src/lib/semaforo.ts`
- `resolveCol(headers, canonicalName)` — detecta columnas con nombres variados

---

## Paleta de colores y design tokens

```css
--bg: #1a1c2e
--surface: #1f2235
--surface2: #252840
--surface3: #2d3150
--border: rgba(255,255,255,0.08)
--text: #f5f5fa
--muted: #8b8fac
--primary: #6c8fff
--accent: #4dd9e0
--violet: #a78bfa
--green: #22c55e
--yellow: #f59e0b
--red: #ef4444
```

El estilo es **oscuro, moderno, deportivo y premium**. Ver el HTML demo para referencias visuales exactas.

---

## Formación de alineación (mock data)

```
Titulares (11): J001(GK), J004(CB), J005(CB), J002(RB), J003(LB),
                J006(DM), J008(CM), J012(CM),
                J007(RW), J011(LW), J010(ST)

Banca (3):      J009(ST - rojo), J013(GK - rojo), J014(CB - verde)
```

Formación visual: **4·3·3** — attackers arriba, GK abajo.

---

## Contexto de desarrollo

- Este proyecto empezó como un ZIP de código base visual (`ArmorPlayAI_MVP_Vibecoding.zip`)
- El código base original usaba **TanStack Start (SSR)** — ya fue convertido a **SPA puro con Vite**
- El `routeTree.gen.ts` se mantiene **manualmente** (no hay plugin de TanStack Router corriendo)
- El npm registry funciona normal desde la máquina local del usuario
- El HTML demo (`ArmorPlay_MVP_v2.html`) es la implementación de referencia completa y funciona abriendo en cualquier navegador

---

## Próximos pasos sugeridos

1. **Completar `preparador.tsx`** — portar lógica de `buildPreparadorFull()` del demo a React con `usePlayers()`
2. **Completar `mi-estado.tsx`** — portar `renderPlayerView()` filtrando por el jugador logueado
3. **Completar `team.tsx`** — portar `buildPlayersTable()` con búsqueda y filtros
4. **Completar `alineaciones.tsx`** — portar `buildLineupsModule()` incluyendo validación de portero
5. **Completar `carga-excel.tsx`** — instalar `xlsx`, portar lógica de parseo y actualización del contexto
6. **Completar `historial-cargas.tsx`** y **`reportes.tsx`**
7. **Conectar PlayersContext** para que la carga de Excel actualice el estado global y re-renderice todos los dashboards

---

## Comandos útiles

```bash
# Instalar dependencias
cd armorplay-mvp && npm install

# Correr en desarrollo
npm run dev

# Instalar SheetJS para parseo de Excel real
npm install xlsx

# Build para producción
npm run build
```
