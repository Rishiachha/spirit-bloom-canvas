import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "./auth";

export type AppRole = "admin" | "teacher" | "student";

/** Roles are read from the database — never from local storage. */
export function useRoles() {
  const { user, ready } = useSession();
  const [roles, setRoles] = useState<AppRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    let active = true;
    if (!user) {
      setRoles([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    void supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .then(({ data }) => {
        if (!active) return;
        setRoles((data ?? []).map((r) => r.role as AppRole));
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [user, ready]);

  return {
    roles,
    isAdmin: roles.includes("admin"),
    isTeacher: roles.includes("teacher") || roles.includes("admin"),
    loading: loading || !ready,
    user,
  };
}
