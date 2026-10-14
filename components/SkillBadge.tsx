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
  SiRedis,
  SiSupabase,
  SiFirebase,
  SiGraphql,
  SiSass,
  SiBootstrap,
  SiVite,
  SiJest,
  SiCplusplus,
  SiDotnet,
  SiGo,
  SiRust,
  SiKubernetes,
  SiGooglecloud,
  SiFigma,
  SiRedux,
  SiFlutter,
  SiDart,
  SiKotlin,
  SiSwift,
  SiWordpress,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiSpringboot,
} from 'react-icons/si';
import { FaJava, FaCode, FaAws } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { TbBrandCSharp } from 'react-icons/tb';

export interface TechBadgeDef {
  displayName: string;
  icon: React.ReactNode;
  brandColor?: string;
}

export const getTechBadge = (name: string): TechBadgeDef => {
  const normalized = (name || '').trim().toLowerCase();

  switch (normalized) {
    case 'html':
    case 'html5':
      return {
        displayName: 'HTML',
        brandColor: '#E44D26',
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
        brandColor: '#1572B6',
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
        brandColor: '#F7DF1E',
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
        brandColor: '#3178C6',
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
        brandColor: '#000000',
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
        brandColor: '#61DAFB',
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
        brandColor: '#38BDF8',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#0F172A] flex items-center justify-center shadow-xs">
            <SiTailwindcss className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#38BDF8]" />
          </div>
        ),
      };

    case 'php':
      return {
        displayName: 'PHP',
        brandColor: '#777BB4',
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
        brandColor: '#000000',
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
        brandColor: '#5FA04E',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#333333]/40 flex items-center justify-center shadow-xs">
            <SiNodedotjs className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#5FA04E]" />
          </div>
        ),
      };

    case 'java':
      return {
        displayName: 'Java',
        brandColor: '#E76F00',
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
        brandColor: '#003B57',
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
        brandColor: '#2D3748',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center shadow-xs">
            <SiPrisma className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[var(--text)]" />
          </div>
        ),
      };

    case 'mysql':
      return {
        displayName: 'MySQL',
        brandColor: '#4479A1',
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
        brandColor: '#336791',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#336791]/15 flex items-center justify-center shadow-xs">
            <SiPostgresql className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#336791] dark:text-[#5295CD]" />
          </div>
        ),
      };

    case 'git':
      return {
        displayName: 'Git',
        brandColor: '#F05032',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#F05032]/10 flex items-center justify-center shadow-xs">
            <SiGit className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#F05032]" />
          </div>
        ),
      };

    case 'github':
      return {
        displayName: 'GitHub',
        brandColor: '#181717',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white shadow-xs">
            <SiGithub className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
          </div>
        ),
      };

    case 'git & github':
      return {
        displayName: 'Git & GitHub',
        brandColor: '#F05032',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#F05032]/10 flex items-center justify-center shadow-xs">
            <SiGit className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#F05032]" />
          </div>
        ),
      };

    case 'vercel':
      return {
        displayName: 'Vercel',
        brandColor: '#000000',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-center text-white shadow-xs">
            <SiVercel className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
          </div>
        ),
      };

    case 'postman':
      return {
        displayName: 'Postman',
        brandColor: '#FF6C37',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#FF6C37] flex items-center justify-center text-white shadow-xs">
            <SiPostman className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" />
          </div>
        ),
      };

    case 'linux':
      return {
        displayName: 'Linux',
        brandColor: '#FCC624',
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
        brandColor: '#007ACC',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#007ACC]/10 flex items-center justify-center shadow-xs">
            <VscVscode className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#007ACC]" />
          </div>
        ),
      };

    case 'render':
      return {
        displayName: 'Render',
        brandColor: '#46E3B7',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/30 flex items-center justify-center shadow-xs">
            <SiRender className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#46E3B7]" />
          </div>
        ),
      };

    case 'docker':
      return {
        displayName: 'Docker',
        brandColor: '#2496ED',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#2496ED]/15 flex items-center justify-center shadow-xs">
            <SiDocker className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#2496ED]" />
          </div>
        ),
      };

    case 'python':
      return {
        displayName: 'Python',
        brandColor: '#3776AB',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#3776AB]/15 flex items-center justify-center shadow-xs">
            <SiPython className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#3776AB]" />
          </div>
        ),
      };

    case 'mongodb':
    case 'mongo':
      return {
        displayName: 'MongoDB',
        brandColor: '#47A248',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#47A248]/15 flex items-center justify-center shadow-xs">
            <SiMongodb className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#47A248]" />
          </div>
        ),
      };

    case 'redis':
      return {
        displayName: 'Redis',
        brandColor: '#DC382D',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#DC382D]/15 flex items-center justify-center shadow-xs">
            <SiRedis className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#DC382D]" />
          </div>
        ),
      };

    case 'supabase':
      return {
        displayName: 'Supabase',
        brandColor: '#3ECF8E',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#3ECF8E]/15 flex items-center justify-center shadow-xs">
            <SiSupabase className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#3ECF8E]" />
          </div>
        ),
      };

    case 'firebase':
      return {
        displayName: 'Firebase',
        brandColor: '#FFCA28',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#FFCA28]/15 flex items-center justify-center shadow-xs">
            <SiFirebase className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#FFA611]" />
          </div>
        ),
      };

    case 'graphql':
      return {
        displayName: 'GraphQL',
        brandColor: '#E10098',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#E10098]/15 flex items-center justify-center shadow-xs">
            <SiGraphql className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#E10098]" />
          </div>
        ),
      };

    case 'sass':
    case 'scss':
      return {
        displayName: 'Sass',
        brandColor: '#CC6699',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#CC6699]/15 flex items-center justify-center shadow-xs">
            <SiSass className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#CC6699]" />
          </div>
        ),
      };

    case 'bootstrap':
      return {
        displayName: 'Bootstrap',
        brandColor: '#7952B3',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#7952B3]/15 flex items-center justify-center shadow-xs">
            <SiBootstrap className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#7952B3]" />
          </div>
        ),
      };

    case 'vite':
      return {
        displayName: 'Vite',
        brandColor: '#646CFF',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#646CFF]/15 flex items-center justify-center shadow-xs">
            <SiVite className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#646CFF]" />
          </div>
        ),
      };

    case 'redux':
    case 'redux toolkit':
      return {
        displayName: 'Redux',
        brandColor: '#764ABC',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#764ABC]/15 flex items-center justify-center shadow-xs">
            <SiRedux className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#764ABC]" />
          </div>
        ),
      };

    case 'kubernetes':
    case 'k8s':
      return {
        displayName: 'Kubernetes',
        brandColor: '#326CE5',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#326CE5]/15 flex items-center justify-center shadow-xs">
            <SiKubernetes className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#326CE5]" />
          </div>
        ),
      };

    case 'aws':
    case 'amazon web services':
      return {
        displayName: 'AWS',
        brandColor: '#FF9900',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#FF9900]/15 flex items-center justify-center shadow-xs">
            <FaAws className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#FF9900]" />
          </div>
        ),
      };

    case 'google cloud':
    case 'gcp':
      return {
        displayName: 'Google Cloud',
        brandColor: '#4285F4',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#4285F4]/15 flex items-center justify-center shadow-xs">
            <SiGooglecloud className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#4285F4]" />
          </div>
        ),
      };

    case 'figma':
      return {
        displayName: 'Figma',
        brandColor: '#F24E1E',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/20 flex items-center justify-center shadow-xs">
            <SiFigma className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#F24E1E]" />
          </div>
        ),
      };

    case 'flutter':
      return {
        displayName: 'Flutter',
        brandColor: '#02569B',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#02569B]/15 flex items-center justify-center shadow-xs">
            <SiFlutter className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#02569B]" />
          </div>
        ),
      };

    case 'dart':
      return {
        displayName: 'Dart',
        brandColor: '#0175C2',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#0175C2]/15 flex items-center justify-center shadow-xs">
            <SiDart className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#0175C2]" />
          </div>
        ),
      };

    case 'kotlin':
      return {
        displayName: 'Kotlin',
        brandColor: '#7F52FF',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#7F52FF]/15 flex items-center justify-center shadow-xs">
            <SiKotlin className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#7F52FF]" />
          </div>
        ),
      };

    case 'swift':
      return {
        displayName: 'Swift',
        brandColor: '#FA7343',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#FA7343]/15 flex items-center justify-center shadow-xs">
            <SiSwift className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#FA7343]" />
          </div>
        ),
      };

    case 'c++':
    case 'cpp':
      return {
        displayName: 'C++',
        brandColor: '#00599C',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#00599C]/15 flex items-center justify-center shadow-xs">
            <SiCplusplus className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#00599C]" />
          </div>
        ),
      };

    case 'c#':
    case 'csharp':
      return {
        displayName: 'C#',
        brandColor: '#239120',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#239120]/15 flex items-center justify-center shadow-xs">
            <TbBrandCSharp className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#239120]" />
          </div>
        ),
      };

    case '.net':
    case 'dotnet':
      return {
        displayName: '.NET',
        brandColor: '#512BD4',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#512BD4]/15 flex items-center justify-center shadow-xs">
            <SiDotnet className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#512BD4]" />
          </div>
        ),
      };

    case 'go':
    case 'golang':
      return {
        displayName: 'Go',
        brandColor: '#00ADD8',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#00ADD8]/15 flex items-center justify-center shadow-xs">
            <SiGo className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#00ADD8]" />
          </div>
        ),
      };

    case 'rust':
      return {
        displayName: 'Rust',
        brandColor: '#DEA584',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/40 border border-white/10 flex items-center justify-center text-white shadow-xs">
            <SiRust className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#DEA584]" />
          </div>
        ),
      };

    case 'django':
      return {
        displayName: 'Django',
        brandColor: '#092E20',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#092E20]/25 flex items-center justify-center shadow-xs">
            <SiDjango className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#092E20] dark:text-[#44B78B]" />
          </div>
        ),
      };

    case 'fastapi':
      return {
        displayName: 'FastAPI',
        brandColor: '#009688',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#009688]/15 flex items-center justify-center shadow-xs">
            <SiFastapi className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#009688]" />
          </div>
        ),
      };

    case 'flask':
      return {
        displayName: 'Flask',
        brandColor: '#000000',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-black/30 border border-white/10 flex items-center justify-center text-white shadow-xs">
            <SiFlask className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white" />
          </div>
        ),
      };

    case 'spring':
    case 'spring boot':
      return {
        displayName: 'Spring Boot',
        brandColor: '#6DB33F',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#6DB33F]/15 flex items-center justify-center shadow-xs">
            <SiSpringboot className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#6DB33F]" />
          </div>
        ),
      };

    case 'jest':
      return {
        displayName: 'Jest',
        brandColor: '#C21325',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#C21325]/15 flex items-center justify-center shadow-xs">
            <SiJest className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#C21325]" />
          </div>
        ),
      };

    case 'wordpress':
      return {
        displayName: 'WordPress',
        brandColor: '#21759B',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[#21759B]/15 flex items-center justify-center shadow-xs">
            <SiWordpress className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#21759B]" />
          </div>
        ),
      };

    default:
      return {
        displayName: name || 'Skill',
        brandColor: '#222222',
        icon: (
          <div className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center text-[var(--text)] shadow-xs">
            <FaCode className="w-4 h-4 text-[var(--text-muted)]" />
          </div>
        ),
      };
  }
};

