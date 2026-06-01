'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import WorldMapD3 from './WorldMapD3';

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
  es: ['ES','MX','AR','CO','PE','VE','CL','EC','BO','PY','UY','CR','CU','DO','GT','HN','NI','PA','SV','GQ'],
  pt: ['PT','BR','AO','MZ','CV','GW','ST','TL'],
  fr: ['FR','BE','CH','CA','LU','MA','SN','CI','CM','CD','MG','ML','NE','BF','TG','BJ','GA','CG','TD','CF','GN','HT','DJ','MU','SC'],
  ja: ['JP'],
  ru: ['RU','BY','KZ','KG','TJ','UZ'],
  zh: ['CN','TW','HK','SG','MY'],
  de: ['DE','AT','CH','LU','LI','BE'],
  ko: ['KR'],
  hi: ['IN'],
  id: ['ID'],
  vi: ['VN'],
  it: ['IT','CH','SM'],
  en: ['US','GB','CA','AU','NZ','IE','ZA','NG','SG','PH','GH','KE','ZW','LR','SL','GM'],
};

const ALL_TARGET_CODES = Array.from(new Set(Object.values(LANGUAGE_COUNTRIES).flat()));

const COUNTRY_DATA: Record<string, { name: string; lang: string; flag: string }> = {
  AF:{name:'Afghanistan',       flag:'🇦🇫', lang:'Persisch/Dari, Paschtu'},
  AL:{name:'Albanien',          flag:'🇦🇱', lang:'Albanisch'},
  DZ:{name:'Algerien',          flag:'🇩🇿', lang:'Arabisch, Französisch'},
  AD:{name:'Andorra',           flag:'🇦🇩', lang:'Katalanisch'},
  AO:{name:'Angola',            flag:'🇦🇴', lang:'Portugiesisch'},
  AM:{name:'Armenien',          flag:'🇦🇲', lang:'Armenisch'},
  AZ:{name:'Aserbaidschan',     flag:'🇦🇿', lang:'Aserbaidschanisch'},
  AU:{name:'Australien',        flag:'🇦🇺', lang:'Englisch'},
  BD:{name:'Bangladesch',       flag:'🇧🇩', lang:'Bengalisch'},
  BY:{name:'Belarus',           flag:'🇧🇾', lang:'Belarussisch, Russisch'},
  BE:{name:'Belgien',           flag:'🇧🇪', lang:'Niederländisch, Französisch, Deutsch'},
  BJ:{name:'Benin',             flag:'🇧🇯', lang:'Französisch, Yoruba'},
  BT:{name:'Bhutan',            flag:'🇧🇹', lang:'Dzongkha'},
  BA:{name:'Bosnien',           flag:'🇧🇦', lang:'Bosnisch, Kroatisch, Serbisch'},
  BR:{name:'Brasilien',         flag:'🇧🇷', lang:'Portugiesisch'},
  BG:{name:'Bulgarien',         flag:'🇧🇬', lang:'Bulgarisch'},
  BF:{name:'Burkina Faso',      flag:'🇧🇫', lang:'Französisch'},
  CN:{name:'China',             flag:'🇨🇳', lang:'Mandarin'},
  DK:{name:'Dänemark',          flag:'🇩🇰', lang:'Dänisch'},
  DE:{name:'Deutschland',       flag:'🇩🇪', lang:'Deutsch'},
  DO:{name:'Dom. Republik',     flag:'🇩🇴', lang:'Spanisch'},
  EE:{name:'Estland',           flag:'🇪🇪', lang:'Estnisch, Russisch'},
  FI:{name:'Finnland',          flag:'🇫🇮', lang:'Finnisch, Schwedisch'},
  FR:{name:'Frankreich',        flag:'🇫🇷', lang:'Französisch'},
  GA:{name:'Gabun',             flag:'🇬🇦', lang:'Französisch'},
  GM:{name:'Gambia',            flag:'🇬🇲', lang:'Englisch'},
  GE:{name:'Georgien',          flag:'🇬🇪', lang:'Georgisch'},
  GH:{name:'Ghana',             flag:'🇬🇭', lang:'Englisch'},
  GR:{name:'Griechenland',      flag:'🇬🇷', lang:'Griechisch'},
  GT:{name:'Guatemala',         flag:'🇬🇹', lang:'Spanisch'},
  GN:{name:'Guinea',            flag:'🇬🇳', lang:'Französisch'},
  HT:{name:'Haiti',             flag:'🇭🇹', lang:'Haitian Creole, Französisch'},
  IN:{name:'Indien',            flag:'🇮🇳', lang:'Hindi, Bengalisch, Gujarat., Malayalam, Punjabi, Telugu, Englisch'},
  ID:{name:'Indonesien',        flag:'🇮🇩', lang:'Indonesisch, Javanisch'},
  IR:{name:'Iran',              flag:'🇮🇷', lang:'Persisch/Farsi, Kurdisch'},
  IQ:{name:'Irak',              flag:'🇮🇶', lang:'Arabisch, Kurdisch'},
  IE:{name:'Irland',            flag:'🇮🇪', lang:'Englisch'},
  IL:{name:'Israel',            flag:'🇮🇱', lang:'Hebräisch, Arabisch'},
  IT:{name:'Italien',           flag:'🇮🇹', lang:'Italienisch'},
  JP:{name:'Japan',             flag:'🇯🇵', lang:'Japanisch'},
  YE:{name:'Jemen',             flag:'🇾🇪', lang:'Arabisch'},
  JO:{name:'Jordanien',         flag:'🇯🇴', lang:'Arabisch'},
  CA:{name:'Kanada',            flag:'🇨🇦', lang:'Englisch, Französisch'},
  KZ:{name:'Kasachstan',        flag:'🇰🇿', lang:'Kasachisch, Russisch'},
  KE:{name:'Kenia',             flag:'🇰🇪', lang:'Swahili, Englisch'},
  KG:{name:'Kirgisistan',       flag:'🇰🇬', lang:'Russisch'},
  CO:{name:'Kolumbien',         flag:'🇨🇴', lang:'Spanisch'},
  HR:{name:'Kroatien',          flag:'🇭🇷', lang:'Kroatisch'},
  CU:{name:'Kuba',              flag:'🇨🇺', lang:'Spanisch'},
  KW:{name:'Kuwait',            flag:'🇰🇼', lang:'Arabisch'},
  LV:{name:'Lettland',          flag:'🇱🇻', lang:'Lettisch, Russisch'},
  LB:{name:'Libanon',           flag:'🇱🇧', lang:'Arabisch, Französisch'},
  LR:{name:'Liberia',           flag:'🇱🇷', lang:'Englisch'},
  LT:{name:'Litauen',           flag:'🇱🇹', lang:'Litauisch'},
  LU:{name:'Luxemburg',         flag:'🇱🇺', lang:'Deutsch, Französisch'},
  MG:{name:'Madagaskar',        flag:'🇲🇬', lang:'Französisch'},
  MY:{name:'Malaysia',          flag:'🇲🇾', lang:'Malaiisch, Englisch, Chinesisch'},
  ML:{name:'Mali',              flag:'🇲🇱', lang:'Französisch'},
  MA:{name:'Marokko',           flag:'🇲🇦', lang:'Arabisch, Französisch'},
  MR:{name:'Mauretanien',       flag:'🇲🇷', lang:'Arabisch, Französisch'},
  MU:{name:'Mauritius',         flag:'🇲🇺', lang:'Englisch, Französisch'},
  MX:{name:'Mexiko',            flag:'🇲🇽', lang:'Spanisch'},
  MN:{name:'Mongolei',          flag:'🇲🇳', lang:'Mongolisch'},
  ME:{name:'Montenegro',        flag:'🇲🇪', lang:'Serbisch, Bosnisch, Albanisch'},
  MM:{name:'Myanmar',           flag:'🇲🇲', lang:'Burmesisch'},
  NP:{name:'Nepal',             flag:'🇳🇵', lang:'Nepali'},
  NZ:{name:'Neuseeland',        flag:'🇳🇿', lang:'Englisch, Maori'},
  NL:{name:'Niederlande',       flag:'🇳🇱', lang:'Niederländisch'},
  NG:{name:'Nigeria',           flag:'🇳🇬', lang:'Englisch, Yoruba'},
  MK:{name:'Nordmazedonien',    flag:'🇲🇰', lang:'Mazedonisch, Albanisch'},
  NO:{name:'Norwegen',          flag:'🇳🇴', lang:'Norwegisch, Nynorsk'},
  AT:{name:'Österreich',        flag:'🇦🇹', lang:'Deutsch'},
  PK:{name:'Pakistan',          flag:'🇵🇰', lang:'Punjabi, Englisch'},
  PA:{name:'Panama',            flag:'🇵🇦', lang:'Spanisch'},
  PY:{name:'Paraguay',          flag:'🇵🇾', lang:'Spanisch'},
  PE:{name:'Peru',              flag:'🇵🇪', lang:'Spanisch'},
  PH:{name:'Philippinen',       flag:'🇵🇭', lang:'Filipino, Tagalog, Englisch'},
  PL:{name:'Polen',             flag:'🇵🇱', lang:'Polnisch'},
  PT:{name:'Portugal',          flag:'🇵🇹', lang:'Portugiesisch'},
  CG:{name:'Rep. Kongo',        flag:'🇨🇬', lang:'Französisch'},
  RO:{name:'Rumänien',          flag:'🇷🇴', lang:'Rumänisch'},
  RU:{name:'Russland',          flag:'🇷🇺', lang:'Russisch'},
  SA:{name:'Saudi-Arabien',     flag:'🇸🇦', lang:'Arabisch'},
  SN:{name:'Senegal',           flag:'🇸🇳', lang:'Französisch'},
  RS:{name:'Serbien',           flag:'🇷🇸', lang:'Serbisch'},
  SC:{name:'Seychellen',        flag:'🇸🇨', lang:'Französisch, Englisch'},
  SL:{name:'Sierra Leone',      flag:'🇸🇱', lang:'Englisch'},
  ZW:{name:'Simbabwe',          flag:'🇿🇼', lang:'Englisch, Shona'},
  SG:{name:'Singapur',          flag:'🇸🇬', lang:'Englisch, Chinesisch, Malaiisch'},
  SK:{name:'Slowakei',          flag:'🇸🇰', lang:'Slowakisch'},
  SI:{name:'Slowenien',         flag:'🇸🇮', lang:'Slowenisch'},
  SO:{name:'Somalia',           flag:'🇸🇴', lang:'Arabisch'},
  ES:{name:'Spanien',           flag:'🇪🇸', lang:'Spanisch, Katalanisch, Baskisch'},
  ZA:{name:'Südafrika',         flag:'🇿🇦', lang:'Englisch, Afrikaans'},
  KR:{name:'Südkorea',          flag:'🇰🇷', lang:'Koreanisch'},
  SE:{name:'Schweden',          flag:'🇸🇪', lang:'Schwedisch'},
  CH:{name:'Schweiz',           flag:'🇨🇭', lang:'Deutsch, Französisch, Italienisch'},
  SY:{name:'Syrien',            flag:'🇸🇾', lang:'Arabisch, Kurdisch'},
  TJ:{name:'Tadschikistan',     flag:'🇹🇯', lang:'Tadschikisch/Persisch, Russisch'},
  TZ:{name:'Tansania',          flag:'🇹🇿', lang:'Swahili, Englisch'},
  TH:{name:'Thailand',          flag:'🇹🇭', lang:'Thai'},
  TG:{name:'Togo',              flag:'🇹🇬', lang:'Französisch'},
  CZ:{name:'Tschechien',        flag:'🇨🇿', lang:'Tschechisch'},
  TR:{name:'Türkei',            flag:'🇹🇷', lang:'Türkisch, Kurdisch'},
  UA:{name:'Ukraine',           flag:'🇺🇦', lang:'Ukrainisch, Russisch'},
  HU:{name:'Ungarn',            flag:'🇭🇺', lang:'Ungarisch'},
  US:{name:'USA',               flag:'🇺🇸', lang:'Englisch, Spanisch'},
  UZ:{name:'Usbekistan',        flag:'🇺🇿', lang:'Usbekisch, Russisch'},
  VE:{name:'Venezuela',         flag:'🇻🇪', lang:'Spanisch'},
  AE:{name:'Ver. Arab. Emirate',flag:'🇦🇪', lang:'Arabisch, Englisch, Hindi'},
  GB:{name:'Ver. Königreich',   flag:'🇬🇧', lang:'Englisch, Walisisch'},
  VN:{name:'Vietnam',           flag:'🇻🇳', lang:'Vietnamesisch'},
  CY:{name:'Zypern',            flag:'🇨🇾', lang:'Griechisch, Türkisch'},
  AR:{name:'Argentinien',       flag:'🇦🇷', lang:'Spanisch'},
  BO:{name:'Bolivien',          flag:'🇧🇴', lang:'Spanisch'},
  CL:{name:'Chile',             flag:'🇨🇱', lang:'Spanisch'},
  EC:{name:'Ecuador',           flag:'🇪🇨', lang:'Spanisch'},
  SV:{name:'El Salvador',       flag:'🇸🇻', lang:'Spanisch'},
  HN:{name:'Honduras',          flag:'🇭🇳', lang:'Spanisch'},
  NI:{name:'Nicaragua',         flag:'🇳🇮', lang:'Spanisch'},
  CR:{name:'Costa Rica',        flag:'🇨🇷', lang:'Spanisch'},
  UY:{name:'Uruguay',           flag:'🇺🇾', lang:'Spanisch'},
  CD:{name:'DR Kongo',          flag:'🇨🇩', lang:'Französisch'},
  CI:{name:'Elfenbeinküste',    flag:'🇨🇮', lang:'Französisch'},
  CM:{name:'Kamerun',           flag:'🇨🇲', lang:'Französisch, Englisch'},
  NE:{name:'Niger',             flag:'🇳🇪', lang:'Französisch'},
  CF:{name:'Zentralafr. Rep.',  flag:'🇨🇫', lang:'Französisch'},
  TD:{name:'Tschad',            flag:'🇹🇩', lang:'Arabisch, Französisch'},
  CV:{name:'Kap Verde',         flag:'🇨🇻', lang:'Portugiesisch'},
  GW:{name:'Guinea-Bissau',     flag:'🇬🇼', lang:'Portugiesisch'},
  MZ:{name:'Mosambik',          flag:'🇲🇿', lang:'Portugiesisch'},
  ST:{name:'São Tomé',          flag:'🇸🇹', lang:'Portugiesisch'},
  TL:{name:'Osttimor',          flag:'🇹🇱', lang:'Portugiesisch'},
  TW:{name:'Taiwan',            flag:'🇹🇼', lang:'Mandarin'},
  HK:{name:'Hongkong',          flag:'🇭🇰', lang:'Kantonesisch, Mandarin'},
  SM:{name:'San Marino',        flag:'🇸🇲', lang:'Italienisch'},
  GQ:{name:'Äquatorialguinea',  flag:'🇬🇶', lang:'Spanisch, Französisch'},
  LI:{name:'Liechtenstein',     flag:'🇱🇮', lang:'Deutsch'},
  DJ:{name:'Dschibuti',         flag:'🇩🇯', lang:'Arabisch, Französisch'},
};

