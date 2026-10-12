'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<{ loading: boolean; success?: string; error?: string }>({ loading: false });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ loading: true });

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');

      setStatus({ loading: false, success: 'Message sent successfully! I will get back to you soon.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (err: any) {
      setStatus({ loading: false, error: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {status.success && (
        <div className="p-3 rounded-xl border text-xs flex items-center gap-2 bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" /> {status.success}
        </div>
      )}
      {status.error && (
        <div className="p-3 rounded-xl border text-xs flex items-center gap-2 bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400 font-medium">
          <AlertCircle className="w-4 h-4 shrink-0" /> {status.error}
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold mb-1.5 text-[var(--text-muted)]">
          Your Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm border transition-all duration-200 focus:outline-none focus:border-[#222222] focus:ring-2 focus:ring-[#222222]/20 dark:focus:border-[#f4f4f5] dark:focus:ring-2 dark:focus:ring-[#f4f4f5]/20 bg-[var(--bg)] border-[var(--border)] text-[var(--text)] placeholder-[var(--text-faint)] shadow-sm"
          placeholder="Eyosiyas"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5 text-[var(--text-muted)]">
          Your Email
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm border transition-all duration-200 focus:outline-none focus:border-[#222222] focus:ring-2 focus:ring-[#222222]/20 dark:focus:border-[#f4f4f5] dark:focus:ring-2 dark:focus:ring-[#f4f4f5]/20 bg-[var(--bg)] border-[var(--border)] text-[var(--text)] placeholder-[var(--text-faint)] shadow-sm"
          placeholder="eyosiyas@example.com"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold mb-1.5 text-[var(--text-muted)]">
          Your Message
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full rounded-xl px-4 py-3 text-sm border transition-all duration-200 focus:outline-none focus:border-[#222222] focus:ring-2 focus:ring-[#222222]/20 dark:focus:border-[#f4f4f5] dark:focus:ring-2 dark:focus:ring-[#f4f4f5]/20 resize-none bg-[var(--bg)] border-[var(--border)] text-[var(--text)] placeholder-[var(--text-faint)] shadow-sm"
          placeholder="Let's build something great together..."
        />
      </div>

      <button
        type="submit"
        disabled={status.loading}
        className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 bg-[#222222] text-white hover:bg-black dark:bg-[#f4f4f5] dark:text-[#1d1f1e] dark:hover:bg-white dark:hover:opacity-95 hover:shadow-lg shadow-md dark:shadow-black/20"
      >
        {status.loading ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
      </button>
    </form>
  );
}