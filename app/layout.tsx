import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Happy Birthday Riya! ✨ | A Special Corner Just For You',
  description:
    'A little corner on the internet crafted just for Riya—celebrating your infectious laughter, endless sweetness, and every golden memory we share.',
  keywords: ['Birthday', 'Riya', 'Love', 'Polaroid Memories', 'Celebration'],
  openGraph: {
    title: 'Happy Birthday Riya! 💖',
    description: 'Celebrating your infectious laughter and golden memories.',
    images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBn65qawA--dmWo2QxFzrY04o_ypXeA9Z-p9ULOTDjytVkPtINDZ2lWWAhBpz_xXATsk_gPmTbyAhmtMjNB8f8FnyuyH-kYelweHF2cUQB4PJEt8zTp1Fs3sRIfg_tHXmfnxPowiU_O2mGDW-2-tch6N7PEvHzeI740hOHH7j49ktbBZ4ts0UPkxtejftvAKlgGNxoML6lfZxWs3hflaGqdJtp-gvh8qFcwczFYXkT9jC42YmnFgrGqtA'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="selection:bg-rose-200 selection:text-rose-900 min-h-screen relative">
        {/* Ambient Floating Love Shapes & Orbs */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
            zIndex: 0,
          }}
        >
          {/* Glowing Blurs */}
          <div
            className="animate-pulse-subtle"
            style={{
              position: 'absolute',
              top: '8%',
              left: '6%',
              width: '18rem',
              height: '18rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(254, 205, 215, 0.35)',
              filter: 'blur(48px)',
            }}
          />
          <div
            className="animate-float-slow"
            style={{
              position: 'absolute',
              top: '35%',
              right: '5%',
              width: '24rem',
              height: '24rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(251, 207, 232, 0.3)',
              filter: 'blur(64px)',
              animationDelay: '1.5s',
            }}
          />
          <div
            className="animate-float-reverse"
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '12%',
              width: '20rem',
              height: '20rem',
              borderRadius: '9999px',
              backgroundColor: 'rgba(254, 243, 199, 0.4)',
              filter: 'blur(56px)',
            }}
          />

          {/* Floating Sparkles & Soft Heart Accents */}
          <div
            className="animate-float-slow"
            style={{
              position: 'absolute',
              top: '12%',
              right: '16%',
              fontSize: '1.5rem',
              color: '#f472b6',
              opacity: 0.6,
            }}
          >
            ✨
          </div>
          <div
            className="animate-float-reverse"
            style={{
              position: 'absolute',
              top: '28%',
              left: '8%',
              fontSize: '1.35rem',
              opacity: 0.5,
              animationDelay: '2s',
            }}
          >
            💖
          </div>
          <div
            className="animate-float-slow"
            style={{
              position: 'absolute',
              top: '55%',
              right: '10%',
              fontSize: '1.75rem',
              opacity: 0.4,
              animationDelay: '0.8s',
            }}
          >
            🌸
          </div>
          <div
            className="animate-float-reverse"
            style={{
              position: 'absolute',
              top: '78%',
              left: '5%',
              fontSize: '1.5rem',
              opacity: 0.5,
              animationDelay: '3s',
            }}
          >
            ✨
          </div>
          <div
            className="animate-float-slow"
            style={{
              position: 'absolute',
              top: '88%',
              right: '18%',
              fontSize: '1.35rem',
              opacity: 0.4,
            }}
          >
            💌
          </div>
        </div>

        {/* Content Container */}
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
