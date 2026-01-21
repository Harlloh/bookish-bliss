import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  showValue?: boolean;
}

const sizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  showValue = false,
}: StarRatingProps) {
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: maxRating }, (_, index) => {
          const isFilled = index < Math.floor(rating);
          const isHalf = index === Math.floor(rating) && rating % 1 >= 0.5;

          return (
            <button
              key={index}
              type="button"
              disabled={!interactive}
              onClick={() => handleClick(index)}
              className={cn(
                "relative transition-transform",
                interactive && "cursor-pointer hover:scale-110",
                !interactive && "cursor-default"
              )}
            >
              {/* Background star (empty) */}
              <Star
                className={cn(
                  sizeClasses[size],
                  "text-muted-foreground/30"
                )}
              />
              {/* Foreground star (filled) */}
              {(isFilled || isHalf) && (
                <Star
                  className={cn(
                    sizeClasses[size],
                    "absolute left-0 top-0 fill-accent text-accent",
                    isHalf && "clip-path-half"
                  )}
                  style={isHalf ? { clipPath: "inset(0 50% 0 0)" } : undefined}
                />
              )}
            </button>
          );
        })}
      </div>
      {showValue && (
        <span className="ml-1 text-sm font-medium text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
