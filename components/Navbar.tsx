'use client';

import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import DarkModeToggle from './DarkModeToggle';
import { useState } from 'react';

export default function Navbar() {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md bg-bgLight/80 dark:bg-bgDark/80 border-b border-gray-200/50 dark:border-gray-800/50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 shrink-0">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 8 L16 24 L28 8" stroke="#5B21B6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="16" cy="8" r="3" fill="#5B21B6"/>
            <path d="M10 6 Q8 8 10 10" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none"/>
            <path d="M22 6 Q24 8 22 10" stroke="#F97316" strokeWidth="2" strokeLinecap="round" fill="none"/>
          </svg>
          <span className="font-bold text-xl text-primary tracking-tight">Vox42</span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-400">
          <li><a href="#how-it-works" className="hover:text-primary dark:hover:text-primary transition-colors">{t('howItWorks')}</a></li>
          <li><a href="#languages" className="hover:text-primary dark:hover:text-primary transition-colors">{t('languages')}</a></li>
          <li><a href="#pricing" className="hover:text-primary dark:hover:text-primary transition-colors">{t('pricing')}</a></li>
          <li><a href="#security" className="hover:text-primary dark:hover:text-primary transition-colors">{t('security')}</a></li>
          <li><a href="#faq" className="hover:text-primary dark:hover:text-primary transition-colors">{t('faq')}</a></li>
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <DarkModeToggle />
          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600 dark:text-gray-300">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-bgDark border-t border-gray-200 dark:border-gray-800 px-4 py-4">
          <ul className="flex flex-col gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            <li><a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-primary transition-colors">{t('howItWorks')}</a></li>
            <li><a href="#languages" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-primary transition-colors">{t('languages')}</a></li>
            <li><a href="#pricing" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-primary transition-colors">{t('pricing')}</a></li>
            <li><a href="#security" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-primary transition-colors">{t('security')}</a></li>
            <li><a href="#faq" onClick={() => setMenuOpen(false)} className="block py-2 hover:text-primary transition-colors">{t('faq')}</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}
