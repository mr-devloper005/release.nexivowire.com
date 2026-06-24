'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Editorial desk', body: 'Send story ideas, corrections, source material, and publication questions.' },
  { icon: Megaphone, title: 'Media partnerships', body: 'Discuss distribution, syndication, newsroom collaborations, and campaign planning.' },
  { icon: Mail, title: 'General support', body: 'Reach the team for account, publishing, or site-related help.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main>
        <section className="nexivo-dark-shell text-white">
          <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-22">
            <p className="text-xs font-black uppercase tracking-[0.28em] text-white/65">{pagesContent.contact.eyebrow}</p>
            <h1 className="mt-5 max-w-5xl text-6xl font-black leading-[0.92] tracking-[-0.055em] sm:text-8xl">{pagesContent.contact.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/78">{pagesContent.contact.description}</p>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-[1320px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-16">
            <aside className="grid gap-5">
              {desks.map((desk, index) => (
                <div key={desk.title} className="nexivo-card p-7">
                  <div className="flex items-center justify-between"><desk.icon className="h-5 w-5 text-[var(--slot4-accent)]" /><span className="text-xs font-black text-[var(--slot4-soft-muted-text)]">0{index + 1}</span></div>
                  <h2 className="mt-6 text-3xl font-black tracking-[-0.04em]">{desk.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{desk.body}</p>
                </div>
              ))}
            </aside>
            <div className="nexivo-card p-6 sm:p-10 lg:p-14">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[var(--slot4-soft-muted-text)]">Send a message</p>
              <h2 className="mt-3 text-4xl font-black tracking-[-0.05em]">{pagesContent.contact.formTitle}</h2>
              <EditableContactLeadForm />
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
