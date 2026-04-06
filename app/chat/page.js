import GlassyCard from '@/components/ui/GlassyCard';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

const threads = [
  { name: 'Project Review', unread: 2, latest: 'Prof. Chen: Please update slide 3' },
  { name: 'Lab Questions', unread: 0, latest: 'Zara: I found the same anomaly' },
  { name: 'Exam Prep', unread: 4, latest: 'Class posted new resources' }
];

const messages = [
  { from: 'teacher', text: 'Hi Mia — your project outline looks strong.', time: '11:02 AM' },
  { from: 'student', text: 'Thank you! I will revise the conclusion section today.', time: '11:05 AM' },
  { from: 'teacher', text: 'Great. Don’t forget to mention the energy analysis.', time: '11:12 AM' }
];

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Classroom chat</p>
            <h1 className="mt-3 text-4xl font-semibold text-white">Messages & announcements</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
              Keep conversations focused with teachers and classmates. Announcements appear instantly at the top.
            </p>
          </div>
          <Link href="/" className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10">
            Back to dashboard
          </Link>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[320px_1fr]">
          <aside className="space-y-6">
            <GlassyCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Threads</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Recent discussions</h2>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-2 text-sm text-slate-200">3 active</span>
              </div>

              <div className="mt-8 space-y-3">
                {threads.map((thread) => (
                  <div key={thread.name} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-white">{thread.name}</p>
                        <p className="mt-1 text-sm text-slate-400">{thread.latest}</p>
                      </div>
                      {thread.unread > 0 ? (
                        <span className="rounded-full bg-violet-500 px-3 py-1 text-xs text-white">{thread.unread}</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </GlassyCard>

            <GlassyCard className="p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Announcement</p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Live classroom update</h2>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-violet-500/10 p-5 text-slate-100">
                <p className="font-semibold">Prof. Hart posted a new review session</p>
                <p className="mt-3 text-sm text-slate-200">Join the optional review session today at 5 PM in room B14 or online. Bring your draft reports.</p>
              </div>
            </GlassyCard>
          </aside>

          <section className="space-y-6">
            <GlassyCard className="p-8">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={`${message.from}-${message.time}`} className={`rounded-3xl p-5 ${message.from === 'teacher' ? 'bg-white/5 text-slate-100' : 'bg-violet-500/10 text-slate-100'} ${message.from === 'student' ? 'self-end' : ''}`}>
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">{message.from === 'teacher' ? 'Instructor' : 'You'}</span>
                      <span className="text-xs text-slate-500">{message.time}</span>
                    </div>
                    <p className="mt-3 text-sm leading-7">{message.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <input type="text" placeholder="Write a message..." className="flex-1 rounded-2xl border border-white/10 bg-[rgba(255,255,255,0.06)] px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400" />
                  <button className="rounded-2xl bg-linear-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-95">
                    Send message
                  </button>
                </div>
              </div>
            </GlassyCard>
          </section>
        </div>
      </main>
    </div>
  );
}
