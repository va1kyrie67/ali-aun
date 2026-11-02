export type CategoryId =
  | 'all'
  | 'web-engineering'
  | 'email-systems'
  | 'qa-audits'
  | 'content-strategy'
  | 'ai-automation';

export interface ProjectSpec {
  title: string;
  subtitle?: string;
  graphTitle?: string;
  graphNodes?: Array<{ step: string; label: string; color: string }>;
  telemetry?: {
    status?: string;
    latency?: string;
    successRate?: string;
    throughput?: string;
  };
  highlights: string[];
  techStack: string[];
  rawHtml?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: CategoryId;
  categoryLabel: string;
  badge: string;
  badgeColor?: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  specKey: string;
  specDetails?: ProjectSpec;
  features?: string[];
  stats?: { label: string; value: string }[];
  socialLinks?: {
    linkedin?: string;
    instagram?: string;
    facebook?: string;
  };
  mockupUrl?: string;
  actionLabel?: string;
}

export interface LeaderProfile {
  name: string;
  role: string;
  headline: string;
  bio: string;
  image: string;
  linkedinUrl: string;
  badges: string[];
  isManagedByAli?: boolean;
}

export interface SiteConfig {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  availability: string;
  location: string;
  socials: {
    linkedin: string;
    email: string;
    github?: string;
  };
  metrics: {
    label: string;
    value: string;
    suffix?: string;
    description: string;
  }[];
}
