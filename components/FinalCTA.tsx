'use client';

import { useTranslations } from 'next-intl';

export default function FinalCTA() {
  const t = useTranslations('finalCta');

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-32 -left-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-10 leading-tight">
          {t('headline')}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-primary rounded-xl font-bold hover:bg-gray-50 transition-colors min-h-[44px]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#5B21B6">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            {t('ctaAppStore')}
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 border border-white/30 text-white rounded-xl font-bold hover:bg-white/20 transition-colors min-h-[44px]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M3.18 23.18c.37.2.78.3 1.19.3.29 0 .58-.05.86-.16L14 17.5l-2.84-2.84L3.18 23.18zM20.5 10.5l-3.18-1.84-3.17 3.34 3.17 3.17 3.19-1.86c.91-.53.91-2.28-.01-2.81zM4.37.68C4.06.58 3.71.55 3.37.65L11.16 8.5l3.16-3.16L4.37.68zM3.18.82L11.16 8.5l.84.84L3.37.65C3.28.68 3.22.74 3.18.82zM3.18.82c-.1.18-.18.4-.18.68v21c0 .29.08.51.18.68l.19.19L12.5 13.5v-.22L3.37.63l-.19.19z"/>
            </svg>
            {t('ctaGooglePlay')}
          </a>
        </div>
      </div>
    </section>
  );
}
