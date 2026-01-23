import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { StarRating } from "@/components/StarRating";
import { ReviewCard } from "@/components/ReviewCard";
import { getBookById, getReviewsByBookId, mockCurrentUser } from "@/lib/mockData";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const book = getBookById(Number(id));
  const reviews = getReviewsByBookId(Number(id));
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  if (!book) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="font-serif text-2xl font-bold text-ink">Book not found</h1>
          <Link to="/books" className="text-burgundy hover:underline mt-4 inline-block">
            ← Back to Books
          </Link>
        </div>
      </Layout>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Review submitted! Rating: ${reviewRating}, Text: ${reviewText}`);
    setShowReviewForm(false);
    setReviewRating(0);
    setReviewText("");
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/books" className="text-burgundy hover:underline mb-6 inline-block">
          ← Back to Books
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1">
            <div className="aspect-[3/4] bg-gradient-to-br from-burgundy/20 to-forest/20 rounded-lg flex items-center justify-center">
              <span className="text-8xl">📖</span>
            </div>
          </div>

          {/* Book Info */}
          <div className="md:col-span-2">
            <h1 className="font-serif text-3xl font-bold text-ink">{book.title}</h1>
            <p className="text-lg text-muted mt-2">by {book.author}</p>
            
            <div className="flex items-center gap-4 mt-4">
              <StarRating rating={Math.round(book.averageRating)} size="lg" />
              <span className="text-muted">
                {book.averageRating.toFixed(1)} ({book.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
              <p><span className="font-semibold">Published:</span> {book.publicationYear}</p>
              <p><span className="font-semibold">Added by:</span> {book.addedByName}</p>
            </div>

            <p className="mt-6 text-ink leading-relaxed">{book.description}</p>

            {mockCurrentUser && (
              <button
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="mt-6 px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors"
              >
                Write a Review
              </button>
            )}
          </div>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <form onSubmit={handleSubmitReview} className="mt-8 bg-warm-white border border-parchment rounded-lg p-6">
            <h3 className="font-serif text-xl font-bold text-ink mb-4">Write Your Review</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-ink mb-2">Your Rating</label>
              <StarRating
                rating={reviewRating}
                size="lg"
                interactive
                onChange={setReviewRating}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-ink mb-2">Your Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                required
                minLength={10}
                placeholder="Share your thoughts about this book..."
                className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30 resize-none"
              />
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={reviewRating === 0}
                className="px-6 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2 border border-parchment rounded-lg hover:bg-parchment transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Reviews */}
        <section className="mt-12">
          <h2 className="font-serif text-2xl font-bold text-ink mb-6">
            Reviews ({reviews.length})
          </h2>
          
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-muted text-center py-8">
              No reviews yet. Be the first to review this book!
            </p>
          )}
        </section>
      </div>
    </Layout>
  );
}
