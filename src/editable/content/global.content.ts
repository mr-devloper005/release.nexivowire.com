import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || '',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: '',
    primaryLinks: [
      { label: '', href: '/updates' },
      { label: '', href: '/search' },
      { label: '', href: '/about' },
      { label: '', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Speak to an Expert', href: '/contact' },
      secondary: { label: 'Search', href: '/search' },
    },
  },
  footer: {
    tagline: '',
    description: 'Track announcements, publish updates, and surface timely stories through a polished editorial experience designed for distribution teams.',
    columns: [
      {
        title: 'Platform',
        links: [
          { label: 'Media Distribution', href: '/updates' },
          { label: 'Search Archive', href: '/search' },
          { label: 'Images', href: '/image' },
          { label: 'Documents', href: '/pdf' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
          { label: 'Log in', href: '/login' },
          { label: 'Sign up', href: '/signup' },
        ],
      },
    ],
    bottomNote: 'Editorial-grade discovery for teams that need timely visibility.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
