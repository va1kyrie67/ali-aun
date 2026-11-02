import { SiteConfig, ProjectItem, ProjectSpec, CategoryId, LeaderProfile } from '../types/portfolio';

export const siteConfig: SiteConfig = {
  name: "Ali Aun",
  title: "Digital Architecture & Senior SQA Specialist",
  tagline: "Engineering high-impact systems across code, quality and content.",
  bio: "Digital Architect & Senior SQA Specialist crafting software, email systems and automation engines.",
  availability: "Open to select high-impact projects",
  location: "Islamabad, Pakistan / Remote Worldwide",
  socials: {
    linkedin: "https://www.linkedin.com/in/ali-aun/",
    email: "aliaunnnn@gmail.com",
    github: "https://github.com/va1kyrie67"
  },
  metrics: [
    {
      label: "Autonomous Leads",
      value: "900+",
      suffix: "/day",
      description: "Dispatched across 3 parallel cold outreach engines"
    },
    {
      label: "QA Test Coverage",
      value: "100%",
      suffix: "",
      description: "Regression suites covering 4 core vector engines"
    },
    {
      label: "Email Systems",
      value: "29+",
      suffix: "Templates",
      description: "Tested across Outlook 365, Apple Mail & Gmail"
    },
    {
      label: "Pipeline Latency",
      value: "420ms",
      suffix: "",
      description: "Average latency on LLM-powered Slack event agents"
    }
  ]
};

export const categories: { id: CategoryId; label: string }[] = [
  { id: 'all', label: 'All Work' },
  { id: 'web-engineering', label: 'Web Applications' },
  { id: 'email-systems', label: 'Email Systems' },
  { id: 'qa-audits', label: 'SQA & Audits' },
  { id: 'content-strategy', label: 'Content Engines' },
  { id: 'ai-automation', label: 'Automation & AI' }
];

