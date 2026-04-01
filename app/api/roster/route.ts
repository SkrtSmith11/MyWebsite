import { NextResponse } from "next/server";
import { ESPN_BASE, SPORT_CONFIG } from "@/lib/espn";
import type { Sport } from "@/lib/types";

function initials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AVATAR_COLORS = [
  "#1D428A","#552583","#007A33","#CE1141","#006BB6",
  "#98002E","#00471B","#0E2240","#C8102E","#041E42",
  "#E31837","#AA0000","#4F2683","#FB4F14","#005A9C",
];
function colorFromName(name: string): string {
  let h = 0;
  for (const c of name) h = (h * 31 + c.charCodeAt(0)) & 0x7fffffff;
  return AVATAR_COLORS[h % AVATAR_COLORS.length];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("teamId");
  const sport = searchParams.get("sport") as Sport | null;

  if (!teamId || !sport || !SPORT_CONFIG[sport]) {
    return NextResponse.json([], { status: 400 });
  }

  const { sport: s, league: l } = SPORT_CONFIG[sport];

  try {
    const res = await fetch(
      `${ESPN_BASE}/${s}/${l}/teams/${teamId}/roster`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return NextResponse.json([]);

    const data = await res.json();

    // ESPN roster structure: { athletes: [{ items: [...] }] } or { athletes: [...] }
    let rawPlayers: any[] = [];
    const athletes = data?.athletes ?? [];
    if (Array.isArray(athletes)) {
      for (const group of athletes) {
        if (Array.isArray(group?.items)) {
          rawPlayers.push(...group.items);
        } else if (group?.id) {
          rawPlayers.push(group);
        }
      }
    }

    const teamName: string = data?.team?.displayName ?? data?.team?.name ?? "";
    const teamColor: string = data?.team?.color ? `#${data.team.color}` : "#334155";

    const players = rawPlayers
      .filter((p: any) => p?.id && p?.fullName)
      .map((p: any) => ({
        espnId: String(p.id),
        name: p.fullName ?? p.displayName ?? "",
        team: teamName,
        position: p.position?.abbreviation ?? p.position?.name ?? "",
        sport,
        imageInitials: initials(p.fullName ?? ""),
        avatarColor: teamColor || colorFromName(p.fullName ?? ""),
      }));

    return NextResponse.json(players);
  } catch {
    return NextResponse.json([]);
  }
}
