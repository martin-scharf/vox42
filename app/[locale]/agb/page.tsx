import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function AGBPage({ params }: { params: Promise<{ locale: string }> }) {
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
        <h1 className="text-3xl font-bold text-textLight dark:text-textDark mb-8">Allgemeine Geschäftsbedingungen</h1>
        <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400 space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">§ 1 Geltungsbereich</h2>
            <p>
              Diese Allgemeinen Geschäftsbedingungen gelten für alle Nutzer der Vox42 App und der zugehörigen
              Website. Mit der Registrierung oder Nutzung des Dienstes erkennen Sie diese AGB an.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">§ 2 Leistungsbeschreibung</h2>
            <p>
              Vox42 bietet eine mobile Anwendung zur Live-Übersetzung von Telefongesprächen. Der Dienst
              funktioniert nach dem Prepaid-Prinzip: Nutzer erwerben Gesprächsguthaben, das für Anrufe
              verbraucht wird. Die Abrechnung erfolgt minutengenau.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">§ 3 Prepaid-Guthaben</h2>
            <p>
              Das erworbene Guthaben wird ausschließlich für die Nutzung des Vox42-Dienstes verwendet.
              Eine Barauszahlung des Guthabens ist ausgeschlossen. Nicht verbrauchtes Guthaben verfällt
              nach 24 Monaten Inaktivität. Es besteht kein Abonnement oder wiederkehrender Vertrag —
              Sie zahlen nur, was Sie kaufen und nutzen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">§ 4 Preise und Zahlung</h2>
            <p>
              Die aktuellen Minutenpreise sind in der App einsehbar und können je nach Zielland variieren.
              Die Zahlung erfolgt über Apple Pay, Google Pay, Kreditkarte oder Stripe. Alle Preise sind
              Endpreise inklusive der gesetzlichen Mehrwertsteuer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">§ 5 Datenschutz und Audio</h2>
            <p>
              Vox42 speichert keine Audioaufnahmen von Gesprächen. Dies entspricht den gesetzlichen
              Anforderungen (§ 201 StGB). Gesprächstranskripte werden nur auf ausdrücklichen Wunsch
              des Nutzers gespeichert und können jederzeit gelöscht werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">§ 6 Verfügbarkeit</h2>
            <p>
              Vox42 strebt eine Verfügbarkeit von 99,5 % an. Wartungsarbeiten werden nach Möglichkeit
              außerhalb der Hauptnutzungszeiten durchgeführt. Ein Anspruch auf ununterbrochene Verfügbarkeit
              besteht nicht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">§ 7 Übersetzungsqualität</h2>
            <p>
              Die Übersetzungen erfolgen automatisiert durch KI-Systeme. Vox42 übernimmt keine Garantie
              für die Richtigkeit oder Vollständigkeit der Übersetzungen. Der Dienst ist nicht für
              rechtlich oder medizinisch kritische Kommunikation geeignet.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">§ 8 Haftungsbeschränkung</h2>
            <p>
              Die Haftung von Vox42 ist auf Vorsatz und grobe Fahrlässigkeit beschränkt. Eine Haftung
              für mittelbare Schäden, entgangenen Gewinn oder Folgeschäden ist ausgeschlossen,
              soweit gesetzlich zulässig.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">§ 9 Kündigung</h2>
            <p>
              Da kein Abonnement besteht, ist keine Kündigung erforderlich. Der Nutzeraccount kann
              jederzeit über die App-Einstellungen gelöscht werden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-textLight dark:text-textDark">§ 10 Anwendbares Recht</h2>
            <p>
              Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand ist, soweit gesetzlich
              zulässig, der Sitz des Unternehmens.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
