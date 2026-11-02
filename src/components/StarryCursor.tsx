'use client';

import React, { useEffect, useRef } from 'react';

interface StardustParticle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function StarryCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);

  // Position refs for 120fps direct GPU rendering without React re-renders
  const mousePos = useRef({ x: -100, y: -100 });
  const haloPos = useRef({ x: -100, y: -100 });
  const lastTarget = useRef<EventTarget | null>(null);

  const particlesRef = useRef<StardustParticle[]>([
    { x: -100, y: -100, size: 2.5, opacity: 0.65, speed: 0.16 },
    { x: -100, y: -100, size: 2.0, opacity: 0.45, speed: 0.10 },
    { x: -100, y: -100, size: 1.5, opacity: 0.35, speed: 0.06 },
  ]);
  const particleDoms = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let rafId: number;
    let isHovering = false;
    let isClicking = false;
    let isVisible = false;

    const container = containerRef.current;
    const halo = haloRef.current;
    const diamond = diamondRef.current;

    const updateHaloClasses = () => {
      if (!halo) return;
      if (isHovering) {
        halo.className =
          'fixed top-0 left-0 rounded-full will-change-transform flex items-center justify-center transition-[width,height,background,border-color,opacity,box-shadow] duration-250 ease-out w-11 h-11 bg-[radial-gradient(circle,rgba(239,233,220,0.20)_0%,rgba(239,233,220,0.05)_45%,transparent_75%)] border border-[rgba(239,233,220,0.38)] shadow-[0_0_24px_rgba(239,233,220,0.2)]';
      } else if (isClicking) {
        halo.className =
          'fixed top-0 left-0 rounded-full will-change-transform flex items-center justify-center transition-[width,height,background,border-color,opacity,box-shadow] duration-250 ease-out w-6 h-6 bg-[radial-gradient(circle,rgba(239,233,220,0.25)_0%,transparent_70%)] border border-[rgba(239,233,220,0.45)]';
      } else {
        halo.className =
          'fixed top-0 left-0 rounded-full will-change-transform flex items-center justify-center transition-[width,height,background,border-color,opacity,box-shadow] duration-250 ease-out w-8 h-8 bg-[radial-gradient(circle,rgba(239,233,220,0.12)_0%,rgba(239,233,220,0.02)_45%,transparent_70%)] border border-[rgba(239,233,220,0.16)] shadow-[0_0_14px_rgba(239,233,220,0.08)]';
      }

      if (diamond) {
        if (isHovering) {
          diamond.className =
            'rotate-45 bg-[#EFE9DC] transition-all duration-200 shadow-[0_0_14px_rgba(255,255,255,1)] w-2 h-2 scale-125 bg-white';
        } else if (isClicking) {
          diamond.className =
            'rotate-45 bg-[#EFE9DC] transition-all duration-200 shadow-[0_0_10px_rgba(239,233,220,0.85)] w-1.5 h-1.5 scale-90';
        } else {
          diamond.className =
            'rotate-45 bg-[#EFE9DC] transition-all duration-200 shadow-[0_0_10px_rgba(239,233,220,0.85)] w-1.5 h-1.5';
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (container) container.style.opacity = '1';
      }

      // Check target hover without triggering React re-renders
      if (e.target !== lastTarget.current) {
        lastTarget.current = e.target;
        const target = e.target as HTMLElement | null;
        const interactive = Boolean(
          target?.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, .btn-editorial')
        );
        if (interactive !== isHovering) {
          isHovering = interactive;
          updateHaloClasses();
        }
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      updateHaloClasses();
    };

    const onMouseUp = () => {
      isClicking = false;
      updateHaloClasses();
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (container) container.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (container) container.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // High performance 120fps direct GPU rendering loop
    const loop = () => {
      const targetX = mousePos.current.x;
      const targetY = mousePos.current.y;

      // 1. Direct core positioning with GPU translate3d
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      // 2. Smooth celestial lerp for halo glow
      const dx = targetX - haloPos.current.x;
      const dy = targetY - haloPos.current.y;
      haloPos.current.x += dx * 0.22;
      haloPos.current.y += dy * 0.22;

      if (halo) {
        halo.style.transform = `translate3d(${haloPos.current.x}px, ${haloPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // 3. Trailing stardust micro-particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        p.x += (targetX - p.x) * p.speed;
        p.y += (targetY - p.y) * p.speed;

        const el = particleDoms.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-300"
      style={{ contain: 'layout style paint' }}
      aria-hidden="true"
    >
      {/* Soft Celestial Halo Glow */}
      <div
        ref={haloRef}
        className="fixed top-0 left-0 rounded-full transition-[width,height,background,border-color,opacity,box-shadow] duration-250 ease-out will-change-transform flex items-center justify-center w-8 h-8 bg-[radial-gradient(circle,rgba(239,233,220,0.12)_0%,rgba(239,233,220,0.02)_45%,transparent_70%)] border border-[rgba(239,233,220,0.16)] shadow-[0_0_14px_rgba(239,233,220,0.08)]"
      />

      {/* Trailing Stardust Micro-Particles */}
      {particlesRef.current.map((p, idx) => (
        <div
          key={idx}
          ref={(el) => {
            particleDoms.current[idx] = el;
          }}
          className="fixed top-0 left-0 rounded-full bg-[#EFE9DC] pointer-events-none will-change-transform shadow-[0_0_8px_rgba(239,233,220,0.55)]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
        />
      ))}

      {/* Celestial Diamond Star Core */}
      <div
        ref={coreRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform flex items-center justify-center"
      >
        <div
          ref={diamondRef}
          className="rotate-45 bg-[#EFE9DC] transition-all duration-200 shadow-[0_0_10px_rgba(239,233,220,0.85)] w-1.5 h-1.5"
        />
      </div>
    </div>
  );
}
