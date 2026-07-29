import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/Section";
import { topicSections, slugify } from "@/lib/site-data";

export const Route = createFileRoute("/topics/")({
  head: () => ({
    meta: [
      { title: "Knowledge Library | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content:
          "A digital library on yoga, meditation and wellbeing — philosophy, history, practice and science, written plainly for every level of study.",
      },
      { property: "og:title", content: "Knowledge Library | Rishi Sidhasamadhi Yoga" },
      {
        property: "og:description",
        content: "Editorial pages on yoga, meditation, health and self-discovery.",
      },
    ],
  }),
  component: TopicsIndex,
});

function TopicsIndex() {
  return (
    <>
      <Section className="pt-[190px]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">The Knowledge Library</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.08] text-forest sm:text-7xl">
            A library, not a feed.
          </h1>
          <div className="rule-gold mx-auto mt-8" />
          <p className="mt-8 text-[1rem] leading-relaxed text-muted-foreground">
            Forty-four pages on yoga, meditation and wellbeing — written to be read the way a book
            is read, slowly and in order, with nothing sold in the margins.
          </p>
        </div>
      </Section>

      {topicSections.map((section, i) => (
        <Section key={section.key} id={section.key} className={i % 2 === 0 ? "bg-sand/50" : ""}>
          <div className="grid gap-16 lg:grid-cols-[1fr_1.6fr]">
            <SectionHeader
              eyebrow={`Section ${String(i + 1).padStart(2, "0")}`}
              title={section.label}
              intro={section.intro}
            />
            <ul className="grid gap-px self-start overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
              {section.topics.map((t) => (
                <li key={t}>
                  <Link
                    to="/topics/$slug"
                    params={{ slug: slugify(t) }}
                    className="group block bg-card px-8 py-7 transition-colors hover:bg-sand/70"
                  >
                    <span className="font-display text-xl text-forest">{t}</span>
                    <span className="mt-1 block text-[0.72rem] tracking-[0.16em] uppercase text-earth opacity-0 transition-opacity group-hover:opacity-100">
                      Read
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      ))}
    </>
  );
}
