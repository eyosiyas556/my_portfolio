export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)] overflow-x-hidden">

      {/* Navbar placeholder */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16 bg-[var(--bg-card)]/80 border-b border-[var(--border)] backdrop-blur-md" />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-28 space-y-16">

        {/* ── Hero skeleton ─────────────────────────────── */}
        <section className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">

          {/* Left text block */}
          <div className="flex-1 space-y-4 w-full">
            {/* Badge */}
            <div className="h-7 w-56 rounded-full bg-[var(--bg-card)] animate-pulse" />
            {/* Typewriter lines */}
            <div className="space-y-3 pt-1">
              <div className="h-10 w-24 rounded-xl bg-[var(--bg-card)] animate-pulse" />
              <div className="h-10 w-72 rounded-xl bg-[var(--bg-card)] animate-pulse" />
              <div className="h-10 w-64 rounded-xl bg-[var(--bg-card)] animate-pulse" />
            </div>
            {/* Bio */}
            <div className="space-y-2 pt-2">
              <div className="h-4 w-full rounded bg-[var(--bg-card)] animate-pulse" />
              <div className="h-4 w-5/6 rounded bg-[var(--bg-card)] animate-pulse" />
              <div className="h-4 w-4/6 rounded bg-[var(--bg-card)] animate-pulse" />
            </div>
            {/* Social icons */}
            <div className="flex gap-3 pt-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-11 h-11 rounded-xl bg-[var(--bg-card)] animate-pulse" />
              ))}
            </div>
            {/* CTA button */}
            <div className="h-12 w-40 rounded-xl bg-[var(--bg-card)] animate-pulse" />
          </div>

          {/* Profile picture */}
          <div className="shrink-0 w-56 h-56 sm:w-64 sm:h-64 rounded-3xl bg-[var(--bg-card)] animate-pulse" />
        </section>

        {/* ── Section skeleton factory ───────────────── */}
        {[
          { titleW: 'w-52', lines: 2, cards: 2, cardH: 'h-64' },   // Experience
          { titleW: 'w-44', lines: 2, cards: 2, cardH: 'h-96' },   // Projects
          { titleW: 'w-48', lines: 2, cards: 4, cardH: 'h-48' },   // Skills
          { titleW: 'w-36', lines: 2, cards: 2, cardH: 'h-36' },   // Contact
        ].map((s, idx) => (
          <section key={idx} className="space-y-6">
            {/* Section heading row */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-[var(--bg-card)] animate-pulse" />
              <div className="space-y-1.5">
                <div className={`h-6 ${s.titleW} rounded-lg bg-[var(--bg-card)] animate-pulse`} />
                <div className="h-3.5 w-40 rounded bg-[var(--bg-card)] animate-pulse" />
              </div>
            </div>
            {/* Cards row */}
            <div className={`grid gap-5 ${s.cards === 4 ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-1 md:grid-cols-2'}`}>
              {[...Array(s.cards)].map((_, i) => (
                <div key={i} className={`${s.cardH} rounded-2xl bg-[var(--bg-card)] animate-pulse`} />
              ))}
            </div>
          </section>
        ))}

      </main>
    </div>
  );
}
