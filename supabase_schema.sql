-- ==============================================================================
-- Supabase Schema for Riya's Birthday Website
-- Run this SQL script in your Supabase SQL Editor to set up tables & sample data
-- ==============================================================================

-- 1. Site Settings & Dynamic Copy
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  celebrant_name TEXT NOT NULL DEFAULT 'Riya',
  nick_name TEXT NOT NULL DEFAULT 'Babe',
  hero_tagline TEXT NOT NULL DEFAULT 'Today is all about you, my favorite person',
  hero_subheading TEXT NOT NULL DEFAULT 'A little corner on the internet crafted just for you—celebrating your infectious laughter, endless sweetness, and every golden memory we share.',
  days_count TEXT NOT NULL DEFAULT '365',
  smiles_count TEXT NOT NULL DEFAULT '10,000+',
  adventures_count TEXT NOT NULL DEFAULT 'Infinity',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Polaroid Scrapbook Photos
CREATE TABLE IF NOT EXISTS polaroids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  date_label TEXT NOT NULL,
  location_or_sub TEXT NOT NULL,
  quote TEXT NOT NULL,
  image_url TEXT NOT NULL,
  rotation_deg NUMERIC DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  category TEXT DEFAULT 'Memories',
  note TEXT,
  likes_count INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Milestones ("Chapters of Us")
CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_num TEXT NOT NULL,
  date_label TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Love Letter Content
CREATE TABLE IF NOT EXISTS birthday_letters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  salutation TEXT NOT NULL DEFAULT 'To My Dearest Riya,',
  body_paragraphs TEXT[] NOT NULL,
  signoff_label TEXT NOT NULL DEFAULT 'Always & Forever Yours,',
  signoff_name TEXT NOT NULL DEFAULT 'With all my love ❤️',
  wax_initial TEXT NOT NULL DEFAULT 'R',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Secret Wishes & Guestbook
CREATE TABLE IF NOT EXISTS wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_name TEXT NOT NULL DEFAULT 'A Well-Wisher',
  message TEXT NOT NULL,
  emoji TEXT DEFAULT '🎂',
  is_secret BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Interactive Stats (e.g. Virtual Hugs Counter)
