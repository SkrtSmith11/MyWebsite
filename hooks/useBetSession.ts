"use client";

import { useState, useEffect, useCallback } from "react";
import { getAppState, saveAppState } from "@/lib/storage";
import type { BetSession, Bet } from "@/lib/types";
import { generateId } from "@/lib/utils";

export function useBetSession() {
  const [session, setSession] = useState<BetSession | null>(null);

  useEffect(() => {
    const state = getAppState();
    setSession(state.currentSession);
  }, []);

  const persist = useCallback((updated: BetSession) => {
    const state = getAppState();
    saveAppState({ ...state, currentSession: updated });
    setSession(updated);
  }, []);

  const addBet = useCallback(
    (bet: Omit<Bet, "id" | "createdAt">) => {
      setSession((prev) => {
        if (!prev || prev.status === "locked") return prev;
        const newBet: Bet = {
          ...bet,
          id: generateId(),
          createdAt: new Date().toISOString(),
        };
        const updated: BetSession = {
          ...prev,
          bets: [...prev.bets, newBet],
        };
        const state = getAppState();
        saveAppState({ ...state, currentSession: updated });
        return updated;
      });
    },
    []
  );

  const removeBet = useCallback((betId: string) => {
    setSession((prev) => {
      if (!prev || prev.status === "locked") return prev;
      const updated: BetSession = {
        ...prev,
        bets: prev.bets.filter((b) => b.id !== betId),
      };
      const state = getAppState();
      saveAppState({ ...state, currentSession: updated });
      return updated;
    });
  }, []);

  const lockSession = useCallback(() => {
    setSession((prev) => {
      if (!prev || prev.status === "locked") return prev;
      const locked: BetSession = {
        ...prev,
        lockedAt: new Date().toISOString(),
        status: "locked",
      };
      const state = getAppState();
      saveAppState({ ...state, currentSession: locked });
      return locked;
    });
  }, []);

  const startNewSession = useCallback(() => {
    setSession((prev) => {
      const state = getAppState();
      const pastSessions = prev
        ? [...state.pastSessions, prev]
        : state.pastSessions;
      const newSession: BetSession = {
        id: generateId(),
        createdAt: new Date().toISOString(),
        lockedAt: null,
        bets: [],
        status: "open",
      };
      saveAppState({ ...state, currentSession: newSession, pastSessions });
      return newSession;
    });
  }, []);

  const isLocked = session?.status === "locked";
  const totalAmount = session?.bets.reduce((sum, b) => sum + b.amount, 0) ?? 0;

  return {
    session,
    isLocked,
    totalAmount,
    addBet,
    removeBet,
    lockSession,
    startNewSession,
  };
}
