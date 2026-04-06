'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [theme, setTheme] = useState('dark');
  const user = { name: 'Mia Tanner', role: 'Student' };

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('classroom-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', theme === 'dark');
    document.documentElement.classList.toggle('theme-light', theme === 'light');
    window.localStorage.setItem('classroom-theme', theme);
  }, [theme]);

  return (
    <nav className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(7,8,15,0.82)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-3xl bg-linear-to-br from-violet-500 via-fuchsia-500 to-indigo-500 p-3 shadow-[0_18px_45px_rgba(139,92,246,0.24)]">
            <span className="text-xl">🎓</span>
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">ClassHive</p>
            <h1 className="text-lg font-semibold text-white">Modern Learning Hub</h1>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-between gap-3 sm:justify-end">
          <div className="hidden md:flex items-center gap-4 text-sm text-slate-300">
            <Link href="/" className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white">
              Dashboard
            </Link>
            <Link href="/course" className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white">
              Course
            </Link>
            <Link href="/assignment" className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white">
              Assignment
            </Link>
            <Link href="/chat" className="rounded-full px-3 py-2 transition hover:bg-white/10 hover:text-white">
              Chat
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 transition hover:border-white/20 hover:bg-white/10"
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-white">M</span>
              <div className="hidden sm:block text-left">
                <p className="text-xs text-slate-400">Welcome back</p>
                <p className="text-sm font-medium text-white">{user.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
