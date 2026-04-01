"use client";

import { useState } from "react";
import type { BetType, Player } from "@/lib/types";

interface Props {
  trackedPlayers: Player[];
  defaultPlayerId?: string;
  onSubmit: (bet: {
    playerId: string;
    playerName: string;
    type: BetType;
    description: string;
    amount: number;
    odds: string;
  }) => void;
  isLocked: boolean;
}

const BET_TYPES: BetType[] = [
  "Player Prop",
  "Over/Under",
  "Moneyline",
  "Spread",
  "Parlay",
  "Other",
];

const inputClass =
  "w-full px-3 py-2 bg-slate-700/60 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-500 transition-colors";

export default function BetForm({
  trackedPlayers,
  defaultPlayerId,
  onSubmit,
  isLocked,
}: Props) {
  const [playerId, setPlayerId] = useState(defaultPlayerId ?? trackedPlayers[0]?.id ?? "");
  const [type, setType] = useState<BetType>("Player Prop");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [odds, setOdds] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const player = trackedPlayers.find((p) => p.id === playerId);
    if (!player) return setError("Select a player.");
    if (!description.trim()) return setError("Add a bet description.");
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return setError("Enter a valid amount.");
    if (!odds.trim()) return setError("Enter odds (e.g. -110 or +150).");

    onSubmit({
      playerId,
      playerName: player.name,
      type,
      description: description.trim(),
      amount: parsedAmount,
      odds: odds.trim(),
    });

    setDescription("");
    setAmount("");
    setOdds("");
  }

  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center py-6 text-center border border-slate-700/40 rounded-xl bg-slate-800/30">
        <div className="text-2xl mb-2">🔒</div>
        <p className="text-sm text-slate-400 font-medium">Session is locked</p>
        <p className="text-xs text-slate-600 mt-1">No new bets can be added.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Player */}
      <div>
        <label className="block text-xs text-slate-400 mb-1">Player</label>
        <select
          value={playerId}
          onChange={(e) => setPlayerId(e.target.value)}
          className={inputClass}
        >
          {trackedPlayers.length === 0 && (
            <option value="">— Add players to tracker first —</option>
          )}
          {trackedPlayers.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.team})
            </option>
          ))}
        </select>
      </div>

      {/* Bet type */}
      <div>
        <label className="block text-xs text-slate-400 mb-1">Bet Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as BetType)}
          className={inputClass}
        >
          {BET_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs text-slate-400 mb-1">Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. LeBron over 25.5 pts"
          className={inputClass}
        />
      </div>

      {/* Amount + Odds */}
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-slate-400 mb-1">Amount ($)</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="50"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs text-slate-400 mb-1">Odds</label>
          <input
            type="text"
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            placeholder="-110"
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={trackedPlayers.length === 0}
        className="w-full py-2.5 bg-brand-500 hover:bg-brand-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-semibold rounded-xl transition-colors"
      >
        Add Bet
      </button>
    </form>
  );
}
