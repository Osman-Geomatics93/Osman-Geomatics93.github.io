'use client'

import { useEffect, useRef, useState } from 'react'

const skills = [
  { label: 'Remote Sensing', value: 95 },
  { label: 'GIS Tools',      value: 93 },
  { label: 'Field Work',     value: 90 },
  { label: 'ML / AI',        value: 87 },
  { label: 'Programming',    value: 88 },
  { label: 'Hydrology',      value: 85 },
]

const CX = 160
const CY = 160
const R  = 108
const N  = skills.length

const ang = (i: number) => (i * (2 * Math.PI)) / N - Math.PI / 2

const pt = (i: number, level = 1) => ({
  x: CX + R * level * Math.cos(ang(i)),
  y: CY + R * level * Math.sin(ang(i)),
})

const polyPts = (level: number) =>
  Array.from({ length: N }, (_, i) => `${pt(i, level).x.toFixed(2)},${pt(i, level).y.toFixed(2)}`).join(' ')

const dataPts = () =>
  skills.map((s, i) => {
    const p = pt(i, s.value / 100)
    return `${p.x.toFixed(2)},${p.y.toFixed(2)}`
  }).join(' ')

const textAnchor = (i: number): 'start' | 'middle' | 'end' => {
  const c = Math.cos(ang(i))
  return c > 0.1 ? 'start' : c < -0.1 ? 'end' : 'middle'
}

const labelDY = (i: number): number => {
  const s = Math.sin(ang(i))
  return s < -0.1 ? -10 : s > 0.1 ? 16 : 5
}

export default function SkillsRadar() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = svgRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 320 320"
      width="340"
      height="340"
      style={{ overflow: 'visible', display: 'block' }}
      aria-label="Skills radar chart"
    >
      {/* Grid hexagons */}
      {[0.25, 0.5, 0.75, 1].map((level) => (
        <polygon
          key={level}
          points={polyPts(level)}
          fill="none"
          stroke={level === 1 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}
          strokeWidth="1"
        />
      ))}

      {/* Grid level labels (25%, 50%, 75%) */}
      {[0.25, 0.5, 0.75].map((level) => (
        <text
          key={level}
          x={CX + 3}
          y={CY - R * level - 3}
          fontSize="9"
          fill="rgba(255,255,255,0.2)"
          fontFamily="monospace"
        >
          {level * 100}%
        </text>
      ))}

      {/* Axis lines */}
      {Array.from({ length: N }, (_, i) => {
        const p = pt(i)
        return (
          <line
            key={i}
            x1={CX} y1={CY}
            x2={p.x} y2={p.y}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="1"
          />
        )
      })}

      {/* Data polygon fill */}
      <polygon
        points={dataPts()}
        fill="rgba(16,185,129,0.12)"
        stroke="none"
        style={{
          transformOrigin: `${CX}px ${CY}px`,
          transform: `scale(${visible ? 1 : 0})`,
          transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s ease',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Data polygon stroke */}
      <polygon
        points={dataPts()}
        fill="none"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{
          transformOrigin: `${CX}px ${CY}px`,
          transform: `scale(${visible ? 1 : 0})`,
          transition: 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Data dots */}
      {skills.map((s, i) => {
        const p = pt(i, s.value / 100)
        return (
          <circle
            key={i}
            cx={p.x} cy={p.y} r={4.5}
            fill="#10b981"
            stroke="#070c14"
            strokeWidth="2"
            style={{
              transformOrigin: `${CX}px ${CY}px`,
              transform: `scale(${visible ? 1 : 0})`,
              transition: `transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.06}s, opacity 0.5s ease ${i * 0.06}s`,
              opacity: visible ? 1 : 0,
            }}
          />
        )
      })}

      {/* Value labels on dots */}
      {skills.map((s, i) => {
        const p = pt(i, s.value / 100)
        const ta = textAnchor(i)
        const offX = Math.cos(ang(i)) > 0.1 ? 12 : Math.cos(ang(i)) < -0.1 ? -12 : 0
        const offY = Math.sin(ang(i)) > 0.1 ? 14 : Math.sin(ang(i)) < -0.1 ? -10 : 0
        return (
          <text
            key={i}
            x={p.x + offX}
            y={p.y + offY}
            textAnchor={ta}
            fontSize="10"
            fontWeight="700"
            fill="#10b981"
            fontFamily="system-ui, sans-serif"
            style={{ opacity: visible ? 1 : 0, transition: `opacity 0.5s ease ${0.4 + i * 0.06}s` }}
          >
            {s.value}%
          </text>
        )
      })}

      {/* Axis labels */}
      {skills.map((s, i) => {
        const lp = pt(i, 1.3)
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y + labelDY(i)}
            textAnchor={textAnchor(i)}
            fontSize="11.5"
            fill="rgba(122,148,176,0.85)"
            fontFamily="system-ui, sans-serif"
          >
            {s.label}
          </text>
        )
      })}

      {/* Center dot */}
      <circle cx={CX} cy={CY} r={3} fill="rgba(16,185,129,0.4)" />
    </svg>
  )
}
