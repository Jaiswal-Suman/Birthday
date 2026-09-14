import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

let memoryHugs = 10042;

export async function GET() {
  try {
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({ count: memoryHugs, source: 'memory' });
    }

    const { data } = await supabase
      .from('stats')
      .select('counter')
      .eq('id', 'hugs')
      .maybeSingle();

    if (data && typeof data.counter === 'number') {
      memoryHugs = data.counter;
    }

    return NextResponse.json({ count: memoryHugs, source: 'supabase' });
  } catch (error) {
    return NextResponse.json({ count: memoryHugs, source: 'fallback' });
  }
}

export async function POST() {
  try {
    memoryHugs += 1;

    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({ success: true, count: memoryHugs, source: 'memory' });
    }

    // Upsert in stats table
    const { data, error } = await supabase
      .from('stats')
      .upsert({ id: 'hugs', counter: memoryHugs }, { onConflict: 'id' })
      .select('counter')
      .single();

    if (error) {
      return NextResponse.json({ success: true, count: memoryHugs, error: error.message });
    }

    return NextResponse.json({ success: true, count: data?.counter || memoryHugs });
  } catch {
    return NextResponse.json({ success: true, count: memoryHugs });
  }
}
