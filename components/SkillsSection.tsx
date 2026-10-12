'use client';

import React from 'react';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiPhp,
  SiExpress,
  SiNodedotjs,
  SiSqlite,
  SiPrisma,
  SiMysql,
  SiPostgresql,
  SiGit,
  SiGithub,
  SiVercel,
  SiPostman,
  SiLinux,
  SiRender,
  SiDocker,
  SiPython,
  SiMongodb,
} from 'react-icons/si';
import { FaJava, FaCode } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';

interface SkillItem {
  id?: number | string;
  name: string;
  category?: string;
  proficiency_level?: number;
}

interface SkillsSectionProps {
  skills?: SkillItem[];
}

interface TechBadgeDef {
  icon: React.ReactNode;
  displayName: string;
}

// Map each technology name (case-insensitive) to its authentic visual icon badge
const getTechBadge = (name: string): TechBadgeDef => {
  const normalized = name.trim().toLowerCase();

  switch (normalized) {
    case 'html':
    case 'html5':
      return {
        displayName: 'HTML',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#E44D26] flex items-center justify-center text-white shadow-xs">
            <SiHtml5 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
          </div>
        ),
      };

    case 'css':
    case 'css3':
      return {
        displayName: 'CSS',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#1572B6] flex items-center justify-center text-white shadow-xs">
            <SiCss className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
          </div>
        ),
      };

    case 'javascript':
    case 'js':
      return {
        displayName: 'JavaScript',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#F7DF1E] flex items-center justify-center text-black shadow-xs font-bold">
            <SiJavascript className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-black" />
          </div>
        ),
      };

    case 'typescript':
    case 'ts':
      return {
        displayName: 'TypeScript',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#3178C6] flex items-center justify-center text-white shadow-xs font-bold">
            <SiTypescript className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
          </div>
        ),
      };

    case 'next.js':
    case 'nextjs':
    case 'next':
      return {
        displayName: 'Next.js',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-black border border-white/20 flex items-center justify-center text-white shadow-xs">
            <SiNextdotjs className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
          </div>
        ),
      };

    case 'react':
    case 'react.js':
    case 'reactjs':
      return {
        displayName: 'React',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#00212B]/90 dark:bg-black/60 flex items-center justify-center shadow-xs">
            <SiReact className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#61DAFB] animate-[spin_24s_linear_infinite]" />
          </div>
        ),
      };

    case 'tailwind css':
    case 'tailwind':
    case 'tailwindcss':
      return {
        displayName: 'Tailwind CSS',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#0F172A] flex items-center justify-center shadow-xs">
            <SiTailwindcss className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#38BDF8]" />
          </div>
        ),
      };

    case 'php':
      return {
        displayName: 'PHP',
        icon: (
          <div className="w-8 h-6 sm:w-9 sm:h-6.5 rounded-full bg-[#777BB4] flex items-center justify-center text-white shadow-xs">
            <SiPhp className="w-6 h-4 sm:w-7 sm:h-4.5 text-white" />
          </div>
        ),
      };

    case 'express':
    case 'express.js':
    case 'expressjs':
      return {
        displayName: 'Express',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white shadow-xs font-bold">
            <SiExpress className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[var(--text)]" />
          </div>
        ),
      };

    case 'node.js':
    case 'nodejs':
    case 'node':
      return {
        displayName: 'Node.js',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#333333]/40 flex items-center justify-center shadow-xs">
            <SiNodedotjs className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#5FA04E]" />
          </div>
        ),
      };

    case 'java':
      return {
        displayName: 'Java',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#5382A1]/20 flex items-center justify-center shadow-xs">
            <FaJava className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#E76F00]" />
          </div>
        ),
      };

    case 'sqlite':
    case 'sqlite3':
      return {
        displayName: 'SQLite',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#003B57]/20 flex items-center justify-center shadow-xs">
            <SiSqlite className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#003B57] dark:text-[#28B0FF]" />
          </div>
        ),
      };

    case 'prisma':
    case 'prisma orm':
      return {
        displayName: 'Prisma ORM',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shadow-xs">
            <SiPrisma className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[var(--text)]" />
          </div>
        ),
      };

    case 'mysql':
      return {
        displayName: 'MySQL',
        icon: (
          <div className="w-8 h-7 sm:w-8.5 sm:h-7.5 rounded-lg bg-[#005E86]/10 flex items-center justify-center shadow-xs">
            <SiMysql className="w-6 h-5 sm:w-7 sm:h-5.5 text-[#4479A1]" />
          </div>
        ),
      };

    case 'postgresql':
    case 'postgres':
      return {
        displayName: 'PostgreSQL',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#336791]/15 flex items-center justify-center shadow-xs">
            <SiPostgresql className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#336791] dark:text-[#5295CD]" />
          </div>
        ),
      };

    case 'git':
      return {
        displayName: 'Git',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#F05032]/10 flex items-center justify-center shadow-xs">
            <SiGit className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#F05032]" />
          </div>
        ),
      };

    case 'github':
    case 'git & github':
      return {
        displayName: 'GitHub',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white shadow-xs">
            <SiGithub className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
          </div>
        ),
      };

    case 'vercel':
      return {
        displayName: 'Vercel',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white shadow-xs">
            <SiVercel className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
          </div>
        ),
      };

    case 'postman':
      return {
        displayName: 'Postman',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#FF6C37] flex items-center justify-center text-white shadow-xs">
            <SiPostman className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
          </div>
        ),
      };

    case 'linux':
      return {
        displayName: 'Linux',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/20 flex items-center justify-center shadow-xs">
            <SiLinux className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#FCC624]" />
          </div>
        ),
      };

    case 'vs code':
    case 'vscode':
    case 'visual studio code':
      return {
        displayName: 'VS Code',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#007ACC]/10 flex items-center justify-center shadow-xs">
            <VscVscode className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#007ACC]" />
          </div>
        ),
      };

    case 'render':
      return {
        displayName: 'Render',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/30 flex items-center justify-center shadow-xs">
            <SiRender className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#46E3B7]" />
          </div>
        ),
      };

    case 'docker':
      return {
        displayName: 'Docker',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#2496ED]/10 flex items-center justify-center shadow-xs">
            <SiDocker className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2496ED]" />
          </div>
        ),
      };

    case 'python':
      return {
        displayName: 'Python',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#3776AB]/15 flex items-center justify-center shadow-xs">
            <SiPython className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#3776AB]" />
          </div>
        ),
      };

    case 'mongodb':
      return {
        displayName: 'MongoDB',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#47A248]/10 flex items-center justify-center shadow-xs">
            <SiMongodb className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#47A248]" />
          </div>
        ),
      };

    default:
      return {
        displayName: name,
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] shadow-xs">
            <FaCode className="w-4 h-4" />
          </div>
        ),
      };
  }
};

