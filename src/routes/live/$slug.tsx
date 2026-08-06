import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { awardBadge, logPracticeDay } from "@/lib/learning-data";
import { useLiveRoom, useLiveSessions, sessionStatus, formatWhen } from "@/lib/live";
import river from "@/assets/river.jpg";

export const Route = createFileRoute("/live/$slug")({
  head: () => ({
    meta: [
      { title: "Live Room | Rishi Sidhasamadhi Yoga Foundation" },
      {
        name: "description",
        content:
          "An interactive live yoga room — practise with the teacher, chat with fellow practitioners, raise a hand and keep private notes.",
      },
      { property: "og:title", content: "Live Room | Rishi Sidhasamadhi Yoga" },
      {
        property: "og:description",
        content: "Practise live, ask questions and take notes in one calm room.",
      },
    ],
  }),
  component: LiveRoom,
});

function LiveRoom() {
  const { slug } = useParams({ from: "/live/$slug" });
  const { user, ready } = useSession();
  const { sessions, loading } = useLiveSessions();
  const session = useMemo(() => sessions.find((s) => s.slug === slug), [sessions, slug]);
  const { messages } = useLiveRoom(session?.id);

  const [draft, setDraft] = useState("");
  const [kind, setKind] = useState<"chat" | "question">("chat");
  const [sending, setSending] = useState(false);
  const [attendees, setAttendees] = useState(1);
  const [handRaised, setHandRaised] = useState(false);
  const [notes, setNotes] = useState("");
  const [noteState, setNoteState] = useState<"idle" | "saving" | "saved">("idle");
  const scroller = useRef<HTMLDivElement>(null);

  /* ---- presence: who else is in the room right now ---- */
  useEffect(() => {
    if (!session || !user) return;
    const channel = supabase.channel(`presence-${session.id}`, {
      config: { presence: { key: user.id } },
    });
    channel
      .on("presence", { event: "sync" }, () => {
        setAttendees(Object.keys(channel.presenceState()).length || 1);
      })
      .subscribe((status) => {
        if (status === "SUBSCRIBED") void channel.track({ name: user.name });
      });
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [session, user]);

  /* ---- private notes for this live session ---- */
  useEffect(() => {
    if (!user || !session) return;
    let active = true;
    void supabase
      .from("lesson_notes")
      .select("body")
      .eq("user_id", user.id)
      .eq("course_slug", "live")
      .eq("video_id", session.slug)
      .maybeSingle()
      .then(({ data }) => {
        if (active && data?.body) setNotes(data.body);
      });
    return () => {
      active = false;
    };
  }, [user, session]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  if (!ready || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 pt-[90px]">
        <p className="eyebrow">Opening the room…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 pt-[90px] text-center">
        <p className="eyebrow">Members only</p>
        <h1 className="font-display text-4xl text-forest">Sign in to join the live room</h1>
        <Link
          to="/auth"
          search={{ redirect: "/live" }}
          className="rounded-full bg-forest px-8 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-primary-foreground"
        >
          Sign in / Create account
        </Link>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 pt-[90px] text-center">
        <h1 className="font-display text-4xl text-forest">This room has closed</h1>
        <Link to="/live" className="eyebrow text-earth hover:text-forest">
          ← All live sessions
        </Link>
      </div>
    );
  }

  const status = sessionStatus(session);

  const send = async (body: string, messageKind: string) => {
    if (!body.trim()) return;
    setSending(true);
    await supabase.from("live_messages").insert({
      session_id: session.id,
      user_id: user.id,
      display_name: user.name,
      body: body.trim(),
      kind: messageKind,
    });
    await awardBadge(user.id, "live-voice");
    setSending(false);
  };

  const saveNotes = async () => {
    setNoteState("saving");
    await supabase.from("lesson_notes").upsert(
      { user_id: user.id, course_slug: "live", video_id: session.slug, body: notes },
      { onConflict: "user_id,course_slug,video_id" },
    );
    setNoteState("saved");
    setTimeout(() => setNoteState("idle"), 1800);
  };

  return (
    <div className="pt-[90px]">
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <Link to="/live" className="eyebrow text-earth hover:text-forest">
          ← All live sessions
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.55fr_1fr]">
          {/* ---------------------------------------------------- stage */}
          <div>
            <div className="relative overflow-hidden rounded-[var(--radius)] bg-forest">
              {session.stream_url ? (
                <iframe
                  src={session.stream_url}
                  title={session.title}
                  allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="aspect-video w-full"
                />
              ) : (
                <div className="relative aspect-video w-full">
                  <img
                    src={session.cover_url ?? river}
                    alt={session.title}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center"
                    style={{ background: "oklch(0.3 0.03 150 / 0.6)" }}
                  >
                    <span className="h-16 w-16 rounded-full border border-ivory/60 animate-breathe" />
                    <p className="font-display text-2xl text-ivory">
                      {status === "live"
                        ? "The teacher's stream begins shortly"
                        : status === "soon"
                          ? `Starts ${formatWhen(session.starts_at)}`
                          : "This session has ended"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <span className="eyebrow flex items-center gap-2">
                {status === "live" && (
                  <span className="inline-flex h-2 w-2 rounded-full bg-gold animate-breathe" />
                )}
                {status === "live" ? "Live now" : status === "soon" ? "Upcoming" : "Ended"}
              </span>
              <span className="text-xs tracking-[0.16em] uppercase text-earth">
                {attendees} practising together
              </span>
            </div>

            <h1 className="mt-4 font-display text-4xl leading-tight text-forest">
              {session.title}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {session.teacher} · {formatWhen(session.starts_at)} · {session.duration_minutes} min
            </p>
            <p className="mt-5 max-w-2xl leading-[1.8] text-foreground/80">
              {session.description ||
                "A guided live practice followed by open questions. Keep your camera off if you prefer — presence is enough."}
            </p>

            {/* interactive strip */}
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={async () => {
                  setHandRaised(true);
                  await send(`${user.name} raised a hand`, "hand");
                  setTimeout(() => setHandRaised(false), 4000);
                }}
                className="rounded-full border border-forest/25 px-6 py-3 text-[0.72rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-forest hover:text-primary-foreground"
              >
                {handRaised ? "Hand raised ✋" : "Raise a hand"}
              </button>
              <button
                onClick={() => send("🙏", "reaction")}
                className="rounded-full border border-forest/25 px-6 py-3 text-[0.72rem] tracking-[0.16em] uppercase text-forest transition-colors hover:bg-forest hover:text-primary-foreground"
              >
                Send 🙏
              </button>
              <button
                onClick={() => logPracticeDay(user.id, session.duration_minutes)}
                className="rounded-full bg-forest px-6 py-3 text-[0.72rem] tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-forest/90"
              >
                Log this practice
              </button>
            </div>

            {/* notes */}
            <div className="sanctuary-card mt-10 p-8">
              <p className="eyebrow">Your private notes</p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={saveNotes}
                rows={6}
                placeholder="What the teacher said, what your body answered…"
                className="mt-5 w-full resize-y rounded-[calc(var(--radius)/1.5)] border border-border bg-background/60 p-5 text-sm leading-relaxed text-foreground outline-none focus:border-forest/50"
              />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">
                  {noteState === "saving"
                    ? "Saving…"
                    : noteState === "saved"
                      ? "Saved"
                      : "Only you can read this"}
                </span>
                <button
                  onClick={saveNotes}
                  className="rounded-full border border-forest/25 px-5 py-2.5 text-[0.72rem] tracking-[0.16em] uppercase text-forest hover:bg-forest hover:text-primary-foreground"
                >
                  Save notes
                </button>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ live chat */}
          <aside className="sanctuary-card flex h-[720px] flex-col p-0">
            <div className="border-b border-border px-7 py-5">
              <p className="eyebrow">The room</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Chat, questions and hands — everyone here sees this.
              </p>
            </div>

            <div ref={scroller} className="flex-1 space-y-5 overflow-y-auto px-7 py-6">
              {messages.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nothing said yet. Greet the room — it settles the nerves.
                </p>
              )}
              {messages.map((m) => (
                <div key={m.id}>
                  <p className="flex items-baseline gap-2">
                    <span className="font-display text-[1.05rem] text-forest">
                      {m.display_name}
                    </span>
                    {m.kind === "question" && (
                      <span className="rounded-full bg-gold/15 px-2 py-0.5 text-[0.6rem] tracking-[0.16em] uppercase text-gold">
                        Question
                      </span>
                    )}
                    {m.kind === "hand" && (
                      <span className="text-[0.6rem] tracking-[0.16em] uppercase text-earth">
                        ✋ hand
                      </span>
                    )}
                    <span className="text-[0.62rem] tracking-widest text-muted-foreground">
                      {new Date(m.created_at).toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">{m.body}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-7 py-5">
              <div className="flex gap-2">
                {(["chat", "question"] as const).map((k) => (
                  <button
                    key={k}
                    onClick={() => setKind(k)}
                    className={`rounded-full px-4 py-2 text-[0.66rem] tracking-[0.16em] uppercase transition-colors ${
                      kind === k
                        ? "bg-forest text-primary-foreground"
                        : "border border-forest/25 text-forest"
                    }`}
                  >
                    {k === "chat" ? "Say something" : "Ask the teacher"}
                  </button>
                ))}
              </div>
              <form
                className="mt-4 flex gap-3"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const body = draft;
                  setDraft("");
                  await send(body, kind);
                }}
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  maxLength={500}
                  placeholder={kind === "question" ? "Your question…" : "Your message…"}
                  className="flex-1 rounded-full border border-border bg-background/60 px-5 py-3 text-sm outline-none focus:border-forest/50"
                />
                <button
                  type="submit"
                  disabled={sending || !draft.trim()}
                  className="rounded-full bg-forest px-6 py-3 text-[0.7rem] tracking-[0.16em] uppercase text-primary-foreground disabled:opacity-40"
                >
                  Send
                </button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
