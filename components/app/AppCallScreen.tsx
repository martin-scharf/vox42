'use client';

import { useState, useEffect } from 'react';
import { endCall } from '@/lib/api';

interface Props {
  sessionKey: string;
  callId: string;
  targetNumber: string;
  onCallEnded: () => void;
}

export default function AppCallScreen({ sessionKey, callId, targetNumber, onCallEnded }: Props) {
  const [elapsed, setElapsed] = useState(0);
  const [ending, setEnding] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleEnd = async () => {
    setEnding(true);
    try {
      await endCall(sessionKey);
    } catch { /* ignore */ }
    onCallEnded();
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div
        className="rounded-2xl p-8 text-center space-y-8"
        style={{
          background: 'rgba(13, 17, 23, 0.95)',
          border: '1px solid rgba(0,212,255,0.15)',
          boxShadow: '0 0 60px rgba(0,212,255,0.08), 0 24px 64px rgba(0,0,0,0.5)',
        }}
      >
        {/* Pulsing mic icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center text-3xl"
              style={{ background: 'rgba(0,212,255,0.1)', border: '1px solid rgba(0,212,255,0.3)' }}
            >
              🎙️
            </div>
            {/* Pulse rings */}
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: 'rgba(0,212,255,0.1)', animationDuration: '2s' }}
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <p className="text-xs font-medium uppercase tracking-widest mb-2" style={{ color: '#00D4FF' }}>
            Übersetzung aktiv
          </p>
          <p className="text-white text-lg font-semibold" style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}>
            {targetNumber}
          </p>
          <p
            className="text-4xl font-bold mt-3 tabular-nums"
            style={{ color: '#00D4FF', fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
          >
            {fmt(elapsed)}
          </p>
        </div>

        {/* Live translation indicator */}
        <div
          className="rounded-xl px-4 py-3"
          style={{ background: 'rgba(26,34,53,0.8)', border: '1px solid rgba(255,255,255,0.05)' }}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="flex gap-1">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: '#00D4FF',
                    animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </span>
            <p className="text-sm" style={{ color: '#94A3B8' }}>Live-Übersetzung läuft</p>
          </div>
        </div>

        {/* End call button */}
        <button
          onClick={handleEnd}
          disabled={ending}
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto text-2xl transition-all duration-200 disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #EF4444, #dc2626)',
            boxShadow: '0 0 24px rgba(239,68,68,0.4), 0 4px 16px rgba(0,0,0,0.4)',
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
        >
          📵
        </button>
        <p className="text-xs" style={{ color: '#4B5563' }}>Auflegen</p>
      </div>

      <style jsx global>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