interface CategoryGroup {
  key: string;
  title: string;
  subtitle: string;
  defaultItems: string[];
}

const CATEGORIES: CategoryGroup[] = [
  {
    key: 'frontend',
    title: 'Frontend & Languages',
    subtitle: 'Web technologies & modern UI',
    defaultItems: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Next.js', 'React', 'Tailwind CSS'],
  },
  {
    key: 'backend',
    title: 'Backend & Frameworks',
    subtitle: 'Server-side development & APIs',
    defaultItems: ['PHP', 'Express', 'Node.js'],
  },
  {
    key: 'database',
    title: 'Databases & ORMs',
    subtitle: 'Data management & database tools',
    defaultItems: ['SQLite', 'Prisma ORM', 'MySQL', 'PostgreSQL'],
  },
  {
    key: 'tools',
    title: 'Tools & Version Control',
    subtitle: 'Development tools & workflow',
    defaultItems: ['Git', 'GitHub', 'Vercel', 'Postman', 'Linux'],
  },
];

export default function SkillsSection({ skills = [] }: SkillsSectionProps) {
  // Build category item sets by combining standard showcase skills with any database skills
  const categorizedSkills = CATEGORIES.map((cat) => {
    // Collect all skill names for this category
    const itemsMap = new Map<string, string>();

    // First add the standard showcase items from the design
    cat.defaultItems.forEach((item) => {
      itemsMap.set(item.toLowerCase(), item);
    });

    // Then merge any database skills that match this category
    skills.forEach((s) => {
      const catLower = (s.category || '').toLowerCase();
      const isMatch =
        (cat.key === 'frontend' && (catLower.includes('front') || catLower.includes('lang'))) ||
        (cat.key === 'backend' && (catLower.includes('back') || catLower.includes('framework'))) ||
        (cat.key === 'database' && (catLower.includes('data') || catLower.includes('orm') || catLower.includes('db'))) ||
        (cat.key === 'tools' && (catLower.includes('tool') || catLower.includes('version') || catLower.includes('devops')));

      if (isMatch) {
        // If DB has "Git & GitHub", make sure both Git and GitHub are present
        if (s.name.toLowerCase().includes('git & github')) {
          itemsMap.set('git', 'Git');
          itemsMap.set('github', 'GitHub');
        } else {
          itemsMap.set(s.name.toLowerCase(), s.name);
        }
      }
    });

    return {
      ...cat,
      items: Array.from(itemsMap.values()),
    };
  });

  return (
    <section id="skills" className="scroll-mt-28">
      {/* Outer Card Container - Compact & balanced with About section */}
      <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-7 transition-all duration-300 bg-[var(--bg-card)] border border-[var(--border)] shadow-lg">
        
        {/* Header: Title & Subtitle */}
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
            My Skills
          </h2>
          <p className="mt-1 text-xs sm:text-[13px] text-[var(--text-muted)] leading-relaxed">
            I work with modern technologies to build fast, responsive and scalable web applications.
          </p>
        </div>

        {/* Rows by Category */}
        <div className="space-y-3 sm:space-y-3.5">
          {categorizedSkills.map((category, index) => (
            <div
              key={category.key}
              className={`flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-5 ${
                index < categorizedSkills.length - 1 ? 'pb-3 sm:pb-3.5 border-b border-[var(--border)]/35' : ''
              }`}
            >
              {/* Left Column: Vertical Bar + Title & Subtitle */}
              <div className="flex items-center gap-2.5 w-full md:w-52 lg:w-56 shrink-0">
                <span className="w-1 h-7 sm:h-8 rounded-full bg-[#222222] dark:bg-[#f4f4f5] shrink-0" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[var(--text)] tracking-tight">
                    {category.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-[var(--text-muted)] font-normal leading-tight">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Column: Grid / Flex of Skill Cards */}
              <div className="flex-1 flex flex-wrap gap-2 sm:gap-2.5 items-center">
                {category.items.map((techName) => {
                  const badge = getTechBadge(techName);
                  return (
                    <div
                      key={techName}
                      className="group relative w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] md:w-[66px] md:h-[66px] rounded-xl bg-[var(--bg)] border border-[var(--border)] hover:border-[#222222]/40 dark:hover:border-[#f4f4f5]/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 flex flex-col items-center justify-center p-1 sm:p-1.5 cursor-default select-none"
                    >
                      <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                        {badge.icon}
                      </div>
                      <span className="text-[9.5px] sm:text-[10px] md:text-[10.5px] font-semibold text-[var(--text)] tracking-tight text-center truncate w-full mt-1 transition-colors group-hover:text-[#222222] dark:group-hover:text-[#f4f4f5]">
                        {badge.displayName}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
