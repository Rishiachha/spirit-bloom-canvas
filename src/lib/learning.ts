import type { Course, Video } from "./site-data";

/* ---------------------------------------------------------------- pricing */

const GROUP_PRICE_CENTS: Record<Course["group"], number> = {
  Beginner: 240000,
  Wellness: 320000,
  Special: 420000,
  Advanced: 560000,
  Retreats: 1200000,
};

export function coursePriceCents(course: Course): number {
  return GROUP_PRICE_CENTS[course.group];
}

export function formatPrice(cents: number): string {
  return `₹${(cents / 100).toLocaleString("en-IN")}`;
}

export function coursePriceLabel(course: Course): string {
  return formatPrice(coursePriceCents(course));
}

/* ----------------------------------------------------------------- videos */

const FALLBACK_THUMBS = [
  "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&q=80",
  "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&q=80",
  "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=640&q=80",
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=640&q=80",
  "https://images.unsplash.com/photo-1575052814085-f385151767da?w=640&q=80",
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=640&q=80",
];

const DURATIONS = ["14 min", "18 min", "22 min", "16 min", "25 min", "20 min"];

/**
 * Every course has a video library. Courses without hand-authored videos get a
 * library derived from their curriculum modules so the learning flow is whole.
 */
export function getVideos(course: Course): Video[] {
  if (course.videos && course.videos.length > 0) return course.videos;
  const prefix = course.slug
    .split("-")
    .map((w) => w[0])
    .join("")
    .slice(0, 4);
  return course.includes.map((mod, i) => ({
    id: `${prefix}-${i + 1}`,
    title: mod,
    duration: DURATIONS[i % DURATIONS.length],
    thumbnail: FALLBACK_THUMBS[i % FALLBACK_THUMBS.length],
    highlights: [
      `Guided practice — ${mod.toLowerCase()}`,
      "Alignment and breath cues",
      "A short assignment for the week",
    ],
    description: `A guided session on ${mod.toLowerCase()}, taught slowly enough that the practice settles before the next idea arrives.`,
  }));
}

/* ------------------------------------------------------------------ tests */

export type CourseTest = {
  id: string;
  kind: "written" | "practice";
  title: string;
  intro: string;
  /** the test unlocks once this lesson has been completed */
  afterVideoId: string;
  questions: string[];
};

/**
 * Two written reflections placed inside the course, and one recorded practice
 * test at the end.
 */
export function getTests(course: Course): CourseTest[] {
  const videos = getVideos(course);
  if (videos.length === 0) return [];
  const mid = Math.max(0, Math.floor(videos.length / 3));
  const late = Math.max(mid + 1, Math.floor((videos.length * 2) / 3));
  const tests: CourseTest[] = [];

  tests.push({
    id: "written-1",
    kind: "written",
    title: "First reflection",
    intro:
      "A short written test. Nothing is graded harshly — write in your own words, in as few or as many sentences as feel true.",
    afterVideoId: videos[Math.min(mid, videos.length - 1)]!.id,
    questions: [
      `In your own words, what is ${course.title.toLowerCase()} asking of you so far?`,
      "Describe one change you have noticed in your breath since you began.",
      "Which instruction has been hardest to follow, and why?",
    ],
  });

  if (videos.length > 3) {
    tests.push({
      id: "written-2",
      kind: "written",
      title: "Second reflection",
      intro:
        "The mid-course written test. Answer from your own practice rather than from the recordings.",
      afterVideoId: videos[Math.min(late, videos.length - 1)]!.id,
      questions: [
        `Explain one idea from ${course.includes[0]?.toLowerCase() ?? "this course"} as if teaching a friend.`,
        "What does your practice look like on a difficult day?",
        "Name one thing you would like the teacher to watch in your practice.",
      ],
    });
  }

  tests.push({
    id: "practice-1",
    kind: "practice",
    title: "Recorded practice test",
    intro:
      "Record yourself practising — three to five minutes is plenty. Your teacher reviews it and replies with notes. Nothing is public.",
    afterVideoId: videos[videos.length - 1]!.id,
    questions: [
      "Record a short sequence or sitting from this course, filmed from the side if you can.",
      "Add a line about how the practice felt from the inside.",
    ],
  });

  return tests;
}

/* ----------------------------------------------------------------- badges */

export type Badge = {
  key: string;
  label: string;
  description: string;
  glyph: string;
};

export const BADGES: Badge[] = [
  { key: "first-step", label: "First Step", description: "Enrol in your first program.", glyph: "◔" },
  { key: "first-lesson", label: "First Light", description: "Complete your first lesson.", glyph: "☀" },
  { key: "note-taker", label: "The Journal", description: "Write your first lesson note.", glyph: "✎" },
  { key: "curious-mind", label: "Curious Mind", description: "Ask your first question of a teacher.", glyph: "?" },
  { key: "daily-practice", label: "Daily Flame", description: "Log a day of practice.", glyph: "✷" },
  { key: "week-one", label: "Seven Mornings", description: "Practise seven days in a row.", glyph: "✦" },
  { key: "steady-flame", label: "Steady Flame", description: "Practise twenty-one days in a row.", glyph: "❋" },
  { key: "halfway", label: "Midstream", description: "Reach halfway through a program.", glyph: "◑" },
  { key: "written-test", label: "In Your Own Words", description: "Submit a written reflection.", glyph: "✍" },
  { key: "practice-test", label: "Seen and Heard", description: "Submit a recorded practice test.", glyph: "◉" },
  { key: "course-complete", label: "Full Circle", description: "Complete every lesson in a program.", glyph: "◎" },
  { key: "live-voice", label: "Live Voice", description: "Speak up in a live session.", glyph: "◈" },
];

export const badgeByKey = (key: string) => BADGES.find((b) => b.key === key);
