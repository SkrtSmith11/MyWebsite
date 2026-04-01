import { NextResponse } from "next/server";
import type { Sport } from "@/lib/types";

// ESPN sport/league mapping used to interpret search result UIDs
const LEAGUE_TO_SPORT: Record<string, Sport> = {
  nba: "NBA",
  nfl: "NFL",
  mlb: "MLB",
  nhl: "NHL",
};

const SPORT_TO_DEFAULT: Record<string, Sport> = {
  basketball: "NBA",
  football: "NFL",
  baseball: "MLB",
  hockey: "NHL",
};

// Derive initials from a player name
function initials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Stable color from name hash
const AVATAR_COLORS = [
  "#1D428A", "#552583", "#007A33", "#CE1141", "#006BB6",
  "#98002E", "#00471B", "#0E2240", "#C8102E", "#041E42",
  "#E31837", "#AA0000", "#4F2683", "#FB4F14", "#005A9C",
  "#003087", "#041E42", "#003E7E",
];
function colorFromName(name: string): string {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0x7fffffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const url = `https://site.api.espn.com/apis/common/v3/search?query=${encodeURIComponent(query)}&limit=20&type=athlete`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return NextResponse.json([]);

    const data = await res.json();

    const athletes: {
      espnId: string;
      name: string;
      team: string;
      position: string;
      sport: Sport;
      imageInitials: string;
      avatarColor: string;
    }[] = [];

    // ESPN search returns { results: [{ type, contents: [...] }] }
    for (const result of data?.results ?? []) {
      if (result.type !== "athlete") continue;
      for (const item of result.contents ?? []) {
        // uid format: "s:{sportId}~l:{leagueId}~a:{athleteId}"
        const uidMatch = (item.uid ?? "").match(/~a:(\d+)/);
        const espnId = uidMatch?.[1] ?? item.id;
        if (!espnId) continue;

        // Sport from uid league segment
        const leagueMatch = (item.uid ?? "").match(/~l:(\w+)~/);
        const leagueKey = leagueMatch?.[1];
        const sportFromLeague = leagueKey ? LEAGUE_TO_SPORT[leagueKey] : undefined;
        const sportFromField = item.sport ? SPORT_TO_DEFAULT[item.sport] : undefined;
        const sport: Sport | undefined = sportFromLeague ?? sportFromField;

        // Only include supported sports
        if (!sport) continue;

        // "description" is usually "TEAM · POS"
        const desc: string = item.description ?? "";
        const parts = desc.split("·").map((s: string) => s.trim());
        const team = parts[0] ?? "";
        const position = parts[1] ?? "";

        const name: string = item.displayName ?? item.shortName ?? "";
        if (!name) continue;

        athletes.push({
          espnId,
          name,
          team,
          position,
          sport,
          imageInitials: initials(name),
          avatarColor: colorFromName(name),
        });
      }
    }

    return NextResponse.json(athletes.slice(0, 12));
  } catch {
    return NextResponse.json([]);
  }
}
