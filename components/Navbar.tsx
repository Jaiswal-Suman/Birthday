'use client';

import React, { useState } from 'react';
import { Menu, X, Music, VolumeX, Sparkles, SkipForward } from 'lucide-react';
import {
  toggleAmbientMusic,
  isAmbientMusicPlaying,
  getCurrentTrack,
  nextTrack,
  MusicTrack,
} from '@/lib/audio';

interface NavbarProps {
  onOpenWishModal?: () => void;
  celebrantName?: string;
}

export default function Navbar({ onOpenWishModal, celebrantName = 'Riya' }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(getCurrentTrack());

  const handleMusicToggle = () => {
    const newState = toggleAmbientMusic((playing, idx) => {
      setIsPlayingMusic(playing);
      setCurrentTrack(getCurrentTrack());
    });
    setIsPlayingMusic(newState);
    setCurrentTrack(getCurrentTrack());
  };

  const handleNextMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = nextTrack((playing, idx) => {
      setIsPlayingMusic(playing);
      setCurrentTrack(next);
    });
    setCurrentTrack(next);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className="glass-nav"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1140px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '4rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('hero');
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            textDecoration: 'none',
          }}
        >
          <span
            style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '9999px',
              backgroundColor: '#fde8eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              boxShadow: '0 2px 6px rgba(225, 29, 72, 0.15)',
              transition: 'transform 0.2s ease',
            }}
          >
            💝
          </span>
          <span
            className="font-serif"
            style={{
              fontWeight: 700,
              fontSize: '1.25rem',
              color: '#881337',
              letterSpacing: '-0.02em',
            }}
          >
            For {celebrantName}
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            gap: '2rem',
            alignItems: 'center',
          }}
          className="desktop-nav"
        >
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('gallery');
            }}
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: '#57534e',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e11d48')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#57534e')}
          >
            Polaroid Memories
          </a>
          <a
            href="#letter"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('letter');
            }}
            style={{
              fontSize: '0.9rem',
              fontWeight: 500,
              color: '#57534e',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e11d48')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#57534e')}
          >
            Love Letter
          </a>

        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Ambient Music Button */}
          <button
            onClick={handleMusicToggle}
            aria-label="Toggle romantic music"
            title={isPlayingMusic ? 'Mute romantic tune' : 'Play romantic tune'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: isPlayingMusic ? '#ffe4e6' : '#ffffff',
              border: '1px solid #fecdd3',
              color: '#be123c',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            {isPlayingMusic ? (
              <>
                <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '14px' }}>
                  <div className="equalizer-bar" />
                  <div className="equalizer-bar" />
                  <div className="equalizer-bar" />
                </div>
                <span className="hidden-mobile">{currentTrack.icon} {currentTrack.title.split(' ')[0]}</span>
                <span
                  onClick={handleNextMusic}
                  title="Next song"
                  style={{
                    marginLeft: '0.2rem',
                    padding: '0.1rem 0.3rem',
                    borderRadius: '4px',
                    backgroundColor: 'rgba(190, 18, 60, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <SkipForward size={11} />
                </span>
              </>
            ) : (
              <>
                <Music size={14} />
                <span className="hidden-mobile">Music</span>
              </>
            )}
          </button>

          {/* Make a Wish CTA */}
          <button
            onClick={onOpenWishModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(253, 232, 235, 0.85)',
              border: '1px solid rgba(244, 114, 182, 0.3)',
              color: '#9f1239',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fad4da')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(253, 232, 235, 0.85)')}
          >
            <span>Make a Wish</span>
            <span>🎂</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            aria-label="Toggle navigation menu"
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#78716c',
              cursor: 'pointer',
              padding: '0.25rem',
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #fecdd3',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
          }}
        >
          <a
            href="#gallery"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('gallery');
            }}
            style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: '#44403c',
              textDecoration: 'none',
              padding: '0.5rem 0',
            }}
          >
            📸 Polaroid Memories
          </a>
          <a
            href="#letter"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('letter');
            }}
            style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: '#44403c',
              textDecoration: 'none',
              padding: '0.5rem 0',
            }}
          >
            💌 Love Letter
          </a>

          <a
            href="#wish"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('cake-section');
            }}
            style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: '#be123c',
              textDecoration: 'none',
              padding: '0.5rem 0',
            }}
          >
            🎂 Blow the Candle
          </a>
        </div>
      )}

      {/* Embedded CSS for responsive navbar */}
      <style>{`
        @media (min-width: 640px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 639px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .hidden-mobile {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
