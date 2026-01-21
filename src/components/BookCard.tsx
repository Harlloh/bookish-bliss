import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/StarRating";
import { Book } from "@/lib/mockData";
import { BookOpen, Calendar, User } from "lucide-react";

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  return (
    <Link to={`/books/${book.id}`}>
      <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 border-border/60">
        <CardContent className="p-0">
          {/* Book cover placeholder with gradient */}
          <div className="relative h-48 bg-gradient-to-br from-primary/10 via-secondary to-accent/10 flex items-center justify-center overflow-hidden">
            <BookOpen className="h-16 w-16 text-primary/30 transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="font-serif text-lg font-semibold text-foreground line-clamp-2 leading-tight">
                {book.title}
              </h3>
            </div>
          </div>

          {/* Book details */}
          <div className="p-4 space-y-3">
            <p className="text-sm text-muted-foreground font-medium">
              by {book.author}
            </p>

            <div className="flex items-center justify-between">
              <StarRating rating={book.averageRating} size="sm" showValue />
              <span className="text-xs text-muted-foreground">
                {book.reviewCount} {book.reviewCount === 1 ? "review" : "reviews"}
              </span>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {book.description}
            </p>

            <div className="flex items-center gap-3 pt-2 border-t border-border/50 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {book.publicationYear}
              </span>
              <span className="flex items-center gap-1">
                <User className="h-3 w-3" />
                {book.addedByName}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
