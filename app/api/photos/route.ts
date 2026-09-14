import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DEFAULT_POLAROIDS, PolaroidItem } from '@/lib/defaultData';

export const dynamic = 'force-dynamic';

// In-memory fallback state for session updates when Supabase is not yet connected
let memoryPhotos = [...DEFAULT_POLAROIDS];

export async function GET() {
  try {
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({
        success: true,
        source: 'default_fallback',
        photos: memoryPhotos,
      });
    }

    const { data, error } = await supabase
      .from('polaroids')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return NextResponse.json({
        success: true,
        source: 'default_fallback',
        photos: memoryPhotos,
      });
    }

    return NextResponse.json({
      success: true,
      source: 'supabase',
      photos: data,
    });
  } catch (error) {
    console.error('Error in /api/photos:', error);
    return NextResponse.json({
      success: true,
      source: 'error_fallback',
      photos: memoryPhotos,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, action } = body;

    // Like action
    if (action === 'like' && id) {
      if (!isSupabaseConfigured || !supabase) {
        memoryPhotos = memoryPhotos.map((p) =>
          p.id === id ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p
        );
        const updated = memoryPhotos.find((p) => p.id === id);
        return NextResponse.json({ success: true, photo: updated });
      }

      // Try Supabase RPC or read-update
      const { data: current } = await supabase
        .from('polaroids')
        .select('likes_count')
        .eq('id', id)
        .single();

      const newLikes = (current?.likes_count || 0) + 1;
      const { data: updated, error } = await supabase
        .from('polaroids')
        .update({ likes_count: newLikes })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }
      return NextResponse.json({ success: true, photo: updated });
    }

    // Add new memory
    if (body.title && body.image_url) {
      const newPhoto: PolaroidItem = {
        id: `photo-${Date.now()}`,
        title: body.title,
        date_label: body.date_label || 'Special Day',
        location_or_sub: body.location_or_sub || 'Our Story',
        quote: body.quote || '"A precious moment forever."',
        image_url: body.image_url,
        rotation_deg: (Math.random() * 6 - 3),
        sort_order: memoryPhotos.length + 1,
        note: body.note || '',
        likes_count: 1,
      };

      if (!isSupabaseConfigured || !supabase) {
        memoryPhotos.push(newPhoto);
        return NextResponse.json({ success: true, photo: newPhoto });
      }

      const { data, error } = await supabase
        .from('polaroids')
        .insert([newPhoto])
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, photo: data });
    }

    return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
