import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4 text-center">
      <div>
        <h1 className="font-serif text-6xl font-bold text-burgundy mb-4">404</h1>
        <p className="text-muted mb-8">Page not found</p>
        <Link to="/" className="px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy/90">Go Home</Link>
      </div>
    </div>
  );
}
