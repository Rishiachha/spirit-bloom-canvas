import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/Section";
import { courses } from "@/lib/site-data";

export const Route = createFileRoute("/courses/$slug/videos/")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    if (!course.videos || course.videos.length === 0) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Videos | Rishi Sidhasamadhi Yoga Foundation` },
          { name: "description", content: loaderData.purpose },
          { property: "og:title", content: `${loaderData.title} Videos | Rishi Sidhasamadhi Yoga` },
        ]
      : [],
  }),
  component: CourseVideosPage,
});

function CourseVideosPage() {
  const course = Route.useLoaderData();

  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <div className="absolute inset-0 bg-forest" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10">
          <Link
            to="/courses"
            className="text-[0.72rem] tracking-[0.2em] uppercase text-ivory/70 hover:text-ivory"
          >
            ← All programs
          </Link>
          <h1 className="mt-8 font-display text-5xl leading-[1.06] text-ivory sm:text-7xl">
            {course.title}
          </h1>
          <p className="mt-8 max-w-xl text-[1rem] leading-relaxed text-ivory/80">
            {course.purpose}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-8">
            <Link
              to="/courses/$slug"
              params={{ slug: course.slug }}
              className="rounded-full bg-ivory px-8 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-gold hover:text-ink"
            >
              Enrol in this program
            </Link>
          </div>
        </div>
      </section>

      <Section className="py-20">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow">Video library</p>
          <h2 className="mt-4 font-display text-3xl text-forest">
            {course.videos.length} guided sessions
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {course.videos.map((video) => (
              <Link
                key={video.id}
                to="/courses/$slug/videos/$videoId"
                params={{ slug: course.slug, videoId: video.id }}
                className="sanctuary-card flex flex-col overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    loading="lazy"
                    width={640}
                    height={360}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ivory/90 text-forest">
                      ▶
                    </span>
                  </div>
                  <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-3 py-1 text-[0.7rem] text-ivory">
                    {video.duration}
                  </span>
                </div>
                <div className="p-9">
                  <p className="font-display text-xl text-forest">{video.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {video.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {video.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-border px-3 py-1 text-[0.65rem] tracking-wide text-earth"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}