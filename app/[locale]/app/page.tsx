'use client';

import { useState } from 'react';
import { AppAuthProvider, useAppAuth } from '@/contexts/AppAuthContext';
import AppLogin from '@/components/app/AppLogin';
import AppCallInitiator from '@/components/app/AppCallInitiator';
import AppCallScreen from '@/components/app/AppCallScreen';

type CallState = { sessionKey: string; callId: string; targetNumber: string } | null;

function AppInner() {
  const { isLoggedIn, isLoading } = useAppAuth();
  const [activeCall, setActiveCall] = useState<CallState>(null);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#050810' }}
      >
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin w-8 h-8" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="#00D4FF" strokeWidth="3"/>
            <path className="opacity-75" fill="#00D4FF" d="M4 12a8 8 0 018-8v8H4z"/>
          </svg>
          <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>Wird geladen…</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <AppLogin />;
  }

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #050810 0%, #0a0f1e 50%, #050810 100%)' }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none fixed inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 10%, rgba(0,212,255,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-40 px-4"
        style={{
          background: 'rgba(5,8,16,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-lg mx-auto h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="rgba(0,212,255,0.1)" stroke="rgba(0,212,255,0.3)" strokeWidth="1"/>
              <path d="M10 12 L16 20 L22 12" stroke="#00D4FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              <circle cx="10" cy="12" r="2.5" fill="#00D4FF"/>
              <circle cx="22" cy="12" r="2.5" fill="#F59E0B"/>
              <circle cx="16" cy="20" r="2.5" fill="#00D4FF" opacity="0.6"/>
            </svg>
            <span
              className="font-bold text-base text-white"
              style={{ fontFamily: 'var(--font-syne, Syne, sans-serif)' }}
            >
              Vox<span style={{ color: '#00D4FF' }}>42</span>
            </span>
          </a>
          <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: 'rgba(0,212,255,0.1)', color: '#00D4FF', border: '1px solid rgba(0,212,255,0.2)' }}>
            Web App
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-8 relative z-10">
        {activeCall ? (
          <AppCallScreen
            sessionKey={activeCall.sessionKey}
            callId={activeCall.callId}
            targetNumber={activeCall.targetNumber}
            onCallEnded={() => setActiveCall(null)}
          />
        ) : (
          <AppCallInitiator
            onCallStarted={(sessionKey, callId, targetNumber) =>
              setActiveCall({ sessionKey, callId, targetNumber })
            }
          />
        )}
      </main>
    </div>
  );
}

export default function AppPage() {
  return (
    <AppAuthProvider>
      <AppInner />
    </AppAuthProvider>
  );
}
