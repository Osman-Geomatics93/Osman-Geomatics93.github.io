'use client'

import { useEffect, useRef } from 'react'

export default function FilmGrain() {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = divRef.current
    if (!el) return

    const canvas = document.createElement('canvas')
    const SIZE = 256
    canvas.width = SIZE
    canvas.height = SIZE

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = ctx.createImageData(SIZE, SIZE)
    const d = img.data
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random() * 255) | 0
      d[i] = d[i + 1] = d[i + 2] = v
      d[i + 3] = 255
    }
    ctx.putImageData(img, 0, 0)

    el.style.backgroundImage = `url(${canvas.toDataURL()})`
    el.style.backgroundSize = '256px 256px'
    el.style.backgroundRepeat = 'repeat'
  }, [])

  return (
    <div
      ref={divRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9990,
        opacity: 0.028,
        mixBlendMode: 'overlay',
      }}
    />
  )
}
