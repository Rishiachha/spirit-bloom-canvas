import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/Section";
import { events } from "@/lib/site-data";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/events/")({
  head: () => ({
    meta: [
      { title: "Events, Retreats & Gatherings | Rishi Sidhasamadhi Yoga" },
      {
        name: "description",
        content:
          "International Yoga Day, Himalayan retreats, workshops and full-moon satsangs â€” gatherings where practice becomes community.",
      },
      { property: "og:title", content: "Events & Retreats | Rishi Sidhasamadhi Yoga" },
      {
        property: "og:description",
        content: "Retreats, workshops, Yoga Day and community satsangs through the year.",
      },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <img
          src={community}
          alt="Community practising yoga together at sunrise"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "oklch(0.3 0.03 90 / 0.55)" }} />
        <div className="relative mx-auto max-w-[1400px] px-6 py-28 lg:px-10">
          <p className="eyebrow text-ivory/70">Gatherings</p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl leading-[1.06] text-ivory sm:text-7xl">
            Practice alone deepens. Practice together lasts.
          </h1>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="The Year Ahead"
          title="Where the community meets"
          intro="Some gatherings fill a riverbank. Some fit in a courtyard. All of them are open."
        />
        <div className="mt-16 divide-y divide-border border-y border-border">
          {events.map((e) => (
            <article
              key={e.slug}
              className="group grid gap-6 py-12 transition-colors md:grid-cols-[0.5fr_1.4fr_auto] md:items-center"
            >
              <div>
                <p className="eyebrow">{e.kind}</p>
                <p className="mt-3 font-display text-3xl text-gold">{e.date}</p>
              </div>
              <div>
                <h3 className="font-display text-3xl leading-tight text-forest">{e.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {e.blurb}
                </p>
                <p className="mt-3 text-xs tracking-[0.16em] uppercase text-earth">{e.place}</p>
              </div>
              <Link
                to="/about"
                hash="connect"
                className="justify-self-start rounded-full border border-forest/25 px-7 py-3.5 text-[0.74rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-forest hover:text-primary-foreground md:justify-self-end"
              >
                Participate
              </Link>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-sand/50">
        <div className="grid gap-10 lg:grid-cols-3">
          {[
            {
              t: "Community",
              b: "Every gathering is hosted by local volunteers. There are no VIP rows and no reserved seats.",
            },
            {
              t: "Connection",
              b: "Shared meals follow every event. More friendships begin over rice than over asana.",
            },
            {
              t: "Celebration",
              b: "Chanting, music and silence â€” the tradition has always known how to celebrate quietly.",
            },
          ].map((c) => (
            <div key={c.t} className="sanctuary-card p-10">
              <p className="font-display text-3xl text-forest">{c.t}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{c.b}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
