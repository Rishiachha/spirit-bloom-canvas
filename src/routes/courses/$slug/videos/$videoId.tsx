import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { courses } from "@/lib/site-data";
import { coursePriceLabel, getTests, getVideos } from "@/lib/learning";
import {
  awardBadge,
  logPracticeDay,
  markVideoComplete,
  useCourseProgress,
  useEnrollment,
} from "@/lib/learning-data";
import { supabase } from "@/integrations/supabase/client";
import { useCallback, useEffect, useState } from "react";

export const Route = createFileRoute("/courses/$slug/videos/$videoId")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    const videos = getVideos(course);
    const index = videos.findIndex((v) => v.id === params.videoId);
    if (index === -1) throw notFound();
    return { course, video: videos[index]!, index, total: videos.length };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.video.title} | Rishi Sidhasamadhi Yoga Foundation` },
          { name: "description", content: loaderData.video.description },
          { property: "og:title", content: `${loaderData.video.title} | Rishi Sidhasamadhi Yoga` },
          { property: "og:description", content: loaderData.video.description },
          { property: "og:type", content: "video.other" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Lesson | Rishi Sidhasamadhi Yoga Foundation" }],
  }),
  component: VideoPlayerPage,
});

type QuestionRow = { id: string; user_id: string; body: string; created_at: string };
type AnswerRow = { id: string; question_id: string; user_id: string; body: string };

function VideoPlayerPage() {
  const { course, video, index, total } = Route.useLoaderData();
  const navigate = useNavigate();
  const videos = getVideos(course);
  const tests = getTests(course);
  const { enrollment, loading, user, ready } = useEnrollment(course.slug);
  const { completed, refresh: refreshProgress } = useCourseProgress(course.slug);

  const [notes, setNotes] = useState("");
  const [noteSaved, setNoteSaved] = useState<string | null>(null);
  const [questions, setQuestions] = useState<QuestionRow[]>([]);
  const [answers, setAnswers] = useState<AnswerRow[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [busy, setBusy] = useState(false);

  const isDone = completed.includes(video.id);
  const nextVideo = videos[index + 1];
  const attachedTest = tests.find((t) => t.afterVideoId === video.id);

  const loadThread = useCallback(async () => {
    const { data: qs } = await supabase
      .from("lesson_questions")
      .select("id, user_id, body, created_at")
      .eq("course_slug", course.slug)
      .eq("video_id", video.id)
      .order("created_at", { ascending: true });
    setQuestions(qs ?? []);
    const ids = (qs ?? []).map((q) => q.id);
    if (ids.length) {
      const { data: as } = await supabase
        .from("lesson_answers")
        .select("id, question_id, user_id, body")
        .in("question_id", ids);
      setAnswers(as ?? []);
    } else {
      setAnswers([]);
    }
  }, [course.slug, video.id]);

  useEffect(() => {
    if (!user) return;
    void loadThread();
    void supabase
      .from("lesson_notes")
      .select("body")
      .eq("user_id", user.id)
      .eq("course_slug", course.slug)
      .eq("video_id", video.id)
      .maybeSingle()
      .then(({ data }) => setNotes(data?.body ?? ""));
  }, [user, course.slug, video.id, loadThread]);

  const saveNote = async () => {
    if (!user || !notes.trim()) return;
    setBusy(true);
    await supabase.from("lesson_notes").upsert(
      {
        user_id: user.id,
        course_slug: course.slug,
        video_id: video.id,
        body: notes,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,course_slug,video_id" },
    );
    await awardBadge(user.id, "note-taker");
    setBusy(false);
    setNoteSaved("Saved to your journal.");
    setTimeout(() => setNoteSaved(null), 2500);
  };

  const askQuestion = async () => {
    if (!user || !newQuestion.trim()) return;
    setBusy(true);
    await supabase.from("lesson_questions").insert({
      user_id: user.id,
      course_slug: course.slug,
      video_id: video.id,
      body: newQuestion.trim(),
    });
    await awardBadge(user.id, "curious-mind");
    setNewQuestion("");
    await loadThread();
    setBusy(false);
  };

  const complete = async () => {
    if (!user) return;
    setBusy(true);
    await markVideoComplete(user.id, course.slug, video.id);
    await logPracticeDay(user.id);
    await awardBadge(user.id, "first-lesson");
    if (index + 1 >= Math.ceil(total / 2)) await awardBadge(user.id, "halfway");
    if (index + 1 === total) await awardBadge(user.id, "course-complete");
    await refreshProgress();
    setBusy(false);
    if (nextVideo) {
      navigate({
        to: "/courses/$slug/videos/$videoId",
        params: { slug: course.slug, videoId: nextVideo.id },
      });
    } else {
      navigate({ to: "/courses/$slug/complete", params: { slug: course.slug } });
    }
  };

  if (!ready || loading) {
    return <Gate title="One moment…" body="Finding your place in this program." />;
  }
  if (!user) {
    return (
      <Gate
        title="Sign in to watch"
        body="This lesson is part of an enrolled program."
        action={
          <Link
            to="/auth"
            search={{ redirect: `/courses/${course.slug}/videos/${video.id}` }}
            className="inline-block rounded-full bg-forest px-8 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-primary-foreground hover:bg-gold hover:text-ink"
          >
            Sign in
          </Link>
        }
      />
    );
  }
  if (!enrollment) {
    return (
      <Gate
        title="Enrol to watch this lesson"
        body={`Tuition for ${course.title} is ${coursePriceLabel(course)}.`}
        action={
          <Link
            to="/courses/$slug/enroll"
            params={{ slug: course.slug }}
            className="inline-block rounded-full bg-forest px-8 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-primary-foreground hover:bg-gold hover:text-ink"
          >
            Enrol now
          </Link>
        }
      />
    );
  }

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
            Lesson {index + 1} of {total} · {course.title}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.08] text-ivory sm:text-6xl">
            {video.title}
          </h1>
        </div>
      </section>

      <Section className="py-0 pt-14">
        <div className="mx-auto max-w-5xl">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-forest">
            <div className="flex h-full flex-col items-center justify-center gap-4">
              <span className="text-6xl text-ivory/60">▶</span>
              <p className="text-sm text-ivory/60">{video.duration} · guided session</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              onClick={complete}
              disabled={busy}
              className="rounded-full bg-forest px-8 py-4 text-[0.74rem] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-gold hover:text-ink disabled:opacity-60"
            >
              {isDone ? "Marked complete — continue" : "Mark complete & log today's practice"}
            </button>
            {nextVideo && (
              <Link
                to="/courses/$slug/videos/$videoId"
                params={{ slug: course.slug, videoId: nextVideo.id }}
                className="text-[0.74rem] tracking-[0.16em] uppercase text-earth hover:text-forest"
              >
                Next: {nextVideo.title} →
              </Link>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow">About this lesson</p>
          <p className="mt-6 font-display text-2xl leading-relaxed text-forest">
            {video.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {video.highlights.map((h: string) => (
              <span
                key={h}
                className="rounded-full border border-border px-3 py-1 text-[0.7rem] tracking-wide text-earth"
              >
                {h}
              </span>
            ))}
          </div>

          {attachedTest && (
            <Link
              to="/courses/$slug/test/$testId"
              params={{ slug: course.slug, testId: attachedTest.id }}
              className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-gold/60 bg-gold/5 px-8 py-6 hover:bg-gold/10"
            >
              <div>
                <p className="eyebrow text-earth">
                  {attachedTest.kind === "written" ? "Written test" : "Recorded practice test"}
                </p>
                <p className="mt-2 font-display text-xl text-forest">{attachedTest.title}</p>
              </div>
              <span className="text-[0.72rem] tracking-[0.16em] uppercase text-earth">Begin →</span>
            </Link>
          )}
        </div>
      </Section>

      {/* Notes */}
      <Section className="bg-sand/50">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Your private notes</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Only you can read these. They stay with the lesson.
          </p>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What did you notice today?"
            className="mt-6 w-full rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
            rows={7}
          />
          <div className="mt-4 flex items-center gap-5">
            <button
              onClick={saveNote}
              disabled={busy}
              className="rounded-full bg-forest px-7 py-3 text-[0.72rem] tracking-[0.14em] uppercase text-primary-foreground hover:bg-gold hover:text-ink disabled:opacity-60"
            >
              Save note
            </button>
            {noteSaved && <span className="text-sm text-earth">{noteSaved}</span>}
          </div>
        </div>
      </Section>

      {/* Q&A */}
      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Questions & answers</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Ask anything about this lesson. A teacher replies in the thread.
          </p>

          <div className="mt-10 space-y-6">
            {questions.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No questions yet on this lesson — yours can be the first.
              </p>
            )}
            {questions.map((q) => {
              const replies = answers.filter((a) => a.question_id === q.id);
              return (
                <div key={q.id} className="sanctuary-card p-9">
                  <p className="font-display text-lg text-forest">{q.body}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    — {q.user_id === user.id ? "You" : "A student"} ·{" "}
                    {new Date(q.created_at).toLocaleDateString()}
                  </p>
                  {replies.length === 0 ? (
                    <p className="mt-5 text-xs tracking-widest uppercase text-earth/70">
                      Awaiting the teacher's response
                    </p>
                  ) : (
                    replies.map((a) => (
                      <div key={a.id} className="mt-5 border-l-2 border-gold pl-6">
                        <p className="text-sm leading-relaxed text-foreground/80">{a.body}</p>
                        <p className="mt-2 text-xs tracking-widest uppercase text-earth">
                          Teacher's response
                        </p>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12">
            <p className="font-display text-xl text-forest">Ask a question</p>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your question…"
              className="mt-4 w-full rounded-xl border border-border bg-card p-5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              rows={4}
            />
            <button
              onClick={askQuestion}
              disabled={busy}
              className="mt-4 rounded-full bg-forest px-7 py-3 text-[0.72rem] tracking-[0.14em] uppercase text-primary-foreground hover:bg-gold hover:text-ink disabled:opacity-60"
            >
              Submit question
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}

function Gate({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) {
  return (
    <section className="flex min-h-screen items-center bg-sand/40 pt-[90px]">
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-display text-4xl leading-tight text-forest">{title}</h1>
        <div className="rule-gold mx-auto mt-7" />
        <p className="mt-8 text-[0.98rem] leading-relaxed text-muted-foreground">{body}</p>
        {action && <div className="mt-10">{action}</div>}
      </div>
    </section>
  );
}
