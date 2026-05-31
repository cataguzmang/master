/* eslint-disable */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// This file is manually maintained for ArmorPlay AI MVP.

import { Route as rootRouteImport } from './routes/__root'
import { Route as TeamRouteImport } from './routes/team'
import { Route as PlayerRouteImport } from './routes/player'
import { Route as PreparadorRouteImport } from './routes/preparador'
import { Route as AlineacionesRouteImport } from './routes/alineaciones'
import { Route as CargaExcelRouteImport } from './routes/carga-excel'
import { Route as HistorialCargasRouteImport } from './routes/historial-cargas'
import { Route as MiEstadoRouteImport } from './routes/mi-estado'
import { Route as ReportesRouteImport } from './routes/reportes'
import { Route as DashboardRouteImport } from './routes/dashboard'
import { Route as IndexRouteImport } from './routes/index'

const TeamRoute = TeamRouteImport.update({ id: '/team', path: '/team', getParentRoute: () => rootRouteImport } as any)
const PlayerRoute = PlayerRouteImport.update({ id: '/player', path: '/player', getParentRoute: () => rootRouteImport } as any)
const PreparadorRoute = PreparadorRouteImport.update({ id: '/preparador', path: '/preparador', getParentRoute: () => rootRouteImport } as any)
const AlineacionesRoute = AlineacionesRouteImport.update({ id: '/alineaciones', path: '/alineaciones', getParentRoute: () => rootRouteImport } as any)
const CargaExcelRoute = CargaExcelRouteImport.update({ id: '/carga-excel', path: '/carga-excel', getParentRoute: () => rootRouteImport } as any)
const HistorialCargasRoute = HistorialCargasRouteImport.update({ id: '/historial-cargas', path: '/historial-cargas', getParentRoute: () => rootRouteImport } as any)
const MiEstadoRoute = MiEstadoRouteImport.update({ id: '/mi-estado', path: '/mi-estado', getParentRoute: () => rootRouteImport } as any)
const ReportesRoute = ReportesRouteImport.update({ id: '/reportes', path: '/reportes', getParentRoute: () => rootRouteImport } as any)
const DashboardRoute = DashboardRouteImport.update({ id: '/dashboard', path: '/dashboard', getParentRoute: () => rootRouteImport } as any)
const IndexRoute = IndexRouteImport.update({ id: '/', path: '/', getParentRoute: () => rootRouteImport } as any)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/preparador': typeof PreparadorRoute
  '/alineaciones': typeof AlineacionesRoute
  '/carga-excel': typeof CargaExcelRoute
  '/historial-cargas': typeof HistorialCargasRoute
  '/mi-estado': typeof MiEstadoRoute
  '/reportes': typeof ReportesRoute
  '/player': typeof PlayerRoute
  '/team': typeof TeamRoute
}
export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/preparador': typeof PreparadorRoute
  '/alineaciones': typeof AlineacionesRoute
  '/carga-excel': typeof CargaExcelRoute
  '/historial-cargas': typeof HistorialCargasRoute
  '/mi-estado': typeof MiEstadoRoute
  '/reportes': typeof ReportesRoute
  '/player': typeof PlayerRoute
  '/team': typeof TeamRoute
}
export interface FileRoutesById {
  __root__: typeof rootRouteImport
  '/': typeof IndexRoute
  '/dashboard': typeof DashboardRoute
  '/preparador': typeof PreparadorRoute
  '/alineaciones': typeof AlineacionesRoute
  '/carga-excel': typeof CargaExcelRoute
  '/historial-cargas': typeof HistorialCargasRoute
  '/mi-estado': typeof MiEstadoRoute
  '/reportes': typeof ReportesRoute
  '/player': typeof PlayerRoute
  '/team': typeof TeamRoute
}
export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/dashboard' | '/preparador' | '/alineaciones' | '/carga-excel' | '/historial-cargas' | '/mi-estado' | '/reportes' | '/player' | '/team'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/dashboard' | '/preparador' | '/alineaciones' | '/carga-excel' | '/historial-cargas' | '/mi-estado' | '/reportes' | '/player' | '/team'
  id: '__root__' | '/' | '/dashboard' | '/preparador' | '/alineaciones' | '/carga-excel' | '/historial-cargas' | '/mi-estado' | '/reportes' | '/player' | '/team'
  fileRoutesById: FileRoutesById
}
export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  DashboardRoute: typeof DashboardRoute
  PreparadorRoute: typeof PreparadorRoute
  AlineacionesRoute: typeof AlineacionesRoute
  CargaExcelRoute: typeof CargaExcelRoute
  HistorialCargasRoute: typeof HistorialCargasRoute
  MiEstadoRoute: typeof MiEstadoRoute
  ReportesRoute: typeof ReportesRoute
  PlayerRoute: typeof PlayerRoute
  TeamRoute: typeof TeamRoute
}

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/team': { id: '/team'; path: '/team'; fullPath: '/team'; preLoaderRoute: typeof TeamRouteImport; parentRoute: typeof rootRouteImport }
    '/player': { id: '/player'; path: '/player'; fullPath: '/player'; preLoaderRoute: typeof PlayerRouteImport; parentRoute: typeof rootRouteImport }
    '/preparador': { id: '/preparador'; path: '/preparador'; fullPath: '/preparador'; preLoaderRoute: typeof PreparadorRouteImport; parentRoute: typeof rootRouteImport }
    '/alineaciones': { id: '/alineaciones'; path: '/alineaciones'; fullPath: '/alineaciones'; preLoaderRoute: typeof AlineacionesRouteImport; parentRoute: typeof rootRouteImport }
    '/carga-excel': { id: '/carga-excel'; path: '/carga-excel'; fullPath: '/carga-excel'; preLoaderRoute: typeof CargaExcelRouteImport; parentRoute: typeof rootRouteImport }
    '/historial-cargas': { id: '/historial-cargas'; path: '/historial-cargas'; fullPath: '/historial-cargas'; preLoaderRoute: typeof HistorialCargasRouteImport; parentRoute: typeof rootRouteImport }
    '/mi-estado': { id: '/mi-estado'; path: '/mi-estado'; fullPath: '/mi-estado'; preLoaderRoute: typeof MiEstadoRouteImport; parentRoute: typeof rootRouteImport }
    '/reportes': { id: '/reportes'; path: '/reportes'; fullPath: '/reportes'; preLoaderRoute: typeof ReportesRouteImport; parentRoute: typeof rootRouteImport }
    '/dashboard': { id: '/dashboard'; path: '/dashboard'; fullPath: '/dashboard'; preLoaderRoute: typeof DashboardRouteImport; parentRoute: typeof rootRouteImport }
    '/': { id: '/'; path: '/'; fullPath: '/'; preLoaderRoute: typeof IndexRouteImport; parentRoute: typeof rootRouteImport }
  }
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute,
  DashboardRoute,
  PreparadorRoute,
  AlineacionesRoute,
  CargaExcelRoute,
  HistorialCargasRoute,
  MiEstadoRoute,
  ReportesRoute,
  PlayerRoute,
  TeamRoute,
}

export const routeTree = rootRouteImport
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()
