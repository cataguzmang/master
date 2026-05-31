# ArmorPlay AI — Fuente Única de Verdad del Proyecto

## 1. Contexto del Proyecto

**Producto:** ArmorPlay AI — Plataforma de prevención de lesiones para equipos de fútbol profesional y semi-profesional.

**Propósito actual del MVP:** Prototipo interno de exploración. Su objetivo es validar el flujo completo de la aplicación (roles, módulos, UX) antes de conectar infraestructura real. No está en producción con usuarios reales.

**Propuesta de valor:** Transformar datos de carga física, fatiga e historial en decisiones preventivas que reduzcan lesiones en plantillas de fútbol.

**Equipo:** 2-3 personas.

**Estado del modelo de IA:** Aún no existe. El 88.4% de precisión es copy de la propuesta de valor. Actualmente la lógica de riesgo es puramente basada en reglas (semáforo verde/amarillo/rojo) definidas manualmente en los datos mock.

---

## 2. Stack Tecnológico Actual

| Capa | Tecnología |
|------|-----------|
| Frontend | Vanilla JS — ES Modules (sin framework, sin bundler) |
| Estilos | CSS puro con custom properties — dark theme |
| Librerías externas | `xlsx.js 0.18.5` vía CDN (parseo de Excel) |
| Fuentes | Inter · Space Grotesk · JetBrains Mono (Google Fonts) |
| Backend | **Ninguno** — todos los datos son mock hardcodeados en `state.js` |
| Persistencia | **Ninguna** — el estado se resetea al recargar |
| Auth | Simulada — solo selector de rol (Director / Preparador / Jugador) |
| i18n | ES/EN implementado con sistema propio en `js/lib/i18n.js` |

---

## 3. Arquitectura de Archivos

```
app-mvp/
├── index.html              # Entrada única. Contiene HTML de 3 screens (login, dashboard, player)
├── css/
│   ├── variables.css       # Design tokens, reset global, tipografía base
│   ├── layout.css          # Layout primitivos (sidebar, topbar, grid, content)
│   └── components.css      # Componentes reutilizables (cards, badges, buttons, tabla)
└── js/
    ├── main.js             # Entry point: orquesta módulos, expone globals a window, init
    ├── state.js            # Estado global mutable + datos mock (jugadores, historial)
    ├── shell/
    │   └── shell.js        # Sidebar, topbar, función navTo()
    ├── lib/
    │   ├── i18n.js         # Diccionarios ES/EN + función T(key)
    │   └── helpers.js      # Funciones utilitarias (badge, loadBar, getStats, eff, pct)
    └── pages/
        ├── login.js        # Selección de rol y entrada a la app
        ├── dashboard.js    # Vista principal del Director (KPIs, alertas, tabla, gráfico)
        ├── preparador.js   # Panel físico completo (Preparador Físico)
        ├── players.js      # Tabla de jugadores con filtros y búsqueda
        ├── lineups.js      # Gestión de alineación con mecánica de swap
        ├── upload.js       # Carga de Excel (xlsx.js) + simulación de descarga de plantilla
        ├── history.js      # Historial de cargas con filtros por tipo
        ├── reports.js      # Reportes del equipo con exportación simulada
        └── player-view.js  # Vista personal del Jugador
```

### Patrones clave a respetar
- **Estado centralizado:** toda lectura/escritura de datos pasa por `state.js`.
- **Renderizado por innerHTML:** cada página devuelve un string HTML. `renderMainContent()` en `main.js` lo inyecta en `#main-content`.
- **Globals en `window`:** los event handlers inline del HTML (`onclick="navTo(...)"`) requieren que las funciones estén expuestas en `window` desde `main.js`. Mantener esta convención.
- **Sin bundler:** los imports son ES Modules nativos del navegador. No introducir `require()` ni CommonJS.

---

## 4. Roles y Navegación

| Rol | Módulos accesibles |
|-----|--------------------|
| Director de Equipo | Dashboard · Panel Físico · Jugadores · Alineaciones · Carga Excel · Historial · Reportes |
| Preparador Físico | Panel Físico · Jugadores · Carga Excel · Historial · Reportes |
| Jugador | Vista personal (screen independiente) |

---

## 5. Modelo de Datos (Mock actual en `state.js`)

### Jugador
```js
{
  id, name, fullName, pos, dorsal,
  semaforo: 'green' | 'yellow' | 'red',
  fatiga:   'baja' | 'media' | 'alta',
  load,       // 0-100, carga física
  sprints,    // número de sprints
  minutes,    // minutos jugados
  pain,       // boolean — reporta dolor
  obs,        // observación del preparador
  rec,        // recomendación generada
  lesion,     // descripción de lesión activa o ''
}
```

