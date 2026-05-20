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
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8">
          ← Zurück
        </Link>
        <h1 className="text-3xl font-bold text-textLight dark:text-textDark mb-3">{t('title')}</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">Alles, was du über Vox42 wissen möchtest.</p>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900/50 overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer font-semibold text-textLight dark:text-textDark select-none list-none">
                <span>{item.q}</span>
                <span className="text-primary transition-transform group-open:rotate-45 ml-4 flex-shrink-0 text-xl">+</span>
              </summary>
              <div className="px-6 pb-5 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
