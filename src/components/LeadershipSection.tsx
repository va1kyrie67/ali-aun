'use client';

import React from 'react';
import Image from 'next/image';
import { leaders } from '@/data/siteData';

export default function LeadershipSection() {
  return (
    <section id="leadership" className="px-[var(--pad)] py-24 sm:py-32 border-t border-[rgba(239,233,220,0.14)]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[rgba(239,233,220,0.14)]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8A867D] font-mono block mb-2">
              Leadership &bull; People
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-normal tracking-tight text-[#EFE9DC] scroll-illuminate">
              Strategy &amp; Direction
            </h2>
          </div>
          <p className="max-w-xs text-sm text-[#8A867D] leading-relaxed font-sans scroll-illuminate">
            Executive leadership, technical direction and public editorial channels managed across The Nevon and CrushSVG.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
          {leaders.map((leader, i) => (
            <div
              key={leader.name}
              className="border border-[rgba(239,233,220,0.14)] p-8 sm:p-10 rounded-2xl bg-[#090909] flex flex-col justify-between transform hover:-translate-y-1.5 hover:border-[rgba(239,233,220,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-300 group/card"
            >
              <div>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border border-[rgba(239,233,220,0.2)] shrink-0 bg-[#121212]">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#8A867D] font-mono block">
                      {leader.role}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#EFE9DC] mt-0.5">
                      {leader.name}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-[#B9BCC2] font-sans leading-relaxed mb-6">
                  {leader.bio}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {leader.badges.slice(0, 3).map((b: string, idx: number) => (
                    <span
                      key={idx}
                      className="text-xs font-mono text-[#8A867D] px-2.5 py-1 rounded-full border border-[rgba(239,233,220,0.1)] bg-[rgba(239,233,220,0.02)] hover:border-[rgba(239,233,220,0.4)] hover:text-[#EFE9DC] hover:bg-[rgba(239,233,220,0.08)] hover:-translate-y-0.5 transition-all duration-300 cursor-default select-none inline-block will-change-transform shadow-sm"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[rgba(239,233,220,0.1)] flex items-center justify-between text-xs font-mono">
                <span className="tracking-wider uppercase text-[11px] text-[#8A867D]">Verified Profile</span>
                <a
                  href={leader.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-[rgba(239,233,220,0.22)] bg-[rgba(239,233,220,0.04)] hover:bg-[#EFE9DC] hover:text-[#070707] text-xs font-mono text-[#EFE9DC] tracking-wider inline-flex items-center gap-2 group/btn transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,233,220,0.15)] hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>LinkedIn</span>
                  <span className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5 transition-transform duration-300">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
