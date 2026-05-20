import { useTranslations } from 'next-intl';
import { ShieldCheck, FileX, Server } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';

const icons = [ShieldCheck, FileX, Server];

export default function Privacy() {
  const t = useTranslations('privacy');
  const locale = useLocale();
  const points = t.raw('points') as Array<{ title: string; desc: string }>;

  return (
    <section id="security" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-textLight dark:text-textDark mb-4">
            {t('title')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 mb-12">
          {points.map((point, i) => {
            const Icon = icons[i];
            return (
              <div
                key={i}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30"
              >
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-textLight dark:text-textDark mb-3">{point.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{point.desc}</p>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <Link
            href={`/${locale}/datenschutz`}
            className="text-primary hover:underline text-sm font-semibold"
          >
            {t('link')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
