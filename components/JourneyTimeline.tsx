'use client';

import React from 'react';
import { MilestoneItem } from '@/lib/defaultData';

interface JourneyTimelineProps {
  milestones: MilestoneItem[];
}

export default function JourneyTimeline({ milestones }: JourneyTimelineProps) {
  return (
    <section
      id="timeline"
      style={{
        padding: '5rem 1.5rem',
        maxWidth: '860px',
        margin: '0 auto',
      }}
    >
      {/* Section Header */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
          <span>Milestones</span>
        </div>

        <h2
          className="font-serif"
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: 700,
            color: '#1c1917',
            marginBottom: '0.75rem',
          }}
        >
          Chapters of Us ✨
        </h2>

        <p
          style={{
            color: '#57534e',
            fontSize: '0.95rem',
            maxWidth: '460px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}
        >
          A few little moments that etched themselves into my heart forever.
        </p>
      </div>

      {/* Timeline Container */}
      <div className="timeline-wrapper">
        {milestones.map((item, index) => (
          <div key={item.id || index} className="timeline-item">
            
            {/* Pulsing Marker Node */}
            <div className="timeline-dot" />

            {/* Chapter Tag (Left on desktop, top on mobile) */}
            <div className="timeline-chapter-label">
              {item.chapter_num}
            </div>

            {/* Story Card */}
            <div className="timeline-card glass-card">
              <span
                style={{
                  fontSize: '0.8rem',
                  color: '#a8a29e',
                  fontWeight: 600,
                  display: 'block',
                }}
              >
                {item.date_label}
              </span>

              <h3
                className="font-serif"
                style={{
                  fontSize: 'clamp(1.15rem, 3vw, 1.35rem)',
                  fontWeight: 700,
                  color: '#1c1917',
                  marginTop: '0.25rem',
                  marginBottom: '0.6rem',
                }}
              >
                {item.title}
              </h3>

              <p
                style={{
                  fontSize: '0.92rem',
                  color: '#57534e',
                  lineHeight: 1.65,
                }}
              >
                {item.description}
              </p>
            </div>

          </div>
        ))}
      </div>

      <style>{`
        .timeline-wrapper {
          position: relative;
          border-left: 2px solid #fecdd3;
          margin-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 3rem;
          padding-bottom: 1rem;
        }

        .timeline-item {
          position: relative;
          padding-left: 2rem;
        }

        .timeline-dot {
          position: absolute;
          left: -9px;
          top: 6px;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #ffffff;
          border: 4px solid #e11d48;
          box-shadow: 0 0 10px rgba(225, 29, 72, 0.3);
          transition: transform 0.2s ease;
        }

        .timeline-item:hover .timeline-dot {
          transform: scale(1.3);
        }

        .timeline-chapter-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: #e11d48;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 0.4rem;
        }

        .timeline-card {
          padding: 1.5rem 1.75rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.85);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .timeline-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(190, 18, 60, 0.08);
        }

        @media (min-width: 640px) {
          .timeline-wrapper {
            margin-left: 8rem;
          }
          .timeline-item {
            padding-left: 2.5rem;
          }
          .timeline-chapter-label {
            position: absolute;
            left: -8rem;
            top: 4px;
            width: 6.5rem;
            text-align: right;
            margin-bottom: 0;
          }
        }
      `}</style>
    </section>
  );
}
