import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function KontaktPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8">
          ← Zurück
        </Link>
        <h1 className="text-3xl font-bold text-textLight dark:text-textDark mb-3">Kontakt & Support</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          Fragen, Feedback oder technische Probleme? Schreib uns — wir antworten schnell.
        </p>

        <ContactForm />

        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-gray-800">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Oder direkt per E-Mail:{' '}
            <a href="mailto:support@vox42.com" className="text-primary hover:underline">
              support@vox42.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
