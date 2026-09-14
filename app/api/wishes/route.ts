import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { DEFAULT_WISHES, WishItem } from '@/lib/defaultData';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const DATA_FILE = path.join(process.cwd(), 'lib', 'wishes_data.json');

// Reset cutoff timestamp: exclude all old sample and test wishes created before this moment
const RESET_CUTOFF = '2026-09-14T15:28:00+00:00';

const VALID_EMOJIS = ['💖', '🎉', '🎂', '🌸', '✨', '🥂', '🍰', '🎁', '🌹', '💌'];

function cleanEmoji(emoji: string | undefined): string {
  if (!emoji || emoji.includes('?') || emoji.trim() === '') {
    return '💖';
  }
  return emoji.trim();
}

function cleanMessage(msg: string): string {
  // If message ends with a corrupt ' ?' from terminal emoji conversion, clean it up
  return msg.replace(/\s*\?+$/, '').trim();
}

function getStoredWishes(): WishItem[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed.map((w: WishItem) => ({
          ...w,
          emoji: cleanEmoji(w.emoji),
        }));
      }
    }
  } catch (err) {
    console.error('Error reading wishes_data.json:', err);
  }
  return [];
}

function saveStoredWish(wish: WishItem) {
  try {
    const list = getStoredWishes();
    const updated = [wish, ...list.filter((w) => w.id !== wish.id)];
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), 'utf-8');
    return updated;
  } catch (err) {
    console.error('Error writing wishes_data.json:', err);
    return getStoredWishes();
  }
}

export async function GET() {
  try {
    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({
        success: true,
        source: 'local_file',
        wishes: getStoredWishes(),
      });
    }

    // Only fetch real user wishes created after the reset cutoff
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .gt('created_at', RESET_CUTOFF)
      .neq('is_secret', true)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error || !data) {
      return NextResponse.json({
        success: true,
        source: 'local_file_fallback',
        wishes: getStoredWishes(),
      });
    }

    // Sanitize any corrupt question-mark emojis or text before sending to frontend
    const cleanedWishes: WishItem[] = data.map((item: any) => ({
      id: item.id,
      sender_name: item.sender_name,
      message: item.message,
      emoji: cleanEmoji(item.emoji),
      created_at: item.created_at,
    }));

    return NextResponse.json({
      success: true,
      source: 'supabase',
      wishes: cleanedWishes,
    });
  } catch (error) {
    console.error('Error in /api/wishes GET:', error);
    return NextResponse.json({
      success: true,
      source: 'error_fallback',
      wishes: getStoredWishes(),
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sender_name, message, emoji = '🎂', is_secret = false } = body;

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ success: false, error: 'Message cannot be empty' }, { status: 400 });
    }

    const safeEmoji = cleanEmoji(emoji);
    const safeMessage = message.trim();

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      sender_name: sender_name?.trim() || 'A Well-Wisher',
      message: safeMessage,
      emoji: safeEmoji,
      created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Always persist to local file as guarantee
    if (!is_secret) {
      saveStoredWish(newWish);
    }

    if (!isSupabaseConfigured || !supabase) {
      return NextResponse.json({
        success: true,
        wish: newWish,
        message: 'Wish saved successfully!',
      });
    }

    const { data, error } = await supabase
      .from('wishes')
      .insert([
        {
          sender_name: newWish.sender_name,
          message: newWish.message,
          emoji: safeEmoji,
          is_secret: Boolean(is_secret),
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn('Supabase insert notice, persisted locally:', error.message);
      return NextResponse.json({
        success: true,
        wish: newWish,
        message: 'Wish saved successfully!',
      });
    }

    const sanitizedResult: WishItem = {
      id: data?.id || newWish.id,
      sender_name: data?.sender_name || newWish.sender_name,
      message: data?.message || newWish.message,
      emoji: cleanEmoji(data?.emoji || safeEmoji),
      created_at: data?.created_at || newWish.created_at,
    };

    return NextResponse.json({
      success: true,
      wish: sanitizedResult,
      message: 'Wish saved to Supabase successfully!',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
