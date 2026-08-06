import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { courses } from "@/lib/site-data";
import { useRoles } from "@/lib/roles";
import { formatWhen } from "@/lib/live";

export const Route = createFileRoute("/admin/content")({
  head: () => ({
    meta: [
      { title: "Manage Courses & Live | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content: "Publish course videos and schedule live sessions for the yoga foundation.",
      },
      { property: "og:title", content: "Manage Courses & Live | Rishi Sidhasamadhi Yoga" },
      { property: "og:description", content: "Upload lessons and run live rooms." },
    ],
  }),
  component: AdminContent,
});

type CourseVideo = {
  id: string;
  course_slug: string;
  title: string;
  description: string;
  duration: string;
  video_url: string | null;
  thumbnail_url: string | null;
  highlights: string[];
  position: number;
};

type LiveRow = {
  id: string;
  slug: string;
  title: string;
  teacher: string;
  description: string;
  starts_at: string;
  duration_minutes: number;
  stream_url: string | null;
  is_live: boolean;
};

const field =
  "w-full rounded-[calc(var(--radius)/1.5)] border border-border bg-background/70 px-4 py-3 text-sm outline-none focus:border-forest/50";
const btn =
  "rounded-full bg-forest px-6 py-3 text-[0.72rem] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-forest/90 disabled:opacity-40";
const ghost =
  "rounded-full border border-forest/25 px-5 py-2.5 text-[0.7rem] tracking-[0.16em] uppercase text-forest hover:bg-forest hover:text-primary-foreground";

