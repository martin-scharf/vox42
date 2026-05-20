import { useTranslations } from 'next-intl';

const languages = [
  { flag: '🇩🇪', name: 'Deutsch' },
  { flag: '🇺🇸', name: 'English' },
  { flag: '🇫🇷', name: 'Français' },
  { flag: '🇮🇹', name: 'Italiano' },
  { flag: '🇪🇸', name: 'Español' },
  { flag: '🇵🇹', name: 'Português' },
  { flag: '🇵🇱', name: 'Polski' },
  { flag: '🇹🇷', name: 'Türkçe' },
  { flag: '🇳🇱', name: 'Nederlands' },
  { flag: '🇷🇺', name: 'Русский' },
  { flag: '🇺🇦', name: 'Українська' },
  { flag: '🇨🇳', name: '中文' },
];

export default function Languages() {
  const t = useTranslations('languages');

  return (
    <section id="languages" className="py-24 bg-bgLight dark:bg-bgDark">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-textLight dark:text-textDark mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:shadow-sm transition-all group"
            >
              <span className="text-3xl" role="img" aria-label={lang.name}>
                {lang.flag}
              </span>
              <span className="font-medium text-textLight dark:text-textDark group-hover:text-primary transition-colors text-sm">
                {lang.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
