'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { projects, modalSpecs, workDisciplines } from '@/data/siteData';
import { ProjectItem, ProjectSpec } from '@/types/portfolio';
import { getLenis } from '@/lib/lenis';

interface CaseStudyModalProps {
  isOpen: boolean;
  onClose: () => void;
  specKey: string | null;
}

// Interactive 3-Product Ecosystem Specification
const ECOSYSTEM_BRANDS = [
  {
    id: 'thenevon',
    name: 'The Nevon',
    badge: '01 • The Nevon',
    title: 'The Nevon: Architecture SQA & Enterprise Launch',
    subtitle: 'Architecture SQA, enterprise launch testing & multi-channel distribution',
    url: 'https://www.thenevon.com',
    mockupUrl: 'thenevon.com',
    image: '/thumb_thenevon.png',
    description: 'Comprehensive QA testing and launch readiness validation across all core systems, paired with omni-channel distribution across LinkedIn, Instagram, and Facebook.',
    socials: {
      linkedin: 'https://www.linkedin.com/company/the-nevon/',
      instagram: 'https://www.instagram.com/the_nevon/',
      facebook: 'https://www.facebook.com/profile.php?id=61591527347235',
    },
  },
  {
    id: 'sigsignature',
    name: 'Sig Signature',
    badge: '02 • Sig Signature',
    title: 'Sig Signature: Email Signature Platform & SQA Suite',
    subtitle: 'Full Web Application, zero-breakpoint tables & cross-client SQA',
    url: 'https://sigsignature.com',
    mockupUrl: 'sigsignature.com',
    image: '/thumb_sigsignature.png',
    description: 'Enterprise signature creation and branding platform with cross-client rendering fidelity, full QA audit cycles, and synchronized multi-channel social deployment.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/ali-aun/',
      instagram: 'https://www.instagram.com/the_nevon/',
      facebook: 'https://www.facebook.com/profile.php?id=61591527347235',
    },
  },
  {
    id: 'crushsvg',
    name: 'CrushSVG',
    badge: '03 • CrushSVG',
    title: 'CrushSVG: Vector Testing Engine & SQA Suite',
    subtitle: 'Vector testing engine, Playwright E2E suite & rate-limit gates',
    url: 'https://www.crushsvg.net',
    mockupUrl: 'crushsvg.net',
    image: '/thumb_crushsvg.png',
    description: 'Vector asset marketplace and rendering engine engineered for sub-second delivery, automated QA validation, and cohesive social campaign scheduling across all three networks.',
    socials: {
      linkedin: 'https://www.linkedin.com/company/crushsvg/',
      instagram: 'https://www.instagram.com/crushsvg_net/',
      facebook: 'https://www.facebook.com/profile.php?id=61593405728605',
    },
  },
];

