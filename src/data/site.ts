export const SITE = {
  name: 'Manhood Applied',
  shortName: 'MAPP',
  url: 'https://manhoodapplied.github.io',
  description: 'Practical ideas for men who want clearer judgment, stronger discipline, better health, useful ambition, and healthier relationships.',
  promise: 'Useful ideas. Applied to real life.',
  social: {
    instagram: 'https://www.instagram.com/manhoodapplied/',
    tiktok: 'https://www.tiktok.com/@manhoodapplied',
    youtube: 'https://www.youtube.com/@manhoodapplied',
  },
} as const;

export const CATEGORIES = {
  'mind-judgment': { name: 'Mind & Judgment', number: '01', description: 'Attention, learning, emotional regulation, and clear thinking.' },
  'body-health': { name: 'Body & Health', number: '02', description: 'Sleep, movement, food, recovery, and evidence-based wellbeing.' },
  'work-money': { name: 'Work & Money', number: '03', description: 'Skill, responsibility, earning, planning, and useful ambition.' },
  relationships: { name: 'Relationships', number: '04', description: 'Communication, attraction, partnership, fatherhood, and repair.' },
  'character-discipline': { name: 'Character & Discipline', number: '05', description: 'Integrity, courage, service, resilience, and keeping promises.' },
} as const;

export type CategorySlug = keyof typeof CATEGORIES;
