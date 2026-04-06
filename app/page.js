import Link from 'next/link';
import GlassyCard from '@/components/ui/GlassyCard';
import Navbar from '@/components/Navbar';

const courses = [
  {
    title: 'Applied Mathematics',
    instructor: 'Dr. Stella Hart',
    progress: 82,
    due: '3 assignments due',
    color: 'from-violet-500 to-fuchsia-500'
  },
  {
    title: 'Modern Physics',
    instructor: 'Prof. Luis Chen',
    progress: 68,
    due: '1 quiz due',
    color: 'from-indigo-500 to-violet-500'
  },
  {
    title: 'Design & Communication',
    instructor: 'Ms. Zara Patel',
    progress: 93,
    due: 'New announcement',
    color: 'from-fuchsia-500 to-pink-500'
  }
];

const assignments = [
  {
    name: 'Lab Report: Kinematics',
    course: 'Modern Physics',
    due: 'Apr 10',
    status: 'Due Soon',
    tag: 'Physics'
  },
  {
    name: 'Project Proposal',
    course: 'Design & Communication',
    due: 'Apr 13',
    status: 'Pending',
    tag: 'Design'
  },
  {
    name: 'Quiz: Vector Algebra',
    course: 'Applied Mathematics',
    due: 'Apr 11',
    status: 'Review',
    tag: 'Math'
  }
];

const notifications = [
  { title: 'New announcement from Prof. Hart', detail: 'Midterm review session today at 5 PM' },
  { title: 'Assignment grading available', detail: 'Your last quiz score is ready' },
  { title: 'Discussion reply received', detail: 'Ms. Patel answered your question' }
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-8">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <section className="space-y-6">
            <GlassyCard className="p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Welcome back,</p>
                  <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">Your learning dashboard</h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                    Track courses, assignments, announcements, and classroom conversations from one polished hub.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Link href="/course" className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10">
                    View course details
                  </Link>
                  <Link href="/assignment" className="rounded-3xl bg-linear-to-r from-violet-500 to-fuchsia-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-[0_20px_40px_rgba(139,92,246,0.22)] transition hover:opacity-95">
                    Open assignments
                  </Link>
                </div>
              </div>
            </GlassyCard>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { title: 'Enrolled Courses', value: '6', description: 'Active classes this semester' },
                { title: 'Upcoming Deadlines', value: '4', description: 'Due in the next 5 days' },
                { title: 'Unread Alerts', value: '2', description: 'New announcements & replies' }
              ].map((metric) => (
                <div key={metric.title} className="glass-panel rounded-3xl p-6">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{metric.title}</p>
                  <p className="mt-4 text-3xl font-semibold text-white">{metric.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{metric.description}</p>
                </div>
              ))}
            </div>

            <GlassyCard className="p-8">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Upcoming activity</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Next milestone reminders</h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full bg-violet-500/20 px-4 py-2 text-sm text-violet-100">Priority: Review</span>
                  <span className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">2 chats waiting</span>
                </div>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {assignments.slice(0, 3).map((assignment) => (
                  <div key={assignment.name} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white">{assignment.name}</p>
                    <p className="mt-2 text-sm text-slate-400">{assignment.course}</p>
                    <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-300">
                      <span>{assignment.status}</span>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-slate-200">{assignment.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassyCard>

            <GlassyCard className="p-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Community</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Recent announcements</h2>
                </div>
                <Link href="/chat" className="rounded-3xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Open discussion threads
                </Link>
              </div>

              <div className="mt-8 space-y-4">
                {notifications.map((note) => (
                  <div key={note.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm font-semibold text-white">{note.title}</p>
                    <p className="mt-2 text-sm text-slate-300">{note.detail}</p>
                  </div>
                ))}
              </div>
            </GlassyCard>
          </section>

          <aside className="space-y-6">
            <GlassyCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Student profile</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Mia Tanner</h2>
                </div>
                <span className="inline-flex rounded-3xl bg-violet-500/20 px-4 py-2 text-sm text-violet-100">Student</span>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-sm text-slate-400">GPA</p>
                  <p className="mt-2 text-3xl font-semibold text-white">3.9</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-sm text-slate-400">Attendance</p>
                  <p className="mt-2 text-3xl font-semibold text-white">89%</p>
                </div>
                <div className="rounded-3xl bg-white/5 p-5">
                  <p className="text-sm text-slate-400">Focus Hours</p>
                  <p className="mt-2 text-3xl font-semibold text-white">28h</p>
                </div>
              </div>
            </GlassyCard>

            <GlassyCard className="p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Course list</p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">Active classes</h2>
                </div>
                <span className="rounded-3xl bg-white/5 px-4 py-2 text-sm text-slate-200">6 total</span>
              </div>

              <div className="mt-8 space-y-4">
                {courses.map((course) => (
                  <div key={course.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{course.title}</p>
                        <p className="mt-1 text-sm text-slate-400">{course.instructor}</p>
                      </div>
                      <div className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">{course.due}</div>
                    </div>
                    <div className="mt-4 rounded-full bg-white/10 p-1">
                      <div className={`h-2 rounded-full bg-linear-to-r ${course.color}`} style={{ width: `${course.progress}%` }} />
                    </div>
                    <p className="mt-3 text-sm text-slate-300">Progress: {course.progress}%</p>
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
