import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const success = await login(email, password);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError("Invalid email or password");
    }
    setLoading(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-burgundy rounded-lg flex items-center justify-center text-white text-2xl">📚</div>
            <span className="font-serif text-2xl font-bold text-ink">BookReview</span>
          </Link>
        </div>
        <div className="bg-white border border-parchment rounded-lg p-8 shadow-lg">
          <h1 className="font-serif text-2xl font-bold text-ink text-center mb-6">Sign In</h1>
          {error && (
            <div className="mb-4 p-3 bg-burgundy/10 border border-burgundy/30 rounded-lg text-burgundy text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30" />
            </div>
            <div>
              <label className="block text-sm font-medium text-ink mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-parchment rounded-lg bg-cream focus:outline-none focus:ring-2 focus:ring-burgundy/30" />
            </div>
            <button type="submit" disabled={loading} className="w-full py-3 bg-burgundy text-white rounded-lg font-semibold hover:bg-burgundy/90 disabled:opacity-50">
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            Don't have an account? <Link to="/register" className="text-burgundy font-medium hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
