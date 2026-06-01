'use client';

import { useState } from 'react';
import { useAppAuth } from '@/contexts/AppAuthContext';

function normalizePhone(raw: string): string {
  const trimmed = raw.trim().replace(/[\s()/.\-]/g, '');
  if (trimmed.startsWith('+')) return '+' + trimmed.slice(1).replace(/\D/g, '');
  if (trimmed.startsWith('00')) return '+' + trimmed.slice(2).replace(/\D/g, '');
  return '';
}
const E164 = /^\+[1-9]\d{6,14}$/;

export default function AppLogin() {
  const { requestSms, verifySms } = useAppAuth();
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const normalized = normalizePhone(phone);
    if (!E164.test(normalized)) {
      setError('Bitte internationale Nummer eingeben, z.B. +49 160 1234567');
      return;
    }
    setLoading(true);
    try {
      await requestSms(normalized);
      setPhone(normalized);
      setStep('code');
    } catch (err: any) {
      setError(err.message || 'SMS konnte nicht gesendet werden.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await verifySms(phone, code.trim());
    } catch (err: any) {
      setError(err.message || 'Code ungültig. Bitte erneut versuchen.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #050810 0%, #0a0f1e 50%, #050810 100%)' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 20%, rgba(0,212,255,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-10">
          <a href="/" className="inline-flex items-center gap-2.5 group mb-6">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.3)" strokeWidth="1"/>
              <path d="M10 12 L16 20 L22 12" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="10" cy="12" r="2.5" fill="#00D4FF"/>
              <circle cx="22" cy="12" r="2.5" fill="#F59E0B"/>
              <circle cx="16" cy="20" r="2.5" fill="#00D4FF" opacity="0.6"/>
            </svg>
            <span
              className="text-2xl font-bold tracking-tight text-white"
              style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
            >
              Vox<span style={{ color: '#00D4FF' }}>42</span>
            </span>
          </a>
          <h1
            className="text-2xl font-bold text-white mb-2"
            style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
          >
            {step === 'phone' ? 'Anmelden' : 'Code eingeben'}
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem' }}>
            {step === 'phone'
              ? 'Wir senden dir einen Bestätigungscode per SMS.'
              : `Code an ${phone} gesendet.`}
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(13, 17, 23, 0.9)',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {step === 'phone' ? (
            <form onSubmit={handleSendCode} className="space-y-5">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: '#94A3B8' }}
                >
                  Handynummer
                </label>
                <div className="relative">
                  <span
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-lg select-none"
                    style={{ color: '#00D4FF' }}
                  >
                    📱
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+49 160 1234567"
                    autoComplete="tel"
                    className="w-full rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-neutral-600 outline-none transition-all duration-200"
                    style={{
                      background: 'rgba(26, 34, 53, 0.8)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      fontSize: '1rem',
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)')}
                    onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm rounded-lg px-4 py-3" style={{ color: '#F87171', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || !phone}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: loading ? 'rgba(0,212,255,0.3)' : 'linear-gradient(135deg, #00D4FF, #0099cc)',
                  color: '#050810',
                  boxShadow: loading ? 'none' : '0 0 24px rgba(0,212,255,0.3)',
                  fontFamily: 'var(--font-syne, Syne, sans-serif)',
                }}
              >
                {loading ? 'Wird gesendet…' : 'Code senden'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#94A3B8' }}>
                  Bestätigungscode
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="_ _ _ _ _ _"
                  autoFocus
                  className="w-full rounded-xl px-4 py-3.5 text-center text-white text-2xl tracking-[0.5em] placeholder-neutral-700 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(26, 34, 53, 0.8)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.5)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
                />
                <p className="text-xs mt-2 text-center" style={{ color: '#94A3B8' }}>
                  6-stelliger Code aus der SMS
                </p>
              </div>

              {error && (
                <p className="text-sm rounded-lg px-4 py-3" style={{ color: '#F87171', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading || code.length < 4}
                className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-50"
                style={{
                  background: 'linear-gradient(135deg, #00D4FF, #0099cc)',
                  color: '#050810',
                  boxShadow: '0 0 24px rgba(0,212,255,0.3)',
                  fontFamily: 'var(--font-syne, Syne, sans-serif)',
                }}
              >
                {loading ? 'Wird geprüft…' : 'Anmelden'}
              </button>

              <button
                type="button"
                onClick={() => { setStep('phone'); setCode(''); setError(''); }}
                className="w-full py-2 text-sm transition-colors duration-200"
                style={{ color: '#94A3B8' }}
                onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
              >
                ← Andere Nummer
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#4B5563' }}>
          Mit der Anmeldung stimmst du unseren{' '}
          <a href="/de/agb" style={{ color: '#94A3B8' }} className="hover:text-white transition-colors">
            AGB
          </a>{' '}
          und der{' '}
          <a href="/de/datenschutz" style={{ color: '#94A3B8' }} className="hover:text-white transition-colors">
            Datenschutzerklärung
          </a>{' '}
          zu.
        </p>
      </div>
    </div>
  );
}
