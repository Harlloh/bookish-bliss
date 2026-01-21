import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BookCard } from "@/components/BookCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockBooks, searchBooks } from "@/lib/mockData";
import { Search } from "lucide-react";

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
      <div className="container py-8">
        <h1 className="font-serif text-3xl font-bold mb-8">Browse Books</h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title, author, or ISBN..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {sortedBooks.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No books found matching "{query}"</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
