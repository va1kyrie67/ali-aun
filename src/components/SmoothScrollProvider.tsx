'use client';

import React, { useEffect } from 'react';
import { initLenis, scrollToTarget } from '@/lib/lenis';

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = initLenis();

    // Intercept internal hash links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          scrollToTarget(targetElement as HTMLElement);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return (
    <>
      {/* Editorial navigation shutter for calm, luxurious long-distance section jumps */}
      <div
        id="nav-shutter"
        className="fixed inset-0 z-[120] pointer-events-none bg-[#070707] opacity-0 will-change-opacity"
        aria-hidden="true"
      />
      {children}
    </>
  );
}
