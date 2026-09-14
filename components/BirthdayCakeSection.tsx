'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playCandleBlowSound, playPopSound } from '@/lib/audio';
import { Sparkles, Heart } from 'lucide-react';

interface BirthdayCakeSectionProps {
  celebrantName?: string;
  onOpenWishModal: () => void;
}

export default function BirthdayCakeSection({
  celebrantName = 'Riya',
  onOpenWishModal,
}: BirthdayCakeSectionProps) {
  const [isBlown, setIsBlown] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);

  const handleBlowCandle = () => {
    if (isBlown) return;

    playCandleBlowSound();
    setShowSmoke(true);
    setIsBlown(true);

    // Spectacular celebration confetti
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#f59e0b', '#10b981', '#6366f1'],
      });
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
      });
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
      });
    }, 300);

    setTimeout(() => {
      setShowSmoke(false);
    }, 2000);
  };

  const handleRelight = () => {
    setIsBlown(false);
    playPopSound();
  };

  return (
    <section
      id="cake-section"
      style={{
        padding: '5rem 1.5rem 4rem 1.5rem',
        textAlign: 'center',
        borderTop: '1px solid rgba(244, 114, 182, 0.25)',
        background: 'linear-gradient(180deg, transparent 0%, rgba(253, 232, 235, 0.5) 100%)',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Interactive Candle & Cake Visual */}
        <div
          onClick={isBlown ? handleRelight : handleBlowCandle}
          style={{
            cursor: 'pointer',
            position: 'relative',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '1.5rem',
            userSelect: 'none',
          }}
          title={isBlown ? 'Tap to relight candle' : 'Tap candle to blow it out!'}
        >
          {/* Flame / Smoke */}
          <div style={{ position: 'relative', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {!isBlown ? (
              <div
                className="candle-flame"
                style={{
                  width: '16px',
                  height: '24px',
                  borderRadius: '50% 50% 35% 35%',
                  background: 'radial-gradient(ellipse at bottom, #fff 0%, #fde047 30%, #f97316 75%, #ef4444 100%)',
                  boxShadow: '0 0 16px #f59e0b',
                }}
              />
            ) : showSmoke ? (
              <div
                className="smoke-puff"
                style={{
                  fontSize: '1.5rem',
                }}
              >
                💨
              </div>
            ) : (
              <div
                style={{
                  width: '3px',
                  height: '8px',
                  backgroundColor: '#78716c',
                  borderRadius: '1px',
                }}
              />
            )}
          </div>

          {/* Candle Stem */}
          <div
            style={{
              width: '10px',
              height: '28px',
              background: 'repeating-linear-gradient(45deg, #f43f5e, #f43f5e 5px, #ffffff 5px, #ffffff 10px)',
              borderRadius: '2px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}
          />

          {/* Cake Body / Emoji with Bounce */}
          <div
            style={{
              fontSize: '4rem',
              marginTop: '-8px',
              filter: 'drop-shadow(0 8px 16px rgba(225, 29, 72, 0.15))',
              transition: 'transform 0.2s ease',
            }}
            className="cake-bounce"
          >
            🎂
          </div>
        </div>

        {/* Section Title */}
        <h3
          className="font-serif"
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.35rem)',
            fontWeight: 700,
            color: '#1c1917',
            marginBottom: '0.75rem',
          }}
        >
          Make a Secret Birthday Wish, {celebrantName}!
        </h3>

        <p
          style={{
            color: '#57534e',
            fontSize: '0.95rem',
            marginBottom: '1.75rem',
            maxWidth: '440px',
            lineHeight: 1.6,
          }}
        >
          Close your eyes, take a deep breath, and tap the candle to blow it out.
        </p>

        {/* Action Button */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
          <button
            onClick={handleBlowCandle}
            disabled={isBlown}
            className="btn-primary"
            style={{
              padding: '0.85rem 2rem',
              fontSize: '0.95rem',
              backgroundColor: isBlown ? '#a8a29e' : undefined,
              backgroundImage: isBlown ? 'none' : undefined,
              cursor: isBlown ? 'default' : 'pointer',
              boxShadow: isBlown ? 'none' : undefined,
            }}
          >
            <span>{isBlown ? '💨' : '🕯️'}</span>
            <span>{isBlown ? 'Wish Made!' : 'Blow Out the Candle'}</span>
          </button>

          {isBlown && (
            <button
              onClick={handleRelight}
              className="btn-secondary"
              style={{
                padding: '0.85rem 1.5rem',
                fontSize: '0.9rem',
              }}
            >
              <span>🔥 Relight Candle</span>
            </button>
          )}

          <button
            onClick={onOpenWishModal}
            className="btn-secondary"
            style={{
              padding: '0.85rem 1.5rem',
              fontSize: '0.9rem',
              borderColor: '#f43f5e',
              color: '#be123c',
            }}
          >
            <span>✍️ Record Secret Wish</span>
          </button>
        </div>

        {/* Wish Granted Notification */}
        {isBlown && (
          <div
            className="glass-card"
            style={{
              marginTop: '1.75rem',
              padding: '1rem 1.75rem',
              borderRadius: '9999px',
              color: '#be123c',
              fontSize: '0.95rem',
              fontWeight: 600,
              boxShadow: '0 6px 20px rgba(225, 29, 72, 0.12)',
              animation: 'pulseSubtle 2.5s infinite',
            }}
          >
            ✨ Wish registered in the universe! May every dream come true, {celebrantName}! ✨
          </div>
        )}

        {/* Footer info */}
        <p
          style={{
            fontSize: '0.8rem',
            color: '#a8a29e',
            marginTop: '4rem',
            fontWeight: 500,
          }}
        >
          Crafted with endless love for {celebrantName}&apos;s Special Day • 2024
        </p>

      </div>

      <style>{`
        .cake-bounce:hover {
          transform: scale(1.08);
        }
      `}</style>
    </section>
  );
}
