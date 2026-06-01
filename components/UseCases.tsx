'use client';

import { useTranslations } from 'next-intl';

function HotelIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 22V7l9-5 9 5v15"/>
      <path d="M9 22V12h6v10"/>
    </svg>
  );
}
function FamilyIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
function BusinessIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  );
}
function MigrantsIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
function CareIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
    </svg>
  );
}
function AuthorityIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="3" y1="22" x2="21" y2="22"/>
      <polyline points="2 22 12 2 22 22"/>
      <line x1="20" y1="22" x2="20" y2="11"/>
      <line x1="4" y1="22" x2="4" y2="11"/>
      <line x1="8" y1="22" x2="8" y2="15"/>
      <line x1="16" y1="22" x2="16" y2="15"/>
      <line x1="8" y1="15" x2="16" y2="15"/>
    </svg>
  );
}

const ICON_MAP: Record<string, React.ReactNode> = {
  hotel:     <HotelIcon />,
  family:    <FamilyIcon />,
  business:  <BusinessIcon />,
  migrants:  <MigrantsIcon />,
  care:      <CareIcon />,
  authority: <AuthorityIcon />,
};

const COLORS = [
  { bg: 'rgba(0,212,255,0.08)',   border: 'rgba(0,212,255,0.2)',   text: '#00D4FF',  hover: 'rgba(0,212,255,0.04)' },
  { bg: 'rgba(139,92,246,0.08)',  border: 'rgba(139,92,246,0.2)',  text: '#8B5CF6',  hover: 'rgba(139,92,246,0.04)' },
  { bg: 'rgba(245,158,11,0.08)',  border: 'rgba(245,158,11,0.2)',  text: '#EA580B',  hover: 'rgba(245,158,11,0.04)' },
  { bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.2)',   text: '#22C55E',  hover: 'rgba(34,197,94,0.04)' },
  { bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.2)',   text: '#EF4444',  hover: 'rgba(239,68,68,0.04)' },
  { bg: 'rgba(59,130,246,0.08)',  border: 'rgba(59,130,246,0.2)',  text: '#3B82F6',  hover: 'rgba(59,130,246,0.04)' },
];

export default function UseCases() {
  const t = useTranslations('useCases');
  const cases = t.raw('cases') as Array<{ icon: string; title: string; desc: string }>;

  return (
    <section
      className="py-24 relative"
      style={{ background: '#050810' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="section-label">Anwendungsfälle</span>
          </div>
          <h2
            className="font-display font-bold text-white"
            style={{
              fontFamily: 'var(--font-syne, Syne, sans-serif)',
              fontSize: 'clamp(28px, 4vw, 48px)',
            }}
          >
            {t('title')}
          </h2>
        </div>

        {/* Cases grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c, i) => {
            const color = COLORS[i % COLORS.length];
            const Icon = ICON_MAP[c.icon] ?? <BusinessIcon />;

            return (
              <div
                key={i}
                className="group p-7 rounded-2xl transition-all duration-300 cursor-default"
                style={{
                  background: 'rgba(13, 17, 23, 0.6)',
                  border: `1px solid rgba(255,255,255,0.07)`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = color.border;
                  el.style.background = color.hover;
                  el.style.transform = 'translateY(-2px)';
                  el.style.boxShadow = `0 8px 32px ${color.bg}`;
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'rgba(255,255,255,0.07)';
                  el.style.background = 'rgba(13, 17, 23, 0.6)';
                  el.style.transform = '';
                  el.style.boxShadow = '';
                }}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-all duration-300"
                  style={{ background: color.bg, border: `1px solid ${color.border}`, color: color.text }}
                >
                  {Icon}
                </div>

                <h3
                  className="font-display font-bold text-white mb-3"
                  style={{ fontFamily: 'var(--font-syne, Syne)', fontSize: '1rem' }}
                >
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748B' }}>
                  {c.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
