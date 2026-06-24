import Link from 'next/link'
import { ArrowRight, BarChart3, Compass, Layers3, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const proofPoints = [
  { value: '01', label: 'Connected navigation across active sections' },
  { value: '02', label: 'Clear publishing and archive hierarchy' },
  { value: '03', label: 'Editorial presentation with operational focus' },
]

const platformSignals = [
  {
    icon: Compass,
    title: 'Designed for direction',
    body: 'The structure helps visitors understand where they are, what matters now, and where to go next without friction.',
  },
  {
    icon: Layers3,
    title: 'Built in layers',
    body: 'Featured stories, supporting updates, and deeper archives all live in one system instead of competing for attention.',
  },
  {
    icon: BarChart3,
    title: 'Focused on signal',
    body: 'The interface favors clarity, scanability, and context so important updates are easier to absorb and share.',
  },
]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main>
        <section className="nexivo-dark-shell text-white">
          <div className="mx-auto max-w-[1320px] px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-white/65">{pagesContent.about.badge}</p>
                <h1 className="mt-5 max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.055em] sm:text-7xl lg:text-[5.2rem]">{pagesContent.about.title}</h1>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">{pagesContent.about.description}</p>
              </div>

              <div className="grid gap-4">
                {proofPoints.map((point) => (
                  <div key={point.value} className="rounded-[1.75rem] border border-white/10 bg-white/8 p-5 backdrop-blur">
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-white/55">{point.value}</p>
                    <p className="mt-2 text-base font-semibold leading-7 text-white/88">{point.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="nexivo-card p-7 sm:p-10 lg:p-12">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-black uppercase tracking-[0.2em] text-[var(--slot4-accent)]">About {SITE_CONFIG.name}</p>
                    <p className="text-sm text-[var(--slot4-soft-muted-text)]">Why the experience feels different</p>
                  </div>
                </div>

                <div className="article-content mt-8 space-y-6">
                  {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>

                <div className="mt-10 rounded-[2rem] bg-[var(--slot4-page-bg)] p-6">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">Core idea</p>
                  <p className="mt-3 text-2xl font-black leading-tight tracking-[-0.04em] text-[var(--slot4-page-text)]">
                    A modern media platform should feel both editorial and operational at the same time.
                  </p>
                </div>
              </article>

              <aside className="grid gap-5">
                {platformSignals.map((signal) => (
                  <div key={signal.title} className="nexivo-card p-7">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]">
                      <signal.icon className="h-5 w-5" />
                    </span>
                    <h2 className="mt-5 text-3xl font-black leading-tight tracking-[-0.04em]">{signal.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{signal.body}</p>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f8fa]">
          <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="mb-8 max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">What shapes the platform</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">Three principles behind the experience</h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {pagesContent.about.values.map((value, index) => (
                <div key={value.title} className="nexivo-card p-7 sm:p-8">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[var(--slot4-soft-muted-text)]">0{index + 1}</p>
                  <h3 className="mt-4 text-3xl font-black leading-tight tracking-[-0.04em]">{value.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[linear-gradient(135deg,#1a73c8,#6d42ff)] text-white">
          <div className="mx-auto flex max-w-[1320px] flex-col gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-white/65">Next step</p>
              <h2 className="mt-3 text-4xl font-black leading-none tracking-[-0.05em] sm:text-5xl">Explore how the platform presents live stories, updates, and searchable archives.</h2>
            </div>
            <Link href="/search" className="nexivo-button-soft border-white/20 bg-white/10 px-6 py-4 text-white">
              Explore the archive
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
