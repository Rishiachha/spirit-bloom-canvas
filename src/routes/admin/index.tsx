import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/learning";
import { courses } from "@/lib/site-data";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Overview | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content: "Traffic, sign-ups, enrolments and revenue for the yoga foundation.",
      },
      { property: "og:title", content: "Admin Overview | Rishi Sidhasamadhi Yoga" },
      { property: "og:description", content: "Foundation console — visitors, members, revenue." },
    ],
  }),
  component: AdminOverview,
});

type Row = Record<string, unknown>;

function AdminOverview() {
  const [visits, setVisits] = useState<{ path: string; created_at: string; user_id: string | null }[]>([]);
  const [members, setMembers] = useState<Row[]>([]);
  const [enrollments, setEnrollments] = useState<
    { course_slug: string; amount_cents: number; created_at: string; user_id: string }[]
  >([]);
  const [progressCount, setProgressCount] = useState(0);
  const [certCount, setCertCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    void (async () => {
      const [v, p, e, pr, c] = await Promise.all([
        supabase.from("site_visits").select("path, created_at, user_id").order("created_at", { ascending: false }).limit(500),
        supabase.from("profiles").select("id, display_name, email, created_at").order("created_at", { ascending: false }),
        supabase.from("enrollments").select("course_slug, amount_cents, created_at, user_id").order("created_at", { ascending: false }),
        supabase.from("video_progress").select("id", { count: "exact", head: true }).eq("completed", true),
        supabase.from("certificates").select("id", { count: "exact", head: true }),
      ]);
      if (!active) return;
      setVisits(v.data ?? []);
      setMembers(p.data ?? []);
      setEnrollments(e.data ?? []);
      setProgressCount(pr.count ?? 0);
      setCertCount(c.count ?? 0);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <p className="eyebrow">Gathering the numbers…</p>;

  const revenue = enrollments.reduce((s, e) => s + e.amount_cents, 0);
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return {
      key,
      label: d.toLocaleDateString(undefined, { weekday: "short" }),
      visits: visits.filter((v) => v.created_at.slice(0, 10) === key).length,
      signups: members.filter((m) => String(m['created_at']).slice(0, 10) === key).length,
    };
  });
  const peak = Math.max(1, ...last7.map((d) => d.visits));

  const byCourse = Object.entries(
    enrollments.reduce<Record<string, { count: number; cents: number }>>((acc, e) => {
      const row = acc[e.course_slug] ?? { count: 0, cents: 0 };
      acc[e.course_slug] = { count: row.count + 1, cents: row.cents + e.amount_cents };
      return acc;
    }, {}),
  ).sort((a, b) => b[1].cents - a[1].cents);

  const stats = [
    { label: "Page views (recent)", value: visits.length.toLocaleString() },
    { label: "Accounts created", value: members.length.toLocaleString() },
    { label: "Paid enrolments", value: enrollments.length.toLocaleString() },
    { label: "Revenue", value: formatPrice(revenue) },
    { label: "Lessons completed", value: progressCount.toLocaleString() },
    { label: "Certificates issued", value: certCount.toLocaleString() },
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="sanctuary-card p-8">
            <p className="eyebrow">{s.label}</p>
            <p className="mt-4 font-display text-5xl text-forest">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="sanctuary-card p-9">
          <p className="eyebrow">Last seven days</p>
          <div className="mt-8 flex h-48 items-end gap-4">
            {last7.map((d) => (
              <div key={d.key} className="flex flex-1 flex-col items-center gap-3">
                <div
                  className="w-full rounded-t-md"
                  style={{
                    height: `${(d.visits / peak) * 100}%`,
                    minHeight: 4,
                    background: "var(--gradient-sacred)",
                  }}
                />
                <span className="text-[0.62rem] tracking-widest uppercase text-muted-foreground">
                  {d.label}
                </span>
                <span className="text-[0.62rem] text-earth">
                  {d.visits}v · {d.signups}n
                </span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">v = visits, n = new accounts</p>
        </div>

        <div className="sanctuary-card p-9">
          <p className="eyebrow">Revenue by program</p>
          <div className="mt-7 space-y-5">
            {byCourse.length === 0 && (
              <p className="text-sm text-muted-foreground">No enrolments yet.</p>
            )}
            {byCourse.slice(0, 8).map(([slug, v]) => (
              <div key={slug}>
                <div className="flex items-baseline justify-between">
                  <p className="text-sm text-forest">
                    {courses.find((c) => c.slug === slug)?.title ?? slug}
                  </p>
                  <span className="text-xs tracking-widest text-earth">
                    {v.count} · {formatPrice(v.cents)}
                  </span>
                </div>
                <div className="mt-2 h-1.5 w-full rounded-full bg-sand">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.max(6, (v.cents / (byCourse[0]?.[1].cents || 1)) * 100)}%`,
                      background: "var(--gradient-sacred)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sanctuary-card p-9">
        <p className="eyebrow">Most visited pages</p>
        <div className="mt-6 divide-y divide-border">
          {Object.entries(
            visits.reduce<Record<string, number>>((acc, v) => {
              acc[v.path] = (acc[v.path] ?? 0) + 1;
              return acc;
            }, {}),
          )
            .sort((a, b) => b[1] - a[1])
            .slice(0, 12)
            .map(([path, count]) => (
              <div key={path} className="flex items-center justify-between py-3">
                <span className="text-sm text-foreground/80">{path}</span>
                <span className="text-xs tracking-widest text-earth">{count}</span>
              </div>
            ))}
          {visits.length === 0 && (
            <p className="py-3 text-sm text-muted-foreground">No visits recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
