'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  label: string
  level: number
  color: string
  duration?: number
}

export default function AnimatedSkillBar({ label, level, color, duration = 1100 }: Props) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            setWidth(eased * level)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [level, duration])

  return (
    <div ref={ref} style={{ marginBottom: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>{label}</span>
        <span style={{ fontSize: '0.75rem', fontWeight: 600, color }}>
          {Math.round(width)}%
        </span>
      </div>
      <div
        style={{
          height: '4px',
          backgroundColor: 'var(--border)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${width}%`,
            backgroundColor: color,
            borderRadius: '2px',
            boxShadow: width > 5 ? `0 0 6px ${color}55` : 'none',
          }}
        />
      </div>
    </div>
  )
}
