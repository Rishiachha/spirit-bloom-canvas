import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-5 font-display text-4xl leading-[1.12] text-forest sm:text-5xl">{title}</h2>
      <div className={align === "center" ? "rule-gold mx-auto mt-7" : "rule-gold mt-7"} />
      {intro && (
        <p className="mt-6 text-[0.98rem] leading-relaxed text-muted-foreground">{intro}</p>
      )}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`px-6 py-28 sm:py-32 lg:px-10 ${className}`}>
      <div className="mx-auto max-w-[1400px]">{children}</div>
    </section>
  );
}
