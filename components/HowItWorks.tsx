'use client';

import { useTranslations } from 'next-intl';

const STEP_ICONS = [
  // 1. App öffnen
  <svg key="1" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="2" width="14" height="20" rx="2"/>
    <line x1="12" y1="18" x2="12.01" y2="18"/>
  </svg>,
  // 2. Anrufen
  <svg key="2" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l1.12-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>,
  // 3. Sprechen
  <svg key="3" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="2" width="6" height="11" rx="3"/>
    <path d="M5 11a7 7 0 0 0 14 0"/>
    <line x1="12" y1="18" x2="12" y2="22"/>
    <line x1="8" y1="22" x2="16" y2="22"/>
  </svg>,
  // 4. Live-Transkript
  <svg key="4" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    <line x1="9" y1="10" x2="15" y2="10"/>
    <line x1="9" y1="14" x2="13" y2="14"/>
  </svg>,
  // 5. Archiv
  <svg key="5" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="21 8 21 21 3 21 3 8"/>
    <rect x="1" y="3" width="22" height="5"/>
    <line x1="10" y1="12" x2="14" y2="12"/>
  </svg>,
];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps') as Array<{ title: string; desc: string }>;

  return (
    <section
      id="how-it-works"
      className="py-24 relative overflow-hidden"
      style={{ background: '#080b12' }}
    >
      {/* Subtle background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '800px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="section-label">Wie es funktioniert</span>
          </div>
          <h2
            className="font-display font-bold text-white mb-4"
            style={{
              fontFamily: 'var(--font-syne, Syne, sans-serif)',
              fontSize: 'clamp(28px, 4vw, 48px)',
            }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4">
          {steps.map((step, i) => (
            <div key={i} className="relative group flex flex-col">
              {/* Connector line (desktop only, between items) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 z-0"
                  style={{
                    left: 'calc(50% + 28px)',
                    width: 'calc(100% - 28px)',
                    height: '1px',
                    background: 'linear-gradient(90deg, rgba(0,212,255,0.3), rgba(0,212,255,0.05))',
                  }}
                />
              )}

              <div
                className="relative z-10 rounded-2xl p-6 transition-all duration-300 flex flex-col items-center text-center lg:items-center lg:text-center"
                style={{
                  background: 'rgba(13, 17, 23, 0.6)',
                  border: '1px solid rgba(255,255,255,0.07)',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(0,212,255,0.25)';
                  el.style.background = 'rgba(0,212,255,0.04)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.07)';
                  el.style.background = 'rgba(13, 17, 23, 0.6)';
                }}
              >
                {/* Step number + icon */}
                <div className="relative mb-5">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'rgba(0,212,255,0.08)',
                      border: '1px solid rgba(0,212,255,0.2)',
                      color: '#00D4FF',
                    }}
                  >
                    {STEP_ICONS[i]}
                  </div>
                  <div
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      background: '#00D4FF',
                      color: '#000',
                      fontFamily: 'var(--font-syne, Syne)',
                    }}
                  >
                    {i + 1}
                  </div>
                </div>

                <h3
                  className="font-display font-bold text-white mb-2 text-sm"
                  style={{ fontFamily: 'var(--font-syne, Syne)' }}
                >
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
