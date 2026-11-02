'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x: x * 6, y: -y * 6 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <header
        id="top"
        className="relative min-h-screen flex flex-col justify-end px-[var(--pad)] pb-16 sm:pb-24 pt-28 overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {/* Full-Bleed 3D Metallic Sculpture & Starry Particles Background */}
        <HeroCanvas />

        {/* Ambient Subtle Glow */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(239,233,220,0.035)_0%,transparent_70%)] pointer-events-none z-[1]" />

        {/* Foreground Content Stack - Left-Aligned with Navbar Padding */}
        <div className="relative z-10 w-full max-w-7xl text-left pointer-events-auto">
          {/* Monumental Editorial H1 with subtle 3D cursor tilt */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{
              opacity: 1,
              y: 0,
              rotateX: mousePos.y,
              rotateY: mousePos.x,
            }}
            transition={{
              opacity: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              y: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
              rotateX: { duration: 0.2, ease: 'easeOut' },
              rotateY: { duration: 0.2, ease: 'easeOut' },
            }}
            style={{ transformStyle: 'preserve-3d' }}
            className="will-change-transform max-w-[85%]"
          >
            <motion.h1
              whileHover={{ x: 4 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(4.2rem,13vw,14.5rem)] font-light leading-[0.82] tracking-[-0.02em] text-[#EFE9DC] -ml-[0.04em] select-none cursor-default inline-block will-change-transform"
            >
              Ali Aun
            </motion.h1>
          </motion.div>

          {/* Subtitle in Editorial Serif */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(1.15rem,2.4vw,2.2rem)] font-normal leading-[1.25] text-[#B9BCC2] mt-4 mb-4 max-w-[26ch] select-none"
          >
            Digital Architect &amp; Senior SQA Specialist crafting software, email systems and automation engines.
          </motion.p>
        </div>
      </header>

      {/* Infinite Editorial Marquee */}
      <div
        className="w-full overflow-hidden border-y border-[rgba(239,233,220,0.14)] py-4 sm:py-5 select-none"
        aria-hidden="true"
      >
        <div className="animate-marquee whitespace-nowrap text-[#B9BCC2] font-serif text-[clamp(1.2rem,2.8vw,2.4rem)]">
          <span className="inline-flex items-center gap-8 px-4">
            <span>Next.js 14</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>Playwright E2E</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>Postman Automation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>Outlook VML Email Systems</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>n8n Autonomous Pipelines</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>Google Gemini LLM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>The Nevon</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>CrushSVG</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
          </span>
          <span className="inline-flex items-center gap-8 px-4">
            <span>Next.js 14</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>Playwright E2E</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>Postman Automation</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>Outlook VML Email Systems</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>n8n Autonomous Pipelines</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>Google Gemini LLM</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>The Nevon</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
            <span>CrushSVG</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#EFE9DC] opacity-50" />
          </span>
        </div>
      </div>
    </>
  );
}
