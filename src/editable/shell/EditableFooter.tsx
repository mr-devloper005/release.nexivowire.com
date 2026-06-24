'use client'

import Link from 'next/link'
import { ArrowRight, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="nexivo-dark-shell mt-auto text-white">
      <div className="mx-auto max-w-[1440px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_.7fr_.7fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img src={'/favicon.png'} width={'100px'} height={'100px'} alt='logo'/>
               <span>
                <span className="block text-3xl font-black tracking-[-0.04em] sm:text-4xl">{SITE_CONFIG.name}</span>
                <span className="text-sm text-white/55">{globalContent.footer.tagline}</span>
              </span>
            </Link>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/68">{globalContent.footer.description || SITE_CONFIG.description}</p>
            <form action="/signup" className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
              
             </form>
          </div>

          

          <div>
            <h3 className="border-b border-white/16 pb-3 text-[10px] font-black uppercase tracking-[.22em] text-white/55">Account</h3>
            <div className="mt-4 grid gap-3">
              <Link href="/about" className="text-sm font-semibold text-white/78 transition hover:text-white">About</Link>
              <Link href="/contact" className="text-sm font-semibold text-white/78 transition hover:text-white">Contact</Link>
              {session ? (
                <>
                  <Link href="/create" className="text-sm font-semibold text-white/78 transition hover:text-white">Publish</Link>
                  <button onClick={logout} className="text-left text-sm font-semibold text-white/78 transition hover:text-white">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-semibold text-white/78 transition hover:text-white">Log in</Link>
                   </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-[10px] font-black uppercase tracking-[.18em] text-white/45">© {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}</div>
    </footer>
  )
}
