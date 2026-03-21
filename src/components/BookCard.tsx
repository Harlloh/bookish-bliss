import { Link } from "react-router-dom";
import { Book } from "@/lib/mockData";
import { StarRating } from "./StarRating";

export function BookCard({ book }: { book: any }) {
  return (
    <Link to={`/books/${book.id}`} className="block bg-white border border-parchment rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {book?.imageUrl ? (
        <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg shadow-md">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src={book.imageUrl}
            alt={book.title ?? "Book cover"}
          />
        </div>
      ) : (
        <div className="w-full aspect-[2/3] bg-gradient-to-br from-burgundy/20 to-forest/20 flex items-center justify-center rounded-lg shadow-md text-6xl">
          📖
        </div>
      )}
      <div className="p-4">
        <h3 className="font-serif font-bold text-ink line-clamp-1">{book.title}</h3>
        <p className="text-sm text-muted mt-1">by {book.author}</p>
        <div className="flex items-center justify-between mt-3">
          <StarRating rating={Math.round(book.avgRating)} size="sm" />
          <span className="text-xs text-muted">{book.reviewCount} reviews</span>
        </div>
      </div>
    </Link>
  );
}
