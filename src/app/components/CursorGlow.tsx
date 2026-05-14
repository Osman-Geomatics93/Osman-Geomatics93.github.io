'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Don't run on touch-only devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const glow = glowRef.current
    if (!glow) return

    let rafId: number
    let x = 0
    let y = 0
    let targetX = 0
    let targetY = 0

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const animate = () => {
      x = lerp(x, targetX, 0.08)
      y = lerp(y, targetY, 0.08)
      if (glow) {
        glow.style.transform = `translate(${x}px, ${y}px)`
      }
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
      }}
    >
      <div
        ref={glowRef}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.02) 40%, transparent 70%)',
          transform: 'translate(-300px, -300px)',
          pointerEvents: 'none',
          marginLeft: '-300px',
          marginTop: '-300px',
        }}
      />
    </div>
  )
}
