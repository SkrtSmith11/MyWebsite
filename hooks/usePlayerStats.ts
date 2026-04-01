"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { Player, TrackedPlayer } from "@/lib/types";

const POLL_LIVE = 30_000;
const POLL_DEFAULT = 60_000;

async function fetchPlayerStats(tp: TrackedPlayer): Promise<Player> {
  const base: Player = {
    id: tp.playerId,
    name: tp.name,
    sport: tp.sport,
    team: tp.team,
    position: tp.position,
    imageInitials: tp.imageInitials,
    avatarColor: tp.avatarColor,
    espnId: tp.espnId,
    lastUpdated: new Date().toISOString(),
    stats: { primary: [], secondary: [] },
    gameStatus: "off",
  };

  try {
    const res = await fetch(
      `/api/stats?espnId=${tp.espnId}&sport=${tp.sport}`
    );
    if (!res.ok) return base;
    const data = await res.json();
    if (data.error || !data.stats) return base;

    return {
      ...base,
      gameStatus: data.gameStatus ?? "off",
      opponent: data.opponent ?? undefined,
      stats: data.stats,
      isLiveStats: data.isLiveStats ?? false,
      lastUpdated: data.lastUpdated ?? base.lastUpdated,
    };
  } catch {
    return base;
  }
}

export function usePlayerStats(trackedPlayers: TrackedPlayer[]) {
  const [players, setPlayers] = useState<Record<string, Player>>({});
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idsKey = trackedPlayers.map((tp) => tp.playerId).join(",");

  // Seed identity immediately from TrackedPlayer so cards render right away
  useEffect(() => {
    setPlayers((prev) => {
      const next = { ...prev };
      for (const tp of trackedPlayers) {
        if (!next[tp.playerId]) {
          next[tp.playerId] = {
            id: tp.playerId,
            name: tp.name,
            sport: tp.sport,
            team: tp.team,
            position: tp.position,
            imageInitials: tp.imageInitials,
            avatarColor: tp.avatarColor,
            espnId: tp.espnId,
            lastUpdated: new Date().toISOString(),
            stats: { primary: [], secondary: [] },
            gameStatus: "off",
          };
        }
      }
      // Remove players that were un-tracked
      const ids = new Set(trackedPlayers.map((t) => t.playerId));
      for (const id of Object.keys(next)) {
        if (!ids.has(id)) delete next[id];
      }
      return next;
    });
  }, [idsKey]);

  const refresh = useCallback(async (tps: TrackedPlayer[]) => {
    if (tps.length === 0) return 0;
    const results = await Promise.allSettled(tps.map(fetchPlayerStats));
    let liveCount = 0;
    setPlayers((prev) => {
      const next = { ...prev };
      results.forEach((r) => {
        if (r.status === "fulfilled" && r.value) {
          next[r.value.id] = r.value;
          if (r.value.gameStatus === "live") liveCount++;
        }
      });
      return next;
    });
    return liveCount;
  }, []);

  const scheduleNext = useCallback(
    (tps: TrackedPlayer[], isLive: boolean) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        const live = await refresh(tps);
        scheduleNext(tps, live > 0);
      }, isLive ? POLL_LIVE : POLL_DEFAULT);
    },
    [refresh]
  );

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (trackedPlayers.length === 0) return;

    setLoading(true);
    refresh(trackedPlayers).then((live) => {
      setLoading(false);
      scheduleNext(trackedPlayers, live > 0);
    });

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [idsKey]);

  return { players, loading };
}
