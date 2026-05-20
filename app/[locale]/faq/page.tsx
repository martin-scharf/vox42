import { setRequestLocale, getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'faq' });
  const items = t.raw('items') as Array<{ q: string; a: string }>;

  return (
    <>
      <Navbar />
      <main style={{ background: '#050810', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
          <Link href={`/${locale}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#00D4FF', textDecoration: 'none', marginBottom: '32px' }}>
            ← Zurück
          </Link>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: '#fff', marginBottom: '10px', letterSpacing: '-0.02em' }}>
            {t('title')}
          </h1>
          <p style={{ color: '#64748B', marginBottom: '40px', fontSize: '1rem' }}>
            Alles, was du über Vox42 wissen möchtest.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {items.map((item, idx) => (
              <details
                key={idx}
                style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}
              >
                <summary style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '18px 22px', cursor: 'pointer', listStyle: 'none',
                  fontWeight: 600, fontSize: '1rem', color: '#E2E8F0',
                  userSelect: 'none',
                }}>
                  <span>{item.q}</span>
                  <span style={{ color: '#00D4FF', fontSize: '1.4rem', flexShrink: 0, marginLeft: '16px', transition: 'transform 0.2s' }}>+</span>
                </summary>
                <div style={{
                  padding: '0 22px 18px',
                  color: '#94A3B8',
                  fontSize: '0.95rem',
                  lineHeight: 1.7,
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  paddingTop: '14px',
                }}>
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
