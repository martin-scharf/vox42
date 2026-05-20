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

  const s = { color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' } as const;
  const p = { color: '#94A3B8', lineHeight: 1.8, fontSize: '1rem', marginBottom: '28px' } as const;

  return (
    <>
      <Navbar />
      <main style={{ background: '#050810', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
          <Link href={`/${locale}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#00D4FF', textDecoration: 'none', marginBottom: '32px' }}>
            ← Zurück
          </Link>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: '#fff', marginBottom: '40px', letterSpacing: '-0.02em' }}>
            Datenschutzerklärung
          </h1>

          <div>
            <h2 style={s}>Datenschutz</h2>
            <p style={p}>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <p style={p}>
              Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            </p>
            <p style={p}>
              Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            </p>

            <h2 style={s}>Kein Audio-Speichern — § 201 StGB</h2>
            <p style={p}>
              Vox42 speichert <strong style={{ color: '#fff' }}>keine Audioaufnahmen</strong> von Gesprächen. Dies entspricht den Anforderungen des § 201 StGB (Verletzung der Vertraulichkeit des Wortes). Es werden ausschließlich Text-Transkripte der Gespräche erstellt, sofern der Nutzer dies aktiviert. Diese können jederzeit vom Nutzer gelöscht werden. Server befinden sich ausschließlich innerhalb der Europäischen Union.
            </p>

            <h2 style={s}>Cookies</h2>
            <p style={p}>
              Die Internetseiten verwenden teilweise so genannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.
            </p>
            <p style={p}>
              Die meisten der von uns verwendeten Cookies sind so genannte „Session-Cookies". Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Diese Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
            </p>
            <p style={p}>
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
            </p>

            <h2 style={s}>Ihre Rechte (DSGVO)</h2>
            <p style={p}>
              Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Zur Ausübung Ihrer Rechte wenden Sie sich an:{' '}
              <a href="mailto:info@partpeople.de" style={{ color: '#00D4FF' }}>info@partpeople.de</a>
            </p>

            <h2 style={s}>Newsletterdaten</h2>
            <p style={p}>
              Wenn Sie den auf der Webseite angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere Daten werden nicht erhoben. Diese Daten verwenden wir ausschließlich für den Versand der angeforderten Informationen und geben sie nicht an Dritte weiter. Die erteilte Einwilligung zur Speicherung der Daten kann jederzeit widerrufen werden.
            </p>

            <h2 style={s}>Datenschutzerklärung für die Nutzung von YouTube</h2>
            <p style={p}>
              Unsere Webseite nutzt Plugins der von Google betriebenen Seite YouTube. Betreiber der Seiten ist die YouTube, LLC, 901 Cherry Ave., San Bruno, CA 94066, USA. Wenn Sie eine unserer mit einem YouTube-Plugin ausgestatteten Seiten besuchen, wird eine Verbindung zu den Servern von YouTube hergestellt. Wenn Sie in Ihrem YouTube-Account eingeloggt sind, ermöglichen Sie YouTube, Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus Ihrem YouTube-Account ausloggen. Weitere Informationen:{' '}
              <a href="https://www.google.de/intl/de/policies/privacy" target="_blank" rel="noreferrer" style={{ color: '#00D4FF' }}>
                Google Datenschutzerklärung
              </a>
            </p>

            <h2 style={s}>Beschwerderecht</h2>
            <p style={p}>
              Sie haben das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Zuständig ist die Datenschutzbehörde des Bundeslandes Hessen.
            </p>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '32px 0' }} />
            <p style={{ fontSize: '0.8rem', color: '#475569' }}>
              © 2026 partpeople GmbH. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
