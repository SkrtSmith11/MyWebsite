import { NextResponse } from "next/server";
import type { Sport } from "@/lib/types";
import { ESPN_BASE, SPORT_CONFIG, parseSeasonStats, parseLiveStats } from "@/lib/espn";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const espnId = searchParams.get("espnId");
  const sportKey = searchParams.get("sport") as Sport | null;

  if (!espnId || !sportKey || !SPORT_CONFIG[sportKey]) {
    return NextResponse.json({ error: "Missing espnId or sport" }, { status: 400 });
  }

  const { sport, league } = SPORT_CONFIG[sportKey];
  const base = `${ESPN_BASE}/${sport}/${league}`;

  try {
    // ------------------------------------------------------------------
    // 1. Fetch athlete profile to get team ID (cache 10 min)
    // ------------------------------------------------------------------
    const athleteRes = await fetch(`${base}/athletes/${espnId}`, {
      next: { revalidate: 600 },
    });
    if (!athleteRes.ok) throw new Error("athlete fetch failed");
    const athleteData = await athleteRes.json();
    const teamId: string | undefined = athleteData?.athlete?.team?.id;

    // ------------------------------------------------------------------
    // 2. Fetch today's scoreboard (cache 30s)
    // ------------------------------------------------------------------
    let gameStatus: "live" | "upcoming" | "final" | "off" = "off";
    let liveGameId: string | null = null;
    let opponent: string | null = null;
    let gameDetail: string | null = null;

    if (teamId) {
      const sbRes = await fetch(`${base}/scoreboard`, {
        next: { revalidate: 30 },
      });
      if (sbRes.ok) {
        const sb = await sbRes.json();
        for (const event of sb?.events ?? []) {
          const comp = event?.competitions?.[0];
          if (!comp) continue;
          const competitors: any[] = comp.competitors ?? [];
          const myTeam = competitors.find((c) => c.team?.id === teamId);
          if (!myTeam) continue;

          const state: string = comp.status?.type?.state ?? "";
          const shortDetail: string = comp.status?.type?.shortDetail ?? "";

          if (state === "in") {
            gameStatus = "live";
            liveGameId = event.id;
            gameDetail = shortDetail; // e.g. "Q3 5:23"
          } else if (state === "pre") {
            gameStatus = "upcoming";
            gameDetail = shortDetail; // e.g. "7:30 PM ET"
          } else if (state === "post") {
            gameStatus = "final";
          }

          const oppTeam = competitors.find((c) => c.team?.id !== teamId);
          const oppAbbr: string = oppTeam?.team?.abbreviation ?? "";
          const homeAway: string = myTeam.homeAway;
          if (oppAbbr) {
            opponent = homeAway === "home" ? `vs ${oppAbbr}` : `@ ${oppAbbr}`;
          }
          break;
        }
      }
    }

    // ------------------------------------------------------------------
    // 3. Live stats from boxscore (if game is in progress)
    // ------------------------------------------------------------------
    let stats = null;
    let isLiveStats = false;

    if (gameStatus === "live" && liveGameId) {
      const summaryRes = await fetch(`${base}/summary?event=${liveGameId}`, {
        next: { revalidate: 0 }, // always fresh for live
      });
      if (summaryRes.ok) {
        const summary = await summaryRes.json();
        stats = parseLiveStats(summary, espnId, sportKey);
        if (stats) isLiveStats = true;
      }
    }

    // ------------------------------------------------------------------
    // 4. Season averages fallback
    // ------------------------------------------------------------------
    if (!stats) {
      const statsRes = await fetch(`${base}/athletes/${espnId}/statistics`, {
        next: { revalidate: 300 }, // cache 5 min
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        // ESPN wraps stats under statistics[].splits.categories
        const categories =
          statsData?.statistics?.[0]?.splits?.categories ??
          statsData?.athlete?.statistics?.splits?.categories ??
          [];
        stats = parseSeasonStats(categories, sportKey);
      }
    }

    return NextResponse.json({
      gameStatus,
      opponent,
      gameDetail,
      stats,
      isLiveStats,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    console.error("ESPN fetch error", err);
    return NextResponse.json({ error: "ESPN fetch failed" }, { status: 502 });
  }
}
