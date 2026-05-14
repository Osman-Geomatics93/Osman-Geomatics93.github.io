'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Download } from 'lucide-react'

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '64px',
        transition: 'background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        backgroundColor: scrolled ? 'rgba(7, 12, 20, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #1a2d45' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display font-bold text-lg"
          style={{
            color: '#e8f0fe',
            letterSpacing: '-0.02em',
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

        {/* Download CV Button */}
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
            padding: '8px 18px',
            borderRadius: '6px',
            border: 'none',
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
          <span className="hidden sm:inline">Download CV</span>
        </a>
      </div>
    </header>
  )
}