export default function CaseStudyModal({ isOpen, onClose, specKey }: CaseStudyModalProps) {
  const [curtainActive, setCurtainActive] = useState(false);
  const [closingCurtain, setClosingCurtain] = useState(false);
  const [isModalContentHidden, setIsModalContentHidden] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [brandIdx, setBrandIdx] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const openTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Find matching project and spec data
  const project: ProjectItem | undefined = projects.find((p) => p.specKey === specKey);
  const spec: ProjectSpec | undefined = specKey ? modalSpecs[specKey] : undefined;
  const discipline = workDisciplines.find((d) => d.specKey === specKey);

  const isEcosystem = specKey === 'nevon-playbook' || project?.id === 'content-system';
  const activeBrand = isEcosystem ? ECOSYSTEM_BRANDS[brandIdx] : null;

  // Symmetrical 2-stage animated closing wipe handler:
  // 1. Closing curtain enters from bottom to 0% (duration 0.65s)
  // 2. At 0.85s, curtain fully covers the screen at 0%: hide modal content underneath, start globalLenis
  // 3. Trigger exit: curtain rises upwards to -100% (duration 0.65s), cleanly revealing the portfolio underneath!
  // 4. On exit complete, call onClose() to unmount modal offscreen
  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    setClosingCurtain(true);

    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      // Hide modal content underneath while curtain is firmly covering the viewport
      setIsModalContentHidden(true);
      const globalLenis = getLenis();
      if (globalLenis) globalLenis.start();
      document.body.style.overflow = '';
      // Now trigger Framer Motion exit animation upwards to -100%
      setClosingCurtain(false);
    }, 850);
  };

  // Reset brand index when specKey changes
  useEffect(() => {
    setBrandIdx(0);
  }, [specKey]);

  // Manage Lenis smooth scrolling inside modal + curtain opening animation
  useEffect(() => {
    const globalLenis = getLenis();
    if (isOpen && specKey) {
      setIsClosing(false);
      setIsModalContentHidden(false);
      setClosingCurtain(false);

      if (globalLenis) globalLenis.stop();
      document.body.style.overflow = 'hidden';

      // Ensure content visibility and modal display are restored on modal open
      if (contentRef.current) {
        contentRef.current.style.opacity = '';
        contentRef.current.style.visibility = '';
      }
      if (scrollContainerRef.current) {
        scrollContainerRef.current.style.backgroundColor = '';
      }

      let modalLenis: Lenis | null = null;
      let rafTicker: ((time: number) => void) | null = null;

      // Initialize dedicated smooth scroll on modal wrapper
      if (scrollContainerRef.current && contentRef.current) {
        modalLenis = new Lenis({
          wrapper: scrollContainerRef.current,
          content: contentRef.current,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          orientation: 'vertical',
          smoothWheel: true,
          wheelMultiplier: 1.0,
          touchMultiplier: 1.5,
        });

        rafTicker = (time: number) => {
          modalLenis?.raf(time * 1000);
        };
        gsap.ticker.add(rafTicker);
      }

      setCurtainActive(true);
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = setTimeout(() => {
        setCurtainActive(false);
      }, 950);

      return () => {
        if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
        if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
        if (rafTicker) gsap.ticker.remove(rafTicker);
        if (modalLenis) modalLenis.destroy();
        if (globalLenis) globalLenis.start();
        document.body.style.overflow = '';
      };
    } else {
      if (globalLenis) globalLenis.start();
      document.body.style.overflow = '';
      setCurtainActive(false);
      setClosingCurtain(false);
      setIsClosing(false);
      setIsModalContentHidden(false);
    }

    return () => {
      if (globalLenis) globalLenis.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, specKey]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  // Touch Swipe Handlers for Ecosystem Carousel
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      // Swiped left -> Next brand
      setBrandIdx((prev) => (prev + 1) % ECOSYSTEM_BRANDS.length);
    } else if (diff < -50) {
      // Swiped right -> Prev brand
      setBrandIdx((prev) => (prev - 1 + ECOSYSTEM_BRANDS.length) % ECOSYSTEM_BRANDS.length);
    }
    touchStartX.current = null;
  };

  if (!isOpen || !specKey) return null;

  const displayTitle = activeBrand ? activeBrand.title : (project?.title || discipline?.title || spec?.title || 'Case Study');
  const displaySubtitle = activeBrand ? activeBrand.subtitle : (discipline?.subtitle || project?.categoryLabel || spec?.subtitle || '');
  const displayImage = activeBrand ? activeBrand.image : (project?.image || discipline?.image || '/thumb_crushsvg.png');
  const displayMockupUrl = activeBrand ? activeBrand.mockupUrl : (project?.mockupUrl || project?.liveUrl || 'system.production.node');
  const displayDescription = activeBrand ? activeBrand.description : (project?.description || discipline?.subtitle);

  let liveUrl = activeBrand ? activeBrand.url : (project?.liveUrl || discipline?.liveUrl);
  if (!liveUrl) {
    if (specKey === 'crushsvg-qa') liveUrl = 'https://www.crushsvg.net';
    if (specKey === 'sigsignature-qa') liveUrl = 'https://sigsignature.com';
    if (specKey === 'nevon-playbook') liveUrl = 'https://www.thenevon.com';
  }

  const socialLinks = activeBrand ? activeBrand.socials : (project?.socialLinks || discipline?.socials);
  const techStack = spec?.techStack || project?.tags || [];
  const highlights = spec?.highlights || project?.features || [];

  return (
    <>
      <div
        ref={scrollContainerRef}
        data-lenis-prevent="true"
        style={{ display: isModalContentHidden ? 'none' : 'block' }}
        className="fixed inset-0 z-[150] bg-[#070707] text-[#EFE9DC] overflow-y-auto overscroll-contain select-text"
      >
        <div ref={contentRef} className="min-h-full">
          {/* Subtle Grain Overlay inside modal */}
          <div className="grain" aria-hidden="true" />

          {/* Floating Close Pill Button */}
          <button
            onClick={handleClose}
            className="fixed top-6 right-6 sm:right-12 z-[155] px-6 py-2.5 rounded-full border border-[rgba(239,233,220,0.4)] bg-[#070707]/90 backdrop-blur-md text-[#EFE9DC] font-serif text-sm hover:bg-[#EFE9DC] hover:text-[#070707] hover:-translate-y-1 hover:scale-105 active:scale-95 hover:shadow-[0_12px_28px_rgba(239,233,220,0.22)] transition-all duration-300 ease-out cursor-pointer shadow-lg select-none group"
            aria-label="Close Case Study"
          >
            <span className="select-none">Close </span>
            <span className="inline-block transition-transform duration-300 group-hover:rotate-90 select-none">&times;</span>
          </button>

          {/* Main Modal Content (100% Matching Dark Luxury Mishal Palette) */}
          <div className="max-w-5xl mx-auto px-[var(--pad)] pt-24 pb-32">
            {/* Header Metadata with Staggered Editorial Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-b border-[rgba(239,233,220,0.14)] pb-8 mb-10"
            >
              <span className="text-xs uppercase tracking-widest text-[#8A867D] font-mono block mb-2">
                Production Architecture &bull; Case Study
              </span>
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[0.95] tracking-tight text-[#EFE9DC]">
                {displayTitle}
              </h1>
              <p className="font-sans text-sm sm:text-base text-[#8A867D] mt-3 max-w-2xl">
                {displaySubtitle}
              </p>
            </motion.div>

            {/* Quick Specifications Matrix */}
            <motion.dl
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12 p-6 rounded-xl border border-[rgba(239,233,220,0.12)] bg-[#0f0f0f]/60"
            >
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8A867D] font-mono">Discipline</dt>
                <dd className="font-serif text-base sm:text-lg text-[#EFE9DC] mt-1">
                  {activeBrand ? (activeBrand.id === 'sigsignature' ? 'Full Web Application' : 'Enterprise Ecosystem') : (project?.categoryLabel || 'Full Web Application')}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8A867D] font-mono">Verification</dt>
                <dd className="font-serif text-base sm:text-lg text-[#EFE9DC] mt-1">
                  Production Validated
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8A867D] font-mono">Architect</dt>
                <dd className="font-serif text-base sm:text-lg text-[#EFE9DC] mt-1">
                  Ali Aun
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-[#8A867D] font-mono">Status</dt>
                <dd className="font-serif text-base sm:text-lg text-[#EFE9DC] mt-1">
                  Active in Production
                </dd>
              </div>
            </motion.dl>

            {/* macOS Browser Mockup Frame Preview with Ecosystem Switcher */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              {isEcosystem && (
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  {/* 3-Brand Tabs */}
                  <div className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-[#141414] border border-[rgba(239,233,220,0.18)]">
                    {ECOSYSTEM_BRANDS.map((brand, idx) => (
                      <button
                        key={brand.id}
                        type="button"
                        onClick={() => setBrandIdx(idx)}
                        className={`px-3.5 sm:px-5 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer ${
                          brandIdx === idx
                            ? 'bg-[#EFE9DC] text-[#070707] shadow-md font-medium'
                            : 'text-[#8A867D] hover:text-[#EFE9DC]'
                        }`}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>

                  {/* Clean Next Brand Button Outside Preview Frame (No Tooltip) */}
                  <button
                    type="button"
                    onClick={() => setBrandIdx((prev) => (prev + 1) % ECOSYSTEM_BRANDS.length)}
                    className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#141414] hover:bg-[#EFE9DC] text-[#EFE9DC] hover:text-[#070707] border border-[rgba(239,233,220,0.24)] text-xs font-serif transition-all duration-300 hover:scale-105 cursor-pointer group select-none"
                    aria-label="Next brand showcase"
                  >
                    <span className="select-none">Next: {ECOSYSTEM_BRANDS[(brandIdx + 1) % ECOSYSTEM_BRANDS.length].name}</span>
                    <span className="group-hover:translate-x-1 transition-transform select-none">&rarr;</span>
                  </button>
                </div>
              )}

              <div
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className="relative rounded-xl border border-[rgba(239,233,220,0.18)] bg-[#101010] overflow-hidden shadow-2xl transition-all duration-500 ease-out hover:scale-[1.01] hover:border-[rgba(239,233,220,0.35)] group"
              >
                {/* Window header */}
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#171717] border-b border-[rgba(239,233,220,0.1)] select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="px-4 py-1 rounded-full bg-[#070707]/70 border border-[rgba(239,233,220,0.1)] text-[11px] font-mono text-[#8A867D]">
                    {displayMockupUrl}
                  </div>
                  <div className="w-8 text-right text-[10px] font-mono text-[#8A867D]">
                    {isEcosystem ? `${brandIdx + 1}/3` : ''}
                  </div>
                </div>

                {/* Preview Image with Smooth Animated Slide Transition */}
                <div
                  className={`relative w-full h-[340px] sm:h-[480px] lg:h-[580px] overflow-hidden ${
                    specKey === 'leads-outreach-visual' || specKey === 'social-broadcaster-visual'
                      ? 'bg-[#030710]'
                      : 'bg-[#0a0a0a]'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeBrand ? activeBrand.id : 'static-view'}
                      initial={{ opacity: 0, x: 28 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -28 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <Image
                        src={displayImage}
                        alt={displayTitle}
                        fill
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        className={`${
                          specKey === 'leads-outreach-visual' || specKey === 'social-broadcaster-visual'
                            ? 'object-contain object-center p-3'
                            : 'object-cover object-top'
                        } transition-transform duration-700 ease-out group-hover:scale-[1.02]`}
                        priority
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Action Links Bar: Live Website + Socials */}
            <div className="flex flex-wrap items-center justify-between gap-6 pb-12 mb-12 border-b border-[rgba(239,233,220,0.14)]">
              <div className="flex flex-wrap items-center gap-4">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-editorial !bg-[#EFE9DC] !text-[#070707] hover:!bg-transparent hover:!text-[#EFE9DC] transition-all"
                  >
                    <span>
                      {activeBrand
                        ? `Visit ${activeBrand.name}`
                        : (project?.actionLabel || 'Visit live website')}
                    </span>
                    <span>↗</span>
                  </a>
                )}

                {/* Social Pages Pills */}
                {socialLinks?.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-full border border-[rgba(239,233,220,0.24)] text-xs font-sans text-[#EFE9DC] hover:bg-[#EFE9DC]/10 transition-colors inline-flex items-center gap-2"
                  >
                    <span>LinkedIn Page</span>
                    <span>↗</span>
                  </a>
                )}
                {socialLinks?.instagram && (
                  <a
                    href={socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-full border border-[rgba(239,233,220,0.24)] text-xs font-sans text-[#EFE9DC] hover:bg-[#EFE9DC]/10 transition-colors inline-flex items-center gap-2"
                  >
                    <span>Instagram Page</span>
                    <span>↗</span>
                  </a>
                )}
                {socialLinks?.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 rounded-full border border-[rgba(239,233,220,0.24)] text-xs font-sans text-[#EFE9DC] hover:bg-[#EFE9DC]/10 transition-colors inline-flex items-center gap-2"
                  >
                    <span>Facebook Page</span>
                    <span>↗</span>
                  </a>
                )}
              </div>

              <span className="text-xs font-mono text-[#8A867D]">
                Verified Architecture by Ali Aun
              </span>
            </div>

            {/* Substantive Technical Description (4 Lines) */}
            <div className="mb-14">
              <h3 className="font-serif text-2xl text-[#EFE9DC] mb-4">
                System Overview
              </h3>
              <p className="font-sans text-base sm:text-lg text-[#B9BCC2] leading-relaxed max-w-3xl">
                {displayDescription}
              </p>
            </div>

            {/* Key Architecture Highlights Cards */}
            {highlights.length > 0 && (
              <div className="mb-14">
                <h3 className="font-serif text-2xl text-[#EFE9DC] mb-6">
                  Core Engineering Capabilities
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {highlights.map((highlight: string, idx: number) => (
                    <div
                      key={idx}
                      className="p-6 rounded-xl border border-[rgba(239,233,220,0.12)] bg-[#101010]/50 flex flex-col justify-between transform hover:-translate-y-1 hover:border-[rgba(239,233,220,0.28)] hover:bg-[#151515] transition-all duration-300 cursor-default"
                    >
                      <div>
                        <span className="font-serif text-2xl text-[#8A867D] block mb-3">
                          0{idx + 1}
                        </span>
                        <p className="font-sans text-sm text-[#B9BCC2] leading-relaxed">
                          {highlight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Technology & Protocol Pills (Expanded to 5-7 Pills with Tactile Micro-Motion) */}
            {techStack.length > 0 && (
              <div className="mb-16">
                <h4 className="text-xs uppercase tracking-widest text-[#8A867D] font-mono mb-4">
                  Technologies &amp; Protocols
                </h4>
                <div className="flex flex-wrap gap-2.5">
                  {techStack.map((tech: string, i: number) => (
                    <span
                      key={i}
                      className="px-3.5 py-1.5 rounded-full border border-[rgba(239,233,220,0.16)] bg-[#0c0c0c] text-xs font-mono text-[#B9BCC2] transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(239,233,220,0.45)] hover:text-[#EFE9DC] hover:bg-[#151515] hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] cursor-default select-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Colophon / Close Action */}
            <div className="pt-8 border-t border-[rgba(239,233,220,0.14)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <span className="text-xs font-mono text-[#8A867D]">
                ALI AUN &bull; ARCHITECTURAL DIRECTORY
              </span>
              <button
                onClick={handleClose}
                className="btn-editorial select-none"
              >
                <span className="select-none">Back to Overview</span>
                <span className="select-none">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          1. OPENING CURTAIN WIPE ANIMATION (WARM IVORY SPLIT / SLIDE)
          ========================================================================= */}
      <AnimatePresence>
        {curtainActive && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[160] bg-[#EFE9DC] text-[#070707] flex flex-col items-center justify-center p-8 select-none pointer-events-none"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className="text-xs uppercase tracking-widest font-mono text-[#8A867D] mb-4"
            >
              Case Study &bull; Opening Architecture
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="font-serif text-4xl sm:text-7xl lg:text-8xl text-center leading-[0.9] tracking-tight max-w-4xl"
            >
              {displayTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.18 }}
              className="text-sm font-sans text-[#8A867D] mt-6 max-w-md text-center"
            >
              Ali Aun &bull; Verified Production System
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          2. CLOSING CURTAIN WIPE ANIMATION (WARM IVORY RETURN TO PORTFOLIO)
          ========================================================================= */}
      <AnimatePresence
        onExitComplete={() => {
          if (isClosing) {
            onClose();
            setIsClosing(false);
            setIsModalContentHidden(false);
          }
        }}
      >
        {closingCurtain && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[170] bg-[#EFE9DC] text-[#070707] flex flex-col items-center justify-center p-8 select-none pointer-events-auto"
          >
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.08 }}
              className="text-xs uppercase tracking-widest font-mono text-[#8A867D] mb-4"
            >
              Case Study &bull; Closing Architecture
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.12 }}
              className="font-serif text-4xl sm:text-7xl lg:text-8xl text-center leading-[0.9] tracking-tight max-w-4xl"
            >
              {displayTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.18 }}
              className="text-sm font-sans text-[#8A867D] mt-6 max-w-md text-center"
            >
              Ali Aun &bull; Verified Production System
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
