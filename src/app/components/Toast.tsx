'use client'

import { useState, useEffect } from 'react'

export function showToast(message: string, duration = 2800) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(
    new CustomEvent('portfolio-toast', { detail: { message, duration } })
  )
}

interface ToastItem {
  id: number
  message: string
}

export default function Toast() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    const handler = (e: Event) => {
      const { message, duration } = (e as CustomEvent<{ message: string; duration: number }>).detail
      const id = Date.now()
      setToasts((prev) => [...prev, { id, message }])
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration)
    }
    window.addEventListener('portfolio-toast', handler)
    return () => window.removeEventListener('portfolio-toast', handler)
  }, [])

  if (toasts.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '8px',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: '#0d1526',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '8px',
            padding: '12px 18px',
            color: '#edf0f8',
            fontSize: '0.875rem',
            fontWeight: 500,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            animation: 'toast-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            whiteSpace: 'nowrap',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              flexShrink: 0,
            }}
          />
          {t.message}
        </div>
      ))}
    </div>
  )
}
