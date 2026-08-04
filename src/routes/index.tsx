import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Section, SectionHeader } from "@/components/site/Section";
import { courses, sanskritQuotes, topicSections, slugify } from "@/lib/site-data";
import heroSunrise from "@/assets/hero-sunrise.jpg";
import river from "@/assets/river.jpg";
import founder from "@/assets/founder.jpg";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Rishi Sidhasamadhi Yoga Foundation | Practice, Wisdom, Community" },
      {
        name: "description",
        content:
          "A sanctuary for yoga and meditation â€” foundation courses, wellness programs, retreats and classical knowledge, offered in the spirit of the tradition.",
      },
      { property: "og:title", content: "Rishi Sidhasamadhi Yoga Foundation" },
      {
        property: "og:description",
        content:
          "Enter a peaceful place to practise, study and grow. Yoga, meditation, retreats and community.",
      },
    ],
  }),
  component: Home,
});

function Hero() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % sanskritQuotes.length), 9000);
    return () => clearInterval(id);
  }, []);
  const quote = sanskritQuotes[index];

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden">
      <img
        src={heroSunrise}
        alt="Sunrise over misty Himalayan mountain ridges"
        width={1920}
        height={1088}
        className="absolute inset-0 h-full w-full animate-slow-zoom object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.25 0.02 80 / 0.42) 0%, oklch(0.25 0.02 80 / 0.12) 38%, oklch(0.30 0.03 78 / 0.72) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-40 lg:px-10">
        <div className="grid items-end gap-16 lg:grid-cols-[1.15fr_1fr]">
          <div className="animate-rise">
            <p className="eyebrow text-ivory/70">Est. in the lineage of the Himalayan masters</p>
            <h1 className="mt-7 max-w-3xl font-display text-5xl leading-[1.04] text-ivory sm:text-7xl lg:text-[5.2rem]">
              Begin again,
              <span className="block italic text-ivory/85">with the morning.</span>
            </h1>
            <p className="mt-8 max-w-md text-[1.02rem] leading-relaxed text-ivory/80">
              A foundation for yoga, meditation and inner transformation â€” where practice is
              unhurried, wisdom is shared freely, and no one walks alone.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/courses"
                className="rounded-full bg-ivory px-8 py-4 text-[0.8rem] font-medium tracking-[0.14em] uppercase text-forest transition-all duration-500 hover:bg-gold hover:text-ink"
              >
                Begin your journey
              </Link>
              <Link
                to="/topics"
                className="rounded-full border border-ivory/45 px-8 py-4 text-[0.8rem] font-medium tracking-[0.14em] uppercase text-ivory transition-all duration-500 hover:border-ivory hover:bg-ivory/10"
              >
                Explore the wisdom
              </Link>
            </div>
          </div>

          {/* Sanskrit quote â€” always visible */}
          <div className="glass-panel rounded-3xl border border-ivory/25 p-8 shadow-lift sm:p-10">
            <p className="eyebrow">Verse of the morning</p>
            <p
              key={quote.sanskrit}
              className="font-sanskrit mt-6 animate-rise text-3xl leading-[1.8] text-forest sm:text-[2.5rem]"
            >
              {quote.sanskrit}
            </p>
            <p className="mt-3 text-sm italic tracking-wide text-earth">{quote.transliteration}</p>
            <div className="rule-gold my-6" />
            <p className="font-display text-xl leading-snug text-foreground">{quote.translation}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{quote.meaning}</p>
            <div className="mt-8 flex gap-2">
              {sanskritQuotes.map((q, i) => (
                <button
                  key={q.sanskrit}
                  aria-label={`Verse ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="h-1 w-10 rounded-full transition-colors"
                  style={{
                    background:
                      i === index
                        ? "var(--gold)"
                        : "color-mix(in oklab, var(--earth) 25%, transparent)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const whyYoga = [
  {
    title: "Peace",
    body: "A nervous system that stops bracing. Quiet that stays after the practice ends.",
  },
  {
    title: "Clarity",
    body: "Attention returns to one thing at a time â€” and life becomes legible again.",
  },
  {
    title: "Strength",
    body: "Not the strength of effort, but of ease: a body willing to carry your days.",
  },
  {
    title: "Meaning",
    body: "Practice opens a question worth living with. That question changes everything.",
  },
];

const challenges = [
  { n: "21", title: "Twenty-One Mornings", body: "One short practice, before the world wakes." },
  { n: "40", title: "Forty Days of Breath", body: "A single pranayama, deepened slowly." },
  { n: "07", title: "Seven Days of Silence", body: "A week of speaking less and hearing more." },
  { n: "30", title: "Thirty Nights of Rest", body: "Yoga Nidra until sleep returns on its own." },
];

const fourPaths = [
  { name: "Karma Yoga", sanskrit: "कर्म", body: "The path of selfless action and service." },
  {
    name: "Bhakti Yoga",
    sanskrit: "भक्ति",
    body: "The path of devotion, chant and surrender.",
  },
  {
    name: "Jnana Yoga",
    sanskrit: "ज्ञान",
    body: "The path of enquiry, study and discernment.",
  },
  {
    name: "Raja Yoga",
    sanskrit: "राज",
    body: "The path of meditation and inner discipline.",
  },
];

const pillars = [
  { title: "Practice", body: "Daily, simple, sustainable. Practice before philosophy." },
  { title: "Study", body: "Classical texts, taught plainly, without mystification." },
  { title: "Service", body: "Free programs for schools, hospitals and elders." },
  { title: "Community", body: "Circles that hold people through years, not weeks." },
];

const testimonials = [
  {
    quote:
      "I came for my back. I stayed because for the first time in years my mind stopped arguing with itself.",
    name: "Ananya R.",
    role: "Foundation Course, Bengaluru",
  },
  {
    quote:
      "The teachers never rushed me. Three years later I teach the same way â€” slowly, and with respect.",
    name: "Michael T.",
    role: "Teacher Training, 200hr",
  },
  {
    quote:
      "After the silence retreat I understood that peace was never somewhere else. It was waiting.",
    name: "Kavitha S.",
    role: "Meditation Retreat, Uttarkashi",
  },
];

function Home() {
  return (
    <>
      <Hero />

      {/* Why Yoga */}
      <Section>
        <div className="grid gap-16 lg:grid-cols-[1fr_1.15fr]">
          <SectionHeader
            eyebrow="Why Yoga"
            title={
              <>
                Not exercise.
                <span className="block italic text-earth">A way of meeting yourself.</span>
              </>
            }
            intro="Yoga was never designed to make the body impressive. It was designed to make the mind quiet enough to see clearly â€” and then to live from that clarity."
          />
          <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2">
            {whyYoga.map((w) => (
              <div key={w.title} className="bg-card p-10">
                <p className="font-display text-2xl text-forest">{w.title}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Categories */}
      <Section className="bg-sand/50">
        <SectionHeader
          eyebrow="Categories"
          title="Four doorways into the same room"
          intro="Enter wherever your life is asking you to enter. Every doorway leads inward."
          align="center"
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {topicSections.map((s) => (
            <Link
              key={s.key}
              to="/topics"
              className="sanctuary-card group flex flex-col justify-between p-10"
            >
              <div>
                <p className="eyebrow">{String(s.topics.length).padStart(2, "0")} pages</p>
                <p className="mt-5 font-display text-3xl leading-tight text-forest">{s.label}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{s.intro}</p>
              </div>
              <span className="mt-10 text-[0.72rem] tracking-[0.2em] uppercase text-earth">
                Enter â†’
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Challenges */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader
            eyebrow="Challenges"
            title="Small vows, kept quietly"
            intro="Transformation is rarely dramatic. It is a promise you keep on the mornings you do not feel like it."
          />
          <Link
            to="/dashboard"
            className="rounded-full border border-forest/25 px-7 py-3.5 text-[0.75rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-forest hover:text-primary-foreground"
          >
            Track in my journey
          </Link>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {challenges.map((c) => (
            <div key={c.n} className="sanctuary-card p-10">
              <p className="font-display text-6xl leading-none text-gold">{c.n}</p>
              <p className="mt-8 font-display text-2xl text-forest">{c.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Daily Practice */}
      <section className="relative overflow-hidden">
        <img
          src={river}
          alt="Forest river at sunrise"
          loading="lazy"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "oklch(0.28 0.03 150 / 0.66)" }} />
        <div className="relative mx-auto max-w-[1400px] px-6 py-32 lg:px-10">
          <div className="max-w-2xl">
            <p className="eyebrow text-ivory/70">Daily Practice</p>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-6xl">
              Twenty minutes, every morning, for the rest of your life.
            </h2>
            <div className="rule-gold mt-8" />
            <p className="mt-8 text-[1rem] leading-relaxed text-ivory/80">
              A guided sequence is released each dawn â€” asana, pranayama and a short sitting.
              Nothing to achieve. Only a place to return to.
            </p>
          </div>
          <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-ivory/20 bg-ivory/20 sm:grid-cols-3">
            {[
              { t: "05:30 Â· Awaken", b: "Gentle joint freeing and sun salutations." },
              { t: "05:50 Â· Breathe", b: "Nadi shodhana and a measured pranayama." },
              { t: "06:05 Â· Sit", b: "Fifteen minutes of unforced attention." },
            ].map((s) => (
              <div key={s.t} className="p-10" style={{ background: "oklch(0.24 0.03 150 / 0.55)" }}>
                <p className="font-display text-2xl text-ivory">{s.t}</p>
                <p className="mt-3 text-sm leading-relaxed text-ivory/70">{s.b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Four Paths */}
      <Section>
        <SectionHeader
          eyebrow="Four Paths"
          title="One summit. Four ways up the mountain."
          align="center"
        />
        <div className="mt-16 grid gap-8 lg:grid-cols-4">
          {fourPaths.map((p) => (
            <div key={p.name} className="sanctuary-card p-10 text-center">
              <p className="font-sanskrit text-5xl text-gold">{p.sanskrit}</p>
              <p className="mt-6 font-display text-2xl text-forest">{p.name}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Founder */}
      <Section className="bg-sand/50">
        <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1fr]">
          <div className="overflow-hidden rounded-3xl shadow-lift">
            <img
              src={founder}
              alt="Rishi Sidhasamadhi seated in meditation at dawn"
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
            <div className="rule-gold mt-7" />
            <p className="mt-8 font-display text-2xl leading-snug italic text-earth">
              â€œDo not seek peace in the mountains. Bring the mountain quiet into your kitchen,
              your work, your ordinary Tuesday.â€
            </p>
            <p className="mt-8 text-[0.98rem] leading-relaxed text-muted-foreground">
              He left home at nineteen and spent twenty-two years in the upper valleys, studying
              under teachers who asked for nothing but sincerity. He returned with a single
              instruction: give it away. The Foundation exists to keep that instruction.
            </p>
            <Link
              to="/about"
              className="mt-10 inline-block text-[0.75rem] tracking-[0.2em] uppercase text-forest underline-offset-8 hover:underline"
            >
              Read the full story
            </Link>
          </div>
        </div>
      </Section>

      {/* Mission */}
      <Section>
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Our Mission</p>
          <p className="mt-8 font-display text-3xl leading-[1.35] text-forest sm:text-[2.9rem]">
            To make the classical practices of yoga and meditation available to every person,
            without barrier of cost, geography or belief â€” and to hold them there, for
            generations.
          </p>
          <div className="rule-gold mx-auto mt-10" />
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-sand/50">
        <SectionHeader eyebrow="Voices" title="What practice made possible" align="center" />
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="sanctuary-card flex flex-col p-10">
              <p className="font-display text-5xl leading-none text-gold/70">â€</p>
              <blockquote className="mt-4 flex-1 font-display text-[1.45rem] leading-snug text-forest">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-6 text-sm">
                <span className="block font-medium text-foreground">{t.name}</span>
                <span className="text-muted-foreground">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Community */}
      <Section>
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeader
              eyebrow="Community"
              title="Nobody practises alone here"
              intro="Local circles, online satsangs, retreats and seva groups across 41 cities. Practice deepens when it is witnessed."
            />
            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { n: "120k", l: "Practitioners" },
                { n: "41", l: "City circles" },
                { n: "18", l: "Years of teaching" },
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
              alt="People practising yoga together at sunrise"
              loading="lazy"
              width={1600}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Join Us */}
      <Section className="bg-forest text-primary-foreground">
        <div className="grid items-end gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="eyebrow text-ivory/60">Join Us</p>
            <h2 className="mt-6 font-display text-4xl leading-tight text-ivory sm:text-6xl">
              The first step is smaller than you think.
            </h2>
            <p className="mt-8 max-w-lg text-[1rem] leading-relaxed text-ivory/75">
              Begin with the Foundation Course, or simply join a morning practice. There is no
              qualification required â€” only the willingness to sit down.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Link
              to="/courses/$slug"
              params={{ slug: "yoga-foundation-course" }}
              className="rounded-full bg-ivory px-8 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-gold hover:text-ink"
            >
              Enrol now
            </Link>
            <Link
              to="/events"
              className="rounded-full border border-ivory/40 px-8 py-4 text-[0.78rem] tracking-[0.16em] uppercase text-ivory transition-colors hover:bg-ivory/10"
            >
              Visit an event
            </Link>
          </div>
        </div>
      </Section>

      {/* Pillars */}
      <Section>
        <SectionHeader eyebrow="Our Pillars" title="What the Foundation stands on" />
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <div key={p.title} className="bg-card p-10">
              <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-5 font-display text-2xl text-forest">{p.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Breath Practice */}
      <Section className="bg-sand/50">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Breath Practice</p>
          <h2 className="mt-6 font-display text-4xl leading-tight text-forest sm:text-5xl">
            Try it now. It takes one minute.
          </h2>
          <div className="relative mx-auto mt-16 flex h-64 w-64 items-center justify-center">
            <span className="absolute inset-0 rounded-full border border-gold/30" />
            <span
              className="absolute h-40 w-40 animate-breathe rounded-full"
              style={{ background: "var(--gradient-sacred)", opacity: 0.85 }}
            />
            <span className="relative font-display text-xl tracking-[0.3em] uppercase text-ivory">
              Breathe
            </span>
          </div>
          <p className="mt-14 text-sm leading-relaxed text-muted-foreground">
            Inhale as the circle expands. Exhale as it settles. Four rounds is enough to change the
            afternoon â€” that is the whole teaching, offered for free.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {["Pranayama", "Yoga Nidra", "Mantra Practice"].map((t) => (
              <Link
                key={t}
                to="/topics/$slug"
                params={{ slug: slugify(t) }}
                className="rounded-full border border-border bg-card px-6 py-3 text-[0.78rem] tracking-wide text-forest transition-colors hover:border-gold"
              >
                {t}
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Courses teaser */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeader eyebrow="Courses" title="Where people usually begin" />
          <Link
            to="/courses"
            className="text-[0.75rem] tracking-[0.2em] uppercase text-earth underline-offset-8 hover:underline"
          >
            All 20 programs
          </Link>
        </div>
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {courses.slice(0, 3).map((c) => (
            <Link
              key={c.slug}
              to="/courses/$slug"
              params={{ slug: c.slug }}
              className="sanctuary-card flex flex-col p-10"
            >
              <p className="eyebrow">
                {c.level} Â· {c.duration}
              </p>
              <p className="mt-5 font-display text-3xl leading-tight text-forest">{c.title}</p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {c.purpose}
              </p>
              <span className="mt-8 text-[0.72rem] tracking-[0.2em] uppercase text-earth">
                View course â†’
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
