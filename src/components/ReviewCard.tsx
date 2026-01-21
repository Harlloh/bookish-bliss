import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/StarRating";
import { Review } from "@/lib/mockData";
import { User, Calendar } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface ReviewCardProps {
  review: Review;
  showBookTitle?: boolean;
}

export function ReviewCard({ review, showBookTitle = false }: ReviewCardProps) {
  const formattedDate = formatDistanceToNow(new Date(review.createdAt), {
    addSuffix: true,
  });

  return (
    <Card className="border-border/60 transition-colors hover:border-border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Avatar placeholder */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <User className="h-5 w-5 text-secondary-foreground/60" />
            </div>
            <div>
              <p className="font-medium text-foreground">{review.userName}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {formattedDate}
              </div>
            </div>
          </div>
          <StarRating rating={review.rating} size="sm" />
        </div>

        {showBookTitle && review.bookTitle && (
          <Link
            to={`/books/${review.bookId}`}
            className="mt-3 block font-serif text-sm font-medium text-primary hover:underline"
          >
            {review.bookTitle}
          </Link>
        )}

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {review.reviewText}
        </p>
      </CardContent>
    </Card>
  );
}