CREATE TABLE IF NOT EXISTS stats (
  id TEXT PRIMARY KEY,
  counter INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE polaroids ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE birthday_letters ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public can read polaroids" ON polaroids FOR SELECT USING (true);
CREATE POLICY "Public can read milestones" ON milestones FOR SELECT USING (true);
CREATE POLICY "Public can read birthday_letters" ON birthday_letters FOR SELECT USING (true);
CREATE POLICY "Public can read wishes" ON wishes FOR SELECT USING (is_secret = false OR is_secret IS NULL);
CREATE POLICY "Public can read stats" ON stats FOR SELECT USING (true);

-- Public write policies for interactive features
CREATE POLICY "Public can insert wishes" ON wishes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update stats" ON stats FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Public can increment polaroid likes" ON polaroids FOR UPDATE USING (true) WITH CHECK (true);

-- ==============================================================================
-- Initial Seed Data
-- ==============================================================================

-- Clear existing sample data
TRUNCATE TABLE site_settings, polaroids, milestones, birthday_letters, stats CASCADE;

-- Seed Site Settings
INSERT INTO site_settings (celebrant_name, nick_name, hero_tagline, hero_subheading, days_count, smiles_count, adventures_count)
VALUES (
  'Riya',
  'Babe',
  'Today is all about you, my favorite person',
  'A little corner on the internet crafted just for you—celebrating your infectious laughter, endless sweetness, and every golden memory we share.',
  '365',
  '10,000+',
  'Infinity'
);

-- Seed Polaroids (Directly from the UI design)
INSERT INTO polaroids (title, date_label, location_or_sub, quote, image_url, rotation_deg, sort_order, note)
VALUES 
(
  'The Golden Hour Glow',
  'Oct 14',
  'First Cafe Date',
  'You smiled, and my entire world lit up.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBn65qawA--dmWo2QxFzrY04o_ypXeA9Z-p9ULOTDjytVkPtINDZ2lWWAhBpz_xXATsk_gPmTbyAhmtMjNB8f8FnyuyH-kYelweHF2cUQB4PJEt8zTp1Fs3sRIfg_tHXmfnxPowiU_O2mGDW-2-tch6N7PEvHzeI740hOHH7j49ktbBZ4ts0UPkxtejftvAKlgGNxoML6lfZxWs3hflaGqdJtp-gvh8qFcwczFYXkT9jC42YmnFgrGqtA',
  -2.5,
  1,
  'We ordered two caramel macchiatos and talked until the barista flipped the closed sign. That was the moment I knew you were the one.'
),
(
  'Laughter by the Sea',
  'July 22',
  'Coastal Drive',
  'Wind in your hair, pure unrestrained joy.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDYLXsl5ByzU1ehPVbPPDxng4bVZVw5kMu2YJnkU-IvxOn7yVqJKFvPOF0a-9DWKo5X3wF0P1zouHbb2CEnoY_spbUgDbOv90CNiRMQUzF2gCIUcZWVuw9t9YxkFRmg30QC31_ayrmuv24KQL10XQtlUyn8M7hRkZ8z3siqyKUhTmEKPCmHydrbmte-DkQLGLbiP1qzb_b-kDApO7mkvBHdUOQtegHK_MJQzh4bjwMJpgAXGGwbM0PycA',
  2.0,
  2,
  'The ocean breeze had your curls dancing, and your laugh carried across the sand. One of my happiest days on this earth.'
),
(
  'Spontaneous Roses',
  'Nov 03',
  'Just Because',
  'Every flower reminds me how rare you are.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCcWXSUgz497gomnQ-ULF4E_vglcK-dL2VWC6iQtEBoK7XQUvt_qExW0Urx51nDeTU0RHZYIDxHUUSXPRY27jjEfeIBn4t78Fj3olG2Z7AGnKJSS-MmHbDYzgXOFKfMeJcXv2FamihSv-7wuinmkd9hY0LNnWgQlZ65Tj93cuFlv4sYe3XImycT0OaaIwMs7Duj0iO4zHNVUDCOuKxXGaqrdvvEHfBrGz1H-s7u695lkDySkk45M4SFEA',
  -3.0,
  3,
  'Surprised you right as you came down the stairs. The cute little gasp you let out will forever be playing on repeat in my mind.'
),
(
  'Sweetest Midnight',
  'Today',
  'Birthday Eve',
  'Here''s to all your wishes coming true.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD3eBBIiioOkSfajHVBO0VGETVisb3LnNRvqTvkgZU7ihSINg-oHM2NVsWzPt6UWb0vOSwi1g7d03iW1oTmnZaCJ1Yt8hlwqTiilku5YeswCorMdy0QDb2E9AJ3UIK-i6SDZUshx_3bhW8WqBSsWRuLxTyfwCnLjhZ7hvAlzZnC4jqFOmI8DyCryWkaIN75x7fmMiz5Uset0e3TUK4_gdwoYO1oV600xlU8Mjz-aE6DcNE0mJko8KV-5g',
  1.5,
  4,
  'Counting down the seconds to midnight just to be the first one to say: Happy Birthday, my love!'
);

-- Seed Milestones ("Chapters of Us")
INSERT INTO milestones (chapter_num, date_label, title, description, sort_order)
VALUES
(
  'Chapter 01',
  'October 2022',
  'The Day We First Talked',
  'We talked for three straight hours about music, favorite comfort foods, and silly childhood stories. I remember walking away thinking, "She is so special."',
  1
),
(
  'Chapter 02',
  'Summer 2023',
  'The Seaside Sunset Road Trip',
  'Singing horribly off-key to old indie playlists with the windows rolled all the way down. The golden sun hitting your eyes made that day unforgettable.',
  2
),
(
  'Chapter 03',
  'Today & Beyond',
  'Celebrating Another Year of You',
  'Stepping into this new age together. More laughter, more coffee dates, more silly dances in the kitchen, and infinite love.',
  3
);

-- Seed Love Letter
INSERT INTO birthday_letters (salutation, body_paragraphs, signoff_label, signoff_name, wax_initial)
VALUES (
  'To My Dearest Riya,',
  ARRAY[
    'If anyone ever asked me what home feels like, I’d tell them it’s the sound of your laugh across the room. There’s something completely effortless about the way you bring sunshine into ordinary days.',
    'From spontaneous late-night chai runs to getting lost on quiet coastal roads, every mundane moment transforms into an unforgettable story whenever you''re beside me. Thank you for your warmth, your sharp wit, and your massive heart that loves so fiercely.',
    'On your birthday, my only wish for you is boundless happiness, reckless dreams fulfilled, and the peace of knowing you are so deeply, endlessly cherished.'
  ],
  'Always & Forever Yours,',
  'With all my love ❤️',
  'R'
);

-- Seed Hugs Stat
INSERT INTO stats (id, counter)
VALUES ('hugs', 10042)
ON CONFLICT (id) DO NOTHING;

-- Seed Sample Wishes
INSERT INTO wishes (sender_name, message, emoji)
VALUES
('Bestie Maya', 'Happy Birthday Queen! May this year bring you all the love, health, and success you deserve! 🥂✨', '🎉'),
('Arjun', 'Happiest Birthday Riya! Stay the vibrant, shining superstar that you always are! 🌟', '💖'),
('Secret Admirer', 'Keep lighting up every room you walk into. Happy Birthday! 🎂', '🌹');
