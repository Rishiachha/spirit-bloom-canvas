import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { courseGroups, courses, topicSections, slugify } from "@/lib/site-data";
import { signOut, useSession } from "@/lib/auth";


type MegaKey = "discover-yourself" | "yoga" | "meditation" | "health-wellness" | "courses";

const topicMenus = topicSections.map((s) => ({ key: s.key as MegaKey, label: s.label }));

export function Navbar() {
  const [open, setOpen] = useState<MegaKey | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, ready } = useSession();


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const section = topicSections.find((s) => s.key === open);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      onMouseLeave={() => setOpen(null)}
      data-scrolled={scrolled}
    >
      <div className={scrolled ? "glass-nav" : "glass-nav opacity-95"}>
        <div className="mx-auto flex h-[90px] max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <Link to="/" className="group flex items-center gap-3" onMouseEnter={() => setOpen(null)}>
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-gold/50" />
              <span className="h-2 w-2 rounded-full bg-gold animate-breathe" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[1.35rem] tracking-tight text-forest">
                Rishi Sidhasamadhi
              </span>
              <span className="eyebrow block text-[0.6rem]">Yoga Foundation</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {topicMenus.map((m) => (
              <button
                key={m.key}
                onMouseEnter={() => setOpen(m.key)}
                className="relative py-2 text-[0.82rem] font-medium tracking-wide text-foreground/75 transition-colors hover:text-forest"
              >
                {m.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500"
                  style={{ transform: open === m.key ? "scaleX(1)" : undefined }}
                />
              </button>
            ))}
            <button
              onMouseEnter={() => setOpen("courses")}
              className="py-2 text-[0.82rem] font-medium tracking-wide text-foreground/75 transition-colors hover:text-forest"
            >
              Courses
            </button>
            <Link
              to="/events"
              onMouseEnter={() => setOpen(null)}
              className="py-2 text-[0.82rem] font-medium tracking-wide text-foreground/75 transition-colors hover:text-forest"
            >
              Events
            </Link>
            <Link
              to="/about"
              onMouseEnter={() => setOpen(null)}
              className="py-2 text-[0.82rem] font-medium tracking-wide text-foreground/75 transition-colors hover:text-forest"
            >
              About Us
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {ready && user ? (
              <>
                <Link
                  to="/dashboard"
                  className="hidden rounded-full border border-forest/25 px-5 py-2.5 text-[0.78rem] font-medium tracking-wide text-forest transition-colors hover:border-forest hover:bg-forest hover:text-primary-foreground lg:inline-flex"
                >
                  My Journey
                </Link>
                <button
                  onClick={signOut}
                  className="hidden text-[0.72rem] tracking-[0.16em] uppercase text-muted-foreground transition-colors hover:text-forest lg:inline-flex"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/auth"
                search={{ redirect: "/dashboard" }}
                className="hidden rounded-full border border-forest/25 px-5 py-2.5 text-[0.78rem] font-medium tracking-wide text-forest transition-colors hover:border-forest hover:bg-forest hover:text-primary-foreground lg:inline-flex"
              >
                My Journey
              </Link>
            )}

            <button
              className="lg:hidden"
              aria-label="Menu"
              onClick={() => setMobile((v) => !v)}
            >
              {mobile ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mega menu */}
      {open && (
        <div className="hidden lg:block">
          <div className="glass-panel border-b border-border/70 shadow-soft">
            <div className="mx-auto max-w-[1400px] px-10 py-12">
              {open === "courses" ? (
                <div className="grid grid-cols-5 gap-10">
                  {courseGroups.map((g) => (
                    <div key={g.key}>
                      <p className="eyebrow mb-4">{g.label}</p>
                      <ul className="space-y-2.5">
                        {courses
                          .filter((c) => c.group === g.key)
                          .map((c) => (
                            <li key={c.slug}>
                              <Link
                                to="/courses/$slug"
                                params={{ slug: c.slug }}
                                onClick={() => setOpen(null)}
                                className="text-[0.82rem] leading-snug text-foreground/70 transition-colors hover:text-forest"
                              >
                                {c.title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : section ? (
                <div className="grid grid-cols-[1fr_2.2fr] gap-16">
                  <div>
                    <p className="eyebrow mb-4">{section.label}</p>
                    <h3 className="font-display text-3xl leading-snug text-forest">
                      {section.intro}
                    </h3>
                    <div className="rule-gold mt-6" />
                    <Link
                      to="/topics"
                      onClick={() => setOpen(null)}
                      className="mt-6 inline-block text-[0.78rem] tracking-widest uppercase text-earth hover:text-forest"
                    >
                      All knowledge pages
                    </Link>
                    {section.key === "health-wellness" && (
                      <Link
                        to="/courses/$slug"
                        params={{ slug: "health-wellness-guided-program" }}
                        onClick={() => setOpen(null)}
                        className="mt-4 inline-block text-[0.78rem] tracking-widest uppercase text-gold hover:text-gold/80"
                      >
                        Find a guided program
                      </Link>
                    )}
                  </div>
                  <ul className="grid grid-cols-3 gap-x-10 gap-y-3">
                    {section.topics.map((t) => (
                      <li key={t}>
                        <Link
                          to="/topics/$slug"
                          params={{ slug: slugify(t) }}
                          onClick={() => setOpen(null)}
                          className="block border-b border-transparent py-1 text-[0.85rem] text-foreground/70 transition-colors hover:border-gold/60 hover:text-forest"
                        >
                          {t}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {mobile && (
        <div className="glass-panel max-h-[calc(100vh-90px)] overflow-y-auto border-b border-border px-6 py-8 lg:hidden">
          <ul className="space-y-4">
            {topicMenus.map((m) => (
              <li key={m.key}>
                <Link
                  to="/topics"
                  onClick={() => setMobile(false)}
                  className="font-display text-2xl text-forest"
                >
                  {m.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/courses"
                onClick={() => setMobile(false)}
                className="font-display text-2xl text-forest"
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                onClick={() => setMobile(false)}
                className="font-display text-2xl text-forest"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setMobile(false)}
                className="font-display text-2xl text-forest"
              >
                About Us
              </Link>
            </li>
            <li>
              {ready && user ? (
                <Link
                  to="/dashboard"
                  onClick={() => setMobile(false)}
                  className="font-display text-2xl text-forest"
                >
                  My Journey
                </Link>
              ) : (
                <Link
                  to="/auth"
                  search={{ redirect: "/dashboard" }}
                  onClick={() => setMobile(false)}
                  className="font-display text-2xl text-forest"
                >
                  Sign In · My Journey
                </Link>
              )}
            </li>

          </ul>
        </div>
      )}
    </header>
  );
}
