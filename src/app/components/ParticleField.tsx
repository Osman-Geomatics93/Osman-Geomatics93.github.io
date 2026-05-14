'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number
  vx: number; vy: number
  baseVx: number; baseVy: number
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    let animId: number
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    const w = () => canvas.offsetWidth
    const h = () => canvas.offsetHeight

    resize()
    window.addEventListener('resize', resize, { passive: true })

    const N = 90
    const particles: Particle[] = Array.from({ length: N }, () => {
      const vx = (Math.random() - 0.5) * 0.35
      const vy = (Math.random() - 0.5) * 0.35
      return { x: Math.random() * w(), y: Math.random() * h(), vx, vy, baseVx: vx, baseVy: vy }
    })

    const CONNECT = 130
    const REPEL_R = 110
    const REPEL_FORCE = 0.018

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999 }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    const draw = () => {
      ctx.clearRect(0, 0, w(), h())

      particles.forEach(p => {
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < REPEL_R && dist > 0) {
          const force = (REPEL_R - dist) / REPEL_R
          p.vx += (dx / dist) * force * REPEL_FORCE
          p.vy += (dy / dist) * force * REPEL_FORCE
        }

        p.vx += (p.baseVx - p.vx) * 0.02
        p.vy += (p.baseVy - p.vy) * 0.02
        p.vx *= 0.99
        p.vy *= 0.99

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = w()
        if (p.x > w()) p.x = 0
        if (p.y < 0) p.y = h()
        if (p.y > h()) p.y = 0
      })

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < CONNECT) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(16,185,129,${(1 - d / CONNECT) * 0.22})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Dots
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(16,185,129,0.55)'
        ctx.fill()
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'auto',
        zIndex: 1,
      }}
    />
  )
}
