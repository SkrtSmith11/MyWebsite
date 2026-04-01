"use client";

import { useState, useEffect } from "react";
import { fetchPlayers } from "@/lib/mockData";
import type { Player } from "@/lib/types";

export function usePlayerStats(playerIds: string[]) {
  const [players, setPlayers] = useState<Record<string, Player>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (playerIds.length === 0) {
      setPlayers({});
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchPlayers(playerIds)
      .then((data) => {
        if (cancelled) return;
        const map: Record<string, Player> = {};
        data.forEach((p) => (map[p.id] = p));
        setPlayers(map);
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load player stats.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [playerIds.join(",")]);

  return { players, loading, error };
}
