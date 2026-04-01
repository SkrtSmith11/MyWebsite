"use client";

import type { Bet } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface Props {
  bets: Bet[];
  isLocked: boolean;
  onRemove: (id: string) => void;
}

const betTypeColors: Record<string, string> = {
  "Player Prop": "bg-purple-500/20 text-purple-400",
  "Over/Under": "bg-blue-500/20 text-blue-400",
  Moneyline: "bg-green-500/20 text-green-400",
  Spread: "bg-orange-500/20 text-orange-400",
  Parlay: "bg-pink-500/20 text-pink-400",
  Other: "bg-slate-500/20 text-slate-400",
};

export default function BetList({ bets, isLocked, onRemove }: Props) {
  if (bets.length === 0) {
    return (
      <p className="text-sm text-slate-500 text-center py-4">
        No bets in this session yet.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {bets.map((bet) => (
        <div
          key={bet.id}
          className="group flex items-start gap-3 p-3 rounded-xl bg-slate-700/30 border border-slate-700/40 hover:border-slate-600/60 transition-colors"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-medium text-white truncate">{bet.playerName}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                  betTypeColors[bet.type] ?? betTypeColors["Other"]
                }`}
              >
                {bet.type}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-snug">{bet.description}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-xs font-semibold text-white">
                {formatCurrency(bet.amount)}
              </span>
              <span className="text-xs text-slate-400">@ {bet.odds}</span>
            </div>
          </div>

          {!isLocked && (
            <button
              onClick={() => onRemove(bet.id)}
              title="Remove bet"
              className="text-slate-600 hover:text-red-400 transition-colors text-sm p-1 shrink-0 opacity-0 group-hover:opacity-100"
            >
              ✕
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
