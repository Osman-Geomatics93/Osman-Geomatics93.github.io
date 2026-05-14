'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Download, Menu, X } from 'lucide-react'

interface NavProps {
  activePage?: string
}

const navLinks = [
  { label: 'Home', href: '/', page: 'home' },
  { label: 'About', href: '/about', page: 'about' },
  { label: 'Projects', href: '/projects', page: 'projects' },
  { label: 'Publications', href: '/publications', page: 'publications' },
  { label: 'Certifications', href: '/certifications', page: 'certifications' },
  { label: 'Contact', href: '/contact', page: 'contact' },
]

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
          backgroundColor: scrolled || menuOpen ? 'rgba(7, 12, 20, 0.97)' : 'transparent',
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
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="font-display font-bold"
            style={{
              color: '#e8f0fe',
              letterSpacing: '-0.02em',
              fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#10b981' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#e8f0fe' }}
          >
            Osman Ibrahim
          </Link>

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
                    color: isActive ? '#10b981' : '#7e9ab5',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#e8f0fe'
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.color = '#7e9ab5'
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Right side: ⌘K hint + CV button + hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
                border: '1px solid #1a2d45',
                borderRadius: '6px',
                color: menuOpen ? '#10b981' : '#7e9ab5',
                cursor: 'pointer',
                padding: '7px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#264a6e'
                el.style.color = '#e8f0fe'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = '#1a2d45'
                el.style.color = menuOpen ? '#10b981' : '#7e9ab5'
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
            backgroundColor: 'rgba(7, 12, 20, 0.98)',
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
                    color: isActive ? '#10b981' : '#e8f0fe',
                    padding: '18px 0',
                    borderBottom: i < navLinks.length - 1 ? '1px solid #1a2d45' : 'none',
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