export interface SkillCardProps {
  name: string;
  proficiency?: number;
  className?: string;
  interactive?: boolean;
}

export function SkillCard({ name, proficiency, className = '', interactive = true }: SkillCardProps) {
  const badge = getTechBadge(name);

  return (
    <div
      title={proficiency ? `${badge.displayName} • ${proficiency}% proficiency` : badge.displayName}
      className={`group relative w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] md:w-[66px] md:h-[66px] rounded-xl bg-[var(--bg)] border border-[var(--border)] ${
        interactive
          ? 'hover:border-[#222222]/40 dark:hover:border-[#f4f4f5]/40 hover:-translate-y-0.5 hover:shadow-md cursor-default'
          : ''
      } transition-all duration-200 flex flex-col items-center justify-center p-1 sm:p-1.5 select-none ${className}`}
    >
      <div className={`flex items-center justify-center transition-transform duration-200 ${interactive ? 'group-hover:scale-105' : ''}`}>
        {badge.icon}
      </div>
      <span className={`text-[9.5px] sm:text-[10px] md:text-[10.5px] font-semibold text-[var(--text)] tracking-tight text-center truncate w-full mt-1 transition-colors ${
        interactive ? 'group-hover:text-[#222222] dark:group-hover:text-[#f4f4f5]' : ''
      }`}>
        {badge.displayName}
      </span>
      {proficiency !== undefined && (
        <span className="sr-only">{proficiency}% proficiency</span>
      )}
    </div>
  );
}
