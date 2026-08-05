import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { courses } from "@/lib/site-data";
import { getTests } from "@/lib/learning";
import { awardBadge, useEnrollment } from "@/lib/learning-data";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const Route = createFileRoute("/courses/$slug/test/$testId")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    const test = getTests(course).find((t) => t.id === params.testId);
    if (!test) throw notFound();
    return { course, test };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.test.title} | ${loaderData.course.title}` },
          { name: "description", content: loaderData.test.intro },
          { property: "og:title", content: `${loaderData.test.title} | Rishi Sidhasamadhi Yoga` },
          { property: "og:description", content: loaderData.test.intro },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Test | Rishi Sidhasamadhi Yoga Foundation" }],
  }),
  component: TestPage,
});

function TestPage() {
  const { course, test } = Route.useLoaderData();
  const navigate = useNavigate();
  const { enrollment, loading, user, ready } = useEnrollment(course.slug);
  const [answers, setAnswers] = useState<string[]>(test.questions.map(() => ""));
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!user) return;
    setError(null);
    setBusy(true);
    try {
      if (test.kind === "written") {
        const answered = answers.filter((a) => a.trim().length > 20).length;
        if (answered === 0) {
          setBusy(false);
          return setError("Please write at least one considered answer.");
        }
        await supabase.from("test_attempts").insert({
          user_id: user.id,
          course_slug: course.slug,
          test_id: test.id,
          kind: "written",
          answers: test.questions.map((q: string, i: number) => ({ question: q, answer: answers[i] ?? "" })),
          score: answered,
          total: test.questions.length,
        });
        await awardBadge(user.id, "written-test");
      } else {
        if (!file) {
          setBusy(false);
          return setError("Please choose a recording to upload.");
        }
        const path = `${user.id}/${course.slug}/${test.id}-${Date.now()}-${file.name}`;
        const { error: upErr } = await supabase.storage
          .from("practice-recordings")
          .upload(path, file, { upsert: false });
        if (upErr) throw upErr;
        await supabase.from("practice_submissions").insert({
          user_id: user.id,
          course_slug: course.slug,
          test_id: test.id,
          storage_path: path,
          note: answers[1] ?? "",
          status: "submitted",
        });
        await awardBadge(user.id, "practice-test");
      }
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
    }
    setBusy(false);
  };

  if (!ready || loading) return <Shell title="One moment…" />;
  if (!user)
    return (
      <Shell title="Sign in to take this test">
        <Link
          to="/auth"
          search={{ redirect: `/courses/${course.slug}/test/${test.id}` }}
          className="inline-block rounded-full bg-forest px-8 py-4 text-[0.74rem] tracking-[0.16em] uppercase text-primary-foreground hover:bg-gold hover:text-ink"
        >
          Sign in
        </Link>
      </Shell>
    );
  if (!enrollment)
    return (
      <Shell title="This test belongs to an enrolled program">
        <Link
          to="/courses/$slug/enroll"
          params={{ slug: course.slug }}
          className="inline-block rounded-full bg-forest px-8 py-4 text-[0.74rem] tracking-[0.16em] uppercase text-primary-foreground hover:bg-gold hover:text-ink"
        >
          Enrol now
        </Link>
      </Shell>
    );

  if (done)
    return (
      <Shell title="Received — thank you">
        <p className="mb-10 text-[0.98rem] leading-relaxed text-muted-foreground">
          Your teacher will read this and reply in your lesson thread. Nothing here is public.
        </p>
        <button
          onClick={() => navigate({ to: "/courses/$slug/videos", params: { slug: course.slug } })}
          className="rounded-full bg-forest px-8 py-4 text-[0.74rem] tracking-[0.16em] uppercase text-primary-foreground hover:bg-gold hover:text-ink"
        >
          Back to lessons
        </button>
      </Shell>
    );

  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <div className="absolute inset-0 bg-forest" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
          <Link
            to="/courses/$slug/videos"
            params={{ slug: course.slug }}
            className="text-[0.72rem] tracking-[0.2em] uppercase text-ivory/70 hover:text-ivory"
          >
            ← Back to lessons
          </Link>
          <p className="mt-8 eyebrow text-ivory/60">
            {test.kind === "written" ? "Written test" : "Recorded practice test"} · {course.title}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ivory sm:text-6xl">
            {test.title}
          </h1>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="text-[0.98rem] leading-relaxed text-muted-foreground">{test.intro}</p>

          <div className="mt-12 space-y-10">
            {test.questions.map((q: string, i: number) => (
              <div key={q}>
                <p className="font-display text-xl leading-snug text-forest">
                  <span className="mr-3 text-gold">{String(i + 1).padStart(2, "0")}</span>
                  {q}
                </p>
                {test.kind === "practice" && i === 0 ? (
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                    className="mt-5 w-full rounded-xl border border-dashed border-border bg-card p-5 text-sm text-foreground"
                  />
                ) : (
                  <textarea
                    value={answers[i] ?? ""}
                    onChange={(e) => {
                      const next = [...answers];
                      next[i] = e.target.value;
                      setAnswers(next);
                    }}
                    rows={5}
                    placeholder="Write in your own words…"
                    className="mt-5 w-full rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>

          {error && <p className="mt-8 text-sm text-destructive">{error}</p>}

          <button
            onClick={submit}
            disabled={busy}
            className="mt-10 rounded-full bg-forest px-9 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-primary-foreground hover:bg-gold hover:text-ink disabled:opacity-60"
          >
            {busy ? "Sending…" : "Submit to my teacher"}
          </button>
        </div>
      </Section>
    </>
  );
}

function Shell({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <section className="flex min-h-screen items-center bg-sand/40 pt-[90px]">
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl leading-tight text-forest">{title}</h1>
        <div className="rule-gold mx-auto mt-7 mb-10" />
        {children}
      </div>
    </section>
  );
}
