import type { CSSProperties } from 'react'

export const editableRootStyle = {
  '--slot4-page-bg': '#f4f6f8',
  '--slot4-page-text': '#102235',
  '--slot4-panel-bg': '#dfe9ee',
  '--slot4-surface-bg': '#ffffff',
  '--slot4-muted-text': '#446277',
  '--slot4-soft-muted-text': '#698697',
  '--slot4-accent': '#0C2C55',
  '--slot4-accent-fill': '#0C2C55',
  '--slot4-accent-soft': '#EDEDCE',
  '--slot4-dark-bg': '#1f2b39',
  '--slot4-dark-text': '#f8fbfd',
  '--slot4-media-bg': '#d5e3e8',
  '--slot4-cream': '#EDEDCE',
  '--slot4-warm': '#f8fafb',
  '--slot4-lavender': '#629FAD',
  '--slot4-gray': '#dbe5ea',
  '--slot4-body-gradient': 'linear-gradient(180deg, #f8fafb 0%, #edf3f5 46%, #ffffff 100%)',
} as CSSProperties

export const editablePalette = {
  pageBg: 'bg-[var(--slot4-page-bg)]',
  pageText: 'text-[var(--slot4-page-text)]',
  panelBg: 'bg-[var(--slot4-panel-bg)]',
  panelText: 'text-[var(--slot4-page-text)]',
  surfaceBg: 'bg-[var(--slot4-surface-bg)]',
  surfaceText: 'text-[var(--slot4-page-text)]',
  mutedText: 'text-[var(--slot4-muted-text)]',
  softMutedText: 'text-[var(--slot4-soft-muted-text)]',
  accentText: 'text-[var(--slot4-accent)]',
  accentBg: 'bg-[var(--slot4-accent-fill)]',
  accentSoftBg: 'bg-[var(--slot4-accent-soft)]',
  accentSoftText: 'text-[var(--slot4-accent-soft)]',
  darkBg: 'bg-[var(--slot4-dark-bg)]',
  darkText: 'text-[var(--slot4-dark-text)]',
  mediaBg: 'bg-[var(--slot4-media-bg)]',
  creamBg: 'bg-[var(--slot4-cream)]',
  warmBg: 'bg-[var(--slot4-warm)]',
  lavenderBg: 'bg-[var(--slot4-lavender)]',
  grayBg: 'bg-[var(--slot4-gray)]',
  border: 'border-[rgba(12,44,85,0.14)]',
  darkBorder: 'border-white/15',
  shadow: 'shadow-[0_18px_48px_rgba(12,44,85,0.12)]',
  shadowStrong: 'shadow-[0_30px_90px_rgba(12,44,85,0.22)]',
  overlay: 'bg-[linear-gradient(180deg,rgba(12,44,85,0.08),rgba(12,44,85,0.9))]',
} as const

export const editableDesignContract = {
  shell: {
    page: `min-h-screen ${editablePalette.pageBg} ${editablePalette.pageText}`,
    section: 'mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-10',
    sectionY: 'py-16 sm:py-20 lg:py-24',
  },
  layout: {
    safeGrid: 'grid gap-5 md:grid-cols-2 xl:grid-cols-3',
    featureGrid: 'grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start',
    rail: 'flex snap-x gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
    minRailCard: 'w-[230px] shrink-0 snap-start sm:w-[260px]',
  },
  type: {
    eyebrow: 'text-[11px] font-bold uppercase tracking-[0.28em]',
    heroTitle: 'text-4xl font-black leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-[5.2rem]',
    sectionTitle: 'text-3xl font-black leading-none tracking-[-0.045em] sm:text-4xl',
    body: 'text-base leading-8',
  },
  surface: {
    card: `border ${editablePalette.border} ${editablePalette.surfaceBg} rounded-[2rem]`,
    soft: `border ${editablePalette.border} ${editablePalette.surfaceBg} rounded-[2rem]`,
    dark: `${editablePalette.darkBg} ${editablePalette.darkText}`,
  },
  button: {
    primary: 'inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#0C2C55,#629FAD)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(12,44,85,0.24)]',
    secondary: 'inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(12,44,85,0.18)] bg-white px-7 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-[var(--slot4-page-text)] transition duration-300 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]',
    accent: 'inline-flex items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#296374,#629FAD)] px-7 py-3.5 text-xs font-black uppercase tracking-[0.16em] text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(41,99,116,0.25)]',
  },
  media: {
    frame: `relative overflow-hidden ${editablePalette.mediaBg}`,
    ratio: 'aspect-[4/3]',
  },
  motion: {
    lift: 'transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(12,44,85,0.16)]',
    fade: 'transition duration-300 hover:opacity-75',
  },
} as const

export const aiLayoutRules = [
  'All visible layout decisions belong inside src/editable; keep data, SEO, API, and route logic untouched.',
  'Use a premium white masthead, deep slate sections, and blue editorial accents with discovery-first layouts.',
  'Keep dynamic post fetching intact and never replace backend posts with mock arrays.',
  'Use postHref() for all post links so route aliases and task-specific detail pages remain functional.',
  'Prioritize readable desktop and mobile layouts with strong hero modules, layered cards, and a focused long-form article measure.',
  'Branding must remain dynamic from SITE_CONFIG; never hardcode a reference publication name or logo.',
] as const
