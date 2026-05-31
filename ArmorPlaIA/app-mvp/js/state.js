/* ============================================================
   STATE — Single source of truth: mock data + mutable state
   ============================================================ */

export const players = [
  {id:'J001',name:'A. Pérez',    fullName:'Alejandro Pérez',   pos:'GK', dorsal:1,  semaforo:'green',  fatiga:'baja',  load:45, sprints:8,  minutes:90, pain:false, obs:'',                                                       rec:'Mantener carga actual. Disponible para partido.',            lesion:''},
  {id:'J002',name:'S. Kovač',    fullName:'Stefan Kovač',       pos:'RB', dorsal:2,  semaforo:'green',  fatiga:'media', load:72, sprints:18, minutes:85, pain:false, obs:'',                                                       rec:'Continuar seguimiento normal. Disponible.',                  lesion:''},
  {id:'J003',name:'T. Moretti',  fullName:'Tomás Moretti',      pos:'LB', dorsal:3,  semaforo:'yellow', fatiga:'alta',  load:82, sprints:24, minutes:87, pain:true,  obs:'Molestia en isquiotibiales posterior al partido.',        rec:'Reducir carga y monitorear evolución. Evaluar descanso.',    lesion:''},
  {id:'J004',name:'R. Okafor',   fullName:'Rafael Okafor',      pos:'CB', dorsal:4,  semaforo:'green',  fatiga:'baja',  load:58, sprints:10, minutes:90, pain:false, obs:'',                                                       rec:'Disponible para partido. Sin alertas.',                      lesion:''},
  {id:'J005',name:'D. Lindqvist',fullName:'David Lindqvist',    pos:'CB', dorsal:5,  semaforo:'green',  fatiga:'baja',  load:50, sprints:9,  minutes:90, pain:false, obs:'',                                                       rec:'Disponible para partido. Sin alertas.',                      lesion:''},
  {id:'J006',name:'F. Bauer',    fullName:'Felix Bauer',        pos:'DM', dorsal:6,  semaforo:'green',  fatiga:'media', load:62, sprints:15, minutes:90, pain:false, obs:'',                                                       rec:'Mantener carga actual. Disponible.',                         lesion:''},
  {id:'J007',name:'M. Tavares',  fullName:'Marcus Tavares',     pos:'RW', dorsal:7,  semaforo:'yellow', fatiga:'alta',  load:88, sprints:28, minutes:82, pain:true,  obs:'Sprint load 22% por encima de la media semanal.',         rec:'Reducir intensidad. Revisar fatiga. Considerar rotación.',   lesion:''},
  {id:'J008',name:'J. Bellini',  fullName:'Jordan Bellini',     pos:'CM', dorsal:8,  semaforo:'green',  fatiga:'media', load:68, sprints:16, minutes:88, pain:false, obs:'',                                                       rec:'Disponible para partido.',                                   lesion:''},
  {id:'J009',name:'K. Adeyemi',  fullName:'Kofi Adeyemi',       pos:'ST', dorsal:9,  semaforo:'red',    fatiga:'baja',  load:20, sprints:2,  minutes:0,  pain:false, obs:'Lesión de rodilla confirmada. Baja médica 2 semanas.',     rec:'Priorizar recuperación. Excluir de alineación.',             lesion:'Lesión de rodilla'},
  {id:'J010',name:'L. Hernández',fullName:'Luis Hernández',     pos:'ST', dorsal:10, semaforo:'yellow', fatiga:'alta',  load:85, sprints:24, minutes:82, pain:true,  obs:'Molestia posterior al partido. Vigilar isquiotibiales.',   rec:'Reducir carga y monitorear evolución. Vigilar próxima sesión.',lesion:''},
  {id:'J011',name:'C. Nakamura', fullName:'Carlos Nakamura',    pos:'LW', dorsal:11, semaforo:'green',  fatiga:'media', load:70, sprints:19, minutes:80, pain:false, obs:'',                                                       rec:'Continuar seguimiento normal.',                              lesion:''},
  {id:'J012',name:'P. Hassan',   fullName:'Patrick Hassan',     pos:'CM', dorsal:14, semaforo:'yellow', fatiga:'alta',  load:79, sprints:22, minutes:88, pain:false, obs:'Acumulación de carga en 3 sesiones consecutivas.',         rec:'Monitorear carga. Evaluar descanso activo.',                 lesion:''},
  {id:'J013',name:'E. Vargas',   fullName:'Emilio Vargas',      pos:'GK', dorsal:13, semaforo:'red',    fatiga:'baja',  load:10, sprints:0,  minutes:0,  pain:false, obs:'Esguince grado II tobillo izquierdo.',                    rec:'Baja médica. Sin actividad física por 2 semanas.',           lesion:'Esguince tobillo izq.'},
  {id:'J014',name:'R. Santos',   fullName:'Ricardo Santos',     pos:'CB', dorsal:16, semaforo:'green',  fatiga:'baja',  load:55, sprints:11, minutes:70, pain:false, obs:'',                                                       rec:'Disponible. Continuar adaptación.',                          lesion:''},
];

export const titulares0 = ['J001','J004','J005','J002','J003','J006','J008','J012','J007','J011','J010'];
export const banca0     = ['J009','J013','J014'];

export const uploadHistory = [
  {id:'U001',date:'2026-05-21',user:'Ana García',type:'estados',typeLabel:'Estados físicos',file:'estado_fisico_may21.xlsx',status:'exitosa',records:14,errors:0},
  {id:'U002',date:'2026-05-19',user:'Carlos Mendoza',type:'jugadores',typeLabel:'Jugadores',file:'plantel_armor_fc.xlsx',status:'exitosa',records:14,errors:0},
  {id:'U003',date:'2026-05-18',user:'Ana García',type:'estados',typeLabel:'Estados físicos',file:'estado_fisico_may18.xlsx',status:'con errores',records:12,errors:2},
  {id:'U004',date:'2026-05-15',user:'Carlos Mendoza',type:'jugadores',typeLabel:'Jugadores',file:'plantel_armor_mayo.xlsx',status:'exitosa',records:13,errors:0},
  {id:'U005',date:'2026-05-13',user:'Ana García',type:'estados',typeLabel:'Estados físicos',file:'estado_fisico_may13.xlsx',status:'exitosa',records:13,errors:0},
];

export const state = {
  lang: 'es',
  currentRole: null,
  selectedPlayerId: null,
  activeNav: 'dashboard',
  playersFilter: 'all',
  playersSearch: '',
  activeLineup: [...titulares0],
  swapMode: false,
  swapFromId: null,
  swapIsGK: false,
  historyFilter: 'all',
};
