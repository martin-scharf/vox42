'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

// ─── Data ──────────────────────────────────────────────────────────────────────

const LANGUAGES = [
  { code: 'es', label: 'Español',           flag: '🇪🇸' },
  { code: 'pt', label: 'Português',         flag: '🇧🇷' },
  { code: 'fr', label: 'Français',          flag: '🇫🇷' },
  { code: 'ja', label: '日本語',             flag: '🇯🇵' },
  { code: 'ru', label: 'Русский',           flag: '🇷🇺' },
  { code: 'zh', label: '中文',              flag: '🇨🇳' },
  { code: 'de', label: 'Deutsch',           flag: '🇩🇪' },
  { code: 'ko', label: '한국어',             flag: '🇰🇷' },
  { code: 'hi', label: 'हिन्दी',            flag: '🇮🇳' },
  { code: 'id', label: 'Bahasa Indonesia',  flag: '🇮🇩' },
  { code: 'vi', label: 'Tiếng Việt',        flag: '🇻🇳' },
  { code: 'it', label: 'Italiano',          flag: '🇮🇹' },
  { code: 'en', label: 'English',           flag: '🇺🇸' },
] as const;

type LangCode = typeof LANGUAGES[number]['code'];

const LANGUAGE_COUNTRIES: Record<LangCode, string[]> = {
  es: ['ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 'BO', 'PY', 'UY', 'CR', 'CU', 'DO', 'GT', 'HN', 'NI', 'PA', 'SV'],
  pt: ['PT', 'BR', 'AO', 'MZ', 'CV', 'GW', 'ST', 'TL'],
  fr: ['FR', 'BE', 'CH', 'CA', 'LU', 'MA', 'SN', 'CI', 'CM', 'CD', 'MG'],
  ja: ['JP'],
  ru: ['RU', 'BY', 'KZ', 'KG'],
  zh: ['CN', 'TW', 'HK', 'SG', 'MY'],
  de: ['DE', 'AT', 'CH', 'LU', 'LI'],
  ko: ['KR'],
  hi: ['IN'],
  id: ['ID'],
  vi: ['VN'],
  it: ['IT', 'CH', 'SM', 'VA'],
  en: ['US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'IN', 'SG', 'PH', 'NG', 'GH', 'KE'],
};

const ZONE_A = ['DE', 'AT', 'CH', 'LU', 'LI'];
const ZONE_B = ['FR', 'IT', 'ES', 'PT', 'NL', 'BE', 'PL', 'IE', 'GB', 'BY', 'UA', 'TR', 'CY', 'SM', 'VA', 'LU', 'LI', 'AT', 'HR', 'CZ', 'SK', 'HU', 'RO', 'BG', 'GR', 'FI', 'SE', 'NO', 'DK', 'EE', 'LV', 'LT', 'SI', 'RS'];
const ZONE_C = ['US', 'CA', 'AU', 'NZ', 'JP', 'KR', 'SG', 'HK', 'TW', 'IN', 'ID', 'VN', 'PH', 'MY'];

function getZone(country: string): string {
  if (ZONE_A.includes(country)) return 'A';
  if (ZONE_B.includes(country)) return 'B';
  if (ZONE_C.includes(country)) return 'C';
  return 'D';
}

const ZONE_RATES: Record<string, string> = {
  A: '0,08 €/Min',
  B: '0,12 €/Min',
  C: '0,18 €/Min',
  D: '0,28 €/Min',
};

// ─── Map Data ─────────────────────────────────────────────────────────────────

// SVG viewBox: 0 0 900 480
// Country rects: [x, y, w, h, code]
type CountryRect = { x: number; y: number; w: number; h: number; code: string };

const MAP_COUNTRIES: CountryRect[] = [
  // North America
  { x: 50,  y: 20,  w: 200, h: 80,  code: 'CA' },
  { x: 70,  y: 100, w: 200, h: 100, code: 'US' },
  { x: 92,  y: 200, w: 100, h: 70,  code: 'MX' },

  // South America
  { x: 118, y: 265, w: 60,  h: 55,  code: 'CO' },
  { x: 168, y: 260, w: 58,  h: 38,  code: 'VE' },
  { x: 106, y: 305, w: 36,  h: 35,  code: 'EC' },
  { x: 106, y: 335, w: 68,  h: 78,  code: 'PE' },
  { x: 172, y: 278, w: 148, h: 160, code: 'BR' },
  { x: 118, y: 363, w: 24,  h: 108, code: 'CL' },
  { x: 142, y: 383, w: 64,  h: 92,  code: 'AR' },

  // Europe
  { x: 330, y: 85,  w: 25,  h: 25,  code: 'IE' },
  { x: 352, y: 68,  w: 32,  h: 58,  code: 'GB' },
  { x: 325, y: 142, w: 23,  h: 42,  code: 'PT' },
  { x: 346, y: 128, w: 72,  h: 58,  code: 'ES' },
  { x: 359, y: 108, w: 64,  h: 58,  code: 'FR' },
  { x: 380, y: 86,  w: 25,  h: 24,  code: 'NL' },
  { x: 377, y: 108, w: 27,  h: 22,  code: 'BE' },
  { x: 388, y: 122, w: 13,  h: 13,  code: 'LU' },
  { x: 410, y: 133, w: 9,   h: 12,  code: 'LI' },
  { x: 392, y: 88,  w: 48,  h: 52,  code: 'DE' },
  { x: 387, y: 136, w: 29,  h: 23,  code: 'CH' },
  { x: 415, y: 126, w: 40,  h: 20,  code: 'AT' },
  { x: 403, y: 146, w: 35,  h: 80,  code: 'IT' },
  { x: 420, y: 146, w: 8,   h: 8,   code: 'SM' },
  { x: 415, y: 152, w: 7,   h: 7,   code: 'VA' },
  { x: 432, y: 86,  w: 50,  h: 44,  code: 'PL' },

  // Eastern Europe
  { x: 447, y: 80,  w: 37,  h: 29,  code: 'BY' },
  { x: 443, y: 108, w: 67,  h: 40,  code: 'UA' },

  // Turkey/Levant
  { x: 446, y: 148, w: 82,  h: 40,  code: 'TR' },
  { x: 467, y: 185, w: 22,  h: 15,  code: 'CY' },

  // Russia
  { x: 480, y: 25,  w: 308, h: 108, code: 'RU' },

  // Central Asia
  { x: 523, y: 130, w: 100, h: 66,  code: 'KZ' },
  { x: 592, y: 162, w: 38,  h: 24,  code: 'KG' },

  // South Asia
  { x: 582, y: 190, w: 80,  h: 110, code: 'IN' },

  // East Asia
  { x: 620, y: 92,  w: 120, h: 120, code: 'CN' },
  { x: 716, y: 160, w: 19,  h: 24,  code: 'TW' },
  { x: 710, y: 174, w: 12,  h: 12,  code: 'HK' },
  { x: 734, y: 96,  w: 40,  h: 98,  code: 'JP' },
  { x: 724, y: 147, w: 24,  h: 34,  code: 'KR' },
  { x: 686, y: 238, w: 13,  h: 13,  code: 'SG' },
  { x: 658, y: 224, w: 48,  h: 28,  code: 'MY' },

  // Africa
  { x: 341, y: 188, w: 50,  h: 40,  code: 'MA' },
  { x: 315, y: 242, w: 38,  h: 27,  code: 'SN' },
  { x: 337, y: 261, w: 39,  h: 29,  code: 'CI' },
  { x: 397, y: 294, w: 58,  h: 68,  code: 'AO' },
  { x: 452, y: 302, w: 33,  h: 68,  code: 'MZ' },
  { x: 406, y: 370, w: 68,  h: 48,  code: 'ZA' },
  { x: 299, y: 241, w: 14,  h: 12,  code: 'CV' },

  // Oceania
  { x: 656, y: 308, w: 127, h: 86,  code: 'AU' },
  { x: 760, y: 344, w: 28,  h: 54,  code: 'NZ' },
];

// ─── World Map Component ───────────────────────────────────────────────────────

function WorldMap({ activeCountries }: { activeCountries: Set<string> }) {
  return (
    <svg
      viewBox="0 0 900 480"
      width="100%"
      style={{ maxWidth: '900px', display: 'block', margin: '0 auto' }}
      aria-hidden
    >
      {/* Ocean background */}
      <rect width="900" height="480" fill="rgba(0,0,0,0)" />

      {/* Continent hint lines */}
      <rect x="40"  y="10"  width="340" height="458" rx="4" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
      <rect x="315" y="60"  width="300" height="390" rx="4" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
      <rect x="460" y="15"  width="320" height="330" rx="4" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
      <rect x="295" y="180" width="200" height="250" rx="4" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>
      <rect x="640" y="0" width="250" height="290" rx="4" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.025)" strokeWidth="1"/>

      {/* Countries */}
      {MAP_COUNTRIES.map(({ x, y, w, h, code }) => {
        const isActive = activeCountries.has(code);
        const zone = getZone(code);
        return (
          <g key={code}>
            <rect
              x={x} y={y} width={w} height={h}
              rx="3"
              fill={
                isActive
                  ? zone === 'A' ? 'rgba(0,212,255,0.35)'
                  : zone === 'B' ? 'rgba(0,212,255,0.25)'
                  : zone === 'C' ? 'rgba(0,212,255,0.2)'
                  : 'rgba(0,212,255,0.15)'
                  : 'rgba(255,255,255,0.04)'
              }
              stroke={isActive ? '#00D4FF' : 'rgba(255,255,255,0.08)'}
              strokeWidth={isActive ? 1.5 : 0.8}
              style={{
                filter: isActive ? 'drop-shadow(0 0 8px rgba(0,212,255,0.6))' : 'none',
                transition: 'all 0.25s ease',
              }}
            />
            {/* Country label — only show for larger rects */}
            {w >= 22 && h >= 18 && (
              <text
                x={x + w / 2}
                y={y + h / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={Math.min(w, h) < 30 ? 7 : 9}
                fontWeight={isActive ? '700' : '500'}
                fill={isActive ? '#00D4FF' : 'rgba(255,255,255,0.25)'}
                fontFamily="var(--font-syne, Syne, sans-serif)"
                style={{ transition: 'all 0.25s ease', userSelect: 'none' }}
              >
                {code}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────

export default function LanguageConfigurator() {
  const t = useTranslations('configurator');
  const [sourceLang, setSourceLang] = useState<LangCode>('de');
  const [targetLang, setTargetLang] = useState<LangCode | null>(null);

  const targetLanguages = LANGUAGES.filter(l => l.code !== sourceLang);
  const activeCountriesArr = targetLang
    ? (LANGUAGE_COUNTRIES[targetLang] ?? [])
    : [];
  const activeCountries = new Set<string>(activeCountriesArr);

  const targetCountries = targetLang ? LANGUAGE_COUNTRIES[targetLang] : [];
  const zones = Array.from(new Set(targetCountries.map(getZone))).sort();
  const lowestZone = zones[0] ?? 'D';

  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: '#050810' }}
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full"
        style={{
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <span className="section-label">Sprach-Konfigurator</span>
          </div>
          <h2
            className="font-display font-bold text-white mb-3"
            style={{
              fontFamily: 'var(--font-syne, Syne, sans-serif)',
              fontSize: 'clamp(26px, 4vw, 44px)',
            }}
          >
            {t('title')}
          </h2>
          <p className="text-base max-w-lg mx-auto" style={{ color: '#64748B' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Controls */}
        <div
          className="rounded-2xl p-6 mb-6"
          style={{
            background: 'rgba(13,17,23,0.8)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Source language selector */}
          <div className="mb-6">
            <label
              className="block text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#64748B', fontFamily: 'var(--font-syne, Syne)' }}
            >
              {t('speaksLabel')}
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setSourceLang(lang.code as LangCode);
                    if (targetLang === lang.code) setTargetLang(null);
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150"
                  style={{
                    background: sourceLang === lang.code ? 'rgba(0,212,255,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${sourceLang === lang.code ? 'rgba(0,212,255,0.4)' : 'rgba(255,255,255,0.07)'}`,
                    color: sourceLang === lang.code ? '#00D4FF' : '#94A3B8',
                    fontFamily: 'var(--font-dm-sans, DM Sans)',
                    boxShadow: sourceLang === lang.code ? '0 0 12px rgba(0,212,255,0.15)' : '',
                  }}
                >
                  <span>{lang.flag}</span>
                  <span className="truncate text-xs">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target language selector */}
          <div>
            <label
              className="block text-xs font-bold uppercase tracking-widest mb-3"
              style={{ color: '#64748B', fontFamily: 'var(--font-syne, Syne)' }}
            >
              {t('translatesTo')}
            </label>
            <div className="flex flex-wrap gap-2">
              {targetLanguages.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => setTargetLang(prev => prev === lang.code ? null : lang.code as LangCode)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150"
                  style={{
                    background: targetLang === lang.code ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${targetLang === lang.code ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.07)'}`,
                    color: targetLang === lang.code ? '#F59E0B' : '#94A3B8',
                    fontFamily: 'var(--font-dm-sans, DM Sans)',
                    boxShadow: targetLang === lang.code ? '0 0 12px rgba(245,158,11,0.2)' : '',
                  }}
                >
                  <span>{lang.flag}</span>
                  <span className="text-xs">{lang.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Map + Zone Info */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(8,11,18,0.9)',
            border: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Zone info bar */}
          {targetLang ? (
            <div
              className="flex items-center justify-between px-5 py-3 flex-wrap gap-3"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-3">
                <span
                  className="text-sm font-bold"
                  style={{ color: '#00D4FF', fontFamily: 'var(--font-syne, Syne)' }}
                >
                  {LANGUAGES.find(l => l.code === sourceLang)?.flag}
                  {' → '}
                  {LANGUAGES.find(l => l.code === targetLang)?.flag}
                  {' '}
                  {LANGUAGES.find(l => l.code === targetLang)?.label}
                </span>
                <span className="text-xs" style={{ color: '#334155' }}>
                  {activeCountries.size} {activeCountries.size === 1 ? 'Land' : 'Länder'}
                </span>
              </div>
              <div
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{
                  background: 'rgba(245,158,11,0.1)',
                  border: '1px solid rgba(245,158,11,0.25)',
                  color: '#F59E0B',
                  fontFamily: 'var(--font-syne, Syne)',
                }}
              >
                Zone {lowestZone} — {t('fromLabel')} {ZONE_RATES[lowestZone]}
              </div>
            </div>
          ) : (
            <div
              className="px-5 py-3 text-center text-sm"
              style={{
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                color: '#334155',
              }}
            >
              {t('selectTarget')}
            </div>
          )}

          {/* Map */}
          <div className="p-4 sm:p-6">
            <WorldMap activeCountries={activeCountries} />
          </div>

          {/* Active countries list */}
          {targetLang && activeCountries.size > 0 && (
            <div
              className="px-5 py-4 flex flex-wrap gap-2"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
            >
              {Array.from(activeCountries).map(country => (
                <span
                  key={country}
                  className="px-2 py-1 rounded-lg text-xs font-bold"
                  style={{
                    background: 'rgba(0,212,255,0.1)',
                    border: '1px solid rgba(0,212,255,0.2)',
                    color: '#00D4FF',
                    fontFamily: 'var(--font-syne, Syne)',
                  }}
                >
                  {country}
                  <span className="ml-1 opacity-60">Z{getZone(country)}</span>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
