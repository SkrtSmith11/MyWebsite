interface Props {
  isSessionLocked: boolean;
  trackedCount: number;
}

export default function Header({ isSessionLocked, trackedCount }: Props) {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white text-sm font-bold shadow">
          β
        </div>
        <div>
          <h1 className="text-base font-bold text-white leading-tight">Beta Player Tracker</h1>
          <p className="text-xs text-slate-500 leading-tight">
            {trackedCount} player{trackedCount !== 1 ? "s" : ""} tracked
          </p>
        </div>
      </div>

      <div
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
          isSessionLocked
            ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
            : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isSessionLocked ? "bg-amber-400" : "bg-emerald-400 animate-pulse"}`} />
        {isSessionLocked ? "Session Locked" : "Session Open"}
      </div>
    </header>
  );
}
