'use client';

import React from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { SiteSettings } from '@/lib/defaultData';
import { playPopSound } from '@/lib/audio';

interface HeroSectionProps {
  settings: SiteSettings;
  onOpenSurprise: () => void;
}

export default function HeroSection({ settings, onOpenSurprise }: HeroSectionProps) {
  const triggerCelebration = () => {
    playPopSound();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#ec4899', '#f43f5e', '#fbbf24', '#fbcfe8'],
    });
    onOpenSurprise();
  };

  const scrollToLetter = () => {
    const el = document.getElementById('letter');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      style={{
        minHeight: '82vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem 3rem 1.5rem',
        textAlign: 'center',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Subtle Decorative Tag */}
        <div
          className="animate-pulse-subtle"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.15rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(253, 232, 235, 0.9)',
            border: '1px solid rgba(244, 114, 182, 0.4)',
            color: '#be123c',
            fontSize: '0.85rem',
            fontWeight: 500,
            marginBottom: '1.75rem',
            boxShadow: '0 2px 8px rgba(225, 29, 72, 0.08)',
          }}
        >
          <span style={{ fontSize: '0.9rem' }}>🎉</span>
          <span>{settings.hero_tagline || 'Today is all about you, my favorite person'}</span>
          <span style={{ fontSize: '0.9rem' }}>✨</span>
        </div>

        {/* Main Heading */}
        <h1
          className="font-serif"
          style={{
            fontSize: 'clamp(2.5rem, 7vw, 4.75rem)',
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#1c1917',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em',
          }}
        >
          Happy Birthday, <br className="hero-break" />
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              fontStyle: 'italic',
            }}
            className="gradient-text-romantic"
          >
            {settings.nick_name || 'Babe'}!
            {/* Romantic SVG stroke underline */}
            <svg
              style={{
                position: 'absolute',
                bottom: '-6px',
                left: 0,
                width: '100%',
                height: '10px',
                zIndex: -1,
                color: '#fbcfe8',
              }}
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 9C50 3 150 2 198 8"
                stroke="#f472b6"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span
            style={{
              display: 'inline-block',
              marginLeft: '0.5rem',
              animation: 'bounceSlow 2.5s infinite ease-in-out',
            }}
          >
            💖
          </span>
        </h1>

        {/* Subheading */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            color: '#57534e',
            maxWidth: '580px',
            lineHeight: 1.7,
            fontWeight: 400,
            marginBottom: '2.5rem',
          }}
        >
          {settings.hero_subheading}
        </p>

        {/* Action Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            width: '100%',
          }}
        >
          <button
            onClick={triggerCelebration}
            className="btn-primary"
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              gap: '0.65rem',
            }}
          >
            <span>Unwrap Your Surprise</span>
            <span style={{ fontSize: '1.15rem' }}>🎁</span>
          </button>

          <button
            onClick={scrollToLetter}
            className="btn-secondary"
            style={{
              padding: '1rem 2rem',
              fontSize: '1rem',
              gap: '0.65rem',
            }}
          >
            <span>Read Special Letter</span>
            <span style={{ fontSize: '1.1rem' }}>🌹</span>
          </button>
        </div>

        {/* Golden Counter Stats */}
        <div
          style={{
            marginTop: '3.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(244, 114, 182, 0.25)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1rem, 4vw, 3.5rem)',
            width: '100%',
            maxWidth: '650px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div
              className="font-serif"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#be123c',
              }}
            >
              {settings.days_count}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#78716c', marginTop: '0.25rem' }}>
              Days of loving you
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              className="font-serif"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#be123c',
              }}
            >
              {settings.smiles_count}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#78716c', marginTop: '0.25rem' }}>
              Stolen smiles
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div
              className="font-serif"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 700,
                color: '#be123c',
              }}
            >
              {settings.adventures_count}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#78716c', marginTop: '0.25rem' }}>
              Adventures ahead
            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @media (max-width: 639px) {
          .hero-break {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
