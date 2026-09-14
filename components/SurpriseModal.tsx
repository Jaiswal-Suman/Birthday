'use client';

import React, { useState } from 'react';
import { X, Sparkles, Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound, playCandleBlowSound } from '@/lib/audio';

interface SurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  celebrantName?: string;
}

export default function SurpriseModal({
  isOpen,
  onClose,
  celebrantName = 'Riya',
}: SurpriseModalProps) {
  const [isCut, setIsCut] = useState(false);
  const [isCutting, setIsCutting] = useState(false);

  if (!isOpen) return null;

  const handleCutCake = () => {
    if (isCut || isCutting) return;

    setIsCutting(true);
    playCandleBlowSound();

    // Slicing animation delay
    setTimeout(() => {
      setIsCutting(false);
      setIsCut(true);
      playPopSound();

      // Spectacular celebratory confetti bursts
      confetti({
        particleCount: 100,
        spread: 85,
        origin: { y: 0.55 },
        colors: ['#e11d48', '#f43f5e', '#fb7185', '#f59e0b', '#ec4899', '#8b5cf6'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 70,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.65 },
          colors: ['#f43f5e', '#ec4899', '#f59e0b'],
        });
        confetti({
          particleCount: 70,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.65 },
          colors: ['#f43f5e', '#ec4899', '#f59e0b'],
        });
      }, 350);
    }, 600);
  };

  const handleReset = () => {
    setIsCut(false);
    setIsCutting(false);
    playPopSound();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '540px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '28px',
          padding: '2rem 1.75rem 2.25rem 1.75rem',
          textAlign: 'center',
          position: 'relative',
          boxShadow: '0 24px 60px rgba(190, 18, 60, 0.22)',
          overflow: 'hidden',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close surprise"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#f5f5f4',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#78716c',
            transition: 'all 0.2s',
            zIndex: 30,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ffe4e6';
            e.currentTarget.style.color = '#be123c';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f5f5f4';
            e.currentTarget.style.color = '#78716c';
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              backgroundColor: '#fff1f2',
              color: '#e11d48',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.5rem',
            }}
          >
            <span>✨ Special Birthday Surprise ✨</span>
          </div>

          <h3
            className="font-serif"
            style={{
              fontSize: 'clamp(1.5rem, 4vw, 1.95rem)',
              fontWeight: 700,
              color: '#1c1917',
              marginBottom: '0.35rem',
            }}
          >
            {isCut ? `Happy Birthday, ${celebrantName}! 💖` : `A Birthday Cake For ${celebrantName} 🎂`}
          </h3>

          <p style={{ fontSize: '0.88rem', color: '#57534e', margin: 0 }}>
            {isCut
              ? 'Your wish has been cast to the stars! ✨'
              : 'Make a heartfelt wish in your heart, then cut your cake!'}
          </p>
        </div>

        {/* Flying Balloons with Banner (Appears when cake is cut) */}
        {isCut && (
          <div
            className="balloon-banner-container"
            style={{
              marginBottom: '1.25rem',
              animation: 'flyInBalloons 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            {/* Balloons & Strings Cluster */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'center',
                gap: '0.75rem',
                marginBottom: '-6px',
                position: 'relative',
              }}
            >
              {/* Left Balloon Cluster */}
              <div className="balloon-sway-left" style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '2.4rem', filter: 'drop-shadow(0 4px 8px rgba(225,29,72,0.3))' }}>🎈</span>
                <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 4px 8px rgba(245,158,11,0.3))', marginBottom: '8px' }}>🎈</span>
                <span style={{ fontSize: '2.2rem', filter: 'drop-shadow(0 4px 8px rgba(168,85,247,0.3))' }}>🎈</span>
              </div>

              {/* Central Sparkles */}
              <span style={{ fontSize: '1.6rem', margin: '0 4px', animation: 'pulseSubtle 2s infinite' }}>✨💖✨</span>

              {/* Right Balloon Cluster */}
              <div className="balloon-sway-right" style={{ display: 'flex', gap: '4px', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '2.2rem', filter: 'drop-shadow(0 4px 8px rgba(59,130,246,0.3))' }}>🎈</span>
                <span style={{ fontSize: '2rem', filter: 'drop-shadow(0 4px 8px rgba(236,72,153,0.3))', marginBottom: '8px' }}>🎈</span>
                <span style={{ fontSize: '2.4rem', filter: 'drop-shadow(0 4px 8px rgba(16,185,129,0.3))' }}>🎈</span>
              </div>
            </div>

            {/* The Suspended Flying Banner */}
            <div
              className="flying-banner"
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, #fff1f2 0%, #ffffff 50%, #fdf2f8 100%)',
                border: '2px solid #fda4af',
                borderRadius: '16px',
                padding: '0.9rem 1.25rem',
                boxShadow: '0 12px 32px rgba(225, 29, 72, 0.2), 0 2px 8px rgba(0,0,0,0.05)',
                margin: '0 auto',
                maxWidth: '460px',
              }}
            >
              {/* String Anchor Dots */}
              <div
                style={{
                  position: 'absolute',
                  top: '-7px',
                  left: '18px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#e11d48',
                  boxShadow: '0 0 6px #e11d48',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '-7px',
                  right: '18px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#e11d48',
                  boxShadow: '0 0 6px #e11d48',
                }}
              />

              {/* Written Banner Text */}
              <h4
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.05rem, 3.2vw, 1.35rem)',
                  fontWeight: 800,
                  color: '#be123c',
                  letterSpacing: '0.01em',
                  lineHeight: 1.35,
                  margin: 0,
                  textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                }}
              >
                Happy birthday to the most beautiful person
              </h4>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem', marginTop: '0.35rem' }}>
                <span style={{ fontSize: '0.85rem', color: '#f43f5e', fontWeight: 600 }}>
                  ✨ May your life be filled with infinite happiness & love ✨
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Cake Visual */}
        <div
          onClick={handleCutCake}
          style={{
            position: 'relative',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem 0 0.5rem 0',
            cursor: isCut ? 'default' : 'pointer',
            userSelect: 'none',
          }}
          title={isCut ? 'The cake is cut!' : 'Click to cut the cake!'}
        >
          {/* Animated Knife during cutting */}
          {isCutting && (
            <div
              className="knife-slice-animation"
              style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                fontSize: '3rem',
                zIndex: 25,
              }}
            >
              🔪
            </div>
          )}

          {/* SVG Multi-tier Birthday Cake */}
          <div style={{ position: 'relative', width: '220px', height: '170px' }}>
            <svg
              width="220"
              height="170"
              viewBox="0 0 220 170"
              style={{ overflow: 'visible' }}
            >
              <defs>
                {/* Cake plate shadow */}
                <filter id="standShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#be123c" floodOpacity="0.15" />
                </filter>
                {/* Candle flame glow */}
                <radialGradient id="flameGrad" cx="50%" cy="80%" r="60%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#fef08a" />
                  <stop offset="60%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ef4444" />
                </radialGradient>
              </defs>

              {/* Cake Stand Plate */}
              <ellipse cx="110" cy="154" rx="92" ry="12" fill="#ffffff" stroke="#fecdd3" strokeWidth="2.5" filter="url(#standShadow)" />
              <path d="M 85 154 Q 110 168 135 154 L 126 166 L 94 166 Z" fill="#ffe4e6" stroke="#fecdd3" strokeWidth="1.5" />

              {/* Bottom Tier Base */}
              <g>
                {/* Left Part of Bottom Tier */}
                <rect x="35" y="102" width="75" height="46" rx="4" fill="#fff1f2" stroke="#fda4af" strokeWidth="2" />
                <path d="M 35 102 Q 52 114 70 102 Q 90 114 110 102 L 110 148 L 35 148 Z" fill="#fff5f6" />
                <circle cx="50" cy="122" r="3" fill="#f43f5e" />
                <circle cx="75" cy="132" r="2.5" fill="#f59e0b" />
                <circle cx="95" cy="120" r="3" fill="#ec4899" />
                {/* Bottom Tier Frosting Drips */}
                <path d="M 35 102 C 45 116, 55 116, 65 102 C 75 116, 85 116, 95 102 C 103 114, 108 112, 110 102" fill="#fb7185" />
              </g>

              {/* Right Part of Bottom Tier (Separates when cut!) */}
              <g
                style={{
                  transform: isCut ? 'translate(18px, -4px) rotate(4deg)' : 'none',
                  transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transformOrigin: '110px 148px',
                }}
              >
                <rect x="110" y="102" width="75" height="46" rx="4" fill="#fff1f2" stroke="#fda4af" strokeWidth="2" />
                <path d="M 110 102 Q 130 114 150 102 Q 168 114 185 102 L 185 148 L 110 148 Z" fill="#fff5f6" />
                <circle cx="130" cy="128" r="3" fill="#f43f5e" />
                <circle cx="150" cy="118" r="2.5" fill="#f59e0b" />
                <circle cx="170" cy="130" r="3" fill="#ec4899" />
                {/* Drips */}
                <path d="M 110 102 C 120 116, 130 116, 140 102 C 150 116, 160 116, 170 102 C 178 112, 183 112, 185 102" fill="#fb7185" />

                {/* Sliced Cut Edge (Revealed when cut) */}
                {isCut && (
                  <g>
                    <rect x="108" y="103" width="5" height="44" fill="#fda4af" />
                    <line x1="108" y1="116" x2="113" y2="116" stroke="#ffffff" strokeWidth="2" />
                    <line x1="108" y1="130" x2="113" y2="130" stroke="#ffffff" strokeWidth="2" />
                  </g>
                )}
              </g>

              {/* Top Tier Base */}
              <g>
                {/* Left Part Top Tier */}
                <rect x="62" y="66" width="48" height="36" rx="4" fill="#ffffff" stroke="#fda4af" strokeWidth="2" />
                <path d="M 62 66 C 72 76, 82 76, 92 66 C 100 74, 106 74, 110 66" fill="#f43f5e" />
                <circle cx="80" cy="84" r="2.5" fill="#f59e0b" />
                <circle cx="98" cy="88" r="2" fill="#ec4899" />
              </g>

              {/* Right Part Top Tier (Separates when cut!) */}
              <g
                style={{
                  transform: isCut ? 'translate(18px, -4px) rotate(4deg)' : 'none',
                  transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transformOrigin: '110px 102px',
                }}
              >
                <rect x="110" y="66" width="48" height="36" rx="4" fill="#ffffff" stroke="#fda4af" strokeWidth="2" />
                <path d="M 110 66 C 118 76, 128 76, 138 66 C 146 74, 154 74, 158 66" fill="#f43f5e" />
                <circle cx="126" cy="85" r="2.5" fill="#f59e0b" />
                <circle cx="145" cy="83" r="2" fill="#ec4899" />
              </g>

              {/* Strawberries / Cherries on Top */}
              <circle cx="76" cy="62" r="6" fill="#e11d48" />
              <circle cx="74" cy="60" r="1.5" fill="#ffffff" />
              <g
                style={{
                  transform: isCut ? 'translate(18px, -4px) rotate(4deg)' : 'none',
                  transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transformOrigin: '110px 62px',
                }}
              >
                <circle cx="144" cy="62" r="6" fill="#e11d48" />
                <circle cx="142" cy="60" r="1.5" fill="#ffffff" />
              </g>

              {/* 3 Birthday Candles */}
              {/* Left Candle */}
              <g>
                <rect x="86" y="32" width="7" height="32" rx="1.5" fill="#38bdf8" />
                <line x1="86" y1="40" x2="93" y2="44" stroke="#ffffff" strokeWidth="2" />
                <line x1="86" y1="50" x2="93" y2="54" stroke="#ffffff" strokeWidth="2" />
                <line x1="89.5" y1="26" x2="89.5" y2="32" stroke="#44403c" strokeWidth="1.5" />
                {!isCut ? (
                  <ellipse cx="89.5" cy="20" rx="5" ry="8" fill="url(#flameGrad)" className="flame-flicker" />
                ) : (
                  <text x="83" y="24" fontSize="11">✨</text>
                )}
              </g>

              {/* Center Candle */}
              <g>
                <rect x="106.5" y="26" width="7" height="38" rx="1.5" fill="#fb7185" />
                <line x1="106.5" y1="36" x2="113.5" y2="40" stroke="#ffffff" strokeWidth="2" />
                <line x1="106.5" y1="48" x2="113.5" y2="52" stroke="#ffffff" strokeWidth="2" />
                <line x1="110" y1="20" x2="110" y2="26" stroke="#44403c" strokeWidth="1.5" />
                {!isCut ? (
                  <ellipse cx="110" cy="14" rx="6" ry="9" fill="url(#flameGrad)" className="flame-flicker-center" />
                ) : (
                  <text x="103" y="18" fontSize="12">💨</text>
                )}
              </g>

              {/* Right Candle */}
              <g
                style={{
                  transform: isCut ? 'translate(18px, -4px) rotate(4deg)' : 'none',
                  transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  transformOrigin: '110px 60px',
                }}
              >
                <rect x="127" y="32" width="7" height="32" rx="1.5" fill="#facc15" />
                <line x1="127" y1="40" x2="134" y2="44" stroke="#ffffff" strokeWidth="2" />
                <line x1="127" y1="50" x2="134" y2="54" stroke="#ffffff" strokeWidth="2" />
                <line x1="130.5" y1="26" x2="130.5" y2="32" stroke="#44403c" strokeWidth="1.5" />
                {!isCut ? (
                  <ellipse cx="130.5" cy="20" rx="5" ry="8" fill="url(#flameGrad)" className="flame-flicker" />
                ) : (
                  <text x="124" y="24" fontSize="11">✨</text>
                )}
              </g>

              {/* Sweet Heart in Center when Cut */}
              {isCut && (
                <text x="102" y="134" fontSize="18" className="heart-pop">💖</text>
              )}
            </svg>
          </div>
        </div>

        {/* Interactive Action Area */}
        <div style={{ marginTop: '1.25rem' }}>
          {!isCut ? (
            <button
              onClick={handleCutCake}
              disabled={isCutting}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.95rem 1.75rem',
                fontSize: '1.05rem',
                borderRadius: '16px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                cursor: 'pointer',
                boxShadow: '0 10px 24px rgba(225, 29, 72, 0.3)',
              }}
            >
              <span>{isCutting ? '✨ Making a wish...' : '🔪 Cut the Birthday Cake ✨'}</span>
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={handleReset}
                className="btn-secondary"
                style={{
                  flex: 1,
                  padding: '0.85rem 1.25rem',
                  borderRadius: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  fontSize: '0.9rem',
                }}
              >
                <RotateCcw size={15} />
                <span>Cut Again 🎂</span>
              </button>

              <button
                onClick={onClose}
                className="btn-primary"
                style={{
                  flex: 1,
                  padding: '0.85rem 1.25rem',
                  borderRadius: '14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  fontSize: '0.9rem',
                }}
              >
                <Heart size={15} fill="#ffffff" />
                <span>Celebrate! 🎉</span>
              </button>
            </div>
          )}
        </div>

        {/* Embedded Keyframes for Animations */}
        <style>{`
          .flame-flicker {
            animation: flameWobble 0.8s ease-in-out infinite alternate;
            transform-origin: center bottom;
          }
          .flame-flicker-center {
            animation: flameWobble 0.6s ease-in-out infinite alternate;
            transform-origin: center bottom;
          }
          @keyframes flameWobble {
            0% {
              transform: scaleY(1) scaleX(1) rotate(-2deg);
              filter: drop-shadow(0 0 6px #f59e0b);
            }
            100% {
              transform: scaleY(1.15) scaleX(0.92) rotate(3deg);
              filter: drop-shadow(0 0 12px #f97316);
            }
          }

          @keyframes flyInBalloons {
            0% {
              opacity: 0;
              transform: translateY(80px) scale(0.75);
            }
            50% {
              transform: translateY(-12px) scale(1.03);
            }
            75% {
              transform: translateY(4px) scale(0.99);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .balloon-sway-left {
            animation: swayLeft 3s ease-in-out infinite alternate;
          }
          .balloon-sway-right {
            animation: swayRight 3.2s ease-in-out infinite alternate;
          }
          @keyframes swayLeft {
            0% { transform: translateY(0px) rotate(-3deg); }
            100% { transform: translateY(-8px) rotate(2deg); }
          }
          @keyframes swayRight {
            0% { transform: translateY(-6px) rotate(3deg); }
            100% { transform: translateY(2px) rotate(-2deg); }
          }

          .flying-banner {
            animation: bannerFloat 3s ease-in-out infinite alternate;
          }
          @keyframes bannerFloat {
            0% { transform: translateY(0px); }
            100% { transform: translateY(-5px); }
          }

          .knife-slice-animation {
            animation: sliceDown 0.6s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          }
          @keyframes sliceDown {
            0% {
              transform: translate(-50%, -40px) rotate(-45deg);
              opacity: 0;
            }
            40% {
              opacity: 1;
              transform: translate(-50%, 0px) rotate(-15deg);
            }
            100% {
              transform: translate(-50%, 60px) rotate(10deg);
              opacity: 0;
            }
          }

          .heart-pop {
            animation: heartPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
          @keyframes heartPop {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}</style>
      </div>
    </div>
  );
}
