export type MembershipTier = "seeker" | "practitioner" | "sadhaka";

export type MembershipPlan = {
  tier: MembershipTier;
  name: string;
  tagline: string;
  priceInr: number;
  cadence: string;
  courseAccess: string;
  perks: string[];
  bestFor: string;
  featured?: boolean;
};

export const membershipPlans: MembershipPlan[] = [
  {
    tier: "seeker",
    name: "Seeker",
    tagline: "Begin properly, without hurry.",
    priceInr: 4800,
    cadence: "per year",
    courseAccess: "All five Foundation courses, for as long as you are a member",
    perks: [
      "Foundation track — yoga, meditation, breath and philosophy basics",
      "Two live sessions every week, with the recordings kept for a fortnight",
      "Private practice journal and streak tracking",
      "Badge wall and daily practice prompts",
      "Free entry to all Community events, online or in the courtyard",
    ],
    bestFor: "A first year of honest daily practice.",
  },
  {
    tier: "practitioner",
    name: "Practitioner",
    tagline: "Study widely, ask freely.",
    priceInr: 9600,
    cadence: "per year",
    courseAccess: "All Foundation, Wellness and Special programs — fifteen courses",
    perks: [
      "Everything in Seeker",
      "Wellness and Special tracks: stress, sleep, focus, children's yoga and more",
      "Unanswered questions answered by a teacher within 48 hours",
      "Every live session, with permanent access to the recordings",
      "Written test reviews and recorded practice feedback from senior teachers",
      "Certificates of participation for each course you complete",
      "25% off all workshops and retreats",
    ],
    bestFor: "Practitioners who want the whole curriculum, not one course at a time.",
    featured: true,
  },
  {
    tier: "sadhaka",
    name: "Sadhaka",
    tagline: "Walk the full path, including teaching.",
    priceInr: 18000,
    cadence: "per year",
    courseAccess: "All twenty programs, including Teacher Training and Advanced Practice",
    perks: [
      "Everything in Practitioner",
      "Teacher Training and Advanced Practice tracks unlocked",
      "One private mentoring call each month with a senior teacher",
      "Priority seats and slot booking for every retreat and Yoga Day sitting",
      "Free entry to all monthly intensives, online or in the hall",
      "Guest pass — bring one person to any community gathering",
      "Foundation library: chant sheets, sutra commentaries and practice manuals",
    ],
    bestFor: "Those preparing to teach, or practising toward it.",
  },
];

export const membershipFaqs = [
  {
    q: "Can I still buy a single course?",
    a: "Yes. Every program remains available on its own, and the price you paid for it is credited if you upgrade to a membership within thirty days.",
  },
  {
    q: "What happens when my membership ends?",
    a: "Your notes, badges, streak and certificates stay yours permanently. Course videos and live rooms pause until you renew.",
  },
  {
    q: "Can I change level midway?",
    a: "Upgrade any time — you pay only the difference for the remaining months. Downgrades take effect at renewal.",
  },
  {
    q: "Is there a concession?",
    a: "Students, teachers in service, and anyone in genuine need can write to the foundation. No one has been turned away yet.",
  },
];

export const rupees = (paise: number) => `₹${paise.toLocaleString("en-IN")}`;
