'use client';

import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(5, 8, 16, 0.92)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
      }}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="36" height="36" rx="8" fill="#EA580B"/>
              {/* Left speech bubble */}
              <rect x="5" y="8" width="14" height="10" rx="2.5" fill="white" opacity="0.95"/>
              <polygon points="8,18 12,18 10,22" fill="white" opacity="0.95"/>
              {/* Lines in left bubble */}
              <line x1="8" y1="11.5" x2="16" y2="11.5" stroke="#EA580B" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              <line x1="8" y1="14" x2="15" y2="14" stroke="#EA580B" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
              {/* Right speech bubble */}
              <rect x="17" y="14" width="14" height="10" rx="2.5" fill="white" opacity="0.75"/>
              <polygon points="24,24 28,24 26,28" fill="white" opacity="0.75"/>
              {/* Lines in right bubble */}
              <line x1="20" y1="17.5" x2="28" y2="17.5" stroke="#EA580B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
              <line x1="20" y1="20" x2="27" y2="20" stroke="#EA580B" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            </svg>
          </div>
          <span
            className="font-display font-bold text-xl tracking-tight text-white group-hover:text-amber transition-colors duration-200"
            style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'white' }}
          >
            Vox<span style={{ color: '#EA580B' }}>42</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7 text-sm font-medium" style={{ color: '#94A3B8' }}>
          {[
            ['#how-it-works', t('howItWorks')],
            ['#languages',    t('languages')],
            ['#pricing',      t('pricing')],
            ['#security',     t('security')],
            ['#faq',          t('faq')],
          ].map(([href, label]) => (
            <li key={href}>
              <a
                href={href}
                className="hover:text-white transition-colors duration-150 relative group"
              >
                {label}
                <span
                  className="absolute -bottom-0.5 left-0 right-0 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                  style={{ background: '#EA580B' }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* iOS App Store */}
          <a
            href="https://apps.apple.com/app/vox42/id6741490994"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#fff', border: '1px solid rgba(255,255,255,0.12)', minHeight: '38px', fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.14)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            iOS App
          </a>

          {/* CTA */}
          <a
            href="/de/app"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
            style={{ background: '#EA580B', color: '#050810', fontFamily: 'var(--font-syne, Syne, sans-serif)', minHeight: '38px' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(245,158,11,0.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
            </svg>
            Jetzt starten
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-150"
            style={{ color: '#94A3B8' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)')}
            onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = '')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {menuOpen ? (
                <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              ) : (
                <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 py-5 animate-slide-down"
          style={{
            background: 'rgba(5, 8, 16, 0.97)',
            backdropFilter: 'blur(24px)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <ul className="flex flex-col gap-1">
            {[
              ['#how-it-works', t('howItWorks')],
              ['#languages',    t('languages')],
              ['#pricing',      t('pricing')],
              ['#security',     t('security')],
              ['#faq',          t('faq')],
            ].map(([href, label]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-2 rounded-lg text-sm font-medium transition-colors duration-150"
                  style={{ color: '#94A3B8' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = '#EA580B';
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.05)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = '#94A3B8';
                    (e.currentTarget as HTMLElement).style.background = '';
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/de/app"
            className="mt-4 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold"
            style={{ background: '#EA580B', color: '#050810', fontFamily: 'var(--font-syne, Syne)' }}
          >
            Jetzt starten
          </a>
        </div>
      )}
    </header>
  );
}
