export type Course = {
  slug: string;
  title: string;
  group: "Beginner" | "Advanced" | "Wellness" | "Special" | "Retreats";
  purpose: string;
  duration: string;
  level: string;
  includes: string[];
};

export const courses: Course[] = [
  {
    slug: "yoga-foundation-course",
    title: "Yoga Foundation Course",
    group: "Beginner",
    purpose: "An unhurried introduction to yoga â€” body, breath and the beginnings of stillness.",
    duration: "8 weeks",
    level: "Beginner",
    includes: ["Yoga basics", "Asanas", "Breath awareness", "Yoga philosophy", "Daily practice"],
  },
  {
    slug: "meditation-foundation-course",
    title: "Meditation Foundation Course",
    group: "Beginner",
    purpose: "Build a meditation practice that survives ordinary life.",
    duration: "6 weeks",
    level: "Beginner",
    includes: ["Mindfulness", "Breath meditation", "Concentration", "Inner awareness"],
  },
  {
    slug: "teacher-training-program",
    title: "Teacher Training Program",
    group: "Advanced",
    purpose: "Carry the tradition forward with clarity, humility and skill.",
    duration: "200 hours",
    level: "Advanced",
    includes: ["Yoga philosophy", "Teaching methodology", "Class planning", "Practical teaching"],
  },
  {
    slug: "advanced-yoga-practice",
    title: "Advanced Yoga Practice",
    group: "Advanced",
    purpose: "Refine a mature practice through depth, restraint and discipline.",
    duration: "12 weeks",
    level: "Advanced",
    includes: ["Advanced asanas", "Breath practices", "Deep meditation", "Discipline"],
  },
  {
    slug: "stress-management-program",
    title: "Stress Management Program",
    group: "Wellness",
    purpose: "Release the tension the mind holds without noticing.",
    duration: "4 weeks",
    level: "All levels",
    includes: ["Nervous system reset", "Guided relaxation", "Breath ratios", "Evening practice"],
  },
  {
    slug: "sleep-wellness-program",
    title: "Sleep Wellness Program",
    group: "Wellness",
    purpose: "Return to deep, natural, unmedicated rest.",
    duration: "4 weeks",
    level: "All levels",
    includes: ["Yoga Nidra", "Wind-down sequences", "Sleep hygiene", "Night breathing"],
  },
  {
    slug: "focus-concentration-program",
    title: "Focus & Concentration Program",
    group: "Wellness",
    purpose: "Train attention as a skill, not a mood.",
    duration: "6 weeks",
    level: "All levels",
    includes: ["Trataka", "Dharana practice", "Digital stillness", "Study rituals"],
  },
  {
    slug: "healthy-lifestyle-program",
    title: "Healthy Lifestyle Program",
    group: "Wellness",
    purpose: "A gentle redesign of the daily rhythm.",
    duration: "8 weeks",
    level: "All levels",
    includes: ["Dinacharya", "Sattvic food", "Movement habits", "Rest cycles"],
  },
  {
    slug: "children-yoga-program",
    title: "Children Yoga Program",
    group: "Special",
    purpose: "Playful practice that grows steady minds.",
    duration: "6 weeks",
    level: "Ages 6â€“12",
    includes: ["Story-led asana", "Breath games", "Kindness practice", "Calm corners"],
  },
  {
    slug: "teen-yoga-program",
    title: "Teen Yoga Program",
    group: "Special",
    purpose: "Steadiness through the years of change.",
    duration: "6 weeks",
    level: "Ages 13â€“18",
    includes: ["Confidence practice", "Exam calm", "Body respect", "Breath tools"],
  },
  {
    slug: "college-students-wellness-program",
    title: "College Students Wellness Program",
    group: "Special",
    purpose: "Clarity, sleep and resilience through demanding years.",
    duration: "6 weeks",
    level: "All levels",
    includes: ["Focus practice", "Stress release", "Sleep repair", "Peer circles"],
  },
  {
    slug: "working-professionals-yoga-program",
    title: "Working Professionals Yoga Program",
    group: "Special",
    purpose: "Twenty honest minutes that change a working day.",
    duration: "8 weeks",
    level: "All levels",
    includes: ["Desk release", "Micro practices", "Evening unwinding", "Weekend depth"],
  },
  {
    slug: "parents-wellness-program",
    title: "Parents Wellness Program",
    group: "Special",
    purpose: "Care for the one who carries everyone else.",
    duration: "6 weeks",
    level: "All levels",
    includes: ["Short practices", "Patience training", "Restorative rest", "Family rituals"],
  },
  {
    slug: "prenatal-yoga-program",
    title: "Prenatal Yoga Program",
    group: "Special",
    purpose: "Move with the body as it becomes two.",
    duration: "Trimester-based",
    level: "Prenatal",
    includes: ["Safe asana", "Pelvic breath", "Birth preparation", "Deep relaxation"],
  },
  {
    slug: "new-mothers-wellness-program",
    title: "New Mothers Wellness Program",
    group: "Special",
    purpose: "Gentle return to strength, sleep and self.",
    duration: "8 weeks",
    level: "Postnatal",
    includes: ["Core recovery", "Rest practice", "Emotional care", "Mother circles"],
  },
  {
    slug: "senior-citizens-yoga-program",
    title: "Senior Citizens Yoga Program",
    group: "Special",
    purpose: "Mobility, balance and dignity in later years.",
    duration: "12 weeks",
    level: "Gentle",
    includes: ["Chair yoga", "Joint care", "Balance work", "Breath longevity"],
  },
  {
    slug: "weekend-yoga-retreat",
    title: "Weekend Yoga Retreat",
    group: "Retreats",
    purpose: "Two days away from noise, in the hills.",
    duration: "2 days",
    level: "All levels",
    includes: ["Sunrise practice", "Silence walks", "Satsang", "Sattvic meals"],
  },
  {
    slug: "meditation-retreat",
    title: "Meditation Retreat",
    group: "Retreats",
    purpose: "Sustained silence, held by a tradition.",
    duration: "5 days",
    level: "Intermediate",
    includes: ["Noble silence", "Long sittings", "Teacher guidance", "Journaling"],
  },
  {
    slug: "yoga-workshops",
    title: "Yoga Workshops",
    group: "Retreats",
    purpose: "Single-subject depth with senior teachers.",
    duration: "Half day",
    level: "All levels",
    includes: ["Alignment labs", "Pranayama intensives", "Philosophy sessions", "Q&A"],
  },
  {
    slug: "wellness-workshops",
    title: "Wellness Workshops",
    group: "Retreats",
    purpose: "Practical wellbeing for modern households.",
    duration: "Half day",
    level: "All levels",
    includes: ["Sleep clinic", "Back care", "Nutrition basics", "Family practice"],
  },
];

