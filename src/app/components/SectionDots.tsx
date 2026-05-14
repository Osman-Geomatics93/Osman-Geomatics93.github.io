'use client'

import { useEffect, useState } from 'react'

const sections = [
  { id: 'hero',     label: 'Home' },
  { id: 'stats',    label: 'Stats' },
  { id: 'expertise', label: 'Capabilities' },
  { id: 'skills',   label: 'Skills' },
  { id: 'research', label: 'Research' },
  { id: 'oss',      label: 'Open Source' },
]

export default function SectionDots() {
  const [active, setActive] = useState('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observers.forEach(o => o.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div
      style={{
        position: 'fixed',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 800,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      className="hidden lg:flex"
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            title={label}
            aria-label={`Jump to ${label}`}
            style={{
              all: 'unset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '8px',
              cursor: 'pointer',
              position: 'relative',
            }}
          >
            {/* Label tooltip */}
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 600,
                color: 'var(--text-2)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(6px)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {label}
            </span>
            {/* Dot */}
            <div
              style={{
                width: isActive ? '10px' : '6px',
                height: isActive ? '10px' : '6px',
                borderRadius: '50%',
                backgroundColor: isActive ? 'var(--accent)' : 'var(--text-3)',
                boxShadow: isActive ? '0 0 8px var(--accent)' : 'none',
                transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                flexShrink: 0,
              }}
            />
          </button>
        )
      })}
    </div>
  )
}
