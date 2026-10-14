'use client';

import React from 'react';
import { SkillCard } from './SkillBadge';

export interface SkillItem {
  id?: number | string;
  name: string;
  category: string;
  proficiency_level?: number;
}

interface SkillsSectionProps {
  skills?: SkillItem[];
}

interface CategoryConfig {
  title: string;
  subtitle: string;
  priority: number;
}

// Known category display configurations
const KNOWN_CATEGORIES: { [key: string]: CategoryConfig } = {
  frontend: {
    title: 'Frontend & Languages',
    subtitle: 'Web technologies & modern UI',
    priority: 1,
  },
  backend: {
    title: 'Backend & Frameworks',
    subtitle: 'Server-side development & APIs',
    priority: 2,
  },
  database: {
    title: 'Databases & ORMs',
    subtitle: 'Data management & database tools',
    priority: 3,
  },
  databases: {
    title: 'Databases & ORMs',
    subtitle: 'Data management & database tools',
    priority: 3,
  },
  tools: {
    title: 'Tools & Version Control',
    subtitle: 'Development tools & workflow',
    priority: 4,
  },
  devops: {
    title: 'DevOps & Cloud',
    subtitle: 'CI/CD, containers & cloud infrastructure',
    priority: 5,
  },
  cloud: {
    title: 'Cloud & Infrastructure',
    subtitle: 'Cloud services, hosting & deployment',
    priority: 6,
  },
  mobile: {
    title: 'Mobile Development',
    subtitle: 'Cross-platform & native mobile apps',
    priority: 7,
  },
  ai: {
    title: 'AI & Machine Learning',
    subtitle: 'Intelligent systems & model workflows',
    priority: 8,
  },
  design: {
    title: 'UI/UX & Design',
    subtitle: 'Interface design & design systems',
    priority: 9,
  },
};

export default function SkillsSection({ skills = [] }: SkillsSectionProps) {
  // If no skills are in database, show friendly empty state
  if (!skills || skills.length === 0) {
    return (
      <section id="skills" className="scroll-mt-28">
        <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 transition-all duration-300 bg-[var(--bg-card)] border border-[var(--border)] shadow-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--text)]">
            My Skills
          </h2>
          <p className="mt-2 text-xs sm:text-[13px] text-[var(--text-muted)]">
            Technical skills will appear here shortly. Add them via the Admin Panel.
          </p>
        </div>
      </section>
    );
  }

  // Dynamically group skills by their category from DB
  const groupedCategoriesMap = new Map<string, { rawCategory: string; items: SkillItem[] }>();

  skills.forEach((skill) => {
    const rawCat = (skill.category || 'Other').trim();
    const key = rawCat.toLowerCase();

    if (!groupedCategoriesMap.has(key)) {
      groupedCategoriesMap.set(key, { rawCategory: rawCat, items: [] });
    }
    groupedCategoriesMap.get(key)!.items.push(skill);
  });

  // Convert map to sorted category list
  const categoryList = Array.from(groupedCategoriesMap.entries()).map(([key, group]) => {
    const known = KNOWN_CATEGORIES[key];

    // Priority resolution
    let priority = 100;
    let title = group.rawCategory;
    let subtitle = 'Technologies & frameworks';

    if (known) {
      priority = known.priority;
      title = known.title;
      subtitle = known.subtitle;
    } else {
      // Fuzzy matching for custom categories
      if (key.includes('front')) {
        priority = 1;
        title = group.rawCategory.includes('&') ? group.rawCategory : 'Frontend & UI';
        subtitle = 'Web technologies & client development';
      } else if (key.includes('back') || key.includes('server') || key.includes('api')) {
        priority = 2;
        title = group.rawCategory.includes('&') ? group.rawCategory : 'Backend & Architecture';
        subtitle = 'Server-side development & APIs';
      } else if (key.includes('data') || key.includes('orm') || key.includes('sql')) {
        priority = 3;
        title = group.rawCategory.includes('&') ? group.rawCategory : 'Databases & Storage';
        subtitle = 'Data management & database systems';
      } else if (key.includes('tool') || key.includes('version') || key.includes('git')) {
        priority = 4;
        title = group.rawCategory.includes('&') ? group.rawCategory : 'Tools & Workflow';
        subtitle = 'Development tools & version control';
      } else if (key.includes('devops') || key.includes('cloud') || key.includes('infra')) {
        priority = 5;
        subtitle = 'Deployment, CI/CD & cloud services';
      } else if (key.includes('mobile')) {
        priority = 6;
        subtitle = 'Mobile application development';
      } else if (key.includes('ai') || key.includes('ml') || key.includes('learn')) {
        priority = 7;
        subtitle = 'Artificial intelligence & algorithms';
      } else if (key.includes('design') || key.includes('ux') || key.includes('ui')) {
        priority = 8;
        subtitle = 'Interface design & prototyping';
      }
    }

    // Sort items inside category by proficiency level (descending)
    const sortedItems = [...group.items].sort((a, b) => {
      const profA = a.proficiency_level ?? 0;
      const profB = b.proficiency_level ?? 0;
      if (profB !== profA) return profB - profA;
      return a.name.localeCompare(b.name);
    });

    return {
      key,
      title,
      subtitle,
      priority,
      items: sortedItems,
    };
  });

  // Sort categories by priority, then alphabetically
  categoryList.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return a.title.localeCompare(b.title);
  });

  return (
    <section id="skills" className="scroll-mt-28">
      {/* Outer Card Container - Compact & balanced */}
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

        {/* Rows by Category (100% Dynamic from Database) */}
        <div className="space-y-3 sm:space-y-3.5">
          {categoryList.map((category, index) => (
            <div
              key={category.key}
              className={`flex flex-col md:flex-row md:items-center justify-between gap-2.5 md:gap-5 ${
                index < categoryList.length - 1 ? 'pb-3 sm:pb-3.5 border-b border-[var(--border)]/35' : ''
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
                {category.items.map((skill) => (
                  <SkillCard
                    key={skill.id ?? skill.name}
                    name={skill.name}
                    proficiency={skill.proficiency_level}
                    interactive={true}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
