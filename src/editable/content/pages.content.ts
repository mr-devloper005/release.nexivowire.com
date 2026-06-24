import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Media distribution intelligence',
      description: 'Monitor updates, publish stories, and explore a premium editorial archive built for communications teams.',
      openGraphTitle: 'Media distribution intelligence',
      openGraphDescription: 'A modern editorial destination for releases, coverage, and timely media insight.',
      keywords: ['media distribution', 'press releases', 'communications platform', 'newsroom archive'],
    },
    hero: {
      badge: '',
      title: ['The future of media distribution', 'is clearer, faster, and more connected.'],
      description: 'Bring releases, coverage, brand signals, and market updates into one confident editorial experience built for modern distribution teams.',
      primaryCta: { label: 'Explore updates', href: '/updates' },
      secondaryCta: { label: 'Search the archive', href: '/search' },
      searchPlaceholder: 'Search releases, sectors, coverage, and insights',
      focusLabel: 'Focus',
      featureCardBadge: 'featured platform view',
      featureCardTitle: 'Fresh stories, strong context, and a premium presentation layer.',
      featureCardDescription: 'The homepage should feel like a polished product destination while still letting the live feed drive what visitors discover first.',
    },
    intro: {
      badge: 'Platform overview',
      title: 'Built for discovery, signal, and editorial clarity.',
      paragraphs: [
        'This site brings together releases, article-style reading, visual assets, and supporting resources so distribution teams can move through content without losing context.',
        'Instead of scattering updates across disconnected screens, the platform keeps stories, categories, and supporting material in a single visual system.',
        'Whether someone starts with a release, a gallery post, or a reference page, the experience keeps discovery structured and fast.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Search-first discovery that still feels editorial.',
        'Connected sections for distribution, visuals, profiles, and downloadable assets.',
        'Clear hierarchy for featured updates, supporting stories, and topic clusters.',
        'Lightweight motion and consistent calls to action across every route.',
      ],
      primaryLink: { label: 'Browse updates', href: '/search' },
      
    },
    cta: {
      badge: 'Get started',
      title: 'Stay ahead of the next media cycle.',
      description: 'Explore coverage, open the live archive, or contact the team behind the workflow.',
      primaryCta: { label: 'Browse Updates', href: '/search' },
      secondaryCta: { label: 'Contact us', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'About the platform',
    title: 'A sharper way to organize media distribution.',
    description: `${slot4BrandConfig.siteName} is built to make long-form reading, visual discovery, and supporting resources feel like one unified experience.`,
    paragraphs: [
      'Instead of splitting everything into disconnected pages, the platform keeps related content easy to move through and easy to understand.',
      'Whether someone starts with an article, listing, image post, or resource page, they can continue exploring without losing context.',
    ],
    values: [
      {
        title: 'Editorial clarity',
        description: 'Every page is structured to make headlines, summaries, and supporting context easy to scan.',
      },
      {
        title: 'Connected surfaces',
        description: 'Releases, visuals, profiles, and supporting resources stay linked so discovery feels intentional.',
      },
      {
        title: 'Operational confidence',
        description: 'The experience is built for teams that care about timing, clarity, and dependable presentation.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Start the next conversation with the right team.',
    description: 'Share a distribution goal, workflow question, or publishing request and we will route it to the right desk.',
    formTitle: 'Send your request',
  },
  search: {
    metadata: {
      title: 'Search',
      description: 'Search posts, topics, categories, and content across the site.',
    },
    hero: {
      badge: 'Search the archive',
      title: 'Find releases, coverage, and supporting assets faster.',
      description: 'Use keywords, categories, and content types to surface posts from every active section of the platform.',
      placeholder: 'Search by keyword, company, category, or headline',
    },
    resultsTitle: 'Latest searchable content',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Create and submit new content for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to open the publishing workspace.',
      description: 'Use your account to prepare updates, manage drafts, and create new posts for the active sections of the site.',
    },
    hero: {
      badge: 'Publishing workspace',
      title: 'Create polished content for every active section.',
      description: 'Choose the content type, add supporting details, and prepare a clean post with images, links, summaries, and body content.',
    },
    formTitle: 'Content details',
    submitLabel: 'Submit content',
    successTitle: 'Content submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to the desk.',
      description: 'Login to continue browsing, managing submissions, and creating new updates from your account.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start publishing.',
      description: 'Create an account to access the publishing workspace, save details, and submit content through the site.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Profile details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
