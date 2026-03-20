import { useState, useEffect, useRef } from "react";
import { Layout } from "@/components/Layout";
import { BookCard } from "@/components/BookCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import api from './../lib/axios';
import SkeletonCard from "@/components/skeletonCard";

interface SearchType {
  pageSize: number;
  query: 'recent' | 'rating' | 'title';
  searchText: string;
}

export default function Books() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [searchInput, setSearchInput] = useState<string>('')

  const [filterData, setFilterData] = useState<SearchType>({
    pageSize: 20,
    query: 'recent',
    searchText: ''
  });

  const fetchBooks = async ({ pageParam = 1 }: { pageParam: number }) => {
    const res = await api.get('/books', {
      params: {
        page: pageParam,
        pageSize: filterData.pageSize,
        sort: filterData.query,
        search: filterData.searchText,
      }
    }); // swap /dashboard → /books when ready
    return res.data;
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['books', filterData.query, filterData.searchText],
    queryFn: fetchBooks,
    getNextPageParam: (lastPage) =>
      lastPage?.pagination?.hasNextPage
        ? lastPage.pagination.page + 1
        : undefined,
    initialPageParam: 1,
    staleTime: 1000 * 60 * 10,
  });
  const allBooks = data?.pages.flatMap(page => page.data) ?? [];


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 0.1 }
    );

    if (bottomRef.current) observer.observe(bottomRef.current);

    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])


  useEffect(() => {
    const timer = setTimeout(() => {
      setFilterData(prev => ({ ...prev, searchText: searchInput }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const setQuery = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilterData(prev => ({ ...prev, [name]: value }));
  };
  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="font-serif text-3xl font-bold text-ink mb-8">Browse Books</h1>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            name="searchText"
            placeholder="Search by title, author, or ISBN..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
          />
          <select
            name="query"                // ← required for setQuery to work
            value={filterData.query}
            onChange={setQuery}
            className="px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
          >
            <option value="recent">Most Recent</option>
            <option value="rating">Highest Rated</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        {/* Books Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : allBooks.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Invisible scroll trigger */}
            <div ref={bottomRef} className="h-1" />

            {/* Loading indicator for next page */}
            {isFetchingNextPage && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
                {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
              </div>
            )}

            {/* End of results */}
            {!hasNextPage && (
              <p className="text-center text-muted text-sm mt-10">
                You've reached the end of the list
              </p>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted">No books found matching "{filterData.searchText}"</p>
          </div>
        )}

      </div>
    </Layout>
  );
}