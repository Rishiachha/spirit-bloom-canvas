import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "./auth";

/* ---------------------------------------------------------------- badges */

export async function awardBadge(userId: string, badgeKey: string) {
  await supabase.from("user_badges").insert({ user_id: userId, badge_key: badgeKey });
}

export async function logPracticeDay(userId: string, minutes = 15) {
  const day = new Date().toISOString().slice(0, 10);
  await supabase.from("practice_days").upsert({ user_id: userId, day, minutes }, { onConflict: "user_id,day" });
  await awardBadge(userId, "daily-practice");
}

export function computeStreak(days: string[]): number {
  const set = new Set(days);
  let streak = 0;
  const cursor = new Date();
  // allow today to be unlogged without breaking the streak
  if (!set.has(cursor.toISOString().slice(0, 10))) cursor.setDate(cursor.getDate() - 1);
  while (set.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

/* ----------------------------------------------------------- enrollments */

export type Enrollment = {
  id: string;
  course_slug: string;
  amount_cents: number;
  created_at: string;
  completed_at: string | null;
};

export function useEnrollment(courseSlug: string) {
  const { user, ready } = useSession();
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setEnrollment(null);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("enrollments")
      .select("id, course_slug, amount_cents, created_at, completed_at")
      .eq("user_id", user.id)
      .eq("course_slug", courseSlug)
      .maybeSingle();
    setEnrollment(data ?? null);
    setLoading(false);
  }, [user, courseSlug]);

  useEffect(() => {
    if (!ready) return;
    setLoading(true);
    void refresh();
  }, [ready, refresh]);

  return { enrollment, loading: loading || !ready, user, ready, refresh };
}

/* -------------------------------------------------------------- progress */

export function useCourseProgress(courseSlug: string) {
  const { user, ready } = useSession();
  const [completed, setCompleted] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setCompleted([]);
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from("video_progress")
      .select("video_id, completed")
      .eq("user_id", user.id)
      .eq("course_slug", courseSlug);
    setCompleted((data ?? []).filter((r) => r.completed).map((r) => r.video_id));
    setLoading(false);
  }, [user, courseSlug]);

  useEffect(() => {
    if (!ready) return;
    void refresh();
  }, [ready, refresh]);

  return { completed, loading: loading || !ready, refresh };
}

export async function markVideoComplete(userId: string, courseSlug: string, videoId: string) {
  await supabase.from("video_progress").upsert(
    {
      user_id: userId,
      course_slug: courseSlug,
      video_id: videoId,
      completed: true,
      completed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,course_slug,video_id" },
  );
}
