import type { StatLine } from "@/lib/types";

interface Props {
  stat: StatLine;
  size?: "sm" | "md";
}

const trendIcon = {
  up: "↑",
  down: "↓",
  flat: "→",
};

const trendColor = {
  up: "text-emerald-400",
  down: "text-red-400",
  flat: "text-slate-400",
};

export default function StatBadge({ stat, size = "md" }: Props) {
  const isSmall = size === "sm";

  return (
    <div className="flex flex-col items-center">
      <span
        className={`font-bold tabular-nums ${isSmall ? "text-sm" : "text-lg"} text-white`}
      >
        {stat.value}
        {stat.unit && (
          <span className={`font-normal ${isSmall ? "text-xs" : "text-sm"} text-slate-400 ml-0.5`}>
            {stat.unit}
          </span>
        )}
        {stat.trend && (
          <span className={`ml-1 text-xs ${trendColor[stat.trend]}`}>
            {trendIcon[stat.trend]}
          </span>
        )}
      </span>
      <span className={`${isSmall ? "text-xs" : "text-xs"} text-slate-500 uppercase tracking-wide mt-0.5`}>
        {stat.label}
      </span>
    </div>
  );
}
