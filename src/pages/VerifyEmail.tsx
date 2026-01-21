import { Link, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function VerifyEmail() {
  const { token } = useParams<{ token?: string }>();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    // Simulate verification API call
    const verifyToken = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // For demo, we'll show success most of the time
      setStatus(token && token.length > 5 ? "success" : "error");
    };

    if (token) {
      verifyToken();
    } else {
      setStatus("error");
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="font-serif text-2xl font-bold">Bibliotheque</span>
          </Link>
        </div>

        <Card className="border-border/60 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="font-serif text-2xl">Email Verification</CardTitle>
            <CardDescription>
              {status === "loading" && "Verifying your email address..."}
              {status === "success" && "Your email has been verified"}
              {status === "error" && "Verification failed"}
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center space-y-6">
            {status === "loading" && (
              <div className="py-8">
                <Loader2 className="h-16 w-16 mx-auto text-primary animate-spin" />
                <p className="mt-4 text-muted-foreground">
                  Please wait while we verify your email...
                </p>
              </div>
            )}

            {status === "success" && (
              <div className="py-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-forest/10">
                  <CheckCircle className="h-10 w-10 text-forest" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold">
                  Welcome to Bibliotheque!
                </h3>
                <p className="mt-2 text-muted-foreground">
                  Your account is now active. You can start adding books and writing reviews.
                </p>
                <Button asChild className="mt-6">
                  <Link to="/login">Sign In to Your Account</Link>
                </Button>
              </div>
            )}

            {status === "error" && (
              <div className="py-8">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
                  <XCircle className="h-10 w-10 text-destructive" />
                </div>
                <h3 className="mt-4 font-serif text-xl font-semibold">
                  Verification Failed
                </h3>
                <p className="mt-2 text-muted-foreground">
                  The verification link is invalid or has expired. Please request a new verification email.
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <Button variant="default">Resend Verification Email</Button>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Back to Sign In</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
