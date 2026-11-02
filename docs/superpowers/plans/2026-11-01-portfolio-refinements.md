# Portfolio Refinements & User Experience Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement editorial UI polish, mouse-wheel scrolling fix for the case study modal, a 3-brand ecosystem interactive switcher, footer and navbar micro-interactions, copy fixes, and global image drag prevention on Ali Aun's portfolio.

**Architecture:** Next.js 14 App Router with Tailwind CSS, Three.js canvas background, Lenis smooth scrolling with targeted modal event delegation, and Framer Motion / GSAP animations adhering strictly to the dark luxury Mishal editorial palette.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Three.js, GSAP, Lenis, Framer Motion, Vitest.

**Spec:** User feedback from chat history and screenshots (`media_1793549418920.png`, `media_1793549510541.png`, `media_1793549843025.png`).

## Global Constraints

- **Strict Source Isolation:** `C:\Users\thikpad\Desktop\Kaam\craft-portfolio` is strictly READ-ONLY. All work is in `C:\Users\thikpad\Desktop\Kaam\portfolio`.
- **Editorial Color Tokens:** Strictly use Mishal tokens: `--ink` (`#070707`), `--ivory` (`#EFE9DC`), `--chrome` (`#B9BCC2`), `--dim` (`#8A867D`), and `var(--line)` (`rgba(239, 233, 220, 0.14)`).
- **Typography:** `font-serif` (`Amarante`) for headlines, `font-sans` (`Inter`) for body/meta.
- **Copy Consistency:** "Page" instead of "Channel" for social accounts (`LinkedIn Page ↗`, `Instagram Page ↗`, `Facebook Page ↗`).
- **No Entity Artifacts:** Replace any raw entity text (such as `&nearr;`) with literal Unicode `↗`.
- **Naming Rule:** Remove `(Light)` from all occurrences of `Priority Plus Financial`.

## Review Focus

1. **Modal Wheel Scroll Lock:** Verifying that mouse-wheel scrolling works immediately when a case study modal opens without getting blocked by Lenis.
2. **Ecosystem Product Switcher:** Verifying that toggling between The Nevon, Sig Signature, and CrushSVG updates the screenshot, URL pill, live visit link, social links, and description without layout jitter.
3. **Hero Viewport Height:** Verifying that the infinite marquee is pushed below the fold on initial load so the hero header is completely uncluttered.
4. **Image Drag Prevention:** Verifying that holding left-click and dragging any image or canvas does not produce a ghost image drag.
5. **Footer Interactions:** Verifying that "Back to top" is removed, "Let's talk" points to LinkedIn with a float effect, and "LinkedIn ↗" renders cleanly.

---

### Task 1: TDD Test Suite Expansion for Naming & Data Integrity

**Files:**
- Modify: `tests/portfolio.test.ts`

**Interfaces:**
- Consumes: `src/data/siteData.ts`
- Produces: Updated Vitest assertions asserting `title === 'Priority Plus Financial'` without `(Light)`, social channels use `Page`, and all 8 projects and specs match schema.

- [ ] **Step 1: Write the failing test in `tests/portfolio.test.ts`**
  Add assertions that `modalSpecs['priority-light'].title` does not contain `(Light)` and that `workDisciplines` item 04 has title `Priority Plus Financial` without `(Light)`.

- [ ] **Step 2: Run test to verify it fails**
  Run: `npm test`
  Expected: FAIL showing `Priority Plus Financial (Light)` contains `(Light)`.

- [ ] **Step 3: Update `tests/portfolio.test.ts` to pin expected data contract**
  Ensure tests check for clean title formatting and email `aliaunnnn@gmail.com`.

---

### Task 2: Data Clean-Up in `src/data/siteData.ts`

**Files:**
- Modify: `src/data/siteData.ts:129-147, 465-474`
- Test: `tests/portfolio.test.ts`

**Interfaces:**
- Consumes: Cleaned title strings
- Produces: Exported `projects`, `modalSpecs`, and `workDisciplines` matching the exact user specifications.

- [ ] **Step 1: Update `modalSpecs['priority-light']`**
  Remove `(Light)` from `title: 'Priority Plus Financial: Institutional Enterprise Platform'` and from `rawHtml`.
- [ ] **Step 2: Update `workDisciplines[3]`**
  Set `title: "Priority Plus Financial"` and update subtitle to remove `light version`.
- [ ] **Step 3: Run tests to verify they pass**
  Run: `npm test`
  Expected: PASS (all 4 tests green).

---

### Task 3: CSS Global Drag Prevention & Navbar Lift in `src/app/globals.css`

**Files:**
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Global CSS styling rules
- Produces: Prevents ghost image dragging on `img, svg, canvas`, adds `.nav-lift` and `.interactive-float` styles.

- [ ] **Step 1: Add image and media drag prevention in `src/app/globals.css`**
  ```css
  img, svg, canvas {
    -webkit-user-drag: none;
    user-drag: none;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
  ```
- [ ] **Step 2: Add interactive micro-lift styles**
  Define `.nav-lift` and `.magnetic-lift` transitions for hover states.
- [ ] **Step 3: Verify CSS syntax and compilation**
  Run: `npx tsc --noEmit`

---

### Task 4: Hero Screen Cleanliness & Viewport Spacing in `src/components/Hero.tsx`

**Files:**
- Modify: `src/components/Hero.tsx:23-97`

**Interfaces:**
- Consumes: Viewport height adjustments and clean editorial composition
- Produces: Uncluttered monumental hero header with marquee positioned below initial viewport.

