import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon?: LucideIcon;
  value: string | number;
  label: string;
  sublabel?: string;
  variant?: "default" | "primary" | "success" | "warning";
  className?: string;
}

export function StatCard({
  icon: Icon,
  value,
  label,
  sublabel,
  variant = "default",
  className,
}: StatCardProps) {
  const variantStyles = {
    default: "border-l-text-muted",
    primary: "border-l-primary",
    success: "border-l-badge-10",
    warning: "border-l-warning",
  };

  return (
    <div
      className={cn(
        "bg-bg-card rounded-lg p-6 border-l-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-slide-up",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div
            className={cn(
              "text-3xl font-bold mb-2",
              variant === "primary" && "text-primary",
              variant === "success" && "text-badge-10",
              variant === "warning" && "text-warning",
              variant === "default" && "text-foreground"
            )}
          >
            {value}
          </div>
          <div className="text-sm text-text-muted font-medium">{label}</div>
          {sublabel && (
            <div className="text-xs text-text-inactive mt-1">{sublabel}</div>
          )}
        </div>
        {Icon && (
          <Icon
            className={cn(
              "w-8 h-8 opacity-50",
              variant === "primary" && "text-primary",
              variant === "success" && "text-badge-10",
              variant === "warning" && "text-warning"
            )}
          />
        )}
      </div>
    </div>
  );
}
