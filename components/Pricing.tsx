import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

interface Package {
  amount: string;
  label: string;
  desc: string;
  popular?: boolean;
}

export default function Pricing() {
  const t = useTranslations('pricing');
  const packages = t.raw('packages') as Package[];

  return (
    <section id="pricing" className="py-24 bg-bgLight dark:bg-bgDark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-textLight dark:text-textDark mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative p-8 rounded-2xl border transition-all ${
                pkg.popular
                  ? 'border-primary shadow-xl shadow-primary/10 bg-white dark:bg-gray-900 scale-105'
                  : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-full">
                    ★ Popular
                  </span>
                </div>
              )}
              <div className="text-4xl font-bold text-textLight dark:text-textDark mb-1">
                {pkg.amount}
              </div>
              <div className="text-sm font-semibold text-primary mb-4">{pkg.label}</div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">{pkg.desc}</p>
              <a
                href="#"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-colors min-h-[44px] ${
                  pkg.popular
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-gray-100 dark:bg-gray-800 text-textLight dark:text-textDark hover:bg-primary/10 hover:text-primary'
                }`}
              >
                <Check className="w-4 h-4" />
                {pkg.amount} aufladen
              </a>
            </div>
          ))}
        </div>

        {/* Payment methods */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('note')}</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {/* Apple Pay */}
            <div className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-2">
              <svg width="30" height="16" viewBox="0 0 60 24" fill="none">
                <text x="0" y="18" fontFamily="system-ui" fontSize="16" fontWeight="700" fill="currentColor">Pay</text>
              </svg>
              <span className="text-xs font-semibold text-textLight dark:text-textDark">Apple Pay</span>
            </div>
            {/* Stripe */}
            <div className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-2">
              <svg width="40" height="16" viewBox="0 0 60 24" fill="none">
                <text x="0" y="18" fontFamily="system-ui" fontSize="14" fontWeight="700" fill="#635BFF">stripe</text>
              </svg>
            </div>
            {/* Credit Card */}
            <div className="px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-2">
              <svg width="20" height="16" viewBox="0 0 24 16" fill="none">
                <rect width="24" height="16" rx="2" fill="#1a1a2e"/>
                <rect y="4" width="24" height="4" fill="#333"/>
                <rect x="16" y="10" width="6" height="3" rx="1" fill="#F97316"/>
              </svg>
              <span className="text-xs font-semibold text-textLight dark:text-textDark">Kreditkarte</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
