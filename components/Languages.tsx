'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

// 13 Output/Target languages (Audio + Transcript)
const OUTPUT_LANGUAGES = [
  { flag: '🇪🇸', name: 'Español' },
  { flag: '🇧🇷', name: 'Português' },
  { flag: '🇫🇷', name: 'Français' },
  { flag: '🇯🇵', name: '日本語' },
  { flag: '🇷🇺', name: 'Русский' },
  { flag: '🇨🇳', name: '中文' },
  { flag: '🇩🇪', name: 'Deutsch' },
  { flag: '🇰🇷', name: '한국어' },
  { flag: '🇮🇳', name: 'हिन्दी' },
  { flag: '🇮🇩', name: 'Bahasa Indonesia' },
  { flag: '🇻🇳', name: 'Tiếng Việt' },
  { flag: '🇮🇹', name: 'Italiano' },
  { flag: '🇺🇸', name: 'English' },
];

// 70+ Input languages (auto-detected by OpenAI)
const INPUT_LANGUAGES = [
  'Arabic', 'Afrikaans', 'Azerbaijani', 'Belarusian', 'Bengali', 'Bosnian',
  'Bulgarian', 'Catalan', 'Chinese', 'Croatian', 'Czech', 'Danish', 'Dutch',
  'Dzongkha', 'English', 'Esperanto', 'Estonian', 'Basque', 'Persian/Farsi',
  'Finnish', 'Filipino', 'French', 'Galician', 'German', 'Greek', 'Gujarati',
  'Haitian Creole', 'Hawaiian', 'Hebrew', 'Hindi', 'Hungarian', 'Armenian',
  'Indonesian', 'Italian', 'Japanese', 'Javanese', 'Georgian', 'Kazakh',
  'Korean', 'Kurdish', 'Latin', 'Latvian', 'Lithuanian', 'Macedonian',
  'Malay', 'Malayalam', 'Maori', 'Mongolian', 'Burmese', 'Nepali',
  'Norwegian', 'Nynorsk', 'Polish', 'Portuguese', 'Punjabi', 'Romanian',
  'Russian', 'Serbian', 'Shona', 'Slovak', 'Slovenian', 'Albanian',
  'Spanish', 'Swahili', 'Swedish', 'Tagalog', 'Telugu', 'Thai', 'Turkish',
  'Ukrainian', 'Uzbek', 'Vietnamese', 'Welsh', 'Yoruba',
];

export default function Languages() {
  const t = useTranslations('languages');
  const [tab, setTab] = useState<'output' | 'input'>('output');

  return (
    <section
      id="languages"
      className="py-24 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #1E293B 0%, #1a2535 100%)' }}
    >
      {/* background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(0,212,255,0.04) 0%, transparent 70%)'
      }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2
            className="font-bold mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            {t('title')}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-10">
          <div
            style={{
              display: 'inline-flex',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '14px',
              padding: '4px',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <button
              onClick={() => setTab('output')}
              style={{
                padding: '8px 20px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: tab === 'output' ? 'rgba(0,212,255,0.15)' : 'transparent',
                color: tab === 'output' ? '#00D4FF' : '#94A3B8',
                boxShadow: tab === 'output' ? '0 0 20px rgba(0,212,255,0.2)' : 'none',
              }}
            >
              {t('outputTitle')}
            </button>
            <button
              onClick={() => setTab('input')}
              style={{
                padding: '8px 20px',
                borderRadius: '10px',
                fontSize: '0.85rem',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: tab === 'input' ? 'rgba(0,212,255,0.15)' : 'transparent',
                color: tab === 'input' ? '#00D4FF' : '#94A3B8',
                boxShadow: tab === 'input' ? '0 0 20px rgba(0,212,255,0.2)' : 'none',
              }}
            >
              {t('inputTitle')}
            </button>
          </div>
        </div>

        {/* Output Languages: 13 big cards */}
        {tab === 'output' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '12px' }}>
            {OUTPUT_LANGUAGES.map((lang) => (
              <div
                key={lang.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '20px 12px',
                  borderRadius: '16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  transition: 'all 0.25s',
                  cursor: 'default',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(0,212,255,0.4)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(0,212,255,0.05)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 0 20px rgba(0,212,255,0.1)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.border = '1px solid rgba(255,255,255,0.07)';
                  (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.03)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
                }}
              >
                <span style={{ fontSize: '2rem' }}>{lang.flag}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#E2E8F0', textAlign: 'center' }}>{lang.name}</span>
              </div>
            ))}
          </div>
        )}

        {/* Input Languages: 70+ small tags */}
        {tab === 'input' && (
          <div>
            <p style={{
              textAlign: 'center', color: '#00D4FF', fontWeight: 700,
              fontSize: '0.9rem', marginBottom: '20px', letterSpacing: '0.05em',
            }}>
              {t('inputCount')}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {INPUT_LANGUAGES.map((lang) => (
                <span
                  key={lang}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#94A3B8',
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
