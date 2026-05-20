import { useTranslations } from 'next-intl';
import { Smartphone, Phone, MessageSquare, FileText } from 'lucide-react';

const icons = [Smartphone, Phone, MessageSquare, FileText];

export default function HowItWorks() {
  const t = useTranslations('howItWorks');
  const steps = t.raw('steps') as Array<{ title: string; desc: string }>;

  return (
    <section id="how-it-works" className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-textLight dark:text-textDark mb-4">
            {t('title')}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="relative flex flex-col items-center text-center group">
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-gradient-to-r from-primary/30 to-primary/10" />
                )}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-textLight dark:text-textDark mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
