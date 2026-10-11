'use client';

import { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        // Mobile: lower threshold + less rootMargin = triggers earlier, subtler wait
        // Desktop: higher threshold + more rootMargin = triggers later, fuller effect
        threshold: isMobile ? 0.1 : 0.35,
        rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -80px 0px',
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [isMobile]);

  return (
    <div
      ref={ref}
      className={`transition-all ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          // Mobile: shorter distance + faster = subtler effect
          // Desktop: full distance + slower = stronger effect
          : isMobile
            ? 'opacity-0 translate-y-3'
            : 'opacity-0 translate-y-10'
      } ${isMobile ? 'duration-500' : 'duration-700'} ${className}`}
    >
      {children}
    </div>
  );
}
