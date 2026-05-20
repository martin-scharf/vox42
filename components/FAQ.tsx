'use client';

import { useTranslations } from 'next-intl';

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{ q: string; a: string }>;

  return (
    <section id="faq" className="py-24" style={{ background: '#050810' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#FFFFFF' }}>
            {t('title')}
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px',
              }}
            >
              <summary
                className="flex items-center justify-between px-6 py-4 cursor-pointer list-none min-h-[44px] transition-colors"
                style={{ color: '#E2E8F0', fontWeight: 600, fontSize: '1rem' }}
                onMouseEnter={e => (e.currentTarget.parentElement!.style.background = 'rgba(0,212,255,0.05)')}
                onMouseLeave={e => (e.currentTarget.parentElement!.style.background = 'rgba(255,255,255,0.04)')}
              >
                <span>{item.q}</span>
                <svg
                  className="w-5 h-5 shrink-0 ml-4 group-open:rotate-180 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#00D4FF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </summary>
              <div
                className="px-6 pb-5 leading-relaxed pt-4"
                style={{
                  color: '#94A3B8',
                  fontSize: '0.95rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
