'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectSpec } from '@/types/portfolio';
import { getLenis } from '@/lib/lenis';

interface SpecsModalProps {
  isOpen: boolean;
  onClose: () => void;
  spec: ProjectSpec | null;
}

export default function SpecsModal({ isOpen, onClose, spec }: SpecsModalProps) {
  useEffect(() => {
    const lenis = getLenis();
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = 'hidden';
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    }

    return () => {
      if (lenis) lenis.start();
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && spec && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          data-lenis-prevent
          className="fixed inset-0 z-[140] bg-[#070707] text-[#EFE9DC] overflow-y-auto px-[var(--pad)] py-20"
        >
          {/* Close Floating Pill */}
          <button
            onClick={onClose}
            className="fixed top-6 right-6 sm:right-12 z-50 px-6 py-2.5 rounded-full border border-[rgba(239,233,220,0.5)] bg-[#070707]/80 backdrop-blur-md text-[#EFE9DC] font-serif text-sm hover:bg-[#EFE9DC] hover:text-[#070707] transition-all cursor-pointer"
          >
            Close &times;
          </button>

          <div className="max-w-4xl mx-auto pt-10">
            {/* Title */}
            <span className="text-xs uppercase tracking-widest text-[#8A867D] font-mono block mb-3">
              System Architecture &bull; Specifications
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#EFE9DC]">
              {spec.title}
            </h2>

            {/* Quick Metadata Matrix */}
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-6 my-10 pt-6 border-t border-[rgba(239,233,220,0.14)]">
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8A867D] font-mono">Discipline</dt>
                <dd className="font-serif text-lg sm:text-xl text-[#EFE9DC] mt-1">
                  Architecture &amp; Quality
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8A867D] font-mono">Verification</dt>
                <dd className="font-serif text-lg sm:text-xl text-[#EFE9DC] mt-1">
                  Production Validated
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8A867D] font-mono">Architect</dt>
                <dd className="font-serif text-lg sm:text-xl text-[#EFE9DC] mt-1">
                  Ali Aun
                </dd>
              </div>
            </dl>

            {/* Content Body */}
            {spec.rawHtml && (
              <div
                className="mt-10 font-sans text-sm sm:text-base text-[#B9BCC2] leading-relaxed [&_h4]:font-serif [&_h4]:text-2xl [&_h4]:text-[#EFE9DC] [&_h4]:mt-8 [&_h4]:mb-3 [&_p]:text-[#B9BCC2] [&_p]:my-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-2 [&_strong]:text-[#EFE9DC] [&_div]:my-4"
                dangerouslySetInnerHTML={{ __html: spec.rawHtml }}
              />
            )}

            {/* Bottom Done Trigger */}
            <div className="mt-16 pt-8 border-t border-[rgba(239,233,220,0.14)] flex items-center justify-between">
              <span className="text-xs font-mono text-[#8A867D]">
                ALI AUN &bull; ARCHITECTURAL DIRECTORY
              </span>
              <button
                onClick={onClose}
                className="btn-editorial"
              >
                <span>Back to Overview</span>
                <span>&rarr;</span>
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
