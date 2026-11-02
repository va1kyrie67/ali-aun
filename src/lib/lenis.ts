'use client';

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    return null;
  }

  if (lenisInstance) {
    return lenisInstance;
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 1.5,
  });

  lenisInstance = lenis;
  // Expose to window for global access
  (window as unknown as { lenis: Lenis }).lenis = lenis;

  // Synchronize with GSAP ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Drive Lenis through GSAP ticker for optimal frame-rate synchronization
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement, offset: number = -80) {
  if (typeof window === 'undefined') return;
  const lenis = lenisInstance || (window as unknown as { lenis?: Lenis }).lenis;
  const shutter = document.getElementById('nav-shutter');

  // Dedicated handling for top of page
  if (target === '#top' || target === 'top') {
    const distance = Math.abs(window.scrollY);
    if (distance > 2000 && shutter) {
      gsap.to(shutter, {
        opacity: 1,
        duration: 0.22,
        ease: 'power2.inOut',
        onComplete: () => {
          if (lenis) {
            lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
          ScrollTrigger.refresh();
          gsap.to(shutter, {
            opacity: 0,
            duration: 0.28,
            delay: 0.05,
            ease: 'power2.out',
          });
        },
      });
      return;
    }

    if (lenis) {
      const duration = Math.min(1.8, Math.max(1.0, 0.8 + distance / 4000));
      lenis.scrollTo(0, {
        duration,
        easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }

  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;

  const targetTop = (el as HTMLElement).getBoundingClientRect().top;
  const distance = Math.abs(targetTop);

  // For long distance jumps crossing the pinned stage (e.g. #top to #contact or #leadership):
  // Perform an editorial shutter transition to prevent chaotic rapid card whipping
  if (distance > 2000 && shutter) {
    gsap.to(shutter, {
      opacity: 1,
      duration: 0.22,
      ease: 'power2.inOut',
      onComplete: () => {
        if (lenis) {
          lenis.scrollTo(typeof target === 'string' ? target : (el as HTMLElement), {
            offset,
            immediate: true,
          });
        } else {
          (el as HTMLElement).scrollIntoView();
        }
        ScrollTrigger.refresh();
        gsap.to(shutter, {
          opacity: 0,
          duration: 0.28,
          delay: 0.05,
          ease: 'power2.out',
        });
      },
    });
    return;
  }

  if (lenis) {
    const duration = Math.min(1.6, Math.max(1.0, 0.8 + distance / 3500));
    lenis.scrollTo(typeof target === 'string' ? target : (el as HTMLElement), {
      offset,
      duration,
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: 'smooth' });
  }
}
