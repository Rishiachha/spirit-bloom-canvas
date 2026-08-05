import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import hero from "@/assets/hero-sunrise.jpg";

type Search = { redirect?: string };

const safePath = (value: string | undefined) =>
  value && value.startsWith("/") && !value.startsWith("//") ? value : "/dashboard";

export const Route = createFileRoute("/auth/")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Sign In or Create Account | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content:
          "Sign in to continue your practice journey, or create an account to track streaks, courses, badges and certificates.",
      },
      { property: "og:title", content: "Sign In | Rishi Sidhasamadhi Yoga" },
      {
        property: "og:description",
        content: "Enter your practice journey — streaks, courses and daily guidance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, ready } = useSession();
  const { redirect } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const target = safePath(redirect);

  useEffect(() => {
    if (ready && user) navigate({ to: target, replace: true });
  }, [ready, user, navigate, target]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("rsy.after-auth", target);
    }
  }, [target]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);
    if (!email.includes("@")) return setError("Please enter a valid email address.");
    if (password.length < 6) return setError("Your password needs at least six characters.");
    if (mode === "signup" && name.trim().length < 2) return setError("Please tell us your name.");

    setBusy(true);
    if (mode === "signup") {
      const { data, error: err } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin,
          data: { display_name: name.trim() },
        },
      });
      setBusy(false);
      if (err) return setError(err.message);
      if (!data.session) {
        return setNotice("Almost there — check your email and confirm your address to begin.");
      }
      navigate({ to: target, replace: true });
    } else {
      const { error: err } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (err) return setError(err.message);
      navigate({ to: target, replace: true });
    }
  };

  const google = async () => {
    setError(null);
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: window.location.origin,
    });
    if (result.error) return setError("Google sign-in could not be completed. Please try again.");
    if (result.redirected) return;
    navigate({ to: target, replace: true });
  };

  return (
    <section className="relative min-h-screen pt-[90px]">
      <img
        src={hero}
        alt="Sunrise over the Himalayan foothills"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0" style={{ background: "oklch(0.26 0.03 120 / 0.68)" }} />
      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10">
        <div>
          <p className="eyebrow text-ivory/70">Your Practice</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.08] text-ivory sm:text-6xl">
            The journey continues where you left it.
          </h1>
          <div className="rule-gold mt-8" />
          <p className="mt-8 max-w-md text-[1rem] leading-relaxed text-ivory/80">
            Sign in to see your practice streak, enrolled courses, badges, notes and certificates.
            Your account is only ever used to hold your practice — nothing else.
          </p>
        </div>

        <div className="rounded-3xl bg-card/95 p-10 shadow-lift backdrop-blur-sm sm:p-12">
          <div className="flex gap-8 border-b border-border">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setMode(m);
                  setError(null);
                  setNotice(null);
                }}
                className="relative pb-4 text-[0.74rem] tracking-[0.18em] uppercase transition-colors"
                style={{ color: mode === m ? "var(--forest)" : "var(--muted-foreground)" }}
              >
                {m === "signin" ? "Sign In" : "Create Account"}
                {mode === m && <span className="absolute -bottom-px left-0 h-px w-full bg-gold" />}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={google}
            className="mt-8 w-full rounded-full border border-border px-8 py-4 text-[0.76rem] tracking-[0.14em] uppercase text-forest transition-colors hover:border-forest hover:bg-sand/60"
          >
            Continue with Google
          </button>

          <div className="mt-7 flex items-center gap-4">
            <span className="h-px flex-1 bg-border" />
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">or</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submit} className="mt-7 space-y-6">
            {mode === "signup" && (
              <Field label="Your name" value={name} onChange={setName} type="text" />
            )}
            <Field label="Email" value={email} onChange={setEmail} type="email" />
            <Field label="Password" value={password} onChange={setPassword} type="password" />

            {error && <p className="text-sm text-destructive">{error}</p>}
            {notice && <p className="text-sm text-earth">{notice}</p>}

            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-full bg-forest px-8 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-gold hover:text-ink disabled:opacity-60"
            >
              {busy ? "One moment…" : mode === "signin" ? "Enter my journey" : "Begin my journey"}
            </button>
          </form>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            By continuing you accept the Foundation's practice guidelines. Return to the{" "}
            <Link to="/" className="text-earth underline-offset-4 hover:underline">
              home page
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full border-b border-border bg-transparent pb-3 text-[0.95rem] text-foreground outline-none transition-colors focus:border-gold"
      />
    </label>
  );
}
