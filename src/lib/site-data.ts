export type Course = {
  slug: string;
  title: string;
  group: "Beginner" | "Advanced" | "Wellness" | "Special" | "Retreats";
  purpose: string;
  description?: string;
  duration: string;
  level: string;
  image?: string;
  includes: string[];
  videos?: Video[];
};

export type Video = {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  highlights: string[];
  description: string;
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
    videos: [
      {
        id: "yfc-1",
        title: "Introduction to Yoga",
        duration: "12 min",
        thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&q=80",
        highlights: ["What yoga is", "Why it matters", "Setting up your space"],
        description: "An introduction to the foundations of yoga — what it is, why it matters, and how to set up a practice space at home.",
      },
      {
        id: "yfc-2",
        title: "Breath Awareness",
        duration: "15 min",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&q=80",
        highlights: ["Diaphragmatic breathing", "Breath ratios", "Calming the nervous system"],
        description: "Learn the basics of diaphragmatic breathing and how breath ratios can calm the nervous system.",
      },
      {
        id: "yfc-3",
        title: "Standing Asanas",
        duration: "20 min",
        thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=640&q=80",
        highlights: ["Mountain pose", "Warrior sequences", "Alignment cues"],
        description: "A guided sequence of standing asanas with detailed alignment cues for safe practice.",
      },
      {
        id: "yfc-4",
        title: "Yoga Philosophy",
        duration: "18 min",
        thumbnail: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=640&q=80",
        highlights: ["Eight limbs of yoga", "Yamas and niyamas", "Applying philosophy daily"],
        description: "An overview of the eight limbs of yoga and how the yamas and niyamas apply to daily life.",
      },
      {
        id: "yfc-5",
        title: "Daily Practice Flow",
        duration: "25 min",
        thumbnail: "https://images.unsplash.com/photo-1575052814085-f385151767da?w=640&q=80",
        highlights: ["Full sequence", "Breath sync", "Cool down"],
        description: "A complete daily practice flow that ties together breath, movement, and stillness.",
      },
    ],
  },
  {
    slug: "meditation-foundation-course",
    title: "Meditation Foundation Course",
    group: "Beginner",
    purpose: "Build a meditation practice that survives ordinary life.",
    duration: "6 weeks",
    level: "Beginner",
    includes: ["Mindfulness", "Breath meditation", "Concentration", "Inner awareness"],
    videos: [
      {
        id: "mfc-1",
        title: "Why Meditate",
        duration: "10 min",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&q=80",
        highlights: ["Benefits of meditation", "What to expect", "Setting intentions"],
        description: "Explore the benefits of meditation and set intentions for your practice.",
      },
      {
        id: "mfc-2",
        title: "Breath Meditation",
        duration: "15 min",
        thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=640&q=80",
        highlights: ["Anchoring to breath", "Dealing with distractions", "Building focus"],
        description: "A guided breath meditation to build concentration and handle distractions.",
      },
      {
        id: "mfc-3",
        title: "Body Scan",
        duration: "20 min",
        thumbnail: "https://images.unsplash.com/photo-1575052814085-f385151767da?w=640&q=80",
        highlights: ["Progressive relaxation", "Body awareness", "Releasing tension"],
        description: "A guided body scan to develop awareness and release physical tension.",
      },
    ],
  },
  {
    slug: "stress-management-program",
    title: "Stress Management Program",
    group: "Wellness",
    purpose: "Release the tension the mind holds without noticing.",
    duration: "4 weeks",
    level: "All levels",
    includes: ["Nervous system reset", "Guided relaxation", "Breath ratios", "Evening practice"],
    videos: [
      {
        id: "smp-1",
        title: "Understanding Stress",
        duration: "14 min",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&q=80",
        highlights: ["Stress response", "Nervous system", "Recognizing tension"],
        description: "Learn how the stress response works and how to recognize tension in your body.",
      },
      {
        id: "smp-2",
        title: "Nervous System Reset",
        duration: "18 min",
        thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=640&q=80",
        highlights: ["Vagal tone", "Breath ratios", "Activation and relaxation"],
        description: "Techniques to reset the nervous system and shift from stress to calm.",
      },
      {
        id: "smp-3",
        title: "Evening Wind-Down",
        duration: "22 min",
        thumbnail: "https://images.unsplash.com/photo-1575052814085-f385151767da?w=640&q=80",
        highlights: ["Gentle movement", "Breath work", "Guided relaxation"],
        description: "An evening practice to wind down and prepare the body for restful sleep.",
      },
    ],
  },
  {
    slug: "sleep-wellness-program",
    title: "Sleep Wellness Program",
    group: "Wellness",
    purpose: "Return to deep, natural, unmedicated rest.",
    duration: "4 weeks",
    level: "All levels",
    includes: ["Yoga Nidra", "Wind-down sequences", "Sleep hygiene", "Night breathing"],
    videos: [
      {
        id: "swp-1",
        title: "Sleep Hygiene",
        duration: "10 min",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&q=80",
        highlights: ["Sleep environment", "Screen habits", "Consistent schedule"],
        description: "Build better sleep hygiene with practical tips for your environment and routine.",
      },
      {
        id: "swp-2",
        title: "Yoga Nidra",
        duration: "25 min",
        thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=640&q=80",
        highlights: ["Body rotation", "Breath awareness", "Deep relaxation"],
        description: "A guided Yoga Nidra session for deep relaxation and restorative rest.",
      },
      {
        id: "swp-3",
        title: "Night Breathing",
        duration: "12 min",
        thumbnail: "https://images.unsplash.com/photo-1575052814085-f385151767da?w=640&q=80",
        highlights: ["4-7-8 breath", "Alternate nostril", "Calming the mind"],
        description: "Breathing techniques to calm the mind and prepare for sleep.",
      },
    ],
  },
  {
    slug: "health-wellness-guided-program",
    title: "Health & Wellness Guided Program",
    group: "Wellness",
    purpose: "Guided practices for the body and mind you live in every day.",
    description: "Eight common challenges that affect nearly every member of our community — back pain, joint stiffness, stress, anxiety, sleep disruption, and more. This program is not a collection of generic tips. It is a structured, guided journey through the practices that the Foundation has refined over decades: gentle movement for stiff joints, breathwork for anxiety, evening sequences for sleep, and daily rituals for lasting vitality. Each module addresses one problem directly, with practices you can do in 15 to 30 minutes. No equipment is needed beyond a mat and a willingness to begin.",
    duration: "8 weeks",
    level: "All levels",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80",
    includes: ["Physical Wellness", "Back Care", "Joint Health", "Mental Wellness", "Stress Release", "Anxiety Relief", "Sleep Repair", "Healthy Living"],
    videos: [
      {
        id: "hwgp-1",
        title: "Physical Wellness Basics",
        duration: "18 min",
        thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=640&q=80",
        highlights: ["Gentle movement", "Joint mobility", "Energy building"],
        description: "Start with the basics of physical wellness — gentle movement to build energy and joint mobility.",
      },
      {
        id: "hwgp-2",
        title: "Back Care Sequence",
        duration: "22 min",
        thumbnail: "https://images.unsplash.com/photo-1575052814085-f385151767da?w=640&q=80",
        highlights: ["Spinal mobility", "Core support", "Release tension"],
        description: "A dedicated sequence for back care focusing on spinal mobility and core support.",
      },
      {
        id: "hwgp-3",
        title: "Joint Health Practice",
        duration: "20 min",
        thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=640&q=80",
        highlights: ["Range of motion", "Gentle loading", "Synovial fluid"],
        description: "Gentle practices to maintain joint range of motion and support synovial fluid production.",
      },
      {
        id: "hwgp-4",
        title: "Mental Wellness",
        duration: "16 min",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&q=80",
        highlights: ["Mindfulness", "Emotional regulation", "Self-compassion"],
        description: "Practices for mental wellness — mindfulness, emotional regulation, and self-compassion.",
      },
      {
        id: "hwgp-5",
        title: "Stress Release",
        duration: "15 min",
        thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=640&q=80",
        highlights: ["Progressive relaxation", "Breath ratios", "Letting go"],
        description: "A guided stress release session with progressive relaxation and breath ratios.",
      },
      {
        id: "hwgp-6",
        title: "Anxiety Relief",
        duration: "17 min",
        thumbnail: "https://images.unsplash.com/photo-1575052814085-f385151767da?w=640&q=80",
        highlights: ["Grounding techniques", "Vagus nerve", "Steady breath"],
        description: "Techniques to relieve anxiety through grounding, vagus nerve stimulation, and steady breathing.",
      },
      {
        id: "hwgp-7",
        title: "Sleep Repair",
        duration: "20 min",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&q=80",
        highlights: ["Restorative poses", "Breath for sleep", "Body scan"],
        description: "Restorative poses and breathwork specifically designed to repair sleep patterns.",
      },
      {
        id: "hwgp-8",
        title: "Healthy Living Rituals",
        duration: "14 min",
        thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=640&q=80",
        highlights: ["Morning routine", "Sattvic choices", "Evening reflection"],
        description: "Build healthy living rituals with morning routines, sattvic food choices, and evening reflection.",
      },
    ],
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
