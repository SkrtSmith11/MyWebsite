import type { Player } from "./types";

// espnId = ESPN athlete ID used to fetch real stats from the ESPN API.
// Stats below are fallback values shown while real data loads.
const PLAYERS: Player[] = [

  // ─── NHL ───────────────────────────────────────────────────────────────────
  {
    id: "nhl-mcdavid", name: "Connor McDavid", sport: "NHL",
    team: "Oilers", position: "C", imageInitials: "CM", avatarColor: "#041E42", espnId: "3895074",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 32, unit: "g" }, { label: "A", value: 76, unit: "a" }, { label: "PTS", value: 108, unit: "pts" }], secondary: [{ label: "+/-", value: "+24" }, { label: "SOG", value: 229, unit: "sog" }] },
  },
  {
    id: "nhl-matthews", name: "Auston Matthews", sport: "NHL",
    team: "Maple Leafs", position: "C", imageInitials: "AM", avatarColor: "#003E7E", espnId: "4024890",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 47, unit: "g" }, { label: "A", value: 38, unit: "a" }, { label: "PTS", value: 85, unit: "pts" }], secondary: [{ label: "+/-", value: "+20" }, { label: "SOG", value: 281, unit: "sog" }] },
  },
  {
    id: "nhl-caufield", name: "Cole Caufield", sport: "NHL",
    team: "Canadiens", position: "RW", imageInitials: "CC", avatarColor: "#AF1E2D", espnId: "4233628",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 28, unit: "g" }, { label: "A", value: 30, unit: "a" }, { label: "PTS", value: 58, unit: "pts" }], secondary: [{ label: "+/-", value: "+12" }, { label: "SOG", value: 198, unit: "sog" }] },
  },
  {
    id: "nhl-mackinnon", name: "Nathan MacKinnon", sport: "NHL",
    team: "Avalanche", position: "C", imageInitials: "NM", avatarColor: "#6F263D", espnId: "3041954",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 35, unit: "g" }, { label: "A", value: 69, unit: "a" }, { label: "PTS", value: 104, unit: "pts" }], secondary: [{ label: "+/-", value: "+28" }, { label: "SOG", value: 245, unit: "sog" }] },
  },
  {
    id: "nhl-draisaitl", name: "Leon Draisaitl", sport: "NHL",
    team: "Oilers", position: "C", imageInitials: "LD", avatarColor: "#FF4C00", espnId: "3042079",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 42, unit: "g" }, { label: "A", value: 55, unit: "a" }, { label: "PTS", value: 97, unit: "pts" }], secondary: [{ label: "+/-", value: "+18" }, { label: "SOG", value: 268, unit: "sog" }] },
  },
  {
    id: "nhl-crosby", name: "Sidney Crosby", sport: "NHL",
    team: "Penguins", position: "C", imageInitials: "SC", avatarColor: "#FCB514", espnId: "3114679",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 30, unit: "g" }, { label: "A", value: 52, unit: "a" }, { label: "PTS", value: 82, unit: "pts" }], secondary: [{ label: "+/-", value: "+14" }, { label: "SOG", value: 210, unit: "sog" }] },
  },
  {
    id: "nhl-ovechkin", name: "Alex Ovechkin", sport: "NHL",
    team: "Capitals", position: "LW", imageInitials: "AO", avatarColor: "#C8102E", espnId: "2562649",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 38, unit: "g" }, { label: "A", value: 28, unit: "a" }, { label: "PTS", value: 66, unit: "pts" }], secondary: [{ label: "+/-", value: "+8" }, { label: "SOG", value: 302, unit: "sog" }] },
  },
  {
    id: "nhl-makar", name: "Cale Makar", sport: "NHL",
    team: "Avalanche", position: "D", imageInitials: "CM", avatarColor: "#236192", espnId: "4233558",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 20, unit: "g" }, { label: "A", value: 52, unit: "a" }, { label: "PTS", value: 72, unit: "pts" }], secondary: [{ label: "+/-", value: "+32" }, { label: "SOG", value: 188, unit: "sog" }] },
  },
  {
    id: "nhl-tkachuk-m", name: "Matthew Tkachuk", sport: "NHL",
    team: "Panthers", position: "LW", imageInitials: "MT", avatarColor: "#C8102E", espnId: "4024968",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 26, unit: "g" }, { label: "A", value: 51, unit: "a" }, { label: "PTS", value: 77, unit: "pts" }], secondary: [{ label: "+/-", value: "+15" }, { label: "SOG", value: 172, unit: "sog" }] },
  },
  {
    id: "nhl-rantanen", name: "Mikko Rantanen", sport: "NHL",
    team: "Avalanche", position: "RW", imageInitials: "MR", avatarColor: "#6F263D", espnId: "3149673",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 33, unit: "g" }, { label: "A", value: 48, unit: "a" }, { label: "PTS", value: 81, unit: "pts" }], secondary: [{ label: "+/-", value: "+22" }, { label: "SOG", value: 220, unit: "sog" }] },
  },
  {
    id: "nhl-point", name: "Brayden Point", sport: "NHL",
    team: "Lightning", position: "C", imageInitials: "BP", avatarColor: "#002868", espnId: "3149715",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 36, unit: "g" }, { label: "A", value: 42, unit: "a" }, { label: "PTS", value: 78, unit: "pts" }], secondary: [{ label: "+/-", value: "+16" }, { label: "SOG", value: 215, unit: "sog" }] },
  },
  {
    id: "nhl-pastrnak", name: "David Pastrnak", sport: "NHL",
    team: "Bruins", position: "RW", imageInitials: "DP", avatarColor: "#FFB81C", espnId: "3899835",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 44, unit: "g" }, { label: "A", value: 40, unit: "a" }, { label: "PTS", value: 84, unit: "pts" }], secondary: [{ label: "+/-", value: "+18" }, { label: "SOG", value: 285, unit: "sog" }] },
  },
  {
    id: "nhl-hughes-q", name: "Quinn Hughes", sport: "NHL",
    team: "Canucks", position: "D", imageInitials: "QH", avatarColor: "#00843D", espnId: "4233569",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 14, unit: "g" }, { label: "A", value: 58, unit: "a" }, { label: "PTS", value: 72, unit: "pts" }], secondary: [{ label: "+/-", value: "+20" }, { label: "SOG", value: 142, unit: "sog" }] },
  },
  {
    id: "nhl-pettersson", name: "Elias Pettersson", sport: "NHL",
    team: "Canucks", position: "C", imageInitials: "EP", avatarColor: "#00843D", espnId: "3149660",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 26, unit: "g" }, { label: "A", value: 50, unit: "a" }, { label: "PTS", value: 76, unit: "pts" }], secondary: [{ label: "+/-", value: "+14" }, { label: "SOG", value: 195, unit: "sog" }] },
  },
  {
    id: "nhl-tkachuk-b", name: "Brady Tkachuk", sport: "NHL",
    team: "Senators", position: "LW", imageInitials: "BT", avatarColor: "#C8102E", espnId: "4233570",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "G", value: 28, unit: "g" }, { label: "A", value: 38, unit: "a" }, { label: "PTS", value: 66, unit: "pts" }], secondary: [{ label: "+/-", value: "+5" }, { label: "SOG", value: 210, unit: "sog" }] },
  },

  // ─── NBA ───────────────────────────────────────────────────────────────────
  {
    id: "nba-lebron", name: "LeBron James", sport: "NBA",
    team: "Lakers", position: "SF", imageInitials: "LJ", avatarColor: "#552583", espnId: "1966",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "PTS", value: 25.7, unit: "pts" }, { label: "REB", value: 7.3, unit: "reb" }, { label: "AST", value: 8.3, unit: "ast" }], secondary: [{ label: "FG%", value: "51.3", unit: "%" }, { label: "3PT%", value: "40.0", unit: "%" }] },
  },
  {
    id: "nba-curry", name: "Stephen Curry", sport: "NBA",
    team: "Warriors", position: "PG", imageInitials: "SC", avatarColor: "#1D428A", espnId: "3975",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "PTS", value: 26.4, unit: "pts" }, { label: "3PM", value: 4.8, unit: "3pt" }, { label: "AST", value: 5.1, unit: "ast" }], secondary: [{ label: "FG%", value: "45.0", unit: "%" }, { label: "3PT%", value: "40.8", unit: "%" }] },
  },
  {
    id: "nba-giannis", name: "Giannis Antetokounmpo", sport: "NBA",
    team: "Bucks", position: "PF", imageInitials: "GA", avatarColor: "#00471B", espnId: "3032977",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "PTS", value: 31.5, unit: "pts" }, { label: "REB", value: 11.8, unit: "reb" }, { label: "AST", value: 5.7, unit: "ast" }], secondary: [{ label: "FG%", value: "61.0", unit: "%" }, { label: "BLK", value: 1.2, unit: "blk" }] },
  },
  {
    id: "nba-jokic", name: "Nikola Jokic", sport: "NBA",
    team: "Nuggets", position: "C", imageInitials: "NJ", avatarColor: "#0E2240", espnId: "3112335",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "PTS", value: 26.4, unit: "pts" }, { label: "REB", value: 12.4, unit: "reb" }, { label: "AST", value: 9.0, unit: "ast" }], secondary: [{ label: "FG%", value: "57.8", unit: "%" }] },
  },
  {
    id: "nba-tatum", name: "Jayson Tatum", sport: "NBA",
    team: "Celtics", position: "SF", imageInitials: "JT", avatarColor: "#007A33", espnId: "4065648",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "PTS", value: 27.4, unit: "pts" }, { label: "REB", value: 8.3, unit: "reb" }, { label: "AST", value: 4.8, unit: "ast" }], secondary: [{ label: "FG%", value: "46.1", unit: "%" }] },
  },
  {
    id: "nba-luka", name: "Luka Doncic", sport: "NBA",
    team: "Mavericks", position: "PG", imageInitials: "LD", avatarColor: "#00538C", espnId: "3945274",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "PTS", value: 33.9, unit: "pts" }, { label: "REB", value: 9.2, unit: "reb" }, { label: "AST", value: 9.8, unit: "ast" }], secondary: [{ label: "FG%", value: "47.4", unit: "%" }] },
  },
  {
    id: "nba-sga", name: "Shai Gilgeous-Alexander", sport: "NBA",
    team: "Thunder", position: "PG", imageInitials: "SG", avatarColor: "#007AC1", espnId: "4278073",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "PTS", value: 30.1, unit: "pts" }, { label: "REB", value: 5.5, unit: "reb" }, { label: "AST", value: 6.2, unit: "ast" }], secondary: [{ label: "FG%", value: "53.5", unit: "%" }] },
  },
  {
    id: "nba-embid", name: "Joel Embiid", sport: "NBA",
    team: "76ers", position: "C", imageInitials: "JE", avatarColor: "#006BB6", espnId: "3059318",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "PTS", value: 34.7, unit: "pts" }, { label: "REB", value: 11.0, unit: "reb" }, { label: "AST", value: 5.6, unit: "ast" }], secondary: [{ label: "FG%", value: "52.8", unit: "%" }] },
  },

  // ─── NFL ───────────────────────────────────────────────────────────────────
  {
    id: "nfl-mahomes", name: "Patrick Mahomes", sport: "NFL",
    team: "Chiefs", position: "QB", imageInitials: "PM", avatarColor: "#E31837", espnId: "3139477",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "YDS", value: 3928, unit: "yds" }, { label: "TD", value: 26, unit: "td" }, { label: "INT", value: 11, unit: "int" }], secondary: [{ label: "COMP%", value: "67.4", unit: "%" }, { label: "RTG", value: 101.5 }] },
  },
  {
    id: "nfl-allen", name: "Josh Allen", sport: "NFL",
    team: "Bills", position: "QB", imageInitials: "JA", avatarColor: "#00338D", espnId: "3918298",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "YDS", value: 4306, unit: "yds" }, { label: "TD", value: 29, unit: "td" }, { label: "INT", value: 18, unit: "int" }], secondary: [{ label: "COMP%", value: "63.6", unit: "%" }, { label: "RTG", value: 92.2 }] },
  },
  {
    id: "nfl-lamar", name: "Lamar Jackson", sport: "NFL",
    team: "Ravens", position: "QB", imageInitials: "LJ", avatarColor: "#241773", espnId: "3916387",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "YDS", value: 3678, unit: "yds" }, { label: "TD", value: 24, unit: "td" }, { label: "INT", value: 7, unit: "int" }], secondary: [{ label: "COMP%", value: "67.2", unit: "%" }, { label: "RUSH", value: 821, unit: "yds" }] },
  },
  {
    id: "nfl-burrow", name: "Joe Burrow", sport: "NFL",
    team: "Bengals", position: "QB", imageInitials: "JB", avatarColor: "#FB4F14", espnId: "3915511",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "YDS", value: 4918, unit: "yds" }, { label: "TD", value: 35, unit: "td" }, { label: "INT", value: 12, unit: "int" }], secondary: [{ label: "COMP%", value: "68.3", unit: "%" }] },
  },
  {
    id: "nfl-mccaffrey", name: "Christian McCaffrey", sport: "NFL",
    team: "49ers", position: "RB", imageInitials: "CM", avatarColor: "#AA0000", espnId: "3054211",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "RUSH YDS", value: 1459, unit: "yds" }, { label: "REC YDS", value: 564, unit: "yds" }, { label: "TD", value: 21, unit: "td" }], secondary: [{ label: "YPC", value: 5.4, unit: "ypc" }] },
  },
  {
    id: "nfl-henry", name: "Derrick Henry", sport: "NFL",
    team: "Ravens", position: "RB", imageInitials: "DH", avatarColor: "#241773", espnId: "3054063",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "RUSH YDS", value: 1921, unit: "yds" }, { label: "TD", value: 16, unit: "td" }, { label: "ATT", value: 386, unit: "att" }], secondary: [{ label: "YPC", value: 4.9, unit: "ypc" }] },
  },
  {
    id: "nfl-jefferson", name: "Justin Jefferson", sport: "NFL",
    team: "Vikings", position: "WR", imageInitials: "JJ", avatarColor: "#4F2683", espnId: "4241479",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "REC YDS", value: 1533, unit: "yds" }, { label: "REC", value: 105, unit: "rec" }, { label: "TD", value: 9, unit: "td" }], secondary: [{ label: "TGTS", value: 144, unit: "tgt" }] },
  },
  {
    id: "nfl-hill", name: "Tyreek Hill", sport: "NFL",
    team: "Dolphins", position: "WR", imageInitials: "TH", avatarColor: "#008E97", espnId: "3054028",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "REC YDS", value: 1799, unit: "yds" }, { label: "REC", value: 119, unit: "rec" }, { label: "TD", value: 13, unit: "td" }], secondary: [{ label: "TGTS", value: 171, unit: "tgt" }] },
  },
  {
    id: "nfl-kelce", name: "Travis Kelce", sport: "NFL",
    team: "Chiefs", position: "TE", imageInitials: "TK", avatarColor: "#E31837", espnId: "2576980",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "REC YDS", value: 984, unit: "yds" }, { label: "REC", value: 93, unit: "rec" }, { label: "TD", value: 5, unit: "td" }], secondary: [{ label: "TGTS", value: 121, unit: "tgt" }] },
  },

  // ─── MLB ───────────────────────────────────────────────────────────────────
  {
    id: "mlb-ohtani", name: "Shohei Ohtani", sport: "MLB",
    team: "Dodgers", position: "DH", imageInitials: "SO", avatarColor: "#005A9C", espnId: "39832",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "AVG", value: ".310" }, { label: "HR", value: 44, unit: "hr" }, { label: "RBI", value: 96, unit: "rbi" }], secondary: [{ label: "OPS", value: "1.036" }] },
  },
  {
    id: "mlb-judge", name: "Aaron Judge", sport: "MLB",
    team: "Yankees", position: "RF", imageInitials: "AJ", avatarColor: "#003087", espnId: "33912",
    lastUpdated: new Date().toISOString(),
    stats: { primary: [{ label: "AVG", value: ".322" }, { label: "HR", value: 58, unit: "hr" }, { label: "RBI", value: 144, unit: "rbi" }], secondary: [{ label: "OPS", value: "1.159" }] },
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
