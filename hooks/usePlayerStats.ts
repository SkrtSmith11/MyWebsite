"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { getPlayerById } from "@/lib/mockData";
import type { Player } from "@/lib/types";

const POLL_INTERVAL_DEFAULT = 60_000; // 60s
const POLL_INTERVAL_LIVE = 30_000;   // 30s when any game is live

async function fetchLivePlayer(player: Player): Promise<Player> {
  try {
    const res = await fetch(
      `/api/stats?espnId=${player.espnId}&sport=${player.sport}`
    );
    if (!res.ok) return player; // fall back to existing data

    const data = await res.json();
    if (data.error || !data.stats) return player;

    return {
      ...player,
      gameStatus: data.gameStatus ?? "off",
      opponent: data.opponent ?? undefined,
      stats: data.stats,
      isLiveStats: data.isLiveStats ?? false,
      lastUpdated: data.lastUpdated ?? new Date().toISOString(),
    };
  } catch {
    return player;
  }
}

export function usePlayerStats(playerIds: string[]) {
  const [players, setPlayers] = useState<Record<string, Player>>(() => {
    // Seed from mock data immediately so cards render without waiting
    const map: Record<string, Player> = {};
    playerIds.forEach((id) => {
      const p = getPlayerById(id);
      if (p) map[id] = p;
    });
    return map;
  });
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idsKey = playerIds.join(",");

  const refresh = useCallback(
    async (ids: string[]) => {
      if (ids.length === 0) {
        setPlayers({});
        return 0; // 0 live games
      }

      // Seed any new players from mock data while fetch runs
      setPlayers((prev) => {
        const next = { ...prev };
        ids.forEach((id) => {
          if (!next[id]) {
            const p = getPlayerById(id);
            if (p) next[id] = p;
          }
        });
        return next;
      });

      const settled = await Promise.allSettled(
        ids.map(async (id) => {
          const base = getPlayerById(id);
          if (!base) return null;
          return fetchLivePlayer(base);
        })
      );

      let liveCount = 0;
      setPlayers((prev) => {
        const next = { ...prev };
        settled.forEach((result, i) => {
          if (result.status === "fulfilled" && result.value) {
            const p = result.value;
            next[p.id] = p;
            if (p.gameStatus === "live") liveCount++;
          }
        });
        return next;
      });
      return liveCount;
    },
    []
  );

  // Schedule the next poll dynamically based on whether games are live
  const scheduleNext = useCallback(
    (ids: string[], isLive: boolean) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(async () => {
        const live = await refresh(ids);
        scheduleNext(ids, live > 0);
      }, isLive ? POLL_INTERVAL_LIVE : POLL_INTERVAL_DEFAULT);
    },
    [refresh]
  );

  useEffect(() => {
    const ids = playerIds;
    if (timerRef.current) clearTimeout(timerRef.current);

    if (ids.length === 0) {
      setPlayers({});
      return;
    }

    setLoading(true);
    refresh(ids).then((live) => {
      setLoading(false);
      scheduleNext(ids, live > 0);
    });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [idsKey]);

  return { players, loading };
}
