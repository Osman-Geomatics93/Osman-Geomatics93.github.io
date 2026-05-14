'use client'

import { useEffect, useState } from 'react'

export default function Preloader() {
  const [visible, setVisible] = useState(false)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('preloader-shown')) return
    sessionStorage.setItem('preloader-shown', '1')
    setVisible(true)
    const t1 = setTimeout(() => setFading(true), 1500)
    const t2 = setTimeout(() => setVisible(false), 1900)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <style>{`
        @keyframes sat-draw {
          from { stroke-dashoffset: 300; opacity: 0; }
          to   { stroke-dashoffset: 0;   opacity: 1; }
        }
        @keyframes pl-fadein {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pl-progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
        .sat-el {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: sat-draw 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
        }
      `}</style>

      {/* Satellite icon */}
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <rect className="sat-el" x="24" y="24" width="16" height="16" rx="2"
          stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.08)"
          style={{ animationDelay: '0ms' }} />
        <line className="sat-el" x1="4" y1="32" x2="24" y2="32"
          stroke="#10b981" strokeWidth="1.5" style={{ animationDelay: '80ms' }} />
        <line className="sat-el" x1="40" y1="32" x2="60" y2="32"
          stroke="#10b981" strokeWidth="1.5" style={{ animationDelay: '130ms' }} />
        <rect className="sat-el" x="1" y="27" width="7" height="10" rx="1.5"
          stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.1)"
          style={{ animationDelay: '180ms' }} />
        <rect className="sat-el" x="56" y="27" width="7" height="10" rx="1.5"
          stroke="#10b981" strokeWidth="1.5" fill="rgba(16,185,129,0.1)"
          style={{ animationDelay: '230ms' }} />
        <line className="sat-el" x1="32" y1="4" x2="32" y2="24"
          stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3"
          style={{ animationDelay: '280ms' }} />
        <circle cx="32" cy="2" r="2" fill="#10b981"
          style={{ opacity: 0, animation: 'pl-fadein 0.3s ease 0.55s forwards' }} />
      </svg>

      {/* Name */}
      <div
        className="font-display"
        style={{
          fontSize: '0.9rem',
          fontWeight: 700,
          letterSpacing: '0.2em',
          color: 'var(--text-3)',
          textTransform: 'uppercase',
          opacity: 0,
          animation: 'pl-fadein 0.5s ease 0.45s forwards',
        }}
      >
        Osman Ibrahim
      </div>

      {/* Progress bar */}
      <div style={{
        width: '100px',
        height: '2px',
        backgroundColor: 'var(--border)',
        borderRadius: '1px',
        overflow: 'hidden',
      }}>
        <div style={{
          height: '100%',
          width: 0,
          backgroundColor: 'var(--accent)',
          borderRadius: '1px',
          animation: 'pl-progress 1.4s cubic-bezier(0.4,0,0.2,1) forwards',
        }} />
      </div>
    </div>
  )
}
