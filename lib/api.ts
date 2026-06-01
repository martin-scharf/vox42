// VOX42 API Client — connects to the Live-Translator backend on Railway
const API_BASE = 'https://backend-production-9164.up.railway.app';
export const TOKEN_KEY = 'vox42_token';

export function getToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (res.status === 401) {
    removeToken();
    throw new Error('UNAUTHORIZED');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.message || `HTTP ${res.status}`);
  }

  return res.json();
}

// ── Auth ────────────────────────────────────────────────────────────────────

export async function requestSmsCode(phoneNumber: string): Promise<void> {
  await apiFetch('/auth/sms/request', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber }),
  });
}

export interface SmsVerifyResponse {
  verified: boolean;
  sessionToken: string;
  user: { id: string; phoneNumber?: string; creditsCents: number; trialUsed: boolean };
}

export async function verifySmsCode(
  phoneNumber: string,
  code: string
): Promise<SmsVerifyResponse> {
  const data = await apiFetch<SmsVerifyResponse>('/auth/sms/verify', {
    method: 'POST',
    body: JSON.stringify({ phoneNumber, code }),
  });
  setToken(data.sessionToken);
  return data;
}

// ── User & Credits ──────────────────────────────────────────────────────────

export interface Credits {
  creditsCents: number;
  creditsEur: string;
}

export async function getCredits(): Promise<Credits> {
  const data = await apiFetch<{ creditsCents: number }>('/user/credits');
  const cents = data.creditsCents ?? 0;
  return {
    creditsCents: cents,
    creditsEur: (cents / 100).toFixed(2),
  };
}

// ── Calls ───────────────────────────────────────────────────────────────────

export interface RateInfo {
  perMinuteCents: number;
  perMinuteEur: string;
  currency: string;
}

export async function getRate(
  fromLang: string,
  toLang: string,
  phoneNumber: string
): Promise<RateInfo> {
  const params = new URLSearchParams({ fromLang, toLang, phoneNumber });
  return apiFetch<RateInfo>(`/calls/rate?${params}`);
}

export interface CallSession {
  sessionKey: string;
  callId: string;
  status: string;
}

export async function initiateCall(params: {
  fromLang: string;
  toLang: string;
  phoneNumber: string;
  saveTranscript: boolean;
}): Promise<CallSession> {
  return apiFetch<CallSession>('/calls/initiate', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export async function endCall(sessionKey: string): Promise<void> {
  await apiFetch('/calls/end', {
    method: 'POST',
    body: JSON.stringify({ sessionKey }),
  });
}
