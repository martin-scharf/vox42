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
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="14" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.3)" strokeWidth="1"/>
              <path d="M10 12 L16 20 L22 12" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="10" cy="12" r="2.5" fill="#00D4FF"/>
              <circle cx="22" cy="12" r="2.5" fill="#F59E0B"/>
              <circle cx="16" cy="20" r="2.5" fill="#00D4FF" opacity="0.6"/>
            </svg>
          </div>
          <span
            className="font-display font-bold text-xl tracking-tight text-white group-hover:text-cyan transition-colors duration-200"
            style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)', color: 'white' }}
          >
            Vox<span style={{ color: '#00D4FF' }}>42</span>
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
                  style={{ background: '#00D4FF' }}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <LanguageSwitcher />

          {/* CTA */}
          <a
            href="/de/app"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-200"
            style={{
              background: '#00D4FF',
              color: '#050810',
              fontFamily: 'var(--font-syne, Syne, sans-serif)',
              minHeight: '38px',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,212,255,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = '';
            }}
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
                    (e.currentTarget as HTMLElement).style.color = '#00D4FF';
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
            style={{ background: '#00D4FF', color: '#050810', fontFamily: 'var(--font-syne, Syne)' }}
          >
            Jetzt starten
          </a>
        </div>
      )}
    </header>
  );
}
