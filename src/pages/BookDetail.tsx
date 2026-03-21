import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { StarRating } from "@/components/StarRating";
import { ReviewCard } from "@/components/ReviewCard";
import { getBookById, getReviewsByBookId, } from "@/lib/mockData";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from './../lib/axios';
import { useAuthStore } from "@/stores/authStore";
import { BookDetailSkeleton } from "@/components/bookSkeleton";
import Toast from "@/components/toast";
import { AxiosError } from "axios";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore()
  const queryClient = useQueryClient();



  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");


  // <<<<<<<<<<< FOR FETCHING THE BOOK DETAILS >>>>>>>>>>>>>
  const fetchBookById = async () => {
    const res = await api.get(`/books/${id}`)
    return res.data.book
  }

  const { data: book, isLoading, isFetching } = useQuery({
    queryKey: ['books', id],  // include id so each book gets its own cache
    queryFn: fetchBookById,
    // staleTime: 1000 * 60 * 5
  })
  // <<<<<<<<<<< FOR FETCHING THE BOOK DETAILS >>>>>>>>>>>>>



  // <<<<<<<<<<< FOR ADDING THE BOOK REVIEW >>>>>>>>>>>>>
  // 1. This is ONLY the API call — no event, no preventDefault
  const submitReview = async (reviewData: { star: number; comment: string }) => {
    if (hasReviewed) {
      const res = await api.put(`/reviews/edit-review/${userReview.id}`, reviewData);
      return res.data;
    }
    const res = await api.post(`/reviews/add-review/${id}`, reviewData);
    return res.data;
  };

  const { mutate, isPending, isError } = useMutation({
    mutationFn: submitReview,
    onSuccess: (data) => {
      console.log('✅ success', data);
      queryClient.invalidateQueries({ queryKey: ['books', id] });
      setShowReviewForm(false);
      setReviewRating(0);
      setReviewText("");
    },
    onError: (error: AxiosError<{ error: string }>) => {
      setErrorMsg(error?.response?.data?.error || 'Something went wrong. Please try again.');
      console.error('❌ Failed to submit review:', error);
      // setShowReviewForm(false);
      // setReviewRating(0);
      // setReviewText("");
    }
  });

  // 2. This ONLY handles the form event and calls mutate
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ star: reviewRating, comment: reviewText }); // ← triggers useMutation
  };
  // <<<<<<<<<<< FOR ADDING THE BOOK REVIEW >>>>>>>>>>>>>

  const hasReviewed = book?.reviews?.some((item: any) => item.createdBy.id === user?.id);
  const userReview = book?.reviews?.find((item: any) => item.createdBy.id === user?.id);


  useEffect(() => {
    if (userReview) {
      setReviewRating(userReview.star);
      setReviewText(userReview.comment);
    }
  }, [userReview]);

  if (isLoading) {
    return <Layout>
      <BookDetailSkeleton />
    </Layout>
  }

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






  return (
    <Layout>
      {isError && <Toast message={errorMsg} type="error" />}
      {isFetching && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-burgundy/20 z-50">
          <div className="h-full bg-burgundy animate-pulse w-full" />
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link to="/books" className="text-burgundy hover:underline mb-6 inline-block">
          ← Back to Books
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <div className="md:col-span-1">
            {book?.imageUrl ? (
              <div className="relative w-full aspect-[2/3] overflow-hidden rounded-lg shadow-md">
                <img
                  className="absolute inset-0 w-full h-full object-cover"
                  src={book.imageUrl}
                  alt={book.title ?? "Book cover"}
                />
              </div>)
              :
              <div className="aspect-[3/4] bg-gradient-to-br from-burgundy/20 to-forest/20 rounded-lg flex items-center justify-center">
                <span className="text-8xl">📖</span>
              </div>}
          </div>


          {/* Book Info */}
          <div className="md:col-span-2">
            <h1 className="font-serif text-3xl font-bold text-ink">{book.title}</h1>
            <p className="text-lg text-muted mt-2">by {book.author}</p>

            <div className="flex items-center gap-4 mt-4">
              <StarRating rating={Math.round(book?.avgRating)} size="lg" />
              <span className="text-muted">
                {book?.avgRating?.toFixed(1)} ({book?.reviewCount} reviews)
              </span>
            </div>

            <div className="mt-6 space-y-2 text-sm">
              <p><span className="font-semibold">Published:</span> {book?.publishedYear}</p>
              <p><span className="font-semibold">Added by:</span> {book?.addedBy.name}</p>
            </div>

            <p className="mt-6 text-ink leading-relaxed">{book?.overview}</p>

            {user && (
              <button className={`mt-6 px-6 py-3 text-white rounded-lg transition-colors ${hasReviewed ? 'bg-forest hover:bg-forest/90' : 'bg-burgundy hover:bg-burgundy/90'}`} onClick={() => setShowReviewForm(!showReviewForm)}>
                {hasReviewed ? 'Edit Your Review' : 'Write a Review'}
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
                disabled={reviewRating === 0 || isPending}
                className="px-6 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? 'Submitting...' : hasReviewed ? 'Submit Edit' : 'Submit Review'}
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
            Reviews ({book?.reviews?.length})
          </h2>

          {book?.reviews?.length > 0 ? (
            <div className="space-y-4">
              {book?.reviews?.map((review: any) => (
                <span key={review.id}><ReviewCard review={review} /></span>
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
