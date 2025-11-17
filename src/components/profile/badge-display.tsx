import { cn } from "@/lib/utils";

interface BadgeDisplayProps {
  level: "1 Deal" | "5 Deals" | "10+ Deals";
  text: string;
  icon?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function BadgeDisplay({
  level,
  text,
  icon = "🏆",
  size = "md",
  className,
}: BadgeDisplayProps) {
  const getBadgeStyles = () => {
    switch (level) {
      case "10+ Deals":
        return "bg-gradient-badge-10 glow-badge-10 border-badge-10";
      case "5 Deals":
        return "bg-gradient-badge-5 glow-badge-5 border-badge-5";
      case "1 Deal":
        return "bg-gradient-badge-1 glow-badge-1 border-badge-1";
      default:
        return "bg-gradient-badge-1 glow-badge-1 border-badge-1";
    }
  };

  const sizeStyles = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-6 py-4 text-lg",
  };

  return (
    <div
      className={cn(
        "rounded-lg border-2 font-bold text-white text-center transition-all duration-300 hover:scale-105 animate-pulse-glow",
        getBadgeStyles(),
        sizeStyles[size],
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-2xl">{icon}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
