'use client';

import React from 'react';
import { workDisciplines, WorkDisciplineItem } from '@/data/siteData';

interface WorkIndexListProps {
  onOpenSpecs: (specKey: string) => void;
}

export default function WorkIndexList({ onOpenSpecs }: WorkIndexListProps) {
  return (
    <section className="px-[var(--pad)] py-24 sm:py-32 max-w-7xl mx-auto bg-[#070707] text-[#EFE9DC] border-t border-[rgba(239,233,220,0.14)]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[rgba(239,233,220,0.14)]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#8A867D] font-mono block mb-2">
            Discipline Index &bull; 08 Production Systems
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#EFE9DC] leading-[0.95] scroll-illuminate">
            Engineering Directory.
          </h2>
        </div>
        <p className="max-w-xs text-sm text-[#8A867D] leading-relaxed font-sans scroll-illuminate">
          Complete register of validated architectures, SQA launch passes, email systems, and autonomous engines.
        </p>
      </div>

      {/* 8 Disciplines Rows List (Matching Image 4 & Mishal Reference) */}
      <div className="divide-y divide-[rgba(239,233,220,0.12)] border-b border-[rgba(239,233,220,0.12)]">
        {workDisciplines.map((item: WorkDisciplineItem) => {
          return (
            <div
              key={item.id}
              onClick={() => onOpenSpecs(item.specKey)}
              className="group py-8 sm:py-10 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer transition-colors hover:bg-[#EFE9DC]/[0.02] px-2 sm:px-4 -mx-2 sm:-mx-4 rounded-lg"
            >
              {/* Left Column: Number + Title + Subtitle */}
              <div className="flex items-start sm:items-center gap-6 sm:gap-10">
                <span className="font-serif text-2xl sm:text-4xl text-[#8A867D] group-hover:text-[#EFE9DC] transition-colors shrink-0 w-10">
                  {item.number}
                </span>

                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-serif text-2xl sm:text-4xl text-[#EFE9DC] tracking-tight group-hover:translate-x-1 transition-transform duration-300">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-[#8A867D] group-hover:text-[#B9BCC2] transition-colors mt-1.5 max-w-2xl font-sans leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Right Column: View Case Study Trigger */}
              <div className="shrink-0 flex items-center gap-4 self-end md:self-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenSpecs(item.specKey);
                  }}
                  className="btn-editorial text-xs sm:text-sm !py-2.5 !px-5"
                >
                  <span>View case study</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
