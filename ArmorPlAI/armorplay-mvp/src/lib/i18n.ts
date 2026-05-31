// ─── ArmorPlay AI · i18n ────────────────────────────────────────────
// Soporte ES / EN. Idioma por defecto: español.

export type Lang = 'es' | 'en';

const es = {
  appName: 'ArmorPlay AI',
  appTagline: 'Prevención de lesiones con inteligencia artificial',

  // Login
  login: {
    welcome: 'Bienvenido a ArmorPlay AI',
    subtitle: 'Selecciona tu rol para continuar',
    enterAs: 'Entrar como',
    choosePlayer: 'Selecciona tu jugador',
    selectRole: 'Seleccionar jugador...',
    continueBtn: 'Continuar',
    heroTitle: 'Prevén lesiones\nantes de que ocurran.',
    heroSub: 'ArmorPlay AI transforma la carga física, la fatiga y el historial en decisiones preventivas para tu equipo.',
    stats: {
      precision: 'Precisión',
      clubs: 'Equipos',
      avoided: 'Lesiones prevenidas',
    },
  },

  // Roles
  roles: {
    director: 'Director de Equipo',
    director_desc: 'Dashboard general, alineaciones y reportes',
    preparador: 'Preparador Físico',
    preparador_desc: 'Carga de Excel, estados físicos y monitoreo',
    jugador: 'Jugador',
    jugador_desc: 'Consulta tu estado físico personal',
  },

  // Navegación
  nav: {
    dashboard: 'Panel Principal',
    physicalDashboard: 'Panel Físico',
    players: 'Jugadores',
    lineups: 'Alineaciones',
    uploadExcel: 'Carga Excel',
    uploadHistory: 'Historial de Cargas',
    reports: 'Reportes',
    physicalStates: 'Estados Físicos',
    myStatus: 'Mi Estado',
    settings: 'Configuración',
    alerts: 'Alertas',
    support: 'Soporte',
    workspace: 'Workspace',
    account: 'Cuenta',
    logout: 'Cerrar sesión',
  },

  // Semáforo / estado
  status: {
    optimal: 'Óptimo',
    atRisk: 'En riesgo',
    injured: 'Lesionado',
    active: 'Activo',
    inactive: 'Baja',
    transferred: 'Transferido',
  },

  // Dashboard
  dashboard: {
    title: 'Panel del Equipo',
    subtitle: 'Vista general del estado físico del equipo',
    totalPlayers: 'Jugadores totales',
    optimal: 'Óptimos',
    atRisk: 'En riesgo',
    injured: 'Lesionados',
    lastUpdate: 'Última actualización',
    teamEfficiency: 'Eficiencia del equipo',
    alerts: 'Alertas activas',
    noAlerts: 'Sin alertas activas',
    playersAtRisk: 'Jugadores en riesgo',
    injuredPlayers: 'Jugadores lesionados',
    recommendations: 'Recomendaciones',
    squadStatus: 'Estado del plantel',
    available: 'Disponibles',
    matchReady: 'Aptos para partido',
    watchlist: 'Lista de seguimiento',
    viewAll: 'Ver todos',
  },

  // Panel físico (preparador)
  physical: {
    title: 'Panel Físico',
    subtitle: 'Monitoreo de carga y estado del plantel',
    highFatigue: 'Fatiga alta',
    painReported: 'Dolor reportado',
    lastUploads: 'Últimas cargas',
    uploadErrors: 'Errores de carga',
    observations: 'Observaciones',
    physicalRecs: 'Recomendaciones físicas',
  },

  // Jugadores
  players: {
    title: 'Jugadores',
    subtitle: 'Plantel completo',
    name: 'Nombre',
    position: 'Posición',
    dorsal: 'Dorsal',
    age: 'Edad',
    status: 'Estado',
    risk: 'Riesgo',
    lastUpdate: 'Última actualización',
    addPlayer: 'Agregar jugador',
    editPlayer: 'Editar jugador',
    deletePlayer: 'Eliminar jugador',
    all: 'Todos',
    available: 'Disponibles',
    recovery: 'Recuperación',
    filterBy: 'Filtrar por',
    search: 'Buscar jugadores...',
    height: 'Altura',
    weight: 'Peso',
    dominantFoot: 'Pie dominante',
    team: 'Equipo',
  },

  // Perfil jugador
  player: {
    title: 'Perfil del jugador',
    currentStatus: 'Estado actual',
    recommendation: 'Recomendación',
    lastUpdate: 'Última actualización',
    noData: 'Sin datos físicos registrados',
    session: 'Tipo de sesión',
    minutesPlayed: 'Minutos jugados',
    sprints: 'Sprints',
    distance: 'Distancia recorrida',
    physicalLoad: 'Carga física',
    fatigue: 'Fatiga',
    pain: 'Dolor reportado',
    painZone: 'Zona de molestia',
    injuryType: 'Tipo de lesión',
    injuryHistory: 'Historial de lesión',
    daysSinceInjury: 'Días desde última lesión',
    observations: 'Observaciones del preparador',
    openProfile: 'Ver perfil',
    readiness: 'Aptitud',
  },

  // Mi estado (jugador)
  myStatus: {
    title: 'Mi Estado',
    subtitle: 'Tu estado físico actual',
    yourStatus: 'Tu estado',
    yourRecommendation: 'Recomendación para ti',
  },

  // Carga Excel
  upload: {
    title: 'Carga de Excel',
    subtitle: 'Sube los archivos Excel para actualizar el plantel',
    playersFile: 'Excel de Jugadores',
    physicalFile: 'Excel de Estado Físico',
    playersDesc: 'Catálogo base de jugadores del equipo',
    physicalDesc: 'Estado físico, lesiones y nivel de riesgo',
    dropHere: 'Arrastra tu archivo aquí o',
    browse: 'selecciona archivo',
    uploading: 'Procesando...',
    success: 'Carga exitosa',
    error: 'Error en la carga',
    recordsProcessed: 'Registros procesados',
    errorsFound: 'Errores encontrados',
    downloadTemplate: 'Descargar plantilla',
    validating: 'Validando columnas...',
    missingCols: 'Columnas faltantes',
    invalidValues: 'Valores inválidos',
    uploadNow: 'Subir archivo',
    noFile: 'Ningún archivo seleccionado',
    fileType: 'Tipo de archivo',
  },

  // Historial
  history: {
    title: 'Historial de Cargas',
    subtitle: 'Registro de archivos Excel procesados',
    date: 'Fecha',
    user: 'Usuario',
    fileType: 'Tipo',
    fileName: 'Archivo',
    statusLabel: 'Estado',
    records: 'Registros',
    errors: 'Errores',
    successful: 'Exitosa',
    withErrors: 'Con errores',
    noHistory: 'Sin historial de cargas',
  },

  // Alineaciones
  lineups: {
    title: 'Alineaciones',
    subtitle: 'Gestión de titulares, banca y suplentes',
    starters: 'Titulares',
    bench: 'Banca',
    reserves: 'Suplentes',
    efficiency: 'Eficiencia del equipo',
    substitute: 'Sustituir',
    addToLineup: 'Agregar a alineación',
    removeFromLineup: 'Quitar de alineación',
    saveLineup: 'Guardar alineación',
    formation: 'Formación',
    simulate: 'Simular sustitución',
    efficiencyScore: 'Puntuación de eficiencia',
    alert: 'Alerta',
  },

  // Recomendaciones
  recommendations: {
    green: [
      'Mantener carga actual.',
      'Continuar seguimiento normal.',
      'Disponible para entrenamiento o partido.',
    ],
    yellow: [
      'Monitorear carga.',
      'Reducir intensidad.',
      'Revisar fatiga.',
      'Evaluar descanso.',
      'Considerar sustitución o rotación.',
    ],
    red: [
      'Priorizar recuperación.',
      'Evitar carga intensa.',
      'Revisar con cuerpo médico.',
      'Excluir de alineación.',
      'Dar seguimiento específico.',
    ],
  },

  // Errores / validaciones
  errors: {
    missingColumn: 'Columna obligatoria faltante',
    invalidStatus: 'Estado inválido. Use: óptimo, en riesgo, lesionado',
    invalidRisk: 'Nivel de riesgo inválido. Use: verde, amarillo, rojo',
    playerNotFound: 'jugador_id no encontrado en el catálogo',
    invalidDate: 'Formato de fecha inválido',
    invalidNumber: 'Campo numérico contiene texto',
    duplicateId: 'jugador_id duplicado',
  },

  // Comunes
  common: {
    yes: 'Sí',
    no: 'No',
    unknown: 'Desconocido',
    loading: 'Cargando...',
    save: 'Guardar',
    cancel: 'Cancelar',
    edit: 'Editar',
    delete: 'Eliminar',
    close: 'Cerrar',
    back: 'Volver',
    next: 'Siguiente',
    confirm: 'Confirmar',
    search: 'Buscar',
    filter: 'Filtrar',
    download: 'Descargar',
    upload: 'Subir',
    update: 'Actualizar',
    created: 'Creado',
    updated: 'Actualizado',
    noData: 'Sin datos',
    today: 'Hoy',
    of: 'de',
    open: 'Abrir',
    view: 'Ver',
    players: 'jugadores',
    language: 'Idioma',
    spanish: 'Español',
    english: 'Inglés',
  },

  // Posiciones
  positions: {
    GK: 'Portero',
    CB: 'Defensa Central',
    RB: 'Lateral Derecho',
    LB: 'Lateral Izquierdo',
    DM: 'Mediocampista Defensivo',
    CM: 'Mediocampista',
    AM: 'Mediocampista Ofensivo',
    RW: 'Extremo Derecho',
    LW: 'Extremo Izquierdo',
    SS: 'Segundo Delantero',
    ST: 'Delantero',
  },
};

