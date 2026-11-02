'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTarget } from '@/lib/lenis';

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-12 px-4 text-center">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center font-black text-xs text-white">
            AA
          </div>
          <div className="text-left">
            <p className="text-xs font-bold text-white">Ali Aun</p>
            <p className="text-[10px] text-zinc-500 font-mono">Digital Architecture &amp; Senior SQA</p>
          </div>
        </div>

        <p className="text-xs text-zinc-500 font-mono">
          &copy; {new Date().getFullYear()} Ali Aun. Crafted with Next.js, Framer Motion &amp; Lenis.
        </p>

        <button
          onClick={() => scrollToTarget('#overview')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
