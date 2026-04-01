"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import SessionStatusBar from "@/components/layout/SessionStatusBar";
import PlayerSearch from "@/components/players/PlayerSearch";
import PlayerGrid from "@/components/players/PlayerGrid";
import BetSessionPanel from "@/components/betting/BetSessionPanel";
import { useTrackedPlayers } from "@/hooks/useTrackedPlayers";
import { useBetSession } from "@/hooks/useBetSession";
import { usePlayerStats } from "@/hooks/usePlayerStats";

export default function Home() {
  const { trackedPlayers, addPlayer, removePlayer, togglePin } = useTrackedPlayers();
  const { session, isLocked, addBet, removeBet, lockSession, startNewSession } = useBetSession();
  const [defaultBetPlayerId, setDefaultBetPlayerId] = useState<string | undefined>();
  const [sportFilter, setSportFilter] = useState<string>("All");

  const trackedIds = useMemo(
    () => trackedPlayers.map((tp) => tp.playerId),
    [trackedPlayers]
  );

  const { players: playerMap, loading } = usePlayerStats(trackedIds);

  const filteredTracked = useMemo(() => {
    if (sportFilter === "All") return trackedPlayers;
    return trackedPlayers.filter((tp) => playerMap[tp.playerId]?.sport === sportFilter);
  }, [trackedPlayers, playerMap, sportFilter]);

  const trackedPlayersList = useMemo(
    () => trackedIds.map((id) => playerMap[id]).filter(Boolean) as ReturnType<typeof Object.values<typeof playerMap[string]>>,
    [trackedIds, playerMap]
  );

  const sports = ["All", "NBA", "NFL", "MLB", "NHL"];

  function handleAddBet(playerId: string) {
    setDefaultBetPlayerId(playerId);
    // Scroll betting panel into view on mobile
    document.getElementById("bet-panel")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header isSessionLocked={isLocked} trackedCount={trackedPlayers.length} />

      {session?.status === "locked" && (
        <SessionStatusBar session={session} onNewSession={startNewSession} />
      )}

      <div className="flex flex-col lg:flex-row flex-1 max-w-screen-2xl mx-auto w-full">
        {/* Main — player tracker */}
        <main className="flex-1 min-w-0 p-4 lg:p-6 space-y-5">
          {/* Search */}
          <div className="max-w-xl">
            <PlayerSearch
              trackedIds={trackedIds}
              onAdd={addPlayer}
            />
          </div>

          {/* Sport filter */}
          {trackedPlayers.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {sports.map((s) => (
                <button
                  key={s}
                  onClick={() => setSportFilter(s)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    sportFilter === s
                      ? "bg-brand-500 text-white"
                      : "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Player grid */}
          <PlayerGrid
            trackedPlayers={filteredTracked}
            playerMap={playerMap}
            loading={loading}
            onRemove={removePlayer}
            onTogglePin={togglePin}
            onAddBet={handleAddBet}
            isSessionLocked={isLocked}
          />
        </main>

        {/* Sidebar — bet session */}
        <aside
          id="bet-panel"
          className="w-full lg:w-80 xl:w-96 shrink-0 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 lg:p-6 lg:overflow-y-auto lg:sticky lg:top-[57px] lg:max-h-[calc(100vh-57px)]"
        >
          <BetSessionPanel
            session={session}
            trackedPlayers={Object.values(playerMap)}
            defaultBetPlayerId={defaultBetPlayerId}
            onAddBet={addBet}
            onRemoveBet={removeBet}
            onLock={lockSession}
            onNewSession={startNewSession}
          />
        </aside>
      </div>
    </div>
  );
}