// English translation (same structure)
const en: typeof es = {
  appName: 'ArmorPlay AI',
  appTagline: 'AI-powered injury prevention platform',

  login: {
    welcome: 'Welcome to ArmorPlay AI',
    subtitle: 'Select your role to continue',
    enterAs: 'Enter as',
    choosePlayer: 'Choose your player',
    selectRole: 'Select player...',
    continueBtn: 'Continue',
    heroTitle: 'Predict injuries\nbefore they happen.',
    heroSub: 'ArmorPlay AI turns physical load, fatigue and history into preventive decisions for your team.',
    stats: {
      precision: 'Accuracy',
      clubs: 'Teams',
      avoided: 'Injuries prevented',
    },
  },

  roles: {
    director: 'Team Director',
    director_desc: 'General dashboard, lineups and reports',
    preparador: 'Fitness Coach',
    preparador_desc: 'Excel uploads, physical states and monitoring',
    jugador: 'Player',
    jugador_desc: 'View your personal physical status',
  },

  nav: {
    dashboard: 'Main Dashboard',
    physicalDashboard: 'Physical Dashboard',
    players: 'Players',
    lineups: 'Lineups',
    uploadExcel: 'Excel Upload',
    uploadHistory: 'Upload History',
    reports: 'Reports',
    physicalStates: 'Physical States',
    myStatus: 'My Status',
    settings: 'Settings',
    alerts: 'Alerts',
    support: 'Support',
    workspace: 'Workspace',
    account: 'Account',
    logout: 'Log out',
  },

  status: {
    optimal: 'Optimal',
    atRisk: 'At Risk',
    injured: 'Injured',
    active: 'Active',
    inactive: 'Inactive',
    transferred: 'Transferred',
  },

  dashboard: {
    title: 'Team Dashboard',
    subtitle: 'General overview of the team physical status',
    totalPlayers: 'Total players',
    optimal: 'Optimal',
    atRisk: 'At Risk',
    injured: 'Injured',
    lastUpdate: 'Last update',
    teamEfficiency: 'Team efficiency',
    alerts: 'Active alerts',
    noAlerts: 'No active alerts',
    playersAtRisk: 'Players at risk',
    injuredPlayers: 'Injured players',
    recommendations: 'Recommendations',
    squadStatus: 'Squad status',
    available: 'Available',
    matchReady: 'Match ready',
    watchlist: 'Watchlist',
    viewAll: 'View all',
  },

  physical: {
    title: 'Physical Dashboard',
    subtitle: 'Load monitoring and squad status',
    highFatigue: 'High fatigue',
    painReported: 'Pain reported',
    lastUploads: 'Recent uploads',
    uploadErrors: 'Upload errors',
    observations: 'Observations',
    physicalRecs: 'Physical recommendations',
  },

  players: {
    title: 'Players',
    subtitle: 'Full squad',
    name: 'Name',
    position: 'Position',
    dorsal: 'Jersey',
    age: 'Age',
    status: 'Status',
    risk: 'Risk',
    lastUpdate: 'Last update',
    addPlayer: 'Add player',
    editPlayer: 'Edit player',
    deletePlayer: 'Delete player',
    all: 'All',
    available: 'Available',
    recovery: 'Recovery',
    filterBy: 'Filter by',
    search: 'Search players...',
    height: 'Height',
    weight: 'Weight',
    dominantFoot: 'Dominant foot',
    team: 'Team',
  },

  player: {
    title: 'Player Profile',
    currentStatus: 'Current status',
    recommendation: 'Recommendation',
    lastUpdate: 'Last update',
    noData: 'No physical data recorded',
    session: 'Session type',
    minutesPlayed: 'Minutes played',
    sprints: 'Sprints',
    distance: 'Distance covered',
    physicalLoad: 'Physical load',
    fatigue: 'Fatigue',
    pain: 'Pain reported',
    painZone: 'Pain zone',
    injuryType: 'Injury type',
    injuryHistory: 'Injury history',
    daysSinceInjury: 'Days since last injury',
    observations: 'Coach observations',
    openProfile: 'Open profile',
    readiness: 'Readiness',
  },

  myStatus: {
    title: 'My Status',
    subtitle: 'Your current physical status',
    yourStatus: 'Your status',
    yourRecommendation: 'Your recommendation',
  },

  upload: {
    title: 'Excel Upload',
    subtitle: 'Upload Excel files to update the squad',
    playersFile: 'Players Excel',
    physicalFile: 'Physical Status Excel',
    playersDesc: 'Base player catalog for the team',
    physicalDesc: 'Physical status, injuries and risk levels',
    dropHere: 'Drop your file here or',
    browse: 'browse files',
    uploading: 'Processing...',
    success: 'Upload successful',
    error: 'Upload error',
    recordsProcessed: 'Records processed',
    errorsFound: 'Errors found',
    downloadTemplate: 'Download template',
    validating: 'Validating columns...',
    missingCols: 'Missing columns',
    invalidValues: 'Invalid values',
    uploadNow: 'Upload file',
    noFile: 'No file selected',
    fileType: 'File type',
  },

  history: {
    title: 'Upload History',
    subtitle: 'Log of processed Excel files',
    date: 'Date',
    user: 'User',
    fileType: 'Type',
    fileName: 'File',
    statusLabel: 'Status',
    records: 'Records',
    errors: 'Errors',
    successful: 'Successful',
    withErrors: 'With errors',
    noHistory: 'No upload history',
  },

  lineups: {
    title: 'Lineups',
    subtitle: 'Manage starters, bench and reserves',
    starters: 'Starters',
    bench: 'Bench',
    reserves: 'Reserves',
    efficiency: 'Team efficiency',
    substitute: 'Substitute',
    addToLineup: 'Add to lineup',
    removeFromLineup: 'Remove from lineup',
    saveLineup: 'Save lineup',
    formation: 'Formation',
    simulate: 'Simulate substitution',
    efficiencyScore: 'Efficiency score',
    alert: 'Alert',
  },

  recommendations: {
    green: [
      'Maintain current load.',
      'Continue normal monitoring.',
      'Available for training or match.',
    ],
    yellow: [
      'Monitor load.',
      'Reduce intensity.',
      'Review fatigue.',
      'Consider rest.',
      'Consider substitution or rotation.',
    ],
    red: [
      'Prioritize recovery.',
      'Avoid intense load.',
      'Review with medical staff.',
      'Exclude from lineup.',
      'Provide specific follow-up.',
    ],
  },

  errors: {
    missingColumn: 'Missing required column',
    invalidStatus: 'Invalid status. Use: óptimo, en riesgo, lesionado',
    invalidRisk: 'Invalid risk level. Use: verde, amarillo, rojo',
    playerNotFound: 'jugador_id not found in catalog',
    invalidDate: 'Invalid date format',
    invalidNumber: 'Numeric field contains text',
    duplicateId: 'Duplicate jugador_id',
  },

  common: {
    yes: 'Yes',
    no: 'No',
    unknown: 'Unknown',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    confirm: 'Confirm',
    search: 'Search',
    filter: 'Filter',
    download: 'Download',
    upload: 'Upload',
    update: 'Update',
    created: 'Created',
    updated: 'Updated',
    noData: 'No data',
    today: 'Today',
    of: 'of',
    open: 'Open',
    view: 'View',
    players: 'players',
    language: 'Language',
    spanish: 'Spanish',
    english: 'English',
  },

  positions: {
    GK: 'Goalkeeper',
    CB: 'Centre Back',
    RB: 'Right Back',
    LB: 'Left Back',
    DM: 'Defensive Mid',
    CM: 'Midfielder',
    AM: 'Attacking Mid',
    RW: 'Right Winger',
    LW: 'Left Winger',
    SS: 'Second Striker',
    ST: 'Striker',
  },
};

export const translations = { es, en };

/** Función de traducción principal */
export function t(lang: Lang, key: string, vars?: Record<string, string | number>): string {
  const keys = key.split('.');
  let val: unknown = translations[lang];
  for (const k of keys) {
    if (typeof val === 'object' && val !== null) {
      val = (val as Record<string, unknown>)[k];
    } else {
      val = undefined;
      break;
    }
  }
  if (typeof val !== 'string') {
    // Fallback to Spanish
    let fallback: unknown = translations['es'];
    for (const k of keys) {
      if (typeof fallback === 'object' && fallback !== null) {
        fallback = (fallback as Record<string, unknown>)[k];
      } else { fallback = undefined; break; }
    }
    if (typeof fallback !== 'string') return key;
    val = fallback;
  }
  if (vars) {
    return (val as string).replace(/\{\{(\w+)\}\}/g, (_, k) => String(vars[k] ?? k));
  }
  return val as string;
}
