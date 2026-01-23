import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-ink text-parchment py-12 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-sm opacity-70">© 2024 BookReview. Built for backend development practice.</p>
        <div className="mt-4 flex justify-center gap-4 text-sm">
          <Link to="/books" className="hover:text-white">Books</Link>
          <Link to="/register" className="hover:text-white">Register</Link>
        </div>
      </div>
    </footer>
  );
}
