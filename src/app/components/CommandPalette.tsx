'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'

const commands = [
  { id: 'home',           label: 'Home',                    hint: 'Main page',                  href: '/' },
  { id: 'about',          label: 'About',                   hint: 'Background & timeline',       href: '/about' },
  { id: 'projects',       label: 'Projects',                hint: 'Research & field work',       href: '/projects' },
  { id: 'publications',   label: 'Publications',            hint: 'Papers & thesis',             href: '/publications' },
  { id: 'certifications', label: 'Certifications',          hint: '13 professional credentials', href: '/certifications' },
  { id: 'contact',        label: 'Contact',                 hint: 'Get in touch',                href: '/contact' },
  { id: 'cv',             label: 'Download CV',             hint: 'Open PDF resume',             href: '/cv', blank: true },
  { id: 'github',         label: 'GitHub',                  hint: 'Osman-Geomatics93',           href: 'https://github.com/Osman-Geomatics93', blank: true },
  { id: 'linkedin',       label: 'LinkedIn',                hint: 'Professional profile',        href: 'https://www.linkedin.com/in/osman-ibrahim-a02a9a197/', blank: true },
]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const filtered = query.trim()
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.hint.toLowerCase().includes(query.toLowerCase())
      )
    : commands

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setSelected(0)
  }, [])

  const execute = useCallback(
    (cmd: (typeof commands)[0]) => {
      close()
      if (cmd.blank) {
        window.open(cmd.href, '_blank', 'noopener,noreferrer')
      } else {
        router.push(cmd.href)
      }
    },
    [close, router]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSelected(0)
    }
  }, [open])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelected((s) => Math.min(s + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelected((s) => Math.max(s - 1, 0))
    } else if (e.key === 'Enter' && filtered[selected]) {
      execute(filtered[selected])
    }
  }

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 'clamp(60px, 12vh, 120px)',
        backgroundColor: 'rgba(7,12,20,0.75)',
        backdropFilter: 'blur(8px)',
      }}
      onClick={close}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
        style={{
          width: '100%',
          maxWidth: '560px',
          margin: '0 20px',
          backgroundColor: '#0d1526',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(16,185,129,0.1)',
        }}
      >
        {/* Input row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '16px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelected(0) }}
            placeholder="Search pages, links…"
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: '#edf0f8',
              fontSize: '1rem',
              fontFamily: 'inherit',
            }}
          />
          <kbd
            style={{
              fontSize: '0.65rem',
              color: 'rgba(255,255,255,0.3)',
              backgroundColor: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '4px',
              padding: '2px 6px',
              fontFamily: 'inherit',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <ul style={{ listStyle: 'none', margin: 0, padding: '8px 0', maxHeight: '360px', overflowY: 'auto' }}>
          {filtered.length === 0 ? (
            <li style={{ padding: '24px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.875rem' }}>
              No results
            </li>
          ) : (
            filtered.map((cmd, i) => (
              <li key={cmd.id}>
                <button
                  onClick={() => execute(cmd)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 20px',
                    background: i === selected ? 'rgba(16,185,129,0.08)' : 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    borderLeft: i === selected ? '2px solid #10b981' : '2px solid transparent',
                    transition: 'background 0.1s, border-color 0.1s',
                  }}
                  onMouseEnter={() => setSelected(i)}
                >
                  <span>
                    <span style={{ fontSize: '0.9rem', color: i === selected ? '#edf0f8' : '#7a94b0', fontWeight: 500 }}>
                      {cmd.label}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)', marginLeft: '10px' }}>
                      {cmd.hint}
                    </span>
                  </span>
                  {cmd.blank && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  )}
                </button>
              </li>
            ))
          )}
        </ul>

        {/* Footer */}
        <div
          style={{
            padding: '10px 20px',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            gap: '16px',
          }}
        >
          {[['↑↓', 'navigate'], ['↵', 'open'], ['esc', 'close']].map(([key, action]) => (
            <span key={action} style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <kbd style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '3px', padding: '1px 5px', fontFamily: 'inherit' }}>{key}</kbd>
              {action}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
