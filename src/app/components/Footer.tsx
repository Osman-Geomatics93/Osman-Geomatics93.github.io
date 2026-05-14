'use client'

import { Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg)',
        borderTop: '1px solid var(--border)',
        padding: '48px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        {/* Left: copyright + tagline */}
        <div>
          <p
            style={{
              color: 'var(--text-2)',
              fontSize: '0.9rem',
              marginBottom: '4px',
            }}
          >
            © 2026 Osman Ibrahim. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-3)', fontSize: '0.8rem' }}>
            Geomatics Engineer — Remote Sensing & GIS Expert, Trabzon, Turkey
          </p>
        </div>

        {/* Right: Social links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a
            href="https://www.linkedin.com/in/osman-ibrahim-a02a9a197/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            style={{
              color: 'var(--text-3)',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#10b981' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)' }}
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://github.com/Osman-Geomatics93"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            style={{
              color: 'var(--text-3)',
              transition: 'color 0.2s ease',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#10b981' }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)' }}
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
