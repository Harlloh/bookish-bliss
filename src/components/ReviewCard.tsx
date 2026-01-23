import { Review } from "@/lib/mockData";
import { StarRating } from "./StarRating";

export function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white border border-parchment rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-forest text-white rounded-full flex items-center justify-center font-semibold">
            {review.userName.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-ink">{review.userName}</p>
            <p className="text-xs text-muted">{new Date(review.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        <StarRating rating={review.rating} size="sm" />
      </div>
      <p className="text-ink mt-3">{review.reviewText}</p>
    </div>
  );
}
