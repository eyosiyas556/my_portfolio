'use client';

import { useEffect, useRef, useState } from 'react';

export default function RevealOnScroll({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Cancel any pending hide — reveal immediately
          if (hideTimer.current) clearTimeout(hideTimer.current);
          setIsVisible(true);
        } else {
          // Delay hiding by 600ms — prevents flicker during normal scrolling
          // but resets properly when user jumps away via navbar
          hideTimer.current = setTimeout(() => {
            setIsVisible(false);
          }, 600);
        }
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -80px 0px',
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-10'
      } ${className}`}
    >
      {children}
    </div>
  );
}
