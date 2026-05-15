'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

const EarthGlobe = dynamic(() => import('./EarthGlobe'), { ssr: false })

/* Static placeholder shown before the globe loads */
const SITES = [
  { name: 'Gezira Scheme',      lat: 14.38, lng: 33.42, color: '#10b981' },
  { name: 'Gash Spate',         lat: 15.45, lng: 36.35, color: '#60a5fa' },
  { name: 'South Darfur',       lat: 11.15, lng: 24.90, color: '#f59e0b' },
  { name: 'Northern Sudan',     lat: 18.55, lng: 31.62, color: '#7e9ab5' },
  { name: 'Merowe Dam',         lat: 18.44, lng: 31.83, color: '#7e9ab5' },
  { name: 'KTU Turkey',         lat: 41.00, lng: 39.73, color: '#a78bfa' },
  { name: 'HRC Sudan',          lat: 15.58, lng: 32.55, color: '#10b981' },
]

/* Equirectangular projection → pixel coords */
function toXY(lat: number, lng: number, w: number, h: number) {
  const x = ((lng + 180) / 360) * w
  const y = ((90 - lat) / 180) * h
  return { x, y }
}

function GlobePlaceholder() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'radial-gradient(ellipse at 40% 40%, #0a1628 0%, #050d1a 60%, #020810 100%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>
      {/* Faint grid lines (graticule) */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}
        viewBox="0 0 360 180" preserveAspectRatio="none"
      >
        {[-60, -30, 0, 30, 60].map(lat => (
          <line key={`lat${lat}`} x1={0} y1={90 - lat} x2={360} y2={90 - lat} stroke="#10b981" strokeWidth={0.3} />
        ))}
        {[-120, -60, 0, 60, 120].map(lng => (
          <line key={`lng${lng}`} x1={lng + 180} y1={0} x2={lng + 180} y2={180} stroke="#10b981" strokeWidth={0.3} />
        ))}
      </svg>

      {/* Project site pins */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 360 180"
        preserveAspectRatio="xMidYMid meet"
      >
        {SITES.map(s => {
          const { x, y } = toXY(s.lat, s.lng, 360, 180)
          return (
            <g key={s.name}>
              <circle cx={x} cy={y} r={2.5} fill={s.color} opacity={0.9} />
              <circle cx={x} cy={y} r={5} fill={s.color} opacity={0.2}>
                <animate attributeName="r" values="3;7;3" dur="2.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="2.5s" repeatCount="indefinite" />
              </circle>
            </g>
          )
        })}
      </svg>

      {/* Loading label */}
      <div style={{
        position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'center', gap: 10,
        background: 'rgba(7,12,20,0.8)', borderRadius: 8, padding: '8px 16px',
        border: '1px solid rgba(16,185,129,0.2)',
      }}>
        <div style={{
          width: 10, height: 10, borderRadius: '50%',
          border: '2px solid #10b981', borderTopColor: 'transparent',
          animation: 'spin 0.8s linear infinite',
          flexShrink: 0,
        }} />
        <span style={{ fontSize: '0.75rem', color: '#7a94b0' }}>Loading 3D Globe…</span>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default function LazyGlobe() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          obs.disconnect()
        }
      },
      { rootMargin: '300px' }   // start loading 300px before it enters the viewport
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {inView ? <EarthGlobe /> : <GlobePlaceholder />}
    </div>
  )
}
