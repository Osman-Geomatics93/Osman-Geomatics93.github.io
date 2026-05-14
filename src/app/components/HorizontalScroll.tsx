'use client'

import { useRef, useEffect, ReactNode } from 'react'

export default function HorizontalScroll({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMouseDown = (e: MouseEvent) => {
      isDown.current = true
      el.style.cursor = 'grabbing'
      startX.current = e.pageX - el.offsetLeft
      scrollLeft.current = el.scrollLeft
    }
    const onMouseUp = () => { isDown.current = false; el.style.cursor = 'grab' }
    const onMouseLeave = () => { isDown.current = false; el.style.cursor = 'grab' }
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown.current) return
      e.preventDefault()
      const x = e.pageX - el.offsetLeft
      el.scrollLeft = scrollLeft.current - (x - startX.current) * 1.2
    }

    el.addEventListener('mousedown', onMouseDown)
    el.addEventListener('mouseup', onMouseUp)
    el.addEventListener('mouseleave', onMouseLeave)
    el.addEventListener('mousemove', onMouseMove)
    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      el.removeEventListener('mouseup', onMouseUp)
      el.removeEventListener('mouseleave', onMouseLeave)
      el.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        gap: '20px',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        paddingBottom: '16px',
        paddingTop: '4px',
        cursor: 'grab',
        scrollbarWidth: 'thin',
        scrollbarColor: 'var(--border-bright) transparent',
        userSelect: 'none',
      }}
    >
      {children}
    </div>
  )
}
