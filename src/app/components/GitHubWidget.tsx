'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Github, Star, GitFork, Users, ExternalLink } from 'lucide-react'

interface ContribDay { date: string; count: number; level: number }
interface Language { name: string; count: number; pct: number; color: string }
interface Repo {
  name: string; url: string; description: string | null
  stars: number; language: string | null; langColor: string; topics: string[]
}
interface GitHubData {
  login: string; name: string; avatarUrl: string; bio: string
  followers: number; following: number; publicRepos: number
  totalStars: number; totalForks: number; totalContribs: number
  topLanguages: Language[]
  topRepos: Repo[]
  weeks: ContribDay[][]
}

const LEVEL_COLORS = ['#0d1526', '#0a3d2a', '#0d5c3e', '#0f7a52', '#10b981']
const MONTH_LABELS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function HeatmapCell({ day }: { day: ContribDay }) {
  const [showTip, setShowTip] = useState(false)
  const bg = LEVEL_COLORS[day.level] ?? LEVEL_COLORS[0]
  return (
    <div style={{ position: 'relative' }}
      onMouseEnter={() => setShowTip(true)}
      onMouseLeave={() => setShowTip(false)}
    >
      <div style={{
        width: 11, height: 11, borderRadius: 2,
        backgroundColor: bg,
        border: '1px solid rgba(255,255,255,0.04)',
        transition: 'transform 0.1s',
        transform: showTip ? 'scale(1.4)' : 'scale(1)',
        cursor: 'default',
      }} />
      {showTip && (
        <div style={{
          position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)',
          backgroundColor: 'rgba(7,12,20,0.95)', border: '1px solid var(--border-bright)',
          borderRadius: 5, padding: '4px 8px', zIndex: 20, whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-1)', margin: 0 }}>
            <strong style={{ color: day.count > 0 ? '#10b981' : 'var(--text-3)' }}>{day.count} contribution{day.count !== 1 ? 's' : ''}</strong>
          </p>
          <p style={{ fontSize: '0.6rem', color: 'var(--text-3)', margin: 0 }}>{day.date}</p>
        </div>
      )}
    </div>
  )
}

export default function GitHubWidget() {
  const [data, setData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/github')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setError(true); setLoading(false) })
  }, [])

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 200, gap: 10, color: 'var(--text-3)' }}>
      <div style={{ width: 16, height: 16, border: '2px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
      <span style={{ fontSize: '0.85rem' }}>Loading GitHub activity…</span>
    </div>
  )

  if (error || !data) return (
    <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-3)', fontSize: '0.875rem' }}>
      GitHub data temporarily unavailable.
    </div>
  )

  /* month labels for heatmap */
  const monthMarkers: Array<{ label: string; col: number }> = []
  data.weeks.forEach((week, wi) => {
    const firstDay = week[0]
    if (!firstDay) return
    const d = new Date(firstDay.date)
    if (d.getDate() <= 7) {
      monthMarkers.push({ label: MONTH_LABELS[d.getMonth()], col: wi })
    }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* ── Profile strip ─────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20,
        backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '20px 24px', flexWrap: 'wrap',
      }}>
        <Image
          src={data.avatarUrl} alt={data.name}
          width={56} height={56}
          style={{ borderRadius: '50%', border: '2px solid var(--accent)', flexShrink: 0 }}
        />
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <h3 className="font-display" style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>
              {data.name}
            </h3>
            <a
              href={`https://github.com/${data.login}`}
              target="_blank" rel="noopener noreferrer"
              style={{ fontSize: '0.78rem', color: 'var(--text-3)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}
            >
              @{data.login} <ExternalLink size={10} />
            </a>
          </div>
          {data.bio && (
            <p style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginTop: 4, lineHeight: 1.5 }}>{data.bio}</p>
          )}
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {[
            { icon: <Github size={13} />, value: data.publicRepos, label: 'Repos' },
            { icon: <Star size={13} />, value: data.totalStars, label: 'Stars' },
            { icon: <GitFork size={13} />, value: data.totalForks, label: 'Forks' },
            { icon: <Users size={13} />, value: data.followers, label: 'Followers' },
          ].map(({ icon, value, label }) => (
            <div key={label} style={{ textAlign: 'center', minWidth: 56 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, color: 'var(--accent)', marginBottom: 2 }}>
                {icon}
                <span className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700 }}>{value}</span>
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-3)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Contribution heatmap ──────────────────────── */}
      <div style={{
        backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 12, padding: '24px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', margin: '0 0 4px' }}>
              Contribution Activity
            </p>
            <p className="font-display" style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-1)', margin: 0 }}>
              <span style={{ color: 'var(--accent)' }}>{data.totalContribs.toLocaleString()}</span> contributions in the last year
            </p>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>Less</span>
            {LEVEL_COLORS.map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: 2, backgroundColor: c, border: '1px solid rgba(255,255,255,0.04)' }} />
            ))}
            <span style={{ fontSize: '0.65rem', color: 'var(--text-3)' }}>More</span>
          </div>
        </div>

        {/* Month row */}
        <div style={{ overflowX: 'auto', paddingBottom: 4 }}>
          <div style={{ minWidth: 'max-content' }}>
            {/* Month labels */}
            <div style={{ display: 'flex', marginBottom: 4, paddingLeft: 2 }}>
              {data.weeks.map((_, wi) => {
                const marker = monthMarkers.find(m => m.col === wi)
                return (
                  <div key={wi} style={{ width: 13, flexShrink: 0, fontSize: '0.55rem', color: 'var(--text-3)', userSelect: 'none' }}>
                    {marker?.label ?? ''}
                  </div>
                )
              })}
            </div>

            {/* Grid: 7 rows × N weeks */}
            <div style={{ display: 'flex', gap: 2 }}>
              {data.weeks.map((week, wi) => (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {week.map((day, di) => (
                    <HeatmapCell key={di} day={day} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Languages + Top Repos ────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>

        {/* Language breakdown */}
        <div style={{
          backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px',
        }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', margin: '0 0 16px' }}>
            Top Languages
          </p>

          {/* Combined bar */}
          <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', marginBottom: 20, gap: 1 }}>
            {data.topLanguages.map(l => (
              <div key={l.name} style={{ flex: l.pct, backgroundColor: l.color, transition: 'flex 0.4s ease' }} />
            ))}
          </div>

          {/* Language list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.topLanguages.map(l => (
              <div key={l.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: l.color, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-2)', fontWeight: 500 }}>{l.name}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-3)', fontWeight: 600 }}>{l.pct}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, backgroundColor: 'var(--bg-surface)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${l.pct}%`, backgroundColor: l.color, borderRadius: 2, transition: 'width 0.6s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top repos */}
        <div style={{
          backgroundColor: 'var(--bg-card)', border: '1px solid var(--border)',
          borderRadius: 12, padding: '24px',
        }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-3)', margin: '0 0 16px' }}>
            Most Starred Repositories
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {data.topRepos.map((repo, i) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank" rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'block', borderRadius: 8, padding: '10px 12px', transition: 'background-color 0.15s' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--bg-surface)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
                    <span style={{
                      fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-3)',
                      backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)',
                      borderRadius: 4, padding: '1px 5px', flexShrink: 0,
                    }}>#{i + 1}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {repo.name}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                    <Star size={11} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '0.75rem', color: '#f59e0b', fontWeight: 600 }}>{repo.stars}</span>
                  </div>
                </div>
                {repo.description && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-3)', margin: '4px 0 0', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {repo.description}
                  </p>
                )}
                {repo.language && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: repo.langColor }} />
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-3)' }}>{repo.language}</span>
                  </div>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}