export const modalSpecs: Record<string, ProjectSpec> = {
  'crushsvg-qa': {
    title: 'CrushSVG: Automated Core Vector Testing Engine & E2E Suite',
    subtitle: 'Playwright E2E • XSS Payload Sanitization • Rate-Limit Auth Gates',
    rawHtml: `
      <h4>Automated Vector Testing Engine & E2E Suite</h4>
      <p>Full automated Playwright test suite (crushsvg.spec.js) validating 4 vector conversion engines: SVG to PNG, PNG to SVG, Resizer, and AI Background Remover.</p>
      <ul>
        <li><strong>XSS Vector Payload Sanitization:</strong> Automated security assertions ensuring malicious &lt;script&gt; injections and URI schemes are stripped from uploads.</li>
        <li><strong>Cookie Rate-Limit Validation:</strong> Enforces 3-conversion guest rate-limits, countdown counters, and auth-gate redirects.</li>
        <li><strong>Multi-Channel Launch:</strong> Coordinated marketing campaigns across LinkedIn, Instagram, and Facebook.</li>
      </ul>
    `,
    highlights: [
      'Full Playwright regression suite for 4 vector engines',
      'XSS vector sanitization asserting safe DOM output',
      '3-conversion guest rate-limit enforcement and auth gate'
    ],
    techStack: ['Playwright E2E', 'Node.js', 'DOMPurify', 'Canvas API', 'XSS Sanitizer', 'Rate-Limit Gates', 'Vector Engines']
  },
  'sigsignature-qa': {
    title: 'Sig Signature: Email Signature Platform & SQA Suite',
    subtitle: 'Full Web Application • Zero-Breakpoint HTML • SQA Release Checks',
    rawHtml: `
      <h4>Email Signature Generator & SQA Release Verification</h4>
      <p>A production web application turning email signatures into a two-minute job: templates, live preview, and one-click HTML copy.</p>
      <ul>
        <li><strong>Cross-Client Rendering:</strong> Validated table layouts for Apple Mail, Gmail, Outlook 365, and Superhuman.</li>
        <li><strong>SQA & Launch Readiness:</strong> Complete functional test pass across input fields, photo upload, and instant code export.</li>
        <li><strong>Multi-Platform Publishing:</strong> Active brand presence and posting across LinkedIn, Instagram, and Facebook.</li>
      </ul>
    `,
    highlights: [
      'Zero-breakpoint table generation for Outlook & Gmail',
      'Instant HTML preview & copy-to-clipboard engine',
      'Complete pre-launch QA across mobile and desktop clients'
    ],
    techStack: ['React 18', 'HTML Table Architecture', 'VML Tables', 'Jest', 'Cross-Client QA', 'Clipboard API', 'Litmus']
  },
  'prodent-specs': {
    title: 'Pro-Dent Club: 17-Template High-Impact Email System',
    subtitle: 'Enterprise Email System • 17 Production Variations',
    rawHtml: `
      <h4>17-Template High-Impact Email System</h4>
      <p>Complete 17-template email suite engineered for independent dental practices. Includes VIP Onboarding, Buying Power, Strategic Cost Comparison, Curve Dental Partnership, and ADP Payroll integrations.</p>
      <ul>
        <li><strong>Outlook Desktop Bulletproofing:</strong> Full VML &lt;v:rect&gt; background fallbacks and MSO conditional comment wrappers.</li>
        <li><strong>Zero-Shift Mobile Fluidity:</strong> Fluid table layout scaling down to 375px without horizontal clipping.</li>
        <li><strong>Tested Clients:</strong> Verified in Outlook 365, Apple Mail, Gmail, and Yahoo.</li>
      </ul>
    `,
    highlights: [
      '17 modular responsive email templates',
      'Bulletproof Outlook VML background geometry',
      'Zero horizontal clipping on mobile devices'
    ],
    techStack: ['HTML/CSS for Email', 'Outlook VML', 'Litmus Testing', 'Figma Tokens', 'ADP Partnership', 'Curve Dental V4', 'Mobile Fluidity']
  },
  'services-templates': {
    title: 'Smart Appliance Services: Rapid Route Booking Suite',
    subtitle: '12 Specialized Transactional & Lifecycle Templates',
    rawHtml: `
      <h4>Rapid Route Booking & Service Lifecycle Suite</h4>
      <p>Specialized transactional and promotional email system for home service providers. Includes emergency availability alerts, seasonal tune-up offers, and route slot booking.</p>
      <ul>
        <li><strong>Emergency Dispatch Alerts:</strong> High-urgency alert layouts engineered for high CTR.</li>
        <li><strong>3-Choice Decision Architecture:</strong> Modular layouts simplifying complex technician schedules.</li>
        <li><strong>Production Ready:</strong> Live interactive studio viewer for desktop and mobile preview.</li>
      </ul>
    `,
    highlights: [
      '12 production email templates with emergency alerts',
      'Modular 3-choice technician booking layout',
      'Tested across 40+ desktop and mobile email clients'
    ],
    techStack: ['Responsive HTML Tables', 'VML Fallbacks', 'Route Scheduling UI', 'Litmus Testing', 'Design System Deck', 'Vercel CDN', 'Emergency Dispatch CTA']
  },
  'priority-light': {
    title: 'Priority Plus Financial: Institutional Enterprise Platform',
    subtitle: 'High-Trust Corporate UX • WCAG 2.2 AA Compliance',
    rawHtml: `
      <h4>Institutional Enterprise Platform</h4>
      <p>High-conversion corporate platform engineered for institutional credibility. Includes responsive loan quote forms, BBB accreditation showcases, and step-by-step application timelines.</p>
      <ul>
        <li><strong>High-Trust Corporate Aesthetic:</strong> Designed to maximize borrower conversion and bank credibility.</li>
        <li><strong>Dynamic Marquee:</strong> Live lending partner showcase with institutional trust badges.</li>
        <li><strong>WCAG 2.2 AA:</strong> Accessible contrast ratios and semantic form validation.</li>
      </ul>
    `,
    highlights: [
      'Institutional lending intake flow with instant calculation',
      'WCAG 2.2 AA compliant high-contrast color scheme',
      'Full mobile responsiveness and form error validation'
    ],
    techStack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'WCAG 2.2 AA', 'Lender Marquee', 'Institutional Trust']
  },
  'nevon-playbook': {
    title: 'Multi-Brand Content Engine & Editorial Leadership',
    subtitle: 'CrushSVG • SigSignature • The Nevon • Managed by Ali Aun',
    rawHtml: `
      <h4>Multi-Brand Content Engine & Leadership Channels</h4>
      <p>Strategic editorial architecture and multi-platform content publishing across LinkedIn, Instagram, and Facebook for CrushSVG, SigSignature, and The Nevon.</p>
      <ul>
        <li><strong>Three Brand Ecosystems:</strong> Consistent brand voice, visual aesthetics, and launch campaigns across all 3 ventures.</li>
        <li><strong>Executive Thought Leadership:</strong> Ghostwriting and strategy for CEO Sardar Nadir.</li>
        <li><strong>Social Syndication:</strong> Scheduled publishing across LinkedIn, Instagram, and Facebook profiles.</li>
      </ul>
    `,
    highlights: [
      'Multi-channel brand positioning for 3 active tech brands',
      'Executive thought leadership and viral storytelling',
      'End-to-end design assets and carousel publishing'
    ],
    techStack: ['LinkedIn Publishing', 'Instagram Creator Studio', 'Facebook Business', 'SEO Strategy', 'Executive Ghostwriting', 'Brand Governance']
  },
  'leads-outreach-visual': {
    title: 'Tri-Engine Cold Outreach & 900-Lead Daily Autonomous Growth Engine',
    subtitle: 'n8n Master Cron • 3 Parallel Engines • 900 Pitches/Day',
    rawHtml: `
      <h4>Tri-Engine Cold Outreach & 900-Lead Daily Engine</h4>
      <p>High-throughput autonomous B2B acquisition infrastructure in n8n. Coordinates three parallel dispatch engines with an autonomous 5-stage zero-bounce lead harvester.</p>
      <ul>
        <li><strong>3 Parallel Dispatch Engines:</strong> 6 rotating Gmail inboxes (300 pitches) + 2 Zoho Business accounts (600 pitches @ 50/hr).</li>
        <li><strong>5-Stage Zero-Bounce Harvester:</strong> Cleans, validates MX records, and filters disposable emails.</li>
        <li><strong>Real-Time Telemetry:</strong> Live dispatch status and bounce alerts sent directly to Slack.</li>
      </ul>
    `,
    highlights: [
      '900 certified pitches sent daily with zero manual effort',
      'Rotating inbox architecture preventing spam threshold triggers',
      'Real-time Slack dispatch and conversion telemetry'
    ],
    techStack: ['n8n Cloud', 'Gmail API (6 Inboxes)', 'Zoho Mail API (2 Inboxes)', 'Slack Webhooks', 'MX Record Validator', 'Zero-Bounce Filter']
  },
  'social-broadcaster-visual': {
    title: 'Autonomous Multi-Platform Broadcaster & Zero-Auth Scheduling Watchdog',
    subtitle: 'n8n Delay Watchdog • Zero-Auth Harvester • Slack #social',
    rawHtml: `
      <h4>Autonomous Multi-Platform Broadcaster & Scheduling Watchdog</h4>
      <p>Zero-click corporate social syndication engine eliminating manual URL copying. Uses zero-auth link-expanding harvesting across LinkedIn, Instagram, and Facebook profiles.</p>
      <ul>
        <li><strong>Zero-Auth Link Harvesting:</strong> Expands links without fragile third-party session tokens.</li>
        <li><strong>Delay Watchdog:</strong> Multi-interval polling (:00, :05, :10, :15) absorbs native 4-5 minute scheduling delays.</li>
        <li><strong>Slack Syndication:</strong> Broadcasts formatted update cards to team #social channels via The Nevon Agent.</li>
      </ul>
    `,
    highlights: [
      'Zero-auth URL scraping across LinkedIn, Instagram and Facebook',
      'Multi-interval watchdog absorbing native social queue lag',
      'Autonomous Slack #social channel distribution'
    ],
    techStack: ['n8n Master Cron', 'Puppeteer', 'Slack Bolt SDK', 'Regex Link Expander', 'Zero-Auth Harvester', 'Delay Watchdog']
  }
};

