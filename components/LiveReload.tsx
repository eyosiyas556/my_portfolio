'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

// Listens for profile/content updates from the admin panel in real-time
// Supports:
// 1. Instant BroadcastChannel across tabs (0ms latency)
// 2. Storage events across windows (0ms latency)
// 3. Tab focus & visibility change
// 4. Lightweight background sync every 3s across different devices/browsers
export default function LiveReload() {
  const router = useRouter();
  const lastRefreshTimestamp = useRef<number>(Date.now());
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const triggerRefresh = () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        lastRefreshTimestamp.current = Date.now();
        router.refresh();
      }, 200);
    };

    // 1. Instant cross-tab BroadcastChannel
    let channel: BroadcastChannel | null = null;
    try {
      channel = new BroadcastChannel('portfolio_updates');
      channel.onmessage = (event) => {
        if (event.data === 'refresh' || event.data?.type === 'refresh') {
          triggerRefresh();
        }
      };
    } catch (e) {
      console.warn('BroadcastChannel not supported in this environment');
    }

    // 2. Cross-window storage listener
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'portfolio_last_updated') {
        triggerRefresh();
      }
    };
    window.addEventListener('storage', handleStorage);

    // 3. Tab visibility / focus listener
    const handleVisibility = () => {
      if (!document.hidden) {
        triggerRefresh();
      }
    };
    window.addEventListener('focus', handleVisibility);
    document.addEventListener('visibilitychange', handleVisibility);

    // 4. Background polling for cross-device real-time updates (every 3 seconds)
    const pollInterval = setInterval(async () => {
      if (document.hidden) return;
      try {
        const res = await fetch('/api/updated-at', {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache' },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.timestamp && data.timestamp > lastRefreshTimestamp.current) {
            triggerRefresh();
          }
        }
      } catch (err) {
        // Silently skip if network temporarily drops
      }
    }, 3000);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      channel?.close();
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('focus', handleVisibility);
      document.removeEventListener('visibilitychange', handleVisibility);
      clearInterval(pollInterval);
    };
  }, [router]);

  return null;
}
