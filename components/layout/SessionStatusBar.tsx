"use client";

import type { BetSession } from "@/lib/types";
import { formatCurrency, formatLockTime } from "@/lib/utils";

interface Props {
  session: BetSession;
  onNewSession: () => void;
}

export default function SessionStatusBar({ session, onNewSession }: Props) {
  if (session.status !== "locked") return null;

  const totalAmount = session.bets.reduce((s, b) => s + b.amount, 0);

  return (
    <div className="bg-amber-500/10 border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4 text-sm">
        <span className="text-amber-400 font-semibold flex items-center gap-1.5">
          🔒 Bets locked
          <span className="text-amber-500/70 font-normal">
            at {formatLockTime(session.lockedAt!)}
          </span>
        </span>
        <span className="text-slate-400 hidden sm:inline">
          {session.bets.length} bet{session.bets.length !== 1 ? "s" : ""} ·{" "}
          <span className="text-white font-medium">{formatCurrency(totalAmount)}</span> wagered
        </span>
      </div>
      <button
        onClick={onNewSession}
        className="shrink-0 text-xs px-3 py-1.5 rounded-lg border border-brand-500/40 text-brand-400 hover:bg-brand-500/10 transition-colors font-medium"
      >
        New Session
      </button>
    </div>
  );
}
