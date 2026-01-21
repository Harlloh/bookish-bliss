import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { mockCurrentUser } from "@/lib/mockData";
import { BookOpen, Search, User, LogOut, Plus, Library } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = mockCurrentUser !== null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-serif text-xl font-bold text-foreground hidden sm:inline-block">
            Bibliotheque
          </span>
        </Link>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 bg-secondary/50 border-border/60 focus:bg-background"
            />
          </div>
        </form>

        {/* Navigation */}
        <nav className="flex items-center gap-2">
          <Button
            variant={location.pathname === "/books" ? "secondary" : "ghost"}
            size="sm"
            asChild
          >
            <Link to="/books" className="hidden sm:flex items-center gap-1">
              <Library className="h-4 w-4" />
              Browse
            </Link>
          </Button>

          {isAuthenticated ? (
            <>
              <Button variant="default" size="sm" asChild>
                <Link to="/books/add" className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Add Book</span>
                </Link>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                      <User className="h-4 w-4 text-secondary-foreground" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{mockCurrentUser?.name}</p>
                    <p className="text-xs text-muted-foreground">{mockCurrentUser?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      My Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile?tab=books" className="cursor-pointer">
                      <BookOpen className="mr-2 h-4 w-4" />
                      My Books
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="cursor-pointer text-destructive">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="default" size="sm" asChild>
                <Link to="/register">Sign Up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
