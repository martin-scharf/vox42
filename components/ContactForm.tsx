'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="rounded-2xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-8 text-center">
        <div className="text-4xl mb-4">✓</div>
        <h2 className="text-xl font-semibold text-textLight dark:text-textDark mb-2">Nachricht gesendet</h2>
        <p className="text-gray-500 dark:text-gray-400">Wir melden uns innerhalb von 24 Stunden bei dir.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-textLight dark:text-textDark mb-1">Name</label>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-textLight dark:text-textDark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="Dein Name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-textLight dark:text-textDark mb-1">E-Mail</label>
        <input
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-textLight dark:text-textDark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition"
          placeholder="deine@email.com"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-textLight dark:text-textDark mb-1">Nachricht</label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-textLight dark:text-textDark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition resize-none"
          placeholder="Was können wir für dich tun?"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-xl hover:bg-primary/90 transition"
      >
        Nachricht senden
      </button>
    </form>
  );
}
