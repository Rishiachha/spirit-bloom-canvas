import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useRoles } from "@/lib/roles";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const tabs = [
  { to: "/admin", label: "Overview" },
  { to: "/admin/content", label: "Courses & Live" },
  { to: "/admin/people", label: "People & Reviews" },
] as const;

function AdminLayout() {
  const { isAdmin, loading, user } = useRoles();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center pt-[90px]">
        <p className="eyebrow">Checking your keys…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 pt-[90px] text-center">
        <h1 className="font-display text-4xl text-forest">Sign in to continue</h1>
        <Link
          to="/auth"
          search={{ redirect: "/admin" }}
          className="rounded-full bg-forest px-8 py-4 text-[0.76rem] tracking-[0.16em] uppercase text-primary-foreground"
        >
          Sign in
        </Link>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 pt-[90px] text-center">
        <p className="eyebrow">Restricted</p>
        <h1 className="font-display text-4xl text-forest">This door is for the foundation team</h1>
        <Link to="/dashboard" className="eyebrow text-earth hover:text-forest">
          ← Back to my journey
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sand/30 pt-[90px]">
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <p className="eyebrow">Foundation console</p>
        <h1 className="mt-3 font-display text-4xl text-forest">Everything, in one room</h1>
        <nav className="mt-8 flex flex-wrap gap-3">
          {tabs.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              activeOptions={{ exact: t.to === "/admin" }}
              activeProps={{ className: "bg-forest text-primary-foreground" }}
              inactiveProps={{ className: "border border-forest/25 text-forest" }}
              className="rounded-full px-6 py-3 text-[0.72rem] tracking-[0.16em] uppercase transition-colors"
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
