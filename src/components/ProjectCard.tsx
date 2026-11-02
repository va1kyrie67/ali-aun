'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '@/types/portfolio';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpenSpecs: (specKey: string) => void;
}

export default function ProjectCard({ project, index, onOpenSpecs }: ProjectCardProps) {
  const numberFormatted = String(index + 1).padStart(2, '0');

  return (
    <article className="border-t border-[rgba(239,233,220,0.14)] pt-12 pb-16 flex flex-col lg:flex-row gap-8 lg:gap-14 items-start justify-between">
      {/* Left: Metadata & Typography */}
      <div className="flex-1 max-w-2xl">
        <div className="flex items-center gap-4 text-[#8A867D] font-mono text-xs uppercase tracking-wider mb-3">
          <span className="font-serif text-[#EFE9DC] text-base">{numberFormatted}</span>
          <span>&bull;</span>
          <span>{project.categoryLabel.split('&')[0].trim()}</span>
          <span>&bull;</span>
          <span className="text-[#B9BCC2]">{project.client}</span>
        </div>

        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.05] tracking-tight text-[#EFE9DC] mb-4">
          {project.title}
        </h3>

        {/* Concise Description: only needed text */}
        <p className="text-sm sm:text-base text-[#B9BCC2] font-sans leading-relaxed max-w-xl mb-6">
          {project.description}
        </p>

        {/* Minimal Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.slice(0, 4).map((tag, i) => (
            <span
              key={i}
              className="text-xs font-mono text-[#8A867D] px-2.5 py-1 rounded-full border border-[rgba(239,233,220,0.1)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions in Editorial Style */}
        <div className="flex items-center gap-4 flex-wrap">
          <button
            onClick={() => onOpenSpecs(project.specKey)}
            className="btn-editorial"
          >
            <span>Inspect Specs</span>
            <span className="text-xs">&rarr;</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#B9BCC2] hover:text-[#EFE9DC] hover:underline underline-offset-8 transition-all px-2 py-2"
            >
              <span>Visit Live</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Right: Clean Editorial Preview Frame */}
      <div className="w-full lg:w-[48%] relative aspect-[16/10] rounded-xl overflow-hidden border border-[rgba(239,233,220,0.14)] bg-[#0C0C0C] group">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070707]/60 via-transparent to-transparent pointer-events-none" />
      </div>
    </article>
  );
}
