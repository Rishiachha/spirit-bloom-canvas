import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { courses } from "@/lib/site-data";
import { formatPrice } from "@/lib/learning";

export const Route = createFileRoute("/admin/people")({
  head: () => ({
    meta: [
      { title: "Members & Reviews | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content:
          "See every member, what they have paid for, how far they have practised, and review recorded practice tests.",
      },
      { property: "og:title", content: "Members & Reviews | Rishi Sidhasamadhi Yoga" },
      { property: "og:description", content: "Members, enrolments, progress and practice reviews." },
    ],
  }),
  component: AdminPeople,
});

type Profile = { id: string; display_name: string; email: string | null; created_at: string };
type Enrollment = { user_id: string; course_slug: string; amount_cents: number; created_at: string };
type Progress = { user_id: string; course_slug: string };
type Submission = {
  id: string;
  user_id: string;
  course_slug: string;
  test_id: string;
  storage_path: string;
  note: string | null;
  status: string;
  feedback: string | null;
  created_at: string;
};

function AdminPeople() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [subs, setSubs] = useState<Submission[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const load = async () => {
    const [p, e, pr, s] = await Promise.all([
      supabase.from("profiles").select("id, display_name, email, created_at").order("created_at", { ascending: false }),
      supabase.from("enrollments").select("user_id, course_slug, amount_cents, created_at"),
      supabase.from("video_progress").select("user_id, course_slug").eq("completed", true),
      supabase.from("practice_submissions").select("*").order("created_at", { ascending: false }),
    ]);
    setProfiles((p.data ?? []) as Profile[]);
    setEnrollments((e.data ?? []) as Enrollment[]);
    setProgress((pr.data ?? []) as Progress[]);
    setSubs((s.data ?? []) as Submission[]);
    setLoading(false);
  };

  useEffect(() => {
    void load();
  }, []);

  const review = async (id: string) => {
    const feedback = (drafts[id] ?? "").trim();
    if (!feedback) return;
    await supabase
      .from("practice_submissions")
      .update({ feedback: feedback.slice(0, 2000), status: "reviewed" })
      .eq("id", id);
    setDrafts((d) => ({ ...d, [id]: "" }));
    await load();
  };

  const openRecording = async (path: string) => {
    const { data } = await supabase.storage.from("practice-recordings").createSignedUrl(path, 600);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank", "noopener");
  };

  if (loading) return <p className="eyebrow">Reading the register…</p>;

  const filtered = profiles.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.display_name.toLowerCase().includes(q) || (p.email ?? "").toLowerCase().includes(q)
    );
  });

  const nameOf = (id: string) => profiles.find((p) => p.id === id)?.display_name ?? "Practitioner";
  const titleOf = (slug: string) => courses.find((c) => c.slug === slug)?.title ?? slug;

  return (
    <div className="space-y-10">
      <div className="sanctuary-card p-9">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Members ({profiles.length})</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Everyone who created an account, what they bought, and how far they have gone.
            </p>
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email"
            className="rounded-full border border-border bg-background/70 px-5 py-3 text-sm outline-none focus:border-forest/50"
          />
        </div>

        <div className="mt-7 divide-y divide-border">
          {filtered.map((p) => {
            const mine = enrollments.filter((e) => e.user_id === p.id);
            const lessons = progress.filter((x) => x.user_id === p.id).length;
            return (
              <div key={p.id} className="grid gap-3 py-5 md:grid-cols-[1.2fr_1.4fr_auto] md:items-center">
                <div>
                  <p className="font-display text-lg text-forest">{p.display_name}</p>
                  <p className="text-xs text-muted-foreground">{p.email}</p>
                  <p className="mt-1 text-[0.62rem] tracking-widest uppercase text-earth">
                    Joined {new Date(p.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-sm text-foreground/80">
                  {mine.length === 0 ? (
                    <span className="text-muted-foreground">No enrolments yet</span>
                  ) : (
                    mine.map((m) => (
                      <p key={m.course_slug}>
                        {titleOf(m.course_slug)} — {formatPrice(m.amount_cents)}
                      </p>
                    ))
                  )}
                </div>
                <div className="text-right text-xs tracking-widest uppercase text-earth">
                  {lessons} lessons done
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="sanctuary-card p-9">
        <p className="eyebrow">Recorded practice tests ({subs.length})</p>
        <div className="mt-7 space-y-8">
          {subs.length === 0 && (
            <p className="text-sm text-muted-foreground">No recordings submitted yet.</p>
          )}
          {subs.map((s) => (
            <div key={s.id} className="border-t border-border pt-6 first:border-0 first:pt-0">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <p className="font-display text-lg text-forest">
                  {nameOf(s.user_id)} — {titleOf(s.course_slug)}
                </p>
                <span className="text-[0.62rem] tracking-widest uppercase text-earth">
                  {s.status} · {new Date(s.created_at).toLocaleDateString()}
                </span>
              </div>
              {s.note && <p className="mt-2 text-sm text-muted-foreground">“{s.note}”</p>}
              <button
                onClick={() => openRecording(s.storage_path)}
                className="mt-4 rounded-full border border-forest/25 px-5 py-2.5 text-[0.7rem] tracking-[0.16em] uppercase text-forest hover:bg-forest hover:text-primary-foreground"
              >
                Watch recording
              </button>
              {s.feedback && (
                <p className="mt-4 rounded-[calc(var(--radius)/1.5)] bg-sand/60 p-4 text-sm text-foreground/85">
                  {s.feedback}
                </p>
              )}
              <div className="mt-4 flex gap-3">
                <input
                  value={drafts[s.id] ?? ""}
                  onChange={(e) => setDrafts((d) => ({ ...d, [s.id]: e.target.value }))}
                  maxLength={2000}
                  placeholder="Write your notes to this student…"
                  className="flex-1 rounded-full border border-border bg-background/70 px-5 py-3 text-sm outline-none focus:border-forest/50"
                />
                <button
                  onClick={() => review(s.id)}
                  className="rounded-full bg-forest px-6 py-3 text-[0.7rem] tracking-[0.16em] uppercase text-primary-foreground"
                >
                  Send feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
