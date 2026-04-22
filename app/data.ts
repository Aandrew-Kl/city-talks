/**
 * Canonical shared site configuration for City Talks.
 * Agent A owns this file — other agents import from here for nav/category/site copy.
 */

export type CategorySlug = "opinions" | "smart-cities";

export interface Category {
  slug: CategorySlug;
  label: string;
  greek: string;
  description: string;
}

/**
 * Canonical category list. WP's `local-administration`, `politics`, `programs`,
 * `city-talks`, `uncategorized` all collapse into `opinions`.
 */
export const categories: readonly Category[] = [
  {
    slug: "opinions",
    label: "Opinions",
    greek: "Απόψεις",
    description:
      "Φιλοξενούμε Απόψεις με έμφαση στην Διοίκηση των Δήμων",
  },
  {
    slug: "smart-cities",
    label: "Smart Cities",
    greek: "Έξυπνες Πόλεις",
    description: "Έξυπνες πόλεις - Έξυπνες Ιδέες - Έξυπνοι Διάλογοι.",
  },
] as const;

export interface NavItem {
  href: string;
  label: string;
}

/**
 * Primary header navigation. The WP site had only a single "City Talks" wordmark
 * item, so we add real top-level navigation for visible IA.
 */
export const navItems: readonly NavItem[] = [
  { href: "/opinions", label: "Opinions" },
  { href: "/smart-cities", label: "Smart Cities" },
  { href: "/lets-talk", label: "Lets Talk" },
  { href: "/podcasts", label: "Podcasts" },
] as const;

/**
 * Iconbox grid — matches the 4 cards on the WP homepage.
 * Copy is pulled verbatim from the live site.
 */
export interface IconBox {
  slug: string;
  href: string;
  title: string;
  description: string;
  /** Heroicon-style inline SVG path identifier — resolved in IconBoxGrid. */
  icon: "opinions" | "lets-talk" | "podcasts" | "smart-cities";
}

export const iconBoxes: readonly IconBox[] = [
  {
    slug: "opinions",
    href: "/opinions",
    title: "Opinions",
    description: "Φιλοξενούμε Απόψεις με έμφαση στην Διοίκηση των Δήμων",
    icon: "opinions",
  },
  {
    slug: "lets-talk",
    href: "/lets-talk",
    title: "Let's Talk",
    description:
      "Μιλάμε για τους Δήμους, προκαλούμε και φιλοξενούμε συζητήσεις... κάνουμε City Talks!",
    icon: "lets-talk",
  },
  {
    slug: "podcasts",
    href: "/podcasts",
    title: "Podcasts",
    description:
      "Ηχογραφημένοι διάλογοι και μονόλογοι με έμφαση στα θέματα της Τοπικής Αυτοδιοίκησης.",
    icon: "podcasts",
  },
  {
    slug: "smart-cities",
    href: "/smart-cities",
    title: "Smart Cities",
    description: "Έξυπνες πόλεις - Έξυπνες Ιδέες - Έξυπνοι Διάλογοι.",
    icon: "smart-cities",
  },
] as const;

export interface SocialLink {
  href: string;
  label: string;
  icon: "facebook" | "youtube" | "instagram" | "x";
}

export const socialLinks: readonly SocialLink[] = [
  {
    href: "https://www.facebook.com/citytalks.gr",
    label: "Facebook",
    icon: "facebook",
  },
  {
    href: "https://www.youtube.com/@citytalks",
    label: "YouTube",
    icon: "youtube",
  },
  {
    href: "https://www.instagram.com/citytalks.gr/",
    label: "Instagram",
    icon: "instagram",
  },
  {
    href: "https://x.com/citytalks_gr",
    label: "X",
    icon: "x",
  },
] as const;

export const siteMeta = {
  name: "City Talks",
  url: "https://city-talks.gr",
  email: "info@city-talks.gr",
  title:
    "City Talks | Ας μιλήσουμε για τους Δήμους, ας κάνουμε City Talks!",
  description:
    "Δημιουργήσαμε το city talks, για να επικοινωνήσουμε, δίνοντας βήμα σε ανθρώπους με αποδεδειγμένη γνώση στη διοίκηση δήμων.",
  greekTagline: "Ας μιλήσουμε για τους Δήμους",
  heroHeadline:
    "Ας μιλήσουμε για τους Δήμους, ας κάνουμε City Talks!",
  heroIntro: [
    "Η ποιότητα ζωής μας εξαρτάται από τον Δήμο, αποφασίσαμε να δημιουργήσουμε αυτό εδώ το μέρος, το city talks, για να επικοινωνήσουμε δίνοντας βήμα σε ανθρώπους με αποδεδειγμένη γνώση στη διοίκηση δήμων.",
    "Σε αυτό εδώ το χώρο, όποιοι γράφουν δε λογοκρίνονται, απλά φιλοξενούνται οι απόψεις τους!",
  ],
  footer: {
    rotatingLead: "We'd love to",
    rotatingKeywords: ["partner up", "build", "talk"],
    invitation:
      "Looking for collaboration? Send an email to info@city-talks.gr to be available for enquiries and collaborations.",
    copyright:
      "© 2026 City Talks. Ας μιλήσουμε για τους Δήμους.",
  },
} as const;

/**
 * Footer menu — the brief says Menu column should link to real nav items
 * plus Articles. Articles page is owned by Agent B; we still link to it here.
 */
export const footerMenu: readonly NavItem[] = [
  { href: "/opinions", label: "Opinions" },
  { href: "/smart-cities", label: "Smart Cities" },
  { href: "/lets-talk", label: "Lets Talk" },
  { href: "/podcasts", label: "Podcasts" },
] as const;
