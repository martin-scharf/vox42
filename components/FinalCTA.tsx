'use client';

import { useTranslations } from 'next-intl';

export default function FinalCTA() {
  const t = useTranslations('finalCta');

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1a2535 0%, #0d1829 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Gradient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(0,212,255,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-10" style={{ color: '#FFFFFF' }}>
          {t('headline')}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all min-h-[44px] hover:brightness-110"
            style={{ background: '#EA580B', color: '#000' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#000">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            {t('ctaAppStore')}
          </a>
          <a
            href="/de/app"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-bold transition-all min-h-[44px]"
            style={{ background: 'transparent', border: '1px solid rgba(0,212,255,0.4)', color: '#00D4FF' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
            {t('ctaWebApp')}
          </a>
        </div>
      </div>
    </section>
  );
}
