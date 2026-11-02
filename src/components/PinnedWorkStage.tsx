'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/siteData';
import { ProjectItem } from '@/types/portfolio';

interface PinnedWorkStageProps {
  onOpenSpecs: (specKey: string) => void;
}

export default function PinnedWorkStage({ onOpenSpecs }: PinnedWorkStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    const stage = stageRef.current;
    if (!stage) return;

    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    if (panels.length <= 1) return;

    const ctx = gsap.context(() => {
      // Set initial positions: panel 0 is visible, panels 1..n are pushed down
      // Panels 1..n left content start at opacity 0 and y 35
      panels.forEach((panel, i) => {
        if (i > 0) {
          gsap.set(panel, { yPercent: 100 });
          const leftContent = panel.querySelector('.panel-left-content');
          if (leftContent) {
            gsap.set(leftContent, { opacity: 0, y: 35 });
          }
        }
      });

      const totalPanels = panels.length;
      const scrollDistance = window.innerHeight * (totalPanels - 1) * 1.15;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stage,
          pin: true,
          scrub: 0.15, // Responsive 1:1 sync with Lenis smooth scroll - zero lag
          start: 'top top',
          end: () => `+=${scrollDistance}`,
        },
      });

      // Smooth, solid panel stacking with synchronized staggered text glide-in
      panels.forEach((panel, i) => {
        if (i === 0) return;
        const leftContent = panel.querySelector('.panel-left-content');

        // Panel rises into view
        tl.to(panel, {
          yPercent: 0,
          ease: 'none',
          duration: 1,
        });

        // Left text glides in gracefully as panel arrives
        if (leftContent) {
          tl.to(
            leftContent,
            {
              opacity: 1,
              y: 0,
              ease: 'power2.out',
              duration: 0.5,
            },
            `-=${0.5}` // begins as the panel is arriving
          );
        }
      });
    }, stage);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full bg-[#070707] text-[#EFE9DC]">
      {/* Intro Anchor / Section Header */}
      <div id="work" className="px-[var(--pad)] pt-24 pb-8 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[rgba(239,233,220,0.14)]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#8A867D] font-mono block mb-2">
            Selected Architecture
          </span>
          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#EFE9DC] leading-[0.95]">
            Work that speaks first.
          </h2>
        </div>
        <p className="max-w-xs text-sm text-[#8A867D] leading-relaxed font-sans">
          Pinned scroll showcase of 8 verified production systems. Each layer unfolds smoothly as you advance through the architecture.
        </p>
      </div>

      {/* Pinned Stage Viewport */}
      <div
        ref={stageRef}
        id="stage"
        className="relative w-full h-screen overflow-hidden bg-[#070707]"
      >
        {/* Stacked Panels */}
        {projects.map((project: ProjectItem, index: number) => {
          return (
            <div
              key={project.id}
              ref={(el) => {
                panelsRef.current[index] = el;
              }}
              className="absolute inset-0 w-full h-full flex items-center px-[var(--pad)] pt-20 pb-8 sm:pb-12 bg-[#070707] border-t border-[rgba(239,233,220,0.14)] shadow-2xl origin-bottom will-change-transform"
              style={{ zIndex: index + 10 }}
            >
              {/* Radial Backdrop Glow */}
              <div
                className="absolute inset-0 pointer-events-none opacity-40"
                style={{
                  background:
                    index % 2 === 0
                      ? 'radial-gradient(ellipse at 60% 40%, rgba(239, 233, 220, 0.06) 0%, transparent 70%)'
                      : 'radial-gradient(ellipse at 60% 40%, rgba(185, 188, 194, 0.05) 0%, transparent 70%)',
                }}
              />

              {/* Side-by-Side Split Desktop Composition matching Reference Video */}
              <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full max-h-[82vh]">
                {/* Left Column: Typography, Details & Action Triggers with Dynamic Staggered Reveal */}
                <div className="panel-left-content lg:col-span-5 flex flex-col justify-center gap-4 pr-0 lg:pr-4 will-change-transform">
                  <span className="text-xs uppercase tracking-widest text-[#8A867D] font-mono block mb-2">
                    {project.badge}
                  </span>

                  <h3 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#EFE9DC] tracking-tight leading-[0.98]">
                    {project.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#B9BCC2] font-sans leading-relaxed">
                    {project.description}
                  </p>

                  {/* Actions Row */}
                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <button
                      onClick={() => onOpenSpecs(project.specKey)}
                      className="btn-editorial text-xs sm:text-sm !py-3 !px-6"
                    >
                      <span>View case study</span>
                      <span>&rarr;</span>
                    </button>

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-3 rounded-full border border-[rgba(239,233,220,0.3)] text-xs font-sans text-[#EFE9DC] hover:bg-[#EFE9DC] hover:text-[#070707] transition-all inline-flex items-center gap-2"
                      >
                        <span>{project.actionLabel || 'Visit live site'}</span>
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Column: Expansive Desktop Browser Frame with Zoom-Out Size Protection */}
                <div className="lg:col-span-7 h-full flex items-center justify-center min-h-0">
                  <div className="w-full max-w-[680px] max-h-[540px] aspect-[16/11] rounded-xl border border-[rgba(239,233,220,0.18)] bg-[#101010] shadow-[0_25px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden transition-all duration-500 ease-out hover:scale-[1.012] hover:border-[rgba(239,233,220,0.38)] hover:shadow-[0_30px_70px_rgba(0,0,0,0.95)] group/frame">
                    {/* macOS Browser Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#171717] border-b border-[rgba(239,233,220,0.1)] shrink-0 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>

                      {/* URL Pill Bar */}
                      <div className="flex items-center gap-2 px-4 py-1 rounded-full bg-[#070707]/70 border border-[rgba(239,233,220,0.08)] text-[11px] font-mono text-[#8A867D] max-w-[60%] truncate">
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="opacity-60"
                        >
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                        <span className="truncate">{project.mockupUrl || project.liveUrl || 'system.production.node'}</span>
                      </div>

                      <div className="w-12 text-right text-[11px] font-mono text-[#8A867D]">
                        {project.badge.split('•')[0].trim()}
                      </div>
                    </div>

                    {/* Browser Content Area: Displays Full Height Desktop Interface with Matching Canvas Ground */}
                    <div
                      className={`relative w-full flex-1 overflow-hidden ${
                        project.category === 'ai-automation' ? 'bg-[#030710]' : 'bg-[#0c0c0c]'
                      }`}
                    >
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1200px) 100vw, 850px"
                        className={`${
                          project.category === 'ai-automation'
                            ? 'object-contain object-center p-3'
                            : 'object-cover object-top'
                        } transition-transform duration-700 ease-out group-hover/frame:scale-[1.025]`}
                        priority={index < 2}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
