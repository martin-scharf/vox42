'use client';

import { useTranslations } from 'next-intl';

const TRANSCRIPT_LINES = [
  { speaker: 'DE', text: 'Guten Morgen, ich brauche einen Termin.' },
  { speaker: 'EN', text: 'Good morning, I need an appointment.' },
  { speaker: 'DE', text: 'Wann haben Sie Zeit nächste Woche?' },
  { speaker: 'EN', text: 'When are you available next week?' },
  { speaker: 'DE', text: 'Montag um 10 Uhr würde mir passen.' },
  { speaker: 'EN', text: 'Monday at 10 AM works for me.' },
  { speaker: 'DE', text: 'Perfekt, dann bis Montag.' },
  { speaker: 'EN', text: 'Perfect, see you Monday.' },
  { speaker: 'DE', text: 'Auf Wiederhören!' },
  { speaker: 'EN', text: 'Goodbye!' },
];

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden grain-overlay"
      style={{ background: '#050810' }}
    >
      {/* Animated Mesh Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
        <div
          className="absolute rounded-full"
          style={{
            width: '70vw',
            height: '70vw',
            top: '-20%',
            left: '-20%',
            background: 'radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 65%)',
            animation: 'mesh-drift 18s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '60vw',
            height: '60vw',
            top: '10%',
            right: '-15%',
            background: 'radial-gradient(circle, rgba(88,28,255,0.08) 0%, transparent 65%)',
            animation: 'mesh-drift-2 22s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '40vw',
            height: '40vw',
            bottom: '5%',
            left: '30%',
            background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)',
            animation: 'mesh-drift 28s ease-in-out infinite reverse',
          }}
        />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,212,255,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,212,255,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-28">
        {/* Text */}
        <div className="text-center lg:text-left">
          {/* Badges */}
          <div
            className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8 animate-fade-up"
            style={{ animationDelay: '0s' }}
          >
            <span className="section-label">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse2"
                style={{ background: '#00D4FF', display: 'inline-block' }}
              />
              {t('badge1')}
            </span>
            <span className="section-label" style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)' }}>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse2"
                style={{ background: '#F59E0B', display: 'inline-block', animationDelay: '0.5s' }}
              />
              {t('badge2')}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold leading-[1.05] tracking-tight text-white mb-6 animate-fade-up"
            style={{
              fontFamily: 'var(--font-syne, Syne, sans-serif)',
              fontSize: 'clamp(52px, 7vw, 96px)',
              animationDelay: '0.1s',
            }}
          >
            <span style={{ color: '#FFFFFF' }}>{t('headline').split('.')[0]}.</span>
            {t('headline').split('.').length > 1 && (
              <>
                {' '}
                <span className="text-glow-cyan" style={{ color: '#00D4FF' }}>
                  {t('headline').split('.').slice(1).join('.').trim()}
                </span>
              </>
            )}
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0 animate-fade-up"
            style={{ color: '#94A3B8', animationDelay: '0.2s' }}
          >
            {t('subheadline')}
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up"
            style={{ animationDelay: '0.3s' }}
          >
            <a href="#" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {t('ctaPrimary')}
            </a>
            <a href="#how-it-works" className="btn-ghost">
              {t('ctaSecondary')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap items-center gap-4 justify-center lg:justify-start mt-10 animate-fade-up"
            style={{ animationDelay: '0.45s' }}
          >
            {[
              { icon: '🔒', label: 'DSGVO konform' },
              { icon: '⚡', label: '<0.5s Latenz' },
              { icon: '🌍', label: '12 Sprachen' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs" style={{ color: '#64748B' }}>
                <span>{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Phone Mockup with Live Transcript */}
        <div className="flex items-center justify-center animate-float">
          <div className="relative">
            {/* Glow behind phone */}
            <div
              className="absolute inset-0 -z-10 blur-3xl rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, transparent 70%)' }}
            />

            {/* Phone frame */}
            <div
              className="relative mx-auto rounded-[2.8rem] overflow-hidden"
              style={{
                width: '240px',
                height: '480px',
                background: '#0a0d14',
                border: '2px solid rgba(0,212,255,0.25)',
                boxShadow: '0 0 60px rgba(0,212,255,0.12), 0 40px 80px rgba(0,0,0,0.6)',
              }}
            >
              {/* Notch */}
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 rounded-full z-10"
                style={{ width: '80px', height: '20px', background: '#050810' }}
              />

              {/* Header bar */}
              <div
                className="flex items-center justify-between px-5 pt-10 pb-3"
                style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
              >
                <div>
                  <div className="text-xs font-bold" style={{ color: '#00D4FF', fontFamily: 'var(--font-syne, Syne)' }}>Vox42</div>
                  <div className="text-xs mt-0.5 flex items-center gap-1" style={{ color: '#64748B' }}>
                    <span
                      className="w-1.5 h-1.5 rounded-full inline-block animate-pulse2"
                      style={{ background: '#22c55e' }}
                    />
                    Live
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium" style={{ color: '#94A3B8' }}>🇩🇪 → 🇬🇧</div>
                  <div className="text-xs mt-0.5" style={{ color: '#64748B' }}>0:42</div>
                </div>
              </div>

              {/* Waveform */}
              <div className="flex items-center justify-center gap-1 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {[0.5, 0.8, 1, 0.7, 1, 0.9, 0.6, 1, 0.8, 0.5, 0.9, 1, 0.7, 0.5, 0.8].map((h, i) => (
                  <div
                    key={i}
                    className="rounded-full animate-waveform"
                    style={{
                      width: '3px',
                      height: `${h * 28}px`,
                      background: '#00D4FF',
                      opacity: 0.6 + h * 0.4,
                      transformOrigin: 'center',
                      animationDelay: `${i * 0.06}s`,
                    }}
                  />
                ))}
              </div>

              {/* Transcript scroll area */}
              <div
                className="overflow-hidden px-4 py-3"
                style={{ height: '260px' }}
              >
                <div className="animate-transcript">
                  {[...TRANSCRIPT_LINES, ...TRANSCRIPT_LINES].map((line, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 mb-3"
                    >
                      <span
                        className="text-xs font-bold px-1.5 py-0.5 rounded shrink-0"
                        style={{
                          background: line.speaker === 'DE' ? 'rgba(0,212,255,0.15)' : 'rgba(245,158,11,0.15)',
                          color:      line.speaker === 'DE' ? '#00D4FF' : '#F59E0B',
                          fontSize: '9px',
                          fontFamily: 'var(--font-syne, Syne)',
                          marginTop: '1px',
                        }}
                      >
                        {line.speaker}
                      </span>
                      <span
                        className="text-xs leading-relaxed"
                        style={{ color: line.speaker === 'DE' ? '#CBD5E1' : '#94A3B8' }}
                      >
                        {line.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom bar */}
              <div
                className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 py-4 px-5"
                style={{
                  background: 'linear-gradient(to top, #050810, #0a0d14)',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <button
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#EF4444">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                </button>
                <button
                  className="w-14 h-14 rounded-full flex items-center justify-center glow-cyan-sm animate-cyan-pulse"
                  style={{ background: 'rgba(0,212,255,0.2)', border: '1px solid rgba(0,212,255,0.4)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#00D4FF">
                    <rect x="9" y="2" width="6" height="11" rx="3"/>
                    <path d="M5 11a7 7 0 0 0 14 0" stroke="#00D4FF" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    <line x1="12" y1="18" x2="12" y2="22" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round">
                    <line x1="1" y1="1" x2="23" y2="23"/>
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/>
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/>
                    <line x1="12" y1="19" x2="12" y2="23"/>
                    <line x1="8" y1="23" x2="16" y2="23"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Floating badges */}
            <div
              className="absolute -left-16 top-24 px-3 py-2 rounded-xl text-xs font-bold glass glow-cyan-sm"
              style={{
                color: '#00D4FF',
                fontFamily: 'var(--font-syne, Syne)',
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '0.5s',
              }}
            >
              ⚡ &lt;0.5s
            </div>
            <div
              className="absolute -right-14 bottom-32 px-3 py-2 rounded-xl text-xs font-bold glass"
              style={{
                color: '#F59E0B',
                fontFamily: 'var(--font-syne, Syne)',
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '1.2s',
                border: '1px solid rgba(245,158,11,0.2)',
              }}
            >
              🔒 EU-Server
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        style={{ color: '#334155' }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <line x1="12" y1="5" x2="12" y2="19"/>
          <polyline points="19 12 12 19 5 12"/>
        </svg>
      </div>
    </section>
  );
}
