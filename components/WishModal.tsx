'use client';

import React, { useState } from 'react';
import { X, Sparkles, Send, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playPopSound } from '@/lib/audio';

interface WishModalProps {
  isOpen: boolean;
  onClose: () => void;
  celebrantName?: string;
}

export default function WishModal({ isOpen, onClose, celebrantName = 'Riya' }: WishModalProps) {
  const [wishText, setWishText] = useState('');
  const [senderName, setSenderName] = useState('');
  const [isSecret, setIsSecret] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    setIsSubmitting(true);
    playPopSound();

    try {
      await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender_name: senderName.trim() || `${celebrantName}'s Secret Wish`,
          message: wishText.trim(),
          emoji: '🎂',
          is_secret: isSecret,
        }),
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e11d48', '#f59e0b', '#ec4899'],
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setWishText('');
        setSenderName('');
        onClose();
      }, 2500);
    } catch {
      // Handled
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '480px',
          width: '100%',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '2rem',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            backgroundColor: '#f5f5f4',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#78716c',
          }}
        >
          <X size={16} />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '2.5rem' }}>🎂</span>
              <h3
                className="font-serif"
                style={{
                  fontSize: '1.65rem',
                  fontWeight: 700,
                  color: '#1c1917',
                  marginTop: '0.5rem',
                }}
              >
                Make a Birthday Wish
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#57534e', marginTop: '0.25rem' }}>
                Cast your dream into the universe for the coming year!
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#44403c', marginBottom: '0.35rem' }}>
                  Your Name (or leave blank for {celebrantName}):
                </label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder={celebrantName}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #e7e5e4',
                    fontSize: '0.9rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#44403c', marginBottom: '0.35rem' }}>
                  Your Wish:
                </label>
                <textarea
                  rows={4}
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="I wish for endless joy, unforgettable adventures, peace, and love..."
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    borderRadius: '12px',
                    border: '1px solid #e7e5e4',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#78716c', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isSecret}
                  onChange={(e) => setIsSecret(e.target.checked)}
                />
                <span>Keep this wish private (only you & the universe know)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ width: '100%', padding: '0.85rem', borderRadius: '14px' }}
            >
              <Sparkles size={16} />
              <span>{isSubmitting ? 'Sending to the stars...' : 'Cast My Wish ✨'}</span>
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>✨🌟✨</div>
            <h4 className="font-serif" style={{ fontSize: '1.5rem', color: '#be123c', fontWeight: 700 }}>
              Wish Cast Into the Universe!
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#57534e', marginTop: '0.5rem' }}>
              May all your deepest dreams and hopes blossom this year! 🌸
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
