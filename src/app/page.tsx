'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import PinnedWorkStage from '@/components/PinnedWorkStage';
import WorkIndexList from '@/components/WorkIndexList';
import AboutSection from '@/components/AboutSection';
import LeadershipSection from '@/components/LeadershipSection';
import ContactSection from '@/components/ContactSection';
import OpeningCinematic from '@/components/OpeningCinematic';
import CaseStudyModal from '@/components/CaseStudyModal';
import ScrollIllumination from '@/components/ScrollIllumination';
import StarryCursor from '@/components/StarryCursor';

export default function Home() {
  const [activeSpecKey, setActiveSpecKey] = useState<string | null>(null);

  return (
    <>
      {/* Subtle Celestial Starry Glowing Mouse Cursor */}
      <StarryCursor />

      {/* Subtle Analog Grain Overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Signature Mishal Reading Scroll Spotlight Illumination */}
      <ScrollIllumination />

      {/* Classy Split-Curtain Editorial Opening Loader */}
      <OpeningCinematic />

      {/* Floating Top Navigation */}
      <Navbar />

      <main className="relative bg-[#070707] text-[#EFE9DC] selection:bg-[#EFE9DC] selection:text-[#070707]">
        {/* Hero Display with Amarante Typography & 3D Chrome Torus Knot Sculpture */}
        <Hero />

        {/* Pinned Stacking Scroll Stage (The 8 Works in Exact Order) */}
        <PinnedWorkStage onOpenSpecs={(key) => setActiveSpecKey(key)} />

        {/* 8 Work Disciplines Directory List (Matching Image 4) */}
        <WorkIndexList onOpenSpecs={(key) => setActiveSpecKey(key)} />

        {/* About & Core Disciplines */}
        <AboutSection />

        {/* Leadership & Strategy Profiles */}
        <LeadershipSection />

        {/* Contact Section & Colophon */}
        <ContactSection />
      </main>

      {/* Luxury Dark Case Study Modal with Ivory Wipe Curtain Opening Animation */}
      <CaseStudyModal
        isOpen={Boolean(activeSpecKey)}
        onClose={() => setActiveSpecKey(null)}
        specKey={activeSpecKey}
      />
    </>
  );
}
