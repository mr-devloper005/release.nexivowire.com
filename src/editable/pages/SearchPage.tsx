import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { buildPostUrl, getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { pagesContent } from '@/editable/content/pages.content'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const summaryOf = (post: SitePost) => post.summary || compactRaw(getContent(post).description) || compactRaw(getContent(post).excerpt) || ''

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const href = task ? buildPostUrl(task, post.slug) : `/article/${post.slug}`
  const summary = summaryOf(post)
  const taskLabel = SITE_CONFIG.tasks.find((item) => item.key === task)?.label || 'Post'
  const strong = index % 5 === 0

  return (
    <Link href={href} className={`group block overflow-hidden rounded-[2rem] border border-[rgba(12,44,85,0.12)] bg-white shadow-[0_18px_48px_rgba(12,44,85,0.08)] ${strong ? 'md:col-span-2' : ''}`}>
      <div className="p-5 sm:p-6">
        <span className="rounded-full bg-[var(--slot4-accent-soft)] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{taskLabel}</span>
        <h2 className="mt-4 line-clamp-3 text-2xl font-black leading-[1.03] tracking-[-0.035em] text-black">{post.title}</h2>
        {summary ? <p className="mt-4 line-clamp-3 text-sm font-semibold leading-7 text-[var(--slot4-muted-text)]">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[var(--slot4-accent)]">Open result <ArrowRight className="h-4 w-4" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled)

  return (
    <EditableSiteShell>
      <main>
        <section className="nexivo-dark-shell text-white">
          <div className="mx-auto max-w-[1320px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="rounded-[2.5rem] border border-white/10 bg-white/8 p-7 sm:p-10 lg:p-14">
                <p className="text-xs font-black uppercase tracking-[0.28em]">{pagesContent.search.hero.badge}</p>
                <h1 className="mt-5 text-6xl font-black leading-[0.9] tracking-[-0.055em] sm:text-8xl">{pagesContent.search.hero.title}</h1>
                <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-white/75">{pagesContent.search.hero.description}</p>
              </div>
              <form action="/search" className="self-center rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur sm:p-10 lg:p-14">
                <input type="hidden" name="master" value="1" />
                <label className="flex items-center gap-3 rounded-[1rem] border border-white/12 bg-white px-4 py-3 text-[var(--slot4-page-text)]">
                  <Search className="h-5 w-5 opacity-45" />
                  <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-bold outline-none placeholder:text-current/35" />
                </label>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-2 rounded-[1rem] border border-white/12 bg-white px-4 py-3 text-[var(--slot4-page-text)]">
                    <Filter className="h-4 w-4 opacity-45" />
                    <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-bold outline-none placeholder:text-current/35" />
                  </label>
                  <select name="task" defaultValue={task} className="nexivo-input px-4 py-3 text-sm font-black outline-none">
                    <option value="">All content types</option>
                    {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.label}</option>)}
                  </select>
                </div>
                <button className="nexivo-button mt-3 h-12 w-full" type="submit">Search</button>
              </form>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto max-w-[1320px] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-[var(--slot4-soft-muted-text)]">{results.length} results</p>
                <h2 className="mt-2 text-4xl font-black tracking-[-0.04em]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
              </div>
            </div>

            {results.length ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
              </div>
            ) : (
              <div className="rounded-[2rem] border border-dashed border-[rgba(12,44,85,0.14)] bg-white p-10 text-center shadow-[0_18px_48px_rgba(12,44,85,0.05)]">
                <p className="text-2xl font-black tracking-[-0.04em]">No matching posts found.</p>
                <p className="mt-3 text-sm font-semibold opacity-60">Try a different keyword, task type, or category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
