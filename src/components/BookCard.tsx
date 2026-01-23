import { Link } from "react-router-dom";
import { Book } from "@/lib/mockData";
import { StarRating } from "./StarRating";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link to={`/books/${book.id}`} className="block bg-white border border-parchment rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-[3/4] bg-gradient-to-br from-burgundy/20 to-forest/20 flex items-center justify-center text-6xl">📖</div>
      <div className="p-4">
        <h3 className="font-serif font-bold text-ink line-clamp-1">{book.title}</h3>
        <p className="text-sm text-muted mt-1">by {book.author}</p>
        <div className="flex items-center justify-between mt-3">
          <StarRating rating={Math.round(book.averageRating)} size="sm" />
          <span className="text-xs text-muted">{book.reviewCount} reviews</span>
        </div>
      </div>
    </Link>
  );
}