function AdminContent() {
  const { user } = useRoles();
  const [videos, setVideos] = useState<CourseVideo[]>([]);
  const [sessions, setSessions] = useState<LiveRow[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  const [v, setV] = useState({
    course_slug: courses[0]?.slug ?? "",
    title: "",
    description: "",
    duration: "15 min",
    video_url: "",
    thumbnail_url: "",
    highlights: "",
  });

  const [s, setS] = useState({
    slug: "",
    title: "",
    teacher: "Acharya Devendra",
    description: "",
    starts_at: "",
    duration_minutes: 60,
    stream_url: "",
  });

  const load = async () => {
    const [vr, sr] = await Promise.all([
      supabase.from("course_videos").select("*").order("course_slug").order("position"),
      supabase.from("live_sessions").select("*").order("starts_at"),
    ]);
    setVideos((vr.data ?? []) as CourseVideo[]);
    setSessions((sr.data ?? []) as LiveRow[]);
  };

  useEffect(() => {
    void load();
  }, []);

  const addVideo = async () => {
    if (!v.title.trim() || !user) return;
    setBusy(true);
    const { error } = await supabase.from("course_videos").insert({
      course_slug: v.course_slug,
      title: v.title.trim().slice(0, 160),
      description: v.description.trim().slice(0, 2000),
      duration: v.duration.trim() || "15 min",
      video_url: v.video_url.trim() || null,
      thumbnail_url: v.thumbnail_url.trim() || null,
      highlights: v.highlights
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean)
        .slice(0, 8),
      position: videos.filter((x) => x.course_slug === v.course_slug).length,
      created_by: user.id,
    });
    setBusy(false);
    setMessage(error ? error.message : "Lesson published.");
    if (!error) {
      setV({ ...v, title: "", description: "", video_url: "", thumbnail_url: "", highlights: "" });
      await load();
    }
  };

  const removeVideo = async (id: string) => {
    await supabase.from("course_videos").delete().eq("id", id);
    await load();
  };

  const addSession = async () => {
    if (!s.title.trim() || !s.starts_at) return;
    setBusy(true);
    const { error } = await supabase.from("live_sessions").insert({
      slug:
        s.slug.trim() ||
        s.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, ""),
      title: s.title.trim().slice(0, 160),
      teacher: s.teacher.trim(),
      description: s.description.trim().slice(0, 2000),
      starts_at: new Date(s.starts_at).toISOString(),
      duration_minutes: Number(s.duration_minutes) || 60,
      stream_url: s.stream_url.trim() || null,
    });
    setBusy(false);
    setMessage(error ? error.message : "Live session scheduled.");
    if (!error) {
      setS({ ...s, slug: "", title: "", description: "", starts_at: "", stream_url: "" });
      await load();
    }
  };

  const toggleLive = async (row: LiveRow) => {
    await supabase.from("live_sessions").update({ is_live: !row.is_live }).eq("id", row.id);
    await load();
  };

  const removeSession = async (id: string) => {
    await supabase.from("live_sessions").delete().eq("id", id);
    await load();
  };

  return (
    <div className="space-y-10">
      {message && <p className="eyebrow text-gold">{message}</p>}

      {/* ------------------------------------------------- course videos */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="sanctuary-card p-9">
          <p className="eyebrow">Publish a lesson video</p>
          <div className="mt-6 space-y-4">
            <select
              value={v.course_slug}
              onChange={(e) => setV({ ...v, course_slug: e.target.value })}
              className={field}
            >
              {courses.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
            <input
              className={field}
              placeholder="Lesson title"
              value={v.title}
              maxLength={160}
              onChange={(e) => setV({ ...v, title: e.target.value })}
            />
            <input
              className={field}
              placeholder="Duration (e.g. 18 min)"
              value={v.duration}
              maxLength={20}
              onChange={(e) => setV({ ...v, duration: e.target.value })}
            />
            <input
              className={field}
              placeholder="Video URL (YouTube embed, Vimeo, or file link)"
              value={v.video_url}
              onChange={(e) => setV({ ...v, video_url: e.target.value })}
            />
            <input
              className={field}
              placeholder="Thumbnail image URL"
              value={v.thumbnail_url}
              onChange={(e) => setV({ ...v, thumbnail_url: e.target.value })}
            />
            <textarea
              className={field}
              rows={3}
              placeholder="Description"
              value={v.description}
              maxLength={2000}
              onChange={(e) => setV({ ...v, description: e.target.value })}
            />
            <textarea
              className={field}
              rows={3}
              placeholder="Highlights — one per line"
              value={v.highlights}
              onChange={(e) => setV({ ...v, highlights: e.target.value })}
            />
            <button onClick={addVideo} disabled={busy} className={btn}>
              Publish lesson
            </button>
          </div>
        </div>

        <div className="sanctuary-card p-9">
          <p className="eyebrow">Published lessons ({videos.length})</p>
          <div className="mt-6 max-h-[520px] divide-y divide-border overflow-y-auto">
            {videos.length === 0 && (
              <p className="py-4 text-sm text-muted-foreground">
                Nothing published yet. Courses still show their built-in curriculum.
              </p>
            )}
            {videos.map((row) => (
              <div key={row.id} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="font-display text-lg text-forest">{row.title}</p>
                  <p className="text-xs tracking-widest uppercase text-earth">
                    {courses.find((c) => c.slug === row.course_slug)?.title ?? row.course_slug} ·{" "}
                    {row.duration}
                  </p>
                  {row.description && (
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">{row.description}</p>
                  )}
                </div>
                <button onClick={() => removeVideo(row.id)} className={ghost}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- live sessions */}
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="sanctuary-card p-9">
          <p className="eyebrow">Schedule a live session</p>
          <div className="mt-6 space-y-4">
            <input
              className={field}
              placeholder="Session title"
              value={s.title}
              maxLength={160}
              onChange={(e) => setS({ ...s, title: e.target.value })}
            />
            <input
              className={field}
              placeholder="URL slug (optional)"
              value={s.slug}
              onChange={(e) => setS({ ...s, slug: e.target.value })}
            />
            <input
              className={field}
              placeholder="Teacher"
              value={s.teacher}
              onChange={(e) => setS({ ...s, teacher: e.target.value })}
            />
            <input
              type="datetime-local"
              className={field}
              value={s.starts_at}
              onChange={(e) => setS({ ...s, starts_at: e.target.value })}
            />
            <input
              type="number"
              className={field}
              placeholder="Duration in minutes"
              value={s.duration_minutes}
              onChange={(e) => setS({ ...s, duration_minutes: Number(e.target.value) })}
            />
            <input
              className={field}
              placeholder="Stream embed URL (YouTube live, Zoom webinar, etc.)"
              value={s.stream_url}
              onChange={(e) => setS({ ...s, stream_url: e.target.value })}
            />
            <textarea
              className={field}
              rows={3}
              placeholder="What happens in this session"
              value={s.description}
              maxLength={2000}
              onChange={(e) => setS({ ...s, description: e.target.value })}
            />
            <button onClick={addSession} disabled={busy} className={btn}>
              Schedule session
            </button>
          </div>
        </div>

        <div className="sanctuary-card p-9">
          <p className="eyebrow">Sessions ({sessions.length})</p>
          <div className="mt-6 max-h-[520px] divide-y divide-border overflow-y-auto">
            {sessions.map((row) => (
              <div key={row.id} className="flex items-start justify-between gap-4 py-4">
                <div>
                  <p className="font-display text-lg text-forest">{row.title}</p>
                  <p className="text-xs tracking-widest uppercase text-earth">
                    {formatWhen(row.starts_at)} · {row.duration_minutes} min
                    {row.is_live ? " · LIVE" : ""}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button onClick={() => toggleLive(row)} className={ghost}>
                    {row.is_live ? "End" : "Go live"}
                  </button>
                  <button onClick={() => removeSession(row.id)} className={ghost}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
