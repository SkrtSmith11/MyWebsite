import type { Player } from "./types";

// espnId = ESPN athlete ID used to fetch real stats from ESPN API
// Stats below are fallback values shown while real data loads
const PLAYERS: Player[] = [
  {
    id: "nba-lebron",
    name: "LeBron James",
    sport: "NBA",
    team: "Lakers",
    position: "SF",
    imageInitials: "LJ",
    avatarColor: "#552583",
    espnId: "1966",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "PTS", value: 25.7, unit: "pts" },
        { label: "REB", value: 7.3, unit: "reb" },
        { label: "AST", value: 8.3, unit: "ast" },
      ],
      secondary: [
        { label: "FG%", value: "51.3", unit: "%" },
        { label: "3PT%", value: "40.0", unit: "%" },
        { label: "MIN", value: 35, unit: "min" },
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
    espnId: "3975",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "PTS", value: 26.4, unit: "pts" },
        { label: "3PM", value: 4.8, unit: "3pt" },
        { label: "AST", value: 5.1, unit: "ast" },
      ],
      secondary: [
        { label: "FG%", value: "45.0", unit: "%" },
        { label: "3PT%", value: "40.8", unit: "%" },
        { label: "MIN", value: 33, unit: "min" },
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
    espnId: "3032977",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "PTS", value: 31.5, unit: "pts" },
        { label: "REB", value: 11.8, unit: "reb" },
        { label: "AST", value: 5.7, unit: "ast" },
      ],
      secondary: [
        { label: "FG%", value: "61.0", unit: "%" },
        { label: "BLK", value: 1.2, unit: "blk" },
        { label: "MIN", value: 32, unit: "min" },
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
    espnId: "3112335",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "PTS", value: 26.4, unit: "pts" },
        { label: "REB", value: 12.4, unit: "reb" },
        { label: "AST", value: 9.0, unit: "ast" },
      ],
      secondary: [
        { label: "FG%", value: "57.8", unit: "%" },
        { label: "BLK", value: 0.9, unit: "blk" },
        { label: "MIN", value: 34, unit: "min" },
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
    espnId: "4065648",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "PTS", value: 27.4, unit: "pts" },
        { label: "REB", value: 8.3, unit: "reb" },
        { label: "AST", value: 4.8, unit: "ast" },
      ],
      secondary: [
        { label: "FG%", value: "46.1", unit: "%" },
        { label: "3PT%", value: "37.5", unit: "%" },
        { label: "MIN", value: 36, unit: "min" },
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
    espnId: "3139477",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "YDS", value: 3928, unit: "yds" },
        { label: "TD", value: 26, unit: "td" },
        { label: "INT", value: 11, unit: "int" },
      ],
      secondary: [
        { label: "COMP%", value: "67.4", unit: "%" },
        { label: "RTG", value: 101.5 },
        { label: "GP", value: 17, unit: "gp" },
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
    espnId: "3054211",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "RUSH YDS", value: 1459, unit: "yds" },
        { label: "REC YDS", value: 564, unit: "yds" },
        { label: "TD", value: 21, unit: "td" },
      ],
      secondary: [
        { label: "ATT", value: 272, unit: "att" },
        { label: "YPC", value: 5.4, unit: "ypc" },
        { label: "REC", value: 67, unit: "rec" },
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
    espnId: "4241479",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "REC YDS", value: 1533, unit: "yds" },
        { label: "REC", value: 105, unit: "rec" },
        { label: "TD", value: 9, unit: "td" },
      ],
      secondary: [
        { label: "TGTS", value: 144, unit: "tgt" },
        { label: "YPR", value: 14.6, unit: "ypr" },
        { label: "GP", value: 17, unit: "gp" },
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
    espnId: "3915511",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "YDS", value: 4918, unit: "yds" },
        { label: "TD", value: 35, unit: "td" },
        { label: "INT", value: 12, unit: "int" },
      ],
      secondary: [
        { label: "COMP%", value: "68.3", unit: "%" },
        { label: "RTG", value: 103.0 },
        { label: "GP", value: 16, unit: "gp" },
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
    espnId: "39832",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "AVG", value: ".310" },
        { label: "HR", value: 44, unit: "hr" },
        { label: "RBI", value: 96, unit: "rbi" },
      ],
      secondary: [
        { label: "OBP", value: ".390" },
        { label: "SLG", value: ".654" },
        { label: "OPS", value: "1.036" },
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
    espnId: "33912",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "AVG", value: ".322" },
        { label: "HR", value: 58, unit: "hr" },
        { label: "RBI", value: 144, unit: "rbi" },
      ],
      secondary: [
        { label: "OBP", value: ".458" },
        { label: "SLG", value: ".701" },
        { label: "OPS", value: "1.159" },
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
    espnId: "3895074",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "G", value: 32, unit: "g" },
        { label: "A", value: 76, unit: "a" },
        { label: "PTS", value: 108, unit: "pts" },
      ],
      secondary: [
        { label: "+/-", value: "+24" },
        { label: "PPG", value: 24, unit: "ppg" },
        { label: "SOG", value: 229, unit: "sog" },
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
    espnId: "4024890",
    lastUpdated: new Date().toISOString(),
    stats: {
      primary: [
        { label: "G", value: 47, unit: "g" },
        { label: "A", value: 38, unit: "a" },
        { label: "PTS", value: 85, unit: "pts" },
      ],
      secondary: [
        { label: "+/-", value: "+20" },
        { label: "PPG", value: 18, unit: "ppg" },
        { label: "SOG", value: 281, unit: "sog" },
      ],
    },
  },
];

export function getAllPlayers(): Player[] {
  return PLAYERS;
}

export function getPlayerById(id: string): Player | undefined {
  return PLAYERS.find((p) => p.id === id);
}

export async function fetchPlayers(ids: string[]): Promise<Player[]> {
  return PLAYERS.filter((p) => ids.includes(p.id));
}
