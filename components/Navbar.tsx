'use client';

import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = ['about', 'experience', 'projects', 'skills', 'testimonials', 'contact'];
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `px-3.5 py-2 rounded-xl transition-all duration-200 bg-[var(--bg-card)]/10 border border-[var(--border)]/10 shadow-sm text-xs backdrop-blur-md ${
      isActive 
        ? 'text-amber-500 dark:text-amber-400 border-amber-500/30 font-bold bg-[var(--bg-card)]/25' 
        : 'text-[var(--text-muted)] hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-500/20'
    }`;
  };

  const getMobileLinkClass = (section: string) => {
    const isActive = activeSection === section;
    return `block text-sm font-semibold px-4 py-3 rounded-xl transition bg-[var(--bg)]/20 border border-[var(--border)]/20 ${
      isActive 
        ? 'text-amber-500 dark:text-amber-400 border-amber-500/40 font-bold bg-[var(--bg)]/50' 
        : 'text-[var(--text-muted)] hover:text-amber-500'
    }`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl transition-all duration-300 bg-[var(--bg)]/10 border-b border-[var(--border)]/15 shadow-sm py-2">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        
        {/* Brand Logo with Gold Accent */}
        <a href="#about" className="group flex items-center gap-1 font-extrabold text-base sm:text-lg tracking-wider">
          <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent group-hover:opacity-90 transition">
            EYOSIYAS
          </span>
          <span className="text-amber-500 text-lg sm:text-xl group-hover:scale-125 transition duration-300">.</span>
          <span className="text-[10px] uppercase tracking-widest font-mono hidden sm:inline-block ml-1 px-2.5 py-1 rounded-lg backdrop-blur-md text-[var(--text-muted)] bg-[var(--bg-card)]/10 border border-[var(--border)]/10 shadow-sm">
            Dev
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5 font-semibold">
          <a href="#about" className={getLinkClass('about')}>
            About
          </a>
          <a href="#experience" className={getLinkClass('experience')}>
            Experience
          </a>
          <a href="#projects" className={getLinkClass('projects')}>
            Projects
          </a>
          <a href="#skills" className={getLinkClass('skills')}>
            Skills
          </a>
          <a href="#testimonials" className={getLinkClass('testimonials')}>
            Testimonials
          </a>
          <a href="#contact" className={getLinkClass('contact')}>
            Contact
          </a>
        </nav>

        {/* Desktop CTA & Theme Toggle */}
        <div className="hidden md:flex items-center gap-2.5">
          <ThemeToggle />
          <a 
            href="/admin"
            title="Admin Dashboard"
            className="p-2.5 rounded-xl border transition-all duration-300 bg-[var(--bg-card)]/10 border-[var(--border)]/10 text-[var(--text-muted)] hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-500/20 shadow-sm backdrop-blur-md"
            aria-label="Admin"
          >
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </a>
          <a 
            href="#contact" 
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 text-xs font-bold tracking-wide hover:opacity-90 transition-all duration-300 shadow-md shadow-amber-500/20"
          >
            Let&apos;s Connect
          </a>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="focus:outline-none p-2.5 rounded-xl border transition text-[var(--text-muted)] bg-[var(--bg-card)]/20 border-[var(--border)]/20 hover:text-amber-500 shadow-sm backdrop-blur-md"
            aria-label="Toggle Menu"
          >
            <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu (Enhanced visibility and glassmorphism) */}
      {isOpen && (
        <div className="md:hidden backdrop-blur-3xl border-b px-5 py-5 space-y-2.5 shadow-2xl animate-in slide-in-from-top duration-300 bg-[var(--bg-card)]/90 border-[var(--border)]/30">
          <a href="#about" onClick={() => setIsOpen(false)} className={getMobileLinkClass('about')}>
            About Me
          </a>
          <a href="#experience" onClick={() => setIsOpen(false)} className={getMobileLinkClass('experience')}>
            Experience & Education
          </a>
          <a href="#projects" onClick={() => setIsOpen(false)} className={getMobileLinkClass('projects')}>
            Featured Projects
          </a>
          <a href="#skills" onClick={() => setIsOpen(false)} className={getMobileLinkClass('skills')}>
            Technical Expertise
          </a>
          <a href="#testimonials" onClick={() => setIsOpen(false)} className={getMobileLinkClass('testimonials')}>
            Testimonials
          </a>
          <a href="#contact" onClick={() => setIsOpen(false)} className={getMobileLinkClass('contact')}>
            Get In Touch
          </a>
          <div className="pt-3 flex items-center gap-2.5 border-t border-[var(--border)]/20">
            <a href="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center px-4 py-3 rounded-xl border transition text-sm font-semibold text-[var(--text-muted)] border-[var(--border)]/30 hover:text-amber-500 bg-[var(--bg)]/20 backdrop-blur-md">
              Admin
            </a>
            <a href="#contact" onClick={() => setIsOpen(false)} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-center text-xs shadow-md">
              Let&apos;s Connect
            </a>
          </div>
        </div>
      )}
    </header>
  );
}