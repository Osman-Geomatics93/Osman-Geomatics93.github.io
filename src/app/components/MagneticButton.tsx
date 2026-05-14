'use client'

import { useRef, ReactNode } from 'react'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
  style?: React.CSSProperties
}

export default function MagneticButton({
  children,
  strength = 0.28,
  className,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
    el.style.transition = 'transform 0.12s ease'
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
    el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', ...style }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  )
}
