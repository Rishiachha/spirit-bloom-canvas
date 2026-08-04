import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/auth/")({
  head: () => ({
    meta: [
      { title: "Sign In | Rishi Sidhasamadhi Yoga Foundation" },
      { name: "description", content: "Sign in or create an account for your yoga journey." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) {
    navigate({ to: "/dashboard" });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (mode === "signin") {
      signIn(email, password);
    } else {
      if (!name) {
        setError("Please enter your name.");
        return;
      }
      signUp(name, email, password);
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <div className="absolute inset-0 bg-forest/95" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10">
          <Link
            to="/"
            className="text-[0.72rem] tracking-[0.2em] uppercase text-ivory/70 hover:text-ivory"
          >
            â‹� Home
          </Link>
          <h1 className="mt-8 font-display text-4xl text-ivory sm:text-5xl">
            {mode === "signin" ? "Welcome back" : "Begin your journey"}
          </h1>
          <p className="mt-4 text-[1rem] leading-relaxed text-ivory/75">
            {mode === "signin"
              ? "Sign in to access your dashboard and continue your practice."
              : "Create an account to start tracking your yoga journey."}
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-foreground">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                  placeholder="Your name"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full rounded-md border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest"
                placeholder="Your password"
              />
            </div>
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-forest px-8 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-ivory transition-colors hover:bg-forest/90"
            >
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="mt-8 border-t border-border pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === "signin"
                ? "Don't have an account?"
                : "Already have an account?"}
              <button
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin");
                  setError("");
                }}
                className="ml-1 font-medium text-forest underline underline-offset-4 hover:text-forest/80"
              >
                {mode === "signin" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}