export const courseGroups = [
  { key: "Beginner", label: "Beginner Courses" },
  { key: "Advanced", label: "Advanced Courses" },
  { key: "Wellness", label: "Wellness Programs" },
  { key: "Special", label: "Special Programs" },
  { key: "Retreats", label: "Retreats & Workshops" },
] as const;

export const topicSections = [
  {
    key: "discover-yourself",
    label: "Discover Yourself",
    intro: "Begin where you are. Each path answers a question life is already asking.",
    topics: [
      "Reduce Stress",
      "Sleep Better",
      "Improve Focus",
      "Build Flexibility",
      "Increase Strength",
      "Feel Energetic",
      "Learn Yoga",
      "Learn Meditation",
      "Beginner Journey",
      "Spiritual Journey",
      "Healthy Lifestyle",
    ],
  },
  {
    key: "yoga",
    label: "Yoga",
    intro: "The classical body of knowledge, told simply and without hurry.",
    topics: [
      "What Is Yoga",
      "History Of Yoga",
      "Philosophy Of Yoga",
      "Eight Limbs Of Yoga",
      "Asanas",
      "Pranayama",
      "Yoga Nidra",
      "Mantra Practice",
      "Hatha Yoga",
      "Vinyasa Yoga",
      "Ashtanga Yoga",
      "Kundalini Yoga",
      "Restorative Yoga",
    ],
  },
  {
    key: "meditation",
    label: "Meditation",
    intro: "Awareness studied from the inside, and from the evidence.",
    topics: [
      "What Is Meditation",
      "History Of Meditation",
      "Benefits Of Meditation",
      "Science Of Meditation",
      "Mindfulness Meditation",
      "Guided Meditation",
      "Breath Meditation",
      "Mantra Meditation",
      "Chakra Meditation",
      "Meditation Retreats",
      "Silent Meditation",
      "Spiritual Meditation",
    ],
  },
  {
    key: "health-wellness",
    label: "Health & Wellness",
    intro: "Care for the body and mind you live in every day.",
    topics: [
      "Physical Wellness",
      "Back Care",
      "Joint Health",
      "Mental Wellness",
      "Stress",
      "Anxiety",
      "Sleep Problems",
      "Healthy Living",
    ],
  },
] as const;

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const allTopics = topicSections.flatMap((section) =>
  section.topics.map((topic) => ({
    slug: slugify(topic),
    title: topic,
    section: section.label,
    sectionKey: section.key,
  })),
);

export const events = [
  {
    slug: "international-yoga-day",
    title: "International Yoga Day",
    date: "21 June",
    place: "Riverbank Grounds, Rishikesh",
    kind: "Celebration",
    blurb:
      "Ten thousand mats at sunrise. One breath, held together by a city that wakes early for it.",
  },
  {
    slug: "himalayan-silence-retreat",
    title: "Himalayan Silence Retreat",
    date: "12â€“17 October",
    place: "Foundation Ashram, Uttarkashi",
    kind: "Retreat",
    blurb: "Five days of noble silence in the high valleys, guided by senior teachers.",
  },
  {
    slug: "pranayama-intensive",
    title: "Pranayama Intensive",
    date: "Second Saturday, monthly",
    place: "Foundation Hall & Online",
    kind: "Workshop",
    blurb: "A half day inside the breath â€” ratios, retention, and the science beneath them.",
  },
  {
    slug: "community-satsang",
    title: "Community Satsang",
    date: "Every full moon",
    place: "Courtyard, open to all",
    kind: "Community",
    blurb: "Chanting, silence and shared food. No registration, no fee, no requirement.",
  },
];

export const sanskritQuotes = [
  {
    sanskrit: "योगश्चित्तवृत्तिनिरोधः",
    transliteration: "Yogaś-citta-vṛtti-nirodhaḥ",
    translation: "Yoga is the stilling of the movements of the mind.",
    meaning:
      "Practice is not performance. It is the quiet settling of thought until what is real becomes visible.",
  },
  {
    sanskrit: "सर्वे भवन्तु सुखिनः",
    transliteration: "Sarve bhavantu sukhinaḥ",
    translation: "May all beings be happy.",
    meaning:
      "Inner peace that stops at the edge of the self is unfinished. Well-being is something we wish outward.",
  },
  {
    sanskrit: "तमसो मा ज्योतिर्गमय",
    transliteration: "Tamaso mā jyotir gamaya",
    translation: "Lead me from darkness to light.",
    meaning:
      "Every morning is an invitation to begin again — a new beginning offered without conditions.",
  },
];
