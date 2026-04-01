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
  espnId: string;
  stats: PlayerStats;
  lastUpdated: string;
  gameStatus?: "live" | "upcoming" | "final" | "off";
  opponent?: string;
  isLiveStats?: boolean;
}

// TrackedPlayer now carries all identity info so any player found via
// ESPN search can be tracked without needing a local mock entry
export interface TrackedPlayer {
  playerId: string;      // local unique ID (stable across sessions)
  espnId: string;
  sport: Sport;
  name: string;
  team: string;
  position: string;
  imageInitials: string;
  avatarColor: string;
  addedAt: string;
  isPinned: boolean;
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
  // Which stat to watch live on the player card
  trackedStatLabel?: string;   // short label matching card display, e.g. "SOG", "PTS"
  trackedStatName?: string;    // friendly name, e.g. "Shots on Goal"
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

// Stat options available per sport for bet tracking
export const TRACKABLE_STATS: Record<Sport, { label: string; friendlyName: string }[]> = {
  NHL: [
    { label: "G", friendlyName: "Goals" },
    { label: "A", friendlyName: "Assists" },
    { label: "PTS", friendlyName: "Points" },
    { label: "SOG", friendlyName: "Shots on Goal" },
    { label: "+/-", friendlyName: "Plus/Minus" },
    { label: "PIM", friendlyName: "Penalty Minutes" },
  ],
  NBA: [
    { label: "PTS", friendlyName: "Points" },
    { label: "REB", friendlyName: "Rebounds" },
    { label: "AST", friendlyName: "Assists" },
    { label: "STL", friendlyName: "Steals" },
    { label: "BLK", friendlyName: "Blocks" },
    { label: "3PT", friendlyName: "3-Pointers Made" },
    { label: "FG", friendlyName: "FG Made-Att" },
  ],
  NFL: [
    { label: "YDS", friendlyName: "Passing Yards" },
    { label: "TD", friendlyName: "Touchdowns" },
    { label: "INT", friendlyName: "Interceptions" },
    { label: "COMP", friendlyName: "Completions" },
    { label: "RUSH YDS", friendlyName: "Rushing Yards" },
    { label: "REC YDS", friendlyName: "Receiving Yards" },
    { label: "REC", friendlyName: "Receptions" },
  ],
  MLB: [
    { label: "H", friendlyName: "Hits" },
    { label: "HR", friendlyName: "Home Runs" },
    { label: "RBI", friendlyName: "RBIs" },
    { label: "R", friendlyName: "Runs" },
    { label: "BB", friendlyName: "Walks" },
    { label: "K", friendlyName: "Strikeouts (batter)" },
  ],
};
