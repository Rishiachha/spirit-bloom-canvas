import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/Section";
import { courses } from "@/lib/site-data";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} | Rishi Sidhasamadhi Yoga Foundation` },
          { name: "description", content: loaderData.purpose },
          { property: "og:title", content: `${loaderData.title} | Rishi Sidhasamadhi Yoga` },
          { property: "og:description", content: loaderData.purpose },
        ]
      : [],
  }),
  component: CoursePage,
});

const faqs = [
  {
    q: "I have never practised before. Is this suitable?",
    a: "Yes. Every foundation program assumes no prior experience and no particular flexibility. You will be taught from the first breath.",
  },
  {
    q: "What if I miss a session?",
    a: "Every session is recorded and remains in your library. Teachers also hold a weekly open hour for questions.",
  },
  {
    q: "Is there financial assistance?",
    a: "Always. The Foundation offers full scholarships on request, without documentation or explanation required.",
  },
  {
    q: "Do I need equipment?",
    a: "A mat, a blanket and a quiet corner. Props are suggested but never required.",
  },
];

function CoursePage() {
  const course = Route.useLoaderData();
  const heroImage = course.image ?? "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&q=80";

  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <img
          src={heroImage}
          alt={course.title}
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "oklch(0.28 0.03 90 / 0.62)" }} />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10">
          <Link
            to="/courses"
            className="text-[0.72rem] tracking-[0.2em] uppercase text-ivory/70 hover:text-ivory"
          >
            â‹� All programs
          </Link>
          <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.06] text-ivory sm:text-7xl">
            {course.title}
          </h1>
          <p className="mt-8 max-w-xl text-[1.02rem] leading-relaxed text-ivory/80">
            {course.purpose}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
          <Link
            to="/courses/$slug/videos/"
            params={{ slug: course.slug }}
            className="rounded-full bg-ivory px-8 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-gold hover:text-ink"
          >
            Enrol in this program
          </Link>
            <div className="flex gap-10 text-ivory/80">
              <div>
                <p className="eyebrow text-ivory/60">Duration</p>
                <p className="mt-2 font-display text-2xl text-ivory">{course.duration}</p>
              </div>
              <div>
                <p className="eyebrow text-ivory/60">Level</p>
                <p className="mt-2 font-display text-2xl text-ivory">{course.level}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      {course.description && (
        <Section>
          <div className="mx-auto max-w-3xl">
            <SectionHeader eyebrow="About this program" title="Who this is for" />
            <p className="mt-8 text-[0.98rem] leading-relaxed text-muted-foreground">
              {course.description}
            </p>
          </div>
        </Section>
      )}

      {/* Curriculum */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr]">
          <SectionHeader
            eyebrow="Curriculum"
            title="What you will study"
            intro="Each module unfolds over the weeks at a pace that lets practice settle before the next idea arrives."
          />
          <div className="divide-y divide-border border-y border-border">
            {course.includes.map((mod: string, i: number) => (
              <div key={mod} className="flex gap-8 py-8">
                <span className="font-display text-3xl text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-display text-2xl text-forest">{mod}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Guided sessions, a short daily assignment, and reading drawn from the classical
                    texts â€” always explained in ordinary language.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Instructor */}
      <Section className="bg-sand/50">
        <div className="grid items-center gap-16 lg:grid-cols-[0.6fr_1fr]">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={founder}
              alt="Senior teacher of the Foundation"
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">Your Teacher</p>
            <h2 className="mt-6 font-display text-4xl text-forest">Acharya Devendra</h2>
            <div className="rule-gold mt-7" />
            <p className="mt-8 text-[0.98rem] leading-relaxed text-muted-foreground">
              Twenty-six years of practice, sixteen of teaching, trained directly in the Foundation
              lineage. He teaches with patience and very few words, and believes the student's own
              experience is the only real authority.
            </p>
          </div>
        </div>
      </Section>

      {/* Testimonials */}
      <Section>
        <SectionHeader eyebrow="Students" title="What this course changed" align="center" />
        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {[
            "I finally have a practice I keep without arguing with myself first.",
            "The pace was the gift. Nothing was rushed, so nothing was lost.",
            "Six weeks in, my family noticed before I did.",
          ].map((q, i) => (
            <figure key={q} className="sanctuary-card p-10">
              <blockquote className="font-display text-[1.4rem] leading-snug text-forest">
                â€œ{q}â€
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-6 text-sm text-muted-foreground">
                Graduate, cohort {2024 + i}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section className="bg-sand/50">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
          <SectionHeader eyebrow="Questions" title="Before you begin" />
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <div key={f.q} className="py-8">
                <p className="font-display text-2xl text-forest">{f.q}</p>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Enrollment CTA */}
      <Section className="bg-forest">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-ivory/60">Enrolment</p>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-6xl">
            The next cohort begins with the new moon.
          </h2>
          <p className="mt-8 text-[1rem] leading-relaxed text-ivory/75">
            Places are limited so that every student can be known by name.
          </p>
          <Link
            to="/courses/$slug/videos/"
            params={{ slug: course.slug }}
            className="mt-10 inline-block rounded-full bg-ivory px-10 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-gold hover:text-ink"
          >
            Start watching
          </Link>
        </div>
      </Section>
    </>
  );
}
