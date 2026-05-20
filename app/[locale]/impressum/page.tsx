import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function ImpressumPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-20">
        <Link href={`/${locale}`} className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8">
          ← Zurück
        </Link>
        <h1 className="text-3xl font-bold text-textLight dark:text-textDark mb-8">Impressum</h1>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">Angaben gemäß § 5 TMG</h2>
            <p>
              [Bitte ausfüllen: Vollständiger Name oder Firma]<br />
              [Bitte ausfüllen: Straße und Hausnummer]<br />
              [Bitte ausfüllen: PLZ und Ort]<br />
              Deutschland
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">Kontakt</h2>
            <p>
              Telefon: [Bitte ausfüllen]<br />
              E-Mail: support@vox42.com
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">Vertreten durch</h2>
            <p>[Bitte ausfüllen: Vertretungsberechtigte Person]</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">Registereintrag</h2>
            <p>
              Registergericht: [Bitte ausfüllen]<br />
              Registernummer: [Bitte ausfüllen]
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">Umsatzsteuer-ID</h2>
            <p>USt-IdNr. gemäß § 27a UStG: [Bitte ausfüllen]</p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">EU-Streitschlichtung</h2>
            <p>
              Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" className="text-primary hover:underline" target="_blank" rel="noreferrer">
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach
              den allgemeinen Gesetzen verantwortlich.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht.
              Die Vervielfältigung, Bearbeitung und Verbreitung außerhalb der Grenzen des Urheberrechtes
              bedürfen der schriftlichen Zustimmung des Erstellers.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
