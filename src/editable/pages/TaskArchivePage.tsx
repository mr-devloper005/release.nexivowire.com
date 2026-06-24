import Link from 'next/link'
import type { CSSProperties } from 'react'
import { ArrowRight, Bookmark, BriefcaseBusiness, Building2, Camera, Download, FileText, Filter, Image as ImageIcon, MapPin, Megaphone, Search, Newspaper, UserRound } from 'lucide-react'
import { buildTaskMetadata } from '@/lib/seo'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { fetchPaginatedTaskPosts, buildPostUrl } from '@/lib/task-data'
import { getTaskConfig, SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SiteFeedPagination, SitePost } from '@/lib/site-connector'
import { taskPageMetadata } from '@/config/site.content'
import { taskPageVoices } from '@/editable/content/task-pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { getEditableExcerpt } from '@/editable/cards/PostCards'

export const revalidate = 3

export const taskMetadata = (task: TaskKey, path: string) =>
  buildTaskMetadata(task, {
    path,
    title: taskPageMetadata[task]?.title,
    description: taskPageMetadata[task]?.description,
  })

const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const asText = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const isUrl = (value: string) => value.startsWith('/') || /^https?:\/\//i.test(value)

const getImages = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.map((item) => item?.url).filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const images = Array.isArray(content.images) ? content.images.filter((url): url is string => typeof url === 'string' && isUrl(url)) : []
  const image = asText(content.image) || asText(content.featuredImage) || asText(content.thumbnail)
  const logo = asText(content.logo)
  return [...media, ...images, ...(isUrl(image) ? [image] : []), ...(isUrl(logo) ? [logo] : [])].filter(Boolean).slice(0, 8)
}

const getCategory = (post: SitePost, fallback: string) => asText(getContent(post).category) || post.tags?.[0] || fallback
const getSummary = (post: SitePost) => post.summary || asText(getContent(post).description) || asText(getContent(post).excerpt) || asText(getContent(post).body)
const getField = (post: SitePost, keys: string[]) => {
  const content = getContent(post)
  for (const key of keys) {
    const value = asText(content[key])
    if (value) return value
  }
  return ''
}

function pageHref(basePath: string, category: string, page: number) {
  const params = new URLSearchParams()
  if (category && category !== 'all') params.set('category', category)
  if (page > 1) params.set('page', String(page))
  const query = params.toString()
  return query ? `${basePath}?${query}` : basePath
}

const taskDeck: Record<TaskKey, { icon: typeof FileText; badge: string }> = {
  mediaDistribution: { icon: Newspaper, badge: 'News' },
  article: { icon: FileText, badge: 'Read' },
  listing: { icon: Building2, badge: 'Business' },
  classified: { icon: Megaphone, badge: 'Offer' },
  image: { icon: Camera, badge: 'Gallery' },
  sbm: { icon: Bookmark, badge: 'Bookmark' },
  pdf: { icon: Download, badge: 'PDF' },
  profile: { icon: UserRound, badge: 'Profile' },
}

