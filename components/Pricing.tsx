'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Zone {
  id: string;
  label: string;
  countries: string;
  rate: string;
  desc: string;
}

interface Credit {
  amount: string;
  minutes: string;
  popular?: boolean;
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const zones   = t.raw('zones')   as Zone[];
  const credits = t.raw('credits') as Credit[];
  const [activeZone, setActiveZone] = useState(0);

  return (
    <section
      id="pricing"
      className="py-24 relative overflow-hidden"
      style={{ background: '#080b12' }}
    >
      {/* Background accents */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 65%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="section-label" style={{ color: '#F59E0B', borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)' }}>
              Preise
            </span>
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
          <p className="text-lg max-w-xl mx-auto" style={{ color: '#64748B' }}>
            {t('subtitle')}
          </p>

          {/* No sub / no contract badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {[t('noSub'), t('noContract'), t('creditNeverExpires')].map((label) => (
              <span
                key={label}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E', border: '1px solid rgba(34,197,94,0.2)' }}
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Zone Selector */}
        <div className="mb-12">
          <h3
            className="text-center font-display font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-syne, Syne)', fontSize: '1.1rem' }}
          >
            {t('zonesTitle')}
          </h3>

          {/* Zone tabs */}
          <div className="flex items-center justify-center gap-3 mb-8 flex-wrap">
            {zones.map((zone, i) => (
              <button
                key={zone.id}
                onClick={() => setActiveZone(i)}
                className="px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  fontFamily: 'var(--font-syne, Syne)',
                  background: activeZone === i ? '#F59E0B' : 'rgba(255,255,255,0.05)',
                  color: activeZone === i ? '#000' : '#94A3B8',
                  border: activeZone === i ? 'none' : '1px solid rgba(255,255,255,0.08)',
                  boxShadow: activeZone === i ? '0 0 20px rgba(245,158,11,0.3)' : '',
                }}
              >
                {zone.label}
              </button>
            ))}
          </div>

          {/* Active zone details */}
          {zones[activeZone] && (
            <div
              className="max-w-2xl mx-auto rounded-2xl p-8 text-center"
              style={{
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.2)',
              }}
            >
              <div
                className="font-display font-extrabold mb-2"
                style={{
                  fontFamily: 'var(--font-syne, Syne)',
                  fontSize: 'clamp(36px, 5vw, 56px)',
                  color: '#F59E0B',
                  textShadow: '0 0 40px rgba(245,158,11,0.4)',
                }}
              >
                {zones[activeZone].rate}
              </div>
              <p className="font-semibold text-white mb-1" style={{ fontFamily: 'var(--font-syne, Syne)' }}>
                {zones[activeZone].desc}
              </p>
              <p className="text-sm" style={{ color: '#64748B' }}>
                {zones[activeZone].countries}
              </p>
            </div>
          )}
        </div>

        {/* Credit packages */}
        <h3
          className="text-center font-display font-bold text-white mb-8"
          style={{ fontFamily: 'var(--font-syne, Syne)', fontSize: '1.1rem' }}
        >
          {t('creditsTitle')}
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {credits.map((credit, i) => (
            <div
              key={i}
              className="relative rounded-2xl p-6 text-center transition-all duration-300 cursor-pointer group"
              style={{
                background: credit.popular ? 'rgba(0,212,255,0.08)' : 'rgba(13,17,23,0.8)',
                border: credit.popular ? '1px solid rgba(0,212,255,0.3)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: credit.popular ? '0 0 30px rgba(0,212,255,0.1)' : '',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = 'translateY(-3px)';
                if (!credit.popular) {
                  el.style.borderColor = 'rgba(0,212,255,0.2)';
                  el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)';
                }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = '';
                if (!credit.popular) {
                  el.style.borderColor = 'rgba(255,255,255,0.07)';
                  el.style.boxShadow = '';
                }
              }}
            >
              {credit.popular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: '#00D4FF',
                    color: '#000',
                    fontFamily: 'var(--font-syne, Syne)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  ★ Beliebt
                </div>
              )}

              <div
                className="font-display font-extrabold mb-1"
                style={{
                  fontFamily: 'var(--font-syne, Syne)',
                  fontSize: 'clamp(28px, 3vw, 36px)',
                  color: credit.popular ? '#00D4FF' : '#FFFFFF',
                }}
              >
                {credit.amount}
              </div>

              <p className="text-xs leading-relaxed mt-2" style={{ color: '#64748B' }}>
                {credit.minutes}
              </p>

              <button
                className="mt-5 w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: credit.popular ? '#00D4FF' : 'rgba(255,255,255,0.07)',
                  color: credit.popular ? '#000' : '#94A3B8',
                  fontFamily: 'var(--font-syne, Syne)',
                  border: credit.popular ? 'none' : '1px solid rgba(255,255,255,0.1)',
                }}
              >
                Aufladen
              </button>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="mt-12 text-center">
          <p className="text-sm mb-5" style={{ color: '#334155' }}>
            {t('note')}
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { label: 'Apple Pay', icon: '🍎' },
              { label: 'Google Pay', icon: 'G' },
              { label: 'Kreditkarte', icon: '💳' },
              { label: 'Stripe', icon: 'S' },
            ].map(({ label, icon }) => (
              <div
                key={label}
                className="px-4 py-2 rounded-lg flex items-center gap-2 text-xs font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#64748B',
                }}
              >
                <span>{icon}</span>
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
