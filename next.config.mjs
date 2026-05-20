import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  // no external image dependencies
};

export default withNextIntl(nextConfig);
