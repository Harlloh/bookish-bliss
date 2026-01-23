import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BookCard } from "@/components/BookCard";
import { mockBooks, searchBooks } from "@/lib/mockData";

export default function Books() {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [query, setQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState("recent");

  const filteredBooks = query ? searchBooks(query) : mockBooks;
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (sortBy === "rating") return b.averageRating - a.averageRating;
    if (sortBy === "title") return a.title.localeCompare(b.title);
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold text-ink mb-8">Browse Books</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
          >
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rated</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        {/* Books Grid */}
        {sortedBooks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted">No books found matching "{query}"</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
