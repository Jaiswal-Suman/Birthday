'use client';

import React, { useState } from 'react';
import { PolaroidItem } from '@/lib/defaultData';
import { Sparkles, Heart } from 'lucide-react';
import PolaroidModal from './PolaroidModal';

interface PolaroidGalleryProps {
  photos: PolaroidItem[];
  onLikePhoto: (id: string) => void;
}

export default function PolaroidGallery({ photos, onLikePhoto }: PolaroidGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidItem | null>(null);

  // Fallback rotation styles if rotation_deg is missing
  const defaultRotations = [-2.5, 2.0, -3.0, 1.5];

  return (
    <section
      id="gallery"
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '1140px',
        margin: '0 auto',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
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
            marginBottom: '0.75rem',
          }}
        >
          <span>Captured Moments</span>
        </div>

        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#1c1917',
            marginBottom: '1rem',
          }}
        >
          Our Polaroid Scrapbook 📸
        </h2>

        <p
          style={{
            color: '#57534e',
            maxWidth: '520px',
            margin: '0 auto',
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}
        >
          Tap or hover on each snapshot to reveal the story behind the frame. Every photo is a moment I’d relive forever with you.
        </p>
      </div>

      {/* Scattered Polaroid Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem 1.75rem',
          paddingTop: '1rem',
        }}
        className="polaroid-grid"
      >
        {photos.map((photo, index) => {
          const rotation = photo.rotation_deg ?? defaultRotations[index % defaultRotations.length];

          return (
            <div
              key={photo.id}
              className="polaroid-card"
              onClick={() => setSelectedPhoto(photo)}
              style={{
                transform: `rotate(${rotation}deg)`,
              }}
            >
              {/* Washi Tape Effect on Top */}
              <div
                className="tape-effect"
                style={{
                  position: 'absolute',
                  top: '-12px',
                  left: '50%',
                  transform: `translateX(-50%) rotate(${rotation > 0 ? -1.5 : 2}deg)`,
                  width: '80px',
                  height: '24px',
                  borderRadius: '2px',
                  zIndex: 10,
                }}
              />

              {/* Photo Area */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '100%', // 1:1 Aspect ratio
                  overflow: 'hidden',
                  borderRadius: '2px',
                  backgroundColor: '#f5f5f4',
                  marginBottom: '1rem',
                }}
              >
                <img
                  src={photo.image_url}
                  alt={photo.quote || 'Polaroid memory'}
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                  }}
                  className="polaroid-img"
                />

                {/* Hover overlay hint */}
                <div
                  className="photo-hover-overlay"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(136, 19, 55, 0.15)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      padding: '0.4rem 0.85rem',
                      borderRadius: '9999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      color: '#be123c',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    }}
                  >
                    Tap for note ✨
                  </span>
                </div>
              </div>

              {/* Caption Section - Only Red Text */}
              <div style={{ textAlign: 'center', padding: '0.35rem 0.5rem 0.25rem' }}>
                <p
                  className="font-serif"
                  style={{
                    fontSize: '0.92rem',
                    color: '#e11d48',
                    fontStyle: 'italic',
                    lineHeight: 1.45,
                    fontWeight: 500,
                  }}
                >
                  {photo.quote}
                </p>
              </div>

            </div>
          );
        })}
      </div>

      {/* Floating Tip Box */}
      <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
        <p
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 1.4rem',
            borderRadius: '9999px',
            backgroundColor: 'rgba(253, 232, 235, 0.75)',
            border: '1px solid rgba(244, 114, 182, 0.3)',
            color: '#9f1239',
            fontSize: '0.85rem',
            fontWeight: 500,
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          <span>✨</span>
          <span>Tip: Hover or tap on each polaroid to see our secret memories!</span>
        </p>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <PolaroidModal
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onLike={(id) => onLikePhoto(id)}
        />
      )}

      <style>{`
        .polaroid-card:hover .polaroid-img {
          transform: scale(1.06);
        }
        .polaroid-card:hover .photo-hover-overlay {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