export const projects: ProjectItem[] = [
  // 1. CrushSVG
  {
    id: "crushsvg",
    title: "CrushSVG",
    client: "CrushSVG",
    category: "qa-audits",
    categoryLabel: "Web application & vector engine",
    badge: "01 • Web App, SQA & Socials",
    badgeColor: "amber",
    description: "High-speed vector engine engineered for instant SVG-to-PNG conversion. Protected by an automated Playwright regression suite, XSS payload sanitization, guest rate-limit gates, and synchronized tri-channel publishing across LinkedIn, Instagram, and Facebook.",
    image: "/thumb_crushsvg.png",
    tags: ["Playwright E2E", "XSS Sanitization", "3-Conversion Limits", "Social Syndication", "DOMPurify", "Vector Canvas"],
    liveUrl: "https://www.crushsvg.net",
    mockupUrl: "crushsvg.net",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/crushsvg/",
      instagram: "https://www.instagram.com/crushsvg_net/",
      facebook: "https://www.facebook.com/profile.php?id=61593405728605"
    },
    specKey: "crushsvg-qa",
    features: [
      "Automated test suites (crushsvg.spec.js) for 4 vector engines",
      "XSS payload sanitization on all SVG uploads",
      "Active posting and launch campaigns on LinkedIn, Instagram and Facebook",
      "Guest rate-limit enforcement and conversion auth gates"
    ]
  },

  // 2. Sig Signature
  {
    id: "sigsignature",
    title: "Sig Signature",
    client: "Sig Signature",
    category: "web-engineering",
    categoryLabel: "Full Web Application",
    badge: "02 • Web Platform & SQA",
    badgeColor: "blue",
    description: "Production email signature generator delivering responsive templates, real-time preview, and clean one-click HTML export. Built with zero-breakpoint table architecture, verified across 40+ email clients, and supported by automated social syndication.",
    image: "/thumb_sigsignature.png",
    tags: ["Email Signature App", "Table Architecture", "SQA Testing", "Social Syndication", "Cross-Client Litmus", "Clipboard Engine"],
    liveUrl: "https://sigsignature.com",
    mockupUrl: "sigsignature.com",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/ali-aun/",
      instagram: "https://www.instagram.com/the_nevon/",
      facebook: "https://www.facebook.com/profile.php?id=61591527347235"
    },
    specKey: "sigsignature-qa",
    features: [
      "Zero-breakpoint HTML email signature generator",
      "Automated cross-client test suites across Outlook & Gmail",
      "Active brand syndication on LinkedIn, Instagram and Facebook",
      "Instant copy-to-clipboard code and live preview matrix"
    ]
  },

  // 3. Pro-Dent Club
  {
    id: "prodent-club",
    title: "Pro Dental Club",
    client: "Pro-Dent Club",
    category: "email-systems",
    categoryLabel: "Email templates & lifecycle system",
    badge: "03 • Email System • 17 Templates",
    badgeColor: "purple",
    description: "Enterprise email suite featuring 17 modular responsive variations for independent dental groups. Engineered with bulletproof Outlook VML background fallbacks, ADP integration, and zero horizontal clipping across mobile screens down to 375px.",
    image: "/thumb_prodent.png",
    tags: ["Outlook VML Tables", "ADP Partnership", "Curve Dental V1-V4", "100% Mobile Ready", "Litmus Verified", "HTML Email"],
    liveUrl: "https://prodent-lovat.vercel.app/",
    mockupUrl: "prodent-lovat.vercel.app",
    actionLabel: "Visit email system",
    specKey: "prodent-specs",
    features: [
      "17 responsive email templates engineered for dental practices",
      "VML conditional background wrappers for legacy Outlook desktop",
      "ADP Payroll partnership and GoHighLevel booking integration",
      "Zero horizontal shift on mobile screens down to 375px"
    ]
  },

  // 4. Smart Appliance Services
  {
    id: "smart-appliance",
    title: "Smart Appliance Services",
    client: "Smart Appliance Services",
    category: "email-systems",
    categoryLabel: "Email templates & dispatch alerts",
    badge: "04 • Email Templates • 12 Templates",
    badgeColor: "cyan",
    description: "Transactional and promotional email system for home service dispatch, featuring urgent emergency route alerts and interactive 3-choice scheduling cards. Built with tested modular table layouts, VML fallbacks, and a complete token design system.",
    image: "/thumb_services.png",
    tags: ["Emergency Alerts", "Route Slots", "Brand System Deck", "Modular Layouts", "VML Fallbacks", "High-CTR Architecture"],
    liveUrl: "https://services-template-1w9w.vercel.app/",
    mockupUrl: "services-template-1w9w.vercel.app",
    actionLabel: "Visit email system",
    specKey: "services-templates",
    features: [
      "Urgent emergency same-day dispatch alert layout system",
      "Interactive 3-choice decision cards for tune-ups and diagnostic calls",
      "Comprehensive design system token guide and typography scale",
      "Live testing across 40+ client rendering engines"
    ]
  },

  // 5. Priority Plus Financial (Light)
  {
    id: "priority-plus-light",
    title: "Priority Plus Financial",
    client: "Priority Plus Financial",
    category: "web-engineering",
    categoryLabel: "Institutional enterprise platform",
    badge: "05 • Next.js 14 Corporate UI",
    badgeColor: "blue",
    description: "Corporate financial platform engineered for institutional credibility. Features responsive loan quote calculation forms, BBB accreditation showcases, and WCAG 2.2 AA compliant high-contrast color hierarchy for frictionless mobile intake.",
    image: "/thumb_priority_3d.png",
    tags: ["Next.js 14", "Corporate Light UI", "WCAG 2.2 AA", "Lender Marquee", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://priority-plus-light.vercel.app/",
    mockupUrl: "priority-plus-light.vercel.app",
    specKey: "priority-light",
    features: [
      "WCAG 2.2 AA compliant high-contrast color hierarchy",
      "Multi-step frictionless lead intake application timeline",
      "Responsive layout optimized for mobile conversion",
      "Institutional lender logo ticker with trust badges"
    ]
  },

  // 6. Multi-Brand Content System
  {
    id: "content-system",
    title: "Content Ecosystem",
    client: "The Nevon • CrushSVG • SigSignature",
    category: "content-strategy",
    categoryLabel: "Multi-brand social media channels",
    badge: "06 • Multi-Channel Brand System",
    badgeColor: "purple",
    description: "Strategic editorial architecture and multi-platform publishing across LinkedIn, Instagram, and Facebook for CrushSVG, SigSignature, and The Nevon. Delivers cohesive brand positioning, executive thought leadership, and automated channel syndication.",
    image: "/thumb_thenevon.png",
    tags: ["Three Tech Brands", "LinkedIn Authority", "Instagram Studio", "Facebook Channels", "SEO Strategy", "Editorial Voice"],
    liveUrl: "https://www.thenevon.com",
    mockupUrl: "thenevon.com • crushsvg.net • sigsignature.com",
    socialLinks: {
      linkedin: "https://www.linkedin.com/company/the-nevon/",
      instagram: "https://www.instagram.com/the_nevon/",
      facebook: "https://www.facebook.com/profile.php?id=61591527347235"
    },
    specKey: "nevon-playbook",
    features: [
      "Multi-channel syndication across LinkedIn, Instagram and Facebook",
      "Executive storytelling for Founder & CEO Sardar Nadir",
      "Brand asset consistency for CrushSVG, SigSignature and The Nevon",
      "End-to-end editorial design assets and carousel publishing"
    ]
  },

  // 7. n8n Leads Outreach Engine
  {
    id: "n8n-leads-engine",
    title: "Tri-Engine Cold Outreach",
    client: "Growth Infrastructure",
    category: "ai-automation",
    categoryLabel: "Autonomous acquisition engine",
    badge: "07 • n8n Master Cron • 900 Pitches/Day",
    badgeColor: "amber",
    description: "High-throughput autonomous acquisition pipeline in n8n coordinating three parallel dispatch engines across 6 Gmail and 2 Zoho accounts. Integrates a 5-stage zero-bounce verification harvester generating 900 prospects daily with Slack telemetry.",
    image: "/thumb_leads_outreach_engine.png",
    tags: ["n8n Master Cron", "3 Parallel Engines", "2x Zoho Business", "6x Gmail Inboxes", "Zero-Bounce", "Slack Telemetry"],
    mockupUrl: "app.n8n.cloud • 900-leads-cron",
    specKey: "leads-outreach-visual",
    features: [
      "Synchronized cron orchestration across 6 Gmail & 2 Zoho engines",
      "5-stage zero-bounce domain verification pipeline",
      "Real-time dispatch telemetry and conversion alerts sent to Slack",
      "Automated inbox rotation protecting domain reputation"
    ]
  },

  // 8. Social Links Harvester & Watchdog
  {
    id: "social-watchdog",
    title: "Social Links Harvester",
    client: "Social Syndication",
    category: "ai-automation",
    categoryLabel: "Zero-auth scheduling watchdog",
    badge: "08 • n8n Delay Watchdog • Slack #social",
    badgeColor: "emerald",
    description: "Autonomous zero-auth link harvesting engine and uptime watchdog in n8n. Continuously extracts and normalizes dynamic social endpoints across multi-brand properties, executing automated latency checks and instant incident alerts directly to Slack.",
    image: "/thumb_watchdog.png",
    tags: ["n8n Delay Watchdog", "Zero-Auth Harvester", "Slack Broadcaster", "Lag Buffer", "Bolt SDK", "Regex Expander"],
    mockupUrl: "slack.com/app_redirect?channel=social",
    specKey: "social-broadcaster-visual",
    features: [
      "Zero-auth link expansion eliminating fragile third-party session tokens",
      "Multi-interval scheduling watchdog absorbing native social queue lag",
      "Autonomous Slack syndication with deterministic brand attribution",
      "Real-time corporate team notifications in #social"
    ]
  }
];

