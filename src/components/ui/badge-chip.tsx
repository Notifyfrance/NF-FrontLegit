import { cn } from "@/lib/utils";

export type BadgeTier = 1 | 5 | 10;
export type BadgeSize = "sm" | "md" | "lg";

type TierStyle = { color: string; label: string; glow: string };

const TIERS: Record<BadgeTier, TierStyle> = {
  10: { color: "#80ff80", label: "Expert · 10+", glow: "rgba(128,255,128,0.45)" },
  5: { color: "#28ed4f", label: "Confirmé · 5+", glow: "rgba(40,237,79,0.45)" },
  1: { color: "#008c32", label: "Débutant · 1+", glow: "rgba(0,140,50,0.45)" },
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "px-2 py-[3px] text-[10px] gap-1.5",
  md: "px-2.5 py-[5px] text-[11px] gap-2",
  lg: "px-3.5 py-2 text-[13px] gap-2",
};

export function tierFromCount(count: number): BadgeTier {
  if (count >= 10) return 10;
  if (count >= 5) return 5;
  return 1;
}

export function getTierColor(tier: BadgeTier): string {
  return TIERS[tier].color;
}

type Props = {
  count?: number;
  tier?: BadgeTier;
  size?: BadgeSize;
  label?: string;
  className?: string;
};

export function BadgeChip({ count, tier, size = "md", label, className }: Props) {
  const resolvedTier = tier ?? (typeof count === "number" ? tierFromCount(count) : 1);
  const { color, label: defaultLabel, glow } = TIERS[resolvedTier];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-semibold uppercase tracking-wider whitespace-nowrap",
        SIZE_CLASSES[size],
        className
      )}
      style={{
        background: `${color}1f`,
        borderColor: `${color}55`,
        color,
      }}
    >
      <span
        className="h-[7px] w-[7px] rounded-full"
        style={{ background: color, boxShadow: `0 0 8px ${glow}` }}
      />
      {label ?? defaultLabel}
    </span>
  );
}
