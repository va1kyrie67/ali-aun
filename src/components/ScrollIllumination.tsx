'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ScrollIllumination Component
 * Implements the signature Mishal reference reading illumination:
 * Text begins in a muted, elegant gray (#8A867D / opacity ~0.45) and smoothly
 * illuminates to bright radiant ivory (#EFE9DC / opacity 1) as it scrolls into
 * the viewport's primary reading zone.
 */
export default function ScrollIllumination() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const elements = document.querySelectorAll<HTMLElement>('.scroll-illuminate');
    if (!elements || elements.length === 0) return;

    const ctx = gsap.context(() => {
      elements.forEach((el) => {
        gsap.fromTo(
          el,
          {
            opacity: 0.45,
          },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 52%',
              scrub: true,
            },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
