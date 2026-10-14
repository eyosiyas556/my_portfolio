'use client';

import React, { useState, useMemo } from 'react';
import { SkillCard, getTechBadge } from './SkillBadge';

export interface SkillItem {
  id: number;
  name: string;
  category: string;
  proficiency_level: number;
}

interface SkillControlCenterProps {
  skills: SkillItem[];
  setSkills: React.Dispatch<React.SetStateAction<any[]>>;
  password: string;
  onRefresh?: () => Promise<void> | void;
}

// Popular tech presets to quickly add skills
const POPULAR_PRESETS: { name: string; category: string; proficiency: number }[] = [
  { name: 'Docker', category: 'Tools', proficiency: 85 },
  { name: 'Python', category: 'Backend', proficiency: 85 },
  { name: 'MongoDB', category: 'Database', proficiency: 80 },
  { name: 'Redis', category: 'Database', proficiency: 80 },
  { name: 'Supabase', category: 'Database', proficiency: 85 },
  { name: 'Firebase', category: 'Database', proficiency: 80 },
  { name: 'GraphQL', category: 'Backend', proficiency: 80 },
  { name: 'AWS', category: 'Tools', proficiency: 75 },
  { name: 'Figma', category: 'Tools', proficiency: 80 },
  { name: 'Flutter', category: 'Mobile', proficiency: 80 },
  { name: 'Kubernetes', category: 'Tools', proficiency: 75 },
  { name: 'Redux', category: 'Frontend', proficiency: 85 },
  { name: 'Django', category: 'Backend', proficiency: 80 },
  { name: 'FastAPI', category: 'Backend', proficiency: 80 },
  { name: 'Spring Boot', category: 'Backend', proficiency: 75 },
  { name: 'Go', category: 'Backend', proficiency: 80 },
  { name: 'Rust', category: 'Backend', proficiency: 75 },
];

const STANDARD_CATEGORIES = [
  'Frontend',
  'Backend',
  'Database',
  'Tools',
  'DevOps & Cloud',
  'Mobile',
  'AI & Machine Learning',
  'Design & UI/UX',
];