export interface WorkDisciplineItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  client: string;
  specKey: string;
  liveUrl?: string;
  image: string;
  socials?: { linkedin?: string; instagram?: string; facebook?: string };
}

export const workDisciplines: WorkDisciplineItem[] = [
  {
    id: "discipline-sigsignature",
    number: "01",
    title: "Sig Signature",
    subtitle: "SQA & testing, launch readiness, and active publishing across LinkedIn, Instagram and Facebook",
    client: "Sig Signature",
    specKey: "sigsignature-qa",
    liveUrl: "https://sigsignature.com",
    image: "/thumb_sigsignature.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/ali-aun/",
      instagram: "https://www.instagram.com/the_nevon/",
      facebook: "https://www.facebook.com/profile.php?id=61591527347235"
    }
  },
  {
    id: "discipline-crushsvg",
    number: "02",
    title: "CrushSVG",
    subtitle: "Automated vector testing engine, SQA launch validation, and active publishing across LinkedIn, Instagram and Facebook",
    client: "CrushSVG",
    specKey: "crushsvg-qa",
    liveUrl: "https://www.crushsvg.net",
    image: "/thumb_crushsvg.png",
    socials: {
      linkedin: "https://www.linkedin.com/company/crushsvg/",
      instagram: "https://www.instagram.com/crushsvg_net/",
      facebook: "https://www.facebook.com/profile.php?id=61593405728605"
    }
  },
  {
    id: "discipline-thenevon",
    number: "03",
    title: "The Nevon",
    subtitle: "Architecture SQA, enterprise launch testing, and active publishing across LinkedIn, Instagram and Facebook",
    client: "The Nevon",
    specKey: "nevon-playbook",
    liveUrl: "https://www.thenevon.com",
    image: "/thumb_thenevon.png",
    socials: {
      linkedin: "https://www.linkedin.com/company/the-nevon/",
      instagram: "https://www.instagram.com/the_nevon/",
      facebook: "https://www.facebook.com/profile.php?id=61591527347235"
    }
  },
  {
    id: "discipline-priority-light",
    number: "04",
    title: "Priority Plus Financial",
    subtitle: "Institutional enterprise platform, high-trust corporate UX and WCAG 2.2 AA accessibility",
    client: "Priority Plus Financial",
    specKey: "priority-light",
    liveUrl: "https://priority-plus-light.vercel.app/",
    image: "/thumb_priority_3d.png"
  },
  {
    id: "discipline-prodent",
    number: "05",
    title: "Pro Dental Club",
    subtitle: "17-template enterprise email suite for dental buying group with ADP Payroll & Curve Dental",
    client: "Pro-Dent Club",
    specKey: "prodent-specs",
    liveUrl: "https://prodent-lovat.vercel.app/",
    image: "/thumb_prodent.png"
  },
  {
    id: "discipline-services",
    number: "06",
    title: "Smart Appliance Services",
    subtitle: "12 rapid route booking, emergency dispatch and seasonal service lifecycle email templates",
    client: "Smart Appliance Services",
    specKey: "services-templates",
    liveUrl: "https://services-template-1w9w.vercel.app/",
    image: "/thumb_services.png"
  },
  {
    id: "discipline-leads-engine",
    number: "07",
    title: "Tri-Engine Leads Outreach",
    subtitle: "n8n automation for leads engine & auto sender: 900 certified prospects daily via 6 Gmail + 2 Zoho",
    client: "Growth Infrastructure",
    specKey: "leads-outreach-visual",
    image: "/thumb_leads_outreach_engine.png"
  },
  {
    id: "discipline-social-watchdog",
    number: "08",
    title: "Social Links Harvester",
    subtitle: "n8n automation for zero-auth multi-platform link harvesting and delay watchdog integrated with Slack",
    client: "Social Syndication",
    specKey: "social-broadcaster-visual",
    image: "/thumb_watchdog.png"
  }
];

