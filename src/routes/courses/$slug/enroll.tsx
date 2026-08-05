import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { courses } from "@/lib/site-data";
import { coursePriceCents, formatPrice, getVideos } from "@/lib/learning";
import { useEnrollment, awardBadge } from "@/lib/learning-data";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/courses/$slug/enroll")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return course;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `Enrol — ${loaderData.title} | Rishi Sidhasamadhi Yoga Foundation` },
          {
            name: "description",
            content: `Complete your enrolment in ${loaderData.title} and open the full lesson library, tests and certificate.`,
          },
          { property: "og:title", content: `Enrol — ${loaderData.title}` },
          { property: "og:description", content: loaderData.purpose },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [{ title: "Enrol | Rishi Sidhasamadhi Yoga Foundation" }],
  }),
  component: EnrollPage,
});

function EnrollPage() {
  const course = Route.useLoaderData();
  const navigate = useNavigate();
  const { enrollment, loading, user, ready, refresh } = useEnrollment(course.slug);
  const cents = coursePriceCents(course);
  const videos = getVideos(course);

  const [card, setCard] = useState("");
  const [holder, setHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const digits = card.replace(/\s/g, "");

  const pay = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!user) return;
    if (holder.trim().length < 2) return setError("Please enter the name on the card.");
    if (digits.length < 12) return setError("Please enter a valid card number.");
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return setError("Expiry should look like 09/28.");
    if (cvv.length < 3) return setError("Please enter the security code.");

    setBusy(true);
    const { error: err } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_slug: course.slug,
      amount_cents: cents,
      currency: "INR",
      payment_provider: "foundation-desk",
      payment_reference: `RSY-${Date.now().toString(36).toUpperCase()}`,
      status: "active",
    });
    if (err) {
      setBusy(false);
      return setError(err.message);
    }
    await awardBadge(user.id, "first-step");
    await refresh();
    navigate({ to: "/courses/$slug/videos", params: { slug: course.slug } });
  };

  return (
    <section className="min-h-screen bg-sand/40 pt-[90px]">
      <div className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">
        <Link
          to="/courses/$slug"
          params={{ slug: course.slug }}
          className="text-[0.72rem] tracking-[0.2em] uppercase text-earth hover:text-forest"
        >
          ← Back to the program
        </Link>

        <div className="mt-10 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Payment */}
          <div className="rounded-3xl bg-card p-10 shadow-lift sm:p-14">
            <p className="eyebrow">Enrolment desk</p>
            <h1 className="mt-5 font-display text-4xl leading-tight text-forest sm:text-5xl">
              Complete your enrolment
            </h1>
            <div className="rule-gold mt-7" />

            {!ready || loading ? (
              <p className="mt-10 text-sm text-muted-foreground">One moment…</p>
            ) : !user ? (
              <div className="mt-10">
                <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                  Please sign in or create an account first — your enrolment, progress and
                  certificate are held against it.
                </p>
                <Link
                  to="/auth"
                  search={{ redirect: `/courses/${course.slug}/enroll` }}
                  className="mt-8 inline-block rounded-full bg-forest px-8 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-gold hover:text-ink"
                >
                  Sign in to continue
                </Link>
              </div>
            ) : enrollment ? (
              <div className="mt-10">
                <p className="text-[0.98rem] leading-relaxed text-muted-foreground">
                  You are already enrolled in this program. Your library is open.
                </p>
                <Link
                  to="/courses/$slug/videos"
                  params={{ slug: course.slug }}
                  className="mt-8 inline-block rounded-full bg-forest px-8 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-gold hover:text-ink"
                >
                  Enter the course
                </Link>
              </div>
            ) : (
              <form onSubmit={pay} className="mt-10 space-y-8">
                <Field label="Name on card" value={holder} onChange={setHolder} placeholder="Ananya Rao" />
                <Field
                  label="Card number"
                  value={card}
                  onChange={(v) =>
                    setCard(
                      v
                        .replace(/[^\d]/g, "")
                        .slice(0, 16)
                        .replace(/(.{4})/g, "$1 ")
                        .trim(),
                    )
                  }
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                />
                <div className="grid gap-8 sm:grid-cols-2">
                  <Field
                    label="Expiry"
                    value={expiry}
                    onChange={(v) => {
                      const d = v.replace(/[^\d]/g, "").slice(0, 4);
                      setExpiry(d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d);
                    }}
                    placeholder="09/28"
                    inputMode="numeric"
                  />
                  <Field
                    label="Security code"
                    value={cvv}
                    onChange={(v) => setCvv(v.replace(/[^\d]/g, "").slice(0, 4))}
                    placeholder="123"
                    inputMode="numeric"
                  />
                </div>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-full bg-forest px-8 py-5 text-[0.78rem] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-gold hover:text-ink disabled:opacity-60"
                >
                  {busy ? "Processing…" : `Pay ${formatPrice(cents)} and enter the course`}
                </button>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Payments are handled by the Foundation desk. If tuition is a barrier, write to us —
                  a full scholarship is granted on request, without explanation.
                </p>
              </form>
            )}
          </div>

          {/* Summary */}
          <aside className="h-fit rounded-3xl border border-border bg-sand/60 p-10 sm:p-12">
            <p className="eyebrow">Your order</p>
            <p className="mt-6 font-display text-3xl leading-tight text-forest">{course.title}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              {course.level} · {course.duration} · {videos.length} lessons
            </p>
            <div className="mt-9 space-y-4 border-y border-border py-8 text-sm">
              <Row label="Tuition" value={formatPrice(cents)} />
              <Row label="Lifetime access" value="Included" />
              <Row label="Teacher feedback" value="Included" />
              <Row label="Certificate" value="Included" />
            </div>
            <div className="mt-8 flex items-baseline justify-between">
              <span className="eyebrow">Total due</span>
              <span className="font-display text-4xl text-forest">{formatPrice(cents)}</span>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: "numeric";
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        value={value}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full border-b border-border bg-transparent pb-3 text-[0.95rem] text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-gold"
      />
    </label>
  );
}
