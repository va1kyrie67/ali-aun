import { describe, it, expect } from 'vitest';
import { siteConfig, projects, modalSpecs, categories, workDisciplines, leaders } from '../src/data/siteData';

describe('Portfolio Data & Architecture Integrity (TDD)', () => {
  it('should have Ali Aun verified credentials and updated email', () => {
    expect(siteConfig.name).toBe('Ali Aun');
    expect(siteConfig.title).toContain('SQA');
    expect(siteConfig.socials.linkedin).toBe('https://www.linkedin.com/in/ali-aun/');
    // TDD test for updated email
    expect(siteConfig.socials.email).toBe('aliaunnnn@gmail.com');
    expect(siteConfig.metrics.length).toBeGreaterThanOrEqual(4);
  });

  it('should cover all required engineering categories', () => {
    const requiredCategories = [
      'web-engineering',
      'email-systems',
      'qa-audits',
      'content-strategy',
      'ai-automation',
    ];

    const categoryIds = categories.map((c) => c.id);
    for (const req of requiredCategories) {
      expect(categoryIds).toContain(req);
    }
  });

  it('should have exactly 8 projects in user-specified order with 4-line descriptions and live URLs', () => {
    expect(projects.length).toBe(8);

    const projectIds = projects.map((p) => p.id);
    expect(projectIds).toEqual([
      'crushsvg',
      'sigsignature',
      'prodent-club',
      'smart-appliance',
      'priority-plus-light',
      'content-system',
      'n8n-leads-engine',
      'social-watchdog',
    ]);

    // Ensure live URLs for the flagship tech brands
    const crushsvg = projects.find((p) => p.id === 'crushsvg');
    expect(crushsvg?.liveUrl).toBe('https://www.crushsvg.net');

    const sigsignature = projects.find((p) => p.id === 'sigsignature');
    expect(sigsignature?.liveUrl).toBe('https://sigsignature.com');

    const contentSystem = projects.find((p) => p.id === 'content-system');
    expect(contentSystem?.liveUrl).toBe('https://www.thenevon.com');

    for (const p of projects) {
      expect(p.id).toBeDefined();
      // Executive concise description assertions (100 to 260 chars)
      expect(p.description.length).toBeGreaterThanOrEqual(100);
      expect(p.description.length).toBeLessThanOrEqual(260);
      expect(p.specKey).toBeDefined();
      // Ensure matching spec exists in modalSpecs
      expect(modalSpecs[p.specKey]).toBeDefined();
      // TDD: Technology & protocols tags must be expanded to 5-7 pills (Image 6)
      expect(modalSpecs[p.specKey].techStack.length).toBeGreaterThanOrEqual(5);
    }
  });

  it('should have 8 work disciplines without client tags or Live Validated text', () => {
    expect(workDisciplines.length).toBe(8);

    const disciplineNumbers = workDisciplines.map((d) => d.number);
    expect(disciplineNumbers).toEqual(['01', '02', '03', '04', '05', '06', '07', '08']);

    for (const d of workDisciplines) {
      expect(modalSpecs[d.specKey]).toBeDefined();
      // Ensure no raw brackets, 'Live Validated', or '(Light)' in titles
      expect(d.title).not.toContain('[');
      expect(d.title).not.toContain(']');
      expect(d.title).not.toContain('(Light)');
      expect(d.subtitle).not.toContain('Live Validated');
    }

    // TDD: Explicitly verify Priority Plus Financial title without (Light)
    const priorityDiscipline = workDisciplines.find((d) => d.id === 'discipline-priority-light');
    expect(priorityDiscipline?.title).toBe('Priority Plus Financial');

    const priorityProject = projects.find((p) => p.id === 'priority-plus-light');
    expect(priorityProject?.title).toBe('Priority Plus Financial');

    expect(modalSpecs['priority-light'].title).not.toContain('(Light)');
  });

  it('should use 3D preview image for Priority Plus Financial in projects and disciplines', () => {
    const priorityProject = projects.find((p) => p.id === 'priority-plus-light');
    expect(priorityProject?.image).toBe('/thumb_priority_3d.png');

    const priorityDiscipline = workDisciplines.find((d) => d.id === 'discipline-priority-light');
    expect(priorityDiscipline?.image).toBe('/thumb_priority_3d.png');
  });

  it('should identify email systems and assign "Visit email system" actionLabel', () => {
    const emailProjects = projects.filter((p) => p.category === 'email-systems');
    expect(emailProjects.length).toBe(2);
    for (const p of emailProjects) {
      expect(['prodent-club', 'smart-appliance']).toContain(p.id);
      expect(p.actionLabel).toBe('Visit email system');
    }
  });

  it('should verify leadership profiles have Ali Aun and correct photo', () => {
    const aliProfile = leaders.find((l) => l.name === 'Ali Aun');
    expect(aliProfile).toBeDefined();
    expect(aliProfile?.image).toBe('/ali-photo.jpg');
    expect(aliProfile?.linkedinUrl).toBe('https://www.linkedin.com/in/ali-aun/');
  });

  it('should verify updated copy for Sig Signature and Smart Appliance Services', () => {
    const sigsignature = projects.find((p) => p.id === 'sigsignature');
    expect(sigsignature?.categoryLabel).toBe('Full Web Application');
    expect(modalSpecs['sigsignature-qa'].subtitle).toContain('Full Web Application');

    const smartAppliance = projects.find((p) => p.id === 'smart-appliance');
    expect(smartAppliance?.badge).toContain('12 Templates');
    expect(smartAppliance?.badge).not.toContain('12 Variations');
  });

  it('should export StarryCursor component cleanly', async () => {
    const StarryCursorModule = await import('../src/components/StarryCursor');
    expect(StarryCursorModule.default).toBeDefined();
    expect(typeof StarryCursorModule.default).toBe('function');
  });

  it('should export OpeningCinematic and Hero components cleanly', async () => {
    const OpeningCinematicModule = await import('../src/components/OpeningCinematic');
    expect(OpeningCinematicModule.default).toBeDefined();

    const HeroModule = await import('../src/components/Hero');
    expect(HeroModule.default).toBeDefined();
  });

  it('should include SigSignature alongside The Nevon and CrushSVG in Hero marquee ticker', async () => {
    const fs = await import('fs');
    const heroCode = fs.readFileSync('src/components/Hero.tsx', 'utf-8');
    expect(heroCode).toContain('<span>The Nevon</span>');
    expect(heroCode).toContain('<span>CrushSVG</span>');
    expect(heroCode).toContain('<span>SigSignature</span>');
  });

  it('should have PFP hover interactions in LeadershipSection without conflicting transition-all', async () => {
    const fs = await import('fs');
    const leadershipCode = fs.readFileSync('src/components/LeadershipSection.tsx', 'utf-8');
    // Ensure PFP has interactive hover classes
    expect(leadershipCode).toContain('group/pfp');
    expect(leadershipCode).toContain('group-hover/pfp:scale-110');
    // Ensure motion.div cards do not have transition-all
    expect(leadershipCode).not.toMatch(/motion\.div[^>]*transition-all/);
  });
});


