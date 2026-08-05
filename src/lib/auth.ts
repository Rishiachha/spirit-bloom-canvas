import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export type SessionUser = { id: string; name: string; email: string };

let cachedUser: SessionUser | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

async function loadProfileName(id: string, fallback: string) {
  const { data } = await supabase.from("profiles").select("display_name").eq("id", id).maybeSingle();
  if (data?.display_name && cachedUser && cachedUser.id === id) {
    cachedUser = { ...cachedUser, name: data.display_name };
    emit();
  } else if (!data && cachedUser?.id === id) {
    cachedUser = { ...cachedUser, name: fallback };
    emit();
  }
}

export async function signOut() {
  await supabase.auth.signOut();
  cachedUser = null;
  emit();
}

/** Client-side session. `ready` is false during SSR and the first paint. */
export function useSession() {
  const [user, setUser] = useState<SessionUser | null>(cachedUser);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    const sync = () => {
      if (active) setUser(cachedUser);
    };
    listeners.add(sync);

    const apply = (session: { user: { id: string; email?: string | null } } | null) => {
      if (session?.user) {
        const fallback = session.user.email?.split("@")[0] ?? "Practitioner";
        cachedUser = {
          id: session.user.id,
          email: session.user.email ?? "",
          name: cachedUser?.id === session.user.id ? cachedUser.name : fallback,
        };
        emit();
        void loadProfileName(session.user.id, fallback);
      } else {
        cachedUser = null;
        emit();
      }
      if (active) setReady(true);
    };

    supabase.auth.getSession().then(({ data }) => apply(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => apply(session));

    return () => {
      active = false;
      listeners.delete(sync);
      sub.subscription.unsubscribe();
    };
  }, []);

  return { user, ready };
}
