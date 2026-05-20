import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n';
import type { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const t = await getTranslations({ locale, namespace: 'hero' });

  const baseUrl = 'https://vox42.app';
  const alternates: Record<string, string> = {};
  locales.forEach((l) => {
    alternates[l] = `${baseUrl}/${l}`;
  });

  return {
    title: `Vox42 — ${t('headline')}`,
    description: t('subheadline'),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: alternates,
    },
    openGraph: {
      title: `Vox42 — ${t('headline')}`,
      description: t('subheadline'),
      type: 'website',
      url: `${baseUrl}/${locale}`,
      siteName: 'Vox42',
    },
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Vox42',
        applicationCategory: 'CommunicationApplication',
        operatingSystem: 'iOS, Android',
        description: t('subheadline'),
        offers: {
          '@type': 'Offer',
          price: '5.00',
          priceCurrency: 'EUR',
        },
        url: baseUrl,
      }),
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
