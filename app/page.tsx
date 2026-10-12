import { connection } from 'next/server';
import { prisma } from '@/lib/prisma';
import ContactForm from '@/components/ContactForm';
import TypewriterTitle from '@/components/TypewriterTitle';
import Navbar from '@/components/Navbar';
import MapEmbed from '@/components/MapEmbed';
import CopyEmail from '@/components/CopyEmail';
import RevealOnScroll from '@/components/RevealOnScroll';
import LiveReload from '@/components/LiveReload';
import SkillsSection from '@/components/SkillsSection';
import { FaGithub, FaLinkedin, FaTelegram, FaInstagram } from 'react-icons/fa';

async function safeQuery<T>(queryFn: () => Promise<T>, fallback: T, retries = 2): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await queryFn();
    } catch (error) {
      if (attempt === retries) {
        console.error('Database query fallback triggered:', error);
        return fallback;
      }
      await new Promise((resolve) => setTimeout(resolve, 700 * (attempt + 1)));
    }
  }
  return fallback;
}

export default async function Home() {
  await connection();

  const [profile, contactInfo, experiences, projects, skills, testimonials] = await Promise.all([
    safeQuery(() => prisma.profile.findFirst(), null),
    safeQuery(() => prisma.contactInfo.findFirst(), null),
    safeQuery(() => prisma.experience.findMany({ orderBy: { id: 'desc' } }), []),
    safeQuery(() => prisma.project.findMany({ orderBy: { created_at: 'desc' } }), []),
    safeQuery(() => prisma.skill.findMany({ orderBy: [{ category: 'asc' }, { proficiency_level: 'desc' }] }), []),
    safeQuery(() => prisma.testimonial.findMany({ orderBy: { created_at: 'desc' } }), []),
  ]);

  const safeProfile = {
    full_name: profile?.full_name ?? 'Eyosiyas Fisseha Birhanie',
    title: profile?.title ?? 'Full-Stack Developer',
    bio: profile?.bio ?? 'Driven software engineering student at ASTU specializing in full-stack web development and backend architecture. I build scalable, secure enterprise solutions and high-performance web applications designed to solve real-world problems and drive operational efficiency.',
    profile_image_url: profile?.profile_image_url ?? null,
    github_url: profile?.github_url ?? null,
    linkedin_url: profile?.linkedin_url ?? null,
    telegram_url: profile?.telegram_url ?? null,
    instagram_url: profile?.instagram_url ?? null,
  };

  const safeContact = {
    email: contactInfo?.email ?? 'eyosiyas@example.com',
    location: contactInfo?.location ?? 'Adama, Ethiopia',
    availability_status: contactInfo?.availability_status ?? 'Available for Opportunities',
    phone: contactInfo?.phone ?? '',
  };

  const groupedSkills: { [key: string]: any[] } = skills.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-300 bg-[var(--bg)] text-[var(--text)]">

      {/* Fixed Navbar */}
      <Navbar />
      <LiveReload />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-20 sm:pb-28 space-y-10 sm:space-y-16">

        {/* ── Hero ────────────────────────────────────────────── */}
        <section id="about" className="scroll-mt-28 py-2 sm:py-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">

          <div className="flex-1 space-y-4 text-center md:text-left w-full">

            {/* ASTU Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm tracking-wide bg-[#ffffff] border border-[#dcdcdc] text-[#222222] dark:bg-[#292c2b] dark:border-[#3d4240] dark:text-[#f4f4f5]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#222222] dark:bg-[#f4f4f5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#222222] dark:bg-[#f4f4f5]"></span>
              </span>
              Software Engineering Student at ASTU
            </div>

            {/* MOBILE ONLY: Title first, then Image & Socials cleanly separated */}
            <div className="space-y-4 md:space-y-0">
              <div className="w-full text-[var(--text)] flex justify-center md:justify-start relative z-10">
                <TypewriterTitle
                  fullName={safeProfile.full_name || 'Eyosiyas Fisseha Birhanie'}
                  title={safeProfile.title || 'Full-Stack Developer'}
                />
              </div>

              {safeProfile.profile_image_url && (
                <div className="md:hidden relative pt-2 pb-2 flex flex-col items-center justify-center space-y-3 z-10">
                  <div className="relative">
                    <div className="hidden dark:block absolute -inset-1 bg-white/5 rounded-3xl blur-xl opacity-20"></div>
                    <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-[#dcdcdc] dark:border-[#3d4240] shadow-xl group bg-[var(--bg-card)]">
                      <img
                        src={safeProfile.profile_image_url}
                        alt={safeProfile.full_name || 'Eyosiyas'}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-xl backdrop-blur-md flex items-center justify-between text-[11px] font-medium shadow-md bg-white/90 dark:bg-[#292c2b] border border-[#dcdcdc] dark:border-[#3d4240] text-[var(--text)]">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#222222] dark:bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#222222] dark:bg-white"></span>
                          </span>
                          Coding &amp; Building
                        </span>
                        <span className="text-[#222222] dark:text-amber-400 font-mono font-bold">ASTU</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Icons Under Profile Picture (Mobile) */}
                  <div className="flex items-center justify-center gap-3.5 pt-1">
                    {safeProfile.github_url && (
                      <a href={safeProfile.github_url} target="_blank" aria-label="GitHub"
                        className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#222222] dark:hover:text-[#f4f4f5] shadow-sm">
                        <FaGithub className="w-4 h-4" />
                      </a>
                    )}
                    {safeProfile.linkedin_url && (
                      <a href={safeProfile.linkedin_url} target="_blank" aria-label="LinkedIn"
                        className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#0A66C2] shadow-sm">
                        <FaLinkedin className="w-4 h-4" />
                      </a>
                    )}
                    {safeProfile.telegram_url && (
                      <a href={safeProfile.telegram_url} target="_blank" aria-label="Telegram"
                        className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#229ED9] shadow-sm">
                        <FaTelegram className="w-4 h-4" />
                      </a>
                    )}
                    {safeProfile.instagram_url && (
                      <a href={safeProfile.instagram_url} target="_blank" aria-label="Instagram"
                        className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#E4405F] shadow-sm">
                        <FaInstagram className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <p className="text-sm sm:text-lg max-w-2xl leading-relaxed text-[var(--text-muted)] font-medium px-2 md:px-0 pt-2">
              {safeProfile.bio || 'Driven software engineering student at ASTU specializing in full-stack web development and backend architecture. I build scalable, secure enterprise solutions and high-performance web applications designed to solve real-world problems and drive operational efficiency.'}
            </p>
          </div>

          {/* DESKTOP ONLY: Profile Picture + Clean Gap + Social Icons right beneath it */}
          {safeProfile.profile_image_url && (
            <div className="hidden md:flex shrink-0 flex-col items-center justify-center pt-4 md:pt-0">
              <div className="relative">
                <div className="hidden dark:block absolute -inset-1 bg-white/5 rounded-3xl blur-xl opacity-20"></div>
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-[#dcdcdc] dark:border-[#3d4240] shadow-xl group bg-[var(--bg-card)]">
                  <img
                    src={safeProfile.profile_image_url}
                    alt={safeProfile.full_name || 'Eyosiyas'}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl backdrop-blur-md flex items-center justify-between text-xs font-medium shadow-md bg-white/90 dark:bg-[#292c2b] border border-[#dcdcdc] dark:border-[#3d4240] text-[var(--text)]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#222222] dark:bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#222222] dark:bg-white"></span>
                      </span>
                      Coding &amp; Building
                    </span>
                    <span className="text-[#222222] dark:text-amber-400 font-mono font-bold">ASTU</span>
                  </div>
                </div>
              </div>

              {/* Desktop Social Icons with professional gap from picture */}
              <div className="flex items-center gap-3.5 pt-5">
                {safeProfile.github_url && (
                  <a href={safeProfile.github_url} target="_blank" aria-label="GitHub"
                    className="p-3 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#222222] dark:hover:text-[#f4f4f5] shadow-sm">
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {safeProfile.linkedin_url && (
                  <a href={safeProfile.linkedin_url} target="_blank" aria-label="LinkedIn"
                    className="p-3 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#0A66C2] shadow-sm">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                )}
                {safeProfile.telegram_url && (
                  <a href={safeProfile.telegram_url} target="_blank" aria-label="Telegram"
                    className="p-3 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#229ED9] shadow-sm">
                    <FaTelegram className="w-5 h-5" />
                  </a>
                )}
                {safeProfile.instagram_url && (
                  <a href={safeProfile.instagram_url} target="_blank" aria-label="Instagram"
                    className="p-3 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#E4405F] shadow-sm">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ── Experience & Timeline ───────────────────────────── */}
        <RevealOnScroll>
          <section id="experience" className="scroll-mt-28 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#ffffff] text-[#222222] border border-[#dcdcdc] shadow-sm dark:bg-[#292c2b] dark:text-[#f4f4f5] dark:border-[#3d4240]">
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight">Experience & Education</h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">Academic milestones, internships &amp; engineering journey</p>
              </div>
            </div>

            {experiences.length > 0 ? (
              <div className="relative border-l-2 border-[#222222]/30 dark:border-[#f4f4f5]/30 ml-4 sm:ml-6 space-y-8 py-2">
                {experiences.map((exp: any) => (
                  <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-[#222222] dark:border-[#f4f4f5] bg-[var(--bg)] group-hover:scale-125 transition duration-300 shadow-md"></div>
                    
                    <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-[var(--border)] hover:border-[#222222]/40 dark:hover:border-[#f4f4f5]/40 shadow-md transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-[var(--text)]">
                          {exp.role} <span className="text-[#222222] dark:text-[#f4f4f5] font-medium">@ {exp.company}</span>
                        </h3>
                        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-[#222222]/5 border border-[#222222]/20 text-[#222222] dark:bg-[#f4f4f5]/10 dark:border-[#f4f4f5]/30 dark:text-[#f4f4f5] font-semibold">
                          {exp.period}
                        </span>
                      </div>
                      <span className="inline-block text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)] mb-3">
                        {exp.type}
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed text-[var(--text-muted)]">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-4 p-6 rounded-2xl border border-dashed border-[#222222]/20 bg-[#ffffff] dark:border-[#3d4240] dark:bg-[#292c2b] text-[var(--text-muted)]">
                <span className="text-[#222222] dark:text-[#f4f4f5] text-2xl">🚧</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">Experience coming soon</p>
                  <p className="text-xs mt-0.5">Internships, projects and education will appear here.</p>
                </div>
              </div>
            )}

            {/* View Projects CTA Button moved here */}
            <div className="pt-2">
              <a href="#projects" className="inline-block px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-center text-sm sm:text-base transition-all duration-300 bg-[#222222] text-white hover:bg-black dark:bg-[#f4f4f5] dark:text-[#1d1f1e] dark:hover:bg-white dark:hover:opacity-95 hover:scale-105 shadow-lg shadow-black/10 dark:shadow-black/20">
                View Projects →
              </a>
            </div>
          </section>
        </RevealOnScroll>

        {/* ── Projects (Crystal Clear Background Images) ─────── */}
        <RevealOnScroll>
          <section id="projects" className="scroll-mt-28 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#ffffff] text-[#222222] border border-[#dcdcdc] shadow-sm dark:bg-[#292c2b] dark:text-[#f4f4f5] dark:border-[#3d4240]">
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight">Featured Projects</h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">High-performance enterprise systems &amp; web applications</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project: any) => (
                <div
                  key={project.id}
                  className="relative rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col justify-between group min-h-[380px] sm:min-h-[400px] border-[var(--border)] hover:border-[#222222]/40 dark:hover:border-[#f4f4f5]/40 hover:shadow-xl bg-[var(--bg-card)] shadow-md"
                >
                  {/* Background Project Image - Crystal Clear (No Blur) */}
                  {project.image_url ? (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-1000 ease-out opacity-100 dark:opacity-85"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/75 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg)] dark:to-[#292c2b]/30"></div>
                  )}

                  <div className="relative z-10 p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider shadow-sm bg-[#222222]/5 border border-[#222222]/20 text-[#222222] dark:bg-[#f4f4f5]/10 dark:border-[#f4f4f5]/30 dark:text-[#f4f4f5] font-semibold backdrop-blur-md">
                        ENTERPRISE SYSTEM
                      </span>
                    </div>

                    <div className="space-y-2.5 pt-4 sm:pt-6">
                      <h3 className="text-lg sm:text-2xl font-extrabold transition text-[var(--text)] group-hover:text-[#222222] dark:group-hover:text-[#f4f4f5] drop-shadow-md">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed max-h-28 sm:max-h-32 overflow-y-auto pr-1 text-[var(--text)] bg-[var(--bg-card)]/90 border border-[var(--border)] p-3 rounded-xl shadow-sm font-normal backdrop-blur-md">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech_stack?.map((tech: string, i: number) => (
                          <span key={i} className="text-[11px] sm:text-xs px-2.5 py-1 rounded-md font-mono shadow-sm bg-[var(--bg-card)]/90 text-[#222222] dark:text-[#f4f4f5] border border-[var(--border)] font-medium backdrop-blur-md">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-xs sm:text-sm font-medium pt-3 border-t -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 p-4 sm:p-6 border-[var(--border)] bg-[var(--bg-card)]/90 backdrop-blur-md">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank"
                            className="flex items-center gap-1.5 transition rounded-xl border px-3 py-2 text-[var(--text)] bg-[var(--bg-card)] border-[var(--border)] hover:border-[#222222] dark:hover:border-[#f4f4f5] shadow-sm">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            Source Code
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank"
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition font-bold ml-auto shadow-md bg-[#222222] text-white hover:bg-black dark:bg-[#f4f4f5] dark:text-[#1d1f1e] dark:hover:bg-white dark:hover:opacity-95">
                            Live Preview →
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* ── Skills (Icon-Based Standard Showcase) ─────────────── */}
        <RevealOnScroll>
          <SkillsSection skills={skills} />
        </RevealOnScroll>

        {/* ── Testimonials / Recommendations ───────────────────── */}
        {testimonials.length > 0 && (
          <RevealOnScroll>
            <section id="testimonials" className="scroll-mt-28 space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#ffffff] text-[#222222] border border-[#dcdcdc] shadow-sm dark:bg-[#292c2b] dark:text-[#f4f4f5] dark:border-[#3d4240]">
                  <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold tracking-tight">Recommendations & Testimonials</h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)]">Endorsements from professors and mentors</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((item: any) => (
                  <div
                    key={item.id}
                    className="rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#222222]/40 dark:hover:border-[#f4f4f5]/40 shadow-md relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-6 text-6xl font-serif text-[#222222]/10 dark:text-[#f4f4f5]/10 select-none pointer-events-none">“</div>
                    <p className="text-sm sm:text-base leading-relaxed text-[var(--text)] italic relative z-10 mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3.5 pt-4 border-t border-[var(--border)]">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.author}
                          className="w-11 h-11 rounded-xl object-cover border border-[#222222]/30 dark:border-[#f4f4f5]/30 shadow-md shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-[#222222] text-white dark:bg-[#f4f4f5] dark:text-[#1d1f1e] flex items-center justify-center font-bold text-sm shadow-md shrink-0">
                          {item.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text)]">{item.author}</h3>
                        <p className="text-xs text-[#222222] dark:text-amber-400 font-medium">{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </RevealOnScroll>
        )}

        {/* ── Contact & Map (Map Hidden on Mobile, Visible on Desktop) ── */}
        <RevealOnScroll>
          <section id="contact" className="scroll-mt-28 space-y-6 sm:space-y-8 pt-10 sm:pt-12 border-t border-[var(--border)]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#ffffff] text-[#222222] border border-[#dcdcdc] shadow-sm dark:bg-[#292c2b] dark:text-[#f4f4f5] dark:border-[#3d4240]">
                  <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold tracking-tight">Get In Touch</h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)]">Let&apos;s build something exceptional together</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono shadow-md bg-[#ffffff] border border-[#dcdcdc] text-[#222222] dark:bg-[#292c2b] dark:border-[#3d4240] dark:text-[#f4f4f5] font-semibold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#222222] dark:bg-[#f4f4f5] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#222222] dark:bg-[#f4f4f5]"></span>
                </span>
                {safeContact.availability_status || 'Available for Opportunities'}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* Left: Contact Form Card (Spans full width on mobile, 7 cols on desktop) */}
              <div className="lg:col-span-7 rounded-2xl p-5 sm:p-7 space-y-5 shadow-lg flex flex-col justify-between transition-all duration-300 bg-[var(--bg-card)] border border-[var(--border)] hover:border-[#222222]/40 dark:hover:border-[#f4f4f5]/40">
                <div>
                  <h3 className="text-base font-bold mb-1 text-[var(--text)]">Send a Message</h3>
                  <p className="text-xs text-[var(--text-muted)]">Have a project in mind or want to collaborate? Drop me a note below.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl border bg-[var(--bg)] border-[var(--border)] shadow-sm">
                    <span className="text-[#222222] dark:text-[#f4f4f5] text-sm">📧</span>
                    <div className="truncate flex-1">
                      <p className="text-[9px] uppercase font-mono text-[var(--text-faint)] font-semibold">Email</p>
                      <a href={`mailto:${safeContact.email}`} className="text-xs font-medium truncate transition text-[var(--text)] hover:text-[#222222] dark:hover:text-[#f4f4f5]">
                        {safeContact.email}
                      </a>
                    </div>
                    <CopyEmail email={safeContact.email} />
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl border bg-[var(--bg)] border-[var(--border)] shadow-sm">
                    <span className="text-[#222222] dark:text-[#f4f4f5] text-sm">📍</span>
                    <div>
                      <p className="text-[9px] uppercase font-mono text-[var(--text-faint)] font-semibold">Location</p>
                      <p className="text-xs font-medium text-[var(--text)]">{safeContact.location}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--border)]">
                  <ContactForm />
                </div>
              </div>

              {/* Right: Map Embed Component (Hidden on mobile via `hidden lg:flex`, fully visible on desktop) */}
              <div className="hidden lg:flex lg:col-span-5 relative rounded-2xl overflow-hidden border transition-all duration-300 group min-h-[300px] sm:min-h-[320px] border-[var(--border)] hover:border-[#222222]/40 dark:hover:border-[#f4f4f5]/40 shadow-lg bg-[var(--bg-card)] flex-col justify-between">
                <MapEmbed location={safeContact.location} />

                <div className="relative z-10 p-3 sm:p-4 pointer-events-none flex justify-between items-start">
                  <div className="bg-[var(--bg-card)]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[var(--border)] shadow-md">
                    <h3 className="text-xs font-bold text-[var(--text)]">Based In</h3>
                    <p className="text-[10px] text-[var(--text-muted)]">{safeContact.location}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl backdrop-blur-md text-[10px] font-mono font-semibold text-[#222222] dark:text-[#f4f4f5] bg-[var(--bg-card)]/90 border border-[var(--border)] shadow-md">
                    Ethiopia
                  </span>
                </div>

                <div className="relative z-10 p-3 sm:p-4 pointer-events-none mt-auto">
                  <div className="inline-flex backdrop-blur-md items-center gap-2 shadow-md px-3 py-1.5 rounded-xl bg-[var(--bg-card)]/90 border border-[var(--border)]">
                    <span className="w-2 h-2 rounded-full bg-[#222222] dark:bg-[#f4f4f5] animate-pulse"></span>
                    <span className="text-[10px] sm:text-[11px] font-mono font-semibold text-[var(--text)]">ASTU Region — Open for Roles</span>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </RevealOnScroll>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t transition-colors duration-300 border-[var(--border)] bg-[var(--bg-card)] shadow-inner">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <span className="font-extrabold text-sm tracking-wider text-[#222222] dark:text-amber-400">
              EYOSIYAS<span className="text-[#222222] dark:text-amber-400">.</span>
            </span>

            <span className="hidden sm:block text-[var(--text-faint)]">|</span>
            <span className="hidden sm:block text-[11px] font-mono text-[var(--text-muted)]">Full-Stack Dev · ASTU</span>
          </div>

          <nav className="flex items-center justify-center gap-4 sm:gap-5 text-[11px] font-medium text-[var(--text-muted)]">
            <a href="#about"   className="hover:text-[#222222] dark:hover:text-[#f4f4f5] transition">About</a>
            <a href="#experience" className="hover:text-[#222222] dark:hover:text-[#f4f4f5] transition">Experience</a>
            <a href="#projects" className="hover:text-[#222222] dark:hover:text-[#f4f4f5] transition">Projects</a>
            <a href="#skills"   className="hover:text-[#222222] dark:hover:text-[#f4f4f5] transition">Skills</a>
            {testimonials.length > 0 && (
              <a href="#testimonials" className="hover:text-[#222222] dark:hover:text-[#f4f4f5] transition">Testimonials</a>
            )}
            <a href="#contact"  className="hover:text-[#222222] dark:hover:text-[#f4f4f5] transition">Contact</a>
          </nav>

          <div className="flex items-center justify-center sm:justify-end gap-3">
            {safeProfile.github_url && (
              <a href={safeProfile.github_url} target="_blank" aria-label="GitHub"
                className="transition-all duration-200 hover:scale-110 text-[var(--text-muted)] hover:text-[var(--text)] dark:hover:text-[#f4f4f5]">
                <FaGithub className="w-4 h-4" />
              </a>
            )}
            {safeProfile.linkedin_url && (
              <a href={safeProfile.linkedin_url} target="_blank" aria-label="LinkedIn"
                className="transition-all duration-200 hover:scale-110 text-[var(--text-muted)] hover:text-[#0A66C2]">
                <FaLinkedin className="w-4 h-4" />
              </a>
            )}
            {safeProfile.telegram_url && (
              <a href={safeProfile.telegram_url} target="_blank" aria-label="Telegram"
                className="transition-all duration-200 hover:scale-110 text-[var(--text-muted)] hover:text-[#229ED9]">
                <FaTelegram className="w-4 h-4" />
              </a>
            )}
            {safeProfile.instagram_url && (
              <a href={safeProfile.instagram_url} target="_blank" aria-label="Instagram"
                className="transition-all duration-200 hover:scale-110 text-[var(--text-muted)] hover:text-[#E4405F]">
                <FaInstagram className="w-4 h-4" />
              </a>
            )}
            <span className="hidden sm:block text-[var(--text-faint)]">|</span>
            <span className="text-[11px] text-[var(--text-muted)]">© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}