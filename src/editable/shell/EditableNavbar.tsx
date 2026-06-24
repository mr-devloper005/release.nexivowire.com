'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const { session, logout } = useEditableLocalAuthSession()
  const links = globalContent.nav.primaryLinks

  return (
    <header className="sticky top-0 z-50 border-b border-[rgba(12,44,85,0.08)] bg-white/95 text-[var(--slot4-page-text)] backdrop-blur-xl">
      <div className="mx-auto grid min-h-[84px] max-w-[1440px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-10">
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(12,44,85,0.12)] lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link href="/" className="flex items-center gap-3">
            <img src={'/favicon.png'} width={'100px'} height={'150px'} alt='logo'/>
            <span className="min-w-0">
              <span className="block truncate text-xl font-black leading-none tracking-[-0.04em] sm:text-[1.75rem]">{SITE_CONFIG.name}</span>
              <span className="hidden text-[11px] font-semibold text-[var(--slot4-soft-muted-text)] sm:block">{globalContent.nav.tagline}</span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center justify-center gap-8 lg:flex">
          {links.map((item) => (
            <Link key={`${item.label}-${item.href}`} href={item.href} className="text-sm font-semibold text-[var(--slot4-page-text)] transition hover:text-[var(--slot4-accent)]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Link href="/search" className="hidden h-11 w-11 items-center justify-center rounded-full border border-[rgba(12,44,85,0.12)] text-[var(--slot4-page-text)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)] lg:inline-flex" aria-label="Search">
            <Search className="h-4 w-4" />
          </Link>
          {session ? (
            <>
               <button type="button" onClick={logout} className="hidden text-sm font-semibold text-[var(--slot4-page-text)] lg:block">Logout</button>
            </>
          ) : <Link href="/login" className="hidden text-sm font-semibold text-[var(--slot4-page-text)] lg:block">Log in</Link>}
          <Link href={session ? '/create' : globalContent.nav.actions.primary.href} className="nexivo-button px-5 py-3 sm:px-7">
            {session ? 'Publish' : globalContent.nav.actions.primary.label}
          </Link>
        </div>
      </div>

     

      {open ? (
        <div className="border-t border-[rgba(12,44,85,0.08)] bg-white px-4 py-4 lg:hidden">
          <div className="grid gap-3">
            {[{ label: 'Home', href: '/' }, ...links, { label: 'Search', href: '/search' }].map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="rounded-2xl border border-[rgba(12,44,85,0.12)] px-4 py-3 text-sm font-bold">
                {item.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link href="/create" onClick={() => setOpen(false)} className="rounded-2xl border border-[rgba(12,44,85,0.12)] px-4 py-3 text-sm font-bold">Create</Link>
                <button type="button" onClick={() => { logout(); setOpen(false) }} className="rounded-2xl border border-[rgba(12,44,85,0.12)] px-4 py-3 text-left text-sm font-bold">Logout</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setOpen(false)} className="rounded-2xl border border-[rgba(12,44,85,0.12)] px-4 py-3 text-sm font-bold">Log in</Link>
                <Link href="/signup" onClick={() => setOpen(false)} className="rounded-2xl border border-[rgba(12,44,85,0.12)] px-4 py-3 text-sm font-bold">Sign up</Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
