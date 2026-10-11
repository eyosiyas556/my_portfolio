'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';

export default function AdminDashboard() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [projectUploading, setProjectUploading] = useState(false);
  const [testimonialUploading, setTestimonialUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Skills, Projects, Testimonials & Experiences state
  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
  const [editingTestimonialId, setEditingTestimonialId] = useState<number | null>(null);
  const [editingExperienceId, setEditingExperienceId] = useState<number | null>(null);

  // Form state for project
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    tech_stack: '',
    github_url: '',
    live_url: '',
    image_url: ''
  });

  // Form state for experience / timeline (supports Add & Edit)
  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    period: '',
    description: '',
    type: 'Education'
  });
  const [expStatus, setExpStatus] = useState({ loading: false, success: '', error: '' });

  // Form state for new skill
  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    proficiency_level: 85
  });
  const [skillStatus, setSkillStatus] = useState({ loading: false, success: '', error: '' });

  // Form state for testimonial (supports Add & Edit)
  const [testimonialForm, setTestimonialForm] = useState({
    quote: '',
    author: '',
    role: '',
    avatar: ''
  });
  const [testimonialStatus, setTestimonialStatus] = useState({ loading: false, success: '', error: '' });

  // Profile management states
  const [profileForm, setProfileForm] = useState({
    full_name: 'Eyosiyas Fisseha Birhanie',
    title: 'Full-Stack Developer',
    bio: '',
    profile_image_url: '/eyosiyas.jpg',
    github_url: '',
    linkedin_url: '',
    telegram_url: '',
    instagram_url: ''
  });
  const [profileStatus, setProfileStatus] = useState({ loading: false, success: '', error: '' });

  // Messages state
  const [messages, setMessages] = useState<any[]>([]);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Contact management states
  const [contactForm, setContactForm] = useState({
    email: 'eyosiyas@example.com',
    location: 'Adama, Ethiopia',
    availability_status: 'Available for Opportunities',
    phone: ''
  });
  const [contactStatus, setContactStatus] = useState({ loading: false, success: '', error: '' });

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    try {
      const profileRes = await fetch('/api/profile');
      const profileData = await profileRes.json();
      if (profileData && !profileData.error) setProfileForm(profileData);

      const skillsRes = await fetch('/api/skills');
      const skillsData = await skillsRes.json();
      if (Array.isArray(skillsData)) setSkills(skillsData);

      const projectsRes = await fetch('/api/projects');
      const projectsData = await projectsRes.json();
      if (Array.isArray(projectsData)) setProjects(projectsData);

      const testimonialsRes = await fetch('/api/testimonials');
      const testimonialsData = await testimonialsRes.json();
      if (Array.isArray(testimonialsData)) setTestimonials(testimonialsData);

      const expRes = await fetch('/api/experiences');
      const expData = await expRes.json();
      if (Array.isArray(expData)) setExperiences(expData);

      const contactRes = await fetch('/api/contact');
      const contactData = await contactRes.json();
      if (contactData && !contactData.error) setContactForm(contactData);

      setMessagesLoading(true);
      const messagesRes = await fetch('/api/messages');
      const messagesData = await messagesRes.json();
      if (Array.isArray(messagesData)) setMessages(messagesData);
      setMessagesLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Notify the portfolio page to refresh its server data
  const broadcastRefresh = () => {
    const channel = new BroadcastChannel('portfolio_updates');
    channel.postMessage('refresh');
    channel.close();
  };

  const handleLogin = (e: React.FormEvent) => {    e.preventDefault();
    if (password === 'eyosi@&123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect admin password');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('password', password);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setProfileForm((prev) => ({ ...prev, profile_image_url: data.url }));
      setProfileStatus({ loading: false, success: 'Image uploaded successfully! Click "Save Profile Changes" below.', error: '' });
    } catch (err: any) {
      setProfileStatus({ loading: false, success: '', error: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setProjectUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('password', password);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setForm((prev) => ({ ...prev, image_url: data.url }));
      setSuccess('Project screenshot uploaded successfully!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setProjectUploading(false);
    }
  };

  const handleTestimonialAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setTestimonialUploading(true);
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('password', password);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Upload failed');

      setTestimonialForm((prev) => ({ ...prev, avatar: data.url }));
    } catch (err: any) {
      alert(err.message);
    } finally {
      setTestimonialUploading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileStatus({ loading: true, success: '', error: '' });

    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...profileForm, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile');

      setProfileStatus({ loading: false, success: 'Profile updated successfully!', error: '' });
      broadcastRefresh();
    } catch (err: any) {
      setProfileStatus({ loading: false, success: '', error: err.message });
    }
  };

  const handleUpdateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setContactStatus({ loading: true, success: '', error: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactForm, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update contact info');

      setContactStatus({ loading: false, success: 'Contact information updated successfully!', error: '' });
      broadcastRefresh();
    } catch (err: any) {
      setContactStatus({ loading: false, success: '', error: err.message });
    }
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const method = editingProjectId ? 'PUT' : 'POST';
    const payload = editingProjectId 
      ? { ...form, id: editingProjectId, password } 
      : { ...form, password };

    try {
      const res = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save project');

      setSuccess(editingProjectId ? 'Project updated successfully!' : 'Project added successfully!');
      broadcastRefresh();
      setForm({ title: '', slug: '', description: '', tech_stack: '', github_url: '', live_url: '', image_url: '' });
      setEditingProjectId(null);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    setExpStatus({ loading: true, success: '', error: '' });

    const method = editingExperienceId ? 'PUT' : 'POST';
    const payload = editingExperienceId 
      ? { ...expForm, id: editingExperienceId, password } 
      : { ...expForm, password };

    try {
      const res = await fetch('/api/experiences', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save experience');

      setExpStatus({ 
        loading: false, 
        success: editingExperienceId ? 'Experience updated successfully!' : 'Experience added successfully!', 
        error: '' 
      });
      broadcastRefresh();
      setExpForm({ role: '', company: '', period: '', description: '', type: 'Education' });
      setEditingExperienceId(null);
      fetchData();
    } catch (err: any) {
      setExpStatus({ loading: false, success: '', error: err.message });
    }
  };

  const handleEditExperienceClick = (exp: any) => {
    setEditingExperienceId(exp.id);
    setExpForm({
      role: exp.role || '',
      company: exp.company || '',
      period: exp.period || '',
      description: exp.description || '',
      type: exp.type || 'Education'
    });
  };

  const handleDeleteExperience = async (id: number) => {
    if (!confirm('Delete this experience timeline entry?')) return;
    try {
      const res = await fetch(`/api/experiences?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password }
      });
      if (res.ok) {
        setExperiences(experiences.filter(e => e.id !== id));
      } else {
        alert('Failed to delete experience.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditProjectClick = (proj: any) => {
    setEditingProjectId(proj.id);
    setForm({
      title: proj.title || '',
      slug: proj.slug || '',
      description: proj.description || '',
      tech_stack: Array.isArray(proj.tech_stack) ? proj.tech_stack.join(', ') : proj.tech_stack || '',
      github_url: proj.github_url || '',
      live_url: proj.live_url || '',
      image_url: proj.image_url || ''
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password }
      });

      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      } else {
        alert('Failed to delete project.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting.');
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    setSkillStatus({ loading: true, success: '', error: '' });

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...skillForm, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to add skill');

      setSkillStatus({ loading: false, success: 'Skill added successfully!', error: '' });
      broadcastRefresh();
      setSkillForm({ name: '', category: 'Frontend', proficiency_level: 85 });
      fetchData();
    } catch (err: any) {
      setSkillStatus({ loading: false, success: '', error: err.message });
    }
  };

  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    setTestimonialStatus({ loading: true, success: '', error: '' });

    const method = editingTestimonialId ? 'PUT' : 'POST';
    const payload = editingTestimonialId 
      ? { ...testimonialForm, id: editingTestimonialId, password } 
      : { ...testimonialForm, password };

    try {
      const res = await fetch('/api/testimonials', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save recommendation');

      setTestimonialStatus({ 
        loading: false, 
        success: editingTestimonialId ? 'Recommendation updated successfully!' : 'Recommendation added successfully!', 
        error: '' 
      });
      broadcastRefresh();
      setTestimonialForm({ quote: '', author: '', role: '', avatar: '' });
      setEditingTestimonialId(null);
      fetchData();
    } catch (err: any) {
      setTestimonialStatus({ loading: false, success: '', error: err.message });
    }
  };

  const handleEditTestimonialClick = (t: any) => {
    setEditingTestimonialId(t.id);
    setTestimonialForm({
      quote: t.quote || '',
      author: t.author || '',
      role: t.role || '',
      avatar: t.avatar || ''
    });
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm('Delete this recommendation?')) return;
    try {
      const res = await fetch(`/api/testimonials?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-password': password }
      });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id));
      } else {
        alert('Failed to delete recommendation.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (!confirm('Delete this message?')) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(messages.filter(m => m.id !== id));
      } else {
        alert('Failed to delete message.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting.');
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;

    try {
      const res = await fetch(`/api/skills?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setSkills(skills.filter(s => s.id !== id));
      } else {
        alert('Failed to delete skill.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-center justify-center p-4 transition-colors duration-300">
        <form onSubmit={handleLogin} className="bg-[var(--bg-card)] border border-[var(--border)] p-8 rounded-2xl w-full max-w-sm space-y-4 shadow-xl">
          <h1 className="text-xl font-bold text-amber-500 dark:text-amber-400">Portfolio Admin Login</h1>
          <p className="text-xs text-[var(--text-muted)]">Enter your admin password to manage your portfolio.</p>
          {error && <p className="text-xs text-rose-500">{error}</p>}
          <input 
            type="password" 
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
            required
          />
          <button type="submit" className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-sm hover:opacity-90 transition shadow-lg shadow-amber-500/20">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-28 pb-20 space-y-8">
        
        <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
          <div>
            <h1 className="text-2xl font-bold text-amber-500 dark:text-amber-400">Admin Dashboard</h1>
            <p className="text-xs text-[var(--text-muted)]">Manage Eyosiyas&apos;s Portfolio, Timeline & Projects</p>
          </div>
          <a href="/" className="text-xs text-[var(--text-muted)] hover:text-amber-500 underline">← Back to Portfolio</a>
        </div>

        {/* Visitor Messages */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[var(--text)]">Visitor Messages</h2>
            <span className="text-xs bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full font-mono font-semibold">
              {messages.length} message{messages.length !== 1 ? 's' : ''}
            </span>
          </div>

          {messagesLoading ? (
            <p className="text-xs text-[var(--text-muted)] italic">Loading messages...</p>
          ) : messages.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] italic">No messages yet. Messages sent via the contact form will appear here.</p>
          ) : (
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-[var(--bg)] border border-[var(--border)] px-4 py-4 rounded-xl space-y-2 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-[var(--text)]">{msg.name}</p>
                      <p className="text-xs text-amber-600 dark:text-amber-400 font-medium">{msg.email}</p>
                      {msg.created_at && (
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{new Date(msg.created_at).toLocaleString()}</p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="shrink-0 px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold hover:bg-rose-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--border)] pt-2">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile & Socials Management Form */}
        <form onSubmit={handleUpdateProfile} className="bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl space-y-4 shadow-xl">
          <h2 className="text-lg font-semibold text-[var(--text)]">Manage Profile & Social Links</h2>
          
          {profileStatus.success && <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">{profileStatus.success}</div>}
          {profileStatus.error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">{profileStatus.error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Full Name</label>
              <input 
                type="text" 
                required
                value={profileForm.full_name}
                onChange={(e) => setProfileForm({ ...profileForm, full_name: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Professional Title</label>
              <input 
                type="text" 
                required
                value={profileForm.title}
                onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Bio / About Description</label>
            <textarea 
              required
              rows={3}
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500 resize-none"
            />
          </div>

          <div className="space-y-2 border border-[var(--border)] p-4 rounded-xl bg-[var(--bg)]">
            <label className="block text-xs font-medium text-[var(--text-muted)]">Profile Picture (Upload from Computer)</label>
            <div className="flex items-center gap-4">
              {profileForm.profile_image_url && (
                <img 
                  src={profileForm.profile_image_url} 
                  alt="Preview" 
                  className="w-14 h-14 rounded-xl object-cover border border-[var(--border)]"
                />
              )}
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="w-full text-xs text-[var(--text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-zinc-950 hover:file:opacity-90 cursor-pointer disabled:opacity-50"
                />
                {uploading && <p className="text-xs text-amber-500 mt-1">Uploading image...</p>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">GitHub URL</label>
              <input 
                type="url" 
                value={profileForm.github_url || ''}
                onChange={(e) => setProfileForm({ ...profileForm, github_url: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">LinkedIn URL</label>
              <input 
                type="url" 
                value={profileForm.linkedin_url || ''}
                onChange={(e) => setProfileForm({ ...profileForm, linkedin_url: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Telegram URL</label>
              <input 
                type="url" 
                value={profileForm.telegram_url || ''}
                onChange={(e) => setProfileForm({ ...profileForm, telegram_url: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Instagram URL</label>
              <input 
                type="url" 
                value={profileForm.instagram_url || ''}
                onChange={(e) => setProfileForm({ ...profileForm, instagram_url: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={profileStatus.loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-sm hover:opacity-90 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {profileStatus.loading ? 'Updating Profile...' : 'Save Profile Changes'}
          </button>
        </form>

        {/* Manage Contact Info Form */}
        <form onSubmit={handleUpdateContact} className="bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl space-y-4 shadow-xl">
          <h2 className="text-lg font-semibold text-[var(--text)]">Manage Contact Information & Availability</h2>
          
          {contactStatus.success && <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">{contactStatus.success}</div>}
          {contactStatus.error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">{contactStatus.error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Email Address</label>
              <input 
                type="email" 
                required
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Phone Number (Optional)</label>
              <input 
                type="text" 
                value={contactForm.phone || ''}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Location Text</label>
              <input 
                type="text" 
                required
                value={contactForm.location}
                onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Availability Status Badge</label>
              <input 
                type="text" 
                required
                value={contactForm.availability_status}
                onChange={(e) => setContactForm({ ...contactForm, availability_status: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={contactStatus.loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-sm hover:opacity-90 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {contactStatus.loading ? 'Updating Contact Info...' : 'Save Contact Details'}
          </button>
        </form>

        {/* Manage Experience & Education Timeline (Add, Edit, Delete) */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              {editingExperienceId ? 'Edit Experience / Timeline' : 'Add Experience / Timeline'}
            </h2>
            {editingExperienceId && (
              <button type="button" onClick={() => { setEditingExperienceId(null); setExpForm({ role: '', company: '', period: '', description: '', type: 'Education' }); }} className="text-xs text-amber-500 dark:text-amber-400 underline">
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSaveExperience} className="space-y-4 border-b border-[var(--border)] pb-6">
            {expStatus.success && <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">{expStatus.success}</div>}
            {expStatus.error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">{expStatus.error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Role / Title</label>
                <input type="text" required value={expForm.role} onChange={(e) => setExpForm({ ...expForm, role: e.target.value })} placeholder="e.g. Software Engineering Student" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Company / Institution</label>
                <input type="text" required value={expForm.company} onChange={(e) => setExpForm({ ...expForm, company: e.target.value })} placeholder="e.g. ASTU" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Period / Date Range</label>
                <input type="text" required value={expForm.period} onChange={(e) => setExpForm({ ...expForm, period: e.target.value })} placeholder="e.g. 2023 – Present" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Type Category</label>
                <select value={expForm.type} onChange={(e) => setExpForm({ ...expForm, type: e.target.value })} className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500">
                  <option value="Education">Education</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Open Source">Open Source</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Description / Key Achievements</label>
              <textarea required rows={3} value={expForm.description} onChange={(e) => setExpForm({ ...expForm, description: e.target.value })} placeholder="Describe responsibilities and accomplishments..." className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500 resize-none" />
            </div>

            <button type="submit" disabled={expStatus.loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-sm hover:opacity-90 transition shadow-lg shadow-amber-500/20">
              {expStatus.loading ? 'Saving...' : editingExperienceId ? 'Update Experience' : '+ Add Experience'}
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Current Timeline Entries</h3>
            {experiences.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] italic">No experience entries added yet.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {experiences.map((exp) => (
                  <div key={exp.id} className="flex items-center justify-between bg-[var(--bg)] border border-[var(--border)] px-4 py-3 rounded-xl">
                    <div>
                      <p className="text-sm font-bold text-[var(--text)]">{exp.role} @ {exp.company} <span className="text-xs text-amber-500 font-mono">({exp.period})</span></p>
                      <p className="text-xs text-[var(--text-muted)] truncate max-w-md mt-0.5">{exp.description}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => handleEditExperienceClick(exp)} className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold hover:bg-amber-500 hover:text-zinc-950 transition">Edit</button>
                      <button onClick={() => handleDeleteExperience(exp.id)} className="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold hover:bg-rose-500 hover:text-white transition">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Manage Recommendations / Testimonials (With Local Avatar Upload & Edit Option) */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[var(--text)]">
              {editingTestimonialId ? 'Edit Recommendation' : 'Manage Recommendations & Testimonials'}
            </h2>
            {editingTestimonialId && (
              <button 
                type="button" 
                onClick={() => { 
                  setEditingTestimonialId(null); 
                  setTestimonialForm({ quote: '', author: '', role: '', avatar: '' }); 
                }} 
                className="text-xs text-amber-500 dark:text-amber-400 underline"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSaveTestimonial} className="space-y-4 border-b border-[var(--border)] pb-6">
            {testimonialStatus.success && <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">{testimonialStatus.success}</div>}
            {testimonialStatus.error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">{testimonialStatus.error}</div>}

            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Testimonial / Recommendation Quote</label>
              <textarea required rows={3} value={testimonialForm.quote} onChange={(e) => setTestimonialForm({ ...testimonialForm, quote: e.target.value })} placeholder="Write recommendation quote here..." className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500 resize-none" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Author Name</label>
                <input type="text" required value={testimonialForm.author} onChange={(e) => setTestimonialForm({ ...testimonialForm, author: e.target.value })} placeholder="e.g. Dr. Kebede M." className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Author Role & Title</label>
                <input type="text" required value={testimonialForm.role} onChange={(e) => setTestimonialForm({ ...testimonialForm, role: e.target.value })} placeholder="e.g. Professor at ASTU" className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500" />
              </div>
            </div>

            <div className="space-y-2 border border-[var(--border)] p-4 rounded-xl bg-[var(--bg)]">
              <label className="block text-xs font-medium text-[var(--text-muted)]">Recommender Photo (Local Upload)</label>
              <div className="flex items-center gap-4">
                {testimonialForm.avatar && (
                  <img src={testimonialForm.avatar} alt="Avatar Preview" className="w-12 h-12 rounded-xl object-cover border border-[var(--border)]" />
                )}
                <div className="flex-1">
                  <input type="file" accept="image/*" onChange={handleTestimonialAvatarUpload} disabled={testimonialUploading} className="w-full text-xs text-[var(--text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-zinc-950 hover:file:opacity-90 cursor-pointer disabled:opacity-50" />
                  {testimonialUploading && <p className="text-xs text-amber-500 mt-1">Uploading avatar...</p>}
                </div>
              </div>
            </div>

            <button type="submit" disabled={testimonialStatus.loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-sm hover:opacity-90 transition shadow-lg shadow-amber-500/20 disabled:opacity-50">
              {testimonialStatus.loading ? 'Saving...' : editingTestimonialId ? 'Update Recommendation' : '+ Add Recommendation'}
            </button>
          </form>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Current Testimonials</h3>
            {testimonials.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] italic">No testimonials added yet.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {testimonials.map((t) => (
                  <div key={t.id} className="flex items-center justify-between bg-[var(--bg)] border border-[var(--border)] px-4 py-3 rounded-xl">
                    <div className="flex items-center gap-3 pr-4">
                      {t.avatar ? (
                        <img src={t.avatar} alt={t.author} className="w-10 h-10 rounded-xl object-cover border border-[var(--border)] shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-zinc-950 font-bold text-sm shrink-0">
                          {t.author.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium text-[var(--text)]">&ldquo;{t.quote}&rdquo;</p>
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold mt-1">— {t.author}, <span className="font-normal text-[var(--text-muted)]">{t.role}</span></p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={() => handleEditTestimonialClick(t)} 
                        className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold hover:bg-amber-500 hover:text-zinc-950 transition"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteTestimonial(t.id)} 
                        className="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold hover:bg-rose-500 hover:text-white transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add & Manage Technical Skills */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl space-y-6 shadow-xl">
          <h2 className="text-lg font-semibold text-[var(--text)]">Manage Technical Skills</h2>

          <form onSubmit={handleAddSkill} className="space-y-4 border-b border-[var(--border)] pb-6">
            {skillStatus.success && <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">{skillStatus.success}</div>}
            {skillStatus.error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">{skillStatus.error}</div>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Skill Name</label>
                <input 
                  type="text" 
                  required
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
                  placeholder="e.g. PostgreSQL, React"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Category</label>
                <select 
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-[var(--text-muted)]">Proficiency Level</label>
                <span className="text-xs font-mono text-amber-500 dark:text-amber-400 font-bold">{skillForm.proficiency_level}%</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="100" 
                value={skillForm.proficiency_level}
                onChange={(e) => setSkillForm({ ...skillForm, proficiency_level: Number(e.target.value) })}
                className="w-full accent-amber-500 bg-[var(--bg)] cursor-pointer"
              />
            </div>

            <button 
              type="submit" 
              disabled={skillStatus.loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-sm hover:opacity-90 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {skillStatus.loading ? 'Adding Skill...' : '+ Save & Publish Skill'}
            </button>
          </form>

          {/* List existing skills with Delete button */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Current Database Skills</h3>
            {skills.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] italic">No skills loaded or database is empty.</p>
            ) : (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between bg-[var(--bg)] border border-[var(--border)] px-4 py-2.5 rounded-xl">
                    <div>
                      <span className="text-sm font-medium text-[var(--text)]">{skill.name}</span>
                      <span className="ml-2 text-xs text-amber-600 dark:text-amber-400 font-mono">({skill.category} — {skill.proficiency_level}%)</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold hover:bg-rose-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Add / Edit Project Form */}
        <form onSubmit={handleSaveProject} className="bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl space-y-4 shadow-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-[var(--text)]">{editingProjectId ? 'Edit Project' : 'Add New Project'}</h2>
            {editingProjectId && (
              <button 
                type="button" 
                onClick={() => { 
                  setEditingProjectId(null); 
                  setForm({ title: '', slug: '', description: '', tech_stack: '', github_url: '', live_url: '', image_url: '' }); 
                }} 
                className="text-xs text-amber-500 dark:text-amber-400 underline"
              >
                Cancel Edit
              </button>
            )}
          </div>
          
          {success && <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs">{success}</div>}
          {error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">{error}</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Project Title</label>
              <input 
                type="text" 
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
                placeholder="e.g. NexusHub Portal"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Slug (URL friendly name)</label>
              <input 
                type="text" 
                required
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
                placeholder="e.g. nexushub-portal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Description</label>
            <textarea 
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500 resize-none"
              placeholder="Brief overview of what the project does..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Tech Stack (comma separated)</label>
            <input 
              type="text" 
              required
              value={form.tech_stack}
              onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
              className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
              placeholder="Next.js, PostgreSQL, Tailwind CSS"
            />
          </div>

          {/* Local Project Image Upload Section */}
          <div className="space-y-2 border border-[var(--border)] p-4 rounded-xl bg-[var(--bg)]">
            <label className="block text-xs font-medium text-[var(--text-muted)]">Project Screenshot (Upload Locally)</label>
            <div className="flex items-center gap-4">
              {form.image_url && (
                <img 
                  src={form.image_url} 
                  alt="Project Preview" 
                  className="w-16 h-12 rounded-lg object-cover border border-[var(--border)]"
                />
              )}
              <div className="flex-1">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleProjectImageUpload}
                  disabled={projectUploading}
                  className="w-full text-xs text-[var(--text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-zinc-950 hover:file:opacity-90 cursor-pointer disabled:opacity-50"
                />
                {projectUploading && <p className="text-xs text-amber-500 mt-1">Uploading image locally...</p>}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">GitHub URL</label>
              <input 
                type="url" 
                value={form.github_url}
                onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-1">Live Demo URL</label>
              <input 
                type="url" 
                value={form.live_url}
                onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                className="w-full bg-[var(--bg)] border border-[var(--border)] rounded-xl px-3 py-2.5 text-sm text-[var(--text)] focus:outline-none focus:border-amber-500"
                placeholder="https://..."
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 font-bold text-sm hover:opacity-90 transition shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {loading ? 'Saving Project...' : editingProjectId ? 'Update Project' : 'Add Project to Database'}
          </button>
        </form>

        {/* Existing Projects Management List */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] p-6 sm:p-8 rounded-2xl space-y-4 shadow-xl">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">Manage Existing Projects</h3>
          {projects.length === 0 ? (
            <p className="text-xs text-[var(--text-muted)] italic">No projects found in the database.</p>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {projects.map((proj) => (
                <div key={proj.id} className="flex items-center justify-between bg-[var(--bg)] border border-[var(--border)] px-4 py-3 rounded-xl">
                  <div>
                    <h4 className="text-sm font-bold text-[var(--text)]">{proj.title}</h4>
                    <p className="text-xs text-[var(--text-muted)] truncate max-w-xs">{proj.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handleEditProjectClick(proj)} 
                      className="px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold hover:bg-amber-500 hover:text-zinc-950 transition"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteProject(proj.id)} 
                      className="px-3 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs font-bold hover:bg-rose-500 hover:text-white transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}