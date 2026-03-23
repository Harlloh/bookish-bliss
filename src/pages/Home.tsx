import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BookCard } from "@/components/BookCard";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { EmptyBookShelf } from './../components/EmptyBookShelf';
import DashStats from "@/components/dahsboardStats";
import SkeletonCard from "@/components/skeletonCard";
import { useAuthStore } from "@/stores/authStore";


export default function Home() {
  const { user } = useAuthStore()
  const fetchDashboard = async () => {
    const res = await api.get('/dashboard')
    return res.data
  }
  const { data: dashBoardData, isLoading: isDashboardLoading, isFetching } = useQuery({
    queryKey: ['dashboard'],
    queryFn: fetchDashboard,
    staleTime: 1000 * 60 * 10,
  })



  return (
    <Layout>
      {isFetching && !isDashboardLoading && (
        <div className="fixed bottom-4 right-4 text-xs text-muted bg-warm-white border border-parchment px-3 py-1.5 rounded-full shadow-sm">
          Updating...
        </div>
      )}
      {/* Hero */}
      <section className="bg-gradient-to-b from-parchment to-cream py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink">
            Discover Your Next
            <span className="block text-burgundy">Literary Adventure</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-2xl mx-auto">
            Join our community of book lovers. Share reviews, discover hidden gems, and build your reading list.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            {user && <Link
              to="/books"
              className="px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors font-semibold"
            >
              Browse Books →
            </Link>}
            <Link
              to="/register"
              className="px-6 py-3 border-2 border-earth text-earth rounded-lg hover:bg-earth hover:text-white transition-colors font-semibold"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <DashStats totalBooks={dashBoardData?.totalBooks} totalReviews={dashBoardData?.totalReviews} totalMembers={dashBoardData?.totalMembers} isLoading={isDashboardLoading} />

      {/* Recently Added */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-ink">Recently Added</h2>
            {user && <Link
              to="/books?sort=rating"
              className="text-burgundy hover:underline disabled:pointer-events-none disabled:opacity-50"
              onClick={(e) => isDashboardLoading && e.preventDefault()}
            >
              View All →
            </Link>}
          </div>
          {isDashboardLoading ?
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
            :
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dashBoardData?.recentBooks?.length > 0 ? dashBoardData?.recentBooks?.map((book) => (
                <BookCard key={book.id} book={book} />
              )) :
                <EmptyBookShelf type="recently-added" />
              }
            </div>}
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-16 bg-parchment/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-ink">Top Rated</h2>
            {user && <Link
              to="/books?sort=rating"
              className="text-burgundy hover:underline disabled:pointer-events-none disabled:opacity-50"
              onClick={(e) => isDashboardLoading && e.preventDefault()}
            >
              View All →
            </Link>}
          </div>
          {isDashboardLoading ?
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
            :
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {dashBoardData?.topRated?.length > 0 ? dashBoardData?.topRatedBooks?.map((book) => (
                <BookCard key={book.id} book={book} />
              )) :
                <EmptyBookShelf type="top-rated" />
              }
            </div>}
        </div>
      </section>
    </Layout>
  );
}
