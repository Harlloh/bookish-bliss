import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import api from '@/lib/axios';

export function Header() {
  const [searchInput, setSearchInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const [searchText, setSearchText] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchText(searchInput);
    }, 500);
    return () => clearTimeout(timer)
  }, [searchInput]);

  useEffect(() => {
    setDropdownOpen(searchInput.length > 0);
  }, [searchInput]);
  useEffect(() => {
    setDropdownOpen(searchInput.length > 0);
  }, [searchInput]);

  // ✅ add this right here
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSearchResults = async () => {
    if (!searchText) return { data: [] };
    const res = await api.post('/books/search', { title: searchText }); // POST with body
    return res.data;
  };

  const { data: searchResults, isLoading: isSearchLoading } = useQuery({
    queryKey: ['bookSearch', searchText],
    queryFn: fetchSearchResults,
    enabled: searchText.length > 0, // don't fire on empty string
    staleTime: 1000 * 60 * 2,
  });

  const books = searchResults?.data ?? [];

  const handleSeeAll = () => {
    navigate(`/books?search=${searchInput}`);
    setDropdownOpen(false);
    setSearchInput("");
  };

  const handleBookClick = (item: any) => {
    setDropdownOpen(false);
    setSearchInput("");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-parchment shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-burgundy rounded-lg flex items-center justify-center text-white text-xl">📚</div>
          <span className="font-serif text-xl font-bold text-ink hidden sm:block">BookReview</span>
        </Link>

        {/* Search */}
        {user && isAuthenticated && <div ref={searchRef} className="relative flex-1 max-w-md hidden md:block">
          <input
            type="text"
            placeholder="Search books..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
          />

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-full mt-1 left-0 right-0 bg-white border border-parchment rounded-lg shadow-lg z-50 overflow-hidden">
              {isSearchLoading ? (
                <div className="px-4 py-3 space-y-2 animate-pulse">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-10 bg-parchment rounded" />
                      <div className="h-3 bg-parchment rounded w-2/3" />
                    </div>
                  ))}
                </div>
              ) : books.length > 0 ? (
                <>
                  <ul>
                    {books.slice(0, 3).map((book: any) => (
                      <li key={book.id}>
                        <Link
                          to={`/books/${book.id}`}
                          onClick={handleBookClick}
                          className="flex items-center gap-3 px-4 py-2.5 hover:bg-parchment/50 transition-colors"
                        >
                          {book.imageUrl ? (
                            <img src={book.imageUrl} alt={book.title} className="w-8 h-10 object-cover rounded" />
                          ) : (
                            <div className="w-8 h-10 bg-gradient-to-br from-burgundy/20 to-forest/20 rounded flex items-center justify-center text-sm">📖</div>
                          )}
                          <span className="text-sm text-ink line-clamp-1">{book.title}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  {books.length > 3 && (
                    <button
                      onClick={handleSeeAll}
                      className="w-full px-4 py-2.5 text-sm text-burgundy font-medium border-t border-parchment hover:bg-parchment/50 transition-colors text-left"
                    >
                      See all {books?.length} results for "{searchInput}" →
                    </button>
                  )}
                </>
              ) : (
                <p className="px-4 py-3 text-sm text-muted">No books found for "{searchInput}"</p>
              )}
            </div>
          )}
        </div>
        }
        <nav className="flex items-center gap-4">
          {isAuthenticated && user && <Link to="/books" className="text-ink hover:text-burgundy">Books</Link>}
          {isAuthenticated && user ? (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)} className="w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center font-semibold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-parchment rounded-lg shadow-lg py-2">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-parchment" onClick={() => setMenuOpen(false)}>Profile</Link>
                  <Link to="/books/add" className="block px-4 py-2 hover:bg-parchment" onClick={() => setMenuOpen(false)}>Add Book</Link>
                  <button
                    onClick={() => { logout(); setMenuOpen(false); }}
                    className="block w-full text-left px-4 py-2 text-burgundy hover:bg-parchment"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-burgundy text-white rounded-lg hover:bg-burgundy/90">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
}
