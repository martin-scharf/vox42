import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function DatenschutzPage({ params }: { params: Promise<{ locale: string }> }) {
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
        <h1 className="text-3xl font-bold text-textLight dark:text-textDark mb-8">Datenschutzerklärung</h1>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-semibold mt-4">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
              Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
              denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">2. Datenerfassung auf dieser Website</h2>
            <h3 className="font-semibold mt-4">Wer ist verantwortlich für die Datenerfassung?</h3>
            <p>
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
              können Sie dem Impressum dieser Website entnehmen.
            </p>
            <h3 className="font-semibold mt-4">Wie erfassen wir Ihre Daten?</h3>
            <p>
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen (z.B. durch ein Kontaktformular).
              Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst — das sind
              vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
            </p>
            <h3 className="font-semibold mt-4">Wofür nutzen wir Ihre Daten?</h3>
            <p>
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
              Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">3. Audioaufnahmen</h2>
            <p>
              <strong>Vox42 speichert keine Audioaufnahmen.</strong> Dies entspricht den Anforderungen des § 201 StGB
              (Verletzung der Vertraulichkeit des Wortes). Es werden ausschließlich Text-Transkripte der Gespräche
              gespeichert, sofern der Nutzer dies aktiviert. Diese können jederzeit gelöscht werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">4. Hosting und Server</h2>
            <p>
              Unsere Server befinden sich innerhalb der Europäischen Union. Die Verarbeitung der Daten
              erfolgt ausschließlich auf Servern in der EU gemäß den Anforderungen der DSGVO.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">5. Cookies</h2>
            <p>
              Unsere Website verwendet Cookies. Cookies sind kleine Textdateien, die Ihr Browser auf Ihrem
              Gerät speichert. Einige Cookies sind für den Betrieb der Website technisch notwendig
              (z.B. Spracheinstellungen). Andere Cookies werden nur mit Ihrer Einwilligung gesetzt.
              Sie können Cookies jederzeit über Ihre Browser-Einstellungen löschen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">6. Ihre Rechte</h2>
            <p>Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
              <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
              <li>Recht auf Löschung (Art. 17 DSGVO)</li>
              <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
              <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>Recht auf Widerspruch (Art. 21 DSGVO)</li>
            </ul>
            <p className="mt-4">
              Zur Ausübung Ihrer Rechte wenden Sie sich an: support@vox42.com
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">7. Beschwerderecht</h2>
            <p>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung
              Ihrer personenbezogenen Daten zu beschweren. Zuständige Aufsichtsbehörde ist die Datenschutzbehörde
              des Bundeslandes, in dem unser Unternehmen seinen Sitz hat.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">8. Kontaktformular</h2>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
              wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
