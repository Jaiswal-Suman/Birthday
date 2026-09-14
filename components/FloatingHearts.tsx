'use client';

import React, { useState, useEffect } from 'react';

interface HeartBurst {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const EMOJIS = ['💖', '✨', '🌸', '💝', '🌹', '💕'];

export default function FloatingHearts() {
  const [bursts, setBursts] = useState<HeartBurst[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Don't burst if clicking input or button to avoid distraction
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable
      ) {
        return;
      }

      // Spawn 1 to 3 burst emojis
      const count = Math.random() > 0.4 ? 2 : 1;
      const newItems: HeartBurst[] = [];
      for (let i = 0; i < count; i++) {
        const offsetX = (Math.random() - 0.5) * 28;
        const offsetY = (Math.random() - 0.5) * 28;
        newItems.push({
          id: Date.now() + Math.random() + i,
          x: e.clientX + offsetX,
          y: e.clientY + offsetY,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
        });
      }

      setBursts((prev) => [...prev.slice(-20), ...newItems]);

      const ids = newItems.map((item) => item.id);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => !ids.includes(b.id)));
      }, 1400);
    };

    window.addEventListener('click', handleClick, { capture: true });
    return () => window.removeEventListener('click', handleClick, { capture: true });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999,
        overflow: 'hidden',
      }}
    >
      {bursts.map((burst) => (
        <span
          key={burst.id}
          className="floating-heart-item"
          style={{
            position: 'absolute',
            left: `${burst.x - 12}px`,
            top: `${burst.y - 12}px`,
            fontSize: '1.4rem',
            userSelect: 'none',
          }}
        >
          {burst.emoji}
        </span>
      ))}

    </div>
  );
}
