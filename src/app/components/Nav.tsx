'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Download, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

interface NavProps {
  activePage?: string
}

const navLinks = [
  { label: 'Home', href: '/', page: 'home' },
  { label: 'About', href: '/about', page: 'about' },
  { label: 'Projects', href: '/projects', page: 'projects' },
  { label: 'Blog', href: '/blog', page: 'blog' },
  { label: 'Publications', href: '/publications', page: 'publications' },
  { label: 'Certifications', href: '/certifications', page: 'certifications' },
  { label: 'Contact', href: '/contact', page: 'contact' },
]

// Toggle this to show/hide the availability badge across the site
const AVAILABLE_FOR_WORK = true

export default function Nav({ activePage = 'home' }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: '64px',
          transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
          backgroundColor: scrolled || menuOpen ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid #1a2d45' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 20px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo + availability badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-display font-bold"
              style={{
                color: 'var(--text-1)',
                letterSpacing: '-0.02em',
                fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-1)' }}
            >
              Osman Ibrahim
            </Link>

            {AVAILABLE_FOR_WORK && (
              <Link
                href="/contact"
                onClick={() => setMenuOpen(false)}
                title="Open to consulting & collaboration"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '5px',
                  backgroundColor: 'rgba(16,185,129,0.1)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: '20px',
                  padding: '3px 9px',
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  color: '#10b981',
                  textDecoration: 'none',
                  transition: 'background-color 0.2s, border-color 0.2s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = 'rgba(16,185,129,0.18)'
                  el.style.borderColor = 'rgba(16,185,129,0.5)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.backgroundColor = 'rgba(16,185,129,0.1)'
                  el.style.borderColor = 'rgba(16,185,129,0.3)'
                }}
              >
                <span style={{
                  width: '6px', height: '6px', borderRadius: '50%',
                  backgroundColor: '#10b981',
                  animation: 'availability-pulse 2s ease-in-out infinite',
                  flexShrink: 0,
                }} />
                <span className="hidden sm:inline">Open to work</span>
              </Link>
            )}
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center" style={{ gap: '32px' }}>
            {navLinks.map((link) => {
              const isActive = activePage === link.page
              return (
                <Link
                  key={link.page}
                  href={link.href}
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: isActive ? 'var(--accent)' : 'var(--text-2)',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-1)'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text-2)'
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side: ⌘K hint + theme toggle + CV button + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ThemeToggle />
            <button
              className="hidden md:flex"
              onClick={() => {
                window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }))
              }}
              aria-label="Open command palette"
              style={{
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: '6px',
                color: '#3a5068',
                cursor: 'pointer',
                padding: '6px 10px',
                fontSize: '0.75rem',
                fontFamily: 'inherit',
                transition: 'border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.13)'
                el.style.color = '#7a94b0'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(255,255,255,0.07)'
                el.style.color = '#3a5068'
              }}
            >
              <kbd style={{ fontFamily: 'inherit', fontSize: '0.7rem' }}>⌘K</kbd>
            </button>
            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#070c14',
                backgroundColor: '#10b981',
                padding: '8px 16px',
                borderRadius: '6px',
                transition: 'background-color 0.2s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = '#059669'
                el.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.backgroundColor = '#10b981'
                el.style.transform = 'translateY(0)'
              }}
            >
              <Download size={14} />
              <span className="hidden sm:inline">CV</span>
            </a>

            {/* Hamburger button — mobile only */}
            <button
              className="md:hidden"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: menuOpen ? 'var(--accent)' : 'var(--text-2)',
                cursor: 'pointer',
                padding: '7px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border-bright)'
                el.style.color = 'var(--text-1)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--border)'
                el.style.color = menuOpen ? 'var(--accent)' : 'var(--text-2)'
              }}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay menu */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--nav-overlay)',
            backdropFilter: 'blur(20px)',
            zIndex: 49,
            overflowY: 'auto',
          }}
        >
          <nav style={{ padding: '16px 20px 40px' }}>
            {navLinks.map((link, i) => {
              const isActive = activePage === link.page
              return (
                <Link
                  key={link.page}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '1.15rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--accent)' : 'var(--text-1)',
                    padding: '18px 0',
                    borderBottom: i < navLinks.length - 1 ? '1px solid var(--border)' : 'none',
                    transition: 'color 0.15s ease',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        width: '7px',
                        height: '7px',
                        borderRadius: '50%',
                        backgroundColor: '#10b981',
                        boxShadow: '0 0 8px #10b981',
                        flexShrink: 0,
                      }}
                    />
                  )}
                </Link>
              )
            })}

            {/* Full download CV button in mobile menu */}
            <a
              href="/cv"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#070c14',
                backgroundColor: '#10b981',
                padding: '14px 24px',
                borderRadius: '8px',
                marginTop: '28px',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#059669' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = '#10b981' }}
            >
              <Download size={16} />
              Download CV
            </a>
          </nav>
        </div>
      )}
    </>
  )
}
