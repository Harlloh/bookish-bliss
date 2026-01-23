interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({ rating, maxRating = 5, size = "md", interactive = false, onChange }: StarRatingProps) {
  const sizeClasses = { sm: "text-sm", md: "text-lg", lg: "text-2xl" };

  return (
    <div className={`flex gap-0.5 ${sizeClasses[size]}`}>
      {Array.from({ length: maxRating }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange?.(i + 1)}
          className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
        >
          <span className={i < rating ? "text-gold" : "text-parchment"}>★</span>
        </button>
      ))}
    </div>
  );
}
