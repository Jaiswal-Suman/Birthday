'use client';

import React, { useState, useEffect } from 'react';
import { Music, SkipForward, Play, Pause, ChevronUp, Check, Volume2, Sparkles } from 'lucide-react';
import {
  toggleAmbientMusic,
  nextTrack,
  selectTrack,
  isAmbientMusicPlaying,
  getCurrentTrack,
  getCurrentTrackIndex,
  getTracks,
  MusicTrack,
} from '@/lib/audio';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(getCurrentTrack());
  const [trackIndex, setTrackIndex] = useState(getCurrentTrackIndex());
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [trackAlert, setTrackAlert] = useState<string | null>(null);

  const tracks = getTracks();

  // Listen to audio changes
  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const active = toggleAmbientMusic((playing, idx) => {
      setIsPlaying(playing);
      setTrackIndex(idx);
      setCurrentTrack(tracks[idx]);
    });
    setIsPlaying(active);
    if (active) {
      showTrackNotice(tracks[trackIndex].title, tracks[trackIndex].icon);
    }
  };

  const handleNextTrack = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = nextTrack((playing, idx) => {
      setIsPlaying(playing);
      setTrackIndex(idx);
      setCurrentTrack(tracks[idx]);
    });
    setCurrentTrack(next);
    showTrackNotice(next.title, next.icon);
  };

  const handleSelectTrack = (idx: number) => {
    const selected = selectTrack(idx, (playing, newIdx) => {
      setIsPlaying(playing);
      setTrackIndex(newIdx);
      setCurrentTrack(tracks[newIdx]);
    });
    setCurrentTrack(selected);
    setShowPlaylist(false);
    showTrackNotice(selected.title, selected.icon);
  };

  const showTrackNotice = (title: string, icon: string) => {
    setTrackAlert(`Now Playing: ${icon} ${title}`);
    setTimeout(() => {
      setTrackAlert(null);
    }, 2800);
  };

  return (
    <>
      {/* Toast Notification when track changes */}
      {trackAlert && (
        <div
          style={{
            position: 'fixed',
            bottom: '5.25rem',
            right: '1.5rem',
            zIndex: 60,
            backgroundColor: '#881337',
            color: '#ffffff',
            padding: '0.6rem 1.15rem',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(136, 19, 55, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          <Sparkles size={15} color="#fda4af" />
          <span>{trackAlert}</span>
        </div>
      )}

      {/* Floating Audio Dock */}
      <div
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.5rem',
        }}
      >
        {/* Playlist Popup Menu */}
        {showPlaylist && (
          <div
            className="glass-card"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '1rem',
              width: '280px',
              boxShadow: '0 16px 36px rgba(190, 18, 60, 0.15)',
              border: '1px solid #fecdd3',
              marginBottom: '0.5rem',
              animation: 'popUp 0.2s ease-out',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.6rem',
                borderBottom: '1px solid #f5f5f4',
                marginBottom: '0.6rem',
              }}
            >
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1c1917' }}>
                Your Custom Playlist 🎵
              </span>
              <span style={{ fontSize: '0.75rem', color: '#be123c', fontWeight: 600 }}>
                {tracks.length} Songs
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {tracks.map((track, idx) => {
                const isActive = idx === trackIndex;
                return (
                  <button
                    key={track.id}
                    onClick={() => handleSelectTrack(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.65rem',
                      padding: '0.5rem 0.65rem',
                      borderRadius: '10px',
                      border: 'none',
                      backgroundColor: isActive ? '#fff1f2' : 'transparent',
                      color: isActive ? '#be123c' : '#44403c',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.15s',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = '#fafaf9';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ fontSize: '1.1rem' }}>{track.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.82rem', fontWeight: isActive ? 700 : 500, margin: 0 }}>
                        {track.title}
                      </p>
                      <p style={{ fontSize: '0.7rem', color: '#78716c', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {track.subtitle}
                      </p>
                    </div>
                    {isActive && <Check size={14} color="#be123c" />}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                marginTop: '0.75rem',
                paddingTop: '0.6rem',
                borderTop: '1px dashed #fecdd3',
                fontSize: '0.7rem',
                color: '#78716c',
                lineHeight: 1.4,
              }}
            >
              💡 <strong>Add your songs:</strong> Drop your MP3 files into <code>public/music/</code> as <code>song1.mp3</code>, <code>song2.mp3</code>, <code>song3.mp3</code>, <code>song4.mp3</code>!
            </div>
          </div>
        )}

        {/* Floating Player Bar */}
        <div
          className="glass-card"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.45rem 0.65rem 0.45rem 0.75rem',
            borderRadius: '9999px',
            border: '1px solid #fecdd3',
            backgroundColor: isPlaying ? 'rgba(255, 245, 246, 0.96)' : 'rgba(255, 255, 255, 0.94)',
            boxShadow: '0 8px 24px rgba(225, 29, 72, 0.14)',
          }}
        >
          {/* Play / Pause Button */}
          <button
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause music' : 'Play music'}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#e11d48',
              color: '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.15s, background-color 0.2s',
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#be123c')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#e11d48')}
          >
            {isPlaying ? <Pause size={15} fill="#ffffff" /> : <Play size={15} fill="#ffffff" style={{ marginLeft: '2px' }} />}
          </button>

          {/* Track Info (Click to toggle playlist) */}
          <button
            onClick={() => setShowPlaylist(!showPlaylist)}
            style={{
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              padding: '0.2rem 0.4rem',
              borderRadius: '8px',
              color: '#1c1917',
              textAlign: 'left',
            }}
            title="Click to choose a melody"
          >
            {isPlaying ? (
              <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px' }}>
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
                <div className="equalizer-bar" />
              </div>
            ) : (
              <span style={{ fontSize: '1rem' }}>{currentTrack.icon}</span>
            )}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: isPlaying ? '#be123c' : '#292524',
                  whiteSpace: 'nowrap',
                  maxWidth: '130px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {currentTrack.title}
              </span>
              <span style={{ fontSize: '0.68rem', color: '#78716c' }}>
                {isPlaying ? 'Playing • Click list' : 'Paused • Click to play'}
              </span>
            </div>

            <ChevronUp
              size={14}
              color="#a8a29e"
              style={{
                transform: showPlaylist ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s',
              }}
            />
          </button>

          {/* Next Track (Skip) Button */}
          <button
            onClick={handleNextTrack}
            aria-label="Change to next music track"
            title="Next melody (Click to change music!)"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.4rem 0.75rem',
              borderRadius: '9999px',
              backgroundColor: '#fff1f2',
              border: '1px solid #fecdd3',
              color: '#be123c',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffe4e6';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#fff1f2';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <span>Next</span>
            <SkipForward size={13} fill="#be123c" />
          </button>
        </div>
      </div>
    </>
  );
}
