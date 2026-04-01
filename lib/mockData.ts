import type { Player } from "./types";

const PLAYERS: Player[] = [
  {
    id: "nba-lebron",
    name: "LeBron James",
    sport: "NBA",
    team: "Lakers",
    position: "SF",
    imageInitials: "LJ",
    avatarColor: "#552583",
    gameStatus: "live",
    opponent: "vs GSW",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "PTS", value: 28, unit: "pts", trend: "up" },
        { label: "REB", value: 8, unit: "reb", trend: "flat" },
        { label: "AST", value: 7, unit: "ast", trend: "up" },
      ],
      secondary: [
        { label: "FG%", value: "54.2", unit: "%", trend: "up" },
        { label: "3PT%", value: "38.1", unit: "%", trend: "flat" },
        { label: "MIN", value: 35, unit: "min" },
        { label: "STL", value: 1, unit: "stl" },
        { label: "+/-", value: "+12" },
      ],
    },
  },
  {
    id: "nba-curry",
    name: "Stephen Curry",
    sport: "NBA",
    team: "Warriors",
    position: "PG",
    imageInitials: "SC",
    avatarColor: "#1D428A",
    gameStatus: "live",
    opponent: "@ LAL",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "PTS", value: 34, unit: "pts", trend: "up" },
        { label: "3PM", value: 6, unit: "3pt", trend: "up" },
        { label: "AST", value: 5, unit: "ast", trend: "flat" },
      ],
      secondary: [
        { label: "FG%", value: "48.7", unit: "%", trend: "flat" },
        { label: "3PT%", value: "52.3", unit: "%", trend: "up" },
        { label: "MIN", value: 33, unit: "min" },
        { label: "TO", value: 2, unit: "to" },
        { label: "+/-", value: "-8" },
      ],
    },
  },
  {
    id: "nba-giannis",
    name: "Giannis Antetokounmpo",
    sport: "NBA",
    team: "Bucks",
    position: "PF",
    imageInitials: "GA",
    avatarColor: "#00471B",
    gameStatus: "upcoming",
    opponent: "vs BOS",
    lastUpdated: new Date(Date.now() - 3_600_000).toISOString(),
    stats: {
      primary: [
        { label: "PTS", value: 31.5, unit: "pts", trend: "up" },
        { label: "REB", value: 11.8, unit: "reb", trend: "flat" },
        { label: "AST", value: 5.7, unit: "ast", trend: "up" },
      ],
      secondary: [
        { label: "FG%", value: "61.0", unit: "%", trend: "up" },
        { label: "BLK", value: 1.2, unit: "blk" },
        { label: "MIN", value: 32, unit: "min" },
        { label: "+/-", value: "+8.4" },
      ],
    },
  },
  {
    id: "nba-jokic",
    name: "Nikola Jokic",
    sport: "NBA",
    team: "Nuggets",
    position: "C",
    imageInitials: "NJ",
    avatarColor: "#0E2240",
    gameStatus: "final",
    opponent: "vs PHX",
    lastUpdated: new Date(Date.now() - 7_200_000).toISOString(),
    stats: {
      primary: [
        { label: "PTS", value: 26, unit: "pts", trend: "flat" },
        { label: "REB", value: 14, unit: "reb", trend: "up" },
        { label: "AST", value: 9, unit: "ast", trend: "up" },
      ],
      secondary: [
        { label: "FG%", value: "57.8", unit: "%", trend: "up" },
        { label: "BLK", value: 2, unit: "blk" },
        { label: "MIN", value: 34, unit: "min" },
        { label: "+/-", value: "+18" },
      ],
    },
  },
  {
    id: "nfl-mahomes",
    name: "Patrick Mahomes",
    sport: "NFL",
    team: "Chiefs",
    position: "QB",
    imageInitials: "PM",
    avatarColor: "#E31837",
    gameStatus: "upcoming",
    opponent: "vs BUF",
    lastUpdated: new Date(Date.now() - 86_400_000).toISOString(),
    stats: {
      primary: [
        { label: "YDS", value: 312, unit: "yds", trend: "flat" },
        { label: "TD", value: 3, unit: "td", trend: "up" },
        { label: "INT", value: 0, unit: "int", trend: "flat" },
      ],
      secondary: [
        { label: "COMP%", value: "68.4", unit: "%", trend: "up" },
        { label: "RTG", value: 118.2, unit: "rtg" },
        { label: "RUSH YDS", value: 22, unit: "yds" },
        { label: "SACKS", value: 1, unit: "sk" },
      ],
    },
  },
  {
    id: "nfl-mccaffrey",
    name: "Christian McCaffrey",
    sport: "NFL",
    team: "49ers",
    position: "RB",
    imageInitials: "CM",
    avatarColor: "#AA0000",
    gameStatus: "off",
    lastUpdated: new Date(Date.now() - 172_800_000).toISOString(),
    stats: {
      primary: [
        { label: "RUSH YDS", value: 145, unit: "yds", trend: "up" },
        { label: "REC YDS", value: 62, unit: "yds", trend: "flat" },
        { label: "TD", value: 2, unit: "td", trend: "up" },
      ],
      secondary: [
        { label: "ATT", value: 22, unit: "att" },
        { label: "YPC", value: 6.6, unit: "ypc", trend: "up" },
        { label: "REC", value: 7, unit: "rec" },
        { label: "TGTS", value: 9, unit: "tgt" },
      ],
    },
  },
  {
    id: "nfl-jefferson",
    name: "Justin Jefferson",
    sport: "NFL",
    team: "Vikings",
    position: "WR",
    imageInitials: "JJ",
    avatarColor: "#4F2683",
    gameStatus: "off",
    lastUpdated: new Date(Date.now() - 172_800_000).toISOString(),
    stats: {
      primary: [
        { label: "REC YDS", value: 128, unit: "yds", trend: "up" },
        { label: "REC", value: 8, unit: "rec", trend: "flat" },
        { label: "TD", value: 1, unit: "td", trend: "flat" },
      ],
      secondary: [
        { label: "TGTS", value: 11, unit: "tgt" },
        { label: "YPR", value: 16.0, unit: "ypr", trend: "up" },
        { label: "LONG", value: 42, unit: "yds" },
        { label: "DROP", value: 0, unit: "drp" },
      ],
    },
  },
  {
    id: "mlb-ohtani",
    name: "Shohei Ohtani",
    sport: "MLB",
    team: "Dodgers",
    position: "DH/SP",
    imageInitials: "SO",
    avatarColor: "#005A9C",
    gameStatus: "live",
    opponent: "vs NYY",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "AVG", value: ".312", trend: "up" },
        { label: "HR", value: 18, unit: "hr", trend: "up" },
        { label: "RBI", value: 52, unit: "rbi", trend: "up" },
      ],
      secondary: [
        { label: "OBP", value: ".396" },
        { label: "SLG", value: ".598", trend: "up" },
        { label: "OPS", value: ".994", trend: "up" },
        { label: "K", value: 88, unit: "k" },
        { label: "BB", value: 41, unit: "bb" },
      ],
    },
  },
  {
    id: "mlb-judge",
    name: "Aaron Judge",
    sport: "MLB",
    team: "Yankees",
    position: "RF",
    imageInitials: "AJ",
    avatarColor: "#003087",
    gameStatus: "live",
    opponent: "@ LAD",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "AVG", value: ".291", trend: "flat" },
        { label: "HR", value: 22, unit: "hr", trend: "up" },
        { label: "RBI", value: 61, unit: "rbi", trend: "up" },
      ],
      secondary: [
        { label: "OBP", value: ".408" },
        { label: "SLG", value: ".612", trend: "up" },
        { label: "OPS", value: "1.020" },
        { label: "K%", value: "28.4", unit: "%" },
        { label: "BB%", value: "15.9", unit: "%" },
      ],
    },
  },
  {
    id: "nhl-mcdavid",
    name: "Connor McDavid",
    sport: "NHL",
    team: "Oilers",
    position: "C",
    imageInitials: "CM",
    avatarColor: "#041E42",
    gameStatus: "upcoming",
    opponent: "vs CGY",
    lastUpdated: new Date(Date.now() - 3_600_000).toISOString(),
    stats: {
      primary: [
        { label: "G", value: 21, unit: "g", trend: "up" },
        { label: "A", value: 48, unit: "a", trend: "up" },
        { label: "PTS", value: 69, unit: "pts", trend: "up" },
      ],
      secondary: [
        { label: "+/-", value: "+24" },
        { label: "PPG", value: 14, unit: "ppg" },
        { label: "SOG", value: 142, unit: "sog" },
        { label: "FOW%", value: "52.1", unit: "%" },
      ],
    },
  },
  {
    id: "nhl-matthews",
    name: "Auston Matthews",
    sport: "NHL",
    team: "Maple Leafs",
    position: "C",
    imageInitials: "AM",
    avatarColor: "#003E7E",
    gameStatus: "final",
    opponent: "@ MTL",
    lastUpdated: new Date(Date.now() - 5_400_000).toISOString(),
    stats: {
      primary: [
        { label: "G", value: 33, unit: "g", trend: "up" },
        { label: "A", value: 29, unit: "a", trend: "flat" },
        { label: "PTS", value: 62, unit: "pts", trend: "up" },
      ],
      secondary: [
        { label: "+/-", value: "+18" },
        { label: "PPG", value: 11, unit: "ppg" },
        { label: "SOG", value: 181, unit: "sog" },
        { label: "SH%", value: "18.2", unit: "%" },
      ],
    },
  },
  {
    id: "nba-tatum",
    name: "Jayson Tatum",
    sport: "NBA",
    team: "Celtics",
    position: "SF",
    imageInitials: "JT",
    avatarColor: "#007A33",
    gameStatus: "upcoming",
    opponent: "@ MIL",
    lastUpdated: new Date(Date.now() - 3_600_000).toISOString(),
    stats: {
      primary: [
        { label: "PTS", value: 27.4, unit: "pts", trend: "up" },
        { label: "REB", value: 8.3, unit: "reb", trend: "flat" },
        { label: "AST", value: 4.8, unit: "ast", trend: "up" },
      ],
      secondary: [
        { label: "FG%", value: "46.1", unit: "%" },
        { label: "3PT%", value: "37.5", unit: "%" },
        { label: "MIN", value: 36, unit: "min" },
        { label: "+/-", value: "+5.2" },
      ],
    },
  },
  {
    id: "nfl-burrow",
    name: "Joe Burrow",
    sport: "NFL",
    team: "Bengals",
    position: "QB",
    imageInitials: "JB",
    avatarColor: "#FB4F14",
    gameStatus: "off",
    lastUpdated: new Date(Date.now() - 86_400_000).toISOString(),
    stats: {
      primary: [
        { label: "YDS", value: 287, unit: "yds", trend: "flat" },
        { label: "TD", value: 2, unit: "td", trend: "flat" },
        { label: "INT", value: 1, unit: "int", trend: "down" },
      ],
      secondary: [
        { label: "COMP%", value: "66.8", unit: "%" },
        { label: "RTG", value: 104.7 },
        { label: "RUSH YDS", value: 8, unit: "yds" },
        { label: "SACKS", value: 2, unit: "sk" },
      ],
    },
  },
];

export function getAllPlayers(): Player[] {
  return PLAYERS;
}

export async function fetchPlayers(ids: string[]): Promise<Player[]> {
  // Simulates network latency — swap body for real API call
  await new Promise((r) => setTimeout(r, 300));
  return PLAYERS.filter((p) => ids.includes(p.id));
}

export async function searchPlayers(query: string): Promise<Player[]> {
  await new Promise((r) => setTimeout(r, 150));
  const q = query.toLowerCase();
  return PLAYERS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.team.toLowerCase().includes(q) ||
      p.sport.toLowerCase().includes(q) ||
      p.position.toLowerCase().includes(q)
  );
}
