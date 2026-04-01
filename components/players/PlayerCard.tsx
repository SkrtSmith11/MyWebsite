"use client";

import { useState } from "react";
import type { Player, TrackedPlayer, Bet } from "@/lib/types";
import StatBadge from "./StatBadge";
import { formatTimeAgo } from "@/lib/utils";

interface Props {
  player: Player;
  tracked: TrackedPlayer;
  activeBets: Bet[];
  onRemove: (id: string) => void;
  onTogglePin: (id: string) => void;
  onAddBet?: () => void;
  isSessionLocked: boolean;
}

const gameStatusColors = {
  live: "bg-red-500",
  upcoming: "bg-amber-500",
  final: "bg-slate-500",
  off: "bg-slate-700",
};

const gameStatusLabels = {
  live: "LIVE",
  upcoming: "UPCOMING",
  final: "FINAL",
  off: "OFF",
};

export default function PlayerCard({
  player,
  tracked,
  activeBets,
  onRemove,
  onTogglePin,
  onAddBet,
  isSessionLocked,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  // Which stat labels are being watched via bets
  const watchedLabels = new Set(
    activeBets.map((b) => b.trackedStatLabel).filter(Boolean) as string[]
  );

  function isWatched(label: string) {
    return watchedLabels.size > 0 && watchedLabels.has(label);
  }

  const hasBets = activeBets.length > 0;

  return (
    <div
      className={`relative rounded-xl border bg-slate-800/60 backdrop-blur transition-all duration-200
        ${tracked.isPinned ? "border-brand-500/60 shadow-lg shadow-brand-500/10" : "border-slate-700/50"}
        ${hasBets ? "ring-1 ring-amber-500/20" : ""}
      `}
    >
      {tracked.isPinned && (
        <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-brand-500/60 to-transparent" />
      )}

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow"
              style={{ backgroundColor: player.avatarColor }}
            >
              {player.imageInitials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white text-sm leading-tight">
                  {player.name}
                </span>
                {tracked.isPinned && (
                  <span className="text-brand-500 text-xs">★</span>
                )}
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                {player.team} · {player.position} ·{" "}
                <span className="text-slate-500">{player.sport}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => onTogglePin(tracked.playerId)}
              className={`p-1.5 rounded-lg text-sm transition-colors ${
                tracked.isPinned
                  ? "text-brand-500 hover:text-brand-600"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              {tracked.isPinned ? "★" : "☆"}
            </button>
            <button
              onClick={() => onRemove(tracked.playerId)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 transition-colors text-sm"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Game status row */}
        <div className="flex items-center justify-between mb-3 flex-wrap gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium text-white ${
                gameStatusColors[player.gameStatus ?? "off"]
              }`}
            >
              {player.gameStatus === "live" && (
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
              {gameStatusLabels[player.gameStatus ?? "off"]}
            </span>
            {player.opponent && (
              <span className="text-xs text-slate-400">{player.opponent}</span>
            )}
            <span
              className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                player.isLiveStats
                  ? "bg-red-500/20 text-red-400"
                  : "bg-slate-700/60 text-slate-500"
              }`}
            >
              {player.isLiveStats ? "NOW" : "SEASON AVG"}
            </span>
          </div>
          <span
            className="text-xs text-slate-600"
            title={new Date(player.lastUpdated).toLocaleString()}
          >
            {formatTimeAgo(player.lastUpdated)}
          </span>
        </div>

        {/* Active bets on this player */}
        {hasBets && (
          <div className="mb-3 space-y-1">
            {activeBets.map((bet) => (
              <div
                key={bet.id}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20"
              >
                <span className="text-amber-400 text-xs">🎯</span>
                <span className="text-xs text-amber-300 flex-1 truncate">
                  {bet.description}
                </span>
                {bet.trackedStatName && (
                  <span className="text-xs text-amber-500 shrink-0 font-medium">
                    watching {bet.trackedStatName}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Primary stats */}
        {player.stats.primary.length > 0 ? (
          <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-700/50">
            {player.stats.primary.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-lg transition-colors ${
                  isWatched(stat.label)
                    ? "bg-amber-500/15 ring-1 ring-amber-500/40 p-1"
                    : ""
                }`}
              >
                <StatBadge stat={stat} />
                {isWatched(stat.label) && (
                  <div className="text-center mt-0.5">
                    <span className="text-amber-400 text-xs">👁 watching</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-slate-600 border-y border-slate-700/50">
            Loading stats…
          </div>
        )}

        {/* Secondary stats (expanded) */}
        {expanded && player.stats.secondary.length > 0 && (
          <div className="grid grid-cols-3 gap-x-2 gap-y-3 pt-3">
            {player.stats.secondary.map((stat) => (
              <div
                key={stat.label}
                className={`rounded-lg transition-colors ${
                  isWatched(stat.label)
                    ? "bg-amber-500/15 ring-1 ring-amber-500/40 p-1"
                    : ""
                }`}
              >
                <StatBadge stat={stat} size="sm" />
                {isWatched(stat.label) && (
                  <div className="text-center mt-0.5">
                    <span className="text-amber-400 text-xs">👁</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
          >
            {expanded ? "▲ Less" : "▼ More stats"}
          </button>

          {onAddBet && (
            <button
              onClick={onAddBet}
              disabled={isSessionLocked}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                isSessionLocked
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                  : "bg-brand-500/20 text-brand-400 hover:bg-brand-500/30"
              }`}
            >
              {isSessionLocked ? "🔒 Locked" : "+ Add Bet"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
