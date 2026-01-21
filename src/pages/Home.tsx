import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { mockBooks } from "@/lib/mockData";
import { ArrowRight, BookOpen, Star, Users } from "lucide-react";

export default function Home() {
  const featuredBooks = mockBooks.slice(0, 3);
  const topRatedBooks = [...mockBooks].sort((a, b) => b.averageRating - a.averageRating).slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Discover Your Next
              <span className="block text-primary">Literary Adventure</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Join our community of book lovers. Share reviews, discover hidden gems, and build your reading list.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link to="/books">
                  Browse Books <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/register">Join the Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border/60 bg-card py-12">
        <div className="container">
          <div className="grid grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex justify-center mb-2">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <p className="text-3xl font-bold font-serif">{mockBooks.length}</p>
              <p className="text-sm text-muted-foreground">Books</p>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <p className="text-3xl font-bold font-serif">24</p>
              <p className="text-sm text-muted-foreground">Reviews</p>
            </div>
            <div>
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-forest" />
              </div>
              <p className="text-3xl font-bold font-serif">3</p>
              <p className="text-sm text-muted-foreground">Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">Recently Added</h2>
            <Button variant="ghost" asChild>
              <Link to="/books">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated */}
      <section className="py-16 bg-secondary/30">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold md:text-3xl">Top Rated</h2>
            <Button variant="ghost" asChild>
              <Link to="/books?sort=rating">View All <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
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
