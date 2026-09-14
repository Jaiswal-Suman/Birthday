import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DEFAULT_MILESTONES } from '@/lib/defaultData';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({
        success: true,
        source: 'default_fallback',
        milestones: DEFAULT_MILESTONES,
      });
    }

    const { data, error } = await supabase
      .from('milestones')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json({
        success: true,
        source: 'default_fallback',
        milestones: DEFAULT_MILESTONES,
      });
    }

    return NextResponse.json({
      success: true,
      source: 'supabase',
      milestones: data,
    });
  } catch (error) {
    console.error('Error in /api/milestones:', error);
    return NextResponse.json({
      success: true,
      source: 'error_fallback',
      milestones: DEFAULT_MILESTONES,
    });
  }
}
