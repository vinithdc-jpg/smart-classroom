import GlassyCard from '@/components/ui/GlassyCard';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const modules = [
  { title: 'Week 1: Motion Fundamentals', status: 'Completed' },
  { title: 'Week 2: Energy & Work', status: 'In progress' },
  { title: 'Week 3: Waves & Optics', status: 'Upcoming' },
  { title: 'Week 4: Project Review', status: 'Upcoming' }
];

const discussions = [
  { author: 'Zara Patel', topic: 'Design system advice', time: '2h ago' },
  { author: 'Luis Chen', topic: 'Lab safety update', time: '5h ago' },
  { author: 'Stella Hart', topic: 'Exam formula sheet', time: '1d ago' }
];

const progressItems = [
  { label: 'Materials read', value: 82 },
  { label: 'Assignments complete', value: 68 },
  { label: 'Discussion participation', value: 74 }
];

export default function CoursePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Course page</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Modern Physics</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Explore materials, submit assignments, and stay aligned with your instructor in a clean, card-based layout.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/assignment" className="rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15">
              Open assignment
            </Link>
            <Link href="/chat" className="rounded-full border border-white/10 bg-transparent px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5">
              View chat
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <GlassyCard className="p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Course overview</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Physics for creative problem solvers</h2>
                </div>
                <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-100">In progress</span>
              </div>

              <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <p className="text-sm text-slate-400">Instructor</p>
                    <p className="mt-1 text-white">Prof. Luis Chen</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Credits</p>
                    <p className="mt-1 text-white">4.0</p>
                  </div>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-slate-400">Summary</p>
                  <p className="mt-3 text-slate-300 leading-7">
                    Dive into mechanics, thermodynamics, and modern physical systems with guided labs, collaborative discussions, and milestone check-ins.
                  </p>
                </div>
              </div>
            </GlassyCard>

            <GlassyCard className="p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Materials</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Recent modules</h2>
                </div>
                <span className="text-sm text-slate-300">4 total</span>
              </div>

              <div className="mt-8 space-y-4">
                {modules.map((module) => (
                  <div key={module.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-white">{module.title}</p>
                        <p className="mt-2 text-sm text-slate-400">{module.status}</p>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300 uppercase tracking-[0.2em]">{module.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassyCard>

            <GlassyCard className="p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Progress tracker</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Learning milestones</h2>
                </div>
                <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">Updated 12 min ago</span>
              </div>

              <div className="mt-8 space-y-4">
                {progressItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                      <p>{item.label}</p>
                      <p className="font-semibold text-white">{item.value}%</p>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </GlassyCard>
          </div>

          <aside className="space-y-6">
            <GlassyCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Assignments</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Next deliverables</h2>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-2 text-sm text-slate-200">3 pending</span>
              </div>

              <div className="mt-8 space-y-4">
                {['Lab report', 'Quiz', 'Discussion post'].map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-semibold text-white">{item}</p>
                      <span className="rounded-full bg-violet-500/15 px-3 py-1 text-xs text-violet-100">Due soon</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-400">Complete in the next 48 hours to maintain your pace.</p>
                  </div>
                ))}
              </div>
            </GlassyCard>

            <GlassyCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Discussion</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Recent threads</h2>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-2 text-sm text-slate-200">Live</span>
              </div>

              <div className="mt-8 space-y-4">
                {discussions.map((thread) => (
                  <div key={thread.topic} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold text-white">{thread.topic}</p>
                    <div className="mt-2 flex items-center justify-between text-sm text-slate-400">
                      <span>{thread.author}</span>
                      <span>{thread.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassyCard>
          </aside>
        </div>
      </main>
    </div>
  );
}
