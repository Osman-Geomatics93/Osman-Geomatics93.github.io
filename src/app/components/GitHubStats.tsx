'use client'

import { useEffect, useState } from 'react'
import { Github } from 'lucide-react'

interface GitHubUser {
  public_repos: number
  followers: number
}

interface GitHubRepo {
  stargazers_count: number
  language: string | null
  fork: boolean
}

const LANG_COLORS: Record<string, string> = {
  Python: '#3572A5',
  JavaScript: '#f1e05a',
  TypeScript: '#2b7489',
  R: '#198CE7',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'Jupyter Notebook': '#DA5B0B',
}

export default function GitHubStats() {
  const [user, setUser] = useState<GitHubUser | null>(null)
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    Promise.all([
      fetch('https://api.github.com/users/Osman-Geomatics93', { signal: controller.signal }).then(r => r.json()),
      fetch('https://api.github.com/users/Osman-Geomatics93/repos?per_page=100&sort=updated', { signal: controller.signal }).then(r => r.json()),
    ])
      .then(([u, r]) => {
        if (u && typeof u.public_repos === 'number') setUser(u)
        if (Array.isArray(r)) setRepos(r)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
    return () => controller.abort()
  }, [])

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
  const langMap: Record<string, number> = {}
  repos.filter(r => !r.fork && r.language).forEach(r => {
    langMap[r.language!] = (langMap[r.language!] || 0) + 1
  })
  const topLangs = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 5)
  const totalLangRepos = topLangs.reduce((s, [, n]) => s + n, 0)

  const statRows = !loading && !error && user
    ? [
        { num: String(user.public_repos), label: 'Public Repos' },
        { num: String(totalStars || 0), label: 'Total Stars' },
        { num: String(user.followers), label: 'Followers' },
      ]
    : error
    ? [
        { num: '9+', label: 'Public Repos' },
        { num: '2', label: 'QGIS Plugins' },
        { num: '3', label: 'Languages' },
      ]
    : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Stats card */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '24px 28px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginBottom: '20px' }}>
          {loading ? (
            [...Array(3)].map((_, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: '48px', height: '28px', backgroundColor: 'var(--border)', borderRadius: '4px', margin: '0 auto 6px' }} />
                <div style={{ width: '64px', height: '10px', backgroundColor: 'var(--border)', borderRadius: '3px' }} />
              </div>
            ))
          ) : (
            statRows!.map(({ num, label }) => (
              <div key={label}>
                <div className="font-display font-bold" style={{ fontSize: '1.5rem', color: 'var(--accent)' }}>{num}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-3)', marginTop: '2px' }}>{label}</div>
              </div>
            ))
          )}
        </div>

        {!loading && !error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              color: '#10b981',
              backgroundColor: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.2)',
              borderRadius: '4px',
              padding: '5px 10px',
              marginBottom: '16px',
              justifyContent: 'center',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', flexShrink: 0 }} />
            Live data from GitHub API
          </div>
        )}

        <a
          href="https://github.com/Osman-Geomatics93"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            justifyContent: 'center',
            fontSize: '0.85rem',
            color: 'var(--text-2)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '10px 16px',
            transition: 'border-color 0.2s ease, color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--accent)'
            el.style.color = 'var(--accent)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement
            el.style.borderColor = 'var(--border)'
            el.style.color = 'var(--text-2)'
          }}
        >
          <Github size={15} />
          View GitHub Profile →
        </a>
      </div>

      {/* Language bar */}
      {!loading && !error && topLangs.length > 0 && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            padding: '20px 24px',
          }}
        >
          <div
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-3)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '12px',
            }}
          >
            Top Languages
          </div>
          <div
            style={{
              display: 'flex',
              height: '8px',
              borderRadius: '4px',
              overflow: 'hidden',
              marginBottom: '12px',
              gap: '2px',
            }}
          >
            {topLangs.map(([lang, count]) => (
              <div
                key={lang}
                style={{
                  flex: count / totalLangRepos,
                  backgroundColor: LANG_COLORS[lang] || '#7e9ab5',
                  borderRadius: '2px',
                }}
                title={lang}
              />
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {topLangs.map(([lang, count]) => (
              <div key={lang} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: LANG_COLORS[lang] || '#7e9ab5',
                    flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-2)' }}>{lang}</span>
                <span style={{ fontSize: '0.68rem', color: 'var(--text-3)' }}>({count})</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Spoken languages */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          padding: '20px 24px',
        }}
      >
        <div
          style={{
            fontSize: '0.7rem',
            color: 'var(--text-3)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '14px',
          }}
        >
          Spoken Languages
        </div>
        {[
          { lang: 'Arabic', level: 'Native', pct: 100 },
          { lang: 'English', level: 'Professional', pct: 90 },
          { lang: 'Turkish', level: 'Intermediate', pct: 60 },
        ].map(({ lang, level, pct }) => (
          <div key={lang} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-2)' }}>{lang}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-3)' }}>{level}</span>
            </div>
            <div
              style={{
                height: '3px',
                backgroundColor: 'var(--border)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${pct}%`,
                  backgroundColor: 'var(--accent)',
                  borderRadius: '2px',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