export const leaders: LeaderProfile[] = [
  {
    name: "Sardar Nadir",
    role: "Chief Executive Officer & Founder",
    headline: "CEO & Founder • The Nevon & CrushSVG",
    bio: "Executive leadership heading The Nevon and CrushSVG, driving AI workforce initiatives and creative technology ventures. Executive thought leadership, viral LinkedIn storytelling, and public editorial channels are directly managed and published by Ali Aun.",
    image: "/nadir-photo.png",
    linkedinUrl: "https://www.linkedin.com/in/nadir1214/",
    badges: ["Founder Leadership", "Executive Content Managed by Ali Aun", "Product Strategy", "Global Workforce"],
    isManagedByAli: true
  },
  {
    name: "Ali Aun",
    role: "Digital Architecture & Senior SQA Specialist",
    headline: "SQA & Automation Specialist @ The Nevon & CrushSVG | Playwright • Postman",
    bio: "Spearheading QA & SQA automation, test ticket lifecycle execution, and vector engine regression testing across The Nevon and CrushSVG. Directing multimedia production, official social media channel management, technical content architecture, and strategic brand publishing.",
    image: "/ali-photo.jpg",
    linkedinUrl: "https://www.linkedin.com/in/ali-aun/",
    badges: ["QA & SQA Lead", "Multimedia Direction", "Social Media Management", "Content Publishing", "Email Systems Architecture"],
    isManagedByAli: false
  }
];
