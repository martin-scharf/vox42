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
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800 py-12">
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
            <span className="font-bold text-lg text-primary">Vox42</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            {links.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                className="hover:text-primary dark:hover:text-primary transition-colors"
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
        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-900 text-center text-xs text-gray-400 dark:text-gray-600">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}
