# ArmorPlay AI — MVP v1.0

## Cómo correr el proyecto

### Requisitos
- Node.js 18+ o Bun

### Instalación y ejecución

```bash
cd armorplay-mvp
npm install
npm run dev
```

Luego abre **http://localhost:5173** en tu navegador.

### Usuarios de prueba (MVP demo)

| Rol | Usuario | Contraseña |
|-----|---------|-----------|
| Director de Equipo | Carlos Mendoza | *(selector de rol)* |
| Preparador Físico | Ana García | *(selector de rol)* |
| Jugador | Selecciona un jugador del dropdown | *(selector de rol)* |

No hay contraseñas reales — el login es un selector visual de rol.

---

## Estructura del proyecto

```
src/
  lib/
    i18n.ts          ← Traducciones ES/EN
    mockData.ts      ← Datos mock con estructura real del MVP
    semaforo.ts      ← Lógica del semáforo (verde/amarillo/rojo)
  contexts/
    AuthContext.tsx  ← Rol activo + idioma
    PlayersContext.tsx ← Store de jugadores + estados físicos
  components/armor/
    RiskBadge.tsx    ← Semáforo visual (Óptimo/En riesgo/Lesionado)
    Sidebar.tsx      ← Navegación por rol
    Topbar.tsx       ← Barra superior + toggle ES/EN
    MobileNav.tsx    ← Navegación móvil por rol
    AppShell.tsx     ← Shell principal
  routes/
    index.tsx        ← Login con selector de rol
    dashboard.tsx    ← Dashboard del Director ✅
    preparador.tsx   ← Dashboard Físico (Fase 2)
    team.tsx         ← Lista de jugadores (Fase 2)
    alineaciones.tsx ← Módulo de alineaciones (Fase 3)
    carga-excel.tsx  ← Carga de Excel (Fase 3)
    historial-cargas.tsx ← Historial (Fase 3)
    mi-estado.tsx    ← Vista del jugador (Fase 2)
    reportes.tsx     ← Reportes (Fase 3)
```

## Fases de desarrollo

- ✅ **Fase 1** — Fundación: auth, semáforo, i18n, dashboard director
- 🔜 **Fase 2** — Dashboards: preparador físico, jugador, lista de jugadores
- 🔜 **Fase 3** — Módulos: carga Excel, alineaciones, historial
