import { Link } from "react-router-dom";
import { BookOpen, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-secondary/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-bold">Bibliotheque</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              A community of book lovers sharing their thoughts and discoveries.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/books" className="hover:text-foreground transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/books?sort=recent" className="hover:text-foreground transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/books?sort=rating" className="hover:text-foreground transition-colors">
                  Top Rated
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Account</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/profile" className="hover:text-foreground transition-colors">
                  My Profile
                </Link>
              </li>
              <li>
                <Link to="/profile?tab=reviews" className="hover:text-foreground transition-colors">
                  My Reviews
                </Link>
              </li>
              <li>
                <Link to="/books/add" className="hover:text-foreground transition-colors">
                  Add a Book
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-serif font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Bibliotheque. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
