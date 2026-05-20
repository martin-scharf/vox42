'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { locales, type Locale } from '@/i18n';

const languageLabels: Record<Locale, string> = {
  de: '🇩🇪 Deutsch',
  en: '🇺🇸 English',
  fr: '🇫🇷 Français',
  it: '🇮🇹 Italiano',
  es: '🇪🇸 Español',
  pt: '🇵🇹 Português',
  pl: '🇵🇱 Polski',
  tr: '🇹🇷 Türkçe',
  nl: '🇳🇱 Nederlands',
  ru: '🇷🇺 Русский',
  uk: '🇺🇦 Українська',
  zh: '🇨🇳 中文',
};

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const currentLocale = (pathname.split('/')[1] || 'en') as Locale;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const switchLocale = (locale: Locale) => {
    const segments = pathname.split('/');
    segments[1] = locale;
    const newPath = segments.join('/');
    localStorage.setItem('vox42-lang', locale);
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000`;
    router.push(newPath);
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2 min-w-[160px] animate-slideIn">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                locale === currentLocale ? 'font-semibold text-primary' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {languageLabels[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
