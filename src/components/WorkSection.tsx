'use client';

import React, { useState, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { CategoryId } from '@/types/portfolio';
import { projects, categories } from '@/data/siteData';

interface WorkSectionProps {
  onOpenSpecs: (specKey: string) => void;
}

export default function WorkSection({ onOpenSpecs }: WorkSectionProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="work" className="px-[var(--pad)] py-24 sm:py-32 max-w-7xl mx-auto scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-[rgba(239,233,220,0.14)]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#8A867D] font-mono block mb-2">
            Selected Systems
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#EFE9DC] leading-[0.95]">
            Work that speaks first.
          </h2>
        </div>
        <p className="max-w-xs text-sm text-[#8A867D] leading-relaxed font-sans">
          Engineered across web architecture, enterprise email systems, automated testing and autonomous AI pipelines.
        </p>
      </div>

      {/* Minimal Category Filter Tabs */}
      <div className="flex items-center gap-6 sm:gap-10 overflow-x-auto pb-4 mb-10 text-xs sm:text-sm font-sans whitespace-nowrap scrollbar-none border-b border-[rgba(239,233,220,0.08)]">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`pb-3 transition-colors ${
                isActive
                  ? 'text-[#EFE9DC] font-medium border-b-2 border-[#EFE9DC]'
                  : 'text-[#8A867D] hover:text-[#B9BCC2]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Target Anchors for Direct Jump Links */}
      <div id="web-engineering" className="scroll-mt-28" />
      <div id="email-systems" className="scroll-mt-28" />
      <div id="qa-audits" className="scroll-mt-28" />
      <div id="content-strategy" className="scroll-mt-28" />
      <div id="ai-automation" className="scroll-mt-28" />

      {/* Projects List */}
      <div>
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            onOpenSpecs={onOpenSpecs}
          />
        ))}
      </div>
    </section>
  );
}
