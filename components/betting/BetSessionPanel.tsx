"use client";

import { useState } from "react";
import type { BetSession, Player } from "@/lib/types";
import BetForm from "./BetForm";
import BetList from "./BetList";
import LockConfirmDialog from "./LockConfirmDialog";
import { formatCurrency, formatLockTime } from "@/lib/utils";

interface Props {
  session: BetSession | null;
  trackedPlayers: Player[];
  defaultBetPlayerId?: string;
  onAddBet: Parameters<typeof BetForm>[0]["onSubmit"];
  onRemoveBet: (id: string) => void;
  onLock: () => void;
  onNewSession: () => void;
}

export default function BetSessionPanel({
  session,
  trackedPlayers,
  defaultBetPlayerId,
  onAddBet,
  onRemoveBet,
  onLock,
  onNewSession,
}: Props) {
  const [showConfirm, setShowConfirm] = useState(false);

  const isLocked = session?.status === "locked";
  const bets = session?.bets ?? [];
  const totalAmount = bets.reduce((s, b) => s + b.amount, 0);

  return (
    <>
      <div className="flex flex-col h-full">
        {/* Panel header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-white">Bet Session</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isLocked
                ? `Locked at ${formatLockTime(session!.lockedAt!)}`
                : "Open — add bets below"}
            </p>
          </div>
          <div
            className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              isLocked
                ? "bg-amber-500/20 text-amber-400"
                : "bg-emerald-500/20 text-emerald-400"
            }`}
          >
            {isLocked ? "🔒 Locked" : "● Open"}
          </div>
        </div>

        {/* Summary bar */}
        {bets.length > 0 && (
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-700/30 border border-slate-700/40 mb-4 text-sm">
            <span className="text-slate-400">
              {bets.length} bet{bets.length !== 1 ? "s" : ""}
            </span>
            <span className="text-white font-semibold">{formatCurrency(totalAmount)}</span>
          </div>
        )}

        {/* Bet list */}
        <div className="flex-1 overflow-y-auto min-h-0 mb-4">
          <BetList bets={bets} isLocked={isLocked} onRemove={onRemoveBet} />
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700/50 mb-4" />

        {/* Form or locked message */}
        <BetForm
          trackedPlayers={trackedPlayers}
          defaultPlayerId={defaultBetPlayerId}
          onSubmit={onAddBet}
          isLocked={isLocked}
        />

        {/* Lock / New session button */}
        <div className="mt-4">
          {isLocked ? (
            <button
              onClick={onNewSession}
              className="w-full py-2.5 border border-brand-500/50 text-brand-400 hover:bg-brand-500/10 text-sm font-semibold rounded-xl transition-colors"
            >
              Start New Session
            </button>
          ) : (
            <button
              onClick={() => setShowConfirm(true)}
              disabled={bets.length === 0}
              className="w-full py-2.5 border border-amber-500/40 text-amber-400 hover:bg-amber-500/10 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold rounded-xl transition-colors"
            >
              🔒 Lock Bets for This Session
            </button>
          )}
          {!isLocked && (
            <p className="text-xs text-slate-600 text-center mt-2">
              Locking prevents adding or removing bets
            </p>
          )}
        </div>
      </div>

      {showConfirm && (
        <LockConfirmDialog
          betCount={bets.length}
          totalAmount={totalAmount}
          onConfirm={() => {
            onLock();
            setShowConfirm(false);
          }}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </>
  );
}
