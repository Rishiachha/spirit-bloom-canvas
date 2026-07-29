import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { allTopics, slugify, topicSections } from "@/lib/site-data";

export const Route = createFileRoute("/topics/$slug")({
  loader: ({ params }) => {
    const topic = allTopics.find((t) => t.slug === params.slug);
    if (!topic) throw notFound();
    const section = topicSections.find((s) => s.key === topic.sectionKey)!;
    return { topic, related: section.topics.filter((t) => slugify(t) !== topic.slug).slice(0, 6) };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.topic.title} | Rishi Sidhasamadhi Yoga Foundation` },
          {
            name: "description",
            content: `${loaderData.topic.title} — an unhurried, editorial guide from the ${loaderData.topic.section} library of the Rishi Sidhasamadhi Yoga Foundation.`,
          },
          { property: "og:title", content: `${loaderData.topic.title} | Rishi Sidhasamadhi Yoga` },
          {
            property: "og:description",
            content: `A quiet, well-made introduction to ${loaderData.topic.title.toLowerCase()}.`,
          },
        ]
      : [],
  }),
  component: TopicPage,
});

function TopicPage() {
  const { topic, related } = Route.useLoaderData();

  return (
    <>
      <Section className="pt-[190px] pb-16">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow">{topic.section}</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.06] text-forest sm:text-[4.2rem]">
            {topic.title}
          </h1>
          <div className="rule-gold mt-8" />
          <p className="mt-8 font-display text-[1.7rem] leading-snug text-earth">
            An unhurried reading on {topic.title.toLowerCase()} — where it comes from, what it asks
            of you, and how to begin without needing to believe anything first.
          </p>
          <p className="mt-8 text-xs tracking-[0.18em] uppercase text-muted-foreground">
            9 minute read · Foundation Library
          </p>
        </div>
      </Section>

      <Section className="py-0">
        <div className="mx-auto max-w-3xl">
          <div className="h-px w-full bg-border" />
        </div>
      </Section>

      <Section>
        <div className="mx-auto grid max-w-5xl gap-16 lg:grid-cols-[0.4fr_1fr]">
          <aside className="self-start lg:sticky lg:top-32">
            <p className="eyebrow mb-5">In this page</p>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              {["The beginning", "What it means", "The practice", "In daily life", "Going further"].map(
                (h) => (
                  <li key={h} className="border-l border-border pl-4">
                    {h}
                  </li>
                ),
              )}
            </ul>
          </aside>

          <article className="max-w-2xl">
            <p className="font-display text-2xl leading-relaxed text-forest">
              Every subject in this library is approached the same way: first the history, then the
              meaning, then the practice — and only then, what it might change in an ordinary week.
            </p>

            <h2 className="mt-14 font-display text-3xl text-forest">The beginning</h2>
            <p className="mt-5 leading-[1.85] text-foreground/80">
              {topic.title} did not arrive as a technique. It arrived as an answer to a question
              that people were already living inside — how to be steady when life is not. The
              earliest teachers wrote very little down, and what survives is deliberately spare:
              instructions meant to be filled in by experience rather than by explanation.
            </p>
            <p className="mt-5 leading-[1.85] text-foreground/80">
              What follows is not a summary of scripture. It is the shape of the subject as it is
              taught in this Foundation — plainly, without embellishment, and with the assumption
              that you will test everything against your own practice.
            </p>

            <blockquote className="my-12 border-l-2 border-gold pl-8">
              <p className="font-display text-2xl leading-snug italic text-earth">
                “Understanding follows practice. It has never once arrived before it.”
              </p>
            </blockquote>

            <h2 className="mt-14 font-display text-3xl text-forest">What it means</h2>
            <p className="mt-5 leading-[1.85] text-foreground/80">
              Stripped of its vocabulary, the teaching is simple: attention can be trained, and a
              trained attention changes the quality of everything it touches. The classical texts
              give this a hundred names. The experience underneath the names is remarkably
              consistent across centuries and cultures.
            </p>

            <h2 className="mt-14 font-display text-3xl text-forest">The practice</h2>
            <ul className="mt-6 space-y-4">
              {[
                "Choose a time you can protect. Consistency outperforms duration, always.",
                "Begin with the body, so the mind has somewhere honest to arrive.",
                "Keep the session shorter than your enthusiasm. Leave wanting more.",
                "Record nothing for the first month. Simply practise, and notice.",
              ].map((s, i) => (
                <li key={s} className="flex gap-5">
                  <span className="font-display text-xl text-gold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-[1.85] text-foreground/80">{s}</span>
                </li>
              ))}
            </ul>

            <h2 className="mt-14 font-display text-3xl text-forest">In daily life</h2>
            <p className="mt-5 leading-[1.85] text-foreground/80">
              The measure of this subject is never the mat. It is the pause before a difficult
              sentence, the sleep that comes without negotiation, the afternoon that does not
              collapse. If the practice is working, other people usually notice before you do.
            </p>

            <h2 className="mt-14 font-display text-3xl text-forest">Going further</h2>
            <p className="mt-5 leading-[1.85] text-foreground/80">
              When reading has taken you as far as reading can, join a guided program. A teacher's
              correction saves years, and a community makes the years pleasant.
            </p>

            <Link
              to="/courses"
              className="mt-10 inline-block rounded-full border border-forest/25 px-8 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-forest hover:text-primary-foreground"
            >
              Find a guided program
            </Link>
          </article>
        </div>
      </Section>

      <Section className="bg-sand/50">
        <p className="eyebrow">Continue reading</p>
        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r: string) => (
            <Link
              key={r}
              to="/topics/$slug"
              params={{ slug: slugify(r) }}
              className="bg-card px-9 py-8 transition-colors hover:bg-sand/70"
            >
              <span className="font-display text-xl text-forest">{r}</span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
