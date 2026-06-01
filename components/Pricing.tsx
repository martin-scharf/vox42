'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface Zone {
  label: string;
  price: string;
  color: string;
  countries: Array<{ name: string; dial: string }>;
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const zones = t.raw('zones') as Zone[];
  const [activeZone, setActiveZone] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="pricing" style={{ padding: '90px 0', background: '#1E293B', position: 'relative' }}>
      {/* subtle glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 30% at 50% 0%, rgba(0,212,255,0.04) 0%, transparent 70%)' }} />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '12px' }}>
            {t('title')}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* No-hidden-costs banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(91,33,182,0.08))',
          border: '1px solid rgba(0,212,255,0.25)',
          borderRadius: '16px', padding: '20px 24px', marginBottom: '40px',
          display: 'flex', alignItems: 'flex-start', gap: '16px',
        }}>
          <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>✅</div>
          <div>
            <strong style={{ color: '#00D4FF', fontSize: '1rem', display: 'block', marginBottom: '6px' }}>
              {t('noHidden')}
            </strong>
            <span style={{ color: '#94A3B8', fontSize: '0.88rem', lineHeight: 1.6 }}>
              {t('noHiddenDesc')}
            </span>
          </div>
        </div>

        {/* Zone Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '28px' }}>
          {zones.map((zone, i) => (
            <button
              key={i}
              onClick={() => setActiveZone(i)}
              style={{
                padding: '9px 18px', borderRadius: '30px', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 600,
                border: activeZone === i ? `1px solid ${zone.color}` : '1px solid rgba(255,255,255,0.1)',
                background: activeZone === i ? `${zone.color}20` : 'rgba(255,255,255,0.04)',
                color: activeZone === i ? zone.color : '#64748B',
                boxShadow: activeZone === i ? `0 0 16px ${zone.color}30` : 'none',
                transition: 'all 0.2s',
              }}
            >
              {zone.label}
            </button>
          ))}
        </div>

        {/* Active Zone Card */}
        {zones[activeZone] && (
          <div style={{
            background: 'rgba(255,255,255,0.03)',
            border: `1px solid ${zones[activeZone].color}30`,
            borderRadius: '20px', overflow: 'hidden',
            boxShadow: `0 0 40px ${zones[activeZone].color}10`,
          }}>
            {/* Zone header */}
            <div style={{
              background: `linear-gradient(135deg, ${zones[activeZone].color}15, transparent)`,
              padding: '24px 28px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px',
            }}>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: '#fff', marginBottom: '4px' }}>
                  {zones[activeZone].label}
                </h3>
                <p style={{ color: '#64748B', fontSize: '0.85rem' }}>
                  {zones[activeZone].countries.length} Länder
                </p>
              </div>
              <div style={{
                background: `${zones[activeZone].color}20`,
                border: `2px solid ${zones[activeZone].color}`,
                borderRadius: '14px', padding: '12px 24px', textAlign: 'center',
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.8rem', color: zones[activeZone].color, lineHeight: 1 }}>
                  {zones[activeZone].price}
                </div>
                <div style={{ color: '#64748B', fontSize: '0.72rem', marginTop: '4px' }}>inkl. KI-Übersetzung</div>
              </div>
            </div>

            {/* Countries grid */}
            <div style={{ padding: '20px 28px' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '8px',
              }}>
                {zones[activeZone].countries.map((c, j) => (
                  <div key={j} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}>
                    <span style={{ color: '#E2E8F0', fontSize: '0.88rem', fontWeight: 500 }}>{c.name}</span>
                    <span style={{ color: '#475569', fontSize: '0.78rem', fontFamily: 'monospace' }}>{c.dial}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* All zones overview */}
        <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
          {zones.map((zone, i) => (
            <button
              key={i}
              onClick={() => setActiveZone(i)}
              style={{
                padding: '16px', borderRadius: '14px', cursor: 'pointer', textAlign: 'left',
                border: `1px solid ${zone.color}${activeZone === i ? '60' : '25'}`,
                background: activeZone === i ? `${zone.color}12` : 'rgba(255,255,255,0.02)',
                transition: 'all 0.2s',
              }}
            >
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: zone.color }}>{zone.price}</div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.85rem', marginTop: '4px' }}>{zone.label}</div>
              <div style={{ color: '#475569', fontSize: '0.75rem', marginTop: '2px' }}>{zone.countries.length} Länder</div>
            </button>
          ))}
        </div>

        {/* Note */}
        <p style={{ textAlign: 'center', color: '#475569', fontSize: '0.8rem', marginTop: '28px', lineHeight: 1.6 }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
