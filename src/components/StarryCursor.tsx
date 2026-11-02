'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  speed: number;
}

export default function StarryCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position refs for high-frequency 120fps rendering without re-renders
  const mousePos = useRef({ x: -100, y: -100 });
  const haloPos = useRef({ x: -100, y: -100 });
  const coreRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([
    { x: -100, y: -100, targetX: -100, targetY: -100, size: 2.5, opacity: 0.6, speed: 0.12 },
    { x: -100, y: -100, targetX: -100, targetY: -100, size: 2, opacity: 0.45, speed: 0.08 },
    { x: -100, y: -100, targetX: -100, targetY: -100, size: 1.5, opacity: 0.35, speed: 0.05 },
  ]);
  const particleDoms = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, .cursor-pointer, .btn-editorial'
        );
        setIsHovering(Boolean(interactive));
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth RAF loop for celestial lerp physics
    const loop = () => {
      const { x: targetX, y: targetY } = mousePos.current;

      // Direct core positioning
      if (coreRef.current) {
        coreRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`;
      }

      // Smooth lerp for halo
      haloPos.current.x += (targetX - haloPos.current.x) * 0.18;
      haloPos.current.y += (targetY - haloPos.current.y) * 0.18;
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${haloPos.current.x}px, ${haloPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Floating stardust micro-trail
      particlesRef.current.forEach((p, idx) => {
        p.x += (targetX - p.x) * p.speed;
        p.y += (targetY - p.y) * p.speed;

        const el = particleDoms.current[idx];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        }
      });

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
  }, [isVisible]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* Soft Starry Halo Glow */}
      <div
        ref={haloRef}
        className={`fixed top-0 left-0 rounded-full transition-[width,height,background,border-color,opacity] duration-300 ease-out will-change-transform flex items-center justify-center ${
          isHovering
            ? 'w-12 h-12 bg-[radial-gradient(circle,rgba(239,233,220,0.22)_0%,rgba(239,233,220,0.06)_50%,transparent_75%)] border border-[rgba(239,233,220,0.35)] shadow-[0_0_24px_rgba(239,233,220,0.18)]'
            : isClicking
            ? 'w-7 h-7 bg-[radial-gradient(circle,rgba(239,233,220,0.28)_0%,transparent_70%)] border border-[rgba(239,233,220,0.4)]'
            : 'w-9 h-9 bg-[radial-gradient(circle,rgba(239,233,220,0.14)_0%,rgba(239,233,220,0.03)_50%,transparent_70%)] border border-[rgba(239,233,220,0.18)] shadow-[0_0_16px_rgba(239,233,220,0.1)]'
        }`}
      />

      {/* Trailing Stardust Particles */}
      {particlesRef.current.map((p, idx) => (
        <div
          key={idx}
          ref={(el) => {
            particleDoms.current[idx] = el;
          }}
          className="fixed top-0 left-0 rounded-full bg-[#EFE9DC] pointer-events-none will-change-transform shadow-[0_0_8px_rgba(239,233,220,0.6)]"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: isHovering ? p.opacity * 1.3 : p.opacity,
          }}
        />
      ))}

      {/* Celestial Diamond Star Core */}
      <div
        ref={coreRef}
        className={`fixed top-0 left-0 pointer-events-none will-change-transform transition-[transform,opacity,width,height] duration-150 ease-out flex items-center justify-center`}
      >
        <div
          className={`rotate-45 bg-[#EFE9DC] transition-all duration-200 shadow-[0_0_10px_rgba(239,233,220,0.9)] ${
            isHovering
              ? 'w-2 h-2 scale-125 bg-white shadow-[0_0_14px_rgba(255,255,255,1)]'
              : isClicking
              ? 'w-1.5 h-1.5 scale-90'
              : 'w-1.5 h-1.5'
          }`}
        />
      </div>
    </div>
  );
}
