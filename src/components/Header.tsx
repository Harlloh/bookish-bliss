import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-parchment shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-burgundy rounded-lg flex items-center justify-center text-white text-xl">📚</div>
          <span className="font-serif text-xl font-bold text-ink hidden sm:block">BookReview</span>
        </Link>

        <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:block">
          <input
            type="text"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30"
          />
        </form>

        <nav className="flex items-center gap-4">
          <Link to="/books" className="text-ink hover:text-burgundy">Books</Link>
          {isAuthenticated && user ? (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center font-semibold">
                {user.name.charAt(0)}
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
