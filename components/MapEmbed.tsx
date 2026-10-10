'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function MapEmbed({ location }: { location: string }) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && theme === 'dark';

  return (
    <iframe
      title="Adama Location Map"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126115.19572238426!2d39.2078!3d8.5417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b216447833f7d%3A0x6b8d23fa2adfae2d!2sAdama%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1650000000000!5m2!1sen!2sus"
      className="absolute inset-0 w-full h-full border-0 opacity-90 hover:opacity-100 transition-all duration-500"
      style={isDark ? { filter: 'invert(1) hue-rotate(180deg) contrast(1.2)', opacity: 0.85 } : {}}
      allowFullScreen={false}
      loading="lazy"
    />
  );
}
