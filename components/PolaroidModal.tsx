'use client';

import React from 'react';
import { X, Heart, MapPin, Calendar, Sparkles } from 'lucide-react';
import { PolaroidItem } from '@/lib/defaultData';
import confetti from 'canvas-confetti';
import { playPopSound } from '@/lib/audio';

interface PolaroidModalProps {
  photo: PolaroidItem | null;
  onClose: () => void;
  onLike: (id: string) => void;
}

export default function PolaroidModal({ photo, onClose, onLike }: PolaroidModalProps) {
  if (!photo) return null;

  const handleLike = () => {
    playPopSound();
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#e11d48', '#fb7185', '#f43f5e'],
    });
    onLike(photo.id);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-content glass-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '24px',
          padding: '1.75rem',
          position: 'relative',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close memory modal"
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
            transition: 'all 0.2s ease',
            zIndex: 10,
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

        {/* Polaroid Picture Frame */}
        <div
          style={{
            backgroundColor: '#fafaf9',
            padding: '0.75rem 0.75rem 1.25rem 0.75rem',
            borderRadius: '8px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.06)',
            border: '1px solid #f0eeee',
            marginBottom: '1.25rem',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingBottom: '85%',
              borderRadius: '6px',
              overflow: 'hidden',
              backgroundColor: '#e7e5e4',
            }}
          >
            <img
              src={photo.image_url}
              alt={photo.quote || 'Polaroid memory'}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '0.85rem', padding: '0 0.5rem' }}>
            <p
              className="font-serif"
              style={{
                fontSize: '1.1rem',
                color: '#e11d48',
                fontStyle: 'italic',
                fontWeight: 600,
                lineHeight: 1.4,
              }}
            >
              {photo.quote}
            </p>
          </div>
        </div>

        {/* Memory Note / Story */}
        {photo.note && (
          <div
            style={{
              backgroundColor: '#fff1f2',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              fontSize: '0.9rem',
              color: '#4c0519',
              lineHeight: 1.6,
              marginBottom: '1.25rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Sparkles size={14} color="#e11d48" />
              <span>Behind This Memory</span>
            </div>
            <p>{photo.note}</p>
          </div>
        )}

        {/* Modal Action Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid #f5f5f4',
          }}
        >
          <span style={{ fontSize: '0.85rem', color: '#a8a29e' }}>
            Cherished with love 💖
          </span>

          <button
            onClick={handleLike}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.5rem 1.15rem',
              borderRadius: '9999px',
              backgroundColor: '#fff1f2',
              border: '1px solid #fecdd3',
              color: '#e11d48',
              fontSize: '0.85rem',
              fontWeight: 600,
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
            <Heart size={16} fill="#e11d48" />
            <span>{(photo.likes_count || 0) > 0 ? `${photo.likes_count} Loves` : 'Love This'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
