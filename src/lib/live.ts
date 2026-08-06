import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type LiveSession = {
  id: string;
  slug: string;
  title: string;
  teacher: string;
  description: string;
  starts_at: string;
  duration_minutes: number;
  cover_url: string | null;
  stream_url: string | null;
  is_live: boolean;
};

export type LiveMessage = {
  id: string;
  session_id: string;
  user_id: string;
  display_name: string;
  body: string;
  kind: string;
  created_at: string;
};

export function sessionStatus(s: LiveSession): "live" | "soon" | "past" {
  const start = new Date(s.starts_at).getTime();
  const end = start + s.duration_minutes * 60_000;
  const now = Date.now();
  if (s.is_live || (now >= start && now <= end)) return "live";
  return now > end ? "past" : "soon";
}

export function formatWhen(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function useLiveSessions() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const { data } = await supabase.from("live_sessions").select("*").order("starts_at");
    setSessions((data ?? []) as LiveSession[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { sessions, loading, refresh };
}

/** Live chat for one session, kept in sync with realtime inserts. */
export function useLiveRoom(sessionId: string | undefined) {
  const [messages, setMessages] = useState<LiveMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;
    let active = true;
    setLoading(true);

    void supabase
      .from("live_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at")
      .then(({ data }) => {
        if (!active) return;
        setMessages((data ?? []) as LiveMessage[]);
        setLoading(false);
      });

    const channel = supabase
      .channel(`live-room-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "live_messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const row = payload.new as LiveMessage;
          setMessages((prev) => (prev.some((m) => m.id === row.id) ? prev : [...prev, row]));
        },
      )
      .subscribe();

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, [sessionId]);

  return { messages, loading };
}
