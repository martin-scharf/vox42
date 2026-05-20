import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 20% 40%, rgba(91,33,182,0.12) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 60%, rgba(249,115,22,0.08) 0%, transparent 60%)',
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Text */}
        <div className="text-center lg:text-left">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-6 animate-fadeUp"
            style={{ animationDelay: '0s' }}
          >
            <span className="w-2 h-2 rounded-full bg-primary inline-block animate-pulse2"/>
            Live Translation · 12 Languages
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-textLight dark:text-textDark mb-6 animate-fadeUp"
            style={{ animationDelay: '0.1s' }}
          >
            {t('headline')}
          </h1>
          <p
            className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-10 animate-fadeUp"
            style={{ animationDelay: '0.2s' }}
          >
            {t('subheadline')}
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeUp"
            style={{ animationDelay: '0.3s' }}
          >
            {/* App Store Button */}
            <a
              href="#"
              className="inline-flex items-center gap-3 px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold hover:opacity-90 transition-opacity min-h-[44px]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {t('ctaAppStore')}
            </a>
            {/* Google Play Button */}
            <a
              href="#"
              className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-textLight dark:text-textDark rounded-xl font-semibold hover:border-primary hover:text-primary transition-colors min-h-[44px]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M3.18 23.18c.37.2.78.3 1.19.3.29 0 .58-.05.86-.16L14 17.5l-2.84-2.84L3.18 23.18z" fill="#EA4335"/>
                <path d="M20.5 10.5l-3.18-1.84-3.17 3.34 3.17 3.17 3.19-1.86c.91-.53.91-2.28-.01-2.81z" fill="#FBBC05"/>
                <path d="M4.37.68C4.06.58 3.71.55 3.37.65L11.16 8.5l3.16-3.16L4.37.68z" fill="#4285F4"/>
                <path d="M3.18.82L11.16 8.5l.84.84L3.37.65C3.28.68 3.22.74 3.18.82z" fill="#34A853"/>
                <path d="M3.18.82c-.1.18-.18.4-.18.68v21c0 .29.08.51.18.68l.19.19L12.5 13.5v-.22L3.37.63l-.19.19z" fill="#34A853"/>
              </svg>
              {t('ctaGooglePlay')}
            </a>
          </div>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center animate-float">
          <svg width="320" height="400" viewBox="0 0 320 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Phone frame */}
            <rect x="100" y="20" width="120" height="200" rx="20" fill="#1a1a2e" stroke="#5B21B6" strokeWidth="2"/>
            <rect x="110" y="35" width="100" height="160" rx="8" fill="#0f0f1a"/>
            {/* Screen content */}
            <circle cx="160" cy="85" r="22" fill="#5B21B6" opacity="0.2"/>
            <circle cx="160" cy="85" r="14" fill="#5B21B6"/>
            {/* Mic icon */}
            <rect x="156" y="76" width="8" height="14" rx="4" fill="white"/>
            <path d="M151 87 Q151 95 160 95 Q169 95 169 87" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            <line x1="160" y1="95" x2="160" y2="99" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>

            {/* Waveform bars */}
            <rect x="124" y="118" width="4" height="12" rx="2" fill="#5B21B6" opacity="0.4" style={{transformOrigin:'124px 124px', animation:'waveform 0.8s ease-in-out infinite'}}/>
            <rect x="132" y="112" width="4" height="24" rx="2" fill="#5B21B6" opacity="0.6" style={{transformOrigin:'132px 124px', animation:'waveform 0.8s ease-in-out 0.1s infinite'}}/>
            <rect x="140" y="108" width="4" height="32" rx="2" fill="#5B21B6" opacity="0.8" style={{transformOrigin:'140px 124px', animation:'waveform 0.8s ease-in-out 0.2s infinite'}}/>
            <rect x="148" y="114" width="4" height="20" rx="2" fill="#5B21B6" style={{transformOrigin:'148px 124px', animation:'waveform 0.8s ease-in-out 0.3s infinite'}}/>
            <rect x="156" y="110" width="4" height="28" rx="2" fill="#5B21B6" style={{transformOrigin:'156px 124px', animation:'waveform 0.8s ease-in-out 0.15s infinite'}}/>
            <rect x="164" y="115" width="4" height="18" rx="2" fill="#5B21B6" opacity="0.9" style={{transformOrigin:'164px 124px', animation:'waveform 0.8s ease-in-out 0.25s infinite'}}/>
            <rect x="172" y="109" width="4" height="30" rx="2" fill="#5B21B6" opacity="0.7" style={{transformOrigin:'172px 124px', animation:'waveform 0.8s ease-in-out 0.05s infinite'}}/>
            <rect x="180" y="116" width="4" height="16" rx="2" fill="#5B21B6" opacity="0.5" style={{transformOrigin:'180px 124px', animation:'waveform 0.8s ease-in-out 0.35s infinite'}}/>
            <rect x="188" y="113" width="4" height="22" rx="2" fill="#5B21B6" opacity="0.3" style={{transformOrigin:'188px 124px', animation:'waveform 0.8s ease-in-out 0.45s infinite'}}/>

            {/* Speech bubble DE */}
            <rect x="20" y="150" width="100" height="50" rx="12" fill="white" stroke="#5B21B6" strokeWidth="1.5"/>
            <polygon points="100,165 120,160 105,175" fill="white" stroke="#5B21B6" strokeWidth="1.5"/>
            <text x="35" y="172" fontFamily="system-ui" fontSize="10" fill="#5B21B6" fontWeight="600">🇩🇪 Deutsch</text>
            <text x="35" y="188" fontFamily="system-ui" fontSize="9" fill="#666">„Guten Tag!"</text>

            {/* Speech bubble IT */}
            <rect x="200" y="150" width="100" height="50" rx="12" fill="#5B21B6"/>
            <polygon points="220,165 200,160 215,175" fill="#5B21B6"/>
            <text x="215" y="172" fontFamily="system-ui" fontSize="10" fill="white" fontWeight="600">🇮🇹 Italiano</text>
            <text x="215" y="188" fontFamily="system-ui" fontSize="9" fill="rgba(255,255,255,0.8)">„Buongiorno!"</text>

            {/* Arrow between */}
            <path d="M125 175 L195 175" stroke="#F97316" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrowhead)"/>
            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#F97316"/>
              </marker>
            </defs>

            {/* Bottom part of phone */}
            <circle cx="160" cy="205" r="6" fill="#333"/>

            {/* Floating tags */}
            <rect x="60" y="260" width="80" height="28" rx="14" fill="#F97316" opacity="0.9"/>
            <text x="100" y="279" textAnchor="middle" fontFamily="system-ui" fontSize="10" fill="white" fontWeight="700">Live AI</text>

            <rect x="180" y="270" width="90" height="28" rx="14" fill="#5B21B6" opacity="0.9"/>
            <text x="225" y="289" textAnchor="middle" fontFamily="system-ui" fontSize="10" fill="white" fontWeight="700">12 Sprachen</text>

            <rect x="90" y="310" width="100" height="28" rx="14" fill="#10b981" opacity="0.85"/>
            <text x="140" y="329" textAnchor="middle" fontFamily="system-ui" fontSize="10" fill="white" fontWeight="700">🔒 DSGVO</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
