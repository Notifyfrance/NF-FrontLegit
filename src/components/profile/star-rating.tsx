import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = false,
  className,
}: StarRatingProps) {
  const sizeMap = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: maxRating }).map((_, index) => {
        const isFilled = index < Math.floor(rating);
        const isPartial = index === Math.floor(rating) && rating % 1 !== 0;

        return (
          <div key={index} className="relative">
            <Star
              className={cn(
                sizeMap[size],
                isFilled || isPartial
                  ? "fill-primary text-primary"
                  : "fill-transparent text-text-muted"
              )}
            />
            {isPartial && (
              <div
                className="absolute top-0 left-0 overflow-hidden"
                style={{ width: `${(rating % 1) * 100}%` }}
              >
                <Star className={cn(sizeMap[size], "fill-primary text-primary")} />
              </div>
            )}
          </div>
        );
      })}
      {showValue && (
        <span className="ml-2 text-sm font-semibold text-text-secondary">
          {rating.toFixed(1)}/{maxRating}
        </span>
      )}
    </div>
  );
}
