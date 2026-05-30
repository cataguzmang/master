// ─── ArmorPlay AI · Mock Data ────────────────────────────────────────
// Datos de ejemplo para el MVP. Estructura real del sistema.
// Se reemplazará con datos reales cargados desde Excel.

// ─── TIPOS ──────────────────────────────────────────────────────────

export type PlayerStatus = 'activo' | 'baja' | 'transferido' | 'lesionado';
export type DominantFoot = 'Derecha' | 'Izquierda' | 'Ambas';
export type SessionType = 'entrenamiento' | 'partido' | 'recuperación';
export type FatigaLevel = 'baja' | 'media' | 'alta';
export type RiskLevel = 'verde' | 'amarillo' | 'rojo';
export type PlayerState = 'óptimo' | 'en riesgo' | 'lesionado';
export type UploadStatus = 'exitosa' | 'con errores';
export type ExcelType = 'jugadores' | 'estados físicos';

export interface Player {
  jugador_id: string;
  nombre: string;
  edad: number;
  posicion: string;
  dorsal: number;
  equipo: string;
  pierna_dominante: DominantFoot;
  altura_cm: number;
  peso_kg: number;
  estado_activo: PlayerStatus;
  fecha_alta: string;
}

export interface PhysicalState {
  registro_id: string;
  jugador_id: string;
  fecha_registro: string;
  tipo_sesion: SessionType;
  minutos_jugados?: number;
  sprints?: number;
  distancia_km?: number;
  carga_fisica: number;
  fatiga: FatigaLevel;
  dolor_reportado: 'sí' | 'no';
  zona_molestia?: string;
  tipo_lesion?: string;
  historial_lesion?: 'sí' | 'no';
  dias_desde_ultima_lesion?: number;
  estado_jugador: PlayerState;
  nivel_riesgo: RiskLevel;
  recomendacion?: string;
  observaciones_pf?: string;
}

export interface UploadRecord {
  carga_id: string;
  fecha_carga: string;
  usuario: string;
  tipo_excel: ExcelType;
  nombre_archivo: string;
  estado_carga: UploadStatus;
  registros_procesados: number;
  errores_detectados: number;
}

export interface LineupSlot {
  jugador_id: string;
  tipo: 'titular' | 'banca' | 'suplente';
  posicion_en_cancha?: string;
}

// ─── JUGADORES ──────────────────────────────────────────────────────