const ZONE_A = ['DE','AT','LU','LI'];
const ZONE_B = ['FR','IT','ES','PT','NL','BE','PL','IE','GB','UA','TR','CH','HR','CZ','SK','HU','RO','BG','GR','FI','SE','NO','DK','EE','LV','LT','SI','RS','BY','SM','CY','ME','BA','MK','AL','AD','GE','AM','AZ'];
const ZONE_C = ['US','CA','AU','NZ','JP','KR','SG','HK','TW','IN','ID','VN','PH','MY','CN','MN'];

function getZone(cc: string) {
  if (ZONE_A.includes(cc)) return { l: 'Zone A', r: '0,08 €/Min', c: '#00D4FF' };
  if (ZONE_B.includes(cc)) return { l: 'Zone B', r: '0,12 €/Min', c: '#4ADE80' };
  if (ZONE_C.includes(cc)) return { l: 'Zone C', r: '0,18 €/Min', c: '#EA580B' };
  return { l: 'Zone D', r: '0,28 €/Min', c: '#F97316' };
}

export default function LanguageConfigurator() {
  const t = useTranslations('configurator');
  const [activeLangs, setActiveLangs] = useState<Set<string>>(new Set<string>());
  const [showOverlay, setShowOverlay] = useState(false); // orange world overlay
  const [clickedInfo, setClickedInfo] = useState<string | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const allCodes = LANGUAGES.map(l => l.code);

  // Auto-animation: pick 1 lang → pick 2nd → show orange overlay → pause → clear → repeat
  const runAnimation = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const steps: Array<() => void> = [];
    const delay = (ms: number, fn: () => void) =>
      steps.push(() => { timerRef.current = setTimeout(() => { fn(); runNext(); }, ms); });
    let stepIdx = 0;
    const runNext = () => { if (stepIdx < steps.length) steps[stepIdx++](); };

    const shuffled = [...allCodes].sort(() => Math.random() - 0.5);
    const [p1, p2] = shuffled;

    delay(0,    () => { setShowOverlay(false); setActiveLangs(new Set([p1])); });
    delay(1400, () => setActiveLangs(new Set([p1, p2])));
    delay(1200, () => setShowOverlay(true));   // WOW: orange overlay erscheint
    delay(2200, () => setShowOverlay(false));  // overlay wieder weg
    delay(600,  () => setActiveLangs(new Set<string>())); // alles löschen
    delay(800,  () => runAnimation());         // loop

    runNext();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (!userInteracted) {
      timerRef.current = setTimeout(runAnimation, 800);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [userInteracted, runAnimation]);

  const toggleLang = (code: string) => {
    if (!userInteracted) {
      // Erster Klick: Animation stoppen, NUR diese Sprache auswählen, Overlay aus
      setUserInteracted(true);
      setShowOverlay(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      setActiveLangs(new Set([code]));
      return;
    }
    // Weiteres Klicken: toggle an/aus
    setActiveLangs(prev => {
      if (prev.size === 1 && prev.has(code)) return prev;
      const next = new Set(prev);
      next.has(code) ? next.delete(code) : next.add(code);
      return next;
    });
  };

  const activeHomeCountries = useMemo(() => {
    const all: string[] = [];
    LANGUAGES.forEach(l => {
      if (activeLangs.has(l.code)) all.push(...LANGUAGE_COUNTRIES[l.code as LangCode]);
    });
    return new Set(all);
  }, [activeLangs]);

  const handleCountryClick = (cc: string) => {
    const c = COUNTRY_DATA[cc];
    if (!c) return;
    const z = getZone(cc);
    setClickedInfo(`${c.flag} ${c.name} — ${c.lang} · ${z.l} (${z.r})`);
  };

  return (
    <section id="configurator" style={{ padding: '80px 0', background: 'linear-gradient(180deg, #050810 0%, #080d1a 100%)', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 42px)', letterSpacing: '-0.03em', color: '#fff', marginBottom: '10px' }}>
            {t('title')}
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', maxWidth: '560px', margin: '0 auto' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* Language Buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
          {LANGUAGES.map(lang => (
            <button
              key={lang.code}
              onClick={() => toggleLang(lang.code)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '7px 14px', borderRadius: '30px', cursor: 'pointer',
                fontSize: '0.78rem', fontWeight: 500,
                border: activeLangs.has(lang.code) ? '1px solid #00D4FF' : '1px solid rgba(255,255,255,0.1)',
                background: activeLangs.has(lang.code) ? 'rgba(0,212,255,0.12)' : 'rgba(255,255,255,0.04)',
                color: activeLangs.has(lang.code) ? '#00D4FF' : '#64748B',
                boxShadow: activeLangs.has(lang.code) ? '0 0 12px rgba(0,212,255,0.15)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {lang.flag} {lang.label}
            </button>
          ))}
        </div>

        {/* Toggle-Button für Zielkarte — nur nach Interaktion */}
        {userInteracted && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
            <button
              onClick={() => setShowOverlay(v => !v)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 22px', borderRadius: '30px', cursor: 'pointer',
                fontSize: '0.85rem', fontWeight: 600,
                border: showOverlay ? '1px solid #EA580B' : '1px solid rgba(245,158,11,0.35)',
                background: showOverlay ? 'rgba(245,158,11,0.15)' : 'rgba(245,158,11,0.06)',
                color: showOverlay ? '#EA580B' : '#92400E',
                boxShadow: showOverlay ? '0 0 20px rgba(245,158,11,0.25)' : 'none',
                transition: 'all 0.25s',
              }}
            >
              <span style={{ fontSize: '1rem' }}>🌍</span>
              {showOverlay ? 'Zielkarte ausblenden' : 'Zielkarte anzeigen — wohin kannst du anrufen?'}
            </button>
          </div>
        )}

        {/* Clicked info */}
        {clickedInfo && (
          <div style={{ background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.2)', borderRadius: '12px', padding: '12px 16px', marginBottom: '16px', textAlign: 'center', color: '#00D4FF', fontSize: '0.85rem' }}>
            {clickedInfo}
          </div>
        )}

        {/* ── SINGLE MAP CARD WITH OVERLAY ── */}
        <div style={{ background: 'rgba(255,255,255,0.025)', border: `1px solid ${showOverlay ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.08)'}`, borderRadius: '18px', padding: '18px', transition: 'border-color 0.6s ease', boxShadow: showOverlay ? '0 0 40px rgba(245,158,11,0.12)' : 'none' }}>

          {/* Label row — left cyan / right orange fades in */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', minHeight: '40px' }}>
            {/* Left */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#00D4FF', boxShadow: '0 0 8px #00D4FF', flexShrink: 0 }} />
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.93rem', fontWeight: 700, color: '#fff' }}>{t('homeMap')}</h3>
                <p style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '1px' }}>
                  {userInteracted ? t('homeMapSubInteract') : t('homeMapSub')}
                </p>
              </div>
            </div>
            {/* Right — orange label fades in with overlay */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              opacity: showOverlay ? 1 : 0,
              transform: showOverlay ? 'translateX(0)' : 'translateX(20px)',
              transition: 'opacity 0.5s ease, transform 0.5s ease',
              pointerEvents: 'none',
            }}>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '0.93rem', fontWeight: 700, color: '#EA580B', textAlign: 'right' }}>{t('targetMap')}</h3>
                <p style={{ fontSize: '0.7rem', color: '#92400E', marginTop: '1px', textAlign: 'right' }}>{t('targetMapSub')}</p>
              </div>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EA580B', boxShadow: '0 0 8px #EA580B', flexShrink: 0 }} />
            </div>
          </div>

          {/* Map container — source + target overlaid */}
          <div style={{ position: 'relative' }}>
            {/* Layer 1: source map (always visible) */}
            <WorldMapD3
              activeCountries={activeHomeCountries}
              mapType="source"
              allTargetCodes={ALL_TARGET_CODES}
              countryData={COUNTRY_DATA}
              getZone={getZone}
              onCountryClick={handleCountryClick}
            />
            {/* Layer 2: target overlay (fades in) */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '8px',
              opacity: showOverlay ? 1 : 0,
              transition: 'opacity 0.7s ease',
              pointerEvents: showOverlay ? 'auto' : 'none',
            }}>
              <WorldMapD3
                activeCountries={new Set<string>()}
                mapType="target"
                allTargetCodes={ALL_TARGET_CODES}
                countryData={COUNTRY_DATA}
                getZone={getZone}
                onCountryClick={handleCountryClick}
              />
            </div>
          </div>

          <p style={{ textAlign: 'center', color: '#334155', fontSize: '0.67rem', marginTop: '6px' }}>
            {showOverlay ? t('overlayHint') : t('hoverHint')}
          </p>
        </div>

        {/* Reach bar */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px 20px', marginTop: '14px', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ fontSize: '1.5rem' }}>📞</div>
          <div>
            <strong style={{ color: '#fff', fontSize: '0.9rem', display: 'block' }}>{t('reachTitle')}</strong>
            <span style={{ color: '#94A3B8', fontSize: '0.74rem' }}>
              {t('reachDesc', { active: activeLangs.size })}
            </span>
          </div>
          <div style={{ marginLeft: 'auto', background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(91,33,182,0.15))', border: '1px solid rgba(0,212,255,0.3)', borderRadius: '30px', padding: '7px 18px', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '0.98rem', color: '#00D4FF', whiteSpace: 'nowrap' }}>
            {t('reachPill')}
          </div>
        </div>
      </div>
    </section>
  );
}
