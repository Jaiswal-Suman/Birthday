'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PolaroidGallery from '@/components/PolaroidGallery';
import LoveLetter from '@/components/LoveLetter';
import BirthdayCakeSection from '@/components/BirthdayCakeSection';
import SurpriseModal from '@/components/SurpriseModal';
import WishModal from '@/components/WishModal';
import FloatingHearts from '@/components/FloatingHearts';
import MusicPlayer from '@/components/MusicPlayer';
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_POLAROIDS,
  DEFAULT_LETTER,
  DEFAULT_WISHES,
  SiteSettings,
  PolaroidItem,
  BirthdayLetter,
  WishItem,
} from '@/lib/defaultData';

export default function BirthdayPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [photos, setPhotos] = useState<PolaroidItem[]>(DEFAULT_POLAROIDS);
  const [letter, setLetter] = useState<BirthdayLetter>(DEFAULT_LETTER);
  const [wishes, setWishes] = useState<WishItem[]>(DEFAULT_WISHES);

  // Modals state
  const [isSurpriseOpen, setIsSurpriseOpen] = useState(false);
  const [isWishOpen, setIsWishOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all initial dynamic data from API routes
  useEffect(() => {
    async function loadData() {
      try {
        const [contentRes, photosRes, wishesRes] = await Promise.allSettled([
          fetch('/api/content').then((r) => r.json()),
          fetch('/api/photos').then((r) => r.json()),
          fetch('/api/wishes').then((r) => r.json()),
        ]);

        if (contentRes.status === 'fulfilled' && contentRes.value.success) {
          if (contentRes.value.settings) setSettings(contentRes.value.settings);
          if (contentRes.value.letter) setLetter(contentRes.value.letter);
        }

        if (photosRes.status === 'fulfilled' && photosRes.value.success && photosRes.value.photos) {
          setPhotos(photosRes.value.photos);
        }

        if (wishesRes.status === 'fulfilled' && wishesRes.value.success && wishesRes.value.wishes) {
          setWishes(wishesRes.value.wishes);
        }
      } catch (err) {
        console.error('Failed loading remote content, using fallback:', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  // Handle Liking a Polaroid Photo
  const handleLikePhoto = async (id: string) => {
    // Optimistic UI update
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id ? { ...photo, likes_count: (photo.likes_count || 0) + 1 } : photo
      )
    );

    try {
      await fetch('/api/photos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'like' }),
      });
    } catch {
      // Handled silently
    }
  };

  // Handle Submitting a New Birthday Wish
  const handleAddWish = async (newWishData: { sender_name: string; message: string; emoji: string }) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticWish: WishItem = {
      id: tempId,
      ...newWishData,
      created_at: 'Just now',
    };

    setWishes((prev) => [optimisticWish, ...prev]);

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newWishData,
          is_secret: false,
        }),
      });
      const data = await res.json();
      if (data.wish) {
        setWishes((prev) => prev.map((w) => (w.id === tempId ? data.wish : w)));
      }
    } catch (err) {
      console.error('Error adding wish:', err);
    }
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Interactive Floating Hearts on Click */}
      <FloatingHearts />

      {/* Top Sticky Navigation */}
      <Navbar
        celebrantName={settings.celebrant_name}
        onOpenWishModal={() => setIsWishOpen(true)}
      />

      {/* Main Content Sections */}
      <main style={{ flex: 1 }}>
        {/* 1. Interactive Romantic Hero */}
        <HeroSection
          settings={settings}
          onOpenSurprise={() => setIsSurpriseOpen(true)}
        />

        {/* 2. Scattered Polaroid Scrapbook Gallery */}
        <PolaroidGallery
          photos={photos}
          onLikePhoto={handleLikePhoto}
        />

        {/* 3. Personal Love Letter & Hugs Counter */}
        <LoveLetter
          letter={letter}
          wishes={wishes}
          onAddWish={handleAddWish}
        />



        {/* 5. Interactive Birthday Cake & Wish Blowout */}
        <BirthdayCakeSection
          celebrantName={settings.celebrant_name}
          onOpenWishModal={() => setIsWishOpen(true)}
        />
      </main>

      {/* Persistent Audio Player Toggle */}
      <MusicPlayer />

      {/* Surprise Gift Box Modal */}
      <SurpriseModal
        isOpen={isSurpriseOpen}
        onClose={() => setIsSurpriseOpen(false)}
        celebrantName={settings.celebrant_name}
      />

      {/* Secret Birthday Wish Modal */}
      <WishModal
        isOpen={isWishOpen}
        onClose={() => setIsWishOpen(false)}
        celebrantName={settings.celebrant_name}
      />
    </div>
  );
}
