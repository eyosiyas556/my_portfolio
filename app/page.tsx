import { connection } from 'next/server';
import { query } from '@/lib/db';
import ContactForm from '@/components/ContactForm';
import TypewriterTitle from '@/components/TypewriterTitle';
import Navbar from '@/components/Navbar';
import MapEmbed from '@/components/MapEmbed';
import CopyEmail from '@/components/CopyEmail';
import RevealOnScroll from '@/components/RevealOnScroll';
import { FaGithub, FaLinkedin, FaTelegram, FaInstagram } from 'react-icons/fa';

//export const dynamic = 'force-dynamic';

export default async function Home() {
  await connection();

  const profileRows = await query('SELECT * FROM profile LIMIT 1');
  const profile = profileRows[0] || {};

  const contactRows = await query('SELECT * FROM contact_info LIMIT 1');
  const contactInfo = contactRows[0] || {
    email: 'eyosiyas@example.com',
    location: 'Adama, Ethiopia',
    availability_status: 'Available for Opportunities',
    phone: ''
  };

  const experiences = await query('SELECT * FROM experiences ORDER BY id DESC');
  const projects = await query('SELECT * FROM projects ORDER BY created_at DESC');
  const skills = await query('SELECT * FROM skills ORDER BY category, proficiency_level DESC');
  
  // Fetch testimonials directly from database
  let testimonials: any[] = [];
  try {
    testimonials = await query('SELECT * FROM testimonials ORDER BY created_at DESC');
  } catch {
    testimonials = [];
  }

  const groupedSkills: { [key: string]: any[] } = skills.reduce((acc: any, skill: any) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="min-h-screen overflow-x-hidden transition-colors duration-300 bg-[var(--bg)] text-[var(--text)]">

      {/* Fixed Navbar */}
      <Navbar />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-20 sm:pb-28 space-y-10 sm:space-y-16">

        {/* ── Hero ────────────────────────────────────────────── */}
        <section id="about" className="scroll-mt-28 py-2 sm:py-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">

          <div className="flex-1 space-y-4 text-center md:text-left w-full">

            {/* ASTU Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm tracking-wide bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
              Software Engineering Student at ASTU
            </div>

            {/* MOBILE ONLY: Title & Image + Socials grouped tightly together */}
            <div className="space-y-3 md:space-y-0">
              <div className="w-full text-[var(--text)] flex justify-center md:justify-start">
                <TypewriterTitle
                  fullName={profile.full_name || 'Eyosiyas Fisseha Birhanie'}
                  title={profile.title || 'Full-Stack Developer'}
                />
              </div>

              {profile.profile_image_url && (
                <div className="md:hidden relative pt-1 pb-1 flex flex-col items-center justify-center space-y-3">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
                    <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-xl group bg-[var(--bg-card)]">
                      <img
                        src={profile.profile_image_url}
                        alt={profile.full_name || 'Eyosiyas'}
                        className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/70 via-transparent to-transparent"></div>
                      <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-xl backdrop-blur-md flex items-center justify-between text-[11px] font-medium shadow-md bg-[var(--bg-card)]/90 border border-[var(--border)] text-[var(--text)]">
                        <span className="flex items-center gap-1.5 font-medium">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                          Coding &amp; Building
                        </span>
                        <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">ASTU</span>
                      </div>
                    </div>
                  </div>

                  {/* Social Icons Under Profile Picture (Mobile) */}
                  <div className="flex items-center justify-center gap-3.5 pt-1">
                    {profile.github_url && (
                      <a href={profile.github_url} target="_blank" aria-label="GitHub"
                        className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-amber-600 dark:hover:text-amber-400 shadow-sm">
                        <FaGithub className="w-4 h-4" />
                      </a>
                    )}
                    {profile.linkedin_url && (
                      <a href={profile.linkedin_url} target="_blank" aria-label="LinkedIn"
                        className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#0A66C2] shadow-sm">
                        <FaLinkedin className="w-4 h-4" />
                      </a>
                    )}
                    {profile.telegram_url && (
                      <a href={profile.telegram_url} target="_blank" aria-label="Telegram"
                        className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#229ED9] shadow-sm">
                        <FaTelegram className="w-4 h-4" />
                      </a>
                    )}
                    {profile.instagram_url && (
                      <a href={profile.instagram_url} target="_blank" aria-label="Instagram"
                        className="p-2.5 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#E4405F] shadow-sm">
                        <FaInstagram className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            <p className="text-sm sm:text-lg max-w-2xl leading-relaxed text-[var(--text-muted)] font-medium px-2 md:px-0 pt-2">
              {profile.bio || 'Driven software engineering student at ASTU specializing in full-stack web development and backend architecture. I build scalable, secure enterprise solutions and high-performance web applications designed to solve real-world problems and drive operational efficiency.'}
            </p>
          </div>

          {/* DESKTOP ONLY: Profile Picture + Clean Gap + Social Icons right beneath it */}
          {profile.profile_image_url && (
            <div className="hidden md:flex shrink-0 flex-col items-center justify-center pt-4 md:pt-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl blur-xl opacity-20 animate-pulse"></div>
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-xl group bg-[var(--bg-card)]">
                  <img
                    src={profile.profile_image_url}
                    alt={profile.full_name || 'Eyosiyas'}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-2 rounded-xl backdrop-blur-md flex items-center justify-between text-xs font-medium shadow-md bg-[var(--bg-card)]/90 border border-[var(--border)] text-[var(--text)]">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                      Coding &amp; Building
                    </span>
                    <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">ASTU</span>
                  </div>
                </div>
              </div>

              {/* Desktop Social Icons with professional gap from picture */}
              <div className="flex items-center gap-3.5 pt-5">
                {profile.github_url && (
                  <a href={profile.github_url} target="_blank" aria-label="GitHub"
                    className="p-3 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-amber-600 dark:hover:text-amber-400 shadow-sm">
                    <FaGithub className="w-5 h-5" />
                  </a>
                )}
                {profile.linkedin_url && (
                  <a href={profile.linkedin_url} target="_blank" aria-label="LinkedIn"
                    className="p-3 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#0A66C2] shadow-sm">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                )}
                {profile.telegram_url && (
                  <a href={profile.telegram_url} target="_blank" aria-label="Telegram"
                    className="p-3 rounded-xl border transition-all duration-300 hover:scale-110 bg-[var(--bg-card)] border-[var(--border)] text-[var(--text-muted)] hover:text-[#229ED9] shadow-sm">
                    <FaTelegram className="w-5 h-5" />
                  </a>
                )}
                {profile.instagram_url && (
                  <a href={profile.instagram_url} target="_blank" aria-label="Instagram"
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
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-inner">
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight">Experience & Education</h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">Academic milestones, internships &amp; engineering journey</p>
              </div>
            </div>

            {experiences.length > 0 ? (
              <div className="relative border-l-2 border-amber-500/30 ml-4 sm:ml-6 space-y-8 py-2">
                {experiences.map((exp: any) => (
                  <div key={exp.id} className="relative pl-6 sm:pl-8 group">
                    {/* Timeline Node Dot */}
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 border-amber-500 bg-[var(--bg)] group-hover:scale-125 transition duration-300 shadow-md"></div>
                    
                    <div className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-card)]/80 border border-[var(--border)] hover:border-amber-500/40 shadow-md transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <h3 className="text-base sm:text-lg font-bold text-[var(--text)]">
                          {exp.role} <span className="text-amber-600 dark:text-amber-400 font-medium">@ {exp.company}</span>
                        </h3>
                        <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-300 font-semibold">
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
              <div className="flex items-center gap-4 p-6 rounded-2xl border border-dashed border-amber-500/30 bg-amber-500/5 text-[var(--text-muted)]">
                <span className="text-amber-500 text-2xl">🚧</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text)]">Experience coming soon</p>
                  <p className="text-xs mt-0.5">Internships, projects and education will appear here.</p>
                </div>
              </div>
            )}

            {/* View Projects CTA Button moved here */}
            <div className="pt-2">
              <a href="#projects" className="inline-block px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-center text-sm sm:text-base transition-all duration-300 bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 hover:opacity-90 hover:scale-105 shadow-lg shadow-amber-500/20">
                View Projects →
              </a>
            </div>
          </section>
        </RevealOnScroll>

        {/* ── Projects ─────────────────────────────────────────── */}
        <RevealOnScroll>
          <section id="projects" className="scroll-mt-28 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-inner">
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
                  className="relative rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col justify-between group min-h-[380px] sm:min-h-[400px] border-[var(--border)] hover:border-amber-500/50 hover:shadow-xl bg-[var(--bg-card)] shadow-md"
                >
                  {/* Background Project Image */}
                  {project.image_url ? (
                    <div className="absolute inset-0 z-0">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-1000 ease-out opacity-75 dark:opacity-45"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/85 to-[var(--bg-card)]/40 backdrop-blur-[0.5px]"></div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-[var(--bg-card)] via-[var(--bg)] to-amber-500/5"></div>
                  )}

                  <div className="relative z-10 p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                    <div className="flex justify-between items-start">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider shadow-sm bg-amber-500/15 border border-amber-500/40 text-amber-700 dark:text-amber-400 font-semibold backdrop-blur-md">
                        ENTERPRISE SYSTEM
                      </span>
                    </div>

                    <div className="space-y-2.5 pt-4 sm:pt-6">
                      <h3 className="text-lg sm:text-2xl font-extrabold transition text-[var(--text)] group-hover:text-amber-600 dark:group-hover:text-amber-400 drop-shadow-sm">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed max-h-28 sm:max-h-32 overflow-y-auto pr-1 text-[var(--text)] bg-[var(--bg-card)]/90 border border-[var(--border)] p-3 rounded-xl shadow-sm font-normal backdrop-blur-md">
                        {project.description}
                      </p>
                    </div>

                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tech_stack?.map((tech: string, i: number) => (
                          <span key={i} className="text-[11px] sm:text-xs px-2.5 py-1 rounded-md font-mono shadow-sm bg-[var(--bg-card)]/90 text-amber-700 dark:text-amber-300 border border-[var(--border)] font-medium backdrop-blur-md">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 text-xs sm:text-sm font-medium pt-3 border-t -mx-5 sm:-mx-8 -mb-5 sm:-mb-8 p-4 sm:p-6 border-[var(--border)] bg-[var(--bg-card)]/90 backdrop-blur-md">
                        {project.github_url && (
                          <a href={project.github_url} target="_blank"
                            className="flex items-center gap-1.5 transition rounded-xl border px-3 py-2 text-[var(--text)] bg-[var(--bg-card)] border-[var(--border)] hover:border-amber-500 shadow-sm">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            Source Code
                          </a>
                        )}
                        {project.live_url && (
                          <a href={project.live_url} target="_blank"
                            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition font-bold ml-auto shadow-md bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 hover:opacity-90">
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

        {/* ── Skills (Responsive Grid) ─────────────────────────── */}
        <RevealOnScroll>
          <section id="skills" className="scroll-mt-28 space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-inner">
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-2xl font-bold tracking-tight">Technical Expertise</h2>
                <p className="text-xs sm:text-sm text-[var(--text-muted)]">Core technologies &amp; proficiency levels</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
              {Object.keys(groupedSkills).map((category) => (
                <div
                  key={category}
                  className="rounded-2xl p-5 sm:p-6 transition-all duration-300 flex flex-col justify-between group bg-[var(--bg-card)] border border-[var(--border)] hover:border-amber-500/40 shadow-md"
                >
                  <div>
                    <h3 className="text-sm sm:text-base font-bold mb-4 text-amber-600 dark:text-amber-400 pb-2.5 border-b border-[var(--border)] flex items-center justify-between">
                      <span className="truncate">{category}</span>
                      <span className="text-[9px] font-mono tracking-wider px-1.5 py-0.5 rounded border bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20 font-semibold shrink-0">
                        STACK
                      </span>
                    </h3>

                    <ul className="space-y-3">
                      {groupedSkills[category].map((skill: any) => (
                        <li key={skill.id} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-medium transition text-[var(--text)] group-hover:text-amber-600 dark:group-hover:text-amber-400 truncate pr-2">
                              {skill.name}
                            </span>
                            <span className="text-[11px] text-amber-600 dark:text-amber-400 font-mono font-bold shrink-0">{skill.proficiency_level}%</span>
                          </div>
                          <div className="w-full h-1.5 rounded-full overflow-hidden border bg-[var(--bg)] border-[var(--border)] shadow-inner">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${skill.proficiency_level}%` }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </RevealOnScroll>

        {/* ── Testimonials / Recommendations ───────────────────── */}
        {testimonials.length > 0 && (
          <RevealOnScroll>
            <section id="testimonials" className="scroll-mt-28 space-y-6 sm:space-y-8">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-inner">
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
                    className="rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between group bg-[var(--bg-card)] border border-[var(--border)] hover:border-amber-500/40 shadow-md relative overflow-hidden"
                  >
                    <div className="absolute top-4 right-6 text-6xl font-serif text-amber-500/10 select-none pointer-events-none">“</div>
                    <p className="text-sm sm:text-base leading-relaxed text-[var(--text)] italic relative z-10 mb-6">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-3.5 pt-4 border-t border-[var(--border)]">
                      {item.avatar ? (
                        <img
                          src={item.avatar}
                          alt={item.author}
                          className="w-11 h-11 rounded-xl object-cover border border-amber-500/40 shadow-md shrink-0"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-zinc-950 font-bold text-sm shadow-md shrink-0">
                          {item.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <h3 className="text-sm font-bold text-[var(--text)]">{item.author}</h3>
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">{item.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </RevealOnScroll>
        )}

        {/* ── Contact & Map ────────────────────────────────────── */}
        <RevealOnScroll>
          <section id="contact" className="scroll-mt-28 space-y-6 sm:space-y-8 pt-10 sm:pt-12 border-t border-[var(--border)]">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shadow-inner">
                  <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold tracking-tight">Get In Touch</h2>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)]">Let&apos;s build something exceptional together</p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] sm:text-xs font-mono shadow-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {contactInfo.availability_status || 'Available for Opportunities'}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

              {/* Left: Compact Contact Form Card */}
              <div className="lg:col-span-7 rounded-2xl p-5 sm:p-7 space-y-5 shadow-lg flex flex-col justify-between transition-all duration-300 bg-[var(--bg-card)] border border-[var(--border)] hover:border-amber-500/40">
                <div>
                  <h3 className="text-base font-bold mb-1 text-[var(--text)]">Send a Message</h3>
                  <p className="text-xs text-[var(--text-muted)]">Have a project in mind or want to collaborate? Drop me a note below.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl border bg-[var(--bg)] border-[var(--border)] shadow-sm">
                    <span className="text-amber-600 dark:text-amber-400 text-sm">📧</span>
                    <div className="truncate flex-1">
                      <p className="text-[9px] uppercase font-mono text-[var(--text-faint)] font-semibold">Email</p>
                      <a href={`mailto:${contactInfo.email}`} className="text-xs font-medium truncate transition text-[var(--text)] hover:text-amber-600 dark:hover:text-amber-400">
                        {contactInfo.email}
                      </a>
                    </div>
                    <CopyEmail email={contactInfo.email} />
                  </div>

                  <div className="flex items-center gap-2.5 p-3 rounded-xl border bg-[var(--bg)] border-[var(--border)] shadow-sm">
                    <span className="text-amber-600 dark:text-amber-400 text-sm">📍</span>
                    <div>
                      <p className="text-[9px] uppercase font-mono text-[var(--text-faint)] font-semibold">Location</p>
                      <p className="text-xs font-medium text-[var(--text)]">{contactInfo.location}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[var(--border)]">
                  <ContactForm />
                </div>
              </div>

              {/* Right: Map Embed Component with Theme-aware styling */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border transition-all duration-300 group min-h-[300px] sm:min-h-[320px] border-[var(--border)] hover:border-amber-500/40 shadow-lg bg-[var(--bg-card)] flex flex-col justify-between">
                <MapEmbed location={contactInfo.location} />

                <div className="relative z-10 p-3 sm:p-4 pointer-events-none flex justify-between items-start">
                  <div className="bg-[var(--bg-card)]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-[var(--border)] shadow-md">
                    <h3 className="text-xs font-bold text-[var(--text)]">Based In</h3>
                    <p className="text-[10px] text-[var(--text-muted)]">{contactInfo.location}</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-xl backdrop-blur-md text-[10px] font-mono font-semibold text-amber-700 dark:text-amber-400 bg-[var(--bg-card)]/90 border border-[var(--border)] shadow-md">
                    Ethiopia
                  </span>
                </div>

                <div className="relative z-10 p-3 sm:p-4 pointer-events-none mt-auto">
                  <div className="inline-flex backdrop-blur-md items-center gap-2 shadow-md px-3 py-1.5 rounded-xl bg-[var(--bg-card)]/90 border border-[var(--border)]">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
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
            <span className="font-extrabold text-sm tracking-wider bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 bg-clip-text text-transparent">
              EYOSIYAS<span className="text-amber-500">.</span>
            </span>

            <span className="hidden sm:block text-[var(--text-faint)]">|</span>
            <span className="hidden sm:block text-[11px] font-mono text-[var(--text-muted)]">Full-Stack Dev · ASTU</span>
          </div>

          <nav className="flex items-center justify-center gap-4 sm:gap-5 text-[11px] font-medium text-[var(--text-muted)]">
            <a href="#about"   className="hover:text-amber-600 dark:hover:text-amber-400 transition">About</a>
            <a href="#experience" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Experience</a>
            <a href="#projects" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Projects</a>
            <a href="#skills"   className="hover:text-amber-600 dark:hover:text-amber-400 transition">Skills</a>
            {testimonials.length > 0 && (
              <a href="#testimonials" className="hover:text-amber-600 dark:hover:text-amber-400 transition">Testimonials</a>
            )}
            <a href="#contact"  className="hover:text-amber-600 dark:hover:text-amber-400 transition">Contact</a>
          </nav>

          <div className="flex items-center justify-center sm:justify-end gap-3">
            {profile.github_url && (
              <a href={profile.github_url} target="_blank" aria-label="GitHub"
                className="transition-all duration-200 hover:scale-110 text-[var(--text-muted)] hover:text-[var(--text)]">
                <FaGithub className="w-4 h-4" />
              </a>
            )}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" aria-label="LinkedIn"
                className="transition-all duration-200 hover:scale-110 text-[var(--text-muted)] hover:text-[#0A66C2]">
                <FaLinkedin className="w-4 h-4" />
              </a>
            )}
            {profile.telegram_url && (
              <a href={profile.telegram_url} target="_blank" aria-label="Telegram"
                className="transition-all duration-200 hover:scale-110 text-[var(--text-muted)] hover:text-[#229ED9]">
                <FaTelegram className="w-4 h-4" />
              </a>
            )}
            {profile.instagram_url && (
              <a href={profile.instagram_url} target="_blank" aria-label="Instagram"
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