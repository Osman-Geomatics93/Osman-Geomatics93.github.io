'use client'

import { useState } from 'react'

interface Props {
  title: string
  slug: string
}

export default function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false)

  const url = typeof window !== 'undefined'
    ? `${window.location.origin}/blog/${slug}`
    : `https://osman-geomatics.com/blog/${slug}`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const linkedInHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
  const twitterHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`

  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '9px 18px',
    borderRadius: '8px',
    fontSize: '0.82rem',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    border: '1px solid var(--border-bright)',
    backgroundColor: 'var(--bg-card)',
    color: 'var(--text-2)',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center' }}>
      <span style={{ fontSize: '0.82rem', color: 'var(--text-3)', marginRight: '4px' }}>Share:</span>

      {/* LinkedIn */}
      <a
        href={linkedInHref}
        target="_blank"
        rel="noopener noreferrer"
        style={btnBase}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = '#0a66c2'
          el.style.color = '#0a66c2'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--border-bright)'
          el.style.color = 'var(--text-2)'
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
        </svg>
        LinkedIn
      </a>

      {/* Twitter / X */}
      <a
        href={twitterHref}
        target="_blank"
        rel="noopener noreferrer"
        style={btnBase}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--text-1)'
          el.style.color = 'var(--text-1)'
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement
          el.style.borderColor = 'var(--border-bright)'
          el.style.color = 'var(--text-2)'
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
        X / Twitter
      </a>

      {/* Copy link */}
      <button
        onClick={handleCopy}
        style={{
          ...btnBase,
          borderColor: copied ? 'rgba(16,185,129,0.5)' : 'var(--border-bright)',
          color: copied ? '#10b981' : 'var(--text-2)',
          backgroundColor: copied ? 'rgba(16,185,129,0.08)' : 'var(--bg-card)',
        }}
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            Copied!
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
            Copy link
          </>
        )}
      </button>
    </div>
  )
}
