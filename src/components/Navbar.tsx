'use client';

import React, { useState } from 'react';
import { scrollToTarget } from '@/lib/lenis';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    setMobileOpen(false);
    scrollToTarget(href);
  };

  return (
    <>
      <nav
        aria-label="Main"
        className="fixed top-0 left-0 right-0 z-40 flex justify-between items-center px-[var(--pad)] py-5 sm:py-6 bg-[#070707]/80 backdrop-blur-md border-b border-[rgba(239,233,220,0.14)] text-[#EFE9DC] select-none"
      >
        {/* Brand Logo */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, '#top')}
          className="font-serif text-2xl sm:text-3xl tracking-tight text-[#EFE9DC] hover:text-white transition-all duration-300 hover:tracking-wide hover:-translate-y-0.5 inline-block select-none"
        >
          Ali Aun
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-8 lg:gap-11 list-none select-none">
          {[
            { label: 'Work', href: '#work' },
            { label: 'About', href: '#about' },
            { label: 'Leadership', href: '#leadership' },
            { label: 'Contact', href: '#contact' },
          ].map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative group py-1.5 text-xs uppercase tracking-[0.22em] font-medium text-[#B9BCC2] hover:text-[#EFE9DC] transition-colors duration-300 select-none block"
              >
                <span>{item.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#EFE9DC] transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Direct Connect Link - Editorial Pill Button */}
        <div className="hidden sm:flex items-center select-none">
          <a
            href="https://www.linkedin.com/in/ali-aun/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full border border-[rgba(239,233,220,0.22)] bg-[rgba(239,233,220,0.04)] hover:bg-[rgba(239,233,220,0.14)] hover:border-[rgba(239,233,220,0.5)] text-xs uppercase tracking-[0.16em] text-[#EFE9DC] font-medium transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-[0_0_15px_rgba(239,233,220,0.12)] hover:-translate-y-0.5 select-none"
          >
            <span>LinkedIn</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1 text-[#EFE9DC] hover:opacity-75 focus:outline-none select-none"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[73px] z-30 p-8 bg-[#070707]/95 backdrop-blur-xl border-b border-[rgba(239,233,220,0.14)] md:hidden flex flex-col gap-5 text-lg font-serif select-none">
          <a
            href="#work"
            onClick={(e) => handleNavClick(e, '#work')}
            className="text-[#EFE9DC] hover:underline underline-offset-8"
          >
            Work
          </a>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, '#about')}
            className="text-[#EFE9DC] hover:underline underline-offset-8"
          >
            About
          </a>
          <a
            href="#leadership"
            onClick={(e) => handleNavClick(e, '#leadership')}
            className="text-[#EFE9DC] hover:underline underline-offset-8"
          >
            Leadership
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="text-[#EFE9DC] hover:underline underline-offset-8"
          >
            Contact
          </a>
          <a
            href="https://www.linkedin.com/in/ali-aun/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-sans uppercase tracking-widest text-[#8A867D] pt-4 border-t border-[rgba(239,233,220,0.14)] flex items-center justify-between"
          >
            <span>LinkedIn Profile</span>
            <span>&rarr;</span>
          </a>
        </div>
      )}
    </>
  );
}
