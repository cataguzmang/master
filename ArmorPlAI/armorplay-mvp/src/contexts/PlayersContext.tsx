// ─── ArmorPlay AI · PlayersContext ───────────────────────────────────
import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import {
  mockPlayers,
  mockPhysicalStates,
  mockUploadHistory,
  mockLineup,
  type Player,
  type PhysicalState,
  type UploadRecord,
  type LineupSlot,
} from '../lib/mockData';
import { calcularSemaforo, type SemaforoColor } from '../lib/semaforo';

// ─── Tipos enriquecidos ──────────────────────────────────────────────

export interface PlayerWithState extends Player {
  semaforo: SemaforoColor;
  latestState: PhysicalState | null;
  semaforoReasons: string[];
}

interface PlayersContextValue {
  players: Player[];
  physicalStates: PhysicalState[];
  uploadHistory: UploadRecord[];
  lineup: LineupSlot[];

  // Datos enriquecidos
  playersWithState: PlayerWithState[];
  getPlayerWithState: (jugador_id: string) => PlayerWithState | undefined;
  getLatestState: (jugador_id: string) => PhysicalState | null;

  // Estadísticas del equipo
  stats: {
    total: number;
    optimal: number;
    atRisk: number;
    injured: number;
    lastUpdate: string | null;
  };

  // Mutaciones
  setPlayers: (players: Player[]) => void;
  addPhysicalStates: (states: PhysicalState[]) => void;
  addUploadRecord: (record: UploadRecord) => void;
  updateLineup: (lineup: LineupSlot[]) => void;
}

const PlayersContext = createContext<PlayersContextValue | null>(null);

export function PlayersProvider({ children }: { children: ReactNode }) {
  const [players, setPlayers] = useState<Player[]>(mockPlayers);
  const [physicalStates, setPhysicalStates] = useState<PhysicalState[]>(mockPhysicalStates);
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>(mockUploadHistory);
  const [lineup, setLineup] = useState<LineupSlot[]>(mockLineup);

  // ── Obtener el estado físico más reciente de un jugador ────────────
  const getLatestState = useCallback(
    (jugador_id: string): PhysicalState | null => {
      const states = physicalStates
        .filter(s => s.jugador_id === jugador_id)
        .sort((a, b) => b.fecha_registro.localeCompare(a.fecha_registro));
      return states[0] ?? null;
    },
    [physicalStates]
  );

  // ── Enriquecer jugadores con semáforo ─────────────────────────────
  const playersWithState: PlayerWithState[] = players.map(p => {
    const latest = getLatestState(p.jugador_id);
    const result = calcularSemaforo(latest);
    return {
      ...p,
      semaforo: result.color,
      latestState: latest,
      semaforoReasons: result.reasons,
    };
  });

  const getPlayerWithState = (jugador_id: string) =>
    playersWithState.find(p => p.jugador_id === jugador_id);

  // ── Estadísticas del equipo ────────────────────────────────────────
  const activePlayers = playersWithState.filter(p => p.estado_activo === 'activo' || p.estado_activo === 'lesionado');
  const stats = {
    total: activePlayers.length,
    optimal: activePlayers.filter(p => p.semaforo === 'green').length,
    atRisk:  activePlayers.filter(p => p.semaforo === 'yellow').length,
    injured: activePlayers.filter(p => p.semaforo === 'red').length,
    lastUpdate:
      physicalStates.length > 0
        ? physicalStates.sort((a, b) => b.fecha_registro.localeCompare(a.fecha_registro))[0].fecha_registro
        : null,
  };

  // ── Mutaciones ─────────────────────────────────────────────────────
  const addPhysicalStates = (newStates: PhysicalState[]) => {
    setPhysicalStates(prev => {
      // Replace states for existing players, add new ones
      const updated = [...prev];
      for (const s of newStates) {
        const idx = updated.findIndex(
          e => e.jugador_id === s.jugador_id && e.fecha_registro === s.fecha_registro
        );
        if (idx >= 0) updated[idx] = s;
        else updated.push(s);
      }
      return updated;
    });
  };

  const addUploadRecord = (record: UploadRecord) => {
    setUploadHistory(prev => [record, ...prev]);
  };

  const updateLineup = (newLineup: LineupSlot[]) => {
    setLineup(newLineup);
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        physicalStates,
        uploadHistory,
        lineup,
        playersWithState,
        getPlayerWithState,
        getLatestState,
        stats,
        setPlayers,
        addPhysicalStates,
        addUploadRecord,
        updateLineup,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
}

export function usePlayers() {
  const ctx = useContext(PlayersContext);
  if (!ctx) throw new Error('usePlayers must be used inside PlayersProvider');
  return ctx;
}