- [ ] **Step 1: Remove the 3-line meta text**
  Delete lines containing `"Systems you feel before you inspect them."`, `"Scroll ↓"`, and `"Open to select high-impact projects"`.
- [ ] **Step 2: Set hero container height to full viewport**
  Update `<header>` to `min-h-screen justify-center lg:justify-end pb-16` so the hero takes the full initial screen and the infinite marquee sits cleanly below the fold.
- [ ] **Step 3: Verify visual structure and responsive spacing**
  Check that the 3D canvas and monumental title `Ali Aun` occupy the initial screen majestically.

---

### Task 5: Opening Cinematic Words Refinement in `src/components/OpeningCinematic.tsx`

**Files:**
- Modify: `src/components/OpeningCinematic.tsx:6`

**Interfaces:**
- Consumes: Prestigious cycler word list
- Produces: Smooth 4-word opening sequence without repeating "Ali Aun".

- [ ] **Step 1: Update `WORDS` array**
  Replace `['Architecture', 'Precision', 'Autonomous Systems', 'Ali Aun']` with `['Architecture', 'Precision', 'Autonomous Systems', 'Digital Quality']`.
- [ ] **Step 2: Ensure "Ali Aun" remains exclusively as the monumental masked title**
  Verify that the masked `h1` below the cycler displays "Ali Aun" while the cycler cycles through the 4 craft terms.
- [ ] **Step 3: Verify animation timing**
  Ensure total sequence duration is ~2.4s to 2.6s with smooth split-curtain exit.

---

### Task 6: Case Study Modal Mouse Wheel Scroll & 3-Brand Interactive Switcher in `src/components/CaseStudyModal.tsx`

**Files:**
- Modify: `src/components/CaseStudyModal.tsx`

**Interfaces:**
- Consumes: Modal props `specKey`, `isOpen`, `onClose`
- Produces: Unblocked mouse-wheel scrolling via `data-lenis-prevent` and direct wheel listener; interactive 3-brand ecosystem tab switcher with live URL, preview image, and social link updates.

- [ ] **Step 1: Fix mouse-wheel scrolling**
  Add `data-lenis-prevent="true"` to the modal container and attach `onWheel={(e) => { if (scrollContainerRef.current) scrollContainerRef.current.scrollTop += e.deltaY; }}`.
- [ ] **Step 2: Build the 3-brand ecosystem tab switcher**
  For `specKey === 'nevon-playbook'` (or `project?.id === 'content-system'`), implement an interactive tab switcher:
  - Tab 1: **The Nevon** (`thenevon.com`, `/thumb_thenevon.png`, `https://www.thenevon.com`, socials for The Nevon)
  - Tab 2: **Sig Signature** (`sigsignature.com`, `/thumb_sigsignature.png`, `https://sigsignature.com`, socials for Sig Signature)
  - Tab 3: **CrushSVG** (`crushsvg.net`, `/thumb_crushsvg.png`, `https://www.crushsvg.net`, socials for CrushSVG)
  Include swipe gesture handlers (`onTouchStart`, `onTouchEnd`) and clickable pill tabs `[ 01 The Nevon ] [ 02 Sig Signature ] [ 03 CrushSVG ]`.
- [ ] **Step 3: Update copy and entities**
  Change all occurrences of `"Channel"` to `"Page"` (`LinkedIn Page ↗`, `Instagram Page ↗`, `Facebook Page ↗`). Replace any `&nearr;` with literal `↗`.

---

### Task 7: Navbar Hover Effects & Contact / Footer Refinements in `src/components/Navbar.tsx` & `src/components/ContactSection.tsx`

**Files:**
- Modify: `src/components/Navbar.tsx`
- Modify: `src/components/ContactSection.tsx`

**Interfaces:**
- Consumes: Social links and navigation items
- Produces: Subtle hover lift on all nav links, circular "Let's talk" linked to LinkedIn with magnetic hover effect, clean footer without "Back to top", and literal `LinkedIn ↗`.

- [ ] **Step 1: Update `src/components/Navbar.tsx`**
  Add `inline-block transform hover:-translate-y-0.5 hover:text-[#EFE9DC] transition-all duration-200` to `Work`, `About`, `Leadership`, `Contact`, and `LinkedIn →`. Unify LinkedIn URL to `siteConfig.socials.linkedin`.
- [ ] **Step 2: Update `src/components/ContactSection.tsx`**
  - Change `"Let's talk"` link `href` to `siteConfig.socials.linkedin` (`https://www.linkedin.com/in/ali-aun/`, target `_blank`).
  - Add magnetic hover float effect: `hover:scale-105 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(239,233,220,0.18)] transition-all duration-300 active:scale-95`.
  - Replace `LinkedIn &nearr;` with `LinkedIn ↗`.
  - Remove `<button onClick={...}>Back to top &uarr;</button>` completely from the footer.

---

### Task 8: Verification & Quality Assurance

**Files:**
- Verify: Full codebase

- [ ] **Step 1: Run Vitest test suite**
  Run: `npm test`
  Expected: 100% green pass on all test files.
- [ ] **Step 2: Run TypeScript static analysis**
  Run: `npx tsc --noEmit`
  Expected: 0 errors.
- [ ] **Step 3: Run production Next.js build**
  Run: `npm run build`
  Expected: Build succeeds with 6/6 static routes generated.
- [ ] **Step 4: Verify live interaction on localhost:3000**
  Verify hero layout, modal mouse wheel scroll, 3-brand ecosystem tabs, navbar hover lifts, and footer links.
