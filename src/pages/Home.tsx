import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BookCard } from "@/components/BookCard";
import { mockBooks } from "@/lib/mockData";
import { useEffect } from "react";
import api from "@/lib/axios";
export default function Home() {
  const featuredBooks = mockBooks.slice(0, 3);
  const topRatedBooks = [...mockBooks].sort((a, b) => b.averageRating - a.averageRating).slice(0, 3);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('books');
      console.log(res);
    };
    fetchData();
  }, [])

  return (
    <Layout>
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
            <Link
              to="/books"
              className="px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors font-semibold"
            >
              Browse Books →
            </Link>
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
      <section className="border-y border-parchment bg-warm-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold font-serif text-burgundy">{mockBooks.length}</p>
              <p className="text-sm text-muted">Books</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-serif text-gold">24</p>
              <p className="text-sm text-muted">Reviews</p>
            </div>
            <div>
              <p className="text-3xl font-bold font-serif text-forest">3</p>
              <p className="text-sm text-muted">Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Added */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-ink">Recently Added</h2>
            <Link to="/books" className="text-burgundy hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-16 bg-parchment/50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-ink">Top Rated</h2>
            <Link to="/books?sort=rating" className="text-burgundy hover:underline">
              View All →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topRatedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
