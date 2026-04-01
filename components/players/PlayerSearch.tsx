"use client";

import { useState, useEffect, useRef } from "react";
import type { Sport } from "@/lib/types";
import type { AddPlayerInput } from "@/hooks/useTrackedPlayers";
import type { TodayResponse, TodayGame } from "@/app/api/today/route";

interface RosterPlayer {
  espnId: string;
  name: string;
  team: string;
  position: string;
  sport: Sport;
  imageInitials: string;
  avatarColor: string;
}

interface SearchResult extends RosterPlayer {}

interface Props {
  trackedEspnIds: string[];
  onAdd: (player: AddPlayerInput) => void;
}

const SPORTS: Sport[] = ["NHL", "NBA", "NFL", "MLB"];

const sportColors: Record<string, string> = {
  NBA: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  NFL: "bg-green-500/20 text-green-400 border-green-500/30",
  MLB: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  NHL: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
};

const statusColors = {
  in: "bg-red-500",
  post: "bg-slate-600",
  pre: "bg-amber-500",
};
const statusLabels = {
  in: "LIVE",
  post: "FINAL",
  pre: "TODAY",
};

export default function PlayerSearch({ trackedEspnIds, onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [activeSport, setActiveSport] = useState<Sport>("NHL");
  const [todayGames, setTodayGames] = useState<TodayResponse | null>(null);
  const [loadingGames, setLoadingGames] = useState(false);
  const [selectedGame, setSelectedGame] = useState<TodayGame | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<{ id: string; name: string; abbr: string } | null>(null);
  const [roster, setRoster] = useState<RosterPlayer[]>([]);
  const [loadingRoster, setLoadingRoster] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [view, setView] = useState<"games" | "search">("games");
  const inputRef = useRef<HTMLInputElement>(null);

  // Load today's games when modal opens
  useEffect(() => {
    if (!open) return;
    setLoadingGames(true);
    fetch("/api/today")
      .then((r) => r.json())
      .then((data: TodayResponse) => {
        setTodayGames(data);
        // Auto-select first sport that has games
        const sportWithGames = SPORTS.find((s) => data[s]?.length > 0);
        if (sportWithGames) setActiveSport(sportWithGames);
      })
      .finally(() => setLoadingGames(false));
  }, [open]);

  // Load roster when a team is selected
  useEffect(() => {
    if (!selectedTeam || !selectedGame) return;
    setLoadingRoster(true);
    setRoster([]);
    fetch(`/api/roster?teamId=${selectedTeam.id}&sport=${selectedGame.sport}`)
      .then((r) => r.json())
      .then((data: RosterPlayer[]) => setRoster(data))
      .finally(() => setLoadingRoster(false));
  }, [selectedTeam?.id]);

  // ESPN search with debounce
  useEffect(() => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) setSearchResults(await res.json());
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  function handleAdd(player: RosterPlayer) {
    onAdd({
      espnId: player.espnId,
      sport: player.sport,
      name: player.name,
      team: player.team,
      position: player.position,
      imageInitials: player.imageInitials,
      avatarColor: player.avatarColor,
    });
  }

  function handleClose() {
    setOpen(false);
    setSelectedGame(null);
    setSelectedTeam(null);
    setRoster([]);
    setQuery("");
    setSearchResults([]);
    setView("games");
  }

  function selectTeam(game: TodayGame, team: typeof game.homeTeam) {
    setSelectedGame(game);
    setSelectedTeam(team);
  }

  function goBack() {
    if (selectedTeam) {
      setSelectedTeam(null);
      setRoster([]);
    } else if (selectedGame) {
      setSelectedGame(null);
    }
  }

  const currentGames = todayGames?.[activeSport] ?? [];
  const displayRoster = roster.filter((p) => !trackedEspnIds.includes(p.espnId));

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-left hover:border-brand-500/50 transition-colors"
      >
        <span className="text-slate-500">🔍</span>
        <span className="text-slate-400 text-sm flex-1">Browse tonight's players or search any name…</span>
        {trackedEspnIds.length > 0 && (
          <span className="text-xs text-slate-500 shrink-0">{trackedEspnIds.length} tracked</span>
        )}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950">

          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-800 shrink-0">
            {(selectedGame || selectedTeam) && (
              <button
                onPointerDown={(e) => { e.preventDefault(); goBack(); }}
                className="shrink-0 p-2 text-slate-400 hover:text-white"
              >
                ←
              </button>
            )}
            <div className="flex-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">🔍</span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); if (e.target.value) setView("search"); else setView("games"); }}
                placeholder="Search any player by name…"
                className="w-full pl-9 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
              />
              {searching && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 animate-pulse">…</span>
              )}
            </div>
            <button onClick={handleClose} className="shrink-0 px-3 py-2 text-sm text-slate-400 hover:text-white">
              Done
            </button>
          </div>

          {/* Search results */}
          {view === "search" && (
            <div className="flex-1 overflow-y-auto">
              {searchResults.length === 0 && !searching && query.length >= 2 ? (
                <p className="text-slate-500 text-sm text-center py-10">No results for &ldquo;{query}&rdquo;</p>
              ) : (
                <div className="divide-y divide-slate-800">
                  {searchResults.map((p) => (
                    <PlayerRow key={p.espnId} player={p} onAdd={handleAdd} alreadyTracked={trackedEspnIds.includes(p.espnId)} />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Games view */}
          {view === "games" && (
            <>
              {/* Sport tabs — only show when not drilled into a team */}
              {!selectedTeam && (
                <div className="flex gap-2 px-4 py-2 overflow-x-auto shrink-0 border-b border-slate-800">
                  {SPORTS.map((s) => {
                    const count = todayGames?.[s]?.length ?? 0;
                    return (
                      <button
                        key={s}
                        onPointerDown={(e) => { e.preventDefault(); setActiveSport(s); setSelectedGame(null); setSelectedTeam(null); }}
                        className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                          activeSport === s
                            ? "bg-brand-500 text-white border-brand-500"
                            : "bg-slate-800 text-slate-400 border-slate-700"
                        }`}
                      >
                        {s}
                        {count > 0 && (
                          <span className={`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                            activeSport === s ? "bg-white/20 text-white" : "bg-slate-700 text-slate-300"
                          }`}>
                            {count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="flex-1 overflow-y-auto">

                {/* Team roster view */}
                {selectedTeam && (
                  <>
                    <div className="px-4 py-3 border-b border-slate-800">
                      <p className="text-white font-semibold">{selectedTeam.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {displayRoster.length} players available · tap to track
                      </p>
                    </div>
                    {loadingRoster ? (
                      <div className="space-y-0 divide-y divide-slate-800/60">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="flex items-center gap-4 px-4 py-4">
                            <div className="w-11 h-11 rounded-full bg-slate-800 animate-pulse shrink-0" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 bg-slate-800 rounded animate-pulse w-32" />
                              <div className="h-2.5 bg-slate-800/60 rounded animate-pulse w-20" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : displayRoster.length === 0 ? (
                      <p className="text-slate-500 text-sm text-center py-10">
                        {roster.length === 0 ? "Loading roster…" : "All players from this team are already tracked."}
                      </p>
                    ) : (
                      <div className="divide-y divide-slate-800/60">
                        {displayRoster.map((p) => (
                          <PlayerRow key={p.espnId} player={p} onAdd={handleAdd} alreadyTracked={false} />
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* Game list → pick a team */}
                {!selectedTeam && !loadingGames && currentGames.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 text-center px-6">
                    <div className="text-4xl mb-3">📅</div>
                    <p className="text-white font-medium mb-1">No {activeSport} games today</p>
                    <p className="text-sm text-slate-500">Search by name above to find any {activeSport} player.</p>
                  </div>
                )}

                {!selectedTeam && loadingGames && (
                  <div className="space-y-3 p-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-20 rounded-xl bg-slate-800/40 animate-pulse" />
                    ))}
                  </div>
                )}

                {!selectedTeam && currentGames.map((game) => (
                  <div key={game.gameId} className="border-b border-slate-800/60">
                    {/* Game header */}
                    <div className="flex items-center justify-between px-4 py-2">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${statusColors[game.status]}`}>
                        {game.status === "in" && <span className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse mr-1" />}
                        {statusLabels[game.status]}
                      </span>
                      <span className="text-xs text-slate-500">{game.statusDetail}</span>
                    </div>
                    {/* Two team buttons */}
                    <div className="grid grid-cols-2 gap-2 px-4 pb-3">
                      {[game.awayTeam, game.homeTeam].map((team) => (
                        <button
                          key={team.id}
                          onPointerDown={(e) => { e.preventDefault(); selectTeam(game, team); }}
                          className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl bg-slate-800/60 border border-slate-700/50 hover:border-brand-500/40 active:bg-slate-700/60 transition-colors"
                        >
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ backgroundColor: team.color }}
                          >
                            {team.abbr}
                          </div>
                          <span className="text-xs text-white font-medium text-center leading-tight">{team.name}</span>
                          <span className="text-xs text-brand-400 font-medium">View roster →</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}

function PlayerRow({
  player,
  onAdd,
  alreadyTracked,
}: {
  player: RosterPlayer;
  onAdd: (p: RosterPlayer) => void;
  alreadyTracked: boolean;
}) {
  const [added, setAdded] = useState(alreadyTracked);

  function handleTap() {
    if (added) return;
    setAdded(true);
    onAdd(player);
  }

  return (
    <button
      onPointerDown={handleTap}
      disabled={alreadyTracked}
      className={`w-full flex items-center gap-4 px-4 py-4 transition-colors text-left ${
        added ? "bg-brand-500/10" : "hover:bg-slate-800/60 active:bg-slate-700/50"
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
      <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm transition-colors ${
        added ? "bg-brand-500 text-white" : "border border-slate-600 text-slate-500"
      }`}>
        {added ? "✓" : "+"}
      </div>
    </button>
  );
}