export default function SkillControlCenter({
  skills,
  setSkills,
  password,
  onRefresh,
}: SkillControlCenterProps) {
  // Form State
  const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('Frontend');
  const [formCustomCategory, setFormCustomCategory] = useState('');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [formProficiency, setFormProficiency] = useState(85);

  // Status & Feedback
  const [status, setStatus] = useState<{ loading: boolean; success: string; error: string }>({
    loading: false,
    success: '',
    error: '',
  });
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  // Compute all distinct categories dynamically from database + standard list
  const allCategories = useMemo(() => {
    const set = new Set<string>();
    skills.forEach((s) => {
      if (s.category && s.category.trim()) {
        set.add(s.category.trim());
      }
    });
    STANDARD_CATEGORIES.forEach((cat) => set.add(cat));
    return Array.from(set);
  }, [skills]);

  // Compute existing categories for filter pills
  const existingCategoriesWithCounts = useMemo(() => {
    const counts: { [cat: string]: number } = {};
    skills.forEach((s) => {
      const cat = (s.category || 'Other').trim();
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [skills]);

  // Compute stats
  const totalSkills = skills.length;
  const totalCategories = Object.keys(existingCategoriesWithCounts).length;
  const avgProficiency = totalSkills > 0
    ? Math.round(skills.reduce((acc, s) => acc + (s.proficiency_level || 0), 0) / totalSkills)
    : 0;

  // Filtered skills list
  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesSearch =
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategoryFilter === 'All' ||
        skill.category.toLowerCase() === activeCategoryFilter.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [skills, searchQuery, activeCategoryFilter]);

  // Unadded suggestions
  const suggestions = useMemo(() => {
    const existingLower = new Set(skills.map((s) => s.name.trim().toLowerCase()));
    return POPULAR_PRESETS.filter((p) => !existingLower.has(p.name.toLowerCase())).slice(0, 8);
  }, [skills]);

  // Broadcast live refresh to other browser tabs
  const triggerBroadcast = () => {
    try {
      const channel = new BroadcastChannel('portfolio_updates');
      channel.postMessage('refresh');
      channel.close();
    } catch (e) {}
    try {
      localStorage.setItem('portfolio_last_updated', Date.now().toString());
    } catch (e) {}
  };

  // Start Editing a Skill
  const handleStartEdit = (skill: SkillItem) => {
    setEditingSkillId(skill.id);
    setFormName(skill.name);
    setFormProficiency(skill.proficiency_level ?? 85);

    if (allCategories.includes(skill.category)) {
      setFormCategory(skill.category);
      setIsCustomCategory(false);
      setFormCustomCategory('');
    } else {
      setFormCategory('__custom__');
      setIsCustomCategory(true);
      setFormCustomCategory(skill.category);
    }

    setStatus({ loading: false, success: '', error: '' });
    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Cancel Editing
  const handleCancelEdit = () => {
    setEditingSkillId(null);
    setFormName('');
    setFormCategory('Frontend');
    setIsCustomCategory(false);
    setFormCustomCategory('');
    setFormProficiency(85);
    setStatus({ loading: false, success: '', error: '' });
  };

  // Apply a preset
  const handleApplyPreset = (preset: { name: string; category: string; proficiency: number }) => {
    setFormName(preset.name);
    setFormCategory(preset.category);
    setIsCustomCategory(false);
    setFormCustomCategory('');
    setFormProficiency(preset.proficiency);
  };

  // Handle Form Submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      setStatus({ loading: false, success: '', error: 'Skill name is required' });
      return;
    }

    const resolvedCategory = isCustomCategory
      ? formCustomCategory.trim()
      : formCategory.trim();

    if (!resolvedCategory) {
      setStatus({ loading: false, success: '', error: 'Category is required' });
      return;
    }

    setStatus({ loading: true, success: '', error: '' });

    try {
      if (editingSkillId) {
        // UPDATE existing skill
        const res = await fetch('/api/skills', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingSkillId,
            name: formName.trim(),
            category: resolvedCategory,
            proficiency_level: Number(formProficiency),
            password,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update skill');

        // Update local state
        setSkills((prev) =>
          prev.map((s) =>
            s.id === editingSkillId
              ? {
                  ...s,
                  name: formName.trim(),
                  category: resolvedCategory,
                  proficiency_level: Number(formProficiency),
                }
              : s
          )
        );

        setStatus({
          loading: false,
          success: `Skill "${formName.trim()}" updated successfully!`,
          error: '',
        });
        handleCancelEdit();
      } else {
        // CREATE new skill
        const res = await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formName.trim(),
            category: resolvedCategory,
            proficiency_level: Number(formProficiency),
            password,
          }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to add skill');

        if (data.skill) {
          setSkills((prev) => [...prev, data.skill]);
        }

        setStatus({
          loading: false,
          success: `Skill "${formName.trim()}" added to ${resolvedCategory}!`,
          error: '',
        });

        setFormName('');
        setFormProficiency(85);
      }

      triggerBroadcast();
      if (onRefresh) await onRefresh();
    } catch (err: any) {
      setStatus({ loading: false, success: '', error: err.message || 'Operation failed' });
    }
  };

  // Handle Delete Skill
  const handleDelete = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}" from your skills?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/skills?id=${id}`, {
        method: 'DELETE',
        headers: {
          'x-admin-password': password,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete skill');

      setSkills((prev) => prev.filter((s) => s.id !== id));
      if (editingSkillId === id) handleCancelEdit();

      triggerBroadcast();
      if (onRefresh) await onRefresh();
    } catch (err: any) {
      alert(err.message || 'Error deleting skill');
    } finally {
      setDeletingId(null);
    }
  };

  // Live badge preview for the form
  const previewBadge = getTechBadge(formName || 'Skill Name');

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 rounded-3xl space-y-7 shadow-lg">
      
      {/* ── Section Header & Live Sync Status ─────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl sm:text-2xl font-black text-[var(--text)] tracking-tight">
              Skill Control Center
            </h2>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live Dynamic Control
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1">
            Add, update, categorize, and delete technical skills. All changes reflect live on your portfolio.
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="px-3 py-1.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-center min-w-[74px]">
            <span className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Skills</span>
            <span className="text-base sm:text-lg font-extrabold text-[var(--text)]">{totalSkills}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-center min-w-[74px]">
            <span className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Categories</span>
            <span className="text-base sm:text-lg font-extrabold text-[var(--text)]">{totalCategories}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-center min-w-[74px]">
            <span className="block text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">Avg Level</span>
            <span className="text-base sm:text-lg font-extrabold text-[var(--text)]">{avgProficiency}%</span>
          </div>
        </div>
      </div>

      {/* ── Status Alerts ────────────────────────────────────────────── */}
      {status.success && (
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs sm:text-sm font-medium animate-fadeIn">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{status.success}</span>
          </div>
          <button
            onClick={() => setStatus((prev) => ({ ...prev, success: '' }))}
            className="text-xs hover:opacity-75 p-1"
          >
            ✕
          </button>
        </div>
      )}

      {status.error && (
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs sm:text-sm font-medium animate-fadeIn">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{status.error}</span>
          </div>
          <button
            onClick={() => setStatus((prev) => ({ ...prev, error: '' }))}
            className="text-xs hover:opacity-75 p-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* ── Quick Suggestions Bar ────────────────────────────────────── */}
      {suggestions.length > 0 && !editingSkillId && (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              Quick Add Suggestions
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">(Click to autofill)</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {suggestions.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => handleApplyPreset(p)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-[var(--bg)] border border-[var(--border)] hover:border-[#222222] dark:hover:border-[#f4f4f5] text-[var(--text)] transition-all hover:scale-105"
              >
                <span>+</span>
                <span>{p.name}</span>
                <span className="text-[10px] text-[var(--text-muted)] font-normal">({p.category})</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Dynamic Form (Add & Edit) ─────────────────────────────────── */}
      <form onSubmit={handleSubmit} className="bg-[var(--bg)] border border-[var(--border)] p-5 sm:p-6 rounded-2xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${editingSkillId ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'}`} />
            <h3 className="text-sm sm:text-base font-bold text-[var(--text)]">
              {editingSkillId ? (
                <span>
                  Editing Skill: <span className="underline decoration-amber-500">{formName || 'Untitled'}</span>
                </span>
              ) : (
                'Add New Technical Skill'
              )}
            </h3>
          </div>
          {editingSkillId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="text-xs px-2.5 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)] transition"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Inputs Section (col-span-8 or 9) */}
          <div className="md:col-span-8 lg:col-span-9 space-y-4">
            
            {/* Row 1: Name and Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">
                  Skill Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Next.js, Docker, PostgreSQL, React"
                  className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#222222] dark:focus:border-[#f4f4f5] transition"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[var(--text-muted)]">
                    Category <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomCategory(!isCustomCategory);
                      if (!isCustomCategory) setFormCustomCategory('');
                    }}
                    className="text-[11px] font-bold text-[#222222] dark:text-[#f4f4f5] underline hover:opacity-80"
                  >
                    {isCustomCategory ? '← Choose Existing' : '+ Custom Category'}
                  </button>
                </div>

                {isCustomCategory ? (
                  <input
                    type="text"
                    required
                    value={formCustomCategory}
                    onChange={(e) => setFormCustomCategory(e.target.value)}
                    placeholder="e.g. Cloud & DevOps, Mobile Apps..."
                    className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#222222] dark:focus:border-[#f4f4f5] transition"
                  />
                ) : (
                  <select
                    value={formCategory}
                    onChange={(e) => {
                      if (e.target.value === '__custom__') {
                        setIsCustomCategory(true);
                      } else {
                        setFormCategory(e.target.value);
                      }
                    }}
                    className="w-full bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-3.5 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-[#222222] dark:focus:border-[#f4f4f5] transition"
                  >
                    {allCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="__custom__">+ Enter Custom Category...</option>
                  </select>
                )}
              </div>
            </div>

            {/* Row 2: Proficiency Slider */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-[var(--text-muted)]">
                  Proficiency Level
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-[var(--text-muted)]">
                    {formProficiency >= 90 ? 'Master / Expert' : formProficiency >= 75 ? 'Advanced' : 'Intermediate'}
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)]">
                    {formProficiency}%
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={formProficiency}
                  onChange={(e) => setFormProficiency(Number(e.target.value))}
                  className="w-full accent-[#222222] dark:accent-[#f4f4f5] bg-[var(--bg-card)] cursor-pointer"
                />
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={formProficiency}
                  onChange={(e) => setFormProficiency(Math.max(1, Math.min(100, Number(e.target.value))))}
                  className="w-16 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-2 py-1.5 text-center text-xs font-mono font-bold text-[var(--text)] focus:outline-none"
                />
              </div>
            </div>

          </div>

          {/* Live Badge Preview Card (md:col-span-4 or 3) */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center justify-center p-3 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]/70">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Public Live Preview
            </span>
            <div className="flex flex-col items-center">
              <SkillCard
                name={formName || 'Next.js'}
                proficiency={formProficiency}
                interactive={false}
              />
              <span className="text-[11px] text-[var(--text-muted)] font-mono mt-2 text-center">
                {isCustomCategory ? formCustomCategory || 'Custom' : formCategory} • {formProficiency}%
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button Row */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="submit"
            disabled={status.loading}
            className={`flex-1 py-3 px-5 rounded-xl font-bold text-sm transition-all duration-200 shadow-md disabled:opacity-50 flex items-center justify-center gap-2 ${
              editingSkillId
                ? 'bg-amber-500 text-black hover:bg-amber-400'
                : 'bg-[#222222] text-white hover:bg-black dark:bg-[#f4f4f5] dark:text-[#1d1f1e] dark:hover:bg-white'
            }`}
          >
            {status.loading ? (
              <>
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>{editingSkillId ? 'Saving Changes...' : 'Publishing Skill...'}</span>
              </>
            ) : (
              <span>{editingSkillId ? '✓ Update Skill Changes' : '+ Save & Publish Skill'}</span>
            )}
          </button>

          {editingSkillId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="py-3 px-5 rounded-xl font-semibold text-sm bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] hover:bg-[var(--border)]/30 transition"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* ── Search & Filter Bar ──────────────────────────────────────── */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[var(--text-muted)]">
              🔍
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skills by name or category..."
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl pl-9 pr-4 py-2 text-xs sm:text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#222222] dark:focus:border-[#f4f4f5] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-3 flex items-center text-xs text-[var(--text-muted)] hover:text-[var(--text)]"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-xs text-[var(--text-muted)] font-mono shrink-0">
            Showing <span className="font-bold text-[var(--text)]">{filteredSkills.length}</span> of {totalSkills} skills
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <button
            type="button"
            onClick={() => setActiveCategoryFilter('All')}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
              activeCategoryFilter === 'All'
                ? 'bg-[#222222] text-white dark:bg-[#f4f4f5] dark:text-[#1d1f1e]'
                : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
            }`}
          >
            All ({totalSkills})
          </button>

          {Object.entries(existingCategoriesWithCounts).map(([cat, count]) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategoryFilter(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-semibold transition ${
                activeCategoryFilter.toLowerCase() === cat.toLowerCase()
                  ? 'bg-[#222222] text-white dark:bg-[#f4f4f5] dark:text-[#1d1f1e] font-bold'
                  : 'bg-[var(--bg)] border border-[var(--border)] text-[var(--text-muted)] hover:text-[var(--text)]'
              }`}
            >
              {cat} ({count})
            </button>
          ))}
        </div>
      </div>

      {/* ── Skills Management Grid / List ────────────────────────────── */}
      <div className="space-y-4">
        {filteredSkills.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-2xl bg-[var(--bg)] border border-dashed border-[var(--border)]">
            <p className="text-sm font-semibold text-[var(--text)]">No skills found</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              {searchQuery || activeCategoryFilter !== 'All'
                ? 'Try clearing the search query or selecting a different category filter.'
                : 'Your skills database is currently empty. Add your first skill using the form above!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map((skill) => {
              const badge = getTechBadge(skill.name);
              const isEditing = editingSkillId === skill.id;
              const isDeleting = deletingId === skill.id;

              return (
                <div
                  key={skill.id}
                  className={`group relative p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 ${
                    isEditing
                      ? 'bg-amber-500/10 border-amber-500 shadow-md ring-1 ring-amber-500'
                      : 'bg-[var(--bg)] border-[var(--border)] hover:border-[#222222]/40 dark:hover:border-[#f4f4f5]/40 hover:shadow-sm'
                  }`}
                >
                  {/* Top: Icon + Title + Category */}
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="shrink-0">
                        {badge.icon}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[var(--text)] truncate">
                          {skill.name}
                        </h4>
                        <span className="inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-muted)]">
                          {skill.category}
                        </span>
                      </div>
                    </div>

                    {/* Actions: Edit & Delete */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleStartEdit(skill)}
                        title="Edit Skill"
                        className="p-1.5 rounded-lg text-xs font-bold bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text)] hover:bg-[#222222] hover:text-white dark:hover:bg-[#f4f4f5] dark:hover:text-[#1d1f1e] transition"
                      >
                        ✏️
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(skill.id, skill.name)}
                        disabled={isDeleting}
                        title="Delete Skill"
                        className="p-1.5 rounded-lg text-xs font-bold bg-rose-500/10 border border-rose-500/30 text-rose-500 hover:bg-rose-500 hover:text-white transition disabled:opacity-50"
                      >
                        {isDeleting ? '⏳' : '🗑️'}
                      </button>
                    </div>
                  </div>

                  {/* Bottom: Proficiency Bar */}
                  <div>
                    <div className="flex justify-between items-center text-[11px] mb-1 font-mono">
                      <span className="text-[var(--text-muted)]">Proficiency</span>
                      <span className="font-bold text-[var(--text)]">{skill.proficiency_level}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-[var(--border)] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#222222] dark:bg-[#f4f4f5] transition-all duration-500"
                        style={{ width: `${Math.min(100, Math.max(5, skill.proficiency_level))}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
