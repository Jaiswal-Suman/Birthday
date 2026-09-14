/**
 * Romantic Ambient Music & Sound Effects synthesizer using standard Web Audio API & HTML5 Audio.
 * Supports multiple switchable music tracks, track skipping, and custom MP3 file playback.
 */

export interface MusicTrack {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  audioSrc: string;
}

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'song-1',
    title: 'Special Song 1',
    subtitle: 'public/music/song1.mp3 (or favorite.mp3)',
    icon: '💖',
    audioSrc: '/music/song1.mp3',
  },
  {
    id: 'song-2',
    title: 'Romantic Melody 2',
    subtitle: 'public/music/song2.mp3',
    icon: '✨',
    audioSrc: '/music/song2.mp3',
  },
  {
    id: 'song-3',
    title: 'Sweet Memories 3',
    subtitle: 'public/music/song3.mp3',
    icon: '🌸',
    audioSrc: '/music/song3.mp3',
  },
  {
    id: 'song-4',
    title: 'Birthday Serenade 4',
    subtitle: 'public/music/song4.mp3',
    icon: '🎂',
    audioSrc: '/music/song4.mp3',
  },
];

let audioCtx: AudioContext | null = null;
let isPlaying = false;
let currentTrackIndex = 0;
let ambientTimer: NodeJS.Timeout | null = null;
let audioElement: HTMLAudioElement | null = null;
let stateChangeCallback: ((playing: boolean, trackIndex: number) => void) | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioCtxClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playChime(freq: number, duration = 3.5, volume = 0.08) {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm envelope
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.1);
  } catch (e) {
    console.error('Audio play error:', e);
  }
}

function stopCurrentMusic() {
  if (ambientTimer) {
    clearTimeout(ambientTimer);
    ambientTimer = null;
  }
  if (audioElement) {
    audioElement.pause();
  }
}

export function startAmbientMusic(
  trackIdx?: number,
  onStateChange?: (playing: boolean, trackIndex: number) => void
) {
  if (onStateChange) stateChangeCallback = onStateChange;
  if (typeof trackIdx === 'number') {
    currentTrackIndex = (trackIdx + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
  }

  stopCurrentMusic();
  isPlaying = true;

  const currentTrack = MUSIC_TRACKS[currentTrackIndex];

  if (typeof window !== 'undefined') {
    if (!audioElement) {
      audioElement = new Audio();
      audioElement.addEventListener('ended', () => {
        // Auto-advance to next track when song finishes
        nextTrack(stateChangeCallback || undefined);
      });
      audioElement.addEventListener('error', () => {
        // Fallback to /music/favorite.mp3 if song1.mp3 etc is missing
        if (audioElement && audioElement.src.includes('song1.mp3')) {
          audioElement.src = '/music/favorite.mp3';
          audioElement.play().catch(() => {});
        }
      });
    }

    // Try primary src, fallback to favorite.mp3 if song1.mp3
    audioElement.src = currentTrack.audioSrc;
    audioElement.volume = 0.8;

    const playPromise = audioElement.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          if (stateChangeCallback) stateChangeCallback(true, currentTrackIndex);
        })
        .catch((err) => {
          // If song1.mp3 fails, try favorite.mp3
          if (audioElement && currentTrack.id === 'song-1') {
            audioElement.src = '/music/favorite.mp3';
            audioElement.play().then(() => {
              if (stateChangeCallback) stateChangeCallback(true, currentTrackIndex);
            }).catch(() => {
              console.warn('Audio playback waiting for user interaction or missing file:', err);
            });
          }
        });
    }
  }

  if (stateChangeCallback) stateChangeCallback(true, currentTrackIndex);
}

export function stopAmbientMusic(onStateChange?: (playing: boolean, trackIndex: number) => void) {
  if (onStateChange) stateChangeCallback = onStateChange;
  isPlaying = false;
  stopCurrentMusic();
  if (stateChangeCallback) stateChangeCallback(false, currentTrackIndex);
}

export function toggleAmbientMusic(
  onStateChange?: (playing: boolean, trackIndex: number) => void
): boolean {
  if (onStateChange) stateChangeCallback = onStateChange;
  if (isPlaying) {
    stopAmbientMusic(onStateChange);
    return false;
  } else {
    startAmbientMusic(currentTrackIndex, onStateChange);
    return true;
  }
}

/**
 * Switches to the next song in the playlist and keeps playing.
 */
export function nextTrack(
  onStateChange?: (playing: boolean, trackIndex: number) => void
): MusicTrack {
  if (onStateChange) stateChangeCallback = onStateChange;
  currentTrackIndex = (currentTrackIndex + 1) % MUSIC_TRACKS.length;
  if (isPlaying) {
    startAmbientMusic(currentTrackIndex, stateChangeCallback || undefined);
  } else {
    if (stateChangeCallback) stateChangeCallback(false, currentTrackIndex);
  }
  return MUSIC_TRACKS[currentTrackIndex];
}

export function selectTrack(
  index: number,
  onStateChange?: (playing: boolean, trackIndex: number) => void
): MusicTrack {
  if (onStateChange) stateChangeCallback = onStateChange;
  currentTrackIndex = (index + MUSIC_TRACKS.length) % MUSIC_TRACKS.length;
  startAmbientMusic(currentTrackIndex, stateChangeCallback || undefined);
  return MUSIC_TRACKS[currentTrackIndex];
}

export function isAmbientMusicPlaying(): boolean {
  return isPlaying;
}

export function getCurrentTrackIndex(): number {
  return currentTrackIndex;
}

export function getCurrentTrack(): MusicTrack {
  return MUSIC_TRACKS[currentTrackIndex];
}

export function getTracks(): MusicTrack[] {
  return MUSIC_TRACKS;
}

// Sound effect: Candle blow-out (whoosh + smoke wind chime)
export function playCandleBlowSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.8;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.6);
    filter.Q.value = 1.2;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.7);

    setTimeout(() => {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        setTimeout(() => playChime(freq, 2.0, 0.07), idx * 120);
      });
    }, 450);
  } catch {
    // Handled
  }
}

// Sound effect: Celebration Hugs Pop
export function playPopSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  } catch {
    // Handled
  }
}
