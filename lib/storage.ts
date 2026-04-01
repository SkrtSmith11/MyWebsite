import type { AppState, BetSession } from "./types";

const STORAGE_KEY = "bpt_app_state";
const CURRENT_VERSION = 1;

function defaultSession(): BetSession {
  return {
    id: crypto.randomUUID?.() ?? Math.random().toString(36).slice(2),
    createdAt: new Date().toISOString(),
    lockedAt: null,
    bets: [],
    status: "open",
  };
}

function defaultState(): AppState {
  return {
    _version: CURRENT_VERSION,
    trackedPlayers: [],
    currentSession: defaultSession(),
    pastSessions: [],
    settings: { theme: "dark" },
  };
}

export function getAppState(): AppState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as AppState;
    if (!parsed.currentSession) parsed.currentSession = defaultSession();

    // Migration: TrackedPlayer shape changed in v2 to include espnId/name/team/etc.
    // Drop any tracked players that are missing the new required fields.
    if (Array.isArray(parsed.trackedPlayers)) {
      parsed.trackedPlayers = parsed.trackedPlayers.filter(
        (tp: any) => tp.espnId && tp.name && tp.sport
      );
    }

    return parsed;
  } catch {
    return defaultState();
  }
}

export function saveAppState(state: AppState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage quota exceeded or unavailable — fail silently
  }
}

export function resetAppState(): AppState {
  const fresh = defaultState();
  saveAppState(fresh);
  return fresh;
}
