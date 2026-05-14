'use client'

import { useState, useEffect } from 'react'

function getTrabzonTime() {
  return new Date().toLocaleTimeString('en-GB', {
    timeZone: 'Europe/Istanbul',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

export default function StatusBadge() {
  const [time, setTime] = useState('')

  useEffect(() => {
    setTime(getTrabzonTime())
    const id = setInterval(() => setTime(getTrabzonTime()), 30_000)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        backgroundColor: 'rgba(16,185,129,0.08)',
        border: '1px solid rgba(16,185,129,0.2)',
        borderRadius: '100px',
        padding: '6px 16px 6px 10px',
        marginBottom: '20px',
      }}
    >
      {/* Pulsing dot */}
      <span style={{ position: 'relative', display: 'flex', width: '9px', height: '9px', flexShrink: 0 }}>
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            backgroundColor: '#10b981',
            animation: 'ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite',
          }}
        />
        <span
          style={{
            position: 'relative',
            width: '9px',
            height: '9px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
          }}
        />
      </span>

      <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600, whiteSpace: 'nowrap' }}>
        Open to opportunities
      </span>

      {time && (
        <>
          <span style={{ width: '1px', height: '13px', backgroundColor: 'rgba(16,185,129,0.25)', flexShrink: 0 }} />
          <span
            style={{
              fontSize: '0.72rem',
              color: 'rgba(16,185,129,0.65)',
              fontFamily: 'monospace',
              whiteSpace: 'nowrap',
            }}
          >
            {time} <span style={{ opacity: 0.7 }}>+03 Trabzon</span>
          </span>
        </>
      )}
    </div>
  )
}
