"use client";

import { formatCurrency } from "@/lib/utils";

interface Props {
  betCount: number;
  totalAmount: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LockConfirmDialog({
  betCount,
  totalAmount,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Dialog */}
      <div className="relative bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="text-center mb-5">
          <div className="text-4xl mb-3">🔒</div>
          <h2 className="text-lg font-bold text-white">Lock This Session?</h2>
          <p className="text-sm text-slate-400 mt-1">
            This action cannot be undone for the current session.
          </p>
        </div>

        {/* Summary */}
        <div className="bg-slate-700/50 rounded-xl p-4 mb-5 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Bets placed</span>
            <span className="text-white font-medium">{betCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Total wagered</span>
            <span className="text-white font-medium">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 text-center mb-5">
          Once locked, you cannot add or remove bets in this session. You can start a new session afterward.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-600 text-slate-300 text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-amber-500 text-white text-sm font-bold hover:bg-amber-600 transition-colors"
          >
            Confirm Lock
          </button>
        </div>
      </div>
    </div>
  );
}
