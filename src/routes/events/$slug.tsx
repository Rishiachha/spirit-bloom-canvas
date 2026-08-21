import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Section, SectionHeader } from "@/components/site/Section";
import { events } from "@/lib/site-data";
import { membershipPlans, rupees } from "@/lib/membership";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import community from "@/assets/community.jpg";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = events.find((e) => e.slug === params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Event unavailable" }, { name: "robots", content: "noindex" }],
      };
    }
    const { event } = loaderData;
    const title = `Participate — ${event.title} | Rishi Sidhasamadhi Yoga`;
    const description = `Register to join ${event.title} (${event.date}) online or in person at ${event.place}. Instructions, slots and what to bring.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  errorComponent: () => <EventFallback />,
  notFoundComponent: () => <EventFallback />,
  component: ParticipatePage,
});

function EventFallback() {
  return (
    <Section className="pt-[160px]">
      <SectionHeader eyebrow="Gatherings" title="This gathering could not be found" />
      <Link to="/events" className="mt-8 inline-block text-sm tracking-widest uppercase text-earth">
        Back to all events
      </Link>
    </Section>
  );
}

type Mode = "online" | "offline";

function ParticipatePage() {
  const { event } = Route.useLoaderData();
  const { user } = useSession();
  const allowsOnline = event.modes.includes("online");
  const [mode, setMode] = useState<Mode>(allowsOnline ? "online" : "offline");
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    city: "",
    participants: 1,
    experience_level: "beginner",
    slot_time: event.slots[0] ?? "",
    message: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ link: string | null; slot: string | null } | null>(null);

  const instructions = mode === "online" ? event.onlineInstructions : event.offlineInstructions;

  const accessLink = useMemo(
    () =>
      `https://live.rishisidhasamadhi.org/join/${event.slug}-${Math.random()
        .toString(36)
        .slice(2, 8)
        .toUpperCase()}`,
    [event.slug],
  );

  const set = (key: keyof typeof form, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.full_name.trim() || !form.email.trim()) {
      setError("Please share your name and email so we can send your confirmation.");
      return;
    }
    setSaving(true);
    const link = mode === "online" ? accessLink : null;
    const { error: insertError } = await supabase.from("event_registrations").insert({
      user_id: user?.id ?? null,
      event_slug: event.slug,
      full_name: form.full_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || null,
      city: form.city.trim() || null,
      mode,
      participants: Number(form.participants) || 1,
      experience_level: form.experience_level,
      slot_time: mode === "offline" ? form.slot_time : null,
      message: form.message.trim() || null,
      access_link: link,
    });
    setSaving(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setDone({ link, slot: mode === "offline" ? form.slot_time : null });
  }

  return (
    <>
      <section className="relative overflow-hidden pt-[90px]">
        <img
          src={community}
          alt={`Practitioners gathered for ${event.title}`}
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "oklch(0.28 0.03 150 / 0.72)" }} />
        <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
          <p className="eyebrow text-ivory/70">
            {event.kind} · {event.date}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-[1.08] text-ivory sm:text-6xl">
            {event.title}
          </h1>
          <p className="mt-6 max-w-xl text-[0.98rem] leading-relaxed text-ivory/80">{event.about}</p>
          <p className="mt-6 text-xs tracking-[0.18em] uppercase text-ivory/70">
            {event.place} · {event.contribution}
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionHeader eyebrow="Registration" title="How would you like to participate?" />

            {done ? (
              <div className="sanctuary-card mt-10 p-10">
                <p className="eyebrow">Confirmed</p>
                <p className="mt-4 font-display text-3xl text-forest">
                  Your place is held, {form.full_name.split(" ")[0]}.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  A confirmation has been recorded against {form.email}.
                </p>
                {done.link && (
                  <div className="mt-8 rounded-2xl border border-gold/40 bg-sand/50 p-6">
                    <p className="eyebrow">Your joining link</p>
                    <p className="mt-3 break-all font-mono text-sm text-forest">{done.link}</p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      The same link reaches your email and stays valid for this sitting.
                    </p>
                  </div>
                )}
                {done.slot && (
                  <div className="mt-8 rounded-2xl border border-forest/20 bg-sand/50 p-6">
                    <p className="eyebrow">Your booked slot</p>
                    <p className="mt-3 font-display text-2xl text-forest">{done.slot}</p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Carry this confirmation to the registration desk.
                    </p>
                  </div>
                )}
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to="/events"
                    className="rounded-full border border-forest/25 px-6 py-3 text-[0.74rem] tracking-[0.16em] uppercase text-forest hover:bg-forest hover:text-primary-foreground"
                  >
                    Other gatherings
                  </Link>
                  <Link
                    to="/membership"
                    className="rounded-full border border-gold/50 px-6 py-3 text-[0.74rem] tracking-[0.16em] uppercase text-earth hover:bg-gold/10"
                  >
                    Explore membership
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="sanctuary-card mt-10 space-y-7 p-10">
                <div className="flex flex-wrap gap-3">
                  {(["online", "offline"] as Mode[])
                    .filter((m) => event.modes.includes(m))
                    .map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`rounded-full border px-6 py-3 text-[0.74rem] tracking-[0.16em] uppercase transition-colors ${
                          mode === m
                            ? "border-forest bg-forest text-primary-foreground"
                            : "border-border text-earth hover:border-forest/40"
                        }`}
                      >
                        {m === "online" ? "Join online" : "Attend in person"}
                      </button>
                    ))}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full name">
                    <input
                      required
                      value={form.full_name}
                      onChange={(e) => set("full_name", e.target.value)}
                      className="field"
                      placeholder="As you would like to be called"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      className="field"
                      placeholder="you@example.com"
                    />
                  </Field>
                  <Field label="Phone">
                    <input
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className="field"
                      placeholder="Optional"
                    />
                  </Field>
                  <Field label="City">
                    <input
                      value={form.city}
                      onChange={(e) => set("city", e.target.value)}
                      className="field"
                      placeholder="Where you practise from"
                    />
                  </Field>
                  <Field label="People joining">
                    <input
                      type="number"
                      min={1}
                      max={20}
                      value={form.participants}
                      onChange={(e) => set("participants", Number(e.target.value))}
                      className="field"
                    />
                  </Field>
                  <Field label="Experience">
                    <select
                      value={form.experience_level}
                      onChange={(e) => set("experience_level", e.target.value)}
                      className="field"
                    >
                      <option value="beginner">New to practice</option>
                      <option value="practising">Practising a while</option>
                      <option value="teacher">Teaching already</option>
                    </select>
                  </Field>
                </div>

                {mode === "offline" && (
                  <Field label="Choose your slot">
                    <select
                      value={form.slot_time}
                      onChange={(e) => set("slot_time", e.target.value)}
                      className="field"
                    >
                      {event.slots.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </Field>
                )}

                <Field label="Anything we should know?">
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    className="field"
                    placeholder="Injuries, a chair instead of floor seating, travelling with family…"
                  />
                </Field>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-full bg-forest px-8 py-4 text-[0.76rem] tracking-[0.18em] uppercase text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {saving
                    ? "Holding your place…"
                    : mode === "online"
                      ? "Register & get joining link"
                      : "Register & book my slot"}
                </button>
                <p className="text-xs text-muted-foreground">
                  {mode === "online"
                    ? "Your joining link is issued the moment you register."
                    : "Slots are limited; the desk confirms your seat on arrival."}
                </p>
              </form>
            )}
          </div>

          <aside className="space-y-8">
            <div className="sanctuary-card p-9">
              <p className="eyebrow">{mode === "online" ? "Online instructions" : "On-site instructions"}</p>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {instructions.map((i) => (
                  <li key={i} className="border-b border-border/60 pb-3 last:border-0">
                    {i}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sanctuary-card p-9">
              <p className="eyebrow">What to bring</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {event.bring.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-border px-3 py-1 text-[0.72rem] tracking-wide text-earth"
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-xs tracking-[0.16em] uppercase text-earth">
                Timings · {event.slots.join(" / ")}
              </p>
            </div>

            <div className="sanctuary-card p-9">
              <p className="eyebrow">Members attend differently</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {membershipPlans[2].name} members hold priority slots at every gathering and enter
                all monthly intensives without a fee — from {rupees(membershipPlans[0].priceInr)} a
                year.
              </p>
              <Link
                to="/membership"
                className="mt-6 inline-block text-[0.74rem] tracking-[0.16em] uppercase text-gold hover:text-gold/80"
              >
                See membership levels
              </Link>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
    </label>
  );
}
