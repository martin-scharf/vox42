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
      <main style={{ background: '#1E293B', minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
          <Link href={`/${locale}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#00D4FF', textDecoration: 'none', marginBottom: '32px' }}>
            ← Zurück
          </Link>

          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 42px)', color: '#fff', marginBottom: '40px', letterSpacing: '-0.02em' }}>
            Impressum
          </h1>

          <div style={{ color: '#94A3B8', lineHeight: 1.8, fontSize: '1rem' }}>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' }}>Angaben gemäß § 5 TMG</h2>
              <p>
                partpeople GmbH<br />
                Zur Wolfskaute 2<br />
                35216 Biedenkopf<br />
                Deutschland
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' }}>Vertreten durch</h2>
              <p>Martin Scharf</p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' }}>Kontakt</h2>
              <p>
                Telefon: +49 6461 9819-00<br />
                E-Mail: <a href="mailto:info@partpeople.de" style={{ color: '#00D4FF' }}>info@partpeople.de</a>
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' }}>Registereintrag</h2>
              <p>
                Eintragung im Handelsregister.<br />
                Registergericht: Marburg<br />
                Registernummer: HRB 6731
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' }}>Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:<br />
                DE305276782
              </p>
            </section>

            <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.08)', margin: '40px 0' }} />

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' }}>Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' }}>Haftung für Links</h2>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem', marginBottom: '10px' }}>Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </section>

            <p style={{ fontSize: '0.8rem', color: '#475569', marginTop: '40px' }}>
              Quelle: eRecht24 &nbsp;·&nbsp; © 2026 partpeople GmbH. Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
