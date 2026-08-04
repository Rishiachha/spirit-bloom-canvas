import { createFileRoute, Link } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { courses, liveClasses, sanskritQuotes } from "@/lib/site-data";
import { useSession } from "@/lib/auth";
import river from "@/assets/river.jpg";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({
    meta: [
      { title: "My Journey | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content: "Your personal practice journey — streaks, courses and daily verse.",
      },
      { property: "og:title", content: "My Journey | Rishi Sidhasamadhi Yoga" },
      {
        property: "og:description",
        content: "A calm home for your practice streak and courses.",
      },
    ],
  }),
  component: Dashboard,
});

const quote = sanskritQuotes[2];

function Dashboard() {
  const { user, ready } = useSession();

  if (!ready || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-[90px]">
        <p className="eyebrow">Opening your journey…</p>
      </div>
    );
  }

  const featuredCourses = courses.slice(0, 3);

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
          <Link
            to="/courses"
            className="mt-9 inline-block rounded-full bg-ivory px-9 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-gold hover:text-ink"
          >
            Browse all courses
          </Link>
        </div>
      </section>

      <Section className="py-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="sanctuary-card p-9">
            <p className="eyebrow">Practice streak</p>
            <p className="mt-5 font-display text-6xl text-forest">47</p>
            <p className="mt-2 text-sm text-muted-foreground">consecutive mornings</p>
          </div>

          <div className="sanctuary-card p-9 lg:col-span-2">
            <p className="eyebrow">Enrolled courses</p>
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

        <div className="mt-12">
          <div className="flex items-end justify-between">
            <p className="eyebrow">Featured programs</p>
            <Link
              to="/courses"
              className="text-[0.72rem] tracking-[0.2em] uppercase text-earth hover:text-forest"
            >
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
<Link
                to="/courses/$slug/videos/"
                params={{ slug: c.slug }}
                className="mt-6 inline-block rounded-full border border-forest/25 px-5 py-2.5 text-[0.72rem] font-medium tracking-wide text-forest transition-colors hover:border-forest hover:bg-forest hover:text-primary-foreground"
              >
                Enrol in this program
              </Link>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <div className="flex items-end justify-between">
            <p className="eyebrow">Live sessions</p>
            <Link
              to="/events"
              className="text-[0.72rem] tracking-[0.2em] uppercase text-earth hover:text-forest"
            >
              View all →
            </Link>
          </div>
          <div className="mt-7 grid gap-8 lg:grid-cols-2">
            {liveClasses.map((lc) => (
              <div key={lc.slug} className="sanctuary-card p-9">
                <p className="eyebrow">{lc.kind}</p>
                <p className="mt-5 font-display text-xl text-forest">{lc.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{lc.date}</p>
                <p className="mt-1 text-sm text-muted-foreground">{lc.place}</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">
                  {lc.blurb}
                </p>
              </div>
            ))}
          </div>
        </div>

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
