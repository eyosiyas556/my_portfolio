'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Listens for profile/content updates broadcast from the admin panel
// and silently refreshes the server data without a full page reload.
export default function LiveReload() {
  const router = useRouter();

  useEffect(() => {
    const channel = new BroadcastChannel('portfolio_updates');

    channel.onmessage = (event) => {
      if (event.data === 'refresh') {
        router.refresh(); // re-runs all server component fetches, no full reload
      }
    };

    return () => channel.close();
  }, [router]);

  return null; // renders nothing
}
