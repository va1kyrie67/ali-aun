'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { scrollToTarget } from '@/lib/lenis';

const disciplines = [
  {
    number: '01',
    title: 'Web Engineering & Architecture',
    detail: 'Next.js 14, TypeScript, Tailwind CSS, Framer Motion',
    href: '#web-engineering',
  },
  {
    number: '02',
    title: 'Production Email Systems',
    detail: 'Pro-Dent Club (17 templates), Smart Appliance Services (12 templates)',
    href: '#email-systems',
  },
  {
    number: '03',
    title: 'Senior SQA Automation & Audits',
    detail: 'Playwright E2E, Postman, 16-Section Compliance, XSS Checks',
    href: '#qa-audits',
  },
  {
    number: '04',
    title: 'Autonomous AI & Workflow Pipelines',
    detail: 'n8n Event Engines, Google Gemini LLM API, Slack Workspace Bots',
    href: '#ai-automation',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="px-[var(--pad)] pt-28 sm:pt-40 pb-24 sm:pb-36 border-t border-[rgba(239,233,220,0.14)]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16"
        >
          <p className="md:col-span-3 text-xs uppercase tracking-widest text-[#8A867D] font-mono pt-2 sm:pt-3">
            Discipline &bull; About
          </p>
          <div className="md:col-span-9 max-w-3xl">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#EFE9DC]">
              Software, email systems and engines that look calm and work hard.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[#B9BCC2] leading-relaxed font-sans max-w-xl">
              Clear architecture, verified quality standards, and zero unnecessary noise.
            </p>
          </div>
        </motion.div>

        {/* Disciplines Rows with Staggered Scroll Reveal */}
        <div className="mt-20 border-t border-[rgba(239,233,220,0.14)]" role="list">
          {disciplines.map((item, i) => (
            <motion.button
              key={item.number}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => scrollToTarget(item.href)}
              className="w-full text-left py-6 sm:py-8 border-b border-[rgba(239,233,220,0.14)] grid grid-cols-12 items-baseline gap-4 text-[#B9BCC2] hover:text-[#EFE9DC] hover:pl-4 transition-[padding,color,border-color] duration-300 ease-out select-none group"
              role="listitem"
            >
              <span className="col-span-2 sm:col-span-1 font-serif text-[#8A867D] text-sm">
                {item.number}
              </span>
              <strong className="col-span-10 sm:col-span-6 font-serif text-xl sm:text-3xl font-normal text-[#EFE9DC]">
                {item.title}
              </strong>
              <em className="col-span-12 sm:col-span-5 sm:text-right not-italic text-xs sm:text-sm text-[#8A867D] font-sans group-hover:text-[#B9BCC2] transition-colors pr-2 sm:truncate">
                {item.detail}
              </em>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
