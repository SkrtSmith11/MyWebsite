import type { Sport, StatLine } from "./types";

export const ESPN_BASE = "https://site.api.espn.com/apis/site/v2/sports";

export const SPORT_CONFIG: Record<Sport, { sport: string; league: string }> = {
  NBA: { sport: "basketball", league: "nba" },
  NFL: { sport: "football", league: "nfl" },
  MLB: { sport: "baseball", league: "mlb" },
  NHL: { sport: "hockey", league: "nhl" },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Search all categories in a stats response for a named stat */
export function findStat(categories: any[], ...names: string[]): string | null {
  for (const name of names) {
    for (const cat of categories) {
      const s = cat.stats?.find(
        (x: any) => x.name === name || x.abbreviation === name
      );
      if (s && s.displayValue != null) return s.displayValue;
    }
  }
  return null;
}

// ---------------------------------------------------------------------------
// Season stats parsers — one per sport
// ---------------------------------------------------------------------------

export function parseSeasonStats(
  categories: any[],
  sport: Sport
): { primary: StatLine[]; secondary: StatLine[] } | null {
  if (!categories?.length) return null;
  const f = (...n: string[]) => findStat(categories, ...n);

  if (sport === "NBA") {
    const pts = f("avgPoints");
    if (!pts) return null;
    return {
      primary: [
        { label: "PTS", value: pts, unit: "pts" },
        { label: "REB", value: f("avgRebounds") ?? "—", unit: "reb" },
        { label: "AST", value: f("avgAssists") ?? "—", unit: "ast" },
      ],
      secondary: [
        { label: "FG%", value: f("fieldGoalPct", "avgFieldGoalPct") ?? "—", unit: "%" },
        { label: "3PT%", value: f("threePointFieldGoalPct", "avg3PointFieldGoalPct") ?? "—", unit: "%" },
        { label: "MIN", value: f("avgMinutes") ?? "—", unit: "min" },
        { label: "STL", value: f("avgSteals") ?? "—", unit: "stl" },
        { label: "BLK", value: f("avgBlocks") ?? "—", unit: "blk" },
      ],
    };
  }

  if (sport === "NFL") {
    // Try QB stats first
    const passYds = f("passingYards", "avgPassingYards");
    if (passYds) {
      return {
        primary: [
          { label: "YDS", value: passYds, unit: "yds" },
          { label: "TD", value: f("passingTouchdowns") ?? "—", unit: "td" },
          { label: "INT", value: f("interceptions") ?? "—", unit: "int" },
        ],
        secondary: [
          { label: "COMP%", value: f("completionPct", "completionPercentage") ?? "—", unit: "%" },
          { label: "RTG", value: f("passerRating", "QBRating") ?? "—" },
          { label: "ATT", value: f("passingAttempts") ?? "—", unit: "att" },
          { label: "RUSH", value: f("rushingYards") ?? "—", unit: "yds" },
        ],
      };
    }
    // RB stats
    const rushYds = f("rushingYards", "avgRushingYards");
    if (rushYds) {
      return {
        primary: [
          { label: "RUSH YDS", value: rushYds, unit: "yds" },
          { label: "REC YDS", value: f("receivingYards", "avgReceivingYards") ?? "—", unit: "yds" },
          { label: "TD", value: f("totalTouchdowns", "rushingTouchdowns") ?? "—", unit: "td" },
        ],
        secondary: [
          { label: "ATT", value: f("rushingAttempts") ?? "—", unit: "att" },
          { label: "YPC", value: f("avgRushingYards", "yardsPerRushAttempt") ?? "—", unit: "ypc" },
          { label: "REC", value: f("receptions") ?? "—", unit: "rec" },
        ],
      };
    }
    // WR/TE stats
    const recYds = f("receivingYards", "avgReceivingYards");
    if (recYds) {
      return {
        primary: [
          { label: "REC YDS", value: recYds, unit: "yds" },
          { label: "REC", value: f("receptions") ?? "—", unit: "rec" },
          { label: "TD", value: f("receivingTouchdowns") ?? "—", unit: "td" },
        ],
        secondary: [
          { label: "TGTS", value: f("receivingTargets", "targets") ?? "—", unit: "tgt" },
          { label: "YPR", value: f("avgYardsPerReception", "yardsPerReception") ?? "—", unit: "ypr" },
        ],
      };
    }
    return null;
  }

  if (sport === "MLB") {
    // Hitter
    const avg = f("avg", "battingAverage");
    if (avg) {
      return {
        primary: [
          { label: "AVG", value: avg },
          { label: "HR", value: f("homeRuns") ?? "—", unit: "hr" },
          { label: "RBI", value: f("RBI", "rbi") ?? "—", unit: "rbi" },
        ],
        secondary: [
          { label: "OBP", value: f("OBP", "onBasePct") ?? "—" },
          { label: "SLG", value: f("SLG", "sluggingPct") ?? "—" },
          { label: "OPS", value: f("OPS", "ops") ?? "—" },
          { label: "H", value: f("hits") ?? "—", unit: "h" },
          { label: "R", value: f("runs") ?? "—", unit: "r" },
        ],
      };
    }
    // Pitcher
    const era = f("ERA", "era");
    if (era) {
      return {
        primary: [
          { label: "ERA", value: era },
          { label: "W", value: f("wins") ?? "—", unit: "w" },
          { label: "K", value: f("strikeouts") ?? "—", unit: "k" },
        ],
        secondary: [
          { label: "WHIP", value: f("WHIP", "whip") ?? "—" },
          { label: "IP", value: f("inningsPitched") ?? "—", unit: "ip" },
          { label: "BB", value: f("walks", "basesOnBalls") ?? "—", unit: "bb" },
        ],
      };
    }
    return null;
  }

  if (sport === "NHL") {
    const pts = f("points");
    if (!pts) return null;
    return {
      primary: [
        { label: "G", value: f("goals") ?? "—", unit: "g" },
        { label: "A", value: f("assists") ?? "—", unit: "a" },
        { label: "PTS", value: pts, unit: "pts" },
      ],
      secondary: [
        { label: "+/-", value: f("plusMinus") ?? "—" },
        { label: "PPG", value: f("powerPlayGoals") ?? "—", unit: "ppg" },
        { label: "SOG", value: f("shots") ?? "—", unit: "sog" },
        { label: "PIM", value: f("penaltyMinutes") ?? "—", unit: "pim" },
      ],
    };
  }

  return null;
}

// ---------------------------------------------------------------------------
// Live boxscore parser
// ---------------------------------------------------------------------------

export function parseLiveStats(
  summary: any,
  espnId: string,
  sport: Sport
): { primary: StatLine[]; secondary: StatLine[] } | null {
  const playerGroups: any[] = summary?.boxscore?.players ?? [];

  for (const group of playerGroups) {
    for (const statGroup of group.statistics ?? []) {
      const labels: string[] = statGroup.names ?? statGroup.labels ?? [];
      const athleteEntry = statGroup.athletes?.find(
        (a: any) => String(a.athlete?.id) === String(espnId)
      );
      if (!athleteEntry || !athleteEntry.stats?.length) continue;

      const vals = athleteEntry.stats as string[];
      const get = (...cols: string[]) => {
        for (const col of cols) {
          const i = labels.indexOf(col);
          if (i !== -1 && vals[i] && vals[i] !== "--") return vals[i];
        }
        return "—";
      };

      if (sport === "NBA") {
        return {
          primary: [
            { label: "PTS", value: get("PTS"), unit: "pts" },
            { label: "REB", value: get("REB"), unit: "reb" },
            { label: "AST", value: get("AST"), unit: "ast" },
          ],
          secondary: [
            { label: "FG", value: get("FG"), unit: "" },
            { label: "3PT", value: get("3PT"), unit: "" },
            { label: "MIN", value: get("MIN"), unit: "min" },
            { label: "+/-", value: get("+/-") },
            { label: "STL", value: get("STL"), unit: "stl" },
            { label: "BLK", value: get("BLK"), unit: "blk" },
          ],
        };
      }
      if (sport === "NFL") {
        return {
          primary: [
            { label: "YDS", value: get("YDS", "PYDS"), unit: "yds" },
            { label: "TD", value: get("TD"), unit: "td" },
            { label: "INT", value: get("INT"), unit: "int" },
          ],
          secondary: [
            { label: "COMP", value: get("CMP", "COMP"), unit: "" },
            { label: "ATT", value: get("ATT"), unit: "att" },
            { label: "RTG", value: get("RTG"), unit: "" },
          ],
        };
      }
      if (sport === "MLB") {
        return {
          primary: [
            { label: "AB", value: get("AB"), unit: "ab" },
            { label: "H", value: get("H"), unit: "h" },
            { label: "HR", value: get("HR"), unit: "hr" },
          ],
          secondary: [
            { label: "RBI", value: get("RBI"), unit: "rbi" },
            { label: "R", value: get("R"), unit: "r" },
            { label: "BB", value: get("BB"), unit: "bb" },
            { label: "K", value: get("K", "SO"), unit: "k" },
          ],
        };
      }
      if (sport === "NHL") {
        return {
          primary: [
            { label: "G", value: get("G"), unit: "g" },
            { label: "A", value: get("A"), unit: "a" },
            { label: "PTS", value: get("PTS"), unit: "pts" },
          ],
          secondary: [
            { label: "+/-", value: get("+/-") },
            { label: "SOG", value: get("SOG", "S"), unit: "sog" },
            { label: "PIM", value: get("PIM"), unit: "pim" },
          ],
        };
      }
    }
  }

  return null;
}
