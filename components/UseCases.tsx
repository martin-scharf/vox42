import { useTranslations } from 'next-intl';
import { Hotel, Users, Briefcase } from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  hotel: Hotel,
  family: Users,
  business: Briefcase,
};

export default function UseCases() {
  const t = useTranslations('useCases');
  const cases = t.raw('cases') as Array<{ icon: string; title: string; desc: string }>;

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-textLight dark:text-textDark mb-4">
            {t('title')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {cases.map((c, i) => {
            const Icon = iconMap[c.icon] ?? Briefcase;
            return (
              <div
                key={i}
                className="p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-textLight dark:text-textDark mb-3">{c.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{c.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
