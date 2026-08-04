import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { courses } from "@/lib/site-data";
import { useState } from "react";

export const Route = createFileRoute("/courses/$slug/videos/$videoId")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    const video = course.videos?.find((v) => v.id === params.videoId);
    if (!video) throw notFound();
    return { course, video };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.video.title} | Rishi Sidhasamadhi Yoga Foundation` },
          { name: "description", content: loaderData.video.description },
          { property: "og:title", content: `${loaderData.video.title} | Rishi Sidhasamadhi Yoga` },
        ]
      : [],
  }),
  component: VideoPlayerPage,
});

function VideoPlayerPage() {
  const { course, video } = Route.useLoaderData();
  const [notes, setNotes] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, author: "Sarah M.", text: "How often should I practice this sequence?", answer: "We recommend 3–4 times per week for best results.", answered: true },
    { id: 2, author: "David K.", text: "Can I do this if I have a knee injury?", answer: "Yes — we offer modifications for every posture. Please check the modifications section.", answered: true },
  ]);
  const [newQuestion, setNewQuestion] = useState("");
  const [showNotes, setShowNotes] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <div className="absolute inset-0 bg-forest" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10">
          <Link
            to="/courses/$slug/videos/"
            params={{ slug: course.slug }}
            className="text-[0.72rem] tracking-[0.2em] uppercase text-ivory/70 hover:text-ivory"
          >
            ← Back to videos
          </Link>
          <h1 className="mt-8 font-display text-5xl leading-[1.06] text-ivory sm:text-7xl">
            {video.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-6">
            <span className="eyebrow">{video.duration}</span>
            <span className="text-ivory/50">·</span>
            <span className="eyebrow">{course.title}</span>
          </div>
        </div>
      </section>

      <Section className="py-0">
        <div className="mx-auto max-w-5xl">
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-forest/20">
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <span className="text-6xl text-ivory/50">▶</span>
                <p className="mt-4 text-sm text-ivory/60">Video player placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-5xl">
          <p className="font-display text-2xl leading-relaxed text-forest">
            {video.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {video.highlights.map((h) => (
              <span
                key={h}
                className="rounded-full border border-border px-3 py-1 text-[0.7rem] tracking-wide text-earth"
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-sand/50">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Your notes</p>
            <button
              onClick={() => setShowNotes(!showNotes)}
              className="text-[0.72rem] tracking-[0.16em] uppercase text-earth hover:text-forest"
            >
              {showNotes ? "Hide" : "Write a note"}
            </button>
          </div>
          {showNotes && (
            <div className="mt-6">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write your notes here..."
                className="w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
                rows={6}
              />
              <button className="mt-4 rounded-full bg-forest px-6 py-3 text-[0.72rem] font-medium tracking-wide text-ivory transition-colors hover:bg-forest/80">
                Save note
              </button>
            </div>
          )}
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">Questions & answers</p>
          <div className="mt-8 space-y-6">
            {questions.map((q) => (
              <div key={q.id} className="sanctuary-card p-9">
                <p className="font-display text-lg text-forest">{q.text}</p>
                <p className="mt-2 text-xs text-muted-foreground">— {q.author}</p>
                {q.answered && (
                  <div className="mt-5 border-l-2 border-gold pl-6">
                    <p className="text-sm leading-relaxed text-foreground/80">{q.answer}</p>
                    <p className="mt-2 text-xs tracking-widest uppercase text-earth">Teacher's response</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="font-display text-xl text-forest">Ask a question</p>
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your question..."
              className="mt-4 w-full rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none"
              rows={4}
            />
            <button
              onClick={() => {
                if (newQuestion.trim()) {
                  setQuestions([
                    ...questions,
                    {
                      id: questions.length + 1,
                      author: "You",
                      text: newQuestion,
                      answer: "",
                      answered: false,
                    },
                  ]);
                  setNewQuestion("");
                }
              }}
              className="mt-4 rounded-full bg-forest px-6 py-3 text-[0.72rem] font-medium tracking-wide text-ivory transition-colors hover:bg-forest/80"
            >
              Submit question
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}