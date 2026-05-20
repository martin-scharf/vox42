import { useTranslations } from 'next-intl';

export default function FAQ() {
  const t = useTranslations('faq');
  const items = t.raw('items') as Array<{ q: string; a: string }>;

  return (
    <section id="faq" className="py-24 bg-bgLight dark:bg-bgDark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-textLight dark:text-textDark mb-4">
            {t('title')}
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((item, i) => (
            <details
              key={i}
              className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-4 cursor-pointer list-none font-medium text-textLight dark:text-textDark hover:text-primary dark:hover:text-primary transition-colors min-h-[44px]">
                <span>{item.q}</span>
                <svg
                  className="w-5 h-5 shrink-0 ml-4 text-gray-400 group-open:rotate-180 transition-transform"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </summary>
              <div className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-800 pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
