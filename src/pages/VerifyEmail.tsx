import { Link, useParams, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "@/lib/axios";


export default function VerifyEmail() {
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(null);
  const [searchParams] = useSearchParams();


  const verifyToken = searchParams.get("token");
  const userId = searchParams.get("id");


  const handleVerifyemail = async () => {
    try {
      setStatus("loading")
      const res = await api.post('http://localhost:8000/auth/verify', {
        token: verifyToken,
        userId
      })
      setStatus('success')
    } catch (error) {
      setStatus("error");
      console.error("An error occured while verifying email address, ", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="w-full max-w-md text-center">
        {/* Logo */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-burgundy rounded-lg flex items-center justify-center">
              <span className="text-white text-2xl">📚</span>
            </div>
            <span className="font-serif text-2xl font-bold text-ink">BookReview</span>
          </Link>
        </div>

        <div className="bg-warm-white border border-parchment rounded-lg p-8 shadow-lg">
          <h1 className="font-serif text-2xl font-bold text-ink mb-4">
            Email Verification
          </h1>

          {status === null && (
            <div className="space-y-2">
              <button disabled={!verifyToken} onClick={() => verifyToken ? handleVerifyemail() : null} className="w-full px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors">
                {verifyToken ? 'Click to Verify Email' : 'Check mail for link'}
              </button>
              <Link
                to="/register"
                className="block w-full px-6 py-3 text-muted hover:text-ink transition-colors"
              >
                Back to Sign Up
              </Link>
            </div>
          )}

          {status === "loading" && (
            <div className="py-8">
              <div className="w-16 h-16 mx-auto mb-4 border-4 border-parchment border-t-burgundy rounded-full animate-spin" />
              <p className="text-muted">Verifying your email...</p>
            </div>
          )}

          {status === "success" && (
            <div className="py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-forest/10 rounded-full flex items-center justify-center">
                <span className="text-4xl">✓</span>
              </div>
              <h2 className="font-serif text-xl font-semibold text-ink mb-2">
                Welcome to BookReview!
              </h2>
              <p className="text-muted mb-6">
                Your account is now active. You can start adding books and writing reviews.
              </p>
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors"
              >
                Sign In to Your Account
              </Link>
            </div>
          )}

          {status === "error" && (
            <div className="py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-4xl text-red-600">✕</span>
              </div>
              <h2 className="font-serif text-xl font-semibold text-ink mb-2">
                Verification Failed
              </h2>
              <p className="text-muted mb-6">
                The verification link is invalid or has expired.
              </p>
              <div className="space-y-2">
                <button className="w-full px-6 py-3 bg-burgundy text-white rounded-lg hover:bg-burgundy/90 transition-colors">
                  Resend Verification Email
                </button>
                <Link
                  to="/login"
                  className="block w-full px-6 py-3 text-muted hover:text-ink transition-colors"
                >
                  Back to Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