export const mockPlayers: Player[] = [
  { jugador_id: 'J001', nombre: 'A. Pérez',     edad: 32, posicion: 'GK', dorsal: 1,  equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 189, peso_kg: 84, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J002', nombre: 'S. Kovač',     edad: 27, posicion: 'RB', dorsal: 2,  equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 180, peso_kg: 77, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J003', nombre: 'T. Moretti',   edad: 29, posicion: 'LB', dorsal: 3,  equipo: 'Armor FC', pierna_dominante: 'Izquierda', altura_cm: 176, peso_kg: 74, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J004', nombre: 'R. Okafor',    edad: 25, posicion: 'CB', dorsal: 4,  equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 191, peso_kg: 88, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J005', nombre: 'D. Lindqvist', edad: 28, posicion: 'CB', dorsal: 5,  equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 188, peso_kg: 85, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J006', nombre: 'F. Bauer',     edad: 26, posicion: 'DM', dorsal: 6,  equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 183, peso_kg: 79, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J007', nombre: 'M. Tavares',   edad: 24, posicion: 'RW', dorsal: 7,  equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 174, peso_kg: 69, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J008', nombre: 'J. Bellini',   edad: 30, posicion: 'CM', dorsal: 8,  equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 180, peso_kg: 76, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J009', nombre: 'K. Adeyemi',   edad: 23, posicion: 'ST', dorsal: 9,  equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 182, peso_kg: 78, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J010', nombre: 'L. Hernández', edad: 28, posicion: 'ST', dorsal: 10, equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 178, peso_kg: 74, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J011', nombre: 'C. Nakamura',  edad: 26, posicion: 'LW', dorsal: 11, equipo: 'Armor FC', pierna_dominante: 'Izquierda', altura_cm: 171, peso_kg: 67, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J012', nombre: 'P. Hassan',    edad: 22, posicion: 'CM', dorsal: 14, equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 178, peso_kg: 72, estado_activo: 'activo', fecha_alta: '2024-07-01' },
  { jugador_id: 'J013', nombre: 'E. Vargas',    edad: 24, posicion: 'GK', dorsal: 13, equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 186, peso_kg: 81, estado_activo: 'lesionado', fecha_alta: '2024-07-01' },
  { jugador_id: 'J014', nombre: 'R. Santos',    edad: 21, posicion: 'CB', dorsal: 16, equipo: 'Armor FC', pierna_dominante: 'Izquierda', altura_cm: 185, peso_kg: 82, estado_activo: 'activo', fecha_alta: '2025-01-15' },
  { jugador_id: 'J015', nombre: 'A. Müller',    edad: 29, posicion: 'CM', dorsal: 18, equipo: 'Armor FC', pierna_dominante: 'Derecha',   altura_cm: 177, peso_kg: 73, estado_activo: 'baja',    fecha_alta: '2024-07-01' },
];

// ─── ESTADOS FÍSICOS (último registro por jugador) ──────────────────

export const mockPhysicalStates: PhysicalState[] = [
  {
    registro_id: 'R001', jugador_id: 'J001', fecha_registro: '2026-05-21',
    tipo_sesion: 'entrenamiento', minutos_jugados: 60, sprints: 8, distancia_km: 6.2,
    carga_fisica: 45, fatiga: 'baja', dolor_reportado: 'no',
    estado_jugador: 'óptimo', nivel_riesgo: 'verde',
    recomendacion: 'Mantener carga actual.',
  },
  {
    registro_id: 'R002', jugador_id: 'J002', fecha_registro: '2026-05-21',
    tipo_sesion: 'partido', minutos_jugados: 90, sprints: 18, distancia_km: 10.1,
    carga_fisica: 72, fatiga: 'media', dolor_reportado: 'no',
    estado_jugador: 'óptimo', nivel_riesgo: 'verde',
    recomendacion: 'Continuar seguimiento normal.',
  },
  {
    registro_id: 'R003', jugador_id: 'J003', fecha_registro: '2026-05-21',
    tipo_sesion: 'partido', minutos_jugados: 90, sprints: 21, distancia_km: 9.8,
    carga_fisica: 82, fatiga: 'alta', dolor_reportado: 'sí',
    zona_molestia: 'isquiotibiales', historial_lesion: 'sí', dias_desde_ultima_lesion: 28,
    estado_jugador: 'en riesgo', nivel_riesgo: 'amarillo',
    recomendacion: 'Reducir carga y monitorear evolución.',
    observaciones_pf: 'Molestia posterior al partido. Monitorear en próxima sesión.',
  },
  {
    registro_id: 'R004', jugador_id: 'J004', fecha_registro: '2026-05-21',
    tipo_sesion: 'entrenamiento', minutos_jugados: 75, sprints: 12, distancia_km: 7.4,
    carga_fisica: 58, fatiga: 'baja', dolor_reportado: 'no',
    estado_jugador: 'óptimo', nivel_riesgo: 'verde',
    recomendacion: 'Disponible para partido.',
  },
  {
    registro_id: 'R005', jugador_id: 'J005', fecha_registro: '2026-05-21',
    tipo_sesion: 'entrenamiento', minutos_jugados: 65, sprints: 10, distancia_km: 6.8,
    carga_fisica: 50, fatiga: 'baja', dolor_reportado: 'no',
    estado_jugador: 'óptimo', nivel_riesgo: 'verde',
    recomendacion: 'Disponible para partido.',
  },
  {
    registro_id: 'R006', jugador_id: 'J006', fecha_registro: '2026-05-21',
    tipo_sesion: 'entrenamiento', minutos_jugados: 70, sprints: 14, distancia_km: 7.9,
    carga_fisica: 62, fatiga: 'media', dolor_reportado: 'no',
    estado_jugador: 'óptimo', nivel_riesgo: 'verde',
    recomendacion: 'Mantener carga actual.',
  },
  {
    registro_id: 'R007', jugador_id: 'J007', fecha_registro: '2026-05-21',
    tipo_sesion: 'partido', minutos_jugados: 88, sprints: 25, distancia_km: 11.2,
    carga_fisica: 88, fatiga: 'alta', dolor_reportado: 'sí',
    zona_molestia: 'cuádriceps', historial_lesion: 'no',
    estado_jugador: 'en riesgo', nivel_riesgo: 'amarillo',
    recomendacion: 'Reducir intensidad. Revisar fatiga.',
    observaciones_pf: 'Sprint load 22% por encima de la media.',
  },
  {
    registro_id: 'R008', jugador_id: 'J008', fecha_registro: '2026-05-21',
    tipo_sesion: 'entrenamiento', minutos_jugados: 80, sprints: 16, distancia_km: 8.5,
    carga_fisica: 68, fatiga: 'media', dolor_reportado: 'no',
    estado_jugador: 'óptimo', nivel_riesgo: 'verde',
    recomendacion: 'Disponible para partido.',
  },
  {
    registro_id: 'R009', jugador_id: 'J009', fecha_registro: '2026-05-20',
    tipo_sesion: 'recuperación', minutos_jugados: 30, sprints: 2, distancia_km: 2.1,
    carga_fisica: 20, fatiga: 'baja', dolor_reportado: 'sí',
    zona_molestia: 'rodilla derecha', tipo_lesion: 'Lesión de rodilla',
    historial_lesion: 'sí', dias_desde_ultima_lesion: 5,
    estado_jugador: 'lesionado', nivel_riesgo: 'rojo',
    recomendacion: 'Priorizar recuperación. Excluir de alineación.',
    observaciones_pf: 'Lesión de rodilla confirmada. Baja médica 2 semanas.',
  },
  {
    registro_id: 'R010', jugador_id: 'J010', fecha_registro: '2026-05-21',
    tipo_sesion: 'partido', minutos_jugados: 82, sprints: 24, distancia_km: 9.8,
    carga_fisica: 85, fatiga: 'alta', dolor_reportado: 'sí',
    zona_molestia: 'isquiotibiales', historial_lesion: 'sí', dias_desde_ultima_lesion: 35,
    estado_jugador: 'en riesgo', nivel_riesgo: 'amarillo',
    recomendacion: 'Reducir carga y monitorear evolución.',
    observaciones_pf: 'Molestia posterior al partido. Vigilar isquiotibiales.',
  },
  {
    registro_id: 'R011', jugador_id: 'J011', fecha_registro: '2026-05-21',
    tipo_sesion: 'entrenamiento', minutos_jugados: 75, sprints: 19, distancia_km: 9.2,
    carga_fisica: 70, fatiga: 'media', dolor_reportado: 'no',
    estado_jugador: 'óptimo', nivel_riesgo: 'verde',
    recomendacion: 'Continuar seguimiento normal.',
  },
  {
    registro_id: 'R012', jugador_id: 'J012', fecha_registro: '2026-05-21',
    tipo_sesion: 'partido', minutos_jugados: 76, sprints: 20, distancia_km: 9.0,
    carga_fisica: 79, fatiga: 'alta', dolor_reportado: 'no',
    historial_lesion: 'no',
    estado_jugador: 'en riesgo', nivel_riesgo: 'amarillo',
    recomendacion: 'Monitorear carga. Evaluar descanso.',
  },
  {
    registro_id: 'R013', jugador_id: 'J013', fecha_registro: '2026-05-15',
    tipo_sesion: 'recuperación', minutos_jugados: 0, sprints: 0, distancia_km: 0,
    carga_fisica: 10, fatiga: 'baja', dolor_reportado: 'sí',
    zona_molestia: 'tobillo izquierdo', tipo_lesion: 'Esguince de tobillo',
    historial_lesion: 'sí', dias_desde_ultima_lesion: 3,
    estado_jugador: 'lesionado', nivel_riesgo: 'rojo',
    recomendacion: 'Baja médica. Sin actividad física por 2 semanas.',
    observaciones_pf: 'Esguince grado II tobillo izquierdo.',
  },
  {
    registro_id: 'R014', jugador_id: 'J014', fecha_registro: '2026-05-21',
    tipo_sesion: 'entrenamiento', minutos_jugados: 50, sprints: 9, distancia_km: 5.8,
    carga_fisica: 55, fatiga: 'baja', dolor_reportado: 'no',
    estado_jugador: 'óptimo', nivel_riesgo: 'verde',
    recomendacion: 'Disponible. Continuar adaptación.',
  },
  // J015 (A. Müller) - baja, sin registro reciente
];

// ─── HISTORIAL DE CARGAS ─────────────────────────────────────────────

export const mockUploadHistory: UploadRecord[] = [
  {
    carga_id: 'C001', fecha_carga: '2026-05-21T14:30:00',
    usuario: 'Ana García', tipo_excel: 'estados físicos',
    nombre_archivo: 'estado_fisico_may21.xlsx',
    estado_carga: 'exitosa', registros_procesados: 14, errores_detectados: 0,
  },
  {
    carga_id: 'C002', fecha_carga: '2026-05-19T09:15:00',
    usuario: 'Carlos Mendoza', tipo_excel: 'jugadores',
    nombre_archivo: 'plantel_armor_fc.xlsx',
    estado_carga: 'exitosa', registros_procesados: 15, errores_detectados: 0,
  },
  {
    carga_id: 'C003', fecha_carga: '2026-05-18T17:45:00',
    usuario: 'Ana García', tipo_excel: 'estados físicos',
    nombre_archivo: 'estado_fisico_may18.xlsx',
    estado_carga: 'con errores', registros_procesados: 12, errores_detectados: 2,
  },
  {
    carga_id: 'C004', fecha_carga: '2026-05-14T10:00:00',
    usuario: 'Ana García', tipo_excel: 'estados físicos',
    nombre_archivo: 'estado_fisico_may14.xlsx',
    estado_carga: 'exitosa', registros_procesados: 13, errores_detectados: 0,
  },
];

// ─── ALINEACIÓN MOCK ─────────────────────────────────────────────────

export const mockLineup: LineupSlot[] = [
  { jugador_id: 'J001', tipo: 'titular', posicion_en_cancha: 'GK' },
  { jugador_id: 'J002', tipo: 'titular', posicion_en_cancha: 'RB' },
  { jugador_id: 'J004', tipo: 'titular', posicion_en_cancha: 'CB' },
  { jugador_id: 'J005', tipo: 'titular', posicion_en_cancha: 'CB' },
  { jugador_id: 'J003', tipo: 'titular', posicion_en_cancha: 'LB' },
  { jugador_id: 'J006', tipo: 'titular', posicion_en_cancha: 'DM' },
  { jugador_id: 'J008', tipo: 'titular', posicion_en_cancha: 'CM' },
  { jugador_id: 'J012', tipo: 'titular', posicion_en_cancha: 'CM' },
  { jugador_id: 'J007', tipo: 'titular', posicion_en_cancha: 'RW' },
  { jugador_id: 'J011', tipo: 'titular', posicion_en_cancha: 'LW' },
  { jugador_id: 'J010', tipo: 'titular', posicion_en_cancha: 'ST' },
  // Banca
  { jugador_id: 'J014', tipo: 'banca' },
  { jugador_id: 'J002', tipo: 'suplente' },
  // Suplentes
  { jugador_id: 'J009', tipo: 'suplente' },
];

// ─── USUARIOS MOCK ───────────────────────────────────────────────────

export interface MockUser {
  id: string;
  nombre: string;
  email: string;
  rol: 'director' | 'preparador' | 'jugador';
  jugador_id?: string; // solo para rol jugador
  iniciales: string;
}

export const mockUsers: MockUser[] = [
  { id: 'U001', nombre: 'Carlos Mendoza', email: 'director@armorfc.ai', rol: 'director', iniciales: 'CM' },
  { id: 'U002', nombre: 'Ana García',     email: 'preparador@armorfc.ai', rol: 'preparador', iniciales: 'AG' },
  // Jugadores — uno por cada player activo
  { id: 'U003', nombre: 'A. Pérez',     email: 'aperez@armorfc.ai',     rol: 'jugador', jugador_id: 'J001', iniciales: 'AP' },
  { id: 'U004', nombre: 'S. Kovač',     email: 'skovac@armorfc.ai',     rol: 'jugador', jugador_id: 'J002', iniciales: 'SK' },
  { id: 'U005', nombre: 'T. Moretti',   email: 'tmoretti@armorfc.ai',   rol: 'jugador', jugador_id: 'J003', iniciales: 'TM' },
  { id: 'U006', nombre: 'R. Okafor',    email: 'rokafor@armorfc.ai',    rol: 'jugador', jugador_id: 'J004', iniciales: 'RO' },
  { id: 'U007', nombre: 'L. Hernández', email: 'lhernandez@armorfc.ai', rol: 'jugador', jugador_id: 'J010', iniciales: 'LH' },
  { id: 'U008', nombre: 'K. Adeyemi',   email: 'kadeyemi@armorfc.ai',   rol: 'jugador', jugador_id: 'J009', iniciales: 'KA' },
  { id: 'U009', nombre: 'M. Tavares',   email: 'mtavares@armorfc.ai',   rol: 'jugador', jugador_id: 'J007', iniciales: 'MT' },
  { id: 'U010', nombre: 'J. Bellini',   email: 'jbellini@armorfc.ai',   rol: 'jugador', jugador_id: 'J008', iniciales: 'JB' },
  { id: 'U011', nombre: 'C. Nakamura',  email: 'cnakamura@armorfc.ai',  rol: 'jugador', jugador_id: 'J011', iniciales: 'CN' },
];
