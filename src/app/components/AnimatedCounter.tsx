'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedCounterProps {
  to: number
  duration?: number
  suffix?: string
  prefix?: string
  decimals?: number
  className?: string
  style?: React.CSSProperties
}

export default function AnimatedCounter({
  to,
  duration = 1800,
  suffix = '',
  prefix = '',
  decimals = 0,
  className,
  style,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
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
            setValue(eased * to)
            if (t < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration])

  const formatted =
    decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString()

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
