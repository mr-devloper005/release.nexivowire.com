import Link from 'next/link'
import { ArrowRight, BarChart3, Globe2, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { CompactIndexCard, EditorialFeatureCard, getEditableExcerpt, postHref, RailPostCard } from '@/editable/cards/PostCards'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function safePost(posts: SitePost[], index: number) {
  return posts[index] || posts[0]
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = safePost(posts, 0)

  if (!lead) return null

  return (
    <section className="nexivo-dark-shell text-white">
      <div className={`${dc.shell.section} py-10 sm:py-12 lg:py-16`}>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10">
          <div className="relative z-10 grid min-h-[620px] place-items-center px-6 py-16 text-center sm:px-12">
            <div className="max-w-4xl">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[linear-gradient(135deg,#1a73c8,#6d42ff)] shadow-[0_25px_60px_rgba(26,115,200,0.32)]">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.28em] text-white/72">{pagesContent.home.hero.badge}</p>
              <h1 className="mt-5 text-4xl font-black leading-[0.96] tracking-[-0.06em] sm:text-6xl lg:text-[4.5rem]">
                The Future of Media is Here, <span className="nexivo-gradient-text">Powered by Insight</span>
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/78 sm:text-xl">{pagesContent.home.hero.description}</p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href={'/signup'} className="nexivo-button px-7 py-4">Get Started</Link>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const featurePosts = posts.slice(0, 3).filter(Boolean)
  if (!featurePosts.length) return null

  return (
    <section className="bg-white">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">Meet PR CoPilot</h2>
          <p className="mt-5 text-lg leading-8 text-[var(--slot4-muted-text)]">
            Empower your team with an intuitive suite built to help you understand the media landscape, sharpen messaging, and move faster with confidence.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {featurePosts.map((post, index) => (
            <Link
              key={post.id || post.slug}
              href={postHref(primaryTask, post, primaryRoute)}
              className={`group rounded-[2.25rem] border border-[rgba(12,44,85,0.12)] bg-white p-5 shadow-[0_24px_70px_rgba(12,44,85,0.08)] transition duration-300 hover:-translate-y-1 ${index === 1 ? 'ring-2 ring-[rgba(98,159,173,0.45)]' : ''}`}
            >
              <h3 className="mt-6 text-center text-3xl font-black leading-tight tracking-[-0.04em]">{post.title}</h3>
              <p className="mx-auto mt-4 max-w-md text-center text-sm leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 120) || 'Extract valuable insights instantly and keep your team aligned around the most important signals.'}</p>
              <div className="mt-6 flex justify-center">
                <span className={`nexivo-button px-7 py-3 ${index === 1 ? '' : 'bg-[linear-gradient(135deg,#296374,#629FAD)]'}`}>Learn More</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const first = safePost(posts, 0)
  const second = safePost(posts, 1)
  const third = safePost(posts, 2)
  const fourth = safePost(posts, 3)
  if (!first) return null

  const rows = [first, second, third, fourth].filter(Boolean)

  return (
    <section className="nexivo-dark-shell text-white">
      <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
        <div className="text-center">
          <h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">Solutions for Impactful PR</h2>
        </div>
        <div className="mt-10 grid gap-8">
          {rows.map((post, index) => (
            <Link key={post.id || post.slug} href={postHref(primaryTask, post, primaryRoute)} className={`group grid overflow-hidden rounded-[2.75rem] bg-white text-[var(--slot4-page-text)] shadow-[0_30px_80px_rgba(0,0,0,0.18)] lg:grid-cols-2 ${index % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''}`}>
              <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12 lg:col-span-2">
                <p className="text-xs font-black uppercase tracking-[0.26em] text-[var(--slot4-soft-muted-text)]">{index === 0 ? 'Media Relations' : index === 1 ? 'Media Monitoring' : index === 2 ? 'Social Listening' : 'Media Intelligence'}</p>
                <h3 className="mt-3 text-4xl font-black tracking-[-0.05em] sm:text-5xl">{post.title}</h3>
                <p className="mt-5 text-base leading-8 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 220) || 'Transform data into clearer decisions with editorial-grade monitoring, distribution, and search tools that keep teams one step ahead.'}</p>
                <ul className="mt-6 grid gap-3 text-sm font-semibold text-[var(--slot4-page-text)]">
                  <li className="inline-flex items-center gap-3"><BarChart3 className="h-4 w-4 text-[var(--slot4-lavender)]" /> Comprehensive coverage tracking</li>
                  <li className="inline-flex items-center gap-3"><Globe2 className="h-4 w-4 text-[var(--slot4-lavender)]" /> Cross-channel signal discovery</li>
                  <li className="inline-flex items-center gap-3"><Search className="h-4 w-4 text-[var(--slot4-lavender)]" /> Rapid search and analysis workflows</li>
                </ul>
                <div className="mt-8">
                  <span className="nexivo-button px-7 py-3">Learn More</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = (collected.length ? collected : posts).slice(0, 8)
  const featured = source[0]
  const railPosts = source.slice(1, 5)
  const listPosts = source.slice(5, 8)

  if (!featured) return null

  return (
    <>
      <section className="bg-[#f6f8fa]">
        <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-start">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-soft-muted-text)]">Trusted by communications teams</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.05em] sm:text-5xl">The {SITE_CONFIG.name} advantage</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.intro.paragraphs[0]}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {['95%', '90%', '9.1/10'].map((value, index) => (
                  <div key={value} className="rounded-[1.75rem] border border-[rgba(12,44,85,0.1)] bg-white p-5 shadow-[0_18px_40px_rgba(12,44,85,0.06)]">
                    <div className="text-4xl font-black tracking-[-0.05em]">{value}</div>
                    <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{pagesContent.home.intro.sidePoints[index] || 'Purpose-built for faster communication workflows.'}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {pagesContent.home.intro.sidePoints.map((item) => (
                <div key={item} className="flex items-center gap-4 rounded-[1.5rem] border border-[rgba(12,44,85,0.1)] bg-white px-5 py-4 shadow-[0_18px_40px_rgba(12,44,85,0.06)]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><Sparkles className="h-4 w-4" /></span>
                  <span className="text-base font-bold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className={`${dc.shell.section} ${dc.shell.sectionY}`}>
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <EditorialFeatureCard post={featured} href={postHref(primaryTask, featured, primaryRoute)} label="Featured briefing" />
            <div className="rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-white p-6 shadow-[0_18px_48px_rgba(12,44,85,0.08)]">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-[var(--slot4-soft-muted-text)]">More to discover</p>
              <div className="mt-4">
                {listPosts.map((post, index) => (
                  <CompactIndexCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className={`${dc.layout.rail}`}>
              {railPosts.map((post, index) => <RailPostCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[linear-gradient(135deg,#1a73c8,#6d42ff)] text-white">
      <div className={`${dc.shell.section} py-16 text-center sm:py-20`}>
        <h2 className="text-4xl font-black tracking-[-0.05em] sm:text-6xl">Ready to discover the future of PR?</h2>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/78">{pagesContent.home.cta.description}</p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href={pagesContent.home.cta.primaryCta.href} className="nexivo-button-soft border-white/22 bg-white/10 px-7 py-4 text-white">{pagesContent.home.cta.primaryCta.label}</Link>
          <Link href={pagesContent.home.cta.secondaryCta.href} className="nexivo-button-soft border-white/22 bg-white px-7 py-4 text-[var(--slot4-page-text)]">{pagesContent.home.cta.secondaryCta.label}</Link>
        </div>
      </div>
    </section>
  )
}
