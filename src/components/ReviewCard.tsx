import { Link } from "react-router-dom";
import { Review } from "@/lib/mockData";
import { StarRating } from "./StarRating";



export function ReviewCard({ review }: any) {
  return (
    <div className="bg-white border border-parchment rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-forest text-white rounded-full flex items-center justify-center font-semibold">
            {review?.createdBy?.name?.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-ink">{review.createdBy?.name}</p>

            <p className="text-xs text-muted">{new Date(review.createdOn).toLocaleDateString()}</p>
          </div>
        </div>
        <StarRating rating={review.star} size="sm" />
      </div>
      <p className="text-ink mt-3">{review.comment}</p>
      {review.edited && <p className="text-gray-500 text-xs italic">Edited</p>}
    </div>
  );
}
