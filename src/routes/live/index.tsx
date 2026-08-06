import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/Section";
import { useLiveSessions, sessionStatus, formatWhen } from "@/lib/live";
import river from "@/assets/river.jpg";

export const Route = createFileRoute("/live/")({
  head: () => ({
    meta: [
      { title: "Live Sessions | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content:
          "Join live pranayama, sadhana and meditation sessions with the teacher — ask questions, take notes and practise alongside the community.",
      },
      { property: "og:title", content: "Live Sessions | Rishi Sidhasamadhi Yoga" },
      {
        property: "og:description",
        content: "Practise live with the teacher — questions, chat and notes in one room.",
      },
    ],
  }),
  component: LiveIndex,
});

function LiveIndex() {
  const { sessions, loading } = useLiveSessions();

  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <img
          src={river}
          alt="River at dawn"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "oklch(0.3 0.03 150 / 0.62)" }} />
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
          <p className="eyebrow text-ivory/70">Live with the teacher</p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.07] text-ivory sm:text-6xl">
            The room is open twice a week.
          </h1>
          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-ivory/80">
            A live session is not a recording. You can raise a hand, ask a question mid-practice,
            and keep your own notes while the teacher speaks.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Schedule"
          title="Upcoming live rooms"
          intro="Sessions open fifteen minutes before the hour. Everything you write stays with you."
        />
        {loading ? (
          <p className="mt-14 eyebrow">Opening the schedule…</p>
        ) : (
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {sessions.map((s) => {
              const status = sessionStatus(s);
              return (
                <Link
                  key={s.id}
                  to="/live/$slug"
                  params={{ slug: s.slug }}
                  className="sanctuary-card flex flex-col p-9"
                >
                  <p className="eyebrow flex items-center gap-2">
                    {status === "live" && (
                      <span className="inline-flex h-2 w-2 rounded-full bg-gold animate-breathe" />
                    )}
                    {status === "live" ? "Live now" : status === "soon" ? "Upcoming" : "Ended"}
                  </p>
                  <p className="mt-5 font-display text-[1.7rem] leading-tight text-forest">
                    {s.title}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">{formatWhen(s.starts_at)}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {s.teacher} · {s.duration_minutes} min
                  </p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/80">
                    {s.description || "A guided live practice followed by open questions."}
                  </p>
                  <span className="mt-7 inline-block rounded-full border border-forest/25 px-6 py-3 text-[0.72rem] tracking-[0.16em] uppercase text-forest">
                    Enter the room
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
