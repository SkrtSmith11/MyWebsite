"use client";

import { useState, useEffect, useRef } from "react";
import { searchPlayers } from "@/lib/mockData";
import type { Player } from "@/lib/types";

interface Props {
  trackedIds: string[];
  onAdd: (playerId: string) => void;
}

const sportColors: Record<string, string> = {
  NBA: "text-orange-400",
  NFL: "text-green-400",
  MLB: "text-blue-400",
  NHL: "text-cyan-400",
};

export default function PlayerSearch({ trackedIds, onAdd }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Player[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const found = await searchPlayers(query);
        setResults(found.filter((p) => !trackedIds.includes(p.id)));
        setOpen(true);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, trackedIds.join(",")]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function handleAdd(playerId: string) {
    onAdd(playerId);
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
          🔍
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search players by name, team, or sport…"
          className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs animate-pulse">
            …
          </span>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden">
          {results.map((player) => (
            <button
              key={player.id}
              onClick={() => handleAdd(player.id)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/60 transition-colors text-left"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                style={{ backgroundColor: player.avatarColor }}
              >
                {player.imageInitials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">{player.name}</div>
                <div className="text-xs text-slate-400">
                  {player.team} · {player.position}
                </div>
              </div>
              <span className={`text-xs font-medium ${sportColors[player.sport] ?? "text-slate-400"}`}>
                {player.sport}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && results.length === 0 && query.trim().length >= 2 && !loading && (
        <div className="absolute z-50 top-full mt-1 w-full bg-slate-800 border border-slate-700 rounded-xl shadow-xl px-4 py-3 text-sm text-slate-500">
          No players found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}
