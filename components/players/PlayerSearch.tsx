"use client";

import { useState, useEffect, useRef } from "react";
import { getAllPlayers } from "@/lib/mockData";
import type { Sport } from "@/lib/types";
import type { AddPlayerInput } from "@/hooks/useTrackedPlayers";

interface SearchResult {
  espnId: string;
  name: string;
  team: string;
  position: string;
  sport: Sport;
  imageInitials: string;
  avatarColor: string;
}

interface Props {
  trackedEspnIds: string[];
  onAdd: (player: AddPlayerInput) => void;
}

const sportColors: Record<string, string> = {
  NBA: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  NFL: "bg-green-500/20 text-green-400 border-green-500/30",
  MLB: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  NHL: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const ALL_SPORTS = ["All", "NBA", "NFL", "MLB", "NHL"];

// Convert preset mock players to SearchResult shape
function presetPlayers(): SearchResult[] {
  return getAllPlayers().map((p) => ({
    espnId: p.espnId,
    name: p.name,
    team: p.team,
    position: p.position,
    sport: p.sport,
    imageInitials: p.imageInitials,
    avatarColor: p.avatarColor,
  }));
}

export default function PlayerSearch({ trackedEspnIds, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sportFilter, setSportFilter] = useState("All");
  const [espnResults, setEspnResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const presets = presetPlayers();

  // ESPN search with debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      setEspnResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data: SearchResult[] = await res.json();
          setEspnResults(data);
        }
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Merge presets + ESPN results, dedup by espnId, filter
  const allResults: SearchResult[] = (() => {
    const map = new Map<string, SearchResult>();
    for (const p of presets) map.set(p.espnId, p);
    for (const p of espnResults) {
      if (!map.has(p.espnId)) map.set(p.espnId, p);
    }
    return Array.from(map.values())
      .filter((p) => !trackedEspnIds.includes(p.espnId))
      .filter((p) => sportFilter === "All" || p.sport === sportFilter)
      .filter((p) => {
        if (!query.trim()) return true;
        const q = query.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.team.toLowerCase().includes(q) ||
          p.position.toLowerCase().includes(q)
        );
      });
  })();

  // Group by sport for "All" view
  const grouped: Partial<Record<string, SearchResult[]>> = {};
  for (const p of allResults) {
    if (!grouped[p.sport]) grouped[p.sport] = [];
    grouped[p.sport]!.push(p);
  }

  function handleAdd(player: SearchResult) {
    onAdd({
      espnId: player.espnId,
      sport: player.sport,
      name: player.name,
      team: player.team,
      position: player.position,
      imageInitials: player.imageInitials,
      avatarColor: player.avatarColor,
    });
    setQuery("");
    inputRef.current?.focus();
  }

  function handleClose() {
    setOpen(false);
    setQuery("");
    setEspnResults([]);
  }

  useEffect(() => {
    if (!open) return;
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-brand-500/50 transition-colors"
      >
        <span className="text-slate-500">🔍</span>
        <span className="text-slate-400 text-sm flex-1">
          Search any player — Caufield, LeBron, Mahomes…
        </span>
        {trackedEspnIds.length > 0 && (
          <span className="text-xs text-slate-500 shrink-0">
            {trackedEspnIds.length} tracked
          </span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800 shrink-0">
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                placeholder="Search any player by name…"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              {searching && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 animate-pulse">
                  searching…
                </span>
              )}
            </div>
            <button onClick={handleClose} className="shrink-0 px-3 py-2 text-sm text-slate-400 hover:text-white">
              Done
            </button>
          </div>

          {/* Sport tabs */}
          <div className="flex gap-2 px-4 py-3 overflow-x-auto shrink-0 border-b border-slate-800">
            {ALL_SPORTS.map((s) => (
              <button
                key={s}
                onPointerDown={(e) => { e.preventDefault(); setSportFilter(s); }}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  sportFilter === s
                    ? "bg-brand-500 text-white border-brand-500"
                    : "bg-slate-800 text-slate-400 border-slate-700"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto">
            {allResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                <div className="text-4xl mb-3">
                  {searching ? "⏳" : query.length >= 2 ? "🔍" : "🏒"}
                </div>
                <p className="text-white font-medium mb-1">
                  {searching
                    ? "Searching ESPN…"
                    : query.length >= 2
                    ? `No results for "${query}"`
                    : "Type a player name to search all of ESPN"}
                </p>
                {!searching && query.length < 2 && (
                  <p className="text-sm text-slate-500">
                    You can find any NHL, NBA, NFL, or MLB player
                  </p>
                )}
              </div>
            ) : sportFilter !== "All" ? (
              <div className="divide-y divide-slate-800">
                {allResults.map((p) => (
                  <PlayerRow key={p.espnId} player={p} onAdd={handleAdd} />
                ))}
              </div>
            ) : (
              Object.entries(grouped).map(([sport, players]) => (
                <div key={sport}>
                  <div className="sticky top-0 px-4 py-2 bg-slate-900/95 backdrop-blur border-b border-slate-800">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
                      sportColors[sport] ?? "bg-slate-700 text-slate-400 border-slate-600"
                    }`}>
                      {sport}
                    </span>
                  </div>
                  <div className="divide-y divide-slate-800/60">
                    {players!.map((p) => (
                      <PlayerRow key={p.espnId} player={p} onAdd={handleAdd} />
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

function PlayerRow({ player, onAdd }: { player: SearchResult; onAdd: (p: SearchResult) => void }) {
  const [added, setAdded] = useState(false);

  function handleTap() {
    if (added) return;
    setAdded(true);
    onAdd(player);
  }

  return (
    <button
      onPointerDown={handleTap}
      className={`w-full flex items-center gap-4 px-4 py-4 transition-colors text-left active:bg-slate-700/50 ${
        added ? "bg-brand-500/10" : "hover:bg-slate-800/60"
      }`}
    >
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
        style={{ backgroundColor: player.avatarColor }}
      >
        {player.imageInitials}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white">{player.name}</div>
        <div className="text-xs text-slate-400 mt-0.5">
          {player.team}{player.position ? ` · ${player.position}` : ""}
        </div>
      </div>
      <span className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded border ${
        sportColors[player.sport] ?? "bg-slate-700 text-slate-400 border-slate-600"
      }`}>
        {player.sport}
      </span>
      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
        added ? "bg-brand-500 text-white" : "border border-slate-600 text-slate-500"
      }`}>
        {added ? "✓" : "+"}
      </div>
    </button>
  );
}
