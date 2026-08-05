import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/Section";
import { courses } from "@/lib/site-data";
import { coursePriceLabel, getTests, getVideos } from "@/lib/learning";
import { useCourseProgress, useEnrollment } from "@/lib/learning-data";

export const Route = createFileRoute("/courses/$slug/videos/")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Lessons — ${loaderData.title} | Rishi Sidhasamadhi Yoga Foundation` },
          {
            name: "description",
            content: `Every recorded lesson in ${loaderData.title}, with duration, highlights, written reflections and a recorded practice test.`,
          },
          { property: "og:title", content: `Lessons — ${loaderData.title}` },
          { property: "og:description", content: loaderData.purpose },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Lessons | Rishi Sidhasamadhi Yoga Foundation" }],
  }),
  component: VideosIndex,
});

function VideosIndex() {
  const course = Route.useLoaderData();
  const videos = getVideos(course);
  const tests = getTests(course);
  const { enrollment, loading, user, ready } = useEnrollment(course.slug);
  const { completed } = useCourseProgress(course.slug);

  const done = completed.length;
  const percent = videos.length ? Math.round((done / videos.length) * 100) : 0;

  if (!ready || loading) {
    return <Gate title="Opening your library…" body="One moment while we find your place." />;
  }

  if (!user) {
    return (
      <Gate
        title="This library is for enrolled students"
        body="Sign in to open the lessons of this program."
        action={
          <Link
            to="/auth"
            search={{ redirect: `/courses/${course.slug}/videos` }}
            className="inline-block rounded-full bg-forest px-8 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-gold hover:text-ink"
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
        title="Enrol to open these lessons"
        body={`Tuition for ${course.title} is ${coursePriceLabel(course)} — one payment, lifetime access.`}
        action={
          <Link
            to="/courses/$slug/enroll"
            params={{ slug: course.slug }}
            className="inline-block rounded-full bg-forest px-8 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-gold hover:text-ink"
          >
            Enrol — {coursePriceLabel(course)}
          </Link>
        }
      />
    );
  }

  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <div className="absolute inset-0 bg-forest" />
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
          <Link
            to="/courses/$slug"
            params={{ slug: course.slug }}
            className="text-[0.72rem] tracking-[0.2em] uppercase text-ivory/70 hover:text-ivory"
          >
            ← {course.title}
          </Link>
          <h1 className="mt-8 max-w-3xl font-display text-5xl leading-[1.06] text-ivory sm:text-6xl">
            Your lesson library
          </h1>

          <div className="mt-12 max-w-xl">
            <div className="flex items-baseline justify-between text-ivory/80">
              <span className="eyebrow text-ivory/60">Progress</span>
              <span className="font-display text-2xl text-ivory">
                {done} / {videos.length} lessons
              </span>
            </div>
            <div className="mt-4 h-[3px] w-full bg-ivory/20">
              <div className="h-full bg-gold transition-all" style={{ width: `${percent}%` }} />
            </div>
          </div>

          {percent === 100 && (
            <Link
              to="/courses/$slug/complete"
              params={{ slug: course.slug }}
              className="mt-10 inline-block rounded-full bg-gold px-8 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-ink transition-colors hover:bg-ivory hover:text-forest"
            >
              See your course summary & certificate
            </Link>
          )}
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Recorded lessons"
          title="Watch in order, or wander"
          intro="Each lesson carries its own duration and highlights. Notes and questions live under every video."
        />

        <div className="mt-14 space-y-6">
          {videos.map((video, i) => {
            const isDone = completed.includes(video.id);
            const attached = tests.filter((t) => t.afterVideoId === video.id);
            return (
              <div key={video.id}>
                <Link
                  to="/courses/$slug/videos/$videoId"
                  params={{ slug: course.slug, videoId: video.id }}
                  className="sanctuary-card grid gap-8 overflow-hidden sm:grid-cols-[280px_1fr]"
                >
                  <div className="relative h-48 overflow-hidden sm:h-full">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      loading="lazy"
                      width={640}
                      height={360}
                      className="h-full w-full object-cover"
                    />
                    <span className="absolute bottom-3 right-3 rounded-full bg-ink/70 px-3 py-1 text-[0.68rem] tracking-wide text-ivory">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-8 sm:py-9 sm:pr-10">
                    <div className="flex items-center gap-4">
                      <span className="font-display text-2xl text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {isDone && (
                        <span className="rounded-full bg-forest/10 px-3 py-1 text-[0.62rem] tracking-[0.16em] uppercase text-forest">
                          Completed
                        </span>
                      )}
                    </div>
                    <p className="mt-4 font-display text-[1.7rem] leading-tight text-forest">
                      {video.title}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {video.description}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {video.highlights.map((h: string) => (
                        <li
                          key={h}
                          className="rounded-full border border-border px-3 py-1 text-[0.7rem] tracking-wide text-earth"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>

                {attached.map((t) => (
                  <Link
                    key={t.id}
                    to="/courses/$slug/test/$testId"
                    params={{ slug: course.slug, testId: t.id }}
                    className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-dashed border-gold/60 bg-gold/5 px-8 py-6 transition-colors hover:bg-gold/10"
                  >
                    <div>
                      <p className="eyebrow text-earth">
                        {t.kind === "written" ? "Written test" : "Recorded practice test"}
                      </p>
                      <p className="mt-2 font-display text-xl text-forest">{t.title}</p>
                    </div>
                    <span className="text-[0.72rem] tracking-[0.16em] uppercase text-earth">
                      {isDone ? "Begin →" : "Unlocks after the lesson above"}
                    </span>
                  </Link>
                ))}
              </div>
            );
          })}
        </div>
      </Section>
    </>
  );
}

function Gate({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen items-center bg-sand/40 pt-[90px]">
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <p className="eyebrow">The lesson library</p>
        <h1 className="mt-6 font-display text-4xl leading-tight text-forest">{title}</h1>
        <div className="rule-gold mx-auto mt-7" />
        <p className="mt-8 text-[0.98rem] leading-relaxed text-muted-foreground">{body}</p>
        {action && <div className="mt-10">{action}</div>}
      </div>
    </section>
  );
}
