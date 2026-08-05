import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { courses } from "@/lib/site-data";
import { getVideos } from "@/lib/learning";
import { useCourseProgress, useEnrollment } from "@/lib/learning-data";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/courses/$slug/complete")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Course summary — ${loaderData.title} | Rishi Sidhasamadhi Yoga Foundation` },
          {
            name: "description",
            content: `Your learning summary, practice graph and certificate of participation for ${loaderData.title}.`,
          },
          { property: "og:title", content: `Course summary — ${loaderData.title}` },
          { property: "og:description", content: loaderData.purpose },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Course summary | Rishi Sidhasamadhi Yoga Foundation" }],
  }),
  component: CompletePage,
});

function CompletePage() {
  const course = Route.useLoaderData();
  const videos = getVideos(course);
  const { user, ready, enrollment } = useEnrollment(course.slug);
  const { completed } = useCourseProgress(course.slug);
  const [serial, setSerial] = useState<string | null>(null);
  const [stats, setStats] = useState({ notes: 0, questions: 0, tests: 0, days: 0 });

  const finished = completed.length >= videos.length && videos.length > 0;

  useEffect(() => {
    if (!user) return;
    void (async () => {
      const [notes, questions, tests, days] = await Promise.all([
        supabase.from("lesson_notes").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("course_slug", course.slug),
        supabase.from("lesson_questions").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("course_slug", course.slug),
        supabase.from("test_attempts").select("id", { count: "exact", head: true }).eq("user_id", user.id).eq("course_slug", course.slug),
        supabase.from("practice_days").select("id", { count: "exact", head: true }).eq("user_id", user.id),
      ]);
      setStats({
        notes: notes.count ?? 0,
        questions: questions.count ?? 0,
        tests: tests.count ?? 0,
        days: days.count ?? 0,
      });
    })();
  }, [user, course.slug]);

  useEffect(() => {
    if (!user || !finished) return;
    void (async () => {
      const { data } = await supabase
        .from("certificates")
        .select("serial")
        .eq("user_id", user.id)
        .eq("course_slug", course.slug)
        .maybeSingle();
      if (data?.serial) return setSerial(data.serial);
      const next = `RSY-${course.slug.slice(0, 4).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`;
      const { error } = await supabase
        .from("certificates")
        .insert({ user_id: user.id, course_slug: course.slug, serial: next });
      if (!error) setSerial(next);
      await supabase
        .from("enrollments")
        .update({ completed_at: new Date().toISOString() })
        .eq("user_id", user.id)
        .eq("course_slug", course.slug);
    })();
  }, [user, finished, course.slug]);

  if (!ready) return null;

  if (!user || !enrollment) {
    return (
      <section className="flex min-h-screen items-center bg-sand/40 pt-[90px]">
        <div className="mx-auto max-w-xl px-6 text-center">
          <h1 className="font-display text-4xl text-forest">This summary belongs to a student</h1>
          <div className="rule-gold mx-auto mt-7" />
          <Link
            to="/courses/$slug"
            params={{ slug: course.slug }}
            className="mt-10 inline-block rounded-full bg-forest px-8 py-4 text-[0.74rem] tracking-[0.16em] uppercase text-primary-foreground hover:bg-gold hover:text-ink"
          >
            Back to the program
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <div className="absolute inset-0 bg-forest" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
          <p className="eyebrow text-ivory/60">{course.title}</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.06] text-ivory sm:text-6xl">
            {finished ? "You have walked the whole path." : "Your journey so far."}
          </h1>
          <p className="mt-8 max-w-xl text-[1rem] leading-relaxed text-ivory/75">
            {finished
              ? "Every lesson watched, every reflection written. What follows is a record of the practice you built."
              : `You have completed ${completed.length} of ${videos.length} lessons. The summary fills in as you go.`}
          </p>
        </div>
      </section>

      {/* Summary numbers */}
      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Lessons completed" value={`${completed.length} / ${videos.length}`} />
          <Stat label="Notes written" value={String(stats.notes)} />
          <Stat label="Questions asked" value={String(stats.questions)} />
          <Stat label="Tests submitted" value={String(stats.tests)} />
        </div>
      </Section>

      {/* Learning graph */}
      <Section className="bg-sand/50">
        <p className="eyebrow">Your learning curve</p>
        <h2 className="mt-5 font-display text-4xl text-forest">Lesson by lesson</h2>
        <div className="rule-gold mt-7" />
        <div className="mt-14 flex h-56 items-end gap-3">
          {videos.map((v, i) => {
            const reached = completed.includes(v.id);
            const height = Math.round(((i + 1) / videos.length) * 100);
            return (
              <div key={v.id} className="flex flex-1 flex-col items-center gap-3">
                <div
                  title={v.title}
                  className={`w-full rounded-t transition-all ${reached ? "bg-gold" : "bg-border"}`}
                  style={{ height: `${Math.max(8, reached ? height : 8)}%` }}
                />
                <span className="text-[0.6rem] text-muted-foreground">{i + 1}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-8 text-sm text-muted-foreground">
          {stats.days} days of practice logged across your journey.
        </p>
      </Section>

      {/* Certificate */}
      <Section>
        <div className="mx-auto max-w-3xl">
          {finished && serial ? (
            <div className="rounded-3xl border border-gold/50 bg-card p-12 text-center shadow-lift sm:p-16">
              <p className="eyebrow">Certificate of participation</p>
              <h2 className="mt-8 font-display text-4xl leading-tight text-forest sm:text-5xl">
                {user.name}
              </h2>
              <div className="rule-gold mx-auto mt-8" />
              <p className="mt-8 text-[0.98rem] leading-relaxed text-muted-foreground">
                has completed all {videos.length} lessons of
              </p>
              <p className="mt-4 font-display text-2xl text-forest">{course.title}</p>
              <p className="mt-10 text-xs tracking-[0.2em] uppercase text-earth">
                Serial {serial} · Rishi Sidhasamadhi Yoga Foundation
              </p>
              <button
                onClick={() => window.print()}
                className="mt-10 rounded-full bg-forest px-8 py-4 text-[0.74rem] tracking-[0.16em] uppercase text-primary-foreground hover:bg-gold hover:text-ink"
              >
                Print or save as PDF
              </button>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-border p-12 text-center">
              <p className="eyebrow">Certificate</p>
              <p className="mt-6 text-[0.98rem] leading-relaxed text-muted-foreground">
                Your certificate of participation is issued the moment the last lesson is complete.
              </p>
              <Link
                to="/courses/$slug/videos"
                params={{ slug: course.slug }}
                className="mt-10 inline-block rounded-full bg-forest px-8 py-4 text-[0.74rem] tracking-[0.16em] uppercase text-primary-foreground hover:bg-gold hover:text-ink"
              >
                Continue learning
              </Link>
            </div>
          )}
        </div>
      </Section>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="sanctuary-card p-9">
      <p className="eyebrow">{label}</p>
      <p className="mt-5 font-display text-4xl text-forest">{value}</p>
    </div>
  );
}
