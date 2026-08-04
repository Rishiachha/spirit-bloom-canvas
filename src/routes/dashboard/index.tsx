import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Section } from "@/components/site/Section";
import { courses, sanskritQuotes } from "@/lib/site-data";
import { useSession } from "@/lib/auth";
import river from "@/assets/river.jpg";
import community from "@/assets/community.jpg";


export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "My Journey | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content:
          "Your personal practice journey — streaks, course progress, recommended programs, video library, achievements and the verse of the day.",
      },
      { property: "og:title", content: "My Journey | Rishi Sidhasamadhi Yoga" },
      {
        property: "og:description",
        content: "A calm home for your practice streak, courses and daily verse.",
      },
    ],
  }),
  component: Dashboard,
});

const quote = sanskritQuotes[2];

function Dashboard() {
  const navigate = useNavigate();
  const { user, ready } = useSession();

  useEffect(() => {
    if (ready && !user) {
      navigate({ to: "/auth", search: { redirect: "/dashboard" }, replace: true });
    }
  }, [ready, user, navigate]);

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-[90px]">
        <p className="eyebrow">Opening your journey…</p>
      </div>
    );
  }

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
          <p className="eyebrow text-ivory/70">Good morning, {user.name}</p>

          <h1 className="mt-5 font-display text-5xl leading-tight text-ivory sm:text-6xl">
            Day 47 of your practice.
          </h1>
          <p className="mt-6 max-w-lg text-[1rem] leading-relaxed text-ivory/80">
            Today's sequence is fifteen minutes — breath, three standing postures, and a short
            sitting.
          </p>
          <button className="mt-9 rounded-full bg-ivory px-9 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-gold hover:text-ink">
            Begin today's practice
          </button>
        </div>
      </section>

      <Section className="py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="sanctuary-card p-9">
            <p className="eyebrow">Practice streak</p>
            <p className="mt-5 font-display text-6xl text-forest">47</p>
            <p className="mt-2 text-sm text-muted-foreground">consecutive mornings</p>
            <div className="mt-8 flex gap-1.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="h-9 flex-1 rounded-full"
                  style={{
                    background:
                      i < 12 ? "var(--gold)" : "color-mix(in oklab, var(--earth) 15%, transparent)",
                    opacity: i < 12 ? 0.35 + i * 0.05 : 1,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="sanctuary-card p-9 lg:col-span-2">
            <p className="eyebrow">Course progress</p>
            <div className="mt-7 space-y-7">
              {[
                { t: "Yoga Foundation Course", p: 72 },
                { t: "Meditation Foundation Course", p: 38 },
                { t: "Sleep Wellness Program", p: 15 },
              ].map((c) => (
                <div key={c.t}>
                  <div className="flex items-baseline justify-between">
                    <p className="font-display text-xl text-forest">{c.t}</p>
                    <span className="text-xs tracking-widest text-earth">{c.p}%</span>
                  </div>
                  <div className="mt-3 h-1.5 w-full rounded-full bg-sand">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${c.p}%`, background: "var(--gradient-sacred)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="sanctuary-card p-9 lg:col-span-2">
            <p className="eyebrow">Learning journey</p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
              {["Foundations", "Breath", "Stillness", "Service"].map((s, i) => (
                <div key={s} className="bg-card p-6">
                  <p className="font-display text-3xl" style={{ color: i < 2 ? "var(--gold)" : "var(--earth)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 font-display text-xl text-forest">{s}</p>
                  <p className="mt-1 text-xs tracking-[0.14em] uppercase text-muted-foreground">
                    {i < 2 ? "Complete" : "Ahead"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="sanctuary-card flex flex-col justify-between p-9">
            <div>
              <p className="eyebrow">Verse of the day</p>
              <p className="mt-6 font-display text-3xl text-forest">{quote.sanskrit}</p>
              <p className="mt-3 text-sm italic text-earth">{quote.transliteration}</p>
              <div className="rule-gold my-5" />
              <p className="font-display text-lg text-foreground">{quote.translation}</p>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{quote.meaning}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="sanctuary-card p-9">
            <p className="eyebrow">Achievements</p>
            <ul className="mt-7 space-y-4">
              {["First 21 mornings", "Seven days of silence", "Completed Breath Module"].map((a) => (
                <li key={a} className="flex items-center gap-4">
                  <span className="h-9 w-9 shrink-0 rounded-full border border-gold/50" />
                  <span className="font-display text-lg text-forest">{a}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="sanctuary-card overflow-hidden">
            <img
              src={community}
              alt="Community practice"
              loading="lazy"
              width={1600}
              height={1000}
              className="h-40 w-full object-cover"
            />
            <div className="p-9">
              <p className="eyebrow">Community activity</p>
              <p className="mt-4 font-display text-xl leading-snug text-forest">
                Your Bengaluru circle practised together 9 times this month.
              </p>
              <Link
                to="/events"
                className="mt-6 inline-block text-[0.72rem] tracking-[0.2em] uppercase text-earth hover:text-forest"
              >
                See gatherings →
              </Link>
            </div>
          </div>

          <div className="sanctuary-card p-9">
            <p className="eyebrow">Video library</p>
            <ul className="mt-7 divide-y divide-border">
              {["Morning Sun Salutations · 18 min", "Nadi Shodhana · 9 min", "Yoga Nidra · 32 min"].map(
                (v) => (
                  <li key={v} className="py-4 font-display text-lg text-forest">
                    {v}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <p className="eyebrow">Recommended for you</p>
          <div className="mt-7 grid gap-8 lg:grid-cols-3">
            {courses.slice(4, 7).map((c) => (
              <Link
                key={c.slug}
                to="/courses/$slug"
                params={{ slug: c.slug }}
                className="sanctuary-card p-9"
              >
                <p className="eyebrow">
                  {c.level} · {c.duration}
                </p>
                <p className="mt-4 font-display text-2xl leading-tight text-forest">{c.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.purpose}</p>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
