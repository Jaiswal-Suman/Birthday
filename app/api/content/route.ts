import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DEFAULT_SITE_SETTINGS, DEFAULT_LETTER } from '@/lib/defaultData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({
        success: true,
        source: 'default_fallback',
        settings: DEFAULT_SITE_SETTINGS,
        letter: DEFAULT_LETTER,
      });
    }

    // Fetch site settings
    const { data: settingsData, error: settingsError } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    // Fetch love letter
    const { data: letterData, error: letterError } = await supabase
      .from('birthday_letters')
      .select('*')
      .limit(1)
      .maybeSingle();

    return NextResponse.json({
      success: true,
      source: 'supabase',
      settings: settingsData || DEFAULT_SITE_SETTINGS,
      letter: letterData
        ? {
            salutation: 'To My Dearest Person,',
            body_paragraphs: letterData.body_paragraphs || DEFAULT_LETTER.body_paragraphs,
            signoff_label: letterData.signoff_label || DEFAULT_LETTER.signoff_label,
            signoff_name: letterData.signoff_name || DEFAULT_LETTER.signoff_name,
            wax_initial: letterData.wax_initial || DEFAULT_LETTER.wax_initial,
          }
        : DEFAULT_LETTER,
    });
  } catch (error) {
    console.error('Error in /api/content:', error);
    return NextResponse.json({
      success: true,
      source: 'error_fallback',
      settings: DEFAULT_SITE_SETTINGS,
      letter: DEFAULT_LETTER,
    });
  }
}
