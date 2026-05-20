import { setRequestLocale } from 'next-intl/server';
import { locales, type Locale } from '@/i18n';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import Languages from '@/components/Languages';
import UseCases from '@/components/UseCases';
import Pricing from '@/components/Pricing';
import Privacy from '@/components/Privacy';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Languages />
        <UseCases />
        <Pricing />
        <Privacy />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <CookieBanner />
    </>
  );
}