### Estado mutable (`state`)
```js
{
  lang: 'es' | 'en',
  currentRole: 'director' | 'preparador' | 'jugador' | null,
  selectedPlayerId: string | null,
  activeNav: 'dashboard' | 'preparador' | 'players' | 'lineups' | 'upload' | 'history' | 'reports',
  playersFilter: 'all' | 'green' | 'yellow' | 'red',
  playersSearch: string,
  activeLineup: string[],   // array de IDs (11 titulares)
  swapMode: boolean,
  swapFromId: string | null,
  swapIsGK: boolean,
  historyFilter: 'all' | 'jugadores' | 'estados',
}
```

---

## 6. Decisión de Backend — Recomendación

**Contexto de la decisión:** el equipo es de 2-3 personas, el modelo de ML aún no existe, y el stack actual es 100% JavaScript. El siguiente gran paso es reemplazar el mock de `state.js` por datos reales con persistencia y autenticación.

### Opción recomendada: **Supabase**

**Por qué:**
- Base de datos PostgreSQL real + API REST autogenerada → reemplazar `state.js` con llamadas fetch es directo.
- Auth integrada (email/password, OAuth) → elimina el login simulado.
- Storage para archivos → los Excel subidos se guardan en bucket S3-compatible.
- Realtime opcional → actualizaciones en vivo del estado físico sin polling.
- Sin servidor que gestionar → el equipo pequeño no necesita DevOps.
- SDK JavaScript oficial → compatible sin cambios en el stack frontend.

**Cuando migrar a FastAPI + Python:**  
Cuando exista el modelo de ML. En ese momento Supabase puede mantenerse como base de datos mientras FastAPI actúa como capa de inferencia. No son excluyentes.

### Alternativa: **Python FastAPI + PostgreSQL**
Recomendada solo si el modelo ML es la prioridad inmediata y el equipo tiene experiencia en Python. Implica gestionar servidor, auth y DB desde cero — más trabajo para un equipo pequeño.

---

## 7. Roadmap Técnico

### P0 — Infraestructura base (desbloqueante)
- [ ] Configurar proyecto Supabase (o alternativa elegida)
- [ ] Definir esquema de base de datos (tablas: `teams`, `players`, `physical_states`, `uploads`)
- [ ] Implementar autenticación real (reemplazar selector de rol con login por email + roles de usuario)
- [ ] Capa de datos: abstraer `state.js` en un módulo `api.js` que llame a Supabase en lugar de devolver mock

### P1 — Funcionalidades con datos reales
- [ ] Carga Excel funcional: parsear con xlsx.js (ya implementado) y guardar en base de datos
- [ ] Persistencia de alineaciones
- [ ] Historial real de cargas (actualmente mock en `uploadHistory`)
- [ ] Exportación de reportes real (PDF o Excel)
- [ ] Vista del jugador con datos de su propia fila en base de datos

### P2 — Algoritmo de riesgo y producto
- [ ] Formalizar algoritmo de semáforo (reglas basadas en umbrales de load, sprints, fatiga, pain)
- [ ] Historial temporal de estados físicos (poder ver evolución de un jugador)
- [ ] Notificaciones / alertas activas (jugadores que pasan a amarillo/rojo)
- [ ] Soporte multi-equipo (un club con varias plantillas, o múltiples clientes)

### P3 — Modelo ML (futuro)
- [ ] Diseñar dataset de entrenamiento (basado en datos reales acumulados en P0-P2)
- [ ] Entrenar modelo predictivo de lesiones
- [ ] Conectar predicciones vía API (FastAPI o Supabase Edge Functions)

---

## 8. Convenciones de Desarrollo

- **Idioma del código:** inglés para identificadores y comentarios técnicos; español en las strings de UI (`i18n.js`).
- **Nuevas páginas:** crear en `js/pages/`, exportar función `buildNombreFull()`, registrar en el router de `main.js`, añadir al `navByRole` en `shell.js` y al diccionario en `i18n.js`.
- **Nuevos componentes UI:** primero revisar si existe un helper en `js/lib/helpers.js`. Styles van en `css/components.css`.
- **Sin bundler:** no añadir `package.json`, webpack, vite ni npm salvo decisión explícita del equipo.
- **Sin comentarios obvios:** solo comentar el WHY cuando no es evidente del código.

---

## 9. Notas de Sesión

> Esta sección se actualiza con decisiones, cambios de rumbo o contexto relevante surgido en conversaciones.

- **2026-05-25** — Archivo `claude.md` creado. Backend no decidido aún; Supabase recomendado como primera opción. Modelo ML no existe; la lógica de riesgo actual es 100% mock/reglas. Prototipo en fase de exploración interna.
