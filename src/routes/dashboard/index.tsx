import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Section } from "@/components/site/Section";
import { courses, sanskritQuotes } from "@/lib/site-data";
import { useSession } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { computeStreak, logPracticeDay } from "@/lib/learning-data";
import { BADGES, getVideos, formatPrice } from "@/lib/learning";
import { useLiveSessions, sessionStatus, formatWhen } from "@/lib/live";
import river from "@/assets/river.jpg";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "My Journey | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content:
          "Your practice journey — continue learning, keep your streak, earn badges and join live sessions.",
      },
      { property: "og:title", content: "My Journey | Rishi Sidhasamadhi Yoga" },
      {
        property: "og:description",
        content: "Continue learning, keep your streak and earn badges.",
      },
    ],
  }),
  component: Dashboard,
});

const quote = sanskritQuotes[2]!;

type Enrollment = { course_slug: string; amount_cents: number; created_at: string; completed_at: string | null };

function Dashboard() {
  const { user, ready } = useSession();
  const { sessions } = useLiveSessions();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [completed, setCompleted] = useState<{ course_slug: string; video_id: string }[]>([]);
  const [badges, setBadges] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready || !user) return;
    let active = true;
    void (async () => {
      const [e, p, b, d] = await Promise.all([
        supabase
          .from("enrollments")
          .select("course_slug, amount_cents, created_at, completed_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false }),
        supabase
          .from("video_progress")
          .select("course_slug, video_id")
          .eq("user_id", user.id)
          .eq("completed", true),
        supabase.from("user_badges").select("badge_key").eq("user_id", user.id),
        supabase.from("practice_days").select("day").eq("user_id", user.id),
      ]);
      if (!active) return;
      setEnrollments((e.data ?? []) as Enrollment[]);
      setCompleted(p.data ?? []);
      setBadges((b.data ?? []).map((r) => r.badge_key));
      setDays((d.data ?? []).map((r) => r.day));
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [ready, user]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-[90px]">
        <p className="eyebrow">Opening your journey…</p>
      </div>
    );
  }

  const streak = computeStreak(days);
  const loggedToday = days.includes(new Date().toISOString().slice(0, 10));

  const enrolled = enrollments
    .map((e) => {
      const course = courses.find((c) => c.slug === e.course_slug);
      if (!course) return null;
      const total = getVideos(course).length || 1;
      const done = completed.filter((c) => c.course_slug === e.course_slug).length;
      return { e, course, total, done, pct: Math.round((done / total) * 100) };
    })
    .filter(Boolean) as { e: Enrollment; course: (typeof courses)[number]; total: number; done: number; pct: number }[];

  const featuredCourses = courses
    .filter((c) => !enrollments.some((e) => e.course_slug === c.slug))
    .slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <img
          src={river}
          alt="Forest river at dawn"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "oklch(0.3 0.03 150 / 0.62)" }} />
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
          <p className="eyebrow text-ivory/70">Namaste, {user.name}</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-ivory sm:text-6xl">
            {streak > 0 ? `Day ${streak} of your practice.` : "Today is a good day to begin."}
          </h1>
          <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ivory/80">
            {enrolled.length > 0
              ? "Pick up where you left the mat — your next lesson is waiting."
              : "Choose a program and the path arranges itself around you."}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/courses"
              className="rounded-full bg-ivory px-9 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-gold hover:text-ink"
            >
              Browse all courses
            </Link>
            <Link
              to="/live"
              className="rounded-full border border-ivory/50 px-9 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-ivory transition-colors hover:bg-ivory hover:text-forest"
            >
              Live sessions
            </Link>
          </div>
        </div>
      </section>

      <Section className="py-20">
        {/* ------------------------------------------------ streak + goal */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="sanctuary-card p-9">
            <p className="eyebrow">Practice streak</p>
            <p className="mt-5 font-display text-6xl text-forest">{streak}</p>
            <p className="mt-2 text-sm text-muted-foreground">consecutive mornings</p>
            <button
              onClick={async () => {
                await logPracticeDay(user.id, 15);
                const today = new Date().toISOString().slice(0, 10);
                setDays((d) => (d.includes(today) ? d : [...d, today]));
                setBadges((b) => (b.includes("daily-practice") ? b : [...b, "daily-practice"]));
              }}
              disabled={loggedToday}
              className="mt-6 rounded-full border border-forest/25 px-6 py-3 text-[0.72rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-forest hover:text-primary-foreground disabled:opacity-40"
            >
              {loggedToday ? "Logged for today ✓" : "Log today's practice"}
            </button>
          </div>

          <div className="sanctuary-card p-9 lg:col-span-2">
            <div className="flex items-end justify-between">
              <p className="eyebrow">Continue learning</p>
              <Link to="/courses" className="text-[0.72rem] tracking-[0.2em] uppercase text-earth hover:text-forest">
                All programs →
              </Link>
            </div>
            {loading ? (
              <p className="mt-6 text-sm text-muted-foreground">Loading your programs…</p>
            ) : enrolled.length === 0 ? (
              <p className="mt-6 text-sm text-muted-foreground">
                You have not enrolled in a program yet. When you do, it appears here with your
                progress.
              </p>
            ) : (
              <div className="mt-7 space-y-7">
                {enrolled.map(({ e, course, total, done, pct }) => (
                  <div key={e.course_slug}>
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <Link
                        to="/courses/$slug/videos"
                        params={{ slug: course.slug }}
                        className="font-display text-xl text-forest hover:text-gold"
                      >
                        {course.title}
                      </Link>
                      <span className="text-xs tracking-widest text-earth">
                        {done}/{total} lessons · {pct}%
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 w-full rounded-full bg-sand">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: "var(--gradient-sacred)" }}
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3">
                      <Link
                        to="/courses/$slug/videos"
                        params={{ slug: course.slug }}
                        className="text-[0.7rem] tracking-[0.16em] uppercase text-forest hover:text-gold"
                      >
                        {pct === 0 ? "Start" : "Continue"} →
                      </Link>
                      {pct === 100 && (
                        <Link
                          to="/courses/$slug/complete"
                          params={{ slug: course.slug }}
                          className="text-[0.7rem] tracking-[0.16em] uppercase text-gold"
                        >
                          View certificate →
                        </Link>
                      )}
                      <span className="text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground">
                        Paid {formatPrice(e.amount_cents)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------- badges */}
        <div className="mt-12">
          <div className="flex items-end justify-between">
            <p className="eyebrow">
              Badges earned — {badges.length} of {BADGES.length}
            </p>
            <span className="text-[0.72rem] tracking-[0.2em] uppercase text-earth">
              Keep going
            </span>
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {BADGES.map((b) => {
              const earned = badges.includes(b.key);
              return (
                <div
                  key={b.key}
                  className={`sanctuary-card p-7 transition-opacity ${earned ? "" : "opacity-45"}`}
                >
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-forest"
                    style={{ background: earned ? "var(--gradient-sacred)" : "var(--color-sand)" }}
                  >
                    {b.glyph}
                  </span>
                  <p className="mt-5 font-display text-lg text-forest">{b.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {b.description}
                  </p>
                  <p className="mt-4 text-[0.62rem] tracking-[0.18em] uppercase text-earth">
                    {earned ? "Earned" : "Not yet"}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------ new programs */}
        {featuredCourses.length > 0 && (
          <div className="mt-12">
            <div className="flex items-end justify-between">
              <p className="eyebrow">Programs you have not begun</p>
              <Link to="/courses" className="text-[0.72rem] tracking-[0.2em] uppercase text-earth hover:text-forest">
                View all →
              </Link>
            </div>
            <div className="mt-7 grid gap-8 lg:grid-cols-3">
              {featuredCourses.map((c) => (
                <Link
                  key={c.slug}
                  to="/courses/$slug"
                  params={{ slug: c.slug }}
                  className="sanctuary-card flex flex-col overflow-hidden"
                >
                  {c.image && (
                    <div className="h-48 overflow-hidden">
                      <img
                        src={c.image}
                        alt={c.title}
                        loading="lazy"
                        width={640}
                        height={360}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-9">
                    <p className="eyebrow">
                      {c.level} · {c.duration}
                    </p>
                    <p className="mt-5 font-display text-[1.7rem] leading-tight text-forest">
                      {c.title}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {c.purpose}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* -------------------------------------------------- live rooms */}
        <div className="mt-12">
          <div className="flex items-end justify-between">
            <p className="eyebrow">Live sessions</p>
            <Link to="/live" className="text-[0.72rem] tracking-[0.2em] uppercase text-earth hover:text-forest">
              View all →
            </Link>
          </div>
          <div className="mt-7 grid gap-8 lg:grid-cols-3">
            {sessions.map((s) => (
              <Link
                key={s.id}
                to="/live/$slug"
                params={{ slug: s.slug }}
                className="sanctuary-card p-9"
              >
                <p className="eyebrow flex items-center gap-2">
                  {sessionStatus(s) === "live" && (
                    <span className="inline-flex h-2 w-2 rounded-full bg-gold animate-breathe" />
                  )}
                  {sessionStatus(s) === "live"
                    ? "Live now"
                    : sessionStatus(s) === "soon"
                      ? "Upcoming"
                      : "Ended"}
                </p>
                <p className="mt-5 font-display text-xl text-forest">{s.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{formatWhen(s.starts_at)}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {s.teacher} · {s.duration_minutes} min
                </p>
                <span className="mt-5 inline-block text-[0.7rem] tracking-[0.16em] uppercase text-forest">
                  Enter the room →
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* -------------------------------------------------------- verse */}
        <div className="mt-12">
          <p className="eyebrow">Verse of the day</p>
          <div className="mt-6 max-w-2xl">
            <p className="font-display text-3xl text-forest">{quote.sanskrit}</p>
            <p className="mt-3 text-sm italic text-earth">{quote.transliteration}</p>
            <div className="rule-gold my-5" />
            <p className="font-display text-lg text-foreground">{quote.translation}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{quote.meaning}</p>
          </div>
        </div>
      </Section>
    </>
  );
}
