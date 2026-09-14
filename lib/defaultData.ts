export interface SiteSettings {
  celebrant_name: string;
  nick_name: string;
  hero_tagline: string;
  hero_subheading: string;
  days_count: string;
  smiles_count: string;
  adventures_count: string;
}

export interface PolaroidItem {
  id: string;
  title: string;
  date_label: string;
  location_or_sub: string;
  quote: string;
  image_url: string;
  rotation_deg: number;
  sort_order: number;
  category?: string;
  note?: string;
  likes_count?: number;
}

export interface MilestoneItem {
  id: string;
  chapter_num: string;
  date_label: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface BirthdayLetter {
  salutation: string;
  body_paragraphs: string[];
  signoff_label: string;
  signoff_name: string;
  wax_initial: string;
}

export interface WishItem {
  id: string;
  sender_name: string;
  message: string;
  emoji?: string;
  created_at?: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  celebrant_name: 'Riya',
  nick_name: 'Babe',
  hero_tagline: 'Today is all about you, my favorite person',
  hero_subheading: 'A little corner on the internet crafted just for you—celebrating your infectious laughter, endless sweetness, and every golden memory we share.',
  days_count: '365',
  smiles_count: '10,000+',
  adventures_count: 'Infinity',
};

export const DEFAULT_POLAROIDS: PolaroidItem[] = [
  {
    id: '1',
    title: '',
    date_label: '',
    location_or_sub: '',
    quote: '"You smiled, and my entire world lit up."',
    image_url: '/images/photo-1.png',
    rotation_deg: -2.5,
    sort_order: 1,
    note: 'Every hug with you feels like home. That was the moment I realized you were truly someone special.',
    likes_count: 84,
  },
  {
    id: '2',
    title: '',
    date_label: '',
    location_or_sub: '',
    quote: '"Wind in your hair, pure unrestrained joy."',
    image_url: '/images/photo-2.jpg',
    rotation_deg: 2.0,
    sort_order: 2,
    note: 'Exploring ancient courtyards and smiling under the afternoon sun. Pure happiness captured in one frame.',
    likes_count: 128,
  },
  {
    id: '3',
    title: '',
    date_label: '',
    location_or_sub: '',
    quote: '"Every flower reminds me how rare you are."',
    image_url: '/images/photo-3.jpg',
    rotation_deg: -3.0,
    sort_order: 3,
    note: 'Under the fluttering prayer flags and clear blue skies. Every adventure is brighter by your side.',
    likes_count: 95,
  },
  {
    id: '4',
    title: '',
    date_label: '',
    location_or_sub: '',
    quote: '"Here\'s to all your wishes coming true."',
    image_url: '/images/photo-4.jpg',
    rotation_deg: 1.5,
    sort_order: 4,
    note: 'Sitting together in the quiet garden breeze, counting our blessings and celebrating another wonderful year of you.',
    likes_count: 240,
  },
];

export const DEFAULT_MILESTONES: MilestoneItem[] = [
  {
    id: '1',
    chapter_num: 'Chapter 01',
    date_label: 'October 2022',
    title: 'The Day We First Talked',
    description: 'We talked for three straight hours about music, favorite comfort foods, and silly childhood stories. I remember walking away thinking, "She is so special."',
    sort_order: 1,
  },
  {
    id: '2',
    chapter_num: 'Chapter 02',
    date_label: 'Summer 2023',
    title: 'The Seaside Sunset Road Trip',
    description: 'Singing horribly off-key to old indie playlists with the windows rolled all the way down. The golden sun hitting your eyes made that day unforgettable.',
    sort_order: 2,
  },
  {
    id: '3',
    chapter_num: 'Chapter 03',
    date_label: 'Today & Beyond',
    title: 'Celebrating Another Year of You',
    description: 'Stepping into this new age together. More laughter, more coffee dates, more silly dances in the kitchen, and infinite love.',
    sort_order: 3,
  },
];

export const DEFAULT_LETTER: BirthdayLetter = {
  salutation: 'To My Dearest Person,',
  body_paragraphs: [
    'If anyone ever asked me what home feels like, I’d tell them it’s the sound of your laugh across the room. There’s something completely effortless about the way you bring sunshine into ordinary days.',
    'From spontaneous late-night chai runs to getting lost on quiet coastal roads, every mundane moment transforms into an unforgettable story whenever you\'re beside me. Thank you for your warmth, your sharp wit, and your massive heart that loves so fiercely.',
    'On your birthday, my only wish for you is boundless happiness, reckless dreams fulfilled, and the peace of knowing you are so deeply, endlessly cherished.',
  ],
  signoff_label: 'ALWAYS & FOREVER YOURS,',
  signoff_name: 'With all my love ❤️',
  wax_initial: 'R',
};

export const DEFAULT_WISHES: WishItem[] = [];
