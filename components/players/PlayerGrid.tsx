"use client";

import type { TrackedPlayer, Player } from "@/lib/types";
import PlayerCard from "./PlayerCard";

interface Props {
  trackedPlayers: TrackedPlayer[];
  playerMap: Record<string, Player>;
  loading: boolean;
  onRemove: (id: string) => void;
  onTogglePin: (id: string) => void;
  onAddBet: (playerId: string) => void;
  isSessionLocked: boolean;
}

export default function PlayerGrid({
  trackedPlayers,
  playerMap,
  loading,
  onRemove,
  onTogglePin,
  onAddBet,
  isSessionLocked,
}: Props) {
  if (trackedPlayers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="text-5xl mb-4">🏆</div>
        <h3 className="text-lg font-semibold text-white mb-2">No players tracked yet</h3>
        <p className="text-sm text-slate-400 max-w-xs">
          Search for players above and add them to your tracker to see their live stats in one place.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {trackedPlayers.map((tp) => (
          <div key={tp.playerId} className="h-48 rounded-xl bg-slate-800/40 animate-pulse border border-slate-700/30" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {trackedPlayers.map((tp) => {
        const player = playerMap[tp.playerId];
        if (!player) return null;
        return (
          <PlayerCard
            key={tp.playerId}
            player={player}
            tracked={tp}
            onRemove={onRemove}
            onTogglePin={onTogglePin}
            onAddBet={() => onAddBet(player.id)}
            isSessionLocked={isSessionLocked}
          />
        );
      })}
    </div>
  );
}
