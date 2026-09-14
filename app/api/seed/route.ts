import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_POLAROIDS,
  DEFAULT_MILESTONES,
  DEFAULT_LETTER,
} from '@/lib/defaultData';

export const dynamic = 'force-dynamic';

export async function POST() {
  if (!isSupabaseConfigured || !supabase) {
    return NextResponse.json(
      {
        success: false,
        error: 'Supabase credentials are not yet configured in .env.local',
      },
      { status: 400 }
    );
  }

  try {
    const results: Record<string, string> = {};

    // 1. Site Settings
    const { error: settingsErr } = await supabase.from('site_settings').upsert({
      ...DEFAULT_SITE_SETTINGS,
    });
    results.site_settings = settingsErr ? settingsErr.message : 'OK';

    // 2. Polaroids
    const polaroidInserts = DEFAULT_POLAROIDS.map((p) => ({
      title: p.title,
      date_label: p.date_label,
      location_or_sub: p.location_or_sub,
      quote: p.quote,
      image_url: p.image_url,
      rotation_deg: p.rotation_deg,
      sort_order: p.sort_order,
      note: p.note,
      likes_count: p.likes_count,
    }));
    const { error: polaroidsErr } = await supabase.from('polaroids').upsert(polaroidInserts);
    results.polaroids = polaroidsErr ? polaroidsErr.message : 'OK';

    // 3. Milestones
    const milestoneInserts = DEFAULT_MILESTONES.map((m) => ({
      chapter_num: m.chapter_num,
      date_label: m.date_label,
      title: m.title,
      description: m.description,
      sort_order: m.sort_order,
    }));
    const { error: milestonesErr } = await supabase.from('milestones').upsert(milestoneInserts);
    results.milestones = milestonesErr ? milestonesErr.message : 'OK';

    // 4. Letter
    const { error: letterErr } = await supabase.from('birthday_letters').upsert({
      salutation: DEFAULT_LETTER.salutation,
      body_paragraphs: DEFAULT_LETTER.body_paragraphs,
      signoff_label: DEFAULT_LETTER.signoff_label,
      signoff_name: DEFAULT_LETTER.signoff_name,
      wax_initial: DEFAULT_LETTER.wax_initial,
    });
    results.birthday_letters = letterErr ? letterErr.message : 'OK';

    // 5. Hugs stat
    const { error: hugsErr } = await supabase.from('stats').upsert({
      id: 'hugs',
      counter: 10042,
    });
    results.stats = hugsErr ? hugsErr.message : 'OK';

    return NextResponse.json({
      success: true,
      message: 'Seeding completed',
      results,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Seeding error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
