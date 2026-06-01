'use client';

import { useTranslations } from 'next-intl';
import { ShieldCheck, FileX, Server } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const icons = [ShieldCheck, FileX, Server];

export default function Privacy() {
  const t = useTranslations('privacy');
  const locale = useLocale();
  const points = t.raw('points') as Array<{ title: string; desc: string }>;

  return (
    <section id="security" className="py-24" style={{ background: '#1E293B' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            {t('title')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          {points.map((point, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(0,212,255,0.12)',
                  borderRadius: '20px',
                }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0,212,255,0.1)' }}
                >
                  <Icon className="w-7 h-7" style={{ color: '#00D4FF' }} />
                </div>
                <h3 className="font-bold mb-3" style={{ color: '#FFFFFF' }}>{point.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>{point.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <Link
            href={`/${locale}/datenschutz`}
            className="text-primary hover:underline text-sm font-semibold"
          >
            {t('link')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
