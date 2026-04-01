import { NextResponse } from "next/server";
import { ESPN_BASE, SPORT_CONFIG } from "@/lib/espn";
import type { Sport } from "@/lib/types";

export interface TodayGame {
  gameId: string;
  sport: Sport;
  status: "pre" | "in" | "post";
  statusDetail: string;
  homeTeam: { id: string; name: string; abbr: string; color: string };
  awayTeam: { id: string; name: string; abbr: string; color: string };
}

export interface TodayResponse {
  NBA: TodayGame[];
  NFL: TodayGame[];
  MLB: TodayGame[];
  NHL: TodayGame[];
}

async function fetchGamesForSport(sport: Sport): Promise<TodayGame[]> {
  const { sport: s, league: l } = SPORT_CONFIG[sport];
  try {
    const res = await fetch(`${ESPN_BASE}/${s}/${l}/scoreboard`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();

    return (data?.events ?? []).map((event: any): TodayGame => {
      const comp = event.competitions?.[0];
      const competitors: any[] = comp?.competitors ?? [];
      const home = competitors.find((c: any) => c.homeAway === "home") ?? competitors[0];
      const away = competitors.find((c: any) => c.homeAway === "away") ?? competitors[1];
      const state: string = comp?.status?.type?.state ?? "pre";

      return {
        gameId: event.id,
        sport,
        status: (state === "in" ? "in" : state === "post" ? "post" : "pre") as TodayGame["status"],
        statusDetail: comp?.status?.type?.shortDetail ?? "",
        homeTeam: {
          id: home?.team?.id ?? "",
          name: home?.team?.displayName ?? home?.team?.name ?? "",
          abbr: home?.team?.abbreviation ?? "",
          color: home?.team?.color ? `#${home.team.color}` : "#334155",
        },
        awayTeam: {
          id: away?.team?.id ?? "",
          name: away?.team?.displayName ?? away?.team?.name ?? "",
          abbr: away?.team?.abbreviation ?? "",
          color: away?.team?.color ? `#${away.team.color}` : "#334155",
        },
      };
    });
  } catch {
    return [];
  }
}

export async function GET() {
  const [nba, nfl, mlb, nhl] = await Promise.all([
    fetchGamesForSport("NBA"),
    fetchGamesForSport("NFL"),
    fetchGamesForSport("MLB"),
    fetchGamesForSport("NHL"),
  ]);

  const response: TodayResponse = { NBA: nba, NFL: nfl, MLB: mlb, NHL: nhl };
  return NextResponse.json(response);
}
