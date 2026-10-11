'use client';

import { useState } from 'react';

export default function InstantUpload() {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        // ✨ THIS IS WHAT MAKES IT INSTANT:
        // It adds the new image URL straight to your array so React renders it right away!
        setImages((prevImages) => [data.url, ...prevImages]);
        
        // Clear the form inputs
        (e.target as HTMLFormElement).reset();
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-lg space-y-6 max-w-xl mx-auto">
      <h3 className="text-lg font-bold">Instant Image Upload</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono mb-1">Admin Password</label>
          <input 
            type="password" 
            name="password" 
            required 
            className="w-full px-3 py-2 rounded-xl border bg-[var(--bg)] border-[var(--border)] text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-mono mb-1">Select Image</label>
          <input 
            type="file" 
            name="file" 
            accept="image/*" 
            required 
            className="w-full text-sm text-[var(--text-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-500/10 file:text-amber-600 hover:file:bg-amber-500/20"
          />
        </div>

        <button 
          type="submit" 
          disabled={uploading}
          className="w-full py-2.5 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 text-zinc-950 hover:opacity-90 transition disabled:opacity-50"
        >
          {uploading ? 'Uploading to Vercel Blob...' : 'Upload Image Instantly'}
        </button>
      </form>

      {/* Instant Preview Grid (Shows images immediately without refreshing) */}
      {images.length > 0 && (
        <div className="space-y-2 pt-4 border-t border-[var(--border)]">
          <p className="text-xs font-mono text-emerald-500 font-semibold">● Uploaded Just Now (Live Preview)</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {images.map((url, index) => (
              <div key={index} className="relative rounded-xl overflow-hidden border border-[var(--border)] aspect-square bg-[var(--bg)]">
                <img src={url} alt="Uploaded preview" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}