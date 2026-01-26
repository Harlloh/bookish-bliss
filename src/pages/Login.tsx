import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "@/lib/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('http://localhost:8000/auth/login', {
        email,
        password
      })
      console.log(res);
      if (res.data.success) {
        navigate('/');
      } else {
        console.error("Login failed, no success flag.");
        alert("Login failed, no success flag.");
      }
    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      setLoading(false);
    }
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
