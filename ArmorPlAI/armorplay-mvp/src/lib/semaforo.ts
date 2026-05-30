// ─── ArmorPlay AI · Lógica del Semáforo ─────────────────────────────
// Reglas simples de riesgo para el MVP.
// Verde = óptimo | Amarillo = en riesgo | Rojo = lesionado

import type { PhysicalState } from './mockData';

export type SemaforoColor = 'green' | 'yellow' | 'red';

export interface SemaforoResult {
  color: SemaforoColor;
  reasons: string[];
}

/** Evalúa el estado físico de un jugador y devuelve su color de semáforo */
export function calcularSemaforo(state: PhysicalState | null | undefined): SemaforoResult {
  if (!state) {
    return { color: 'green', reasons: ['Sin datos físicos registrados'] };
  }

  const reasons: string[] = [];

  // ─── REGLAS ROJO (máxima prioridad) ───────────────────────────────
  if (state.estado_jugador === 'lesionado') {
    reasons.push('Estado marcado como lesionado');
    return { color: 'red', reasons };
  }
  if (state.nivel_riesgo === 'rojo') {
    reasons.push('Nivel de riesgo rojo registrado');
    return { color: 'red', reasons };
  }
  if (state.tipo_lesion && state.tipo_lesion.trim() !== '') {
    reasons.push(`Lesión activa: ${state.tipo_lesion}`);
    return { color: 'red', reasons };
  }

  // ─── REGLAS AMARILLO ──────────────────────────────────────────────
  const yellowReasons: string[] = [];

  if (state.estado_jugador === 'en riesgo') yellowReasons.push('Estado marcado como en riesgo');
  if (state.nivel_riesgo === 'amarillo') yellowReasons.push('Nivel de riesgo amarillo registrado');
  if (state.fatiga === 'alta') yellowReasons.push('Fatiga alta detectada');
  if (state.dolor_reportado === 'sí') yellowReasons.push('Dolor reportado por el jugador');
  if (typeof state.carga_fisica === 'number' && state.carga_fisica > 80)
    yellowReasons.push(`Carga física elevada: ${state.carga_fisica}`);
  if (typeof state.sprints === 'number' && state.sprints > 22)
    yellowReasons.push(`Sprints por encima del umbral: ${state.sprints}`);
  if (typeof state.minutos_jugados === 'number' && state.minutos_jugados > 85)
    yellowReasons.push(`Muchos minutos acumulados: ${state.minutos_jugados} min`);
  if (
    state.historial_lesion === 'sí' &&
    typeof state.dias_desde_ultima_lesion === 'number' &&
    state.dias_desde_ultima_lesion < 30
  )
    yellowReasons.push(`Lesión reciente: ${state.dias_desde_ultima_lesion} días`);
  if (state.observaciones_pf && state.observaciones_pf.trim() !== '')
    yellowReasons.push('Observación del preparador físico');

  if (yellowReasons.length > 0) {
    return { color: 'yellow', reasons: yellowReasons };
  }

  // ─── VERDE ────────────────────────────────────────────────────────
  return { color: 'green', reasons: ['Estado óptimo — sin señales de riesgo'] };
}

/** Puntuación de eficiencia simple por jugador */
export function puntuacionEficiencia(color: SemaforoColor): number {
  switch (color) {
    case 'green':  return 100;
    case 'yellow': return 60;
    case 'red':    return 0;
  }
}

/** Calcula la eficiencia de una alineación (0–100) */
export function eficienciaAlineacion(colores: SemaforoColor[]): number {
  if (colores.length === 0) return 0;
  const total = colores.reduce((sum, c) => sum + puntuacionEficiencia(c), 0);
  return Math.round(total / colores.length);
}

/** Etiqueta legible del color */
export function labelColor(color: SemaforoColor, lang: 'es' | 'en' = 'es'): string {
  const labels = {
    es: { green: 'Óptimo', yellow: 'En riesgo', red: 'Lesionado' },
    en: { green: 'Optimal', yellow: 'At Risk',  red: 'Injured'  },
  };
  return labels[lang][color];
}
