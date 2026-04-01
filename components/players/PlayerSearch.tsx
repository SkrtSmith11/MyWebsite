"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { getAllPlayers } from "@/lib/mockData";
import type { Player } from "@/lib/types";

interface Props {
  trackedIds: string[];
  onAdd: (playerId: string) => void;
}

const sportColors: Record<string, string> = {
  NBA: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  NFL: "bg-green-500/20 text-green-400 border-green-500/30",
  MLB: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  NHL: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const ALL_SPORTS = ["All", "NBA", "NFL", "MLB", "NHL"];

export default function PlayerSearch({ trackedIds, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("All");
  const inputRef = useRef<HTMLInputElement>(null);

  const allPlayers = getAllPlayers();

  const available = allPlayers.filter((p) => {
    if (trackedIds.includes(p.id)) return false;
    if (sportFilter !== "All" && p.sport !== sportFilter) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.team.toLowerCase().includes(q) ||
        p.position.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Group by sport for display
  const grouped: Record<string, Player[]> = {};
  available.forEach((p) => {
    if (!grouped[p.sport]) grouped[p.sport] = [];
    grouped[p.sport].push(p);
  });

  function handleAdd(playerId: string) {
    onAdd(playerId);
    // Keep panel open so user can add more
    setQuery("");
    inputRef.current?.focus();
  }

  function handleClose() {
    setOpen(false);
    setQuery("");
  }

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const trackedCount = trackedIds.length;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-brand-500/50 transition-colors"
      >
        <span className="text-slate-500">🔍</span>
        <span className="text-slate-400 text-sm flex-1">
          Add players to track…
        </span>
        {trackedCount > 0 && (
          <span className="text-xs text-slate-500 shrink-0">
            {trackedCount} tracked
          </span>
        )}
      </button>

      {/* Full-screen modal overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 shrink-0">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                🔍
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                placeholder="Search by name, team…"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
            </div>
            <button
              onClick={handleClose}
              className="shrink-0 px-3 py-2 text-sm text-slate-400 hover:text-white"
            >
              Done
            </button>
          </div>

          {/* Sport filter tabs */}
          <div className="flex gap-2 px-4 py-3 overflow-x-auto shrink-0 border-b border-slate-800">
            {ALL_SPORTS.map((s) => (
              <button
                key={s}
                onPointerDown={(e) => {
                  e.preventDefault();
                  setSportFilter(s);
                }}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                  sportFilter === s
                    ? "bg-brand-500 text-white border-brand-500"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Player list */}
          <div className="flex-1 overflow-y-auto">
            {available.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                <div className="text-4xl mb-3">🏆</div>
                <p className="text-white font-medium mb-1">
                  {query ? `No results for "${query}"` : "All players tracked!"}
                </p>
                <p className="text-sm text-slate-500">
                  {query ? "Try a different name or team." : "You're already tracking everyone."}
                </p>
              </div>
            ) : sportFilter !== "All" ? (
              // Flat list when sport is filtered
              <div className="divide-y divide-slate-800">
                {available.map((player) => (
                  <PlayerRow key={player.id} player={player} onAdd={handleAdd} />
                ))}
              </div>
            ) : (
              // Grouped by sport
              Object.entries(grouped).map(([sport, players]) => (
                <div key={sport}>
                  <div className="sticky top-0 px-4 py-2 bg-slate-900/95 backdrop-blur border-b border-slate-800">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded border ${
                        sportColors[sport] ?? "bg-slate-700 text-slate-400 border-slate-600"
                      }`}
                    >
                      {sport}
                    </span>
                  </div>
                  <div className="divide-y divide-slate-800/60">
                    {players.map((player) => (
                      <PlayerRow key={player.id} player={player} onAdd={handleAdd} />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

function PlayerRow({
  player,
  onAdd,
}: {
  player: Player;
  onAdd: (id: string) => void;
}) {
  const [added, setAdded] = useState(false);

  function handleTap() {
    if (added) return;
    setAdded(true);
    onAdd(player.id);
  }

  const gameStatusDot = {
    live: "bg-red-500",
    upcoming: "bg-amber-500",
    final: "bg-slate-500",
    off: "bg-slate-700",
  }[player.gameStatus ?? "off"];

  return (
    <button
      onPointerDown={handleTap}
      className={`w-full flex items-center gap-4 px-4 py-4 transition-colors text-left active:bg-slate-700/50 ${
        added ? "bg-brand-500/10" : "hover:bg-slate-800/60"
      }`}
    >
      {/* Avatar */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0 shadow"
        style={{ backgroundColor: player.avatarColor }}
      >
        {player.imageInitials}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{player.name}</span>
          {player.gameStatus === "live" && (
            <span className="flex items-center gap-1 text-xs text-red-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              LIVE
            </span>
          )}
        </div>
        <div className="text-xs text-slate-400 mt-0.5">
          {player.team} · {player.position}
          {player.opponent && (
            <span className="text-slate-500"> · {player.opponent}</span>
          )}
        </div>
      </div>

      {/* Add indicator */}
      <div
        className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
          added
            ? "bg-brand-500 text-white"
            : "border border-slate-600 text-slate-500"
        }`}
      >
        {added ? "✓" : "+"}
      </div>
    </button>
  );
}
