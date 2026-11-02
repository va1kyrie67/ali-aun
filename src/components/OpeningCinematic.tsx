'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

const WORDS = ['Architecture', 'Precision', 'Autonomous Systems', 'Digital Quality'];

export default function OpeningCinematic() {
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const botCurtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsDone(true);
      window.dispatchEvent(new CustomEvent('openingComplete'));
      return;
    }

    document.body.style.overflow = 'hidden';
    let isCancelled = false;

    const ctx = gsap.context(() => {
      const counter = { val: 0 };

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: 'power4.out' },
        onComplete: () => {
          document.body.style.overflow = '';
          setIsDone(true);
          // Trigger hero reveal
          window.dispatchEvent(new CustomEvent('openingComplete'));
        },
      });

      // 1. Name glides up smoothly into full view
      tl.to(nameRef.current, { y: 0, opacity: 1, duration: 1.0, ease: 'power3.out' }, 0.2);

      // 2. Numerical counter 000 to 100
      tl.to(
        counter,
        {
          val: 100,
          duration: 2.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(Math.round(counter.val)).padStart(3, '0');
            }
          },
        },
        0
      );

      // 3. Hairline progress bar scaling
      tl.to(lineRef.current, { scaleX: 1, duration: 2.4, ease: 'power2.inOut' }, 0);

      // 4. Word cycler sequence (calm, deliberate pacing)
      WORDS.forEach((word, i) => {
        tl.add(() => {
          if (wordRef.current) {
            wordRef.current.textContent = word;
            gsap.fromTo(
              wordRef.current,
              { y: 16, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
            );
          }
        }, 0.25 + i * 0.55);
      });

      // 5. Exit choreography: Center stage fades out completely BEFORE curtains open
      tl.to([centerRef.current, countRef.current], { opacity: 0, y: -20, duration: 0.35, ease: 'power2.in' }, 2.45)
        .set(containerRef.current, { backgroundColor: 'transparent' }, 2.74)
        .to(topCurtainRef.current, { yPercent: -101, duration: 0.95, ease: 'power4.inOut' }, 2.75)
        .to(botCurtainRef.current, { yPercent: 101, duration: 0.95, ease: 'power4.inOut' }, 2.75);

      // Wait for fonts to be ready before unhiding and playing timeline
      const initSequence = () => {
        if (isCancelled) return;
        gsap.set(
          [centerRef.current, nameRef.current, wordRef.current, lineRef.current, countRef.current],
          { visibility: 'visible' }
        );
        gsap.set(nameRef.current, { y: 50, opacity: 0 });
        gsap.set(wordRef.current, { y: 16, opacity: 0 });
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left' });
        tl.play();
      };

      if (typeof document !== 'undefined' && 'fonts' in document) {
        document.fonts.ready.then(initSequence);
      } else {
        initSequence();
      }
    }, containerRef);

    return () => {
      isCancelled = true;
      document.body.style.overflow = '';
      ctx.revert();
    };
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      id="loader"
      className="fixed inset-0 z-[150] bg-[#070707] select-none pointer-events-none"
      aria-label="Portfolio Loading Screen"
    >
      {/* Top Half Curtain */}
      <div
        ref={topCurtainRef}
        className="absolute top-0 left-0 right-0 h-[50.5%] bg-[#070707] border-b border-[rgba(239,233,220,0.14)]"
      />

      {/* Bottom Half Curtain */}
      <div
        ref={botCurtainRef}
        className="absolute bottom-0 left-0 right-0 h-[50.5%] bg-[#070707] border-t border-[rgba(239,233,220,0.14)]"
      />

      {/* Center Stage Presentation - Controlled as a clean unit with zero hero overlap */}
      <div
        ref={centerRef}
        style={{ visibility: 'hidden' }}
        className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 px-4"
      >
        {/* Word Cycler */}
        <div className="h-9 flex items-center justify-center overflow-hidden">
          <div
            ref={wordRef}
            style={{ opacity: 0, visibility: 'hidden', transform: 'translateY(16px)' }}
            className="font-serif text-xl sm:text-2xl text-[#B9BCC2] tracking-wide"
          >
            Architecture
          </div>
        </div>

        {/* Monumental Name */}
        <div className="py-2 flex items-center justify-center">
          <div
            ref={nameRef}
            style={{ opacity: 0, visibility: 'hidden', transform: 'translateY(50px)' }}
            className="font-serif text-[clamp(3.5rem,15vw,13rem)] font-light leading-tight tracking-tight text-[#EFE9DC]"
          >
            Ali Aun
          </div>
        </div>

        {/* Hairline Progress Indicator */}
        <div className="w-[min(340px,70vw)] h-[1px] bg-[rgba(239,233,220,0.15)] overflow-hidden">
          <div
            ref={lineRef}
            style={{ transform: 'scaleX(0)', transformOrigin: 'left', visibility: 'hidden' }}
            className="h-full bg-[#EFE9DC] w-full"
          />
        </div>
      </div>

      {/* Numerical Counter Bottom Right */}
      <div
        ref={countRef}
        style={{ visibility: 'hidden' }}
        className="absolute right-[var(--pad)] bottom-[var(--pad)] font-serif text-2xl sm:text-4xl text-[#8A867D] font-light tabular-nums z-10"
      >
        000
      </div>
    </div>
  );
}
