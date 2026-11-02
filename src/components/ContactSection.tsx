'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteData';

export default function ContactSection() {
  return (
    <section id="contact" className="px-[var(--pad)] pt-24 sm:pt-36 pb-12 border-t border-[rgba(239,233,220,0.14)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Main Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center justify-between"
        >
          <div className="lg:col-span-8">
            <h2 className="font-serif text-[clamp(2.5rem,7vw,7rem)] font-normal leading-[1.02] tracking-tight text-[#EFE9DC] max-w-[14ch]">
              Have a system to build? Let&apos;s make it work.
            </h2>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-[#EFE9DC] text-[#070707] flex flex-col items-center justify-center gap-2 font-serif text-lg sm:text-2xl transform hover:scale-105 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(239,233,220,0.18)] transition-all duration-300 ease-out active:scale-95 cursor-pointer"
            >
              <span>Let&apos;s talk</span>
              <svg width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M3 13 13 3M5 3h8v8" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Contact Links */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center gap-8 sm:gap-14 mt-16 sm:mt-24 text-base sm:text-xl font-serif text-[#EFE9DC] select-none"
        >
          <a
            href={`mailto:${siteConfig.socials.email}`}
            className="inline-flex items-center gap-2 pb-1.5 border-b border-[rgba(239,233,220,0.2)] hover:border-[#EFE9DC] text-[#EFE9DC] hover:text-white hover:-translate-y-1 transition-all duration-300 ease-out group"
          >
            <span>{siteConfig.socials.email}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 opacity-70 group-hover:opacity-100">↗</span>
          </a>

          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 pb-1.5 border-b border-[rgba(239,233,220,0.2)] hover:border-[#EFE9DC] text-[#EFE9DC] hover:text-white hover:-translate-y-1 transition-all duration-300 ease-out group"
          >
            <span>LinkedIn</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>
        </motion.div>

        {/* Footer Bar */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 pt-6 border-t border-[rgba(239,233,220,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#8A867D]"
        >
          <span>
            &copy; {new Date().getFullYear()} Ali Aun &bull; Digital Architecture &amp; Senior SQA Specialist
          </span>
          <span className="font-mono text-[#8A867D]">
            Crafted with Precision
          </span>
        </motion.footer>

        {/* Grand Background Watermark */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.25 }}
          className="font-serif text-[clamp(5rem,24vw,26rem)] font-normal text-[rgba(239,233,220,0.05)] leading-[0.8] tracking-tight text-center mt-8 sm:mt-12 -mb-6 select-none pointer-events-none"
          aria-hidden="true"
        >
          Ali Aun
        </motion.div>
      </div>
    </section>
  );
}
