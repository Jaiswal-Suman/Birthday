'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Send, Sparkles, MessageSquareHeart } from 'lucide-react';
import { BirthdayLetter, WishItem } from '@/lib/defaultData';
import { playPopSound } from '@/lib/audio';

interface LoveLetterProps {
  letter: BirthdayLetter;
  initialHugs?: number;
  wishes: WishItem[];
  onAddWish: (wish: { sender_name: string; message: string; emoji: string }) => Promise<void>;
}

export default function LoveLetter({
  letter,
  initialHugs = 10042,
  wishes,
  onAddWish,
}: LoveLetterProps) {
  const [hugsCount, setHugsCount] = useState(initialHugs);
  const [showHugAlert, setShowHugAlert] = useState(false);
  const [isSendingHug, setIsSendingHug] = useState(false);

  // Guestbook Form State
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('💖');
  const [isSubmittingWish, setIsSubmittingWish] = useState(false);
  const [wishSuccess, setWishSuccess] = useState(false);

  useEffect(() => {
    // Fetch latest hugs count
    fetch('/api/hugs')
      .then((res) => res.json())
      .then((data) => {
        if (data.count) setHugsCount(data.count);
      })
      .catch(() => {});
  }, []);

  const handleSendHugs = async () => {
    if (isSendingHug) return;
    setIsSendingHug(true);
    playPopSound();

    // Confetti celebration
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.65 },
      colors: ['#e11d48', '#fb7185', '#fda4af', '#f43f5e', '#ffffff'],
    });

    setHugsCount((prev) => prev + 1);
    setShowHugAlert(true);

    try {
      const res = await fetch('/api/hugs', { method: 'POST' });
      const data = await res.json();
      if (data.count) setHugsCount(data.count);
    } catch {
      // Ignored
    } finally {
      setIsSendingHug(false);
      setTimeout(() => setShowHugAlert(false), 4500);
    }
  };

  const handleWishSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmittingWish(true);
    try {
      await onAddWish({
        sender_name: senderName.trim() || 'A Secret Admirer',
        message: message.trim(),
        emoji: selectedEmoji,
      });
      setMessage('');
      setSenderName('');
      setWishSuccess(true);
      playPopSound();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
      setTimeout(() => setWishSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmittingWish(false);
    }
  };

  return (
    <section
      id="letter"
      style={{
        padding: '5rem 1.5rem',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '820px', margin: '0 auto' }}>
        
        {/* Letter Card Envelope Aesthetic */}
        <div
          className="glass-card"
          style={{
            borderRadius: '28px',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Wax Seal Badge Accent */}
          <div
            className="wax-seal"
            style={{
              position: 'absolute',
              top: '1.75rem',
              right: '1.75rem',
            }}
          >
            {letter.wax_initial || 'R'}
          </div>

          {/* Subtitle tag */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#be123c',
              fontWeight: 600,
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>💌</span>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.75rem' }}>
              From the Heart
            </span>
          </div>

          {/* Salutation */}
          <h2
            className="font-serif"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 700,
              color: '#1c1917',
              marginBottom: '1.75rem',
              lineHeight: 1.25,
            }}
          >
            {letter.salutation || 'To My Dearest Person,'}
          </h2>

          {/* Body Paragraphs */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              color: '#44403c',
              fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
              lineHeight: 1.8,
              fontWeight: 300,
            }}
          >
            {letter.body_paragraphs.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Signoff Section & Hugs Button */}
          <div
            style={{
              marginTop: '2.75rem',
              paddingTop: '1.75rem',
              borderTop: '1px solid rgba(244, 114, 182, 0.25)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
            }}
          >
            <div>
              <p
                style={{
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#a8a29e',
                  fontWeight: 600,
                }}
              >
                {letter.signoff_label}
              </p>
              <p
                className="font-handwriting"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                  color: '#be123c',
                  fontWeight: 700,
                  marginTop: '0.25rem',
                  lineHeight: 1.2,
                }}
              >
                {letter.signoff_name}
              </p>
            </div>

            {/* Send Birthday Hugs Action */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
              <button
                onClick={handleSendHugs}
                disabled={isSendingHug}
                className="btn-primary"
                id="wishBtn"
                style={{
                  padding: '0.85rem 1.6rem',
                  fontSize: '0.95rem',
                  gap: '0.5rem',
                }}
              >
                <Heart size={18} fill="#ffffff" />
                <span>Send Birthday Hugs</span>
                <span style={{ fontSize: '1.1rem' }}>🎉</span>
              </button>
              <span style={{ fontSize: '0.75rem', color: '#78716c', fontWeight: 500 }}>
                {hugsCount.toLocaleString()} hugs delivered so far!
              </span>
            </div>
          </div>

          {/* Secret Toast Alert */}
          {showHugAlert && (
            <div
              style={{
                marginTop: '1.25rem',
                padding: '0.85rem 1.25rem',
                borderRadius: '14px',
                backgroundColor: '#fff1f2',
                border: '1px solid #fecdd3',
                textAlign: 'center',
                fontSize: '0.9rem',
                color: '#be123c',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(225, 29, 72, 0.1)',
                animation: 'pulseSubtle 2s infinite',
              }}
            >
              💌 Warm hugs & kisses sent straight to Riya! 🥰 (Total: {hugsCount.toLocaleString()})
            </div>
          )}

        </div>

        {/* Community Love Wall / Birthday Messages */}
        <div style={{ marginTop: '3.5rem' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
            }}
          >
            <MessageSquareHeart size={20} color="#e11d48" />
            <h3 className="font-serif" style={{ fontSize: '1.35rem', fontWeight: 700, color: '#1c1917' }}>
              Birthday Love Wall ✨
            </h3>
          </div>

          {/* Messages list */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
              marginBottom: '2rem',
            }}
          >
            {wishes.length === 0 ? (
              <div
                style={{
                  gridColumn: '1 / -1',
                  textAlign: 'center',
                  padding: '2.5rem 1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  borderRadius: '16px',
                  border: '1px dashed #fecdd3',
                  color: '#9f1239',
                }}
              >
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '0.4rem' }}>💌</span>
                <p style={{ fontWeight: 600, fontSize: '1rem', color: '#be123c', marginBottom: '0.2rem' }}>
                  The Love Wall is open!
                </p>
                <p style={{ fontSize: '0.85rem', color: '#78716c' }}>
                  Be the first to leave a sweet birthday wish for Riya below! ✨
                </p>
              </div>
            ) : (
              wishes.map((w) => {
                const safeEmoji = (!w.emoji || w.emoji.includes('?') || w.emoji.trim() === '') ? '💖' : w.emoji;
                return (
                  <div
                    key={w.id}
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.85)',
                      border: '1px solid #ffe4e6',
                      borderRadius: '16px',
                      padding: '1rem 1.25rem',
                      boxShadow: '0 2px 8px rgba(225, 29, 72, 0.04)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontWeight: 600, fontSize: '0.85rem', color: '#be123c' }}>
                        {w.sender_name}
                      </span>
                      <span style={{ fontSize: '1.1rem' }}>{safeEmoji}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#57534e', lineHeight: 1.5 }}>
                      {w.message}
                    </p>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Add Wish Form */}
          <form
            onSubmit={handleWishSubmit}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '1.25rem 1.5rem',
              border: '1px solid #fed7aa22',
              boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
            }}
          >
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#292524', marginBottom: '0.75rem' }}>
              Leave a sweet birthday wish for Riya:
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <input
                type="text"
                placeholder="Your name / nickname"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                style={{
                  flex: '1 1 200px',
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #e7e5e4',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />

              <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
                {['💖', '🎉', '🎂', '🌸', '✨', '🥂'].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '8px',
                      border: selectedEmoji === emoji ? '2px solid #e11d48' : '1px solid #e7e5e4',
                      backgroundColor: selectedEmoji === emoji ? '#fff1f2' : '#ffffff',
                      cursor: 'pointer',
                      fontSize: '1rem',
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Write your sweet message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '0.65rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid #e7e5e4',
                  fontSize: '0.85rem',
                  outline: 'none',
                }}
              />

              <button
                type="submit"
                disabled={isSubmittingWish}
                className="btn-primary"
                style={{
                  padding: '0.65rem 1.25rem',
                  fontSize: '0.85rem',
                  borderRadius: '10px',
                }}
              >
                <Send size={15} />
                <span>Post</span>
              </button>
            </div>

            {wishSuccess && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: '#16a34a', fontWeight: 600 }}>
                ✨ Your sweet wish has been added to Riya&apos;s wall!
              </p>
            )}
          </form>

        </div>

      </div>
    </section>
  );
}
