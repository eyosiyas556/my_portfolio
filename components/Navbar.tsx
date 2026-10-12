'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'skills', 'testimonials', 'contact'];
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 300 && r.bottom >= 300) { setActiveSection(id); break; }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shadows: completely flat/removed in dark mode per user instruction
  const btnShadow = isDark
    ? 'none'
    : '0 2px 8px rgba(0,0,0,0.08)';

  const activeBtnShadow = isDark
    ? 'none'
    : '0 2px 12px rgba(0,0,0,0.12)';

  // Navbar bar shadow
  const headerShadow = isDark
    ? 'none'
    : '0 2px 12px rgba(0,0,0,0.08)';

  const getLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `px-3.5 py-2 rounded-xl transition-all duration-300 text-xs font-semibold border ${
      isActive
        ? 'text-[#222222] border-[#222222] font-bold bg-[#ffffff] shadow-sm dark:text-[#1d1f1e] dark:border-[#f4f4f5] dark:bg-[#f4f4f5]'
        : 'text-[var(--text-muted)] border-[var(--border)]/50 bg-[var(--bg-card)] hover:text-[#222222] hover:border-[#222222]/40 dark:hover:text-[#f4f4f5] dark:hover:border-[#f4f4f5]/40'
    }`;
  };

  const getMobileLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `block text-sm font-semibold px-4 py-3 rounded-xl transition border ${
      isActive
        ? 'text-[#222222] border-[#222222] font-bold bg-[#ffffff] dark:text-[#1d1f1e] dark:border-[#f4f4f5] dark:bg-[#f4f4f5]'
        : 'text-[var(--text-muted)] border-[var(--border)]/50 bg-[var(--bg-card)] hover:text-[#222222] hover:border-[#222222]/40 dark:hover:text-[#f4f4f5] dark:hover:border-[#f4f4f5]/40'
    }`;
  };

  const sections = ['about', 'experience', 'projects', 'skills', 'testimonials', 'contact'] as const;
  const labels: Record<string, string> = { about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills', testimonials: 'Testimonials', contact: 'Contact' };
  const mobileLabels: Record<string, string> = { about: 'About Me', experience: 'Experience & Education', projects: 'Featured Projects', skills: 'Technical Expertise', testimonials: 'Testimonials', contact: 'Get In Touch' };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 py-2 ${
        scrolled ? 'bg-[var(--bg)]/80 border-b border-[var(--border)]/30' : 'bg-transparent border-b border-transparent'
      }`}
      style={scrolled ? { boxShadow: headerShadow } : {}}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">

        {/* Brand */}
        <a href="#about" className="group flex items-center gap-1 font-extrabold text-base sm:text-lg tracking-wider">
          <span className="text-[#222222] dark:text-[#f4f4f5] group-hover:opacity-90 transition">Eyosiyas</span>
          <span className="text-[#222222] dark:text-[#f4f4f5] text-lg sm:text-xl group-hover:scale-125 transition duration-300">.</span>
          <span
            className="text-[10px] uppercase tracking-widest font-mono hidden sm:inline-block ml-1 px-2.5 py-1 rounded-lg border border-[var(--border)]/50 text-[var(--text-muted)] bg-[var(--bg-card)]"
            style={{ boxShadow: btnShadow }}
          >
            Dev
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className={getLinkClass(s)}
              style={{ boxShadow: activeSection === s ? activeBtnShadow : btnShadow }}
            >
              {labels[s]}
            </a>
          ))}
        </nav>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />
          <a
            href="/admin"
            title="Admin Dashboard"
            aria-label="Admin"
            className="p-2.5 rounded-xl border border-[var(--border)]/50 bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[#222222] hover:border-[#222222]/40 dark:hover:text-[#f4f4f5] dark:hover:border-[#f4f4f5]/40 transition-all duration-300"
            style={{ boxShadow: btnShadow }}
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </a>
          <a
            href="#contact"
            className="px-4 py-2.5 rounded-xl bg-[#222222] text-white hover:bg-black dark:bg-[#f4f4f5] dark:text-[#1d1f1e] dark:hover:bg-white text-xs font-bold tracking-wide transition-all duration-300 shadow-md"
            style={{ boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.15)' }}
          >
            Let&apos;s Connect
          </a>
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="focus:outline-none p-2.5 rounded-xl border border-[var(--border)]/50 bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[#222222] dark:hover:text-[#f4f4f5] transition"
            style={{ boxShadow: btnShadow }}
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              {isOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-2xl border-b px-5 py-5 space-y-2.5 animate-in slide-in-from-top duration-300 bg-[var(--bg-card)]/95 border-[var(--border)]/40"
          style={{ boxShadow: headerShadow }}
        >
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setIsOpen(false)}
              className={getMobileLinkClass(s)}
              style={{ boxShadow: activeSection === s ? activeBtnShadow : btnShadow }}
            >
              {mobileLabels[s]}
            </a>
          ))}
          <div className="pt-3 flex items-center gap-2.5 border-t border-[var(--border)]/30">
            <a
              href="/admin"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center px-4 py-3 rounded-xl border border-[var(--border)]/50 bg-[var(--bg-card)] text-sm font-semibold text-[var(--text-muted)] hover:text-[#222222] dark:hover:text-[#f4f4f5] transition"
              style={{ boxShadow: btnShadow }}
            >
              Admin
            </a>
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="flex-1 py-3 rounded-xl bg-[#222222] text-white hover:bg-black dark:bg-[#f4f4f5] dark:text-[#1d1f1e] dark:hover:bg-white font-bold text-center text-xs"
              style={{ boxShadow: isDark ? 'none' : '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
