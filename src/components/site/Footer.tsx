import { Link } from "@tanstack/react-router";
import { courses, topicSections, slugify } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-border bg-sand/60">
      <div className="mx-auto max-w-[1400px] px-6 py-24 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-3xl leading-tight text-forest">
              Rishi Sidhasamadhi
              <span className="block text-earth">Yoga Foundation</span>
            </p>
            <div className="rule-gold mt-6" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A foundation for practice, study and community — offered in the spirit of the
              tradition, open to everyone who wishes to begin.
            </p>
          </div>

          <div>
            <p className="eyebrow mb-5">Learn</p>
            <ul className="space-y-2.5 text-sm text-foreground/70">
              {courses.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/courses/$slug"
                    params={{ slug: c.slug }}
                    className="hover:text-forest"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Knowledge</p>
            <ul className="space-y-2.5 text-sm text-foreground/70">
              {topicSections[1].topics.slice(0, 6).map((t) => (
                <li key={t}>
                  <Link to="/topics/$slug" params={{ slug: slugify(t) }} className="hover:text-forest">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-5">Foundation</p>
            <ul className="space-y-2.5 text-sm text-foreground/70">
              <li>
                <Link to="/about" className="hover:text-forest">
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about" hash="foundation" className="hover:text-forest">
                  Our Foundation
                </Link>
              </li>
              <li>
                <Link to="/about" hash="leadership" className="hover:text-forest">
                  Leadership
                </Link>
              </li>
              <li>
                <Link to="/about" hash="community" className="hover:text-forest">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/about" hash="connect" className="hover:text-forest">
                  Connect
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-forest">
                  Events
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 text-xs tracking-wide text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Rishi Sidhasamadhi Yoga Foundation</p>
          <p className="font-display text-base text-earth">सर्वे भवन्तु सुखिनः</p>
        </div>
      </div>
    </footer>
  );
}
