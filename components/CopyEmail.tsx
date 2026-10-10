'use client';

import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      title={copied ? 'Copied!' : 'Copy email'}
      aria-label="Copy email address"
      className="shrink-0 p-1.5 rounded-lg border transition-all duration-200
        border-[var(--border)] text-[var(--text-muted)]
        hover:border-amber-500/50 hover:text-amber-500 hover:bg-amber-500/10"
    >
      {copied ? (
        /* Checkmark */
        <svg className="w-3.5 h-3.5 text-amber-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
        </svg>
      ) : (
        /* Copy icon */
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path strokeLinecap="round" d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
        </svg>
      )}
    </button>
  );
}