export async function EditableTaskArchiveRoute({
  task,
  searchParams,
  basePath,
}: {
  task: TaskKey
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const taskConfig = getTaskConfig(task)
  const { posts, pagination } = await fetchPaginatedTaskPosts(task, { page, limit: 24, category })
  return <TaskArchiveView task={task} posts={posts} pagination={pagination} category={category} basePath={basePath || taskConfig?.route || `/${task}`} />
}

export function TaskArchiveView({ task, posts, pagination, category, basePath }: { task: TaskKey; posts: SitePost[]; pagination: SiteFeedPagination; category: string; basePath: string }) {
  const taskConfig = getTaskConfig(task)
  const voice = taskPageVoices[task]
  const page = pagination.page || 1
  const label = taskConfig?.label || task
  const deck = taskDeck[task]
  const Icon = deck.icon
  const archiveVars = { '--archive-bg': '#f8fafb', '--archive-text': '#102235', '--archive-surface': '#ffffff', '--archive-accent': '#0C2C55' } as CSSProperties
  const dynamicCategories = Array.from(new Map([
    ...CATEGORY_OPTIONS,
    ...posts.map((post) => {
      const raw = getCategory(post, '')
      return raw ? { name: raw, slug: normalizeCategory(raw) } : null
    }).filter((item): item is { name: string; slug: string } => Boolean(item)),
  ].map((item) => [item.slug, item])).values())
  const categoryLabel = category === 'all' ? 'All categories' : dynamicCategories.find((item) => item.slug === category)?.name || category
  const hero = posts[0]
  const secondary = posts.slice(1, 4)
  const gridPosts = posts.slice(4)

  return (
    <EditableSiteShell>
      <main style={archiveVars} className="bg-[var(--archive-bg)] text-[var(--archive-text)]">
        <section className="nexivo-dark-shell text-white">
          <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[2.5rem] border border-white/10 bg-white/6 p-7 backdrop-blur sm:p-10">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-white/80"><Icon className="h-4 w-4" /> {voice.eyebrow}</div>
                <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.07em] sm:text-6xl">{voice.headline}</h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-white/72">{voice.description}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {voice.chips.map((chip) => <span key={chip} className="nexivo-chip border-white/14 bg-white/8 text-white">{chip}</span>)}
                </div>
              </div>

              <form action={basePath} className="self-end rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-white/55"><Filter className="h-4 w-4" /> {voice.filterLabel}</div>
                <select name="category" defaultValue={category} className="nexivo-input mt-4 h-12 w-full px-4 text-sm font-bold outline-none">
                  <option value="all">All categories</option>
                  {dynamicCategories.map((item) => <option key={item.slug} value={item.slug}>{item.name}</option>)}
                </select>
                <button className="nexivo-button mt-3 h-12 w-full">Apply</button>
                <p className="mt-3 text-xs font-bold text-white/55">Showing: {categoryLabel}</p>
              </form>
            </div>
          </div>
        </section>

        {hero ? (
          <section className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <Link href={`${basePath}/${hero.slug}`} className="group min-h-[520px] rounded-[2.5rem] bg-[linear-gradient(180deg,#2d3947,#202c39)] p-6 text-white shadow-[0_30px_90px_rgba(12,44,85,0.16)] sm:p-9">
                <span className="nexivo-chip border-white/15 bg-white/12 text-white">{getCategory(hero, deck.badge)}</span>
                <h2 className="mt-8 max-w-4xl text-4xl font-black leading-[0.98] tracking-[-0.06em] sm:text-6xl">{hero.title}</h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-white/80">{getSummary(hero) || getEditableExcerpt(hero, 180)}</p>
              </Link>
              <div className="grid gap-5">
                {secondary.map((post, index) => (
                  <Link key={post.id || post.slug} href={`${basePath}/${post.slug}`} className="group rounded-[2rem] border border-[rgba(12,44,85,0.1)] bg-white p-5 shadow-[0_18px_48px_rgba(12,44,85,0.08)]">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--archive-accent)]">0{index + 1}</p>
                      <h3 className="mt-3 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h3>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="mx-auto max-w-[1440px] px-4 pb-16 sm:px-6 lg:px-10">
          {gridPosts.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {gridPosts.map((post, index) => <ArchivePostCard key={post.id || post.slug} post={post} task={task} basePath={basePath} index={index} />)}
            </div>
          ) : !hero ? (
            <div className="rounded-[2rem] border border-dashed border-[rgba(12,44,85,0.14)] bg-white p-10 text-center">
              <Search className="mx-auto h-8 w-8 opacity-45" />
              <h2 className="mt-4 text-3xl font-black tracking-[-0.05em]">No posts found</h2>
              <p className="mt-2 text-sm opacity-65">Try another category or refresh this page after publishing new content.</p>
            </div>
          ) : null}

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {pagination.hasPrevPage ? <Link href={pageHref(basePath, category, page - 1)} className="nexivo-button-soft px-5 py-3">Previous</Link> : null}
            <span className="rounded-full bg-[var(--archive-text)] px-5 py-3 text-sm font-black text-white">Page {page} of {pagination.totalPages || 1}</span>
            {pagination.hasNextPage ? <Link href={pageHref(basePath, category, page + 1)} className="nexivo-button-soft px-5 py-3">Next</Link> : null}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}

function ArchivePostCard({ post, task, basePath, index }: { post: SitePost; task: TaskKey; basePath: string; index: number }) {
  const href = `${basePath}/${post.slug}` || buildPostUrl(task, post.slug)
  const variant = index % 5
  if (task === 'listing') return <ListingArchiveCard post={post} href={href} />
  if (task === 'classified') return <ClassifiedArchiveCard post={post} href={href} />
  if (task === 'image') return <ImageArchiveCard post={post} href={href} index={index} />
  if (task === 'sbm') return <BookmarkArchiveCard post={post} href={href} index={index} />
  if (task === 'pdf') return <PdfArchiveCard post={post} href={href} />
  if (task === 'profile') return <ProfileArchiveCard post={post} href={href} />
  if (variant === 0) return <ArticleArchiveCard post={post} href={href} index={index} />
  if (variant === 1) return <HorizontalArchiveCard post={post} href={href} />
  if (variant === 2) return <CompactEditorialCard post={post} href={href} index={index} />
  if (variant === 3) return <ImageFirstArchiveCard post={post} href={href} />
  return <ArticleArchiveCard post={post} href={href} index={index} />
}

function ArticleArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-white p-5 shadow-[0_18px_48px_rgba(12,44,85,0.08)] transition hover:-translate-y-1">
      <div>
        <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em]">{getCategory(post, 'Article')}</span>
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--archive-accent)]">Story {String(index + 1).padStart(2, '0')}</p>
        <h2 className="mt-2 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 opacity-65">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function HorizontalArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-white p-5 shadow-[0_18px_48px_rgba(12,44,85,0.08)]">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">{getCategory(post, 'Feature')}</p>
        <h2 className="mt-3 text-2xl font-black tracking-[-0.05em]">{post.title}</h2>
        <p className="mt-3 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function CompactEditorialCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-[#f8fafb] p-6 shadow-[0_18px_48px_rgba(12,44,85,0.06)] transition hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3">
        <span className="nexivo-chip">Brief {String(index + 1).padStart(2, '0')}</span>
        <ArrowRight className="h-4 w-4 text-[var(--slot4-accent)]" />
      </div>
      <h2 className="mt-6 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
    </Link>
  )
}

function ImageFirstArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-white p-5 shadow-[0_18px_48px_rgba(12,44,85,0.08)] transition hover:-translate-y-1">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-soft-muted-text)]">{getCategory(post, 'Story')}</p>
        <h2 className="mt-3 text-2xl font-black tracking-[-0.05em]">{post.title}</h2>
        <p className="mt-3 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ListingArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const location = getField(post, ['location', 'address', 'city'])
  return (
    <Link href={href} className="group rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-white p-5 shadow-[0_18px_48px_rgba(12,44,85,0.08)] transition hover:-translate-y-1">
      <div className="min-w-0">
        <div className="flex flex-wrap gap-2">
          <span className="nexivo-chip"><BriefcaseBusiness className="h-3 w-3" /> Directory</span>
          {location ? <span className="nexivo-chip"><MapPin className="h-3 w-3" /> {location}</span> : null}
        </div>
        <h2 className="mt-4 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
        <p className="mt-3 line-clamp-2 text-sm leading-6 opacity-65">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function ClassifiedArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const price = getField(post, ['price', 'amount', 'budget'])
  const location = getField(post, ['location', 'address', 'city'])
  return (
    <Link href={href} className="group overflow-hidden rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-white shadow-[0_18px_48px_rgba(12,44,85,0.08)] transition hover:-translate-y-1">
      <div className="grid min-h-64 sm:grid-cols-[0.72fr_1fr]">
        <div className="relative bg-[var(--archive-text)] p-5 text-white">
          <span className="nexivo-chip border-white/12 bg-white/12 text-white">Classified</span>
          <h2 className="mt-10 text-3xl font-black leading-[1] tracking-[-0.07em]">{price || 'Open offer'}</h2>
          <p className="mt-4 text-sm font-bold opacity-75">{location || 'Details inside'}</p>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
          <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-65">{getSummary(post)}</p>
        </div>
      </div>
    </Link>
  )
}

function ImageArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group block overflow-hidden rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-white p-5 shadow-[0_18px_48px_rgba(12,44,85,0.08)] transition hover:-translate-y-1">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-[var(--archive-bg)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]"><ImageIcon className="h-3 w-3" /> Visual</div>
        <h2 className="mt-4 line-clamp-3 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
        <p className="mt-3 line-clamp-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{getSummary(post)}</p>
      </div>
    </Link>
  )
}

function BookmarkArchiveCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  const website = getField(post, ['website', 'url', 'link'])
  return (
    <Link href={href} className="group block rounded-[1.7rem] border border-[rgba(12,44,85,0.12)] bg-white p-6 shadow-[0_18px_48px_rgba(12,44,85,0.08)] transition hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3">
        <span className="nexivo-chip">Save {String(index + 1).padStart(2, '0')}</span>
        <Bookmark className="h-5 w-5" />
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-70">{getSummary(post)}</p>
      {website ? <p className="mt-5 truncate text-xs font-black uppercase tracking-[0.16em] opacity-60">{website.replace(/^https?:\/\//, '')}</p> : null}
    </Link>
  )
}

function PdfArchiveCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-white p-6 shadow-[0_18px_48px_rgba(12,44,85,0.08)] transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-[1.4rem] bg-[var(--archive-text)] p-5 text-white"><FileText className="h-8 w-8" /></div>
        <span className="nexivo-chip">PDF</span>
      </div>
      <h2 className="mt-8 text-2xl font-black leading-tight tracking-[-0.05em]">{post.title}</h2>
      <p className="mt-4 line-clamp-4 text-sm leading-6 opacity-65">{getSummary(post)}</p>
    </Link>
  )
}

function ProfileArchiveCard({ post, href }: { post: SitePost; href: string }) {
  const role = getField(post, ['role', 'designation', 'company', 'location'])
  return (
    <Link href={href} className="group rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-white p-6 text-center shadow-[0_18px_48px_rgba(12,44,85,0.08)] transition hover:-translate-y-1">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--archive-bg)] ring-1 ring-[rgba(12,44,85,0.1)]">
        <UserRound className="h-8 w-8 opacity-45" />
      </div>
      <h2 className="mt-5 text-xl font-black leading-tight tracking-[-0.04em]">{post.title}</h2>
      {role ? <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-[var(--archive-accent)]">{role}</p> : null}
      <p className="mt-4 line-clamp-3 text-sm leading-6 opacity-65">{getSummary(post)}</p>
    </Link>
  )
}
