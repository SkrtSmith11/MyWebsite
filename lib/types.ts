export type Sport = "NBA" | "NFL" | "MLB" | "NHL";

export interface StatLine {
  label: string;
  value: number | string;
  unit?: string;
  trend?: "up" | "down" | "flat";
}

export interface PlayerStats {
  primary: StatLine[];
  secondary: StatLine[];
}

export interface Player {
  id: string;
  name: string;
  sport: Sport;
  team: string;
  position: string;
  imageInitials: string;
  avatarColor: string;
  stats: PlayerStats;
  lastUpdated: string;
  gameStatus?: "live" | "upcoming" | "final" | "off";
  opponent?: string;
}

export interface TrackedPlayer {
  playerId: string;
  addedAt: string;
  isPinned: boolean;
  notes?: string;
}

export type BetType =
  | "Player Prop"
  | "Over/Under"
  | "Moneyline"
  | "Spread"
  | "Parlay"
  | "Other";

export interface Bet {
  id: string;
  playerId: string;
  playerName: string;
  type: BetType;
  description: string;
  amount: number;
  odds: string;
  createdAt: string;
}

export interface BetSession {
  id: string;
  createdAt: string;
  lockedAt: string | null;
  bets: Bet[];
  status: "open" | "locked";
}

export interface AppSettings {
  theme: "light" | "dark";
}

export interface AppState {
  _version: number;
  trackedPlayers: TrackedPlayer[];
  currentSession: BetSession | null;
  pastSessions: BetSession[];
  settings: AppSettings;
}
