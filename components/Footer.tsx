'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();

  const links = [
    { key: 'impressum', href: `/${locale}/impressum` },
    { key: 'datenschutz', href: `/${locale}/datenschutz` },
    { key: 'agb', href: `/${locale}/agb` },
    { key: 'kontakt', href: `/${locale}/kontakt` },
    { key: 'faq', href: `/${locale}/faq` },
  ] as const;

  return (
    <footer className="py-12" style={{ background: '#1E293B', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M4 8 L16 24 L28 8" stroke="#5B21B6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="16" cy="8" r="3" fill="#5B21B6"/>
              <path d="M10 6 Q8 8 10 10" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none"/>
              <path d="M22 6 Q24 8 22 10" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
            <span className="font-bold text-lg" style={{ color: '#00D4FF' }}>Vox42</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm" style={{ color: '#64748B' }}>
            {links.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="transition-colors"
                style={{ color: '#64748B' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00D4FF')}
                onMouseLeave={e => (e.currentTarget.style.color = '#64748B')}
              >
                {t(key as keyof ReturnType<typeof t>)}
              </Link>
            ))}
          </nav>

          {/* Language switcher */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 text-center text-xs" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', color: '#334155' }}>
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
