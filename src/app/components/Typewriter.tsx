'use client'

import { useEffect, useState } from 'react'

const roles = [
  'Remote Sensing Expert',
  'GIS Plugin Developer',
  'ML Researcher',
  'Water Resources Analyst',
]

interface Props {
  className?: string
  style?: React.CSSProperties
}

export default function Typewriter({ className, style }: Props) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && charIndex < current.length) {
      timer = setTimeout(() => setCharIndex(i => i + 1), 65)
    } else if (!deleting && charIndex === current.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex(i => i - 1), 38)
    } else {
      setDeleting(false)
      setRoleIndex(i => (i + 1) % roles.length)
    }

    return () => clearTimeout(timer)
  }, [charIndex, deleting, roleIndex])

  return (
    <span className={className} style={style}>
      {roles[roleIndex].substring(0, charIndex)}
      <span
        aria-hidden="true"
        style={{
          display: 'inline-block',
          width: '2px',
          height: '0.85em',
          backgroundColor: 'currentColor',
          marginLeft: '2px',
          verticalAlign: 'middle',
          animation: 'blink 1s step-end infinite',
        }}
      />
    </span>
  )
}
