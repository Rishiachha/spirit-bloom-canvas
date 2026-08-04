import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeader } from "@/components/site/Section";
import founder from "@/assets/founder.jpg";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/about/")({
  head: () => ({
    meta: [
      { title: "Our Story & Foundation | Rishi Sidhasamadhi Yoga" },
      {
        name: "description",
        content:
          "The story of Rishi Sidhasamadhi, the Foundation's mission and vision, its leadership, its community impact and how to connect with us.",
      },
      { property: "og:title", content: "Our Story | Rishi Sidhasamadhi Yoga Foundation" },
      {
        property: "og:description",
        content: "Founder storytelling, mission, vision, journey and community impact.",
      },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { y: "1983", t: "A departure", b: "A nineteen-year-old leaves home for the upper valleys." },
  { y: "1991", t: "The long study", b: "Eight years under three teachers, in near-total silence." },
  { y: "2007", t: "The return", b: "A single room in Rishikesh, six students, no fee." },
  { y: "2012", t: "The Foundation", b: "Formally established to keep the teaching free." },
  { y: "2019", t: "Beyond the ashram", b: "Programs enter schools, hospitals and prisons." },
  { y: "Today", t: "A living community", b: "120,000 practitioners across 41 city circles." },
];

function AboutPage() {
  return (
    <>
      <Section className="pt-[190px] pb-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Our Story</p>
          <h1 className="mt-6 font-display text-5xl leading-[1.07] text-forest sm:text-7xl">
            A teaching kept alive by giving it away.
          </h1>
          <div className="rule-gold mx-auto mt-8" />
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-[0.8fr_1fr]">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={founder}
              alt="Rishi Sidhasamadhi in meditation"
              loading="lazy"
              width={1024}
              height={1280}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">The Founder</p>
            <h2 className="mt-6 font-display text-4xl leading-tight text-forest sm:text-5xl">
              Rishi Sidhasamadhi
            </h2>
            <p className="mt-8 leading-[1.85] text-foreground/80">
              He rarely speaks about the years in the mountains. What he speaks about is the morning
              he came down: the noise of the town, the ordinariness of it, and the sudden certainty
              that the practice was meant for exactly that noise â€” not for the silence above it.
            </p>
            <p className="mt-5 leading-[1.85] text-foreground/80">
              The Foundation was built on that certainty. Practice belongs to householders,
              students, nurses, drivers and grandmothers. Anything that makes it precious or
              exclusive is a misunderstanding.
            </p>
          </div>
        </div>
      </Section>

      <Section id="foundation" className="bg-sand/50">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Mission</p>
            <p className="mt-6 font-display text-3xl leading-snug text-forest">
              To make the classical practices available to every person, without barrier of cost,
              geography or belief.
            </p>
          </div>
          <div>
            <p className="eyebrow">Vision</p>
            <p className="mt-6 font-display text-3xl leading-snug text-forest">
              A world where a quiet mind is considered as ordinary, and as necessary, as clean
              water.
            </p>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Journey" title="Forty years, told briefly" />
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {timeline.map((t) => (
            <div key={t.y} className="bg-card p-10">
              <p className="font-display text-4xl text-gold">{t.y}</p>
              <p className="mt-6 font-display text-2xl text-forest">{t.t}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.b}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="leadership" className="bg-sand/50">
        <SectionHeader
          eyebrow="Leadership"
          title="The people who hold the work"
          intro="Teachers, trustees and volunteers â€” all practising, all accountable to the same discipline they teach."
        />
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "Acharya Devendra", r: "Head of Practice" },
            { n: "Dr. Meera Iyer", r: "Research & Wellness" },
            { n: "Sadhvi Anandamayi", r: "Meditation & Retreats" },
            { n: "Rahul Nair", r: "Community & Seva" },
          ].map((p) => (
            <div key={p.n} className="sanctuary-card p-9">
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/50 font-display text-xl text-earth">
                {p.n.charAt(0)}
              </span>
              <p className="mt-8 font-display text-2xl leading-tight text-forest">{p.n}</p>
              <p className="mt-2 text-xs tracking-[0.16em] uppercase text-muted-foreground">
                {p.r}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="community">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeader
              eyebrow="Community Impact"
              title="What the community made possible"
              intro="All of it funded by donation, taught by volunteers, and offered without charge."
            />
            <div className="mt-12 grid grid-cols-2 gap-10">
              {[
                { n: "310", l: "Schools reached" },
                { n: "62k", l: "Free class hours" },
                { n: "1,400", l: "Teachers trained" },
                { n: "41", l: "City circles" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-4xl text-forest">{s.n}</p>
                  <p className="mt-2 text-xs tracking-[0.16em] uppercase text-muted-foreground">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={community}
              alt="Community yoga session at sunrise"
              loading="lazy"
              width={1600}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      <Section id="connect" className="bg-forest">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-ivory/60">Connect</p>
          <h2 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-6xl">
            Come and sit with us.
          </h2>
          <p className="mt-8 text-[1rem] leading-relaxed text-ivory/75">
            Foundation Ashram, Riverbank Road, Rishikesh Â· sanctuary@rishisidhasamadhi.org
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/events"
              className="rounded-full bg-ivory px-8 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-gold hover:text-ink"
            >
              Visit an event
            </Link>
            <Link
              to="/courses"
              className="rounded-full border border-ivory/40 px-8 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-ivory transition-colors hover:bg-ivory/10"
            >
              Study with us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
