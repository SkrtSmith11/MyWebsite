"use client";

import { useState, useEffect, useCallback } from "react";
import { getAppState, saveAppState } from "@/lib/storage";
import type { TrackedPlayer } from "@/lib/types";
import { generateId } from "@/lib/utils";

export function useTrackedPlayers() {
  const [trackedPlayers, setTrackedPlayers] = useState<TrackedPlayer[]>([]);

  useEffect(() => {
    const state = getAppState();
    setTrackedPlayers(state.trackedPlayers);
  }, []);

  const persist = useCallback((updated: TrackedPlayer[]) => {
    const state = getAppState();
    saveAppState({ ...state, trackedPlayers: updated });
    setTrackedPlayers(updated);
  }, []);

  const addPlayer = useCallback(
    (playerId: string) => {
      setTrackedPlayers((prev) => {
        if (prev.some((p) => p.playerId === playerId)) return prev;
        const next: TrackedPlayer[] = [
          ...prev,
          {
            playerId,
            addedAt: new Date().toISOString(),
            isPinned: false,
          },
        ];
        const state = getAppState();
        saveAppState({ ...state, trackedPlayers: next });
        return next;
      });
    },
    []
  );

  const removePlayer = useCallback(
    (playerId: string) => {
      setTrackedPlayers((prev) => {
        const next = prev.filter((p) => p.playerId !== playerId);
        const state = getAppState();
        saveAppState({ ...state, trackedPlayers: next });
        return next;
      });
    },
    []
  );

  const togglePin = useCallback((playerId: string) => {
    setTrackedPlayers((prev) => {
      const next = prev.map((p) =>
        p.playerId === playerId ? { ...p, isPinned: !p.isPinned } : p
      );
      const state = getAppState();
      saveAppState({ ...state, trackedPlayers: next });
      return next;
    });
  }, []);

  const updateNote = useCallback((playerId: string, notes: string) => {
    setTrackedPlayers((prev) => {
      const next = prev.map((p) =>
        p.playerId === playerId ? { ...p, notes } : p
      );
      const state = getAppState();
      saveAppState({ ...state, trackedPlayers: next });
      return next;
    });
  }, []);

  // Sort: pinned first, then by addedAt descending
  const sorted = [...trackedPlayers].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
  });

  return { trackedPlayers: sorted, addPlayer, removePlayer, togglePin, updateNote };
}
