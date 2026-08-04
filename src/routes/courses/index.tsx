import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/Section";
import { courseGroups, courses } from "@/lib/site-data";
import river from "@/assets/river.jpg";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Courses & Programs | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content:
          "Twenty guided programs â€” foundation courses, teacher training, wellness programs, special programs and retreats, taught in the classical tradition.",
      },
      { property: "og:title", content: "Courses & Programs | Rishi Sidhasamadhi Yoga" },
      {
        property: "og:description",
        content: "Foundation courses, teacher training, wellness programs and retreats.",
      },
    ],
  }),
  component: CoursesIndex,
});

function CoursesIndex() {
  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <img
          src={river}
          alt="Sunlit forest river"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "oklch(0.28 0.03 150 / 0.7)" }} />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10">
          <p className="eyebrow text-ivory/70">The Learning Path</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.06] text-ivory sm:text-7xl">
            Study slowly. Practise daily. Change quietly.
          </h1>
          <p className="mt-8 max-w-xl text-[1rem] leading-relaxed text-ivory/80">
            Twenty programs, held by senior teachers, arranged so that a complete beginner and a
            practitioner of twenty years both have somewhere honest to stand.
          </p>
        </div>
      </section>

{courseGroups.map((group, gi) => (
        <Section key={group.key} className={gi % 2 === 1 ? "bg-sand/50" : ""}>
          <SectionHeader
            eyebrow={`${String(gi + 1).padStart(2, "0")} â€" Track`}
            title={group.label}
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {courses
              .filter((c) => c.group === group.key)
              .map((c) => (
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
                      {c.level} Â· {c.duration}
                    </p>
                    <p className="mt-5 font-display text-[1.7rem] leading-tight text-forest">
                      {c.title}
                    </p>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {c.purpose}
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {c.includes.slice(0, 3).map((i) => (
                        <li
                          key={i}
                          className="rounded-full border border-border px-3 py-1 text-[0.7rem] tracking-wide text-earth"
                        >
                          {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              ))}
          </div>
        </Section>
))}
     </>
   );
 }
