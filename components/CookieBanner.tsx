'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

export default function CookieBanner() {
  const t = useTranslations('cookie');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('vox42-cookie-consent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('vox42-cookie-consent', 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem('vox42-cookie-consent', 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl animate-fadeUp">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 flex-1 leading-relaxed">
          {t('text')}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors min-h-[44px]"
          >
            {t('decline')}
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 text-sm font-semibold bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors min-h-[44px]"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
