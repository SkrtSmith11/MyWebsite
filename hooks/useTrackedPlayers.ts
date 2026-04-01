"use client";

import { useState, useEffect, useCallback } from "react";
import { getAppState, saveAppState } from "@/lib/storage";
import type { TrackedPlayer, Sport } from "@/lib/types";
import { generateId } from "@/lib/utils";

export interface AddPlayerInput {
  espnId: string;
  sport: Sport;
  name: string;
  team: string;
  position: string;
  imageInitials: string;
  avatarColor: string;
}

export function useTrackedPlayers() {
  const [trackedPlayers, setTrackedPlayers] = useState<TrackedPlayer[]>([]);

  useEffect(() => {
    const state = getAppState();
    setTrackedPlayers(state.trackedPlayers);
  }, []);

  const addPlayer = useCallback((input: AddPlayerInput) => {
    setTrackedPlayers((prev) => {
      // Deduplicate by espnId
      if (prev.some((p) => p.espnId === input.espnId)) return prev;
      const next: TrackedPlayer[] = [
        ...prev,
        {
          playerId: generateId(),
          espnId: input.espnId,
          sport: input.sport,
          name: input.name,
          team: input.team,
          position: input.position,
          imageInitials: input.imageInitials,
          avatarColor: input.avatarColor,
          addedAt: new Date().toISOString(),
          isPinned: false,
        },
      ];
      const state = getAppState();
      saveAppState({ ...state, trackedPlayers: next });
      return next;
    });
  }, []);

  const removePlayer = useCallback((playerId: string) => {
    setTrackedPlayers((prev) => {
      const next = prev.filter((p) => p.playerId !== playerId);
      const state = getAppState();
      saveAppState({ ...state, trackedPlayers: next });
      return next;
    });
  }, []);

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

  const sorted = [...trackedPlayers].sort((a, b) => {
    if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
    return new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
  });

  return { trackedPlayers: sorted, addPlayer, removePlayer, togglePin };
}
