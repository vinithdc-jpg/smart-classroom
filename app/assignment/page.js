import GlassyCard from '@/components/ui/GlassyCard';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const checklist = [
  { label: 'Draft initial response', complete: true },
  { label: 'Attach lab dataset', complete: false },
  { label: 'Review rubric', complete: false },
  { label: 'Submit before deadline', complete: false }
];

const reminders = [
  { label: 'Submit draft comments', detail: 'Meeting at 4PM' },
  { label: 'Peer review available', detail: '3 submissions ready' }
];

export default function AssignmentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Assignment hub</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Lab Report: Kinematics</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Submit your analysis with attachments, review status, and deadline warnings all in one place.
            </p>
          </div>
          <Link href="/chat" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
            Ask the instructor
          </Link>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="space-y-6">
            <GlassyCard className="p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Task details</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Submit your physics lab report</h2>
                </div>
                <span className="rounded-full bg-rose-500/20 px-4 py-2 text-sm text-rose-100">Due Apr 10</span>
              </div>

              <div className="mt-8 space-y-6">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm text-slate-300">Objective</p>
                  <p className="mt-3 text-slate-100 leading-7">
                    Analyze motion data from the kinematics lab, explain experimental variance, and connect your findings to theoretical models.
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Status</p>
                    <p className="mt-2 text-xl font-semibold text-white">Drafting</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm text-slate-400">Grade impact</p>
                    <p className="mt-2 text-xl font-semibold text-white">15%</p>
                  </div>
                </div>
              </div>
            </GlassyCard>

            <GlassyCard className="p-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Submission</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Upload and track status</h2>
                </div>
                <button className="rounded-full bg-linear-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95">
                  Upload file
                </button>
              </div>

              <div className="mt-8 space-y-4">
                {checklist.map((item) => (
                  <div key={item.label} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className={`h-7 w-7 rounded-full flex items-center justify-center ${item.complete ? 'bg-green-500 text-white' : 'bg-slate-700 text-slate-300'}`}>
                      {item.complete ? '✓' : '∘'}
                    </div>
                    <p className="text-sm text-slate-200">{item.label}</p>
                  </div>
                ))}
              </div>
            </GlassyCard>
          </article>

          <aside className="space-y-6">
            <GlassyCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Deadline alert</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Time remaining</h2>
                </div>
                <span className="rounded-full bg-rose-500/20 px-4 py-2 text-sm text-rose-100">2 days left</span>
              </div>

              <div className="mt-8 rounded-3xl bg-white/5 p-5 text-slate-300">
                <p className="text-sm">A gentle reminder appears when your assignment is approaching the due date, helping you stay ahead of last-minute work.</p>
              </div>
            </GlassyCard>

            <GlassyCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Instructor notes</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Guidelines</h2>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {reminders.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <p className="font-semibold text-white">{item.label}</p>
                    <p className="mt-2 text-sm text-slate-400">{item.detail}</p>
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
