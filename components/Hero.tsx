'use client';

import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden grain-overlay"
      style={{ background: '#1E293B' }}
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-[55fr_45fr] gap-12 lg:gap-16 items-center py-20 lg:py-28">
        {/* Text — Left */}
        <div className="text-center lg:text-left min-w-0 overflow-hidden">
          {/* Badges */}
          <div
            className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8 animate-fade-up"
            style={{ animationDelay: '0s' }}
          >
            <span className="section-label">
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse2"
                style={{ background: '#EA580B', display: 'inline-block' }}
              />
              {t('badge1')}
            </span>
            <span className="section-label" style={{ color: '#EA580B', borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)' }}>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse2"
                style={{ background: '#EA580B', display: 'inline-block', animationDelay: '0.5s' }}
              />
              {t('badge2')}
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display font-extrabold leading-[1.05] tracking-tight text-white mb-6 animate-fade-up"
            style={{
              fontFamily: 'var(--font-syne, Syne, sans-serif)',
              fontSize: 'clamp(36px, 4.5vw, 62px)',
              animationDelay: '0.1s',
            }}
          >
            <span style={{ color: '#FFFFFF' }}>{t('headline').split('.')[0]}.</span>
            {t('headline').split('.').length > 1 && (
              <>
                {' '}
                <span className="text-glow-cyan" style={{ color: '#EA580B' }}>
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
            <a href="/de/app" className="btn-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
              {t('ctaPrimary')}
            </a>
            <a href="#how-it-works" className="btn-ghost">
              {t('ctaSecondary')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>

            {/* iOS App Store */}
            <a
              href="https://apps.apple.com/app/vox42/id6741490994"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#fff', border: '1px solid rgba(255,255,255,0.13)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.13)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)'; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              App Store
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

        {/* iPhone Mockup — Right */}
        <div className="flex items-center justify-end">
          <div className="relative" style={{ animation: 'float 3s ease-in-out infinite' }}>
            {/* Glow behind iPhone */}
            <div
              className="absolute inset-0 -z-10 blur-3xl rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 70%)' }}
            />

            {/* iPhone Frame */}
            <div
              style={{
                width: '260px',
                height: '520px',
                background: '#1a1a1a',
                borderRadius: '44px',
                border: '10px solid #2a2a2a',
                boxShadow: '0 0 0 1px #3a3a3a, 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,212,255,0.15)',
                position: 'relative',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {/* Dynamic Island */}
              <div
                style={{
                  width: '100px',
                  height: '26px',
                  background: '#1a1a1a',
                  borderRadius: '0 0 20px 20px',
                  margin: '0 auto',
                  position: 'relative',
                  zIndex: 10,
                }}
              />

              {/* iPhone Screen */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: '#f2f2f7',
                  borderRadius: '34px',
                  overflow: 'hidden',
                  fontFamily: "-apple-system, 'SF Pro Display', BlinkMacSystemFont, sans-serif",
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Status Bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 20px 0',
                    paddingTop: '36px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#000',
                  }}
                >
                  <span>15:16</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {/* Signal */}
                    <svg width="17" height="12" viewBox="0 0 17 12" fill="#000">
                      <rect x="0" y="7" width="3" height="5" rx="0.5"/>
                      <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.5"/>
                      <rect x="9" y="2" width="3" height="10" rx="0.5"/>
                      <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3"/>
                    </svg>
                    {/* WiFi */}
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="#000">
                      <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/>
                      <path d="M2.5 5.5C4.1 3.9 5.9 3 8 3s3.9.9 5.5 2.5" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                      <path d="M0 3C2.7 0.4 5.2 0 8 0s5.3.4 8 3" stroke="#000" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.4"/>
                    </svg>
                    {/* Battery */}
                    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                      <rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="#000" strokeOpacity="0.35"/>
                      <rect x="22" y="3.5" width="2.5" height="5" rx="1" fill="#000" fillOpacity="0.4"/>
                      <rect x="2" y="2" width="16" height="8" rx="1.5" fill="#000"/>
                    </svg>
                  </div>
                </div>

                {/* App Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 16px 0' }}>

                  {/* Balance + Charge Button */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <div>
                      <div style={{ fontSize: '9px', color: '#8e8e93', fontWeight: '500', marginBottom: '1px' }}>Guthaben</div>
                      <div style={{ fontSize: '22px', fontWeight: '700', color: '#000', letterSpacing: '-0.5px' }}>59.54 €</div>
                    </div>
                    <button style={{
                      background: '#007AFF',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '6px 12px',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}>
                      + Aufladen
                    </button>
                  </div>

                  {/* Language Selector Pill */}
                  <div style={{ marginBottom: '8px' }}>
                    <button style={{
                      background: '#e5e5ea',
                      border: 'none',
                      borderRadius: '20px',
                      padding: '5px 12px',
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#000',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}>
                      🇩🇪 Deutsch
                      <span style={{ fontSize: '10px', color: '#8e8e93' }}>↓</span>
                    </button>
                  </div>

                  {/* Phone Number */}
                  <div style={{ textAlign: 'center', marginBottom: '2px' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#000', letterSpacing: '0.5px', fontVariantNumeric: 'tabular-nums' }}>
                      001 602 337 554
                    </div>
                    <div style={{ fontSize: '10px', color: '#8e8e93', marginTop: '2px' }}>
                      🇺🇸 USA / Kanada · 1,19 €/Min
                    </div>
                  </div>

                  {/* Language of counterpart */}
                  <div style={{
                    background: '#e5e5ea',
                    borderRadius: '10px',
                    padding: '7px 12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '8px',
                    marginTop: '6px',
                  }}>
                    <span style={{ fontSize: '10px', color: '#8e8e93' }}>Sprache des Gegenübers</span>
                    <span style={{ fontSize: '10px', fontWeight: '600', color: '#000' }}>🇬🇧 English &gt;</span>
                  </div>

                  {/* Dial Pad */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '8px' }}>
                    {[
                      { num: '1', sub: '' },
                      { num: '2', sub: 'ABC' },
                      { num: '3', sub: 'DEF' },
                      { num: '4', sub: 'GHI' },
                      { num: '5', sub: 'JKL' },
                      { num: '6', sub: 'MNO' },
                      { num: '7', sub: 'PQRS' },
                      { num: '8', sub: 'TUV' },
                      { num: '9', sub: 'WXYZ' },
                      { num: '+', sub: '' },
                      { num: '0', sub: '' },
                      { num: '⌫', sub: '' },
                    ].map(({ num, sub }) => (
                      <button
                        key={num}
                        style={{
                          background: '#fff',
                          border: 'none',
                          borderRadius: '10px',
                          padding: '6px 4px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
                          cursor: 'pointer',
                          minHeight: '36px',
                        }}
                      >
                        <span style={{ fontSize: '16px', fontWeight: '400', color: '#000', lineHeight: 1.1 }}>{num}</span>
                        {sub && <span style={{ fontSize: '7px', color: '#8e8e93', fontWeight: '600', letterSpacing: '0.5px' }}>{sub}</span>}
                      </button>
                    ))}
                  </div>

                  {/* Call Button */}
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
                    <button style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: '#34C759',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(52,199,89,0.4)',
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Bottom Nav */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  padding: '8px 0 16px',
                  borderTop: '1px solid rgba(0,0,0,0.08)',
                  background: '#f9f9f9',
                }}>
                  {[
                    {
                      label: 'Anruf',
                      active: true,
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#007AFF">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Verlauf',
                      active: false,
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Profil',
                      active: false,
                      icon: (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="1.8" strokeLinecap="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                      ),
                    },
                  ].map(({ label, active, icon }) => (
                    <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                      {icon}
                      <span style={{ fontSize: '9px', fontWeight: active ? '600' : '400', color: active ? '#007AFF' : '#8e8e93' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div
              className="absolute glass glow-cyan-sm"
              style={{
                left: '-60px',
                top: '80px',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '700',
                color: '#EA580B',
                fontFamily: 'var(--font-syne, Syne)',
                animation: 'float 5s ease-in-out infinite',
                animationDelay: '0.5s',
                whiteSpace: 'nowrap',
              }}
            >
              ⚡ &lt;0.5s
            </div>
            <div
              className="absolute glass"
              style={{
                right: '-56px',
                bottom: '120px',
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '700',
                color: '#EA580B',
                fontFamily: 'var(--font-syne, Syne)',
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '1.2s',
                border: '1px solid rgba(245,158,11,0.2)',
                whiteSpace: 'nowrap',
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
