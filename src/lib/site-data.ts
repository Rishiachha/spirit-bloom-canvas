export type Video = {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  highlights: string[];
  description: string;
};

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
        description: "An introduction to the foundations of yoga.",
      },
      {
        id: "yfc-2",
        title: "Breath Awareness",
        duration: "15 min",
        thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=640&q=80",
        highlights: ["Diaphragmatic breathing", "Breath ratios", "Calming the nervous system"],
        description: "Learn the basics of diaphragmatic breathing.",
      },
      {
        id: "yfc-3",
        title: "Standing Asanas",
        duration: "20 min",
        thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=640&q=80",
        highlights: ["Mountain pose", "Warrior sequences", "Alignment cues"],
        description: "A guided sequence of standing asanas with alignment cues.",
      },
      {
        id: "yfc-4",
        title: "Yoga Philosophy",
        duration: "18 min",
        thumbnail: "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=640&q=80",
        highlights: ["Eight limbs of yoga", "Yamas and niyamas", "Applying philosophy daily"],
        description: "An overview of the eight limbs of yoga.",
      },
      {
        id: "yfc-5",
        title: "Daily Practice Flow",
        duration: "25 min",
        thumbnail: "https://images.unsplash.com/photo-1575052814085-f385151767da?w=640&q=80",
        highlights: ["Full sequence", "Breath sync", "Cool down"],
        description: "A complete daily practice flow.",
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
        description: "Explore the benefits of meditation and set intentions.",
      },
      {
        id: "mfc-2",
        title: "Breath Meditation",
        duration: "15 min",
        thumbnail: "https://images.unsplash.com/photo-1545235617-9465d2a55698?w=640&q=80",
        highlights: ["Anchoring to breath", "Dealing with distractions", "Building focus"],
        description: "A guided breath meditation to build concentration.",
      },
      {
        id: "mfc-3",
        title: "Body Scan",
        duration: "20 min",
        thumbnail: "https://images.unsplash.com/photo-1575052814085-f385151767da?w=640&q=80",
        highlights: ["Progressive relaxation", "Body awareness", "Releasing tension"],
        description: "A guided body scan to develop awareness.",
      },
    ],
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
    description: "Children aged 6 to 12 are in a formative stage where curiosity, imagination, and emotional sensitivity shape every experience. Their minds are naturally absorbent but easily scattered, making focused practice both challenging and deeply beneficial. Our Children Yoga Program uses story-led movement, breath games, and kindness practice to channel their energy into calm, confident presence. Rather than demanding stillness, we meet children where they are — through play, narrative, and gentle guidance. Over six weeks, they develop body awareness, emotional regulation, and the habit of pausing before reacting. These are not just yoga lessons; they are foundational skills for how a child relates to their own mind and body for life.",
    duration: "6 weeks",
    level: "Ages 6–12",
    image: "https://imgs.search.brave.com/TSrdxQuLi-TfO85s57eKIZFkuSOzqc_OOvi2UGGUgFE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/NDI4Mzk1Mi9waG90/by9tdWx0aS1ldGhu/aWMtZWxlbWVudGFy/eS1zdHVkZW50cy1z/dHJldGNoaW5nLWlu/LWd5bS1jbGFzcy1z/dG9jay1waG90by5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/NmVRS0F6dmtLWHRz/OEZ1YktZR0k1WWxL/QzhuRjVjYXpYc1Fj/cGpSZmYyTT0",
    includes: ["Story-led asana", "Breath games", "Kindness practice", "Calm corners", "Creative movement", "Relaxation stories"],
  },
  {
    slug: "teen-yoga-program",
    title: "Teen Yoga Program",
    group: "Special",
    purpose: "Steadiness through the years of change.",
    description: "Adolescence is a period of profound neurological and emotional transformation. The teenage brain is rewiring itself at a rapid pace, which often manifests as mood swings, anxiety, self-consciousness, and a desperate need for belonging. Teen Yoga meets these realities with practice that honours their experience rather than dismissing it. Through confidence-building sequences, exam-calming breathwork, and body respect exercises, teens learn to navigate the turbulence of growing up with steadiness and self-compassion. They discover that yoga is not about performance or perfection — it is about showing up for themselves, exactly as they are, in a body that is changing every day.",
    duration: "6 weeks",
    level: "Ages 13–18",
    image: "https://imgs.search.brave.com/ImXVJZpkLF8HHJ9soNSHr7-ZHmxdxhQpIn63i4OF0CM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc3F1YXJlc3Bh/Y2UtY2RuLmNvbS9j/b250ZW50L3YxLzU4/Y2FiNjU5OWRlNGJi/N2I2MmFlMzg4ZS8z/N2ZkMjBjMy1kOWRm/LTRmM2YtOTM1Zi1i/ZmRkZjVmYWRlMjIv/eW9nYS10ZWVuYWdl/cnMtdGVlbnMtZ2ly/bHMtbWVkaWF0aW9u/LmpwZw",
    includes: ["Confidence practice", "Exam calm", "Body respect", "Breath tools", "Mindful movement", "Stress resilience"],
  },
  {
    slug: "college-students-wellness-program",
    title: "College Students Wellness Program",
    group: "Special",
    purpose: "Clarity, sleep and resilience through demanding years.",
    description: "College life demands more than academic ability — it requires sustained focus, emotional balance, and the capacity to recover from setbacks. Students face a unique combination of intellectual pressure, social uncertainty, sleep disruption, and identity exploration. The College Students Wellness Program addresses these specific challenges with practices that sharpen focus, release accumulated stress, repair disrupted sleep patterns, and build peer support networks. Each session is designed to fit into a student's busy schedule while delivering deep, lasting benefits. The goal is not just to survive these years but to thrive in them — with clarity, rest, and genuine connection.",
    duration: "6 weeks",
    level: "All levels",
    image: "https://imgs.search.brave.com/It5A0QqeCAFHfwvuo_4Gq1YgNTDcelSt2E79lqZT3Zo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvODEw/MjQ3ODEyL3Bob3Rv/L3VuaXZlcnNpdHkt/c3R1ZGVudHMtbWVk/aXRhdGluZy10b2dl/dGhlci5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9MWxKeWJO/STR6NTB0b2FkNVk2/WEt6S1l2V3l5dlZn/YVA5X19hUFNuVU5w/UT0",
    includes: ["Focus practice", "Stress release", "Sleep repair", "Peer circles", "Study breathwork", "Evening wind-down"],
  },
  {
    slug: "working-professionals-yoga-program",
    title: "Working Professionals Yoga Program",
    group: "Special",
    purpose: "Twenty honest minutes that change a working day.",
    description: "Working professionals carry their stress in their shoulders, their minds in their inboxes, and their exhaustion into every evening. The demands of a career often mean that self-care is the first thing to be sacrificed. Our program is designed for people who have limited time but deep need. Through desk-release sequences, micro practices that fit between meetings, and evening unwinding routines, professionals learn to interrupt the cycle of tension and burnout. The program also includes weekend depth sessions that allow for deeper exploration and restoration. Yoga here is not another item on the to-do list — it is a deliberate act of reclaiming one's own well-being amid the demands of work.",
    duration: "8 weeks",
    level: "All levels",
    image: "https://imgs.search.brave.com/XKYolv1EfmfXR6UNT7v3EE6D1r0DglU8q7wpR4EUn5Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWNsZWFybi5zaGlu/ZS5jb20vbC9tL2lt/YWdlcy9ibG9nL3lv/Z2FfZm9yX3dvcmtp/bmdfcHJvZmVzc2lv/bmFscy53ZWJw",
    includes: ["Desk release", "Micro practices", "Evening unwinding", "Weekend depth", "Commute breathwork", "Boundary setting"],
  },
  {
    slug: "parents-wellness-program",
    title: "Parents Wellness Program",
    group: "Special",
    purpose: "Care for the one who carries everyone else.",
    description: "Parents — especially those caring for young children — often exist in a state of chronic depletion. Their own needs are perpetually deferred, and the emotional weight of caregiving can lead to burnout, resentment, and a loss of identity beyond the parental role. The Parents Wellness Program is built around the truth that a parent who is depleted cannot truly nourish their children. Through short practices that work around a child's schedule, patience training that transforms reactive moments into conscious responses, restorative rest techniques, and family rituals that weave yoga into daily life, parents rediscover themselves. This is not selfish — it is essential. When a parent practices, the entire family benefits.",
    duration: "6 weeks",
    level: "All levels",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=1920&q=80",
    includes: ["Short practices", "Patience training", "Restorative rest", "Family rituals", "Breath for patience", "Morning reset"],
  },
  {
    slug: "prenatal-yoga-program",
    title: "Prenatal Yoga Program",
    group: "Special",
    purpose: "Move with the body as it becomes two.",
    description: "Pregnancy is a time of extraordinary physical and emotional transformation. The body changes rapidly, the nervous system is in overdrive, and the anticipation of parenthood can bring both joy and anxiety. Prenatal Yoga is designed to support the pregnant body with safe, gentle asana that honours each trimester's unique needs. Pelvic breathwork prepares the body for labour, while deep relaxation techniques build the inner calm needed for childbirth and beyond. Each practice is adapted to the stage of pregnancy, ensuring that every mother-to-be feels supported, safe, and connected to the life growing within her. This is yoga that meets the body exactly where it is — today.",
    duration: "Trimester-based",
    level: "Prenatal",
    image: "https://www.yogarenewteachertraining.com/wp-content/uploads/2024/02/Cow-Pose-1536x1024.jpg",
    includes: ["Safe asana", "Pelvic breath", "Birth preparation", "Deep relaxation", "Trimester-specific sequences", "Partner connection"],
  },
  {
    slug: "new-mothers-wellness-program",
    title: "New Mothers Wellness Program",
    group: "Special",
    purpose: "Gentle return to strength, sleep and self.",
    description: "The postpartum period is one of the most physically and emotionally vulnerable times in a woman's life. The body has been through profound change, sleep is fragmented, and the demands of a newborn can feel overwhelming. The New Mothers Wellness Program approaches this transition with extraordinary gentleness. Core recovery is introduced gradually, never forcing the body back to what it was before. Rest practice is not a luxury but a necessity — and mothers are taught to find moments of restoration even in the busiest days. Emotional care practices address the hormonal shifts and identity changes that often go unspoken. Mother circles create a community of women who understand exactly what this season of life feels like. You are not alone, and you do not need to rush back to who you were.",
    duration: "8 weeks",
    level: "Postnatal",
    image: "https://imgs.search.brave.com/bo1q-gOOFA7usUD2xabdbGPrXNai49B04RyaiyNpxZI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE1/MDQ4MjczNy9waG90/by9tb3RoZXJzLXN0/cmV0Y2hpbmctZG9p/bmcteW9nYS1pbi10/aGUtcGFyay5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9VFhV/bjBVZm1tWjFQd1VE/Q3AxbHJKcUhuT1ow/TUhSWXp5U0lURHNz/TEdMMD0",
    includes: ["Core recovery", "Rest practice", "Emotional care", "Mother circles", "Gentle movement", "Sleep support"],
  },
  {
    slug: "senior-citizens-yoga-program",
    title: "Senior Citizens Yoga Program",
    group: "Special",
    purpose: "Mobility, balance and dignity in later years.",
    description: "Ageing brings changes that affect every dimension of daily life — balance becomes uncertain, joints become stiff, and the fear of falling can quietly shrink a person's world. Senior Citizens Yoga is designed to meet these challenges with patience and respect. Chair yoga makes the practice accessible regardless of mobility level. Joint care sequences gently maintain range of motion and reduce stiffness. Balance work is practiced safely, with props and support always available. Breath longevity practices support respiratory health and calm the nervous system. But beyond the physical, this program honours something deeper: the dignity of an older body that has carried a life's worth of experience. Yoga here is not about defying age — it is about inhabiting it with grace, strength, and quiet joy.",
    duration: "12 weeks",
    level: "Gentle",
    image: "https://imgs.search.brave.com/2vcoY5WTYGQUWNT0qRIdBxRQ0EAw4mhj8hnpfJrqT9I/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdG9y/eXBvaW50LmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMi8w/OC9VbnRpdGxlZC1k/ZXNpZ24tNDQucG5n",
    includes: ["Chair yoga", "Joint care", "Balance work", "Breath longevity", "Gentle flow", "Fall prevention"],
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
    slug: "health-wellness-guided-program",
    title: "Health & Wellness Guided Program",
    group: "Wellness",
    purpose: "Guided practices for the body and mind you live in every day.",
    description: "Eight common challenges that affect nearly every member of our community — back pain, joint stiffness, stress, anxiety, sleep disruption, and more. This program is not a collection of generic tips. It is a structured, guided journey through the practices that the Foundation has refined over decades: gentle movement for stiff joints, breathwork for anxiety, evening sequences for sleep, and daily rituals for lasting vitality. Each module addresses one problem directly, with practices you can do in 15 to 30 minutes. No equipment is needed beyond a mat and a willingness to begin.",
    duration: "8 weeks",
    level: "All levels",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920&q=80",
    includes: ["Physical Wellness", "Back Care", "Joint Health", "Mental Wellness", "Stress Release", "Anxiety Relief", "Sleep Repair", "Healthy Living"],
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

export type EventCategory = "community" | "connection" | "celebration";

export type FoundationEvent = {
  slug: string;
  title: string;
  date: string;
  place: string;
  kind: string;
  blurb: string;
  category: EventCategory;
  about: string;
  modes: ("online" | "offline")[];
  contribution: string;
  onlineInstructions: string[];
  offlineInstructions: string[];
  slots: string[];
  bring: string[];
};

export const eventCategories: {
  key: EventCategory;
  label: string;
  intro: string;
  description: string;
}[] = [
  {
    key: "community",
    label: "Community",
    intro: "Gatherings hosted by local volunteers, open to everyone.",
    description:
      "No VIP rows, no reserved seats. Community gatherings are held by the people who live nearby, and shared food always follows the practice.",
  },
  {
    key: "connection",
    label: "Connection",
    intro: "Workshops and retreats where practice deepens with guidance.",
    description:
      "Smaller circles, longer hours, senior teachers close by. Connection events are where a question you have carried for years finally gets answered.",
  },
  {
    key: "celebration",
    label: "Celebration",
    intro: "Days when the whole tradition celebrates together.",
    description:
      "Chanting, music, silence and thousands of mats at sunrise — the tradition has always known how to celebrate quietly.",
  },
];

export const events: FoundationEvent[] = [
  {
    slug: "international-yoga-day",
    title: "International Yoga Day",
    date: "21 June",
    place: "Riverbank Grounds, Rishikesh",
    kind: "Celebration",
    category: "celebration",
    blurb:
      "Ten thousand mats at sunrise. One breath, held together by a city that wakes early for it.",
    about:
      "A single sequence, taught simultaneously on the riverbank and on the global stream, followed by chanting and a shared breakfast. Beginners are as welcome as teachers of forty years.",
    modes: ["online", "offline"],
    contribution: "Free — donations to the community kitchen are welcome",
    onlineInstructions: [
      "Your joining link arrives by email immediately after registration and again 24 hours before.",
      "Join 15 minutes early; the stream opens with guided settling.",
      "Keep a mat, a folded blanket and drinking water within reach.",
      "Cameras optional. The teacher reads the chat for questions between rounds.",
    ],
    offlineInstructions: [
      "Gates open 05:00. Please be seated on your mat by 05:40.",
      "Carry the printed slot confirmation or the QR in your registration email.",
      "Parking is at Ghat Road; the last 400 metres are walked.",
      "Practice ends 07:30, followed by prasad in the courtyard.",
    ],
    slots: ["05:30 — Sunrise sequence", "07:00 — Second sitting", "17:30 — Evening chanting"],
    bring: ["Yoga mat", "Light cotton clothing", "Water bottle", "A shawl for the sitting"],
  },
  {
    slug: "himalayan-silence-retreat",
    title: "Himalayan Silence Retreat",
    date: "12–17 October",
    place: "Foundation Ashram, Uttarkashi",
    kind: "Retreat",
    category: "connection",
    blurb: "Five days of noble silence in the high valleys, guided by senior teachers.",
    about:
      "Five days of maunam — silence held gently, with three practice sessions daily, one hour of teaching, and long afternoons where nothing is asked of you.",
    modes: ["offline"],
    contribution: "₹18,000 — includes stay and all meals",
    onlineInstructions: [
      "This retreat is held in residence only. Register your interest and we will offer you the nearest online intensive instead.",
    ],
    offlineInstructions: [
      "Arrive on 12 October between 14:00 and 17:00; departure after breakfast on 17 October.",
      "Silence begins at the 19:00 opening sitting and holds until the final morning.",
      "Phones are handed in at reception and returned on departure.",
      "Rooms are twin-share; single rooms on request, subject to availability.",
    ],
    slots: ["Full residency — 12 to 17 October"],
    bring: [
      "Warm layers (nights near 4°C)",
      "Sturdy walking shoes",
      "Torch",
      "Notebook",
      "Any personal medication",
    ],
  },
  {
    slug: "pranayama-intensive",
    title: "Pranayama Intensive",
    date: "Second Saturday, monthly",
    place: "Foundation Hall & Online",
    kind: "Workshop",
    category: "connection",
    blurb: "A half day inside the breath — ratios, retention, and the science beneath them.",
    about:
      "Four hours of graded breathwork: nadi shodhana, ujjayi, the ratios of kumbhaka, and a clear look at what the physiology is actually doing.",
    modes: ["online", "offline"],
    contribution: "₹1,200 — free for Sadhaka members",
    onlineInstructions: [
      "A private room link is issued on registration and stays valid for every future intensive.",
      "Sit where you can be undisturbed for four hours; the practice is not safe to interrupt mid-retention.",
      "Eat lightly at least two hours before.",
      "Recording is shared for seven days afterwards.",
    ],
    offlineInstructions: [
      "Hall opens 08:30 for the 09:00 start; late entry disturbs retention rounds.",
      "Come on an empty or very light stomach.",
      "Bring your slot confirmation to the desk for your cushion allocation.",
      "Tea and fruit are served at the 11:00 break.",
    ],
    slots: ["09:00 — Morning intensive", "14:00 — Afternoon intensive"],
    bring: ["Meditation cushion or folded blanket", "Shawl", "Notebook", "Water"],
  },
  {
    slug: "community-satsang",
    title: "Community Satsang",
    date: "Every full moon",
    place: "Courtyard, open to all",
    kind: "Community",
    category: "community",
    blurb: "Chanting, silence and shared food. No registration, no fee, no requirement.",
    about:
      "An evening of kirtan, a short teaching, twenty minutes of silence and then dinner on the floor together. Children and elders both belong here.",
    modes: ["online", "offline"],
    contribution: "Free",
    onlineInstructions: [
      "The stream link reaches you an hour before the sitting.",
      "Chant sheets with transliteration and translation are attached to the same email.",
      "Light a lamp where you sit, if you keep one.",
      "The chat stays open after the sitting for anyone who wants to talk.",
    ],
    offlineInstructions: [
      "Courtyard opens 18:00; kirtan begins at 18:30 sharp.",
      "Seating is on the floor; a few chairs are kept aside — mention it in your registration note.",
      "Footwear is left at the north gate.",
      "Dinner is served at 20:00. Volunteers welcome from 17:00.",
    ],
    slots: ["18:30 — Full moon sitting"],
    bring: ["A shawl", "Your own steel cup, if you can", "Nothing else is needed"],
  },
];


export const liveClasses = [
  {
    slug: "morning-pranayama",
    title: "Morning Pranayama",
    date: "Every Monday & Thursday",
    place: "Foundation Hall & Online",
    kind: "Breathwork",
    blurb: "Start the day with guided breathwork — ratios, retention, and the science beneath them.",
  },
  {
    slug: "sunrise-yoga-flow",
    title: "Sunrise Yoga Flow",
    date: "Every Wednesday & Saturday",
    place: "Riverbank Grounds, Rishikesh",
    kind: "Asana",
    blurb: "A gentle flow at sunrise — alignment, breath, and stillness before the day begins.",
  },
  {
    slug: "guided-meditation-session",
    title: "Guided Meditation Session",
    date: "Every Friday",
    place: "Online",
    kind: "Meditation",
    blurb: "A 30-minute guided meditation for focus, calm, and inner clarity.",
  },
  {
    slug: "satsang-circle",
    title: "Satsang Circle",
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
