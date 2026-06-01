'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAppAuth } from '@/contexts/AppAuthContext';
import { getRate, initiateCall } from '@/lib/api';

const LANGUAGES = [
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'uk', label: 'Українська', flag: '🇺🇦' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

function toE164(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith('+')) return '+' + trimmed.slice(1).replace(/\D/g, '');
  if (trimmed.startsWith('00')) return '+' + trimmed.slice(2).replace(/\D/g, '');
  return trimmed.replace(/\D/g, '');
}
const E164 = /^\+[1-9]\d{6,14}$/;

interface Props {
  onCallStarted: (sessionKey: string, callId: string, targetNumber: string) => void;
}

export default function AppCallInitiator({ onCallStarted }: Props) {
  const { credits, logout, refreshCredits } = useAppAuth();
  const [fromLang, setFromLang] = useState(() => {
    try { return localStorage.getItem('vox42_from') || 'de'; } catch { return 'de'; }
  });
  const [toLang, setToLang] = useState(() => {
    try { return localStorage.getItem('vox42_to') || 'en'; } catch { return 'en'; }
  });
  const [phone, setPhone] = useState(() => {
    try { return localStorage.getItem('vox42_phone') || ''; } catch { return ''; }
  });
  const [rate, setRate] = useState<{ perMinuteCents: number; perMinuteEur: string } | null>(null);
  const [rateLoading, setRateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchRate = useCallback(async () => {
    const normalized = toE164(phone);
    if (!E164.test(normalized) || !fromLang || !toLang) { setRate(null); return; }
    setRateLoading(true);
    try {
      const r = await getRate(fromLang, toLang, normalized);
      setRate(r);
    } catch {
      setRate(null);
    } finally {
      setRateLoading(false);
    }
  }, [phone, fromLang, toLang]);

  useEffect(() => {
    const t = setTimeout(fetchRate, 600);
    return () => clearTimeout(t);
  }, [fetchRate]);

  const handleStart = async () => {
    setError('');
    const normalized = toE164(phone);
    if (!E164.test(normalized)) {
      setError('Bitte gültige internationale Nummer eingeben (+49 …)');
      return;
    }
    if ((credits?.creditsCents ?? 0) <= 0) {
      setError('Kein Guthaben. Bitte zuerst aufladen.');
      return;
    }
    setLoading(true);
    try {
      localStorage.setItem('vox42_from', fromLang);
      localStorage.setItem('vox42_to', toLang);
      localStorage.setItem('vox42_phone', normalized);
      const session = await initiateCall({
        fromLang,
        toLang,
        phoneNumber: normalized,
        saveTranscript: true,
      });
      onCallStarted(session.sessionKey, session.callId, normalized);
    } catch (err: any) {
      setError(err.message || 'Anruf konnte nicht gestartet werden.');
    } finally {
      setLoading(false);
    }
  };

  const creditsEur = credits ? parseFloat(credits.creditsEur) : 0;
  const minutesLeft = rate ? Math.floor((credits?.creditsCents ?? 0) / rate.perMinuteCents) : null;

  return (
    <div className="w-full max-w-lg mx-auto space-y-5">

      {/* Balance Card */}
      <div
        className="rounded-2xl p-5 flex items-center justify-between"
        style={{
          background: 'rgba(13, 17, 23, 0.9)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div>
          <p className="text-xs mb-1" style={{ color: '#94A3B8' }}>Guthaben</p>
          <p
            className="text-2xl font-bold"
            style={{
              color: creditsEur > 0 ? '#00D4FF' : '#EF4444',
              fontFamily: 'var(--font-syne, Syne, sans-serif)',
            }}
          >
            {creditsEur.toFixed(2)} €
          </p>
          {minutesLeft !== null && minutesLeft > 0 && (
            <p className="text-xs mt-0.5" style={{ color: '#94A3B8' }}>
              ≈ {minutesLeft} Min. zu {rate!.perMinuteEur} €/Min.
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={refreshCredits}
            className="px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
            style={{ background: 'rgba(26,34,53,0.8)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.07)' }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#94A3B8')}
          >
            ↻
          </button>
          <a
            href="#topup"
            className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
            style={{ background: 'rgba(245,158,11,0.15)', color: '#EA580B', border: '1px solid rgba(245,158,11,0.3)' }}
            onMouseOver={(e) => (e.currentTarget.style.background = 'rgba(245,158,11,0.25)')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'rgba(245,158,11,0.15)')}
          >
            + Aufladen
          </a>
        </div>
      </div>

      {/* Main Call Card */}
      <div
        className="rounded-2xl p-6 space-y-5"
        style={{
          background: 'rgba(13, 17, 23, 0.9)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Language Row */}
        <div>
          <label className="block text-xs font-medium mb-3" style={{ color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Sprachen
          </label>
          <div className="flex items-center gap-3">
            <LangSelect value={fromLang} onChange={setFromLang} label="Du sprichst" />
            {/* Swap */}
            <button
              onClick={() => { setFromLang(toLang); setToLang(fromLang); }}
              className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{ background: 'rgba(26,34,53,0.8)', border: '1px solid rgba(255,255,255,0.08)', color: '#94A3B8' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#00D4FF'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.3)'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              title="Sprachen tauschen"
            >
              ⇄
            </button>
            <LangSelect value={toLang} onChange={setToLang} label="Gesprächspartner" />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-medium mb-2" style={{ color: '#94A3B8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Telefonnummer
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base" style={{ color: '#00D4FF' }}>📞</span>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+49 160 1234567"
              className="w-full rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-neutral-600 outline-none transition-all duration-200"
              style={{
                background: 'rgba(26, 34, 53, 0.8)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '1rem',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>
          {rateLoading && (
            <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>Tarif wird geladen…</p>
          )}
          {rate && !rateLoading && (
            <p className="text-xs mt-1" style={{ color: '#94A3B8' }}>
              {rate.perMinuteEur} €/Min. · Abrechnung sekundengenau
            </p>
          )}
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm rounded-lg px-4 py-3" style={{ color: '#F87171', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            {error}
          </p>
        )}

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={loading || !phone}
          className="w-full py-4 rounded-xl font-bold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #00D4FF 0%, #0099cc 100%)',
            color: '#1E293B',
            boxShadow: loading ? 'none' : '0 0 32px rgba(0,212,255,0.35), 0 4px 16px rgba(0,0,0,0.4)',
            fontFamily: 'var(--font-syne, Syne, sans-serif)',
          }}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Anruf wird gestartet…
            </span>
          ) : (
            '📞  Jetzt anrufen'
          )}
        </button>
      </div>

      {/* Logout */}
      <div className="text-center">
        <button
          onClick={logout}
          className="text-xs transition-colors duration-200"
          style={{ color: '#4B5563' }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#94A3B8')}
          onMouseOut={(e) => (e.currentTarget.style.color = '#4B5563')}
        >
          Abmelden
        </button>
      </div>
    </div>
  );
}

function LangSelect({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  const lang = LANGUAGES.find(l => l.code === value);
  return (
    <div className="flex-1">
      <p className="text-xs mb-1.5 truncate" style={{ color: '#4B5563' }}>{label}</p>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl px-3 py-2.5 pr-8 text-sm font-medium outline-none transition-all duration-200 cursor-pointer"
          style={{
            background: 'rgba(26,34,53,0.9)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: '#fff',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)')}
          onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
        >
          {LANGUAGES.map(l => (
            <option key={l.code} value={l.code} style={{ background: '#253347' }}>
              {l.flag} {l.label}
            </option>
          ))}
        </select>
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs" style={{ color: '#94A3B8' }}>▾</span>
      </div>
    </div>
  );
}
